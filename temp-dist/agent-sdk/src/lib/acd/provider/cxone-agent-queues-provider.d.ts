import { CXoneClient } from '../../cxone-client';
/**
 * Agent Queues Provider Class
 */
export declare class CXoneAgentQueuesProvider {
    private logger;
    private acdSession;
    private baseUri;
    private apiFacadeBaseUri;
    private utilService;
    private cxoneClient;
    private urlUtilService;
    pollingWorker: any;
    private agentId;
    private isIncreasedQueuesPolling;
    private pollingInterval;
    private isQueuesFeatureToggleEnabled;
    /**
     * Creates agent queue provider
     * @example - const provider = new CXoneAgentQueuesProvider()
     */
    constructor();
    /**
     * Used to set the directory base instance to access the subject from the base class
     * @example -
     * ```
     * const agentQueuesProvider = new CXoneAgentQueuesProvider();
     * agentQueuesProvider.setACDSdkBaseInstance(this);
     * ```
     */
    setACDSdkBaseInstance(cxoneClient: CXoneClient): void;
    /**
     * Used to initiate the polling for agent queue data
     * @example -
     * ```
     * const agentQueuesProvider = new CXoneAgentQueuesProvider();
     * this.agentQueuesProvider.agentQueuesPolling();
     * ```
     */
    agentQueuesPolling(agentId: string): Promise<void>;
    /**
     * Callback method which will passed on to the worker and will be executed after the polling api response
     * then will publish to the subject subscriber with the agent queue data
     * @param response - agent queue api response object
     * @example -
     * ```
     * handleAgentQueueResponse(data);
     * ```
     */
    handleAgentQueueResponse(response: any): void;
    /**
     * This method to format agent queues api response and return the agent queue model object
     * @param response -  agent queue api response object
     * @returns - agent queue
     * @example -
     * ```
     * formatAgentQueueResponse(response);
     * ```
     */
    private formatAgentQueueResponse;
    /**
     * Use to initializing the util worker and will return the method inside the worker
     * @example
     * ```
     * this.initAgentQueuesWorker();
     * ```
     */
    initAgentQueuesWorker(): void;
    /**
     * Use to restart worker
     * @example
     * ```
     * this.restartWorker(agentId: string);
     * ```
     */
    private restartWorker;
    /**
     * Use to terminate the agent queue worker
     * @example -
     * ```
     * this.terminatePolling
     * ```
     */
    terminatePolling(): void;
}
