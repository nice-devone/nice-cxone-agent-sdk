"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentWorkflowCallControlRequestEvent = void 0;
/**
 * Class to handle parsing of agent workflow call control event data.
 * This class processes base64-encoded event data from GetNext custom events
 * and returns the decoded call control event information.
 * @example new AgentWorkflowCallControlRequestEvent(base64String, 'recordingControl');
 */
class AgentWorkflowCallControlRequestEvent {
    /**
     * Creates and parses a new AgentWorkflowCallControlRequestEvent instance.
     * @param data - Base64-encoded string containing call control event information
     * @param eventType - The type of event being processed
     * @example
     * ```
     * const event = new AgentWorkflowCallControlRequestEvent('eyJhZ2VudElkIjoiMTIzNDUiLCJlcGljSWQiOiJlcGljLTY3ODkwIiwiYWN0aW9uIjoibWFzayJ9', 'recordingControl');
     * ```
     */
    constructor(data, eventType) {
        try {
            const agentCallControlData = JSON.parse(data);
            this.agentId = agentCallControlData.agentId || '';
            this.epicId = agentCallControlData.epicId || '';
            this.action = agentCallControlData.action;
            this.phoneNumber = agentCallControlData.phoneNumber;
            this.eventType = eventType || '';
        }
        catch (error) {
            this.agentId = '';
            this.epicId = '';
            this.action = undefined;
            this.phoneNumber = undefined;
            this.eventType = eventType || '';
            console.error('[AgentWorkflowCallControlRequestEvent] Error parsing agent workflow call control event data:', error instanceof Error ? error.message : 'Unknown error');
        }
    }
    /**
     * Gets outbound call control event data
     * @returns Object containing agent ID, epic ID, phone number, and event type
     * @example outBoundControlData;
     */
    get outBoundControlData() {
        return {
            agentId: this.agentId,
            epicId: this.epicId,
            phoneNumber: this.phoneNumber,
            eventType: this.eventType,
        };
    }
    /**
     * Gets recording control event data
     * @returns Object containing agent ID, epic ID, action, and event type
     * @example recordingControlData;
     */
    get recordingControlData() {
        return {
            agentId: this.agentId,
            epicId: this.epicId,
            action: this.action,
            eventType: this.eventType,
        };
    }
}
exports.AgentWorkflowCallControlRequestEvent = AgentWorkflowCallControlRequestEvent;
//# sourceMappingURL=agent-call-control-event-request.js.map