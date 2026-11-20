import { __awaiter } from "tslib";
import { AuthStatus, CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import { CXoneLeaderElector, MessageBus, MessageType } from '@nice-devone/common-sdk';
import { AdminService, Logger } from '@nice-devone/core-sdk';
import { CopilotNotificationClient } from './agent-copilot/copilot-notification-client';
import { CopilotService } from './agent-copilot/service/copilot-service';
/** This is the base class for Copilot */
export class CopilotClient {
    /**
     * get instance for agent auth and session
     * @example
     * ```
     * const cxoneClient = new CXoneClient();
     * ```
     */
    constructor() {
        this.logger = new Logger('ACD', 'CopilotClient');
        this.auth = {};
        this.cxoneUser = {};
        this.copilotNotificationClient = {};
        this.copilotService = {};
        this.isUIQueueEnabled = false;
        this.hasInitModuleInitiated = false;
        /**
           * Subscription for leader change event
           */
        this.onLeaderElectionChange = () => {
            CXoneLeaderElector.instance.onLeaderChanged.subscribe((isLeader) => {
                if (isLeader) {
                    this.logger.info('onLeaderChanged', 'I AM THE LEADER');
                    // start refresh token flow
                    let _isRefreshTokenFlowStarted = false;
                    try {
                        _isRefreshTokenFlowStarted = this.auth.startRefreshTokenCheck(this.auth.getAuthToken(), isLeader, this.auth.getAuthState().isTokenValid);
                    }
                    catch (error) {
                        this.logger.error('onLeaderChanged', 'Error in starting refresh token flow' + JSON.stringify(error));
                    }
                }
            });
        };
        /**
         * Subscription for response message over broadcast channel
         */
        this.subscribeResponseMessage = () => {
            MessageBus.instance.onResponseMessage.subscribe((msg) => {
                var _a;
                switch (msg.type) {
                    case MessageType.AGENT_COPILOT_RESPONSE:
                        if ((_a = this.copilotNotificationClient) === null || _a === void 0 ? void 0 : _a.broadcastCopilotNotifications) {
                            this.copilotNotificationClient.broadcastCopilotNotifications(msg.data);
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
        this.cxoneUser = CXoneUser.instance;
        this.auth = CXoneAuth.instance;
        // ownsAgenticWs: true — this is the csa-agent-copilot MFE's instance. When
        // COPILOT_MFE is enabled it owns the agentic WebSocket connection; the host
        // shell's CopilotNotificationClient (see cxone-client.ts) must defer to it.
        this.copilotNotificationClient = new CopilotNotificationClient({ ownsAgenticWs: true });
        this.copilotService = new CopilotService();
        this.onLeaderElectionChange();
        this.subscribeResponseMessage();
        window.addEventListener(AuthStatus.REFRESH_TOKEN_SUCCESS, this.handleRefreshTokenSuccess.bind(this));
    }
    /**
     * Method to create singleton object of the class
     * ```
     * @example
     * const copilotClient = CopilotClient.instance();
     * ```
     */
    static get instance() {
        if (!CopilotClient.singleton) {
            CopilotClient.singleton = new CopilotClient();
        }
        return CopilotClient.singleton;
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
            CopilotClient.instance;
            CXoneLeaderElector.instance.start();
            const authToken = yield this.auth.validateFtAndGetDecryptedToken();
            authToken && this.auth.setAuthToken(authToken);
            const accessToken = this.auth.getAuthToken().accessToken;
            const cxOneConfig = this.auth.getCXoneConfig();
            const userInfo = this.cxoneUser.getUserInfo();
            AdminService.instance.initialize(accessToken, cxOneConfig, userInfo);
        });
    }
    ;
    /**
     * handler for update the refresh token
     */
    handleRefreshTokenSuccess() {
        this.logger.info('handleRefreshTokenSuccess', 'Token updated successfully through refresh token flow');
        const accessToken = this.auth.getAuthToken().accessToken;
        AdminService.instance.setAccessToken(accessToken);
    }
}
//# sourceMappingURL=copilot-client.js.map