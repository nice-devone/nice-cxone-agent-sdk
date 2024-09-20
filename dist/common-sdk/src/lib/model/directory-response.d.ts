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
        totalSearchMatchRecords?: number;
        allAgentCount?: number;
        favoriteAgents?: AgentStateResponse[];
    };
    addressBookList: {
        data: AddressBooks[];
        totalRecords?: number;
        errorMsg?: string;
        allAddressBookCount?: number;
        totalSearchMatchRecords?: number;
        allAddressBookEntries?: AddressBooksEntries[];
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
    };
}
