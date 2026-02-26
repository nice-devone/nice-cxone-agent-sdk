import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
import { CcfGrid, useTranslator, CustomNoResultComponent } from '@nice-devone/ui-controls';
import { getDefaultColumns, getGridData, getCcfDigitalSearch, getIsLoading, getLastScrollToken, getTotalRecords, ccfDigitalSearchActions, getCurrentSortColumn, getSelectedRowContacts, getNumberOfVisibleColumns, getIsGridReset, sortColumnMapping, getGridColumnData, DIGITAL_SEARCH, SEARCH_TABS_LABEL, getActiveSearchTab, getPageLinks, getSelectedContactStatus, updateClientDataWithSearchAppSettings, INTERACTION_GRID_COLUMN, } from '../ccf-digital-search.slice';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme, Box } from '@mui/material';
import { setAppspaceResolution } from '../../ccf-app-space.slice';
import CcfDigitalSearchGridStyle from './ccf-digital-search-grid-styles';
import { SortingType } from '@nice-devone/common-sdk';
import { LocalStorageHelper } from '@nice-devone/core-sdk';
import { CcfDigitalSearchToggleButtons } from './ccf-interaction-search-select-option/ccf-digital-search-toggle-buttons';
import useComponentDidUpdate from '../../../../hooks/useComponentDidUpdate';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { getContactDetailsForSelectedContact } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { globalActions } from '../../../global.app.slice';
dayjs.extend(duration); //Extend the dayjs with duration 
const PAGE_SIZE = 25;
export const MAX_ROW_SELECTION_ALLOWED = 5;
export var CcfInteractionSearchMenuAction;
(function (CcfInteractionSearchMenuAction) {
    CcfInteractionSearchMenuAction[CcfInteractionSearchMenuAction["viewDetails"] = 0] = "viewDetails";
    CcfInteractionSearchMenuAction[CcfInteractionSearchMenuAction["contactInfo"] = 1] = "contactInfo";
    CcfInteractionSearchMenuAction[CcfInteractionSearchMenuAction["assigntoMe"] = 2] = "assigntoMe";
})(CcfInteractionSearchMenuAction || (CcfInteractionSearchMenuAction = {}));
/**
 * Component to show the Data Grid for the interaction search data
 * @example
 * ```
 * <CcfInteractionSearchGrid />
 * ```
 */
export const CcfDigitalSearchGrid = ({ isCheckboxSelectable = true, enableRowCursor = false, isAppSpace }) => {
    var _a;
    const theme = useTheme();
    const defaultColumns = useSelector(getDefaultColumns);
    const gridData = useSelector(getGridData);
    const totalRecords = useSelector(getTotalRecords);
    const isLoading = useSelector(getIsLoading);
    const lastScrollToken = useSelector(getLastScrollToken);
    const currentSortColumn = useSelector(getCurrentSortColumn);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0); // to have the current page of the Data grid
    const [gridRows, setGridRows] = useState([]); // to have the row data based on which page the grid is
    const selections = useSelector(getSelectedRowContacts);
    const isRefresh = useRef(false); // this is used to reload the grid when the sorting order is changed
    const lastVisitedUpto = useRef(0); // to have farthest last visited page of the grid while navigating to grid pages
    const [translate] = useTranslator();
    const numberOfVisibleColumns = useSelector(getNumberOfVisibleColumns);
    const isGridReset = useSelector(getIsGridReset);
    const columns = useSelector(getGridColumnData);
    const activeTab = useSelector(getActiveSearchTab);
    const pageLinks = useSelector(getPageLinks);
    const selectedContactsData = useSelector(getSelectedContactStatus);
    /**
     * Returns the localized ARIA label for the provided sorting type.
     * @param sortingType - current sorting direction
     * @returns localized label for sort icon
     * @example getSortIconAria(SortingType.ASCENDING)
     */
    const getSortIconAria = (sortingType) => {
        if (sortingType === SortingType.ASCENDING) {
            return translate('ascendingSort');
        }
        else if (sortingType === SortingType.DESCENDING) {
            return translate('descendingSort');
        }
        return translate('sort');
    };
    const sortIconAria = getSortIconAria(currentSortColumn === null || currentSortColumn === void 0 ? void 0 : currentSortColumn.sortingType);
    const isInteractionTabActive = activeTab === SEARCH_TABS_LABEL.INTERACTIONS;
    const isKebabMenuPinned = isInteractionTabActive;
    const CcfDigitalSearchGridStyleOptions = {
        theme: theme,
        selections: selections,
        isLoading: isLoading,
        maximumRowSelection: translate('maximumRowSelection'),
        enableRowCursor: enableRowCursor,
        isKebabMenuPinned: isKebabMenuPinned,
    };
    const styles = CcfDigitalSearchGridStyle(CcfDigitalSearchGridStyleOptions);
    const searchTabLabelId = (_a = `ccf-search-tab-${activeTab}`) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    // Sort button labels for the data grid
    const sortButtonLabels = {
        columnHeaderSortIconLabel: sortIconAria,
        columnMenuSortAsc: translate('ascendingSort'),
        columnMenuSortDesc: translate('descendingSort'),
        columnMenuUnsort: translate('sort'),
    };
    /**
   * function to map order and visiblity of columns from localstorage to redux store
   * @example mapDefaultColumnsFromLS()
   */
    const mapDefaultColumnsFromLS = () => {
        var _a;
        const digitalSearchLS = LocalStorageHelper.getItem(DIGITAL_SEARCH, true);
        if (!((_a = digitalSearchLS[activeTab]) === null || _a === void 0 ? void 0 : _a.defaultColumns)) {
            return;
        }
        const defaultColumnsLS = digitalSearchLS[activeTab].defaultColumns;
        const newDefaultColumns = [];
        defaultColumnsLS.forEach((column) => {
            const requiredColumn = columns.find((col) => col.field === column.field);
            const columnClone = Object.assign({}, requiredColumn);
            if (columnClone) {
                columnClone.hide = column.hide;
                newDefaultColumns.push(columnClone);
            }
        });
        return newDefaultColumns;
    };
    /**
     * function to add search option menu column in the end visible columns
     * @param columns - list of columns
     * @example addSearchOptionMenuColumn([])
     */
    const addSearchOptionMenuColumn = (columns) => {
        const index = columns.findIndex((column) => !column.headerName);
        const searchMenuColumn = Object.assign({}, columns.splice(index, 1)[0]);
        searchMenuColumn.hide = false;
        columns.splice(numberOfVisibleColumns - 1, 0, searchMenuColumn);
        return columns;
    };
    /**
   * function to reduce/increase number of visible columns based on screen size
   * @param columns - list of columns
   * @example changeVisibleColumnsCount([])
   */
    const changeVisibleColumnsCount = (columns) => {
        if (activeTab === SEARCH_TABS_LABEL.INTERACTIONS) {
            return;
        }
        const selectedColumns = [];
        const notSelectedColumns = [];
        columns.forEach((column) => {
            !column.hide ? selectedColumns.push(column) : notSelectedColumns.push(column);
        });
        const selectedColumnsLength = selectedColumns.length;
        if (selectedColumnsLength > numberOfVisibleColumns) { //when number of selected columns in redux is greater than number of columns to be shown
            const newSelectedColumns = [];
            selectedColumns.forEach((column, index) => {
                const newColumn = Object.assign({}, column);
                if (index > numberOfVisibleColumns - 2) {
                    newColumn.hide = true;
                }
                newSelectedColumns.push(newColumn);
            });
            const updatedColumns = addSearchOptionMenuColumn([...newSelectedColumns, ...notSelectedColumns]);
            dispatch(ccfDigitalSearchActions.updateDefaultColumns(updatedColumns));
        }
        else if (selectedColumnsLength < numberOfVisibleColumns) { //when number of selected columns in redux is less than number of columns to be shown
            const newNotSelectedColumns = [];
            notSelectedColumns.forEach((column, index) => {
                const newColumn = Object.assign({}, column);
                if (index < numberOfVisibleColumns - selectedColumnsLength) {
                    newColumn.hide = false;
                }
                newNotSelectedColumns.push(newColumn);
            });
            const updatedColumns = addSearchOptionMenuColumn([...selectedColumns, ...newNotSelectedColumns]);
            dispatch(ccfDigitalSearchActions.updateDefaultColumns(updatedColumns));
        }
    };
    useEffect(() => {
        if (!(defaultColumns === null || defaultColumns === void 0 ? void 0 : defaultColumns.length)) { // set the columns
            const updatedDefaultColumns = mapDefaultColumnsFromLS();
            if (updatedDefaultColumns) { // if columns are present in LS then update redux columns
                dispatch(ccfDigitalSearchActions.updateDefaultColumns(updatedDefaultColumns));
            }
            else { // else update redux with default columns
                dispatch(ccfDigitalSearchActions.updateDefaultColumns(columns));
            }
        }
        //setting page to 1 when page load for threads tab
        if (activeTab === SEARCH_TABS_LABEL.THREADS) {
            dispatch(getCcfDigitalSearch({ searchParams: { withContext: 1 } }));
        }
        else if (activeTab !== SEARCH_TABS_LABEL.INTERACTIONS) { // Skip api call when feature toggle is on and activeTab is interactions
            dispatch(getCcfDigitalSearch({ searchParams: {} })); // on interaction search page load we will get the search result based on the initial state search params
        }
        //on component unmount we will reset the interaction search to the initial state
        return () => {
            dispatch(ccfDigitalSearchActions.resetTabState(activeTab));
        };
    }, []);
    useEffect(() => {
        if (!(defaultColumns === null || defaultColumns === void 0 ? void 0 : defaultColumns.length)) { //on resetting the interaction search state this useEffect will receive updated defaultColumns hence setting columns in redux from here
            const updatedDefaultColumns = mapDefaultColumnsFromLS();
            updatedDefaultColumns && dispatch(ccfDigitalSearchActions.updateDefaultColumns(updatedDefaultColumns));
        }
        else {
            if ((defaultColumns === null || defaultColumns === void 0 ? void 0 : defaultColumns.length) >= numberOfVisibleColumns && defaultColumns.filter((col) => !col.hide).length !==
                numberOfVisibleColumns) {
                changeVisibleColumnsCount(defaultColumns);
            }
            else {
                const columns = [];
                defaultColumns.forEach((column) => {
                    columns.push({ field: column.field, hide: column.hide });
                });
                const digitalSearchLS = LocalStorageHelper.getItem(DIGITAL_SEARCH, true);
                LocalStorageHelper.setItem(DIGITAL_SEARCH, Object.assign(Object.assign({}, digitalSearchLS), { [activeTab]: Object.assign(Object.assign({}, digitalSearchLS[activeTab]), { defaultColumns: columns }) })); // to store columns in local storage after reordering
            }
        }
    }, [defaultColumns, numberOfVisibleColumns]);
    useEffect(() => {
        if (isRefresh.current) { // if the isRefresh we will change to false to show the grid with data
            isRefresh.current = false;
        }
        const startIndex = PAGE_SIZE * currentPage;
        const lastIndex = PAGE_SIZE * (currentPage + 1);
        setGridRows(gridData === null || gridData === void 0 ? void 0 : gridData.slice(startIndex, lastIndex)); // set the row based on the page the grid is currently on
    }, [gridData, currentPage]);
    useComponentDidUpdate(() => {
        if (isGridReset) {
            setGridToPageOne(); // whenever their is gridReset action and we fetch fresh data we will set the grid to page one
            dispatch(ccfDigitalSearchActions.updateIsGridReset(false)); // set this to false as we have handled the setting grid to page one after assignment action
        }
    }, [isGridReset]);
    /**
     * Used to set the grid to page one
     * @example
     * ```
     * setGridToPageOne()
     * ```
     */
    const setGridToPageOne = () => {
        isRefresh.current = true; // to set the grid back to page 1
        lastVisitedUpto.current = 0; // set to initial value
        setCurrentPage(0); // set to initial value
    };
    /**
     * Use to handle the page change event of the Data grid
     * @example
     * ```
     * <CcfGrid
     * ...
     * onPageChange: handlePageChange
     * >
     * ```
     */
    const handlePageChange = (page) => {
        var _a;
        if (isLoading) { // if the data is still loading then we will not allow the page change event
            return;
        }
        if (page > lastVisitedUpto.current) { // if the current page is greater than the lastVisitedUpto then we will fetch the next page search data
            lastVisitedUpto.current = page;
            if (activeTab === SEARCH_TABS_LABEL.THREADS || activeTab === SEARCH_TABS_LABEL.CUSTOMERS) {
                const pageValue = (_a = pageLinks === null || pageLinks === void 0 ? void 0 : pageLinks.next) === null || _a === void 0 ? void 0 : _a.match(/page=([^&]*)/);
                if (pageValue && (pageValue === null || pageValue === void 0 ? void 0 : pageValue.length) > 1) {
                    const searchParams = (activeTab === SEARCH_TABS_LABEL.CUSTOMERS) ? {
                        page: parseInt(pageValue[1]),
                    } : {
                        withContext: 1, page: parseInt(pageValue[1]),
                    };
                    dispatch(getCcfDigitalSearch({ searchParams: searchParams }));
                }
            }
            else {
                dispatch(getCcfDigitalSearch({ searchParams: { scrollToken: lastScrollToken } }));
            }
        }
        setCurrentPage(page);
        if (totalRecords) {
            // Accessibility: Update ARIA live regions to announce navigation changes to screen reader users.
            const rangeStart = page * PAGE_SIZE + 1;
            const rangeEnd = (page + 1) * PAGE_SIZE;
            dispatch(globalActions.setAriaLiveAnnouncer({ translateConfig: { key: 'searchResultsPagination', extraArgs: { format: [rangeStart, rangeEnd, totalRecords] } } }));
        }
    };
    /**
     * Use to handle the row selection when check box is selected
     * @param data - array of the selected rows
     * @example
     * ```
     *  <CcfGrid
     * ...
     * handleRowSelections: handleRowSelections
     * >
     * ```
     */
    const handleRowSelections = (data) => {
        const updatedContactIds = [];
        data.forEach(id => {
            const gridDataContact = gridData.find((row) => row.id === id);
            if (gridDataContact) {
                updatedContactIds.push({ id: id, status: gridDataContact.status });
            }
            else {
                const selectedContactData = selectedContactsData.find((row) => row.id === id);
                if (selectedContactData)
                    updatedContactIds.push({ id: id, status: selectedContactData.status });
            }
        });
        /**Here we are fetching the contact data from grid if its available in gridData
         * if not we are fetching it from the selectedContactsData
         * We are doing this because gridData is getting updated once the search filters are applied
         * In this case we were loosing the contacts data which was there before applying the filter
        */
        dispatch(ccfDigitalSearchActions.updateSelectedRowContacts(data));
        dispatch(ccfDigitalSearchActions.updateSelectedRowData(updatedContactIds));
    };
    /**
     * Use to handle the sorting of the column when the new sort order is selected
     * @param data- sort Model data
     * @example
     * ```
     * <CcfGrid
     * ...
     * onSortModelChange: handleSortModelChange
     * >
     * ```
     */
    const handleSortModelChange = (data) => {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!(data === null || data === void 0 ? void 0 : data.length))
            return;
        let sortColumn = {
            sorting: sortColumnMapping[(_a = data === null || data === void 0 ? void 0 : data[0]) === null || _a === void 0 ? void 0 : _a.field],
            sortingType: (_b = data === null || data === void 0 ? void 0 : data[0]) === null || _b === void 0 ? void 0 : _b.sort,
        }; // to get the new search data based on the sorting column and order
        dispatch(getCcfDigitalSearch({
            searchParams: sortColumn,
            freshData: true,
        }));
        sortColumn = Object.assign(Object.assign({}, sortColumn), { sorting: (_c = data === null || data === void 0 ? void 0 : data[0]) === null || _c === void 0 ? void 0 : _c.field });
        dispatch(// to update the current sort column and order
        ccfDigitalSearchActions.updateCurrentSortColumn(sortColumn));
        const digitalSearchLS = LocalStorageHelper.getItem(DIGITAL_SEARCH, true);
        LocalStorageHelper.setItem(DIGITAL_SEARCH, Object.assign(Object.assign({}, digitalSearchLS), { [activeTab]: Object.assign(Object.assign({}, digitalSearchLS[activeTab]), { currentSortColumn: sortColumn }) })); // storing the sort column in local storage
        // Store sort information in clientdata api
        if (activeTab === SEARCH_TABS_LABEL.INTERACTIONS && ((_d = data === null || data === void 0 ? void 0 : data[0]) === null || _d === void 0 ? void 0 : _d.field) && ((_e = data === null || data === void 0 ? void 0 : data[0]) === null || _e === void 0 ? void 0 : _e.sort))
            dispatch(updateClientDataWithSearchAppSettings({ activeTab: SEARCH_TABS_LABEL.INTERACTIONS, tabSettings: { sorting: { field: (_f = data === null || data === void 0 ? void 0 : data[0]) === null || _f === void 0 ? void 0 : _f.field, direction: (_g = data === null || data === void 0 ? void 0 : data[0]) === null || _g === void 0 ? void 0 : _g.sort } } }));
    };
    /**
     * function to update the app space size on resizing the container
     * @param containerSize -ElementSize
     * @example handleResize(containerSize)
     */
    const handleResize = (containerSize) => {
        dispatch(setAppspaceResolution(containerSize.width));
    };
    /**
     * Used to handle the row click event of grid
     * @param params - grid row params
     * @example
     * ```
     * onRowClick={handleGridRowClick}
     * ```
     */
    const handleGridRowClick = (params) => {
        var _a, _b;
        // on grid row click we will dispatch the action for previewing the case based on row id
        if (activeTab === SEARCH_TABS_LABEL.INTERACTIONS) {
            dispatch(getContactDetailsForSelectedContact({ contactId: (_a = params === null || params === void 0 ? void 0 : params.id) === null || _a === void 0 ? void 0 : _a.toString(), isAssignedToAgentInbox: false }));
        }
        else if (activeTab === SEARCH_TABS_LABEL.CUSTOMERS) {
            dispatch(ccfDigitalSearchActions.setcurrentCustomerContactInfo({ customerId: (_b = params === null || params === void 0 ? void 0 : params.row) === null || _b === void 0 ? void 0 : _b.id, caseId: '', isCustomerCardPopupOpen: true }));
        }
    };
    /**
     * Use to create the Data grid component based on the isRefresh flag
     * if the isRefresh flag is true then we will just render the grid with the headers and the loading icon without any row data
     * and if false the grid with the rows will be loaded
     * @returns JSXElement CcfGrid
     * @example createGrid()
     * ```
     * createGrid()
     * ```
     */
    const createGrid = () => (_jsx(CcfGrid, Object.assign({}, (!isRefresh.current ? {
        keepNonExistentRowsSelected: true,
        columns: defaultColumns,
        rows: gridRows,
        currentPageongrid: lastVisitedUpto.current,
        rowCount: totalRecords,
        noRowsOverlay: _jsx(CustomNoResultComponent, {}),
        pageSize: PAGE_SIZE,
        paginationMode: 'server',
        onPageChange: handlePageChange,
        isLoading: isLoading,
        density: 'compact',
        disableSelectionOnClick: true,
        checkboxSelection: isCheckboxSelectable,
        selections: selections,
        handleRowSelections: handleRowSelections,
        sortingMode: 'server',
        onSortModelChange: (columnData) => columnData.length && handleSortModelChange(columnData),
        sortModel: [
            { field: currentSortColumn.sorting, sort: currentSortColumn.sortingType }
        ],
        onRowClick: handleGridRowClick,
        disableVirtualization: isKebabMenuPinned,
        showHeaderOverlayForPinnedColumn: isKebabMenuPinned,
        headerFieldName: INTERACTION_GRID_COLUMN.SEARCH_OPTION_MENU,
        sortButtonLabels: sortButtonLabels,
    } :
        {
            keepNonExistentRowsSelected: true,
            columns: defaultColumns,
            rows: [],
            pageSize: PAGE_SIZE,
            paginationMode: 'server',
            isLoading: isLoading,
            currentPageongrid: lastVisitedUpto.current,
            checkboxSelection: isCheckboxSelectable,
            noRowsOverlay: _jsx(CustomNoResultComponent, {}),
            density: 'compact',
            gridHeight: '100%',
            sortingMode: 'server',
            sortModel: [{ field: currentSortColumn.sorting, sort: currentSortColumn.sortingType }],
            disableVirtualization: isKebabMenuPinned,
            showHeaderOverlayForPinnedColumn: isKebabMenuPinned,
            headerFieldName: INTERACTION_GRID_COLUMN.SEARCH_OPTION_MENU,
            sortButtonLabels: sortButtonLabels,
        }), { sx: styles.dataGridStyles, onResize: handleResize })));
    return _jsxs(Box, Object.assign({ sx: styles.dataGridContainer, role: 'grid', "aria-labelledby": searchTabLabelId, "aria-describedby": searchTabLabelId }, { children: [selections.length > 0 && _jsx(CcfDigitalSearchToggleButtons, { isAppSpace: isAppSpace }), (defaultColumns === null || defaultColumns === void 0 ? void 0 : defaultColumns.length) > 0 ? createGrid() : ''] }));
};
//# sourceMappingURL=ccf-digital-search-grid.js.map