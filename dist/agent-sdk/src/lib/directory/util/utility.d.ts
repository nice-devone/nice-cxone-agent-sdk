declare type NumberKeys<T> = {
    [K in keyof T]: T[K] extends number | string ? K : never;
}[keyof T];
export interface DirectoryFilter {
    searchText?: string;
    data: any;
    filterType: string;
    mediaTypeIds?: number[];
    limit?: number;
    offset?: number;
    isOutbound?: boolean;
}
export interface HandleDirectoryItemDeletionOptions<T extends {
    isActive?: boolean;
}> {
    listFromDB: T[];
    idName: NumberKeys<T>;
    favClientList: number[];
    storageKey: string;
    clientDataKey: string;
    checkForActive?: boolean;
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
/**
 * Updates the favorite list in local storage client data when entries are removed from the userhub, typically during login/logout.
 * @param options - Options for handling directory item deletion:
 *   - listFromDB: List of items from the database.
 *   - idName: The key name for the item's ID.
 *   - favClientList: Favorite client list from local storage.
 *   - storageKey: Local storage key to update.
 *   - clientDataKey: Key in client data to update.
 *   - checkForActive: Flag to filter out inactive items (default: true).
 * @returns An object containing the updated favorite list and a flag indicating if the client data API call failed.
 * @example
 * ```
 * handleDirectoryItemDeletion({
 *   listFromDB,
 *   idName: 'id',
 *   favClientList,
 *   storageKey: 'favoriteList',
 *   clientDataKey: 'favoriteList',
 *   checkForActive: true
 * })
 * ```
 */
export declare function handleDirectoryItemDeletion<T extends {
    isActive?: boolean;
}>(options: HandleDirectoryItemDeletionOptions<T>): Promise<{
    currFavListInLS: number[];
    clientDataApiFailed: boolean;
}>;
export {};
