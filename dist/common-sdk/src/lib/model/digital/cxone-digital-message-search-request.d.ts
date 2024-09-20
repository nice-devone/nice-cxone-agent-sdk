import { SortingType } from '../../enum/sorting-type';
import { CcfInteractionSearchFilterValues } from './ccf-interaction-search-filter-values';
/**
 * Interface used for message search (Interaction search message tab)
 */
export interface CXoneDigitalMessageSearchRequest {
    /**
     * @remarks - requested channel for message search results.
     */
    channel?: CcfInteractionSearchFilterValues[];
    /**
     * @remarks - date value on which messages are created.
     */
    createdDateRange?: Date;
    /**
     * @remarks - scroll token received in previous response for next pagination.
     */
    scrollToken?: string;
    /**
     * @remarks - query for message search.
     */
    query?: string;
    /**
     * @remarks - name of search column for sorting.
     */
    sorting?: string;
    /**
     * @remarks - asc or desc sort type for message search results.
     */
    sortingType?: SortingType;
    /**
     * @remarks - requested tag for message search results.
     */
    tag?: CcfInteractionSearchFilterValues[];
    /**
     * @remarks - requested read status for message search results.
     */
    isRead?: CcfInteractionSearchFilterValues[];
}
