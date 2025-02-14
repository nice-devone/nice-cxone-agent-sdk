import { CXoneSdkError } from '@nice-devone/common-sdk';
import { AgentIntegrationConfigurationResult, AgentIntegrationWorkflowResult, AgentIntegrationDataMappingResult, AgentIntegrationWorkflowEntitiesFields, AgentIntegrationWorkflowEntities } from '@nice-devone/shared-apps-lib';
import { Logger, HttpUtilService } from '@nice-devone/core-sdk';
/**
 * Class to perform studio action services
 */
export declare class AgentIntegrationConfigurationService {
    protected logger: Logger;
    protected utilService: HttpUtilService;
    private auth;
    /**
     * @example
     */
    constructor();
    /**
     * Method to get studio action configuration
     * @returns - studio action configuration
     * ```
     * @example
     * getConfigurations()
     * ```
     */
    getConfigurations(token: string): Promise<AgentIntegrationConfigurationResult | CXoneSdkError>;
    /**
     * Method to get studio action workflow data
     * @returns - studio action workflow data
     * ```
     * @example
     * getConfigurationWorkflows('01899438-147f-433b-945b-f1fde6d91877')
     * ```
     */
    getConfigurationWorkflows(configId: string, token: string): Promise<AgentIntegrationWorkflowResult | CXoneSdkError>;
    /**
     * Method to get studio action data mappings data
     * @returns - studio action workflow data
     * ```
     * @example
     * getDataMappings('01899438-147f-433b-945b-f1fde6d91877')
     * ```
     */
    getDataMappings(configId: string, token: string): Promise<AgentIntegrationDataMappingResult | CXoneSdkError>;
    /**
     * Method to get studio action dynamic data mappings data
     * @returns - studio action workflow data
     * ```
     * @example
     * getDynamicDataMappings('01899438-147f-433b-945b-f1fde6d91877')
     * ```
     */
    getDynamicDataMappings(configId: string, token: string): Promise<AgentIntegrationDataMappingResult | CXoneSdkError>;
    /**
     * Method to get studio action workflow data
     * @returns - studio action workflow data
     * ```
     * @example
     * getWorkflowsEntities('01899438-147f-433b-945b-f1fde6d91877')
     * ```
     */
    getWorkflowsEntities(configId: string, token: string): Promise<AgentIntegrationWorkflowEntities | CXoneSdkError>;
    /**
     * Method to get studio action workflow data
     * @returns - studio action workflow data
     * ```
     * @example
     * getWorkflowsEntitiesFields('01899438-147f-433b-945b-f1fde6d91877')
     * ```
     */
    getWorkflowsEntitiesFields(configId: string, token: string, entityName: string): Promise<AgentIntegrationWorkflowEntitiesFields | CXoneSdkError>;
}
