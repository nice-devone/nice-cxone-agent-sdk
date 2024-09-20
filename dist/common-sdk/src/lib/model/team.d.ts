import { CXoneEvent } from './agent/cxone-event';
import { AgentStateResponse } from './agent-state-response';
/**
 * Model class for team
 */
export declare class Team extends CXoneEvent {
    /**
      * @remarks  Id of team
      */
    teamId: number;
    /**
     * @remarks  team is active or not
     */
    isActive: boolean;
    /**
     * @remarks  name of the team
     */
    teamName: string;
    /**
     * @remarks agent count shows the number of agents associated with team
     */
    agentCount: number;
    /**
     * @remarks  list of the agents
     */
    agents?: AgentStateResponse[];
    /**
  * This method to parse team response
  * @param data - team object
  * @example -
  * ```
  * parse(data);
  * ```
  */
    parse(data: {
        [key: string]: any;
    }): void;
    /**
       * This method to parse agent state response for a team
       * @param data - agent state object
       * @example -
       * ```
       * parseAgentResponse(data);
       * ```
       */
    private parseAgentResponse;
}
