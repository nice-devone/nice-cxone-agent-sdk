import { SortingType } from '../../enum/sorting-type';
export interface CXoneSearchAppFilterColumnSettings {
    columnSettings?: {
        columns?: InteractionTabColumn[];
        sorting?: InteractionTabSorting;
    };
    filterSettings?: filterSetting;
}
export interface InteractionTabSorting {
    field: string;
    direction: SortingType;
}
export interface InteractionTabColumn {
    field: string;
    hide: boolean;
}
declare enum DIGITAL_SEARCH_FILTERS {
    AGENT = "agent",
    CHANNEL = "channel",
    FROM = "from",
    HAS_NOTE = "hasNote",
    INBOX_ASSIGNEE = "inboxAssigneeAgentId",
    IS_READ = "isRead",
    OWNER_ASSIGNEE = "ownerAssigneeAgentId",
    SKILL = "skill",
    SKILL_ID = "skillId",
    STATUS = "status",
    TAG = "tag",
    TO = "to"
}
export interface filterSetting {
    filters: InteractionTabfilters;
    isFilterSelected: boolean;
}
export declare type InteractionTabfilters = {
    [key in DIGITAL_SEARCH_FILTERS]: string;
};
/**
 * @example
 */
export interface CXoneSearchAppTabs {
    interactions?: CXoneSearchAppFilterColumnSettings;
}
/**
 * Parses the search application settings from the provided data.
 *
 * @param data - The CXoneSearchAppTabs object containing the search app settings to be parsed.
 * @example - parseSearchAppSettings(data)
 * @returns The parsed CXoneSearchAppTabs object with updated filter settings.
 */
export declare const parseSearchAppSettings: (data: CXoneSearchAppTabs) => CXoneSearchAppTabs;
export {};
