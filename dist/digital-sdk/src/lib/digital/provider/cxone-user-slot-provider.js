import { CXoneLeaderElector, UserSlotsSchema } from '@nice-devone/common-sdk';
import { AuthStatus, CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import { ApiUriConstants, HttpUtilService, ACDSessionManager, LocalStorageHelper, StorageKeys, LoadWorker, } from '@nice-devone/core-sdk';
import { CcfLogger } from '@nice-devone/agent-sdk';
/**
 * UserSlot Provider Class
 */
export class CXoneUserSlotProvider {
    /**
     * Constructor for CXoneUserSlotProvider
     * @example
     * ```
     * new CXoneUserSlotProvider();
     * ```
     */
    constructor() {
        this.logger = new CcfLogger('SDK', 'CXoneUserSlotProvider');
        this.auth = CXoneAuth.instance;
        this.user = CXoneUser.instance;
        this.utilService = new HttpUtilService();
        this.digitalContactManager = {};
        // User slot API gets polled every 30 sec
        this.USER_SLOT_POLLING_INTERVAL_MS = 30000;
        this.DIGITAL_STATE_POLLING_INTERVAL_MS = 120000;
        this.acdSession = {};
        this.loader = new LoadWorker();
        this.getUserSlotPollingisActive = false;
        this.updateUserSlotPollingisActive = false;
        this.acdSession = ACDSessionManager.instance;
        window.addEventListener(AuthStatus.REFRESH_TOKEN_SUCCESS, () => this.restartWorker());
    }
    /**
     * Used to set the acd sdk base instance to access the subject from the base class
     * @example -
     */
    setUserSlotBaseInstance(DigitalContactManager) {
        this.digitalContactManager = DigitalContactManager;
    }
    /**
     * Method to initiate UserSlot worker for digital contact
     * @example - getUserSlots()
    */
    getUserSlots() {
        var _a;
        this.logger.info('startPolling', 'startPolling in CXoneUserSlotWorker');
        const baseUri = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        let userId = LocalStorageHelper.getItem(StorageKeys.DIGITAL_USER_ID);
        userId = userId ? userId : '';
        if (baseUri && authToken && userId) {
            if (!this.userSlotWorker) {
                this.initUserSlotWorker();
                this.userSlotWorker.onmessage = (response) => {
                    this.handleUserSlotSubscriptionResponse(response.data);
                };
            }
            const url = baseUri + ApiUriConstants.USER_SLOTS.replace('{userId}', userId);
            const reqInit = this.utilService.initHeader(authToken);
            const pollingOptions = { isPolling: false, pollingInterval: this.USER_SLOT_POLLING_INTERVAL_MS };
            this.userSlotWorker.postMessage({ type: 'startUserSlotApiPolling', requestParams: { url: url, request: reqInit }, pollingOptions, isLeader: (_a = CXoneLeaderElector.instance) === null || _a === void 0 ? void 0 : _a.isLeader });
            this.getUserSlotPollingisActive = true;
        }
    }
    /**
     * Method to initiate digital agent status worker
     * @example -
     * ```
     * this.updateDigitalStatus()
     * ```
     */
    updateDigitalStatus() {
        var _a;
        this.logger.info('startPolling', 'startPolling in updateDigitalUserStatusPolling');
        const baseUri = this.auth.getCXoneConfig().dfoApiBaseUri;
        let authToken = this.auth.getAuthToken().accessToken;
        let userId = LocalStorageHelper.getItem(StorageKeys.DIGITAL_USER_ID);
        userId = userId ? userId : '';
        if (baseUri && authToken && userId) {
            (_a = this.agentStateSubject) === null || _a === void 0 ? void 0 : _a.unsubscribe();
            if (!this.userSlotWorker) {
                this.initUserSlotWorker();
                this.userSlotWorker.onmessage = (response) => {
                    this.handleUserSlotSubscriptionResponse(response.data);
                };
            }
            const pollingOptions = {
                isPolling: false,
                pollingInterval: this.DIGITAL_STATE_POLLING_INTERVAL_MS,
            };
            const dfoUserStatusUrl = baseUri +
                ApiUriConstants.UPDATE_DIGITAL_USER_STATUS.replace('{dfoAgentId}', userId);
            this.agentStateSubject = this.acdSession.agentStateSubject.subscribe((agentState) => {
                this.logger.debug('updateDigitalStatus - agentState ', JSON.stringify(agentState));
                authToken = this.auth.getAuthToken().accessToken;
                const reqIniti = {
                    headers: this.utilService.initHeader(authToken, 'application/json').headers,
                    body: {},
                };
                const digitalStatus = LocalStorageHelper.getItem(StorageKeys.DIGITAL_AGENT_STATUS, true);
                const digiCurStatus = agentState.currentState.state.toLowerCase() === 'unavailable'
                    ? digitalStatus.notAvailable
                    : digitalStatus.online;
                this.userSlotWorker.postMessage({
                    type: 'updateDigitalUserStatusPolling',
                    requestParams: { url: dfoUserStatusUrl, request: reqIniti },
                    pollingOptions,
                    digitalAgentState: digiCurStatus,
                });
                this.updateUserSlotPollingisActive = true;
            });
        }
    }
    /**
     * Callback method which will passed on to the worker and will be executed after digital user status api response
     * then will use where we need
     * @param response - Digital user status subscription response
     * @example -
     * ```
     * handleResponse(response);
     * ```
     */
    handleResponse(resp) {
        this.logger.info('handleResponse Digital user status', JSON.stringify(resp));
    }
    /**
     * Callback method which will passed on to the worker and will be executed after user slot epi response
     * then will use where we need
     * @param response - user slot subscription response
     * @example -
     * ```
     * handleUserSlotSubscriptionResponse(response);
     * ```
     */
    handleUserSlotSubscriptionResponse(response) {
        if (response.type === 'startUserSlotApiPolling') {
            this.logger.info('handleUserSlotSubscriptionResponse', JSON.stringify(response));
            const validatedResp = UserSlotsSchema.validateSync(response, { stripUnknown: true });
            this.digitalContactManager.onUserSlotEvent.next(validatedResp);
        }
        else {
            this.handleResponse(response);
        }
    }
    /**
     * Used for initializing the user slot worker and will return the method inside the worker
     * @example -
     * ```
     * this.initUserSlotWorker()
     * ```
     */
    initUserSlotWorker() {
        this.userSlotWorker = this.loader.getWorker('user-slot-worker', 'ccf-digital-user-slot-polling');
    }
    /**
     * Use to restart worker
     * @example
     * ```
     * this.restartWorker();
     * ```
     */
    restartWorker() {
        if (this.userSlotWorker) {
            this.terminatePolling(true);
            this.getUserSlotPollingisActive && this.getUserSlots();
            this.updateUserSlotPollingisActive && this.updateDigitalStatus();
        }
    }
    /**
     * Used to terminate the polling of user slot api
     * @example -
     * ```
     * this.userSlotProvider.terminatePolling();
     * ```
     */
    terminatePolling(ifRestart) {
        var _a;
        (_a = this.userSlotWorker) === null || _a === void 0 ? void 0 : _a.terminate();
        this.userSlotWorker = undefined;
        if (!ifRestart) {
            this.getUserSlotPollingisActive = false;
            this.updateUserSlotPollingisActive = false;
        }
    }
    /**
     * Used to terminate the polling of user slot api
     * @example -
     * ```
     * this.userSlotProvider.terminateUserSlotPolling();
     * ```
     */
    terminateUserSlotPolling() {
        this.userSlotWorker.postMessage({
            type: 'terminateUserSlotPolling',
        });
    }
}
//# sourceMappingURL=cxone-user-slot-provider.js.map