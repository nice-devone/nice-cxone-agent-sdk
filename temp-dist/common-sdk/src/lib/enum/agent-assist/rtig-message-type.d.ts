/**
 * Enum for RTIG websocket message types
 */
export declare enum RtigMessageType {
    /**
     *   Rtig SuperVisor updates
     */
    RTG_SUPERVISOR = "Nexidia.RTG.SupervisorUpdate",
    /**
     * Rtig Englighten metrics score update
     */
    RTG_ENLIGHTEN = "Nexidia.RTG.EnlightenUpdate",
    /**
     * Rtig notification messages update
     */
    RTG_EVENT_NOTIFICATION = "Nexidia.RTG.EventNotification"
}
