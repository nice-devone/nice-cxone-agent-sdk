/**
 * This is the enum for all notification websocket command.
 */
export var WemNotificationCommand;
(function (WemNotificationCommand) {
    /**
    * @remarks command to perform after websocket connection is open
    */
    WemNotificationCommand["CONNECT"] = "CONNECT";
    /**
    * @remarks command to check operation after connection establishment
    */
    WemNotificationCommand["CONNECTED"] = "CONNECTED";
    /**
    * @remarks command to check ws messages
    */
    WemNotificationCommand["MESSAGE"] = "MESSAGE";
    /**
    * @remarks command to send acknowledge
    */
    WemNotificationCommand["ACKNOWLEDGE"] = "ACKNOWLEDGE";
})(WemNotificationCommand || (WemNotificationCommand = {}));
//# sourceMappingURL=wem-notification-command.js.map