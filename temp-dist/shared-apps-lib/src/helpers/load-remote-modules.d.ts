/**
 * Method to get remote entry URL for CXone Agent
 * @param cxaVersion - version of CXone Agent
 * @example getAgentRemoteEntryUrl(cxaVersion)
 */
export declare function getAgentRemoteEntryUrl(cxaVersion: string): string;
/**
 * Method to get remote entry URL for Embedded App
 * @param appType - type of remote embedded app
 * @param cxaVersion - version of CXone Agent
 * @example getRemoteEntryUrl(appType)
 */
export declare function getRemoteEntryUrl(appType: string, cxaVersion: string): string;
/**
 * Method to load remote Integration Module from remoteEntry.js file
 * @param appType - type of remote embedded app
 * @param remoteEntryUrl - url of the remote entry
 * @example loadIntegrationModule(appType)
 */
export declare function loadIntegrationModule(appType: string, remoteEntryUrl: string): () => Promise<any>;
/**
 * Method to load remote Integration Module from remoteEntry.js file
 * IMPORTANT: This method should only be used after useScript method is called to load remoteEntry.js file
 *
 * @param appType - type of remote embedded app
 * @param remoteName - module federation defined remote name
 * @param moduleName - exported module name from remote entry
 * @example
 * ```
 * const { ready, failed } = useScript({
 *   scriptSrc: REMOTE_ENTRY,
 *   scriptType: 'text/javascript',
 * });
 *
 * const Component = lazy(loadRemoteModule(CcfAppType.LvAppSpace, REMOTE_NAME, `./${moduleName}`));
 * ```
 */
export declare function loadRemoteModule(appType: string, remoteName: string, moduleName: string): () => Promise<any>;
