import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dispositionInteractionActions } from '../ccf-disposition-slice';
/**
   * Function to listen for mouseDown event and keydown 'enter' key event
   * on the DOM and close disposition panel if clicked outside the panel
   * @example <CloseDispositionOnOutsideEvent />
  */
export const CloseDispositionOnOutsideEvent = ({ componentId, outcomesButtonId }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        /**
          * Method checks if the target was outside the disposition panel and closes it
          * @returns - None
          * @example - closeDispositionIfEventIsOutsideDispositionPanel(dispositionPanelRef, target)
          */
        const closeDispositionIfEventIsOutsideDispositionPanel = (dispositionPanelRef, target, outcomesButtonRef) => {
            const isConfirmationDialogClick = target.textContent === 'Cancel' || target.textContent === 'Close' || target.textContent === 'Retry';
            if (!dispositionPanelRef.contains(target) && !(outcomesButtonRef === null || outcomesButtonRef === void 0 ? void 0 : outcomesButtonRef.contains(target)) && !isConfirmationDialogClick) {
                dispatch(dispositionInteractionActions.displayDispositionCard(false));
                dispatch(dispositionInteractionActions.setDispositionType(''));
            }
        };
        /**
          * Method checks if the disposition panel exists and checks for mouse down event or
          * keydown 'enter' key event
          * @returns - None
          * @example - handleMouseDownAndKeyboardListener(event)
          */
        const handleMouseDownAndKeyboardListener = (event) => {
            const dispositionPanelRef = document.querySelector('#' + componentId);
            const outcomesButtonRef = document.querySelector('#' + outcomesButtonId);
            if (dispositionPanelRef
                && ('key' in event && (event === null || event === void 0 ? void 0 : event.key) === 'Enter' || !('key' in event)))
                closeDispositionIfEventIsOutsideDispositionPanel(dispositionPanelRef, event.target, outcomesButtonRef);
        };
        document.addEventListener('mousedown', handleMouseDownAndKeyboardListener);
        document.addEventListener('keydown', handleMouseDownAndKeyboardListener);
        return () => {
            document.removeEventListener('mousedown', handleMouseDownAndKeyboardListener);
            document.removeEventListener('keydown', handleMouseDownAndKeyboardListener);
        };
    });
    return null;
};
//# sourceMappingURL=close-disposition-on-outside-event.js.map