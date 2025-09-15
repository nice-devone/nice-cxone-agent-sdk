import { AgentDetails } from '@nice-devone/common-sdk';
import { Logger, HttpUtilService } from '@nice-devone/core-sdk';
/**
 * Class to perform get Agent Details
 */
export declare class AgentDetailService {
    protected logger: Logger;
    protected utilService: HttpUtilService;
    private auth;
    private urlUtilsService;
    /**
       * Create instance of CXoneAuth
       * ```
       * @example
       * const agentDetailService = new AgentDetailService();
       * ```
       */
    constructor();
    /**
       * Used to get the agent details based on the agent id
       * @param agentId - agent id to fetch the skill details
       * @example -
       * ```
       * this.agentDetailService.getAgentInfoByAgentId("123456");
       * ```
       */
    getAgentInfoByAgentId(agentId: string): Promise<AgentDetails[]>;
}
