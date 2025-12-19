/**
 * Agent Profile Interface for API response
 */
export interface AgentProfileSettings {
    agentScreenSize: string;
    hideContactHistory: boolean;
    hideSearch: boolean;
    hideQueueCounter: boolean;
    hideSchedule: boolean;
    hideWEM: boolean;
    hideLaunch: boolean;
    hideCustomWorkspace: boolean;
    hideReporting: boolean;
    hideConversations: boolean;
    hideOBADHoc?: boolean;
    hideOBRedial?: boolean;
    hideOBAgentConsult?: boolean;
    hideOBAddressBookConsult?: boolean;
    hideOBSkillConsult?: boolean;
    hideOBElevation?: boolean;
    hideOBSaveAndRedial?: boolean;
    hideOBTransfer?: boolean;
    hideDirectorySearch?: boolean;
    hideDirectoryAll?: boolean;
    hideDirectoryFavorites?: boolean;
    hideDirectoryAgents?: boolean;
    hideDirectoryTeams?: boolean;
    hideDirectorySkills?: boolean;
    hideDirectoryStandardAddressBook?: boolean;
}
