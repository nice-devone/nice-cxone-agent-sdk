import { CXoneAuth } from '@nice-devone/auth-sdk';
import { Logger, HttpUtilService, HttpClient, UrlUtilsService, ApiUriConstants, LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
/**
 * Class to perform get Agent Details
 */
export class AgentDetailService {
    /**
       * Create instance of CXoneAuth
       * ```
       * @example
       * const agentDetailService = new AgentDetailService();
       * ```
       */
    constructor() {
        this.logger = new Logger('SDK', 'AgentDetailService');
        this.utilService = new HttpUtilService();
        this.urlUtilsService = new UrlUtilsService();
        this.auth = CXoneAuth.instance;
    }
    /**
       * Used to get the agent details based on the agent id
       * @param agentId - agent id to fetch the skill details
       * @example -
       * ```
       * this.agentDetailService.getAgentInfoByAgentId("123456");
       * ```
       */
    getAgentInfoByAgentId(agentId) {
        return new Promise((resolve, reject) => {
            const agentDetailsFromStorage = LocalStorageHelper.getItem(StorageKeys.AGENT_DETAILS, true);
            if (!agentDetailsFromStorage || (+agentId !== agentDetailsFromStorage[0].agentId)) {
                const requiredAttributes = [
                    'agentId', 'firstName', 'lastName', 'maxConcurrentChats', 'useTeamMaxConcurrentChats',
                    'maxEmailAutoParkingLimit', 'useTeamEmailAutoParkingLimit', 'phoneRefusalTimeout'
                ];
                const requestParams = {
                    fields: requiredAttributes.join(','),
                };
                const token = this.auth.getAuthToken();
                const reqInit = this.utilService.initHeader(token.accessToken, 'application/json');
                const cxOneConfig = this.auth.getCXoneConfig();
                let agentUrl = cxOneConfig.acdApiBaseUri + ApiUriConstants.GET_AGENT_WITH_AGENT_ID.replace('{agentId}', agentId);
                agentUrl = this.urlUtilsService.appendQueryString(agentUrl, requestParams);
                HttpClient.get(agentUrl, reqInit).then((response) => {
                    const agentDetails = response.data.agents;
                    this.logger.info('getAgentInfoById', 'agent details by using agent id' + agentDetails);
                    if (!agentDetailsFromStorage) {
                        LocalStorageHelper.setItem(StorageKeys.AGENT_DETAILS, JSON.stringify(agentDetails));
                    }
                    resolve(agentDetails);
                }, (error) => {
                    this.logger.error('getAgentInfoById', 'Error while getting agent details using agent ID: ' + agentId + '.' + error.toString());
                    reject(error);
                });
            }
            else {
                this.logger.info('getAgentDetails', 'Get agent details from storage');
                resolve(agentDetailsFromStorage);
            }
        });
    }
}
//# sourceMappingURL=agent-details-service.js.map