import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { CcfBox, useTranslator, CcfTypography, FilterFieldTypes, } from '@nice-devone/ui-controls';
import { ArrowForward } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_TABS_LABEL, getActiveSearchTab, getDefaultFilterValues, ccfDigitalSearchActions, DIGITAL_SEARCH_FILTERS, getAllChannelsData, getDefaultColumns, getAgentListData, } from '../../ccf-digital-search.slice';
import { SortingType, formatDateTime, MESSAGES_GRID_COLUMN, MESSAGES_READ_STATUS, } from '@nice-devone/common-sdk';
import { getApplicationLocale } from '../../../../global.app.slice';
import { CcfDigitalSearchInput } from '../../ccf-digital-search-input/ccf-digital-search-input';
import { CcfInteractionResetAndRefreshBar } from '../../ccf-interaction-search-reset-and-refresh/ccf-interaction-search-reset-and-refresh';
import { CcfDigitalSearchGrid } from '../../ccf-digital-search-grid/ccf-digital-search-grid';
import { getAppspaceResolution } from '../../../ccf-app-space.slice';
import CcfDigitalSearchStyle from '../../ccf-digital-search-styles';
import { getFlexDirectionStyle, dispatchDefaultColumnData, setDefaultColumnConfig, DATE_FIELD, onMultiselectDropdownInputChange, convertHtmlToText, } from '../../ccf-digital-search-utility';
import CcfDigitalSearchKebabMenu from '../../ccf-digital-search-kebab-menu/ccf-digital-search-kebab-menu';
import CcfDigitalSearchFilterButton from '../../ccf-digital-search-filter-button/ccf-digital-search-filter-button';
import { getAllDigitalMessageTags, getContactDetailsForSelectedContact, getDigitalMessageTagsByName, getDigitalMessageTagsCurrentPage } from '../../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfDigitalSearchFilterContainer from '../../ccf-digital-search-filter/ccf-digital-search-filter-container';
import CcfIcon, { CHANNEL_ICON_SIZE } from '../../../../ccf-icon/ccf-icon';
import CcfMessagesTags from './ccf-messages-tags/ccf-messages-tags';
import CcfMultiSelectPaginationDropdown from '../ccf-multiselect-pagination-dropdown/ccf-multiselect-pagination-dropdown';
import { revamped_icons } from '../../../../ccf-icon/ccf-icon-list';
import { CcfDigitalSearchDraggable } from '../../ccf-digital-search-draggable/ccf-digital-search-draggable';
/**
 * CcfSearchMessages - to display search component
 * @example - `<CcfSearchMessages />`
 */
const CcfSearchMessages = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const theme = useTheme();
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const styles = CcfDigitalSearchStyle(theme);
    const renderTwoColumnDesign = useSelector(getAppspaceResolution);
    const locale = useSelector(getApplicationLocale);
    const activeTab = useSelector(getActiveSearchTab);
    const defaultColumns = useSelector(getDefaultColumns);
    const flexDirectionStyle = getFlexDirectionStyle(isSmView, renderTwoColumnDesign);
    const dropdownOption = useSelector(getDefaultFilterValues);
    const channelList = useSelector(getAllChannelsData);
    const agentList = useSelector(getAgentListData);
    //Devnote - changes for adding paginated dropdown for tags filter
    const searchedDigitalTags = useSelector(getDigitalMessageTagsByName);
    const options = useSelector(getAllDigitalMessageTags);
    const [tagsList, setTagList] = useState([]);
    const [isTagSearched, setTagSearched] = useState(false);
    const currentPageIndex = useSelector(getDigitalMessageTagsCurrentPage);
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
    /**
     * Handles the click event of a cell containing the case ID.
     * @param caseId - The case ID associated with the clicked cell.
     * @example - handleCaseIdClick('12345')
     */
    const handleCaseIdClick = (id) => {
        // Dispatches an action to preview the case based on the case ID when the case ID cell is clicked
        dispatch(getContactDetailsForSelectedContact({ contactId: id === null || id === void 0 ? void 0 : id.toString(), isAssignedToAgentInbox: false }));
    };
    /**
   * Handles the click event of a message in the grid.
   * @param params - The parameters associated with the clicked message
   * @example - handleShowMessage(params)
   */
    const handleShowMessage = (params) => {
        var _a, _b;
        // On cell click we will dispatch the action for previewing the case based on cell id
        dispatch(getContactDetailsForSelectedContact({ contactId: (_b = (_a = params === null || params === void 0 ? void 0 : params.row) === null || _a === void 0 ? void 0 : _a.contactNumber) === null || _b === void 0 ? void 0 : _b.toString(), isAssignedToAgentInbox: false }));
        dispatch(ccfDigitalSearchActions.updateSelectedMessageId(params.id));
    };
    const messageColumns = [
        {
            field: MESSAGES_GRID_COLUMN.CASE,
            headerName: (_a = translate('caseId')) === null || _a === void 0 ? void 0 : _a.toUpperCase(),
            flex: 1,
            sortable: false,
            hide: false,
            renderCell: (params) => {
                return (params === null || params === void 0 ? void 0 : params.value) ? (_jsx(CcfBox, Object.assign({ component: "span", "aria-label": params === null || params === void 0 ? void 0 : params.value, sx: Object.assign({}, styles.showCursor), onClick: () => handleCaseIdClick(params === null || params === void 0 ? void 0 : params.value), onKeyDown: (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            handleCaseIdClick(params === null || params === void 0 ? void 0 : params.value);
                            e.preventDefault();
                        }
                    } }, { children: params === null || params === void 0 ? void 0 : params.value }))) : ('');
            },
        },
        {
            field: MESSAGES_GRID_COLUMN.CREATED_AT,
            headerName: (_b = translate('createDate')) === null || _b === void 0 ? void 0 : _b.toUpperCase(),
            flex: 1,
            sortable: true,
            sortingOrder: Object.values(SortingType),
            hide: false,
            valueFormatter: (params) => {
                return formatDateTime(params === null || params === void 0 ? void 0 : params.value, locale);
            },
        },
        {
            field: MESSAGES_GRID_COLUMN.READ_AT,
            headerName: (_c = translate('readAt')) === null || _c === void 0 ? void 0 : _c.toUpperCase(),
            flex: 1,
            sortable: false,
            hide: true,
            valueFormatter: (params) => {
                return (params === null || params === void 0 ? void 0 : params.value) ? formatDateTime(params === null || params === void 0 ? void 0 : params.value, locale) : translate('notAvailable');
            },
        },
        {
            field: MESSAGES_GRID_COLUMN.IS_READ,
            headerName: (_d = translate('readStatus')) === null || _d === void 0 ? void 0 : _d.toUpperCase(),
            flex: 1,
            sortable: false,
            hide: false,
            valueGetter: (params) => {
                return (params === null || params === void 0 ? void 0 : params.value) ? MESSAGES_READ_STATUS.CHECKED : MESSAGES_READ_STATUS.NEW;
            },
        },
        {
            field: MESSAGES_GRID_COLUMN.TYPE,
            headerName: (_e = translate('type')) === null || _e === void 0 ? void 0 : _e.toUpperCase(),
            flex: 0.4,
            sortable: false,
            sortingOrder: Object.values(SortingType),
            hide: true,
            renderCell: (params) => {
                var _a, _b, _c, _d, _e, _f;
                return (_jsx(CcfIcon, { iconName: ((_a = params === null || params === void 0 ? void 0 : params.row) === null || _a === void 0 ? void 0 : _a.direction) && (revamped_icons.includes((_c = (_b = params === null || params === void 0 ? void 0 : params.row) === null || _b === void 0 ? void 0 : _b.channelType) === null || _c === void 0 ? void 0 : _c.toLowerCase())) ? ((_d = params === null || params === void 0 ? void 0 : params.row) === null || _d === void 0 ? void 0 : _d.channelType) + '_' + ((_e = params === null || params === void 0 ? void 0 : params.row) === null || _e === void 0 ? void 0 : _e.direction) : (_f = params === null || params === void 0 ? void 0 : params.row) === null || _f === void 0 ? void 0 : _f.channelType // renderCell is not called as a component but as a function like so column.renderCell({ ...cellParams, api: apiRef.current }) So it should not contain any hook.
                    , size: CHANNEL_ICON_SIZE.SMALL }));
            },
        },
        {
            field: MESSAGES_GRID_COLUMN.CHANNEL_NAME,
            headerName: (_f = translate('channel')) === null || _f === void 0 ? void 0 : _f.toUpperCase(),
            flex: 1,
            sortable: false,
            hide: false,
            valueGetter: (params) => {
                return (params === null || params === void 0 ? void 0 : params.value) ? params === null || params === void 0 ? void 0 : params.value : translate('notAvailable');
            },
        },
        {
            field: MESSAGES_GRID_COLUMN.AUTHOR_USER,
            headerName: (_g = translate('author')) === null || _g === void 0 ? void 0 : _g.toUpperCase(),
            flex: 1,
            sortable: false,
            hide: false,
            valueGetter: (params) => {
                var _a, _b, _c, _d;
                if ((_a = params === null || params === void 0 ? void 0 : params.value) === null || _a === void 0 ? void 0 : _a.fullName)
                    return (_b = params === null || params === void 0 ? void 0 : params.value) === null || _b === void 0 ? void 0 : _b.fullName;
                return (((_c = params === null || params === void 0 ? void 0 : params.value) === null || _c === void 0 ? void 0 : _c.firstName) && ((_d = params === null || params === void 0 ? void 0 : params.value) === null || _d === void 0 ? void 0 : _d.lastName));
            },
        },
        {
            field: MESSAGES_GRID_COLUMN.CONTENT,
            headerName: (_h = translate('content')) === null || _h === void 0 ? void 0 : _h.toUpperCase(),
            flex: 1,
            sortable: false,
            hide: true,
            valueGetter: (params) => {
                var _a;
                return convertHtmlToText(((_a = params === null || params === void 0 ? void 0 : params.value) === null || _a === void 0 ? void 0 : _a.text) || '');
            },
        },
        {
            field: MESSAGES_GRID_COLUMN.SHOW_MESSAGE,
            headerName: (_j = translate('showMessage')) === null || _j === void 0 ? void 0 : _j.toUpperCase(),
            flex: 1,
            sortable: false,
            hide: true,
            renderCell: (params) => {
                return (params === null || params === void 0 ? void 0 : params.value) ? (_jsxs(CcfTypography, Object.assign({ color: "primary", variant: "h4", title: "Open", "aria-label": "Open", onClick: () => handleShowMessage(params), sx: Object.assign(Object.assign({}, styles.showMessage), styles.showCursor) }, { children: [_jsx(ArrowForward, { sx: Object.assign({}, styles.showMessage.openArrow) }), " ", translate('open')] }))) : ('');
            },
        },
        {
            field: MESSAGES_GRID_COLUMN.TAGS,
            headerName: (_k = translate('searchTag')) === null || _k === void 0 ? void 0 : _k.toUpperCase(),
            flex: 1.5,
            sortable: false,
            hide: true,
            renderCell: (params) => {
                return (params === null || params === void 0 ? void 0 : params.value) ? _jsx(CcfMessagesTags, { tagsList: params.value }) : '';
            },
        },
        {
            field: MESSAGES_GRID_COLUMN.ATTACHMENTS,
            headerName: (_l = translate('attachments')) === null || _l === void 0 ? void 0 : _l.toUpperCase(),
            flex: 1,
            sortable: false,
            hide: true,
            renderCell: (params) => {
                var _a;
                return ((_a = params === null || params === void 0 ? void 0 : params.value) === null || _a === void 0 ? void 0 : _a.length) > 0 ? (_jsxs(CcfTypography, Object.assign({ color: "primary", variant: "h4", title: "ATTACHMENTS", "aria-label": "ATTACHMENTS", sx: Object.assign({}, styles.showMessage) }, { children: [_jsx(ArrowForward, { sx: Object.assign({}, styles.showMessage.openArrow) }), " ", translate('attachments')] }))) : ('');
            },
        },
        {
            field: MESSAGES_GRID_COLUMN.SEARCH_OPTION_MENU,
            headerName: '',
            flex: 0.2,
            sortable: false,
            hide: true,
            renderHeader: () => (_jsx(CcfBox, Object.assign({ "aria-label": translate('SearchOptionMenu'), sx: visuallyHidden }, { children: translate('SearchOptionMenu') }))),
        }
    ];
    const messagesConfig = {
        [SEARCH_TABS_LABEL.MESSAGES]: {
            columns: messageColumns,
        },
    };
    useEffect(() => {
        if (defaultColumns === null || defaultColumns === void 0 ? void 0 : defaultColumns.length) {
            messagesConfig[SEARCH_TABS_LABEL.MESSAGES].columns = setDefaultColumnConfig(messageColumns, defaultColumns);
        }
        dispatchDefaultColumnData(messagesConfig, activeTab, dispatch);
    }, []);
    useEffect(() => {
        setTagList(isTagSearched ? searchedTagsFilterOptions : tagsFilterOptions);
    }, [isTagSearched, currentPageIndex, searchedDigitalTags]);
    /**
     * method to search message tag by text on providing the input from input box
     * @param _event - event details
     * @param value - value typed in the input box
     * @example onInputChange(_event,value)
     */
    const onInputChange = (_event, value) => {
        onMultiselectDropdownInputChange(setTagSearched, value, dispatch);
    };
    /** Function to select item from dropdown and update their values in redux according to field name
   * @param filterValues - filter details to be updated in store
   * @param fieldName - according to fieldName we are updating the values in redux
  * @example onMenuItemClick(filterDetails, fieldName)
  */
    const onMenuItemClickHandler = (filterValues, fieldName) => {
        dispatch(ccfDigitalSearchActions.updateFilterValues({ fieldName, filterValues }));
    };
    const filterOptions = [
        {
            label: (_m = translate('channel')) === null || _m === void 0 ? void 0 : _m.toUpperCase(),
            options: channelList,
            fieldValue: dropdownOption.channel,
            onMenuItemClick: onMenuItemClickHandler,
            fieldName: DIGITAL_SEARCH_FILTERS.CHANNEL,
            isMultipleSelectionAllowed: true,
            type: FilterFieldTypes.DROPDOWN,
        },
        {
            label: (_o = translate('searchTag')) === null || _o === void 0 ? void 0 : _o.toUpperCase(),
            options: tagsList,
            fieldValue: dropdownOption.tag,
            onMenuItemClick: onMenuItemClickHandler,
            fieldName: DIGITAL_SEARCH_FILTERS.TAG,
            isMultipleSelectionAllowed: true,
            type: FilterFieldTypes.DROPDOWN,
            onInputChange: onInputChange,
            isPaginationSupported: true,
        },
        {
            label: (_p = translate('readStatus')) === null || _p === void 0 ? void 0 : _p.toUpperCase(),
            options: (_q = Object.entries(MESSAGES_READ_STATUS)) === null || _q === void 0 ? void 0 : _q.map((status) => {
                return {
                    id: status[1] === MESSAGES_READ_STATUS.CHECKED ? 'true' : 'false',
                    name: status[1],
                };
            }),
            fieldValue: dropdownOption.isRead,
            onMenuItemClick: onMenuItemClickHandler,
            fieldName: DIGITAL_SEARCH_FILTERS.IS_READ,
            isMultipleSelectionAllowed: true,
            type: FilterFieldTypes.DROPDOWN,
        },
        {
            label: translate('agents').toUpperCase(),
            options: agentList,
            fieldValue: dropdownOption.agent,
            onMenuItemClick: onMenuItemClickHandler,
            fieldName: DIGITAL_SEARCH_FILTERS.AGENT,
            isMultipleSelectionAllowed: true,
            type: FilterFieldTypes.DROPDOWN,
        },
        {
            label: (_r = translate('createDateRange')) === null || _r === void 0 ? void 0 : _r.toUpperCase(),
            fieldName: DATE_FIELD,
            type: FilterFieldTypes.DATE_PICKER,
            renderCustomField: () => (_jsxs("fieldset", { children: [_jsx("legend", { children: translate('createDateRange') }), _jsxs("div", { children: [_jsx("label", Object.assign({ htmlFor: "start-date" }, { children: translate('startDate') })), _jsx("input", { id: "start-date", type: "text", placeholder: "MM/DD/YYYY", "aria-label": translate('startDate') })] }), _jsxs("div", { children: [_jsx("label", Object.assign({ htmlFor: "end-date" }, { children: translate('endDate') })), _jsx("input", { id: "end-date", type: "text", placeholder: "MM/DD/YYYY", "aria-label": translate('endDate') })] })] })),
        }
    ];
    return (_jsxs(Grid, Object.assign({ id: 'ccf-search-tab-panel-messages', role: 'tabpanel', "aria-labelledby": 'ccf-search-tab-messages', container: true, flexDirection: "column", height: "100%", flexWrap: 'nowrap' }, { children: [_jsxs(Grid, Object.assign({ item: true, sx: styles.gridBackground }, { children: [_jsxs(CcfBox, Object.assign({ sx: Object.assign(Object.assign({}, styles.parentContainer), { flexDirection: flexDirectionStyle, gap: 1 }) }, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.buttonsAndSearchBox }, { children: [_jsx(CcfDigitalSearchInput, {}), _jsx(CcfDigitalSearchFilterButton, {}), _jsx(CcfDigitalSearchKebabMenu, {})] })), _jsx(CcfInteractionResetAndRefreshBar, {})] })), _jsx(CcfDigitalSearchFilterContainer, { filterOptions: filterOptions, MultiSelectPaginationDropdown: CcfMultiSelectPaginationDropdown })] })), _jsx(Grid, Object.assign({ sx: styles.gridItemInContainer, item: true, flex: 1 }, { children: _jsx(CcfDigitalSearchGrid, { isCheckboxSelectable: false }) })), _jsx(CcfDigitalSearchDraggable, {})] })));
};
export default CcfSearchMessages;
//# sourceMappingURL=ccf-search-messages.js.map