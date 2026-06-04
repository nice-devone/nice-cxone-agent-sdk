"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCHSetting = void 0;
const utility_1 = require("../../../util/utility");
/**
 * Model class for MCH(MultiChannel Handling) Settings
 * MultiChannel Handling - allows agents to actively work on multiple contacts across multiple channels
 */
class MCHSetting {
    /**
     * The parse method will take the data object and assign the values to the MCHSetting class properties
     * @param data - Data object received
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data) {
        this.chatThreshold = Number(data.ChatThreshold);
        this.smsThreshold = Number(data.SmsThreshold);
        this.emailThreshold = Number(data.EmailThreshold);
        this.workItemThreshold = Number(data.WorkItemThreshold);
        this.digitalThreshold = Number(data.DigitalThreshold);
        this.contactAutoFocus = (0, utility_1.parseBooleanString)(data.ContactAutoFocus);
        this.requestContact = (0, utility_1.parseBooleanString)(data.RequestContact);
        this.deliveryMode = data.DeliveryMode;
        this.totalContactCount = Number(data.TotalContactCount);
        this.voiceThreshold = Number(data.VoiceThreshold);
    }
}
exports.MCHSetting = MCHSetting;
//# sourceMappingURL=mch-settings.js.map