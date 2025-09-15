"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalContactStatus = void 0;
/**
 * Enum for Digital Case Status
 */
var DigitalContactStatus;
(function (DigitalContactStatus) {
    /**
    * Initial Case Status when the contact is accepted by agent
    */
    DigitalContactStatus["NEW"] = "new";
    /**
    * Contact is being handled by agent
    */
    DigitalContactStatus["OPEN"] = "open";
    /**
    * The communication is still in progress for the contact
    */
    DigitalContactStatus["PENDING"] = "pending";
    /**
    * The contact is escalated to some other agent
    */
    DigitalContactStatus["ESCALATED"] = "escalated";
    /**
    * The contact is resolved after communication
    */
    DigitalContactStatus["RESOLVED"] = "resolved";
    /**
    * The contact is closed when there is no further communication
    */
    DigitalContactStatus["CLOSED"] = "closed";
    /**
    * The contact is initiated but not yet accepted
    */
    DigitalContactStatus["INCOMING"] = "Incoming";
    /**
     * Initial status for outbound operations till the communication is not established
     */
    DigitalContactStatus["DRAFT"] = "draft";
})(DigitalContactStatus = exports.DigitalContactStatus || (exports.DigitalContactStatus = {}));
//# sourceMappingURL=digital-contact-status.js.map