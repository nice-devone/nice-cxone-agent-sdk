/**
 * Enum for network connection statuses to be used for display notifications
 */
export declare enum NetWorkConnectionStatus {
    /**
     * Status is used when reconnection attempt is going on
     */
    RECONNECT = "Reconnect",
    /**
     * Status is used when successful connection is established post connection interruptions
     */
    CONNECTED = "Connected",
    /**
     * Status is used when complete disconnection happens
     */
    DISCONNECTED = "Disconnected",
    /**
     * Status is used when reconnection attempt is unsuccessful
     */
    RECONNECT_UNSUCCESSFUL = "Reconnect unsuccessful"
}
