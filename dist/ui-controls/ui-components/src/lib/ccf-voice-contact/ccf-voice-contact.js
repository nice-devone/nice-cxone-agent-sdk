import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useMediaQuery, Grid, IconButton, useTheme, Stack, Card, Box } from '@mui/material';
import { contactButtons, DigitalContactStatus, MediaType, VoiceContactStatus } from '@nice-devone/common-sdk';
import { CcfBox, CcfCard, CcfPopOver, CcfTooltip, CcfInfoIcon, CcfPopOverWrapper, CcfTypography, useTranslator, CcfAppToastMessage, CcfShowIcon, CcfHideIcon } from '@nice-devone/ui-controls';
import { endTheVoiceContact, muteVoiceContact, isPreviewContact, getPreviewSkillProps } from './ccf-voice-contact-methods';
import { useDispatch, useSelector } from 'react-redux';
import { AcwType, CallType } from '@nice-devone/agent-sdk';
import { formatTime, getDurationInSeconds } from '../../util/common';
import { selectInboxCollapsedState, getVoiceContactDetailsById, voiceContactKeypadState, agentDetailsByAgentId, consultedAgentDetails, callPlaced, getUpdatedCallerName, getAllInteractions, getAssignmentPanelMetadata, getSelectedVoiceContact, getAllCasesInSelectedDigitalInteraction, selectUserInConference, selectUserInConsult, voiceContactCardSelector } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { ContactControlPanelHeading } from '../ccf-assignment-panel/ccf-contact-control-panel/contact-control-panel-heading/contact-control-panel-heading';
import { ContactControlPanelSubHeading } from '../ccf-assignment-panel/ccf-contact-control-panel/contact-control-panel-sub-heading/contact-control-panel-sub-heading';
import { CcfKeyPad } from '../ccf-keypad/ccf-keypad';
import { getPanelAppNavigationItems, globalActions, getContactControlsItems, getSelectedMenuName, getIsVoiceBioHubFeatureEnabled, updateExternalProdURL } from '../global.app.slice';
import CcfContactControls from './ccf-contact-controls/ccf-contact-controls';
import { commitmentActions, getCommitmentPermission } from '../ccf-commitment/ccf-commitment.slice';
import { updateAppSpaceTabStatus } from '../ccf-app-space/ccf-app-space.slice';
import { Navigation } from '../../enums/navigation-menus';
import { CcfDialerControls } from './ccf-dialer-controls/ccf-dialer-controls';
import { ACDVoiceShowControlsStatus } from '../../enums/call-contact-active-status';
import { CcfPCDialerFields } from './ccf-pc-dialer-fields/ccf-pc-dialer-fields';
import { extendedSkillDetailsById, phoneOBSkillsSelector } from '../ccf-agent-skill/ccf-agent-skill-details-slice';
import ccfVoiceContactStyles from './ccf-voice-contact.styles';
import { CallContactEventStatus, LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { PCDeliveryType } from '../../enums/delivery-type';
import CcfPcDialerControls from './ccf-pc-ob-preview-dialer/ccf-pc-dialer-controls';
import { CcfVoiceContactInfo } from './ccf-voice-contact-info/ccf-voice-contact-info';
import { useCcfComponentWidth } from '../../hooks/useCcfComponentWidth';
import { RenderMoreThanTwoControls } from './ccf-contact-controls/ccf-contact-with-multiple-controls';
import { getDispositionData } from '../ccf-disposition/ccf-disposition-slice';
import CcfLeaveEndConference from '../ccf-call-conference/ccf-leave-end-conference';
import { stringCompareIgnoreCase } from '../../util/stringUtils';
import CcfAddChannelOptions from '../ccf-add-channel-options/ccf-add-channel-options';
import { Timer } from '../../util/timer/timer';
import { isFeatureEnabled } from '../../util/featureToggleUtils';
import { CcfVoiceBioMetrics } from '../ccf-voice-bio-metrics/ccf-voice-bio-metrics';
import { getAgentProfileSettings } from '../ccf-agent-setting/ccf-agent-setting-slice';
import { agentProfileToast } from '../../util/toastMessageHelper';
import { toast } from 'react-toastify';
import { ToastMessageType } from '../../enums/toast-message-type';
import { useVoiceTranscriptVisibility } from '../../hooks/useVoiceTranscriptVisibility';
import { getNewRecordingNotification, updateVoiceCallRecordState } from '../ccf-agent-notification/ccf-agent-notification.slice';
import { useIsVoiceTranscriptEnabled } from '../../hooks/useVoiceTranscriptEnabled';
import { selectHasVoiceTranscriptEventBeenReceived } from '../slices/ccf-voice-transcription.slice';
/**
 * Component to display contact control panel
 * ```
 * @example-
 * <CcfVoiceContact />
 * ```
 */
export function CcfVoiceContact({ contact, elevatedFrom }) {
    var _a, _b, _c, _d, _e, _f;
    const theme = useTheme();
    const isSmView = useMediaQuery((theme) => theme.breakpoints.down('xl'));
    const isBelowMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const mediumView = useMediaQuery((theme) => theme.breakpoints.between('md', 'xl'));
    const isKeyPadOpen = useSelector(voiceContactKeypadState);
    const isInboxCollapsed = useSelector(selectInboxCollapsedState);
    const voiceContact = useSelector(getVoiceContactDetailsById(contact.contactId));
    const selectedCallContact = useSelector(getSelectedVoiceContact);
    const contactControl = useSelector(getContactControlsItems);
    const controls = voiceContact && (voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.callControlButton);
    const consultedAgents = useSelector(consultedAgentDetails);
    const panelAppNavigationItems = useSelector(getPanelAppNavigationItems);
    const allInteractions = useSelector(getAllInteractions);
    const assignmentPanelMetadata = useSelector(getAssignmentPanelMetadata);
    const [contacts, setContacts] = useState([]);
    const { create: hasCreateCommitmentPermission } = useSelector(getCommitmentPermission) || {};
    const inBoundContactInfo = useSelector(getUpdatedCallerName);
    const consultAgentId = voiceContact && (voiceContact.callType === 'Consult' && voiceContact.ani !== 'AGENT' ? voiceContact.ani : voiceContact.dnis);
    const consultAgentDetail = consultAgentId && consultedAgents && consultedAgents.find((agent) => agent.agentId === parseInt(consultAgentId));
    const { lastStateChangeTime, status } = voiceContact;
    const dispatch = useDispatch();
    const styles = ccfVoiceContactStyles(theme);
    const holdTime = getDurationInSeconds(lastStateChangeTime);
    const [timer, setTimer] = useState(0);
    const isActiveStatus = Object.values(ACDVoiceShowControlsStatus).includes((_a = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _a === void 0 ? void 0 : _a.toLowerCase());
    const skillId = parseInt(voiceContact.skill, 10);
    const extendedSkillDetailsSelector = useSelector(extendedSkillDetailsById(skillId));
    const isConfirmationRequired = isPreviewContact(voiceContact);
    const previewSkillProps = getPreviewSkillProps(voiceContact, extendedSkillDetailsSelector === null || extendedSkillDetailsSelector === void 0 ? void 0 : extendedSkillDetailsSelector.deliveryParameters);
    const pcDeliveryType = previewSkillProps === null || previewSkillProps === void 0 ? void 0 : previewSkillProps.deliveryType;
    const isClickToCall = pcDeliveryType === PCDeliveryType.CLICK_TO_CALL;
    const isManualDial = (isConfirmationRequired && (pcDeliveryType === PCDeliveryType.MANUAL_DIAL || pcDeliveryType === PCDeliveryType.MANUAL_DIAL_AUTO_CORRECT));
    const isOutOfNetworkPcContact = (isConfirmationRequired && pcDeliveryType === PCDeliveryType.OUTSIDE_NETWORK);
    const isNaturalCalling = voiceContact.callType === CallType.NATURAL_CALLING;
    const [height, setHeight] = React.useState(0);
    const contactRef = useRef(null);
    const { width } = useCcfComponentWidth(contactRef);
    const isDialing = voiceContact.status === CallContactEventStatus.DIALING;
    const dispositionData = useSelector(getDispositionData);
    let activeDisposition = null;
    const dispositionContactId = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.contactID];
    const userInConsult = useSelector(selectUserInConsult);
    const usersInConference = useSelector(selectUserInConference);
    const phoneOBSkills = useSelector(phoneOBSkillsSelector);
    if (dispositionContactId !== undefined) {
        activeDisposition = dispositionData.dispositions[voiceContact.contactID];
    }
    const isMultiPartyCall = (usersInConference.length > 1 || userInConsult) ? true : false;
    const isStatusIncomingRingingOrCallbackDisconnected = stringCompareIgnoreCase(voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status, VoiceContactStatus.INCOMING) ||
        stringCompareIgnoreCase(voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status, VoiceContactStatus.RINGING) ||
        stringCompareIgnoreCase(voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status, VoiceContactStatus.CALL_BACK_DISCONNECTED);
    const selectedMenu = useSelector(getSelectedMenuName);
    const showMoreThanTwoControls = !isNaturalCalling && !isStatusIncomingRingingOrCallbackDisconnected;
    const showAcceptReject = isStatusIncomingRingingOrCallbackDisconnected && !isMultiPartyCall && !isNaturalCalling;
    const [isDrawerOpen, toggleDrawer] = useState(false);
    const acceptableAddCommitmentStatuses = [
        VoiceContactStatus.HOLD,
        VoiceContactStatus.HOLDING,
        VoiceContactStatus.ACTIVE,
        VoiceContactStatus.DISCONNECTED,
        VoiceContactStatus.MASKING,
        VoiceContactStatus.JOINED,
        VoiceContactStatus.CONFERENCE,
        VoiceContactStatus.TRANSFER
    ].map(status => status.toLowerCase());
    const showAddCommitmentForStatus = acceptableAddCommitmentStatuses.includes((_b = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _b === void 0 ? void 0 : _b.toLowerCase());
    const allCasesInSelectedDigitalInteraction = useSelector(getAllCasesInSelectedDigitalInteraction);
    const isDraftPresent = useMemo(() => {
        return allCasesInSelectedDigitalInteraction && Object.keys(allCasesInSelectedDigitalInteraction).length
            ? (Object.keys(allCasesInSelectedDigitalInteraction).some(currentCase => { var _a; return (((_a = allCasesInSelectedDigitalInteraction[currentCase]) === null || _a === void 0 ? void 0 : _a.contactStatus) === DigitalContactStatus.DRAFT); }))
            : false;
    }, [allCasesInSelectedDigitalInteraction]);
    const voiceContactCard = useSelector(voiceContactCardSelector);
    const [translate] = useTranslator();
    const isDiscarded = ((_c = voiceContactCard[0]) === null || _c === void 0 ? void 0 : _c.contactStatus) === VoiceContactStatus.DISCONNECTED.toString() &&
        voiceContact.acwTypeId === AcwType.DISPOSITION;
    const translatedWork = translate('workItem').split(' ')[0];
    const serverTimeOffset = LocalStorageHelper.getItem(StorageKeys.SERVER_TIME_OFFSET);
    const newRecordingNotification = useSelector(getNewRecordingNotification);
    const isRecordingFTEnabled = isFeatureEnabled("release-cxa-recording-compliance-AW-37942" /* FeatureToggles.CXA_RECORDING_NOTIFICATION_COMPLIANCE */);
    const isRecordingToastActive = useRef(false);
    const recToastQueue = useRef([]);
    const hasVoiceTranscriptEventBeenReceived = useSelector(selectHasVoiceTranscriptEventBeenReceived((voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.contactID) || ''));
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const finalPopoverMenus = contactControl.filter(contactControl => {
        if (contactControl.type === 'elevation') {
            return !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideOBElevation);
        }
        else if (contactControl.type === 'commitment') {
            if (isSmView) {
                if (showMoreThanTwoControls) {
                    return hasCreateCommitmentPermission && showAddCommitmentForStatus ? true : false;
                }
                else
                    return hasCreateCommitmentPermission && !isDialing && !showAcceptReject ? true : false;
            }
            else {
                return hasCreateCommitmentPermission && !!(phoneOBSkills === null || phoneOBSkills === void 0 ? void 0 : phoneOBSkills.length) ? true : false;
            }
        }
        return true;
    });
    const isVoiceTranscriptEnabledAndEventReceived = useIsVoiceTranscriptEnabled() && hasVoiceTranscriptEventBeenReceived;
    const { showTranscript, updateTranscriptVisibility } = useVoiceTranscriptVisibility();
    if (isVoiceTranscriptEnabledAndEventReceived) {
        finalPopoverMenus.push({
            translationKey: showTranscript ? 'hideTranscript' : 'showTranscript',
            icon: showTranscript ? _jsx(CcfShowIcon, { viewBox: "0 0 20 14" }) : _jsx(CcfHideIcon, { viewBox: "0 0 20 8" }),
            type: 'voiceTranscript',
            closeOnSelection: true,
            disabled: false,
        });
    }
    //check voice bio hub feature enabled for the user
    const isVoiceBioEnabled = useSelector(getIsVoiceBioHubFeatureEnabled);
    const toastId = useRef('');
    const [popOverMenuItems, setPopOverMenuItems] = useState({
        menuItems: [
            {
                items: finalPopoverMenus,
            }
        ],
    });
    /**
     * Function to update voice transcript menu item based on the visibility state
     * @param currentShowTranscript - current state of transcript visibility
     * @example - updateVoiceTranscriptMenuItem(true) // sets menu item to "Hide Transcript"
     */
    const updateVoiceTranscriptMenuItem = (currentShowTranscript) => {
        setPopOverMenuItems((prevMenuItems) => (Object.assign(Object.assign({}, prevMenuItems), { menuItems: prevMenuItems.menuItems.map((menuItem) => (Object.assign(Object.assign({}, menuItem), { items: menuItem.items.map((item) => item.type === 'voiceTranscript'
                    ? Object.assign(Object.assign({}, item), { translationKey: currentShowTranscript ? 'hideTranscript' : 'showTranscript', icon: currentShowTranscript ? _jsx(CcfShowIcon, { viewBox: "0 0 20 14" }) : _jsx(CcfHideIcon, { viewBox: "0 0 20 8" }) }) : item) }))) })));
    };
    useEffect(() => {
        setPopOverMenuItems({
            menuItems: [
                {
                    items: finalPopoverMenus,
                }
            ],
        });
    }, [finalPopoverMenus.length]);
    useEffect(() => {
        if (isDraftPresent && elevatedFrom) {
            setPopOverMenuItems((popOverMenuItems) => (Object.assign(Object.assign({}, popOverMenuItems), { menuItems: popOverMenuItems.menuItems.map(menuItem => (Object.assign(Object.assign({}, menuItem), { items: menuItem.items.map(item => item.translationKey === 'addOutbound' ? Object.assign(Object.assign({}, item), { disabled: !!isDraftPresent }) : item) }))) })));
        }
        else {
            setPopOverMenuItems((popOverMenuItems) => (Object.assign(Object.assign({}, popOverMenuItems), { menuItems: popOverMenuItems.menuItems.map(menuItem => (Object.assign(Object.assign({}, menuItem), { items: menuItem.items.map(item => item.translationKey === 'addOutbound' ? Object.assign(Object.assign({}, item), { disabled: false }) : item) }))) })));
        }
    }, [
        isDraftPresent,
        userInConsult,
        elevatedFrom
    ]);
    useEffect(() => {
        if ((contact === null || contact === void 0 ? void 0 : contact.interactionId) === assignmentPanelMetadata.voiceInteractionId || (contact === null || contact === void 0 ? void 0 : contact.interactionId) === assignmentPanelMetadata.incommingAcdInteractionId) {
            const interactionId = assignmentPanelMetadata.voiceInteractionId || assignmentPanelMetadata.incommingAcdInteractionId || (selectedCallContact && assignmentPanelMetadata.selectedInteractionId);
            if (interactionId && allInteractions[interactionId] && Object.keys(allInteractions[interactionId]).length && Object.keys(allInteractions[interactionId].acdContacts).length) {
                setContacts(Object.values(allInteractions[interactionId].acdContacts).map(voiceContact => voiceContact));
            }
        }
    }, [assignmentPanelMetadata, voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.skillName]);
    useEffect(() => {
        const interval = setInterval(() => {
            if (status && status.toLowerCase() === VoiceContactStatus.HOLDING) {
                setTimer(holdTime);
            }
        }, 1000);
        if (status && status.toLowerCase() === VoiceContactStatus.ACTIVE) {
            clearInterval(interval);
            setTimer(0);
        }
        return () => clearInterval(interval);
    }, [holdTime, status]);
    useEffect(() => {
        if (voiceContact && voiceContact.skill === '0' && consultAgentId && !consultAgentDetail) {
            dispatch(agentDetailsByAgentId({ agentId: consultAgentId }));
        }
    }, [voiceContact]);
    useEffect(() => {
        if (contacts && consultedAgents) {
            const agentIds = contacts.map((contact) => { if (contact.skillOrQueueId === '0') {
                return Number(contact.customerName);
            }
            else {
                return undefined;
            } });
            const consultedAgentIds = consultedAgents.map((agent) => { return agent.agentId; });
            const missingAgentId = agentIds.filter((element) => !consultedAgentIds.includes(element));
            if (missingAgentId[0] !== undefined) {
                dispatch(agentDetailsByAgentId({ agentId: missingAgentId[0].toString() }));
            }
        }
    }, [contacts]);
    // Toggle voice transcript menu item based on the visibility state
    useEffect(() => {
        if (isVoiceTranscriptEnabledAndEventReceived) {
            updateVoiceTranscriptMenuItem(showTranscript);
        }
    }, [isVoiceTranscriptEnabledAndEventReceived, showTranscript]);
    let dialPadLeft = 0;
    if (isSmView) {
        if (isInboxCollapsed && !isBelowMd) {
            dialPadLeft = 56;
        }
        else if (mediumView) {
            dialPadLeft = 160;
        }
        else if (isBelowMd) {
            dialPadLeft = 0;
        }
    }
    const measuredRef = React.useCallback((node) => {
        if (node !== null) {
            setHeight(node.getBoundingClientRect().height);
        }
    }, [width]);
    /**
     *
     * @param control - contactButtons
     * @param event -React.MouseEvent
     * @example -   controlClicked('Consult', event)
     */
    const controlClicked = (control, event) => {
        event.stopPropagation();
        switch (control) {
            case contactButtons.mute:
                dispatch(muteVoiceContact(voiceContact));
                break;
            default:
                break;
        }
    };
    /**
     * getContactPanelHeader - contact header for Cxone agent on P2P
     * @example getContactPanelHeaderLabel
    */
    const getContactPanelHeaderLabel = () => {
        if (voiceContact.skill === '0') {
            return consultAgentDetail && (consultAgentDetail.firstName + ' ' + consultAgentDetail.lastName);
        }
        else if (voiceContact.skill !== '0' && voiceContact.callType === 'Consult') {
            return ((inBoundContactInfo === null || inBoundContactInfo === void 0 ? void 0 : inBoundContactInfo.firstName) + ' ' + (inBoundContactInfo === null || inBoundContactInfo === void 0 ? void 0 : inBoundContactInfo.lastName));
        }
        else if (voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.isInbound) {
            return voiceContact.ani;
        }
        else
            return voiceContact.dnis;
    };
    /**
     * headerSection - contact header for Cxone agent on P2P
    */
    const headerSection = voiceContact && (_jsxs(_Fragment, { children: [_jsx(ContactControlPanelHeading, { "data-testid": "cxone-voice-contact-header", headerText: getContactPanelHeaderLabel(), headerTextClassess: 'controlButtonHeaderText', contact: voiceContact, popOverMenuItems: popOverMenuItems, setPopOverMenuItems: setPopOverMenuItems, interactionType: assignmentPanelMetadata.voiceInteractionId ? (_d = allInteractions[assignmentPanelMetadata.voiceInteractionId]) === null || _d === void 0 ? void 0 : _d.interactionType : '', onVoiceTranscriptToggle: () => updateTranscriptVisibility(!showTranscript) }), !isKeyPadOpen && (_jsx(ContactControlPanelSubHeading, { "data-testid": "cxone-voice-contact-subheader", subHeading2: ((_e = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _e === void 0 ? void 0 : _e.toLowerCase()) !== 'holding' ? voiceContact.skillName : '', subHeading3: ((_f = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _f === void 0 ? void 0 : _f.toLowerCase()) === 'holding' ? ` ${voiceContact.skill !== '0' ? ' ' : ''} On hold - ${formatTime(timer)}` : '' }))] }));
    /**
     * Pop over action handler.
     * @example
     * @returns
     */
    const onPopOverItemSelection = (item) => () => {
        switch (item.type) {
            case 'commitment':
                navigateToCommitmentForm();
                return;
            case 'elevation':
                toggleDrawer(true);
                return;
            case 'voiceTranscript': {
                updateTranscriptVisibility(!showTranscript);
                if (!showTranscript) {
                    dispatch(globalActions.setSelectedMenu({ name: Navigation.INTERACTION }));
                    updateExternalProdURL(null, Navigation.INTERACTION, null);
                }
                return;
            }
        }
        return;
    };
    /**
     * Function to display inital popover when popover icon is clicked
     * @example initialPopOver()
     */
    const initialPopOver = () => {
        return (_jsx(CcfPopOver, { anchorOrigin: { vertical: 'bottom', horizontal: 'left' }, transformOrigin: { vertical: 'bottom', horizontal: 'right' }, disableTooltip: true, onPopOverItemSelection: onPopOverItemSelection, optionList: popOverMenuItems, propogateOnClickEvent: false }));
    };
    /**
     * Function to navigate to commitment form
     * @example navigateToCommitmentForm()
     */
    const navigateToCommitmentForm = () => {
        if (agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideSchedule) {
            const toastInfo = {
                isError: true,
                messageKey: 'agentProfileGenericErrorToastMessage',
                toastId: toastId,
            };
            agentProfileToast(toastInfo);
            return;
        }
        dispatch(commitmentActions.addCommitmentEvent(true));
        dispatch(commitmentActions.showCommitmentForm(true));
        dispatch(globalActions.setSelectedMenu({ name: Navigation.CALENDAR }));
        const activeTabApp = panelAppNavigationItems.find((tab) => tab.menuName === Navigation.CALENDAR && !tab.isHidden);
        dispatch(updateAppSpaceTabStatus({
            index: (activeTabApp === null || activeTabApp === void 0 ? void 0 : activeTabApp.menuName) || '',
            tab: (activeTabApp === null || activeTabApp === void 0 ? void 0 : activeTabApp.menuName) || '',
        }));
    };
    /**
     * Personal Connection dialer Function to handle call placed click event
     * @example handleCallPlaced()
     * @returns
     */
    const handleCallPlaced = () => {
        var _a;
        if (((_a = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === CallContactEventStatus.NATURAL_CALL_DIALING.toLowerCase()) {
            dispatch(callPlaced(voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.contactID));
        }
    };
    /**
     * Personal Connection dialer Function to handle call ended click event
     * @example handlePcCallEnd()
     * @returns
     */
    const handlePcCallEnd = () => {
        var _a;
        if (((_a = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === CallContactEventStatus.ACTIVE.toLowerCase() && isOutOfNetworkPcContact) {
            dispatch(endTheVoiceContact(voiceContact));
        }
    };
    /**
     * footer for integrated agent view when there is an active voice call or conference
     * @example getFooterForSmallView(childElement)
     * @returns
     */
    const getFooterForSmallView = (childElement, isDisplayChild) => {
        var _a, _b, _c, _d, _e;
        return (_jsxs(Stack, Object.assign({ sx: styles.getFooterForSmallView, width: '100%' }, { children: [_jsxs(Stack, Object.assign({ sx: { display: 'flex', flexDirection: 'row' }, alignItems: 'center', justifyContent: 'space-between', width: '100%' }, { children: [_jsx(CcfVoiceContactInfo, { contact: contact, isNaturalCalling: false, isSmView: isSmView, isSmViewConference: true, voiceContact: voiceContact, consultAgentDetail: consultAgentDetail, timer: timer }), _jsxs(Box, Object.assign({ sx: { display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end' } }, { children: [isVoiceBioEnabled && ((contact === null || contact === void 0 ? void 0 : contact.callType) === CallType.REGULAR ||
                                    (contact === null || contact === void 0 ? void 0 : contact.callType) === CallType.PERSONAL_QUEUE) &&
                                    _jsx(Box, Object.assign({ sx: { marginLeft: 'auto', display: 'flex', alignItems: 'center' } }, { children: _jsx(CcfVoiceBioMetrics, { "data-testid": "voiceBioMetricsIV" }) })), _jsxs(Stack, Object.assign({ alignItems: 'center', flexDirection: 'row', sx: { flexFlow: 'row wrap' }, justifyContent: 'space-between' }, { children: [isDisplayChild && (_jsx(Stack, Object.assign({ flexDirection: 'row', sx: styles.contactControlStyle }, { children: childElement }))), usersInConference.length > 1 && selectedMenu !== Navigation.CONFERENCE && _jsx(CcfLeaveEndConference, {})] })), !isDiscarded && ((_a = voiceContact.status) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'holding' && (_jsxs(CcfTypography, Object.assign({ variant: "inherit", sx: Object.assign({ display: 'flex', alignItems: 'center' }, styles.timerStyles.onHold) }, { children: ["On hold - ", formatTime(timer)] }))), elevatedFrom && ((_b = voiceContact.status) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== 'holding' &&
                                    (!isDiscarded ? (_jsx(Stack, Object.assign({ sx: { display: 'flex', justifyContent: 'center' } }, { children: _jsxs(CcfTypography, Object.assign({ sx: styles.timerStyles }, { children: [translate('call'), " ", translate('time'), " - ", '', _jsx(Timer, { countUp: true, start: 0, stop: Number.MAX_SAFE_INTEGER, startReference: Number(new Date((_c = voiceContactCard[0]) === null || _c === void 0 ? void 0 : _c.contactReceivedTime)) }, `${(_d = voiceContactCard[0]) === null || _d === void 0 ? void 0 : _d.contactId}_contactDurationCounter`)] })) }))) : (_jsx(Stack, { children: _jsxs(CcfTypography, Object.assign({ sx: styles.timerStyles }, { children: [translate('outcomes'), " ", translatedWork, " -", _jsx(Timer, { countUp: !!voiceContact.requireDisposition, start: voiceContact.requireDisposition ? 0 : (voiceContact.maxSecondsACW || 0) * 1000, stop: voiceContact.requireDisposition ? Number.MAX_SAFE_INTEGER : 0, startReference: Number(voiceContact.lastStateChangeTime) - Number(serverTimeOffset) }, `${(_e = voiceContactCard[0]) === null || _e === void 0 ? void 0 : _e.contactId}_contactDurationCounter`)] })) })))] }))] })), _jsx(Stack, Object.assign({ sx: { width: '6%' } }, { children: initialPopOver() }))] })));
    };
    /**
     * Function to render ControlPanel based on condition and flags
     * @example renderControlPanel()
     */
    const renderControlPanel = () => {
        if (contacts && contacts.length > 0) {
            return (_jsxs(_Fragment, { children: [isSmView
                        ? (_jsxs(Grid, Object.assign({ ref: contactRef, container: true, justifyContent: 'space-between', sx: { backgroundColor: (isClickToCall || isManualDial) ? theme.palette.background.main : theme.palette.background.footer } }, { children: [showMoreThanTwoControls &&
                                    getFooterForSmallView(_jsx(RenderMoreThanTwoControls, { multipleControls: false, controlClicked: () => { dispatch(endTheVoiceContact(voiceContact)); }, voiceContact: voiceContact, activeDisposition: activeDisposition }), isMultiPartyCall), _jsxs(Stack, Object.assign({ justifyContent: 'start', flexDirection: 'row' }, { children: [isNaturalCalling &&
                                            _jsx(CcfVoiceContactInfo, { contact: contact, voiceContact: voiceContact, isNaturalCalling: isNaturalCalling, isSmView: isSmView, timer: timer }), (voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.callType) === CallType.NATURAL_CALLING
                                            && (voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.otherInformationNewFormat)
                                            && _jsx(CcfTooltip, Object.assign({ title: _jsx(CcfPCDialerFields, { otherInformationNewFormat: voiceContact.otherInformationNewFormat, isToolTip: true }) }, { children: _jsx(IconButton, { children: _jsx(CcfInfoIcon, { fontSize: 'medium' }) }) }))] })), (voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.callType) === CallType.NATURAL_CALLING
                                    && skillId
                                    && _jsx(CcfDialerControls, Object.assign({}, voiceContact, extendedSkillDetailsSelector === null || extendedSkillDetailsSelector === void 0 ? void 0 : extendedSkillDetailsSelector.skillCPAManagementParameters)), _jsxs(Stack, Object.assign({ flexDirection: 'row', justifyContent: 'end', width: isNaturalCalling ? '50%' : '100%' }, { children: [isOutOfNetworkPcContact &&
                                            _jsx(CcfPcDialerControls, { contact: contacts[0], handleCallPlaced: handleCallPlaced, handlePcCallEnd: handlePcCallEnd }), isMultiPartyCall && isNaturalCalling &&
                                            _jsx(Stack, Object.assign({ flexDirection: 'row', alignItems: 'center' }, { children: _jsx(RenderMoreThanTwoControls, { multipleControls: false, controlClicked: () => { dispatch(endTheVoiceContact(voiceContact)); }, voiceContact: voiceContact, activeDisposition: activeDisposition, elevatedFrom: elevatedFrom }) })), !showMoreThanTwoControls && initialPopOver()] }))] })))
                        : headerSection, (isActiveStatus || isDialing)
                        && (contact === null || contact === void 0 ? void 0 : contact.media) === MediaType.VOICE
                        && !isOutOfNetworkPcContact
                        && _jsx(CcfContactControls, { type: "regular", voiceContact: voiceContact, showKeypad: true, onlyShowHangup: isDialing, elevatedFrom: elevatedFrom })] }));
        }
        else {
            return null;
        }
    };
    let boxStyles = Object.assign({}, styles.controlPanelContainer);
    if (!isSmView && (isInboxCollapsed || (selectedCallContact && !(selectedCallContact === null || selectedCallContact === void 0 ? void 0 : selectedCallContact.isDocked)))) {
        boxStyles = Object.assign(Object.assign({}, boxStyles), styles.dockedControls);
    }
    /**
     * Method to enqueue recording toast notifications
     * @param recordingNotification - WemNotificationRecordingData
     * @example
     * ```
     * enqueueRecordingToast(recordingNotification)
     * ```
     */
    const enqueueRecordingToast = (recordingNotification) => {
        recToastQueue.current.push(recordingNotification);
        showNextRecordingToast();
    };
    /**
     * Method to show next recording toast notification from the queue
     * @example
     * ```
     * showNextRecordingToast()
     * ```
     */
    const showNextRecordingToast = () => {
        if ((isRecordingToastActive === null || isRecordingToastActive === void 0 ? void 0 : isRecordingToastActive.current) || (recToastQueue === null || recToastQueue === void 0 ? void 0 : recToastQueue.current.length) === 0)
            return;
        isRecordingToastActive.current = true;
        const recordingNotification = recToastQueue === null || recToastQueue === void 0 ? void 0 : recToastQueue.current.shift();
        if (recordingNotification) {
            const toastProps = {
                autoClose: 2000,
                containerId: 'AppToastContainer',
                onClose: () => {
                    isRecordingToastActive.current = false;
                    setTimeout(() => {
                        showNextRecordingToast();
                    }, 100);
                },
            };
            const toastContent = _jsx(CcfAppToastMessage, { type: recordingNotification === null || recordingNotification === void 0 ? void 0 : recordingNotification.toastType, messageKey: recordingNotification === null || recordingNotification === void 0 ? void 0 : recordingNotification.messageKey });
            // Only show toast if this is the active tab, otherwise just auto-dismiss
            if (!document.hidden) {
                if ((recordingNotification === null || recordingNotification === void 0 ? void 0 : recordingNotification.toastType) === ToastMessageType.FAILURE)
                    toast.error(toastContent, toastProps);
                else if ((recordingNotification === null || recordingNotification === void 0 ? void 0 : recordingNotification.toastType) === ToastMessageType.INFO)
                    toast.info(toastContent, toastProps);
            }
            else {
                setTimeout(() => {
                    var _a;
                    (_a = toastProps.onClose) === null || _a === void 0 ? void 0 : _a.call(toastProps);
                }, toastProps.autoClose);
            }
            dispatch(updateVoiceCallRecordState(recordingNotification === null || recordingNotification === void 0 ? void 0 : recordingNotification.isRecording));
        }
    };
    useEffect(() => {
        if (!isRecordingFTEnabled || !newRecordingNotification || !Object.keys(newRecordingNotification).length)
            return;
        if (newRecordingNotification === null || newRecordingNotification === void 0 ? void 0 : newRecordingNotification.isRealtimeNotificationEnabled) {
            enqueueRecordingToast(newRecordingNotification);
        }
        else {
            dispatch(updateVoiceCallRecordState(newRecordingNotification === null || newRecordingNotification === void 0 ? void 0 : newRecordingNotification.isRecording));
        }
    }, [isRecordingFTEnabled, newRecordingNotification]);
    return (_jsxs(_Fragment, { children: [_jsxs(CcfBox, Object.assign({ sx: boxStyles, "data-testid": "cxone-voice-contact" }, { children: [isVoiceBioEnabled && !isSmView && ((contact === null || contact === void 0 ? void 0 : contact.callType) === CallType.REGULAR ||
                        (contact === null || contact === void 0 ? void 0 : contact.callType) === CallType.PERSONAL_QUEUE) &&
                        _jsx(Box, Object.assign({ sx: { marginLeft: 'auto' } }, { children: _jsx(CcfVoiceBioMetrics, { "data-testid": "voiceBioMetrics" }) })), isKeyPadOpen && isSmView &&
                        _jsx(CcfCard, Object.assign({ sx: styles.keypad, style: { left: dialPadLeft, bottom: `${height}px` } }, { children: _jsx(CcfKeyPad, {}) })), _jsx(Card, Object.assign({ sx: styles.controlPanel, square: true, ref: measuredRef }, { children: isKeyPadOpen ? (_jsxs(_Fragment, { children: [!isSmView && headerSection &&
                                    _jsx(CcfKeyPad, { callControlMuteButton: controls && controls.mute, handleOnClick: (e) => controlClicked(contactButtons.mute, e) }), isSmView &&
                                    _jsx(_Fragment, { children: renderControlPanel() })] })) : renderControlPanel() }))] })), _jsx(CcfPopOverWrapper, Object.assign({ id: 'small-view-elevation-popover', anchorReference: 'anchorEl', anchorOrigin: {
                    vertical: 'center',
                    horizontal: 'center',
                }, transformOrigin: {
                    vertical: 'center',
                    horizontal: 'center',
                }, open: isDrawerOpen, handleClose: () => toggleDrawer(false) }, { children: _jsx(CcfAddChannelOptions, { handleClose: () => toggleDrawer(false) }) }))] }));
}
export default CcfVoiceContact;
//# sourceMappingURL=ccf-voice-contact.js.map