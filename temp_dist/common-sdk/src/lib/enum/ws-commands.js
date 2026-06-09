"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSCommand = void 0;
/**
 * Enum for WebSocket Command
 */
var WSCommand;
(function (WSCommand) {
    WSCommand["CONNECT"] = "CONNECT";
    WSCommand["CONNECTED"] = "CONNECTED";
    WSCommand["HEARTBEAT"] = "HEARTBEAT";
    WSCommand["SUBSCRIBE"] = "SUBSCRIBE";
    WSCommand["SUBSCRIBED"] = "SUBSCRIBED";
    WSCommand["UNSUBSCRIBE"] = "UNSUBSCRIBE";
    WSCommand["UNSUBSCRIBED"] = "UNSUBSCRIBED";
    WSCommand["MESSAGE"] = "MESSAGE";
    WSCommand["ERROR"] = "ERROR";
    WSCommand["RECONNECTED"] = "RECONNECTED";
})(WSCommand = exports.WSCommand || (exports.WSCommand = {}));
//# sourceMappingURL=ws-commands.js.map