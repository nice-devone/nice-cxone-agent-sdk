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
     * Object containing filter values
     */
    filters?: FilterValueSets;
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
    [key: string]: FilterOptionItem[];
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
}
