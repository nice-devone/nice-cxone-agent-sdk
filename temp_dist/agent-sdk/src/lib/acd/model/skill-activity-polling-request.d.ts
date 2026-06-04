export interface SkillActivityPollingRequest {
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
     * If requested entity is agentList then search will happen based on fields - (firstName, lastName, userName).
     * If requested entity is skillList then search will happen based on field - (skillName).
     * If requested entity is addressBookList then search will happen based on field - (firstName, lastName, mobile, phone, email).
     */
    searchText?: string;
    /**
     * @remarks Unique identifier for the type of media, chat is "3", phone is "4"
     */
    mediaTypeId?: number;
    /**
     * @remarks Indicates whether the call is an Outbound or inbound.
     */
    isOutbound?: boolean;
}
