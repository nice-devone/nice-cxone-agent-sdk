/**
 * model interface for contact history data
 */
export interface ContactHistoryData {
    /**
     * The contact id of contact
     */
    contactNumber: string;
    /**
     * The channel type of contact
     */
    channelType: string;
    /**
     * The contact date of contact
     */
    contactDate: string;
    /**
     * The skill of contact
     */
    skill: string;
    /**
     * The status of contact
     */
    status: string;
}
