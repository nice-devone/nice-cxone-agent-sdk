/**
 * Interface used as a Model for Request JSON sent for Fetching Agent Contact History
 * @returns returns - Contact History Data on basis of agentId,MediaTypeId,start&end Date
 * ```
 * @example
 * Array<AgentVoiceContactHistoryRequest>
 * ```
 */
export interface CXoneAgentVoiceContactHistoryRequest {
    /**
     * @remarks - A string value which represents unique author customeridentity Id on external platform.
     */
    startDate: string;
    /**
     * @remarks - A number as days to dynamically passed to fetch the filtered data between 2 dates.
     */
    endDate: string;
    /**
     * @remarks - Agent id
     */
    agentId: string;
    /**
     * @remarks - Number of records to skip in the results
     */
    skip?: number;
    /**
     * @remarks - Number of records to return in the results
     */
    top?: number;
    /**
     * @remarks - Values used to order results before paginating them.
     * Can also specify "asc" or "desc" to specify direction
     * for example "field1 asc,field2 desc,...". Default is asc
     */
    orderby?: string;
}
