import { __awaiter } from "tslib";
/* eslint-disable no-console */
import { init as initSaola } from '@saola.ai/browser';
const ANALYTICS_CONFIG_PATH = '/cxone-fe-config/configuration/analytics_configuration.json';
const NON_PROD_ENVS = ['dev', 'test', 'staging', 'perf'];
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
export const getSaolaClusterKey = (facadeUrl, area) => {
    const hostname = facadeUrl.replace(/^https?:\/\//, '');
    const envMatch = hostname.match(new RegExp(`\\.(${NON_PROD_ENVS.join('|')})\\.`));
    if (envMatch) {
        return envMatch[1];
    }
    return area;
};
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
export const saolaInit = (facadeUrl, area) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const configUrl = `${facadeUrl}${ANALYTICS_CONFIG_PATH}`;
        const analyticConfigs = yield fetch(configUrl);
        if (!analyticConfigs.ok) {
            console.error('Saola: Failed to fetch analytics configuration', analyticConfigs === null || analyticConfigs === void 0 ? void 0 : analyticConfigs.status);
            return;
        }
        const config = yield analyticConfigs.json();
        const clusterKey = getSaolaClusterKey(facadeUrl, area);
        const saolaConfig = (_a = config === null || config === void 0 ? void 0 : config[clusterKey]) === null || _a === void 0 ? void 0 : _a.saola;
        if (!(saolaConfig === null || saolaConfig === void 0 ? void 0 : saolaConfig.enabled)) {
            return;
        }
        const accountId = saolaConfig === null || saolaConfig === void 0 ? void 0 : saolaConfig.accountId;
        if (accountId) {
            initSaola(accountId);
        }
        else {
            console.error('Saola: accountId not found in analytics configuration for cluster:', clusterKey);
        }
    }
    catch (error) {
        console.error('Saola: Error during initialization', error);
    }
});
//# sourceMappingURL=saola.js.map