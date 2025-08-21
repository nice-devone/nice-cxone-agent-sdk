import { __awaiter } from "tslib";
import { AgentSessionStatus, CXoneLeaderElector, MessageBus, MessageType } from '@nice-devone/common-sdk';
import { LocalStorageHelper, Logger, StorageKeys } from '@nice-devone/core-sdk';
import { CXoneSession } from './acd/cxone-session/cxone-session';
import { CXoneClient, CXoneNotificationManager, SkillService, AgentLegService, FeatureToggleService } from '@nice-devone/agent-sdk';
import { AgentStateService } from './agent-state/service/agent-state-service';
import { CXoneIndicatorManager } from './acd/contact/cxone-indicator-manager';
import { CXoneScreenPop } from './acd/contact/cxone-screen-pop';
import { ContactManager } from './acd/contact/contact-manager';
import { AgentDetailService } from './agent-detials/service/agent-details-service';
/** This is the base class for ACD */
export class CXoneAcdClient {
    /**
     * get instance for agent auth and session
     *
     * ```
     * @example
     * const cxoneAcdClient = new CXoneAcdClient();
     * ```
     */
    constructor() {
        this.logger = new Logger('ACD', 'CXoneAcdClient');
        this.skillService = {};
        this.agentStateService = {};
        this.session = {};
        this.notification = {};
        this.agentLegService = {};
        this.contactManager = {};
        this.indicator = {};
        this.screenPop = {};
        this.agentDetailService = {};
        /**
         * Subscription for request message over broadcast channel
         */
        this.subscribeRequestMessage = () => {
            MessageBus.instance.onRequestMessage.subscribe((msg) => {
                if (CXoneLeaderElector.instance.isLeader) {
                    switch (msg.type) {
                        case MessageType.START_SESSION:
                            this.session.startSession(msg.data);
                            break;
                        case MessageType.END_SESSION:
                            this.session.endSession(msg.data);
                            break;
                        case MessageType.DYNAMIC_DIRECTORY_SEARCH:
                            CXoneClient.instance.directory.dynamicDirectory.searchDirectories(msg.data);
                            break;
                        case MessageType.END_DYNAMIC_DIRECTORY_SEARCH:
                            CXoneClient.instance.directory.dynamicDirectory.endDirectoriesSearch(msg.data);
                            break;
                        case MessageType.TERMINATE_CXONE_UTIL_WORKER:
                            CXoneClient.instance.auth.terminateUtilWorker();
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
                var _a, _b;
                switch (msg.type) {
                    case MessageType.END_SESSION:
                        this.session.onAgentSessionChange.next({
                            status: AgentSessionStatus.SESSION_END,
                        });
                        break;
                    case MessageType.RESTART_DIRECTORY_POLLING:
                        (_b = (_a = CXoneClient.instance.directory) === null || _a === void 0 ? void 0 : _a.directoryProvider) === null || _b === void 0 ? void 0 : _b.restartWorker();
                        break;
                    case MessageType.ACD_NOTIFICATION_ACK:
                        this.notification.onUpdateMessageEvent.next(msg.data);
                        break;
                    default:
                        break;
                }
            });
        };
        this.skillService = new SkillService();
        this.agentStateService = AgentStateService.instance;
        this.subscribeRequestMessage();
        this.subscribeResponseMessage();
    }
    /**
     * Method to create singleton object of the class
     * ```
     * @example
     * const cxoneAcdClient = CXoneAcdClient.instance();
     * ```
     */
    static get instance() {
        if (!CXoneAcdClient.singleton) {
            CXoneAcdClient.singleton = new CXoneAcdClient();
        }
        return CXoneAcdClient.singleton;
    }
    /**
     * method to initialize ACDEngagement
     *
     * ```
     * @example
     * initAcdEngagement();
     * ```
     */
    initAcdEngagement() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!CXoneClient.instance.hasInitModuleInitiated)
                yield CXoneClient.instance.initAuthDependentModules();
            this.session = new CXoneSession();
            this.agentLegService = new AgentLegService();
            this.indicator = new CXoneIndicatorManager();
            this.screenPop = new CXoneScreenPop();
            this.contactManager = new ContactManager();
            this.notification = new CXoneNotificationManager(CXoneClient.instance.cxoneTenant);
            this.agentDetailService = new AgentDetailService();
            this.updateUIQInstanceManagerURL();
        });
    }
    /**
     * method to return Team Unavailable Codes
     * @param teamId - TeamId
     * @returns - Team Unavailable Codes
     *
     * ```
     * @example
     * getTeamUnavailableCodes();
     * ```
     */
    getTeamUnavailableCodes(teamId) {
        return this.agentStateService.getTeamUnavailableCodes(false, teamId);
    }
    /**
     * Method to get agent skills
     * @param agentId - nullable Agent Id
     * @returns - agent skills details as an AgentSkill[]
     * @example
     * ```
     * getAgentSkills('1001') || getAgentSkills()
     * ```
     */
    getAgentSkills(agentId) {
        return this.skillService.getAgentSkills(agentId);
    }
    /**
     * Method to get cached agent skills
     * @param agentId - nullable Agent Id
     * @returns - cached agent skills details as an AgentSkill[]
     * @example
     * ```
     * getCachedAgentSkills('1001') || getCachedAgentSkills()
     * ```
     */
    getCachedAgentSkills(agentId) {
        return this.skillService.getCachedAgentSkills(agentId);
    }
    /**
     * Method to update the UIQ instance manager URL
     * @example
     * ```
     * updateUIQInstanceManagerURL();
     * ```
     */
    updateUIQInstanceManagerURL() {
        const isUiqInstanceManagerURLToggleEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-uiq-instance-manager-AW-38678" /* FeatureToggles.UIQ_INSTANCE_MANAGER_FEATURE_TOGGLE */) || false;
        if (isUiqInstanceManagerURLToggleEnabled) {
            const cxoneConfig = CXoneClient.instance.auth.getCXoneConfig();
            cxoneConfig.uiQueueWSBaseUri = cxoneConfig === null || cxoneConfig === void 0 ? void 0 : cxoneConfig.uiQueueWSBaseUri.replace('/ui-queue/du01/manager/node', '/ui-queue-common/instance-manager/get-du-node');
            CXoneClient.instance.auth.setCXoneConfig(cxoneConfig);
            LocalStorageHelper.setItem(StorageKeys.CXONE_CONFIG, cxoneConfig);
        }
    }
}
//# sourceMappingURL=cxone-acd-client.js.map