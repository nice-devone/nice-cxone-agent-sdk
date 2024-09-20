"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalContactEvent = void 0;
const utility_1 = require("../../../util/utility");
const cxone_agent_event_1 = require("../agent/cxone-agent-event");
/**
 * Model Class for the DigitalContactEvent
 */
class DigitalContactEvent extends cxone_agent_event_1.CXoneAgentEvent {
    /**
     * The parse method will take the data object and assign the values to the DigitalContactEvent class properties
     * @param data - Data object received
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data) {
        this.channelType = data.ChannelType;
        this.contactId = data.ContactID;
        this.customerName = data.CustomerName;
        this.digitalCaseId = data.DFOContactId;
        this.iisHost = data.IISHost;
        this.refusalTimeout = (0, utility_1.parseInteger)(data.RefusalTimeout);
        this.skill = data.SkillName;
        this.startTime = new Date(data.StartTime);
        this.startTimeUtc = new Date(data.StartTimeUTC);
        this.status = data.Status;
        this.type = data.Type;
        this.vcHost = data.VCHost;
    }
}
exports.DigitalContactEvent = DigitalContactEvent;
//# sourceMappingURL=digital-contact-event.js.map