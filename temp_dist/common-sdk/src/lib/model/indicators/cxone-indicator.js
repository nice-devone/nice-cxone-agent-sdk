"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneIndicator = void 0;
const cxone_agent_event_1 = require("../agent/cxone-agent-event");
/**
 * Model class for CXone Indicators
 */
class CXoneIndicator extends cxone_agent_event_1.CXoneAgentEvent {
    /**
     * The constructor will take the data object and assign the values to the cxone indicators class properties
     * @param data - Data object received
     * @example -
     * ```
     * cxoneIndicator.parse(indicator);
     * ```
     */
    parse(data) {
        this.isContactIndicator = data.ContactID ? true : false;
        this.iisHost = data.IISHost;
        this.vcHost = data.VCHost;
        this.actionValue = data.action || data.ActionUri;
        this.actionType = data.actionType || data.ActionType;
        this.imageFile = data.imageFile || data.ImageUri;
        this.indicatorName = data.indicatorName || data.Name;
        this.contactId = data.senderContactId || data.ContactID;
        this.toolTip = data.toolTip || data.ToolTip;
        this.isEnabled = data.enable || data.IndicatorState === 'On';
    }
}
exports.CXoneIndicator = CXoneIndicator;
//# sourceMappingURL=cxone-indicator.js.map