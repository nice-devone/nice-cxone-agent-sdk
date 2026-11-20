import { CXoneAcdClient } from "@nice-devone/acd-sdk";
import { CXoneDigitalClient } from "@nice-devone/digital-sdk";

let initPromise: Promise<void> | null = null;

/**
 * Initialises ACD and Digital engagement once per page load, in the same order as the CMA landing page
 * (initAcdEngagement, then initDigitalEngagement). Every caller gets the same promise.
 *
 * Why: it is started right after login (see NavBar), not when the ACD page opens. initAcdEngagement()
 * starts the UI_QUEUE_WS tenant check, which fetches the tenant data and caches it in localStorage. When
 * init only started on the ACD page, the session was joined before that check finished, isUIQueueEnabled
 * was still false and the SDK used get-next polling instead of the UIQ WebSocket (UIQ only connected after
 * a refresh, once the tenant data was cached). Sharing one promise also stops the ACD and Digital pages
 * from initialising the SDK again each time they open.
 * @example
 * ```
 * initSdkEngagement().finally(() => setInitEngagement(true));
 * ```
 */
export const initSdkEngagement = (): Promise<void> => {
  if (!initPromise) {
    initPromise = (async () => {
      await CXoneAcdClient.instance.initAcdEngagement();
      await CXoneDigitalClient.instance.initDigitalEngagement();
    })().catch((error) => {
      // allow a later call to retry
      initPromise = null;
      throw error;
    });
  }
  return initPromise;
};
