/**
 * The status code of the websocket connection
 */
export declare enum WebsocketStatusCode {
    /**
     * The connection is successful
     */
    OK = 4000,
    /**
     * The websocket is trying to reconnect
     */
    RECONNECT = 4001,
    /**
     * The websocket reconnect was unsuccessful
     */
    RECONNECT_UNSUCCESSFUL = 4003,
    /**
     * The websocket has closed
     */
    CLOSED = 4004,
    /**
     * The websocket errored out
     */
    ERROR = 4005
}
