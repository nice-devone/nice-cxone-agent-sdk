import { __awaiter, __rest } from "tslib";
import { CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import { CXoneSdkError, MediaType, AgentCopilotContentType, CXoneSdkErrorType } from '@nice-devone/common-sdk';
import { Logger, HttpUtilService, StorageKeys, HttpClient, LocalStorageHelper, dbInstance, IndexDBStoreNames, IndexDBKeyNames, clearIndexDbKey, ValidationUtils } from '@nice-devone/core-sdk';
import { Feedback } from '../../enum/feedback';
/**
 * Class for copilot base service
 */
export class CopilotService {
    /**
     * Create instance of CXoneAuth
     * ```
     * @example
     * const copilotService = new CopilotService();
     * ```
     */
    constructor() {
        this.logger = new Logger('agent-sdk', 'CopilotService');
        this.utilService = new HttpUtilService();
        this.validationUtilService = new ValidationUtils();
        this.AGENT_COPILOT_BASE_URI = '/agentcopilotapi/v1/';
        this.AGENT_COPILOT_BASE_URI_V2 = '/agentcopilotapi/v2/';
        this.AGENT_COPILOT_SEARCH = this.AGENT_COPILOT_BASE_URI + 'agent-search';
        this.AGENT_COPILOT_FINAL_SUMMARY = this.AGENT_COPILOT_BASE_URI + 'final-summary';
        this.AGENT_COPILOT_GET_ALL_ADAPTIVE_CARDS_SCHEMAS = this.AGENT_COPILOT_BASE_URI + 'adaptive-card/get-all-adaptive-cards';
        this.AGENT_COPILOT_GET_ADAPTIVE_CARD_SCHEMA = this.AGENT_COPILOT_BASE_URI + 'adaptive-card?cardType={cardType}&mediaType={mediaType}';
        this.AGENT_COPILOT_HEALTH_CHECK = this.AGENT_COPILOT_BASE_URI + 'copilot-health';
        this.AGENT_COPILOT_ENABLEMENT_FOR_CONTACT = this.AGENT_COPILOT_BASE_URI + 'license/copilot-enabled';
        this.AGENT_COPILOT_AGENT_ASSIST_HUB_CONFIG = this.AGENT_COPILOT_BASE_URI_V2 + 'license/retrieve-aah-config';
        this.AGENT_COPILOT_EMAIL_APIS = {
            GET_LAST_GENERATED_TOPICS: this.AGENT_COPILOT_BASE_URI + 'email/topics?contactId={contactId}',
            GET_DRAFT_EMAIL: this.AGENT_COPILOT_BASE_URI + 'email/draft?contactId={contactId}&uniqueEmailId={uniqueEmailId}',
            GENERATE_EMAIL: this.AGENT_COPILOT_BASE_URI + 'email/draft',
            EMAIL_ACTION: this.AGENT_COPILOT_BASE_URI + 'email/action',
        };
        this.PATH_GUIDANCE_FEEDBACK = '/agentcopilotapi/v1/interaction-feedback/kbAnswers';
        this.PATH_CONTACT_FEEDBACK = '/agentcopilotapi/v1/interaction-feedback/interaction';
        this.PATH_KB_FILTER_UPDATE = '/agent-copilot/v1/kb-filter/update';
        this.JOURNEY_SUMMARY = '/agent-copilot/v1/journey-summary';
        this.aahConfigStore = {};
        /**
         * @returns base url for ACP backend
         * @example getBaseHttpRequest()
         */
        this.getBaseUrlForAcp = () => {
            // TODO update once copilotUrl is confirmed
            const cxOneConfig = this.auth.getCXoneConfig();
            return cxOneConfig.apiFacadeBaseUri;
        };
        /**
         *  @param payload - additional payload
         * @returns basic http request for ACP backend
         * @example getBaseHttpRequest()
         */
        this.getBaseHttpRequest = (payload) => {
            const token = this.auth.getAuthToken();
            const reqInit = {
                headers: this.utilService.initHeader(token.accessToken, 'application/json').headers,
                body: Object.assign(Object.assign({}, this.basePayload()), payload),
            };
            return reqInit;
        };
        /**
         * @returns payload
         * @example commonPayload()
         */
        this.basePayload = () => {
            const { idToken } = this.auth.getAuthToken();
            const payload = {
                contactId: LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_ID) || '',
                idToken,
            };
            return payload;
        };
        /**
         * Used to get the copilot adaptive card schema by cardType
         * @example -
         * ```
         * copilotService.fetchCopilotAllAdaptiveCardSchemas();
         * ```
         */
        this.fetchCopilotAllAdaptiveCardSchemas = () => {
            return new Promise((resolve, reject) => {
                {
                    const cxaClientVersion = LocalStorageHelper.getItem('agent_settings', true).cxaClientVersion;
                    const reqInit = this.getBaseHttpRequest({
                        cxaClientVersion,
                        version: 'v2', // version is added for the new schema with localization strings
                    });
                    const baseUrl = this.getBaseUrlForAcp();
                    const adaptiveCardUrl = baseUrl + this.AGENT_COPILOT_GET_ALL_ADAPTIVE_CARDS_SCHEMAS;
                    HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(adaptiveCardUrl, reqInit).then((response) => {
                        LocalStorageHelper.setItem(StorageKeys.AGENT_COPILOT_ADAPTIVE_CARD_SCHEMAS, response.data);
                        resolve(response);
                    }, (error) => {
                        const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to fetch all copilot adaptive card schemas', error);
                        this.logger.error('fetchCopilotAllAdaptiveCardSchemas', errorResponse.toString());
                        reject(errorResponse);
                    });
                }
            });
        };
        /**
         * Used to get the copilot adaptive card schema by cardType
         * @param cardType - type of adaptive card
         * @param mediaType - type of media channel
         * @example -
         * ```
         * copilotService.fetchCopilotAdaptiveCardSchema("sentimentAndReason", "Voice");
         * ```
         */
        this.fetchCopilotAdaptiveCardSchema = (cardType, mediaType) => {
            return new Promise((resolve, reject) => {
                {
                    const reqInit = this.getBaseHttpRequest({});
                    const baseUrl = this.getBaseUrlForAcp();
                    const adaptiveCardUrl = baseUrl + this.AGENT_COPILOT_GET_ADAPTIVE_CARD_SCHEMA.replace('{cardType}', cardType).replace('{mediaType}', mediaType);
                    HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.get(adaptiveCardUrl, reqInit).then((response) => {
                        let schemaKeyName = `${cardType}`;
                        const existingApativeCardSchemas = LocalStorageHelper.getItem(StorageKeys.AGENT_COPILOT_ADAPTIVE_CARD_SCHEMAS, true);
                        let schemaToAdd = existingApativeCardSchemas ? Object.assign({}, existingApativeCardSchemas) : {};
                        if (mediaType === MediaType.VOICE && [AgentCopilotContentType.KB_COMBO].includes(cardType)) {
                            schemaKeyName += `_${mediaType}`;
                        }
                        schemaToAdd = Object.assign(Object.assign({}, schemaToAdd), { [schemaKeyName]: response.data });
                        LocalStorageHelper.setItem(StorageKeys.AGENT_COPILOT_ADAPTIVE_CARD_SCHEMAS, schemaToAdd);
                        resolve(response);
                    }, (error) => {
                        const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to fetch adaptive card schema', error);
                        this.logger.error('fetchCopilotAdaptiveCardSchema', errorResponse.toString());
                        reject(errorResponse);
                    });
                }
            });
        };
        /**
         * Used to put copilot data by the agentId into indexdb
         * @example -
         * ```
         * copilotService.setCopilotIndexDb();
         * ```
         */
        this.setCopilotIndexDb = (updatedReduxSlice) => __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.COPILOT, updatedReduxSlice, IndexDBKeyNames.COPILOT);
        });
        /**
         * Used to get copilot data by the agentId into indexdb
         * @example -
         * ```
         * copilotService.getCopilotIndexDb();
         * ```
         */
        this.getCopilotIndexDb = () => __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const copilotData = yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.COPILOT, IndexDBKeyNames.COPILOT));
            return copilotData;
        });
        /**
         * Used to remove caseId record from copilot indexdb data
         * @example -
         * ```
         * copilotService.removeCaseIdFromCopilotIndexDb('1695828916775981777');
         * ```
         */
        this.removeCaseIdFromCopilotIndexDb = (caseId) => __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const copilotData = yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.COPILOT, IndexDBKeyNames.COPILOT));
            if (copilotData && copilotData[caseId]) {
                delete copilotData[caseId];
                yield clearIndexDbKey(IndexDBStoreNames.COPILOT, IndexDBKeyNames.COPILOT);
                db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.COPILOT, Object.assign({}, copilotData), IndexDBKeyNames.COPILOT);
            }
        });
        /**
         * Used to put copilot redux slice data into indexdb
         * @example -
         * ```
         * copilotService.setCopilotIndexDb(copilotReduxSlice);
         * ```
         */
        this.addAdaptiveCardSchemaToIndexDB = (copilotReduxSlice) => __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.COPILOT, copilotReduxSlice, IndexDBKeyNames.COPILOT);
        });
        /**
         * Used to get the copilot health
         * @param contactId - contact Id of current active contact
         * @example -
         * ```
         * copilotService.healthCheck('1234');
         * ```
         */
        this.healthCheck = (contactId) => {
            return new Promise((resolve, reject) => {
                var _a;
                const reqInit = this.getBaseHttpRequest({ 'Content-Type': 'application/json' });
                const userInfo = CXoneUser.instance.getUserInfo();
                const busNo = userInfo === null || userInfo === void 0 ? void 0 : userInfo.icBUId;
                reqInit.body = Object.assign(Object.assign({}, reqInit === null || reqInit === void 0 ? void 0 : reqInit.body), { busNo });
                if (contactId !== '') {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    ((_a = reqInit === null || reqInit === void 0 ? void 0 : reqInit.body) === null || _a === void 0 ? void 0 : _a.contactId) === contactId;
                }
                const baseUrl = this.getBaseUrlForAcp();
                const healthCheckUrl = baseUrl + this.AGENT_COPILOT_HEALTH_CHECK;
                HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(healthCheckUrl, reqInit).then((response) => {
                    const resp = response === null || response === void 0 ? void 0 : response.data;
                    resolve(resp);
                }, (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to invoke health check', error);
                    this.logger.error('healthCheck', errorResponse.toString());
                    reject(errorResponse);
                });
            });
        };
        /**
         * Used to get first name of agent logged in
         * @example -
         * ```
         * copilotService.getAgentFirstName();
         * ```
         */
        this.getAgentFirstName = () => {
            return LocalStorageHelper.getItem(StorageKeys.USER_INFO, true)['firstName'] || '';
        };
        /**
         * Used to set AAH config of contactId in localStorage
         * @param contactId - contact Id for which AAH config needs to be stored
         * @param aahConfig - AAH config for contactId
         * @example -
         * ```
         * copilotService.setAgentAssistConfig('123123', {ContactId : '123123',});
         * ```
         */
        this.setAgentAssistConfig = (contactId, aahConfig) => {
            const acpConfig = JSON.parse(aahConfig || '{}');
            const _a = acpConfig.Params, { perSuggestionSubcards, positiveTag, negativeTag, positiveComment, negativeComment, positiveFeedback, negativeFeedback } = _a, restParams = __rest(_a, ["perSuggestionSubcards", "positiveTag", "negativeTag", "positiveComment", "negativeComment", "positiveFeedback", "negativeFeedback"]);
            const extendedAgentAssistConfig = Object.assign(Object.assign({}, acpConfig), { Params: Object.assign(Object.assign({}, restParams), { guidanceFeedbackCards: perSuggestionSubcards, positiveTagEnabled: positiveTag, negativeTagEnabled: negativeTag, positiveCommentEnabled: positiveComment, negativeCommentEnabled: negativeComment, positiveFeedbackEnabled: positiveFeedback, negativeFeedbackEnabled: negativeFeedback }) });
            this.aahConfigStore[contactId] = extendedAgentAssistConfig;
            LocalStorageHelper.setItem(`${contactId}_agentAssistAppConfig`, extendedAgentAssistConfig);
        };
        /**
         * Used to get AAH config for the contactId
         * @param contactId - contact Id
         * @param isObjectFlag - if the value fetched is object or not
         * @example -
         * ```
         * copilotService.getAgentAssistConfig('12321',false);
         * ```
         */
        this.getAgentAssistConfig = (contactId, isObjectFlag = false) => {
            const aahConfig = this.aahConfigStore[contactId];
            if (aahConfig && this.validationUtilService.isValidObject(aahConfig)) {
                return aahConfig;
            }
            return LocalStorageHelper.getItem(`${contactId}_agentAssistAppConfig`, isObjectFlag);
        };
        /**
         * Used to get AAH config for the contactId
         * @param contactId -  contact Id
         * @example -
         * ```
         * copilotService.retriveAgentAssistConfig('12321');
         * ```
         */
        this.retriveAgentAssistConfig = (contactId) => {
            return new Promise((resolve, reject) => {
                const reqInit = this.getBaseHttpRequest({
                    contactIds: contactId,
                    contactId,
                });
                const baseUrl = this.getBaseUrlForAcp();
                const apiUrl = baseUrl + this.AGENT_COPILOT_AGENT_ASSIST_HUB_CONFIG;
                HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(apiUrl, reqInit).then((response) => {
                    var _a;
                    if (response.status === 200 && ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.success) !== false && !this.aahConfigStore[contactId]) {
                        const aahConfig = JSON.stringify({
                            AppTitle: 'Enlighten Agent Copilot',
                            ContactId: contactId,
                            Params: Object.assign({ providerId: 'agentCopilot' }, response === null || response === void 0 ? void 0 : response.data),
                        });
                        this.setAgentAssistConfig(contactId, aahConfig);
                    }
                    resolve(this.aahConfigStore[contactId]);
                }, (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to retrieve agent assist config', error);
                    this.logger.error('retriveAgentAssistConfig', errorResponse.toString());
                    reject(errorResponse);
                });
            });
        };
        /**
         * Used to store AAH config for the contactId in browser memory by pulling from redis cache, if not already available
         * @param contactId - contact Id
         * @example -
         * ```
         * copilotService.storeAgentAssistConfig('12321');
         * ```
         */
        this.storeAgentAssistConfig = (contactId) => __awaiter(this, void 0, void 0, function* () {
            let aahConfig = this.getAgentAssistConfig(contactId, true);
            if (!aahConfig) {
                aahConfig = yield this.retriveAgentAssistConfig(contactId);
            }
            return aahConfig;
        });
        /**
         * Used to get the last generated list of topics for the contact id
         * @param contactId - contact Id
         * @example -
         * ```
         * copilotService.getLastGeneratedTopics('12321');
         * ```
         */
        this.getLastGeneratedTopics = (contactId) => {
            return new Promise((resolve, reject) => {
                const reqInit = this.getBaseHttpRequest({});
                const baseUrl = this.getBaseUrlForAcp();
                const adaptiveCardUrl = baseUrl + this.AGENT_COPILOT_EMAIL_APIS.GET_LAST_GENERATED_TOPICS.replace('{contactId}', contactId);
                HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.get(adaptiveCardUrl, reqInit).then((response) => {
                    resolve(response);
                }, (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to get last generated topics', error);
                    this.logger.error('getLastGeneratedTopics', errorResponse.toString());
                    reject(errorResponse);
                });
            });
        };
        /**
          * Used to get the draft email by contactId and uniqueEmailId
          * @param contactId - contact Id
          * @param uniqueEmailId - unique email Id
          * @example -
          * ```
          * copilotService.getDraftEmail('12321', 'uniqueEmailId');
          * ```
          */
        this.getDraftEmail = (contactId, uniqueEmailId) => {
            return new Promise((resolve, reject) => {
                const reqInit = this.getBaseHttpRequest({});
                const baseUrl = this.getBaseUrlForAcp();
                const draftEmailUrl = baseUrl + this.AGENT_COPILOT_EMAIL_APIS.GET_DRAFT_EMAIL.replace('{contactId}', contactId).replace('{uniqueEmailId}', uniqueEmailId);
                HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.get(draftEmailUrl, reqInit).then((response) => {
                    resolve(response.data);
                }, (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to get draft email', error);
                    this.logger.error('getDraftEmail', errorResponse.toString());
                    reject(errorResponse);
                });
            });
        };
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
        this.generateEmail = (contactId, emailIdentifier, topics) => {
            return new Promise((resolve, reject) => {
                const reqInit = this.getBaseHttpRequest({
                    contactId,
                    contactNo: contactId,
                    emailIdentifier,
                    topics,
                });
                const baseUrl = this.getBaseUrlForAcp();
                const apiUrl = baseUrl + this.AGENT_COPILOT_EMAIL_APIS.GENERATE_EMAIL;
                HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(apiUrl, reqInit).then((response) => {
                    resolve(response.data);
                }, (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to generate email', error);
                    this.logger.error('generateEmail', errorResponse.toString());
                    reject(errorResponse);
                });
            });
        };
        /**
         * Used to store the comprehensive feedback
         * @param feedbackData - list of all feedbacks given by the agent
         * @example -
         * ```
         * copilotService.sendGuidanceFeedback(feedbacks);
         * ```
         */
        this.sendGuidanceFeedback = (feedbackData) => {
            const updatedFeedbackData = feedbackData.map((feedbackObj) => {
                const { contactId, kbAnswerUid, utteranceId, feedback, tag, comment } = feedbackObj;
                const valueEnum = (feedback === Feedback.LIKE_ARTICLE || feedback === Feedback.LIKE_INDIVIDUAL_SUBCARDS) ? 1 : 2;
                return {
                    contactId,
                    utteranceId,
                    kbAnswerUid,
                    valueEnum,
                    tagEnum: tag,
                    comment,
                };
            });
            return new Promise((resolve, reject) => {
                const feedbacks = [...updatedFeedbackData];
                const reqInit = this.getBaseHttpRequest({ feedbacks });
                const baseUrl = this.getBaseUrlForAcp();
                const copilotUrl = baseUrl + this.PATH_GUIDANCE_FEEDBACK;
                HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(copilotUrl, reqInit).then((response) => {
                    resolve(response);
                }, (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to send comprehensive feedback data', error);
                    this.logger.error('sendGuidanceFeedback', errorResponse.toString());
                    reject(errorResponse);
                });
            });
        };
        /**
         * Used to store the overall subcard feedback
         * @param contactFeedbackCard - contactFeedbackCard data given by the agent
         * @example -
         * ```
         * copilotService.sendContactFeedback({overallFeedbackTitle: "1234", feedback: "feedback"});
         * ```
         */
        this.sendContactFeedback = (contactFeedbackCard) => {
            const { feedback, tag, comment } = contactFeedbackCard;
            return new Promise((resolve, reject) => {
                const reqInit = this.getBaseHttpRequest({
                    valueEnum: feedback === Feedback.LIKE_OVERALL_SUBCARD ? '1' : '2',
                    tag: tag || '',
                    comment: comment || '',
                });
                const baseUrl = this.getBaseUrlForAcp();
                const copilotUrl = baseUrl + this.PATH_CONTACT_FEEDBACK;
                HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(copilotUrl, reqInit).then((response) => {
                    resolve(response);
                }, (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to send overall subcard feedback data', error);
                    this.logger.error('sendContactFeedback', errorResponse.toString());
                    reject(errorResponse);
                });
            });
        };
        this.auth = CXoneAuth.instance;
    }
    /**
     * Used to get the copilot info by search text
     * @param connectionId - connection id to send with the data
     * @example -
     * ```
     * copilotService.generateFinalSummary("some_connectionId");
     * ```
     */
    generateFinalSummary(contactId, status) {
        return new Promise((resolve, reject) => {
            {
                const reqInit = this.getBaseHttpRequest({
                    contactId,
                    isConversationResolved: true,
                    agentUUID: CXoneUser.instance.getUserInfo().userId,
                    status,
                });
                const baseUrl = this.getBaseUrlForAcp();
                const copilotUrl = baseUrl + this.AGENT_COPILOT_FINAL_SUMMARY;
                HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(copilotUrl, reqInit).then((response) => {
                    resolve(response);
                }, (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to generate final summary', error);
                    this.logger.error('generateFinalSummary', errorResponse.toString());
                    reject(errorResponse);
                });
            }
        });
    }
    /**
     * Used to get the copilot info by search text
     * @param searchText - Agent search query
     * @param activeContactId - contactId/caseId
     * @example -
     * ```
     * copilotService.search("test",'1234');
     * ```
     */
    search(searchText, activeContactId) {
        return new Promise((resolve, reject) => {
            {
                const contactId = activeContactId;
                const reqInit = this.getBaseHttpRequest({
                    agentAssistQueryConfig: this.getAgentAssistConfig(contactId),
                    query: searchText,
                    contactId,
                    agentUUID: CXoneUser.instance.getUserInfo().userId,
                });
                const baseUrl = this.getBaseUrlForAcp();
                const copilotUrl = baseUrl + this.AGENT_COPILOT_SEARCH;
                HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(copilotUrl, reqInit).then((response) => {
                    const resp = response === null || response === void 0 ? void 0 : response.data;
                    resolve(resp);
                }, (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to invoke agent-search', error);
                    this.logger.error('search', errorResponse.toString());
                    reject(errorResponse);
                });
            }
        });
    }
    /**
     * Used to set essential copilot data
     * @param contactId - contact id to fetch the data from
     * @param elementToAdd - element to add to the local storage
     * @example -
     * ```
     * copilotService.setLsDataByAgentId("123", { sentimentAndReason: [] });
     * ```
     */
    setLsDataByAgentId(contactId, elementToAdd) {
        const agentId = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true)['icAgentId'];
        const key = `${agentId}_ccfCopilotData`;
        const existingCopilotDataInLs = this.getLsDataByAgentId();
        const copilotDataToStore = Object.assign(Object.assign({}, existingCopilotDataInLs), { [contactId]: Object.assign(Object.assign({}, existingCopilotDataInLs[contactId]), elementToAdd) });
        localStorage.setItem(key, JSON.stringify(copilotDataToStore));
    }
    /**
     * Used to get local storage data by the agentId
     * @example -
     * ```
     * copilotService.getLsDataByAgentId();
     * ```
     */
    getLsDataByAgentId() {
        const agentId = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true)['icAgentId'];
        const key = `${agentId}_ccfCopilotData`;
        return JSON.parse(localStorage.getItem(key) || '{}');
    }
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
    processEditorCommand(action, context, selectedText, contactId) {
        return new Promise((resolve, reject) => {
            const reqInit = this.getBaseHttpRequest({
                contactId,
                context,
                selectedText,
                action,
            });
            const baseUrl = this.getBaseUrlForAcp();
            const emailActionUrl = baseUrl + this.AGENT_COPILOT_EMAIL_APIS.EMAIL_ACTION;
            HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(emailActionUrl, reqInit).then((response) => {
                const resp = response === null || response === void 0 ? void 0 : response.data.result;
                resolve(resp);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Editor command processing failed', error);
                this.logger.error('processEditorCommand', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    ;
    /**
    * Use to update copilot filters/ tag lists
    * @param copilotFilterTags - tags for filters
    * @param contactId - contactId/caseId
    * @example -
    * ```
    * copilotService.updateCopilotFilters([{name: 'planYear', default: ['2024'], selected: ['2024','2025]}],'1234');
    * ```
    */
    updateCopilotFilters(copilotFilterTags, contactId) {
        return new Promise((resolve, reject) => {
            const reqInit = this.getBaseHttpRequest({
                contactId,
                expertTags: copilotFilterTags,
            });
            const baseUrl = this.getBaseUrlForAcp();
            const updateCopilotFiltersUrl = baseUrl + this.PATH_KB_FILTER_UPDATE;
            HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.put(updateCopilotFiltersUrl, reqInit).then((response) => {
                const resp = response === null || response === void 0 ? void 0 : response.data;
                resolve(resp);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Update copilot filters failed', error);
                this.logger.error('updateCopilotFilters', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    ;
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
    getJourneySummary(contactHistory, contactId, customerUid, aahConfiguration, customerName) {
        return new Promise((resolve, reject) => {
            const reqInit = this.getBaseHttpRequest({
                contactId,
                customerUid,
                customerName,
                contactHistory,
                agentAssistConfiguration: aahConfiguration.Params,
            });
            const baseUrl = this.getBaseUrlForAcp();
            const adaptiveCardUrl = baseUrl + this.JOURNEY_SUMMARY;
            HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(adaptiveCardUrl, reqInit).then((response) => {
                resolve(response.data);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to get journey summary', error);
                this.logger.error('getJourneySummary', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    ;
}
//# sourceMappingURL=copilot-service.js.map