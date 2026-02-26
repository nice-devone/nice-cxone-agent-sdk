import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ListSubheader, Popover, useTheme } from '@mui/material';
import { CcfCloseIcon, CcfDivider, CcfIconButton, CcfTypography, DividerOrientation, DividerVariant, useTranslator, } from '@nice-devone/ui-controls';
import { DragDropContext } from 'react-beautiful-dnd';
import { CcfDraggableColumns } from './ccf-draggable-columns';
import { ccfDigitalSearchActions, getCustomizeMenuElement, getDefaultColumns } from '../ccf-digital-search.slice';
import { useDispatch, useSelector } from 'react-redux';
import CcfDigitalSearchStyle from '../ccf-digital-search-styles';
export var ColumnType;
(function (ColumnType) {
    ColumnType["SELECTED_COLUMNS"] = "selected-columns";
    ColumnType["NOT_SELECTED_COLUMNS"] = "not-selected-columns";
})(ColumnType || (ColumnType = {}));
/**
  * function to reorder the columns list
  * @param list - array of columns
  * @param startIndex - index of column dragged
  * @param endIndex - index of column where dragged column is dropped
  * @example reorderColumns([],0,5)
  */
export const reorderColumns = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};
/**
 * CcfCustomizableMenu - to display list of interaction search columns
 * @example - `<CcfCustomizableMenu />`
 */
export const CcfCustomizableMenu = () => {
    const theme = useTheme();
    const anchorEl = useSelector(getCustomizeMenuElement);
    const open = Boolean(anchorEl);
    const styles = CcfDigitalSearchStyle(theme);
    const dispatch = useDispatch();
    const defaultColumns = useSelector(getDefaultColumns);
    const [translate] = useTranslator();
    /**
   * function to move column from one list to another
   * @param source - array of columns from which one column is dragged
   * @param destination - array of columns where column is dropped
   * @param draggableSource - location information about column from source
   * @param droppableDestination - location information about column where column is dropped
   * @example moveColumns(source,destination,draggableSource,droppableDestination)
   */
    const moveColumns = (source, destination, draggableSource, droppableDestination) => {
        if (droppableDestination.droppableId === ColumnType.SELECTED_COLUMNS) {
            if (droppableDestination.index < destination.length - 1) { //if column is dropped anywhere above last column
                const [removedSourceElement] = source.splice(draggableSource.index, 1);
                const [secondLastElement] = destination.splice(destination.length - 2, 1);
                const secondLastElementCopy = Object.assign({}, secondLastElement);
                const removedElementCopy = Object.assign({}, removedSourceElement);
                secondLastElementCopy.hide = true;
                removedElementCopy.hide = false;
                source.unshift(secondLastElementCopy);
                destination.splice(droppableDestination.index, 0, removedElementCopy);
            }
            else { //if column is dropped below last column
                const [removed] = source.splice(draggableSource.index, 1);
                source.unshift(removed);
            }
        }
        else {
            if (droppableDestination.index !== 0) { // when column is dropped anywhere below first column
                const [removedElement] = source.splice(draggableSource.index, 1);
                const firstElement = destination.shift();
                const firstElementCopy = Object.assign({}, firstElement);
                const removedElementCopy = Object.assign({}, removedElement);
                firstElementCopy.hide = false;
                removedElementCopy.hide = true;
                source.splice(source.length - 2, 0, firstElementCopy);
                destination.splice(droppableDestination.index - 1, 0, removedElementCopy);
            }
            else { //when column is dropped above first column
                const [removedElement] = source.splice(draggableSource.index, 1);
                source.splice(source.length - 1, 0, removedElement);
            }
        }
        if (draggableSource.droppableId === ColumnType.SELECTED_COLUMNS) {
            dispatch(ccfDigitalSearchActions.updateDefaultColumns([...source, ...destination]));
        }
        else {
            dispatch(ccfDigitalSearchActions.updateDefaultColumns([...destination, ...source]));
        }
    };
    /**
   * function when drag of column ends
   * @param result - information about the source and destination column
   * @example handleDragEnd(result)
   */
    const handleDragEnd = (result) => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        //if column in drag n dropped within same list of selected/not-selected columns
        if (source.droppableId === destination.droppableId) {
            const selectedColumns = [];
            const notSelectedColumns = [];
            defaultColumns.forEach((column) => {
                !column.hide ? selectedColumns.push(column) : notSelectedColumns.push(column);
            });
            const list = source.droppableId === ColumnType.SELECTED_COLUMNS
                ? selectedColumns
                : notSelectedColumns;
            const items = reorderColumns(list, source.index, destination.index);
            if (source.droppableId === ColumnType.SELECTED_COLUMNS) {
                dispatch(ccfDigitalSearchActions.updateDefaultColumns([...items, ...notSelectedColumns]));
            }
            else {
                dispatch(ccfDigitalSearchActions.updateDefaultColumns([...selectedColumns, ...items]));
            }
        }
        else { // if column is drag n dropped from selected to not selected columns or vice-versa
            const sourceList = [];
            const destinationList = [];
            if (source.droppableId === ColumnType.SELECTED_COLUMNS) {
                defaultColumns.forEach((col) => {
                    !col.hide ? sourceList.push(col) : destinationList.push(col);
                });
            }
            else {
                defaultColumns.forEach((col) => {
                    !col.hide ? destinationList.push(col) : sourceList.push(col);
                });
            }
            moveColumns(sourceList, destinationList, source, destination);
        }
    };
    return (_jsxs(Popover, Object.assign({ id: "customizable-columns", PaperProps: {
            'aria-labelledby': 'customizable-menu-title',
            role: 'dialog',
        }, anchorEl: anchorEl, open: open, onClose: () => dispatch(ccfDigitalSearchActions.updateCustomizeMenuElement(null)), sx: Object.assign({}, styles.menu) }, { children: [_jsxs(ListSubheader, Object.assign({ component: "div", id: "list-subheader", sx: styles.listSubheader }, { children: [_jsx(CcfTypography, { id: 'customizable-menu-title', translationKey: "columns", sx: styles.customizeText }), _jsx(CcfIconButton, Object.assign({ sx: Object.assign(Object.assign({}, styles.focussedElement), { 'padding': '0' }), "data-testid": 'close-button', onClick: () => dispatch(ccfDigitalSearchActions.updateCustomizeMenuElement(null)), tabIndex: 0, "aria-label": translate('close'), disableRipple: true }, { children: _jsx(CcfCloseIcon, { viewBox: "-8 -4 32 32", sx: styles.closeIcon }) }))] })), _jsxs(DragDropContext, Object.assign({ onDragEnd: handleDragEnd }, { children: [_jsx(CcfDraggableColumns, { droppableId: ColumnType.SELECTED_COLUMNS }), _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH, sx: styles.divider }), _jsx(CcfDraggableColumns, { droppableId: ColumnType.NOT_SELECTED_COLUMNS })] }))] })));
};
//# sourceMappingURL=ccf-customizable-menu.js.map