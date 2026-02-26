import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, Stack, useTheme } from '@mui/material';
import { toast } from 'react-toastify';
import { CcfTooltip, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import { AgentLegStatus, MediaType, VoiceContactStatus } from '@nice-devone/common-sdk';
import { CallType } from '@nice-devone/agent-sdk';
import acceptRejectWrapperStyles from './ccf-accept-reject-wrapper.styles';
import CcfContactAcceptReject from '../../ccf-assignment-panel/ccf-assignment-card/ccf-assignment-card-accept-reject/ccf-assignment-card-accept-reject';
import { globalActions, isLogoutToastOpen } from '../../global.app.slice';
import { agentLegConnectionStatus, disconnectAgentLeg } from '../../ccf-agent-state/ccf-agent-state.slice';
import { acceptConsultCall, acceptContact, acceptIncomingDigitalContact, acceptAndActivateWorkItemContact, CcfAssignmentAction, getAgentLegId, rejectContact, rejectIncomingDigitalContact, voiceContactSelector, voiceMailContactDetailsSelector, workItemContactDetailsSelector, consultedAgentDetails, getUpdatedCallerName, getInteractionRejectKeyPressedStatus, getInteractionAcceptKeyPressedStatus, agentLegAutoAcceptEnabled, } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CXoneVoiceClientWrapper } from '../../../services/cxone-voice-client-wrapper';
import CcfIcon, { CHANNEL_ICON_SIZE } from '../../ccf-icon/ccf-icon';
import { CHANNEL_ICON_NAME } from '../../ccf-icon/ccf-icon-list';
import CcfPcAcceptRequeueReschedule from '../../ccf-voice-contact/ccf-pc-ob-preview-dialer/ccf-pc-accept-requeue-reschedule';
import { getPreviewSkillProps, isPreviewContact } from '../../ccf-voice-contact/ccf-voice-contact-methods';
import { extendedSkillDetailsById } from '../../ccf-agent-skill/ccf-agent-skill-details-slice';
import { PCDeliveryType } from '../../../enums/delivery-type';
import CcfPCManualDialField from '../../ccf-assignment-panel/ccf-assignment-card/ccf-PC-Manual-Dial-Field/ccf-PC-Manual-Dial-Field';
import { agentSelectedVoicePreference } from '../../ccf-acd-session/ccf-acd-session.slice';
/**
 * Wrapper component for accept reject panel in Small View
 * @param props - CcfAcceptRejectWrapperProps
 * @example - <CcfAcceptRejectWrapper />
 */
export function CcfAcceptRejectWrapper(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const theme = useTheme();
    const dispatch = useDispatch();
    const styles = acceptRejectWrapperStyles(theme);
    const [translate] = useTranslator();
    const logoutToastReference = useSelector(isLogoutToastOpen);
    const agentLegData = useSelector(agentLegConnectionStatus);
    const agentLegId = useSelector(getAgentLegId);
    const voiceContactDetails = useSelector(voiceContactSelector);
    const agentDetails = useSelector(consultedAgentDetails);
    const inboundContactDetail = useSelector(getUpdatedCallerName);
    const voiceMailContactDetails = useSelector(voiceMailContactDetailsSelector);
    const workItemContactDetails = useSelector(workItemContactDetailsSelector);
    const [skillOrQueueName, setSkillOrQueueName] = useState('');
    const [assignmentCardTitle, setAssignmentCardTitle] = useState('');
    const isNaturalCalling = !!(((_a = props.contact) === null || _a === void 0 ? void 0 : _a.callType) === CallType.NATURAL_CALLING);
    const autoAcceptContact = useRef(-1);
    const isConsultcall = ((_b = props.contact) === null || _b === void 0 ? void 0 : _b.callType) === 'Consult' &&
        (((_c = props.contact) === null || _c === void 0 ? void 0 : _c.contactStatus) === VoiceContactStatus.INCOMING ||
            ((_d = props.contact) === null || _d === void 0 ? void 0 : _d.contactStatus) === VoiceContactStatus.RINGING)
        ? true
        : false;
    const skillOrQueueId = (_e = props === null || props === void 0 ? void 0 : props.contact) === null || _e === void 0 ? void 0 : _e.skillOrQueueId;
    const extendedSkillDetailsSelector = useSelector(extendedSkillDetailsById(Number(skillOrQueueId)));
    const isPreview = isPreviewContact(voiceContactDetails);
    const previewSkillProps = getPreviewSkillProps(voiceContactDetails, extendedSkillDetailsSelector === null || extendedSkillDetailsSelector === void 0 ? void 0 : extendedSkillDetailsSelector.deliveryParameters);
    const pcDeliveryType = previewSkillProps === null || previewSkillProps === void 0 ? void 0 : previewSkillProps.deliveryType;
    const isManualDial = isPreview &&
        (pcDeliveryType === PCDeliveryType.MANUAL_DIAL || pcDeliveryType === PCDeliveryType.MANUAL_DIAL_AUTO_CORRECT);
    const [isCallButtonDisabled, setCallButtonIsDisabled] = useState(isManualDial);
    const consultAgentId = isConsultcall && voiceContactDetails ? Number(voiceContactDetails.ani === 'AGENT' ? voiceContactDetails.dnis : voiceContactDetails.ani) : null;
    const consultAgentDetail = consultAgentId && agentDetails && agentDetails.find((agent) => agent.agentId === consultAgentId);
    const agentSelectedVoicePref = useSelector(agentSelectedVoicePreference);
    const isAgentLegAutoAcceptEnabled = useSelector(agentLegAutoAcceptEnabled);
    const isInteractionAcceptKeyPressed = useSelector(getInteractionAcceptKeyPressedStatus);
    const isInteractionRejectKeyPressed = useSelector(getInteractionRejectKeyPressedStatus);
    const isVoiceOrVoiceMail = ((_f = props.contact) === null || _f === void 0 ? void 0 : _f.media) === MediaType.VOICE || ((_g = props.contact) === null || _g === void 0 ? void 0 : _g.media) === MediaType.VOICEMAIL;
    const isSoftphoneAndDialing = agentSelectedVoicePref === 'WebRTC' &&
        !isAgentLegAutoAcceptEnabled &&
        agentLegData.status === AgentLegStatus.DIALING;
    const requireManualAccept = (voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.isRequireManualAccept) &&
        (((_h = props.contact) === null || _h === void 0 ? void 0 : _h.contactStatus) === VoiceContactStatus.INCOMING ||
            ((_j = props.contact) === null || _j === void 0 ? void 0 : _j.contactStatus) === VoiceContactStatus.CALL_BACK_DISCONNECTED);
    const isIncomingVoiceOrDigitalContact = ((isVoiceOrVoiceMail && isSoftphoneAndDialing) || isConsultcall || requireManualAccept || ((((_k = props.contact) === null || _k === void 0 ? void 0 : _k.media) === MediaType.DIGITAL || ((_l = props.contact) === null || _l === void 0 ? void 0 : _l.media) === MediaType.WORKITEM) && props.contact.contactStatus === VoiceContactStatus.INCOMING));
    const isContactPreview = (((_m = props.contact) === null || _m === void 0 ? void 0 : _m.contactStatus) === VoiceContactStatus.PREVIEW && isPreview);
    /**
     * set the contact info for the accept reject panel
     * @example setContactInfo()
     */
    const setContactInfo = () => {
        var _a, _b, _c;
        if (props.contact) {
            const skillOrQueueName = props.contact.skillOrQueueName || props.contact.contactMode;
            setSkillOrQueueName(skillOrQueueName);
            if (props.contact.callType !== CallType.CONSULT) {
                if (props.contact.media === MediaType.WORKITEM) {
                    setAssignmentCardTitle((_a = props.contact.workItemType) !== null && _a !== void 0 ? _a : '');
                }
                else if ((_b = props.contact.customerName) === null || _b === void 0 ? void 0 : _b.trim()) {
                    setAssignmentCardTitle(props.contact.customerName);
                }
                else if ((_c = props.contact.contactMode) === null || _c === void 0 ? void 0 : _c.trim()) {
                    setAssignmentCardTitle(props.contact.contactMode);
                }
                else
                    setAssignmentCardTitle(translate('unknown'));
            }
        }
    };
    useEffect(() => {
        if (consultAgentId && consultAgentDetail) {
            setAssignmentCardTitle(`${consultAgentDetail.firstName} ${consultAgentDetail.lastName}`);
            setSkillOrQueueName(consultAgentId.toString());
        }
        else if (consultAgentId && inboundContactDetail && props.contact.contactStatus !== 'Dialing' && consultAgentId === inboundContactDetail.agentId) {
            setAssignmentCardTitle(`${inboundContactDetail.firstName} ${inboundContactDetail.lastName}`);
            setSkillOrQueueName(consultAgentId.toString());
        }
        else {
            setContactInfo();
        }
    }, [consultAgentId, consultAgentDetail, inboundContactDetail, props.contact]);
    /**
     * Once the agent leg status becomes dialing, connect the agent leg for the previously accepted contact.
     */
    useEffect(() => {
        var _a;
        if (autoAcceptContact.current === ((_a = props.contact) === null || _a === void 0 ? void 0 : _a.contactId) && agentLegData.status === AgentLegStatus.DIALING) {
            CXoneVoiceClientWrapper.instance.connectAgentLeg(`${agentLegData.agentLegId}`);
        }
    }, [agentLegData]);
    useEffect(() => {
        if (isInteractionAcceptKeyPressed) {
            (isIncomingVoiceOrDigitalContact || isContactPreview) && handleAccept();
        }
        dispatch(CcfAssignmentAction.setInteractionAcceptKeyPressed(false));
    }, [isInteractionAcceptKeyPressed]);
    useEffect(() => {
        if (isInteractionRejectKeyPressed) {
            (isIncomingVoiceOrDigitalContact || isContactPreview) && handleReject();
        }
        dispatch(CcfAssignmentAction.setInteractionRejectKeyPressed(false));
    }, [isInteractionRejectKeyPressed]);
    /**
     * Function to handle accept contact
     * @example handleAccept()
     * @returns
     */
    const handleAccept = (e) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        e === null || e === void 0 ? void 0 : e.preventDefault();
        dispatch(globalActions.logoutToastMessageConfirmed(false));
        logoutToastReference && toast.dismiss(logoutToastReference);
        if (((_a = props.contact) === null || _a === void 0 ? void 0 : _a.media) === MediaType.VOICE ||
            ((_b = props.contact) === null || _b === void 0 ? void 0 : _b.media) === MediaType.VOICEMAIL ||
            (((_c = props.contact) === null || _c === void 0 ? void 0 : _c.contactStatus) === VoiceContactStatus.PREVIEW && isNaturalCalling)) {
            if (agentLegData.status !== AgentLegStatus.DIALING) {
                dispatch(acceptContact((_d = props.contact) === null || _d === void 0 ? void 0 : _d.contactId));
                if (voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.isRequireManualAccept) {
                    autoAcceptContact.current = (_e = props.contact) === null || _e === void 0 ? void 0 : _e.contactId;
                }
            }
            else {
                CXoneVoiceClientWrapper.instance.connectAgentLeg(agentLegId);
            }
            if (isConsultcall) {
                acceptConsultCall((_f = props.contact) === null || _f === void 0 ? void 0 : _f.contactId);
            }
            if (isManualDial) {
                setCallButtonIsDisabled(true);
            }
        }
        else if (((_g = props.contact) === null || _g === void 0 ? void 0 : _g.media) === MediaType.DIGITAL) {
            dispatch(acceptIncomingDigitalContact({
                interactionId: (_h = props.contact) === null || _h === void 0 ? void 0 : _h.interactionId,
                contactId: (_j = props.contact) === null || _j === void 0 ? void 0 : _j.contactId,
            }));
        }
        else if (((_k = props.contact) === null || _k === void 0 ? void 0 : _k.media) === MediaType.WORKITEM) {
            dispatch(acceptAndActivateWorkItemContact((_l = props.contact) === null || _l === void 0 ? void 0 : _l.contactId));
        }
        else {
            dispatch(acceptContact((_m = props.contact) === null || _m === void 0 ? void 0 : _m.contactId));
        }
    };
    /**
     * Function to handle reject contact
     * @example handleReject()
     * @returns
     */
    const handleReject = (e) => {
        var _a, _b, _c, _d, _e, _f, _g;
        e === null || e === void 0 ? void 0 : e.preventDefault();
        dispatch(globalActions.logoutToastMessageConfirmed(false));
        logoutToastReference && toast.dismiss(logoutToastReference);
        dispatch(CcfAssignmentAction.setContactHistoryInIndexDbFlag(false));
        const acdRejectParams = { contactId: (_a = props.contact) === null || _a === void 0 ? void 0 : _a.contactId, mediaType: (_b = props.contact) === null || _b === void 0 ? void 0 : _b.media };
        switch ((_c = props.contact) === null || _c === void 0 ? void 0 : _c.media) {
            case MediaType.VOICE:
                dispatch(rejectContact(acdRejectParams));
                dispatch(CcfAssignmentAction.removeCXoneVoiceContact(voiceContactDetails));
                // Should disconnect agent leg if the contact is not in active or preview state.
                if (((_d = props.contact) === null || _d === void 0 ? void 0 : _d.media) === MediaType.VOICE && ![VoiceContactStatus.ACTIVE, VoiceContactStatus.PREVIEW].includes((_e = props.contact) === null || _e === void 0 ? void 0 : _e.contactStatus)) {
                    dispatch(disconnectAgentLeg());
                }
                break;
            case MediaType.VOICEMAIL:
                dispatch(rejectContact(acdRejectParams));
                dispatch(CcfAssignmentAction.removeCXoneVoiceMailContact(voiceMailContactDetails));
                break;
            case MediaType.WORKITEM:
                dispatch(rejectContact(acdRejectParams));
                dispatch(CcfAssignmentAction.removeCXoneWorkItemContact(workItemContactDetails));
                break;
            case MediaType.DIGITAL:
                dispatch(rejectIncomingDigitalContact({
                    interactionId: props.contact.interactionId,
                    contactId: props.contact.contactId,
                }));
                dispatch(CcfAssignmentAction.removeCXoneDigitalContact({
                    interactionId: (_f = props.contact) === null || _f === void 0 ? void 0 : _f.interactionId,
                    contactId: (_g = props.contact) === null || _g === void 0 ? void 0 : _g.caseId,
                }));
                break;
        }
    };
    /**
     * Returns icon based on the media type
     * @example getIcon()
     */
    const getIcon = () => {
        var _a, _b, _c, _d;
        switch ((_a = props.contact) === null || _a === void 0 ? void 0 : _a.media) {
            case MediaType.VOICE:
                return (_jsx(CcfTooltip, Object.assign({ title: ((_b = props.contact) === null || _b === void 0 ? void 0 : _b.isOutbound) ? translate('ob_call') : translate('ib_call'), disableInteractive: true, arrow: true }, { children: _jsx("span", { children: _jsx(CcfIcon, { customStyle: { display: 'flex', alignItems: 'center', marginRight: '5px' }, iconName: ((_c = props.contact) === null || _c === void 0 ? void 0 : _c.isOutbound) ? CHANNEL_ICON_NAME.OBCALL : CHANNEL_ICON_NAME.IBCALL, size: CHANNEL_ICON_SIZE.MEDIUM }) }) })));
            case MediaType.DIGITAL:
                return _jsx(CcfIcon, { iconName: (_d = props.contact.channelName) === null || _d === void 0 ? void 0 : _d.toLowerCase(), size: CHANNEL_ICON_SIZE.MEDIUM });
            case MediaType.VOICEMAIL:
                return _jsx(CcfIcon, { iconName: CHANNEL_ICON_NAME.VOICEMAIL, size: CHANNEL_ICON_SIZE.MEDIUM });
            case MediaType.WORKITEM:
                return _jsx(CcfIcon, { iconName: CHANNEL_ICON_NAME.WORK_ITEM, size: CHANNEL_ICON_SIZE.MEDIUM });
        }
        return null;
    };
    /**
     * Function to show reject animation for incoming digital contact
     * @example rejectAnimationForDigitalContact()
     */
    const rejectAnimationForDigitalContact = () => {
        var _a, _b;
        dispatch(CcfAssignmentAction.removeCXoneDigitalContact({
            interactionId: (_a = props.contact) === null || _a === void 0 ? void 0 : _a.interactionId,
            contactId: (_b = props.contact) === null || _b === void 0 ? void 0 : _b.caseId,
        }));
    };
    return (_jsx(Card, Object.assign({ sx: styles.controlPanel, square: true }, { children: _jsx(Stack, Object.assign({ sx: styles.getFooterForSmallView, width: '100%' }, { children: _jsxs(Stack, Object.assign({ sx: { display: 'flex', flexDirection: 'row' }, alignItems: 'center', justifyContent: 'space-between', width: '100%' }, { children: [_jsxs(Stack, Object.assign({ flexDirection: 'row', margin: '5px', alignItems: 'center', maxWidth: '50%' }, { children: [_jsx(Stack, Object.assign({ sx: { marginRight: '0.5rem' } }, { children: getIcon() })), _jsxs(Stack, Object.assign({ flexDirection: 'column', sx: { overflow: 'hidden' } }, { children: [_jsx(CcfTooltip, Object.assign({ title: assignmentCardTitle, arrow: true }, { children: _jsx("div", { children: _jsx(CcfTypography, Object.assign({ variant: "inherit", sx: styles.customerName }, { children: assignmentCardTitle })) }) })), _jsx(Box, Object.assign({ sx: styles.cardHeader }, { children: _jsx(CcfTooltip, Object.assign({ title: skillOrQueueName, arrow: true, "aria-label": skillOrQueueName }, { children: _jsx(Box, Object.assign({ component: "div", sx: styles.channelDetail2 }, { children: _jsx(CcfTypography, Object.assign({ sx: styles.skillOrQueueToolTip, variant: "inherit" }, { children: skillOrQueueName })) })) })) }))] }))] })), _jsx(Stack, Object.assign({ alignItems: 'center', flexDirection: 'row', sx: { flexFlow: 'row wrap' }, justifyContent: 'space-between' }, { children: _jsx(Stack, Object.assign({ flexDirection: 'row', sx: styles.contactControlStyle }, { children: ((_o = props.contact) === null || _o === void 0 ? void 0 : _o.callType) === CallType.NATURAL_CALLING ? (_jsxs(_Fragment, { children: [isManualDial && (_jsx(CcfPCManualDialField, { phoneNumber: (_p = props.contact) === null || _p === void 0 ? void 0 : _p.contactMode, pcDeliveryType: pcDeliveryType || 0, setCallButtonIsDisabled: setCallButtonIsDisabled })), _jsx(CcfPcAcceptRequeueReschedule, { contact: props.contact, isManualDial: isManualDial, handleAccept: (e) => handleAccept(e), isAcceptDisabled: isCallButtonDisabled, handleRequeue: (e) => handleReject(e), rejectAnimationForDigitalContact: rejectAnimationForDigitalContact })] })) : (_jsx(CcfContactAcceptReject, { contact: props.contact, handleAccept: (e) => {
                                    handleAccept && handleAccept(e);
                                }, handleReject: (e) => {
                                    handleReject && handleReject(e);
                                }, rejectAnimationForDigitalContact: () => {
                                    return;
                                } })) })) }))] })) })) })));
}
export default CcfAcceptRejectWrapper;
//# sourceMappingURL=ccf-accept-reject-wrapper.js.map