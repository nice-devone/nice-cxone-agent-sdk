/**
 * Interface representing agent workflow call control event data.
 * This interface is used for handling various call control operations such as mask/resume recording
 * and outbound calling triggered by agent workflow custom events.
 * @example
 * ```
 * const maskEvent: AgentWorkflowCallControlEventType = {
 *   agentId: '12345',
 *   epicId: 'epic-67890',
 *   action: 'mask'
 * };
 * ```
 */
export interface AgentWorkflowCallControlEventType {
    /** The unique identifier for the agent */
    agentId: string;
    /** The unique identifier for the EPIC (contact/interaction) */
    epicId: string;
    /** event type for the call control event to distinguish different control actions */
    eventType: string;
    /** Optional action to perform. Values include 'mask' or 'resume' for recording controls */
    action?: string;
    /** Optional phone number for outbound call operations */
    phoneNumber?: string;
}
/**
 * Class to handle parsing of agent workflow call control event data.
 * This class processes base64-encoded event data from GetNext custom events
 * and returns the decoded call control event information.
 * @example new AgentWorkflowCallControlRequestEvent(base64String, 'recordingControl');
 */
export declare class AgentWorkflowCallControlRequestEvent implements AgentWorkflowCallControlEventType {
    agentId: string;
    epicId: string;
    eventType: string;
    action?: string;
    phoneNumber?: string;
    /**
     * Creates and parses a new AgentWorkflowCallControlRequestEvent instance.
     * @param data - Base64-encoded string containing call control event information
     * @param eventType - The type of event being processed
     * @example
     * ```
     * const event = new AgentWorkflowCallControlRequestEvent('eyJhZ2VudElkIjoiMTIzNDUiLCJlcGljSWQiOiJlcGljLTY3ODkwIiwiYWN0aW9uIjoibWFzayJ9', 'recordingControl');
     * ```
     */
    constructor(data: string, eventType: string);
    /**
     * Gets outbound call control event data
     * @returns Object containing agent ID, epic ID, phone number, and event type
     * @example outBoundControlData;
     */
    get outBoundControlData(): AgentWorkflowCallControlEventType;
    /**
     * Gets recording control event data
     * @returns Object containing agent ID, epic ID, action, and event type
     * @example recordingControlData;
     */
    get recordingControlData(): AgentWorkflowCallControlEventType;
}
