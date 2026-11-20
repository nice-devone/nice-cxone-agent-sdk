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
/**
 * Call once a bootstrap is actually about to fetch, not on any of its early-return/skip paths.
 * @example - markSkillActivityBootstrapStarted();
 */
export declare function markSkillActivityBootstrapStarted(): void;
/**
 * Call on every heartbeat the bootstrap worker posts while still working, so a merely slow bootstrap is
 * never mistaken for a dead one.
 * @example - markSkillActivityBootstrapProgress();
 */
export declare function markSkillActivityBootstrapProgress(): void;
/**
 * Call once the bootstrap has settled - success, failure, or aborted (e.g. logout mid-bootstrap).
 * @example - markSkillActivityBootstrapFinished();
 */
export declare function markSkillActivityBootstrapFinished(): void;
/**
 * Resolves once any in-flight bootstrap finishes or the stuck-worker detector gives up. No-op if none is
 * running.
 * @example - await waitForSkillActivityBootstrap();
 */
export declare function waitForSkillActivityBootstrap(): Promise<void>;
