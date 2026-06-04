import { SortingType } from '../../enum/sorting-type';
import { CcfInteractionSearchFilterValues } from './ccf-interaction-search-filter-values';
export interface CXoneDigitalContactSearchRequest {
    /**
     * @remarks - requested channel name for contact result.
     *CcfInteractionSearchFilterValues[] contains id and name of the channel to display in dropdown list
     */
    channel?: CcfInteractionSearchFilterValues[];
    /**
     * @remarks - string value which represents contact status.
     *CcfInteractionSearchFilterValues[] contains id and name of the status to display in dropdown list
     */
    status?: CcfInteractionSearchFilterValues[];
    /**
     * @remarks -  List of skill ids
    */
    skillId?: CcfInteractionSearchFilterValues[];
    /**
     * @remarks -  List of inbox assignee agent ids.
    */
    inboxAssigneeAgentId?: CcfInteractionSearchFilterValues[];
    /**
     * @remarks -  List of owner assignee agent ids.
    */
    ownerAssigneeAgentId?: CcfInteractionSearchFilterValues[];
    /**
     * @remarks - start date value on which contacts are created.
    */
    from?: string;
    /**
      * @remarks - end date value on which contacts are created.
     */
    to?: string;
    /**
     * @remarks - scroll token reveived in previous response for next pagination.
    */
    scrollToken?: string;
    /**
     * @remarks - query for contact search.
    */
    query?: string;
    /**
     * @remarks - name of search column for sorting.
    */
    sorting?: string;
    /**
     * @remarks - asc or desc sort type for contact search results.
    */
    sortingType?: SortingType;
    /**
     * @remarks - requested tag for contact result.
     *CcfInteractionSearchFilterValues[] contains id and name of the tag to display in dropdown list
     */
    tag?: CcfInteractionSearchFilterValues[];
}
