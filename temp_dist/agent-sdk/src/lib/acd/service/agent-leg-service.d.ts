import { HttpResponse } from '@nice-devone/common-sdk';
import { HttpUtilService, Logger } from '@nice-devone/core-sdk';
/**
 * Class to handle agent leg
 */
export declare class AgentLegService {
    logger: Logger;
    protected utilService: HttpUtilService;
    private acdSession;
    /**
     * @example
     * ```
     * const agentLegSvc = new AgentLegService();
     * ```
     */
    constructor();
    /**
     * Method to connect agent leg
     * @example
     * ```
     * dialAgentLeg();
     * ```
     */
    dialAgentLeg(): Promise<HttpResponse>;
    /**
     * Method to disconnect agent leg
     * @example
     * ```
     * endAgentLeg();
     * ```
     */
    endAgentLeg(): Promise<HttpResponse>;
}
