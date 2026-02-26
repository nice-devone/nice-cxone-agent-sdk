import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, CircularProgress, Grid, FormControl, Card, CardContent, CardHeader, Checkbox, FormControlLabel, CardActions, } from '@mui/material';
import CcfAcdSessionStyles from './ccf-acd-session.styles';
import { CcfButton, CcfCXAgentLogoIcon, CcfDivider, CcfRadioHighlight, CcfTextField, CcfTypography, DividerOrientation, DividerVariant, useTranslator, } from '@nice-devone/ui-controls';
import { CcfLocationOption } from './ccf-location-option/ccf-location-option';
/**
 * Acd session component
 * @param isLocationFTEnabled - boolean value to check if location feature toggle is enabled
 * @param authError - boolean value to check if there is any authentication error
 * @returns  CcfAcdSession component
 * @example
 * ```
 * <CcfAcdSession isLocationFTEnabled={true} authError={true} />
 * ```
 */
export function CcfVoicePreference({ theme, isLocationFTEnabled = false, radioButtonState, voiceConnection, showSpinner, stationOptionsChangeHandler, inputBoxState, inputNumberChangeHandler, sessionResponseState, validationError, rememberSetting, setRememberSetting, buttonState, launchBtnClickHandler, useLocationOptionHook, }) {
    const ACS_VOICE_PREFERENCE = 'phone-AcsEnabled';
    const acdSessionStyles = CcfAcdSessionStyles(theme);
    const [translate] = useTranslator();
    /**
     *
     * @returns label for text Field
     * @example returnTextFieldLabel()
     */
    const returnTextFieldLabel = () => {
        const { defaultSelected } = radioButtonState;
        if (defaultSelected === 'phone') {
            return translate('phoneNumber');
        }
        else if (defaultSelected === ACS_VOICE_PREFERENCE) {
            return translate('msTeamsEmail');
        }
        else {
            return translate('stationId');
        }
    };
    /**
     * Function to return error message based on errortype key passed
     * @param inputval - error message type key string
     * @example - getTranslatedSessionError(inputval)
     */
    const getTranslatedSessionError = (inputValKey) => {
        switch (inputValKey) {
            case 'invalidstationid':
                return translate('invalidStationId');
            case 'invalidagentid':
                return translate('invalidAgentid');
            case 'invalidphonenumber':
                return translate('invalidPhoneNumber');
            case 'phonenumberinusegeneric':
                return translate('phoneNumberInUseGeneric');
            case 'phonenumberinuse':
                return translate('phoneNumberInUse');
            /*return <CcfTypography translationKey="phoneNumberInUse" extraArgs={{ format: [agentName] }}/>*/
            case 'stationidinusegeneric':
                return translate('stationIdInUseGeneric');
            case 'stationidinuse':
                return translate('stationIdInUse');
            case 'phonenumberinuselessthansevendigits':
                return translate('phoneNumberInUseLessThanSevenDigits');
            case 'stationlimitexceeded':
                return translate('stationLimitExceeded');
            case 'sessioninprogress':
                return translate('sessionInProgress');
            case 'agentorstationlimitexceeded':
                return translate('agentOrStationLimitExceeded');
            default:
                return '';
        }
    };
    /**
     * Function to show input field value response error
     * @param selectedType - selected type of input box(phone or station id)
     * @example - getErrorHelperText( selectedType)
     */
    const getErrorHelperText = (selectedInputType) => {
        var _a;
        switch (sessionResponseState.sessionStatusCode) {
            case 500:
                return getTranslatedSessionError('genericError');
            case 400:
                if (sessionResponseState.sessionErrorDescription === 'InvalidPhoneNumberOrStation' &&
                    selectedInputType === 'phone') {
                    return getTranslatedSessionError('invalidphonenumber');
                }
                else if ((sessionResponseState.sessionErrorDescription === 'InvalidPhoneNumberOrStation' ||
                    sessionResponseState.sessionErrorDescription === 'Invalid parameter \'stationId\', must be type Int32') &&
                    selectedInputType === 'stationId') {
                    return getTranslatedSessionError('invalidstationid');
                }
                else if ((sessionResponseState.sessionErrorDescription === 'PhoneNumberInUseGeneric' ||
                    sessionResponseState.sessionErrorDescription === 'PhoneNumberInUse') &&
                    selectedInputType === 'stationId') {
                    return getTranslatedSessionError('stationidinusegeneric');
                }
                else if (sessionResponseState.sessionErrorDescription === 'PhoneNumberInUse' ||
                    sessionResponseState.sessionErrorDescription === 'StationIDInUse') {
                    const index = sessionResponseState.sessionStatusText.indexOf('by');
                    const dotIndex = sessionResponseState.sessionStatusText.indexOf('.');
                    if (index !== -1 && dotIndex !== -1) {
                        return getTranslatedSessionError(sessionResponseState.sessionErrorDescription.toLowerCase());
                    }
                }
                return (getTranslatedSessionError((_a = sessionResponseState.sessionErrorDescription) === null || _a === void 0 ? void 0 : _a.toLowerCase()) ||
                    sessionResponseState.sessionErrorDescription);
            case 401:
                return translate('unauthorized');
            case 403:
                return translate('insufficientPermissions');
            default:
                return validationError.status && validationError.message;
        }
    };
    return (_jsx(Box, Object.assign({ component: "div", sx: acdSessionStyles.voicePrefernceParent }, { children: radioButtonState.data[0].showRadioOption ||
            radioButtonState.data[1].showRadioOption ||
            radioButtonState.data[3].showRadioOption ? (_jsx(Grid, Object.assign({ container: true, style: { height: 'inherit' } }, { children: _jsx(Grid, Object.assign({ item: true, lg: 12, md: 12, xs: 12, sm: 12 }, { children: _jsxs(Box, Object.assign({ sx: acdSessionStyles.loginContainer }, { children: [_jsxs(Card, Object.assign({ variant: "outlined", sx: acdSessionStyles.voicePreferenceCard }, { children: [_jsxs(Box, Object.assign({ sx: acdSessionStyles.agentHeader }, { children: [_jsx(CcfCXAgentLogoIcon, { role: "img", tabIndex: 0, "data-testid": "cxa-logo", titleAccess: translate('logoLabel'), sx: acdSessionStyles.cxoneLogo }), _jsx(CcfTypography, Object.assign({ sx: acdSessionStyles.agentHeaderText }, { children: translate('cxoneAgent') }))] })), _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH, sx: acdSessionStyles.agentHeaderDivider }), _jsx(CardHeader, { title: voiceConnection, sx: acdSessionStyles.header, "aria-label": voiceConnection }), _jsx(CardContent, Object.assign({ sx: acdSessionStyles.voicePrefCardWrapper }, { children: showSpinner ? (_jsx(CircularProgress, { "aria-label": translate('loadingIndicator'), size: 20, "data-testid": "circular-progress" })) : (_jsx(Box, Object.assign({ sx: acdSessionStyles.preferenceSelectorContainer, "data-testid": "acd-session" }, { children: _jsxs(FormControl, { children: [_jsx(CcfRadioHighlight, { options: radioButtonState, onRadioButtonSelection: stationOptionsChangeHandler ||
                                                        (() => {
                                                            /* noop */
                                                        }), sx: acdSessionStyles.voicePreferenceRadioHighlight, id: "radioHighlight" }), radioButtonState.defaultSelected !== 'softPhone' && (_jsx(CcfTextField, { "aria-label": returnTextFieldLabel(), id: "numberOrStationIdInput", placeholder: returnTextFieldLabel(), size: "small", variant: "outlined", fullWidth: true, value: (inputBoxState === null || inputBoxState === void 0 ? void 0 : inputBoxState.enteredVoicePrefInput) || '', onChange: inputNumberChangeHandler, helperText: getErrorHelperText(radioButtonState.defaultSelected), error: sessionResponseState.sessionStatusCode === 400 || validationError.status ? true : false, sx: Object.assign({}, acdSessionStyles.voicePreferenceInputField), inputRef: (input) => {
                                                        if (input != null) {
                                                            if (radioButtonState.data.filter((item) => item.showRadioOption).length === 1) {
                                                                input.focus();
                                                            }
                                                            if (sessionResponseState.sessionStatusCode === 400 || validationError.status) {
                                                                input.focus();
                                                            }
                                                        }
                                                    }, inputProps: {
                                                        'aria-label': returnTextFieldLabel(),
                                                        'aria-required': true,
                                                    } })), _jsx(FormControlLabel, { id: "rememberSetting", sx: acdSessionStyles.rememberSetting, control: _jsx(Checkbox, { checked: rememberSetting, onChange: (e) => setRememberSetting(e.target.checked) }), label: translate('rememberSetting'), labelPlacement: "end" }), isLocationFTEnabled && (_jsxs(Box, Object.assign({ component: "div" }, { children: [_jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH, sx: acdSessionStyles.voicePreferenceDivider }), _jsx(CardActions, Object.assign({ sx: [acdSessionStyles.locationHeader] }, { children: _jsx(CcfLocationOption, { useLocationOptionHook: useLocationOptionHook }) }))] }))), _jsx(Box, Object.assign({ component: "div", sx: acdSessionStyles.buttonWrapper }, { children: _jsx(CcfButton, Object.assign({ "aria-label": translate('launch'), id: "launchBtn", variant: "outlined", disabled: buttonState.buttonDisabled, fullWidth: true, disableElevation: true, primary: true, onClick: launchBtnClickHandler }, { children: _jsx(CcfTypography, { translationKey: "launch" }) })) }))] }) }))) }))] })), _jsx(CcfTypography, { sx: acdSessionStyles.disclaimerText, translationKey: "emergencyCallingDisclaimer" })] })) })) }))) : (_jsx(Box, Object.assign({ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }, { children: _jsx(CircularProgress, { size: 80, "data-testid": "circular-progress-loader" }) }))) })));
}
export default CcfVoicePreference;
//# sourceMappingURL=ccf-voice-preference.js.map