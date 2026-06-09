/**
 * Interface for digital interaction search tab permissions
 */
export interface CXoneDigitalSearchTabPermissions {
    /**
    * @remarks - flag to show or hide Case tab on App space (interaction search)
    */
    isCaseSearchAllowed: boolean;
    /**
    * @remarks - flag to show or hide Message tab on App space (interaction search)
    */
    isMessageSearchAllowed: boolean;
    /**
    * @remarks - flag to show or hide Customer tab on App space (interaction search)
    */
    isCustomerSearchAllowed: boolean;
    /**
    * @remarks - flag to show or hide Thread tab on App space (interaction search)
    */
    isThreadSearchAllowed: boolean;
}
