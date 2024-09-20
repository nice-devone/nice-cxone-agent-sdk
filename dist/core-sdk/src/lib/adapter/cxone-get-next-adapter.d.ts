import { CallContactEvent, MuteEvent, UpdatePermissionsEvent, AgentSessionEndEvent, AgentSessionStartEvent, VoiceMailContactEvent, WorkItemContactEvent } from '@nice-devone/common-sdk';
export declare type AdapterEvents = CallContactEvent | MuteEvent | UpdatePermissionsEvent | AgentSessionEndEvent | AgentSessionStartEvent | VoiceMailContactEvent | WorkItemContactEvent;
/**
 * This class will handle all the get next event response according to event type
 */
export declare class CXoneGetNextAdapter {
    private agentSession;
    private isAgentAssistAppEnabled;
    private logger;
    /**
     * Used to re route the get next response based on the different event types and returns the array of processed object
     * @param events- array of get next response with different event type
     * @example
     */
    handleGetNextResponse(events: Array<{
        [key: string]: string;
    }>): void;
}
