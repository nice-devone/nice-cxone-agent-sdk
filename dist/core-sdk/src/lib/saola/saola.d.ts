/**
 * Extracts the config key to look up in the analytics configuration JSON.
 * For non-prod facadeUrl (dev/test/staging/perf), returns the environment name.
 * For production facadeUrl, returns the area (e.g. 'na1', 'eu3', 'za1').
 * @param facadeUrl - The base CXone facade URL
 * @param area - The cluster area identifier (e.g. 'na1', 'eu3', 'za1')
 * @returns The config lookup key
 * @example
 * ```
 * getSaolaClusterKey('https://na1.test.nice-incontact.com', 'na1'); // 'test'
 * getSaolaClusterKey('https://na1.niceincontact.com', 'na1');       // 'na1'
 * getSaolaClusterKey('https://eu3.niceincontact.com', 'eu3');       // 'eu3'
 * ```
 */
export declare const getSaolaClusterKey: (facadeUrl: string, area: string) => string;
/**
 * Fetches the CXone analytics configuration and initializes Saola.ai browser tracking
 * for the resolved cluster/environment.
 * @param facadeUrl - The base CXone facade URL (e.g. 'https://na1.test.nice-incontact.com')
 * @param area - The cluster area identifier (e.g. 'na1', 'eu3', 'za1')
 * @returns A promise that resolves when initialization is complete (or fails gracefully)
 * @example
 * ```
 * await saolaInit('https://na1.test.nice-incontact.com', 'na1'); // uses 'test' config
 * await saolaInit('https://na1.niceincontact.com', 'na1');       // uses 'na1' config
 * ```
 */
export declare const saolaInit: (facadeUrl: string, area: string) => Promise<void>;
