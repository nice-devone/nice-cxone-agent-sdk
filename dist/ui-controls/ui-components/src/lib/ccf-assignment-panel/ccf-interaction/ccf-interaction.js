import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Badge, Box, Divider, useMediaQuery, useTheme, Popover, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { CcfTypography, CcfCard, useTranslator, CcfCallRejectedIcon, CcfInteractionCompleteIcon, CcfVoicemailIcon, CcfWorkItemIcon, CcfTooltip, CcfDispositionInteractionIcon, CcfElevatedInteractionIcon, CcfUnavailableIcon, CcfPhoneOutboundRevampedIcon, } from '@nice-devone/ui-controls';
import { VoiceContactStatus, DigitalContactStatus, SLAIndicatorType, DigitalChannelType, WorkItemContactStatus, InteractionType, AgentLegStatus, } from '@nice-devone/common-sdk';
import { getPinnedMenuItem, globalActions, isLogoutToastOpen, updateExternalProdURL } from '../../../lib/global.app.slice';
import { selectInboxCollapsedState, CcfAssignmentAction, getUpdatedCallerName, getSelectedInteraction, getConsultingAgentDetails, consultedAgentDetails, voiceContactSelector, voiceMailContactDetailsSelector, rejectIncomingDigitalContact, getAssignmentPanelMetadata, workItemContactDetailsSelector, digitalContactSelector, agentDetailsByAgentId, workItemContactSelector, getAllInteractions, } from '../ccf-assignment-panel.slice';
import { CallType } from '@nice-devone/agent-sdk';
import { Navigation } from '../../../enums/navigation-menus';
import CcfIcon, { CHANNEL_ICON_SIZE } from '../../ccf-icon/ccf-icon';
import { CcfDigitalContactSLATimerTooltip } from '../../ccf-digital-contact-sla-timer/ccf-digital-contact-sla-timer-tooltip';
import WarningIcon from '@mui/icons-material/Warning';
import { Timer } from '../../../util/timer/timer';
import ccfInteractionStyle from './ccf-interaction.style';
import { CcfInteractionIconsMap } from './ccf-interaction-icons-map';
import CcfAssignmentCard from '../ccf-assignment-card/ccf-assignment-card';
import { LocalStorageHelper, StorageKeys, VoiceMailContactEventStatus } from '@nice-devone/core-sdk';
import { AcwType } from '../ccf-assignment-card/acw-type';
import { getPreviewSkillProps } from '../../ccf-voice-contact/ccf-voice-contact-methods';
import { agentLegConnectionStatus, selectcurrentStatus } from '../../ccf-agent-state/ccf-agent-state.slice';
import { extendedSkillDetailsById } from '../../ccf-agent-skill/ccf-agent-skill-details-slice';
import { CHANNEL_TYPE, revamped_icons } from '../../ccf-icon/ccf-icon-list';
import { CcfPreviewOnlyContactCard } from '../ccf-assignment-card/ccf-preview-only-contact-card/ccf-preview-only-contact-card';
import { agentSelectedVoicePreference } from '../../ccf-acd-session/ccf-acd-session.slice';
import { cxoneCCActivity } from '../../ccf-app-space/ccf-customer-card/ccf-customer-card.slice';
import { CXoneAgentEvents } from '@nice-devone/shared-apps-lib';
import { eventBus } from '../../ccf-audio-player/ccf-audio-player-util';
import { AudioPlayerStatus } from '../../ccf-audio-player/ccf-audio-player-status';
import { toast } from 'react-toastify';
import { usePrevious } from '../../../hooks/usePrevious';
import { getChannelNameForNarration, removePreviousContactFocus } from '../ccf-assignment-utils';
import { useNavigationItems } from '../../ccf-navigation/useNavigationItems';
import { getAgentProfileSettings } from '../../ccf-agent-setting/ccf-agent-setting-slice';
import useLVAppSpacePermission from '../../lv-app-space/hooks/useLVAppSpacePermission';
import { useIsVoiceTranscriptEnabled } from '../../../hooks/useVoiceTranscriptEnabled';
/**
 * CCF Interaction Component
 * @example - <CcfInteraction />
 */
export const CcfInteraction = React.memo(forwardRef((props, ref) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const theme = useTheme();
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const { setSelectedMenu } = globalActions;
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
    const [animationText, setAnimationText] = useState('');
    const [shouldShowAnimation, setShouldShowAnimation] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [assignmentCardTitle, setAssignmentCardTitle] = useState('');
    const [isOutbound, setIsOutbound] = useState(false);
    const [skillOrQueueName, setSkillOrQueueName] = useState('');
    const selectedInteractionId = useSelector(getSelectedInteraction);
    const inboundContactDetail = useSelector(getUpdatedCallerName);
    const agentDetails = useSelector(consultedAgentDetails);
    const voiceContact = useSelector(voiceContactSelector);
    const digitalContactDetails = useSelector(digitalContactSelector);
    const voiceMailContact = useSelector(voiceMailContactDetailsSelector);
    const workItemContact = useSelector(workItemContactDetailsSelector);
    const workItemContactDetail = useSelector(workItemContactSelector);
    const phoneRefusalTimeout = (agentDetails && ((_a = agentDetails[0]) === null || _a === void 0 ? void 0 : _a.phoneRefusalTimeout)) || 45;
    const agentStatus = useSelector(selectcurrentStatus);
    const extendedSkillDetailsSelector = useSelector(extendedSkillDetailsById(parseInt((_e = (_d = Object.values((_c = (_b = props === null || props === void 0 ? void 0 : props.interaction) === null || _b === void 0 ? void 0 : _b.acdContacts) !== null && _c !== void 0 ? _c : {})[0]) === null || _d === void 0 ? void 0 : _d.skillOrQueueId) !== null && _e !== void 0 ? _e : '0')));
    const agentLegStatus = useSelector(agentLegConnectionStatus);
    const agentSelectedVoicePref = useSelector(agentSelectedVoicePreference);
    const previewSkillProps = getPreviewSkillProps(voiceContact, extendedSkillDetailsSelector === null || extendedSkillDetailsSelector === void 0 ? void 0 : extendedSkillDetailsSelector.deliveryParameters);
    const serverTimeOffset = LocalStorageHelper.getItem(StorageKeys.SERVER_TIME_OFFSET);
    const pinnedItem = useSelector(getPinnedMenuItem);
    const quickAppNavigationItems = useNavigationItems(false, true);
    const [isSlaTimerEnabled, setIsSlaTimerEnabled] = useState(false);
    const open = Boolean(anchorEl) && isSlaTimerEnabled;
    const isInboxCollapsed = useSelector(selectInboxCollapsedState);
    const activityData = useSelector(cxoneCCActivity);
    const selectedActivityData = activityData === null || activityData === void 0 ? void 0 : activityData.find((item) => item.contactId === props.interaction.selectedContactId);
    const assignmentMetadata = useSelector(getAssignmentPanelMetadata);
    const logoutToastReference = useSelector(isLogoutToastOpen);
    const [getCollapsedViewIconsMap, getExpandedViewIconsMap] = CcfInteractionIconsMap();
    const showInteraction = Object.keys(props.interaction.acdContacts).length > 0 ||
        Object.keys(props.interaction.digitalContacts).length > 0 ||
        props.interaction.interactionType === InteractionType.PERSONALQUEUE
        ? true
        : false;
    const showPublicIcon = props.interaction.interactionType === InteractionType.DIGITAL &&
        assignmentMetadata.incommingDfoInteractionId === '' &&
        Object.keys(props.interaction.digitalContacts).length &&
        Object.values(props.interaction.digitalContacts)[0].isPrivate === false &&
        Object.values(props.interaction.digitalContacts)[0].channelName !== DigitalChannelType.EMAIL
        ? true
        : false;
    const showChatTimerPopover = isInboxCollapsed &&
        props.interaction.interactionId === selectedInteractionId &&
        props.interaction.interactionType === InteractionType.DIGITAL &&
        Object.keys(props.interaction.digitalContacts).length &&
        Object.values(props.interaction.digitalContacts)[0].contactStatus !== DigitalContactStatus.CLOSED &&
        ((_f = Object.values(props.interaction.digitalContacts)[0]) === null || _f === void 0 ? void 0 : _f.isAssignedToAgentInbox);
    const isNewDigitalOutbound = props.interaction.interactionType === InteractionType.DIGITAL &&
        Object.keys(props.interaction.digitalContacts).length &&
        Object.values(props.interaction.digitalContacts)[0].contactStatus === DigitalContactStatus.DRAFT &&
        Object.values(props.interaction.digitalContacts)[0].isOutbound;
    // get preview cases from digital contacts
    const previewContacts = ((_g = props === null || props === void 0 ? void 0 : props.interaction) === null || _g === void 0 ? void 0 : _g.interactionType) !== InteractionType.ELEVATED ? (_j = Object.keys((_h = props === null || props === void 0 ? void 0 : props.interaction) === null || _h === void 0 ? void 0 : _h.digitalContacts)) === null || _j === void 0 ? void 0 : _j.filter((contactID) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        return ((_d = (_c = (_b = (_a = props === null || props === void 0 ? void 0 : props.interaction) === null || _a === void 0 ? void 0 : _a.digitalContacts) === null || _b === void 0 ? void 0 : _b[contactID]) === null || _c === void 0 ? void 0 : _c.contactStatus) === null || _d === void 0 ? void 0 : _d.toLowerCase()) !==
            ((_e = DigitalContactStatus === null || DigitalContactStatus === void 0 ? void 0 : DigitalContactStatus.DRAFT) === null || _e === void 0 ? void 0 : _e.toLowerCase()) &&
            ((_j = (_h = (_g = (_f = props === null || props === void 0 ? void 0 : props.interaction) === null || _f === void 0 ? void 0 : _f.digitalContacts) === null || _g === void 0 ? void 0 : _g[contactID]) === null || _h === void 0 ? void 0 : _h.contactStatus) === null || _j === void 0 ? void 0 : _j.toLowerCase()) !==
                ((_k = DigitalContactStatus === null || DigitalContactStatus === void 0 ? void 0 : DigitalContactStatus.INCOMING) === null || _k === void 0 ? void 0 : _k.toLowerCase()) &&
            !((_o = (_m = (_l = props === null || props === void 0 ? void 0 : props.interaction) === null || _l === void 0 ? void 0 : _l.digitalContacts) === null || _m === void 0 ? void 0 : _m[contactID]) === null || _o === void 0 ? void 0 : _o.isAssignedToAgentInbox);
    }) : [];
    // get all cases assigned to agent inbox
    const assignedCases = Object.keys((_k = props === null || props === void 0 ? void 0 : props.interaction) === null || _k === void 0 ? void 0 : _k.digitalContacts).length + (Object.keys((_l = props === null || props === void 0 ? void 0 : props.interaction) === null || _l === void 0 ? void 0 : _l.acdContacts).length > 0 ? 1 : 0);
    const isOnlyPreviewCases = (previewContacts === null || previewContacts === void 0 ? void 0 : previewContacts.length) > 0 && assignedCases === (previewContacts === null || previewContacts === void 0 ? void 0 : previewContacts.length); // check if cases are assigned to agent inbox not just the preview cases are present
    const acdContacts = ((_m = props.interaction) === null || _m === void 0 ? void 0 : _m.acdContacts) ? Object.values((_o = props.interaction) === null || _o === void 0 ? void 0 : _o.acdContacts) : [];
    const digitalContacts = ((_p = props.interaction) === null || _p === void 0 ? void 0 : _p.acdContacts) ? Object.values((_q = props.interaction) === null || _q === void 0 ? void 0 : _q.acdContacts) : [];
    const isSelectedInteraction = assignmentMetadata.selectedInteractionId === props.interaction.interactionId ? true : false;
    const interactionCardStyle = ccfInteractionStyle(theme, isSelectedInteraction, props.interaction.slaIndicator);
    const [contactMode, setContactMode] = useState('');
    const [digitalContactCard, setDigitalContactCard] = useState(null);
    const prevSelectedInteractionId = usePrevious(selectedInteractionId);
    const isInitialSelectionDone = useRef(false);
    const isDialingOrPreview = ((_r = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _r === void 0 ? void 0 : _r.toLowerCase()) === VoiceContactStatus.PREVIEW ||
        agentLegStatus.status === AgentLegStatus.DIALING;
    const consultAgentId = Number(voiceContact && (voiceContact.callType === 'Consult' && voiceContact.ani !== 'AGENT' ? voiceContact.ani : voiceContact.dnis));
    const consultAgentDetail = consultAgentId && agentDetails && agentDetails.find((agent) => agent.agentId === consultAgentId);
    const currentDigitalContact = Object.values(props.interaction.digitalContacts)[0];
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const defaultHomeApp = (agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideContactHistory) ? Navigation.DIRECTORY : Navigation.CONTACTHISTORY;
    const { isLvCustomerCardEnabled } = useLVAppSpacePermission();
    const allInteractions = useSelector(getAllInteractions);
    // eslint-disable-next-line @nice-cxone/ccf/required-tsdoc, @typescript-eslint/no-empty-function
    const emptyCallbackFunction = () => { };
    const [timerProps, setTimerProps] = useState({
        isCountUp: true,
        key: '',
        start: 0,
        startReference: 0,
        stop: 0,
        callback: emptyCallbackFunction,
    });
    const isVoiceTranscriptEnabled = useIsVoiceTranscriptEnabled();
    const isActiveVoiceAndTranscriptionToggleOn = props.interaction.interactionType === InteractionType.VOICE
        && isVoiceTranscriptEnabled;
    /**
     * Lazy helper to check if any digital contact is assigned to agent inbox among all interactions.
     * @returns boolean
     */
    const checkIfAssignedSelected = React.useCallback(() => {
        var _a, _b, _c;
        const focusedContactId = (_a = LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_ID)) !== null && _a !== void 0 ? _a : null;
        if (!focusedContactId)
            return false;
        for (const interaction of Object.values(allInteractions)) {
            if (((interaction === null || interaction === void 0 ? void 0 : interaction.interactionType) === InteractionType.DIGITAL || (interaction === null || interaction === void 0 ? void 0 : interaction.interactionType) === InteractionType.ELEVATED) &&
                ((_c = (_b = interaction === null || interaction === void 0 ? void 0 : interaction.digitalContacts) === null || _b === void 0 ? void 0 : _b[focusedContactId]) === null || _c === void 0 ? void 0 : _c.isAssignedToAgentInbox)) {
                return true;
            }
        }
        return false;
    }, [allInteractions]);
    useEffect(() => {
        if (acdContacts.length) {
            dispatch(globalActions.logoutToastMessageConfirmed(false));
            logoutToastReference && toast.dismiss(logoutToastReference);
        }
    }, [acdContacts.length, dispatch]);
    //Default useEffect for initial rendering
    useEffect(() => {
        setTimerForInteraction();
        if (acdContacts.length <= 1 && props.interaction.interactionType == InteractionType.ELEVATED && isSmView && selectedInteractionId === props.interaction.interactionId) {
            updateSelectedMenu(); // Update selected menu on completion of conference call
        }
    }, [acdContacts === null || acdContacts === void 0 ? void 0 : acdContacts[0], digitalContacts === null || digitalContacts === void 0 ? void 0 : digitalContacts[0], acdContacts.length, digitalContacts.length]);
    useEffect(() => {
        if ((voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.interactionId) === props.interaction.interactionId && consultAgentId && consultAgentDetail) {
            const agentName = consultAgentDetail.firstName + ' ' + consultAgentDetail.lastName;
            setAssignmentCardTitle(agentName);
            setSkillOrQueueName(consultAgentId.toString());
        }
    }, [consultAgentId, consultAgentDetail, voiceContact]);
    useEffect(() => {
        /* Adding aria-live alert for incoming call */
        if ((voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === 'Incoming' && (voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.type) === 'VoiceContact') {
            dispatch(globalActions.setAriaLiveAnnouncer({ ariaMessage: 'Receiving a new incoming call' }));
        }
    }, [voiceContact, dispatch]);
    useEffect(() => {
        var _a;
        setInteractionContactInfo();
        if (((_a = props.interaction) === null || _a === void 0 ? void 0 : _a.slaIndicator) === SLAIndicatorType.CRITICAL) {
            handlePopoverClose();
        }
    }, [props.interaction]);
    useEffect(() => {
        if ((voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.interactionId) === props.interaction.interactionId && inboundContactDetail && Object.keys(inboundContactDetail).length > 0 && (voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) !== 'Dialing' && consultAgentId === inboundContactDetail.agentId) {
            setAssignmentCardTitle((inboundContactDetail === null || inboundContactDetail === void 0 ? void 0 : inboundContactDetail.firstName) + ' ' + (inboundContactDetail === null || inboundContactDetail === void 0 ? void 0 : inboundContactDetail.lastName));
            setSkillOrQueueName(consultAgentId.toString());
        }
    }, [inboundContactDetail]);
    useEffect(() => {
        if (selectedInteractionId === props.interaction.interactionId) {
            updateAndFocusSelectedContact();
            dispatchContextSwitchingEvent();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedInteractionId, Object.keys(props.interaction.digitalContacts).length]);
    /**
     * Function to set interaction title and contact info
     * @example - setInteractionContactInfo();
     */
    const setInteractionContactInfo = () => {
        var _a, _b, _c, _d, _e, _f, _g;
        let contact;
        if (((_a = props === null || props === void 0 ? void 0 : props.interaction) === null || _a === void 0 ? void 0 : _a.digitalContacts) && Object.values((_b = props === null || props === void 0 ? void 0 : props.interaction) === null || _b === void 0 ? void 0 : _b.digitalContacts).length > 0) {
            contact = Object.values(props.interaction.digitalContacts)[0];
            const routingQueue = digitalContactDetails &&
                digitalContactDetails[props.interaction.interactionId] &&
                digitalContactDetails[props.interaction.interactionId][contact.caseId].routingQueue;
            if ((routingQueue === null || routingQueue === void 0 ? void 0 : routingQueue.agentResponseEnabled) || (routingQueue === null || routingQueue === void 0 ? void 0 : routingQueue.customerResponseEnabled))
                setIsSlaTimerEnabled(true);
        }
        else if (props.interaction.interactionType === InteractionType.VOICE) {
            contact = Object.values(props.interaction.acdContacts).sort((contactA, contactB) => {
                if (contactA.contactId > contactB.contactId)
                    return 1;
                else if (contactA.contactId === contactB.contactId)
                    return 0;
                else
                    return -1;
            })[0];
            if (contact.contactMode) {
                if ([
                    VoiceContactStatus.NATURAL_CALL_AMD,
                    VoiceContactStatus.NATURAL_CALL_DIALING,
                    VoiceContactStatus.NATURAL_CALL_RINGING,
                    VoiceContactStatus.INCOMING,
                    VoiceContactStatus.PREVIEW
                ].includes(contact.contactStatus)) {
                    setContactMode(contact.contactMode);
                }
                if (contact.callType === CallType.CONSULT) {
                    if (contact.contactStatus === VoiceContactStatus.DIALING) {
                        dispatch(agentDetailsByAgentId({ agentId: contact.contactMode }));
                    }
                    else if (contact.contactStatus === VoiceContactStatus.INCOMING || contact.contactStatus === VoiceContactStatus.PREVIEW) {
                        dispatch(getConsultingAgentDetails(contact.contactMode));
                    }
                }
            }
        }
        else if (((_c = props.interaction) === null || _c === void 0 ? void 0 : _c.acdContacts) && Object.values(props.interaction.acdContacts).length > 0) {
            contact = Object.values(props.interaction.acdContacts)[0];
        }
        else if (props.interaction.interactionType === InteractionType.PERSONALQUEUE) {
            contact = props.interaction.queueDetails;
        }
        if (contact) {
            let skillOrQueueName = (contact === null || contact === void 0 ? void 0 : contact.skillOrQueueName) || (contact === null || contact === void 0 ? void 0 : contact.contactMode);
            if (contact.callType !== CallType.CONSULT) {
                if (props.interaction.interactionType === InteractionType.PERSONALQUEUE) {
                    setAssignmentCardTitle((contact === null || contact === void 0 ? void 0 : contact.toAddr) ? contact.toAddr : translate('noContactInfo'));
                    skillOrQueueName = (contact === null || contact === void 0 ? void 0 : contact.skillName) === 'Personal Queue' ? translate('personalQueue') : contact === null || contact === void 0 ? void 0 : contact.skillName;
                }
                else if (props.interaction.interactionType === InteractionType.WORKITEM) {
                    setAssignmentCardTitle((_d = contact === null || contact === void 0 ? void 0 : contact.workItemType) !== null && _d !== void 0 ? _d : '');
                }
                else if ((_e = contact === null || contact === void 0 ? void 0 : contact.customerName) === null || _e === void 0 ? void 0 : _e.trim()) {
                    setAssignmentCardTitle((_f = contact === null || contact === void 0 ? void 0 : contact.customerName) === null || _f === void 0 ? void 0 : _f.trim());
                }
                else if (contact === null || contact === void 0 ? void 0 : contact.contactMode) {
                    setAssignmentCardTitle(contact === null || contact === void 0 ? void 0 : contact.contactMode);
                }
                else
                    setAssignmentCardTitle(translate('unknown'));
                setSkillOrQueueName(skillOrQueueName);
            }
            setIsOutbound((_g = contact.isOutbound) !== null && _g !== void 0 ? _g : false);
        }
    };
    /**
     * Function to open sla timer tooltip
     * @example handlePopoverOpen(event)
     */
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    /**
     * Function to close sla timer tooltip
     * @example handlePopoverClose()
     */
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    /**
     * Function is executed when user clicks on an interaction
     * @example updateSelectedInteraction()
     */
    const updateSelectedInteraction = () => {
        if (selectedInteractionId !== props.interaction.interactionId) {
            //if audio recording is in progress, discard it when contact is switched
            eventBus.emit(AudioPlayerStatus.DISCARD_RECORDING);
            dispatch(CcfAssignmentAction.setSelectedInteraction(props.interaction.interactionId));
            LocalStorageHelper.setItem(StorageKeys.SELECTED_INTERACTION_ID, props.interaction.interactionId);
        }
        if (isBelowMd) {
            dispatch(CcfAssignmentAction.updateInboxCollapsed({
                isInboxCollapsed: true,
                isLargeView: !isBelowMd,
            }));
        }
        updateSelectedMenu();
    };
    /**
     * @example - updateContact(id, updateRootContact)
     */
    const updateContact = (contactId, updateRootContact = true) => {
        dispatch(CcfAssignmentAction.setSelectedContactId({
            interactionId: props.interaction.interactionId,
            contactId: contactId,
        }));
        updateRootContact && dispatch(CcfAssignmentAction.setSelectedContactRoot(contactId));
    };
    /**
     * Function to update selected interaction and selected contact
     * @example - updateInteractionAndContact();
     */
    const updateAndFocusSelectedContact = () => {
        var _a, _b, _c, _d, _e, _f, _g;
        if (Object.keys(props.interaction.digitalContacts).length > 0) {
            const focusedContactLS = LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_ID);
            const digitalContactValues = Object.values(props.interaction.digitalContacts);
            const digitalContactKeys = Object.keys(props.interaction.digitalContacts);
            const digitalContact = digitalContactValues[digitalContactKeys.length - 1];
            if (prevSelectedInteractionId !== '' && prevSelectedInteractionId !== selectedInteractionId) { // Interaction switched
                const contact = props.interaction.selectedContactId
                    ? props.interaction.selectedContactId
                    : (_a = digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId) !== null && _a !== void 0 ? _a : '';
                updateContact(contact);
            }
            else {
                if (focusedContactLS) { // Value available in LS
                    if (!isInitialSelectionDone.current) { // Setup on load
                        if (digitalContactKeys.includes(focusedContactLS)) {
                            updateContact(focusedContactLS);
                        }
                        else {
                            LocalStorageHelper.removeItem(StorageKeys.FOCUSED_CONTACT_ID);
                            LocalStorageHelper.removeItem(StorageKeys.FOCUSED_CONTACT_MEDIA_TYPE);
                            updateContact((_b = digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId) !== null && _b !== void 0 ? _b : '');
                        }
                        isInitialSelectionDone.current = true;
                    }
                    else {
                        if (digitalContactKeys.includes(focusedContactLS)) {
                            updateContact(props.interaction.selectedContactId, false);
                        }
                        else {
                            updateContact((_c = digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId) !== null && _c !== void 0 ? _c : '');
                        }
                    }
                }
                else { // LS empty
                    const contact = props.interaction.selectedContactId
                        ? props.interaction.selectedContactId
                        : (_d = digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId) !== null && _d !== void 0 ? _d : '';
                    updateContact(contact);
                }
            }
        }
        else if (Object.keys(props.interaction.acdContacts).length > 0) {
            const acdContact = Object.values(props.interaction.acdContacts)[Object.keys(props.interaction.acdContacts).length - 1];
            updateContact((_e = acdContact.contactId) !== null && _e !== void 0 ? _e : '', false);
            const isAssignedSelected = checkIfAssignedSelected();
            removePreviousContactFocus(dispatch, true, isAssignedSelected);
            LocalStorageHelper.setItem(StorageKeys.FOCUSED_CONTACT_MEDIA_TYPE, acdContact.media);
            LocalStorageHelper.setItem(StorageKeys.FOCUSED_CONTACT_ID, (_f = acdContact.contactId) !== null && _f !== void 0 ? _f : '');
            dispatch(CcfAssignmentAction.setSelectedContactRoot((_g = acdContact.contactId) !== null && _g !== void 0 ? _g : ''));
        }
        updateSelectedMenu();
    };
    /**
     * Function to set selected menu as per conditions
     * @example - updateSelectedMenuApp()
     */
    //eslint-disable-next-line
    const updateSelectedMenu = () => {
        if (!isSmView) {
            dispatch(setSelectedMenu({ name: Navigation.INTERACTION }));
            updateExternalProdURL(null, Navigation.INTERACTION, null);
        }
        else {
            if (assignmentMetadata.incommingAcdInteractionId && assignmentMetadata.incommingAcdInteractionId === selectedInteractionId ||
                assignmentMetadata.incommingDfoInteractionId && assignmentMetadata.incommingDfoInteractionId === selectedInteractionId) {
                dispatch(setSelectedMenu({ name: Navigation.CUSTOMERCARD }));
                updateExternalProdURL(null, Navigation.CUSTOMERCARD, null);
            }
            else if (Object.keys(props.interaction.digitalContacts).length > 0) {
                dispatch(setSelectedMenu({ name: Navigation.INTERACTION }));
                updateExternalProdURL(null, Navigation.INTERACTION, null);
            }
            else if (Object.keys(props.interaction.acdContacts).length > 0) {
                if (props.interaction.interactionType === InteractionType.WORKITEM) {
                    dispatch(setSelectedMenu({ name: Navigation.INTERACTION }));
                    updateExternalProdURL(null, Navigation.INTERACTION, null);
                }
                else if (isActiveVoiceAndTranscriptionToggleOn) {
                    dispatch(setSelectedMenu({ name: Navigation.INTERACTION }));
                    updateExternalProdURL(null, Navigation.INTERACTION, null);
                }
                else {
                    if (pinnedItem && quickAppNavigationItems.some(item => item.menuName === pinnedItem && item.isActive && !item.isHidden)) {
                        dispatch(setSelectedMenu({ name: pinnedItem }));
                        updateExternalProdURL(null, pinnedItem, null);
                    }
                    else {
                        if (isLvCustomerCardEnabled) {
                            dispatch(setSelectedMenu({ name: Navigation.LVCUSTOMERCARD }));
                            updateExternalProdURL(null, Navigation.LVCUSTOMERCARD, null);
                        }
                        else {
                            dispatch(setSelectedMenu({ name: Navigation.CUSTOMERCARD }));
                            updateExternalProdURL(null, Navigation.CUSTOMERCARD, null);
                        }
                    }
                }
            }
            else {
                dispatch(setSelectedMenu({ name: defaultHomeApp }));
                updateExternalProdURL(null, defaultHomeApp, null);
            }
        }
    };
    /**
     * Function to dispatch context switching event for Embedded CRMs
     * @example - dispatchContextSwitchingEvent();
     */
    const dispatchContextSwitchingEvent = () => {
        const eventArgs = {};
        eventArgs.detail = selectedActivityData;
        const contactSwitchEvent = new CustomEvent(CXoneAgentEvents.CONTACT_SWITCH_EVENT, eventArgs);
        window.dispatchEvent(contactSwitchEvent);
    };
    /**
     * Function is executed when attempting to get view icons
     * @example getVoiceIcon()
     * @returns an icon
     */
    const getVoiceIcon = () => {
        const acdContact = Object.values(props.interaction.acdContacts)[0];
        if (acdContact) {
            if (acdContact.contactStatus === VoiceContactStatus.DISCONNECTED &&
                voiceContact.acwTypeId === AcwType.DISPOSITION &&
                props.interaction.interactionType !== InteractionType.ELEVATED) {
                const iconType = isInboxCollapsed ? interactionCardStyle.collapsedIcon : interactionCardStyle.expandedIcon;
                const dispoType = voiceContact.requireDisposition
                    ? interactionCardStyle.requiredDisposition
                    : interactionCardStyle.optionalDisposition;
                return (_jsx(CcfDispositionInteractionIcon, { className: "phoneOutbound", "data-testid": "disposition-icon", style: Object.assign({}, dispoType) }));
            }
            else if (acdContact.contactStatus === VoiceContactStatus.DISCONNECTED &&
                voiceContact.acwTypeId === AcwType.AUTOMATIC_WRAP_UP) {
                return renderACWIcon();
            }
            else if (acdContact.isOutbound) {
                return _jsx(CcfTooltip, Object.assign({ title: translate('ob_call'), disableInteractive: true, arrow: true }, { children: _jsx(CcfPhoneOutboundRevampedIcon, {}) }));
            }
            else {
                return isInboxCollapsed
                    ? getCollapsedViewIconsMap(acdContact.contactStatus)
                    : getExpandedViewIconsMap(acdContact.contactStatus);
            }
        }
        return getExpandedViewIconsMap(VoiceContactStatus.ACTIVE);
    };
    /**
     * Function is executed when attempting to get icons for voicemail contact
     * @example getVoiceMailIcon()
     * @returns an icon
     */
    const getVoiceMailIcon = () => {
        const acdContact = Object.values(props.interaction.acdContacts)[0];
        if (acdContact.contactStatus === VoiceMailContactEventStatus.DISCARDED.toLowerCase()) {
            if (voiceMailContact.acwTypeId === AcwType.DISPOSITION) {
                return renderDispositionIcon(voiceMailContact.requireDisposition);
            }
            else if (voiceMailContact.acwTypeId === AcwType.AUTOMATIC_WRAP_UP) {
                return renderACWIcon();
            }
        }
        return _jsx(CcfVoicemailIcon, { className: "phoneOutbound", sx: { color: theme.palette.secondary.main } });
    };
    /**
     * Function is executed when attempting to get icons for elevated interaction
     * @example getElevatedInteractionIcon()
     * @returns an icon
     */
    const getElevatedInteractionIcon = () => {
        let showBadge = false;
        for (const contact of Object.values(props.interaction.digitalContacts)) {
            if (contact.showBadge) {
                showBadge = true;
                break;
            }
        }
        if (showBadge) {
            return (_jsx(Badge, Object.assign({ overlap: "circular", sx: interactionCardStyle.notificationBadge, variant: "dot" }, { children: _jsx(CcfElevatedInteractionIcon, { className: "phoneOutbound", sx: { color: theme.palette.text.noteLabel } }) })));
        }
        else {
            return _jsx(CcfElevatedInteractionIcon, { className: "phoneOutbound", sx: { color: theme.palette.text.noteLabel } });
        }
    };
    /**
     * Function is executed when attempting to get icons for personal queue contact
     * @example getPersonalQueueIcon()
     * @returns an icon
     */
    const getPersonalQueueIcon = () => {
        return isInboxCollapsed
            ? getCollapsedViewIconsMap(VoiceContactStatus.INQUEUE)
            : getExpandedViewIconsMap(VoiceContactStatus.INQUEUE);
    };
    /**
     * Function is executed when attempting to get icons for work item contact
     * @example getWorkItemIcon()
     * @returns an icon
     */
    const getWorkItemIcon = () => {
        var _a;
        const acdContact = Object.values(props.interaction.acdContacts)[0];
        if (acdContact.contactStatus === WorkItemContactStatus.DISCONNECTED.toLowerCase()) {
            if (workItemContact.acwTypeId === AcwType.DISPOSITION) {
                return renderDispositionIcon(workItemContact.requireDisposition);
            }
            else if (workItemContact.acwTypeId === AcwType.AUTOMATIC_WRAP_UP) {
                return renderACWIcon();
            }
        }
        return (_jsx(CcfWorkItemIcon, { "data-testid": "work-item-icon", className: "phoneOutbound", sx: { color: (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.primary.main }, viewBox: "0 0 25 24" }));
    };
    /**
     * Function to render the disposition icon
     * @param requireDisposition - style object determined by disposition type
     * @example renderDispositionIcon(true)
     * @returns disposition icon
     */
    const renderDispositionIcon = (requireDisposition = false) => {
        const dispositionTypeStyle = requireDisposition
            ? interactionCardStyle.requiredDisposition
            : interactionCardStyle.optionalDisposition;
        return (_jsx(CcfDispositionInteractionIcon, { className: "phoneOutbound", "data-testid": "disposition-icon", style: Object.assign({}, dispositionTypeStyle) }));
    };
    /**
     * Function to render the acw icon
     * @example renderACWIcon()
     * @returns acw icon
     */
    const renderACWIcon = () => {
        const iconType = isInboxCollapsed ? interactionCardStyle.collapsedIcon : interactionCardStyle.expandedIcon;
        return _jsx(CcfUnavailableIcon, { className: "phoneOutbound", "data-testid": "acw-icon", style: Object.assign({}, iconType) });
    };
    /**
     * Function is executed when attempting to get icons for assignment card
     * @example getIcon()
     * @returns an icon
     */
    const getIcon = () => {
        switch (props.interaction.interactionType) {
            case InteractionType.ELEVATED:
                return getElevatedInteractionIcon();
            case InteractionType.VOICE:
                return getVoiceIcon();
            case InteractionType.VOICEMAIL:
                return getVoiceMailIcon();
            case InteractionType.WORKITEM:
                return getWorkItemIcon();
            case InteractionType.DIGITAL: {
                const digitalContact = Object.values(props.interaction.digitalContacts)[0];
                if (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.channelName) {
                    let iconName;
                    if ('isOutbound' in digitalContact && (revamped_icons.includes(digitalContact.channelName.toLowerCase()))) {
                        iconName = isOutbound ? `${digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.channelName}_outbound` : `${digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.channelName}_inbound`;
                    }
                    else {
                        iconName = digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.channelName;
                    }
                    if (digitalContact.showBadge) {
                        return (_jsx(Badge, Object.assign({ overlap: "circular", sx: interactionCardStyle.notificationBadge, variant: "dot" }, { children: _jsx(CcfIcon, { iconName: iconName === null || iconName === void 0 ? void 0 : iconName.toLowerCase(), size: CHANNEL_ICON_SIZE.SMALL }) })));
                    }
                    else if (props.interaction.slaIndicator) {
                        return getIconWithSlaWarningBadge(iconName, props.interaction.slaIndicator);
                    }
                }
                break;
            }
            case InteractionType.PERSONALQUEUE:
                return getPersonalQueueIcon();
        }
        return null;
    };
    /**
     * Used to get the digital Icons with SLA warning badge
     * @param iconsSize - size of the icon
     * @example getIconWithSlaWarningBadge()
     */
    const getIconWithSlaWarningBadge = (channelName, slaIndicator) => {
        var _a, _b, _c, _d;
        if (slaIndicator === SLAIndicatorType.NORMAL) {
            return _jsx(CcfIcon, { iconName: channelName === null || channelName === void 0 ? void 0 : channelName.toLowerCase(), size: CHANNEL_ICON_SIZE.SMALL });
        }
        else {
            return (_jsx(Badge, Object.assign({ overlap: "circular", anchorOrigin: { vertical: 'top', horizontal: 'right' }, badgeContent: _jsx(WarningIcon, { htmlColor: slaIndicator === SLAIndicatorType.WARNING
                        ? (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.yellowWarning
                        : (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.main, sx: { fontSize: 'small' } }) }, { children: _jsx(CcfIcon, { iconName: channelName === null || channelName === void 0 ? void 0 : channelName.toLowerCase(), size: CHANNEL_ICON_SIZE.SMALL }) })));
        }
    };
    /**
     * Returns a JSX for contact info
     * @example - getContactInfo()
     */
    const getContactHeaderInfo = () => {
        var _a;
        const contact = props.interaction.acdContacts[0];
        return (_jsxs(Stack, Object.assign({ flexDirection: 'column', sx: { overflow: 'hidden' } }, { children: [_jsx(CcfTooltip, Object.assign({ title: assignmentCardTitle, arrow: true }, { children: _jsx("div", { children: _jsx(CcfTypography, Object.assign({ variant: "inherit", sx: Object.assign(Object.assign({}, interactionCardStyle.customerName), { margin: showPublicIcon ? '0 0 0 20px' : '0' }) }, { children: assignmentCardTitle })) }) })), _jsx(Box, Object.assign({ sx: interactionCardStyle.cardHeader }, { children: _jsx(CcfTooltip, Object.assign({ title: skillOrQueueName, arrow: true, "aria-label": skillOrQueueName }, { children: _jsx(Box, Object.assign({ component: "div", sx: interactionCardStyle.channelDetail2 }, { children: _jsx(CcfTypography, Object.assign({ sx: interactionCardStyle.skillOrQueueToolTip, variant: "inherit" }, { children: props.interaction.interactionType === InteractionType.ELEVATED
                                    ? `${assignedCases} ${translate('channels')}`
                                    : skillOrQueueName })) })) })) })), _jsx(Box, { children: ((_a = props.interaction) === null || _a === void 0 ? void 0 : _a.interactionType) === InteractionType.VOICE &&
                        (assignmentMetadata.incommingAcdInteractionId ||
                            [
                                VoiceContactStatus.NATURAL_CALL_AMD,
                                VoiceContactStatus.NATURAL_CALL_DIALING,
                                VoiceContactStatus.NATURAL_CALL_RINGING
                            ].includes(contact === null || contact === void 0 ? void 0 : contact.contactStatus)) &&
                        (isDialingOrPreview || (agentSelectedVoicePref && agentSelectedVoicePref !== 'WebRTC')) &&
                        contactMode ? (_jsx(CcfTypography, Object.assign({ variant: "inherit", sx: interactionCardStyle.channelDetail2 }, { children: contactMode }))) : null })] })));
    };
    /**
     * Used to get the style for a CcfCard based on interaction properties
     * @example getCcfInteractionStyle()
     */
    const getCcfInteractionStyle = () => {
        var _a, _b;
        let style = {};
        if (props.interaction.interactionId === selectedInteractionId) {
            style = isInboxCollapsed ? Object.assign({}, interactionCardStyle.activeCardCollapsed) : Object.assign({}, interactionCardStyle.active);
        }
        else {
            style = isInboxCollapsed
                ? Object.assign({}, interactionCardStyle.inactiveCardCollapsed) : Object.assign({}, interactionCardStyle.inactive);
        }
        if (props.interaction.interactionType === InteractionType.PERSONALQUEUE) {
            style = Object.assign(Object.assign({}, style), { backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.default });
        }
        return style;
    };
    /**
     * Used to apply animation styles on CcfCard for incoming contacts
     * @example getIncomingContactStyle()
     */
    const getIncomingContactStyle = () => {
        let style = {};
        const acdContact = Object.values(props.interaction.acdContacts)[0];
        if (props.interaction.interactionType !== InteractionType.ELEVATED) {
            if ((props.interaction.interactionId === assignmentMetadata.incommingAcdInteractionId && acdContact &&
                (acdContact === null || acdContact === void 0 ? void 0 : acdContact.callType) !== CallType.NATURAL_CALLING) ||
                props.interaction.interactionId === assignmentMetadata.incommingDfoInteractionId) {
                style = Object.assign({}, interactionCardStyle.animate);
            }
        }
        return style;
    };
    /**
     * Handler for data received from assignment card child component
     * @example - handleAnimation()
     */
    const handleAnimationChange = (text, shouldShow) => {
        if (props.interaction.interactionType !== InteractionType.ELEVATED) {
            setAnimationText(text);
            setShouldShowAnimation(shouldShow);
        }
    };
    /**
     * Function to set Timer attributes, which is used as props to Timer Component
     * @example setTimerAttributes()
     */
    const setTimerAttributes = (isCountUp, key, start, startReference, stop, callback = emptyCallbackFunction) => {
        setTimerProps({ isCountUp, key, start, startReference, stop, callback });
    };
    /**
     * Function to set Timerfor current interaction
     * @example setTimerForInteraction()
     */
    const setTimerForInteraction = () => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        // eslint-disable-next-line @nice-cxone/ccf/required-tsdoc
        const onIncomingDownTimerExpiry = () => {
            var _a;
            if (props.interaction.interactionType === InteractionType.DIGITAL ||
                props.interaction.interactionType === InteractionType.VOICE ||
                props.interaction.interactionType === InteractionType.VOICEMAIL ||
                props.interaction.interactionType === InteractionType.WORKITEM) {
                if (props.interaction.interactionType === InteractionType.DIGITAL) {
                    const digitalContacts = [...Object.values((_a = props === null || props === void 0 ? void 0 : props.interaction) === null || _a === void 0 ? void 0 : _a.digitalContacts)][0];
                    if (digitalContacts.contactStatus.toLowerCase() === VoiceContactStatus.INCOMING) {
                        if ((agentStatus === null || agentStatus === void 0 ? void 0 : agentStatus.currentState.state) !== 'unavailable') {
                            dispatch(rejectIncomingDigitalContact({
                                interactionId: digitalContacts.interactionId,
                                contactId: digitalContacts.contactId
                            }));
                        }
                        handleAnimationChange('REJECT', true);
                        setTimeout(() => {
                            dispatch(CcfAssignmentAction.removeCXoneDigitalContact({
                                interactionId: digitalContacts.caseId,
                                contactId: digitalContacts.caseId,
                            }));
                            handleAnimationChange('REJECT', false);
                        }, 3000);
                    }
                }
                else if (props.interaction.interactionType === InteractionType.VOICE ||
                    props.interaction.interactionType === InteractionType.VOICEMAIL ||
                    props.interaction.interactionType === InteractionType.WORKITEM) {
                    dispatch(CcfAssignmentAction.setContactHistoryInIndexDbFlag(false));
                }
            }
        };
        if (props.interaction.interactionType === InteractionType.ELEVATED) {
            const initialTime = props.interaction.interactionReceivedTime;
            {
                setTimerAttributes(true, (props.interaction.interactionId) +
                    '_contactDurationCounter', 0, Number(new Date(initialTime)), Number.MAX_SAFE_INTEGER);
            }
            //will add here for elevation
        }
        else {
            const acdContactsLength = Object.keys(props.interaction.acdContacts).length;
            const contacts = acdContactsLength > 0
                ? [...Object.values(props.interaction.acdContacts)]
                : [...Object.values(props.interaction.digitalContacts)];
            const refusalTimeOut = ((_a = contacts[0]) === null || _a === void 0 ? void 0 : _a.refusalTimeOut) || 0;
            const downTimer = props.interaction.interactionType === InteractionType.DIGITAL ? refusalTimeOut - 1 : phoneRefusalTimeout;
            const isNaturalCalling = !!(((_b = contacts[0]) === null || _b === void 0 ? void 0 : _b.callType) === CallType.NATURAL_CALLING);
            if ((_c = contacts[0]) === null || _c === void 0 ? void 0 : _c.isCommitmentReminder) {
                setTimerAttributes(false, contacts[0].contactId, contacts[0].refusalTimeOut || 0, Number(new Date(contacts[0].contactReceivedTime)), 0);
            }
            if (([InteractionType.VOICE, InteractionType.VOICEMAIL].includes(props.interaction.interactionType) &&
                [VoiceContactStatus.INCOMING, VoiceContactStatus.RINGING].includes(contacts[0].contactStatus.toLowerCase())) ||
                (props.interaction.interactionType === InteractionType.DIGITAL &&
                    contacts[0].contactStatus.toLowerCase() === VoiceContactStatus.INCOMING) ||
                (props.interaction.interactionType === InteractionType.WORKITEM &&
                    contacts[0].contactStatus.toLowerCase() === VoiceContactStatus.INCOMING)) {
                setTimerAttributes(false, ((_d = contacts[0]) === null || _d === void 0 ? void 0 : _d.contactId) + '_contactIncomingCounter', downTimer * 1000, Number(new Date(contacts[0].contactReceivedTime)), 1000, onIncomingDownTimerExpiry);
            }
            else if ((((_e = contacts[0]) === null || _e === void 0 ? void 0 : _e.contactStatus) === VoiceContactStatus.DISCONNECTED.toString() &&
                voiceContact.acwTypeId === AcwType.AUTOMATIC_WRAP_UP) ||
                (((_f = contacts[0]) === null || _f === void 0 ? void 0 : _f.contactStatus) === VoiceMailContactEventStatus.DISCARDED.toLowerCase() &&
                    voiceMailContact.acwTypeId === AcwType.AUTOMATIC_WRAP_UP) ||
                (((_g = contacts[0]) === null || _g === void 0 ? void 0 : _g.contactStatus) === VoiceContactStatus.DISCONNECTED.toLowerCase() &&
                    workItemContact.acwTypeId === AcwType.AUTOMATIC_WRAP_UP)) {
                let lastStateChangeTime;
                let maxSecondsACW = 0;
                switch (props.interaction.interactionType) {
                    case InteractionType.VOICE:
                        lastStateChangeTime = voiceContact.lastStateChangeTime;
                        maxSecondsACW = voiceContact.maxSecondsACW || 0;
                        break;
                    case InteractionType.VOICEMAIL:
                        lastStateChangeTime = voiceMailContact.lastStateChangeTime;
                        maxSecondsACW = voiceMailContact.maxSecondsACW || 0;
                        break;
                    case InteractionType.WORKITEM:
                        lastStateChangeTime = workItemContact.lastStateChangeTime;
                        maxSecondsACW = workItemContact.maxSecondsACW || 0;
                        break;
                }
                setTimerAttributes(false, ((_h = contacts[0]) === null || _h === void 0 ? void 0 : _h.contactId) + '_acwCounter', maxSecondsACW * 1000, Number(lastStateChangeTime) - Number(serverTimeOffset), 0);
            }
            else if ((((_j = contacts[0]) === null || _j === void 0 ? void 0 : _j.contactStatus) === VoiceContactStatus.DISCONNECTED.toString() &&
                voiceContact.acwTypeId === AcwType.DISPOSITION) ||
                (((_k = contacts[0]) === null || _k === void 0 ? void 0 : _k.contactStatus) === VoiceMailContactEventStatus.DISCARDED.toLowerCase() &&
                    voiceMailContact.acwTypeId === AcwType.DISPOSITION) ||
                (((_l = contacts[0]) === null || _l === void 0 ? void 0 : _l.contactStatus) === VoiceContactStatus.DISCONNECTED.toLowerCase() &&
                    workItemContact.acwTypeId === AcwType.DISPOSITION)) {
                let contactDetails;
                if (props.interaction.interactionType === InteractionType.VOICE) {
                    contactDetails = voiceContact;
                }
                else {
                    contactDetails = (props.interaction.interactionType === InteractionType.VOICEMAIL) ? voiceMailContact : workItemContactDetail;
                }
                const { lastStateChangeTime, maxSecondsACW = 0, requireDisposition, } = contactDetails;
                setTimerAttributes(!!requireDisposition, ((_m = contacts[0]) === null || _m === void 0 ? void 0 : _m.contactId) + '_dispositionCounter', requireDisposition ? 0 : maxSecondsACW * 1000, Number(lastStateChangeTime) - Number(serverTimeOffset), requireDisposition ? Number.MAX_SAFE_INTEGER : 0);
            }
            else if (isNaturalCalling &&
                ((_o = contacts[0]) === null || _o === void 0 ? void 0 : _o.contactStatus) === VoiceContactStatus.PREVIEW &&
                previewSkillProps.timeout) {
                setTimerAttributes(false, ((_p = contacts[0]) === null || _p === void 0 ? void 0 : _p.contactId) + '_contactDurationCounter', previewSkillProps.timeout * 1000, Number(new Date((_q = contacts[0]) === null || _q === void 0 ? void 0 : _q.contactReceivedTime)), 1000);
            }
            else {
                setTimerAttributes(true, (((_r = props === null || props === void 0 ? void 0 : props.interaction) === null || _r === void 0 ? void 0 : _r.queueDetails) ? (_s = props === null || props === void 0 ? void 0 : props.interaction) === null || _s === void 0 ? void 0 : _s.queueDetails.contactId : (_t = contacts[0]) === null || _t === void 0 ? void 0 : _t.contactId) +
                    '_contactDurationCounter', 0, Number(new Date(((_u = props === null || props === void 0 ? void 0 : props.interaction) === null || _u === void 0 ? void 0 : _u.queueDetails)
                    ? (_v = props === null || props === void 0 ? void 0 : props.interaction) === null || _v === void 0 ? void 0 : _v.queueDetails.startDate
                    : (_w = contacts[0]) === null || _w === void 0 ? void 0 : _w.contactReceivedTime)), Number.MAX_SAFE_INTEGER);
            }
        }
    };
    useEffect(() => {
        var _a, _b, _c, _d, _e, _f;
        if (props.interaction.digitalContacts && Object.keys(props.interaction.digitalContacts).length) {
            const selectedContactId = props.interaction.selectedContactId;
            const digitalContacts = Object.values(props.interaction.digitalContacts);
            let contactCard = null;
            if (((((_a = props.interaction) === null || _a === void 0 ? void 0 : _a.interactionId) === (assignmentMetadata === null || assignmentMetadata === void 0 ? void 0 : assignmentMetadata.selectedInteractionId) || ((_b = Object.values(props.interaction.digitalContacts)[0]) === null || _b === void 0 ? void 0 : _b.contactStatus) === VoiceContactStatus.INCOMING) &&
                props.interaction.interactionType !== InteractionType.ELEVATED &&
                !isNewDigitalOutbound) ||
                (((((_c = props.interaction) === null || _c === void 0 ? void 0 : _c.interactionId) &&
                    ((_d = props.interaction) === null || _d === void 0 ? void 0 : _d.interactionId) === (assignmentMetadata === null || assignmentMetadata === void 0 ? void 0 : assignmentMetadata.voiceInteractionId)) ||
                    (((_e = props.interaction) === null || _e === void 0 ? void 0 : _e.interactionId) &&
                        ((_f = props.interaction) === null || _f === void 0 ? void 0 : _f.interactionId) === (assignmentMetadata === null || assignmentMetadata === void 0 ? void 0 : assignmentMetadata.selectedInteractionId))) &&
                    props.interaction.interactionType === InteractionType.ELEVATED)) {
                if (selectedContactId && props.interaction.digitalContacts[selectedContactId]) {
                    contactCard = (_jsx(CcfAssignmentCard, { contact: props.interaction.digitalContacts[selectedContactId], dataFromAssignmentCard: handleAnimationChange }));
                }
                else {
                    contactCard = (_jsx(CcfAssignmentCard, { contact: digitalContacts[0], dataFromAssignmentCard: handleAnimationChange }));
                }
            }
            setDigitalContactCard(contactCard);
        }
        else {
            setDigitalContactCard(null);
        }
    }, [
        props.interaction.digitalContacts,
        props.interaction.acdContacts,
        props.interaction.selectedContactId,
        assignmentMetadata === null || assignmentMetadata === void 0 ? void 0 : assignmentMetadata.selectedInteractionId
    ]);
    return (_jsxs(_Fragment, { children: [showInteraction && (_jsxs(Box, Object.assign({ ref: ref, role: "region", className: "interaction", onClick: updateSelectedInteraction, "data-testid": 'interaction-' + props.interaction.interactionId, tabIndex: 0, onKeyUp: (e) => {
                    if (e.key === 'Enter')
                        updateSelectedInteraction();
                }, style: { position: 'relative' }, "aria-owns": open ? 'sla-timer-tooltip' : undefined, "aria-haspopup": "true", onMouseEnter: handlePopoverOpen }, { children: [showPublicIcon && (_jsx(Box, Object.assign({ "data-testId": "", sx: isInboxCollapsed
                            ? Object.assign(Object.assign({}, interactionCardStyle.globeIconWrapper), interactionCardStyle.collapsedGlobeIconWrapper) : Object.assign(Object.assign({}, interactionCardStyle.globeIconWrapper), interactionCardStyle.expandedGlobeIconWrapper) }, { children: _jsx(CcfIcon, { iconName: CHANNEL_TYPE.PUBLIC, size: CHANNEL_ICON_SIZE.EXTRA_SMALL, svgIconStyles: {
                                htmlColor: theme.palette.text.black,
                                sx: Object.assign({}, (isInboxCollapsed
                                    ? interactionCardStyle.globeIconCollapsed
                                    : interactionCardStyle.globeIconExpanded)),
                            } }) }))), isInboxCollapsed && !isOnlyPreviewCases && (_jsxs(CcfCard, Object.assign({ className: "ccf-interaction", "data-testid": "ccf-interaction", sx: Object.assign({}, getCcfInteractionStyle()), "aria-labelledby": getChannelNameForNarration(isOutbound, currentDigitalContact === null || currentDigitalContact === void 0 ? void 0 : currentDigitalContact.channelName) }, { children: [_jsx(Box, Object.assign({ style: { display: 'flex' } }, { children: getIcon() })), !isNewDigitalOutbound && (_jsx(CcfTypography, Object.assign({ variant: "inherit", sx: props.interaction.interactionId === selectedInteractionId
                                    ? interactionCardStyle.activeTimer
                                    : interactionCardStyle.timer, "aria-live": "off", style: {
                                    fontSize: '11px',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                } }, { children: _jsx(Timer, { countUp: timerProps.isCountUp, start: timerProps.start, stop: timerProps.stop, startReference: timerProps.startReference, elapsedTimerCallback: timerProps.callback }, timerProps.key) })))] }))), !isSmView && shouldShowAnimation && animationText === 'DISCONNECT' && (_jsx(CcfCard, Object.assign({ sx: Object.assign(Object.assign(Object.assign(Object.assign({}, interactionCardStyle === null || interactionCardStyle === void 0 ? void 0 : interactionCardStyle.hungUpBorder), interactionCardStyle === null || interactionCardStyle === void 0 ? void 0 : interactionCardStyle.hungUpContainer), interactionCardStyle === null || interactionCardStyle === void 0 ? void 0 : interactionCardStyle.hungUpAnimation), (shouldShowAnimation ? interactionCardStyle === null || interactionCardStyle === void 0 ? void 0 : interactionCardStyle.hungUpClass : null)) }, { children: _jsxs(Box, Object.assign({ sx: interactionCardStyle.newBox }, { children: [_jsxs(CcfTypography, Object.assign({ sx: interactionCardStyle.hungUpText }, { children: [translate('interaction'), " ", _jsx("br", {}), " ", translate('completed')] })), _jsx(CcfInteractionCompleteIcon, { viewBox: "0 0 34 34", sx: interactionCardStyle.hungUpIcon })] })) }))), !isSmView && shouldShowAnimation && animationText === 'REJECT' && (_jsx(CcfCard, Object.assign({ sx: interactionCardStyle.boxReject }, { children: _jsxs(Box, Object.assign({ sx: { display: 'flex' } }, { children: [_jsx(CcfCallRejectedIcon, { viewBox: "0 0 34 34", sx: interactionCardStyle.rejectIcon }), _jsx(CcfTypography, Object.assign({ sx: interactionCardStyle.textReject }, { children: props.interaction.interactionType === InteractionType.DIGITAL
                                        ? translate('digitalInteractionRejected')
                                        : translate('callRejected') }))] })) }))), !isInboxCollapsed && !shouldShowAnimation && !isOnlyPreviewCases && (_jsxs(CcfCard, Object.assign({ className: "ccf-interaction", sx: Object.assign(Object.assign({}, getIncomingContactStyle()), getCcfInteractionStyle()), "aria-labelledby": getChannelNameForNarration(isOutbound, currentDigitalContact === null || currentDigitalContact === void 0 ? void 0 : currentDigitalContact.channelName) }, { children: [_jsxs(Box, Object.assign({ sx: Object.assign(Object.assign({}, interactionCardStyle === null || interactionCardStyle === void 0 ? void 0 : interactionCardStyle.sectionTop), { justifyContent: { xs: 'space-between' } }) }, { children: [_jsx(Box, Object.assign({ sx: Object.assign(Object.assign({}, interactionCardStyle === null || interactionCardStyle === void 0 ? void 0 : interactionCardStyle.cardLeft), { flexBasis: isBelowMd ? 'fit-content' : '' }) }, { children: getContactHeaderInfo() })), _jsx(Divider, { orientation: "vertical", variant: "fullWidth", sx: interactionCardStyle.cardDivider, "data-testid": "card-divider" }), _jsxs(Box, Object.assign({ sx: interactionCardStyle.cardRight }, { children: [getIcon(), !isNewDigitalOutbound && (_jsx(CcfTypography, Object.assign({ variant: "inherit", sx: props.interaction.interactionId === selectedInteractionId
                                                    ? interactionCardStyle.activeTimer
                                                    : interactionCardStyle.timer, "aria-live": "off" }, { children: _jsx(Timer, { countUp: timerProps.isCountUp, start: timerProps.start, stop: timerProps.stop, startReference: timerProps.startReference, elapsedTimerCallback: timerProps.callback }, timerProps.key) })))] }))] })), !isSmView && acdContacts.length > 0 &&
                                _jsx(CcfAssignmentCard, { contact: acdContacts[0], dataFromAssignmentCard: handleAnimationChange }), digitalContactCard] }))), previewContacts.length > 0 && // render preview card only if there are any
                        previewContacts.map((contactId) => {
                            var _a, _b;
                            const contact = (_b = (_a = props === null || props === void 0 ? void 0 : props.interaction) === null || _a === void 0 ? void 0 : _a.digitalContacts) === null || _b === void 0 ? void 0 : _b[contactId];
                            return (_jsx(CcfPreviewOnlyContactCard, { caseId: contact === null || contact === void 0 ? void 0 : contact.caseId, interactionId: contact === null || contact === void 0 ? void 0 : contact.interactionId }, contact === null || contact === void 0 ? void 0 : contact.caseId));
                        })] }))), showChatTimerPopover && (_jsx(Popover, Object.assign({ id: "sla-hover-timer", open: open, anchorEl: anchorEl, anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                }, onClose: handlePopoverClose, disableRestoreFocus: true }, { children: _jsx(CcfDigitalContactSLATimerTooltip, {}) })))] }));
}));
export default CcfInteraction;
//# sourceMappingURL=ccf-interaction.js.map