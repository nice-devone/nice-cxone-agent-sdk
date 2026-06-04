import { CXoneAgentEvent } from '../agent/cxone-agent-event';
import { AgentLegStatus } from '../../enum/agent-leg-status';
/**
 * Model class for Agent leg event
 */
export declare class AgentLegEvent extends CXoneAgentEvent {
    /**
     * @remarks -
     * The 'contact ID' for the agent leg script. This can be helpful in situations where a single app is managing multiple agent sessions.
     * This ID will be valid from the time the agent leg is 'dialing', until it is disconnected
     */
    agentLegId: string;
    /**
     * @remarks -
     * Indicates whether the state is the final state for the agent leg "contact".
     * This will only be "true" for the "Disconnected" status event.
     */
    finalState: boolean;
    /**
     * @remarks - The status of the agent leg. Will be 'Dialing', 'Active', or 'Disconnected'.
     */
    status: AgentLegStatus;
    /**
     * The parse method will take the data object and assign the values to the agentLeg class properties
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
