import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CXoneUser } from '@nice-devone/auth-sdk';
import { Card, CardContent, Box, Stack, IconButton, useMediaQuery, useTheme, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { CcfTransferIcon, CcfTypography, CcfCallMergeIcon, CcfTransferArrowsIcon, CcfTooltip, CcfCallMaskIcon, CcfUnmaskIcon, CcfCallMuteIcon, CcfUnMuteIcon, CcfCallRecordIcon, CcfDivider, DividerOrientation, DividerVariant, CcfSwapIcon, CcfCallRecordingIcon, } from '@nice-devone/ui-controls';
import { conferenceCall, transferCall, callConferenceActions, conferenceStatus, conferenceNo, isConsult, conferenceResume, holdAndResumeConference, resumeAndHoldConference, holdAndResumeConsult, } from './ccf-call-conference.slice';
import { UsersInConference, HoverBox } from './users-in-conference/users-in-conference';
import { selectUserInConference, selectUserInConsult, selectUserInLobby, agentDetailsByAgentId, consultedAgentDetails, selectCallConferenceStatus, voiceContactSelector, getIsExternalDirectoryTransfer } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { VoiceContactStatus, contactButtons, ConferenceStatus } from '@nice-devone/common-sdk';
import { getPanelAppNavigationItems, navigateToAppSpaceTab, globalActions } from '../global.app.slice';
import { Navigation } from '../../enums/navigation-menus';
import { ControlButtonText } from '@nice-devone/agent-sdk';
import { maskVoiceContact, muteVoiceContact, recordVoiceContact } from '../ccf-voice-contact/ccf-voice-contact-methods';
import { selectMaxConference } from '../ccf-acd-session/ccf-acd-session.slice';
import conferenceStyles from './ccf-call-conference.styles';
import contactControlStyle from '../../styles/ccf-contact-control.style';
import CcfLeaveEndConference from './ccf-leave-end-conference';
import { toast } from 'react-toastify';
/**
 * Component for call conference
 * @param param0 - className
 * @example - <CcfCallConference />
 * @returns
 */
const CcfCallConference = () => {
    var _a, _b, _c, _d;
    const theme = useTheme();
    const iconColor = theme.palette.secondary.main;
    const usersInCall = useSelector(selectUserInConference);
    const userInLobby = useSelector(selectUserInLobby);
    const userInConsult = useSelector(selectUserInConsult);
    const callType = useSelector(selectCallConferenceStatus);
    const consultedAgents = useSelector(consultedAgentDetails);
    const panelAppNavigationItems = useSelector(getPanelAppNavigationItems);
    const isUserInConsultAndLobby = userInConsult && userInLobby;
    const userInConsultStatus = userInConsult === null || userInConsult === void 0 ? void 0 : userInConsult.contact.status.toLowerCase();
    const userInLobbyStatus = userInLobby === null || userInLobby === void 0 ? void 0 : userInLobby.contact.status.toLowerCase();
    const consultOrLobbyDNIS = (userInConsult === null || userInConsult === void 0 ? void 0 : userInConsult.contact.skill) === '0' ? userInConsult === null || userInConsult === void 0 ? void 0 : userInConsult.contact.dnis : userInLobby === null || userInLobby === void 0 ? void 0 : userInLobby.contact.dnis;
    const isValidAgentIDFormat = (consultOrLobbyDNIS === null || consultOrLobbyDNIS === void 0 ? void 0 : consultOrLobbyDNIS.match(/^\d+$/)) !== null; // Check if rawDNIS is a valid agent ID format
    let consultAgentId = undefined;
    if (callType === 'Consult' && isValidAgentIDFormat) {
        consultAgentId = consultOrLobbyDNIS;
    }
    else if (callType !== 'Consult' && usersInCall) {
        consultAgentId = (_a = usersInCall.find((user) => user.contact.skill === '0')) === null || _a === void 0 ? void 0 : _a.contact.dnis;
    }
    const consultAgentDetail = consultAgentId && consultedAgents && consultedAgents.find((agent) => agent.agentId === Number(consultAgentId)) || { firstName: '', lastName: '' };
    const dispatch = useDispatch();
    const voiceContact = useSelector(voiceContactSelector);
    const isMuteIcon = voiceContact.callControlButton ? ((_b = voiceContact.callControlButton.mute) === null || _b === void 0 ? void 0 : _b.controlText) === ControlButtonText.MUTE : true;
    const isMaskIcon = voiceContact.callControlButton ? ((_c = voiceContact.callControlButton.mask) === null || _c === void 0 ? void 0 : _c.controlText) === ControlButtonText.MASK : true;
    const maxConference = useSelector(selectMaxConference);
    const isSmView = useMediaQuery((theme) => theme.breakpoints.down('xl'));
    const currentTheme = useTheme();
    const conferenceIconStyles = conferenceStyles(currentTheme);
    const contactControlIconsStyles = contactControlStyle(currentTheme);
    const contactControlSx = Object.assign(Object.assign({}, contactControlIconsStyles.hover), contactControlIconsStyles.disabled);
    const conferenceCurrentStatus = useSelector(conferenceStatus);
    const currentConferenceNo = useSelector(conferenceNo);
    const isConferenceConsult = useSelector(isConsult);
    const atConferenceLimit = usersInCall.length >= maxConference || isConferenceConsult;
    const isConsultContactID = true;
    let userInConsultInfo = userInConsult && (userInConsultStatus === VoiceContactStatus.ACTIVE || userInConsultStatus === VoiceContactStatus.DIALING) ? userInConsult : userInLobby;
    if (isUserInConsultAndLobby && userInConsultStatus === userInLobbyStatus && userInConsultStatus === VoiceContactStatus.HOLDING) {
        userInConsultInfo = userInConsult;
    }
    const userInfo = CXoneUser.instance.getUserInfo();
    const agentId = userInfo === null || userInfo === void 0 ? void 0 : userInfo.icAgentId;
    const isExternalDirectoryTransfer = useSelector(getIsExternalDirectoryTransfer);
    const conferenceStyle = conferenceStyles(theme);
    useEffect(() => {
        if (((isUserInConsultAndLobby) || usersInCall) && consultAgentId && !(consultAgentDetail === null || consultAgentDetail === void 0 ? void 0 : consultAgentDetail.agentId)) {
            dispatch(agentDetailsByAgentId({ agentId: consultAgentId }));
        }
    }, [userInLobby, userInConsult, usersInCall]);
    useEffect(() => {
        const isUserInConsult = (usersInCall === null || usersInCall === void 0 ? void 0 : usersInCall.length) > 1 && userInConsult && isConsultContactID ? true : false;
        dispatch(callConferenceActions.isConsult(isUserInConsult));
    }, [dispatch, userInConsult, usersInCall]);
    useEffect(() => {
        if (usersInCall.length <= 1 && conferenceCurrentStatus) {
            dispatch(callConferenceActions.setConferenceStatus());
        }
    }, [dispatch, conferenceCurrentStatus, usersInCall, userInConsult]);
    /**
     * Function to dispatch add user to conference action
     * @example dispatchAddUserToConference()
     */
    function dispatchAddUserToConference() {
        dispatch(conferenceCall());
    }
    /**
     * Function to dispatch transfer the call
     * @example dispatchTransfer()
     */
    function dispatchLeaveConference() {
        dispatch(transferCall());
    }
    /**
     * Function to get the list of contacts to display in the conference list UX
     * @example getMultiPartyContacts()
     * @returns Participant[]
     */
    const getMultiPartyContacts = () => {
        const allActiveContacts = [];
        if (usersInCall.length > 1) {
            allActiveContacts.push(...usersInCall.filter((o) => o.contact.contactID !== (userInConsult === null || userInConsult === void 0 ? void 0 : userInConsult.contact.contactID)));
        }
        else {
            !isConferenceConsult && userInConsult && allActiveContacts.push(userInConsult);
            userInLobby && (userInLobby === null || userInLobby === void 0 ? void 0 : userInLobby.contact.contactID) !== (userInConsult === null || userInConsult === void 0 ? void 0 : userInConsult.contact.contactID) && allActiveContacts.push(userInLobby);
        }
        return allActiveContacts;
    };
    /**
     * Function to check if all active contacts are agents
     * @example isAllAgentsInActiveContacts()
     * @returns
     */
    const isAllAgentsInActiveContacts = () => {
        let activeContacts = getMultiPartyContacts();
        userInConsult && activeContacts.push(userInConsult);
        activeContacts = activeContacts.filter((contact) => { return contact.name !== agentId; });
        const activeAgents = activeContacts.filter((contact) => { return contact.designation.toLowerCase() === 'agent'; });
        return activeAgents.length === activeContacts.length ? true : false;
    };
    /**
     * Handles recording control with error handling
     * @param voiceContact - The voice contact instance
     * @example
     * ```
     * handleRecordControl(voiceContact)
     * ```
     */
    const handleRecordControl = (voiceContact) => __awaiter(void 0, void 0, void 0, function* () {
        const resultAction = yield dispatch(recordVoiceContact(voiceContact));
        if (recordVoiceContact.rejected.match(resultAction)) {
            toast.error(_jsx(CcfTypography, { translationKey: "stopRecordingError" }), {
                autoClose: 2000,
                containerId: 'AppToastContainer',
            });
        }
    });
    /**
     *
     * @param control - contactButtons
     * @param event -React.MouseEvent
     * @example -   onContactControlClick('mask', event)
    */
    const onContactControlClick = (controlText, event) => {
        event.stopPropagation();
        switch (controlText) {
            case contactButtons.mask:
                dispatch(maskVoiceContact(voiceContact));
                break;
            case contactButtons.mute:
                dispatch(muteVoiceContact(voiceContact));
                break;
            case contactButtons.record:
                handleRecordControl(voiceContact);
                break;
            case 'swap':
                {
                    const usersInHold = usersInCall.filter((o) => o.contact.status.toLowerCase() === VoiceContactStatus.HOLDING);
                    if (currentConferenceNo && userInConsult && usersInCall.length === 2 && usersInHold.length === 1) {
                        usersInCall.forEach((participant) => {
                            dispatch(holdAndResumeConsult({ consultContact: participant.contact, conferenceNo: currentConferenceNo }));
                        });
                    }
                    else if (currentConferenceNo && userInConsult && usersInCall.length > 1) {
                        if (conferenceCurrentStatus === ConferenceStatus.HOLD && userInConsult.contact.status.toLowerCase() !== VoiceContactStatus.HOLDING) {
                            dispatch(holdAndResumeConference({ conferenceNo: currentConferenceNo, consultContact: userInConsult.contact }));
                        }
                        else if (conferenceCurrentStatus === ConferenceStatus.JOINED || userInConsult.contact.status.toLowerCase() === VoiceContactStatus.HOLDING) {
                            dispatch(resumeAndHoldConference({ conferenceNo: currentConferenceNo, consultContact: userInConsult.contact }));
                        }
                    }
                }
                break;
            case 'rejoin':
                if (currentConferenceNo && usersInCall.length > 1) {
                    dispatch(conferenceResume(currentConferenceNo));
                }
                break;
            default:
                break;
        }
    };
    /**
     * Function to redirect to directory
     * @example - onAddContactClick()
    */
    const onAddContactClick = () => {
        if (isSmView) {
            dispatch(globalActions.setSelectedMenu({ name: 'Directory' }));
        }
        else {
            navigateToAppSpaceTab({ dispatch: dispatch, panelAppNavigationItems: panelAppNavigationItems, navigation: Navigation.DIRECTORY });
        }
    };
    /**
     * Function to disable call controls
     * @example - isCallControlDisabled(ControlButtonText.MASK)
    */
    const isCallControlDisabled = (control) => {
        var _a, _b;
        if (voiceContact.callControlButton && (((_a = voiceContact.callControlButton[control]) === null || _a === void 0 ? void 0 : _a.isVisible) === false || ((_b = voiceContact.callControlButton[control]) === null || _b === void 0 ? void 0 : _b.isEnable) === false)) {
            return true;
        }
        return false;
    };
    return (_jsx(Box, { children: (!isExternalDirectoryTransfer && (userInConsult || usersInCall.length > 1)) && _jsxs(Card, { children: [_jsxs(Box, Object.assign({ sx: { backgroundColor: theme.palette.background.light } }, { children: [_jsxs(Box, Object.assign({ sx: Object.assign({}, conferenceIconStyles.conferenceActionsPanel) }, { children: [_jsx(CcfTypography, { translationKey: usersInCall.length > 1 ? 'conference' : 'consult', variant: 'h4', sx: { textAlign: 'left', width: '100%', fontWeight: 'bolder' }, "data-testid": 'conferenceHeader' }), (usersInCall.length > 1) && _jsx(CcfTooltip, Object.assign({ title: '', translationKey: usersInCall.length >= maxConference ? 'maxConferenceLimitMessage' : 'transfer', arrow: true }, { children: _jsx(IconButton, Object.assign({ disabled: atConferenceLimit, color: 'primary', onClick: () => onAddContactClick(), sx: Object.assign(Object.assign(Object.assign({}, conferenceIconStyles.conferenceActionIcon), conferenceIconStyles.addIconMargin), contactControlIconsStyles.disabled), "data-testid": 'icon-add-contact' }, { children: _jsx(CcfTransferIcon, {}) })) })), (usersInCall.length > 1) && _jsx(CcfLeaveEndConference, {}), userInConsult && usersInCall.length <= 1 && _jsx(CcfTooltip, Object.assign({ title: '', translationKey: 'transferContact', arrow: true }, { children: _jsx(IconButton, Object.assign({ sx: Object.assign(Object.assign(Object.assign({}, conferenceIconStyles.conferenceActionIcon), conferenceIconStyles.consultIconsMargin), contactControlIconsStyles.disabled), onClick: () => dispatchLeaveConference(), "data-testid": 'leave-conference', disabled: isAllAgentsInActiveContacts() }, { children: _jsx(CcfTransferArrowsIcon, {}) })) })), !isConferenceConsult && userInConsult && conferenceCurrentStatus !== ConferenceStatus.HOLD && ((_d = userInConsultInfo === null || userInConsultInfo === void 0 ? void 0 : userInConsultInfo.contact) === null || _d === void 0 ? void 0 : _d.status.toLowerCase()) !== VoiceContactStatus.DIALING && _jsx(CcfTooltip, Object.assign({ title: '', translationKey: 'conference', arrow: true }, { children: _jsx(IconButton, Object.assign({ sx: Object.assign(Object.assign({}, conferenceIconStyles.conferenceActionIcon), conferenceIconStyles.consultIconsMargin), onClick: () => dispatchAddUserToConference(), "data-testid": 'merge-conference' }, { children: _jsx(CcfCallMergeIcon, { sx: { transform: 'rotate(90deg)' } }) })) }))] })), _jsxs(Stack, Object.assign({ direction: 'row', spacing: 3, sx: { margin: '4px 8px 0px', justifyContent: 'flex-start' }, alignContent: 'center', alignItems: 'center' }, { children: [_jsx(CcfTooltip, Object.assign({ title: '', translationKey: isMaskIcon ? 'mask' : 'unmask', arrow: true }, { children: _jsx(IconButton, Object.assign({ sx: contactControlSx, onClick: (e) => onContactControlClick('mask', e), disabled: isCallControlDisabled(ControlButtonText.MASK), "data-testid": 'icon-mask-contact' }, { children: isMaskIcon ? (_jsx(CcfCallMaskIcon, {})) : (_jsx(CcfUnmaskIcon, {})) })) })), _jsx(CcfTooltip, Object.assign({ title: '', translationKey: isMuteIcon ? 'mute' : 'unmute', arrow: true }, { children: _jsx(IconButton, Object.assign({ sx: contactControlSx, onClick: (e) => onContactControlClick('mute', e), disabled: isCallControlDisabled(ControlButtonText.MUTE), "data-testid": 'icon-mute-contact' }, { children: isMuteIcon ? (_jsx(CcfCallMuteIcon, {})) : (_jsx(CcfUnMuteIcon, {})) })) })), _jsx(CcfTooltip, Object.assign({ title: '', translationKey: voiceContact.isLogging ? 'recording' : 'record', arrow: true }, { children: _jsx(IconButton, Object.assign({ sx: contactControlSx, onClick: (e) => onContactControlClick('record', e), disabled: isCallControlDisabled(ControlButtonText.RECORD), "data-testid": 'icon-record-contact' }, { children: voiceContact.isLogging ? (_jsx(CcfCallRecordingIcon, {})) : (_jsx(CcfCallRecordIcon, {})) })) })), ((isConferenceConsult)) &&
                                    _jsx(CcfTooltip, Object.assign({ title: '', translationKey: 'swap', arrow: true }, { children: _jsx(IconButton, Object.assign({ sx: contactControlSx, onClick: (e) => onContactControlClick('swap', e), "data-testid": 'icon-swap' }, { children: _jsx(CcfSwapIcon, { htmlColor: iconColor, viewBox: "0 0 30 30" }) })) })), !isConferenceConsult && conferenceCurrentStatus === ConferenceStatus.HOLD &&
                                    _jsx(Button, Object.assign({ onClick: (e) => onContactControlClick('rejoin', e), variant: "outlined", size: "medium", sx: { height: '2em' }, "data-testid": 'btn-rejoin' }, { children: "Rejoin" }))] }))] })), _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH, flexItem: true }), _jsxs(CardContent, Object.assign({ sx: [conferenceStyle.content, conferenceStyle.contentColumn] }, { children: [isConferenceConsult && userInConsult && isConsultContactID && _jsx(HoverBox, { user: userInConsult, isSingleConsult: !!userInConsult && (usersInCall === null || usersInCall === void 0 ? void 0 : usersInCall.length) <= 1, currentConferenceStatus: conferenceCurrentStatus, isConferenceConsult: isConferenceConsult, conferenceNo: currentConferenceNo, isConsultContact: true }), isConferenceConsult && isConsultContactID && _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH, flexItem: true }), _jsx(UsersInConference, { users: getMultiPartyContacts() })] }))] }) }));
};
export default CcfCallConference;
//# sourceMappingURL=ccf-call-conference.js.map