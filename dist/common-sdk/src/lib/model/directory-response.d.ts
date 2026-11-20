import { SkillEvent } from './skill-event';
import { AddressBooks } from './address-book';
import { AgentStateResponse } from './agent-state-response';
import { Team } from './team';
import { AddressBooksEntries } from './address-book-entries';
export interface DirectoryResponse {
    skillList: {
        data: SkillEvent[];
        totalRecords?: number;
        errorMsg?: string;
        totalSearchMatchRecords?: number;
        allSkillCount?: number;
        favoriteDigitalSkills?: SkillEvent[];
    };
    /**
     * @remarks  totalRecords - Count of total records based on pagination value set(In set of 5)
     * allAgentCount - Count of total records available for agents irrespective of pagination
     * @remarks  totalSearchMatchRecords - Count of total records which matches the search string in the entire data array( without pagination )
     */
    agentList: {
        data: AgentStateResponse[];
        totalRecords?: number;
        errorMsg?: string;
        /** Structured error carrying a translation key and optional positional args for i18n rendering. */
        errorDetails?: {
            translationKey: string;
            args?: (string | number)[];
        };
        totalSearchMatchRecords?: number;
        allAgentCount?: number;
        favoriteAgents?: AgentStateResponse[];
        /** Ids removed from the stored list this update (e.g. logged-off agents, DWP flow) so the store can
         * prune them from its paginated list — they are no longer present in `data`. */
        removedAgentIds?: (number | string)[];
        /** Set only for a terminal agentList polling failure (all retries exhausted) that should surface as
         * an app-level toast rather than inline directory UI state. */
        agentStateApiRetriesExhausted?: boolean;
    };
    addressBookList: {
        data: AddressBooks[];
        totalRecords?: number;
        errorMsg?: string;
        allAddressBookCount?: number;
        totalSearchMatchRecords?: number;
        allAddressBookEntries?: AddressBooksEntries[];
        favoriteStandardAddressBooks?: AddressBooksEntries[];
    };
    /**
     * @remarks  totalRecords - Count of total records based on pagination value set(In set of 5)
     * allTeamCount - Count of total records available for teams irrespective of pagination
     * @remarks  totalSearchMatchRecords - Count of total records which matches the search string in the entire data array( without pagination )
     */
    teamList: {
        data: Team[];
        totalRecords?: number;
        allTeamCount?: number;
        errorMsg?: string;
        totalSearchMatchRecords?: number;
        favoriteTeams?: Team[];
        isServerSide?: boolean;
        serverTotalRecords?: number;
        /** cumulative count of teams fetched so far (FT ON); stays the same when a cached page is republished */
        serverTotalLoaded?: number;
        isServerSideLoadMore?: boolean;
        teamsApiFailed?: boolean;
    };
}
