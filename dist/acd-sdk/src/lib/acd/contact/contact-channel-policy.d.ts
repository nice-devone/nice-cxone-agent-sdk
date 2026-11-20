import { Skills } from '@nice-devone/common-sdk';
import { ContactType } from '@nice-devone/agent-sdk';
import { CXoneVoiceContact } from './cxone-voice-contact';
import { CXoneWorkItemContact } from './cxone-workitem-contact';
import { CXoneVoiceMailContact } from './cxone-voicemail-contact';
/**
 * Per-channel strategy for the skill metadata carried on a contact.
 *
 * Voice, work item and voicemail need identical treatment through different field paths and three
 * different status enums. Keeping them as three registrations rather than branching inside
 * ContactManager means adding a channel is a new entry here, not another `else if`.
 *
 * INTERNAL. Deliberately NOT exported from `libs/common/acd-sdk/src/index.ts`. `ContactManager`
 * itself is not exported either, and keeping this file internal is what preserves the
 * zero-public-API-change guarantee for AW-60267 — external CMA SDK consumers (Citi's Angular app,
 * the Salesforce BYOT bundle) gain nothing to adopt.
 *
 * Epic: AW-63132 | Story: AW-63575 | Capability: AW-60267
 */
/** Any ACD contact that carries skill metadata resolved via SkillService. */
export declare type ContactChannelContact = CXoneVoiceContact | CXoneWorkItemContact | CXoneVoiceMailContact;
export interface ContactChannelPolicy {
    /** The ContactType this policy serves. */
    readonly contactType: ContactType;
    /** Where this channel keeps the skill id to resolve. */
    skillIdOf(contact: ContactChannelContact): string;
    /** Copy resolved skill metadata onto the contact. Never blanks a field it cannot populate. */
    applySkillDetails(contact: ContactChannelContact, skills: Skills): void;
    /**
     * Remove skill metadata from the contact.
     *
     * Needed when a lookup fails for a skill id that has CHANGED — the resident values then describe
     * the previous skill, and leaving them would label a contact with the wrong queue. Preserving
     * them is correct only when re-resolving the same skill id.
     */
    clearSkillDetails(contact: ContactChannelContact): void;
    /** Whether the contact has reached its final state and should not be enriched further. */
    isTerminal(contact: ContactChannelContact): boolean;
}
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
export declare const contactChannelPolicyFor: (contact: ContactChannelContact | undefined) => ContactChannelPolicy | undefined;
