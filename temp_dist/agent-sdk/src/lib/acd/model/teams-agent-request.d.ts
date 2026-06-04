/**
 * Interface for agents list in a selected team request
 */
export interface TeamsAgentRequest {
    /**
     * @remarks start index for the pagination data, should be greater than 0
     */
    offset?: number;
    /**
     * @remarks end index for the pagination data, should be greater than 0
     */
    limit?: number;
    /**
     * @remarks search string in case for search request, search will happen on fields depending on entity requested.
     */
    searchText?: string;
    /**
     * @remarks teamId string in case for fetching agents based on team selected.
     */
    teamId: string;
}
