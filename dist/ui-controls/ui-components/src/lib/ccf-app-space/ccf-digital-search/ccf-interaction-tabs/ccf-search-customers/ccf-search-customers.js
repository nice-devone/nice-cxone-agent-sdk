import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { CcfBox, useTranslator, FilterFieldTypes, } from '@nice-devone/ui-controls';
import { useDispatch, useSelector } from 'react-redux';
import { ccfDigitalSearchActions, getcurrentCustomerContactInfo, SEARCH_TABS_LABEL, getActiveSearchTab, DIGITAL_SEARCH_FILTERS, getDefaultFilterValues, getDefaultColumns, } from '../../ccf-digital-search.slice';
import { SortingType, formatDateTime, CUSTOMERS_GRID_COLUMN, } from '@nice-devone/common-sdk';
import { visuallyHidden } from '@mui/utils';
import CcfContactPreview from '../../ccf-interaction-contact-info';
import { CcfDigitalSearchInput } from '../../ccf-digital-search-input/ccf-digital-search-input';
import { CcfInteractionResetAndRefreshBar } from '../../ccf-interaction-search-reset-and-refresh/ccf-interaction-search-reset-and-refresh';
import { CcfDigitalSearchGrid } from '../../ccf-digital-search-grid/ccf-digital-search-grid';
import { getAppspaceResolution } from '../../../ccf-app-space.slice';
import { getApplicationLocale } from '../../../../global.app.slice';
import CcfDigitalSearchStyle from '../../ccf-digital-search-styles';
import { getFlexDirectionStyle, getSearchVisibleColumns, defaultSearchColumnsCount, dispatchDefaultColumnData, getStringWidth, setDefaultColumnConfig, } from '../../ccf-digital-search-utility';
import CcfDigitalSearchKebabMenu from '../../ccf-digital-search-kebab-menu/ccf-digital-search-kebab-menu';
import CcfDigitalSearchFilterButton from '../../ccf-digital-search-filter-button/ccf-digital-search-filter-button';
import CcfDigitalSearchFilterContainer from '../../ccf-digital-search-filter/ccf-digital-search-filter-container';
import { CcfDigitalSearchDraggable } from '../../ccf-digital-search-draggable/ccf-digital-search-draggable';
/**
 * CcfSearchCustomers - to display search component for customers
 * @example - `<CcfSearchCustomers />`
 */
export function CcfSearchCustomers() {
    var _a, _b, _c, _d, _e;
    const theme = useTheme();
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const styles = CcfDigitalSearchStyle(theme);
    // Todo: use below two vars when agent filter is supported
    //const agentList = useSelector(getAgentListData) as dropdownMenuOptions[];
    const dropdownOption = useSelector(getDefaultFilterValues);
    const renderTwoColumnDesign = useSelector(getAppspaceResolution);
    const locale = useSelector(getApplicationLocale);
    const isCustomerCardPopupOpen = (_a = useSelector(getcurrentCustomerContactInfo)) === null || _a === void 0 ? void 0 : _a.isCustomerCardPopupOpen;
    const activeTab = useSelector(getActiveSearchTab);
    const defaultColumns = useSelector(getDefaultColumns);
    useEffect(() => {
        dispatch(ccfDigitalSearchActions.updateNumberOfVisibleColumns(getSearchVisibleColumns(isSmView, renderTwoColumnDesign, defaultSearchColumnsCount, SEARCH_TABS_LABEL.CUSTOMERS)));
    }, [renderTwoColumnDesign, isSmView]);
    const flexDirectionStyle = getFlexDirectionStyle(isSmView, renderTwoColumnDesign);
    /**
    * function to select item from dropdown and update their values in redux according to fieldname
    * @param data - to be updated in redux store
    * @param fieldName - according to fieldName we are updating the values in redux
    * @example onMenuItemClick(filterOptions, fieldName)
    */
    const onMenuItemClickHandler = (filterOptions, fieldName) => {
        dispatch(ccfDigitalSearchActions.updateFilterValues({ fieldName, filterValues: filterOptions }));
    };
    /**
     *
     * @param gridRowParams - row data from grid
     * @example customerDetailsWithImage(gridRowParams)
     * @returns Component for customer name with image
     */
    const customerDetailsWithImage = (gridRowParams) => {
        var _a, _b, _c, _d, _e, _f;
        const cellValue = `${(_a = gridRowParams === null || gridRowParams === void 0 ? void 0 : gridRowParams.row) === null || _a === void 0 ? void 0 : _a.firstName} ${(_b = gridRowParams === null || gridRowParams === void 0 ? void 0 : gridRowParams.row) === null || _b === void 0 ? void 0 : _b.surname}`;
        return (_jsxs(Box, Object.assign({ sx: styles.customerBox, title: cellValue }, { children: [_jsx(Box, { component: 'img', src: (_c = gridRowParams === null || gridRowParams === void 0 ? void 0 : gridRowParams.row) === null || _c === void 0 ? void 0 : _c.image, sx: styles.customerIcon, alt: '' }), (((_d = gridRowParams === null || gridRowParams === void 0 ? void 0 : gridRowParams.colDef) === null || _d === void 0 ? void 0 : _d.computedWidth) < getStringWidth(cellValue)) ? _jsx(Typography, Object.assign({ sx: styles.textWithEllipsis }, { children: cellValue })) : _jsx(Typography, { children: `${(_e = gridRowParams === null || gridRowParams === void 0 ? void 0 : gridRowParams.row) === null || _e === void 0 ? void 0 : _e.firstName} ${(_f = gridRowParams === null || gridRowParams === void 0 ? void 0 : gridRowParams.row) === null || _f === void 0 ? void 0 : _f.surname}` })] })));
    };
    const filterOptions = [
        {
            label: translate('hasNote'),
            type: FilterFieldTypes.CHECKBOX,
            onMenuItemClick: onMenuItemClickHandler,
            fieldName: DIGITAL_SEARCH_FILTERS.HAS_NOTE,
            fieldValue: dropdownOption.hasNote,
        }
        //ToDo: Add once DE supports cxone Agent Id in filter
        // {
        //   label: translate('inboxAssignee').toUpperCase(),
        //   options: agentList,
        //   fieldValue: dropdownOption.inboxAssigneeAgentId,
        //   onMenuItemClick: onMenuItemClickHandler,
        //   fieldName: DIGITAL_SEARCH_FILTERS.INBOX_ASSIGNEE,
        //   isMultipleSelectionAllowed: true,
        //   type: FilterFieldTypes.DROPDOWN,
        // }
    ];
    const customersTabColumns = [
        {
            field: CUSTOMERS_GRID_COLUMN.CUSTOMER_NAME,
            headerName: (_b = translate('customerName')) === null || _b === void 0 ? void 0 : _b.toUpperCase(),
            flex: 1,
            sortable: true,
            sortingOrder: Object.values(SortingType),
            hide: false,
            renderCell: (gridRowParams) => {
                return (customerDetailsWithImage(gridRowParams));
            },
        },
        {
            field: CUSTOMERS_GRID_COLUMN.LAST_ACTIVITY,
            headerName: (_c = translate('lastActivity')) === null || _c === void 0 ? void 0 : _c.toUpperCase(),
            flex: 1,
            sortable: true,
            sortingOrder: Object.values(SortingType),
            hide: false,
            valueFormatter: (params) => {
                return (params === null || params === void 0 ? void 0 : params.value) ? formatDateTime(params === null || params === void 0 ? void 0 : params.value, locale) : translate('notAvailable');
            },
        },
        {
            field: CUSTOMERS_GRID_COLUMN.INBOUND,
            headerName: (_d = translate('inbound')) === null || _d === void 0 ? void 0 : _d.toUpperCase(),
            flex: 0.5,
            sortable: true,
            sortingOrder: Object.values(SortingType),
            hide: false,
            valueGetter: (params) => { var _a, _b; return (_b = (_a = params === null || params === void 0 ? void 0 : params.row) === null || _a === void 0 ? void 0 : _a.messageStatistics) === null || _b === void 0 ? void 0 : _b.inbound; },
        },
        {
            field: CUSTOMERS_GRID_COLUMN.OUTBOUND,
            headerName: (_e = translate('outbound')) === null || _e === void 0 ? void 0 : _e.toUpperCase(),
            flex: 0.5,
            sortable: true,
            sortingOrder: Object.values(SortingType),
            hide: false,
            valueGetter: (params) => { var _a, _b; return (_b = (_a = params === null || params === void 0 ? void 0 : params.row) === null || _a === void 0 ? void 0 : _a.messageStatistics) === null || _b === void 0 ? void 0 : _b.outbound; },
        },
        {
            field: CUSTOMERS_GRID_COLUMN.SEARCH_OPTION_MENU,
            headerName: '',
            flex: 0.2,
            sortable: false,
            hide: true,
            renderHeader: () => (_jsx(CcfBox, Object.assign({ "aria-label": translate('SearchOptionMenu'), sx: visuallyHidden }, { children: translate('SearchOptionMenu') }))),
        }
    ];
    /**
       * Configuration for customers tab
       */
    const customersConfig = {
        [SEARCH_TABS_LABEL.CUSTOMERS]: {
            columns: customersTabColumns,
        },
    };
    useEffect(() => {
        if (defaultColumns === null || defaultColumns === void 0 ? void 0 : defaultColumns.length) {
            customersConfig[SEARCH_TABS_LABEL.CUSTOMERS].columns = setDefaultColumnConfig(customersTabColumns, defaultColumns);
        }
        dispatchDefaultColumnData(customersConfig, activeTab, dispatch);
    }, []);
    const isSmallView = getSearchVisibleColumns(isSmView, renderTwoColumnDesign, defaultSearchColumnsCount) === defaultSearchColumnsCount.SMALL;
    return (_jsxs(Grid, Object.assign({ id: 'ccf-search-tab-panel-customers', role: 'tabpanel', "aria-labelledby": 'ccf-search-tab-customers', container: true, flexWrap: 'nowrap', flexDirection: "column", height: "100%" }, { children: [_jsxs(Grid, Object.assign({ item: true, sx: styles.gridBackground }, { children: [_jsxs(CcfBox, Object.assign({ sx: Object.assign(Object.assign({}, styles.parentContainer), { flexDirection: flexDirectionStyle, gap: 1 }) }, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.buttonsAndSearchBox }, { children: [_jsx(CcfDigitalSearchInput, {}), _jsx(CcfDigitalSearchFilterButton, {}), isSmallView && _jsx(CcfDigitalSearchKebabMenu, {})] })), _jsx(CcfInteractionResetAndRefreshBar, {})] })), _jsx(CcfDigitalSearchFilterContainer, { filterOptions: filterOptions })] })), _jsx(Grid, Object.assign({ sx: styles.gridItemInContainer, item: true, flex: 1 }, { children: _jsx(CcfDigitalSearchGrid, { isCheckboxSelectable: false, enableRowCursor: true }) })), _jsx(CcfDigitalSearchDraggable, {}), isCustomerCardPopupOpen && _jsx(CcfContactPreview, {})] })));
}
;
export default CcfSearchCustomers;
//# sourceMappingURL=ccf-search-customers.js.map