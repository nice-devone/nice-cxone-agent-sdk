/**
 * Interface used for passing Customer Card Merge Arguements
 * ```
 * @example
 * Array<CXoneMergeCustomerCardArguments>
 * ```
 */
export interface CXoneMergeCustomerCardArguments {
    /**
     * @remarks - Current Customer Id
     */
    currentCustomerId: string;
    /**
     * @remarks - Selected Customer Id from Search List
     */
    customerToMergeId: string;
}
