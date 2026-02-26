import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box, useTheme, Popover, ListSubheader, RadioGroup, FormControlLabel, Radio, Button, useMediaQuery } from '@mui/material';
import { CcfTooltip, CcfTypography, CcfCloseIcon, CcfTextField, useTranslator, } from '@nice-devone/ui-controls';
import { voiceHubIconList, voiceHubIconListSmView } from './ccf-voice-bio-hub-icons';
import ccfVoiceBioMetricsStyles from './ccf-voice-bio-metrics.styles';
import { useDispatch, useSelector } from 'react-redux';
import { CcfAssignmentAction, getVoiceBioHubStatus, getVoiceBioHubStatusMessage, getIsModalOpened, getVoiceBioHubData, retrieveContactANI, getSilentANIAuth, getVoiceBioHubPatronId, voiceContactSelector, getVoiceBioIsRetry, } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import agentContactHistoryStyles from '../ccf-app-space/ccf-agent-contact-history/ccf-agent-card-contact-history.style';
import CcfVoiceBioLoader from './ccf-voice-bio-loader';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
/** Enum for vioce bio hub buttons */
export var VOICE_BIO_BUTTON;
(function (VOICE_BIO_BUTTON) {
    VOICE_BIO_BUTTON["VERIFY"] = "verify";
    VOICE_BIO_BUTTON["CONSENT_OPTIN"] = "consentoptIn";
    VOICE_BIO_BUTTON["CONSENT_ENROLL"] = "consentEnroll";
})(VOICE_BIO_BUTTON || (VOICE_BIO_BUTTON = {}));
/** Enum for the icons in voice bio hub */
export var VOICE_BIO_ICONS;
(function (VOICE_BIO_ICONS) {
    VOICE_BIO_ICONS["RIGHT_ARROW"] = "right_arrow";
    VOICE_BIO_ICONS["LEFT_ARROW"] = "left_arrow";
    VOICE_BIO_ICONS["SUCCESS"] = "success_circle";
    VOICE_BIO_ICONS["MINUS"] = "minus_circle";
    VOICE_BIO_ICONS["X_CIRCLE"] = "x_circle";
    VOICE_BIO_ICONS["SUCCESS_SHIELD"] = "success_shield";
    VOICE_BIO_ICONS["WARNING"] = "warning_circle";
    VOICE_BIO_ICONS["SUSPECT"] = "suspect";
    VOICE_BIO_ICONS["ERROR"] = "error";
    VOICE_BIO_ICONS["EMPTY"] = "";
    VOICE_BIO_ICONS["AUDIO"] = "audio";
})(VOICE_BIO_ICONS || (VOICE_BIO_ICONS = {}));
const MAXIMUM_RETRY = 3;
/**
 * CCF Voice Bio hub Component
 * @example - <CcfVoiceBioMetrics />
 */
export const CcfVoiceBioMetrics = () => {
    var _a;
    const theme = useTheme();
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const isModalOpen = useSelector(getIsModalOpened);
    const isSmView = useMediaQuery((theme) => theme.breakpoints.down('xl'));
    const isIntegratedView = useMediaQuery(theme.breakpoints.down('md'));
    const voiceBioHubStatus = useSelector(getVoiceBioHubStatus);
    const ANI = useSelector(retrieveContactANI) || '';
    const voiceBioHubStatusMessage = useSelector(getVoiceBioHubStatusMessage);
    const voiceBioMetricsStyles = ccfVoiceBioMetricsStyles(theme);
    const style = agentContactHistoryStyles(theme);
    const [iconName, setIconName] = useState('audio');
    const [stateVal, setStateVal] = useState('voiceBioMetrics');
    const [popBtn, setPopBtn] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [customerID, updateCustomerID] = useState('');
    const [arrowBtn, setArrowBtn] = useState('right_arrow');
    const [statusMessage, setStatusMessage] = useState('');
    const [optInConsent, setOptInConsent] = useState('');
    const [reason, setReason] = useState('notInterestedNoTime');
    const [optedOutReason, setOptedOutReason] = useState('');
    const [retryCount, setRetryCount] = useState(0);
    const [popOverReferencePosition, setPopOverReferecePosition] = useState({ top: 0, left: 0 });
    const optOutReasons = ['notInterestedNoTime', 'moreInfo', 'thinkAbout', 'notHeared', 'callOnBehalf', 'believeSecurity', 'privacyIssues', 'noRecorded', 'otherReason'];
    const silentANIAuth = useSelector(getSilentANIAuth);
    const [currentIconIndex, setCurrentIconIndex] = useState(0);
    const patronId = useSelector(getVoiceBioHubPatronId);
    const voiceContactDetails = useSelector(voiceContactSelector);
    const isRetryRequest = useSelector(getVoiceBioIsRetry);
    const icons = [
        'audio_recording_p1',
        'audio_recording_p2',
        'audio_recording_p3',
        'audio_recording_p4'
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
        }, 1000);
        return () => clearInterval(interval);
    }, [icons.length]);
    useEffect(() => {
        if (silentANIAuth) {
            dispatch(CcfAssignmentAction.setVoiceBioHubPatronId(ANI));
        }
        else {
            setStateVal('voiceBioMetrics');
            setIconName('audio');
            dispatch(CcfAssignmentAction.setVoiceBioHubPatronId(''));
        }
    }, [silentANIAuth]);
    useEffect(() => {
        updateCustomerID(patronId);
    }, [patronId]);
    useEffect(() => {
        if (isModalOpen) {
            dispatch(CcfAssignmentAction.updateModalIsOpen(false));
        }
    }, []);
    useEffect(() => {
        var _a;
        const voiceBioHubAgentAssist = LocalStorageHelper.getItem(StorageKeys.VOICE_BIO_HUB_AGENT_ASSIST);
        const voiceBioProviderId = voiceBioHubAgentAssist ? (_a = JSON.parse(voiceBioHubAgentAssist)) === null || _a === void 0 ? void 0 : _a.providerId : '';
        if (voiceBioHubStatus === undefined || voiceBioHubStatus === '') {
            setStateVal(stateVal);
        }
        else {
            setStateVal(voiceBioHubStatus);
            if (voiceBioHubStatus === 'enrolled' || voiceBioHubStatus === 'authenticated') {
                setIconName(VOICE_BIO_ICONS.SUCCESS);
                setArrowBtn(VOICE_BIO_ICONS.EMPTY);
                setOptInConsent('');
            }
            else if (voiceBioHubStatus === 'optedOut') {
                setIconName(VOICE_BIO_ICONS.MINUS);
                setArrowBtn(VOICE_BIO_ICONS.RIGHT_ARROW);
            }
            else if (voiceBioHubStatus === 'noVoiceMatch') {
                setIconName(VOICE_BIO_ICONS.X_CIRCLE);
                setArrowBtn(VOICE_BIO_ICONS.RIGHT_ARROW);
            }
            else if (voiceBioHubStatus === 'voiceMatch') {
                setIconName(VOICE_BIO_ICONS.SUCCESS_SHIELD);
                !(voiceBioProviderId === null || voiceBioProviderId === void 0 ? void 0 : voiceBioProviderId.includes('nuance')) ? setArrowBtn(VOICE_BIO_ICONS.RIGHT_ARROW) : setArrowBtn(VOICE_BIO_ICONS.EMPTY);
                setArrowBtn(VOICE_BIO_ICONS.RIGHT_ARROW);
            }
            else if (voiceBioHubStatus === 'suspectedFraud') {
                setIconName(VOICE_BIO_ICONS.SUSPECT);
                !(voiceBioProviderId === null || voiceBioProviderId === void 0 ? void 0 : voiceBioProviderId.includes('nuance')) ? setArrowBtn(VOICE_BIO_ICONS.RIGHT_ARROW) : setArrowBtn(VOICE_BIO_ICONS.EMPTY);
            }
            else if (voiceBioHubStatus === 'notEnrolled') {
                setIconName(VOICE_BIO_ICONS.X_CIRCLE);
                setArrowBtn(VOICE_BIO_ICONS.RIGHT_ARROW);
            }
            else if (voiceBioHubStatus === 'enrollmentFailed') {
                setIconName(VOICE_BIO_ICONS.X_CIRCLE);
                setArrowBtn(VOICE_BIO_ICONS.RIGHT_ARROW);
                setOptInConsent('');
            }
            else if (voiceBioHubStatus === 'loginError' || voiceBioHubStatus === 'error') {
                setIconName(VOICE_BIO_ICONS.ERROR);
                setArrowBtn(VOICE_BIO_ICONS.RIGHT_ARROW);
            }
            else if (voiceBioHubStatus === 'voiceBioMetrics') {
                setIconName(VOICE_BIO_ICONS.AUDIO);
            }
        }
        setStatusMessage(voiceBioHubStatusMessage);
    }, [voiceBioHubStatus, voiceBioHubStatusMessage]);
    /**
  * handle open popover event
  * @example openPopOverMenu()
  */
    const openPopOverMenu = (event) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const voiceBioHubAgentAssist = LocalStorageHelper.getItem(StorageKeys.VOICE_BIO_HUB_AGENT_ASSIST);
        const voiceBioProviderId = voiceBioHubAgentAssist ? (_a = JSON.parse(voiceBioHubAgentAssist)) === null || _a === void 0 ? void 0 : _a.providerId : '';
        setAnchorEl(event.currentTarget);
        if ((stateVal === 'voiceMatch' || stateVal === 'enrolled' || stateVal === 'noVoiceMatch' || stateVal === 'suspectedFraud') && (voiceBioProviderId === null || voiceBioProviderId === void 0 ? void 0 : voiceBioProviderId.includes('nuance')))
            setPopOverReferecePosition({ top: ((_b = event.currentTarget.getBoundingClientRect()) === null || _b === void 0 ? void 0 : _b.top) - 100, left: (((_c = event.currentTarget.getBoundingClientRect()) === null || _c === void 0 ? void 0 : _c.left) - 70) });
        else if (stateVal === 'voiceBioMetrics') {
            setPopOverReferecePosition({ top: ((_d = event.currentTarget.getBoundingClientRect()) === null || _d === void 0 ? void 0 : _d.top) - 170, left: (((_e = event.currentTarget.getBoundingClientRect()) === null || _e === void 0 ? void 0 : _e.left) - 70) });
        }
        else if (stateVal === 'verifyingEnrollment' || stateVal === 'enrollmentRequest' || stateVal === 'processingOptOut') {
            setPopOverReferecePosition({ top: ((_f = event.currentTarget.getBoundingClientRect()) === null || _f === void 0 ? void 0 : _f.top) - 100, left: (((_g = event.currentTarget.getBoundingClientRect()) === null || _g === void 0 ? void 0 : _g.left) - 70) });
        }
        else
            setPopOverReferecePosition({ top: ((_h = event.currentTarget.getBoundingClientRect()) === null || _h === void 0 ? void 0 : _h.top) - 130, left: (((_j = event.currentTarget.getBoundingClientRect()) === null || _j === void 0 ? void 0 : _j.left) - 70) });
    };
    /**
   * handle close event
   * @example handleClose()
   */
    const handleClose = () => {
        setAnchorEl(null);
        dispatch(CcfAssignmentAction.updateModalIsOpen(false));
        if (arrowBtn !== VOICE_BIO_ICONS.EMPTY) {
            setArrowBtn(VOICE_BIO_ICONS.RIGHT_ARROW);
        }
        if (stateVal !== 'enrollmentRequest') {
            setOptInConsent('');
        }
        setOptedOutReason('');
    };
    /**
     * handle click on main text
     * @example handleClick()
     */
    const handleClick = (event) => {
        openPopOverMenu(event);
        handleStatusMessageClick();
    };
    /**
     * handle click on status message
     * @example handleStatusMessageClick()
     */
    const handleStatusMessageClick = () => {
        dispatch(CcfAssignmentAction.updateModalIsOpen(true));
        switch (stateVal) {
            case 'voiceBioMetrics':
                if (silentANIAuth) {
                    dispatch(CcfAssignmentAction.setVoiceBioHubPatronId(ANI));
                    fetchVoiceBioHubData(2);
                    setStateVal('verifyingEnrollment');
                    setIconName(_jsx(Box, Object.assign({ display: "flex", justifyContent: "center", alignItems: "center", height: '40%' }, { children: _jsx(CcfVoiceBioLoader, { showLoadingText: false, isPrimary: true }) })));
                    setArrowBtn(VOICE_BIO_ICONS.EMPTY);
                }
                else {
                    setPopBtn(VOICE_BIO_BUTTON.VERIFY);
                    setArrowBtn(VOICE_BIO_ICONS.LEFT_ARROW);
                }
                break;
            case 'optedOut':
                setPopBtn(VOICE_BIO_BUTTON.CONSENT_OPTIN);
                setArrowBtn(VOICE_BIO_ICONS.LEFT_ARROW);
                break;
            case 'notEnrolled':
                setPopBtn(VOICE_BIO_BUTTON.CONSENT_ENROLL);
                setArrowBtn(VOICE_BIO_ICONS.LEFT_ARROW);
                break;
            case 'noVoiceMatch':
            case 'loginError':
            case 'error':
            case 'voiceMatch':
            case 'enrollmentFailed':
                setArrowBtn(VOICE_BIO_ICONS.LEFT_ARROW);
                break;
            default:
                isSmView ? dispatch(CcfAssignmentAction.updateModalIsOpen(true)) : dispatch(CcfAssignmentAction.updateModalIsOpen(false));
                break;
        }
    };
    /**
   * handle secondary button click in popup
   * @example handleSecondaryBtnClick()
   */
    const handleSecondaryBtnClick = () => __awaiter(void 0, void 0, void 0, function* () {
        if (popBtn === VOICE_BIO_BUTTON.VERIFY) {
            setStateVal('verifyingEnrollment');
            setIconName(_jsx(Box, Object.assign({ display: "flex", justifyContent: "center", alignItems: "center", height: '40%' }, { children: _jsx(CcfVoiceBioLoader, { showLoadingText: false, isPrimary: true }) })));
            setArrowBtn(VOICE_BIO_ICONS.EMPTY);
            dispatch(CcfAssignmentAction.setVoiceBioHubPatronId(customerID));
            dispatch(CcfAssignmentAction.setVoiceBioHubData({
                voiceBioHubStatus: 'verifyingEnrollment',
                voiceBioHubStatusMessage: '',
                isSuccessVoiceBioHubResponseType: false,
                voiceBioHubCurrentRequestType: 2,
                voiceBioHubPatronId: customerID,
            }));
            yield fetchVoiceBioHubData(2); //Submit Person API
        }
        else if (popBtn === VOICE_BIO_BUTTON.CONSENT_OPTIN) {
            setStateVal('enrollmentRequest');
            dispatch(CcfAssignmentAction.setVoiceBioHubData({
                voiceBioHubStatus: 'enrollmentRequest',
                voiceBioHubStatusMessage: 'Requesting enrollment...',
                isSuccessVoiceBioHubResponseType: false,
                voiceBioHubCurrentRequestType: 1,
                voiceBioHubPatronId: customerID,
            }));
            setOptInConsent(() => 'optIn');
            setIconName(_jsx(Box, Object.assign({ display: "flex", justifyContent: "center", alignItems: "center", height: '40%' }, { children: _jsx(CcfVoiceBioLoader, { showLoadingText: false, isPrimary: true }) })));
            setArrowBtn(VOICE_BIO_ICONS.EMPTY);
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                yield fetchVoiceBioHubData(1); //Enrollment API
            }), 3000);
        }
        else if (popBtn === VOICE_BIO_BUTTON.CONSENT_ENROLL) {
            setStateVal('enrollmentRequest');
            dispatch(CcfAssignmentAction.setVoiceBioHubData({
                voiceBioHubStatus: 'enrollmentRequest',
                voiceBioHubStatusMessage: 'Requesting enrollment...',
                isSuccessVoiceBioHubResponseType: false,
                voiceBioHubCurrentRequestType: 1,
                voiceBioHubPatronId: customerID,
            }));
            setOptInConsent(() => 'consentEntroll');
            setIconName(_jsx(Box, Object.assign({ display: "flex", justifyContent: "center", alignItems: "center", height: '40%' }, { children: _jsx(CcfVoiceBioLoader, { showLoadingText: false, isPrimary: true }) })));
            setArrowBtn(VOICE_BIO_ICONS.EMPTY);
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                yield fetchVoiceBioHubData(1); //Enrollment API
            }), 3000);
        }
    });
    /** method for API calls
     * @example fetchVoiceBioHubData(0,'2',profileName)
    */
    const fetchVoiceBioHubData = (requestType) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        dispatch(CcfAssignmentAction.updateModalIsOpen(false));
        const voiceBioHubAgentAssist = LocalStorageHelper.getItem(StorageKeys.VOICE_BIO_HUB_AGENT_ASSIST);
        const voiceBioConfigName = (_c = (_b = JSON.parse(voiceBioHubAgentAssist)) === null || _b === void 0 ? void 0 : _b.profileName) !== null && _c !== void 0 ? _c : '';
        const voiceBioProviderName = (_e = (_d = JSON.parse(voiceBioHubAgentAssist)) === null || _d === void 0 ? void 0 : _d.providerId) !== null && _e !== void 0 ? _e : '';
        const patronId = silentANIAuth ? ANI : customerID;
        if (requestType === 3) {
            dispatch(getVoiceBioHubData({ patronId, requestType, voiceBioConfigName, OptOutReason: translate(reason), contactId: (_f = voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.contactID) === null || _f === void 0 ? void 0 : _f.toString(), CustomParams: { ANI: ANI, contactId: (_g = voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.contactID) === null || _g === void 0 ? void 0 : _g.toString(), isInbound: voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.isInbound, isRetry: isRetryRequest },
                stringParams: JSON.stringify({ ANI: ANI, contactId: (_h = voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.contactID) === null || _h === void 0 ? void 0 : _h.toString(), masterId: (_j = voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.masterID) === null || _j === void 0 ? void 0 : _j.toString(), isInbound: voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.isInbound, isRetry: isRetryRequest, params: { voiceBiometricProfileName: voiceBioConfigName, providerId: voiceBioProviderName, isRetry: isRetryRequest } }) }));
        }
        else {
            dispatch(getVoiceBioHubData({ patronId, requestType, voiceBioConfigName, contactId: (_k = voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.contactID) === null || _k === void 0 ? void 0 : _k.toString(), CustomParams: { ANI: ANI, contactId: (_l = voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.contactID) === null || _l === void 0 ? void 0 : _l.toString(), isInbound: voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.isInbound, isRetry: isRetryRequest },
                stringParams: JSON.stringify({ ANI: ANI, contactId: (_m = voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.contactID) === null || _m === void 0 ? void 0 : _m.toString(), masterId: (_o = voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.masterID) === null || _o === void 0 ? void 0 : _o.toString(), isInbound: voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.isInbound, isRetry: isRetryRequest, params: { voiceBiometricProfileName: voiceBioConfigName, providerId: voiceBioProviderName, isRetry: isRetryRequest } }) }));
            ;
        }
    });
    /**
   * method for to render elements based on button click
   * @example renderInnerElements()
   */
    const renderInnerElements = (message) => {
        return (_jsxs(Box, Object.assign({ sx: voiceBioMetricsStyles.popoverContainer }, { children: [message && (_jsx(CcfTypography, Object.assign({ sx: voiceBioMetricsStyles.innerMessage }, { children: message }))), voiceHubIconList[icons[currentIconIndex]]('14px', { htmlColor: theme.palette.text.noteLabel })] })));
    };
    /**
   * rendering elements based on button click
   * @example renderContent()
   */
    const renderOptInConsent = () => {
        switch (optInConsent) {
            case 'optIn':
            case 'consentEntroll':
                return renderInnerElements('Capturing audio...');
            default:
                return null;
        }
    };
    /**
   * rendering elements based on button click
   * @example renderContent()
   */
    const renderContent = () => {
        switch (stateVal) {
            case 'voiceBioMetrics':
                return renderElements({ btnText: VOICE_BIO_BUTTON.VERIFY });
            case 'optedOut':
                return renderElements({ btnText: VOICE_BIO_BUTTON.CONSENT_OPTIN, message: statusMessage });
            case 'notEnrolled':
                return renderElements({ btnText: VOICE_BIO_BUTTON.CONSENT_ENROLL, message: 'Customer is not enrolled.' });
            case 'enrolled':
                return renderElements({ message: statusMessage });
            case 'noVoiceMatch':
            case 'loginError':
            case 'error':
            case 'voiceMatch':
            case 'suspectedFraud':
            case 'verifyingEnrollment':
            case 'enrollmentFailed':
                return renderElements({ message: statusMessage });
            default:
                return null;
        }
    };
    /***
     * click event for handling radio button change
     * @example handleOptOutReasonChange()
     */
    const handleOptOutReasonChange = (e) => {
        setReason(e.target.value);
    };
    /***
     * click event for handling opt out button
     * @example handleOptOutClick()
     */
    const handleOptOutClick = () => {
        setOptedOutReason('optedOutReasons');
    };
    /***
     * click event for handling opt out button
     * @example handleRetryClick()
     */
    const handleRetryClick = () => {
        if (silentANIAuth) {
            setStateVal('verifyingEnrollment');
            dispatch(CcfAssignmentAction.setVoiceBioHubData({
                voiceBioHubStatus: 'verifyingEnrollment',
                voiceBioHubStatusMessage: '',
                isSuccessVoiceBioHubResponseType: true,
                voiceBioHubCurrentRequestType: 2,
                voiceBioHubPatronId: customerID,
            }));
            setIconName(_jsx(Box, Object.assign({ display: "flex", justifyContent: "center", alignItems: "center", height: '40%' }, { children: _jsx(CcfVoiceBioLoader, { showLoadingText: false, isPrimary: true }) })));
            setArrowBtn(VOICE_BIO_ICONS.EMPTY);
            updateCustomerID(ANI);
            dispatch(CcfAssignmentAction.setVoiceBioIsRetryRequest(true));
            fetchVoiceBioHubData(2);
        }
        else {
            setStateVal('voiceBioMetrics');
            dispatch(CcfAssignmentAction.setVoiceBioHubData({
                voiceBioHubStatus: 'voiceBioMetrics',
                voiceBioHubStatusMessage: '',
                isSuccessVoiceBioHubResponseType: true,
                voiceBioHubCurrentRequestType: 2,
                voiceBioHubPatronId: customerID,
            }));
            setIconName('audio');
            setPopBtn(VOICE_BIO_BUTTON.VERIFY);
            dispatch(CcfAssignmentAction.setVoiceBioIsRetryRequest(true));
            setPopOverReferecePosition({ top: (popOverReferencePosition === null || popOverReferencePosition === void 0 ? void 0 : popOverReferencePosition.top) - 40, left: popOverReferencePosition.left });
        }
        if (retryCount < MAXIMUM_RETRY) { //limiting retry count to 3 times
            setRetryCount(retryCount + 1);
        }
    };
    /**
   * method for to handle click on optout
   * @example handleReasonSubmit()
   */
    const handleReasonSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        setReason(reason);
        setOptedOutReason('');
        setIconName(_jsx(Box, Object.assign({ display: "flex", justifyContent: "center", alignItems: "center", height: '40%' }, { children: _jsx(CcfVoiceBioLoader, { showLoadingText: false, isPrimary: true }) })));
        setStateVal('processingOptOut');
        setArrowBtn(VOICE_BIO_ICONS.EMPTY);
        yield fetchVoiceBioHubData(3); //opted out API
    });
    /**
   * method for to handle click on cancel
   * @example handleReasonSubmit()
   */
    const handleReasonCancel = () => {
        setOptedOutReason('');
        dispatch(CcfAssignmentAction.updateModalIsOpen(false));
    };
    /***
     * render options for the opt out
     * @example renderOptoutOptions()
     */
    const renderOptoutOptions = () => {
        return (_jsxs(Box, { children: [_jsx(Box, Object.assign({ sx: voiceBioMetricsStyles.popoverReasonsContainer }, { children: _jsx(RadioGroup, Object.assign({ "aria-labelledby": "optout-reasons", defaultValue: reason, name: "radio-optout-reasons-group", sx: voiceBioMetricsStyles.radioOptions, onChange: handleOptOutReasonChange }, { children: optOutReasons.map((reasonItem) => (_jsx(FormControlLabel, { value: reasonItem, control: _jsx(Radio, { sx: { padding: '7px' } }), label: _jsx(CcfTypography, { color: "textSecondary", sx: voiceBioMetricsStyles.radioOptions, translationKey: reasonItem }), sx: voiceBioMetricsStyles.optoutReasonRadio }, reasonItem))) })) })), _jsxs(Box, Object.assign({ sx: voiceBioMetricsStyles.optOutReasonsBtns }, { children: [_jsx(Button, Object.assign({ variant: "outlined", size: "medium", onClick: handleReasonCancel }, { children: translate('cancel') })), _jsx(Button, Object.assign({ variant: "contained", size: "medium", onClick: handleReasonSubmit }, { children: translate('submit') }))] }))] }));
    };
    /***
     * render renderIVStatusMessage
     * @example renderIVStatusMessage()
     */
    const renderIVStatusMessage = (stateVal, message) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let fontColor = (_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.black;
        let showColon = true;
        switch (stateVal) {
            case 'enrolled':
            case 'voiceMatch':
                fontColor = (_d = (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.green;
                showColon = false;
                break;
            case 'optedOut':
                fontColor = (_f = (_e = theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.yellowWarning;
                break;
            case 'noVoiceMatch':
            case 'loginError':
            case 'error':
            case 'notEnrolled':
                fontColor = (_h = (_g = theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.red;
                break;
            case 'suspectedFraud':
                fontColor = '#5261FF';
                break;
            case 'verifyingEnrollment':
                showColon = false;
                break;
            default:
                fontColor = (_k = (_j = theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.black;
        }
        return (_jsxs(Box, Object.assign({ sx: { display: 'flex', alignItems: 'center', marginTop: '5px' } }, { children: [_jsxs(CcfTypography, Object.assign({ variant: 'h6', sx: { color: fontColor, paddingRight: '2px', display: 'flex', alignItems: 'center' }, "data-testid": 'status-messageIVR' }, { children: [typeof iconName === 'string'
                            ? voiceHubIconList[iconName]('14px', { htmlColor: theme.palette.text.noteLabel })
                            : iconName, " \u00A0", translate(stateVal), showColon && ': '] })), _jsx(CcfTypography, Object.assign({ variant: 'h6', style: voiceBioMetricsStyles.innerMessage }, { children: message }))] })));
    };
    /**
     * render elements when label click
     * @example renderElements('Reason: No', 'Verify')
     */
    const renderElements = ({ btnText, message }) => {
        var _a, _b, _c;
        let isDisabled = false;
        let isVBHDisabled = false;
        const voiceBioHubAgentAssist = LocalStorageHelper.getItem(StorageKeys.VOICE_BIO_HUB_AGENT_ASSIST);
        const voiceBioProviderId = voiceBioHubAgentAssist ? (_a = JSON.parse(voiceBioHubAgentAssist)) === null || _a === void 0 ? void 0 : _a.providerId : '';
        if (LocalStorageHelper.getItem(StorageKeys.VOICE_BIO_HUB_AGENT_ASSIST) === '') {
            isVBHDisabled = true;
            isDisabled = true;
            message = 'Configuration Error : Voice Bio Hub is not configured for the skill.';
        }
        else {
            if (btnText === VOICE_BIO_BUTTON.VERIFY) {
                if (!customerID)
                    isDisabled = true;
                else
                    isDisabled = false;
            }
            else if (retryCount >= MAXIMUM_RETRY) { //limiting retry to 3 times
                isDisabled = true;
            }
            else {
                isDisabled = false;
            }
        }
        return (_jsxs(Box, Object.assign({ sx: voiceBioMetricsStyles.popoverContainer }, { children: [(stateVal === 'voiceBioMetrics' && !isVBHDisabled) && (_jsxs(Box, { children: [_jsxs(CcfTypography, Object.assign({ sx: { fontSize: '12px', padding: '2px 4px' } }, { children: ["CUSTOMER ID ", _jsx("span", Object.assign({ style: { color: (_c = (_b = theme.palette) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.red } }, { children: "*" }))] })), _jsx(CcfTextField, { id: "voice-bio-input", autoComplete: "off", size: "small", value: customerID, sx: voiceBioMetricsStyles.voiceBioInput, onChange: (event) => {
                                const newValue = event.target.value.replace(/\s/g, '');
                                updateCustomerID(newValue);
                            }, variant: "outlined", fullWidth: true, inputProps: { 'data-testid': 'input-customer-id' }, required: true })] })), (isSmView && (stateVal !== 'voiceBioMetrics')) && (_jsx(Box, Object.assign({ component: 'span', sx: voiceBioMetricsStyles.statusMessageContainer, "data-testid": 'voice-bio-statusIV' }, { children: renderIVStatusMessage(stateVal, message) }))), (message && !isSmView) && (_jsx("p", Object.assign({ style: voiceBioMetricsStyles.innerMessage }, { children: message }))), (isSmView && isVBHDisabled) && (_jsx("p", Object.assign({ style: voiceBioMetricsStyles.innerMessage }, { children: message }))), _jsxs(Box, Object.assign({ sx: voiceBioMetricsStyles.btnDiv }, { children: [stateVal === 'notEnrolled' &&
                            _jsx(Button, Object.assign({ variant: "outlined", size: "medium", onClick: handleOptOutClick, sx: { marginRight: '10px' } }, { children: translate('optOut') })), btnText && (_jsx(Button, Object.assign({ variant: (btnText === VOICE_BIO_BUTTON.VERIFY) ? 'contained' : 'outlined', size: "medium", onClick: handleSecondaryBtnClick, disabled: (btnText === VOICE_BIO_BUTTON.VERIFY) ? isDisabled : false, style: voiceBioMetricsStyles.verifyBtn }, { children: translate(btnText) }))), (!(voiceBioProviderId === null || voiceBioProviderId === void 0 ? void 0 : voiceBioProviderId.includes('nuance')) && (stateVal !== 'enrolled' && stateVal !== 'voiceBioMetrics')) &&
                            _jsx(Button, Object.assign({ variant: "outlined", size: "medium", disabled: isDisabled, onClick: handleRetryClick, sx: { marginLeft: '10px' } }, { children: `${translate('reVerify')} (${3 - retryCount} ${translate('left')} )` }))] }))] })));
    };
    /**
     * method for to show elements
     * @example renderNodes('Reason: No', 'Verify')
     */
    const renderNodes = () => {
        if (optInConsent !== '') {
            return renderOptInConsent();
        }
        if (optedOutReason !== '') {
            return renderOptoutOptions();
        }
        return renderContent();
    };
    const open = Boolean(isModalOpen);
    const id = open ? 'simple-popover' : undefined;
    return (_jsx(Box, { children: ((_a = voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.status) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== 'disconnected' &&
            (_jsxs(_Fragment, { children: [_jsx(CcfTooltip, Object.assign({ "data-testid": "voice-bio-metrics", "aria-label": 'voice-bio-metrics', title: translate(stateVal), arrow: true }, { children: !isSmView ? (_jsxs(_Fragment, { children: [_jsxs(Box, Object.assign({ component: 'span', sx: voiceBioMetricsStyles.statusMessageContainer, "data-testid": 'voice-bio-status', onClick: handleClick }, { children: [typeof iconName === 'string'
                                            ? voiceHubIconList[iconName]('14px', { htmlColor: theme.palette.text.noteLabel })
                                            : iconName, _jsx(CcfTypography, Object.assign({ sx: (stateVal === 'loginError' || stateVal === 'error') ? voiceBioMetricsStyles.errorMessage : voiceBioMetricsStyles.statusMessage, "data-testid": 'status-message' }, { children: translate(stateVal) })), (stateVal === 'voiceBioMetrics') ?
                                            (_jsx(Button, Object.assign({ variant: "outlined", size: "small", sx: voiceBioMetricsStyles.startBtn }, { children: `${translate('start')} ` }))) :
                                            (voiceHubIconList[arrowBtn]('14px', { htmlColor: theme.palette.text.noteLabel })), _jsx(Box, { sx: style.detailsMenu })] })), " "] })) : (_jsx(Box, Object.assign({ component: 'span', sx: voiceBioMetricsStyles.statusMessageContainer, "data-testid": 'voice-bio-status', onClick: handleClick, tabIndex: 0, onKeyDown: handleClick }, { children: typeof iconName === 'string'
                                ? voiceHubIconListSmView[iconName]((isIntegratedView ? '20px' : '28px'), { htmlColor: theme.palette.text.noteLabel, fill: 'none' })
                                : iconName }))) })), _jsx(Popover, Object.assign({ id: id, open: open, anchorReference: isSmView ? 'anchorPosition' : 'anchorEl', anchorEl: anchorEl, anchorPosition: { top: popOverReferencePosition === null || popOverReferencePosition === void 0 ? void 0 : popOverReferencePosition.top, left: popOverReferencePosition === null || popOverReferencePosition === void 0 ? void 0 : popOverReferencePosition.left }, onClose: handleClose, anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        }, "data-testid": 'voice-bio-popover', sx: voiceBioMetricsStyles.voiceBioPopover, PaperProps: {
                            style: {
                                minWidth: '250px',
                                minHeight: '75px',
                            },
                        } }, { children: _jsxs(Box, Object.assign({ sx: voiceBioMetricsStyles.popOverMain }, { children: [_jsxs(ListSubheader, Object.assign({ component: "div", id: "appHamburger-Menu", "data-testid": "appHamburger-Menu", sx: voiceBioMetricsStyles.listSubheader }, { children: [optedOutReason ? (_jsxs(Box, Object.assign({ style: { display: 'flex' } }, { children: [voiceHubIconList[VOICE_BIO_ICONS.MINUS]('14px', { htmlColor: theme.palette.text.noteLabel }), _jsx(CcfTypography, { variant: 'h5', sx: voiceBioMetricsStyles.optoutReasonsHeading, translationKey: 'optOutReason' })] }))) : (stateVal !== 'voiceBioMetrics' && (_jsxs(CcfTypography, Object.assign({ variant: 'h5', sx: voiceBioMetricsStyles.popoverHeading }, { children: [translate('customerId'), ": ", customerID] })))), _jsx(CcfCloseIcon, { viewBox: "0 0 20 20", sx: voiceBioMetricsStyles.closeIcon, "data-testid": "close-button", onClick: () => {
                                                handleClose();
                                            }, tabIndex: 0, role: "button", onKeyUp: (e) => {
                                                if (e.code === 'Enter') {
                                                    handleClose();
                                                }
                                            } })] })), renderNodes()] })) })), " "] })) }));
};
export default CcfVoiceBioMetrics;
//# sourceMappingURL=ccf-voice-bio-metrics.js.map