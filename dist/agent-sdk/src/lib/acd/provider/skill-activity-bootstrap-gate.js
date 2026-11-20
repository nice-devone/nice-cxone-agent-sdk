/**
 * Shared signal so real polling paths - CXoneSkillActivityProvider's own startPolling() (Queue app) and
 * CXoneDirectoryProvider's SKILL_LIST fetch (Directory) - can wait out an in-flight login-time bootstrap
 * instead of racing it with a duplicate, unpaginated updatedSince=1970 call. Both real paths issue a single
 * un-paginated request, so if one wins that race the resulting write can be silently capped by the
 * endpoint's default page size, with no way to backfill the missing rows afterward (subsequent polls are
 * deltas only). See docs/2026-08-03-skill-activity-bootstrap-worker-design.md.
 *
 * Deliberately not routed through CXoneClient: cxone-directory-provider.ts would have to import it, and
 * CXoneClient already imports the directory module, which would create a circular import.
 */
import { __awaiter } from "tslib";
/**
 * Not a cap on total bootstrap duration - a "worker has gone silent" detector instead. The worker posts a
 * heartbeat (util-worker.js) that resets this via markSkillActivityBootstrapProgress(), so only a truly
 * dead worker (crashed/never started, no heartbeat and no completion/failure) trips this timeout.
 */
const BOOTSTRAP_INACTIVITY_TIMEOUT_MS = 7000;
let bootstrapInFlight;
let resolveBootstrapInFlight;
let inactivityTimer;
/**
 * Clears the inactivity timeout if it is currently armed.
 * @example - clearInactivityTimer();
 */
function clearInactivityTimer() {
    if (inactivityTimer !== undefined) {
        clearTimeout(inactivityTimer);
        inactivityTimer = undefined;
    }
}
/**
 * Arms the inactivity timer.
 * @example - armInactivityTimer();
 */
function armInactivityTimer() {
    clearInactivityTimer();
    inactivityTimer = setTimeout(() => {
        // No signal in the window - assume the worker is stuck and release the wait; a later finish is harmless.
        resolveBootstrapInFlight === null || resolveBootstrapInFlight === void 0 ? void 0 : resolveBootstrapInFlight();
    }, BOOTSTRAP_INACTIVITY_TIMEOUT_MS);
}
/**
 * Call once a bootstrap is actually about to fetch, not on any of its early-return/skip paths.
 * @example - markSkillActivityBootstrapStarted();
 */
export function markSkillActivityBootstrapStarted() {
    bootstrapInFlight = new Promise((resolve) => {
        resolveBootstrapInFlight = resolve;
    });
    armInactivityTimer();
}
/**
 * Call on every heartbeat the bootstrap worker posts while still working, so a merely slow bootstrap is
 * never mistaken for a dead one.
 * @example - markSkillActivityBootstrapProgress();
 */
export function markSkillActivityBootstrapProgress() {
    if (bootstrapInFlight) {
        armInactivityTimer();
    }
}
/**
 * Call once the bootstrap has settled - success, failure, or aborted (e.g. logout mid-bootstrap).
 * @example - markSkillActivityBootstrapFinished();
 */
export function markSkillActivityBootstrapFinished() {
    clearInactivityTimer();
    resolveBootstrapInFlight === null || resolveBootstrapInFlight === void 0 ? void 0 : resolveBootstrapInFlight();
    resolveBootstrapInFlight = undefined;
    bootstrapInFlight = undefined;
}
/**
 * Resolves once any in-flight bootstrap finishes or the stuck-worker detector gives up. No-op if none is
 * running.
 * @example - await waitForSkillActivityBootstrap();
 */
export function waitForSkillActivityBootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!bootstrapInFlight) {
            return;
        }
        yield bootstrapInFlight;
    });
}
//# sourceMappingURL=skill-activity-bootstrap-gate.js.map