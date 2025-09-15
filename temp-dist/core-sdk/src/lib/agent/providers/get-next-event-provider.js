import { Logger } from '../../../logger/logger';
import { HttpUtilService } from '../../http/http-util-service';
import { ACDSessionManager } from '../session/acd-session-manager';
import { StorageKeys } from '../../../constants/storage-key';
import { ApiUriConstants } from '../../../constants/api-uri-constants';
import { CXoneGetNextAdapter } from '../../adapter/cxone-get-next-adapter';
import { CXoneSdkErrorType, MessageBus, MessageType, } from '@nice-devone/common-sdk';
import { LoadWorker } from '../../worker/load-worker';
import { GetNextEventType } from '../../adapter';
import { FeatureToggleService } from '../../../util/feature-toggle-services';
/**
 * GetNextEventProvider to perform getNextEvent polling
 */
export class GetNextEventProvider {
    /**
     * constructor which sets agent session instance
     */
    constructor() {
        this.baseUri = '';
        this.logger = new Logger('lib.Agent', 'lib.GetNextEventProvider');
        this.utilService = new HttpUtilService();
        this.getNextEventAdapter = new CXoneGetNextAdapter();
        this.isRestartGetNextEventEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-get-next-event-restart-AW-37270" /* FeatureToggles.RESTART_GET_NEXT_EVENT_POLLING_FEATURE_TOGGLE */);
        /**
         * Captures data returned from get-next-event api
         * @param response - collection of events
         */
        this.onPollingExecuted = (response) => {
            var _a;
            const errorResponse = response === null || response === void 0 ? void 0 : response.data;
            //NOTE: This is for the Errors from the API failure PoV
            //NOTE: This is for the offline error which we get when the user is disconnected with the internet.
            if ((errorResponse &&
                Object.keys(errorResponse).length === 0 &&
                Object.getPrototypeOf(errorResponse) === Object.prototype &&
                (response === null || response === void 0 ? void 0 : response.errorType) === CXoneSdkErrorType.CXONE_API_ERROR) ||
                (((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.status) >= 400 /* HttpStatusCode.BAD_REQUEST */)) {
                //The above condition is to check for empty object inside data key and error shall be of cxone api error type to identify and distinguish it as a offline error event.
                this.logger.info('onPollingExecuted', 'Failure callback in getNextEventProvider in offline mode.');
                //NOTE: Call this for agent session end
                if ((response === null || response === void 0 ? void 0 : response.data.status) === 409) {
                    const endSessionEvent = [{
                            type: GetNextEventType.AGENT_SESSION_END_EVENT,
                        }];
                    this.getNextEventAdapter.handleGetNextResponse(endSessionEvent);
                    return;
                }
                const retryOptions = {
                    maxRetryAttempts: ApiUriConstants.TOTAL_RETRY_ATTEMPTS_FOR_OFFLINE_EVENTS,
                    retryInterval: ApiUriConstants.ERROR_RETRY_INTERVAL,
                };
                this.getNextEvents(retryOptions);
            }
            else {
                this.logger.info('onPollingExecuted', 'Success callback in getNextEventProvider');
                // update with new sessionId
                if (response === null || response === void 0 ? void 0 : response.sessionId) {
                    localStorage.setItem(StorageKeys.ACD_SESSION_ID, response.sessionId);
                    this.agentSession.setSessionId(response === null || response === void 0 ? void 0 : response.sessionId);
                    this.logger.info('onPollingExecuted', 'SessionId updated');
                }
                this.getNextEvents();
                if ((response === null || response === void 0 ? void 0 : response.events) && (response === null || response === void 0 ? void 0 : response.events.length) > 0) {
                    this.logger.info('onPollingExecuted', 'Events processed in getNextEventProvider');
                    this.getNextEventAdapter.handleGetNextResponse(response.events);
                    const msg = {
                        type: MessageType.GET_NEXT_EVENT_RESPONSE,
                        data: response.events,
                    };
                    MessageBus.instance.postResponse(msg);
                }
            }
        };
        /**
         * Captures data returned from get-next-event api after successful retry
         * @param data - collection of events
         */
        this.onPollingRetrySuccess = (response, maxRetryAttempts) => {
            var _a;
            const errorResponse = response === null || response === void 0 ? void 0 : response.data;
            const emptyObjectCheck = errorResponse &&
                Object.keys(errorResponse).length === 0 &&
                Object.getPrototypeOf(errorResponse) === Object.prototype;
            //Completely for error scenarios
            if (((response === null || response === void 0 ? void 0 : response.errorType) === CXoneSdkErrorType.CXONE_API_ERROR &&
                emptyObjectCheck) ||
                ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.status) >= 400) {
                if ((response === null || response === void 0 ? void 0 : response.data.status) === 409) {
                    this.logger.info('onPollingRetrySuccess', 'End session triggered');
                    const endSessionEvent = [{
                            type: GetNextEventType.AGENT_SESSION_END_EVENT,
                        }];
                    this.getNextEventAdapter.handleGetNextResponse(endSessionEvent);
                    return;
                }
                //As the max retry remaining is an optional value so it can be undefined, adding relevant condition to handle the undefined case for other than offline event so the app does not break.
                //We are subtracting the value with 10 because we need to send the connection retry attempt remaining so UI can directly use it.
                const attemptsRemaining = maxRetryAttempts
                    ? ApiUriConstants.TOTAL_RETRY_ATTEMPTS_FOR_OFFLINE_EVENTS -
                        maxRetryAttempts
                    : 0;
                const customEvent = [
                    {
                        Type: GetNextEventType.NETWORK_OFFLINE_EVENT,
                        //converted to string because the principle handleGetNextResponse function accepts only string. Type casting has been done on the modal side to re convert it to integer.
                        totalNetworkRequestExecuted: String(attemptsRemaining),
                        retryStatus: response.errorType,
                    }
                ];
                this.getNextEventAdapter.handleGetNextResponse(customEvent);
                this.postNetworkFailure(customEvent);
                this.logger.info('onPollingRetrySuccess', 'postNetworkFailure processed' + JSON.stringify(customEvent));
            }
            else {
                const customEvent = [
                    {
                        Type: GetNextEventType.NETWORK_OFFLINE_EVENT,
                        retryStatus: '',
                    }
                ];
                this.getNextEventAdapter.handleGetNextResponse(customEvent);
                this.postNetworkFailure(customEvent);
                // Success on retry
                this.logger.info('onPollingRetrySuccess', 'Success callback in getNextEventProvider');
                //NOTE: This terminates the util worker and function would be stopped
                this.terminateUtilWorker();
                // update with new sessionId
                if (response === null || response === void 0 ? void 0 : response.sessionId) {
                    localStorage.setItem(StorageKeys.ACD_SESSION_ID, response.sessionId);
                    this.agentSession.setSessionId(response === null || response === void 0 ? void 0 : response.sessionId);
                    this.logger.info('onPollingRetrySuccess', 'SessionId updated');
                }
                this.getNextEvents();
                if ((response === null || response === void 0 ? void 0 : response.events) && (response === null || response === void 0 ? void 0 : response.events.length) > 0) {
                    this.logger.info('onPollingRetrySuccess', 'Events processed in getNextEventProvider');
                    this.getNextEventAdapter.handleGetNextResponse(response.events);
                    const msg = {
                        type: MessageType.GET_NEXT_EVENT_RESPONSE,
                        data: response.events,
                    };
                    MessageBus.instance.postResponse(msg);
                }
            }
        };
        this.agentSession = ACDSessionManager.instance;
    }
    /**
     * The static method that controls the access to the singleton instance.
     * @example
     * ```
     * const getNextEventProvider = GetNextEventProvider.instance();
     * ```
     */
    static get instance() {
        if (!GetNextEventProvider.singleton) {
            GetNextEventProvider.singleton = new GetNextEventProvider();
        }
        return GetNextEventProvider.singleton;
    }
    /**
     * Starts GetNextEvents for specified agent session
     * @example
     * ```
     * this.startGetNextEvents();
     * ```
     */
    startGetNextEvents(sessionId) {
        this.logger.info('startGetNextEvents', 'startGetNextEvents in getNextEventProvider');
        this.baseUri = this.agentSession.cxOneConfig.acdApiBaseUri;
        if (sessionId) {
            if (this.getNextPollingWorker)
                this.terminateUtilWorker();
            this.getNextEvents(undefined, sessionId);
        }
        if (!this.getNextPollingWorker)
            this.getNextEvents();
    }
    /**
     * Calls get-next-event api on worker thread
     * @example
     * ```
     * this.getNextEvents(retryOptions, '12345');
     * ```
     */
    getNextEvents(retryOptions, sessionId) {
        try {
            this.logger.info('getNextEvents', 'getNextEvents started');
            // Retrigger get-next-event polling after 90 seconds if not executed
            if (this.isRestartGetNextEventEnabled) {
                this.getNextEventHandler = setTimeout(() => {
                    if (this.getNextEventHandler) {
                        this.logger.info('getNextEvents', 'Timeout executed for restart of getNextEvents');
                        this.terminateUtilWorker();
                        this.getNextEvents();
                    }
                }, 90000);
            }
            if (!sessionId) {
                sessionId = this.agentSession.getSessionId();
            }
            if (!sessionId) {
                this.logger.info('getNextEvents', 'SessionId not found');
                return;
            }
            const getNextPath = ApiUriConstants.GET_NEXT_EVENT_URI.replace('{sessionId}', sessionId).replace('{timeoutSec}', ApiUriConstants.GET_NEXT_EVENT_TIMEOUT);
            const authToken = this.agentSession.accessToken;
            const endpoint = this.baseUri + getNextPath;
            const reqInit = {
                headers: this.utilService.initHeader(authToken).headers,
            };
            this.logger.info('getNextEvents', 'Endpoint details are ' + endpoint);
            if (!this.getNextPollingWorker) {
                this.logger.info('getNextEvents', 'Creating worker for getNextEvents');
                this.initUtilWorker();
                this.getNextPollingWorker.onmessage = (response) => {
                    var _a;
                    if (this.isRestartGetNextEventEnabled) {
                        this.logger.info('getNextEvents', 'Response received and clearing timeout');
                        clearTimeout(this.getNextEventHandler);
                        this.getNextEventHandler = undefined;
                    }
                    if (((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.type) === 'retry') {
                        this.logger.info('getNextEvents', 'Response received for retry in getNextEvents');
                        this.onPollingRetrySuccess(response === null || response === void 0 ? void 0 : response.data, response.data.retryAttempt);
                    }
                    else {
                        this.logger.info('getNextEvents', 'Response received in getNextEvents');
                        this.onPollingExecuted(response === null || response === void 0 ? void 0 : response.data);
                    }
                };
            }
            this.getNextPollingWorker.postMessage({
                type: 'get-next-event',
                requestParams: { url: endpoint, method: 'GET', request: reqInit },
                retryOptions,
                pollingOptions: {
                    isPolling: false,
                    pollingInterval: 0,
                },
            });
            this.logger.info('getNextEvents', 'Post message to getNextEvents worker');
        }
        catch (error) {
            this.logger.error('getNextEvents', 'Error in getNextEvents' + JSON.stringify(error));
        }
    }
    /**
     * @example -This is used to post message to other tab in case of network error
     */
    postNetworkFailure(event) {
        const msg = {
            type: MessageType.GET_NEXT_EVENT_RESPONSE,
            data: event,
        };
        MessageBus.instance.postResponse(msg);
    }
    /**
     * Use to initializing the util worker and will return the method inside the worker
     * @example
     * ```
     * this.initUtilWorker();
     * ```
     */
    initUtilWorker() {
        const loader = new LoadWorker();
        this.getNextPollingWorker = loader.getWorker('util-worker', 'ccf-get-next-event-polling-worker');
        this.logger.info('initUtilWorker', 'GetNextEvents worker initialized');
    }
    /**
     * Use to terminate the util worker instance
     * @example
     * ```
     * this.terminateUtilWorker();
     * ```
     */
    terminateUtilWorker() {
        var _a;
        (_a = this.getNextPollingWorker) === null || _a === void 0 ? void 0 : _a.terminate();
        this.getNextPollingWorker = undefined;
        if (this.isRestartGetNextEventEnabled) {
            this.logger.info('terminateUtilWorker', 'Terminating worker and clearing timeout');
            clearTimeout(this.getNextEventHandler);
            this.getNextEventHandler = undefined;
        }
        this.logger.info('terminateUtilWorker', 'Terminating worker for getNextEvents');
    }
}
//# sourceMappingURL=get-next-event-provider.js.map