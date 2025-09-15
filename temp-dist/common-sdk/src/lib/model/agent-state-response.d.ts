import { CXoneEvent } from './agent/cxone-event';
/**
 * Model class for agent state
 */
export declare class AgentStateResponse extends CXoneEvent {
    /**
       * @remarks  ID of Agent
       */
    agentId: number;
    /**
       * @remarks  userId of Agent
       */
    userId: string;
    /**
       * @remarks  Name of state for the Agent
       */
    agentStateName: string;
    /**
       * @remarks  ID of active Contact if any
       */
    contactId: string;
    /**
       * @remarks  Agent first name
       */
    firstName: string;
    /**
       * @remarks  Indicates if agent is in ACTIVE state
       */
    isActive: boolean;
    /**
       * @remarks  Indicates if active Contact is using an outbound Skill
       */
    isOutbound: boolean;
    /**
       * @remarks  Agent last name
       */
    lastName: string;
    /**
       * @remarks  ISO 8601 timestamp of last database poll. Value should be passed in "updatedSince" parameter on next call
       */
    lastPollTime: Date;
    /**
       * @remarks  Time of last record update
       */
    lastUpdateTime: Date;
    /**
       * @remarks  Channel name of Contact if any
       */
    mediaName: string;
    /**
       * @remarks  ID for Unavailable state
       */
    outStateCode: number;
    /**
       * @remarks  Name of Unavailable state
       */
    outStateDescription: string;
    /**
       * @remarks  ID of Skill Agent is working on
       */
    skillId: string;
    /**
       * @remarks  Name of Skill Agent is working on
       */
    skillName: string;
    /**
       * @remarks  ISO 8601 time the Agent started on current Skill
       */
    startDate: Date;
    /**
       * @remarks  Agent Phone for current session
       */
    stationPhoneNumber: number;
    /**
       * @remarks  ID of Agent Team
       */
    teamId: number;
    /**
       * @remarks  Name of Agent Team
       */
    teamName: string;
    /**
       * @remarks
       */
    userName: string;
    /**
       * @remarks  Represents whether agent is marked as favorite or not on UI
       */
    isFavorite: boolean;
    /**
         * @remarks  Represents whether agent can be dialed or not
         */
    canDialAgent: boolean;
    /**
       * This method to parse agent state response
       * @param data - agent state object
       * @example -
       * ```
       * parse(data);
       * ```
       */
    parse(data: {
        [key: string]: string;
    }): void;
    /**
      * This method to parse agent state response from the new API with updated agent state
      * @param data - new agent state object
      * @example -
      * ```
      * parseUpdatedAgentState(data);
      * ```
      */
    parseUpdatedAgentState(data: {
        [key: string]: string;
    }): void;
}
