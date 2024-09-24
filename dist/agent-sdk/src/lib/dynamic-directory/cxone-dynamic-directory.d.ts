import { CXoneSdkError, DirectoryEntries, Directories, SearchDirectoriesResponse, SearchDirectoriesRequest, DirectoryMetadata, DynamicDirectoyMessage } from '@nice-devone/common-sdk';
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
     * Method is used to serach directories
     * @param searchDirectoriesRequest -- pass the SearchDirectoriesRequest type object
     * @returns - return object of type SearchDirectoriesResponse. Containing filtered directories based on search parameter
     * ```
     * @example --
     * const searchDirectoriesRequest:SearchDirectoriesRequest = \{
     * \{
     *"subscriptionId": "subscriptionId",
     *"searchString": "firstname lastname",
     *"realTimeUpdates": true/false,
     *"skip": 0,
     *"top": 50,
     *"directoryUUID": "directoryUUID"
     *"filter": \{
     *    "partnerType": [
     *     "Zoom"
     *  ],
     *   "fieldType": [
     *        "email"
     *     ]
     *\}
     *\}
     *\}
     *```
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
