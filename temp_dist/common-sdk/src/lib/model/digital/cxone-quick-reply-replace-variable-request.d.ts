/**
 * Interface for CXone digital quick response replace variables request payload
 */
export interface CXoneQuickReplyReplaceVariableRequest {
    /**
     * @remarks - current digital contact details like case id
     */
    contact: DigitalContactDetails;
    /**
     * @remarks - list of external variable values of dynamic type of quick responses
     */
    externalVariables: Array<QuickResponseExternalVariables>;
}
interface DigitalContactDetails {
    /**
    * @remarks - unique id of digital contact (Case Id)
    */
    contactNumber: string;
}
export interface QuickResponseExternalVariables {
    /**
    * @remarks - subject of thread
    */
    name: string;
    /**
    * @remarks - threadId of post on other digital platforms.
    */
    value: number;
}
export {};
