import dayjs from 'dayjs';
import { SEARCH_TABS_LABEL, ccfDigitalSearchActions, } from './ccf-digital-search.slice';
import { CcfAssignmentAction, searchDigitalMessageTagByName, } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CcfLogger } from '@nice-devone/agent-sdk';
const logger = new CcfLogger('App.digital-search', 'App.digital-search-utility');
/**
 * Object defining default search columns count for different screen sizes.
 */
export const defaultSearchColumnsCount = {
    LARGE: 6,
    MEDIUM: 5,
    SMALL: 4,
};
export const DATE_FIELD = 'date';
/**
 * Updates the number of visible columns based on the provided conditions.
 * @param isSmView - Flag indicating whether the view is small
 * @param renderTwoColumnDesign - Flag indicating whether to render the two-column design
 * @param tabColumnsCount - Optional object defining the number of columns for different screen sizes.
 * @example getVisibleColumns(isSmView, renderTwoColumnDesign, dispatch);
 */
export const getSearchVisibleColumns = (isSmView, renderTwoColumnDesign, tabColumnsCount = defaultSearchColumnsCount, activeTab) => {
    let columnsCount;
    if (!isSmView && renderTwoColumnDesign) {
        columnsCount = activeTab === SEARCH_TABS_LABEL.CUSTOMERS ? tabColumnsCount.MEDIUM : tabColumnsCount.LARGE;
    }
    else if (!isSmView && !renderTwoColumnDesign) {
        columnsCount = tabColumnsCount.SMALL;
    }
    else if (isSmView && renderTwoColumnDesign) {
        columnsCount = tabColumnsCount.MEDIUM;
    }
    else {
        columnsCount = tabColumnsCount.SMALL;
    }
    return columnsCount;
};
/**
 * Calculates the flex direction style based on the viewport size and design preference.
 * @param renderTwoColumnDesign  - The properties to determine should render in two-column design.
 * @param isSmView  - The properties to determine if it's a small viewport.
 * @returns string - The flex direction style ('row' or 'column').
 * @example getFlexDirectionStyle(true,false))
 */
export const getFlexDirectionStyle = (isSmView, renderTwoColumnDesign) => isSmView && renderTwoColumnDesign ? 'row' : 'column';
/**
 * function to get the properties of selected tab
 * @param digitalConfig - the configuration object
 * @param tab - selected tab
 * @param property - property that need
 * @example getConfigForActiveTab(digitalConfig, tab, property)
 */
export const getConfigForActiveTab = (digitalConfig, tab, property) => {
    if (digitalConfig && digitalConfig[tab] && digitalConfig[tab][property]) {
        return digitalConfig[tab][property];
    }
    else {
        return null; // Return null if the specified property under the selected tab is not found
    }
};
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
export const formatResponseTimer = (seconds, alreadyHasValue) => {
    const timeValue = seconds && alreadyHasValue ? seconds : 0; // if the timer already has value then only will use the seconds value else will show the 0 min.
    const duration = dayjs.duration(timeValue, 'seconds');
    const sec = duration.seconds();
    const min = duration.minutes();
    const hour = duration.hours();
    const day = duration.days();
    //Dev Note: We are showing minutes value when the time is less than 1 hour and showing seconds when time is less than 1 minute
    let finalTime = min > 0 ? `${min} min` : `${sec} sec`;
    if (hour > 0)
        finalTime = `${min} min ${hour} h`;
    if (day > 0)
        finalTime = `${min} min ${hour} h ${day} d`;
    return finalTime;
};
/**
 * function to check updateDefaultColumns has been dispatched
 * @example dispatchDefaultColumnData()
 */
export const dispatchDefaultColumnData = (searchConfig, activeTab, dispatch) => {
    const gridColumnConfig = getConfigForActiveTab(searchConfig, activeTab, 'columns'); //Getting default column config on tab change
    dispatch(ccfDigitalSearchActions.updateDefaultColumns(gridColumnConfig));
};
/**
 * function to set the default column config to maintain the selected columns on page reload
 * @param activeTabGridColumns - columns defined for active tab
 * @param defaultColumns - columns from store
 * @example setDefaultColumnConfig(activeTabGridColumns, defaultColumns)
 */
export const setDefaultColumnConfig = (activeTabGridColumns, defaultColumns) => {
    const defaultColumnsConfig = [];
    if (defaultColumns === null || defaultColumns === void 0 ? void 0 : defaultColumns.length) {
        defaultColumns.forEach((column) => {
            const searchColumn = activeTabGridColumns.find((item) => item.field === column.field);
            if (searchColumn) {
                searchColumn.hide = column.hide;
                defaultColumnsConfig.push(searchColumn);
            }
        });
    }
    return defaultColumnsConfig;
};
/**
 * used to get the approximate width of the string
 * @param text - text
 * @example getStringWidth(text)
 * @returns width of the string
 */
export const getStringWidth = (text) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
        context.font = '1rem monospace';
        const metrics = context.measureText('M');
        const approxCharWidth = metrics.width;
        return text.length * approxCharWidth + 50;
    }
    return 0;
};
/**
   * method to search message tag by text on providing the input from Tag filter input box
   * @param _event - event details
   * @param setTagSearched - method to set the value if tag is searched or not.
   * @param value - value typed in the input box.
   * @param dispatch - dispatch method to dispatch the actions.
   * @example onMultiselectDropdownInputChange(setTagSearched,value,dispatch)
   */
export const onMultiselectDropdownInputChange = (setTagSearched, value, dispatch) => {
    if (value.length >= 2) {
        dispatch(searchDigitalMessageTagByName({ tagName: value }));
        setTagSearched(true);
    }
    else if (value.length === 0) {
        setTagSearched(false);
        dispatch(CcfAssignmentAction.clearSearchDigitalMessageTag([]));
    }
};
/**
 * Strips the hyperTextMarkup of all its HTML tags.
 * @param hyperTextMarkup - string - HTML elements.
 * @returns - string - hyperTextMarkup stripped of all its HTML tags.
 * @example stripHTMLTags(hyperTextMarkup);
 */
export const stripHTMLTags = (hyperTextMarkup) => {
    var _a;
    const htmlParser = new DOMParser().parseFromString(hyperTextMarkup, 'text/html');
    return ((_a = htmlParser === null || htmlParser === void 0 ? void 0 : htmlParser.body) === null || _a === void 0 ? void 0 : _a.textContent) || '';
};
/**
 * converts HTML into text by stripping HTML tags and decoding HTML entities.
 * @param hyperTextMarkup - string - HTML elements.
 * @returns string - hyperTextMarkup stripped of all its HTML tags and HTML entities decoded.
 * @example convertHtmlToText(hyperTextMarkup);
 */
export const convertHtmlToText = (hyperTextMarkup) => {
    const strippedText = stripHTMLTags(hyperTextMarkup || '');
    return strippedText;
};
/**
 * Converts an object of filter values to a new object where all values are strings.
 *
 * @param obj - The object containing filter values to be converted.
 * @returns A new object with the same keys as the input object, but with all values converted to strings.
 * @example convertValuesToString(filterValues)
 */
const convertValuesToString = (obj) => {
    const newObj = {};
    Object.entries(obj).forEach(([key, value]) => {
        try {
            newObj[key] = JSON.stringify(value);
        }
        catch (e) {
            logger.error('convertValuesToString', 'Errored out on JSON.stringify' + JSON.stringify(e));
        }
    });
    return newObj;
};
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
export const convertInteractionsTabDataToSearchAppSettings = (data, clientData) => {
    var _a, _b, _c;
    try {
        const { columns, filterValues, isFilterSelected = false, sorting } = data;
        const clientDataSearchAppInteractions = (_a = clientData === null || clientData === void 0 ? void 0 : clientData.cxaSearchAppSettings) === null || _a === void 0 ? void 0 : _a.interactions;
        if (!columns && !filterValues && !sorting)
            return null;
        const newColumns = (columns === null || columns === void 0 ? void 0 : columns.map((column) => {
            var _a;
            return ({
                field: column.field,
                hide: (_a = column.hide) !== null && _a !== void 0 ? _a : false,
            });
        })) || ((_b = clientDataSearchAppInteractions === null || clientDataSearchAppInteractions === void 0 ? void 0 : clientDataSearchAppInteractions.columnSettings) === null || _b === void 0 ? void 0 : _b.columns);
        const newsortingObject = sorting || ((_c = clientDataSearchAppInteractions === null || clientDataSearchAppInteractions === void 0 ? void 0 : clientDataSearchAppInteractions.columnSettings) === null || _c === void 0 ? void 0 : _c.sorting);
        const newFilterSettings = filterValues
            ? { filters: convertValuesToString(filterValues), isFilterSelected: isFilterSelected }
            : clientDataSearchAppInteractions === null || clientDataSearchAppInteractions === void 0 ? void 0 : clientDataSearchAppInteractions.filterSettings;
        return {
            interactions: {
                columnSettings: {
                    columns: newColumns,
                    sorting: newsortingObject,
                },
                filterSettings: newFilterSettings,
            },
        };
    }
    catch (e) {
        logger.error('convertInteractionsTabDataToSearchAppSettings', 'Something went wrong while converting UX data into clientData interface - ' + JSON.stringify(e));
        return null;
    }
};
//# sourceMappingURL=ccf-digital-search-utility.js.map