import { __awaiter } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useState, useEffect } from 'react';
import { DigitalContactStatus, DigitalChannelType, MediaType } from '@nice-devone/common-sdk';
import CcfContactContent from '../ccf-contact-content/ccf-contact-content';
import CcfDigitalOutboundContact from '../ccf-digital-outbound-contact/ccf-digital-outbound-contact';
import CcfDigitalWaOBContact from '../ccf-digital-wa-ob-contact/ccf-digital-wa-ob-contact';
import { getDigitalContactDetailsByCaseId, getNonIncomingActiveContactInSelectedInteraction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { useSelector } from 'react-redux';
import { CcfVoiceTranscriptionTabContent } from '../../ccf-voice-transcription/ccf-voice-transcription-tab-content';
import { useIsVoiceTranscriptEnabled } from '../../../hooks/useVoiceTranscriptEnabled';
/**
 * Component to displays digital contact tab
 * @returns digital contact tab
 * @example
 * ```
 * <CcfDigitalContactTabs />
 * ```
 */
export function CcfDigitalContactTabs(props) {
    var _a;
    const { contactId, caseId, interactionId, closeTab } = props;
    const [ccfWorkItemContent, setCcfWorkItemContent] = useState(null);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(caseId, interactionId));
    const isOBDigitalContact = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.isOutbound) && ((_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _a === void 0 ? void 0 : _a.status) === DigitalContactStatus.DRAFT ? true : false;
    const isOBSms = isOBDigitalContact && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.channelName) === 'Sms';
    const isWorkItem = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.WORKITEM;
    const isOBWhatsapp = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.channelName) === DigitalChannelType.WHATSAPP
        && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus) === DigitalContactStatus.DRAFT;
    //Show transcription component when voice and permissions are enabled
    const isVoiceTranscriptEnabled = useIsVoiceTranscriptEnabled();
    const isActiveVoiceAndTranscriptionToggleOn = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.VOICE && isVoiceTranscriptEnabled;
    useEffect(() => {
        if (isWorkItem) {
            /**
             * Function to render work item contact
             * @returns work item contact
             * ```
             * @example
             * renderWorkItemContent()
             * ```
             *
             **/
            const renderWorkItemContent = () => __awaiter(this, void 0, void 0, function* () {
                setCcfWorkItemContent(null);
                const workItemContent = yield import('../ccf-workitem-content/ccf-workitem-content');
                const WorkItemContent = workItemContent.CcfWorkitemContent;
                setCcfWorkItemContent(_jsx(WorkItemContent, {}));
            });
            renderWorkItemContent();
        }
    }, [isWorkItem]);
    let digitalContactComponent;
    if (isOBWhatsapp) {
        digitalContactComponent = (_jsx(CcfDigitalWaOBContact, { id: props.id, status: selectedDigitalContactDetails.status, customerName: nonIncomingActiveContactInSelectedInteraction.customerName || '', caseId: caseId, interactionId: interactionId, contactId: contactId, closeTab: closeTab, isDraftOBDigitalContact: isOBDigitalContact }));
    }
    else if (isActiveVoiceAndTranscriptionToggleOn && contactId) {
        digitalContactComponent = _jsx(CcfVoiceTranscriptionTabContent, { contactId: contactId });
    }
    else if (isWorkItem) {
        digitalContactComponent = (ccfWorkItemContent);
    }
    else {
        digitalContactComponent = isOBSms ? _jsx(CcfDigitalOutboundContact, Object.assign({}, props)) : _jsx(CcfContactContent, Object.assign({}, props));
    }
    return (digitalContactComponent);
}
export default memo(CcfDigitalContactTabs);
//# sourceMappingURL=ccf-digital-contact-tabs.js.map