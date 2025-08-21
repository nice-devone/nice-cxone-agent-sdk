import { CXoneSdkError, DirectoryEntries, Directories, SearchDirectoriesResponse, SearchDirectoriesRequest, DirectoryMetadata, DynamicDirectoyMessage, DirectoryAdditionalAtrributes } from '@nice-devone/common-sdk';
import { Logger } from '@nice-devone/core-sdk';
import { Subject } from 'rxjs';
/** This is the base class for Dynamic Directory*/
export declare class CXoneDynamicDirectory {
    protected logger: Logger;
    private auth;
    private validationUtils;
    private utilService;
    private urlUtilsService;
    private wsProvider;
    private currentSearchDirectoriesRequest;
    private searchDirectoriesResponse;
    onMessageReceived: Subject<DynamicDirectoyMessage>;
    searchDirectoryResult: Subject<unknown>;
    private directory;
    private messageReceivedSubscription;
    /**
     * Create instance for dynamic directory session and initialize it
     * @example
     * ```
     * new CXoneDynamicDirectory();
     * ```
     */
    constructor();
    /**
     * Method used to get all directory entries
     * @param directoryId - Directory id for which we need to get metadata
     * @param agentId - Agent id for which directories are fetched
     * @param startIndex - start index for pagination
     * @param totalRecords - total records to be fetched
     * @returns - return the directory entries list
     * ```
     * @example
     * getDirectoryEntries('11eb3f87', '1124893d', 0, 25)
     * ```
     */
    getDirectoryEntries(directoryId: string, agentId: string, startIndex?: number, totalRecords?: number): Promise<DirectoryEntries | CXoneSdkError>;
    /**
     * Method used to get directories
     * @param agentId - Agent id for which directories are fetched
     * @param startIndex - start index for pagination
     * @param totalRecords - total records to be fetched
     * @returns - return the list of directories
     * ```
     * @example
     * getDirectories(1234,0,25)
     * This will get directories from 0 to 25 for agent id 1234
     * ```
     */
    getDirectories(agentId: string, startIndex?: number, totalRecords?: number): Promise<Directories | CXoneSdkError>;
    /** Method used to get Directory metadata
     * @param directoryId - Directory id for which we need to get metadata
     * @param agentId - Agent id for which directories are fetched
     * @returns - return the directory metadata
     * @example
     * ```
     * getDirectoryMetadata(5678, 1234);
     * ```
     * This will get directory metadata for agent id 1234 and directory id 5678
     *
     */
    getDirectoryMetadata(directoryId: string, agentId: string): Promise<DirectoryMetadata | CXoneSdkError>;
    /**
     * Used to toggle the favorite marker for external directory and store it in Index DB
     * @param extDirectoryEntries - Information of the external directory of whom favorite field needs to be toggled
     * @example -
     * ```
     * directoryProvider.toggleFavoriteForExternalDirectory(extDirectoryEntries);
     * ```
     */
    toggleFavoriteForExternalDirectory(extDirectoryEntries: DirectoryAdditionalAtrributes[]): Promise<void>;
    /** Method used to update favorite directory entries from client data
     * @example -
     * ```
     * updateFavExtDirEntriesFromClientData();
     * ```
  */
    updateFavExtDirEntriesFromClientData: () => Promise<void>;
    /**
   * Used to sort external directory entries based on first name and last name
   *  @param externalDirectoryEntries - array of external directory entries
   * @example -
   * ```
   * sortExternalDirectory(externalDirectoryEntries)
   * ```
   */
    private sortExternalDirectory;
    /**
   * get filtered External Directory List based on search text
   * @param extDirectories - array of external directory entries
   * @param searchText - search string
   * @example -
   * ```
   * getFilteredExtDirList(searchText, extDirectories)
   * ```
   */
    private getFilteredExtDirList;
    /**
    * Function to add external directory entries favorite in Index DB from store
    * @param directoryEntries - Array of directory entries to update favorites.
    * @example -
    * ```
    * updateExtDirectoryEntriesFavListInDB(directoryEntries)
    * ```
    */
    private updateExtDirectoryEntriesFavListInDB;
    /**
   * Used to retrieve external directory entries and filter out favorites
   * @param directoryEntries - array of directory entries to filter
   * @param extDirectoryName - external directory name to filter
   * @returns - returns the filtered favorite external directory entries
   * @example -
   * ```
   * directoryProvider.getFavoritesByExtDirectory(directoryEntries, extDirectoryName);
   * ```
   */
    getFavoritesByExtDirectory(directoryEntries: DirectoryAdditionalAtrributes[], extDirectoryName: string): Promise<DirectoryAdditionalAtrributes[]>;
    /**
     * Method is used to search directories
     * @param searchDirectoriesRequest -- pass the SearchDirectoriesRequest type object
     * @returns - return object of type SearchDirectoriesResponse. Containing filtered directories based on search parameter
     * @example -
     * ```
     * searchDirectories(searchDirectoriesRequest)
     * ```
     */
    searchDirectories(searchDirectoriesRequest: SearchDirectoriesRequest): void;
    /**
     * Use get the selected tab
     * @example
     * ```
     * this.setSelectedTabs();
     * ```
     */
    setSelectedTabs(appSpaceSelectedTab: string | null, globalSelectedTab: string | null): void;
    /**
     * Use set the dom visibility
     * @example
     * ```
     * this.setDomVisibility();
     * ```
     */
    setDomVisibility(domVisibility: boolean): void;
    /**
     * Method used to end WebSocket dynamic directory serach
     * @example
     * ```
     * this.endDirectoriesSearch();
     * ```
     */
    endDirectoriesSearch(subscriptionId: string): void;
    /**
     * Method used to connect the WebSocket
     * @example
     * ```
     * this.connectSocket();
     * ```
     */
    private socketMessageHandler;
    /**
     * Method used to connect the WebSocket
     * @example
     * ```
     * this.connectSocket();
     * ```
     */
    private mergeSearchResults;
    /**
     * Method used to update subject with directory search response
     * @example
     * ```
     * this.publishFinalDynamicDirectoryResponse();
     * ```
     */
    publishFinalDynamicDirectoryResponse(data: SearchDirectoriesResponse): void;
}
