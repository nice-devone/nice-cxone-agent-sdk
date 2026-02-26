import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CcfButton, CcfTypography, CcfTooltip, CcfDraggableIcon, useTranslator } from '@nice-devone/ui-controls';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { EventKeys } from '@nice-devone/common-sdk';
import { DroppableId, DragAction } from '../ccf-hamburger-draggable-menu';
import { Navigation } from '../../../enums/navigation-menus';
import CcfDigitalSearchDraggableStyles from '../../ccf-app-space/ccf-digital-search/ccf-digital-search-draggable/ccf-digital-search-draggable-styles';
import { getSelectedMenuName } from '../../global.app.slice';
import { selectAppSpaceActiveTabStatus } from '../../ccf-app-space/ccf-app-space.slice';
import { LaunchPopover } from '../../ccf-launch-popover/ccf-launch-popover';
import { useSortableFocusManager } from './useSortableFocusManager';
/**
 * Sortable navigation item used inside the hamburger / app-space menu.
 *
 * Supports:
 * - Drag-and-drop reordering
 * - Keyboard and mouse based item movement
 * - Selection and pin actions
 *
 * Memoized to avoid unnecessary re-renders when props are unchanged.
 * @example
 * ```
 * <CcfSharedSortableItem {...props} />
 * ```
 */
const CcfSharedSortableItem = ({ item, containerId, index, containerItems, isAppSpaceMenu, lastMovedItem, onSelect, onMove, renderPinIcon, targetContainerLength = 0, LaunchPopOverProps, }) => {
    var _a, _b, _c, _d, _e, _f;
    const { attributes, listeners, setNodeRef, isDragging, transform, transition } = useSortable({
        id: item.menuName,
        data: { column: item, containerId },
    });
    const [translate] = useTranslator();
    const theme = useTheme();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const draggableStyles = CcfDigitalSearchDraggableStyles(theme);
    const selectedMenu = useSelector(getSelectedMenuName);
    const selectedMenuAppSpace = useSelector(selectAppSpaceActiveTabStatus);
    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    const isDisabled = !(item === null || item === void 0 ? void 0 : item.isActive) || (containerId === DroppableId.CONTACT_SPECIFIC_MENUS && !isAppSpaceMenu);
    const activeId = (_a = lastMovedItem.current) === null || _a === void 0 ? void 0 : _a.activeId;
    const activeAction = (_b = lastMovedItem.current) === null || _b === void 0 ? void 0 : _b.dragAction;
    const isFirstItem = index === 0;
    const isLastItem = index === containerItems.length - 1;
    const canMoveUpCrossContainer = containerId === DroppableId.HIDDEN_GLOBAL_MENUS && targetContainerLength > 0;
    const canMoveDownCrossContainer = containerId === DroppableId.VISIBLE_GLOBAL_MENUS && targetContainerLength > 0;
    const isUpButtonDisabled = isFirstItem && (containerId !== DroppableId.HIDDEN_GLOBAL_MENUS || !canMoveUpCrossContainer);
    const isDownButtonDisabled = isLastItem && (containerId !== DroppableId.VISIBLE_GLOBAL_MENUS || !canMoveDownCrossContainer);
    const { sortableRef } = useSortableFocusManager(item.menuName, setNodeRef, activeId, activeAction, isUpButtonDisabled, isDownButtonDisabled);
    /**
     * Computes menu item styles based on active, disabled,
     * dragging, and App Space state.
     */
    const getMenuItemStyles = useCallback(() => {
        if (!(item === null || item === void 0 ? void 0 : item.menuName))
            return { display: 'none' };
        const isActive = isAppSpaceMenu ? (selectedMenuAppSpace === null || selectedMenuAppSpace === void 0 ? void 0 : selectedMenuAppSpace.tab) === item.menuName : selectedMenu === item.menuName;
        const disabledStyles = isDisabled
            ? {
                cursor: 'default',
                opacity: isDragging ? 0 : 0.38,
            }
            : {};
        return Object.assign(Object.assign(Object.assign({}, draggableStyles.menuItem), disabledStyles), (isActive && draggableStyles.activePinnedItem));
    }, [item === null || item === void 0 ? void 0 : item.menuName, isAppSpaceMenu, selectedMenuAppSpace === null || selectedMenuAppSpace === void 0 ? void 0 : selectedMenuAppSpace.tab, selectedMenu, isDisabled, isDragging]);
    /**
     * Handles item selection.
     * Prevents selection while dragging or when disabled.
     */
    const handleMenuSelect = useCallback(() => {
        if (!isDragging && !isDisabled) {
            onSelect(item.menuName);
        }
    }, [isDragging, isDisabled, item.menuName, onSelect]);
    /**
     * Factory handler for reordering items via mouse or keyboard.
     *
     * - Prevents default browser behavior
     * - Stops event propagation to avoid drag conflicts
     * - Triggers move action based on direction
     */
    const handleReorder = useCallback((direction) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!item)
            return;
        if (direction === EventKeys.ARROW_DOWN) {
            onMove(EventKeys.ARROW_DOWN, containerId, containerItems, item);
            return;
        }
        if (direction === EventKeys.ARROW_UP) {
            onMove(EventKeys.ARROW_UP, containerId, containerItems, item);
            return;
        }
    }, [containerId, onMove]);
    return (_jsxs(Box, Object.assign({ className: "hover-parent", "data-testid": `option-${(_c = item.menuName) !== null && _c !== void 0 ? _c : ''}`, sx: Object.assign(Object.assign(Object.assign({}, draggableStyles.draggableItem(transform, isDragging, transition)), { opacity: isDragging ? 0 : 1 }), getMenuItemStyles()), ref: sortableRef, "data-draggable": "true", "data-header-name": (item === null || item === void 0 ? void 0 : item.menuName) || '' }, { children: [_jsxs(Box, Object.assign({ display: "flex", alignItems: "center" }, { children: [_jsx(CcfButton, Object.assign({ sx: Object.assign(Object.assign({}, draggableStyles.draggableBtn), { cursor: 'grab', opacity: isDragging ? 1 : 0.5 }) }, (activeId === (item === null || item === void 0 ? void 0 : item.menuName) ? {} : attributes), listeners, { disableRipple: true, "aria-hidden": "true", "data-role": DragAction.DRAG, "aria-label": 
                        // if item was last moved, use simple label
                        activeId === (item === null || item === void 0 ? void 0 : item.menuName)
                            ? item === null || item === void 0 ? void 0 : item.tooltip
                            : translate('dragOrClickToReorder', {
                                format: [(_d = item === null || item === void 0 ? void 0 : item.tooltip) !== null && _d !== void 0 ? _d : 'item'],
                            }) }, { children: _jsx(CcfDraggableIcon, { fontSize: "small" }) })), item.menuName === Navigation.LAUNCH ? (_jsx(Box, Object.assign({ component: "span", sx: { marginLeft: '0.0625rem', width: '100%' } }, { children: _jsx(LaunchPopover, { id: "launchPopover", anchorOrigin: isSmView ? { horizontal: 'left', vertical: 'bottom' } : { horizontal: 'center', vertical: 'top' }, disableTooltip: true, transformOrigin: isSmView ? { horizontal: 'right', vertical: 'top' } : { horizontal: 'left', vertical: 'top' }, htmlColor: theme.palette.background.dark, labelComponent: _jsx(CcfTypography, Object.assign({ sx: draggableStyles.itemLabel }, { children: item === null || item === void 0 ? void 0 : item.tooltip })), isDrawerOpen: LaunchPopOverProps === null || LaunchPopOverProps === void 0 ? void 0 : LaunchPopOverProps.isDrawerOpen, toggleDrawer: LaunchPopOverProps.toggleDrawer, tooltipPlacement: "top", HamburgermenuLaunch: true, buttonSx: draggableStyles.launchIcon }) }))) : (_jsx(CcfButton, Object.assign({ sx: Object.assign({}, draggableStyles.draggableBtn), tabIndex: 0, onClick: handleMenuSelect, "data-testid": `menu-item-${(_e = item.menuName) !== null && _e !== void 0 ? _e : ''}`, disabled: isDisabled, disableRipple: true }, { children: _jsx(CcfTypography, Object.assign({ sx: draggableStyles.itemLabel }, { children: (_f = item === null || item === void 0 ? void 0 : item.tooltip) !== null && _f !== void 0 ? _f : '' })) })))] })), _jsxs(Box, Object.assign({ sx: draggableStyles.hoverActionIcons }, { children: [!isMobile && renderPinIcon(item), _jsx(ReorderButton, { direction: EventKeys.ARROW_UP, disabled: isUpButtonDisabled, itemLabel: item === null || item === void 0 ? void 0 : item.tooltip, onClick: handleReorder(EventKeys.ARROW_UP) }), _jsx(ReorderButton, { direction: EventKeys.ARROW_DOWN, disabled: isDownButtonDisabled, itemLabel: item === null || item === void 0 ? void 0 : item.tooltip, onClick: handleReorder(EventKeys.ARROW_DOWN) })] }))] }), item.menuName));
};
export const ReorderButton = memo(({ direction, disabled, itemLabel, onClick, }) => {
    const [translate] = useTranslator();
    const theme = useTheme();
    const draggableStyles = CcfDigitalSearchDraggableStyles(theme);
    const isUp = direction === EventKeys.ARROW_UP;
    const tooltipKey = isUp ? 'moveItemUp' : 'moveItemDown';
    const testIdKey = isUp ? 'up' : 'down';
    const wrapperStyle = isUp
        ? draggableStyles.moveUpWrapper(disabled)
        : draggableStyles.moveDownWrapper(disabled);
    const iconStyle = isUp
        ? draggableStyles.moveUpIcon(disabled)
        : draggableStyles.moveDownIcon(disabled);
    const Icon = isUp ? ArrowUpwardIcon : ArrowDownwardIcon;
    const ariaLabel = !disabled
        ? translate(tooltipKey, { format: [itemLabel] })
        : translate('disabled');
    return (_jsx(Box, Object.assign({ sx: wrapperStyle }, { children: _jsx(CcfTooltip, Object.assign({ title: !disabled ? translate(tooltipKey, { format: [''] }) : translate('disabled'), arrow: true, "aria-label": ariaLabel, placement: "top" }, { children: _jsx(Box, Object.assign({ component: "span" }, { children: _jsx(CcfButton, Object.assign({ sx: Object.assign(Object.assign({}, draggableStyles.draggableBtn), draggableStyles.iconFocus), tabIndex: 0, "data-role": direction, onClick: onClick, "data-testid": `move-${testIdKey}-${itemLabel}`, "aria-label": ariaLabel, disabled: disabled, disableRipple: true }, { children: _jsx(Icon, { fontSize: "small", sx: iconStyle }) })) })) })) })));
});
export default memo(CcfSharedSortableItem);
//# sourceMappingURL=ccf-shared-sortable-item.js.map