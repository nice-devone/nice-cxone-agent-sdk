import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useTheme, Box, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import CcfDigitalTranscriptStyles from './ccf-digital-transcript.styles';
import { useDispatch, useSelector } from 'react-redux';
import { getDigitalTranscriptCurrentStatus, getIsDigitalTranscriptPopupOpen, getIsDigitalTranscriptPopupClose, globalActions, sendTranscript } from '../../global.app.slice';
import { CcfAlertInfoIcon, CcfAvailableIcon, CcfButton, CcfCloseIcon, CcfLoader, CcfSendTranscriptIcon, CcfTextField, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import { ValidationUtils } from '@nice-devone/core-sdk';
import { getActiveContactInSelectedInteraction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
/**
 * Enum for Digital Transcript Status
 */
export var DigitalTranscriptStatus;
(function (DigitalTranscriptStatus) {
    /**
    * Digital Transcript in Pending status
    */
    DigitalTranscriptStatus["PENDING"] = "pending";
    /**
    * Digital Transcript in fulfilled status
    */
    DigitalTranscriptStatus["SUCCEEDED"] = "succeeded";
    /**
    * Digital Transcript in Failed status
    */
    DigitalTranscriptStatus["FAILED"] = "failed";
})(DigitalTranscriptStatus || (DigitalTranscriptStatus = {}));
/**
 * component function for render Digital Transcript Popup
 * @example '<CcfDigitalTranscriptx />'
 */
export function CcfDigitalTranscript() {
    const theme = useTheme();
    const styles = CcfDigitalTranscriptStyles(theme);
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const validationUtils = new ValidationUtils();
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const isDigitalTranscriptPopupOpen = useSelector(getIsDigitalTranscriptPopupOpen);
    const digitalTranscriptCurrentStatus = useSelector(getDigitalTranscriptCurrentStatus);
    const [errorText, setErrorText] = useState('');
    const [email, setEmail] = useState('');
    const isCloseClicked = useSelector(getIsDigitalTranscriptPopupClose);
    /**
    * handle close event
    * @example handleClose()
    */
    const handleClose = () => {
        if (digitalTranscriptCurrentStatus === DigitalTranscriptStatus.SUCCEEDED) {
            dispatch(globalActions.toggleDigitalTranscriptPopupClose(true));
        }
        dispatch(globalActions.toggleDigitalTranscriptPopupOpen(false));
        setEmail('');
    };
    /**
    * handle change event
    * @example handleChange()
    */
    const handleChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        const multipleEmails = value.split(/[\s,;]+/);
        if (multipleEmails.length > 1) {
            if (multipleEmails.every(email => validationUtils.validateEmail(email)))
                setErrorText(translate('oneEmailErrorText'));
            else
                setErrorText(translate('invalidEmailAddress'));
        }
        else if (!validationUtils.validateEmail(value)) {
            setErrorText(translate('invalidEmailAddress'));
        }
        else {
            setErrorText('');
        }
    };
    /**
    * handle send button event
    * @example sendBtnClickHandler()
    */
    const sendBtnClickHandler = () => {
        if (activeContactInSelectedInteraction && email) {
            dispatch(sendTranscript({ contactId: activeContactInSelectedInteraction.contactId, email }));
        }
    };
    /**
    * Render Digital Transcript Current Status Component
    * @example renderDigitalTranscriptCurrentStatus()
    */
    const renderDigitalTranscriptCurrentStatus = () => {
        switch (digitalTranscriptCurrentStatus) {
            case DigitalTranscriptStatus.PENDING:
                return _jsxs(Box, Object.assign({ sx: styles.flexCenter }, { children: [_jsx(CcfTypography, { fontWeight: '600', sx: { color: theme.palette.primary.main, marginRight: '12px' }, translationKey: "sending" }), _jsx(CcfLoader, { isPrimary: true })] }));
            case DigitalTranscriptStatus.SUCCEEDED:
                return _jsxs(Box, Object.assign({ sx: styles.flexPadding }, { children: [_jsx(CcfAvailableIcon, {}), _jsx(CcfTypography, { fontWeight: '600', sx: { marginLeft: '8px' }, translationKey: "transcriptSuccess" })] }));
            case DigitalTranscriptStatus.FAILED:
                return _jsxs(Box, Object.assign({ sx: styles.flexPadding }, { children: [_jsx(CcfAlertInfoIcon, {}), _jsx(CcfTypography, { fontWeight: '600', sx: { marginLeft: '8px' }, translationKey: "transcriptFailure" })] }));
            default: return null;
        }
    };
    return (_jsxs(Dialog, Object.assign({ open: isDigitalTranscriptPopupOpen, onClose: handleClose, PaperProps: {
            style: (digitalTranscriptCurrentStatus === '' && !isCloseClicked) ? styles.dialogWrapper : styles.dialogWrapperSm,
        } }, { children: [digitalTranscriptCurrentStatus !== DigitalTranscriptStatus.PENDING &&
                _jsx(IconButton, Object.assign({ "aria-label": translate('close'), onClick: handleClose, sx: styles.closeIcon }, { children: _jsx(CcfCloseIcon, { viewBox: '-2 -2 24 24' }) })), digitalTranscriptCurrentStatus === '' && !isCloseClicked ?
                _jsxs(_Fragment, { children: [_jsx(DialogTitle, Object.assign({ sx: styles.zeroPadding }, { children: _jsx(CcfTypography, { fontWeight: '600', sx: { marginBottom: '16px' }, translationKey: "sendTranscript" }) })), _jsxs(DialogContent, Object.assign({ sx: Object.assign(Object.assign({}, styles.zeroPadding), { marginBottom: '20px' }) }, { children: [_jsx(CcfTypography, { variant: 'h6', sx: styles.emailAddressText, translationKey: "emailAddress" }), _jsx(CcfTextField, { name: "addTranscriptEmail", id: "addTranscriptEmail", fullWidth: true, value: email, onChange: handleChange, helperText: errorText, inputProps: { 'data-testid': 'digital-transcript-textfield' }, error: !!errorText })] })), !errorText && email && _jsx(DialogActions, Object.assign({ sx: styles.zeroPadding }, { children: _jsxs(CcfButton, Object.assign({ "aria-label": translate('send'), id: "launchBtn", variant: "outlined", disableElevation: true, primary: true, onClick: sendBtnClickHandler }, { children: [_jsx(CcfSendTranscriptIcon, { viewBox: '0 -4 24 24', htmlColor: theme.palette.background.paper }), _jsx(CcfTypography, { translationKey: "send" })] })) }))] })
                : renderDigitalTranscriptCurrentStatus()] })));
}
export default React.memo(CcfDigitalTranscript);
//# sourceMappingURL=ccf-digital-transcript.js.map