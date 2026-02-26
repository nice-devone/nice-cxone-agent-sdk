import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from '@mui/material';
import { CcfAppToastMessage, CcfTextField, useTranslator, } from '@nice-devone/ui-controls';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ccfCommitmentStyles from './ccf-commitment-form.styles';
import { cancelCommitment, commitmentActions, deleteCommitment, getScheduledCommitment } from './ccf-commitment.slice';
/**
 * Custom hook to return delete toast
 * @example useRemoveCommitment()
 */
export const useRemoveCommitment = (isNotesRequired, callbackId) => {
    const theme = useTheme();
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const notesRef = useRef(null);
    const AppToastContainer = useRef('');
    const scheduledContact = useSelector(getScheduledCommitment);
    const styles = ccfCommitmentStyles(theme);
    /**
     * dismiss toast on cancel
     * @example dismissToast()
     */
    const dismissToast = () => {
        dispatch(commitmentActions.removeCommitmentMessageConfirmed(false));
        toast.dismiss(AppToastContainer.current);
    };
    useEffect(() => {
        return () => {
            if (scheduledContact !== null) {
                toast.dismiss(AppToastContainer.current);
            }
        };
    }, []);
    /**
     * delete handler to delete  commitment
     * @example handleRemoveCommitment()
     */
    const handleRemoveCommitment = (callbackId) => {
        var _a, _b;
        if ((isNotesRequired && !!((_a = notesRef === null || notesRef === void 0 ? void 0 : notesRef.current) === null || _a === void 0 ? void 0 : _a.value)) || !isNotesRequired) {
            const payload = {
                callbackId: Number(callbackId),
                description: String((_b = notesRef === null || notesRef === void 0 ? void 0 : notesRef.current) === null || _b === void 0 ? void 0 : _b.value),
            };
            if ((scheduledContact === null || scheduledContact === void 0 ? void 0 : scheduledContact.contactId) === callbackId.toString()) {
                dispatch(cancelCommitment(payload));
            }
            else {
                dispatch(deleteCommitment(payload));
            }
            dispatch(commitmentActions.removeCommitmentMessageConfirmed(false));
            dispatch(commitmentActions.setIsEditCommitment(false));
            dispatch(commitmentActions.showCommitmentForm(false));
            toast.dismiss(AppToastContainer.current);
        }
    };
    /**
     * open remove confirmation handler
     * @example triggerRemoveToast()
     */
    const triggerRemoveToast = () => {
        dispatch(commitmentActions.removeCommitmentMessageConfirmed(true));
        AppToastContainer.current = toast.warn(_jsx(CcfAppToastMessage, Object.assign({ type: "warning", titleKey: "removeCommitmentConfirmationTitle", messageKey: 'removeCommitmentConfirmationMsg', primaryBtnText: "remove", secondaryBtnText: "keep", triggerPrimaryHandler: () => handleRemoveCommitment(callbackId), triggerSecondaryHandler: () => dismissToast() }, { children: _jsx(CcfTextField, { name: "addnotes", id: "addnotes", fullWidth: true, placeholder: translate('notes'), multiline: true, sx: styles.textArea, inputRef: notesRef, helperText: isNotesRequired ? translate('helperTextMessageForNotes') : '', FormHelperTextProps: { style: styles.notesHelperTextStyles } }) })), {
            autoClose: false,
            closeButton: false,
            containerId: 'AppToastContainer',
            className: 'removeCommitmentConfirmToast',
        });
    };
    return { triggerRemoveToast };
};
//# sourceMappingURL=ccf-remove-commitment.js.map