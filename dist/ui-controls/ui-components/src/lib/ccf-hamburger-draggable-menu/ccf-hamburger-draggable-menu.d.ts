import React from 'react';
import { Active, Over, UniqueIdentifier } from '@dnd-kit/core';
import { CcfTranslationKey } from '@nice-devone/i18n';
export interface CcfHamburgerDraggableMenuProps {
    /** Indicates if drawer is open */
    isDrawerOpen?: boolean;
    /** Callback to toggle drawer open/close state */
    toggleDrawer: (isDrawerOpen: boolean) => void;
    /** Whether the menu is rendered within AppSpace context */
    isAppSpaceMenu?: boolean;
    /** Optional help URL for Help menu */
    helpUrl?: string;
}
/**
 * Defines the unique IDs for all droppable containers in the hamburger menu.
 */
export declare enum DroppableId {
    /** Droppable area for contact-specific apps */
    CONTACT_SPECIFIC_MENUS = "droppable-1",
    /** Droppable area for visible set of global apps */
    VISIBLE_GLOBAL_MENUS = "droppable-2",
    /** Droppable area for non-visible set of global apps */
    HIDDEN_GLOBAL_MENUS = "droppable-3"
}
/**
 * Possible actions that triggered an item move in the draggable menu.
 */
export declare enum DragAction {
    /** User dragged the item with mouse or touch */
    DRAG = "Drag",
    /** User pressed Arrow Up key */
    ARROW_Up = "ArrowUp",
    /** User pressed Arrow Down key */
    ARROW_DOWN = "ArrowDown",
    /** User toggled pin icon (pin or unpin) */
    PIN_TOGGLE = "PinToggle"
}
/**
 * Stores the last item that was moved.
 */
export interface DraggableActiveItem {
    /** The item that was just dragged or moved via keyboard (null if cleared) */
    activeId: UniqueIdentifier | null;
    /** What triggered the move */
    dragAction: DragAction;
}
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
export declare function extractFromDraggable(active: Active, over: Over): {
    name: any;
    container: DroppableId;
    position: number;
    containerLength: number;
};
/**
 * Returns a translated container name for the given droppable ID.
 *
 * @example
 * const name = getContainerName(DroppableId.CONTACT_SPECIFIC_MENUS, translate);
 */
export declare function getContainerName(containerId: DroppableId, translate: (input: CcfTranslationKey, extraArgs?: {
    format: (string | number)[];
}) => string): string;
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
export declare const CcfHamburgerDraggableMenu: React.FC<CcfHamburgerDraggableMenuProps>;
export default CcfHamburgerDraggableMenu;
