/// <reference types="react" />
import { MediaType } from '@nice-devone/common-sdk';
import { CcfTranslationKey } from '@nice-devone/i18n';
export interface AgentContactHistory {
    /**
     * unique contact Id
     */
    contactId: string;
    /**
     * well formatted contact name, depending on the MediaType/Channel,
     * it can be an email, a phone number, or firstName lastName.
     */
    contactName: string;
    /**
     * string encoded channel icon image, this is required for adaptiveCards.
     */
    channelIcon: string;
    /**
     * Channel name, e.g. whatsapp, email, sms, call, etc.
     */
    channelName: string;
    /**
     * disposition status / case status for the interaction.
     */
    dispositionStatus: string;
    /**
     * disposition notes, these are optional depending on the channel settings.
     */
    dispositionNotes?: string;
    /**
     * total duration in HH:MM:SS, currently only applicable for voice contacts.
     */
    interactionDuration?: string;
    /**
     * Used media type, currently we only support voice and digital.
     */
    mediaType: Extract<MediaType, MediaType.VOICE | MediaType.DIGITAL>;
    /**
     * name of the skill used for the interaction
     */
    skill: string;
    /**
     * unique ID of the skill,
     * currently only required to get dispositions for ACD,
     * and the contact disposition API is not working for ACD (AW-17332)
     */
    skillId?: string | null;
    /**
     * primary disposition ID for ACD,
     * currently required because the contact disposition API is not working (AW-17332)
     */
    dispositionId?: number | null;
    /**
     * last updated timestamp in localized format
     */
    statusUpdatedDateTime: string;
    /**
     * last updated date in localized format
     */
    statusUpdatedDate: string;
    /**
     * status timestamp millis for sorting by datetime
     */
    statusUpdatedDateTimeMillis: number;
    /**
     * applied tags while setting disposition, currently optionally applicable for acd contacts.
     */
    tags?: string[];
    /**
     * channel icon alt text, used for accessibility.
     */
    translate?: (key: CcfTranslationKey) => string;
}
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCard />
 */
export declare function CcfAgentContactHistory(): JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof CcfAgentContactHistory>;
export default _default;
