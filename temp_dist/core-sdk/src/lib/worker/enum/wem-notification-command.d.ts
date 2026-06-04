/**
 * This is the enum for all notification websocket command.
 */
export declare enum WemNotificationCommand {
    /**
    * @remarks command to perform after websocket connection is open
    */
    CONNECT = "CONNECT",
    /**
    * @remarks command to check operation after connection establishment
    */
    CONNECTED = "CONNECTED",
    /**
    * @remarks command to check ws messages
    */
    MESSAGE = "MESSAGE",
    /**
    * @remarks command to send acknowledge
    */
    ACKNOWLEDGE = "ACKNOWLEDGE"
}
