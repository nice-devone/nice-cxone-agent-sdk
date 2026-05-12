import { __awaiter, __rest } from "tslib";
import { CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import { CXoneSdkError, CXoneSdkErrorType, customAdaptiveCardSchemaKey } from '@nice-devone/common-sdk';
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
        this.AGENT_COPILOT_BASE_URI = '/agent-copilot/v1/';
        this.AGENT_COPILOT_BASE_URI_V2 = '/agent-copilot/v2/';
        this.AGENT_COPILOT_SEARCH = this.AGENT_COPILOT_BASE_URI + 'agent-search';
        this.AGENT_COPILOT_FINAL_SUMMARY = this.AGENT_COPILOT_BASE_URI + 'final-summary';
        this.AGENT_COPILOT_HEALTH_CHECK = this.AGENT_COPILOT_BASE_URI + 'copilot-health';
        this.AGENT_COPILOT_AGENT_ASSIST_HUB_CONFIG = this.AGENT_COPILOT_BASE_URI_V2 + 'license/retrieve-aah-config';
        this.AGENT_COPILOT_GET_ADAPTIVE_CARD_SCHEMAS = '/agent-copilot/v2/adaptive-cards?cardType={cardType}&cxaClientVersion={cxaClientVersion}';
        this.AGENT_COPILOT_EMAIL_APIS = {
            GET_LAST_GENERATED_TOPICS: this.AGENT_COPILOT_BASE_URI + 'email/topics?contactId={contactId}',
            GET_DRAFT_EMAIL: this.AGENT_COPILOT_BASE_URI + 'email/draft?contactId={contactId}&uniqueEmailId={uniqueEmailId}',
            GENERATE_EMAIL: this.AGENT_COPILOT_BASE_URI + 'email/draft',
            EMAIL_ACTION: this.AGENT_COPILOT_BASE_URI + 'email/action',
        };
        this.PATH_GUIDANCE_FEEDBACK = '/agent-copilot/v1/interaction-feedback/kbAnswers';
        this.PATH_CONTACT_FEEDBACK = '/agent-copilot/v1/interaction-feedback/interaction';
        this.PATH_KB_FILTER_UPDATE = '/agent-copilot/v1/kb-filter/update';
        this.JOURNEY_SUMMARY = '/agent-copilot/v1/journey-summary';
        this.FINAL_SUMMARY = '/agent-copilot/v1/final-summary?contactId={contactId}';
        this.EDITED_SUMMARY = '/agent-copilot/v1/contacts/{contactId}/edited-autosummary';
        this.TASK_ASSIST = '/agent-copilot/v1/contacts/{contactId}/task-assist';
        this.aahConfigStore = {};
        this.AGENT_COPILOT_GET_ALL_ADAPTIVE_CARDS_SCHEMAS = this.AGENT_COPILOT_BASE_URI + 'adaptive-card/get-all-adaptive-cards';
        this.AGENT_COPILOT_GET_TASK_ASSIST_FORM_PREFILLED_DATA = '/agent-copilot/v1/contacts/{contactId}/taskassist/form-data';
        this.TASK_ASSIST_FORM_ADAPTIVE_CARD_SCHEMAS_URL = '/agent-copilot/v2/adaptive-cards/taskassist/profiles/{agentAssistId}/bots/{botName}/intents/{intentName}/cards';
        this.REFRESH_TOKENS = '/agent-copilot/v1/agent-idtoken';
        this.DECISION_TREE_BASE = `${this.AGENT_COPILOT_BASE_URI}contacts/{contactId}/decision-tree`;
        this.AGENT_COPILOT_DECISION_TREE_APIS = {
            SKIP: `${this.DECISION_TREE_BASE}/skip-question`,
            CANCEL: `${this.DECISION_TREE_BASE}/cancel`,
            SUBMIT: `${this.DECISION_TREE_BASE}/submit`,
            UPDATE: `${this.DECISION_TREE_BASE}/update-response`,
            LOAD: `${this.DECISION_TREE_BASE}/load-section`,
        };
        this.AGENT_COPILOT_GET_TASK_ASSIST_ACTIVE_FILL_DATA = '/agent-copilot/v1/contacts/{contactId}/taskassist/update-slots';
        this.CHECKLIST_BASE = `${this.AGENT_COPILOT_BASE_URI}contacts/{contactId}/checklist`;
        this.AGENT_COPILOT_CHECKLIST_APIS = {
            UPDATE: `${this.CHECKLIST_BASE}/items/update`,
            SUBMIT: `${this.CHECKLIST_BASE}/submit`,
            CANCEL: `${this.CHECKLIST_BASE}/cancel`,
        };
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
         * Used to get the copilot adaptive card schema by cardType(all by default) and UI version
         * @param cxaVersion - branch name indicating UI version
         * @param cardType - type of adaptive card
         * ```
         * copilotService.fetchCopilotAdaptiveCardSchemasFromBucket('24.4.2', 'all');
         * ```
         */
        this.fetchCopilotAdaptiveCardSchemasFromBucket = (cxaVersion, cardType = 'all') => {
            return new Promise((resolve, reject) => {
                const copilotAdaptiveCardSchemasFromLS = LocalStorageHelper.getItem(StorageKeys.AGENT_COPILOT_ADAPTIVE_CARD_SCHEMAS, true);
                if (!copilotAdaptiveCardSchemasFromLS) {
                    const reqInit = this.getBaseHttpRequest({});
                    const baseUrl = this.getBaseUrlForAcp();
                    const adaptiveCardUrl = baseUrl + this.AGENT_COPILOT_GET_ADAPTIVE_CARD_SCHEMAS.replace('{cardType}', cardType).replace('{cxaClientVersion}', cxaVersion);
                    HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.get(adaptiveCardUrl, reqInit).then((response) => {
                        LocalStorageHelper.setItem(StorageKeys.AGENT_COPILOT_ADAPTIVE_CARD_SCHEMAS, response.data);
                        resolve(response.data);
                    }, (error) => {
                        const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to fetch all copilot adaptive card schemas', error);
                        this.logger.error('fetchCopilotAdaptiveCardSchemasFromBucket', errorResponse.toString());
                        reject(errorResponse);
                    });
                }
                else {
                    this.logger.info('fetchCopilotAdaptiveCardSchemasFromBucket', 'Adaptive cards fetched from storage');
                    resolve(copilotAdaptiveCardSchemasFromLS);
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
        this.retriveAgentAssistConfig = (contactId, mediaType, agentAssistId) => {
            return new Promise((resolve, reject) => {
                const cxaClientVersion = LocalStorageHelper.getItem('agent_settings', true).cxaClientVersion;
                const reqInit = this.getBaseHttpRequest({
                    contactId,
                    mediaType,
                    agentAssistId,
                    cxaClientVersion,
                });
                const baseUrl = this.getBaseUrlForAcp();
                const apiUrl = baseUrl + this.AGENT_COPILOT_AGENT_ASSIST_HUB_CONFIG;
                HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(apiUrl, reqInit).then((response) => {
                    var _a, _b, _c, _d, _e;
                    if (response.status === 200 && ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.success) !== false && (!this.aahConfigStore[contactId] || ((_c = (_b = this.aahConfigStore[contactId]) === null || _b === void 0 ? void 0 : _b.Params) === null || _c === void 0 ? void 0 : _c.agentAssistId) !== ((_e = (_d = response === null || response === void 0 ? void 0 : response.data) === null || _d === void 0 ? void 0 : _d.Params) === null || _e === void 0 ? void 0 : _e.agentAssistId))) {
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
         * @param mediaType - media type for the contact
         * @param agentAssistId - agent assist ID
         * @example -
         * ```
         * copilotService.storeAgentAssistConfig('12321');
         * ```
         */
        this.storeAgentAssistConfig = (contactId, mediaType, agentAssistId) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let aahConfig = this.getAgentAssistConfig(contactId, true);
            if (!aahConfig || ((_a = aahConfig === null || aahConfig === void 0 ? void 0 : aahConfig.Params) === null || _a === void 0 ? void 0 : _a.agentAssistId) !== agentAssistId) {
                aahConfig = yield this.retriveAgentAssistConfig(contactId, mediaType, agentAssistId);
            }
            return aahConfig;
        });
        /**
         * Ensures the Agent Assist configuration for the given contactId is available in memory.
         * If the configuration is not already cached (in the in-memory store or localStorage),
         * it will be retrieved from the backend API and then returned.
         *
         * Unlike {@link storeAgentAssistConfig}, this method only attempts a backend retrieval
         * when no cached configuration exists; it does not validate agentAssistId/mediaType changes.
         *
         * @param contactId - The contact (case) identifier whose Agent Assist configuration is required.
         * @returns The loaded {@link CopilotProfileConfig} if available after cache check / retrieval; otherwise `undefined` if retrieval failed silently.
         * @example
         * ```ts
         * const aahConfig = copilotService.resolveAgentAssistConfig('12321');
         * if (aahConfig?.Params?.emailChannel) {
         *   // proceed with email specific logic
         * }
         * ```
         */
        this.resolveAgentAssistConfig = (contactId) => __awaiter(this, void 0, void 0, function* () {
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
        /**
         * Used to get all copilot adaptive card schemas
         * @example -
         * ```
         * copilotService.fetchCopilotAllAdaptiveCardSchemas();
         * ```
         */
        this.fetchCopilotAllAdaptiveCardSchemas = () => {
            return new Promise((resolve, reject) => {
                const copilotAdaptiveCardSchemasFromLS = LocalStorageHelper.getItem(StorageKeys.AGENT_COPILOT_ADAPTIVE_CARD_SCHEMAS, true);
                if (!copilotAdaptiveCardSchemasFromLS) {
                    const cxaClientVersion = LocalStorageHelper.getItem('agent_settings', true).cxaClientVersion;
                    const reqInit = this.getBaseHttpRequest({
                        cxaClientVersion,
                        version: 'v2', // version is added for the new schema with localization strings
                    });
                    const baseUrl = this.getBaseUrlForAcp();
                    const adaptiveCardUrl = baseUrl + this.AGENT_COPILOT_GET_ALL_ADAPTIVE_CARDS_SCHEMAS;
                    HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(adaptiveCardUrl, reqInit).then((response) => {
                        LocalStorageHelper.setItem(StorageKeys.AGENT_COPILOT_ADAPTIVE_CARD_SCHEMAS, response.data);
                        resolve(response.data);
                    }, (error) => {
                        const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to fetch all copilot adaptive card schemas', error);
                        this.logger.error('fetchCopilotAllAdaptiveCardSchemas', errorResponse.toString());
                        reject(errorResponse);
                    });
                }
                else {
                    this.logger.info('fetchCopilotAllAdaptiveCardSchemas', 'Adaptive cards fetched from storage');
                    resolve(copilotAdaptiveCardSchemasFromLS);
                }
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
    /**
     * Used to fetch the generated final summary
     * @param connectionId - connection id to send with the data
     * @example -
     * ```
     * copilotService.fetchGeneratedFinalSummary("1234");
     * ```
     */
    fetchGeneratedFinalSummary(contactId) {
        return new Promise((resolve, reject) => {
            const reqInit = this.getBaseHttpRequest({});
            const baseUrl = this.getBaseUrlForAcp();
            const copilotUrl = baseUrl + this.FINAL_SUMMARY.replace('{contactId}', contactId);
            HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.get(copilotUrl, reqInit).then((response) => {
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to fetch generated final summary', error);
                this.logger.error('fetchGeneratedFinalSummary', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    ;
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
    getTaskResponse(contactId, intentConfig, formCapturedata, taskSessionUid) {
        return new Promise((resolve, reject) => {
            var _a;
            const aahConfiguration = this.getAgentAssistConfig && this.getAgentAssistConfig(`${contactId}`, true);
            const taskAssistConfig = (_a = aahConfiguration === null || aahConfiguration === void 0 ? void 0 : aahConfiguration.Params) === null || _a === void 0 ? void 0 : _a.taskAssistConfig;
            const req = Object.assign(Object.assign({ intentConfig }, (formCapturedata
                ? {
                    slots: Object.entries(formCapturedata).map(([key, value]) => ({
                        slotName: key,
                        value: value,
                    })),
                }
                : {})), { virtualAgentId: taskAssistConfig.virtualAgentId, taskSessionUid });
            const reqInit = this.getBaseHttpRequest(req);
            const baseUrl = this.getBaseUrlForAcp();
            const taskResponseUrl = baseUrl + this.TASK_ASSIST.replace('{contactId}', contactId);
            HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(taskResponseUrl, reqInit).then((response) => {
                resolve(response.data);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to get task response', error);
                this.logger.error('getTaskResponse', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
   * Used to get task assist form schema based on the intentName
   * @param intentName - intent name
   * @param contactId  - contact Id
   * @example -
   * ```
   * copilotService.getTaskAssistFormSchema('Task intent name here','212324);
   * ```
   */
    getTaskAssistFormSchema(intentName, contactId) {
        return new Promise((resolve, reject) => {
            var _a, _b;
            const aahConfiguration = this.getAgentAssistConfig && this.getAgentAssistConfig(`${contactId}`, true);
            const taskAssistConfig = (_a = aahConfiguration === null || aahConfiguration === void 0 ? void 0 : aahConfiguration.Params) === null || _a === void 0 ? void 0 : _a.taskAssistConfig;
            const agentAssistId = (_b = aahConfiguration === null || aahConfiguration === void 0 ? void 0 : aahConfiguration.Params) === null || _b === void 0 ? void 0 : _b.agentAssistId;
            const reqInit = this.getBaseHttpRequest({
                intentName,
                virtualAgentId: taskAssistConfig.virtualAgentId,
            });
            const baseUrl = this.getBaseUrlForAcp();
            const schemaUrl = baseUrl +
                this.TASK_ASSIST_FORM_ADAPTIVE_CARD_SCHEMAS_URL.replace('{agentAssistId}', agentAssistId)
                    .replace('{intentName}', intentName)
                    .replace('{botName}', decodeURIComponent(taskAssistConfig.virtualAgentId));
            HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.get(schemaUrl, reqInit).then((response) => {
                const cachedSchemas = LocalStorageHelper.getItem(StorageKeys.AGENT_COPILOT_ADAPTIVE_CARD_SCHEMAS, true);
                const matchedIntentConfig = taskAssistConfig.intentConfig.find((intent) => intent.intentName === intentName);
                const apiResponse = response.data;
                const taskAssistSchema = Object.assign(Object.assign({}, apiResponse['taskAssistFormSchema']), { actions: [
                        {
                            type: 'Action.Submit',
                            title: 'adp_cancel',
                            associatedInputs: 'none',
                            data: {
                                name: 'cancelTask',
                            },
                        },
                        {
                            type: 'Action.Submit',
                            title: 'adp_submit',
                            data: {
                                name: 'onTaskAssistSubmit',
                                intentName: intentName,
                                intentConfig: matchedIntentConfig,
                            },
                        }
                    ] });
                const mergedSchemas = Object.assign(Object.assign({}, cachedSchemas), { [intentName]: taskAssistSchema });
                LocalStorageHelper.setItem(StorageKeys.AGENT_COPILOT_ADAPTIVE_CARD_SCHEMAS, mergedSchemas);
                resolve(response.data);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to get task assist form schema', error);
                this.logger.error('getTaskAssistFormSchema', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
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
    getTaskAssistFormPreFilledData(intentConfig, contactId, objectId) {
        return new Promise((resolve, reject) => {
            var _a;
            const aahConfiguration = this.getAgentAssistConfig && this.getAgentAssistConfig(`${contactId}`, true);
            const taskAssistConfig = (_a = aahConfiguration === null || aahConfiguration === void 0 ? void 0 : aahConfiguration.Params) === null || _a === void 0 ? void 0 : _a.taskAssistConfig;
            const reqInit = this.getBaseHttpRequest({
                intentConfig,
                virtualAgentId: taskAssistConfig.virtualAgentId,
                objectId: objectId,
            });
            const baseUrl = this.getBaseUrlForAcp();
            const schemaUrl = baseUrl + this.AGENT_COPILOT_GET_TASK_ASSIST_FORM_PREFILLED_DATA.replace('{contactId}', contactId);
            HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(schemaUrl, reqInit).then((response) => {
                resolve(response.data);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to get task assist pre-filled data', error);
                this.logger.error('getTaskAssistFormPreFilledData', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
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
    saveEditedSummary(channel, contactNumber, summary) {
        return new Promise((resolve, reject) => {
            const reqInit = this.getBaseHttpRequest({
                channel,
                contactNumber,
                summary,
            });
            const contactId = `${contactNumber}`;
            const baseUrl = this.getBaseUrlForAcp();
            const editedSummaryUrl = baseUrl + this.EDITED_SUMMARY.replace('{contactId}', contactId);
            ;
            HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(editedSummaryUrl, reqInit).then((response) => {
                resolve(response.data);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to Save Edited Summary', error);
                this.logger.error('saveEditedSummary', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    ;
    /**
     * Refreshes authentication tokens for the current agent session.
     * @param idToken - The current ID token to refresh.
     * @param accessToken - The current access token to refresh.
     * @returns A promise that resolves with the refreshed idToken and accessToken.
     * @example
     * ```
     * const tokens = await copilotService.refreshTokens('newIdToken', 'newAccessToken');
     * ```
     */
    refreshTokens(idToken, accessToken) {
        return new Promise((resolve, reject) => {
            const reqInit = this.getBaseHttpRequest({
                idToken,
                accessToken,
            });
            const baseUrl = this.getBaseUrlForAcp();
            const refreshTokenUrl = baseUrl + this.REFRESH_TOKENS;
            HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(refreshTokenUrl, reqInit).then((response) => {
                resolve(response.data);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to refresh tokens', error);
                this.logger.error('refreshTokens', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
   * Fetches an element configuration (Decision Tree or Custom Adaptive Card)
   * for a given element ID.
   *
   * @param elementId - Unique ID of the element (Decision Tree or Custom Adaptive Card).
   * @returns Promise resolving to either a DecisionTreeElement or CustomAdaptiveCardElement.
   *
   * @example
   * ```ts
   * const element = await copilotService.getElement("dt-001");
   * if (element.type === 'decisionTree') {
   *   const sections = element.config.sections;
   *   // Process decision tree sections
   * } else if (element.type === 'customAdaptiveCard') {
   *   const schema = element.config.adaptiveCardSchema;
   *   // Render adaptive card with schema
   * }
   * ```
   */
    getElement(elementId) {
        return new Promise((resolve, reject) => {
            const baseUrl = this.getBaseUrlForAcp();
            const elementUrl = `${baseUrl}/profile-hub/v1/elements/${elementId}`;
            const reqInit = this.getBaseHttpRequest({}); // include default headers, auth, etc.
            HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.get(elementUrl, reqInit).then((response) => {
                const element = response.data;
                resolve(element);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to fetch Element', error);
                this.logger.error('getElement', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
   * Posts a Decision Tree section-change event to the backend.
   *
   * This is triggered when the agent switches to another section in the UI.
   * Used for analytics, tracking, and server-side decision logic.
   *
   * @param taskSessionUid - Unique ID for the task session.
   * @param contactId - Contact/Interaction ID associated with the tree.
   * @param decisionTreeId - Decision Tree session/element ID.
   * @param sectionId - The newly selected active section ID.
   *
   * @returns Promise resolving the raw API response.
   *
   * @example
   * ```ts
   * await copilotService.postDecisionTreeSectionChange(
   *   "task-session-001",
   *   "203444780887",
   *   "a75bf9bb-203c-4850-b743-35e31f2f4421",
   *   "22414-4141-4141-4242"
   * );
   * ```
   */
    postDecisionTreeSectionChange(taskSessionUid, contactId, decisionTreeId, sectionId) {
        return new Promise((resolve, reject) => {
            const reqInit = this.getBaseHttpRequest({
                taskSessionUid,
                contactId,
                decisionTreeId,
                sectionId,
                agentUUID: CXoneUser.instance.getUserInfo().userId,
            });
            const baseUrl = this.getBaseUrlForAcp();
            const endpoint = baseUrl + this.AGENT_COPILOT_DECISION_TREE_APIS.LOAD.replace('{contactId}', contactId);
            HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(endpoint, reqInit).then((response) => {
                const decisionTreeData = response.data;
                resolve(decisionTreeData);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to send Decision Tree section change', error);
                this.logger.error('postDecisionTreeSectionChange', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
   * Updates the answer for a single Decision Tree question.
   *
   * This is called when the user edits a field and clicks the ✓ save icon.
   *
   * @param taskSessionUid - unique ID for the task session.
   * @param contactId - Contact/Interaction ID.
   * @param decisionTreeId - Decision Tree ID related to the question.
   * @param sectionId - Section containing the question.
   * @param questionId - The specific Question ID to update.
   * @param newResponse - The new answer/value for the question.
   *
   * @returns Promise resolving API response containing update summary.
   *
   * @example
   * ```ts
   * await copilotService.updateDecisionTreeResponse(
   *  "task-session-001",
   *   "203444780887",
   *   "a75bf9bb-203c-4850-b743-35e31f2f4421",
   *   "12414-4141-4141-4141",
   *   "213123-3131-13131-3132",
   *   "New Answer"
   * );
   * ```
   */
    updateDecisionTreeResponse(updateDecisionTreeResponsePayload) {
        return new Promise((resolve, reject) => {
            const { taskSessionUid, contactId, decisionTreeId, sectionId, questionId, newResponse } = updateDecisionTreeResponsePayload;
            const baseUrl = this.getBaseUrlForAcp();
            const endpoint = baseUrl + this.AGENT_COPILOT_DECISION_TREE_APIS.UPDATE.replace('{contactId}', contactId);
            const reqInit = this.getBaseHttpRequest({
                taskSessionUid,
                contactId,
                decisionTreeId,
                sectionId,
                questionId,
                questionResponse: newResponse,
                agentUUID: CXoneUser.instance.getUserInfo().userId,
            });
            HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.put(endpoint, reqInit).then((response) => {
                const decisionTreeData = response.data;
                resolve(decisionTreeData);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to send Decision Tree section change', error);
                this.logger.error('updateDecisionTreeResponse', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
   * Submits the fully completed Decision Tree to the backend.
   *
   * After submission, the backend may trigger follow-up workflows,
   * notifications, or task-assist events.
   *
   * @param contactId - Contact/Interaction ID.
   * @param decisionTreeId - ID of the Decision Tree being submitted.
   *
   * @returns Promise resolving server confirmation payload.
   *
   * @example
   * ```ts
   * await copilotService.submitDecisionTree(
   *  "taskSessionUid",
   *   "203444780887",
   *   "a75bf9bb-203c-4850-b743-35e31f2f4421"
   * );
   * ```
   */
    submitDecisionTree(taskSessionUid, contactId, decisionTreeId) {
        return new Promise((resolve, reject) => {
            const baseUrl = this.getBaseUrlForAcp();
            const submitUrl = baseUrl + this.AGENT_COPILOT_DECISION_TREE_APIS.SUBMIT.replace('{contactId}', contactId);
            const reqInit = this.getBaseHttpRequest({
                taskSessionUid,
                contactId,
                decisionTreeId,
                agentUUID: CXoneUser.instance.getUserInfo().userId,
                // agentId optional → inherited automatically from base request if defined
            });
            HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(submitUrl, reqInit).then((response) => {
                resolve(response.data);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to submit Decision Tree', error);
                this.logger.error('submitDecisionTree', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
    * Skips a decision tree question for a given contact and question.
     * @param taskSessionUid - The task session unique ID.
     * @param contactId - The contact ID.
     * @param decisionTreeId - The decision tree ID.
     * @param questionId - The question ID to be skipped.
     * @param sectionId - The section ID containing the question.
     * @returns A promise that resolves with the response data.
     * @example
     * ```
     * copilotService.skipDecisionTreeQuestion('taskSessionUid', 'contactId', 'decisionTreeId', 'questionId', 'sectionId');
     * ```
     */
    skipDecisionTreeQuestion(taskSessionUid, contactId, decisionTreeId, questionId, sectionId) {
        return new Promise((resolve, reject) => {
            const reqInit = this.getBaseHttpRequest({
                taskSessionUid,
                contactId,
                decisionTreeId,
                questionId,
                sectionId,
                agentUUID: CXoneUser.instance.getUserInfo().userId,
            });
            const baseUrl = this.getBaseUrlForAcp();
            const skipQuestionUrl = baseUrl + this.AGENT_COPILOT_DECISION_TREE_APIS.SKIP.replace('{contactId}', contactId);
            HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(skipQuestionUrl, reqInit).then((response) => {
                resolve(response.data);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to skip decision tree question', error);
                this.logger.error('skipDecisionTreeQuestion', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    ;
    /**
     * Cancels the Decision Tree session for a given contact.
     *
     * This is typically called when the agent decides to exit the Decision Tree
     * without submitting it.
     *
     * @param taskSessionUid - The task session unique ID.
     * @param contactId - Contact/Interaction ID.
     * @param decisionTreeId - ID of the Decision Tree to be closed.
     * @returns Promise resolving server confirmation payload.
     * @example
     * ```ts
     * await copilotService.cancelDecisionTree(
     * "taskSessionUid",
     * "203444780887",
     * "a75bf9bb-203c-4850-b743-35e31f2f4421"
     * );
     * ```
     */
    cancelDecisionTree(taskSessionUid, contactId, decisionTreeId) {
        return new Promise((resolve, reject) => {
            const baseUrl = this.getBaseUrlForAcp();
            const cancelUrl = baseUrl + this.AGENT_COPILOT_DECISION_TREE_APIS.CANCEL.replace('{contactId}', contactId);
            const reqInit = this.getBaseHttpRequest({
                taskSessionUid,
                contactId,
                decisionTreeId,
                agentUUID: CXoneUser.instance.getUserInfo().userId,
            });
            HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(cancelUrl, reqInit).then((response) => {
                resolve(response.data);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to cancel Decision Tree', error);
                this.logger.error('cancelDecisionTree', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Fetches active pre-filled slot data for Task Assist based on the provided input slot.
     *
     * This API sends the slot name and value to the backend and retrieves
     * the corresponding pre-filled data for the active Task Assist form.
     *
     * @param inputs - Key/value pair representing the slot to be resolved.
     * Example: `{ accountNumber: "12345" }`
     *
     * @param contactId - Unique contact identifier associated with the active interaction.
     *
     * @param objectId - Task Assist session identifier (taskSessionUid).
     *
     * @returns Promise resolving to the pre-filled data returned by the backend.
     *
     * @example
     * ```ts
     * copilotService.getTaskAssistActiveFilledData(
     *   { accountNumber: "12345" },
     *   "contact-123",
     *   "task-session-456"
     * );
     * ```
     */
    getTaskAssistActiveFilledData(inputs, contactId, objectId) {
        return new Promise((resolve, reject) => {
            const reqInit = this.getBaseHttpRequest({
                contactId,
                taskSessionUid: objectId,
                slotName: Object.keys(inputs)[0],
                slotValue: Object.values(inputs)[0],
            });
            const baseUrl = this.getBaseUrlForAcp();
            const schemaUrl = baseUrl + this.AGENT_COPILOT_GET_TASK_ASSIST_ACTIVE_FILL_DATA.replace('{contactId}', contactId);
            HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(schemaUrl, reqInit).then((response) => {
                resolve(response.data);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to get task assist pre-filled data', error);
                this.logger.error('getTaskAssistFormPreFilledData', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Searches for workflow suggestions using semantic search.
     * Called when no local workflow matches the agent's '/' query.
     *
     * @param agentQuery - The search query from agent (text after '/')
     * @param contactId - The active contact ID
     * @returns Promise with suggested workflows
     * @example
     * ```ts
     * const suggestions = await copilotService.getWorkflowSuggestions('refund process', '12345');
     * ```
     */
    getWorkflowSuggestions(agentQuery, contactId) {
        return new Promise((resolve, reject) => {
            const baseUrl = this.getBaseUrlForAcp();
            const endpoint = `${baseUrl}${this.AGENT_COPILOT_BASE_URI}contacts/${contactId}/workflow-suggestion`;
            const reqInit = this.getBaseHttpRequest({
                agentQuery,
            });
            HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(endpoint, reqInit).then((response) => {
                resolve(response.data);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to get workflow suggestions', error);
                this.logger.error('getWorkflowSuggestions', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Fetches custom adaptive card schema with caching support.
     * Checks localStorage cache first, then fetches from Profile Hub API if needed.
     * Automatically parses and caches the schema.
     *
     * @param elementUid - Unique identifier of the custom adaptive card element
     * @returns Promise resolving to parsed schema object
     *
     * @example
     * ```ts
     * const schema = await copilotService.getCustomAdaptiveCardSchema("7065ea9f-737f-4411-a857-112fe0b62aec");
     * ```
     */
    getCustomAdaptiveCardSchema(elementUid) {
        return new Promise((resolve, reject) => {
            const cacheKey = `${customAdaptiveCardSchemaKey.CUSTOM_ADAPTIVE_CARD}${elementUid}`;
            const cachedSchemas = LocalStorageHelper.getItem(StorageKeys.AGENT_COPILOT_ADAPTIVE_CARD_SCHEMAS, true) || {};
            if (cachedSchemas[cacheKey]) {
                resolve(cachedSchemas[cacheKey]);
                return;
            }
            this.getElement(elementUid).then((element) => {
                var _a;
                const elementConfig = element;
                const adaptiveCardSchema = (_a = elementConfig === null || elementConfig === void 0 ? void 0 : elementConfig.config) === null || _a === void 0 ? void 0 : _a.adaptiveCardSchema;
                const schema = typeof adaptiveCardSchema === 'string' ? JSON.parse(adaptiveCardSchema) : adaptiveCardSchema;
                const updatedSchemas = Object.assign(Object.assign({}, cachedSchemas), { [cacheKey]: schema });
                LocalStorageHelper.setItem(StorageKeys.AGENT_COPILOT_ADAPTIVE_CARD_SCHEMAS, updatedSchemas);
                resolve(schema);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to fetch custom adaptive card schema', error);
                this.logger.error('getCustomAdaptiveCardSchema', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Updates a checklist item's completion status.
     *
     * This is called when checklist item gets checked or unchecked.
     *
     * @param params - Object containing sessionId, contactId, checklistId, itemId, isCompleted, and completionType.
     * @returns Promise resolving to the updated checklist data.
     * @example
     * ```ts
     * await copilotService.updateChecklistItem({
     *   sessionId: 'session-001',
     *   contactId: '203444780887',
     *   checklistId: 'checklist-uuid',
     *   itemId: 'item-1',
     *   isCompleted: true,
     *   completionType: 'MANUAL'
     * });
     * ```
     */
    updateChecklistItem(params) {
        return new Promise((resolve, reject) => {
            const { sessionId, contactId, checklistId, itemId, isCompleted, completionType } = params;
            const baseUrl = this.getBaseUrlForAcp();
            const updateUrl = baseUrl + this.AGENT_COPILOT_CHECKLIST_APIS.UPDATE.replace('{contactId}', contactId);
            const reqInit = this.getBaseHttpRequest({
                sessionId,
                checklistId,
                itemId,
                isCompleted,
                completionType,
                agentUUID: CXoneUser.instance.getUserInfo().userId,
            });
            HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(updateUrl, reqInit).then((response) => {
                resolve(response.data);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to update checklist item', error);
                this.logger.error('updateChecklistItem', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Completes and submits the checklist.
     *
     * This is called when the agent clicks the complete/submit button on the checklist.
     *
     * @param sessionId - Checklist session ID.
     * @param contactId - Contact/Interaction ID.
     * @param checklistId - Checklist definition ID.
     * @returns Promise resolving to the completion confirmation.
     * @example
     * ```ts
     * await copilotService.completeChecklist(
     *   'session-001',
     *   '203444780887',
     *   'checklist-uuid'
     * );
     * ```
     */
    completeChecklist(sessionId, contactId, checklistId) {
        return new Promise((resolve, reject) => {
            const baseUrl = this.getBaseUrlForAcp();
            const submitUrl = baseUrl + this.AGENT_COPILOT_CHECKLIST_APIS.SUBMIT.replace('{contactId}', contactId);
            const reqInit = this.getBaseHttpRequest({
                sessionId,
                checklistId,
                agentUUID: CXoneUser.instance.getUserInfo().userId,
            });
            HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(submitUrl, reqInit).then((response) => {
                resolve(response.data);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to complete checklist', error);
                this.logger.error('completeChecklist', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Closes the checklist without submitting.
     *
     * This is called when the agent decides to close/cancel the checklist.
     *
     * @param sessionId - Checklist session ID.
     * @param contactId - Contact/Interaction ID.
     * @param checklistId - Checklist definition ID.
     * @returns Promise resolving to the cancellation confirmation.
     * @example
     * ```ts
     * await copilotService.closeChecklist(
     *   'session-001',
     *   '203444780887',
     *   'checklist-uuid'
     * );
     * ```
     */
    closeChecklist(sessionId, contactId, checklistId) {
        return new Promise((resolve, reject) => {
            const baseUrl = this.getBaseUrlForAcp();
            const cancelUrl = baseUrl + this.AGENT_COPILOT_CHECKLIST_APIS.CANCEL.replace('{contactId}', contactId);
            const reqInit = this.getBaseHttpRequest({
                sessionId,
                checklistId,
                agentUUID: CXoneUser.instance.getUserInfo().userId,
            });
            HttpClient === null || HttpClient === void 0 ? void 0 : HttpClient.post(cancelUrl, reqInit).then((response) => {
                resolve(response.data);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to close checklist', error);
                this.logger.error('closeChecklist', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
}
//# sourceMappingURL=copilot-service.js.map