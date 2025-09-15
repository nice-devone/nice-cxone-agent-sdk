"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentLegEvent = void 0;
const utility_1 = require("../../../util/utility");
const cxone_agent_event_1 = require("../agent/cxone-agent-event");
/**
 * Model class for Agent leg event
 */
class AgentLegEvent extends cxone_agent_event_1.CXoneAgentEvent {
    /**
     * The parse method will take the data object and assign the values to the agentLeg class properties
     * @param data - Data object received
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data) {
        this.iisHost = data.IISHost;
        this.vcHost = data.VCHost;
        this.agentLegId = data.AgentLegId;
        this.finalState = (0, utility_1.parseBooleanString)(data.FinalState);
        this.status = data.Status;
    }
}
exports.AgentLegEvent = AgentLegEvent;
//# sourceMappingURL=agent-leg-event.js.map