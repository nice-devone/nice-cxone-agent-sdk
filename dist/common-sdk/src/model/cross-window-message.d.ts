/**
 * Model for cross window messages, e.g. from main window to iFrame or Popup
 */
export interface CrossWindowMessage {
    /**
     * Type of the message, just to filter it out
     */
    messageType: string;
    /**
     * get the issuer / initiator of the message
     */
    issuer: string;
    /**
     * external URL to be loaded in the window
     */
    externalURL?: string;
    /**
     * auth token for implicit authentication
     */
    token?: string;
    /**
     * window title
     */
    title?: string;
}
