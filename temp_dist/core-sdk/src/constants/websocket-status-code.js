/**
 * The status code of the websocket connection
 */
export var WebsocketStatusCode;
(function (WebsocketStatusCode) {
    /**
     * The connection is successful
     */
    WebsocketStatusCode[WebsocketStatusCode["OK"] = 4000] = "OK";
    /**
     * The websocket is trying to reconnect
     */
    WebsocketStatusCode[WebsocketStatusCode["RECONNECT"] = 4001] = "RECONNECT";
    /**
     * The websocket reconnect was unsuccessful
     */
    WebsocketStatusCode[WebsocketStatusCode["RECONNECT_UNSUCCESSFUL"] = 4003] = "RECONNECT_UNSUCCESSFUL";
    /**
     * The websocket has closed
     */
    WebsocketStatusCode[WebsocketStatusCode["CLOSED"] = 4004] = "CLOSED";
    /**
     * The websocket errored out
     */
    WebsocketStatusCode[WebsocketStatusCode["ERROR"] = 4005] = "ERROR";
})(WebsocketStatusCode || (WebsocketStatusCode = {}));
//# sourceMappingURL=websocket-status-code.js.map