export interface DirectoryFilter {
    searchText?: string;
    data: any;
    filterType: string;
    mediaTypeIds?: number[];
    limit?: number;
    offset?: number;
    isOutbound?: boolean;
}
/**
* Method to filter, sort and truncate data based on searchText, offset and Limit
*
* @param filter - provides all the parameter to perform search
* @returns - filtered array
* @example -
* ```
* DirectorySearchFilter(filter)
* ```
*/
export declare const DirectorySearchFilter: (filter: DirectoryFilter) => any[];
