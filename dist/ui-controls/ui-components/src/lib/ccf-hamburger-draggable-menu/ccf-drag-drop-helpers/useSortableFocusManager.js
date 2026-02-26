import { useRef, useCallback, useEffect } from 'react';
import { DragAction } from '../ccf-hamburger-draggable-menu';
/* eslint-disable max-params */
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
export function useSortableFocusManager(id, setNodeRef, activeId, activeDragAction, isUpButtonDisabled, isDownButtonDisabled) {
    const nodeRef = useRef(null);
    // Combined ref: feeds both dnd-kit and our internal tracking
    const sortableRef = useCallback((node) => {
        nodeRef.current = node;
        setNodeRef(node);
    }, [setNodeRef]);
    // Focus the appropriate button after a move (drag or keyboard arrow)
    useEffect(() => {
        if (activeId !== id || !nodeRef.current)
            return;
        /**
         * Focuses the correct interactive element based on how the item was moved.
         * - Arrow key moves → focus the arrow button that was used
         * - Mouse/touch drag → focus the grip handle
         * @example focusCorrectButton()
         */
        const focusCorrectButton = () => {
            var _a, _b;
            const node = nodeRef.current;
            if (!node)
                return;
            let buttonToFocus = null;
            if (activeDragAction === DragAction.ARROW_Up) {
                // 1. Keyboard Arrow Up navigation → focus the Up button that was used
                buttonToFocus =
                    (_a = node.querySelector('button[data-role*="ArrowUp"]:not(:disabled)')) !== null && _a !== void 0 ? _a : (isUpButtonDisabled ? node.querySelector('button[data-role*="ArrowDown"]:not(:disabled)') : null);
            }
            else if (activeDragAction === DragAction.ARROW_DOWN) {
                // 2. Keyboard Arrow Down navigation → focus the Down button that was used
                buttonToFocus =
                    (_b = node.querySelector('button[data-role*="ArrowDown"]:not(:disabled)')) !== null && _b !== void 0 ? _b : (isDownButtonDisabled ? node.querySelector('button[data-role*="ArrowUp"]:not(:disabled)') : null);
            }
            else if (activeDragAction === DragAction.DRAG || activeDragAction == null) {
                // 3. Mouse/touch drag → focus the grip/handle
                buttonToFocus = node.querySelector('button[data-role*="Drag"]');
            }
            else if (activeDragAction === DragAction.PIN_TOGGLE) {
                // 4. Keyboard Pin navigation → focus the Pin button that was used
                buttonToFocus = node.querySelector('button[data-role*="PinToggle" i]');
            }
            if (!buttonToFocus) {
                // 5.if none of the above, focus the grip handle
                buttonToFocus = node.querySelector('button[data-role*="Drag"]');
            }
            ;
            // focus the button without scrolling the view
            buttonToFocus === null || buttonToFocus === void 0 ? void 0 : buttonToFocus.focus({ preventScroll: true });
            if (activeDragAction === DragAction.ARROW_Up || activeDragAction === DragAction.ARROW_DOWN) {
                // Ensure it is visible and scrolled into view for keyboard users
                buttonToFocus === null || buttonToFocus === void 0 ? void 0 : buttonToFocus.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        };
        // rAF ensures layout + paint are complete
        let reqframe = 0;
        reqframe = requestAnimationFrame(() => {
            focusCorrectButton();
        });
        return () => {
            cancelAnimationFrame(reqframe);
        };
    }, [activeId, id, activeDragAction, isUpButtonDisabled, isDownButtonDisabled]);
    return { sortableRef };
}
//# sourceMappingURL=useSortableFocusManager.js.map