import { CXoneAgentEvent } from '../agent/cxone-agent-event';
/**
 * Model class for Mute event
 */
export declare class MuteEvent extends CXoneAgentEvent {
    /**
       * @remarks - A boolean value which tells us if the agent is muted or not.
       */
    agentMuted: boolean;
    /**
       * The parse method will take the data object and assign the values to the MuteEvent class properties
       * @param data - Data object received
       * @example -
       * ```
       * parse(data);
       * ```
       */
    parse(data: {
        [key: string]: string;
    }): void;
}
