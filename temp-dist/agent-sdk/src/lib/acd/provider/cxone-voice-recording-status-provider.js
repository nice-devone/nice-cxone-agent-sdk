import { __awaiter } from "tslib";
import { AuthStatus, CXoneUser } from '@nice-devone/auth-sdk';
import { CXoneLeaderElector, CXoneSdkError, CXoneSdkErrorType, PermissionKeys, PermissionValues, WemNotificationRecordingData } from '@nice-devone/common-sdk';
import { ACDSessionManager, ApiUriConstants, HttpClient, HttpUtilService, LoadWorker, Logger } from '@nice-devone/core-sdk';
import { CXoneClient } from '../../cxone-client';
/**
 * @remarks - This class is used to provide the status of voice recording in CXOne.
 */
export class CxOneVoiceRecordingStatusProvider {
    /**
    * constructor which sets agent session instance
    * @example
    * ```
    * const cxOneVoiceRecordingStatusProvider = new CxOneVoiceRecordingStatusProvider();
    * ```
    */
    constructor(notificationBase) {
        this.baseUri = '';
        this.getVoiceRecStatusPollingisActive = false;
        this.loader = new LoadWorker();
        this.logger = new Logger('Agent-SDK', 'CxOneVoiceRecordingStatusProvider');
        this.utilService = new HttpUtilService();
        this.notificationBase = {};
        this.isRecordingNotificationEnabled = null;
        this.agentSession = ACDSessionManager.instance;
        this.notificationBase = notificationBase;
        window.addEventListener(AuthStatus.REFRESH_TOKEN_SUCCESS, () => {
            this.restartWorker();
        });
    }
    /**
       * @remarks - This method returns the status of voice recording in CXOne.
       * @example
       * ```
       * const voiceRecordingStatus = await cxOneVoiceRecordingStatusProvider.getVoiceRecordingStatus();
       * ```
       * @returns - A promise that resolves to a boolean indicating whether voice recording is enabled or not.
       */
    getVoiceRecordingStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const userDetails = CXoneUser.instance.getUserInfo();
                const recordingStatusPath = ApiUriConstants.GET_RECORDING_STATUS.replace('{userId}', userDetails.userId);
                const authToken = this.agentSession.accessToken;
                this.baseUri = this.agentSession.cxOneConfig.apiFacadeBaseUri;
                const endpoint = this.baseUri + recordingStatusPath;
                const reqInit = {
                    headers: this.utilService.initHeader(authToken).headers,
                };
                HttpClient.get(endpoint, reqInit).then((response) => __awaiter(this, void 0, void 0, function* () {
                    if (response.status === 200) {
                        this.logger.info('getVoiceRecordingStatus', 'Successfully fetched voice recording status');
                        if (this.isRecordingNotificationEnabled === null) {
                            this.isRecordingNotificationEnabled = yield CXoneClient.instance.agentPermission.checkPermissions(PermissionKeys.REALTIME_RECORDING_NOTIFICATION, PermissionValues.VIEW);
                        }
                        const recordingStatusInfo = new WemNotificationRecordingData();
                        recordingStatusInfo.parseFromRecordingManagerApi(response.data);
                        recordingStatusInfo.isRealtimeNotificationEnabled = this.isRecordingNotificationEnabled;
                        resolve(recordingStatusInfo);
                    }
                }), (error) => {
                    this.logger.error('getVoiceRecordingStatus', 'Error fetching voice recording status' + error.toString());
                    reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, error === null || error === void 0 ? void 0 : error.message, error === null || error === void 0 ? void 0 : error.data));
                });
            });
        });
    }
    /**
     * Starts voice recording status polling
     * @example
     * ```
     * this.startVoiceRecordingStatusPolling();
     * ```
     */
    startVoiceRecordingStatusPolling() {
        this.logger.info('startVoiceRecordingStatusPolling', 'startVoiceRecordingStatusPolling in CxOneVoiceRecordingStatusProvider');
        this.baseUri = this.agentSession.cxOneConfig.apiFacadeBaseUri;
        if (this.voiceRecStatusWorker)
            this.stopVoiceRecordingStatusPolling();
        this.voiceRecStatusPolling();
    }
    /**
       * Calls keepalive api on worker thread
       * @param sessionId - sessionid
       * @example
       * ```
       * this.voiceRecStatusPolling('12345');
       * ```
       */
    voiceRecStatusPolling() {
        var _a;
        const userDetails = CXoneUser.instance.getUserInfo();
        const recordingStatusPath = ApiUriConstants.GET_RECORDING_STATUS.replace('{userId}', userDetails.userId);
        const authToken = this.agentSession.accessToken;
        const endpoint = this.baseUri + recordingStatusPath;
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
        };
        const pollingOptions = { isPolling: false, pollingInterval: 1000 };
        if (!this.voiceRecStatusWorker) {
            this.initVoiceRecStatusWorker();
            this.voiceRecStatusWorker.onmessage = (response) => {
                this.handleVoiceRecStatusPollingResponse(response);
            };
        }
        this.voiceRecStatusWorker.postMessage({ type: 'startVoiceRecStatusApiPolling', requestParams: { url: endpoint, request: reqInit, method: 'GET' }, pollingOptions, isLeader: (_a = CXoneLeaderElector.instance) === null || _a === void 0 ? void 0 : _a.isLeader });
        this.getVoiceRecStatusPollingisActive = true;
    }
    /**
       * Handles the response from the voice recording status polling
       * @param response - The response data from the worker
       * @example
       * ```
       * this.handleVoiceRecStatusPollingResponse(response);
       * ```
       */
    handleVoiceRecStatusPollingResponse(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isRecordingNotificationEnabled === null) {
                this.isRecordingNotificationEnabled = yield CXoneClient.instance.agentPermission.checkPermissions(PermissionKeys.REALTIME_RECORDING_NOTIFICATION, PermissionValues.VIEW);
            }
            this.logger.info('handleVoiceRecStatusPollingResponse', response);
            const recordingStatusInfo = new WemNotificationRecordingData();
            recordingStatusInfo.parseFromRecordingManagerApi(response.data);
            recordingStatusInfo.isRealtimeNotificationEnabled = this.isRecordingNotificationEnabled;
            this.logger.info('handleVoiceRecStatusPollingResponse', 'Successfully fetched voice recording status');
            this.notificationBase.onCXoneNotificationEvent.next(recordingStatusInfo);
        });
    }
    /**
       * Use to initializing the user slot worker and will return the method inside the worker
       * @example
       * ```
       * this.initVoiceRecStatusWorker();
       * ```
       */
    initVoiceRecStatusWorker() {
        this.voiceRecStatusWorker = this.loader.getWorker('user-slot-worker', 'ccf-voice-rec-status-worker');
    }
    /**
     * Use to restart worker
     * @example
     * ```
     * this.restartWorker();
     * ```
     */
    restartWorker() {
        if (this.voiceRecStatusWorker) {
            this.stopVoiceRecordingStatusPolling(true);
            this.getVoiceRecStatusPollingisActive && this.startVoiceRecordingStatusPolling();
        }
    }
    /**
     * Used to terminate the polling of recording manager service
     * @example -
     * ```
     * this.stopVoiceRecordingStatusPolling();
     * ```
     */
    stopVoiceRecordingStatusPolling(ifRestart) {
        var _a;
        (_a = this.voiceRecStatusWorker) === null || _a === void 0 ? void 0 : _a.terminate();
        this.voiceRecStatusWorker = undefined;
        if (!ifRestart) {
            this.getVoiceRecStatusPollingisActive = false;
        }
    }
}
//# sourceMappingURL=cxone-voice-recording-status-provider.js.map