import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid, Typography, useMediaQuery, useTheme, } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { CcfBox, useTranslator, CcfTypography, FilterFieldTypes, } from '@nice-devone/ui-controls';
import { useEffect } from 'react';
import { SEARCH_TABS_LABEL, getDefaultColumns, getCcfDigitalSearch, DIGITAL_SEARCH, ccfDigitalSearchActions, DIGITAL_SEARCH_FILTERS, getAllChannelsData, getDefaultFilterValues, getActiveSearchTab, getAllowedSearchTabs, } from '../../ccf-digital-search.slice';
import { SortingType, formatDateTime, THREADS_GRID_COLUMN, EventKeys, } from '@nice-devone/common-sdk';
import { CcfDigitalSearchGrid } from '../../ccf-digital-search-grid/ccf-digital-search-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getAppspaceResolution } from '../../../ccf-app-space.slice';
import CcfDigitalSearchStyle from '../../ccf-digital-search-styles';
import { CcfInteractionResetAndRefreshBar } from '../../ccf-interaction-search-reset-and-refresh/ccf-interaction-search-reset-and-refresh';
import { getApplicationLocale } from '../../../../global.app.slice';
import { getFlexDirectionStyle, dispatchDefaultColumnData, setDefaultColumnConfig, DATE_FIELD, convertHtmlToText, } from '../../ccf-digital-search-utility';
import CcfDigitalSearchFilterButton from '../../ccf-digital-search-filter-button/ccf-digital-search-filter-button';
import CcfDigitalSearchKebabMenu from '../../ccf-digital-search-kebab-menu/ccf-digital-search-kebab-menu';
import { ArrowForward } from '@mui/icons-material';
import { LocalStorageHelper } from '@nice-devone/core-sdk';
import CcfDigitalSearchFilterContainer from '../../ccf-digital-search-filter/ccf-digital-search-filter-container';
import { CcfDigitalSearchDraggable } from '../../ccf-digital-search-draggable/ccf-digital-search-draggable';
/**
   * CcfSearchThreads - to display threads tab component
   * @example - `<CcfSearchThreads />`
   */
export function CcfSearchThreads() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const theme = useTheme();
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const renderTwoColumnDesign = useSelector(getAppspaceResolution);
    const styles = CcfDigitalSearchStyle(theme);
    const locale = useSelector(getApplicationLocale);
    const activeTab = useSelector(getActiveSearchTab);
    const allowedTabs = useSelector(getAllowedSearchTabs);
    /**
     * renderMessageOrInteractionColumn - used to the open link with on click method for messages or interaction colum
     * @param column - string representing the value of current column
     * @param displayEllipsis - boolean should display ellipsis or not
     * @param idOnExternalPlatform - string representing the value of idOnExternalPlatform that needs to be passed as part of query
     * @example renderMessageOrInteractionColumn(column, displayEllipsis, idOnExternalPlatform)
     */
    const renderMessageOrInteractionColumn = (column, displayEllipsis, idOnExternalPlatform) => {
        var _a, _b, _c;
        return (_jsxs(CcfTypography, Object.assign({ variant: "h4", title: "Open", role: 'link', "aria-label": `${translate('open')} ${(column === SEARCH_TABS_LABEL.INTERACTIONS) ? translate('interaction') : translate('message')}`, onClick: () => { onContactOrMessageClickHandler((column === SEARCH_TABS_LABEL.INTERACTIONS) ? SEARCH_TABS_LABEL.INTERACTIONS : SEARCH_TABS_LABEL.MESSAGES, idOnExternalPlatform); }, sx: Object.assign(Object.assign(Object.assign({}, styles.showMessage), styles.showCursor), { color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.socialReaction }), tabIndex: 0, onKeyDown: (event) => {
                if ((event === null || event === void 0 ? void 0 : event.key) === EventKeys.ENTER || (event === null || event === void 0 ? void 0 : event.key) === EventKeys.SPACE) {
                    onContactOrMessageClickHandler((column === SEARCH_TABS_LABEL.INTERACTIONS) ? SEARCH_TABS_LABEL.INTERACTIONS : SEARCH_TABS_LABEL.MESSAGES, idOnExternalPlatform);
                }
            } }, { children: [_jsx(ArrowForward, { sx: (_c = styles === null || styles === void 0 ? void 0 : styles.showMessage) === null || _c === void 0 ? void 0 : _c.openArrow }), " ", (displayEllipsis) ? _jsx(Typography, Object.assign({ sx: styles === null || styles === void 0 ? void 0 : styles.textWithEllipsis }, { children: translate('open') })) : _jsx(Typography, { children: translate('open') })] })));
    };
    /**
     * onContactOrMessageClickHandler - used to change active tab and query value when user clicks on contacts or messages column.
     * @param column - string representing the value of current column
     * @param idOnExternalPlatform - string representing the value of idOnExternalPlatform that needs to be passed as part of query
     * @example onContactOrMessageClickHandler(column,idOnExternalPlatform)
     */
    const onContactOrMessageClickHandler = (column, idOnExternalPlatform) => {
        // check for permitted tabs
        if (allowedTabs.includes(column)) {
            const searchText = `threadIdOnExternalPlatform=${idOnExternalPlatform}`;
            dispatch(ccfDigitalSearchActions.updateActiveSearchTab(column));
            dispatch(ccfDigitalSearchActions.updateSearchText(searchText));
            //storing the query as search text in local storage for respective tab(interactions or messages tab)
            const digitalSearchLS = LocalStorageHelper.getItem(DIGITAL_SEARCH, true);
            LocalStorageHelper.setItem(DIGITAL_SEARCH, Object.assign(Object.assign({}, digitalSearchLS), { [column]: Object.assign(Object.assign({}, digitalSearchLS[column]), { searchText }) }));
            getCcfDigitalSearch({ searchParams: { query: searchText }, freshData: true });
        }
        else {
            // as redirection to selected tab is not permitted, show error toast.
            const digitalSearchErrorToast = {
                isError: true,
                messageKey: 'permissionHelpPhrase',
                placeHolder: 'permissionDenied',
            };
            dispatch(ccfDigitalSearchActions.updateDigitalSearchToastObj(digitalSearchErrorToast));
        }
    };
    const defaultColumns = useSelector(getDefaultColumns);
    const channelList = useSelector(getAllChannelsData);
    const dropdownOption = useSelector(getDefaultFilterValues);
    const threadColumns = [
        {
            field: THREADS_GRID_COLUMN.CREATED_AT,
            headerName: (_a = translate('createDate')) === null || _a === void 0 ? void 0 : _a.toUpperCase(),
            flex: 0.75,
            sortable: false,
            sortingOrder: Object.values(SortingType),
            hide: false,
            valueFormatter: (params) => {
                return formatDateTime(params === null || params === void 0 ? void 0 : params.value, locale);
            },
        },
        {
            field: THREADS_GRID_COLUMN.CHANNEL_NAME,
            headerName: (_b = translate('channel')) === null || _b === void 0 ? void 0 : _b.toUpperCase(),
            flex: 1,
            sortable: false,
            hide: false,
        },
        {
            field: THREADS_GRID_COLUMN.CUSTOMER_NAME,
            headerName: (_c = translate('customerName')) === null || _c === void 0 ? void 0 : _c.toUpperCase(),
            flex: 1,
            sortable: false,
            hide: false,
            valueGetter: (params) => {
                var _a, _b;
                return ((_b = (_a = params === null || params === void 0 ? void 0 : params.row) === null || _a === void 0 ? void 0 : _a.authorEndUserIdentity) === null || _b === void 0 ? void 0 : _b.fullName) || '';
            },
        },
        {
            field: THREADS_GRID_COLUMN.CONTEXT,
            headerName: (_d = translate('context')) === null || _d === void 0 ? void 0 : _d.toUpperCase(),
            flex: 1,
            sortable: false,
            hide: true,
            valueGetter: (params) => {
                var _a, _b;
                return convertHtmlToText(((_b = (_a = params === null || params === void 0 ? void 0 : params.row) === null || _a === void 0 ? void 0 : _a.messageContent) === null || _b === void 0 ? void 0 : _b.text) || '');
            },
        },
        {
            field: THREADS_GRID_COLUMN.ID_ON_EXTERNAL_PLATFORM,
            headerName: (_e = translate('idOnExternalPlatform')) === null || _e === void 0 ? void 0 : _e.toUpperCase(),
            flex: 1,
            sortable: false,
            hide: true,
        },
        {
            field: THREADS_GRID_COLUMN.CONTACTS,
            headerName: (_f = translate('interactions')) === null || _f === void 0 ? void 0 : _f.toUpperCase(),
            flex: 0.5,
            sortable: false,
            hide: false,
            renderCell: (params) => {
                var _a, _b;
                return renderMessageOrInteractionColumn(SEARCH_TABS_LABEL.INTERACTIONS, (((_a = params === null || params === void 0 ? void 0 : params.colDef) === null || _a === void 0 ? void 0 : _a.computedWidth) < 90), (_b = params === null || params === void 0 ? void 0 : params.row) === null || _b === void 0 ? void 0 : _b.threadIdOnExternalPlatform);
            },
        },
        {
            field: THREADS_GRID_COLUMN.MESSAGES,
            headerName: (_g = translate('messages')) === null || _g === void 0 ? void 0 : _g.toUpperCase(),
            flex: 0.5,
            sortable: false,
            hide: false,
            renderCell: (params) => {
                var _a, _b;
                return renderMessageOrInteractionColumn(SEARCH_TABS_LABEL.MESSAGES, (((_a = params === null || params === void 0 ? void 0 : params.colDef) === null || _a === void 0 ? void 0 : _a.computedWidth) < 90), (_b = params === null || params === void 0 ? void 0 : params.row) === null || _b === void 0 ? void 0 : _b.threadIdOnExternalPlatform);
            },
        },
        {
            field: THREADS_GRID_COLUMN.SEARCH_OPTION_MENU,
            headerName: '',
            flex: 0.2,
            sortable: false,
            hide: true,
            renderHeader: () => (_jsx(CcfBox, Object.assign({ "aria-label": translate('SearchOptionMenu'), sx: visuallyHidden }, { children: translate('SearchOptionMenu') }))),
        }
    ];
    const flexDirectionStyle = getFlexDirectionStyle(isSmView, renderTwoColumnDesign);
    /**
       * Configuration for threads tab
       */
    const threadsConfig = {
        [SEARCH_TABS_LABEL.THREADS]: {
            columns: threadColumns,
        },
    };
    useEffect(() => {
        if (defaultColumns === null || defaultColumns === void 0 ? void 0 : defaultColumns.length) {
            threadsConfig[SEARCH_TABS_LABEL.THREADS].columns = setDefaultColumnConfig(threadColumns, defaultColumns);
        }
        dispatchDefaultColumnData(threadsConfig, activeTab, dispatch);
    }, []);
    /** function to select item from dropdown and update their values in redux according to fieldname
   * @param filterValues - filter data to be updated in redux store
   * @param fieldName - according to fieldName we are updating the values in redux
  * @example onMenuItemClick(selectedFilterData, fieldName)
  */
    const onMenuItemClickHandler = (filterValues, fieldName) => {
        dispatch(ccfDigitalSearchActions.updateFilterValues({ fieldName, filterValues }));
    };
    const filterOptions = [
        {
            label: (_h = translate('channel')) === null || _h === void 0 ? void 0 : _h.toUpperCase(),
            options: channelList,
            fieldValue: dropdownOption.channel,
            onMenuItemClick: onMenuItemClickHandler,
            fieldName: DIGITAL_SEARCH_FILTERS.CHANNEL,
            isMultipleSelectionAllowed: true,
            type: FilterFieldTypes.DROPDOWN,
        },
        {
            label: (_j = translate('createDateRange')) === null || _j === void 0 ? void 0 : _j.toUpperCase(),
            fieldName: DATE_FIELD,
            type: FilterFieldTypes.DATE_PICKER,
        }
    ];
    return (_jsxs(Grid, Object.assign({ id: 'ccf-search-tab-panel-threads', role: 'tabpanel', "aria-labelledby": 'ccf-search-tab-threads', container: true, flexDirection: "column", height: "100%", flexWrap: 'nowrap' }, { children: [_jsxs(Grid, Object.assign({ item: true, sx: styles.gridBackground }, { children: [_jsxs(CcfBox, Object.assign({ sx: Object.assign(Object.assign({}, styles.parentContainer), { flexDirection: flexDirectionStyle, gap: 1 }) }, { children: [_jsxs(CcfBox, Object.assign({ sx: Object.assign(Object.assign({}, styles.buttonsAndSearchBox), styles.filterCustomizeButton) }, { children: [_jsx(CcfDigitalSearchKebabMenu, {}), _jsx(CcfDigitalSearchFilterButton, {})] })), _jsx(CcfInteractionResetAndRefreshBar, {})] })), _jsx(CcfDigitalSearchFilterContainer, { filterOptions: filterOptions, anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                        }, transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                        } })] })), _jsx(Grid, Object.assign({ sx: styles.gridItemInContainer, item: true, flex: 1 }, { children: _jsx(CcfDigitalSearchGrid, { isCheckboxSelectable: false }) })), _jsx(CcfDigitalSearchDraggable, {})] })));
}
export default CcfSearchThreads;
//# sourceMappingURL=ccf-search-threads.js.map