/**
 *  Interface used as a Model for response JSON for customer note user
 * customer note user details with id , incontactId, emailAddress, loginUsername, firstName,surname etc
 * CustomerCardUser
 * ```
 * * @example
 * user in CustomerNote
 * ```
 */
export interface CustomerCardUser {
    /**
    * @remarks - 'id' - id of the customer card user
    */
    id: number;
    /**
    * @remarks - 'incontactId'- incontact id of the customer card user
    */
    incontactId: string;
    /**
    * @remarks - 'emailAddress' - email of the customer card user
    */
    emailAddress: string;
    /**
     * @remarks - 'loginUsername' - username of the customer card user
     */
    loginUsername: string;
    /**
    * @remarks - 'firstName' - first name of the customer card user
    */
    firstName: string;
    /**
     * @remarks - 'surname' - lastname of the customer card user
     */
    surname: string;
    /**
     * @remarks - 'nickname' - nickname of the customer card user
     */
    nickname: string;
    /**
     * @remarks - imageUrl - url for the customer card user image
     */
    imageUrl: string;
    /**
     * @remarks - 'publicImageUrl' of the customer card user
     */
    publicImageUrl?: null | string;
    /**
     * @remarks - 'isBotUser' - true if a bot user else false
     */
    isBotUser: boolean;
    /**
     * @remarks - 'isSurveyUser' - true if user is a surevey user else false
     */
    isSurveyUser: boolean;
}
