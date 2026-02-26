import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { CcfBox, CcfCallMuteIcon, CcfCloseIcon, CcfDialPad, CcfIconButton, CcfUnMuteIcon, CcfTooltip, useTranslator, } from '@nice-devone/ui-controls';
import { useDispatch } from 'react-redux';
import { sendDtmf } from '../ccf-voice-contact/ccf-voice-contact-methods';
import { ControlButtonText } from '@nice-devone/agent-sdk';
import { CcfAssignmentAction } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import ccfKeypadStyles from './ccf-keypad.styles';
/**
 * Component displays Keypad
 * @returns component for dailpad
 * @example <CcfKeyPad/>
 */
export function CcfKeyPad(props) {
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const { callControlMuteButton, handleOnClick } = props;
    const muteIconButton = (callControlMuteButton === null || callControlMuteButton === void 0 ? void 0 : callControlMuteButton.controlText) === ControlButtonText.MUTE;
    const isMuteVisible = callControlMuteButton === null || callControlMuteButton === void 0 ? void 0 : callControlMuteButton.isVisible;
    const isSmView = useMediaQuery((theme) => theme.breakpoints.down('xl'));
    const theme = useTheme();
    const keypadStyles = ccfKeypadStyles(theme);
    /**
     * method called to close the dialpad
     * @example
     */
    const handleToggleKeypad = (event) => {
        event.stopPropagation();
        dispatch(CcfAssignmentAction.toggleIVRKeyPad(false));
    };
    /**
     * method called when dial keys are entered
     * @example
     */
    const onDialKeyChange = (digit) => {
        dispatch(sendDtmf({ digit: digit }));
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Box, Object.assign({ sx: isSmView ? keypadStyles.keyPadSmViewContainer : keypadStyles.keyPadContainer }, { children: [isSmView && (_jsxs(CcfBox, Object.assign({ sx: keypadStyles.closeIconContainer, onClick: (e) => handleToggleKeypad(e), onKeyDown: (e) => {
                            if (e.key === 'Enter') {
                                handleToggleKeypad(e);
                            }
                        }, tabIndex: 0 }, { children: [_jsx(CcfCloseIcon, { "data-testid": 'close-icon', viewBox: "0 -2 24 24" }), translate('close')] }))), _jsx(CcfDialPad, { isSmView: isSmView, handleBackIconClick: (e) => handleToggleKeypad(e), onDialKeyChange: onDialKeyChange })] })), !isSmView && isMuteVisible && (_jsx(Box, Object.assign({ sx: keypadStyles.muteIconButtonContainer }, { children: _jsx(CcfTooltip, Object.assign({ title: muteIconButton ? translate('mute') : translate('unmute'), arrow: true }, { children: _jsx(CcfIconButton, Object.assign({ disabled: !(callControlMuteButton === null || callControlMuteButton === void 0 ? void 0 : callControlMuteButton.isEnable), onClick: handleOnClick, "data-testid": "mute" }, { children: muteIconButton ? (_jsx(CcfCallMuteIcon, { viewBox: "-3 0 36 36" })) : (_jsx(CcfUnMuteIcon, { viewBox: "-3 0 36 36" })) })) })) })))] }));
}
export default CcfKeyPad;
//# sourceMappingURL=ccf-keypad.js.map