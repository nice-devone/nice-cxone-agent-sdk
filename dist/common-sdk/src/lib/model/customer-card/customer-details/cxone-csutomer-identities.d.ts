/**
 * Interface used for parsing Customer Identities details data response
 * @returns returns - list of Customer Identities Data
 * ```
 * @example
 * Array<CustomersIdentitiesDetail>
 * ```
 */
interface CustomersIdentitiesDetail {
    /**
     * @remarks - Attribute for Id on External Platform
     */
    idOnExternalPlatform: string;
    /**
     * @remarks - Attribute for First Name
     */
    firstName: string;
    /**
     * @remarks - Attribute for last Name
     */
    lastName: string;
    /**
     * @remarks - Attribute for Nick Name
     */
    nickname: string;
    /**
     * @remarks - Attribute for Image url
     */
    image: string;
    /**
     * @remarks - Attribute for Id
     */
    id: string;
}
export declare type CXoneCustomerIdentities = Array<CustomersIdentitiesDetail>;
export {};
