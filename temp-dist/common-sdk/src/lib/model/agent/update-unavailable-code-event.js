"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUnavailableCodeEvent = void 0;
const cxone_agent_event_1 = require("./cxone-agent-event");
/**
 * Model class for agent unavailable code event
 */
class UpdateUnavailableCodeEvent extends cxone_agent_event_1.CXoneAgentEvent {
    /**
     * The parse method will take the data object and assign the values to the updateUnavailableCodeEvent class properties
     * @param data - Data object received
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data) {
        this.iisHost = data.IISHost;
        this.vcHost = data.VCHost;
    }
}
exports.UpdateUnavailableCodeEvent = UpdateUnavailableCodeEvent;
//# sourceMappingURL=update-unavailable-code-event.js.map