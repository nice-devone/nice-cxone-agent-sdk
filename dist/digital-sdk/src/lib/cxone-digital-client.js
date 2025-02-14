import { __awaiter } from "tslib";
import { CXoneProductFeature, SkillService, CXoneTenant, CXoneClient, FeatureToggleService } from '@nice-devone/agent-sdk';
import { CXoneLeaderElector } from '@nice-devone/common-sdk';
import { LocalStorageHelper, Logger, StorageKeys } from '@nice-devone/core-sdk';
import { CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import { CXoneDigitalWebsocket } from './digital/ws/cxone-digital-websocket';
import { DigitalService } from './digital/service/digital-service';
import { DigitalContactManager } from './contact/digital-contact-manager';
import { DigitalMessageNoteService } from './digital/service/digital-message-note-service';
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
         * Subscription for leader change event
         */
        this.onLeaderElectionChange = () => {
            CXoneLeaderElector.instance.onLeaderChanged.subscribe((isLeader) => {
                var _a, _b;
                if (isLeader) {
                    this.logger.info('onLeaderChanged', 'I AM THE LEADER');
                    // start refresh token flow
                    const isRefreshTokenFlowStarted = this.auth.startRefreshTokenCheck(this.auth.getAuthToken(), isLeader, this.auth.getAuthState().isTokenValid);
                    if (isRefreshTokenFlowStarted) {
                        // Update Digital agent status polling
                        if (!this.isStartedDigitalStatusPolling &&
                            ((_b = (_a = this.digitalContactManager) === null || _a === void 0 ? void 0 : _a.userSlotProvider) === null || _b === void 0 ? void 0 : _b.updateDigitalStatus))
                            this.digitalContactManager.userSlotProvider.updateDigitalStatus();
                        // Event Hub Subscription on Leader tab (Every 5 mins)
                        if (this.digitalContactManager.subscribeToEventHub)
                            this.digitalContactManager.subscribeToEventHub();
                    }
                }
            });
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
        this.digitalService = new DigitalService();
        this.digitalMessageNoteService = new DigitalMessageNoteService();
        this.cxoneTenant = new CXoneTenant();
        if (!CXoneClient.instance.hasInitModuleInitiated)
            CXoneClient.instance.initAuthDependentModules();
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
                        yield this.getDigitalUserDetails();
                        this.updateDfoWSUrl();
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
     * Method to update DFO URL
     * @example
     * ```
     * updateDfoWSUrl()
     * ```
     */
    updateDfoWSUrl() {
        const cxoneConfig = this.auth.getCXoneConfig();
        const isToggleEnabled = FeatureToggleService.instance.getFeatureToggleSync("utility-cxa-eventhub-websocket-url-change-AW-32020" /* FeatureToggles.EVENTHUB_WEBSOCKET_URL_CHANGE_FEATURE_TOGGLE */) || false;
        if (isToggleEnabled) {
            cxoneConfig.dfoWssUri = cxoneConfig.dfoWssUri.replace('wss://event-hub-de-', 'wss://eventhub-de-');
            this.auth.setCXoneConfig(cxoneConfig);
            LocalStorageHelper.setItem(StorageKeys.CXONE_CONFIG, cxoneConfig);
        }
    }
}
//# sourceMappingURL=cxone-digital-client.js.map