/**
 * Interface used as a Model for Request JSON sent for Fetching Contact History
 * @returns returns - Contact History Data on basis of author customer identity id
 * ```
 * @example
 * Array<ContactHistoryRequest>
 * ```
 */
interface AgentContactHistoryRequest {
    /**
     * @remarks - A string value which represents unique author customeridentity Id on external platform.
     */
    inboxAssignee: string;
    /**
     * @remarks - A number as days to dynamically passed to fetch the filtered data between 2 dates.
     */
    updatedSinceHours: number;
}
export declare type CXoneAgentContactHistoryRequest = AgentContactHistoryRequest;
export {};
