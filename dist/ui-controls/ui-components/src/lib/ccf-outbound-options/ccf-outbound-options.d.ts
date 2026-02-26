import React from 'react';
import { outboundOptionState } from '../ccf-directory/+state/ccf-directory.slice';
import { CXoneDigitalChannel, CXoneDigitalSkill } from '@nice-devone/common-sdk';
export interface ICcfOutboundOptionsProps {
    number: string | number;
    skills?: string[];
    textStyle?: {
        display: string;
    };
    addressBookSelector?: boolean;
}
export interface AgentMultiSkillHoverDropDownViewProps {
    data: {
        skillId: number;
        skillName: string;
    }[];
    OBChannels: CXoneDigitalChannel[];
    handleTrigger: (event: React.SyntheticEvent, triggerValue: boolean, triggerType: string, channelID?: string, digitalSkillId?: number, contact?: string) => void;
    triggerType: string;
    customerName: string;
    IBcall: boolean;
    contact?: string;
    cancelHandler: (e: React.SyntheticEvent, outboundState: outboundOptionState) => void;
    elevationPopover?: boolean;
    DigitalOBSkills?: CXoneDigitalSkill[];
}
export declare enum OBChannels {
    VOICE = "voice",
    SMS = "sms",
    EMAIL = "email",
    WHATSAPP = "whatsapp",
    TRANSFER = "transfer"
}
/**
 * renders the select skills dropdown
 * @param props - AgentSkillSetArr
 * @example AgentMultiSkillHoverDropDownView
 * @returns
 */
export declare const AgentMultiSkillHoverDropDownView: (props: AgentMultiSkillHoverDropDownViewProps) => JSX.Element;
/**
 * Component to get outbound options
 * @param props - ICcfOutboundOptionsProps
 * @example <CcfOutboundOptions />
 * @returns
 */
export declare const CcfOutboundOptions: (props: ICcfOutboundOptionsProps) => JSX.Element | null;
export default CcfOutboundOptions;
