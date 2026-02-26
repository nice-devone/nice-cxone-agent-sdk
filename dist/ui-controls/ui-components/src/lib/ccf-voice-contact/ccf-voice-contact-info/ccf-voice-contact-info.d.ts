import { AgentDetails, ContactData } from '@nice-devone/common-sdk';
import { CXoneVoiceContact } from '@nice-devone/acd-sdk';
interface CcfVoiceContactInfoProps {
    contact: ContactData;
    isNaturalCalling: boolean;
    isSmView: boolean;
    isSmViewConference?: boolean;
    voiceContact: CXoneVoiceContact;
    consultAgentDetail?: '' | AgentDetails;
    timer: number;
    inboundContactDetail?: {
        firstName: string;
        lastName: string;
    };
}
/**
 * @returns CcfVoiceContactInfo
 * @example <CcfVoiceContactInfo />
 */
export declare const CcfVoiceContactInfo: ({ contact, isNaturalCalling, isSmView, isSmViewConference, voiceContact, consultAgentDetail, timer, inboundContactDetail, }: CcfVoiceContactInfoProps) => JSX.Element;
export {};
