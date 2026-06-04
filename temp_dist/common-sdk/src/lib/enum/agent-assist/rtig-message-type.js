"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtigMessageType = void 0;
/**
 * Enum for RTIG websocket message types
 */
var RtigMessageType;
(function (RtigMessageType) {
    /**
     *   Rtig SuperVisor updates
     */
    RtigMessageType["RTG_SUPERVISOR"] = "Nexidia.RTG.SupervisorUpdate";
    /**
     * Rtig Englighten metrics score update
     */
    RtigMessageType["RTG_ENLIGHTEN"] = "Nexidia.RTG.EnlightenUpdate";
    /**
     * Rtig notification messages update
     */
    RtigMessageType["RTG_EVENT_NOTIFICATION"] = "Nexidia.RTG.EventNotification";
})(RtigMessageType = exports.RtigMessageType || (exports.RtigMessageType = {}));
//# sourceMappingURL=rtig-message-type.js.map