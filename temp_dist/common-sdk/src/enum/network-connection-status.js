"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetWorkConnectionStatus = void 0;
/**
 * Enum for network connection statuses to be used for display notifications
 */
var NetWorkConnectionStatus;
(function (NetWorkConnectionStatus) {
    /**
     * Status is used when reconnection attempt is going on
     */
    NetWorkConnectionStatus["RECONNECT"] = "Reconnect";
    /**
     * Status is used when successful connection is established post connection interruptions
     */
    NetWorkConnectionStatus["CONNECTED"] = "Connected";
    /**
     * Status is used when complete disconnection happens
     */
    NetWorkConnectionStatus["DISCONNECTED"] = "Disconnected";
    /**
     * Status is used when reconnection attempt is unsuccessful
     */
    NetWorkConnectionStatus["RECONNECT_UNSUCCESSFUL"] = "Reconnect unsuccessful";
})(NetWorkConnectionStatus = exports.NetWorkConnectionStatus || (exports.NetWorkConnectionStatus = {}));
//# sourceMappingURL=network-connection-status.js.map