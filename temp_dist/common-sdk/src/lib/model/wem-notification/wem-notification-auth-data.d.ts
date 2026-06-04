/**
 * model interface for WEM notification authentication data
 */
export interface WemNotificationAuthData {
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
