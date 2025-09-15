import { CXoneAuth } from '@nice-devone/auth-sdk';
import { ApiUriConstants, HttpUtilService, LoadWorker } from '@nice-devone/core-sdk';
import { CcfLogger } from '@nice-devone/agent-sdk';
/**
 * Event Hub Provider Class
 */
export class CXoneEventHubProvider {
    constructor() {
        this.logger = new CcfLogger('SDK', 'CXoneEventHubProvider');
        this.auth = CXoneAuth.instance;
        this.utilService = new HttpUtilService();
    }
    /**
     * Method to initiate the event hub worker for digital contact to invoke event hub subscription API
     * @example - eventHubSubscription(['123', '763'])
     */
    eventHubSubscription(digitalContacts) {
        this.logger.info('startPolling', 'startPolling in CXoneEventHubWorker');
        const baseUri = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const body = { 'relationObjectId': '', 'subscriptionType': '' };
        if (baseUri && authToken && digitalContacts.length !== 0) {
            if (!this.eventHubWorker) {
                this.initEventHubWorker();
                this.eventHubWorker.onmessage = (response) => {
                    this.handleEventHubSubscriptionResponse(response.data);
                };
            }
            const url = baseUri + ApiUriConstants.EVENT_HUB_SUBSCRIPTION_URI;
            const reqInit = {
                headers: this.utilService.initHeader(authToken, 'application/json').headers,
                body: body,
            };
            this.eventHubWorker.postMessage({
                type: 'startEventHubApiPolling',
                digitalContacts,
                requestParams: { url: url, method: 'POST', request: reqInit },
            });
        }
    }
    /**
     * Callback method which will passed on to the worker and will be executed after event hub epi response
     * then will use where we need
     * @param response - event hub subscription response
     * @example -
     * ```
     * handleEventHubSubscriptionResponse(response);
     * ```
     */
    handleEventHubSubscriptionResponse(response) {
        this.logger.info('handleEventHubSubscriptionResponse', response);
    }
    /**
     * Used for initializing the event hub worker and will return the method inside the worker
     * @example -
     * ```
     * this.initEventHubWorker
     * ```
     */
    initEventHubWorker() {
        const loader = new LoadWorker();
        if (!this.eventHubWorker) {
            this.eventHubWorker = loader.getWorker('event-hub-worker', 'ccf-event-hub-subscription');
        }
    }
    /**
     * Used to terminate the polling of event hub api
     * @example -
     * ```
     * this.eventHubProvider.terminatePolling();
     * ```
     */
    terminatePolling() {
        var _a;
        (_a = this.eventHubWorker) === null || _a === void 0 ? void 0 : _a.terminate();
        this.eventHubWorker = undefined;
    }
}
//# sourceMappingURL=cxone-event-hub-provider.js.map