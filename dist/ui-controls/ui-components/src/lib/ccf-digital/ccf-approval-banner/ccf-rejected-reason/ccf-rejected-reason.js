import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, Button } from '@mui/material';
import { useTranslator, CcfCloseIcon, CcfIconButton, CcfBox, CcfTooltip, CcfTextField, } from '@nice-devone/ui-controls';
import CcfRejectedReasonStyle from './ccf-rejected-reason-styles';
import CcfErrorBoundary from '../../../ccf-error-boundary/ccf-error-boundary';
import { useThrottleClick } from '../../../../hooks/useThrottleClick';
import { CcfRejectedReasonAction, getDraftReason } from './ccf-rejected-reason.slice';
const SUBMIT_REJECTED_TIMER_DELAY = 5000; // Timer delay (in milliseconds) for throttling the submit rejected reason button
/**
 * Component display rejected reason box
 * @returns JSX.Element
 * @param props - props for CcfRejectedReason component
 * ```
 * @example
 * <CcfRejectedReason caseId="123" draftMessageId="456" onClose={() => {}} onSubmit={(reason) => {}}/>
 * ```
 */
export function CcfRejectedReason(props) {
    var _a, _b;
    const { onClose, onSubmit, caseId, draftMessageId } = props;
    const theme = useTheme();
    const [translate] = useTranslator();
    const styles = CcfRejectedReasonStyle(theme);
    const dispatch = useDispatch();
    const [reason, setReason] = useState('');
    const draftReason = (_a = useSelector(getDraftReason(caseId, draftMessageId))) !== null && _a !== void 0 ? _a : '';
    const rejectedReasonInputRef = useRef(null);
    useEffect(() => {
        if (draftReason) {
            setReason(draftReason);
        }
    }, [draftReason]);
    useEffect(() => {
        var _a;
        (_a = rejectedReasonInputRef === null || rejectedReasonInputRef === void 0 ? void 0 : rejectedReasonInputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        return () => {
            if (rejectedReasonInputRef === null || rejectedReasonInputRef === void 0 ? void 0 : rejectedReasonInputRef.current) {
                rejectedReasonInputRef.current = null;
            }
        };
    }, []);
    /**
     * method to update the draft reason state
     * @param event - event object
     * @example -
     * ```
     * updateDraftReason(event)
     * ```
     */
    const updateDraftReason = (event) => {
        var _a, _b;
        event === null || event === void 0 ? void 0 : event.stopPropagation();
        setReason((_b = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '');
    };
    /**
     * method to handle blur event and set the draft reason in store
     * @param event - event object
     * @example -
     * ```
     * handleBlur(event)
     * ```
     */
    const handleBlur = (event) => {
        event === null || event === void 0 ? void 0 : event.stopPropagation();
        dispatch(CcfRejectedReasonAction.setDraftReason({ caseId, draftMessageId, reason }));
    };
    /**
     * method to submit the rejected reason
     * @param event - event object
     * @example -
     * ```
     * submitClickHandler(event)
     *
     * ```
     */
    const submitClickHandler = useThrottleClick((event) => {
        event === null || event === void 0 ? void 0 : event.stopPropagation();
        onSubmit(reason);
    }, SUBMIT_REJECTED_TIMER_DELAY);
    return (_jsx(CcfErrorBoundary, Object.assign({ componentName: 'CcfRejectedReason' }, { children: _jsxs(CcfBox, Object.assign({ sx: styles === null || styles === void 0 ? void 0 : styles.container }, { children: [_jsx(CcfTextField, { id: "rejected-reason-input", variant: 'outlined', fullWidth: true, multiline: true, rows: 2, size: 'small', tabIndex: 0, placeholder: translate('reasonForDenial'), InputProps: {
                        sx: Object.assign({}, (_b = styles === null || styles === void 0 ? void 0 : styles.container) === null || _b === void 0 ? void 0 : _b.textAreaContainer),
                        'aria-label': `${translate('reasonForDenial')}`,
                    }, value: reason, onBlur: handleBlur, onChange: updateDraftReason, inputRef: rejectedReasonInputRef }), _jsx(CcfTooltip, Object.assign({ title: translate('submit'), arrow: true }, { children: _jsx(Button, Object.assign({ variant: 'outlined', color: 'primary', onClick: submitClickHandler, size: 'small', tabIndex: 0, disableRipple: true, sx: [styles === null || styles === void 0 ? void 0 : styles.submitBtn, styles === null || styles === void 0 ? void 0 : styles.focusedElement], "aria-label": translate('submit') }, { children: translate('submit') })) })), _jsx(CcfTooltip, Object.assign({ title: translate('close'), arrow: true }, { children: _jsx(CcfIconButton, Object.assign({ onClick: onClose, disableRipple: true, tabIndex: 0, "aria-label": translate('close'), "data-testid": 'rejectedReasonCloseButton', sx: [styles === null || styles === void 0 ? void 0 : styles.closeButton, styles === null || styles === void 0 ? void 0 : styles.focusedElement] }, { children: _jsx(CcfCloseIcon, { viewBox: '-8 -4 32 32', sx: styles === null || styles === void 0 ? void 0 : styles.closeIcon }) })) }))] })) })));
}
//# sourceMappingURL=ccf-rejected-reason.js.map