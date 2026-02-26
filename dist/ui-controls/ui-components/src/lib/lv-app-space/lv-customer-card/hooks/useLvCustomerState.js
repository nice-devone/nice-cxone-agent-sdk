// noinspection ES6PreferShortImport
import { useEffect, useCallback, useState } from 'react';
import { getActiveContactInSelectedInteraction, getDigitalContactDetailsByCaseId, getDigitalContactMessagesByCaseId, getSelectedInteractionInfo, voiceContactSelector, } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { shallowEqual, useSelector } from 'react-redux';
import { DigitalChannelType, DigitalContactStatus, MediaType, } from '@nice-devone/common-sdk';
import { OBChannels } from '../../../ccf-outbound-options/ccf-outbound-options';
import { selectLvCurrentInteraction } from '../../lv-app-space.slice';
import { Logger } from '@nice-devone/core-sdk';
import { LOGGER_MODULE } from '../../lv-app-space-utility';
const logger = new Logger(LOGGER_MODULE, 'useLvCustomerState');
/**
 * Performs a shallow equality check between two interaction objects,
 * ignoring the `acdContacts` and `digitalContacts` properties.
 * @param objA - The first interaction object to compare.
 * @param objB - The second interaction object to compare.
 * @returns `true` if the objects are shallowly equal (excluding the ignored keys), otherwise `false`.
 * @example
 * ```
 * const a = { id: 1, name: 'foo', acdContacts: [] };
 * const b = { id: 1, name: 'foo', acdContacts: [{}] };
 * const isEqual = shallowEqualSelectedInteraction(a, b); // true
 * ```
 */
export function shallowEqualSelectedInteraction(objA, objB) {
    if (objA === objB)
        return true;
    if (!objA || !objB)
        return false;
    const keysA = Object.keys(objA).filter(k => k !== 'acdContacts' && k !== 'digitalContacts');
    const keysB = Object.keys(objB).filter(k => k !== 'acdContacts' && k !== 'digitalContacts');
    if (keysA.length !== keysB.length)
        return false;
    for (const key of keysA) {
        if (objA[key] !== objB[key])
            return false;
    }
    return true;
}
/**
 * Performs a shallow equality check between two digital contact objects,
 * ignoring the `nextCaseId` and `previousCaseId` properties.
 * @param objA - The first digital contact object to compare.
 * @param objB - The second digital contact object to compare.
 * @returns `true` if the objects are shallowly equal (excluding the ignored keys), otherwise `false`.
 * @example
 * ```
 * const a = { id: 1, name: 'foo', nextCaseId: 'x' };
 * const b = { id: 1, name: 'foo', nextCaseId: 'y' };
 * const isEqual = shallowEqualDigitalContact(a, b); // true
 * ```
 */
export function shallowEqualDigitalContact(objA, objB) {
    if (objA === objB)
        return true;
    if (!objA || !objB)
        return false;
    const keysToOmit = [
        'digitalContactService',
        'hasUnreadMessage',
        'logger',
        'nextCaseId',
        'previousCaseId'
    ];
    const objectKeys = [
        'case',
        'channel',
        'contactCustomFieldDefs',
        'customerMessageUpdatedAt',
        'eventDetails',
        'inboxAssignee',
        'messageDrafts',
        'messages',
        'publicMessagesTree',
        'replyChannels',
        'routingQueue',
        'userRolePermissions'
    ];
    const keysA = Object.keys(objA).filter(k => !keysToOmit.includes(k));
    const keysB = Object.keys(objB).filter(k => !keysToOmit.includes(k));
    if (keysA.length !== keysB.length)
        return false;
    for (const key of keysA) {
        // we can get the same object by value but different by reference in that case compare the JSON.stringify 
        if (objectKeys.includes(key)) {
            const stringObjA = JSON.stringify(objA[key]);
            const stringObjB = JSON.stringify(objB[key]);
            if (stringObjA !== stringObjB)
                return false;
        }
        else if (objA[key] !== objB[key])
            return false;
    }
    return true;
}
/**
 * Returns the last created message in the interaction.
 * @example
 * ```
 * const lastCreatedMessage = getLastCreatedMessage(messages)
 * ```
 */
export function getLastCreatedMessage(messages) {
    // Sort the data by the 'createdAt' date in descending order
    const sortedData = messages ?
        [...messages].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) :
        [];
    // Return the first item in the sorted array, which is the last created item
    return sortedData === null || sortedData === void 0 ? void 0 : sortedData[0];
}
/**
 * This hook will be in charge of syncing all possible CXone sources that contain customer info
 * into LVCustomer app space.
 * Def:
 *  1) ContactId - Contact Id is a id for voice contact.
 *  2) InteractionId - means our thread id
 *  3) CaseId - Case Id is a id for chat, sms, email. We call it as contactId in some places.
 *  4) CustomerId - means LV contact number
 * @example
 * ```
 * const [customerId, setCustomerId] = useLvCustomerState()
 * ```
 */
export default function useLvCustomerState() {
    const [searchCriteria, setSearchCriteria] = useState();
    const [customerId, setCustomerId] = useState();
    const [interactionData, setInteractionData] = useState();
    // Digital Interaction
    // is to select the active channel contact(voice,email,sms,chat)
    // from the list of channels added into the interactions
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const selectedContact = activeContactInSelectedInteraction && activeContactInSelectedInteraction.media === MediaType.DIGITAL
        ? activeContactInSelectedInteraction
        : undefined;
    const selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.caseId, selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.interactionId), shallowEqualDigitalContact);
    // At the end of 26.1, selectedDigitalContactDetails was not triggering re-rendering when adding messages
    // So we need to select the messages separately to ensure that we have the latest messages
    const selectedDigitalContactMessages = useSelector(getDigitalContactMessagesByCaseId(selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.caseId, selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.interactionId), shallowEqual);
    // Voice Interaction
    const voiceContactDetails = useSelector(voiceContactSelector);
    // Complete interaction data
    const selectedInteraction = useSelector(getSelectedInteractionInfo, shallowEqualSelectedInteraction);
    // LV Selected Interaction
    const lvCurrentInteraction = useSelector(selectLvCurrentInteraction);
    /**
     * Given an interactionId and a caseId, it will look for the digital contact.
     * Scenarios:
     * 1) If the digitalContact has a customer id, it will set it to the LVAppSpaceSlice
     * 2) If the digitalContact does not have a customer it, it will look for the recipientTo
     *    which can be an email or a phone number, depending on the channel type and then
     *    it will set it to the LVAppSpaceSlice so then the customer card can search by that
     *    recipientTo
     * @example
     * ```
     * searchCustomerIdInDigitalContact('123', '123')
     * ```
     */
    const searchCustomerIdInDigitalContact = useCallback((interactionId) => {
        var _a, _b;
        // customerId is getting assigned when creating the CXoneDigitalContact
        // libs/react/ui-components/src/lib/lv-app-space/lv-omnichannel/lv-omnichannel-digital-contact.ts:58
        const { case: digitalCase, channelType, customerName, status, customerId, messages, contactID, startTime, } = selectedDigitalContactDetails !== null && selectedDigitalContactDetails !== void 0 ? selectedDigitalContactDetails : {};
        // In LV, we are using the message id as the lv interaction id
        // Note, take into account that in LV, each message is one interaction
        const socialMediaChannels = Object.values(DigitalChannelType)
            .filter((channel) => ![DigitalChannelType.EMAIL, DigitalChannelType.SMS].includes(channel))
            .map((channel) => channel.toLowerCase());
        const { endUser } = digitalCase !== null && digitalCase !== void 0 ? digitalCase : {};
        const { identities } = endUser !== null && endUser !== void 0 ? endUser : {};
        const recipientTo = status === DigitalContactStatus.DRAFT ? customerName : (_a = identities === null || identities === void 0 ? void 0 : identities[0]) === null || _a === void 0 ? void 0 : _a.idOnExternalPlatform;
        // Voice call - interactionId(Cause problem with conference/consult)
        // SMS - message id
        // Email -  message id
        // webchat/WhatsApp/social mead - contactId
        if (customerId) {
            setCustomerId(customerId);
            setSearchCriteria(undefined);
        }
        else if (channelType && socialMediaChannels.includes(channelType.toLowerCase())) {
            if (customerName) {
                const searchCriteria = {
                    externalInteractionId: contactID,
                    interactionStartDate: startTime === null || startTime === void 0 ? void 0 : startTime.toString(),
                };
                if (channelType.toLowerCase() === DigitalChannelType.WHATSAPP.toLowerCase() && recipientTo) {
                    searchCriteria.phone = recipientTo;
                }
                else {
                    searchCriteria.name = customerName;
                }
                setCustomerId(undefined);
                setSearchCriteria(searchCriteria);
            }
            else {
                setCustomerId(undefined);
                setSearchCriteria(undefined);
            }
        }
        else if (channelType && [OBChannels.SMS, OBChannels.EMAIL].includes(channelType)) {
            const { id: lastMessageId, createdAt: lastMessageStartDate } = (_b = getLastCreatedMessage(messages)) !== null && _b !== void 0 ? _b : {};
            const searchCriteria = {
                [channelType === OBChannels.EMAIL ? 'emailAddress' : 'phone']: recipientTo,
                externalInteractionId: lastMessageId,
                interactionStartDate: lastMessageStartDate,
            };
            setCustomerId(undefined);
            setSearchCriteria(searchCriteria);
        }
        else if (channelType && [OBChannels.VOICE, OBChannels.TRANSFER].includes(channelType)) {
            const searchCriteria = {
                externalInteractionId: interactionId,
                interactionStartDate: startTime === null || startTime === void 0 ? void 0 : startTime.toString(),
                phone: recipientTo,
            };
            setCustomerId(undefined);
            setSearchCriteria(searchCriteria);
        }
    }, [selectedDigitalContactDetails, setCustomerId, setSearchCriteria]);
    /**
     * Given an interactionId, it will look for the voice contact.
     * Scenarios:
     * Note: Can't run coverage cause LvCustomer component is mounted tru MF
     * 1) If the digitalContact has a customer id, it will set it to the LVAppSpaceSlice
     * 2) If the digitalContact does not have a customer it, it will look for the phoneNumber and then
     *    it will set it to the LVAppSpaceSlice so then the customer card can search by that phoneNumber
     * @example
     * ```
     * searchCustomerIdInVoiceInteraction('123', '2025-10-10', 'Andres'', '44495934034'})
     * ```
     */
    const searchCustomerIdInVoiceInteraction = useCallback((interactionId, startDate, customerName, contactMode) => {
        if (!isNaN(Number(contactMode)) || !isNaN(Number(customerName))) {
            const searchCriteria = {
                externalInteractionId: interactionId,
                interactionStartDate: startDate,
                phone: !isNaN(Number(contactMode)) ? contactMode : customerName,
            };
            setCustomerId(undefined);
            setSearchCriteria(searchCriteria);
        }
    }, [setCustomerId, setSearchCriteria]);
    /**
     * Given an interactionId and a caseId, it will look for the digital contact.
     * Scenarios:
     * 1) If the digitalContact has a customer id, it will set it to the LVAppSpaceSlice
     * 2) If the digitalContact does not have a customer it, it will look for the recipientTo
     *    which can be an email or a phone number, depending on the channel type and then
     *    it will set it to the LVAppSpaceSlice so then the customer card can search by that
     *    recipientTo
     * @example
     * ```
     * searchCustomerIdInDigitalContact('123', '123')
     * ```
     */
    const searchCustomerIdInSearchInteraction = useCallback((interaction) => {
        var _a;
        const { channelType, endUser, createdAt, interactionId } = interaction !== null && interaction !== void 0 ? interaction : {};
        // In LV, we are using the message id as the lv interaction id
        // Note, take into account that in LV, each message is one interaction
        // At this point, we are not able to search by externalInteractionId as CXoneDigitalContactSearchData
        // do not contain the interaction messages
        // const { id: externalInteractionId, createdAt: interactionStartDate } = getLastCreatedMessage(messages) ?? {};
        // but we are able to search by externalThreadId
        if (channelType &&
            [OBChannels.SMS, OBChannels.EMAIL, OBChannels.SMS, OBChannels.WHATSAPP, OBChannels.VOICE].includes(channelType)) {
            const { identities } = endUser !== null && endUser !== void 0 ? endUser : {};
            const recipientTo = (_a = identities === null || identities === void 0 ? void 0 : identities[0]) === null || _a === void 0 ? void 0 : _a.idOnExternalPlatform;
            const searchCriteria = {
                [channelType === OBChannels.EMAIL ? 'emailAddress' : 'phone']: recipientTo,
            };
            if (interactionId) {
                searchCriteria.externalThreadId = interactionId;
                searchCriteria.interactionStartDate = createdAt;
            }
            setCustomerId(undefined);
            setSearchCriteria(searchCriteria);
        }
    }, [setCustomerId, setSearchCriteria]);
    /**
     * Load the customerId from activeContactInSelectedInteraction
     * Taken from:
     * - libs/react/ui-components/src/lib/ccf-app-space/ccf-customer-card/ccf-customer-card.tsx:215
     * - libs/react/ui-components/src/lib/ccf-app-space/ccf-customer-card/ccf-customer-card.tsx:324
     */
    useEffect(() => {
        const { contactMode, contactReceivedTime, customerId, customerName, interactionId, media } = activeContactInSelectedInteraction !== null && activeContactInSelectedInteraction !== void 0 ? activeContactInSelectedInteraction : {};
        logger.info('activeContactInSelectedInteraction', 'Active interaction changed, looking for customerId');
        if (customerId) {
            setCustomerId(customerId);
            setSearchCriteria(undefined);
        }
        else if (media === MediaType.DIGITAL && interactionId) {
            searchCustomerIdInDigitalContact(interactionId);
        }
        else if ((media === MediaType.VOICE || media === MediaType.VOICEMAIL) && interactionId) {
            searchCustomerIdInVoiceInteraction(interactionId, contactReceivedTime, customerName, contactMode);
        }
        else if (!activeContactInSelectedInteraction) {
            setCustomerId(undefined);
            setSearchCriteria(undefined);
        }
    }, [
        activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.interactionId,
        searchCustomerIdInDigitalContact,
        searchCustomerIdInVoiceInteraction
    ]);
    /**
     * Load the customerId from lvCurrentInteraction
     * Notes:
     *  - lvCurrentInteraction comes from the selected ccf-search-interaction row
     *  - DO NOT CLEAN customerId or searchCriteria from here
     */
    useEffect(() => {
        if (lvCurrentInteraction)
            searchCustomerIdInSearchInteraction(lvCurrentInteraction);
    }, [lvCurrentInteraction]);
    /**
     * Fix for CXDSK-62
     * Making Synchronous the interactionData with the customerId and searchCriteria
     * This is needed to ensure that the customerId and the interactionData are always in sync.
     * Is important that this useEffect is after the previous useEffects
     */
    useEffect(() => {
        var _a;
        if (selectedDigitalContactDetails && ((_a = Object.keys(selectedDigitalContactDetails)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            setInteractionData((prevState) => (Object.assign(Object.assign({}, prevState), { digitalContact: selectedDigitalContactDetails })));
        }
    }, [selectedDigitalContactDetails, selectedDigitalContactMessages]);
    /**
     * Syncs the `selectedInteraction` from the Redux store into the local `interactionData` state.
     * Updates the `interaction` property of `interactionData` whenever `selectedInteraction` changes.
     */
    useEffect(() => {
        var _a;
        if (selectedInteraction && ((_a = Object.keys(selectedInteraction)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            setInteractionData((prevState) => (Object.assign(Object.assign({}, prevState), { interaction: selectedInteraction })));
        }
    }, [selectedInteraction]);
    /**
     * Syncs the `voiceContactDetails` from the Redux store into the local `interactionData` state.
     * Updates the `voiceContact` property of `interactionData` whenever `voiceContactDetails` changes.
     */
    useEffect(() => {
        var _a;
        if (voiceContactDetails && ((_a = Object.keys(voiceContactDetails)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            setInteractionData((prevState) => (Object.assign(Object.assign({}, prevState), { voiceContact: voiceContactDetails })));
        }
    }, [voiceContactDetails]);
    return Object.assign({ customerId,
        searchCriteria,
        setCustomerId,
        setSearchCriteria }, interactionData);
}
//# sourceMappingURL=useLvCustomerState.js.map