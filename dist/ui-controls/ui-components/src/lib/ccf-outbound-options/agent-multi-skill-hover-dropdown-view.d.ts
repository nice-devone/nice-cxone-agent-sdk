import React from 'react';
import { SelectChangeEvent } from '@mui/material';
import { CXoneDigitalChannel, CXoneDigitalSkill } from '@nice-devone/common-sdk';
import { outboundOptionState } from '../ccf-directory/+state/ccf-directory.slice';
export interface AgentMultiSkillHoverDropDownProps {
    data: {
        skillId: number;
        skillName: string;
    }[];
    OBChannels: CXoneDigitalChannel[];
    triggerType: string;
    skillIdSelectedForInteraction: number | null;
    setOBSkillIdForInteraction: (event: SelectChangeEvent) => void;
    selectedChannelForOBInteraction: string;
    setOBChannelIdForInteraction: (event: SelectChangeEvent) => void;
    IBcall: boolean;
    cancelHandler: (e: React.SyntheticEvent, state: outboundOptionState) => void;
    elevationPopover?: boolean;
    handleTrigger: (event: React.SyntheticEvent, triggerValue: boolean, triggerType: string, channelID?: string, digitalSkillId?: number, contact?: string) => void;
    customerName: string;
    renderTwoColumnDesign: boolean;
    isTSEnabled?: boolean;
    DigitalOBSkills: CXoneDigitalSkill[];
    selectedDigitalSkillId: number | undefined;
}
/**
 * AgentMultiSkillHoverDropDown component - Dropdown for selecting skills or channels
 *
 * @param props - AgentMultiSkillHoverDropDownProps
 * @example
 * ```tsx
 * <AgentMultiSkillHoverDropDown
 *   data={skills}
 *   OBChannels={channels}
 *   triggerType="voice"
 *   {...otherProps}
 * />
 * ```
 */
declare const AgentMultiSkillHoverDropDown: React.FC<AgentMultiSkillHoverDropDownProps>;
export default AgentMultiSkillHoverDropDown;
