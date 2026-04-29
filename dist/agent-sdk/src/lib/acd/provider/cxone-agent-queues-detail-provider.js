import { __awaiter } from "tslib";
import { AuthStatus } from '@nice-devone/auth-sdk';
import { AgentQueuesDetail, CXoneLeaderElector, MessageBus, MessageType } from '@nice-devone/common-sdk';
import { ACDSessionManager, ApiUriConstants, HttpUtilService, LoadWorker, Logger, UrlUtilsService, HttpClient } from '@nice-devone/core-sdk';
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
        this.boundHandleWorkerMessage = this.handleWorkerMessage.bind(this);
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
                const isTenantSegmentationEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-tenant-segmentation-AW-28101" /* FeatureToggles.TENANT_SEGMENTATION */);
                let queueUri = ApiUriConstants.AGENT_QUEUE_DETAIL_URI;
                let requestBaseUri = this.baseUri;
                if (this.isQueueDetailsFeatureToggleEnabled) {
                    queueUri = ApiUriConstants.AGENT_QUEUE_DETAIL_URI_NEW;
                    requestBaseUri = this.apiFacadeBaseUri;
                }
                else if (isTenantSegmentationEnabled) {
                    queueUri = ApiUriConstants.AGENT_QUEUE_DETAIL_URI_TS;
                }
                queueUri = queueUri.replace('{agentId}', agentId);
                let url = requestBaseUri +
                    this.urlUtilService.appendQueryString(queueUri, requestParams);
                const reqInit = {
                    headers: this.utilService.initHeader(authToken).headers,
                };
                if (!this.pollingWorker) {
                    this.initAgentQueuesDetailWorker();
                    this.pollingWorker.onmessage = this.boundHandleWorkerMessage;
                }
                if (this.isQueueDetailsFeatureToggleEnabled) {
                    yield HttpClient.get(url, reqInit).then(() => {
                        this.logger.info('agentQueuesDetailsPolling', 'Polling will continue with AGENT_QUEUE_DETAIL_URI_NEW');
                    }, (error) => {
                        var _a;
                        if (((_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.status) === 302) {
                            const fallbackQueueUri = (isTenantSegmentationEnabled
                                ? ApiUriConstants.AGENT_QUEUE_DETAIL_URI_TS
                                : ApiUriConstants.AGENT_QUEUE_DETAIL_URI).replace('{agentId}', agentId);
                            const fallbackUrl = this.baseUri + this.urlUtilService.appendQueryString(fallbackQueueUri, requestParams);
                            url = fallbackUrl;
                            this.logger.info('agentQueuesDetailsPolling', 'AGENT_QUEUE_DETAIL_URI_NEW returned 302, fallback to AGENT_QUEUE_DETAIL_URI');
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
     * Pre-bound worker message handler to prevent function recreation.
     * @param response - Worker response event
     */
    handleWorkerMessage(response) {
        this.handleAgentQueuesDetailResponse(response.data);
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