import { AgentQueuesDetailResponse } from '@nice-devone/common-sdk';
import { CXoneClient } from '../../cxone-client';
/**
 * Agent Queues Detail Provider Class
 */
export declare class CXoneAgentQueuesDetailProvider {
    private logger;
    private acdSession;
    private baseUri;
    private utilService;
    private cxoneClient;
    private urlUtilService;
    pollingWorker: any;
    private agentId;
    /**
     * Create a directory provider.
     * @example -- Const provider = new CXoneAgentQueuesDetailProvider();
     */
    constructor();
    /**
     * Used to set the directory base instance to access the subject from the base class
     * @example -
     */
    setACDSdkBaseInstance(cxoneClient: CXoneClient): void;
    /**
     * Used to initiate the polling for agent queues detail data
     * @example -
     * ```
     * const agentQueuesDetailProvider = new CXoneAgentQueuesDetailProvider();
     * this.agentQueuesDetailProvider.agentQueuesDetailsPolling();
     * ```
     */
    agentQueuesDetailsPolling(agentId: string): void;
    /**
     * Callback method which will passed on to the worker and will be executed after the polling api response
     * then will publish to the subject subscriber with the agent queues detail data
     * @param response - agent queues detail api response object
     * @example -
     * ```
     * handleAgentQueuesDetailResponse(data);
     * ```
     */
    handleAgentQueuesDetailResponse(response: AgentQueuesDetailResponse): void;
    /**
     * Used to handle the agent queues detail api response and return the agent queues detail model object
     * @param response - the agent queues detail api response
     * @example -
     * ```
     * formatAgentQueuesDetailResponse(data);
     * ```
     * @returns - agent queue detail list
     */
    private formatAgentQueuesDetailResponse;
    /**
     * Use to initializing the util worker and will return the method inside the worker
     * @example
     * ```
     * this.initAgentQueuesDetailWorker();
     * ```
     */
    initAgentQueuesDetailWorker(): void;
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
