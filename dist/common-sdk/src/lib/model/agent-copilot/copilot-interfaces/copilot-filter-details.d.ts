/**
 * model interface for copilot filters details
 */
export interface CopilotFilterDetails {
    /**
     * flag for checking if filters are applied
     */
    isFilterApplied?: boolean;
    /**
     * flag for checking if initial filters card is shown
     */
    isFilterCardShown?: boolean;
    /**
     * flag for checking if popover should open
     */
    shouldOpenFilterPopover?: boolean;
    /**
     * Object containing filter values
     */
    filters?: FilterValueSets;
    /**
     * Original agentFilters schema (Knowledge Hub mode) with full metadata, kept so the
     * complete structure can be sent back to the KB filter update API with user selections merged in
     */
    originalAgentFilters?: AgentFiltersSchema;
    /**
     * Agent-selected Unlocked MatchType ("Any" | "All"); undefined until the agent changes it
     */
    selectedMatchType?: string;
}
/**
 * A single filter entry within an agentFilters Locked or Unlocked group
 */
export interface AgentFilterEntry {
    /**
     * display name of the filter, also used as its field key in the UI
     */
    name: string;
    /**
     * "Filter" or "Append"
     */
    mode: string;
    /**
     * "ListSingle" or "ListMulti"
     */
    datatype?: string;
    /**
     * all selectable values
     */
    listItems?: string[];
    /**
     * default / currently selected values
     */
    listDefault?: string[];
    /**
     * metadata key the backend filters on
     */
    mdaKey?: string;
    /**
     * comparison operator the backend applies, e.g. "Equals", "In", "Contains"
     */
    mdaOperator?: string;
}
/**
 * A "Locked" (admin-enforced) or "Unlocked" (agent-selectable) group of agentFilters entries
 */
export interface AgentFilterGroup {
    /**
     * "Any" or "All" - how multiple filters in the group combine
     */
    MatchType?: string;
    /**
     * "Yes" | "No" - whether the agent may change MatchType (Unlocked group)
     */
    MatchTypeEditable?: string;
    /**
     * "Yes" | "No" - whether the group is shown in the filter UX (Locked group)
     */
    ShowFilterUX?: string;
    filters: AgentFilterEntry[];
}
/**
 * The "agentFilters" schema delivered by ACP for Knowledge Hub mode, replacing legacy expertTags
 */
export interface AgentFiltersSchema {
    Locked?: AgentFilterGroup;
    Unlocked?: AgentFilterGroup;
}
/**
 * Object containing different types of filter values
 */
export interface FilterValueSets {
    /**
     * Array of default values for filters
     */
    default?: FilterOptionValues;
    /**
     * Array of all possible values for filters
     */
    all?: FilterOptionValues;
    /**
     * Array of selected/active values for filters
     */
    active?: FilterOptionValues;
    /**
     * Array of selected/active values for filters in case of clearing but not applying filters
     */
    previous?: FilterOptionValues;
}
/**
 * Represents a collection of filter options where each key corresponds to a tag name from the studio script.
 */
export interface FilterOptionValues {
    [key: string]: {
        /**
        * type of the filter option, "Filter" or "Append"
        */
        type: string;
        /**
        * Array of filter option items(visible in the dropdown)
        */
        items: FilterOptionItem[];
    };
}
/**
 * Represents a filter option item.
 */
export interface FilterOptionItem {
    /**
     * unique identifier for the filter option.
     */
    id: string;
    /**
    * display name of the filter option.
    */
    name: string;
}
/**
 * Represents the structure of filter tags from studio script.
 */
export interface CopilotFilterTags {
    /**
     * Array of comma-separated standard filter tags
     */
    standard: string[];
    /**
     * Array of custom filter tags
     */
    custom: CustomCopilotFilterTags[];
}
/**
 * Represents the structure of custom filter tags from studio script.
 */
export interface CustomCopilotFilterTags {
    /**
     * name of the filter tag
     */
    name: string;
    /**
     * Array of all possible values for the filter tag that can be selected
     */
    values?: string[];
    /**
     * Array of default values for the filter tag
     */
    default: string[];
    /**
     * Array of selected values for the filter tag
     */
    selected?: string[];
    /**
     * Type of the filter option, possible values: "Filter" or "Append"
     */
    type?: string;
}
