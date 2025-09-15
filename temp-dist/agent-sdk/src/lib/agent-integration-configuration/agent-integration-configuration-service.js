import { CXoneAuth } from '@nice-devone/auth-sdk';
import { Logger, HttpClient, HttpUtilService, ApiUriConstants, } from '@nice-devone/core-sdk';
/**
 * Class to perform studio action services
 */
export class AgentIntegrationConfigurationService {
    /**
     * @example
     */
    constructor() {
        this.logger = new Logger('agent-sdk', 'AgentIntegrationConfigurationService');
        this.utilService = new HttpUtilService();
        this.auth = CXoneAuth.instance;
    }
    /**
     * Method to get studio action configuration
     * @returns - studio action configuration
     * ```
     * @example
     * getConfigurations()
     * ```
     */
    getConfigurations(token) {
        return new Promise((resolve, reject) => {
            this.logger.info('getConfigurations', 'Get configurations invoked');
            const baseUrl = this.auth.getCXoneConfig().acdApiBaseUri;
            const reqInit = this.utilService.initHeader(token, 'application/json');
            const url = baseUrl + ApiUriConstants.GET_AGENT_INTEGRATION_CONFIGURATION_URI + '?status=active';
            HttpClient.get(url, reqInit).then((resp) => {
                this.logger.info('getConfigurations', 'Get configurations success');
                resolve(resp.data);
            }, (error) => {
                this.logger.info('getConfigurations', 'Get configurations failed' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * Method to get studio action workflow data
     * @returns - studio action workflow data
     * ```
     * @example
     * getConfigurationWorkflows('01899438-147f-433b-945b-f1fde6d91877')
     * ```
     */
    getConfigurationWorkflows(configId, token) {
        this.logger.info('getConfigurationWorkflows', 'Get workflow invoked');
        const baseUrl = this.auth.getCXoneConfig().acdApiBaseUri;
        const reqInit = this.utilService.initHeader(token, 'application/json');
        const url = baseUrl +
            ApiUriConstants.GET_AGENT_INTEGRATION_WORKFLOW_URI.replace('{configurationId}', configId);
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((resp) => {
                this.logger.info('getConfigurationWorkflows', 'Get workflows success');
                resolve(resp.data);
            }, (error) => {
                this.logger.info('getConfigurationWorkflows', 'Get workflow failed' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * Method to get studio action data mappings data
     * @returns - studio action workflow data
     * ```
     * @example
     * getDataMappings('01899438-147f-433b-945b-f1fde6d91877')
     * ```
     */
    getDataMappings(configId, token) {
        this.logger.info('getDataMappings', 'Get DataMappings invoked');
        const baseUrl = this.auth.getCXoneConfig().acdApiBaseUri;
        const reqInit = this.utilService.initHeader(token, 'application/json');
        const url = baseUrl +
            ApiUriConstants.GET_AGENT_INTEGRATION_DATA_MAPPING_URI.replace('{configurationId}', configId);
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((resp) => {
                this.logger.info('getDataMappings', 'Get data mappings success');
                resolve(resp.data);
            }, (error) => {
                this.logger.info('getDataMappings', 'Get DataMappings failed' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * Method to get studio action dynamic data mappings data
     * @returns - studio action workflow data
     * ```
     * @example
     * getDynamicDataMappings('01899438-147f-433b-945b-f1fde6d91877')
     * ```
     */
    getDynamicDataMappings(configId, token) {
        this.logger.info('getDynamicDataMappings', 'Get DataMappings invoked');
        const baseUrl = this.auth.getCXoneConfig().acdApiBaseUri;
        const reqInit = this.utilService.initHeader(token, 'application/json');
        const url = baseUrl +
            ApiUriConstants.GET_AGENT_INTEGRATION_DYNAMIC_DATA_MAPPING_URI.replace('{configurationId}', configId);
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((resp) => {
                this.logger.info('getDynamicDataMappings', 'Get dynamic data mappings success');
                resolve(resp.data);
            }, (error) => {
                this.logger.info('getDynamicDataMappings', 'Get Dynamic DataMappings failed' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * Method to get studio action workflow data
     * @returns - studio action workflow data
     * ```
     * @example
     * getWorkflowsEntities('01899438-147f-433b-945b-f1fde6d91877')
     * ```
     */
    getWorkflowsEntities(configId, token) {
        this.logger.info('getWorkflowEntities', 'Get workflow entity');
        const baseUrl = this.auth.getCXoneConfig().acdApiBaseUri;
        const reqInit = this.utilService.initHeader(token, 'application/json');
        const url = baseUrl +
            ApiUriConstants.GET_AGENT_INTEGRATION_WORKFLOW_ENTITIES_URI.replace('{configurationId}', configId);
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((resp) => {
                this.logger.info('getWorkflowEntities', 'Get Entity success');
                resolve(resp.data);
            }, (error) => {
                this.logger.info('getWorkflowEntities', 'Get entity failed' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * Method to get studio action workflow data
     * @returns - studio action workflow data
     * ```
     * @example
     * getWorkflowsEntitiesFields('01899438-147f-433b-945b-f1fde6d91877')
     * ```
     */
    getWorkflowsEntitiesFields(configId, token, entityName) {
        this.logger.info('getWorkflowEntitiesfields', 'Get workflow entity fields');
        const baseUrl = this.auth.getCXoneConfig().acdApiBaseUri;
        const reqInit = this.utilService.initHeader(token, 'application/json');
        const url = baseUrl +
            ApiUriConstants.GET_AGENT_INTEGRATION_WORKFLOW_ENTITIES_FIELDS_URI.replace('{configurationId}', configId).replace('{entityName}', entityName);
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((resp) => {
                this.logger.info('getWorkflowsEntitiesFields', 'Get Entity success');
                resolve(resp.data);
            }, (error) => {
                this.logger.info('getWorkflowsEntitiesFields', 'Get entity failed' + JSON.stringify(error));
                reject(error);
            });
        });
    }
}
//# sourceMappingURL=agent-integration-configuration-service.js.map