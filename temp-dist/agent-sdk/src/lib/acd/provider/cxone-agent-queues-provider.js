import { __awaiter } from "tslib";
import { AuthStatus } from '@nice-devone/auth-sdk';
import { CXoneLeaderElector, MessageBus, MessageType, Queue } from '@nice-devone/common-sdk';
import { ACDSessionManager, ApiUriConstants, FeatureToggleService, HttpClient, HttpUtilService, LoadWorker, Logger, UrlUtilsService, } from '@nice-devone/core-sdk';
/**
 * Agent Queues Provider Class
 */
export class CXoneAgentQueuesProvider {
    /**
     * Creates agent queue provider
     * @example - const provider = new CXoneAgentQueuesProvider()
     */
    constructor() {
        this.logger = new Logger('SDK', 'CXoneAgentQueuesProvider');
        this.acdSession = ACDSessionManager.instance;
        this.baseUri = '';
        this.apiFacadeBaseUri = '';
        this.utilService = new HttpUtilService();
        this.cxoneClient = {};
        this.urlUtilService = new UrlUtilsService();
        this.agentId = '';
        this.isIncreasedQueuesPolling = FeatureToggleService.instance.getFeatureToggleSync("release-cx-agent-increase-queues-api-polling-AW-46709" /* FeatureToggles.INCREASE_QUEUES_POLLING_TOGGLE */);
        // if the FT is enabled then polling interval will be 30 seconds else 5 seconds
        this.pollingInterval = this.isIncreasedQueuesPolling ? 30000 : 5000;
        this.isQueuesFeatureToggleEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-queue-detail-microservice-integration-AW-42779" /* FeatureToggles.QUEUES_FEATURE_TOGGLE */) || false;
        window.addEventListener(AuthStatus.REFRESH_TOKEN_SUCCESS, () => this.restartWorker(this.agentId));
    }
    /**
     * Used to set the directory base instance to access the subject from the base class
     * @example -
     * ```
     * const agentQueuesProvider = new CXoneAgentQueuesProvider();
     * agentQueuesProvider.setACDSdkBaseInstance(this);
     * ```
     */
    setACDSdkBaseInstance(cxoneClient) {
        this.cxoneClient = cxoneClient;
    }
    /**
     * Used to initiate the polling for agent queue data
     * @example -
     * ```
     * const agentQueuesProvider = new CXoneAgentQueuesProvider();
     * this.agentQueuesProvider.agentQueuesPolling();
     * ```
     */
    agentQueuesPolling(agentId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.agentId = agentId;
            if (this.pollingWorker) {
                this.logger.info('agentQueuesPolling', 'agentQueuesPolling is already started');
                return;
            }
            this.logger.info('agentQueuesPolling', 'agentQueuesPolling in CXoneAgentQueuesProvider');
            this.baseUri = this.acdSession.cxOneConfig.acdApiBaseUri;
            this.apiFacadeBaseUri = this.acdSession.cxOneConfig.apiFacadeBaseUri;
            const authToken = this.acdSession.accessToken;
            const requestParams = {
                fields: '',
                updatedSince: new Date(0).toISOString(),
            };
            if (this.baseUri && authToken) {
                const reqInit = {
                    headers: this.utilService.initHeader(authToken).headers,
                };
                if (!this.pollingWorker) {
                    this.initAgentQueuesWorker();
                    this.pollingWorker.onmessage = (response) => {
                        this.handleAgentQueueResponse(response.data);
                    };
                }
                const monolithApiUrl = this.baseUri +
                    this.urlUtilService.appendQueryString(ApiUriConstants.AGENT_QUEUE_URI.replace('{agentId}', agentId), requestParams);
                const newApiUrl = this.apiFacadeBaseUri +
                    this.urlUtilService.appendQueryString(ApiUriConstants.AGENT_QUEUE_URI_NEW.replace('{agentId}', agentId), requestParams);
                let url = monolithApiUrl;
                if (this.isQueuesFeatureToggleEnabled) {
                    yield HttpClient.get(newApiUrl, reqInit).then(() => {
                        url = newApiUrl;
                    }, (error) => {
                        var _a, _b;
                        if (((_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.status) === 302) {
                            url = monolithApiUrl;
                            this.logger.info('agentQueuesPolling', 'New microservice is returning 302, calling monolith API');
                        }
                        else {
                            url = newApiUrl;
                            this.logger.info('agentQueuesPolling', `New microservice returned ${(_b = error === null || error === void 0 ? void 0 : error.data) === null || _b === void 0 ? void 0 : _b.status}, continuing polling with new API`);
                        }
                    });
                }
                this.pollingWorker.postMessage({
                    type: 'agent-polling',
                    requestParams: { url: url, method: 'GET', request: reqInit },
                    pollingOptions: { pollingInterval: this.pollingInterval },
                });
            }
        });
    }
    /**
     * Callback method which will passed on to the worker and will be executed after the polling api response
     * then will publish to the subject subscriber with the agent queue data
     * @param response - agent queue api response object
     * @example -
     * ```
     * handleAgentQueueResponse(data);
     * ```
     */
    handleAgentQueueResponse(response) {
        if (response) {
            if (CXoneLeaderElector.instance.isLeader) {
                const msg = {
                    type: MessageType.AGENT_QUEUE_POLLING_RESPONSE,
                    data: response,
                };
                MessageBus.instance.postResponse(msg);
            }
            const agentQueues = this.formatAgentQueueResponse(response);
            this.cxoneClient.skillActivityQueue.agentQueueSubject.next(agentQueues);
        }
    }
    /**
     * This method to format agent queues api response and return the agent queue model object
     * @param response -  agent queue api response object
     * @returns - agent queue
     * @example -
     * ```
     * formatAgentQueueResponse(response);
     * ```
     */
    formatAgentQueueResponse(response) {
        var _a;
        const agentQueues = {};
        if (((_a = response === null || response === void 0 ? void 0 : response.resultSet) === null || _a === void 0 ? void 0 : _a.queues) && response.resultSet.queues.length > 0) {
            response.resultSet.queues.forEach((queue) => {
                const queueData = new Queue();
                queueData.parse(queue);
                agentQueues[queue.skillId] = queueData;
            });
        }
        return agentQueues;
    }
    /**
     * Use to initializing the util worker and will return the method inside the worker
     * @example
     * ```
     * this.initAgentQueuesWorker();
     * ```
     */
    initAgentQueuesWorker() {
        const loader = new LoadWorker();
        this.pollingWorker = loader.getWorker('util-worker', 'ccf-agent-queue-polling-worker');
    }
    /**
     * Use to restart worker
     * @example
     * ```
     * this.restartWorker(agentId: string);
     * ```
     */
    restartWorker(agentId) {
        if (this.pollingWorker) {
            this.terminatePolling();
            this.agentQueuesPolling(agentId);
        }
    }
    /**
     * Use to terminate the agent queue worker
     * @example -
     * ```
     * this.terminatePolling
     * ```
     */
    terminatePolling() {
        var _a;
        (_a = this.pollingWorker) === null || _a === void 0 ? void 0 : _a.terminate();
        this.pollingWorker = undefined;
    }
}
//# sourceMappingURL=cxone-agent-queues-provider.js.map