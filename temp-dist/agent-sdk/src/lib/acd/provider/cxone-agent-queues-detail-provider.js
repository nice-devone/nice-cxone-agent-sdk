import { __awaiter } from "tslib";
import { AuthStatus } from '@nice-devone/auth-sdk';
import { AgentQueuesDetail, CXoneLeaderElector, MessageBus, MessageType } from '@nice-devone/common-sdk';
import { ACDSessionManager, ApiUriConstants, HttpClient, HttpUtilService, LoadWorker, Logger, UrlUtilsService } from '@nice-devone/core-sdk';
import { FeatureToggleService } from '../../feature-toggle/feature-toggle-services';
/**
 * Agent Queues Detail Provider Class
 */
export class CXoneAgentQueuesDetailProvider {
    /**
     * Create a directory provider.
     * @example -- Const provider = new CXoneAgentQueuesDetailProvider();
     */
    constructor() {
        this.logger = new Logger('SDK', 'CXoneAgentQueuesDetailProvider');
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
        this.isQueueDetailsFeatureToggleEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-queue-microservice-integration-AW-42779" /* FeatureToggles.QUEUES_DETAIL_FEATURE_TOGGLE */) || false;
        window.addEventListener(AuthStatus.REFRESH_TOKEN_SUCCESS, () => this.restartWorker(this.agentId));
    }
    /**
     * Used to set the directory base instance to access the subject from the base class
     * @example -
     */
    setACDSdkBaseInstance(cxoneClient) {
        this.cxoneClient = cxoneClient;
    }
    /**
     * Used to initiate the polling for agent queues detail data
     * @example -
     * ```
     * const agentQueuesDetailProvider = new CXoneAgentQueuesDetailProvider();
     * this.agentQueuesDetailProvider.agentQueuesDetailsPolling();
     * ```
     */
    agentQueuesDetailsPolling(agentId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.agentId = agentId;
            if (this.pollingWorker) {
                this.logger.info('agentQueuesDetailsPolling', 'agentQueuesDetailsPolling is already started');
                return;
            }
            this.logger.info('agentQueuesDetailsPolling', 'agentQueuesDetailsPolling in CXoneAgentQueuesDetailProvider');
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
                    this.initAgentQueuesDetailWorker();
                    this.pollingWorker.onmessage = (response) => {
                        this.handleAgentQueuesDetailResponse(response.data);
                    };
                }
                const monolithApiUrl = this.baseUri +
                    this.urlUtilService.appendQueryString(ApiUriConstants.AGENT_QUEUE_DETAIL_URI.replace('{agentId}', agentId), requestParams);
                const newApiUrl = this.apiFacadeBaseUri +
                    this.urlUtilService.appendQueryString(ApiUriConstants.AGENT_QUEUE_DETAIL_URI_NEW.replace('{agentId}', agentId), requestParams);
                let url = monolithApiUrl;
                if (this.isQueueDetailsFeatureToggleEnabled) {
                    yield HttpClient.get(newApiUrl, reqInit).then(() => {
                        url = newApiUrl;
                    }, (error) => {
                        var _a, _b;
                        if (((_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.status) === 302) {
                            url = monolithApiUrl;
                            this.logger.info('agentQueuesDetailsPolling', 'New microservice is returning 302, calling monolith API');
                        }
                        else {
                            url = newApiUrl;
                            this.logger.info('agentQueuesDetailsPolling', `New microservice returned ${(_b = error === null || error === void 0 ? void 0 : error.data) === null || _b === void 0 ? void 0 : _b.status}, continuing polling with new API`);
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
     * then will publish to the subject subscriber with the agent queues detail data
     * @param response - agent queues detail api response object
     * @example -
     * ```
     * handleAgentQueuesDetailResponse(data);
     * ```
     */
    handleAgentQueuesDetailResponse(response) {
        if (response) {
            if (CXoneLeaderElector.instance.isLeader) {
                const msg = {
                    type: MessageType.AGENT_QUEUE_DETAILS_POLLING_RESPONSE,
                    data: response,
                };
                MessageBus.instance.postResponse(msg);
            }
            const agentQueuesDetail = this.formatAgentQueuesDetailResponse(response);
            this.cxoneClient.skillActivityQueue.agentQueuesDetailSubject.next(agentQueuesDetail);
            this.cxoneClient.cxoneApiPerformanceMetrics.next(response.apiPerformanceMetrics);
        }
    }
    /**
     * Used to handle the agent queues detail api response and return the agent queues detail model object
     * @param response - the agent queues detail api response
     * @example -
     * ```
     * formatAgentQueuesDetailResponse(data);
     * ```
     * @returns - agent queue detail list
     */
    formatAgentQueuesDetailResponse(data) {
        var _a;
        const agentQueuesDetailList = [];
        if ((_a = data === null || data === void 0 ? void 0 : data.resultSet) === null || _a === void 0 ? void 0 : _a.contacts) {
            data.resultSet.contacts.forEach((contact) => {
                const agentQueuesDetail = new AgentQueuesDetail();
                agentQueuesDetail.parse(contact);
                agentQueuesDetailList.push(agentQueuesDetail);
            });
        }
        return agentQueuesDetailList;
    }
    /**
     * Use to initializing the util worker and will return the method inside the worker
     * @example
     * ```
     * this.initAgentQueuesDetailWorker();
     * ```
     */
    initAgentQueuesDetailWorker() {
        const loader = new LoadWorker();
        this.pollingWorker = loader.getWorker('util-worker', 'ccf-agent-queue-detail-polling-worker');
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
            this.agentQueuesDetailsPolling(agentId);
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
//# sourceMappingURL=cxone-agent-queues-detail-provider.js.map