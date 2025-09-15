/**
 * Model class for MCH(MultiChannel Handling) Settings
 * MultiChannel Handling - allows agents to actively work on multiple contacts across multiple channels
 */
export declare class MCHSetting {
    /**
     * @remarks - Maximum number of Chats handling ability
     */
    chatThreshold: number;
    /**
     * @remarks - Maximum number of SMS handling ability
     */
    smsThreshold: number;
    /**
     * @remarks - Maximum number of Emails handling ability
     */
    emailThreshold: number;
    /**
     * @remarks - Maximum number of Work Item handling ability
     */
    workItemThreshold: number;
    /**
     * @remarks - Maximum number of Digital Contacts handling ability
     */
    digitalThreshold: number;
    /**
     * @remarks - Indicates the contact auto focus
     */
    contactAutoFocus: boolean;
    /**
     * @remarks - Indicates whether new digital contact is requested
     */
    requestContact: boolean;
    /**
     * @remarks - Indicates the delivery mode
     */
    deliveryMode: string;
    /**
     * @remarks - Total count of the Contact
     */
    totalContactCount: number;
    /**
     * @remarks - Maximum number of phone calls handling ability
     */
    voiceThreshold: number;
    /**
     * The parse method will take the data object and assign the values to the MCHSetting class properties
     * @param data - Data object received
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data: any): void;
}
