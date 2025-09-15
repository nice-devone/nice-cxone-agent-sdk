"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXonePageOpen = void 0;
const cxone_agent_event_1 = require("../agent/cxone-agent-event");
/**
 * Model class for CXone page open
 */
class CXonePageOpen extends cxone_agent_event_1.CXoneAgentEvent {
    /**
     * The constructor will take the data object and assign the values to the cxone page open class properties
     * @param data - Data object received
     * @example -
     * ```
     * cxonePageOpen.parse(pageOpen);
     * ```
     */
    parse(data) {
        this.action = data.Action;
        this.iisHost = data.IISHost;
        this.vcHost = data.VCHost;
        this.contactId = data.ContactID;
        this.pageUri = data.PageUri;
    }
}
exports.CXonePageOpen = CXonePageOpen;
//# sourceMappingURL=cxone-page-open.js.map