import { __awaiter } from "tslib";
import { Subject } from 'rxjs';
import { DirectoryEntities, CXoneSdkError } from '@nice-devone/common-sdk';
import { AddressBookService } from './service/address-book-service';
import { SkillService } from './service/skill-service';
import { CXoneDirectoryProvider } from './provider/cxone-directory-provider';
import { TeamService } from './service/team-service';
import { ACDSessionManager, StorageKeys } from '@nice-devone/core-sdk';
import { CXoneDynamicDirectory } from './../dynamic-directory/cxone-dynamic-directory';
/** This is the base class for Directory*/
export class CXoneDirectory {
    /**
     * Create instance for directory session and initialize it
     * @example
     * ```
     * new DirectoryBase();
     * ```
     */
    constructor() {
        this.directoryEvent = new Subject();
        this.directoryProvider = new CXoneDirectoryProvider();
        this.acdSession = {};
        this.onUpdateSkillsEvent = new Subject();
        this.dynamicDirectory = {};
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
        this.getFilteredStandardBookEntries = (data) => __awaiter(this, void 0, void 0, function* () {
            const standardAddressBookDetailsWithFilteredEntries = [];
            if (data.addressBooks && data.addressBooks.length > 0) {
                yield Promise.all(data.addressBooks.map((addressBook) => __awaiter(this, void 0, void 0, function* () {
                    const entries = yield this.addressBookService
                        .getStandardEntries(addressBook.addressBookId.toString(), data.skip, data.top, data.searchText);
                    if (!(entries instanceof CXoneSdkError)) {
                        standardAddressBookDetailsWithFilteredEntries.push(entries);
                    }
                })));
            }
            return standardAddressBookDetailsWithFilteredEntries;
        });
        this.directoryProvider.setDirectoryBaseInstance(this);
        this.addressBookService = new AddressBookService();
        this.acdSession = ACDSessionManager.instance;
        this.skillService = new SkillService();
        this.teamService = new TeamService();
        this.acdSession.updateSkillsEvent.subscribe(() => {
            this.getAgentSkills();
        });
        const lastLoggedInAgentId = localStorage.getItem(StorageKeys.LAST_LOGGED_IN_AGENT_ID);
        const currentAgentInfo = JSON.parse(localStorage.getItem(StorageKeys.USER_INFO) || '{}');
        if (!lastLoggedInAgentId) {
            localStorage.setItem(StorageKeys.LAST_LOGGED_IN_AGENT_ID, currentAgentInfo.icAgentId);
        }
        else if (lastLoggedInAgentId !== currentAgentInfo.icAgentId) {
            // Clear copilot data from Index DB only if a new Agent logs in to the same workstation
            this.clearDirectoryDB();
            this.directoryProvider.clearCopilotDB();
        }
        this.dynamicDirectory = new CXoneDynamicDirectory();
    }
    /**
     * Used to clear out the directory data from the index DB before initiating a new directory instance
    */
    clearDirectoryDB() {
        this.directoryProvider.clearDirectoryDB(); // to clear out the indexDB directory cache data before starting polling
    }
    /**
     * Used to handle the directory data for polling, non polling and search requests
     * @param directoryRequest - directory request object with  pollingOptions, entity, offset, limit and searchText
     * @example -
     * ```
     * getDirectoryData(directoryRequest);
     * ```
     */
    getDirectoryData(directoryRequest) {
        var _a;
        directoryRequest.entity = ((_a = directoryRequest.entity) === null || _a === void 0 ? void 0 : _a.length) ? directoryRequest.entity : [DirectoryEntities.ADDRESS_BOOK_LIST,
            DirectoryEntities.AGENT_LIST, DirectoryEntities.SKILL_LIST, DirectoryEntities.TEAM_LIST];
        this.directoryProvider.getDirectoryData(directoryRequest.entity, directoryRequest.pollingOptions, directoryRequest.offset, directoryRequest.limit, directoryRequest.searchText, directoryRequest.teamId, directoryRequest.mediaType, directoryRequest.shouldFetchAllAgents);
    }
    /**
     * Used to terminate directory polling
     * @example -
     * ```
     * this.directoryBase.terminateDirectoryPolling()
     * ```
     */
    terminateDirectoryPolling() {
        this.directoryProvider.terminatePolling();
    }
    /**
     * Method to get agent skills
     * @example
     * ```
     * this.getAgentSkills();
     * ```
     */
    getAgentSkills() {
        this.skillService
            .getAgentSkills()
            .then((response) => {
            this.onUpdateSkillsEvent.next(response);
        })
            .catch((error) => {
            this.onUpdateSkillsEvent.next(error);
        });
    }
    /**
     * Method to toggle favorites for Agents
     * @example
     * ```
     * this.toggleFavorite();
     * ```
     */
    toggleFavoriteForAgent(agentInfo) {
        this.directoryProvider.toggleFavoriteForAgent(agentInfo);
    }
    /**
     * Method to get favorites for Agents
     * @example
     * ```
     * this.getFavorites(searchText);
     * ```
     */
    getFavoritesByAgent(agentName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.directoryProvider.getFavoritesByAgent(agentName);
        });
    }
}
//# sourceMappingURL=cxone-directory.js.map