/**
 * interface type for Session Switch data
 */
export interface SessionSwitchData {
    /**
     * interaction id of the contact for which session is switched
     */
    interactionId: string;
    /**
    * contact id of the contact for which session is switched
    */
    contactId: string;
    /**
     * media type of the contact for which session is switched
     */
    mediaType: string;
}
