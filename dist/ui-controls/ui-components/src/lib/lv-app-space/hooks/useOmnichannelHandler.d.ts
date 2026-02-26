import React from 'react';
import { CXoneDigitalChannel, ElevatedFrom } from '@nice-devone/common-sdk';
import { LvCustomerType } from '../lv-app-space-types';
import { CXoneContact } from '@nice-devone/agent-sdk';
declare type OmniChannelProps = {
    consumerName: string;
    contactNumber: string;
};
declare type CallProps = {
    phone: string;
    phoneConsent: boolean;
} & OmniChannelProps;
declare type EmailProps = {
    contactEmailConsent: boolean;
    emailAddress: string;
    emailConsent: boolean;
} & OmniChannelProps;
declare type SmsProps = {
    contactSmsConsent: boolean;
    phone: string;
} & OmniChannelProps;
declare type WhatsappProps = {
    contactWhatsappConsent: boolean;
    phone: string;
} & OmniChannelProps;
declare type InteractionProps = {
    channelId?: CXoneDigitalChannel['channelId'];
    contactId?: CXoneContact['contactID'];
    fromProvider?: ElevatedFrom;
    skillId?: number;
};
/**
 * Integrates LV omnichannel with CX one outbound digital
 * @example
 * ```
 * const omnichannel = useOmniChannelHandler()
 * ```
 */
export default function useOmnichannelHandler(): {
    ChannelSelectDialog: JSX.Element;
    omnichannelProps: {
        allowDial: boolean;
        allowEmail: boolean;
        allowSms: boolean;
        allowWhatsapp: boolean;
        onDial: (info: CallProps | SmsProps | EmailProps | WhatsappProps, customer: LvCustomerType, callback?: () => void) => void;
        onEmail: (info: CallProps | SmsProps | EmailProps | WhatsappProps, customer: LvCustomerType, callback?: () => void) => void;
        onSms: (info: CallProps | SmsProps | EmailProps | WhatsappProps, customer: LvCustomerType, callback?: () => void) => void;
        onWhatsapp: (info: CallProps | SmsProps | EmailProps | WhatsappProps, customer: LvCustomerType, callback?: () => void) => void;
        setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
        triggerOutboundCall: (callInfo: CallProps, customer: LvCustomerType, interaction: InteractionProps) => void;
        triggerOutboundEmail: (emailInfo: EmailProps, customer: LvCustomerType, interaction: InteractionProps) => void;
        triggerOutboundSms: (smsInfo: SmsProps, customer: LvCustomerType, interaction: InteractionProps) => void;
        triggerOutboundWhatsapp: (whatsappInfo: WhatsappProps, customer: LvCustomerType, interaction: InteractionProps) => void;
    };
};
export {};
