/**
 * Event Hub Provider Class
 */
export declare class CXoneEventHubProvider {
    private logger;
    private auth;
    private utilService;
    eventHubWorker: any;
    /**
     * Method to initiate the event hub worker for digital contact to invoke event hub subscription API
     * @example - eventHubSubscription(['123', '763'])
     */
    eventHubSubscription(digitalContacts: Array<string>): void;
    /**
     * Callback method which will passed on to the worker and will be executed after event hub epi response
     * then will use where we need
     * @param response - event hub subscription response
     * @example -
     * ```
     * handleEventHubSubscriptionResponse(response);
     * ```
     */
    private handleEventHubSubscriptionResponse;
    /**
     * Used for initializing the event hub worker and will return the method inside the worker
     * @example -
     * ```
     * this.initEventHubWorker
     * ```
     */
    initEventHubWorker(): void;
    /**
     * Used to terminate the polling of event hub api
     * @example -
     * ```
     * this.eventHubProvider.terminatePolling();
     * ```
     */
    terminatePolling(): void;
}
