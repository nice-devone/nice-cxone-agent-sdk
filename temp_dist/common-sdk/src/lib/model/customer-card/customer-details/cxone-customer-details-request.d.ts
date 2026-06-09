/**
 * Interface used for parsing get Customer details response
 * @returns returns - returns the Customer Data
 * ```
 * @example
 * Array<CustomerRequest>
 * ```
 */
interface CustomerRequest {
    /**
     * @remarks - A string value which represents unique Id.
     */
    id?: string;
    /**
     * @remarks - A string value which represents First Name.
     */
    firstName?: string;
    /**
     * @remarks - A string value which represents Sur-Name
     */
    surname?: string;
    /**
     * @remarks - A string value which represents Full Name
     */
    fullName?: string;
}
export declare type CXoneCustomerDetailRequest = CustomerRequest;
export {};
