import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useCallback, useEffect, useRef } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable';
import { useDispatch, useSelector } from 'react-redux';
import { Box, useTheme } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { EventKeys } from '@nice-devone/common-sdk';
import { CcfButton, CcfDraggableIcon, CcfTooltip, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import { INTERACTION_GRID_COLUMN, SEARCH_TABS_LABEL, ccfDigitalSearchActions, getActiveSearchTab, updateClientDataWithSearchAppSettings, } from '../ccf-digital-search.slice';
import CcfDigitalSearchDraggableStyles from './ccf-digital-search-draggable-styles';
import { applyColumnRules, DragActionType, getPosition } from './ccf-digital-search-draggable-container';
/**
 * Enum for differentiating column groups used in the DnD containers.
 */
export var ColumnGroup;
(function (ColumnGroup) {
    /**
     * Represents the group of selected columns.
     */
    ColumnGroup["Selected"] = "selected";
    /**
     * Represents the group of non-selected columns.
     */
    ColumnGroup["NonSelected"] = "nonSelected";
})(ColumnGroup || (ColumnGroup = {}));
/**
 * Custom hook for updating columns based on drag rules.
 *
 * @param rules - Drag rules with activeTab and isInteractionToggled.
 * @returns Memoized callback to update selected/non-selected columns and dispatch actions.
 *
 * @example
 * ```
 * const rules = { activeTab: SEARCH_TABS_LABEL.INTERACTIONS, isInteractionToggled: true };
 * const updateColumns = useUpdateColumns(rules);
 *
 * updateColumns(newState, setSelected, setNonSelected);
 * ```
 */
function useUpdateColumns(rules) {
    const dispatch = useDispatch();
    return useCallback((newState, setSelected, setNonSelected, activeId, ariaAnnouncement) => {
        var _a, _b, _c, _d;
        const applied = applyColumnRules(newState, rules, DragActionType.Click);
        setSelected(applied.selected);
        setNonSelected(applied.nonSelected);
        dispatch(ccfDigitalSearchActions.updateDefaultColumns([...applied.selected, ...applied.nonSelected]));
        const positionInformation = getPosition(activeId, applied.selected, applied.nonSelected);
        //Announce the drop position after handleReorder and columns constraints are applied
        const dragEndAnnouncement = ariaAnnouncement.translate('dndDragOver', {
            format: [(_a = positionInformation === null || positionInformation === void 0 ? void 0 : positionInformation.headerName) !== null && _a !== void 0 ? _a : '', (_b = positionInformation === null || positionInformation === void 0 ? void 0 : positionInformation.position) !== null && _b !== void 0 ? _b : 0, (_c = positionInformation === null || positionInformation === void 0 ? void 0 : positionInformation.total) !== null && _c !== void 0 ? _c : 0, (_d = positionInformation === null || positionInformation === void 0 ? void 0 : positionInformation.container) !== null && _d !== void 0 ? _d : ''],
        });
        positionInformation && ariaAnnouncement.announce(dragEndAnnouncement);
        if (rules.activeTab === SEARCH_TABS_LABEL.INTERACTIONS) {
            dispatch(updateClientDataWithSearchAppSettings({
                activeTab: SEARCH_TABS_LABEL.INTERACTIONS,
                tabSettings: { columns: [...applied.selected, ...applied.nonSelected] },
            }));
        }
    }, [dispatch, rules]);
}
/* eslint-disable max-params */
/**
 * Custom hook for handling item movement within and between column containers.
 *
 * @param setSelected - Setter for selected columns state.
 * @param setNonSelected - Setter for non-selected columns state.
 * @param selected - Current selected columns.
 * @param nonSelected - Current non-selected columns.
 * @param rules - Drag rules for column updates.
 * @returns Object with functions to move items within or between containers.
 *
 * @example
 * ```
 * const { moveItem, moveItemToOtherContainer } = useItemMovement(
 *   setSelected,
 *   setNonSelected,
 *   currentColumnState,
 *   rules,
 *   announce
 * );
 *
 * // Move item up in selected container
 * moveItem('itemId', EventKeys.ARROW_UP, ColumnGroup.Selected);
 *
 * // Move item to non-selected container
 * moveItemToOtherContainer('itemId', ColumnGroup.Selected);
 * ```
 */
export function useItemMovement(setSelected, setNonSelected, currentColumnState, rules, ariaAnnouncement) {
    const updateColumns = useUpdateColumns(rules);
    const activeTab = useSelector(getActiveSearchTab);
    const { selected, nonSelected } = currentColumnState;
    /** Moves an item up or down in its current container. */
    const moveItem = useCallback((id, direction, container) => {
        const list = container === ColumnGroup.Selected ? [...selected] : [...nonSelected];
        const index = list.findIndex((item) => item.field === id);
        if (index === -1)
            return;
        const newIndex = direction === EventKeys.ARROW_UP ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= list.length)
            return;
        const newList = arrayMove(list, index, newIndex);
        const newState = container === ColumnGroup.Selected ? { selected: newList, nonSelected } : { selected, nonSelected: newList };
        updateColumns(newState, setSelected, setNonSelected, id, ariaAnnouncement);
    }, [selected, nonSelected, updateColumns, setSelected, setNonSelected]);
    /** Moves an item from one container to the other. */
    const moveItemToOtherContainer = useCallback((id, from) => {
        const updatedSelected = [...selected];
        const updatedNonSelected = [...nonSelected];
        if (from === ColumnGroup.Selected) {
            const index = updatedSelected.findIndex((item) => item.field === id);
            if (index === -1)
                return;
            const [movingItem] = updatedSelected.splice(index, 1);
            if (activeTab === SEARCH_TABS_LABEL.INTERACTIONS) {
                updatedNonSelected.splice(0, 0, Object.assign(Object.assign({}, movingItem), { hide: true }));
            }
            else {
                updatedNonSelected.splice(1, 0, Object.assign(Object.assign({}, movingItem), { hide: true }));
            }
        }
        else {
            const index = updatedNonSelected.findIndex((item) => item.field === id);
            if (index === -1)
                return;
            const [movingItem] = updatedNonSelected.splice(index, 1);
            updatedSelected.push(Object.assign(Object.assign({}, movingItem), { hide: false }));
        }
        updateColumns({ selected: updatedSelected, nonSelected: updatedNonSelected }, setSelected, setNonSelected, id, ariaAnnouncement);
    }, [selected, nonSelected, activeTab, updateColumns, setSelected, setNonSelected]);
    return { moveItem, moveItemToOtherContainer };
}
/**
 * A sortable container for drag-and-drop column items.
 *
 * @param id - The container's column group ID.
 * @param items - Array of column definitions.
 * @param label - Container label.
 * @param moveItem - Function to move an item within the container.
 * @param moveItemToOtherContainer - Function to move an item to another container.
 * @returns A sortable container with droppable and sortable functionality.
 *
 * @example
 * ```
 * <SortableContainer
 *   id={ColumnGroup.Selected}
 *   items={selectedColumns}
 *   label="Selected Columns"
 *   moveItem={moveItem}
 *   moveItemToOtherContainer={moveItemToOtherContainer}
 * />
 * ```
 */
export function SortableContainer({ id, items: columns, label, moveItem, moveItemToOtherContainer, }) {
    const { setNodeRef, isOver } = useDroppable({ id });
    const theme = useTheme();
    const [translate] = useTranslator();
    const styles = CcfDigitalSearchDraggableStyles(theme);
    const availableIndex = (() => {
        const reverseIndex = columns
            .slice()
            .reverse()
            .findIndex((column) => (column === null || column === void 0 ? void 0 : column.field) !== INTERACTION_GRID_COLUMN.SEARCH_OPTION_MENU);
        if (reverseIndex === -1) {
            // if "searchOptionMenu" not found OR list empty
            return (columns === null || columns === void 0 ? void 0 : columns.length) - 1;
        }
        return (columns === null || columns === void 0 ? void 0 : columns.length) - 1 - reverseIndex;
    })();
    return (_jsx(Box, Object.assign({ sx: styles.containerBox, id: label }, { children: _jsx(Box, Object.assign({ ref: setNodeRef, sx: styles.droppableBox(isOver) }, { children: _jsx(SortableContext, Object.assign({ id: id, items: columns.map((column, index) => { var _a; return (_a = column === null || column === void 0 ? void 0 : column.field) !== null && _a !== void 0 ? _a : `column-${index}`; }), strategy: verticalListSortingStrategy }, { children: columns.length === 0 ? (_jsx(Box, Object.assign({ sx: styles.emptyDropArea }, { children: translate('dndEmptyDrop') }))) : (columns.map((column, index) => {
                    var _a;
                    return (_jsx(SortableItem, { item: column, containerId: id, moveItem: moveItem, moveItemToOtherContainer: moveItemToOtherContainer, isFirst: index === 0, isLast: index === availableIndex }, (_a = column === null || column === void 0 ? void 0 : column.field) !== null && _a !== void 0 ? _a : `column-${index}`));
                })) })) })) })));
}
/**
 * A memoized sortable item for drag-and-drop functionality within a column container.
 *
 * @param item - The column definition for the item.
 * @param containerId - The ID of the container (selected or non-selected).
 * @param moveItem - Function to move the item within the container.
 * @param moveItemToOtherContainer - Function to move the item to another container.
 * @param isFirst - Whether the item is the first in its container.
 * @param isLast - Whether the item is the last in its container.
 * @returns A draggable item with reorder controls.
 *
 * @example
 * ```
 * <SortableItem
 *   item={column}
 *   containerId={ColumnGroup.Selected}
 *   moveItem={moveItem}
 *   moveItemToOtherContainer={moveItemToOtherContainer}
 *   isFirst={index === 0}
 *   isLast={index === items.length - 1}
 * />
 * ```
 */
export const SortableItem = React.memo(function SortableItem({ item, containerId, moveItem, moveItemToOtherContainer, isFirst, isLast, }) {
    var _a, _b, _c, _d, _e, _f, _g;
    const { attributes, listeners, setNodeRef, isDragging, transform, transition, active } = useSortable({
        id: (_a = item.field) !== null && _a !== void 0 ? _a : '',
        data: { column: item },
    });
    const theme = useTheme();
    const styles = CcfDigitalSearchDraggableStyles(theme);
    const [translate] = useTranslator();
    const recentActiveItem = useRef(null);
    const { 'aria-describedby': ariaDescribedBy } = attributes, restDragItemAttributes = __rest(attributes, ['aria-describedby']);
    const handleReorder = useCallback((direction) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!item.field)
            return;
        if (direction === EventKeys.ARROW_DOWN && isLast && containerId === ColumnGroup.Selected) {
            moveItemToOtherContainer(item.field, containerId);
            return;
        }
        if (direction === EventKeys.ARROW_UP && isFirst && containerId === ColumnGroup.NonSelected) {
            moveItemToOtherContainer(item.field, containerId);
            return;
        }
        if ((direction === EventKeys.ARROW_UP && isFirst) || (direction === EventKeys.ARROW_DOWN && isLast))
            return;
        moveItem(item.field, direction, containerId);
    }, [containerId, isFirst, isLast, item.field, moveItem, moveItemToOtherContainer]);
    const getAriaLabel = useCallback((direction) => {
        var _a;
        const headerName = (_a = item.headerName) !== null && _a !== void 0 ? _a : 'item';
        if (direction === EventKeys.ARROW_UP && isFirst && containerId === ColumnGroup.Selected)
            return translate('disabled');
        if (direction === EventKeys.ARROW_DOWN && isLast && containerId === ColumnGroup.NonSelected)
            return translate('disabled');
        if (direction === EventKeys.ARROW_DOWN && isLast && containerId === ColumnGroup.Selected) {
            return translate('moveItemToNonSelected', { format: [headerName] });
        }
        if (direction === EventKeys.ARROW_UP && isFirst && containerId === ColumnGroup.NonSelected) {
            return translate('moveItemToSelected', { format: [headerName] });
        }
        return direction === EventKeys.ARROW_UP
            ? translate('moveItemUp', { format: [headerName] })
            : translate('moveItemDown', { format: [headerName] });
    }, [containerId, isFirst, isLast, item.headerName, translate]);
    useEffect(() => {
        if (active === null || active === void 0 ? void 0 : active.id) {
            /** Ignoring the redundant aria-describedby announcement for the recently dropped item */
            recentActiveItem.current = active;
        }
    }, [active === null || active === void 0 ? void 0 : active.id]);
    return (_jsx(Box, Object.assign({ ref: setNodeRef, "data-draggable": "true", "data-header-name": (item === null || item === void 0 ? void 0 : item.headerName) || '', sx: Object.assign(Object.assign({}, styles.draggableItem(transform, isDragging, transition, styles.containerBox)), { display: (item === null || item === void 0 ? void 0 : item.headerName) ? 'inherit' : 'none', opacity: isDragging ? 0 : 1 }) }, { children: _jsxs(Box, Object.assign({ className: "hover-parent", "data-testid": `option-${(_b = item.field) !== null && _b !== void 0 ? _b : ''}`, sx: (item === null || item === void 0 ? void 0 : item.headerName) ? styles.menuItem : { display: 'none' } }, { children: [_jsxs(Box, Object.assign({ display: "flex", alignItems: "center" }, listeners, { children: [_jsx(CcfButton, Object.assign({ sx: Object.assign(Object.assign({}, styles.draggableBtn), { cursor: 'grab', opacity: isDragging ? 1 : 0.5 }) }, (((_c = recentActiveItem === null || recentActiveItem === void 0 ? void 0 : recentActiveItem.current) === null || _c === void 0 ? void 0 : _c.id) === (item === null || item === void 0 ? void 0 : item.field) ? restDragItemAttributes : attributes), { disableRipple: true, "aria-label": translate('dragOrClickToReorder', { format: [(_d = item.headerName) !== null && _d !== void 0 ? _d : 'item'] }) }, { children: _jsx(CcfDraggableIcon, { fontSize: "small" }) })), _jsx(CcfTypography, Object.assign({ sx: styles.itemLabel }, { children: (_e = item.headerName) !== null && _e !== void 0 ? _e : '' }))] })), _jsxs(Box, Object.assign({ sx: styles.hoverActionIcons }, { children: [_jsx(Box, Object.assign({ component: "span", sx: styles.moveUpWrapper(isFirst && containerId === ColumnGroup.Selected) }, { children: _jsx(CcfTooltip, Object.assign({ title: isFirst && containerId === ColumnGroup.Selected
                                    ? translate('disabled')
                                    : translate('moveItemUp', { format: [''] }), arrow: true, "aria-label": getAriaLabel(EventKeys.ARROW_UP) }, { children: _jsx(CcfButton, Object.assign({ sx: Object.assign(Object.assign({}, styles.draggableBtn), styles.iconFocus), tabIndex: 0, onClick: handleReorder(EventKeys.ARROW_UP), onKeyDown: (e) => [EventKeys.ENTER, EventKeys.SPACE].includes(e.code) &&
                                        handleReorder(EventKeys.ARROW_UP)(e), "data-testid": `move-up-${(_f = item.field) !== null && _f !== void 0 ? _f : ''}`, "aria-label": getAriaLabel(EventKeys.ARROW_UP), disabled: isFirst && containerId === ColumnGroup.Selected, disableRipple: true }, { children: _jsx(ArrowUpwardIcon, { fontSize: "small", sx: styles.moveUpIcon(isFirst && containerId === ColumnGroup.Selected) }) })) })) })), _jsx(Box, Object.assign({ component: "span", sx: styles.moveDownWrapper(isLast && containerId === ColumnGroup.NonSelected) }, { children: _jsx(CcfTooltip, Object.assign({ title: isLast && containerId === ColumnGroup.NonSelected
                                    ? translate('disabled')
                                    : translate('moveItemDown', { format: [''] }), arrow: true, "aria-label": getAriaLabel(EventKeys.ARROW_DOWN), placement: "top" }, { children: _jsx(CcfButton, Object.assign({ sx: Object.assign(Object.assign({}, styles.draggableBtn), styles.iconFocus), tabIndex: 0, onClick: handleReorder(EventKeys.ARROW_DOWN), onKeyDown: (e) => [EventKeys.ENTER, EventKeys.SPACE].includes(e.code) &&
                                        handleReorder(EventKeys.ARROW_DOWN)(e), "data-testid": `move-down-${(_g = item.field) !== null && _g !== void 0 ? _g : ''}`, "aria-label": getAriaLabel(EventKeys.ARROW_DOWN), disabled: isLast && containerId === ColumnGroup.NonSelected, disableRipple: true }, { children: _jsx(ArrowDownwardIcon, { fontSize: "small", sx: styles.moveDownIcon(isLast && containerId === ColumnGroup.NonSelected) }) })) })) }))] }))] })) })));
});
//# sourceMappingURL=ccf-digital-search-sortable.js.map