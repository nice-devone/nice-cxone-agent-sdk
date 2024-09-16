/**
 * Method to get remote entry URL for CXone Agent
 * @param cxaVersion - version of CXone Agent
 * @example getAgentRemoteEntryUrl(cxaVersion)
 */
export declare function getAgentRemoteEntryUrl(cxaVersion: string): string;
/**
 * Method to get remote entry URL for Embedded App
 * @param appType - type of remote embedded app
 * @example getRemoteEntryUrl(appType)
 */
export declare function getRemoteEntryUrl(appType: string, cxaVersion: string): string;
/**
 * Method to load remote Integration Module from remoteEntry.js file
 * @param appType - type of remote embedded app
 * @example loadIntegrationModule(appType)
 */
export declare function loadIntegrationModule(appType: string, remoteEntryUrl: string): () => Promise<any>;
