import { CallContactEventStatus, VoiceMailContactEventStatus } from '@nice-devone/core-sdk';
import { WorkItemContactStatus } from '@nice-devone/common-sdk';
import { ContactType } from '@nice-devone/agent-sdk';
/**
 * The skill fields, their source on a resolved `Skills`, and their empty value — as one table.
 *
 * apply and clear are both generated from this, so they cannot drift. A field added to one and
 * forgotten in the other is the specific defect this shape exists to prevent, and it is the reason
 * `clearSkillDetails` is not hand-written per channel.
 *
 * The `?? ` fallbacks mirror the `||` defaults the current implementation uses. They are equivalent
 * for these fields, since every falsy-but-defined value equals its own fallback.
 */
const SKILL_FIELDS = [
    { name: 'skillName', read: (s) => s.skillName, empty: '' },
    { name: 'acwTypeId', read: (s) => s.acwTypeId, empty: undefined },
    { name: 'requireDisposition', read: (s) => { var _a; return (_a = s.requireDisposition) !== null && _a !== void 0 ? _a : false; }, empty: false },
    { name: 'maxSecondsACW', read: (s) => { var _a; return (_a = s.maxSecondsACW) !== null && _a !== void 0 ? _a : 0; }, empty: 0 },
    { name: 'outboundStrategy', read: (s) => { var _a; return (_a = s.outboundStrategy) !== null && _a !== void 0 ? _a : ''; }, empty: '' }
];
/** Applies common skill details to a contact.
 * @example
 * ```
 * const contact = new CXoneVoiceContact();
 * ```
 */
const applyCommon = (contact, skills) => {
    SKILL_FIELDS.forEach(({ name, read }) => {
        contact[name] = read(skills);
    });
};
/** Clears common skill details from a contact.
 * @example
 * ```
 * const contact = new CXoneVoiceContact();
 * ```
 */
const clearCommon = (contact) => {
    SKILL_FIELDS.forEach(({ name, empty }) => {
        contact[name] = empty;
    });
};
const voicePolicy = {
    contactType: ContactType.VOICE_CONTACT,
    skillIdOf: (contact) => contact.skill,
    applySkillDetails: applyCommon,
    clearSkillDetails: clearCommon,
    isTerminal: (contact) => {
        const voice = contact;
        return voice.status === CallContactEventStatus.DISCONNECTED && voice.finalState === true;
    },
};
const workItemPolicy = {
    contactType: ContactType.WORKITEM_CONTACT,
    // `updateCurrentWorkitemInfo` assigns contact.skill from workItemEventData.skillId, so the
    // contact is the correct place to read it from — not the event.
    skillIdOf: (contact) => contact.skill,
    applySkillDetails: applyCommon,
    clearSkillDetails: clearCommon,
    isTerminal: (contact) => {
        const workItem = contact;
        return workItem.status === WorkItemContactStatus.DISCONNECTED && workItem.finalState === true;
    },
};
const voiceMailPolicy = {
    contactType: ContactType.VOICEMAIL_CONTACT,
    skillIdOf: (contact) => { var _a, _b; return (_b = (_a = contact.voiceMailEventData) === null || _a === void 0 ? void 0 : _a.skill) !== null && _b !== void 0 ? _b : ''; },
    // Voicemail writes SEVEN locations, not five: the five on the contact plus two mirrors on
    // voiceMailEventData, which is what the voicemail UI reads. Missing a mirror here is the most
    // likely defect in this file, which is why the round-trip test covers all seven.
    applySkillDetails: (contact, skills) => {
        var _a;
        applyCommon(contact, skills);
        const eventData = contact.voiceMailEventData;
        if (!eventData)
            return;
        eventData.skillName = skills.skillName;
        eventData.requireDisposition = (_a = skills.requireDisposition) !== null && _a !== void 0 ? _a : false;
    },
    clearSkillDetails: (contact) => {
        clearCommon(contact);
        const eventData = contact.voiceMailEventData;
        if (!eventData)
            return;
        eventData.skillName = '';
        eventData.requireDisposition = false;
    },
    // Voicemail terminates on DISCARDED rather than DISCONNECTED, and its status and finalState live
    // on voiceMailEventData — matching how setVoiceMailContactInMap decides to delete the contact.
    isTerminal: (contact) => {
        const eventData = contact.voiceMailEventData;
        return (eventData === null || eventData === void 0 ? void 0 : eventData.status) === VoiceMailContactEventStatus.DISCARDED
            && (eventData === null || eventData === void 0 ? void 0 : eventData.finalState) === true;
    },
};
const POLICIES = [
    voicePolicy,
    workItemPolicy,
    voiceMailPolicy
];
/**
 * Resolve the policy for a contact, or undefined for a contact type that carries no skill metadata
 * (digital contacts do not use this path).
 *
 * Callers must treat undefined as "do not enrich, but still publish" — a contact must never be
 * withheld from the agent because its channel has no policy.
 *
 * @param contact - the contact to resolve a policy for
 * @returns the matching policy, or undefined when the channel is not skill-enriched
 * @example
 * ```
 * const policy = contactChannelPolicyFor(contact);
 * if (!policy) return;
 * ```
 */
export const contactChannelPolicyFor = (contact) => POLICIES.find((policy) => policy.contactType === (contact === null || contact === void 0 ? void 0 : contact.type));
//# sourceMappingURL=contact-channel-policy.js.map