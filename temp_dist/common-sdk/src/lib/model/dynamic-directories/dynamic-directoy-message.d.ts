/**
 * Interface for WebSocket Message
 */
export interface DynamicDirectoyMessage {
    /**
     * @remarks command of the WS message
     */
    command: string;
    /**
     * @remarks header of WS message
     */
    headers: {
        /**
         * @remarks connectionId
         */
        connectionId: string;
    };
    /**
     * @remarks
     */
    body: any;
}
