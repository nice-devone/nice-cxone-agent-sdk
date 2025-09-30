import { __awaiter } from "tslib";
import { CXoneProductFeature, SkillService, CXoneTenant, CXoneClient, FeatureToggleService } from '@nice-devone/agent-sdk';
import { CXoneLeaderElector, MessageBus, MessageType, UserSlotsSchema } from '@nice-devone/common-sdk';
import { LocalStorageHelper, Logger, StorageKeys } from '@nice-devone/core-sdk';
import { CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import { CXoneDigitalWebsocket } from './digital/ws/cxone-digital-websocket';
import { DigitalService } from './digital/service/digital-service';
import { DigitalContactManager } from './contact/digital-contact-manager';
import { DigitalMessageNoteService } from './digital/service/digital-message-note-service';
import { CXoneDigitalUtil } from './digital/util/cxone-digital-util';
/** This is the base class for Digital */
export class CXoneDigitalClient {
    /**
     * get instance for agent auth and session
     * @example
     * ```
     * const cxoneDigitalClient = new CXoneDigitalClient();
     * ```
     */
    constructor() {
        this.logger = new Logger('DigitalSDK', 'DigitalClient');
        this.isStartedDigitalStatusPolling = false;
        this.skillService = {};
        this.cxoneTenant = {};
        this.cxoneUser = {};
        this.cxoneDigitalWebsocket = {};
        this.digitalService = {};
        this.digitalContactManager = {};
        this.auth = {};
        this.digitalMessageNoteService = {};
        /**
         * Method to subscribe message bus polling response message
         * @example
         * ```
         *  subscribePollingResponseMessage()
         * ```
        */
        this.subscribePollingResponseMessage = () => {
            var _a, _b;
            (_b = (_a = MessageBus === null || MessageBus === void 0 ? void 0 : MessageBus.instance) === null || _a === void 0 ? void 0 : _a.onResponseMessage) === null || _b === void 0 ? void 0 : _b.subscribe((msg) => {
                var _a;
                if ((msg === null || msg === void 0 ? void 0 : msg.type) === MessageType.START_USER_SLOT_API_POLLING) {
                    const userSlotResponse = UserSlotsSchema.validateSync(msg === null || msg === void 0 ? void 0 : msg.data, { stripUnknown: true });
                    (_a = this.digitalContactManager) === null || _a === void 0 ? void 0 : _a.parseUserSlotPollResponse(userSlotResponse, false);
                }
            });
        };
        /**
         * Subscription for leader change event
         */
        this.onLeaderElectionChange = () => {
            CXoneLeaderElector.instance.onLeaderChanged.subscribe((isLeader) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c;
                if (isLeader) {
                    this.logger.info('onLeaderChanged', 'I AM THE LEADER');
                    // start refresh token flow
                    let isRefreshTokenFlowStarted = false;
                    try {
                        isRefreshTokenFlowStarted = this.auth.startRefreshTokenCheck(this.auth.getAuthToken(), isLeader, this.auth.getAuthState().isTokenValid);
                    }
                    catch (error) {
                        this.logger.error('onLeaderChanged', 'Error in starting refresh token flow ' + JSON.stringify(error));
                    }
                    if (isRefreshTokenFlowStarted) {
                        // Calling manageUserSlotDetails to start polling of user-slot API once leader is elected an FT is on, in-order to avoid leader undefined issue
                        const isUserSlotFTEnabled = yield CXoneDigitalUtil.instance.isUserSlotFeatureToggleEnabled();
                        if (isUserSlotFTEnabled) {
                            (_a = this.digitalContactManager) === null || _a === void 0 ? void 0 : _a.manageUserSlotDetails();
                        }
                        // Update Digital agent status polling
                        if (!this.isStartedDigitalStatusPolling &&
                            ((_c = (_b = this.digitalContactManager) === null || _b === void 0 ? void 0 : _b.userSlotProvider) === null || _c === void 0 ? void 0 : _c.updateDigitalStatus))
                            this.digitalContactManager.userSlotProvider.updateDigitalStatus();
                        // Event Hub Subscription on Leader tab (Every 5 mins)
                        if (this.digitalContactManager.subscribeToEventHub)
                            this.digitalContactManager.subscribeToEventHub();
                    }
                }
            }));
        };
        this.auth = CXoneAuth.instance;
        this.onLeaderElectionChange();
        this.auth = CXoneAuth.instance;
        this.skillService = new SkillService();
        this.cxoneUser = CXoneUser.instance;
    }
    /**
     * Method to create singleton object of the class
     * ```
     * @example
     * const cxoneDigitalClient = CXoneDigitalClient.instance();
     * ```
     */
    static get instance() {
        if (!CXoneDigitalClient.singleton) {
            CXoneDigitalClient.singleton = new CXoneDigitalClient();
        }
        return CXoneDigitalClient.singleton;
    }
    /**
     * method to initialize DigitalEngagement
     * @example
     * ```
     * initDigitalEngagement();
     * ```
     */
    initDigitalEngagement() {
        return __awaiter(this, void 0, void 0, function* () {
            this.digitalService = new DigitalService();
            this.digitalMessageNoteService = new DigitalMessageNoteService();
            this.cxoneTenant = new CXoneTenant();
            if (!CXoneClient.instance.hasInitModuleInitiated)
                yield CXoneClient.instance.initAuthDependentModules();
            this.digitalContactManager = new DigitalContactManager();
            this.cxoneTenant = new CXoneTenant();
            this.cxoneUser = CXoneUser.instance;
            this.digitalMessageNoteService = new DigitalMessageNoteService();
            this.logger.info('initDigitalEngagement', 'this.cxoneTenant:' + this.cxoneTenant);
            this.cxoneTenant
                .checkProductEnablement([CXoneProductFeature.DIGITAL])
                .then((resp) => {
                if (resp) {
                    this.cxoneUser.checkUserDigitalEngagement().then((response) => __awaiter(this, void 0, void 0, function* () {
                        // @TODO: handled error from console now. will remove this quick fix after fall(AW-3982).
                        try {
                            this.digitalService = new DigitalService();
                            this.updateDfoApiUrl();
                            yield this.getDigitalUserDetails();
                            this.setDigitalWebSocketUri(); // DFO updateDfoWSUrl method is integrated within this logic as fallback (Cell Based Arch Revamp)
                            this.subscribePollingResponseMessage();
                            this.digitalContactManager.initializeDigital();
                            this.cxoneDigitalWebsocket = new CXoneDigitalWebsocket();
                            yield this.digitalService.getDigitalAgentStatus();
                            //On initial load we fetch skill details list and store into Indexed DB (customer and agent response time related data we get from this method).
                            this.skillService.getAllSkillsList();
                            // on initial load we fetch canEraseMessageContentAndUserNames flag and store into local storage
                            this.digitalService.getCanEraseMessageContentAndUserNames();
                            if (CXoneLeaderElector.instance.isLeader) {
                                this.isStartedDigitalStatusPolling = true;
                                this.digitalContactManager.userSlotProvider.updateDigitalStatus();
                            }
                            this.logger.info('initDigitalEngagement', 'Init Digital Engagement success ' + JSON.stringify(response));
                        }
                        catch (error) {
                            this.logger.error('initDigitalEngagement', 'Error in initiating digital engagement' +
                                JSON.stringify(error));
                        }
                    }), (error) => {
                        this.logger.error('initDigitalEngagement', 'Init Digital Engagement failed ' + JSON.stringify(error));
                    });
                }
            });
        });
    }
    /**
     * Get digital logged in user details like UserId to call other digital APIs
     * @example
     * ```
     * getDigitalUserDetails();
     * ```
     */
    getDigitalUserDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            // @TODO - We will move to this method.
            const response = yield this.digitalService.getDigitalUserDetails();
            const meApiResponse = JSON.parse(JSON.stringify(response));
            const userDetails = {
                digitalUserId: meApiResponse.user.id,
                digitalBrandId: meApiResponse.brand.id,
            };
            this.cxoneUser.setDigitalUserDetails(userDetails);
        });
    }
    /**
     * Method to clear local and session storage
     * @example
     * ```
     * clearDigitalCache()
     * ```
     */
    clearDigitalCache() {
        return __awaiter(this, void 0, void 0, function* () {
            // defocus contact before logout
            const contactIdToDefocus = LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_ID) ? LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_ID) : null;
            if (contactIdToDefocus) {
                const outboundContacts = LocalStorageHelper.getItem(StorageKeys.OUTBOUND_DIGITAL_CONTACTS, true);
                const isDraftContactMatched = outboundContacts && (outboundContacts === null || outboundContacts === void 0 ? void 0 : outboundContacts.length) > 0 ? true : false;
                if (!isDraftContactMatched) {
                    this.digitalContactManager.digitalContactService.deFocusContact(contactIdToDefocus).catch((err) => this.logger.error('deFocusContact', JSON.stringify(err)));
                }
            }
        });
    }
    /**
     * Method to update DFO API URL
     * @example
     * ```
     * updateDfoApiUrl()
     * ```
     */
    updateDfoApiUrl() {
        const cxoneConfig = this.auth.getCXoneConfig();
        const isToggleEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-dfo-api-facade-url-update-AW-44617" /* FeatureToggles.DFO_API_FACADE_URL_UPDATE */) || false;
        if (isToggleEnabled) {
            cxoneConfig.dfoApiBaseUri = cxoneConfig.dfoApiBaseUri.replace('https://api-de-', 'https://api-');
            this.auth.setCXoneConfig(cxoneConfig);
            LocalStorageHelper.setItem(StorageKeys.CXONE_CONFIG, cxoneConfig);
        }
    }
    /**
     * Method to fetch DFO Websocket URL from DX API & set in CXone config
     * @example
     * ```
     * setDigitalWebSocketUri()
     * ```
     */
    setDigitalWebSocketUri() {
        return __awaiter(this, void 0, void 0, function* () {
            const isDfoWSRevampToggleEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cx-agent-revamped-eventhub-websocket-AW-44146" /* FeatureToggles.DIGITAL_WEBSOCKET_REVAMP_TOGGLE */) || false;
            if (isDfoWSRevampToggleEnabled) {
                try {
                    const eventHubApiResponse = yield this.digitalService.getDigitalWebSocketBaseUri();
                    if (eventHubApiResponse && eventHubApiResponse.websocketUrl) {
                        this.logger.info('setDigitalWebSocketUri', 'New WebSocket URL successfully fetched from DX API' + JSON.stringify(eventHubApiResponse));
                        const loggedInUserInfo = this.cxoneUser.getUserInfo();
                        const cxoneConfig = this.auth.getCXoneConfig();
                        cxoneConfig.dfoWssUri = eventHubApiResponse.websocketUrl + '?tenantId=' + loggedInUserInfo.tenantId + '&userId=' + loggedInUserInfo.userId;
                        this.auth.setCXoneConfig(cxoneConfig);
                        LocalStorageHelper.setItem(StorageKeys.CXONE_CONFIG, cxoneConfig);
                    }
                    else {
                        this.logger.info('setDigitalWebSocketUri', 'No WebSocket URL Fetched from API, so Host Level URL retained');
                    }
                }
                catch (error) {
                    this.logger.error('setDigitalWebSocketUri', 'Exception while setting WebSocket URL from DX API' + JSON.stringify(error));
                }
            }
            else {
                this.logger.info('setDigitalWebSocketUri', 'No WebSocket URL Change as WS Revamp FT is OFF, So Host Level URL retained');
            }
        });
    }
}
//# sourceMappingURL=cxone-digital-client.js.map