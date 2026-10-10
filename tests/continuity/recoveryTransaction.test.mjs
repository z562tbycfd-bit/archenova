import test from "node:test";
import assert from "node:assert/strict";

import {
  executeRecoveryTransaction,
  RecoveryTransactionStatus,
} from "../../lib/continuity/recoveryTransaction.mjs";

/* ==========================================================
   ARCHENOVA AEVUM
   STAGE 1.7.4.5

   RECOVERY TRANSACTION FAILURE TESTS

   No browser sessionStorage.
   No React state mutation.
   No Episteme Bridge mutation.
   No external database.
========================================================== */

const KEY = "archenova.test.continuity";

const current = {
  id: "continuity-001",
  revision: 1,
  inquiry: "Original inquiry",
};

const candidate = {
  id: "continuity-001",
  revision: 2,
  inquiry: "Recovered inquiry",
};

function validateState(value) {
  if (
    !value ||
    typeof value !== "object" ||
    typeof value.id !== "string" ||
    !Number.isInteger(value.revision) ||
    typeof value.inquiry !== "string"
  ) {
    return null;
  }

  return {
    id: value.id,
    revision: value.revision,
    inquiry: value.inquiry,
  };
}

function statesEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function createStorage(initial = current) {
  const values = new Map();

  if (initial !== null) {
    values.set(KEY, JSON.stringify(initial));
  }

  return {
    getItem(key) {
      return values.has(key)
        ? values.get(key)
        : null;
    },

    setItem(key, value) {
      values.set(key, String(value));
    },

    removeItem(key) {
      values.delete(key);
    },
  };
}

function execute(storage, overrides = {}) {
  return executeRecoveryTransaction({
    storage,
    key: KEY,
    expectedCurrent: current,
    candidate,
    validateState,
    statesEqual,
    ...overrides,
  });
}

/* ==========================================================
   TEST 01 / NORMAL COMMIT
========================================================== */

test("01 - verified recovery commits", () => {
  const storage = createStorage();

  const result = execute(storage);

  assert.equal(result.ok, true);
  assert.equal(
    result.status,
    RecoveryTransactionStatus.COMMITTED,
  );

  assert.deepEqual(
    JSON.parse(storage.getItem(KEY)),
    candidate,
  );

  assert.equal(result.rollbackAttempted, false);
  assert.equal(result.storageUncertain, false);
});

/* ==========================================================
   TEST 02 / WRITE REJECTION
========================================================== */

test("02 - rejected write preserves original", () => {
  const storage = createStorage();
  const original = storage.getItem(KEY);

  storage.setItem = () => {
    throw new Error("Simulated write rejection");
  };

  const result = execute(storage);

  assert.equal(result.ok, false);
  assert.equal(
    result.status,
    RecoveryTransactionStatus.STORAGE_ERROR,
  );

  assert.equal(storage.getItem(KEY), original);
  assert.equal(result.rollbackAttempted, true);

  // The rollback write also fails, so the engine
  // must conservatively report uncertainty.
  assert.equal(result.rollbackVerified, false);
  assert.equal(result.storageUncertain, true);
});

/* ==========================================================
   TEST 03 / WRITE THEN THROW
========================================================== */

test("03 - partial write is rolled back", () => {
  const storage = createStorage();
  const original = storage.getItem(KEY);
  const normalSet = storage.setItem.bind(storage);

  let calls = 0;

  storage.setItem = (key, value) => {
    calls += 1;
    normalSet(key, value);

    if (calls === 1) {
      throw new Error("Failure after write");
    }
  };

  const result = execute(storage);

  assert.equal(result.ok, false);
  assert.equal(result.rollbackAttempted, true);
  assert.equal(result.rollbackVerified, true);
  assert.equal(result.storageUncertain, false);
  assert.equal(storage.getItem(KEY), original);
});

/* ==========================================================
   TEST 04 / SILENT WRITE FAILURE
========================================================== */

test("04 - ignored write cannot commit", () => {
  const storage = createStorage();
  const original = storage.getItem(KEY);

  storage.setItem = () => {
    // Simulate a write silently ignored.
  };

  const result = execute(storage);

  assert.equal(result.ok, false);
  assert.equal(result.rollbackAttempted, true);
  assert.equal(result.rollbackVerified, true);
  assert.equal(storage.getItem(KEY), original);
});

/* ==========================================================
   TEST 05 / CORRUPTED READ-BACK
========================================================== */

test("05 - corrupted read-back triggers rollback", () => {
  const storage = createStorage();
  const original = storage.getItem(KEY);

  const normalGet = storage.getItem.bind(storage);

  let reads = 0;

  storage.getItem = (key) => {
    reads += 1;

    if (reads === 2) {
      return '{"corrupted":true}';
    }

    return normalGet(key);
  };

  const result = execute(storage);

  assert.equal(result.ok, false);
  assert.equal(result.rollbackAttempted, true);
  assert.equal(result.rollbackVerified, true);
  assert.equal(result.storageUncertain, false);
  assert.equal(storage.getItem(KEY), original);
});

/* ==========================================================
   TEST 06 / ROLLBACK FAILURE
========================================================== */

test("06 - rollback failure reports uncertainty", () => {
  const storage = createStorage();
  const normalSet = storage.setItem.bind(storage);

  let calls = 0;

  storage.setItem = (key, value) => {
    calls += 1;

    if (calls === 1) {
      normalSet(key, value);
      throw new Error("Partial commit failure");
    }

    throw new Error("Rollback rejected");
  };

  const result = execute(storage);

  assert.equal(result.ok, false);
  assert.equal(
    result.status,
    RecoveryTransactionStatus.STORAGE_ERROR,
  );

  assert.equal(result.rollbackAttempted, true);
  assert.equal(result.rollbackVerified, false);
  assert.equal(result.storageUncertain, true);

  // The failed rollback leaves candidate bytes.
  // The engine must never report success.
  assert.deepEqual(
    JSON.parse(storage.getItem(KEY)),
    candidate,
  );
});

/* ==========================================================
   TEST 07 / STALE STORAGE
========================================================== */

test("07 - stale state blocks recovery", () => {
  const changed = {
    ...current,
    revision: 99,
  };

  const storage = createStorage(changed);
  const original = storage.getItem(KEY);

  const result = execute(storage);

  assert.equal(result.ok, false);
  assert.equal(
    result.status,
    RecoveryTransactionStatus.STALE,
  );

  assert.equal(storage.getItem(KEY), original);
  assert.equal(result.rollbackAttempted, false);
});

/* ==========================================================
   TEST 08 / INVALID CANDIDATE
========================================================== */

test("08 - invalid candidate cannot commit", () => {
  const storage = createStorage();
  const original = storage.getItem(KEY);

  const result = execute(storage, {
    candidate: {
      id: "continuity-001",
      revision: "invalid",
    },
  });

  assert.equal(result.ok, false);
  assert.equal(
    result.status,
    RecoveryTransactionStatus.INVALID,
  );

  assert.equal(storage.getItem(KEY), original);
});

/* ==========================================================
   TEST 09 / STORAGE READ FAILURE
========================================================== */

test("09 - unreadable storage cannot commit", () => {
  const storage = createStorage();

  storage.getItem = () => {
    throw new Error("Storage unavailable");
  };

  const result = execute(storage);

  assert.equal(result.ok, false);
  assert.equal(
    result.status,
    RecoveryTransactionStatus.STORAGE_ERROR,
  );

  assert.equal(result.storageUncertain, true);
  assert.equal(result.rollbackAttempted, false);
});

/* ==========================================================
   TEST 10 / ABSENT INITIAL STORAGE
========================================================== */

test("10 - absent storage can receive recovery", () => {
  const storage = createStorage(null);

  const result = execute(storage);

  assert.equal(result.ok, true);
  assert.equal(
    result.status,
    RecoveryTransactionStatus.COMMITTED,
  );

  assert.deepEqual(
    JSON.parse(storage.getItem(KEY)),
    candidate,
  );
});

/* ==========================================================
   END
========================================================== */