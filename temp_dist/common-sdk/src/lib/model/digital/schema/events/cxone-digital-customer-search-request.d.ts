import { SortingType } from '../../../../enum/sorting-type';
/**
 * Interface used for customer search query param and filter support request payload
 */
export interface CXoneDigitalCustomerSearchRequest {
    /**
     * @remarks - page number received in previous response for next pagination.
     */
    page?: number;
    /**
     * @remarks - search key entered in search box.
     */
    query?: string;
    /**
     * @remarks - name of search column for sorting.
    */
    order?: string;
    /**
     * @remarks - asc or desc sort type for contact search results.
    */
    orderBy?: SortingType;
    /**
    * @remarks - name of search column for sorting.
    */
    sorting?: string;
    /**
     * @remarks - asc or desc sort type for message search results.
     */
    sortingType?: SortingType;
    /**
     * @remarks - has note filter option
    */
    hasNote?: string;
}
