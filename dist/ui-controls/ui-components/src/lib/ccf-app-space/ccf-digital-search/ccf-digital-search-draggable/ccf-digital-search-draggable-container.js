import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo, useState, useCallback } from 'react';
import { DndContext, closestCorners, useSensor, useSensors, PointerSensor, KeyboardSensor, DragOverlay, } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { LiveRegion, useAnnouncement } from '@dnd-kit/accessibility';
import { useUniqueId } from '@dnd-kit/utilities';
import { useDispatch, useSelector } from 'react-redux';
import { Box, MenuItem, useTheme } from '@mui/material';
import { ccfDigitalSearchActions, getActiveSearchTab, getNumberOfVisibleColumns, INTERACTION_GRID_COLUMN, SEARCH_TABS_LABEL, updateClientDataWithSearchAppSettings, } from '../ccf-digital-search.slice';
import { CcfDivider, CcfDraggableIcon, CcfTypography, DividerOrientation, DividerVariant, useTranslator, } from '@nice-devone/ui-controls';
import { EventKeys } from '@nice-devone/common-sdk';
import CcfDigitalSearchDraggableStyles from './ccf-digital-search-draggable-styles';
import { SortableContainer, useItemMovement, ColumnGroup } from './ccf-digital-search-sortable';
/**
 * Specifies the type of user interaction when dragging an element.
 */
export var DragActionType;
(function (DragActionType) {
    /**
     * Represents a standard drag operation.
     */
    DragActionType["Drag"] = "Drag";
    /**
     * Represents a simple click action (sometimes used to initiate a drag).
     */
    DragActionType["Click"] = "Click";
})(DragActionType || (DragActionType = {}));
/**
 * Generates a drag announcement object containing metadata
 * about the dragged item's position and container.
 *
 * @param active - The active drag item from the DnD context, containing
 * sortable metadata such as container ID, index, and item list.
 * @param over - The over drag item from the DnD context, containing
 * sortable metadata such as container ID, index, and item list.
 *
 * @returns An object containing:
 * - `headerName`: The dragged item's ID.
 * - `position`: The current (dropped) position index of the dragged item.
 * - `total`: The total number of items in the container (adjusted if it's the selected group).
 * - `container`: The ID of the container the item belongs to.
 * @example
 * ```
 * const announcement = getDragAnnouncement(active,over);
 * ```
 */
function getDragAnnouncement(active, over) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (!((_b = (_a = active === null || active === void 0 ? void 0 : active.data) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.sortable))
        return null;
    const { sortable, column } = (_d = (_c = active === null || active === void 0 ? void 0 : active.data) === null || _c === void 0 ? void 0 : _c.current) !== null && _d !== void 0 ? _d : {};
    const overSortable = (_f = (_e = over === null || over === void 0 ? void 0 : over.data) === null || _e === void 0 ? void 0 : _e.current) === null || _f === void 0 ? void 0 : _f.sortable;
    const activeHeaderName = (_g = column === null || column === void 0 ? void 0 : column.headerName) !== null && _g !== void 0 ? _g : String(active.id);
    const containerId = (_h = overSortable === null || overSortable === void 0 ? void 0 : overSortable.containerId) !== null && _h !== void 0 ? _h : sortable === null || sortable === void 0 ? void 0 : sortable.containerId;
    const index = (_j = overSortable === null || overSortable === void 0 ? void 0 : overSortable.index) !== null && _j !== void 0 ? _j : sortable === null || sortable === void 0 ? void 0 : sortable.index;
    if (index === null)
        return null;
    /**
   * Gets the visible item count, excluding SEARCH_OPTION_MENU if present.
   * @param sortable - The sortable container object that may include an `items` array.
   * @returns The number of visible (countable) items in the container.
   * @example
   * ```
   * const visibleCount = getVisibleCount(sortableContainer);
   * ```
   */
    const getVisibleCount = (sortable) => {
        if (!(sortable === null || sortable === void 0 ? void 0 : sortable.items))
            return 0;
        const { items } = sortable;
        return items.includes(INTERACTION_GRID_COLUMN.SEARCH_OPTION_MENU)
            ? items.length - 1
            : items.length;
    };
    const total = containerId === sortable.containerId
        ? getVisibleCount(sortable)
        : getVisibleCount(overSortable);
    if (!total)
        return null;
    return {
        headerName: activeHeaderName,
        position: index + 1,
        total,
        container: containerId,
    };
}
/**
 * Retrieves the position of a column by its field ID from the selected or non-selected lists.
 *
 * @param id - The unique field identifier of the column.
 * @param selected - Array of selected column definitions.
 * @param nonSelected - Array of non-selected column definitions.
 *
 * @returns
 * An object describing the position if the column is found:
 * - `position`: The 1-based position of the item within its container.
 * - `total`: The total number of items in that container.
 * - `container`: Either `"selected"` or `"non-selected"`.
 * Returns `null` if the item cannot be found in either container.
 *
 * @example
 * ```
 * const positionInformation = getPosition('name', selectedCols, nonSelectedCols);
 * { position: 2, total: 5, container: 'selected' }
 * ```
 */
export function getPosition(id, selected, nonSelected) {
    const indexInSelectedColumn = selected.findIndex((i) => i.field === id);
    const isSearchOptionMenu = selected.findIndex((i) => i.field === INTERACTION_GRID_COLUMN.SEARCH_OPTION_MENU);
    if (indexInSelectedColumn !== -1) {
        const item = selected[indexInSelectedColumn];
        return { headerName: item.headerName, position: indexInSelectedColumn + 1, total: selected.length - Number(isSearchOptionMenu >= 0), container: ColumnGroup.Selected };
    }
    const indexInNonSelectedColumn = nonSelected.findIndex((i) => i.field === id);
    if (indexInNonSelectedColumn !== -1) {
        const item = nonSelected[indexInNonSelectedColumn];
        return {
            headerName: item.headerName,
            position: indexInNonSelectedColumn + 1,
            total: nonSelected.length,
            container: ColumnGroup.NonSelected,
        };
    }
    return null;
}
/**
 * Moves an item within the same container (reorders it).
 *
 * @param activeId - The field ID of the item being moved.
 * @param overId - The field ID of the item over which the active item is dropped.
 * @param items - Array of column definitions representing the container.
 * @returns A new array with the item moved, or null if IDs are not found.
 * @example
 * ```
 * const reordered = moveItemWithinContainer('field1', 'field3', columns);
 * ```
 */
function moveItemWithinContainer(activeId, overId, items) {
    const oldIndex = items.findIndex((item) => item.field === activeId);
    const newIndex = items.findIndex((item) => item.field === overId);
    if (oldIndex === -1 || newIndex === -1)
        return null;
    return arrayMove(items, oldIndex, newIndex);
}
/**
 * Moves a column item from one container to another (selected ↔ non-selected).
 *
 * @param activeId - The field ID of the item being moved.
 * @param activeContainer - The source container (Selected or NonSelected).
 * @param destinationContainer - The target container (Selected or NonSelected).
 * @param state - Current column state with selected and non-selected columns.
 * @param overId - Optional field ID of the item over which the new item is dropped.
 * @returns Updated column state after the move.
 * @example
 * ```ts
 * const newState = moveItemBetweenContainers('field1', ColumnGroup.Selected, ColumnGroup.NonSelected, currentState);
 * ```
 */
function moveItemBetweenContainers(activeId, activeContainer, destinationContainer, state, overId) {
    const updatedSelected = [...state.selected];
    const updatedNonSelected = [...state.nonSelected];
    const sourceList = activeContainer === ColumnGroup.Selected ? updatedSelected : updatedNonSelected;
    const destList = destinationContainer === ColumnGroup.Selected ? updatedSelected : updatedNonSelected;
    const movingItemIndex = sourceList.findIndex((item) => item.field === activeId);
    if (movingItemIndex === -1)
        return { selected: updatedSelected, nonSelected: updatedNonSelected };
    const newMovingItem = Object.assign(Object.assign({}, sourceList[movingItemIndex]), { hide: destinationContainer === ColumnGroup.NonSelected });
    sourceList.splice(movingItemIndex, 1);
    const overItemIndex = overId ? destList.findIndex((item) => item.field === overId) : -1;
    const insertIndex = overItemIndex !== -1 ? overItemIndex : destList.length;
    destList.splice(insertIndex, 0, newMovingItem);
    return {
        selected: destinationContainer === ColumnGroup.Selected ? destList : sourceList,
        nonSelected: destinationContainer === ColumnGroup.Selected ? sourceList : destList,
    };
}
/**
 * Applies column selection rules based on drag-and-drop interactions.
 *
 * @param state - Current column state with selected and non-selected columns.
 * @param rules - Drag rules including minimum, active tab, and toggle flags.
 * @returns Updated column state after applying rules.
 * @example
 * ```ts
 * const newState = applyColumnRules(currentState, dragRules);
 * ```
 */
export function applyColumnRules(state, rules, actionType) {
    const updatedSelected = [...state.selected];
    const updatedNonSelected = [...state.nonSelected];
    // enforce minimum
    if (updatedSelected.length < rules.minimum) {
        const needed = rules.minimum - updatedSelected.length;
        let restoreItems = [];
        if (rules.activeTab === SEARCH_TABS_LABEL.INTERACTIONS && actionType === DragActionType.Click) {
            restoreItems = updatedNonSelected.splice(1, needed);
        }
        else {
            restoreItems = updatedNonSelected.splice(0, needed);
        }
        updatedSelected.push(...restoreItems.map((i) => (Object.assign(Object.assign({}, i), { hide: false }))));
    }
    /**
     * Enforces a maximum number of selected columns based on specific rules.
     */
    const shouldEnforceMax = !(rules.activeTab === SEARCH_TABS_LABEL.INTERACTIONS);
    if (shouldEnforceMax && updatedSelected.length > rules.minimum) {
        let overflow = [];
        const overflowIndex = updatedSelected.findIndex((i) => i.field === INTERACTION_GRID_COLUMN.SEARCH_OPTION_MENU) - 1;
        if (overflowIndex >= 0)
            overflow = updatedSelected.splice(overflowIndex, 1);
        updatedNonSelected.unshift(...overflow.map((i) => (Object.assign(Object.assign({}, i), { hide: true }))));
    }
    /**
     * Ensures the SEARCH_OPTION_MENU is the last item in the selected columns.
     * @param selectedColumns - Array of selected column definitions
     * @returns Updated selected columns with SEARCH_OPTION_MENU as the last item
     * @example
     * searchOptionIndex(selectedColumns)
     */
    const searchOptionIndex = updatedSelected.findIndex((i) => i.field === INTERACTION_GRID_COLUMN.SEARCH_OPTION_MENU);
    if (searchOptionIndex !== -1) {
        const [searchOptionItem] = updatedSelected.splice(searchOptionIndex, 1);
        updatedSelected.push(Object.assign(Object.assign({}, searchOptionItem), { hide: false }));
    }
    /**
     * Normalizes hide flags for a list of columns.
     *
     * @param columns - Array of column definitions
     * @param hide - Whether columns should be hidden (true) or visible (false)
     * @returns Updated column array with normalized hide flags
     * @example
     * normalize(selectedColumns, false)
     */
    const normalize = (cols, hide) => Array.from(new Map(cols.map((c) => [c.field, Object.assign(Object.assign({}, c), { hide })])).values());
    return {
        selected: normalize(updatedSelected, false),
        nonSelected: normalize(updatedNonSelected, true),
    };
}
/**
 * Renders the active draggable overlay item to minimize re-renders of parent.
 *
 * @param activeItem - Currently dragged column definition
 * @param styles - Computed styles
 * @returns JSX.Element | null
 */
const DragOverlayContent = React.memo(function DragOverlayContent({ activeItem, styles, }) {
    var _a;
    if (!activeItem)
        return null;
    return (_jsx(Box, Object.assign({ sx: styles.overlayBox, "data-testid": `overlay-${activeItem === null || activeItem === void 0 ? void 0 : activeItem.field}` }, { children: _jsx(MenuItem, Object.assign({ sx: Object.assign({}, styles.menuItem), dense: true }, { children: _jsxs(Box, Object.assign({ display: "flex", alignItems: "center" }, { children: [_jsx(CcfDraggableIcon, { fontSize: "small" }), _jsx(CcfTypography, Object.assign({ sx: styles.overlayText }, { children: (_a = activeItem.headerName) !== null && _a !== void 0 ? _a : '' }))] })) })) })));
});
/**
 * A custom hook to manage drag-and-drop state and logic for reordering and moving columns between two lists.
 * This hook leverages the `dnd-kit` library for its drag-and-drop functionality.
 *
 * @param ColumnState -  initialState The initial state of the columns, containing `selected` and `nonSelected` arrays.
 * @param  DragRules - rules An object defining the rules and constraints for drag-and-drop, such as minimum columns and active tab context.
 * @returns
 * ```
 * {{selected: ColumnDefinitions[], nonSelected: ColumnDefinitions[], activeItem: ColumnDefinitions | null, sensors: any, handleDragStart: function, handleDragOver: function, handleDragEnd: function, setSelected: function, setNonSelected: function}}
 * ```
 * An object containing the current column state, drag-and-drop sensors, and event handlers.
 * @example
 * ```
 * const initialState = {
 * selected: [{ field: 'name', headerName: 'Name' }],
 * nonSelected: [{ field: 'age', headerName: 'Age' }]
 * };
 * const rules = {
 * minimumColumns: 1,
 * activeTab: 'SearchTab',
 * isInteractionToggled: false
 * };
 *
 * const {
 * selected,
 * nonSelected,
 * activeItem,
 * sensors,
 * handleDragStart,
 * handleDragOver,
 * handleDragEnd,
 * } = useDragAndDrop(initialState, rules);
 * ```
 */
export function useDragAndDrop(initialState, rules, ariaAnnouncement) {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(initialState.selected);
    const [nonSelected, setNonSelected] = useState(initialState.nonSelected);
    const [activeItem, setActiveItem] = useState(null);
    const updateColumns = useCallback((newState, activeColumn) => {
        var _a, _b, _c, _d;
        const applied = applyColumnRules(newState, rules, DragActionType.Drag);
        setSelected(applied.selected);
        setNonSelected(applied.nonSelected);
        //Announce the drop position after handleDragEnd and columns constraints are applied
        const positionInformation = getPosition(activeColumn.id, applied.selected, applied.nonSelected);
        const dragEndAnnouncement = ariaAnnouncement.translate('dndDragEnd', {
            format: [(_a = positionInformation === null || positionInformation === void 0 ? void 0 : positionInformation.headerName) !== null && _a !== void 0 ? _a : '', (_b = positionInformation === null || positionInformation === void 0 ? void 0 : positionInformation.position) !== null && _b !== void 0 ? _b : 0, (_c = positionInformation === null || positionInformation === void 0 ? void 0 : positionInformation.total) !== null && _c !== void 0 ? _c : 0, (_d = positionInformation === null || positionInformation === void 0 ? void 0 : positionInformation.container) !== null && _d !== void 0 ? _d : ''],
        });
        positionInformation && ariaAnnouncement.announce(dragEndAnnouncement);
        dispatch(ccfDigitalSearchActions.updateDefaultColumns([...applied.selected, ...applied.nonSelected]));
        if (rules.activeTab === SEARCH_TABS_LABEL.INTERACTIONS) {
            dispatch(updateClientDataWithSearchAppSettings({
                activeTab: SEARCH_TABS_LABEL.INTERACTIONS,
                tabSettings: { columns: [...applied.selected, ...applied.nonSelected] },
            }));
        }
    }, [dispatch, rules]);
    /**
     * Handles drag start by setting the active item, preventing drag for SEARCH_OPTION_MENU.
     * @param event - Drag start event
     * @example
     * ```
     * handleDragStart({ active: { id: 'name' } });
     * ```
     * Sets activeItem to the column with id 'name', or null if id is SEARCH_OPTION_MENU
     */
    const handleDragStart = useCallback(({ active }) => {
        var _a, _b, _c;
        if (active.id === INTERACTION_GRID_COLUMN.SEARCH_OPTION_MENU) {
            setActiveItem(null);
            return;
        }
        // Find which container currently holds the active dragged item
        const container = (_c = (_b = (_a = active === null || active === void 0 ? void 0 : active.data) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.sortable) === null || _c === void 0 ? void 0 : _c.containerId;
        const item = container === ColumnGroup.Selected
            ? selected.find((i) => i.field === active.id)
            : nonSelected.find((i) => i.field === active.id);
        setActiveItem(item !== null && item !== void 0 ? item : null);
    }, [selected, nonSelected]);
    /**
     * Handles drag over for real-time container switching.
     * @param event - Drag over event
     * @example
     * ```
     * handleDragOver({ active: { id: 'age' }, over: { id: 'selected' } });
     * ```
     * Moves 'age' from non-selected to selected container in real-time
     */
    const handleDragOver = useCallback(({ active, over }) => {
        var _a, _b, _c, _d, _e, _f;
        if (!over)
            return;
        /*
         * Determine which container (Selected or NonSelected) currently holds the dragged item (active)
         * and the container under the drop target (over). These values are used to decide whether the item
         * should be reordered within the same container or moved between containers.
         */
        const activeContainer = (_c = (_b = (_a = active === null || active === void 0 ? void 0 : active.data) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.sortable) === null || _c === void 0 ? void 0 : _c.containerId;
        const overContainer = (_f = (_e = (_d = over === null || over === void 0 ? void 0 : over.data) === null || _d === void 0 ? void 0 : _d.current) === null || _e === void 0 ? void 0 : _e.sortable) === null || _f === void 0 ? void 0 : _f.containerId;
        if (!activeContainer || !overContainer || activeContainer === overContainer)
            return;
        const moved = moveItemBetweenContainers(active.id, activeContainer, overContainer, { selected, nonSelected }, over.id);
        setSelected(moved.selected);
        setNonSelected(moved.nonSelected);
    }, [selected, nonSelected]);
    /**
     * Handles drag end, updating column order or moving between containers.
     * @param event - Drag end event
     * @example
     * ```
     * handleDragEnd({ active: { id: 'name' }, over: { id: 'age' } });
     * ```
     * Reorders 'name' before 'age' in selected container or moves between containers, applying constraints
     */
    const handleDragEnd = useCallback(({ active, over }) => {
        var _a, _b, _c, _d, _e, _f;
        if (!over) {
            setActiveItem(null);
            return;
        }
        /*
         * Determine which container (Selected or NonSelected) currently holds the dragged item (active)
         * and the container under the drop target (over). These values are used to decide whether the item
         * should be reordered within the same container or moved between containers.
         */
        const activeContainer = (_c = (_b = (_a = active === null || active === void 0 ? void 0 : active.data) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.sortable) === null || _c === void 0 ? void 0 : _c.containerId;
        const overContainer = (_f = (_e = (_d = over === null || over === void 0 ? void 0 : over.data) === null || _d === void 0 ? void 0 : _d.current) === null || _e === void 0 ? void 0 : _e.sortable) === null || _f === void 0 ? void 0 : _f.containerId;
        const destinationContainer = overContainer || (over.id === ColumnGroup.Selected || over.id === ColumnGroup.NonSelected ? over.id : null);
        if (!activeContainer || !destinationContainer) {
            setActiveItem(null);
            return;
        }
        let newState = { selected: [...selected], nonSelected: [...nonSelected] };
        if (activeContainer === destinationContainer) {
            const currentList = activeContainer === ColumnGroup.Selected ? newState.selected : newState.nonSelected;
            const result = moveItemWithinContainer(active.id, over.id, currentList);
            if (!result) {
                setActiveItem(null);
                return;
            }
            if (activeContainer === ColumnGroup.Selected)
                newState.selected = result;
            else
                newState.nonSelected = result;
        }
        else {
            newState = moveItemBetweenContainers(active.id, activeContainer, destinationContainer, newState, over.id);
        }
        updateColumns(newState, active);
        setActiveItem(null);
    }, [selected, nonSelected, updateColumns]);
    return {
        selected,
        nonSelected,
        activeItem,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
        setSelected,
        setNonSelected,
    };
}
/**
 * A wrapper component for handling drag-and-drop between selected and non-selected columns.
 *
 * @param props - Component props
 * @param Columns - Initial column definitions
 * @returns JSX.Element
 * @example
 * ```
 * const columns = [
 *   { field: 'name', headerName: 'Name', hide: false },
 *   { field: 'age', headerName: 'Age', hide: true },
 * ];
 * <CcfDraggableContainer Columns={columns} />
 * ```
 */
export default function CcfDigitalSearchDraggableContainer({ Columns }) {
    var _a, _b;
    const activeTab = useSelector(getActiveSearchTab);
    const [translate] = useTranslator();
    const minimum = useSelector(getNumberOfVisibleColumns);
    const liveRegionId = useUniqueId('DndLiveRegionForMovedItems');
    const { announce, announcement } = useAnnouncement();
    const initialState = {
        selected: (_a = Columns === null || Columns === void 0 ? void 0 : Columns.filter((column) => !column.hide)) !== null && _a !== void 0 ? _a : [],
        nonSelected: (_b = Columns === null || Columns === void 0 ? void 0 : Columns.filter((column) => column.hide)) !== null && _b !== void 0 ? _b : [],
    };
    const rules = { minimum, activeTab };
    const theme = useTheme();
    const styles = useMemo(() => CcfDigitalSearchDraggableStyles(theme), [theme]);
    /**
     * Custom keyboard handler for Dnd-kit to support JAWS.
     * Allows 'U' and 'D' keys for vertical movement.
     * Skips movement for specific conditions (e.g., SEARCH_OPTION_MENU)
     * @param event - The KeyboardEvent.
     * @param context - The Dnd-kit sensor context.
     * @returns A Coordinate object or `undefined` to use default behavior.
     * @example
     * ```
     * const sensors = useSensors(
     * useSensor(KeyboardSensor, {
     * coordinateGetter: customKeyboardCoordinates,
     * })
     * );
     * ```
     */
    const customKeyboardCoordinates = (event, context) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const overData = (_d = (_c = (_b = (_a = context === null || context === void 0 ? void 0 : context.context) === null || _a === void 0 ? void 0 : _a.over) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.current) === null || _d === void 0 ? void 0 : _d.sortable;
        const activeData = (_h = (_g = (_f = (_e = context === null || context === void 0 ? void 0 : context.context) === null || _e === void 0 ? void 0 : _e.active) === null || _f === void 0 ? void 0 : _f.data) === null || _g === void 0 ? void 0 : _g.current) === null || _h === void 0 ? void 0 : _h.sortable;
        const indexActive = overData === null || overData === void 0 ? void 0 : overData.index;
        const activeContainerId = overData === null || overData === void 0 ? void 0 : overData.containerId;
        // Prevent moving up when already at the first item in Selected container
        if (indexActive === 0 &&
            activeContainerId === ColumnGroup.Selected &&
            (event.code === EventKeys.KEY_U || event.code === EventKeys.ARROW_UP)) {
            const items = activeData === null || activeData === void 0 ? void 0 : activeData.items;
            if (items === null || items === void 0 ? void 0 : items.includes(INTERACTION_GRID_COLUMN.SEARCH_OPTION_MENU)) {
                return; // Stop keyboard movement
            }
        }
        switch (event.code) {
            case EventKeys.ENTER:
            case EventKeys.SPACE:
                // Default sortable behavior for Enter/Space
                return sortableKeyboardCoordinates(event, context);
            case EventKeys.KEY_U:
                // Treat KeyU as ArrowUp
                return sortableKeyboardCoordinates(new KeyboardEvent('keydown', { code: EventKeys.ARROW_UP }), context);
            case EventKeys.KEY_D:
                // Treat KeyD as ArrowDown
                return sortableKeyboardCoordinates(new KeyboardEvent('keydown', { code: EventKeys.ARROW_DOWN }), context);
            default:
                // Fallback to default behavior
                return sortableKeyboardCoordinates(event, context);
        }
    };
    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {
        coordinateGetter: customKeyboardCoordinates,
    }));
    const { selected, nonSelected, activeItem, handleDragStart, handleDragOver, handleDragEnd, setSelected, setNonSelected, } = useDragAndDrop(initialState, rules, { announce, translate });
    const { moveItem, moveItemToOtherContainer } = useItemMovement(setSelected, setNonSelected, { selected, nonSelected }, rules, { announce, translate });
    const screenReaderInstructions = {
        draggable: translate('dndScreenReaderInstruction'),
    };
    /**
     * Accessibility announcements for screen readers (NVDA/JAWS).
     * These strings are injected into an aria-live region by `dnd-kit`
     * whenever drag events occur, enabling assistive technology users
     * to understand the drag-and-drop interactions in real time.
     * @example
     * ```
     * <DndContext accessibility={{ announcements }}>
     * </DndContext>
     * ```
     */
    const announcements = {
        /**
         * Triggered when a drag operation begins.
         * @param active - The currently active draggable item.
         * @returns A string message to be announced by the screen reader.
         * @example
         * "Picked up item name. It is in position 2 of 5 in selected columns."
         */
        onDragStart({ active }) {
            const info = getDragAnnouncement(active, null);
            if (!info)
                return translate('dndPickUpItem', { format: [active.id] });
            return translate('dndDragStart', { format: [info === null || info === void 0 ? void 0 : info.headerName, info === null || info === void 0 ? void 0 : info.position, info === null || info === void 0 ? void 0 : info.total, info === null || info === void 0 ? void 0 : info.container] });
        },
        /**
         * Triggered when the dragged item is moved over another item or container.
         * @param active - The currently dragged item.
         * @param over - The item or container that is currently being hovered.
         * @returns A string message to be announced by the screen reader.
         * @example
         * "Item name was moved into position 3 of 6 in non-selected columns."
         */
        onDragOver({ active, over }) {
            if (!over)
                return;
            const info = getDragAnnouncement(active, over);
            if (!info)
                return;
            return translate('dndDragOver', { format: [info === null || info === void 0 ? void 0 : info.headerName, info === null || info === void 0 ? void 0 : info.position, info === null || info === void 0 ? void 0 : info.total, info === null || info === void 0 ? void 0 : info.container] });
        },
        /**
         * Triggered when the drag operation completes successfully.
         * @param active - The dragged item.
         * @param over - The item or container where the dragged item was dropped.
         * @returns Empty string.
         * @example
         * "Item age was dropped at position 4 of 7 in selected columns."
         */
        onDragEnd() {
            // Intentional empty announcement: announcement is handled in useDragAndDrop after constraints are applied
            return '';
        },
        /**
         * Triggered when the drag operation is cancelled without dropping.
         * @param active - The item that was being dragged.
         * @returns A string message to be announced by the screen reader.
         * @example
         * "Dragging was cancelled. Item name was dropped."
         */
        onDragCancel({ active }) {
            return translate('dndDragCancel', { format: [active.id] });
        },
    };
    return (_jsxs(DndContext, Object.assign({ sensors: sensors, collisionDetection: closestCorners, onDragStart: handleDragStart, onDragOver: handleDragOver, onDragEnd: handleDragEnd, accessibility: { announcements, screenReaderInstructions } }, { children: [_jsxs(Box, Object.assign({ sx: styles.containerBox }, { children: [_jsx(SortableContainer, { id: ColumnGroup.Selected, items: selected, label: translate('selectedColumns'), moveItem: moveItem, moveItemToOtherContainer: moveItemToOtherContainer }), _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH, sx: styles.divider }), _jsx(SortableContainer, { id: ColumnGroup.NonSelected, items: nonSelected, label: translate('nonSelectedColumns'), moveItem: moveItem, moveItemToOtherContainer: moveItemToOtherContainer })] })), _jsx(DragOverlay, { children: _jsx(DragOverlayContent, { activeItem: activeItem, styles: styles }) }), _jsx(LiveRegion, { id: liveRegionId, announcement: announcement })] })));
}
//# sourceMappingURL=ccf-digital-search-draggable-container.js.map