"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentSessionEndEvent = void 0;
const utility_1 = require("../../../util/utility");
const cxone_agent_event_1 = require("../agent/cxone-agent-event");
/**
 * Model class for agent session end event
 */
class AgentSessionEndEvent extends cxone_agent_event_1.CXoneAgentEvent {
    /**
     * The parse method will take the data object and assign the values to the AgentSessionEnd class properties
     * @param data - Data object received
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data) {
        this.iisHost = data.IISHost;
        this.vcHost = data.VCHost;
        this.message = data.Message;
        this.success = (0, utility_1.parseBooleanString)(data.Success);
    }
}
exports.AgentSessionEndEvent = AgentSessionEndEvent;
//# sourceMappingURL=agent-session-end-event.js.map