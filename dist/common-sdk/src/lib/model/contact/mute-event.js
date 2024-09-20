"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MuteEvent = void 0;
const utility_1 = require("../../../util/utility");
const cxone_agent_event_1 = require("../agent/cxone-agent-event");
/**
 * Model class for Mute event
 */
class MuteEvent extends cxone_agent_event_1.CXoneAgentEvent {
    /**
       * The parse method will take the data object and assign the values to the MuteEvent class properties
       * @param data - Data object received
       * @example -
       * ```
       * parse(data);
       * ```
       */
    parse(data) {
        this.iisHost = data.IISHost;
        this.vcHost = data.VCHost;
        this.agentMuted = (0, utility_1.parseBooleanString)(data.AgentMuted);
    }
}
exports.MuteEvent = MuteEvent;
//# sourceMappingURL=mute-event.js.map