/**
 * This is base class for AgentEvent
 */
export declare abstract class CXoneEvent {
    /**
     * This method to parse event data
     * @param event - event data
     */
    protected abstract parse(event: {
        [key: string]: string;
    }): void;
}
