import { OBChannels } from '../ccf-outbound-options/ccf-outbound-options';
import { CXoneDigitalChannel, ElevatedFrom } from '@nice-devone/common-sdk';
import { CcfAddChannelSearchProps } from './ccf-add-channel-search/ccf-add-channel-search';
import { CXoneContact } from '@nice-devone/agent-sdk';
declare type CcfChannelOptions = {
    interactionId?: string;
    contactId?: CXoneContact['contactID'];
    channelId: CXoneDigitalChannel['channelId'];
    fromProvider?: ElevatedFrom;
};
export declare type CcfAddChannelOptionsProps = {
    channelType?: OBChannels;
    handleClose: () => void;
    handleSelect?: (options: CcfChannelOptions) => void;
} & Pick<CcfAddChannelSearchProps, 'value'>;
/**
 * Component for ccf add channel options
 * @param props - CcfAddChannelOptionsProps
 * @example - <CcfAddChannelOptions />
 * @returns
 */
export declare function CcfAddChannelOptions(props: CcfAddChannelOptionsProps): JSX.Element;
export default CcfAddChannelOptions;
