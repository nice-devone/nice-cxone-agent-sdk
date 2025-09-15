import { AgentState, AgentCurrentState } from './agent-state';
import { CXoneEvent } from './cxone-event';
/**
 * Class to capture agent state event
 */
export declare class AgentStateEvent extends CXoneEvent {
    agentStateData: {
        [key: string]: string | any;
    };
    currentState: AgentCurrentState;
    nextState: AgentState;
    nNextState: AgentState;
    /**
     * This method to parse agent state event data
     * @param data -
     * @example -
     * ```
     *parse(data);
     * ```
     */
    parse(data: {
        [key: string]: string | any;
    }): void;
}
