import { OBChannels } from '../../ccf-outbound-options/ccf-outbound-options';
import { SyntheticEvent } from 'react';
import { CCF_OPTION_TYPES } from '../ccf-add-channel-options-enums';
export interface CcfAddChannelSearchProps {
    handleTrigger: (event: React.SyntheticEvent, triggerValue: boolean, triggerType: string, channelId?: string, digitalSkillId?: number, contact?: string) => void;
    selectedChannel?: OBChannels;
    setSelectedChannel: (channelName: OBChannels | undefined) => void;
    clickChannelHandler: (event: SyntheticEvent, contact: string, channelName: OBChannels, type: CCF_OPTION_TYPES) => void;
    value?: string;
}
/**
 * Component for ccf add channel search
 * @param props - CcfAddChannelSearchProps
 * @example - <CcfAddChannelSearch />
 * @returns
 */
export declare function CcfAddChannelSearch(props: CcfAddChannelSearchProps): JSX.Element;
export default CcfAddChannelSearch;
