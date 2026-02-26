import { Dispatch } from 'redux';
import { ColumnDefinitions, filterValues } from './ccf-digital-search.slice';
import { CXoneClientData, CXoneSearchAppTabs, InteractionTabSorting } from '@nice-devone/common-sdk';
/**
 * Object defining default search columns count for different screen sizes.
 */
export declare const defaultSearchColumnsCount: {
    LARGE: number;
    MEDIUM: number;
    SMALL: number;
};
export declare const DATE_FIELD = "date";
/**
 * Updates the number of visible columns based on the provided conditions.
 * @param isSmView - Flag indicating whether the view is small
 * @param renderTwoColumnDesign - Flag indicating whether to render the two-column design
 * @param tabColumnsCount - Optional object defining the number of columns for different screen sizes.
 * @example getVisibleColumns(isSmView, renderTwoColumnDesign, dispatch);
 */
export declare const getSearchVisibleColumns: (isSmView: boolean, renderTwoColumnDesign: boolean, tabColumnsCount?: {
    LARGE: number;
    MEDIUM: number;
    SMALL: number;
}, activeTab?: string) => number;
/**
 * Calculates the flex direction style based on the viewport size and design preference.
 * @param renderTwoColumnDesign  - The properties to determine should render in two-column design.
 * @param isSmView  - The properties to determine if it's a small viewport.
 * @returns string - The flex direction style ('row' or 'column').
 * @example getFlexDirectionStyle(true,false))
 */
export declare const getFlexDirectionStyle: (isSmView: boolean, renderTwoColumnDesign: boolean) => string;
/**
 * function to get the properties of selected tab
 * @param digitalConfig - the configuration object
 * @param tab - selected tab
 * @param property - property that need
 * @example getConfigForActiveTab(digitalConfig, tab, property)
 */
export declare const getConfigForActiveTab: (digitalConfig: any, tab: string, property: string) => any;
/**
 * This method used to format response timer
 * @param seconds - seconds value
 * @param alreadyHasValue - timer already has value
 * @returns - The formatted time string  - 'min h d' format
 * @example -
 * ```
 * formatResponseTimer(231426, false); // Returns "17 min 16 h 2 d"
 * ```
 */
export declare const formatResponseTimer: (seconds: number, alreadyHasValue: boolean) => string;
/**
 * function to check updateDefaultColumns has been dispatched
 * @example dispatchDefaultColumnData()
 */
export declare const dispatchDefaultColumnData: (searchConfig: any, activeTab: string, dispatch: Dispatch) => void;
/**
 * function to set the default column config to maintain the selected columns on page reload
 * @param activeTabGridColumns - columns defined for active tab
 * @param defaultColumns - columns from store
 * @example setDefaultColumnConfig(activeTabGridColumns, defaultColumns)
 */
export declare const setDefaultColumnConfig: (activeTabGridColumns: ColumnDefinitions[], defaultColumns: ColumnDefinitions[]) => ColumnDefinitions[];
/**
 * used to get the approximate width of the string
 * @param text - text
 * @example getStringWidth(text)
 * @returns width of the string
 */
export declare const getStringWidth: (text: string) => number;
/**
   * method to search message tag by text on providing the input from Tag filter input box
   * @param _event - event details
   * @param setTagSearched - method to set the value if tag is searched or not.
   * @param value - value typed in the input box.
   * @param dispatch - dispatch method to dispatch the actions.
   * @example onMultiselectDropdownInputChange(setTagSearched,value,dispatch)
   */
export declare const onMultiselectDropdownInputChange: (setTagSearched: (isSearched: boolean) => void, value: string, dispatch: Dispatch<any>) => void;
/**
 * Strips the hyperTextMarkup of all its HTML tags.
 * @param hyperTextMarkup - string - HTML elements.
 * @returns - string - hyperTextMarkup stripped of all its HTML tags.
 * @example stripHTMLTags(hyperTextMarkup);
 */
export declare const stripHTMLTags: (hyperTextMarkup: string) => string;
/**
 * converts HTML into text by stripping HTML tags and decoding HTML entities.
 * @param hyperTextMarkup - string - HTML elements.
 * @returns string - hyperTextMarkup stripped of all its HTML tags and HTML entities decoded.
 * @example convertHtmlToText(hyperTextMarkup);
 */
export declare const convertHtmlToText: (hyperTextMarkup: string) => string;
/**
 * Converts interaction tab data to search app settings.
 *
 * @param clientData - The client data of type CXoneClientData.
 * @param data - An object containing optional columns, filter values, and a boolean indicating if a filter is selected.
 * @returns A CXoneSearchAppTabs object if the new search interactions tab is enabled and data is provided, otherwise null.
 *
 * @example
 * const result = convertInteractionsTabDataToSearchAppSettings(isEnabled, clientData, data);
 */
export declare const convertInteractionsTabDataToSearchAppSettings: (data: {
    columns?: ColumnDefinitions[];
    filterValues?: filterValues;
    isFilterSelected?: boolean;
    sorting?: InteractionTabSorting;
}, clientData?: CXoneClientData) => CXoneSearchAppTabs | null;
