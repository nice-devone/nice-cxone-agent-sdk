import { DigitalChannelType, DigitalContactDirection, ECC_ACTION_TYPE, LV_INTERACTION_SUB_TYPES, LV_INTERACTION_TYPES, UIStorageKeys, } from '@nice-devone/common-sdk';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { ContactType } from '@nice-devone/agent-sdk';
import { updateEmailContentDigitalSource } from '../../../util/common';
/**
 * Retrieves the tenant ID from local storage.
 *
 * @example
 * ```
 * const tenantId = getTenantId();
 * ```
 */
function getTenantId() {
    return LocalStorageHelper.getItem(StorageKeys.USER_INFO, true)['tenantId'];
}
/**
 * Calculates the duration in seconds from the given start time.
 * @param startTime - The start time in ISO string format.
 * @param endDate - The end date as a Date object.
 * @example
 * ```
 * const duration = calculateDuration('2023-10-01T12:00:00Z');
 * ```
 */
function calculateDuration(startTime, endDate) {
    const startDate = new Date(startTime);
    const durationMs = endDate.getTime() - startDate.getTime();
    const totalSeconds = Math.floor(durationMs / 1000);
    return totalSeconds;
}
/**
 * Returns the interaction type and interaction subtype based on the contact details and channel name.
 *
 * @param detailsObject - The contact details object, which can be a CXoneVoiceContact or CXoneDigitalContact.
 * @param channelName - (Optional) The digital channel type (e.g., 'Ig', 'Tw', 'Email', 'Chat', 'Sms').
 * @param message - (Optional) most recent message for digital case
 * @returns An object containing the interactionType and interactionSubtype, or null if not applicable.
 * @example
 * ```
 * const result = getInteractionTypes(detailsObject, DigitalChannelType.EMAIL, message);
 * ```
 */
export function getInteractionTypes(detailsObject, channelName, message) {
    var _a;
    let interactionType = null;
    let interactionSubtype = null;
    const acdContactDetailsObject = detailsObject;
    switch (detailsObject === null || detailsObject === void 0 ? void 0 : detailsObject.type) {
        case ContactType.VOICE_CONTACT:
        case ContactType.VOICEMAIL_CONTACT:
            interactionType = !acdContactDetailsObject.isInbound ? LV_INTERACTION_TYPES.EXTERNAL_OUTBOUND_CALL : LV_INTERACTION_TYPES.EXTERNAL_INBOUND_CALL;
            break;
        case ContactType.WORKITEM_CONTACT:
            // Need to discuss and change this later
            interactionType = !acdContactDetailsObject.isInbound ? LV_INTERACTION_TYPES.EXTERNAL_OUTBOUND_CALL : LV_INTERACTION_TYPES.EXTERNAL_INBOUND_CALL;
            break;
        case ContactType.DIGITAL_CONTACT: {
            const digitalContactDetailsObject = detailsObject;
            const isOutbound = ((_a = digitalContactDetailsObject.case) === null || _a === void 0 ? void 0 : _a.direction) === DigitalContactDirection.OUTBOUND ? true : false;
            switch (channelName) {
                case DigitalChannelType.EMAIL:
                    if (message) {
                        interactionType = message.direction === DigitalContactDirection.OUTBOUND ? LV_INTERACTION_TYPES.EXTERNAL_OUTBOUND_EMAIL : LV_INTERACTION_TYPES.EXTERNAL_INBOUND_EMAIL;
                    }
                    else {
                        interactionType = isOutbound ? LV_INTERACTION_TYPES.EXTERNAL_OUTBOUND_EMAIL : LV_INTERACTION_TYPES.EXTERNAL_INBOUND_EMAIL;
                    }
                    break;
                case DigitalChannelType.SMS:
                    if (message) {
                        interactionType = message.direction === DigitalContactDirection.OUTBOUND ? LV_INTERACTION_TYPES.EXTERNAL_OUTBOUND_SMS : LV_INTERACTION_TYPES.EXTERNAL_INBOUND_SMS;
                    }
                    else {
                        interactionType = isOutbound ? LV_INTERACTION_TYPES.EXTERNAL_OUTBOUND_SMS : LV_INTERACTION_TYPES.EXTERNAL_INBOUND_SMS;
                    }
                    break;
                case DigitalChannelType.CHAT:
                    interactionType = isOutbound ? LV_INTERACTION_TYPES.EXTERNAL_OUTBOUND_CHAT : LV_INTERACTION_TYPES.EXTERNAL_INBOUND_CHAT;
                    break;
                case DigitalChannelType.WHATSAPP:
                    interactionType = isOutbound ? LV_INTERACTION_TYPES.EXTERNAL_OUTBOUND_MESSAGING : LV_INTERACTION_TYPES.EXTERNAL_INBOUND_MESSAGING;
                    interactionSubtype = isOutbound ? LV_INTERACTION_SUB_TYPES.OUTBOUND_WHATSAPP : LV_INTERACTION_SUB_TYPES.INBOUND_WHATSAPP;
                    break;
                case DigitalChannelType.FACEBOOK:
                    interactionType = isOutbound ? LV_INTERACTION_TYPES.EXTERNAL_OUTBOUND_MESSAGING : LV_INTERACTION_TYPES.EXTERNAL_INBOUND_MESSAGING;
                    interactionSubtype = isOutbound ? LV_INTERACTION_SUB_TYPES.OUTBOUND_MESSENGER : LV_INTERACTION_SUB_TYPES.INBOUND_MESSENGER;
                    break;
                default:
                    interactionType = isOutbound ? LV_INTERACTION_TYPES.EXTERNAL_OUTBOUND_MESSAGING : LV_INTERACTION_TYPES.EXTERNAL_INBOUND_MESSAGING;
            }
            break;
        }
    }
    return { interactionType, interactionSubtype };
}
/**
 * Generates the payload for disposition a digital ECC experience.
 *
 * @param detailsObject - The digital contact details object.
 * @param agentId - The agent's unique identifier.
 * @param externalInteractionId - The external interaction ID.
 * @param dispositionNotes - Notes or disposition for the interaction.
 * @param saveTranscript - Optional. If true, the transcript of the contact will be saved.
 * @param sendFinishTime - Optional. If true, the finish time will be included in the payload.
 * @example
 * ```
 * const payload = getUpdateExperienceRecordPayload({detailsObject: detailsObject, agentId: 'agent123', externalInteractionId: 'extInt456', dispositionNotes: 'Completed successfully'});
 * ```
 */
export function getUpdateExperienceRecordPayload(payload) {
    const endDate = new Date();
    const { detailsObject, agentId, externalInteractionId, dispositionNotes, saveTranscript, sendFinishTime = true } = payload;
    if ((detailsObject === null || detailsObject === void 0 ? void 0 : detailsObject.type) === ContactType.VOICE_CONTACT) {
        const voiceContactDetailsObject = detailsObject;
        const { startTime, status: result } = voiceContactDetailsObject;
        return {
            tenantId: getTenantId(),
            payload: {
                action: ECC_ACTION_TYPE.UPDATE_INTERACTION,
                duration: calculateDuration(startTime, endDate),
                externalAgentId: agentId,
                externalInteractionId,
                finishTime: endDate.toISOString(),
                interactionType: LV_INTERACTION_TYPES.EXTERNAL_INBOUND_CALL,
                result: result || 'Disconnected',
            },
            callType: voiceContactDetailsObject === null || voiceContactDetailsObject === void 0 ? void 0 : voiceContactDetailsObject.callType,
        };
    }
    else {
        const digitalContactDetailsObject = detailsObject;
        const { startTime, caseId: externalThreadId, status: result } = digitalContactDetailsObject;
        return {
            tenantId: getTenantId(),
            saveTranscript: Boolean(saveTranscript),
            payload: Object.assign(Object.assign(Object.assign(Object.assign({ action: ECC_ACTION_TYPE.UPDATE_INTERACTION }, (sendFinishTime ? { duration: calculateDuration(startTime, endDate) } : {})), { externalAgentId: agentId, externalInteractionId: externalInteractionId, externalThreadId: externalThreadId }), (sendFinishTime ? { finishTime: endDate.toISOString() } : {})), { note: dispositionNotes !== null && dispositionNotes !== void 0 ? dispositionNotes : '', result: result.toLowerCase() }),
        };
    }
}
/**
 * Function to get the most recent message from a list of messages.
 * @param messages - An array of message objects.
 * @returns The most recent message object or undefined if no messages exist.
 * @example
 * ```
 * const recentMessage = getMostRecentMessage(messages);
 * ```
 */
export function getMostRecentMessage(messages) {
    if (!messages || messages.length === 0)
        return null;
    const recentMessage = messages.reduce((latest, current) => new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest);
    return recentMessage;
}
/**
 * Function to get the most first message from a list of messages.
 * @param messages - An array of message objects.
 * @returns The first message object or undefined if no messages exist.
 * @example
 * ```
 * const firstMessage = getFirstMessage(messages);
 * ```
 */
export function getFirstMessage(messages) {
    if (!messages || messages.length === 0)
        return null;
    const firstMessage = messages.reduce((latest, current) => new Date(current.createdAt) < new Date(latest.createdAt) ? current : latest);
    return firstMessage;
}
/**
 * Generates the payload for voice a digital ECC experience.
 *
 * @param detailsObject - The digital contact details object.
 * @param agentId - The agent's unique identifier.
 * @param dispositionNotes - Notes or disposition for the interaction.
 * @param dispositionTags - Optional. Tags for the disposition.
 * @example
 * ```
 * const payload = getDispositionExperienceRecordPayloadForACD(detailsObject, 'agent123', 'extInt456', 'Completed successfully');
 * ```
 */
export function getDispositionExperienceRecordPayloadForACD(detailsObject, agentId, dispositionNotes, dispositionTags) {
    const { contactStatus: result, interactionId: externalInteractionId } = detailsObject;
    let tags = '';
    if (dispositionTags === null || dispositionTags === void 0 ? void 0 : dispositionTags.length) {
        tags = dispositionTags.map(tag => tag.tagName).join(', ');
    }
    return {
        tenantId: getTenantId(),
        payload: Object.assign(Object.assign({ action: ECC_ACTION_TYPE.UPDATE_INTERACTION, externalAgentId: agentId, externalInteractionId: externalInteractionId !== null && externalInteractionId !== void 0 ? externalInteractionId : '', note: dispositionNotes !== null && dispositionNotes !== void 0 ? dispositionNotes : '' }, (tags ? { customCol2: tags } : {})), { result }),
        callType: detailsObject === null || detailsObject === void 0 ? void 0 : detailsObject.callType,
    };
}
/**
 * This function create and returns a payload for ECC create API.
 * @param detailsObject - The digital contact details object.
 * @param agentId - The agent's unique identifier.
 * @example
 * ```
 * const payload = getCreateExperienceRecordPayload(detailsObject, 'agent123');
 * ```
 */
export function getCreateExperienceRecordPayload(detailsObject, agentId, saveTranscript, isAssignment) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
    switch (detailsObject === null || detailsObject === void 0 ? void 0 : detailsObject.type) {
        case ContactType.VOICE_CONTACT: {
            const voiceContactDetailsObject = detailsObject;
            const { interactionType } = getInteractionTypes(voiceContactDetailsObject);
            const customerContact = voiceContactDetailsObject.isInbound ? voiceContactDetailsObject.ani : voiceContactDetailsObject.dnis;
            return {
                tenantId: getTenantId(),
                payload: {
                    action: ECC_ACTION_TYPE.CREATE_INTERACTION,
                    interactionType: interactionType,
                    externalInteractionId: voiceContactDetailsObject === null || voiceContactDetailsObject === void 0 ? void 0 : voiceContactDetailsObject.interactionId,
                    customerPoc: customerContact,
                    businessPoc: voiceContactDetailsObject.isInbound ? voiceContactDetailsObject.dnis : voiceContactDetailsObject.ani,
                    startTime: new Date().toISOString(),
                    externalThreadId: voiceContactDetailsObject === null || voiceContactDetailsObject === void 0 ? void 0 : voiceContactDetailsObject.interactionId,
                    phoneNumber: customerContact,
                    externalAgentId: agentId,
                    result: (_a = voiceContactDetailsObject.status) === null || _a === void 0 ? void 0 : _a.toLowerCase(),
                },
                callType: voiceContactDetailsObject === null || voiceContactDetailsObject === void 0 ? void 0 : voiceContactDetailsObject.callType,
            };
        }
        case ContactType.DIGITAL_CONTACT: {
            const digitalContactDetailsObject = detailsObject;
            const channelName = ((_b = digitalContactDetailsObject.channelType) === null || _b === void 0 ? void 0 : _b.charAt(0).toUpperCase()) + ((_c = digitalContactDetailsObject.channelType) === null || _c === void 0 ? void 0 : _c.slice(1));
            const emailAddress = ((_d = digitalContactDetailsObject.case) === null || _d === void 0 ? void 0 : _d.direction) === DigitalContactDirection.INBOUND ? (_f = (_e = digitalContactDetailsObject === null || digitalContactDetailsObject === void 0 ? void 0 : digitalContactDetailsObject.case) === null || _e === void 0 ? void 0 : _e.authorEndUserIdentity) === null || _f === void 0 ? void 0 : _f.idOnExternalPlatform : (_h = (_g = digitalContactDetailsObject === null || digitalContactDetailsObject === void 0 ? void 0 : digitalContactDetailsObject.case) === null || _g === void 0 ? void 0 : _g.endUserRecipients[0]) === null || _h === void 0 ? void 0 : _h.idOnExternalPlatform;
            const startTime = new Date().toISOString();
            const messages = digitalContactDetailsObject === null || digitalContactDetailsObject === void 0 ? void 0 : digitalContactDetailsObject.messages;
            let message = null;
            if (messages && messages.length > 0) {
                message = getMostRecentMessage(messages);
            }
            const customerPoc = (message === null || message === void 0 ? void 0 : message.direction) === DigitalContactDirection.INBOUND ? (_j = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _j === void 0 ? void 0 : _j.idOnExternalPlatform : (message === null || message === void 0 ? void 0 : message.recipients) && ((_k = message === null || message === void 0 ? void 0 : message.recipients[0]) === null || _k === void 0 ? void 0 : _k.idOnExternalPlatform);
            const { interactionType, interactionSubtype } = getInteractionTypes(digitalContactDetailsObject, channelName, message);
            const externalInteractionId = (digitalContactDetailsObject.channelType === ((_l = DigitalChannelType.EMAIL) === null || _l === void 0 ? void 0 : _l.toLowerCase()) || digitalContactDetailsObject.channelType === ((_m = DigitalChannelType.SMS) === null || _m === void 0 ? void 0 : _m.toLowerCase()))
                ? messages && (message === null || message === void 0 ? void 0 : message.id)
                : digitalContactDetailsObject === null || digitalContactDetailsObject === void 0 ? void 0 : digitalContactDetailsObject.caseId;
            const fullNameArray = (digitalContactDetailsObject === null || digitalContactDetailsObject === void 0 ? void 0 : digitalContactDetailsObject.customerName) ? digitalContactDetailsObject === null || digitalContactDetailsObject === void 0 ? void 0 : digitalContactDetailsObject.customerName.split(' ') : undefined;
            const firstName = fullNameArray && fullNameArray.length ? fullNameArray[0].trim() : undefined;
            const lastName = fullNameArray && fullNameArray.length > 1 ? fullNameArray[fullNameArray.length - 1].trim() : undefined;
            const contactCreatedAt = (message === null || message === void 0 ? void 0 : message.createdAt) || null;
            if (!externalInteractionId)
                return undefined; // Ensure externalInteractionId is defined
            let payload = Object.assign(Object.assign(Object.assign(Object.assign({ action: ECC_ACTION_TYPE.CREATE_INTERACTION, customerPoc: customerPoc, startTime: startTime, result: (_o = digitalContactDetailsObject.status) === null || _o === void 0 ? void 0 : _o.toLowerCase(), businessPoc: (_q = (_p = digitalContactDetailsObject === null || digitalContactDetailsObject === void 0 ? void 0 : digitalContactDetailsObject.channel) === null || _p === void 0 ? void 0 : _p.id) !== null && _q !== void 0 ? _q : null, interactionType: interactionType, interactionSubtype: interactionSubtype, externalAgentId: agentId, externalInteractionId: externalInteractionId, externalThreadId: digitalContactDetailsObject === null || digitalContactDetailsObject === void 0 ? void 0 : digitalContactDetailsObject.contactID }, ((digitalContactDetailsObject.channelType === ((_r = DigitalChannelType.SMS) === null || _r === void 0 ? void 0 : _r.toLowerCase()) || digitalContactDetailsObject.channelType === ((_s = DigitalChannelType.WHATSAPP) === null || _s === void 0 ? void 0 : _s.toLowerCase()))
                ? { phoneNumber: customerPoc }
                : {})), ((digitalContactDetailsObject.channelType !== ((_t = DigitalChannelType.SMS) === null || _t === void 0 ? void 0 : _t.toLowerCase()) && digitalContactDetailsObject.channelType !== ((_u = DigitalChannelType.WHATSAPP) === null || _u === void 0 ? void 0 : _u.toLowerCase()) && digitalContactDetailsObject.channelType !== ((_v = DigitalChannelType.EMAIL) === null || _v === void 0 ? void 0 : _v.toLowerCase()) && firstName)
                ? { firstName: firstName }
                : {})), ((digitalContactDetailsObject.channelType !== ((_w = DigitalChannelType.SMS) === null || _w === void 0 ? void 0 : _w.toLowerCase()) && digitalContactDetailsObject.channelType !== ((_x = DigitalChannelType.WHATSAPP) === null || _x === void 0 ? void 0 : _x.toLowerCase()) && digitalContactDetailsObject.channelType !== ((_y = DigitalChannelType.EMAIL) === null || _y === void 0 ? void 0 : _y.toLowerCase()) && lastName)
                ? { lastName: lastName }
                : {})), (digitalContactDetailsObject.channelType === ((_z = DigitalChannelType.EMAIL) === null || _z === void 0 ? void 0 : _z.toLowerCase()) ? { emailAddress: emailAddress } : {}));
            if (messages && messages.length > 0) {
                payload = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, payload), (digitalContactDetailsObject.channelType !== ((_0 = DigitalChannelType.EMAIL) === null || _0 === void 0 ? void 0 : _0.toLowerCase()) ? { text: (_1 = message === null || message === void 0 ? void 0 : message.messageContent) === null || _1 === void 0 ? void 0 : _1.text } : {})), ((digitalContactDetailsObject.channelType === ((_2 = DigitalChannelType.EMAIL) === null || _2 === void 0 ? void 0 : _2.toLowerCase()) && messages && messages.length > 0) ? { emailSubject: message === null || message === void 0 ? void 0 : message.title } : {})), (digitalContactDetailsObject.channelType === ((_3 = DigitalChannelType.EMAIL) === null || _3 === void 0 ? void 0 : _3.toLowerCase())
                    ? { emailBody: updateEmailContentDigitalSource(message === null || message === void 0 ? void 0 : message.messageContent.text, message === null || message === void 0 ? void 0 : message.attachments).documentElement.innerHTML }
                    : {})), (isAssignment ? { createdAt: contactCreatedAt !== null && contactCreatedAt !== void 0 ? contactCreatedAt : null } : {}));
            }
            return {
                tenantId: getTenantId(),
                saveTranscript: Boolean(saveTranscript),
                payload: payload,
            };
        }
        default:
            return undefined; // Return undefined for unsupported media types
    }
}
/**
 * This method is going to be fired when ECC updates the Experience Record with the customerId.
 * This applies relateTo scenario as well
 * @param contactId - The contact ID to be updated in the local storage.
 * @param customerId - The customer ID to be associated with LV.
 * @example
 * ```
 * updateLVLSWithCustomerId(contactId, customerId)
 * ```
 */
export const updateLVLSWithCustomerId = (contactId, customerId) => {
    const lvExperienceRecordsInLS = LocalStorageHelper.getItem(UIStorageKeys.LV_EXPERIENCE_RECORDS, true) || {};
    // We need to override the existing record if it exists, this to cover relateTo scenario
    if (contactId && customerId) {
        const expRecordToBeStoredInLS = Object.assign(Object.assign({}, lvExperienceRecordsInLS), { [contactId]: customerId });
        LocalStorageHelper.setItem(UIStorageKeys.LV_EXPERIENCE_RECORDS, JSON.stringify(expRecordToBeStoredInLS));
    }
};
//# sourceMappingURL=lv-interactions-utility.js.map