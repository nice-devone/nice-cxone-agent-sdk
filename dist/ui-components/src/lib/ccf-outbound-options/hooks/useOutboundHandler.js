import { jsx as _jsx } from "react/jsx-runtime";
// noinspection ES6PreferShortImport
import { useCallback } from 'react';
import { callConferenceActions, conferenceHold, conferenceNo, dialExternalNumber, holdCall, } from '../../ccf-call-conference/ccf-call-conference.slice';
import { CcfAssignmentAction, voiceContactSelector, voiceMailContactSelector, } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { DigitalContactStatus, VoiceContactStatus, } from '@nice-devone/common-sdk';
import { agentDirectoryActions } from '../../ccf-directory/+state/ccf-directory.slice';
import { getEmptyEditorState } from '../../ccf-editor/ccf-contact-editor.slice';
import { useDispatch, useSelector } from 'react-redux';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import { CcfRegexPatterns } from '@nice-devone/shared-apps-lib';
import { GetNextEventType, LocalStorageHelper, StorageKeys, VoiceMailContactEventStatus } from '@nice-devone/core-sdk';
import { globalActions } from '../../global.app.slice';
import { Navigation } from '../../../enums/navigation-menus';
import { CcfAppToastMessage } from '@nice-devone/ui-controls';
import { OBChannels } from '../ccf-outbound-options';
import { toast } from 'react-toastify';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
import { v4 as uuid } from 'uuid';
import useGetOutboundOptions, { filterByChannelType, filterByChannelId } from './useGetOutboundOptions';
const TOAST_PROPS = {
    autoClose: 2000,
    containerId: 'AgentMessageToastContainer',
};
/**
 * Creates the CXone digital contact used for outbound operations
 * Notes:
 * - If you notice, The CXoneDigitalContact is expecting recipientTo/number on the customerName
 *   and not the real customerName, being recipientTo/number, the destination
 *   ie. emailAddress/phoneNumber.
 *   Meanwhile, I was doing the refactor, I noticed the same so I tried to clarify that a
 *   little and by decision I left both, with the idea of having handy the
 *   real customer name in the future in case it is needed
 * @example
 * ```
 * const digitalContact = createCXoneDigitalContact()
 * ```
 */
export function createCXoneDigitalContact(props) {
    const { 
    // customerName,
    channel: propsChannel, customerId, fromProvider, interactionId: propsInteractionId, receiverTo, digitalSkillId, } = props !== null && props !== void 0 ? props : {};
    const { name: channelName = '', type: channelType = '', channelId } = propsChannel !== null && propsChannel !== void 0 ? propsChannel : {};
    const today = new Date();
    const contactId = Math.round(Math.random() * 20000);
    const interactionId = propsInteractionId !== null && propsInteractionId !== void 0 ? propsInteractionId : uuid();
    const caseId = Math.round(Math.random() * 20000);
    const status = DigitalContactStatus.DRAFT;
    const obDigitalContact = new CXoneDigitalContact();
    obDigitalContact.case = {
        authorEndUserIdentity: null,
        channelId: channelId,
        channelName: channelName,
        contactId: contactId.toString(),
        createdAt: today.toISOString(),
        customFields: [],
        direction: 'outbound',
        endUser: null,
        endUserRecipients: {},
        id: caseId.toString(),
        inboundCount: 0,
        inboxAssignee: 0,
        inboxAssigneeLastAssignedAt: today,
        inboxAssigneeUser: null,
        interactionId: interactionId,
        outboundCount: 0,
        ownerAssigneeUser: null,
        recipients: [],
        routingQueueId: '',
        skillId: 0,
        skillName: '',
        status: status,
        statusUpdatedAt: today,
        threadId: '',
        threadIdOnExternalPlatform: '',
    };
    obDigitalContact.caseId = caseId.toString();
    obDigitalContact.channel = Object.assign(Object.assign(Object.assign({}, obDigitalContact.channel), propsChannel), { idOnExternalPlatform: receiverTo.toString(), realExternalPlatformId: channelType === null || channelType === void 0 ? void 0 : channelType.toLowerCase() });
    obDigitalContact.channelType = channelType;
    obDigitalContact.contactID = contactId.toString();
    obDigitalContact.customerId = customerId;
    obDigitalContact.customerName = receiverTo.toString();
    obDigitalContact.interactionId = interactionId;
    obDigitalContact.isCaseAssigned = true;
    obDigitalContact.skill = channelName;
    obDigitalContact.startTime = today;
    obDigitalContact.status = status;
    obDigitalContact.type = GetNextEventType.DIGITAL_CONTACT_EVENT;
    if (fromProvider)
        obDigitalContact.fromProvider = fromProvider;
    if (digitalSkillId)
        obDigitalContact.digitalSkillId = digitalSkillId;
    return obDigitalContact;
}
/**
 * Stores in Local Storage a CXoneDigital Contact
 * @example
 * ```
 * setObDigitalContactInLocalStorage(CXoneDigitalContact)
 * ```
 */
export function setObDigitalContactInLocalStorage(obDigitalContact) {
    const storageKey = StorageKeys.OUTBOUND_DIGITAL_CONTACTS;
    const currentObContact = LocalStorageHelper.getItem(storageKey, true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obDigitalContactForStorage = Object.assign({}, obDigitalContact);
    // deleting as LS doesn't persist instance created using new keyword
    delete obDigitalContactForStorage['logger'];
    delete obDigitalContactForStorage['digitalContactService'];
    if (currentObContact && currentObContact.length > 0) {
        currentObContact.push(obDigitalContactForStorage);
        LocalStorageHelper.setItem(storageKey, currentObContact);
    }
    else
        LocalStorageHelper.setItem(storageKey, [obDigitalContactForStorage]);
}
/**
 * The idea is to encapsulate in just one place all of the outbound communication
 * - This hook supports Elevations as well
 * Definition:
 * - Elevation: And Outbound with interactionId and/or contactId
 * Returns:
 * - triggerOutboundDigital: Method that can be used to triggerOutboundDigital from any place
 * - triggerOutboundCall: Method that can be used to triggerOutboundCall from any place
 * Ref:
 * - libs/react/ui-components/src/lib/ccf-outbound-options/ccf-outbound-options.tsx:1
 * - libs/react/ui-components/src/lib/ccf-add-channel-options/ccf-add-channel-options.tsx:107
 * @example
 * ```
 * const outboundHandler = useOutboundHandler()
 * ```
 */
export default function useOutboundHandler() {
    const dispatch = useDispatch();
    const { phoneOBSkills, outboundChannels } = useGetOutboundOptions();
    const voiceContact = useSelector(voiceContactSelector);
    const voiceMailContact = useSelector(voiceMailContactSelector);
    const currentConferenceNo = useSelector(conferenceNo);
    const { setSelectedMenu } = globalActions;
    /**
     * Iterate over outbound channels and find the one associated with
     * the provided channelType and channelId
     * @param channelType - OBChannels
     * @param channelId - CXoneDigitalChannel['channelId']
     * @example
     * ```
     *   const channel = lookupChannel(channelType, channelId);
     * ```
     */
    const lookupChannel = useCallback((channelType, channelId) => {
        const channels = outboundChannels === null || outboundChannels === void 0 ? void 0 : outboundChannels.filter(filterByChannelType(channelType));
        return channels === null || channels === void 0 ? void 0 : channels.find(filterByChannelId(channelId));
    }, [outboundChannels]);
    /**
     * Method that can be used to triggerOutboundDigital from any place
     * @example
     * ```
     * triggerOutboundDigital(DigitalOutboundProps)
     * ```
     */
    const triggerOutboundDigital = useCallback((props) => {
        var _a, _b;
        const { channelType, channelId, customerId, customerName, fromProvider, interactionId, receiverTo, digitalSkillId } = props !== null && props !== void 0 ? props : {};
        const channel = lookupChannel(channelType, channelId);
        if (!receiverTo || !channel)
            toast.error(_jsx(CcfAppToastMessage, { type: "warning", messageKey: "noOBSkillAssigned" }), TOAST_PROPS);
        else {
            const channelType = channel === null || channel === void 0 ? void 0 : channel.type;
            const obDigitalContact = createCXoneDigitalContact({
                channel,
                customerId,
                customerName,
                fromProvider,
                interactionId,
                receiverTo,
                digitalSkillId,
            });
            dispatch(setSelectedMenu({ name: Navigation.INTERACTION }));
            dispatch(CcfAssignmentAction.handleCaseAssignedDigitalContactEvent(obDigitalContact));
            dispatch(CcfAssignmentAction.setSelectedInteraction(obDigitalContact.interactionId));
            dispatch(CcfAssignmentAction.setSelectedContactId({
                interactionId: obDigitalContact.interactionId,
                contactId: obDigitalContact.caseId, // this must be the case id
            }));
            dispatch(CcfAssignmentAction.setSelectedContactRoot(obDigitalContact.caseId));
            LocalStorageHelper.setItem(StorageKeys.SELECTED_INTERACTION_ID, obDigitalContact.interactionId);
            if (channelType && [OBChannels.EMAIL, OBChannels.SMS].includes(channelType)) {
                dispatch(CcfAssignmentAction.updateDigitalUserSavedPropertiesOfACase({
                    caseId: obDigitalContact.caseId,
                    fieldsToUpdate: {
                        channelDisplayName: (_a = obDigitalContact === null || obDigitalContact === void 0 ? void 0 : obDigitalContact.skill) !== null && _a !== void 0 ? _a : '',
                        isResponse: false,
                        lexicalEditorState: getEmptyEditorState(),
                        receiverBcc: '',
                        receiverCc: '',
                        receiverTo: receiverTo.toString(),
                        sender: (_b = obDigitalContact === null || obDigitalContact === void 0 ? void 0 : obDigitalContact.skill) !== null && _b !== void 0 ? _b : '',
                        subject: '',
                    },
                }));
                setObDigitalContactInLocalStorage(obDigitalContact);
            }
        }
    }, [dispatch, setSelectedMenu, lookupChannel]);
    /**
     * Method that can be used to triggerOutboundCall from any place
     * @example
     * ```
     * triggerOutboundDigital(PhoneOutboundProps)
     * ```
     */
    const triggerOutboundCall = useCallback((props) => {
        var _a, _b;
        const { contactId: parentContactId, customerId, interactionId, phone, skillId, triggerType = OBChannels.VOICE, } = props !== null && props !== void 0 ? props : {};
        const outboundPhoneSkill = skillId && skillId !== -1 ? { skillId } : (phoneOBSkills === null || phoneOBSkills === void 0 ? void 0 : phoneOBSkills.length) && phoneOBSkills[0];
        if (!phone || !outboundPhoneSkill || !(outboundPhoneSkill === null || outboundPhoneSkill === void 0 ? void 0 : outboundPhoneSkill.skillId))
            toast.error(_jsx(CcfAppToastMessage, { type: "warning", messageKey: "noOBSkillAssigned" }), TOAST_PROPS);
        else {
            const contactDetails = {
                customerId,
                phoneNumber: phone.toString().replace(CcfRegexPatterns.specialCharFormat, ''),
                skillId: parseInt(outboundPhoneSkill === null || outboundPhoneSkill === void 0 ? void 0 : outboundPhoneSkill.skillId.toString()),
                triggerType,
                voiceContact,
            };
            const callStatus = (_a = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            const voiceMailStatus = (_b = voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.status) === null || _b === void 0 ? void 0 : _b.toLowerCase();
            // Elevation - contactId and interactionId are present
            if (parentContactId && interactionId) {
                const cxoneAcdClient = CXoneAcdClient.instance;
                cxoneAcdClient.contactManager.voiceService
                    .dialPhone(Object.assign(Object.assign({}, contactDetails), { parentContactId,
                    interactionId }))
                    .catch(() => {
                    toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: "dialCallError" }), TOAST_PROPS);
                });
            }
            // New outbound
            else if (callStatus === VoiceContactStatus.ACTIVE) {
                dispatch(callConferenceActions.dialExternalContact(Object.assign(Object.assign({}, contactDetails), { isExternalNumberDialed: true })));
                dispatch(holdCall({ voiceContact }));
            }
            else if (callStatus === VoiceContactStatus.JOINED && currentConferenceNo) {
                dispatch(callConferenceActions.dialExternalContact(Object.assign(Object.assign({}, contactDetails), { isExternalNumberDialed: true })));
                dispatch(conferenceHold(currentConferenceNo));
            }
            else if (voiceMailStatus === VoiceMailContactEventStatus.ACTIVE.toLowerCase()) {
                voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.pause().then(() => {
                    dispatch(dialExternalNumber(Object.assign({}, contactDetails)));
                });
            }
            else if (!callStatus ||
                callStatus === VoiceContactStatus.HOLDING ||
                callStatus === VoiceContactStatus.JOINED) {
                dispatch(dialExternalNumber(Object.assign({}, contactDetails)));
            }
            dispatch(setSelectedMenu({ name: Navigation.INTERACTION }));
            dispatch(globalActions.setOutboundBtnCliked(false));
        }
        dispatch(agentDirectoryActions.updateSkillSelectorToggle({
            triggerState: false,
            triggerType,
        }));
    }, [currentConferenceNo, dispatch, phoneOBSkills, setSelectedMenu, voiceContact, voiceMailContact]);
    return {
        triggerOutboundCall,
        triggerOutboundDigital,
    };
}
//# sourceMappingURL=useOutboundHandler.js.map