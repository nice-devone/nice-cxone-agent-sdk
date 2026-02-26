import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslator } from '@nice-devone/ui-controls';
import { Dialog, DialogContent, DialogContentText, DialogActions, Button, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { MessageKebabMenu, deleteMessageAuthorName, deleteMessageContent, deleteMessage } from '../../ccf-assignment-panel/ccf-assignment-utils';
import CcfMessageActionConfirmationStyle from './ccf-message-action-confirmation-dialog-styles';
/**
 * Component displays  message action confirmation dialog
 * @returns message action confirmation dialog
 * @example -
 * ```
 * <CcfMessageActionConfirmationDialog  isOpen={true} onCancelClick={onCancel}/>
 * ```
 */
export function CcfMessageActionConfirmationDialog(props) {
    const { isOpen, interactionId, caseId, messageId, action, onCancelClick, isPreviousCaseMessage = false, isNextCaseMessage = false } = props;
    const theme = useTheme();
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const styles = CcfMessageActionConfirmationStyle(theme);
    let contentTextMessage;
    switch (action) {
        case MessageKebabMenu.DELETE_CONTENT:
            contentTextMessage = translate('deleteContentConfirmationTitle');
            break;
        case MessageKebabMenu.DELETE_AUTHOR_NAME:
            contentTextMessage = translate('deleteAuthorConfirmationTitle');
            break;
        case MessageKebabMenu.DELETE_ENTIRE_MESSAGE:
            contentTextMessage = translate('deleteEntireMessageConfirmationTitle');
            break;
        default:
            contentTextMessage = '';
    }
    /**
     * Function to handle delete message action
     * @example -
     * ```
     * deleteMessageAction()
     * ```
     */
    const deleteMessageAction = () => {
        switch (action) {
            case MessageKebabMenu.DELETE_CONTENT:
                dispatch(deleteMessageContent({ interactionId: interactionId, caseId: caseId,
                    messageId: messageId, isContentORAuthorName: MessageKebabMenu.DELETE_CONTENT, isPreviousCaseMessage: isPreviousCaseMessage, isNextCaseMessage: isNextCaseMessage }));
                break;
            case MessageKebabMenu.DELETE_AUTHOR_NAME:
                dispatch(deleteMessageAuthorName({ interactionId: interactionId, caseId: caseId,
                    messageId: messageId, isContentORAuthorName: MessageKebabMenu.DELETE_AUTHOR_NAME, isPreviousCaseMessage: isPreviousCaseMessage, isNextCaseMessage: isNextCaseMessage }));
                break;
            case MessageKebabMenu.DELETE_ENTIRE_MESSAGE:
                dispatch(deleteMessage({ interactionId: interactionId, caseId: caseId, messageId: messageId, isDeleted: false }));
                break;
            default:
                return;
        }
        onCancelClick();
    };
    return (_jsxs(Dialog, Object.assign({ open: isOpen, "aria-labelledby": "message-action-dialog", "aria-describedby": "message-action-dialog-description" }, { children: [_jsx(DialogContent, { children: _jsx(DialogContentText, Object.assign({ id: "message-action-dialog-context", sx: styles.confirmationText }, { children: contentTextMessage })) }), _jsxs(DialogActions, { children: [_jsx(Button, Object.assign({ onClick: () => onCancelClick(), color: "primary", variant: 'outlined', sx: styles.cancelBtn }, { children: translate('cancel') })), _jsx(Button, Object.assign({ onClick: () => deleteMessageAction(), color: 'error', variant: 'contained', sx: { padding: '0' } }, { children: translate('delete') }))] })] })));
}
//# sourceMappingURL=ccf-message-action-confirmation-dialog.js.map