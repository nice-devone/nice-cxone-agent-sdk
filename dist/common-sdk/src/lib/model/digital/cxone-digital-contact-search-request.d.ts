import { SortingType } from '../../enum/sorting-type';
import { CcfInteractionSearchFilterValues } from './ccf-interaction-search-filter-values';
export interface CXoneDigitalContactSearchRequest {
    /**
     * @remarks - requested channel name for contact result.
     */
    channel?: string;
    /**
     * @remarks - string value which represents contact status.
     */
    status?: string;
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
     * @remarks - date value on which contacts are created.
    */
    createdDateRange?: Date;
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
     */
    tag?: string;
}
