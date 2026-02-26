import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @nice-cxone/ccf/required-tsdoc */
import { useEffect, useRef, useState } from 'react';
import { Box, useMediaQuery, useTheme, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { CcfCard, CcfAppToastMessage, } from '@nice-devone/ui-controls';
import { VoiceContactStatus, MediaType, AgentLegStatus, WorkItemContactStatus, } from '@nice-devone/common-sdk';
import { CXoneVoiceClientWrapper } from '../../../services/cxone-voice-client-wrapper';
import { globalActions, isLogoutToastOpen, } from '../../../lib/global.app.slice';
import { CcfAssignmentAction, getAgentLegId, acceptConsultCall, selectUserInConsult, selectUserInCall, acceptIncomingDigitalContact, agentLegAutoAcceptEnabled, voiceMailContactDetailsSelector, rejectIncomingDigitalContact, workItemContactDetailsSelector, acceptContact, rejectContact, getCustomerDetailsByIdForContactCard, acceptAndActivateWorkItemContact, callPlaced, getAllInteractions, getAssignmentPanelMetadata, getActiveContactInSelectedInteraction, getInteractionAcceptKeyPressedStatus, getInteractionRejectKeyPressedStatus, getSetContactHistoryInIndexDbFlag, getVoiceContactDetailsById, } from '../ccf-assignment-panel.slice';
import CcfVoiceContact from '../../ccf-voice-contact/ccf-voice-contact';
import CcfDigitalContactActions from '../../ccf-digital-contact-actions/ccf-digital-contact-actions';
import { CallType } from '@nice-devone/agent-sdk';
import { agentLegConnectionStatus, disconnectAgentLeg, } from '../../ccf-agent-state/ccf-agent-state.slice';
import { agentSelectedVoicePreference } from '../../ccf-acd-session/ccf-acd-session.slice';
import { toast } from 'react-toastify';
import { ACDSessionManager, CallContactEventStatus, VoiceMailContactEventStatus, } from '@nice-devone/core-sdk';
import { CcfReceiveCommitment } from '../../ccf-commitment/ccf-receive-commitment';
import { CcfDialerControls } from '../../ccf-voice-contact/ccf-dialer-controls/ccf-dialer-controls';
import { ACDVoiceShowControlsStatus } from '../../../enums/call-contact-active-status';
import { CcfPCDialerFields } from '../../ccf-voice-contact/ccf-pc-dialer-fields/ccf-pc-dialer-fields';
import { extendedSkillDetailsById } from '../../ccf-agent-skill/ccf-agent-skill-details-slice';
import CcfContactAcceptReject from './ccf-assignment-card-accept-reject/ccf-assignment-card-accept-reject';
import { callConferenceActions, hasErrorState } from '../../ccf-call-conference/ccf-call-conference.slice';
import CcfPCManualDialField from './ccf-PC-Manual-Dial-Field/ccf-PC-Manual-Dial-Field';
import CcfPcAcceptRequeueReschedule from '../../ccf-voice-contact/ccf-pc-ob-preview-dialer/ccf-pc-accept-requeue-reschedule';
import { PCDeliveryType } from '../../../enums/delivery-type';
import { endTheVoiceContact, isPreviewContact, getPreviewSkillProps, } from '../../ccf-voice-contact/ccf-voice-contact-methods';
import CcfPcDialerControls from '../../ccf-voice-contact/ccf-pc-ob-preview-dialer/ccf-pc-dialer-controls';
import CcfContactControls from '../../ccf-voice-contact/ccf-contact-controls/ccf-contact-controls';
import ccfAssignmentCardStyle from './ccf-assignment-card.style';
import { CcfWorkItemContactPanel } from '../../ccf-work-item-contact/ccf-work-item-contact-panel';
import { storeContactHistoryIndexDB } from '../../ccf-app-space/ccf-agent-contact-history/ccf-agent-contact-history.slice';
import { getDispositionData } from '../../ccf-disposition/ccf-disposition-slice';
export const CcfAssignmentCard = (props) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8;
    const theme = useTheme();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const dispatch = useDispatch();
    const dispositionData = useSelector(getDispositionData);
    const agentLegData = useSelector(agentLegConnectionStatus);
    const agentLegId = useSelector(getAgentLegId);
    const agentSelectedVoicePref = useSelector(agentSelectedVoicePreference);
    const isAgentLegAutoAcceptEnabled = useSelector(agentLegAutoAcceptEnabled);
    const voiceContactDetails = useSelector(getVoiceContactDetailsById(props.contact.contactId));
    const userInConsult = useSelector(selectUserInConsult);
    const usersInCall = useSelector(selectUserInCall);
    const logoutToastReference = useSelector(isLogoutToastOpen);
    const voiceMailContactDetails = useSelector(voiceMailContactDetailsSelector);
    const workItemContactDetails = useSelector(workItemContactDetailsSelector);
    const allInteractions = useSelector(getAllInteractions);
    const assignmentPanelMetadata = useSelector(getAssignmentPanelMetadata);
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const isConsultcall = ((_a = props.contact) === null || _a === void 0 ? void 0 : _a.callType) === 'Consult' &&
        (((_b = props.contact) === null || _b === void 0 ? void 0 : _b.contactStatus) === VoiceContactStatus.INCOMING ||
            ((_c = props.contact) === null || _c === void 0 ? void 0 : _c.contactStatus) === VoiceContactStatus.RINGING)
        ? true
        : false;
    const skillOrQueueId = (_d = props === null || props === void 0 ? void 0 : props.contact) === null || _d === void 0 ? void 0 : _d.skillOrQueueId;
    const extendedSkillDetailsSelector = useSelector(extendedSkillDetailsById(Number(skillOrQueueId)));
    const hasError = useSelector(hasErrorState);
    const setContactHistoryInIndexDb = useSelector(getSetContactHistoryInIndexDbFlag);
    const isNaturalCalling = !!(((_e = props.contact) === null || _e === void 0 ? void 0 : _e.callType) === CallType.NATURAL_CALLING);
    const isPreview = isPreviewContact(voiceContactDetails);
    const previewSkillProps = getPreviewSkillProps(voiceContactDetails, extendedSkillDetailsSelector === null || extendedSkillDetailsSelector === void 0 ? void 0 : extendedSkillDetailsSelector.deliveryParameters);
    const pcDeliveryType = previewSkillProps === null || previewSkillProps === void 0 ? void 0 : previewSkillProps.deliveryType;
    const isManualDial = isPreview &&
        (pcDeliveryType === PCDeliveryType.MANUAL_DIAL || pcDeliveryType === PCDeliveryType.MANUAL_DIAL_AUTO_CORRECT);
    const isOutOfNetworkPcContact = isPreview && pcDeliveryType === PCDeliveryType.OUTSIDE_NETWORK;
    const isActiveStatus = Object.values(ACDVoiceShowControlsStatus).includes((_f = props === null || props === void 0 ? void 0 : props.contact) === null || _f === void 0 ? void 0 : _f.contactStatus);
    const isDialing = voiceContactDetails.status === CallContactEventStatus.DIALING;
    const [isCallButtonDisabled, setCallButtonIsDisabled] = useState(isManualDial);
    const autoAcceptContact = useRef('-1');
    const isSoftphoneAndDialing = agentSelectedVoicePref === 'WebRTC' &&
        !isAgentLegAutoAcceptEnabled &&
        agentLegData.status === AgentLegStatus.DIALING;
    const requireManualAccept = (voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.isRequireManualAccept) &&
        (((_g = props.contact) === null || _g === void 0 ? void 0 : _g.contactStatus) === VoiceContactStatus.INCOMING ||
            ((_h = props.contact) === null || _h === void 0 ? void 0 : _h.contactStatus) === VoiceContactStatus.CALL_BACK_DISCONNECTED);
    const isVoiceOrVoiceMail = ((_j = props.contact) === null || _j === void 0 ? void 0 : _j.media) === MediaType.VOICE || ((_k = props.contact) === null || _k === void 0 ? void 0 : _k.media) === MediaType.VOICEMAIL;
    const acdContacts = assignmentPanelMetadata.voiceInteractionId
        ? (_l = allInteractions[assignmentPanelMetadata.voiceInteractionId]) === null || _l === void 0 ? void 0 : _l.acdContacts
        : {};
    const assignmentCardStyle = ccfAssignmentCardStyle(theme, (_m = props === null || props === void 0 ? void 0 : props.contact) === null || _m === void 0 ? void 0 : _m.slaIndicator);
    const isInteractionAcceptKeyPressed = useSelector(getInteractionAcceptKeyPressedStatus);
    const isInteractionRejectKeyPressed = useSelector(getInteractionRejectKeyPressedStatus);
    const isIncomingVoiceOrDigitalContact = ((isVoiceOrVoiceMail && isSoftphoneAndDialing) || isConsultcall || requireManualAccept || ((((_o = props.contact) === null || _o === void 0 ? void 0 : _o.media) === MediaType.DIGITAL || ((_p = props.contact) === null || _p === void 0 ? void 0 : _p.media) === MediaType.WORKITEM) && props.contact.contactStatus === VoiceContactStatus.INCOMING));
    const isContactPreview = (((_q = props.contact) === null || _q === void 0 ? void 0 : _q.contactStatus) === VoiceContactStatus.PREVIEW && isPreview);
    const [rejected, setRejected] = useState(false);
    const [ccfVoiceMailContactPanel, setCcfVoiceMailContactPanel] = useState(null);
    const [_ccfWorkItemContactPanel, setCcfWorkItemContactPanel] = useState(null);
    const agentSession = ACDSessionManager.instance;
    /**
     * Once the agent leg status becomes dialing, connect the agent leg for the previously accepted contact.
     */
    useEffect(() => {
        var _a;
        if (autoAcceptContact.current.toString() === ((_a = props.contact) === null || _a === void 0 ? void 0 : _a.contactId) && agentLegData.status === AgentLegStatus.DIALING) {
            CXoneVoiceClientWrapper.instance.connectAgentLeg(`${agentLegData.agentLegId}`);
        }
    }, [agentLegData]);
    useEffect(() => {
        const answerSubscription = agentSession.answerEvent.subscribe((data) => {
            if (data) {
                handleAccept();
            }
        });
        const rejectSubscription = agentSession.rejectEvent.subscribe((data) => {
            if (data) {
                handleReject();
            }
        });
        return () => {
            answerSubscription === null || answerSubscription === void 0 ? void 0 : answerSubscription.unsubscribe();
            rejectSubscription === null || rejectSubscription === void 0 ? void 0 : rejectSubscription.unsubscribe();
        };
    }, []);
    useEffect(() => {
        if (hasError === null || hasError === void 0 ? void 0 : hasError.hasErrorForHold) {
            toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: "holdContactError" }), {
                autoClose: 5000,
                containerId: 'AppToastContainer',
            });
        }
        else if (hasError === null || hasError === void 0 ? void 0 : hasError.hasErrorForConsultCall) {
            toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: "consultCallError" }), {
                autoClose: 2000,
                containerId: 'AppToastContainer',
            });
        }
        else if (hasError === null || hasError === void 0 ? void 0 : hasError.hasErrorForDialSkill) {
            toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: "dialSkillError" }), {
                autoClose: 2000,
                containerId: 'AppToastContainer',
            });
        }
        else if (hasError === null || hasError === void 0 ? void 0 : hasError.hasErrorForTransferCall) {
            toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: "transferCallError" }), {
                autoClose: 2000,
                containerId: 'AppToastContainer',
            });
        }
        dispatch(callConferenceActions.resetContactErrorState());
    }, [
        hasError === null || hasError === void 0 ? void 0 : hasError.hasErrorForConsultCall,
        hasError === null || hasError === void 0 ? void 0 : hasError.hasErrorForHold,
        hasError === null || hasError === void 0 ? void 0 : hasError.hasErrorForDialSkill,
        hasError === null || hasError === void 0 ? void 0 : hasError.hasErrorForTransferCall,
        dispatch
    ]);
    useEffect(() => {
        var _a, _b, _c;
        if (((_a = props.contact) === null || _a === void 0 ? void 0 : _a.media) === MediaType.VOICE) {
            let customerId = 'voice_' + props.contact.contactMode;
            if ((_b = props.contact) === null || _b === void 0 ? void 0 : _b.customerCardUrl) {
                const queryParams = new URLSearchParams(decodeURIComponent((_c = props.contact) === null || _c === void 0 ? void 0 : _c.customerCardUrl));
                if (queryParams === null || queryParams === void 0 ? void 0 : queryParams.get('customerId'))
                    customerId = queryParams === null || queryParams === void 0 ? void 0 : queryParams.get('customerId');
            }
            dispatch(getCustomerDetailsByIdForContactCard({
                customerId,
                contactId: props.contact.contactId,
                interactionId: props.contact.interactionId,
            }));
        }
    }, []);
    useEffect(() => {
        var _a, _b, _c, _d, _e, _f, _g;
        if (((_a = props.contact) === null || _a === void 0 ? void 0 : _a.media) === MediaType.VOICE) {
            dispatch(globalActions.logoutToastMessageConfirmed(false));
            logoutToastReference && toast.dismiss(logoutToastReference);
            const numberOfVoiceCalls = assignmentPanelMetadata.voiceInteractionId
                ? (_d = Object.keys((_c = (_b = allInteractions[assignmentPanelMetadata.voiceInteractionId]) === null || _b === void 0 ? void 0 : _b.acdContacts) !== null && _c !== void 0 ? _c : {})) === null || _d === void 0 ? void 0 : _d.length
                : null;
            const hasRegularCallHungUp = numberOfVoiceCalls === 1 && (voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.finalState);
            if (hasRegularCallHungUp) {
                triggerHungUp();
            }
            else if ((voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.finalState) &&
                assignmentPanelMetadata.voiceInteractionId &&
                numberOfVoiceCalls &&
                (usersInCall || userInConsult)) {
                // eslint-disable-next-line array-callback-return
                (_g = Object.values((_f = (_e = allInteractions[assignmentPanelMetadata.voiceInteractionId]) === null || _e === void 0 ? void 0 : _e.acdContacts) !== null && _f !== void 0 ? _f : {})) === null || _g === void 0 ? void 0 : _g.map((val) => {
                    if (val.contactStatus === 'disconnected') {
                        const dispositionData = getDispositionDataForContact(val.contactId);
                        dispatch(storeContactHistoryIndexDB({ acdContactDetails: voiceContactDetails, mediaType: MediaType.VOICE, dispositionData }));
                        dispatch(CcfAssignmentAction.removeCXoneVoiceContact(voiceContactDetails));
                        if (userInConsult && (userInConsult === null || userInConsult === void 0 ? void 0 : userInConsult.contact.status) !== 'Disconnected') {
                            dispatch(CcfAssignmentAction.handleCXoneVoiceContactSubscription(userInConsult === null || userInConsult === void 0 ? void 0 : userInConsult.contact));
                        }
                        if (voiceContactDetails.disconnectCode === 'BadNumber') {
                            dispatch(CcfAssignmentAction.setCtdDisplayError(true));
                            setTimeout(() => {
                                dispatch(CcfAssignmentAction.setCtdDisplayError(false));
                            }, 3000);
                        }
                    }
                });
            }
        }
    }, [acdContacts]);
    useEffect(() => {
        var _a, _b;
        if (((_a = props.contact) === null || _a === void 0 ? void 0 : _a.media) === MediaType.VOICEMAIL) {
            if (voiceMailContactDetails === null || voiceMailContactDetails === void 0 ? void 0 : voiceMailContactDetails.finalState) {
                if ((props === null || props === void 0 ? void 0 : props.contact.contactStatus) === VoiceMailContactEventStatus.DISCARDED.toLowerCase()) {
                    if (isSmView) {
                        dispatch(CcfAssignmentAction.removeCXoneVoiceMailContact(voiceMailContactDetails));
                    }
                    else {
                        handleButtonClick(rejected ? 'REJECT' : 'DISCONNECT', true);
                        setTimeout(() => {
                            if (setContactHistoryInIndexDb) {
                                const dispositionData = getDispositionDataForContact(props.contact.contactId);
                                dispatch(storeContactHistoryIndexDB({ acdContactDetails: voiceMailContactDetails, mediaType: MediaType.VOICEMAIL, dispositionData }));
                            }
                            dispatch(CcfAssignmentAction.removeCXoneVoiceMailContact(voiceMailContactDetails));
                            dispatch(CcfAssignmentAction.setContactHistoryInIndexDbFlag(true));
                            handleButtonClick(rejected ? 'REJECT' : 'DISCONNECT', false);
                        }, 1000);
                    }
                }
            }
            else if (!ccfVoiceMailContactPanel && ((_b = props.contact) === null || _b === void 0 ? void 0 : _b.contactStatus.toLowerCase()) !== VoiceContactStatus.INCOMING.toLowerCase()) {
                renderCcfVoiceMailContactPanel();
            }
        }
    }, [dispatch, props === null || props === void 0 ? void 0 : props.contact, voiceMailContactDetails]);
    useEffect(() => {
        var _a, _b, _c;
        if (((_a = props.contact) === null || _a === void 0 ? void 0 : _a.media) === MediaType.WORKITEM) {
            if (workItemContactDetails === null || workItemContactDetails === void 0 ? void 0 : workItemContactDetails.finalState) {
                if ((props === null || props === void 0 ? void 0 : props.contact.contactStatus.toLowerCase()) === WorkItemContactStatus.DISCONNECTED.toLowerCase()) {
                    if (isSmView) {
                        dispatch(CcfAssignmentAction.removeCXoneWorkItemContact(workItemContactDetails));
                    }
                    else {
                        handleButtonClick(rejected ? 'REJECT' : 'DISCONNECT', true);
                        setTimeout(() => {
                            if (setContactHistoryInIndexDb) {
                                const dispositionData = getDispositionDataForContact(props.contact.contactId);
                                dispatch(storeContactHistoryIndexDB({ acdContactDetails: workItemContactDetails, mediaType: MediaType.WORKITEM, dispositionData }));
                            }
                            dispatch(CcfAssignmentAction.removeCXoneWorkItemContact(workItemContactDetails));
                            dispatch(CcfAssignmentAction.setContactHistoryInIndexDbFlag(true));
                            handleButtonClick(rejected ? 'REJECT' : 'DISCONNECT', false);
                        }, 1000);
                    }
                }
            }
            else if (((_b = props.contact) === null || _b === void 0 ? void 0 : _b.contactStatus.toLowerCase()) !== WorkItemContactStatus.INCOMING.toLowerCase() &&
                ((_c = props.contact) === null || _c === void 0 ? void 0 : _c.contactId) === (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.contactId)) {
                renderCcfWorkItemContactPanel();
            }
        }
    }, [dispatch, props === null || props === void 0 ? void 0 : props.contact, workItemContactDetails]);
    useEffect(() => {
        if (isInteractionAcceptKeyPressed) {
            (isIncomingVoiceOrDigitalContact || isContactPreview) &&
                handleAccept();
        }
        dispatch(CcfAssignmentAction.setInteractionAcceptKeyPressed(false));
    }, [isInteractionAcceptKeyPressed]);
    useEffect(() => {
        if (isInteractionRejectKeyPressed) {
            (isIncomingVoiceOrDigitalContact || isContactPreview) &&
                handleReject();
        }
        dispatch(CcfAssignmentAction.setInteractionRejectKeyPressed(false));
    }, [isInteractionRejectKeyPressed]);
    /**
     * returns a disposition object for a given contactId
     * @param contactId - contactId for which disposition data is required
     * @example getDispositionDataForContact('123456')
     */
    const getDispositionDataForContact = (contactId) => {
        var _a, _b, _c, _d;
        const activeDisposition = dispositionData.dispositions[contactId];
        const primaryDispositionId = ((_b = (_a = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs) === null || _a === void 0 ? void 0 : _a.disposition) === null || _b === void 0 ? void 0 : _b.dispositionId) || 0;
        const dispositionNotes = ((_c = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs) === null || _c === void 0 ? void 0 : _c.notes) || '';
        const tags = ((_d = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs) === null || _d === void 0 ? void 0 : _d.tags) || [];
        return { primaryDispositionId, dispositionNotes, tags };
    };
    /**
     * Function to render workItem contact panel
     * @returns workItem contact panel
     * ```
     * @example
     * renderCcfWorkItemContactPanel()
     * ```
     *
     **/
    const renderCcfWorkItemContactPanel = () => __awaiter(void 0, void 0, void 0, function* () {
        setCcfWorkItemContactPanel(null);
        const workItemContactPanel = yield import('../../ccf-work-item-contact/ccf-work-item-contact-panel');
        const WorkItemContactPanel = workItemContactPanel.CcfWorkItemContactPanel;
        setCcfWorkItemContactPanel(_jsx(WorkItemContactPanel, { workItemContact: workItemContactDetails, contactId: props.contact.contactId }));
    });
    /**
     * Function to render voice mail contact panel
     * @returns voice mail contact panel
     * ```
     * @example
     * renderCcfVoiceMailContactPanel()
     * ```
     *
     **/
    const renderCcfVoiceMailContactPanel = () => __awaiter(void 0, void 0, void 0, function* () {
        setCcfVoiceMailContactPanel(null);
        const voiceMailContactPanel = yield import('../../ccf-voicemail-contact/ccf-voicemail-contact-panel');
        const VoiceMailContactPanel = voiceMailContactPanel.CcfVoiceMailContactPanel;
        setCcfVoiceMailContactPanel(_jsx(VoiceMailContactPanel, { voiceMailContact: voiceMailContactDetails }));
    });
    /**
     * Personal Connection dialer Function to handle call placed click event
     * @example handleCallPlaced()
     * @returns
     */
    const handleCallPlaced = () => {
        var _a, _b, _c;
        if (((_b = (_a = props.contact) === null || _a === void 0 ? void 0 : _a.contactStatus) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === CallContactEventStatus.NATURAL_CALL_DIALING.toLowerCase()) {
            dispatch(callPlaced((_c = props.contact) === null || _c === void 0 ? void 0 : _c.contactId));
        }
    };
    /**
     * callback for disconnect and reject animation
     * @example handleButtonClick()
     * @returns
     */
    const handleButtonClick = (text, shouldShow) => {
        var _a;
        // Call the callback function with the text and the boolean value
        (_a = props === null || props === void 0 ? void 0 : props.dataFromAssignmentCard) === null || _a === void 0 ? void 0 : _a.call(props, text, shouldShow);
    };
    /**
     * Personal Connection dialer Function to handle call ended click event
     * @example handleCallEnded()
     * @returns
     */
    const handlePcCallEnd = () => {
        var _a, _b;
        if (((_b = (_a = props.contact) === null || _a === void 0 ? void 0 : _a.contactStatus) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === CallContactEventStatus.ACTIVE.toLowerCase() &&
            isOutOfNetworkPcContact) {
            dispatch(endTheVoiceContact(voiceContactDetails));
        }
    };
    /**
     * Function is executed when contactstatus is disconnected from either side
     * @example removeCard()
     */
    const triggerHungUp = () => {
        var _a;
        if (isSmView) {
            dispatch(CcfAssignmentAction.removeCXoneVoiceContact(voiceContactDetails));
            /* Adding aria-live alert for incoming call timeout */
            dispatch(globalActions.setAriaLiveAnnouncer({ ariaMessage: 'Timeout for new incoming call' }));
        }
        else {
            if (rejected) {
                handleButtonClick('REJECT', true);
                setTimeout(() => {
                    dispatch(CcfAssignmentAction.removeCXoneVoiceContact(voiceContactDetails));
                    /* Adding aria-live alert for incoming call rejection */
                    dispatch(globalActions.setAriaLiveAnnouncer({ ariaMessage: 'Rejecting a new incoming call' }));
                    handleButtonClick('REJECT', false);
                }, 1000);
            }
            else {
                if ((_a = props === null || props === void 0 ? void 0 : props.contact) === null || _a === void 0 ? void 0 : _a.elevatedFrom) {
                    dispatch(CcfAssignmentAction.removeCXoneVoiceContact(voiceContactDetails));
                    /* Adding aria-live alert for incoming call disconncection */
                    dispatch(globalActions.setAriaLiveAnnouncer({ ariaMessage: 'Disconnecting a new incoming call' }));
                }
                else {
                    handleButtonClick('DISCONNECT', true);
                    setTimeout(() => {
                        if (setContactHistoryInIndexDb) {
                            const dispositionData = getDispositionDataForContact(props.contact.contactId);
                            dispatch(storeContactHistoryIndexDB({ acdContactDetails: voiceContactDetails, mediaType: MediaType.VOICE, dispositionData }));
                        }
                        dispatch(CcfAssignmentAction.removeCXoneVoiceContact(voiceContactDetails));
                        dispatch(CcfAssignmentAction.setContactHistoryInIndexDbFlag(true));
                        /* Adding aria-live alert for incoming call disconncection */
                        dispatch(globalActions.setAriaLiveAnnouncer({ ariaMessage: 'Disconnecting a new incoming call' }));
                        handleButtonClick('DISCONNECT', false);
                    }, 1000);
                }
            }
        }
        if (voiceContactDetails.disconnectCode === 'BadNumber') {
            dispatch(CcfAssignmentAction.setCtdDisplayError(true));
            setTimeout(() => {
                dispatch(CcfAssignmentAction.setCtdDisplayError(false));
            }, 3000);
        }
    };
    /**
     * @param isSmView - if the app is in Small view IE integrated agent
     * @param isManualDial - if we need to account for manual text field
     * @example - accept reject etc buttons should always be in the bottom or the right regardless
     *  of CXA or CXAI this will keep that consistent.
     * @returns - direction setting
     */
    function getPCPreviewDirection(isSmView, isManualDial) {
        let output;
        output = 'column';
        if (isSmView) {
            if (isManualDial) {
                output = 'row';
            }
            else {
                output = 'row-reverse';
            }
        }
        return output;
    }
    /**
     * Function to handle reject contact
     * @example handleReject()
     * @returns
     */
    const handleReject = (e) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        e === null || e === void 0 ? void 0 : e.preventDefault();
        dispatch(globalActions.logoutToastMessageConfirmed(false));
        logoutToastReference && toast.dismiss(logoutToastReference);
        dispatch(CcfAssignmentAction.setContactHistoryInIndexDbFlag(false));
        if (((_a = props.contact) === null || _a === void 0 ? void 0 : _a.media) === MediaType.VOICE ||
            ((_b = props.contact) === null || _b === void 0 ? void 0 : _b.media) === MediaType.VOICEMAIL ||
            ((_c = props.contact) === null || _c === void 0 ? void 0 : _c.media) === MediaType.WORKITEM) {
            dispatch(rejectContact({ contactId: (_d = props.contact) === null || _d === void 0 ? void 0 : _d.contactId, mediaType: (_e = props.contact) === null || _e === void 0 ? void 0 : _e.media }));
            setRejected(true);
            // Should not disconnect the agent leg upon rejecting an incoming work item when a voice contact status is active
            if (((_f = props.contact) === null || _f === void 0 ? void 0 : _f.media) === MediaType.VOICE && ![VoiceContactStatus.ACTIVE, VoiceContactStatus.PREVIEW].includes((_g = props.contact) === null || _g === void 0 ? void 0 : _g.contactStatus)) {
                dispatch(disconnectAgentLeg());
            }
        }
        else if (((_h = props.contact) === null || _h === void 0 ? void 0 : _h.media) === MediaType.DIGITAL) {
            dispatch(rejectIncomingDigitalContact({
                interactionId: props.contact.interactionId,
                contactId: props.contact.contactId
            }));
            rejectAnimationForDigitalContact();
        }
    };
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
            // AW-27792, AW-27881 When the manual accept is enabled at skill level then we should invoke the acceptContact API for in Active and Disconnected Status
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
            dispatch(acceptIncomingDigitalContact({ interactionId: (_h = props.contact) === null || _h === void 0 ? void 0 : _h.caseId, contactId: (_j = props.contact) === null || _j === void 0 ? void 0 : _j.contactId }));
        }
        else if (((_k = props.contact) === null || _k === void 0 ? void 0 : _k.media) === MediaType.WORKITEM) {
            dispatch(acceptAndActivateWorkItemContact((_l = props.contact) === null || _l === void 0 ? void 0 : _l.contactId));
        }
        else {
            dispatch(acceptContact((_m = props.contact) === null || _m === void 0 ? void 0 : _m.contactId));
        }
    };
    /**
     * Function to show reject animation for incoming digital contact
     * @example rejectAnimationForDigitalContact()
     */
    const rejectAnimationForDigitalContact = () => {
        var _a, _b;
        if (isSmView) {
            dispatch(CcfAssignmentAction.removeCXoneDigitalContact({
                interactionId: (_a = props.contact) === null || _a === void 0 ? void 0 : _a.interactionId,
                contactId: (_b = props.contact) === null || _b === void 0 ? void 0 : _b.caseId,
            }));
        }
        else {
            handleButtonClick('REJECT', true);
            setTimeout(() => {
                var _a, _b;
                dispatch(CcfAssignmentAction.removeCXoneDigitalContact({
                    interactionId: (_a = props.contact) === null || _a === void 0 ? void 0 : _a.interactionId,
                    contactId: (_b = props.contact) === null || _b === void 0 ? void 0 : _b.caseId,
                }));
                handleButtonClick('REJECT', false);
            }, 1000);
        }
    };
    /**
     * Used to get the style for a CcfCard based on contact properties
     * @example getCcfCardStyle()
     */
    const getCcfCardStyle = () => {
        let style = { boxShadow: 'none', margin: '5px' };
        if ((activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.contactId) === props.contact.contactId || (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.caseId) === props.contact.caseId) {
            style = Object.assign(Object.assign({}, style), assignmentCardStyle.selectedCardColor);
        }
        return style;
    };
    return (_jsx(Box, Object.assign({ className: "card", "data-testid": "contact-card", tabIndex: 0, style: {
            display: ((_r = props.contact) === null || _r === void 0 ? void 0 : _r.media) === MediaType.DIGITAL &&
                ((_s = props.contact) === null || _s === void 0 ? void 0 : _s.isContactAccepted) &&
                ((_t = props.contact) === null || _t === void 0 ? void 0 : _t.contactStatus) === 'incoming'
                ? 'none'
                : 'block',
            position: 'relative',
        } }, { children: _jsxs(CcfCard, Object.assign({ id: "ccf-active-call", sx: Object.assign({}, getCcfCardStyle()) }, { children: [!isSmView &&
                    ((_u = props === null || props === void 0 ? void 0 : props.contact) === null || _u === void 0 ? void 0 : _u.callType) === CallType.NATURAL_CALLING &&
                    ((_v = props === null || props === void 0 ? void 0 : props.contact) === null || _v === void 0 ? void 0 : _v.otherInformationNewFormat) && (_jsx(CcfPCDialerFields, { otherInformationNewFormat: (_w = props === null || props === void 0 ? void 0 : props.contact) === null || _w === void 0 ? void 0 : _w.otherInformationNewFormat, isToolTip: false })), !isSmView && (voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.callType) === CallType.NATURAL_CALLING && skillOrQueueId && (_jsx(CcfDialerControls, Object.assign({}, voiceContactDetails, extendedSkillDetailsSelector === null || extendedSkillDetailsSelector === void 0 ? void 0 : extendedSkillDetailsSelector.skillCPAManagementParameters))), ((_x = props.contact) === null || _x === void 0 ? void 0 : _x.isCommitmentReminder) && _jsx(CcfReceiveCommitment, { commitmentInfo: props.contact }), !isSmView && isIncomingVoiceOrDigitalContact && (_jsx(CcfContactAcceptReject, { contact: props.contact, handleAccept: (e) => handleAccept(e), handleReject: (e) => handleReject(e) })), isContactPreview && (_jsxs(Stack, Object.assign({ direction: getPCPreviewDirection(isSmView, isManualDial), justifyContent: 'space-between' }, { children: [isManualDial && (_jsx(CcfPCManualDialField, { phoneNumber: (_y = props.contact) === null || _y === void 0 ? void 0 : _y.contactMode, pcDeliveryType: pcDeliveryType || 0, setCallButtonIsDisabled: setCallButtonIsDisabled })), _jsx(CcfPcAcceptRequeueReschedule, { contact: props.contact, isManualDial: isManualDial, handleAccept: (e) => handleAccept(e), isAcceptDisabled: isCallButtonDisabled, handleRequeue: (e) => handleReject(e), rejectAnimationForDigitalContact: rejectAnimationForDigitalContact })] }))), isOutOfNetworkPcContact && !isSmView && (_jsx(CcfPcDialerControls, { contact: props.contact, handleCallPlaced: handleCallPlaced, handlePcCallEnd: handlePcCallEnd })), ((_z = props.contact) === null || _z === void 0 ? void 0 : _z.media) === MediaType.DIGITAL &&
                    ((_0 = props.contact) === null || _0 === void 0 ? void 0 : _0.contactStatus) !== 'incoming' &&
                    _jsx(CcfDigitalContactActions, { contact: props.contact }), !isSmView &&
                    ((_1 = props.contact) === null || _1 === void 0 ? void 0 : _1.media) === MediaType.VOICE &&
                    (isActiveStatus || isDialing) &&
                    !isOutOfNetworkPcContact &&
                    ((_2 = props.contact) === null || _2 === void 0 ? void 0 : _2.isDocked) &&
                    _jsx(CcfVoiceContact, { contact: props.contact, elevatedFrom: (_3 = props === null || props === void 0 ? void 0 : props.contact) === null || _3 === void 0 ? void 0 : _3.elevatedFrom }), !isSmView &&
                    ((_4 = props.contact) === null || _4 === void 0 ? void 0 : _4.media) === MediaType.VOICEMAIL &&
                    ((_5 = props.contact) === null || _5 === void 0 ? void 0 : _5.contactStatus.toLowerCase()) !== VoiceContactStatus.INCOMING.toLowerCase() &&
                    ccfVoiceMailContactPanel, !isSmView &&
                    props.contact.media === MediaType.WORKITEM &&
                    props.contact.contactStatus.toLowerCase() !== WorkItemContactStatus.INCOMING.toLowerCase() &&
                    ((_6 = props.contact) === null || _6 === void 0 ? void 0 : _6.contactId) === (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.contactId) &&
                    (_jsx(CcfWorkItemContactPanel, { workItemContact: workItemContactDetails, contactId: props.contact.contactId })), !isSmView && props.contact.media === MediaType.VOICE && !((_7 = props === null || props === void 0 ? void 0 : props.contact) === null || _7 === void 0 ? void 0 : _7.isDocked) && isOutOfNetworkPcContact && (_jsx(CcfContactControls, { type: "regular", voiceContact: voiceContactDetails, onlyShowHangup: true, showKeypad: false, elevatedFrom: (_8 = props === null || props === void 0 ? void 0 : props.contact) === null || _8 === void 0 ? void 0 : _8.elevatedFrom }))] })) })));
};
export default CcfAssignmentCard;
//# sourceMappingURL=ccf-assignment-card.js.map