import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CcfCloseIcon, useTranslator, CcfDivider, DividerOrientation, DividerVariant, CcfTooltip, CcfTypography, CcfMenuPinIcon, CcfButton, } from '@nice-devone/ui-controls';
import { Box, useTheme, useMediaQuery, ListSubheader } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DndContext, closestCorners, useSensor, useSensors, PointerSensor, KeyboardSensor, DragOverlay, } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { LiveRegion, useAnnouncement } from '@dnd-kit/accessibility';
import { useUniqueId } from '@dnd-kit/utilities';
import { EventKeys, IconVariant } from '@nice-devone/common-sdk';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { Navigation } from '../../enums/navigation-menus';
import { getSelectedMenuName, getQuickAppNavigationItems, globalActions, getPanelAppNavigationItems, updateExternalProdURL, getPinnedMenuItem, } from '../global.app.slice';
import { useNavigationItems } from '../ccf-navigation/useNavigationItems';
import { updateAppSpaceTabStatus, selectAppSpaceActiveTabStatus } from '../ccf-app-space/ccf-app-space.slice';
import { CcfAssignmentAction, selectInboxCollapsedState } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfDigitalSearchStyle from '../ccf-app-space/ccf-digital-search/ccf-digital-search-styles';
import CcfDigitalSearchDraggableStyles from '../ccf-app-space/ccf-digital-search/ccf-digital-search-draggable/ccf-digital-search-draggable-styles';
import CcfDraggableOverlayItem from './ccf-drag-drop-helpers/ccf-draggable-overlayItem';
import CcfSharedSortableContainer from './ccf-drag-drop-helpers/ccf-shared-sortable-container';
import CcfSharedSortableItem from './ccf-drag-drop-helpers/ccf-shared-sortable-item';
/**
 * Defines the unique IDs for all droppable containers in the hamburger menu.
 */
export var DroppableId;
(function (DroppableId) {
    /** Droppable area for contact-specific apps */
    DroppableId["CONTACT_SPECIFIC_MENUS"] = "droppable-1";
    /** Droppable area for visible set of global apps */
    DroppableId["VISIBLE_GLOBAL_MENUS"] = "droppable-2";
    /** Droppable area for non-visible set of global apps */
    DroppableId["HIDDEN_GLOBAL_MENUS"] = "droppable-3";
})(DroppableId || (DroppableId = {}));
const GLOBAL_MENU_LIMIT = 8;
/**
 * Possible actions that triggered an item move in the draggable menu.
 */
export var DragAction;
(function (DragAction) {
    /** User dragged the item with mouse or touch */
    DragAction["DRAG"] = "Drag";
    /** User pressed Arrow Up key */
    DragAction["ARROW_Up"] = "ArrowUp";
    /** User pressed Arrow Down key */
    DragAction["ARROW_DOWN"] = "ArrowDown";
    /** User toggled pin icon (pin or unpin) */
    DragAction["PIN_TOGGLE"] = "PinToggle";
})(DragAction || (DragAction = {}));
/**
 * Groups navigation items into contact, visible global, and hidden global sets.
 *
 * @param navigationItemsLS - List of navigation items.
 * @returns Grouped navigation items.
 *
 * @example
 * ```
 * const { contact, visibleGlobal, hiddenGlobal } = useGroupedNavigation(items);
 * ```
 */
function useGroupedNavigation(navigationItemsLS) {
    return useMemo(() => {
        const items = navigationItemsLS !== null && navigationItemsLS !== void 0 ? navigationItemsLS : [];
        const contact = items.filter((i) => i.contactApp && !i.isHidden);
        const global = items.filter((i) => !i.contactApp && i.menuName !== Navigation.INTERACTION && !i.isHidden);
        const visibleGlobal = global.slice(0, GLOBAL_MENU_LIMIT);
        const hiddenGlobal = global.length > GLOBAL_MENU_LIMIT ? global.slice(GLOBAL_MENU_LIMIT) : [];
        return { contact, visibleGlobal, hiddenGlobal };
    }, [navigationItemsLS]);
}
/**
 * Returns the list of items for a given droppable area.
 *
 * @param droppableId - Target droppable zone identifier.
 * @param groups - Grouped navigation items.
 * @returns Items belonging to the specified droppable zone.
 *
 * @example
 * const items = getDroppableItems(DroppableId.VISIBLE_GLOBAL_MENUS, groups);
 */
const getDroppableItems = (droppableId, groups) => {
    switch (droppableId) {
        case DroppableId.CONTACT_SPECIFIC_MENUS:
            return groups.contact;
        case DroppableId.VISIBLE_GLOBAL_MENUS:
            return groups.visibleGlobal;
        case DroppableId.HIDDEN_GLOBAL_MENUS:
            return groups.hiddenGlobal;
        default:
            return [];
    }
};
/**
 * Extracts structured drag information from dnd-kit `active` and `over` items.
 * Handles special logic for `CONTACT_SPECIFIC_MENUS` when entering/leaving that container.
 * @param active - The currently dragged item.
 * @param over - The item being dragged over (may be null during drag start).
 * @returns Drag metadata including name, container, position, and container length.
 * @example
 * ```
 * const info = extractFromDraggable(active, over);
 * ```
 */
export function extractFromDraggable(active, over) {
    var _a, _b, _c;
    const activeData = (_a = active === null || active === void 0 ? void 0 : active.data) === null || _a === void 0 ? void 0 : _a.current;
    const overData = (_b = over === null || over === void 0 ? void 0 : over.data) === null || _b === void 0 ? void 0 : _b.current;
    const activeSortable = activeData === null || activeData === void 0 ? void 0 : activeData.sortable;
    const overSortable = overData === null || overData === void 0 ? void 0 : overData.sortable;
    const activeName = (_c = activeData === null || activeData === void 0 ? void 0 : activeData.column) === null || _c === void 0 ? void 0 : _c.tooltip;
    const activeContainer = activeSortable === null || activeSortable === void 0 ? void 0 : activeSortable.containerId;
    const overContainer = overSortable === null || overSortable === void 0 ? void 0 : overSortable.containerId;
    /**
     * Creates drag metadata for a container.
     *
     * @example
     * build("selected", sortableData);
     */
    const build = (container, sortableData) => {
        var _a, _b, _c, _d;
        return ({
            name: activeName,
            container,
            position: ((_a = sortableData === null || sortableData === void 0 ? void 0 : sortableData.sortable) === null || _a === void 0 ? void 0 : _a.index) + 1,
            containerLength: (_d = (_c = (_b = sortableData === null || sortableData === void 0 ? void 0 : sortableData.sortable) === null || _b === void 0 ? void 0 : _b.items) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0,
        });
    };
    // No dragOver → use active values
    if (!overData) {
        return build(activeContainer, activeData);
    }
    const SPECIAL = DroppableId.CONTACT_SPECIFIC_MENUS;
    const movingIntoSpecial = activeContainer !== SPECIAL && overContainer === SPECIAL;
    const movingOutOfSpecial = activeContainer === SPECIAL && overContainer !== SPECIAL;
    // ONLY block announcements when crossing the CONTACT_SPECIFIC boundary
    if (movingIntoSpecial || movingOutOfSpecial) {
        return build(activeContainer, activeData);
    }
    // Normal drag (including reorder inside CONTACT_SPECIFIC_MENUS)
    return build(overContainer, overData);
}
/**
 * Returns a translated container name for the given droppable ID.
 *
 * @example
 * const name = getContainerName(DroppableId.CONTACT_SPECIFIC_MENUS, translate);
 */
export function getContainerName(containerId, translate) {
    const keyMap = {
        [DroppableId.CONTACT_SPECIFIC_MENUS]: 'contactSpecificApps',
        [DroppableId.VISIBLE_GLOBAL_MENUS]: 'visibleGlobalApps',
        [DroppableId.HIDDEN_GLOBAL_MENUS]: 'HiddenGlobalApps',
    };
    if (!containerId)
        return '';
    return translate(keyMap[containerId]);
}
/**
 * CcfHamburgerDraggableMenu — Main hamburger menu component with drag & drop reordering.
 *
 * Features:
 * - Built using dnd-kit SortableContext
 * - Supports keyboard reordering (arrow buttons)
 * - Includes pin/unpin controls
 * - Divides items into contact-specific and global app groups
 *
 * @example
 * ```tsx
 * <CcfHamburgerDraggableMenu
 *   isDrawerOpen={drawerOpen}
 *   toggleDrawer={setDrawerOpen}
 *   isAppSpaceMenu={false}
 *   helpUrl="https://help.nice.com"
 * />
 * ```
 */
export const CcfHamburgerDraggableMenu = (props) => {
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const theme = useTheme();
    const selectedMenu = useSelector(getSelectedMenuName);
    const selectedMenuAppSpace = useSelector(selectAppSpaceActiveTabStatus);
    const { isAppSpaceMenu } = props;
    const quickAppNavigationItems = useSelector(getQuickAppNavigationItems);
    const panelAppNavigationItems = useSelector(getPanelAppNavigationItems);
    const isInboxCollapsed = useSelector(selectInboxCollapsedState);
    const navigationItemsLS = isAppSpaceMenu ? panelAppNavigationItems : quickAppNavigationItems;
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
    const navigationItemList = useNavigationItems(isAppSpaceMenu, true);
    const { setSelectedMenu, reArrangeMenu, setPinnedMenuItem } = globalActions;
    const liveRegionId = useUniqueId('DndLiveRegionForMovedItems');
    const { announce, announcement } = useAnnouncement();
    const dndDigitalstyles = CcfDigitalSearchStyle(theme);
    const draggableStyles = CcfDigitalSearchDraggableStyles(theme);
    const pinnedMenuItem = useSelector(getPinnedMenuItem);
    const [hoveredItemName, setHoveredItemName] = useState('');
    const [activeItem, setActiveItem] = useState(null);
    const lastMovedItemId = useRef({
        activeId: null,
        dragAction: DragAction.DRAG, // default action
    });
    // Build initial groups from Redux / LS
    const groupsFromStore = useGroupedNavigation(navigationItemsLS);
    // Local copy used during drag so collision works across containers
    const [groups, setGroups] = useState(groupsFromStore);
    const { contactSpecificMenus, visibleGlobalMenus, hiddenGlobalMenus, } = useMemo(() => ({
        contactSpecificMenus: groups.contact,
        visibleGlobalMenus: groups.visibleGlobal,
        hiddenGlobalMenus: groups.hiddenGlobal,
    }), [groups.contact, groups.visibleGlobal, groups.hiddenGlobal]);
    const dragSource = useRef(null);
    useEffect(() => {
        // Sync when Redux changes (e.g., after save)
        setGroups(groupsFromStore);
    }, [groupsFromStore]);
    useEffect(() => {
        const pinnedMenuItemLS = LocalStorageHelper.getItem(StorageKeys.PINNED_MENU_ITEM);
        dispatch(setPinnedMenuItem(pinnedMenuItemLS !== null && pinnedMenuItemLS !== void 0 ? pinnedMenuItemLS : ''));
    }, [dispatch, setPinnedMenuItem]);
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
        /**
         * Safely overrides writable/configurable properties of a KeyboardEvent.
         * @example
         * ```ts
         * const updatedEvent = applyEventOverrides(event, { key: 'ArrowUp', code: 'ArrowUp' });
         * ```
         */
        const applyEventOverrides = (originalEvent, overrides) => {
            for (const [property, newValue] of Object.entries(overrides)) {
                const descriptor = Object.getOwnPropertyDescriptor(originalEvent, property);
                if (!descriptor || descriptor.writable || descriptor.configurable) {
                    Object.defineProperty(originalEvent, property, { value: newValue });
                }
            }
            return originalEvent;
        };
        // Mapping custom key events to arrow key equivalents
        const customKeyToArrowMap = {
            [EventKeys.KEY_U]: {
                code: EventKeys.ARROW_UP,
                key: EventKeys.ARROW_UP,
            },
            [EventKeys.KEY_D]: {
                code: EventKeys.ARROW_DOWN,
                key: EventKeys.ARROW_DOWN,
            },
        };
        const mappedArrowKeys = customKeyToArrowMap[event.code];
        if (mappedArrowKeys) {
            const updatedEvent = applyEventOverrides(event, mappedArrowKeys);
            return sortableKeyboardCoordinates(updatedEvent, context);
        }
        return sortableKeyboardCoordinates(event, context);
    };
    // Sensors
    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {
        coordinateGetter: customKeyboardCoordinates,
    }));
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
        onDragStart() {
            // Intentional empty announcement: announcement is handled in onDragOver
            return '';
        },
        /**
         * Triggered when the dragged item is moved over another item or container.
         * @param active - The currently dragged item.
         * @param over - The item or container that is currently being hovered.
         * @returns A string message to be announced by the screen reader.
         * @example
         * "Item Launch was moved into position 2 of 5 in droppable-3 columns"
         */
        onDragOver({ active, over }) {
            var _a, _b, _c;
            if (!over)
                return;
            const dragInfo = extractFromDraggable(active, over);
            const activeIdName = ((_c = (_b = (_a = active === null || active === void 0 ? void 0 : active.data) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.column) === null || _c === void 0 ? void 0 : _c.tooltip) || active.id;
            if (!dragInfo)
                return translate('dndPickUpItem', { format: [active.id] });
            const containerName = getContainerName(dragInfo === null || dragInfo === void 0 ? void 0 : dragInfo.container, translate);
            return translate('dndDragOver', { format: [activeIdName, dragInfo === null || dragInfo === void 0 ? void 0 : dragInfo.position, dragInfo === null || dragInfo === void 0 ? void 0 : dragInfo.containerLength, containerName] });
        },
        /**
         * Triggered when the drag operation completes successfully.
         * @param active - The dragged item.
         * @param over - The item or container where the dragged item was dropped.
         * @returns Empty string.
         * @example
         * "Item Launch was dropped at position 2 of 8 in droppable-2 columns"
         */
        onDragEnd({ active, over }) {
            var _a, _b, _c;
            if (!over)
                return;
            const dragInfo = extractFromDraggable(active, over);
            const activeIdName = ((_c = (_b = (_a = active === null || active === void 0 ? void 0 : active.data) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.column) === null || _c === void 0 ? void 0 : _c.tooltip) || active.id;
            if (!dragInfo)
                return translate('dndPickUpItem', { format: [active.id] });
            const containerName = getContainerName(dragInfo === null || dragInfo === void 0 ? void 0 : dragInfo.container, translate);
            return translate('dndDragEnd', { format: [activeIdName, dragInfo === null || dragInfo === void 0 ? void 0 : dragInfo.position, dragInfo === null || dragInfo === void 0 ? void 0 : dragInfo.containerLength, containerName] });
        },
        /**
         * Triggered when the drag operation is cancelled without dropping.
         * @param active - The item that was being dragged.
         * @returns A string message to be announced by the screen reader.
         * @example
         * "Dragging was cancelled. Item name was dropped."
         */
        onDragCancel({ active }) {
            var _a, _b, _c;
            const activeIdName = ((_c = (_b = (_a = active === null || active === void 0 ? void 0 : active.data) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.column) === null || _c === void 0 ? void 0 : _c.tooltip) || active.id;
            return translate('dndDragCancel', { format: [activeIdName] });
        },
    };
    /**
     * Handles navigation menu selection or help redirection.
     * Updates Redux state and closes the drawer.
     * @param name - Menu name
     * @param toggleDrawer - Function to toggle drawer state
     * @example
     * ```
     * setMenu(Navigation.DASHBOARD, toggleDrawer);
     * ```
     */
    const setMenu = useCallback((name, toggleDrawer) => {
        if (!isInboxCollapsed && isBelowMd) {
            dispatch(CcfAssignmentAction.updateInboxCollapsed({ isInboxCollapsed: true, isLargeView: false }));
        }
        if (name === Navigation.HELP) {
            // helpUrl may be undefined — guard
            if (props.helpUrl)
                window.open(props.helpUrl, '_blank', 'noopener noreferrer');
            toggleDrawer(false);
            return;
        }
        // Launch handled by popover
        if (name === Navigation.LAUNCH)
            return;
        if (isAppSpaceMenu) {
            const activeTabApp = panelAppNavigationItems === null || panelAppNavigationItems === void 0 ? void 0 : panelAppNavigationItems.find((tab) => tab.menuName === name);
            if (activeTabApp) {
                dispatch(updateAppSpaceTabStatus({ index: activeTabApp.menuName, tab: activeTabApp.menuName }));
            }
            updateExternalProdURL(name, null, null);
        }
        else {
            updateExternalProdURL(null, name, null);
            dispatch(setSelectedMenu({ name }));
        }
        toggleDrawer(false);
    }, [dispatch, isAppSpaceMenu, isBelowMd, panelAppNavigationItems, props.helpUrl, setSelectedMenu, isInboxCollapsed]);
    /**
     * Handles DnD start event.
     * Stores the source droppable container ID.
     * @param event - DragStartEvent from dnd-kit
     * @example
     * ```
     * onDragStart(event);
     * ```
     */
    const onDragStart = useCallback((event) => {
        var _a, _b, _c;
        const activeData = (_b = (_a = event.active) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.current;
        if (!activeData)
            return;
        // Set active item
        setActiveItem(activeData.column || null);
        lastMovedItemId.current = null;
        const containerId = (_c = activeData.sortable) === null || _c === void 0 ? void 0 : _c.containerId;
        if (!containerId)
            return;
        const items = getDroppableItems(containerId, groups);
        if (!Array.isArray(items))
            return;
        const itemIndex = items.findIndex((m) => m.menuName === event.active.id);
        if (itemIndex === -1)
            return;
        dragSource.current = event.active;
    }, [groups]);
    /**
     * Handles drag over for real-time container switching.
     * @param event - Drag over event
     * @example
     * ```
     * onDragOver({ active: { id: 'age' }, over: { id: 'selected' } });
     * ```
     * Moves 'age' from non-selected to selected container in real-time
     */
    const onDragOver = useCallback((event) => {
        var _a, _b, _c;
        const { active, over } = event;
        if (!over)
            return;
        const activeData = active.data.current;
        const overData = over.data.current;
        const activeId = String(active.id);
        const overId = String(over.id);
        const activeContainer = (_a = activeData === null || activeData === void 0 ? void 0 : activeData.sortable) === null || _a === void 0 ? void 0 : _a.containerId;
        const overContainer = (_c = (_b = overData === null || overData === void 0 ? void 0 : overData.sortable) === null || _b === void 0 ? void 0 : _b.containerId) !== null && _c !== void 0 ? _c : overId;
        if (!activeContainer || !overContainer)
            return;
        if (activeContainer === overContainer)
            return; // same container → ignore
        const activeItems = getDroppableItems(activeContainer, groups);
        const overItems = getDroppableItems(overContainer, groups);
        const fromIndex = activeItems.findIndex((m) => m.menuName === activeId);
        if (fromIndex === -1)
            return;
        const toIndex = overItems.findIndex((m) => m.menuName === overId);
        const safeToIndex = toIndex === -1 ? 0 : toIndex;
        setGroups((prev) => {
            // shallow copy for over collison
            const copy = {
                contact: [...prev.contact],
                visibleGlobal: [...prev.visibleGlobal],
                hiddenGlobal: [...prev.hiddenGlobal],
            };
            const fromArr = getDroppableItems(activeContainer, copy);
            const toArr = getDroppableItems(overContainer, copy);
            const [moved] = fromArr.splice(fromIndex, 1);
            toArr.splice(safeToIndex, 0, moved);
            return copy;
        });
        setHoveredItemName(overId.replace('draggable-', ''));
    }, [groups]);
    /**
     * Handles DnD start event.
     * Stores the source droppable container ID.
     * @param event - DragEndEvent from dnd-kit
     * @example
     * ```
     * onDragEnd(event);
     * ```
     */
    const onDragEnd = useCallback((event) => {
        var _a, _b;
        const { active, over } = event;
        if (!active || !over || !dragSource.current) {
            setActiveItem(null);
            dragSource.current = null;
            return;
        }
        const overData = over.data.current;
        const overId = String(over.id);
        const overContainer = (_a = overData === null || overData === void 0 ? void 0 : overData.sortable) === null || _a === void 0 ? void 0 : _a.containerId;
        if (!overContainer) {
            setActiveItem(null);
            dragSource.current = null;
            return;
        }
        // Extract source details (from dragStart)
        const srcData = dragSource.current.data.current;
        const srcContainer = srcData === null || srcData === void 0 ? void 0 : srcData.containerId;
        const srcIndex = (_b = srcData === null || srcData === void 0 ? void 0 : srcData.sortable) === null || _b === void 0 ? void 0 : _b.index;
        // Get destination items
        const destItems = getDroppableItems(overContainer, groups);
        if (!Array.isArray(destItems)) {
            setActiveItem(null);
            dragSource.current = null;
            return;
        }
        // Find intended destination position
        let destIndex = destItems.findIndex((m) => m.menuName === overId);
        // Adjust index when dragging across containers into HIDDEN_GLOBAL_MENUS
        const isCrossContainerDrag = overContainer !== srcContainer;
        if (isCrossContainerDrag && overContainer === DroppableId.HIDDEN_GLOBAL_MENUS) {
            destIndex -= 1;
        }
        if (destIndex < 0) {
            setActiveItem(null);
            dragSource.current = null;
            return;
        }
        const navigationItemsLSLocal = LocalStorageHelper.getItem(StorageKeys.CXONE_NAVIGATION_ITEMS, true);
        dispatch(reArrangeMenu({
            src: { droppableId: srcContainer, index: srcIndex },
            dest: { droppableId: overContainer, index: destIndex },
            isAppSpaceMenu: isAppSpaceMenu,
            navigationItemsLS: navigationItemsLSLocal,
            contactSpecificAppsCount: contactSpecificMenus,
            navigationItemList: navigationItemList,
        }));
        setActiveItem(null);
        lastMovedItemId.current = { activeId: active.id, dragAction: DragAction.DRAG };
        dragSource.current = null;
    }, [dispatch, dragSource, groups, isAppSpaceMenu, navigationItemList]);
    /**
     * Handles pin/unpin action for a menu item.
     * Updates Redux state and stops event propagation.
     * @param menuName - Menu name to pin/unpin
     * @example
     * ```
     * PinMenuItemHandler(Navigation.DASHBOARD);
     * ```
     */
    const PinMenuItemHandler = useCallback((menuName) => (event) => {
        if (menuName === pinnedMenuItem) {
            dispatch(setPinnedMenuItem(''));
        }
        else {
            dispatch(setPinnedMenuItem(menuName));
        }
        event.stopPropagation();
        // Putting focus on PinIcon
        lastMovedItemId.current = {
            activeId: menuName,
            dragAction: DragAction.PIN_TOGGLE,
        };
    }, [dispatch, pinnedMenuItem, setPinnedMenuItem]);
    const pinIcon = useCallback((menuName, tooltip, isActive) => {
        const isDisabled = !isActive;
        const isPinned = pinnedMenuItem === menuName;
        const isHovered = hoveredItemName === menuName;
        return (_jsx(CcfTooltip, Object.assign({ title: `${isPinned ? translate('unpin') : translate('pin')} ${tooltip}`, arrow: true }, { children: _jsx(Box, Object.assign({ component: "span" }, { children: _jsx(CcfButton, Object.assign({ sx: Object.assign(Object.assign(Object.assign({}, draggableStyles.plainButton), draggableStyles.pinIcon), draggableStyles.iconFocus), "aria-disabled": isDisabled, "data-testid": `pin-icon-${menuName}`, disableRipple: true, "data-role": DragAction.PIN_TOGGLE, onClick: PinMenuItemHandler(menuName), className: isHovered ? 'hoveredMenu' : 'menuItem', id: isPinned ? 'pinnedIcon' : 'unpinnedIcon', "aria-label": `${isPinned ? translate('unpin') : translate('pin')} ${tooltip}` }, { children: isPinned ? (_jsx(CcfMenuPinIcon, { variant: IconVariant.Filled, fontSize: "small", "data-testid": "pin-icon" })) : (_jsx(CcfMenuPinIcon, { fontSize: "small", "data-testid": "pin-menu-item" })) })) })) })));
    }, [PinMenuItemHandler, draggableStyles, hoveredItemName, pinnedMenuItem, translate]);
    /**
   * Handles selection of a navigation menu item.
   * Updates the current menu state and optionally closes the drawer.
   *
   * @param menuName - The name of the menu item to select
   */
    const onSelectMenu = useCallback((menuName) => {
        setMenu(menuName, props.toggleDrawer);
    }, [setMenu, props.toggleDrawer]);
    /**
     * Handles moving the menu item up or down within its container.
     *  @param direction - 'ArrowUp' to move item up, 'ArrowDown' to move item down
     * @example
     * ```
     * moveItem('ArrowUp');
     * ```
     */
    const moveItem = (direction, containerId, containerItems, item) => {
        //event.stopPropagation();
        const currentIndex = containerItems.findIndex((menu) => menu.menuName === item.menuName);
        if (currentIndex === -1)
            return;
        let targetContainerId = null;
        let targetIndex = null;
        // BLOCK ALL MOVEMENT involving CONTACT_SPECIFIC_MENUS
        if (containerId === DroppableId.CONTACT_SPECIFIC_MENUS) {
            // Contact apps can only move within themselves
            if (direction === EventKeys.ARROW_UP && currentIndex > 0) {
                targetContainerId = containerId;
                targetIndex = currentIndex - 1;
            }
            else if (direction === EventKeys.ARROW_DOWN && currentIndex < containerItems.length - 1) {
                targetContainerId = containerId;
                targetIndex = currentIndex + 1;
            }
            // Otherwise: do nothing (can't escape!)
        }
        else if (containerId === DroppableId.VISIBLE_GLOBAL_MENUS) {
            // Can move within visible, or down to hidden
            if (direction === EventKeys.ARROW_UP && currentIndex > 0) {
                targetContainerId = containerId;
                targetIndex = currentIndex - 1;
            }
            else if (direction === EventKeys.ARROW_DOWN) {
                if (currentIndex < containerItems.length - 1) {
                    targetContainerId = containerId;
                    targetIndex = currentIndex + 1;
                }
                else if (hiddenGlobalMenus.length > 0) {
                    // Move to top of hidden section
                    targetContainerId = DroppableId.HIDDEN_GLOBAL_MENUS;
                    targetIndex = 0;
                }
            }
        }
        else if (containerId === DroppableId.HIDDEN_GLOBAL_MENUS) {
            // Can move within hidden, or up to visible
            if (direction === EventKeys.ARROW_DOWN && currentIndex < containerItems.length - 1) {
                targetContainerId = containerId;
                targetIndex = currentIndex + 1;
            }
            else if (direction === EventKeys.ARROW_UP) {
                if (currentIndex > 0) {
                    targetContainerId = containerId;
                    targetIndex = currentIndex - 1;
                }
                else if (visibleGlobalMenus.length > 0) {
                    // Move to bottom of visible section
                    targetContainerId = DroppableId.VISIBLE_GLOBAL_MENUS;
                    targetIndex = visibleGlobalMenus.length - 1;
                }
            }
        }
        // If no valid move, exit
        if (targetContainerId === null || targetIndex === null)
            return;
        const navigationItemsLSLocal = LocalStorageHelper.getItem(StorageKeys.CXONE_NAVIGATION_ITEMS, true);
        dispatch(reArrangeMenu({
            src: { droppableId: containerId, index: currentIndex },
            dest: { droppableId: targetContainerId, index: targetIndex },
            isAppSpaceMenu: isAppSpaceMenu,
            navigationItemsLS: navigationItemsLSLocal,
            contactSpecificAppsCount: contactSpecificMenus,
            navigationItemList,
        }));
        // After moving, announce the action
        let destcontainerLength = containerItems.length;
        // If moving to first or last position, use group container length
        const isEdge = currentIndex === 0 || currentIndex === containerItems.length - 1;
        if (isEdge) {
            destcontainerLength =
                targetContainerId === DroppableId.VISIBLE_GLOBAL_MENUS
                    ? visibleGlobalMenus.length
                    : hiddenGlobalMenus.length;
        }
        const containerName = getContainerName(targetContainerId, translate);
        const pickannouncement = translate('dndDragOver', {
            format: [item.tooltip, targetIndex + 1, destcontainerLength, containerName],
        });
        announce(pickannouncement);
        lastMovedItemId.current = {
            activeId: item.menuName,
            dragAction: direction === EventKeys.ARROW_UP ? DragAction.ARROW_Up : DragAction.ARROW_DOWN,
        };
    };
    return (_jsxs(_Fragment, { children: [_jsxs(ListSubheader, Object.assign({ component: "div", id: "appHamburger-Menu", "data-testid": "appHamburger-Menu", sx: dndDigitalstyles.listSubheader }, { children: [_jsx(CcfTypography, { variant: 'h5', id: "customize-appHamburger-dialog-title", translationKey: "customize", sx: dndDigitalstyles.customizeText }), _jsx(CcfButton, Object.assign({ sx: dndDigitalstyles.closeIcon, "data-testid": "close-button", onClick: () => props.toggleDrawer(false), tabIndex: 0, "aria-label": translate('close'), disableRipple: true, isFocused: true }, { children: _jsx(CcfCloseIcon, { viewBox: "-6 -6 32 32" }) }))] })), _jsxs(DndContext, Object.assign({ sensors: sensors, collisionDetection: closestCorners, onDragStart: onDragStart, onDragOver: onDragOver, onDragEnd: onDragEnd, accessibility: { announcements, screenReaderInstructions } }, { children: [_jsx(CcfSharedSortableContainer, { id: DroppableId.CONTACT_SPECIFIC_MENUS, items: contactSpecificMenus, label: DroppableId.CONTACT_SPECIFIC_MENUS, hideIfEmpty: true, getItemKey: (item, index) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.menuName) !== null && _a !== void 0 ? _a : `column-${index}`; }, renderItem: (item, index, containerId, containerItems) => (_jsx(CcfSharedSortableItem, { item: item, containerId: containerId, index: index, containerItems: containerItems, isActive: isAppSpaceMenu ? (selectedMenuAppSpace === null || selectedMenuAppSpace === void 0 ? void 0 : selectedMenuAppSpace.tab) === item.menuName : selectedMenu === item.menuName, lastMovedItem: lastMovedItemId, isAppSpaceMenu: isAppSpaceMenu, onSelect: onSelectMenu, onMove: moveItem, renderPinIcon: (item) => pinIcon(item.menuName, item.tooltip, item.isActive), LaunchPopOverProps: {
                                isDrawerOpen: props.isDrawerOpen,
                                toggleDrawer: props.toggleDrawer,
                            } }, item.menuName)) }), contactSpecificMenus.length ? (_jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH, sx: draggableStyles.divider })) : null, _jsx(CcfSharedSortableContainer, { id: DroppableId.VISIBLE_GLOBAL_MENUS, items: visibleGlobalMenus, label: DroppableId.VISIBLE_GLOBAL_MENUS, hideIfEmpty: true, crossContainerItemLimit: hiddenGlobalMenus.length, getItemKey: (item, index) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.menuName) !== null && _a !== void 0 ? _a : `column-${index}`; }, renderItem: (item, index, containerId, containerItems, crossContainerItemLimit) => (_jsx(CcfSharedSortableItem, { item: item, containerId: containerId, index: index, containerItems: containerItems, isActive: isAppSpaceMenu ? (selectedMenuAppSpace === null || selectedMenuAppSpace === void 0 ? void 0 : selectedMenuAppSpace.tab) === item.menuName : selectedMenu === item.menuName, lastMovedItem: lastMovedItemId, isAppSpaceMenu: isAppSpaceMenu, onSelect: onSelectMenu, onMove: moveItem, renderPinIcon: (item) => pinIcon(item.menuName, item.tooltip, item.isActive), targetContainerLength: crossContainerItemLimit, LaunchPopOverProps: {
                                isDrawerOpen: props.isDrawerOpen,
                                toggleDrawer: props.toggleDrawer,
                            } }, item.menuName)) }), _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH, sx: draggableStyles.divider }), _jsx(CcfSharedSortableContainer, { id: DroppableId.HIDDEN_GLOBAL_MENUS, items: hiddenGlobalMenus, label: DroppableId.HIDDEN_GLOBAL_MENUS, hideIfEmpty: true, crossContainerItemLimit: visibleGlobalMenus.length, getItemKey: (item, index) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.menuName) !== null && _a !== void 0 ? _a : `column-${index}`; }, renderItem: (item, index, containerId, containerItems, crossContainerItemLimit) => (_jsx(CcfSharedSortableItem, { item: item, containerId: containerId, index: index, containerItems: containerItems, isActive: isAppSpaceMenu ? (selectedMenuAppSpace === null || selectedMenuAppSpace === void 0 ? void 0 : selectedMenuAppSpace.tab) === item.menuName : selectedMenu === item.menuName, lastMovedItem: lastMovedItemId, isAppSpaceMenu: isAppSpaceMenu, onSelect: onSelectMenu, onMove: moveItem, renderPinIcon: (item) => pinIcon(item.menuName, item.tooltip, item.isActive), targetContainerLength: crossContainerItemLimit, LaunchPopOverProps: {
                                isDrawerOpen: props.isDrawerOpen,
                                toggleDrawer: props.toggleDrawer,
                            } }, item.menuName)) }), _jsx(DragOverlay, { children: _jsx(CcfDraggableOverlayItem, { activeItem: activeItem, styles: draggableStyles, config: {
                                getLabel: (item) => item.tooltip,
                                getActive: (item) => item.isActive,
                                getTestId: (item) => `overlay-${item.menuName}`,
                            } }) }), _jsx(LiveRegion, { id: liveRegionId, announcement: announcement })] }))] }));
};
export default CcfHamburgerDraggableMenu;
//# sourceMappingURL=ccf-hamburger-draggable-menu.js.map