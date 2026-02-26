import React from 'react';
import { EventKeys } from '@nice-devone/common-sdk';
import { DraggableActiveItem, DroppableId } from '../ccf-hamburger-draggable-menu';
import { Navigation } from '../../../enums/navigation-menus';
import { NavigationItem } from '../../ccf-navigation/useNavigationItems';
/**
 * Props for CcfSharedSortableItem.
 * Represents a single draggable and reorderable navigation item.
 */
interface Props {
    /** Navigation item metadata */
    item: NavigationItem;
    /** Parent droppable container identifier */
    containerId: DroppableId;
    /** Index of the item within the container */
    index: number;
    /** All items inside the current container */
    containerItems: NavigationItem[];
    /** Whether the item is currently active */
    isActive: boolean;
    /** Indicates App Space menu context */
    isAppSpaceMenu?: boolean;
    /** Reference to the last moved draggable item */
    lastMovedItem: React.MutableRefObject<DraggableActiveItem | null>;
    /** Callback invoked when the item is selected */
    onSelect: (menuName: Navigation) => void;
    /** Callback to reorder item within the container */
    onMove: (direction: EventKeys.ARROW_UP | EventKeys.ARROW_DOWN, containerId: DroppableId, containerItems: NavigationItem[], item: NavigationItem) => void;
    /** Renders pin / unpin icon for the item */
    renderPinIcon: (item: NavigationItem) => React.ReactNode;
    /** Props for the Launch menu */
    LaunchPopOverProps: {
        /** Indicates if drawer is open */
        isDrawerOpen?: boolean;
        /** Callback to toggle drawer open/close state */
        toggleDrawer: (isDrawerOpen: boolean) => void;
    };
    /** Total number of items in the crossable container */
    targetContainerLength?: number;
}
interface ReorderButtonProps {
    direction: EventKeys.ARROW_UP | EventKeys.ARROW_DOWN;
    disabled: boolean;
    itemLabel: string;
    onClick: (e: React.MouseEvent | React.KeyboardEvent) => void;
}
export declare const ReorderButton: React.NamedExoticComponent<ReorderButtonProps>;
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
