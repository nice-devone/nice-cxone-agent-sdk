import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ListSubheader, Popover, useTheme } from '@mui/material';
import { CcfCloseIcon, CcfDivider, CcfIconButton, CcfTypography, DividerOrientation, DividerVariant, useTranslator, } from '@nice-devone/ui-controls';
import { DragDropContext } from 'react-beautiful-dnd';
import { CcfDraggableColumns } from '../ccf-customizable-columns/ccf-draggable-columns';
import { ccfDigitalSearchActions, getCustomizeMenuElement, getDefaultColumns, getNumberOfVisibleColumns, INTERACTION_GRID_COLUMN, SEARCH_TABS_LABEL, updateClientDataWithSearchAppSettings } from '../ccf-digital-search.slice';
import { useDispatch, useSelector } from 'react-redux';
import CcfDigitalSearchStyle from '../ccf-digital-search-styles';
import { ColumnType, reorderColumns } from '../ccf-customizable-columns/ccf-customizable-menu';
/**
 * Moves the search option to the last visible element in the column list.
 *
 * @param columnList - The list of column definitions.
 * @returns The reordered list of column definitions.
 * @example moveSearchOptionToLastElement(columns)
 */
export const moveSearchOptionToLastElement = (columnList) => {
    const searchOptionIndex = columnList.findIndex(list => list.field === INTERACTION_GRID_COLUMN.SEARCH_OPTION_MENU);
    if (searchOptionIndex < 0)
        return columnList;
    //Force search option to be visible
    columnList[searchOptionIndex] = Object.assign(Object.assign({}, columnList[searchOptionIndex]), { hide: false });
    return reorderColumns(columnList, searchOptionIndex, columnList.length - 1);
};
/**
  * Method to process the drag and drop in the list
  * @param result - DropResult interface
  * @param defaultColumns - column list
  * @example processDragEnd(result,defaultColumns)
  */
export const processDragEnd = (result, defaultColumns, minimumColumns) => {
    if (!result.destination)
        return [...defaultColumns];
    const { source, destination } = result;
    const selectedColumns = defaultColumns.filter(col => !col.hide);
    const notSelectedColumns = defaultColumns.filter(col => col.hide);
    const isDraggingFromSelected = source.droppableId === ColumnType.SELECTED_COLUMNS;
    // Handling drag and drop within the same group
    if (source.droppableId === destination.droppableId) {
        const listToReorder = isDraggingFromSelected ? selectedColumns : notSelectedColumns;
        const reorderedItems = reorderColumns(listToReorder, source.index, destination.index);
        return isDraggingFromSelected
            ? [...reorderedItems, ...notSelectedColumns]
            : [...selectedColumns, ...reorderedItems];
    }
    // Drag and drop outside the group
    // Enforce minimum columns
    if (isDraggingFromSelected && selectedColumns.length <= minimumColumns)
        return defaultColumns.map((c, index) => {
            if (index < minimumColumns)
                return Object.assign(Object.assign({}, c), { hide: false });
            else
                return Object.assign(Object.assign({}, c), { hide: true });
        });
    const sourceList = isDraggingFromSelected ? selectedColumns : notSelectedColumns;
    const destinationList = isDraggingFromSelected ? notSelectedColumns : selectedColumns;
    const [movedItem] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, Object.assign(Object.assign({}, movedItem), { hide: !movedItem.hide }));
    return [...selectedColumns, ...notSelectedColumns];
};
/**
 * CcfInteractionsColumnsPopover - to display list of interaction search columns
 * @example - `<CcfInteractionsColumnsPopover />`
 */
export const CcfInteractionsColumnsPopover = () => {
    const theme = useTheme();
    const anchorEl = useSelector(getCustomizeMenuElement);
    const open = Boolean(anchorEl);
    const styles = CcfDigitalSearchStyle(theme);
    const dispatch = useDispatch();
    const defaultColumns = useSelector(getDefaultColumns);
    const [translate] = useTranslator();
    const minimumColumns = useSelector(getNumberOfVisibleColumns);
    /**
    * function to handle the drag and drop
    * @param result - DropResult interface
    * @example handleDragEnd(result)
    */
    const handleDragEnd = (result) => {
        const processedList = processDragEnd(result, defaultColumns, minimumColumns);
        const moveSearchOptionToLastVisible = moveSearchOptionToLastElement(processedList);
        dispatch(ccfDigitalSearchActions.updateDefaultColumns(moveSearchOptionToLastVisible));
    };
    /**
     * Saves the column settings for the search interactions tab.
     *
     * This function dispatches two actions:
     * 1. `ccfDigitalSearchActions.updateCustomizeMenuElement` with `null` to update the customize menu element.
     * 2. `updateClientDataWithSearchAppSettings` with the current settings including whether the new search interactions tab is enabled,
     *    the active tab label, and the default columns.
     *
     * @returns A promise that resolves when the settings have been saved.
     * @example saveColumnSettings()
     */
    const saveColumnSettings = () => __awaiter(void 0, void 0, void 0, function* () {
        dispatch(ccfDigitalSearchActions.updateCustomizeMenuElement(null));
        dispatch(updateClientDataWithSearchAppSettings({ activeTab: SEARCH_TABS_LABEL.INTERACTIONS, tabSettings: { columns: defaultColumns } }));
    });
    return (_jsxs(Popover, Object.assign({ id: "interactions-tab-columns-popover", anchorEl: anchorEl, open: open, onClose: () => saveColumnSettings(), sx: Object.assign({}, styles.menu) }, { children: [_jsxs(ListSubheader, Object.assign({ component: "div", id: "list-subheader", sx: styles.listSubheader }, { children: [_jsx(CcfTypography, { translationKey: "columns", sx: styles.customizeText }), _jsx(CcfIconButton, Object.assign({ sx: Object.assign(Object.assign({}, styles.focussedElement), { 'padding': '0' }), "data-testid": "interactions-tab-columns-close-button", onClick: () => saveColumnSettings(), tabIndex: 0, "aria-label": translate('close'), id: "interactions-tab-columns-close-button", disableRipple: true }, { children: _jsx(CcfCloseIcon, { sx: styles.closeIcon, viewBox: "-8 -4 32 32" }) }))] })), _jsxs(DragDropContext, Object.assign({ onDragEnd: handleDragEnd, "data-testid": "drag-drop-area" }, { children: [_jsx(CcfDraggableColumns, { droppableId: ColumnType.SELECTED_COLUMNS, activeTab: SEARCH_TABS_LABEL.INTERACTIONS }), _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH, sx: styles.divider }), _jsx(CcfDraggableColumns, { droppableId: ColumnType.NOT_SELECTED_COLUMNS, activeTab: SEARCH_TABS_LABEL.INTERACTIONS })] }))] })));
};
//# sourceMappingURL=ccf-interactions-columns-popover.js.map