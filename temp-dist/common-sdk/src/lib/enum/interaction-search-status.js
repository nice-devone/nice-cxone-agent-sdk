"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionSearchStatus = void 0;
/**
 * Enum for Interaction Search status
 */
var InteractionSearchStatus;
(function (InteractionSearchStatus) {
    /**
    * Initial Case Status when the contact is accepted by agent
    */
    InteractionSearchStatus["NEW"] = "new";
    /**
    * Contact is being handled by agent
    */
    InteractionSearchStatus["OPEN"] = "open";
    /**
    * The communication is still in progress for the contact
    */
    InteractionSearchStatus["PENDING"] = "pending";
    /**
    * The contact is escalated to some other agent
    */
    InteractionSearchStatus["ESCALATED"] = "escalated";
    /**
    * The contact is resolved after communication
    */
    InteractionSearchStatus["RESOLVED"] = "resolved";
    /**
    * The contact is closed when there is no further communication
    */
    InteractionSearchStatus["CLOSED"] = "closed";
})(InteractionSearchStatus = exports.InteractionSearchStatus || (exports.InteractionSearchStatus = {}));
//# sourceMappingURL=interaction-search-status.js.map