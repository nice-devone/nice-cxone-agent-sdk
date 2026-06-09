import { SortingType } from '../../enum/sorting-type';
/**
 * Interface used for thread search (Interaction search thread tab)
 */
export interface CXoneDigitalThreadSearchRequest {
    /**
     * @remarks - page number for handling pagination
     */
    page?: number;
    /**
     * @remarks - query for thread search.
     */
    query?: string;
    /**
     * @remarks - name of search column for sorting.
     */
    sortBy?: string;
    /**
     * @remarks - asc or desc sort type for thread search results.
     */
    sortType?: SortingType;
    /**
     * @remarks - query param related to context column in threads tab
     */
    withContext: number;
}
