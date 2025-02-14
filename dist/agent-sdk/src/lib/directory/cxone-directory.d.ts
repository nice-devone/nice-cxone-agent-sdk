import { Subject } from 'rxjs';
import { DirectoryResponse, DirectoryRequest, AgentSkill, AgentStateResponse, AddressBookEntriesResponse, AddressBooks, SAB2AddressBook } from '@nice-devone/common-sdk';
import { AddressBookService } from './service/address-book-service';
import { SkillService } from './service/skill-service';
import { CXoneDirectoryProvider } from './provider/cxone-directory-provider';
import { TeamService } from './service/team-service';
import { CXoneDynamicDirectory } from './../dynamic-directory/cxone-dynamic-directory';
/** This is the base class for Directory*/
export declare class CXoneDirectory {
    private static singleton;
    addressBookService: AddressBookService;
    skillService: SkillService;
    directoryEvent: Subject<DirectoryResponse>;
    directoryProvider: CXoneDirectoryProvider;
    teamService: TeamService;
    private acdSession;
    onUpdateSkillsEvent: Subject<AgentSkill[]>;
    dynamicDirectory: CXoneDynamicDirectory;
    /**
     * Create instance for directory session and initialize it
     * @example
     * ```
     * new DirectoryBase();
     * ```
     */
    constructor();
    /**
     * Used to clear out the directory data from the index DB before initiating a new directory instance
    */
    private clearDirectoryDB;
    /**
     * Used to handle the directory data for polling, non polling and search requests
     * @param directoryRequest - directory request object with  pollingOptions, entity, offset, limit and searchText
     * @example -
     * ```
     * getDirectoryData(directoryRequest);
     * ```
     */
    getDirectoryData(directoryRequest: DirectoryRequest): void;
    /**
     * Used to terminate directory polling
     * @example -
     * ```
     * this.directoryBase.terminateDirectoryPolling()
     * ```
     */
    terminateDirectoryPolling(): void;
    /**
   * get Standard Address book entries for all standardbooks for a email autocomplete search
   * @param addressBooks - AddressBooks[], used to make api call for every addressbook
   * @param skip - number starting index of the result array.
   * @param top - number max limit/ number of records that is needed.
   * @param searchString - string, the string used to search in db
   * @example -
   * ```
   *  this.getFilteredStandardBookEntries({ addressBooks: AddressBooks[];
        skip: number;
        top: number;
        searchText: string;})
   * ```
   */
    getFilteredStandardBookEntries: (data: {
        addressBooks: (AddressBooks | SAB2AddressBook)[];
        skip: number;
        top: number;
        searchText: string;
    }) => Promise<AddressBookEntriesResponse[]>;
    /**
     * Method to get agent skills
     * @example
     * ```
     * this.getAgentSkills();
     * ```
     */
    getAgentSkills(): void;
    /**
     * Method to toggle favorites for Agents
     * @example
     * ```
     * this.toggleFavorite();
     * ```
     */
    toggleFavoriteForAgent(agentInfo: AgentStateResponse): void;
    /**
     * Method to get favorites for Agents
     * @example
     * ```
     * this.getFavorites(searchText);
     * ```
     */
    getFavoritesByAgent(agentName: string): Promise<AgentStateResponse[]>;
}
