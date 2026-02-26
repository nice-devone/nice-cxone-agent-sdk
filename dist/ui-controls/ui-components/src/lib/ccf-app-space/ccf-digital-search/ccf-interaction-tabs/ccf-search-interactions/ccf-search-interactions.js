import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useMediaQuery, useTheme, Grid, } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { CcfBox, useTranslator, CcfAppToastMessage, FilterFieldTypes, } from '@nice-devone/ui-controls';
import CcfDigitalSearchStyle from '../../ccf-digital-search-styles';
import React, { useEffect, useState } from 'react';
import { CcfDigitalSearchGrid } from '../../ccf-digital-search-grid/ccf-digital-search-grid';
import { useDispatch, useSelector } from 'react-redux';
import CcfIcon, { CHANNEL_ICON_SIZE } from '../../../../ccf-icon/ccf-icon';
import clsx from 'clsx';
import { ccfDigitalSearchActions, getAllChannelsData, getDefaultFilterValues, getAgentListData, DIGITAL_SEARCH_FILTERS, getcurrentCustomerContactInfo, fetchSkillListData, getInteractionBulkLoading, SEARCH_TABS_LABEL, INTERACTION_GRID_COLUMN, getActiveSearchTab, getDefaultColumns, getCcfDigitalSearch, } from '../../ccf-digital-search.slice';
import { getAppspaceResolution } from '../../../ccf-app-space.slice';
import { toast } from 'react-toastify';
import CcfContactPreview from '../../ccf-interaction-contact-info';
import { CcfDigitalSearchInput } from '../../ccf-digital-search-input/ccf-digital-search-input';
import { CcfInteractionResetAndRefreshBar } from '../../ccf-interaction-search-reset-and-refresh/ccf-interaction-search-reset-and-refresh';
import { getApplicationLocale } from '../../../../global.app.slice';
import { InteractionSearchStatus, SortingType, DigitalChannelStatus, formatDateTime, CXoneClientData, } from '@nice-devone/common-sdk';
import CcfInteractionSearchMenu from '../../ccf-interaction-search-menu/ccf-interaction-search-menu';
import { getFlexDirectionStyle, formatResponseTimer, dispatchDefaultColumnData, setDefaultColumnConfig, onMultiselectDropdownInputChange, } from '../../ccf-digital-search-utility';
import CcfDigitalSearchFilterButton from '../../ccf-digital-search-filter-button/ccf-digital-search-filter-button';
import CcfDigitalSearchKebabMenu from '../../ccf-digital-search-kebab-menu/ccf-digital-search-kebab-menu';
import CcfDigitalSearchFilterContainer from '../../ccf-digital-search-filter/ccf-digital-search-filter-container';
import { getDigitalMessageTagsByName, getAllDigitalMessageTags, getDigitalMessageTagsCurrentPage } from '../../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfMultiSelectPaginationDropdown from '../ccf-multiselect-pagination-dropdown/ccf-multiselect-pagination-dropdown';
import { revamped_icons } from '../../../../ccf-icon/ccf-icon-list';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { CcfDigitalSearchDraggable } from '../../ccf-digital-search-draggable/ccf-digital-search-draggable';
const DATE_FIELD = 'date';
/**
 * CcfSearchInteractions - to display search component
 * @example - `<CcfSearchInteractions />`
 */
export function CcfSearchInteractions(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    const theme = useTheme();
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const styles = CcfDigitalSearchStyle(theme);
    const renderTwoColumnDesign = useSelector(getAppspaceResolution);
    const isCustomerCardPopupOpen = (_a = useSelector(getcurrentCustomerContactInfo)) === null || _a === void 0 ? void 0 : _a.isCustomerCardPopupOpen;
    const loadingInfo = useSelector(getInteractionBulkLoading);
    const [loadingValue, setLoadingValue] = React.useState();
    const toastId = React.useRef();
    const activeTab = useSelector(getActiveSearchTab);
    const locale = useSelector(getApplicationLocale);
    const defaultColumns = useSelector(getDefaultColumns);
    // Dev note - changes for multi filter reusable component
    const channelList = useSelector(getAllChannelsData);
    const dropdownOption = useSelector(getDefaultFilterValues);
    const agentList = useSelector(getAgentListData);
    const skillList = useSelector(fetchSkillListData);
    const searchedDigitalTags = useSelector(getDigitalMessageTagsByName);
    const options = useSelector(getAllDigitalMessageTags);
    const [tagsFilter, setTagFilter] = useState([]);
    const [isTagSearched, setTagSearched] = useState(false);
    const currentPageIndex = useSelector(getDigitalMessageTagsCurrentPage);
    const statusFilterOptions = (_b = Object.values(InteractionSearchStatus)) === null || _b === void 0 ? void 0 : _b.map((filterOption) => {
        return {
            id: filterOption,
            name: translate(filterOption) || filterOption,
        };
    });
    const tagsFilterOptions = options === null || options === void 0 ? void 0 : options.map((filterOption) => {
        return {
            id: filterOption === null || filterOption === void 0 ? void 0 : filterOption.id,
            name: filterOption === null || filterOption === void 0 ? void 0 : filterOption.title,
        };
    });
    const searchedTagsFilterOptions = searchedDigitalTags === null || searchedDigitalTags === void 0 ? void 0 : searchedDigitalTags.map((filterOption) => {
        return {
            id: filterOption === null || filterOption === void 0 ? void 0 : filterOption.id,
            name: filterOption === null || filterOption === void 0 ? void 0 : filterOption.title,
        };
    });
    const adjustInteractionGridColumnFlex = activeTab === SEARCH_TABS_LABEL.INTERACTIONS;
    const isKebabMenuPinned = adjustInteractionGridColumnFlex;
    /** function to select item from dropdown and update their values in redux according to fieldname
    * @param filterValues - filterValues to be updated in redux store
    * @param fieldName - according to fieldName we are updating the values in redux
    * @example onMenuItemClick(data, fieldName)
    */
    const onMenuItemClickHandler = (filterValues, fieldName) => {
        dispatch(ccfDigitalSearchActions.updateFilterValues({ fieldName, filterValues }));
    };
    /**
     * method to search message tag by text on providing the input from input box
     * @param _event - event details
     * @param value - value typed in the input box
     * @example onInputChange(_event,value)
     */
    const onInputChange = (_event, value) => {
        onMultiselectDropdownInputChange(setTagSearched, value, dispatch);
    };
    useEffect(() => {
        setTagFilter(isTagSearched ? searchedTagsFilterOptions : tagsFilterOptions);
    }, [isTagSearched, currentPageIndex, searchedDigitalTags]);
    const filterOptions = [
        {
            label: (_c = translate('channel')) === null || _c === void 0 ? void 0 : _c.toUpperCase(),
            options: channelList,
            fieldValue: dropdownOption.channel,
            onMenuItemClick: onMenuItemClickHandler,
            fieldName: DIGITAL_SEARCH_FILTERS.CHANNEL,
            isMultipleSelectionAllowed: true,
            type: FilterFieldTypes.DROPDOWN,
        },
        {
            label: (_d = translate('status')) === null || _d === void 0 ? void 0 : _d.toUpperCase(),
            options: statusFilterOptions,
            fieldValue: dropdownOption.status,
            onMenuItemClick: onMenuItemClickHandler,
            fieldName: DIGITAL_SEARCH_FILTERS.STATUS,
            isMultipleSelectionAllowed: true,
            type: FilterFieldTypes.DROPDOWN,
        },
        {
            label: translate('skill').toUpperCase(),
            options: skillList,
            fieldValue: dropdownOption.skillId,
            onMenuItemClick: onMenuItemClickHandler,
            fieldName: DIGITAL_SEARCH_FILTERS.SKILL_ID,
            isMultipleSelectionAllowed: true,
            type: FilterFieldTypes.DROPDOWN,
        },
        {
            label: translate('inboxAssignee').toUpperCase(),
            options: agentList,
            fieldValue: dropdownOption.inboxAssigneeAgentId,
            onMenuItemClick: onMenuItemClickHandler,
            fieldName: DIGITAL_SEARCH_FILTERS.INBOX_ASSIGNEE,
            isMultipleSelectionAllowed: true,
            type: FilterFieldTypes.DROPDOWN,
        },
        {
            label: translate('ownerAssignee').toUpperCase(),
            options: agentList,
            fieldValue: dropdownOption.ownerAssigneeAgentId,
            onMenuItemClick: onMenuItemClickHandler,
            fieldName: DIGITAL_SEARCH_FILTERS.OWNER_ASSIGNEE,
            isMultipleSelectionAllowed: true,
            type: FilterFieldTypes.DROPDOWN,
        },
        {
            label: (_e = translate('searchTag')) === null || _e === void 0 ? void 0 : _e.toUpperCase(),
            options: tagsFilter,
            fieldValue: dropdownOption.tag,
            onMenuItemClick: onMenuItemClickHandler,
            fieldName: DIGITAL_SEARCH_FILTERS.TAG,
            isMultipleSelectionAllowed: true,
            type: FilterFieldTypes.DROPDOWN,
            onInputChange: onInputChange,
            isPaginationSupported: true,
        },
        {
            label: (_f = translate('createDateRange')) === null || _f === void 0 ? void 0 : _f.toUpperCase(),
            fieldName: DATE_FIELD,
            type: FilterFieldTypes.DATE_PICKER,
        }
    ];
    useEffect(() => {
        if (loadingInfo) {
            const value = ((loadingInfo === null || loadingInfo === void 0 ? void 0 : loadingInfo.completedInteractions) && (loadingInfo === null || loadingInfo === void 0 ? void 0 : loadingInfo.totalInteractions)) ? ((loadingInfo === null || loadingInfo === void 0 ? void 0 : loadingInfo.completedInteractions) / (loadingInfo === null || loadingInfo === void 0 ? void 0 : loadingInfo.totalInteractions)) * 100 : loadingValue;
            setLoadingValue(value);
        }
    }, [loadingInfo]);
    useEffect(() => {
        const messageComponent = (_jsx(CcfAppToastMessage, { type: 'info', messageKey: loadingInfo === null || loadingInfo === void 0 ? void 0 : loadingInfo.messageKey, isLoading: true, loadingValue: loadingValue, extraArgs: { format: (loadingInfo === null || loadingInfo === void 0 ? void 0 : loadingInfo.extraArgs) || [''] } }));
        const toastOptions = {
            autoClose: (loadingValue === 100) ? 500 : undefined,
            containerId: 'AppToastContainer',
            onClose: () => dispatch(ccfDigitalSearchActions.updateInteractionBulkLoading(undefined)),
        };
        if (toastId.current === undefined) {
            if (!(loadingValue === undefined)) {
                toastId.current = toast.info(messageComponent, toastOptions);
            }
        }
        else {
            toast.update(toastId.current, Object.assign({ render: messageComponent }, toastOptions));
        }
        if (loadingValue && loadingValue >= 100 && toastId.current !== undefined) {
            toast.done(toastId.current);
            setLoadingValue(undefined);
            toastId.current = undefined;
        }
    }, [loadingValue]);
    //common search field property for all tabs
    const commonSearch = {
        searchText: '',
    };
    /**
     * function that renders kebab menu for each grid row
     * @param gridRowParams - CcfGridValidRowModel
     * @returns kebab menu for each grid row
     * @example - searchMenuOptions(gridRowParams)
     */
    const searchMenuOptions = (gridRowParams) => (_jsx(Box, { children: _jsx(CcfInteractionSearchMenu, { details: gridRowParams }) }));
    const interactionColumns = [
        {
            field: INTERACTION_GRID_COLUMN.TYPE,
            headerName: (_g = translate('type')) === null || _g === void 0 ? void 0 : _g.toUpperCase(),
            flex: adjustInteractionGridColumnFlex ? 'none' : 0.4,
            width: adjustInteractionGridColumnFlex && 50,
            sortable: false,
            sortingOrder: Object.values(SortingType),
            hide: false,
            renderCell: (params) => {
                var _a, _b, _c, _d, _e, _f;
                return (_jsx(CcfIcon, { iconName: ((_a = params === null || params === void 0 ? void 0 : params.row) === null || _a === void 0 ? void 0 : _a.direction) && (revamped_icons.includes((_c = (_b = params === null || params === void 0 ? void 0 : params.row) === null || _b === void 0 ? void 0 : _b.channelType) === null || _c === void 0 ? void 0 : _c.toLowerCase())) ? ((_d = params === null || params === void 0 ? void 0 : params.row) === null || _d === void 0 ? void 0 : _d.channelType) + '_' + ((_e = params === null || params === void 0 ? void 0 : params.row) === null || _e === void 0 ? void 0 : _e.direction) : (_f = params === null || params === void 0 ? void 0 : params.row) === null || _f === void 0 ? void 0 : _f.channelType // renderCell is not called as a component but as a function like so column.renderCell({ ...cellParams, api: apiRef.current }) So it should not contain any hook.
                    , size: CHANNEL_ICON_SIZE.SMALL }));
            },
        },
        {
            field: INTERACTION_GRID_COLUMN.CREATED_AT,
            headerName: (_h = translate('createDate')) === null || _h === void 0 ? void 0 : _h.toUpperCase(),
            flex: adjustInteractionGridColumnFlex ? 'none' : 0.75,
            width: adjustInteractionGridColumnFlex && 150,
            sortable: true,
            sortingOrder: Object.values(SortingType),
            hide: false,
            valueFormatter: (params) => {
                return formatDateTime(params === null || params === void 0 ? void 0 : params.value, locale);
            },
        },
        {
            field: INTERACTION_GRID_COLUMN.STATUS,
            headerName: (_j = translate('status')) === null || _j === void 0 ? void 0 : _j.toUpperCase(),
            flex: adjustInteractionGridColumnFlex ? 'none' : 0.5,
            minWidth: adjustInteractionGridColumnFlex && 110,
            sortable: true,
            sortingOrder: Object.values(SortingType),
            hide: false,
            cellClassName: (params) => {
                var _a;
                return clsx(((_a = params === null || params === void 0 ? void 0 : params.row) === null || _a === void 0 ? void 0 : _a.status) === DigitalChannelStatus.OPEN && 'columnColor', 'columnCapitalize');
            },
        },
        {
            field: INTERACTION_GRID_COLUMN.CHANNEL_NAME,
            headerName: (_k = translate('channel')) === null || _k === void 0 ? void 0 : _k.toUpperCase(),
            flex: 1,
            minWidth: adjustInteractionGridColumnFlex && 200,
            sortable: false,
            hide: false,
        },
        {
            field: INTERACTION_GRID_COLUMN.SKILL_NAME,
            headerName: (_l = translate('skill')) === null || _l === void 0 ? void 0 : _l.toUpperCase(),
            flex: 0.5,
            minWidth: adjustInteractionGridColumnFlex && 200,
            sortable: false,
            hide: false,
        },
        {
            field: INTERACTION_GRID_COLUMN.AUTHOR_END_USER_IDENTITY,
            headerName: (_m = translate('customerName')) === null || _m === void 0 ? void 0 : _m.toUpperCase(),
            flex: 1,
            minWidth: adjustInteractionGridColumnFlex && 200,
            sortable: false,
            hide: true,
            valueGetter: (params) => {
                var _a;
                return ((_a = params === null || params === void 0 ? void 0 : params.value) === null || _a === void 0 ? void 0 : _a.fullName) || '';
            },
        },
        {
            field: INTERACTION_GRID_COLUMN.INBOX_ASSIGNEE_USER,
            headerName: (_o = translate('inboxAssignee')) === null || _o === void 0 ? void 0 : _o.toUpperCase(),
            flex: 1,
            minWidth: adjustInteractionGridColumnFlex && 150,
            sortable: false,
            hide: true,
            valueGetter: (params) => {
                var _a, _b, _c, _d;
                return `${(_b = (_a = params === null || params === void 0 ? void 0 : params.value) === null || _a === void 0 ? void 0 : _a.firstName) !== null && _b !== void 0 ? _b : ''} ${(_d = (_c = params === null || params === void 0 ? void 0 : params.value) === null || _c === void 0 ? void 0 : _c.surname) !== null && _d !== void 0 ? _d : ''}`;
            },
        },
        {
            field: INTERACTION_GRID_COLUMN.OWNER_ASSIGNEE_USER,
            headerName: (_p = translate('ownerAssignee')) === null || _p === void 0 ? void 0 : _p.toUpperCase(),
            flex: 1,
            minWidth: adjustInteractionGridColumnFlex && 150,
            sortable: false,
            hide: true,
            valueGetter: (params) => {
                var _a, _b, _c, _d;
                return `${(_b = (_a = params === null || params === void 0 ? void 0 : params.value) === null || _a === void 0 ? void 0 : _a.firstName) !== null && _b !== void 0 ? _b : ''} ${(_d = (_c = params === null || params === void 0 ? void 0 : params.value) === null || _c === void 0 ? void 0 : _c.surname) !== null && _d !== void 0 ? _d : ''}`;
            },
        },
        {
            field: INTERACTION_GRID_COLUMN.ROUTING_QUEUE_PRIORITY,
            headerName: (_q = translate('priority')) === null || _q === void 0 ? void 0 : _q.toUpperCase(),
            flex: adjustInteractionGridColumnFlex ? 'none' : 0.5,
            width: adjustInteractionGridColumnFlex && 80,
            sortable: false,
            hide: true,
        },
        {
            field: INTERACTION_GRID_COLUMN.ID,
            headerName: (_r = translate('caseId')) === null || _r === void 0 ? void 0 : _r.toUpperCase(),
            flex: adjustInteractionGridColumnFlex ? 0.8 : 0.5,
            minWidth: adjustInteractionGridColumnFlex && 150,
            sortable: true,
            sortingOrder: Object.values(SortingType),
            hide: true,
        },
        {
            // this column used to show agent first response time
            field: INTERACTION_GRID_COLUMN.FIRST_RESPONSE_TIME,
            headerName: (_s = translate('firstResponseTime')) === null || _s === void 0 ? void 0 : _s.toUpperCase(),
            flex: adjustInteractionGridColumnFlex ? 0.7 : 0.5,
            minWidth: adjustInteractionGridColumnFlex && 150,
            sortable: true,
            sortingOrder: Object.values(SortingType),
            hide: true,
            valueGetter: (params) => {
                var _a, _b;
                const { alreadyHasValue, raw } = (_b = (_a = params === null || params === void 0 ? void 0 : params.row.sla) === null || _a === void 0 ? void 0 : _a.firstResponseTime) !== null && _b !== void 0 ? _b : {};
                return formatResponseTimer(raw, alreadyHasValue);
            },
        },
        {
            // this column used to show agent resolution/solution time
            field: INTERACTION_GRID_COLUMN.SOLUTION_TIME,
            headerName: (_t = translate('resolutionTime')) === null || _t === void 0 ? void 0 : _t.toUpperCase(),
            flex: 0.5,
            minWidth: adjustInteractionGridColumnFlex && 150,
            sortable: true,
            sortingOrder: Object.values(SortingType),
            hide: true,
            valueGetter: (params) => {
                var _a, _b;
                const { alreadyHasValue, raw } = (_b = (_a = params === null || params === void 0 ? void 0 : params.row.sla) === null || _a === void 0 ? void 0 : _a.solutionTime) !== null && _b !== void 0 ? _b : {};
                return formatResponseTimer(raw, alreadyHasValue);
            },
        },
        {
            field: INTERACTION_GRID_COLUMN.PREVIEW,
            headerName: (_u = translate('context')) === null || _u === void 0 ? void 0 : _u.toUpperCase(),
            flex: adjustInteractionGridColumnFlex ? 1 : 0.5,
            minWidth: adjustInteractionGridColumnFlex && 300,
            sortable: false,
            hide: true,
        },
        {
            field: INTERACTION_GRID_COLUMN.SEARCH_OPTION_MENU,
            headerName: '',
            flex: adjustInteractionGridColumnFlex ? 'none' : 0.2,
            width: adjustInteractionGridColumnFlex && 30,
            sortable: false,
            hide: false,
            renderHeader: () => (_jsx(CcfBox, Object.assign({ "aria-label": translate('SearchOptionMenu'), sx: visuallyHidden }, { children: translate('SearchOptionMenu') }))),
            renderCell: (params) => {
                return searchMenuOptions(params);
            },
            cellClassName: isKebabMenuPinned ? 'sticky-right-column' : '',
        }
    ];
    /**
       * Configuration for interactions tab
       */
    const interactionsConfig = {
        [SEARCH_TABS_LABEL.INTERACTIONS]: Object.assign(Object.assign({}, commonSearch), { columns: interactionColumns }),
    };
    // This useEffect will set the columns, filters and sorting order from client data api or set default settings
    useEffect(() => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        /**
         * Sets the default columns for the interactions tab.
         *
         * This function updates the columns configuration for the interactions tab
         * based on the provided column definitions. If the provided columns array
         * is not empty, it updates the interactions configuration with the new
         * column settings. After updating the configuration, it dispatches the
         * default column data.
         *
         * @param columns - The array of column definitions to set as default.
         * @example setDefaultColumns(columns)
         */
        const setDefaultColumns = (columns) => {
            if (columns === null || columns === void 0 ? void 0 : columns.length) {
                interactionsConfig[SEARCH_TABS_LABEL.INTERACTIONS].columns = setDefaultColumnConfig(interactionColumns, columns);
            }
            dispatchDefaultColumnData(interactionsConfig, activeTab, dispatch);
        };
        const clientDataLocalStorage = LocalStorageHelper.getItem(StorageKeys.CLIENT_DATA, true);
        const clientData = new CXoneClientData();
        if (clientDataLocalStorage === null || clientDataLocalStorage === void 0 ? void 0 : clientDataLocalStorage.CxaSearchAppSettings) {
            clientData.setSearchData(clientDataLocalStorage === null || clientDataLocalStorage === void 0 ? void 0 : clientDataLocalStorage.CxaSearchAppSettings);
        }
        const columnsArray = (_c = (_b = (_a = clientData.cxaSearchAppSettings) === null || _a === void 0 ? void 0 : _a.interactions) === null || _b === void 0 ? void 0 : _b.columnSettings) === null || _c === void 0 ? void 0 : _c.columns;
        //set columns visibility in redux
        if (columnsArray === null || columnsArray === void 0 ? void 0 : columnsArray.length) {
            const clientDataApiColumns = columnsArray.map((column) => ({ field: column.field, hide: column.hide }));
            setDefaultColumns(clientDataApiColumns);
        }
        // set defaultColumns if there is no data in clientDataAPI
        else {
            setDefaultColumns(defaultColumns);
        }
        const filterValues = (_f = (_e = (_d = clientData === null || clientData === void 0 ? void 0 : clientData.cxaSearchAppSettings) === null || _d === void 0 ? void 0 : _d.interactions) === null || _e === void 0 ? void 0 : _e.filterSettings) === null || _f === void 0 ? void 0 : _f.filters;
        const isFilterSelected = ((_j = (_h = (_g = clientData === null || clientData === void 0 ? void 0 : clientData.cxaSearchAppSettings) === null || _g === void 0 ? void 0 : _g.interactions) === null || _h === void 0 ? void 0 : _h.filterSettings) === null || _j === void 0 ? void 0 : _j.isFilterSelected) || false;
        // set filters in redux
        if (filterValues) {
            dispatch(ccfDigitalSearchActions.setFilterValues(filterValues));
            dispatch(ccfDigitalSearchActions.updateIsFilterSelected(isFilterSelected));
        }
        const sortingValues = (_m = (_l = (_k = clientData === null || clientData === void 0 ? void 0 : clientData.cxaSearchAppSettings) === null || _k === void 0 ? void 0 : _k.interactions) === null || _l === void 0 ? void 0 : _l.columnSettings) === null || _m === void 0 ? void 0 : _m.sorting;
        // set the sorting field and direction in redux
        if (sortingValues) {
            const sortColumn = {
                sorting: sortingValues.field,
                sortingType: sortingValues.direction,
            };
            dispatch(ccfDigitalSearchActions.updateCurrentSortColumn(sortColumn));
        }
        // calls the /contacts api to get the data
        dispatch(getCcfDigitalSearch({
            searchParams: {},
            freshData: true,
        }));
    }, []);
    const flexDirectionStyle = getFlexDirectionStyle(isSmView, renderTwoColumnDesign);
    return (_jsxs(Grid, Object.assign({ id: 'ccf-search-tab-panel-interactions', role: 'tabpanel', "aria-labelledby": 'ccf-search-tab-interactions', container: true, flexWrap: 'nowrap', flexDirection: "column", height: "100%" }, { children: [_jsxs(Grid, Object.assign({ item: true, sx: styles.gridBackground }, { children: [_jsxs(CcfBox, Object.assign({ sx: Object.assign(Object.assign({}, styles.parentContainer), { flexDirection: flexDirectionStyle, gap: 1 }) }, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.buttonsAndSearchBox }, { children: [_jsx(CcfDigitalSearchInput, {}), _jsx(CcfDigitalSearchFilterButton, {}), _jsx(CcfDigitalSearchKebabMenu, {})] })), _jsx(CcfInteractionResetAndRefreshBar, {})] })), _jsx(CcfDigitalSearchFilterContainer, { filterOptions: filterOptions, MultiSelectPaginationDropdown: CcfMultiSelectPaginationDropdown })] })), _jsx(Grid, Object.assign({ sx: styles.gridItemInContainer, item: true, flex: 1 }, { children: _jsx(CcfDigitalSearchGrid, { enableRowCursor: true, isAppSpace: props.isAppSpace }) })), _jsx(CcfDigitalSearchDraggable, {}), isCustomerCardPopupOpen && _jsx(CcfContactPreview, {})] })));
}
export default CcfSearchInteractions;
//# sourceMappingURL=ccf-search-interactions.js.map