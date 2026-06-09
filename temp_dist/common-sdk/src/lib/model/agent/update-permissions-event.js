"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePermissionsEvent = void 0;
const cxone_agent_event_1 = require("../agent/cxone-agent-event");
/**
 * Model class for Update permissions event
 */
class UpdatePermissionsEvent extends cxone_agent_event_1.CXoneAgentEvent {
    /**
     * The parse will take the data object and assign the values to the UpdatePermissions class properties
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
exports.UpdatePermissionsEvent = UpdatePermissionsEvent;
//# sourceMappingURL=update-permissions-event.js.map