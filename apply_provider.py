from pathlib import Path
import sys

p = Path(
    sys.argv[1]
    if len(sys.argv) > 1
    else "app/continuity/ContinuityProvider.tsx"
)

s = p.read_text(encoding="utf-8")


def insert(anchor: str, addition: str) -> None:
    global s

    count = s.count(anchor)

    if count != 1:
        raise SystemExit(
            f"Expected exactly one anchor, found {count}: "
            f"{anchor[:90]}"
        )

    s = s.replace(anchor, addition + anchor, 1)


# ==========================================================
# 01 / PORTABLE STATE IMPORT
# ==========================================================

insert(
    'import {\n  acceptContinuityState,',
    '''import {
  verifyPortableState,
} from "../../lib/continuity/portableState";

import type {
  ContinuityPortableEnvelope,
} from "../../lib/continuity/types";

''',
)


# ==========================================================
# 02 / RECOVERY RESULT TYPE
# ==========================================================

insert(
    """/* ==========================================================
   04 / COMMAND API""",
    '''export type ContinuityRecoveryResult = {
  ok: boolean;

  status:
    | "committed"
    | "unavailable"
    | "invalid"
    | "stale"
    | "storage-error";

  message: string;
};

''',
)


# ==========================================================
# 03 / COMMAND API
# ==========================================================

insert(
    '''  importState: (
    state: ContinuityState,
  ) => boolean;''',
    '''  commitPortableRecovery: (
    envelope: ContinuityPortableEnvelope,
    expectedCurrent: ContinuityState,
  ) => Promise<ContinuityRecoveryResult>;

''',
)


# ==========================================================
# 04 / EXCLUSIVE RECOVERY LOCK
# ==========================================================

insert(
    '''  /*
   * Used to prevent stale persistence effects.
   */''',
    '''  /*
   * Recovery and Episteme Transfer share
   * one exclusive commit boundary.
   */
  const recoveringRef = useRef(false);

''',
)


# ==========================================================
# 05 / PROTECT EPISTEME TRANSFER
# ==========================================================

transfer_lock = '''        committingRef.current
      ) {'''

if s.count(transfer_lock) != 1:
    raise SystemExit(
        "Episteme Transfer lock anchor was not found uniquely."
    )

s = s.replace(
    transfer_lock,
    '''        committingRef.current ||
        recoveringRef.current
      ) {''',
    1,
)


# ==========================================================
# 06 / EXPLICIT PORTABLE RECOVERY
# ==========================================================

insert(
    '''  /* ========================================================
     26 / IMPORT''',
    '''  /* ========================================================
     25A / EXPLICIT PORTABLE RECOVERY

     Review
     → Verify
     → Check current state
     → Check persistence
     → Validate privacy boundary
     → Write
     → Read-back verification
     → React State

     No silent merge.
     No automatic recovery.
  ======================================================== */

  const commitPortableRecovery = useCallback(
    async (
      envelope: ContinuityPortableEnvelope,
      expectedCurrent: ContinuityState,
    ): Promise<ContinuityRecoveryResult> => {
      if (
        status !== "ready" ||
        !hydratedRef.current ||
        committingRef.current ||
        recoveringRef.current
      ) {
        return {
          ok: false,
          status: "unavailable",
          message:
            "Continuity is not ready for recovery.",
        };
      }

      recoveringRef.current = true;

      try {
        /*
         * 01 / Reverify the reviewed envelope.
         */

        const reviewed =
          await verifyPortableState(envelope);

        if (reviewed.ok === false) {
          return {
            ok: false,
            status: "invalid",
            message: reviewed.message,
          };
        }

        /*
         * 02 / Validate the expected and
         * current Continuity states.
         */

        const expected =
          validateState(expectedCurrent);

        const current =
          validateState(stateRef.current);

        if (!expected || !current) {
          return {
            ok: false,
            status: "invalid",
            message:
              "Current-state validation failed.",
          };
        }

        const expectedJSON =
          JSON.stringify(expected);

        if (
          JSON.stringify(current) !==
          expectedJSON
        ) {
          return {
            ok: false,
            status: "stale",
            message:
              "Continuity changed after review. Select the file again.",
          };
        }

        /*
         * 03 / Verify stored Continuity.
         */

        const stored =
          readSessionState();

        if (!stored.ok) {
          return {
            ok: false,
            status: "storage-error",
            message:
              "Stored Continuity cannot be validated.",
          };
        }

        if (
          stored.state &&
          JSON.stringify(stored.state) !==
            expectedJSON
        ) {
          return {
            ok: false,
            status: "stale",
            message:
              "Stored Continuity changed after review.",
          };
        }

        if (
          !stored.state &&
          stored.exists
        ) {
          return {
            ok: false,
            status: "storage-error",
            message:
              "Stored Continuity is invalid.",
          };
        }

        /*
         * 04 / Enforce the existing
         * Continuity privacy boundary.
         */

        const boundary =
          acceptContinuityState(
            reviewed.state,
            "continuity",
          );

        if (
          !boundary.accepted ||
          inspectContinuityInvariants(
            boundary.data,
          ).length > 0
        ) {
          return {
            ok: false,
            status: "invalid",
            message:
              "Imported state failed the Continuity privacy or invariant boundary.",
          };
        }

        const candidate =
          validateState(boundary.data);

        if (!candidate) {
          return {
            ok: false,
            status: "invalid",
            message:
              "Recovery candidate is invalid.",
          };
        }

        /*
         * 05 / Capture the exact previous
         * storage value for rollback.
         */

        let originalRaw: string | null;

        try {
          originalRaw =
            window.sessionStorage.getItem(
              CONTINUITY_SESSION_KEY,
            );
        } catch {
          return {
            ok: false,
            status: "storage-error",
            message:
              "Cannot read recovery storage.",
          };
        }

        /*
         * 06 / Recheck for intervening
         * state mutations.
         */

        const recheck =
          readSessionState();

        if (
          !recheck.ok ||
          JSON.stringify(recheck.state) !==
            JSON.stringify(stored.state) ||
          JSON.stringify(stateRef.current) !==
            expectedJSON
        ) {
          return {
            ok: false,
            status: "stale",
            message:
              "Continuity changed during recovery verification.",
          };
        }

        /*
         * 07 / Best-effort rollback.
         */

        const restorePrevious = (): boolean => {
          try {
            if (originalRaw === null) {
              window.sessionStorage.removeItem(
                CONTINUITY_SESSION_KEY,
              );
            } else {
              window.sessionStorage.setItem(
                CONTINUITY_SESSION_KEY,
                originalRaw,
              );
            }

            return (
              window.sessionStorage.getItem(
                CONTINUITY_SESSION_KEY,
              ) === originalRaw
            );
          } catch {
            return false;
          }
        };

        /*
         * 08 / Persist the recovery candidate.
         */

        if (!writeSessionState(candidate)) {
          const rolledBack =
            restorePrevious();

          if (!rolledBack) {
            setStatus("rejected");
          }

          return {
            ok: false,
            status: "storage-error",
            message: rolledBack
              ? "Recovery write failed; previous stored state was restored."
              : "Recovery write failed and rollback could not be verified. Stop editing and preserve your exported JSON.",
          };
        }

        /*
         * 09 / Read-back verification.
         */

        const verified =
          readSessionState();

        if (
          !verified.ok ||
          !verified.state ||
          JSON.stringify(verified.state) !==
            JSON.stringify(candidate)
        ) {
          const rolledBack =
            restorePrevious();

          if (!rolledBack) {
            setStatus("rejected");
          }

          return {
            ok: false,
            status: "storage-error",
            message: rolledBack
              ? "Recovery read-back failed; previous stored state was restored."
              : "Recovery read-back failed and rollback could not be verified.",
          };
        }

        /*
         * 10 / Verified persistence becomes
         * authoritative before React dispatch.
         */

        persistenceVersionRef.current += 1;

        verifiedCommitRef.current =
          verified.state;

        stateRef.current =
          verified.state;

        dispatch({
          type: "state/import",
          payload: verified.state,
        });

        return {
          ok: true,
          status: "committed",
          message:
            "Recovery committed, persisted, and read-back verified.",
        };
      } catch {
        return {
          ok: false,
          status: "storage-error",
          message:
            "Recovery was interrupted. Review the current state before retrying.",
        };
      } finally {
        recoveringRef.current = false;
      }
    },
    [status],
  );


''',
)


# ==========================================================
# 07 / REGISTER COMMAND
# ==========================================================

insert(
    '''        importState,

        resetContinuity,''',
    '''        commitPortableRecovery,

''',
)


# ==========================================================
# 08 / REGISTER CALLBACK DEPENDENCY
# ==========================================================

insert(
    '''        importState,
        resetContinuity,''',
    '''        commitPortableRecovery,
''',
)


# ==========================================================
# 09 / SAVE
# ==========================================================

p.write_text(s, encoding="utf-8")

print(
    "Stage 1.7.4.4 recovery API applied successfully:",
    p,
)