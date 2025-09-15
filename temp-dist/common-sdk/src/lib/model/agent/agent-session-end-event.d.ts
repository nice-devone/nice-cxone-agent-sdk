import { CXoneAgentEvent } from '../agent/cxone-agent-event';
/**
 * Model class for agent session end event
 */
export declare class AgentSessionEndEvent extends CXoneAgentEvent {
    /**
     * @remarks -
     */
    message: string;
    /**
     * @remarks -
     */
    success: boolean;
    /**
     * The parse method will take the data object and assign the values to the AgentSessionEnd class properties
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
