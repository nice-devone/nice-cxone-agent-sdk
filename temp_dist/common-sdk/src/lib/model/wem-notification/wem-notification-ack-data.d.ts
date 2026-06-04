/**
 * model interface for WEM notification authentication data
 */
export interface WemNotificationAckData {
    /**
    * @remarks user Id
    */
    userId: string;
    /**
 * @remarks notification uri
 */
    notificationWsUri: string;
    /**
 * @remarks token
 */
    token: string;
}
