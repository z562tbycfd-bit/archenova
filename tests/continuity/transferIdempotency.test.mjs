import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");

/* ==========================================================
   ARCHENOVA AEVUM
   STAGE 1.7.4.5

   EPISTEME TRANSFER IDEMPOTENCY TESTS

   Production modules:
   - transferTransaction.ts
   - epistemeBridge.ts
   - privacyBoundary.ts
   - core.ts
   - store.ts

   PRINCIPLES
   ----------------------------------------------------------
   Continuity of Inquiry ≠ Continuity of Identity

   No React.
   No real browser sessionStorage.
   No external database.
   No cloud dependency.
   No production state mutation.
========================================================== */

const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");

const ROOT = process.cwd();

const CONTINUITY_DIR = path.join(
  ROOT,
  "lib",
  "continuity",
);

/* ==========================================================
   01 / TYPESCRIPT LOADER

   Uses the project's existing TypeScript dependency.
========================================================== */

const originalTsLoader =
  Module._extensions[".ts"];

Module._extensions[".ts"] = function loadTypeScript(
  module,
  filename,
) {
  const source = fs.readFileSync(
    filename,
    "utf8",
  );

  const compiled = ts.transpileModule(
    source,
    {
      fileName: filename,
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    },
  );

  module._compile(
    compiled.outputText,
    filename,
  );
};

/* ==========================================================
   02 / PRODUCTION IMPORTS
========================================================== */

const {
  prepareEpistemeTransfer,
  hasCommittedTransfer,
  validateTransactionState,
} = require(
  path.join(
    CONTINUITY_DIR,
    "transferTransaction.ts",
  ),
);

const {
  stageEpistemeTransfer,
  peekEpistemeTransfer,
  completeEpistemeTransfer,
  discardEpistemeTransfer,
  EPISTEME_BRIDGE_STORAGE_KEY,
} = require(
  path.join(
    CONTINUITY_DIR,
    "epistemeBridge.ts",
  ),
);

const {
  createInquiry,
} = require(
  path.join(
    CONTINUITY_DIR,
    "core.ts",
  ),
);

const {
  initializeContinuityStore,
} = require(
  path.join(
    CONTINUITY_DIR,
    "store.ts",
  ),
);

const {
  acceptEpistemeTransfer,
} = require(
  path.join(
    CONTINUITY_DIR,
    "privacyBoundary.ts",
  ),
);

if (originalTsLoader) {
  Module._extensions[".ts"] =
    originalTsLoader;
} else {
  delete Module._extensions[".ts"];
}

/* ==========================================================
   03 / ISOLATED SESSION STORAGE
========================================================== */

function createStorage() {
  const values = new Map();

  return {
    get length() {
      return values.size;
    },

    key(index) {
      return (
        [...values.keys()][index] ??
        null
      );
    },

    getItem(key) {
      const normalized = String(key);

      return values.has(normalized)
        ? values.get(normalized)
        : null;
    },

    setItem(key, value) {
      values.set(
        String(key),
        String(value),
      );
    },

    removeItem(key) {
      values.delete(
        String(key),
      );
    },

    clear() {
      values.clear();
    },
  };
}

function installBrowser(storage) {
  const previousWindow =
    globalThis.window;

  globalThis.window = {
    sessionStorage: storage,
  };

  return () => {
    if (
      previousWindow === undefined
    ) {
      delete globalThis.window;
    } else {
      globalThis.window =
        previousWindow;
    }
  };
}

/* ==========================================================
   04 / VALID CONTINUITY STATE
========================================================== */

function createState() {
  const now =
    new Date().toISOString();

  const initialized =
    initializeContinuityStore();

  const inquiry = createInquiry({
    question:
      "What can be independently verified about lunar systems?",
    purpose:
      "Preserve reasoning and validate transfer integrity.",
    now,
  });

  const state = {
    ...initialized,
    inquiry,
    updatedAt: now,
  };

  const accepted =
    validateTransactionState(
      state,
    );

  assert.ok(
    accepted,
    "Test ContinuityState must pass production validation.",
  );

  return accepted;
}

/* ==========================================================
   05 / VALID EPISTEME TRANSFER

   Exact fields from EpistemeContinuityTransfer:

   transferId
   kind
   title
   content
   evidenceReferenceIds
   createdAt

   No source field.
   No account metadata.
   No personal identity.
========================================================== */

function createTransfer(
  transferId =
    "transfer-idempotency-001",
  content =
    "Lunar reasoning requires independent validation.",
) {
  return {
    transferId,
    kind: "reasoning",
    title: "Lunar reasoning",
    content,
    evidenceReferenceIds: [],
    createdAt:
      new Date().toISOString(),
  };
}

/* ==========================================================
   06 / ASSERT VALID TRANSFER

   Prevents false test failures caused by
   invalid fixture construction.
========================================================== */

function assertValidTransfer(
  transfer,
) {
  const accepted =
    acceptEpistemeTransfer(
      transfer,
    );

  assert.equal(
    accepted.accepted,
    true,
    accepted.accepted
      ? undefined
      : JSON.stringify(
          accepted.issues,
          null,
          2,
        ),
  );

  return accepted.data;
}

/* ==========================================================
   07 / HELPERS
========================================================== */

function prepare(
  state,
  transfer,
) {
  return prepareEpistemeTransfer(
    state,
    assertValidTransfer(
      transfer,
    ),
  );
}

function assertPrepared(
  result,
) {
  assert.equal(
    result.ok,
    true,
    result.ok
      ? undefined
      : result.message,
  );

  assert.equal(
    result.status,
    "prepared",
  );

  return result.state;
}

function commitOnce(
  state,
  transfer,
) {
  return assertPrepared(
    prepare(
      state,
      transfer,
    ),
  );
}

function markerCount(
  state,
  transferId,
) {
  const marker =
    `episteme-transfer:${transferId}`;

  return state.journey.filter(
    (event) =>
      event.kind ===
        "discovery" &&
      event.title === marker,
  ).length;
}

function assertValidState(
  state,
) {
  assert.ok(
    validateTransactionState(
      state,
    ),
    "ContinuityState must remain valid.",
  );
}

/* ==========================================================
   TEST 01
   PRIVACY BOUNDARY
========================================================== */

test(
  "01 - valid transfer passes the privacy boundary",
  () => {
    const transfer =
      createTransfer();

    const accepted =
      acceptEpistemeTransfer(
        transfer,
      );

    assert.equal(
      accepted.accepted,
      true,
      accepted.accepted
        ? undefined
        : JSON.stringify(
            accepted.issues,
            null,
            2,
          ),
    );

    assert.equal(
      accepted.data.transferId,
      transfer.transferId,
    );

    assert.deepEqual(
      accepted.data
        .evidenceReferenceIds,
      [],
    );
  },
);

/* ==========================================================
   TEST 02
   FIRST ACCEPTANCE
========================================================== */

test(
  "02 - first acceptance creates one reasoning node and one marker",
  () => {
    const initial =
      createState();

    const transfer =
      createTransfer();

    const committed =
      commitOnce(
        initial,
        transfer,
      );

    assert.equal(
      committed.reasoning.length,
      initial.reasoning.length + 1,
    );

    assert.equal(
      markerCount(
        committed,
        transfer.transferId,
      ),
      1,
    );

    assert.equal(
      hasCommittedTransfer(
        committed,
        transfer.transferId,
      ),
      true,
    );

    assertValidState(
      committed,
    );
  },
);

/* ==========================================================
   TEST 03
   SAME TRANSFER ID
========================================================== */

test(
  "03 - same transfer ID cannot duplicate reasoning",
  () => {
    const initial =
      createState();

    const transfer =
      createTransfer();

    const committed =
      commitOnce(
        initial,
        transfer,
      );

    const second =
      prepare(
        committed,
        transfer,
      );

    assert.equal(
      second.ok,
      true,
    );

    assert.equal(
      second.status,
      "already-committed",
    );

    assert.equal(
      second.state.reasoning.length,
      committed.reasoning.length,
    );

    assert.equal(
      markerCount(
        second.state,
        transfer.transferId,
      ),
      1,
    );

    assert.deepEqual(
      second.state,
      committed,
    );
  },
);

/* ==========================================================
   TEST 04
   SAME ID / ALTERED CONTENT

   Existing implementation treats the ID
   as already committed.

   It does not authenticate payload identity.
========================================================== */

test(
  "04 - reused transfer ID with changed content does not append reasoning",
  () => {
    const initial =
      createState();

    const original =
      createTransfer(
        "transfer-same-id",
        "Original reasoning.",
      );

    const altered =
      createTransfer(
        "transfer-same-id",
        "Altered reasoning.",
      );

    const committed =
      commitOnce(
        initial,
        original,
      );

    const second =
      prepare(
        committed,
        altered,
      );

    assert.equal(
      second.ok,
      true,
    );

    assert.equal(
      second.status,
      "already-committed",
    );

    assert.equal(
      second.state.reasoning.length,
      committed.reasoning.length,
    );

    assert.deepEqual(
      second.state,
      committed,
    );
  },
);

/* ==========================================================
   TEST 05
   DIFFERENT TRANSFER IDS
========================================================== */

test(
  "05 - different transfer IDs commit independently",
  () => {
    const initial =
      createState();

    const first =
      createTransfer(
        "transfer-001",
        "First reasoning.",
      );

    const second =
      createTransfer(
        "transfer-002",
        "Second reasoning.",
      );

    const state1 =
      commitOnce(
        initial,
        first,
      );

    const state2 =
      commitOnce(
        state1,
        second,
      );

    assert.equal(
      state2.reasoning.length,
      initial.reasoning.length + 2,
    );

    assert.equal(
      markerCount(
        state2,
        first.transferId,
      ),
      1,
    );

    assert.equal(
      markerCount(
        state2,
        second.transferId,
      ),
      1,
    );

    assertValidState(
      state2,
    );
  },
);

/* ==========================================================
   TEST 06
   SERIALIZATION / RELOAD
========================================================== */

test(
  "06 - committed marker survives JSON serialization and reload",
  () => {
    const initial =
      createState();

    const transfer =
      createTransfer();

    const committed =
      commitOnce(
        initial,
        transfer,
      );

    const reloaded =
      validateTransactionState(
        JSON.parse(
          JSON.stringify(
            committed,
          ),
        ),
      );

    assert.ok(
      reloaded,
    );

    assert.equal(
      hasCommittedTransfer(
        reloaded,
        transfer.transferId,
      ),
      true,
    );

    const retry =
      prepare(
        reloaded,
        transfer,
      );

    assert.equal(
      retry.ok,
      true,
    );

    assert.equal(
      retry.status,
      "already-committed",
    );

    assert.equal(
      retry.state.reasoning.length,
      committed.reasoning.length,
    );
  },
);

/* ==========================================================
   TEST 07
   BRIDGE STAGING DOES NOT COMMIT
========================================================== */

test(
  "07 - staging does not mutate ContinuityState",
  () => {
    const storage =
      createStorage();

    const restoreBrowser =
      installBrowser(
        storage,
      );

    try {
      const initial =
        createState();

      const before =
        JSON.stringify(
          initial,
        );

      const transfer =
        assertValidTransfer(
          createTransfer(),
        );

      const staged =
        stageEpistemeTransfer(
          transfer,
        );

      assert.equal(
        staged.ok,
        true,
        staged.ok
          ? undefined
          : staged.reason,
      );

      const pending =
        peekEpistemeTransfer();

      assert.equal(
        pending.ok,
        true,
      );

      assert.equal(
        pending.envelope.transfer
          .transferId,
        transfer.transferId,
      );

      assert.equal(
        JSON.stringify(
          initial,
        ),
        before,
      );

      assert.equal(
        hasCommittedTransfer(
          initial,
          transfer.transferId,
        ),
        false,
      );
    } finally {
      restoreBrowser();
    }
  },
);

/* ==========================================================
   TEST 08
   PENDING REPLACEMENT PROTECTION
========================================================== */

test(
  "08 - pending transfer cannot be overwritten implicitly",
  () => {
    const storage =
      createStorage();

    const restoreBrowser =
      installBrowser(
        storage,
      );

    try {
      const first =
        assertValidTransfer(
          createTransfer(
            "pending-001",
          ),
        );

      const second =
        assertValidTransfer(
          createTransfer(
            "pending-002",
          ),
        );

      const staged =
        stageEpistemeTransfer(
          first,
        );

      assert.equal(
        staged.ok,
        true,
      );

      const overwritten =
        stageEpistemeTransfer(
          second,
        );

      assert.equal(
        overwritten.ok,
        false,
      );

      assert.equal(
        overwritten.status,
        "blocked",
      );

      const pending =
        peekEpistemeTransfer();

      assert.equal(
        pending.ok,
        true,
      );

      assert.equal(
        pending.envelope.transfer
          .transferId,
        first.transferId,
      );
    } finally {
      restoreBrowser();
    }
  },
);

/* ==========================================================
   TEST 09
   ENVELOPE REPLACEMENT DETECTION
========================================================== */

test(
  "09 - completion rejects a replaced review envelope",
  () => {
    const storage =
      createStorage();

    const restoreBrowser =
      installBrowser(
        storage,
      );

    try {
      const first =
        stageEpistemeTransfer(
          assertValidTransfer(
            createTransfer(
              "review-001",
            ),
          ),
        );

      assert.equal(
        first.ok,
        true,
      );

      const reviewed =
        peekEpistemeTransfer();

      assert.equal(
        reviewed.ok,
        true,
      );

      const replacement =
        stageEpistemeTransfer(
          assertValidTransfer(
            createTransfer(
              "review-002",
            ),
          ),
          {
            replaceExisting: true,
          },
        );

      assert.equal(
        replacement.ok,
        true,
      );

      const completion =
        completeEpistemeTransfer(
          reviewed.envelope,
        );

      assert.equal(
        completion.ok,
        false,
      );

      const pending =
        peekEpistemeTransfer();

      assert.equal(
        pending.ok,
        true,
      );

      assert.equal(
        pending.envelope.transfer
          .transferId,
        "review-002",
      );
    } finally {
      restoreBrowser();
    }
  },
);

/* ==========================================================
   TEST 10
   ACCEPT / COMPLETE / RESEND
========================================================== */

test(
  "10 - finalized transfer replay does not duplicate reasoning",
  () => {
    const storage =
      createStorage();

    const restoreBrowser =
      installBrowser(
        storage,
      );

    try {
      const initial =
        createState();

      const transfer =
        assertValidTransfer(
          createTransfer(
            "resend-001",
          ),
        );

      const staged =
        stageEpistemeTransfer(
          transfer,
        );

      assert.equal(
        staged.ok,
        true,
      );

      const pending =
        peekEpistemeTransfer();

      assert.equal(
        pending.ok,
        true,
      );

      const committed =
        commitOnce(
          initial,
          pending.envelope.transfer,
        );

      const completed =
        completeEpistemeTransfer(
          pending.envelope,
        );

      assert.equal(
        completed.ok,
        true,
      );

      assert.equal(
        peekEpistemeTransfer()
          .status,
        "empty",
      );

      const resent =
        stageEpistemeTransfer(
          transfer,
        );

      assert.equal(
        resent.ok,
        true,
      );

      const pendingAgain =
        peekEpistemeTransfer();

      assert.equal(
        pendingAgain.ok,
        true,
      );

      const retry =
        prepare(
          committed,
          pendingAgain.envelope.transfer,
        );

      assert.equal(
        retry.ok,
        true,
      );

      assert.equal(
        retry.status,
        "already-committed",
      );

      assert.equal(
        retry.state.reasoning.length,
        committed.reasoning.length,
      );

      assert.equal(
        markerCount(
          retry.state,
          transfer.transferId,
        ),
        1,
      );
    } finally {
      restoreBrowser();
    }
  },
);

/* ==========================================================
   TEST 11
   PENDING REMAINS WITHOUT COMMIT
========================================================== */

test(
  "11 - pending transfer remains available without completion",
  () => {
    const storage =
      createStorage();

    const restoreBrowser =
      installBrowser(
        storage,
      );

    try {
      const transfer =
        assertValidTransfer(
          createTransfer(
            "uncommitted-001",
          ),
        );

      const staged =
        stageEpistemeTransfer(
          transfer,
        );

      assert.equal(
        staged.ok,
        true,
      );

      const first =
        peekEpistemeTransfer();

      const second =
        peekEpistemeTransfer();

      assert.equal(
        first.ok,
        true,
      );

      assert.equal(
        second.ok,
        true,
      );

      assert.equal(
        first.envelope.transfer
          .transferId,
        second.envelope.transfer
          .transferId,
      );

      assert.notEqual(
        storage.getItem(
          EPISTEME_BRIDGE_STORAGE_KEY,
        ),
        null,
      );
    } finally {
      restoreBrowser();
    }
  },
);

/* ==========================================================
   TEST 12
   EVIDENCE PROMOTION PROTECTION
========================================================== */

test(
  "12 - valid evidence transfer cannot automatically become evidence",
  () => {
    const initial =
      createState();

    const transfer = {
      ...createTransfer(
        "evidence-001",
        "Unverified scientific claim.",
      ),
      kind: "evidence",
    };

    const accepted =
      assertValidTransfer(
        transfer,
      );

    const result =
      prepareEpistemeTransfer(
        initial,
        accepted,
      );

    assert.equal(
      result.ok,
      false,
    );

    assert.equal(
      result.status,
      "blocked",
    );

    assert.equal(
      initial.evidence.length,
      0,
    );

    assert.equal(
      hasCommittedTransfer(
        initial,
        transfer.transferId,
      ),
      false,
    );
  },
);

/* ==========================================================
   TEST 13
   SESSION STORAGE ISOLATION
========================================================== */

test(
  "13 - bridge operations preserve unrelated session keys",
  () => {
    const storage =
      createStorage();

    const restoreBrowser =
      installBrowser(
        storage,
      );

    try {
      const unrelatedKey =
        "archenova.test.unrelated";

      storage.setItem(
        unrelatedKey,
        "preserve-this-value",
      );

      const staged =
        stageEpistemeTransfer(
          assertValidTransfer(
            createTransfer(
              "isolation-001",
            ),
          ),
        );

      assert.equal(
        staged.ok,
        true,
      );

      const discarded =
        discardEpistemeTransfer();

      assert.equal(
        discarded.ok,
        true,
      );

      assert.equal(
        storage.getItem(
          unrelatedKey,
        ),
        "preserve-this-value",
      );

      assert.equal(
        storage.getItem(
          EPISTEME_BRIDGE_STORAGE_KEY,
        ),
        null,
      );
    } finally {
      restoreBrowser();
    }
  },
);

/* ==========================================================
   END
   ARCHENOVA AEVUM
   STAGE 1.7.4.5
========================================================== */