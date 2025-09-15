"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXonePopUrl = void 0;
const cxone_agent_event_1 = require("../agent/cxone-agent-event");
const utility_1 = require("../../../util/utility");
/**
 * Model class for CXone pop url
 */
class CXonePopUrl extends cxone_agent_event_1.CXoneAgentEvent {
    /**
     * The constructor will take the data object and assign the values to the cxone page open class properties
     * @param data - Data object received
     * @example -
     * ```
     * cxonePopUrl.parse(pageOpen);
     * ```
     */
    parse(data) {
        this.iisHost = data.IISHost;
        this.vcHost = data.VCHost;
        this.contactId = data.ContactId;
        this.url = data.URL;
        this.tabTitle = data.TabTitle;
        this.popDestination = data.PopDestination;
        this.popoutWindowHeight = (0, utility_1.parseInteger)(data.PopoutWindowHeight);
        this.popoutWindowWidth = (0, utility_1.parseInteger)(data.PopoutWindowWidth);
        this.closePopoutUponTermination = (0, utility_1.parseBooleanString)(data.ClosePopoutUponTermination);
    }
}
exports.CXonePopUrl = CXonePopUrl;
//# sourceMappingURL=cxone-pop-url.js.map