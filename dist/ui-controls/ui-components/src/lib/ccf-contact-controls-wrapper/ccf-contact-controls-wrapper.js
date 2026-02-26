import { __awaiter } from "tslib";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MediaType, VoiceContactStatus, WorkItemContactStatus } from '@nice-devone/common-sdk';
import { getRingingContacts, voiceMailContactDetailsSelector, voiceMailContactsSelector, workItemContactsSelector, workItemContactDetailsSelector, getActiveContactInSelectedInteraction, getNewContacts, getIncomingContacts, getAssignmentPanelMetadata, voiceContactSelector, selectUserInCall, selectUserInConsult, CcfAssignmentAction, nonIncomingVoiceContactCards, voiceContactCardSelector, getSetContactHistoryInIndexDbFlag, agentLegAutoAcceptEnabled, getSelectedContactRoot, } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfVoiceContact from '../ccf-voice-contact/ccf-voice-contact';
import CcfAssignmentCard from '../ccf-assignment-panel/ccf-assignment-card/ccf-assignment-card';
import { agentSelectedVoicePreference } from '../ccf-acd-session/ccf-acd-session.slice';
import { CallContactEventStatus, VoiceMailContactEventStatus } from '@nice-devone/core-sdk';
import { getScheduledCommitment } from '../ccf-commitment/ccf-commitment.slice';
import { ACDVoiceShowControlsStatus } from '../../enums/call-contact-active-status';
import CcfAcceptRejectWrapper from './ccf-accept-reject-wrapper/ccf-accept-reject-wrapper';
import { CcfWorkItemContactPanel } from '../ccf-work-item-contact/ccf-work-item-contact-panel';
import { storeContactHistoryIndexDB } from '../ccf-app-space/ccf-agent-contact-history/ccf-agent-contact-history.slice';
import { getDispositionData } from '../ccf-disposition/ccf-disposition-slice';
import { CallType } from '@nice-devone/agent-sdk';
/**
 * Wrapper component for voice contact
 * @example `<CcfContactControlsWrapper />`
 */
export function CcfContactControlsWrapper() {
    var _a, _b;
    const dispatch = useDispatch();
    const newContacts = useSelector(getNewContacts);
    const consultContact = useSelector(getRingingContacts);
    const incomingContacts = useSelector(getIncomingContacts);
    const newAndConsultContact = newContacts.concat(consultContact);
    const incomingAndNewContacts = incomingContacts.concat(newAndConsultContact);
    const agentSelectedVoicePref = useSelector(agentSelectedVoicePreference);
    const firstVoiceContact = useSelector(voiceContactCardSelector)[0];
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    // if active selected contact is a natural call, show that contact to avoid showing other inactive contacts when using a high ratio dialer
    const voiceContact = (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.callType) === CallType.NATURAL_CALLING ? activeContactInSelectedInteraction : firstVoiceContact;
    const voicemailContact = useSelector(voiceMailContactsSelector)[0];
    const selectedContactId = useSelector(getSelectedContactRoot);
    const scheduledContact = useSelector(getScheduledCommitment);
    const voicemailContactDetails = useSelector(voiceMailContactDetailsSelector);
    const workItemContactDetails = useSelector(workItemContactDetailsSelector);
    const workItemContact = (_a = useSelector(workItemContactsSelector)) === null || _a === void 0 ? void 0 : _a.find(contact => {
        return contact.contactId === selectedContactId;
    });
    const assignmentPanelMetadata = useSelector(getAssignmentPanelMetadata);
    const voiceContactDetails = useSelector(voiceContactSelector);
    const usersInCall = useSelector(selectUserInCall);
    const userInConsult = useSelector(selectUserInConsult);
    const isActiveStatus = Object.values(ACDVoiceShowControlsStatus).includes(voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.contactStatus);
    const [ccfVoiceMailContactPanel, setCcfVoiceMailContactPanel] = useState(null);
    const [_ccfWorkItemContactPanel, setCcfWorkItemContactPanel] = useState(null);
    const isRinging = (voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.contactStatus) === 'dialing' || (voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.contactStatus) === 'naturalcallringing';
    const isPCStatus = voiceContact
        ? Object.values(CallContactEventStatus)
            .filter((value) => value.includes('Natural'))
            .map((value) => value.toLowerCase())
            .includes(voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.contactStatus)
        : false;
    const nonIncomingAcdContacts = useSelector(nonIncomingVoiceContactCards);
    const setContactHistoryInIndexDb = useSelector(getSetContactHistoryInIndexDbFlag);
    const renderVoiceMailContact = voicemailContact &&
        voicemailContact.contactStatus.toLowerCase() !== VoiceMailContactEventStatus.INCOMING.toLowerCase() &&
        (voicemailContact === null || voicemailContact === void 0 ? void 0 : voicemailContact.contactId) === (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.contactId);
    const renderWorkItemContact = workItemContactDetails &&
        ((_b = workItemContactDetails === null || workItemContactDetails === void 0 ? void 0 : workItemContactDetails.status) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== WorkItemContactStatus.INCOMING.toLowerCase() &&
        (workItemContactDetails === null || workItemContactDetails === void 0 ? void 0 : workItemContactDetails.contactID) === selectedContactId;
    const dispositionData = useSelector(getDispositionData);
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
    useEffect(() => {
        dispatch(CcfAssignmentAction.setContactHistoryInIndexDbFlag(true));
    }, [voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.contactID, voicemailContactDetails === null || voicemailContactDetails === void 0 ? void 0 : voicemailContactDetails.contactID, workItemContactDetails === null || workItemContactDetails === void 0 ? void 0 : workItemContactDetails.contactID]);
    const isAgentLegAutoAcceptEnabled = useSelector(agentLegAutoAcceptEnabled);
    useEffect(() => {
        if (isActiveStatus && voiceContact) {
            const badNumber = (voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.disconnectCode) === 'BadNumber';
            const numberOfVoiceCalls = assignmentPanelMetadata.voiceInteractionId
                ? Object.keys(nonIncomingAcdContacts).length
                : null;
            const hasRegularCallHungUp = numberOfVoiceCalls === 1 && (voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.finalState);
            if (hasRegularCallHungUp) {
                if (badNumber) {
                    dispatch(CcfAssignmentAction.setCtdDisplayError(true));
                    setTimeout(() => {
                        dispatch(CcfAssignmentAction.setCtdDisplayError(false));
                    }, 3000);
                }
                if (setContactHistoryInIndexDb) {
                    const dispositionData = getDispositionDataForContact(voiceContactDetails.contactID);
                    dispatch(storeContactHistoryIndexDB({ acdContactDetails: voiceContactDetails, mediaType: MediaType.VOICE, dispositionData }));
                }
                dispatch(CcfAssignmentAction.setContactHistoryInIndexDbFlag(true));
                dispatch(CcfAssignmentAction.removeCXoneVoiceContact(voiceContactDetails));
            }
            else if ((voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.finalState) &&
                assignmentPanelMetadata.voiceInteractionId &&
                numberOfVoiceCalls &&
                (usersInCall || userInConsult)) {
                // eslint-disable-next-line array-callback-return
                Object.values(nonIncomingAcdContacts).map((val) => {
                    if (val.contactStatus === 'disconnected') {
                        dispatch(CcfAssignmentAction.removeCXoneVoiceContact(voiceContactDetails));
                        if (userInConsult && (userInConsult === null || userInConsult === void 0 ? void 0 : userInConsult.contact.status) !== 'Disconnected') {
                            dispatch(CcfAssignmentAction.handleCXoneVoiceContactSubscription(userInConsult === null || userInConsult === void 0 ? void 0 : userInConsult.contact));
                        }
                        if (badNumber) {
                            dispatch(CcfAssignmentAction.setCtdDisplayError(true));
                            setTimeout(() => {
                                dispatch(CcfAssignmentAction.setCtdDisplayError(false));
                            }, 3000);
                        }
                    }
                });
            }
        }
    }, [nonIncomingAcdContacts]);
    useEffect(() => {
        if ((voicemailContact === null || voicemailContact === void 0 ? void 0 : voicemailContact.contactStatus) === VoiceMailContactEventStatus.DISCARDED.toLowerCase() &&
            (voicemailContactDetails === null || voicemailContactDetails === void 0 ? void 0 : voicemailContactDetails.finalState)) {
            if (setContactHistoryInIndexDb) {
                const dispositionData = getDispositionDataForContact(voicemailContactDetails.contactID);
                dispatch(storeContactHistoryIndexDB({ acdContactDetails: voicemailContactDetails, mediaType: MediaType.VOICEMAIL, dispositionData }));
            }
            dispatch(CcfAssignmentAction.removeCXoneVoiceMailContact(voicemailContactDetails));
            dispatch(CcfAssignmentAction.setContactHistoryInIndexDbFlag(true));
        }
    }, [voicemailContact]);
    useEffect(() => {
        if ((workItemContact === null || workItemContact === void 0 ? void 0 : workItemContact.contactStatus) === WorkItemContactStatus.DISCONNECTED.toLowerCase() &&
            (workItemContactDetails === null || workItemContactDetails === void 0 ? void 0 : workItemContactDetails.finalState)) {
            if (setContactHistoryInIndexDb) {
                const dispositionData = getDispositionDataForContact(workItemContactDetails.contactID);
                dispatch(storeContactHistoryIndexDB({ acdContactDetails: workItemContactDetails, mediaType: MediaType.WORKITEM, dispositionData }));
            }
            dispatch(CcfAssignmentAction.removeCXoneWorkItemContact(workItemContactDetails));
            dispatch(CcfAssignmentAction.setContactHistoryInIndexDbFlag(true));
        }
        else if (renderWorkItemContact && (workItemContact === null || workItemContact === void 0 ? void 0 : workItemContact.contactStatus) === WorkItemContactStatus.ACTIVE.toLowerCase()) {
            /**
               * Function to render workItem contact panel
               * @returns workItem contact panel
               * ```
               * @example
               * renderCcfWorkItemContactPanel()
               * ```
               *
               **/
            const renderCcfWorkItemContactPanel = () => __awaiter(this, void 0, void 0, function* () {
                setCcfWorkItemContactPanel(null);
                const workItemContactPanel = yield import('../ccf-work-item-contact/ccf-work-item-contact-panel');
                const WorkItemContactPanel = workItemContactPanel.CcfWorkItemContactPanel;
                setCcfWorkItemContactPanel(_jsx(WorkItemContactPanel, { workItemContact: workItemContactDetails, contactId: workItemContactDetails.contactID }));
            });
            renderCcfWorkItemContactPanel();
        }
    }, [workItemContact]);
    useEffect(() => {
        if (renderVoiceMailContact) {
            /**
               * Function to render voice mail contact panel
               * @returns voice mail contact panel
               * ```
               * @example
               * renderCcfVoiceMailContactPanel()
               * ```
               *
               **/
            const renderCcfVoiceMailContactPanel = () => __awaiter(this, void 0, void 0, function* () {
                setCcfVoiceMailContactPanel(null);
                const voiceContactPanel = yield import('../ccf-voicemail-contact/ccf-voicemail-contact-panel');
                const VoiceContactPanel = voiceContactPanel.CcfVoiceMailContactPanel;
                setCcfVoiceMailContactPanel(_jsx(VoiceContactPanel, { voiceMailContact: voicemailContactDetails }));
            });
            renderCcfVoiceMailContactPanel();
        }
    }, [renderVoiceMailContact, voicemailContactDetails]);
    return (_jsxs(_Fragment, { children: [incomingAndNewContacts.map((card) => {
                const isSoftphone = agentSelectedVoicePref === 'WebRTC';
                const isVoiceOrVoiceMail = card.media === MediaType.VOICE || card.media === MediaType.VOICEMAIL;
                // Show accept reject when requiremanualaccept is true in GNE
                const requireManualAccept = (voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.isRequireManualAccept) &&
                    ((card === null || card === void 0 ? void 0 : card.contactStatus) === VoiceContactStatus.INCOMING ||
                        (card === null || card === void 0 ? void 0 : card.contactStatus) === VoiceContactStatus.CALL_BACK_DISCONNECTED);
                const previewDialer = (card === null || card === void 0 ? void 0 : card.contactStatus) === VoiceContactStatus.PREVIEW && (card === null || card === void 0 ? void 0 : card.callType) === CallType.NATURAL_CALLING;
                const showAcceptRejectWrapper = ((isVoiceOrVoiceMail && isSoftphone && !isAgentLegAutoAcceptEnabled)
                    || requireManualAccept || (card === null || card === void 0 ? void 0 : card.callType) === CallType.CONSULT || previewDialer
                    || (card.media === MediaType.DIGITAL || card.media === MediaType.WORKITEM));
                if (showAcceptRejectWrapper) {
                    return _jsx(CcfAcceptRejectWrapper, { contact: card }, card.contactId);
                }
                else {
                    return null;
                }
            }), renderVoiceMailContact ? (ccfVoiceMailContactPanel) : ((isActiveStatus || isPCStatus || isRinging) && _jsx(CcfVoiceContact, { contact: voiceContact, elevatedFrom: voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.elevatedFrom })), scheduledContact && _jsx(CcfAssignmentCard, { contact: scheduledContact }), renderWorkItemContact && _jsx(CcfWorkItemContactPanel, { workItemContact: workItemContactDetails, contactId: workItemContactDetails.contactID })] }));
}
export default CcfContactControlsWrapper;
//# sourceMappingURL=ccf-contact-controls-wrapper.js.map