/**
 * Model class for CXoneContact have common properties of voice and digital contact
 */
export declare class CXoneContact {
    /**
     * @remarks - 'contactID' is identifier for the ACD contacts only.
     * For DFO Contact please refer 'caseID' property in CXoneDigitalContact
     */
    contactID: string;
    /**
       * @remarks - represent model for contact status
     */
    status: string;
    /**
     * @remarks - represent model for contact type
   */
    type: string;
    /**
     * @remarks - represent model for contact skill
   */
    skill: string;
    /**
     * @remarks - represent model for start time
   */
    startTime: Date;
    /**
     * @remarks - represent model for skill name
   */
    skillName: string;
    /**
     * @remarks - represent model for interaction id
   */
    interactionId: string;
    /**
     * @remarks - Customer id of the customer who has initiated the digital contact.
     */
    customerId?: string;
    /**
      * @remarks - represent model for require disposition value
    */
    requireDisposition?: boolean;
    /**
    *  @remarks - represent model for max seconds ACW
    */
    maxSecondsACW?: number;
    /**
    * @remarks - represent model for ACW Type Id value
    */
    acwTypeId?: number | undefined;
    /**
    * @remarks - represent model for denoting type of parent interaction while elevating
    */
    fromProvider?: string;
}
