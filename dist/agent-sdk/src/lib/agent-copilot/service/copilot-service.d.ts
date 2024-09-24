import { CXoneAuth } from '@nice-devone/auth-sdk';
import { AgentCopilotSearchRequest, AgentCopilotCacheElement, CopilotMessageData, AgentAssistConfig } from '@nice-devone/common-sdk';
import { Logger, HttpUtilService, HttpRequestInit, ValidationUtils } from '@nice-devone/core-sdk';
declare type CcfCopilotData = {
    [caseId: string]: CopilotMessageData;
};
/**
 * Class for copilot base service
 */
export declare class CopilotService {
    protected logger: Logger;
    protected utilService: HttpUtilService;
    protected validationUtilService: ValidationUtils;
    auth: CXoneAuth;
    private AGENT_COPILOT_BASE_URI;
    private AGENT_COPILOT_BASE_URI_V2;
    private AGENT_COPILOT_SEARCH;
    private AGENT_COPILOT_FINAL_SUMMARY;
    private AGENT_COPILOT_GET_ALL_ADAPTIVE_CARDS_SCHEMAS;
    private AGENT_COPILOT_GET_ADAPTIVE_CARD_SCHEMA;
    private AGENT_COPILOT_HEALTH_CHECK;
    private AGENT_COPILOT_ENABLEMENT_FOR_CONTACT;
    private AGENT_COPILOT_AGENT_ASSIST_HUB_CONFIG;
    private AGENT_COPILOT_EMAIL_APIS;
    private aahConfigStore;
    /**
     * Create instance of CXoneAuth
     * ```
     * @example
     * const copilotService = new CopilotService();
     * ```
     */
    constructor();
    /**
     * @returns base url for ACP backend
     * @example getBaseHttpRequest()
     */
    getBaseUrlForAcp: () => string;
    /**
     *  @param payload - additional payload
     * @returns basic http request for ACP backend
     * @example getBaseHttpRequest()
     */
    getBaseHttpRequest: (payload: any) => HttpRequestInit;
    /**
     * @returns payload
     * @example commonPayload()
     */
    basePayload: () => {
        agentId: string;
        tenantId: string;
        contactId: any;
        idToken: string;
    };
    /**
     * Used to get the copilot info by search text
     * @param connectionId - connection id to send with the data
     * @example -
     * ```
     * copilotService.generateFinalSummary("some_connectionId");
     * ```
     */
    generateFinalSummary(contactId: string, status: string): Promise<unknown>;
    /**
     * Used to get the copilot info by search text
     * @param searchText - Agent search query
     * @param activeContactId - contactId/caseId
     * @example -
     * ```
     * copilotService.search("test",'1234');
     * ```
     */
    search(searchText: string, activeContactId: string): Promise<AgentCopilotSearchRequest>;
    /**
     * Used to get the copilot adaptive card schema by cardType
     * @example -
     * ```
     * copilotService.fetchCopilotAllAdaptiveCardSchemas();
     * ```
     */
    fetchCopilotAllAdaptiveCardSchemas: () => Promise<unknown>;
    /**
     * Used to get the copilot adaptive card schema by cardType
     * @param cardType - type of adaptive card
     * @param mediaType - type of media channel
     * @example -
     * ```
     * copilotService.fetchCopilotAdaptiveCardSchema("sentimentAndReason", "Voice");
     * ```
     */
    fetchCopilotAdaptiveCardSchema: (cardType: string, mediaType: string) => Promise<unknown>;
    /**
     * Used to set essential copilot data
     * @param contactId - contact id to fetch the data from
     * @param elementToAdd - element to add to the local storage
     * @example -
     * ```
     * copilotService.setLsDataByAgentId("123", { sentimentAndReason: [] });
     * ```
     */
    setLsDataByAgentId(contactId: string, elementToAdd: AgentCopilotCacheElement): void;
    /**
     * Used to get local storage data by the agentId
     * @example -
     * ```
     * copilotService.getLsDataByAgentId();
     * ```
     */
    getLsDataByAgentId(): any;
    /**
     * Used to put copilot data by the agentId into indexdb
     * @example -
     * ```
     * copilotService.setCopilotIndexDb();
     * ```
     */
    setCopilotIndexDb: (updatedReduxSlice: CcfCopilotData) => Promise<void>;
    /**
     * Used to get copilot data by the agentId into indexdb
     * @example -
     * ```
     * copilotService.getCopilotIndexDb();
     * ```
     */
    getCopilotIndexDb: () => Promise<{
        [caseId: string]: CopilotMessageData;
    }>;
    /**
     * Used to remove caseId record from copilot indexdb data
     * @example -
     * ```
     * copilotService.removeCaseIdFromCopilotIndexDb('1695828916775981777');
     * ```
     */
    removeCaseIdFromCopilotIndexDb: (caseId: string) => Promise<void>;
    /**
     * Used to put copilot redux slice data into indexdb
     * @example -
     * ```
     * copilotService.setCopilotIndexDb(copilotReduxSlice);
     * ```
     */
    addAdaptiveCardSchemaToIndexDB: (copilotReduxSlice: CcfCopilotData) => Promise<void>;
    /**
     * Used to get the copilot health
     * @param contactId - contact Id of current active contact
     * @example -
     * ```
     * copilotService.healthCheck('1234');
     * ```
     */
    healthCheck: (contactId: string) => Promise<unknown>;
    /**
     * Used to get first name of agent logged in
     * @example -
     * ```
     * copilotService.getAgentFirstName();
     * ```
     */
    getAgentFirstName: () => any;
    /**
     * Used to set AAH config of contactId in localStorage
     * @param contactId - contact Id for which AAH config needs to be stored
     * @param aahConfig - AAH config for contactId
     * @example -
     * ```
     * copilotService.setAgentAssistConfig('123123', {ContactId : '123123',});
     * ```
     */
    setAgentAssistConfig: (contactId: string, aahConfig: AgentAssistConfig) => void;
    /**
     * Used to get AAH config for the contactId
     * @param contactId - contact Id
     * @param isObjectFlag - if the value fetched is object or not
     * @example -
     * ```
     * copilotService.getAgentAssistConfig('12321',false);
     * ```
     */
    getAgentAssistConfig: (contactId: string, isObjectFlag?: boolean) => any;
    /**
     * Used to get AAH config for the contactIds from redis cache
     * @param contactIds - list of contact Id
     * @example -
     * ```
     * copilotService.fetchAgentAssistConfigFromCache(['12321']);
     * ```
     */
    fetchAgentAssistConfigFromCache: (contactIds: string[]) => Promise<AgentAssistConfig>;
    /**
     * Used to get AAH config for the contactId
     * @param contactId -  contact Id
     * @example -
     * ```
     * copilotService.retriveAgentAssistConfig('12321');
     * ```
     */
    retriveAgentAssistConfig: (contactId: string) => Promise<AgentAssistConfig>;
    /**
     * Used to store AAH config for the contactId in browser memory by pulling from redis cache, if not already available
     * @param contactId - contact Id
     * @example -
     * ```
     * copilotService.storeAgentAssistConfig('12321');
     * ```
     */
    storeAgentAssistConfig: (contactId: string) => Promise<any>;
    /**
     * Used to get the last generated list of topics for the contact id
     * @param contactId - contact Id
     * @example -
     * ```
     * copilotService.getLastGeneratedTopics('12321');
     * ```
     */
    getLastGeneratedTopics: (contactId: string) => Promise<unknown>;
    /**
      * Used to get the draft email by contactId and uniqueEmailId
      * @param contactId - contact Id
      * @param uniqueEmailId - unique email Id
      * @example -
      * ```
      * copilotService.getDraftEmail('12321', 'uniqueEmailId');
      * ```
      */
    getDraftEmail: (contactId: string, uniqueEmailId: string) => Promise<unknown>;
    /**
      * Used to get the draft email by contactId and uniqueEmailId
      * @param contactId - contact Id
      * @param emailIdentifier - unique email Id
      * @param topics - list of topics
      * @example -
      * ```
      * copilotService.generateEmail('12321', 'uniqueEmailId', [{topicId: '123', content: 'topicName'}]);
      * ```
      */
    generateEmail: (contactId: string, emailIdentifier: string, topics: {
        topicId: string;
        content: string;
    }[]) => Promise<string>;
}
export {};
