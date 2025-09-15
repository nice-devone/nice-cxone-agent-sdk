import { __awaiter } from "tslib";
import { ACDSessionManager, AdminService, clearIndexDbKey, clearIndexDbStore, HttpUtilService, IndexDBKeyNames, IndexDBStoreNames, LocalStorageHelper, Logger, NotificationSettings, OriginatingServiceIdentifier, SessionStorageHelper, StorageKeys, } from '@nice-devone/core-sdk';
import { CXoneLeaderElector, MessageBus, MessageType, } from '@nice-devone/common-sdk';
import { CXoneDirectory } from './directory/cxone-directory';
import { CopilotNotificationClient } from './agent-copilot/copilot-notification-client';
import { CXoneAgentPermission } from './acd/cxone-agent-permission/cxone-agent-permission';
import { CXoneAgentSetting } from './acd/cxone-agent-setting/cxone-agent-setting';
import { CXoneSkillActivityQueue } from './acd/cxone-skill-activity-queue/cxone-skill-activity-queue';
import { CXoneNotificationManager } from './notification/cxone-notification-manager';
import { CXoneTenant } from './acd/cxone-tenant/cxone-tenant';
import { WemSchedule } from './wem-schedule/wem-schedule';
import { CustomerCardService } from './customer-card/service/customer-card-service';
import { CXoneAuth, CXoneUser, AuthStatus } from '@nice-devone/auth-sdk';
import { ScreenAgentService } from './screen-agent/service/screen-agent-service';
import { CommitmentService } from './commitment/commitment-service';
import { CommonService } from '../common/common-services';
import { AgentIntegrationConfigurationService } from './agent-integration-configuration/agent-integration-configuration-service';
import { TeamService } from './directory/service/team-service';
import { Subject } from 'rxjs';
import { CXoneRealtimeReportService } from './reporting/cxone-realtime-report-service';
import { AutoSummaryService } from './auto-summary/auto-summary-service';
import { AutoSummaryNotificationService } from './auto-summary/auto-summary-notification-service';
import { IEXService } from './IEX/IEX-service';
import { CopilotService } from './agent-copilot/service/copilot-service';
import { TranscriptService } from './transcript/transcript-service';
import { PresenceSyncService } from './presence-sync/service/presence-sync-service';
import { AgentAssistWSService } from './agent-assist/agent-assist-ws-service';
import { AgentAssistProvider } from './enum/agent-assist-provider';
import { VoiceBioHubService } from './voice-bio-hub/voice-bio-hub-service';
import { CXoneAgentContactHistory } from './acd/cxone-agent-contact-history/cxone-agent-contact-history';
import { CXoneProductFeature } from './acd';
/** This is the base class for ACD */
export class CXoneClient {
    /**
     * get instance for agent auth and session
     * @example
     * ```
     * const cxoneClient = new CXoneClient();
     * ```
     */
    constructor() {
        this.logger = new Logger('ACD', 'CXoneClient');
        this.acdSessionManager = {};
        this.auth = {};
        this.directory = {};
        this.agentPermission = {};
        this.agentSetting = {};
        this.agentContactHistory = {};
        this.skillActivityQueue = {};
        this.notification = {};
        this.copilotNotificationClient = {};
        this.cxoneTenant = {};
        this.cxoneUser = {};
        this.wemSchedule = {};
        this.iexService = {};
        this.screenAgent = {};
        this.commitment = {};
        this.common = {};
        this.cxoneCustomerCard = {};
        this.hasInitModuleInitiated = false;
        this.cxoneApiPerformanceMetrics = new Subject();
        this.agentIntegrationConfigurationService = {};
        this.teamService = {};
        this.performanceReport = {};
        this.onUpdateSkillsEvent = new Subject();
        //***TO DO  => AW-23445, Remove below autoSummaryService implementation once we use AutoSummaryNotificationService for both voice and digital.
        this.autoSummaryService = {};
        this.autoSummaryNotificationService = {};
        this.copilotService = {};
        this.transcript = {};
        this.presenceSyncService = {};
        this.agentAssistWSService = {};
        this.voiceBioHubService = {};
        this.isUIQueueEnabled = false;
        /**
         * Subscription for leader change event
         */
        this.onLeaderElectionChange = () => {
            CXoneLeaderElector.instance.onLeaderChanged.subscribe((isLeader) => {
                var _a;
                if (isLeader) {
                    this.logger.info('onLeaderChanged', 'I AM THE LEADER');
                    // start refresh token flow
                    let isRefreshTokenFlowStarted = false;
                    try {
                        isRefreshTokenFlowStarted = this.auth.startRefreshTokenCheck(this.auth.getAuthToken(), isLeader, this.auth.getAuthState().isTokenValid);
                    }
                    catch (error) {
                        this.logger.error('onLeaderChanged', 'Error in starting refresh token flow' + JSON.stringify(error));
                    }
                    if (isRefreshTokenFlowStarted) {
                        // Start join session and initiate get next event
                        if (this.acdSessionManager.hasSessionId) {
                            this.acdSessionManager.toggleACDEventEmitter({ invokeSnapshot: true, isUIQueueEnabled: this.isUIQueueEnabled });
                        }
                        // WEM Notification polling
                        const wemNotificationPollingConfig = (_a = this.notification.wemNotificationProvider) === null || _a === void 0 ? void 0 : _a.getWemNotificationPollingConfig();
                        if (wemNotificationPollingConfig) {
                            this.notification.startWemWebSocket(wemNotificationPollingConfig);
                        }
                    }
                }
            });
        };
        /**
         * Subscription for request message over broadcast channel
         */
        this.subscribeRequestMessage = () => {
            MessageBus.instance.onRequestMessage.subscribe((msg) => {
                if (CXoneLeaderElector.instance.isLeader) {
                    switch (msg.type) {
                        case MessageType.WEM_NOTIFICATION_START_POLLING:
                            this.notification.startWemWebSocket(msg.data);
                            break;
                        case MessageType.AGENT_QUEUE_POLLING:
                            this.skillActivityQueue.startAgentQueuesPolling(msg.data);
                            break;
                        case MessageType.TERMINATE_AGENT_QUEUE_POLLING:
                            this.skillActivityQueue.terminateAgentQueuePolling();
                            break;
                        case MessageType.TERMINATE_WEM_NOTIFICATION_POLLING:
                            this.notification.terminateWemWebSocket();
                            break;
                        case MessageType.JOIN_SESSION_FOR_NON_LEADER:
                            this.acdSessionManager.toggleACDEventEmitter({ invokeSnapshot: true, sessionId: msg.data, isUIQueueEnabled: this.isUIQueueEnabled });
                            break;
                        case MessageType.WEM_NOTIFICATION_ACK:
                            this.notification.sendWemAcknowledge(msg.data);
                            break;
                        default:
                            break;
                    }
                }
            });
        };
        /**
         * Subscription for response message over broadcast channel
         */
        this.subscribeResponseMessage = () => {
            MessageBus.instance.onResponseMessage.subscribe((msg) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                switch (msg.type) {
                    case MessageType.GET_NEXT_EVENT_RESPONSE:
                    case MessageType.UI_QUEUE_EVENT_RESPONSE: {
                        const adapter = this.acdSessionManager.getNextAdapter();
                        adapter.handleGetNextResponse(msg.data);
                        break;
                    }
                    case MessageType.AGENT_QUEUE_POLLING_RESPONSE:
                        (_a = this.skillActivityQueue.agentQueueProvider) === null || _a === void 0 ? void 0 : _a.handleAgentQueueResponse(msg.data);
                        break;
                    case MessageType.AGENT_QUEUE_DETAILS_POLLING_RESPONSE:
                        (_b = this.skillActivityQueue.agentQueuesDetailProvider) === null || _b === void 0 ? void 0 : _b.handleAgentQueuesDetailResponse(msg.data);
                        break;
                    case MessageType.RESTART_SKILL_ACTIVITY_POLLING:
                        (_d = (_c = this.skillActivityQueue) === null || _c === void 0 ? void 0 : _c.skillActivityProvider) === null || _d === void 0 ? void 0 : _d.restartWorker();
                        break;
                    case MessageType.WEM_NOTIFICATION_POLLING_RESPONSE:
                        (_e = this.notification.wemNotificationProvider) === null || _e === void 0 ? void 0 : _e.handleWemNotificationWSResponse(msg.data, true);
                        break;
                    case MessageType.DYNAMIC_DIRECTORY_SEARCH_RESPONSE:
                        this.directory.dynamicDirectory.publishFinalDynamicDirectoryResponse(msg.data);
                        break;
                    case MessageType.AUTO_SUMMARY_NOTIFICATION_RESPONSE:
                        if ((_f = this.autoSummaryNotificationService) === null || _f === void 0 ? void 0 : _f.broadcastAutoSummary) {
                            this.autoSummaryNotificationService.broadcastAutoSummary(msg === null || msg === void 0 ? void 0 : msg.data);
                        }
                        break;
                    case MessageType.AGENT_ASSIST_WS_RESPONSE:
                        if ((_g = this.agentAssistWSService) === null || _g === void 0 ? void 0 : _g.broadcastWSMessage) {
                            this.agentAssistWSService.broadcastWSMessage(msg.data);
                        }
                        break;
                    case MessageType.AGENT_COPILOT_RESPONSE:
                        if ((_h = this.copilotNotificationClient) === null || _h === void 0 ? void 0 : _h.broadcastCopilotNotifications) {
                            this.copilotNotificationClient.broadcastCopilotNotifications(msg.data);
                        }
                        break;
                    case MessageType.AUTO_SUMMARY_RESPONSE:
                        if ((_j = this.autoSummaryService) === null || _j === void 0 ? void 0 : _j.broadcastAutoSummary) {
                            this.autoSummaryService.broadcastAutoSummary(msg.data);
                        }
                        break;
                    case MessageType.AUTHENTICATION_RESPONSE:
                        this.auth.restoreData(msg.data);
                        break;
                    default:
                        break;
                }
            });
        };
        /**
         * subscribe the agent assist event for copilot provider
         */
        this.subscribeAgentAssistEvent = () => {
            this.acdSessionManager.agentAssistSubject.subscribe((agentAssist) => {
                var _a;
                const { allParams } = agentAssist;
                const acpConfig = (allParams === null || allParams === void 0 ? void 0 : allParams.AgentAssistAppConfigJson) || '{}';
                const agentAssistJson = JSON.parse(acpConfig);
                const providerId = (_a = agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.Params) === null || _a === void 0 ? void 0 : _a.providerId;
                if (agentAssistJson && providerId === AgentAssistProvider.AGENT_COPILOT) {
                    this.copilotService.storeAgentAssistConfig(agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.ContactId.toString(), agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.MediaType, agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.AgentAssistId);
                }
            });
        };
        this.auth = CXoneAuth.instance;
        this.cxoneUser = CXoneUser.instance;
        this.onLeaderElectionChange();
        this.subscribeRequestMessage();
        this.subscribeResponseMessage();
        window.addEventListener(AuthStatus.REFRESH_TOKEN_SUCCESS, this.handleRefreshTokenSuccess.bind(this));
    }
    /**
     * Method to create singleton object of the class
     * ```
     * @example
     * const cxoneClient = CXoneClient.instance();
     * ```
     */
    static get instance() {
        if (!CXoneClient.singleton) {
            CXoneClient.singleton = new CXoneClient();
        }
        return CXoneClient.singleton;
    }
    /**
     * Method to initialize auth dependent module when authentication gets successful
     * @example
     * ```
     * this.initAuthDependentModules();
     * ```
     */
    initAuthDependentModules() {
        return __awaiter(this, void 0, void 0, function* () {
            this.hasInitModuleInitiated = true;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            CXoneClient.instance;
            CXoneLeaderElector.instance.start();
            this.acdSessionManager = ACDSessionManager.instance;
            const authToken = yield this.auth.validateFtAndGetDecryptedToken();
            authToken && this.auth.setAuthToken(authToken);
            const accessToken = this.auth.getAuthToken().accessToken;
            const cxOneConfig = this.auth.getCXoneConfig();
            const userInfo = this.cxoneUser.getUserInfo();
            this.skillActivityQueue = new CXoneSkillActivityQueue(this);
            AdminService.instance.initialize(accessToken, cxOneConfig, userInfo);
            this.copilotNotificationClient = new CopilotNotificationClient();
            this.cxoneCustomerCard = new CustomerCardService();
            this.directory = new CXoneDirectory();
            this.agentPermission = new CXoneAgentPermission();
            this.agentSetting = new CXoneAgentSetting();
            this.agentContactHistory = new CXoneAgentContactHistory();
            this.cxoneTenant = new CXoneTenant();
            this.wemSchedule = new WemSchedule();
            this.iexService = new IEXService();
            this.screenAgent = new ScreenAgentService();
            this.commitment = new CommitmentService();
            this.common = new CommonService();
            this.teamService = new TeamService();
            this.performanceReport = new CXoneRealtimeReportService();
            this.presenceSyncService = new PresenceSyncService();
            this.createAutoSummaryService();
            this.createAutoSummaryNotificationService();
            this.createAgentAssistWSService();
            this.copilotService = new CopilotService();
            this.transcript = new TranscriptService();
            this.notification = new CXoneNotificationManager(CXoneClient.instance.cxoneTenant);
            this.voiceBioHubService = new VoiceBioHubService();
            this.cxoneTenant.checkProductEnablement([CXoneProductFeature.UI_QUEUE_WS]).then((resp) => {
                this.isUIQueueEnabled = !!resp;
                this.logger.info('initAuthDependentModules', 'UI Queue enablement: ' + this.isUIQueueEnabled);
            }).catch(() => {
                this.logger.error('initAuthDependentModules', 'Failed to check UI Queue enablement');
            });
            HttpUtilService.originatingServiceIdentifier =
                CXoneAuth.instance.authSettings.originatingServiceIdentifier ||
                    LocalStorageHelper.getItem(StorageKeys.ORIGINATING_SERVICE_IDENTIFIER) ||
                    OriginatingServiceIdentifier.CXONE_AGENT;
        });
    }
    /**
     * method to initialize AgentIntegrationConfigurationService
     * @example
     * ```
     * CXoneClient.instance.initAgentIntegrationConfigurationService();
     * ```
     */
    initAgentIntegrationConfigurationService() {
        this.agentIntegrationConfigurationService = new AgentIntegrationConfigurationService();
    }
    /**
     * Clears out all Local Storage except Settings
     * Any other items thst should persist can be added
     * if needed.
     *
     * @example  clearCxoneLocalStorage
     */
    clearCxoneLocalStorage() {
        const keysToPersist = Object.values(NotificationSettings).concat([
            StorageKeys.CXONE_NAVIGATION_ITEMS,
            StorageKeys.EXTERNAL_PRODUCT_URLS,
            StorageKeys.ACTIVE_CUSTOMWORKSPACE,
            StorageKeys.SORT_CRITERIA_DIGITAL,
            StorageKeys.SORT_ORDER_DIGITAL,
            StorageKeys.VOICE_PREFERENCE,
            StorageKeys.FAVORITE_AGENT_STATES,
            StorageKeys.AGENT_SCREEN_SIZE,
            StorageKeys.CXA_FAV_AGENT_STATES
        ]);
        try {
            const length = localStorage.length;
            const storageKey = Object.keys(localStorage);
            for (let i = 0; i < length; i++) {
                const key = storageKey[i];
                if (!keysToPersist.includes(key)) {
                    LocalStorageHelper.removeItem(key);
                }
            }
        }
        catch (e) {
            this.logger.error('clearCxoneLocalStorage ', JSON.stringify(e));
        }
    }
    /**
     * Method to clear local and session storage
     * @example
     * ```
     * clearCache()
     * ```
     */
    clearCache() {
        return __awaiter(this, void 0, void 0, function* () {
            // defocus contact before logout
            this.clearCxoneLocalStorage();
            SessionStorageHelper.clearStorage();
            this.terminateCXoneUtilWorker();
            /*
              Temporary changes until we have backend support for favorites -
              Do not clear index DB on logout in order to maintain directory favorites for same Agent log in.
              Index DB would be cleared when a new Agent logs in to the same workstation.
            */
            //await clearIndexDbStore(IndexDBStoreNames.DIRECTORY);
            // we are storing all skill details into directory indexed db store under the 'allskills' key 
            // whenever agent log out we need to clear the 'allskills' key data from indexed DB.
            yield clearIndexDbKey(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.ALL_SKILLS);
            yield clearIndexDbKey(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.SKILL_ACTIVITY);
            yield clearIndexDbStore(IndexDBStoreNames.DIGITAL);
            yield clearIndexDbKey(IndexDBStoreNames.NOTIFICATIONS, IndexDBKeyNames.WEM_NOTIFICATIONS); // Clearing only WEM Notifications as part of AW-9033
            yield clearIndexDbStore(IndexDBStoreNames.COPILOT);
            return;
        });
    }
    /**
     * Method to terminate util worker
     * @example
     * ```
     * terminateCXoneUtilWorker()
     * ```
     */
    terminateCXoneUtilWorker() {
        if (CXoneLeaderElector.instance.isLeader) {
            this.auth.terminateUtilWorker();
        }
        else {
            // broadcast data
            const msg = {
                type: MessageType.TERMINATE_CXONE_UTIL_WORKER,
            };
            MessageBus.instance.postRequest(msg);
        }
    }
    /**
     * handler for update the refresh token
     */
    handleRefreshTokenSuccess() {
        this.logger.info('handleRefreshTokenSuccess', 'Token updated successfully through refresh token flow');
        const accessToken = this.auth.getAuthToken().accessToken;
        AdminService.instance.setAccessToken(accessToken);
        ACDSessionManager.instance.setAccessToken(accessToken);
    }
    /**
     * create auto summary service object
     * @example autoSummaryService
    */
    createAutoSummaryService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.autoSummaryService = new AutoSummaryService();
            }
            catch (error) {
                if (error instanceof Error) {
                    this.logger.error('autoSummaryService', 'failed to create AutoSummaryService');
                }
            }
        });
    }
    /**
     * create auto summary notification service object
     * @example createAutoSummaryNotificationService()
    */
    createAutoSummaryNotificationService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.autoSummaryNotificationService = new AutoSummaryNotificationService();
            }
            catch (error) {
                if (error instanceof Error) {
                    this.logger.error('createAutoSummaryNotificationService', 'failed to create AutoSummaryNotificationService');
                }
            }
        });
    }
    /**
     * create Agent Assist Web Socket service object
     * @example this.createAgentAssistWSService();
     */
    createAgentAssistWSService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.agentAssistWSService = new AgentAssistWSService();
                //This logic works when only active contact Ids are stored in IndexDb(that is the current architecture), so all IndexedDb entries need to be reloaded
                const completeGetNextData = yield this.agentAssistWSService.agentAssistProcessorService.getAllAgentAssistGetNextFromIndexDb();
                completeGetNextData === null || completeGetNextData === void 0 ? void 0 : completeGetNextData.forEach((getNextData) => {
                    this.acdSessionManager.agentAssistWSSubject.next(getNextData);
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    this.logger.error('createAgentAssistWSService', error.message);
                }
            }
        });
    }
    /**
     * Method to get feedback categories and priorities
     * @returns  - It returns the feedback categories and priorities
     * @example
     * ```
     * getFeedbackCategoriesAndPriorities();
     * ```
     */
    getFeedbackCategoriesAndPriorities() {
        return AdminService.instance.getFeedbackCategoriesAndPriorities();
    }
    /**
     * Method to submit feedback issue
     * @returns  - promise result from submit feedback post
     * @example
     * ```
     * submitFeedback();
     * ```
     */
    submitFeedback(feedbackData) {
        return AdminService.instance.submitFeedback(feedbackData);
    }
}
//# sourceMappingURL=cxone-client.js.map