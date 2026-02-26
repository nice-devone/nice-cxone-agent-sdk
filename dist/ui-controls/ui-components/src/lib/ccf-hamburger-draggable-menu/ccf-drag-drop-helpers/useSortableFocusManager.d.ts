import { UniqueIdentifier } from '@dnd-kit/core';
import { DragAction } from '../ccf-hamburger-draggable-menu';
/**
 * Focus manager for sortable items.
 *
 * @param id - Sortable item ID.
 * @param setNodeRef - dnd-kit node ref setter.
 * @param activeId - Currently active item ID.
 * @param activeDragAction - Type of drag action that just ended (DRAG, ARROW_Up, ARROW_DOWN).
 * @param isUpButtonDisabled - Boolean to decide up button is disabled.
 * @param isDownButtonDisabled - Boolean to decide down button is disabled.
 *
 * @example
 * ```
 * const { sortableRef } = useSortableFocusManager(id, setNodeRef, activeId, activeDragAction);
 * ```
 */
export declare function useSortableFocusManager(id: string, setNodeRef: (node: HTMLElement | null) => void, activeId: UniqueIdentifier | null | undefined, activeDragAction: DragAction | undefined, isUpButtonDisabled: boolean, isDownButtonDisabled: boolean): {
    sortableRef: (node: HTMLElement | null) => void;
};
