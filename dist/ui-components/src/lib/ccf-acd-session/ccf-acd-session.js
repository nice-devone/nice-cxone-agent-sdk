import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import { Box, useTheme, } from '@mui/material';
import { voicePreferenceActions, selectVoicePrefernceState, selectVoicePrefernceBtnState, selectVoicePrefInputState, startSession, selectAcdSessionActiveState, isAudiocodesEnabled, integratedSoftphonePermissionState, joinSession, showErrorState, voicePermissionsEnabledState, ACS_VOICE_PREFERENCE, getSelectedUserLocation, selectUserLocation, } from '../ccf-acd-session/ccf-acd-session.slice';
import { CcfAlert, CcfButton, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import { useEffect, useState } from 'react';
import { isValidPhoneNumber, isValidStationId } from './../../util/uiValidationUtils';
import { logoutUser } from '../ccf-authentication/ccf-authentication.slice';
import { LocalStorageHelper, Logger, StorageKeys, ValidationUtils } from '@nice-devone/core-sdk';
import CcfAcdSessionStyles from './ccf-acd-session.styles';
import { agentSettingsActions, getAgentProfileSettings } from '../ccf-agent-setting/ccf-agent-setting-slice';
import { isFeatureEnabledAsync } from '../../util/featureToggleUtils';
import { resizeWindow, storeResizeWindow } from '../../util/agentProfileUtils';
import { AgentScreenSize } from '../../enums/agent-profile-enums';
import CcfVoicePreference from './ccf-voice-preference';
/**
 * PREFIX used to concatenate the email id so the BE understands the user is logged in using ACS preference. Ms Teams is used to guide / route the call towards MS Teams.
 */
const ACS_API_PREFIX = 'MSTeams:';
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
export function CcfAcdSession({ isLocationFTEnabled = false, authError = false, cxoneApp = 'cxa' }) {
    const ccfLogger = new Logger('CcfAcdSession');
    const theme = useTheme();
    const acdSessionStyles = CcfAcdSessionStyles(theme);
    const dispatch = useDispatch();
    const showError = useSelector(showErrorState);
    const isVoicePermissionEnabled = useSelector(voicePermissionsEnabledState);
    const radioButtonState = useSelector(selectVoicePrefernceState);
    const buttonState = useSelector(selectVoicePrefernceBtnState);
    const inputBoxState = useSelector(selectVoicePrefInputState);
    const sessionResponseState = useSelector(selectAcdSessionActiveState);
    const [translate] = useTranslator();
    const voiceConnection = translate('voiceConnection');
    const [validationError, setValidationError] = useState({ status: false, message: '' });
    const integratedSoftphonePermission = useSelector(integratedSoftphonePermissionState);
    const showSpinner = radioButtonState.data.every(el => !el.showRadioOption);
    const { stationInputNumberAdded, stationOptionSelected } = voicePreferenceActions;
    const [rememberSetting, setRememberSetting] = useState(false);
    const [isAgentProfileFTEnabled, setIsAgentProfileFTEnabled] = useState(false);
    const validationUtil = new ValidationUtils();
    const agentId = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true)['icAgentId'];
    const selectedLocationId = useSelector(getSelectedUserLocation);
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    useEffect(() => {
        try {
            // Fetching agent profile details (Api Call)
            isFeatureEnabledAsync('release-CMA-agent-profile-AW-34218').then((isAgentProfileFTEnabledAsync) => {
                setIsAgentProfileFTEnabled(isAgentProfileFTEnabledAsync);
            });
        }
        catch (_error) {
            ccfLogger.error('isFeatureEnabledAsync', 'Error in fetching FT for Agent Profile');
        }
    }, []);
    useEffect(() => {
        const screenSize = agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.agentScreenSize;
        if ((cxoneApp !== 'cxa') || (screenSize && screenSize.length && screenSize.toUpperCase() !== AgentScreenSize.DEFINED_BY_AGENT))
            return;
        window === null || window === void 0 ? void 0 : window.addEventListener('resize', () => { var _a, _b; storeResizeWindow((_a = window === null || window === void 0 ? void 0 : window.innerWidth) === null || _a === void 0 ? void 0 : _a.toString(), (_b = window === null || window === void 0 ? void 0 : window.innerHeight) === null || _b === void 0 ? void 0 : _b.toString()); });
        return () => {
            window === null || window === void 0 ? void 0 : window.removeEventListener('resize', () => { var _a, _b; storeResizeWindow((_a = window === null || window === void 0 ? void 0 : window.innerWidth) === null || _a === void 0 ? void 0 : _a.toString(), (_b = window === null || window === void 0 ? void 0 : window.innerHeight) === null || _b === void 0 ? void 0 : _b.toString()); });
        };
    }, [agentProfileSettings]);
    useEffect(() => {
        const pastLogins = LocalStorageHelper.getItem(StorageKeys.VOICE_PREFERENCE, true) || [];
        const oldLogin = pastLogins.find((login) => login.agentId === agentId);
        if (oldLogin && (oldLogin === null || oldLogin === void 0 ? void 0 : oldLogin.rememberSetting)) {
            const buttonState = radioButtonState.data.find((state) => state.value === (oldLogin === null || oldLogin === void 0 ? void 0 : oldLogin.selectedVoicePref));
            if (buttonState && buttonState.showRadioOption) {
                dispatch(stationOptionSelected(oldLogin.selectedVoicePref));
                if (oldLogin.selectedVoicePref !== 'softPhone') {
                    dispatch(stationInputNumberAdded(oldLogin.voiceInputVal));
                }
                setRememberSetting(oldLogin.rememberSetting);
            }
        }
    }, [agentId, dispatch, stationInputNumberAdded, stationOptionSelected]);
    useEffect(() => {
        if (integratedSoftphonePermission) {
            dispatch(isAudiocodesEnabled());
        }
    }, [dispatch, integratedSoftphonePermission]);
    useEffect(() => {
        if (sessionResponseState.sessionStatusCode === 409) {
            dispatch(joinSession());
        }
    }, [dispatch, sessionResponseState]);
    useEffect(() => {
        if (!radioButtonState.data[0].showRadioOption && !radioButtonState.data[1].showRadioOption && radioButtonState.data[2].showRadioOption && !radioButtonState.data[3].showRadioOption) {
            sessionStart();
        }
    }, [radioButtonState === null || radioButtonState === void 0 ? void 0 : radioButtonState.data]);
    /**
    * Function to handle voice preference button click
    * @param e - React.SyntheticEvent
    * @example launchBtnClickHandler(e)
    */
    const launchBtnClickHandler = (e) => {
        e.preventDefault();
        if (cxoneApp === 'cxa' && isAgentProfileFTEnabled) {
            dispatch(agentSettingsActions.setIsResizeWindowFunctionCalled(true));
            resizeWindow(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.agentScreenSize);
        }
        sessionStart();
        selectedLocationId && dispatch(selectUserLocation(selectedLocationId));
    };
    /**
    * @param enteredData - we need not to pass any params
    * @example
    * ```
    * transformInputData(data)
    * ```
    * @returns string value
    */
    const transformInputData = (enteredData) => {
        if ((radioButtonState === null || radioButtonState === void 0 ? void 0 : radioButtonState.defaultSelected) === ACS_VOICE_PREFERENCE) {
            return `${ACS_API_PREFIX}${enteredData === null || enteredData === void 0 ? void 0 : enteredData.trim()}`;
        }
        return enteredData;
    };
    /**
    * Function to process voice preference
    * @example sessionStart()
    */
    const sessionStart = () => {
        var _a;
        const isInputDataValid = validateInputData(inputBoxState.enteredVoicePrefInput, radioButtonState.defaultSelected);
        const enteredData = (_a = inputBoxState === null || inputBoxState === void 0 ? void 0 : inputBoxState.enteredVoicePrefInput) !== null && _a !== void 0 ? _a : '';
        const isAcsSelected = radioButtonState.defaultSelected === ACS_VOICE_PREFERENCE;
        if (isInputDataValid) {
            const sessionInputData = {
                voiceInputVal: transformInputData(enteredData),
                selectedVoicePref: radioButtonState.defaultSelected,
            };
            enteredData && isAcsSelected && LocalStorageHelper.setItem(StorageKeys.ACS_EMAIL_ID, enteredData);
            setLoginPreference(Object.assign(Object.assign({}, sessionInputData), { rememberSetting, agentId }));
            dispatch(startSession(sessionInputData));
        }
    };
    /**
     * Function to set agent login preference
     * @param loginPreference - agent login preference
     * @example setLoginPreference(loginPreference)
     */
    const setLoginPreference = (loginPreference) => {
        var _a, _b, _c, _d;
        const pastLogins = LocalStorageHelper.getItem(StorageKeys.VOICE_PREFERENCE, true) || [];
        let oldLogin = null;
        if (pastLogins.length) {
            oldLogin = pastLogins.find((login) => login.agentId === agentId);
        }
        if (oldLogin) {
            if (loginPreference.rememberSetting) {
                oldLogin.rememberSetting = loginPreference.rememberSetting;
                oldLogin.selectedVoicePref = loginPreference.selectedVoicePref;
                //This is to check whether the session is created through ACS
                const isMsTeamsPrefixed = (_b = (_a = loginPreference === null || loginPreference === void 0 ? void 0 : loginPreference.voiceInputVal) === null || _a === void 0 ? void 0 : _a.toString()) === null || _b === void 0 ? void 0 : _b.includes(ACS_API_PREFIX);
                if (((loginPreference === null || loginPreference === void 0 ? void 0 : loginPreference.selectedVoicePref) === ACS_VOICE_PREFERENCE) && isMsTeamsPrefixed) {
                    // Remove `MSTeams:` prefix from the email.  
                    const prefixRemovedAcsLabel = (_c = loginPreference === null || loginPreference === void 0 ? void 0 : loginPreference.voiceInputVal) === null || _c === void 0 ? void 0 : _c.substring(8);
                    oldLogin.voiceInputVal = prefixRemovedAcsLabel;
                }
                else
                    oldLogin.voiceInputVal = loginPreference === null || loginPreference === void 0 ? void 0 : loginPreference.voiceInputVal;
            }
            else {
                pastLogins.splice(pastLogins.indexOf(oldLogin), 1);
            }
        }
        else if (loginPreference.rememberSetting) {
            if ((loginPreference === null || loginPreference === void 0 ? void 0 : loginPreference.selectedVoicePref) === ACS_VOICE_PREFERENCE) {
                const prefixRemovedAcsLabel = (_d = loginPreference === null || loginPreference === void 0 ? void 0 : loginPreference.voiceInputVal) === null || _d === void 0 ? void 0 : _d.substring(8);
                const newLoginPreference = Object.assign(Object.assign({}, loginPreference), { voiceInputVal: prefixRemovedAcsLabel });
                pastLogins.push(newLoginPreference);
            }
            else
                pastLogins.push(loginPreference);
        }
        LocalStorageHelper.setItem(StorageKeys.VOICE_PREFERENCE, JSON.stringify(pastLogins));
    };
    /**
     * Function to validate input field value
     * @param inputval - text box value to validate
     * @param selectedType - selected type of input box(phone or station id)
     * @example - validateInputData(inputValue, selectedType)
     */
    const validateInputData = (inputVal, selectedType) => {
        const stringInputValue = inputVal.toString();
        if (selectedType === 'phone' && !isValidPhoneNumber(inputVal)) {
            setValidationError({ status: true, message: `${translate('error')}: ${translate('invalidPhoneNumber')}` });
            return false;
        }
        else if (selectedType === 'stationId' && !isValidStationId(inputVal)) {
            setValidationError({ status: true, message: translate('invalidStationId') });
            return false;
        }
        else if (selectedType === ACS_VOICE_PREFERENCE && (!validationUtil.validateRFCSupportedEmail(stringInputValue === null || stringInputValue === void 0 ? void 0 : stringInputValue.trim()) || (stringInputValue === null || stringInputValue === void 0 ? void 0 : stringInputValue.length) > 320)) {
            setValidationError({ status: true, message: translate('invalidEmailAddress') });
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * Function to handle radio button change
     * @param e - React.ChangeEvent<HTMLInputElement>
     * @example - stationOptionsChangeHandler(e)
     */
    const stationOptionsChangeHandler = (e) => {
        e.preventDefault();
        setValidationError({ status: false, message: '' });
        dispatch(stationOptionSelected(e.target.value));
    };
    /**
     * Function to handle voice preference input change
     * @param e - React.ChangeEvent<HTMLInputElement>
     * @example - inputNumberChangeHandler(e)
     */
    const inputNumberChangeHandler = (e) => {
        e.preventDefault();
        setValidationError({ status: false, message: '' });
        dispatch(stationInputNumberAdded(e.target.value));
    };
    /**
     * Function to handle back button click
     * @example backHandler()
     */
    const backHandler = () => {
        dispatch(logoutUser({ forceLogOff: false, ignorePersonaQueue: false }));
    };
    if (showError || authError) {
        return _jsx(Box, Object.assign({ component: 'div', sx: acdSessionStyles.voicePrefernceParent }, { children: _jsxs(Box, Object.assign({ component: 'div', sx: acdSessionStyles.errorFallback }, { children: [_jsxs(CcfAlert, Object.assign({ closeAlert: () => {
                            return false;
                        }, severity: "error", variant: "filled", "data-testid": "error-alert" }, { children: [authError && translate('authError'), !authError && !isVoicePermissionEnabled && translate('voicePermissionUnavailable')] })), _jsx(CcfButton, Object.assign({ "aria-label": translate('backToLogin'), id: "backToLogin", variant: "outlined", fullWidth: false, disableElevation: true, sx: acdSessionStyles.errorFallbackBack, onClick: backHandler, primary: true }, { children: _jsx(CcfTypography, { translationKey: "backToLogin" }) }))] })) }));
    }
    return (_jsx(CcfVoicePreference, { theme: theme, isLocationFTEnabled: isLocationFTEnabled, radioButtonState: radioButtonState, voiceConnection: voiceConnection, showSpinner: showSpinner, stationOptionsChangeHandler: stationOptionsChangeHandler, inputBoxState: inputBoxState, inputNumberChangeHandler: inputNumberChangeHandler, sessionResponseState: sessionResponseState, validationError: validationError, rememberSetting: rememberSetting, setRememberSetting: setRememberSetting, buttonState: buttonState, launchBtnClickHandler: launchBtnClickHandler }));
}
export default CcfAcdSession;
//# sourceMappingURL=ccf-acd-session.js.map