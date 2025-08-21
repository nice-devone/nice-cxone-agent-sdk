import { CXoneAuth } from '@nice-devone/auth-sdk';
import { AgentCopilotSearchRequest, CopilotMessageData, CustomCopilotFilterTags, GuidanceFeedbackData, ContactFeedbackData, CopilotProfileConfig, ContactHistoryData, IntentConfig } from '@nice-devone/common-sdk';
import { Logger, HttpUtilService, HttpRequestInit, ValidationUtils } from '@nice-devone/core-sdk';
/**
 * Represents a collection of Copilot message data indexed by case ID.
 */
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
    private AGENT_COPILOT_HEALTH_CHECK;
    private AGENT_COPILOT_ENABLEMENT_FOR_CONTACT;
    private AGENT_COPILOT_AGENT_ASSIST_HUB_CONFIG;
    private AGENT_COPILOT_GET_ADAPTIVE_CARD_SCHEMAS;
    private AGENT_COPILOT_EMAIL_APIS;
    private PATH_GUIDANCE_FEEDBACK;
    private PATH_CONTACT_FEEDBACK;
    private PATH_KB_FILTER_UPDATE;
    private JOURNEY_SUMMARY;
    private FINAL_SUMMARY;
    private EDITED_SUMMARY;
    private TASK_ASSIST;
    private aahConfigStore;
    private AGENT_COPILOT_GET_ALL_ADAPTIVE_CARDS_SCHEMAS;
    private AGENT_COPILOT_GET_TASK_ASSIST_FORM_PREFILLED_DATA;
    private TASK_ASSIST_FORM_ADAPTIVE_CARD_SCHEMAS_URL;
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
     * Used to get the copilot adaptive card schema by cardType(all by default) and UI version
     * @param cxaVersion - branch name indicating UI version
     * @param cardType - type of adaptive card
     * ```
     * copilotService.fetchCopilotAdaptiveCardSchemasFromBucket('24.4.2', 'all');
     * ```
     */
    fetchCopilotAdaptiveCardSchemasFromBucket: (cxaVersion: string, cardType?: string) => Promise<unknown>;
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
    setAgentAssistConfig: (contactId: string, aahConfig: string) => void;
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
     * Used to get AAH config for the contactId
     * @param contactId -  contact Id
     * @example -
     * ```
     * copilotService.retriveAgentAssistConfig('12321');
     * ```
     */
    retriveAgentAssistConfig: (contactId: string, mediaType?: string, agentAssistId?: string) => Promise<CopilotProfileConfig>;
    /**
     * Used to store AAH config for the contactId in browser memory by pulling from redis cache, if not already available
     * @param contactId - contact Id
     * @param mediaType - media type for the contact
     * @param agentAssistId - agent assist ID
     * @example -
     * ```
     * copilotService.storeAgentAssistConfig('12321');
     * ```
     */
    storeAgentAssistConfig: (contactId: string, mediaType?: string, agentAssistId?: string) => Promise<any>;
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
    /**
     * Used to store the comprehensive feedback
     * @param feedbackData - list of all feedbacks given by the agent
     * @example -
     * ```
     * copilotService.sendGuidanceFeedback(feedbacks);
     * ```
     */
    sendGuidanceFeedback: (feedbackData: GuidanceFeedbackData[]) => Promise<unknown>;
    /**
     * Used to store the overall subcard feedback
     * @param contactFeedbackCard - contactFeedbackCard data given by the agent
     * @example -
     * ```
     * copilotService.sendContactFeedback({overallFeedbackTitle: "1234", feedback: "feedback"});
     * ```
     */
    sendContactFeedback: (contactFeedbackCard: ContactFeedbackData) => Promise<unknown>;
    /**
    * Use to process an editor command to get the Simplified/Rephrased/Expanded text in reponse
    * @param action - email action
    * @param context - editor text
    * @param selectedText - selected text from editor
    * @param contactId - contactId/caseId
    * @example -
    * ```
    * copilotService.processEditorCommand("Simplify",'this is test','test','1234');
    * ```
    */
    processEditorCommand(action: string, context: string, selectedText: string, contactId: string): Promise<string>;
    /**
    * Use to update copilot filters/ tag lists
    * @param copilotFilterTags - tags for filters
    * @param contactId - contactId/caseId
    * @example -
    * ```
    * copilotService.updateCopilotFilters([{name: 'planYear', default: ['2024'], selected: ['2024','2025]}],'1234');
    * ```
    */
    updateCopilotFilters(copilotFilterTags: Array<CustomCopilotFilterTags>, contactId: string): Promise<string>;
    /**
    * Use to get journey summary data
    * @param contactHistory - contact history of the contact
    * @param contactId - contactId/caseId
    * @param customerId - customerId
    * @param aahConfiguration - agent assist configuration
    * @param customerName - customer name
    * @example -
    * ```
    * copilotService.getJourneySummary([{contactNumber: '1234', channelType: 'Voice', contactDate: '2021-09-01', skill: 'skill', status: 'status'}],'1234','1234',{},'user');
    * ```
    */
    getJourneySummary(contactHistory: ContactHistoryData[], contactId: string, customerUid: string, aahConfiguration: CopilotProfileConfig, customerName: string): Promise<string>;
    /**
     * Used to fetch the generated final summary
     * @param connectionId - connection id to send with the data
     * @example -
     * ```
     * copilotService.fetchGeneratedFinalSummary("1234");
     * ```
     */
    fetchGeneratedFinalSummary(contactId: string): Promise<unknown>;
    /**
     * Used to get task response based on the intentName for a given contactId
     * @param intentConfig - intent config
     * @param contactId  - contact Id
     * @param taskSessionUid - task session unique id
     * @example -
     * ```
     * copilotService.getTaskResponse('Task intent name here', '12321');
     * ```
     */
    getTaskResponse(contactId: string, intentConfig: IntentConfig, formCapturedata?: Record<string, unknown>, taskSessionUid?: string): Promise<string>;
    /**
     * Used to get all copilot adaptive card schemas
     * @example -
     * ```
     * copilotService.fetchCopilotAllAdaptiveCardSchemas();
     * ```
     */
    fetchCopilotAllAdaptiveCardSchemas: () => Promise<unknown>;
    /**
   * Used to get task assist form schema based on the intentName
   * @param intentName - intent name
   * @param contactId  - contact Id
   * @example -
   * ```
   * copilotService.getTaskAssistFormSchema('Task intent name here','212324);
   * ```
   */
    getTaskAssistFormSchema(intentName: string, contactId: string): Promise<string>;
    /**
   * Used to get task assist form pre-filled data based on the intentName
   * @param intentConfig - intent config
   * @param contactId  - contact Id
   * @param objectId - objectId
   * @example -
   * ```
   * copilotService.getTaskAssistFormPreFilledData('Task intent name here');
   * ```
   */
    getTaskAssistFormPreFilledData(intentConfig: IntentConfig, contactId: string, objectId: string): Promise<string>;
    /**
     * Saves the edited summary for a given channel and contact number.
     * @param channel - The communication channel.
     * @param contactNumber - The contact number.
     * @param summary - The edited summary text.
     * @returns A promise that resolves with the response data.
     * @example
     * ```
     * copilotService.saveEditedSummary('Voice', 123456789, 'This is the edited summary text.');
     * ```
     */
    saveEditedSummary(channel: string, contactNumber: number, summary: string): Promise<string>;
}
export {};
