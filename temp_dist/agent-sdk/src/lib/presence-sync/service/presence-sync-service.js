import { ApiUriConstants, HttpClient, HttpUtilService, Logger, } from '@nice-devone/core-sdk';
import { CXonePartnerPresenceSyncRuleMapping, } from '@nice-devone/common-sdk';
import { Subject } from 'rxjs';
import { CXoneAuth } from '@nice-devone/auth-sdk';
/**
 * Class to get the presence sync rules to sync the agent status
 */
export class PresenceSyncService {
    /**
     *
     * ```
     * @example
     * const presenceSync = new PresenceSyncService();
     * ```
     */
    constructor() {
        this.logger = new Logger('SDK', 'PresenceSyncService');
        this.utilService = new HttpUtilService();
        this.agentStateSubject = new Subject();
        this.auth = CXoneAuth.instance;
    }
    /**
     * Service method to get presence sync rule
     * @param partnerAccountId - partner account id
     * @param partnerName - partner account name
     * @returns - response from the getPresenceSyncRule api
     * @example
     * ```
     * getPresenceSyncRule('partnerAccountId', 'partnerName')
     * ```
     */
    getPresenceSyncRule(partnerAccountId, partnerName) {
        const getAgentStateUri = ApiUriConstants.GET_PRESENCE_SYNC_RULE.replace('{partnerName}', partnerName).replace('{partnerId}', partnerAccountId);
        const cxOneConfig = this.auth.getCXoneConfig();
        const url = cxOneConfig.presenceSyncApiUrl + getAgentStateUri;
        const token = this.auth.getAuthToken();
        const reqInit = this.utilService.initHeader(token.accessToken, 'application/json');
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                this.logger.info('getPresenceSyncRule', 'getPresenceSyncRule success:- ' + response.toString());
                const partnerRule = new CXonePartnerPresenceSyncRuleMapping();
                partnerRule.parse(response.data);
                resolve(partnerRule);
            }, (error) => {
                this.logger.error('getPresenceSyncRule', 'getPresenceSyncRule failed:-' + error.toString());
                reject(error);
            });
        });
    }
}
//# sourceMappingURL=presence-sync-service.js.map