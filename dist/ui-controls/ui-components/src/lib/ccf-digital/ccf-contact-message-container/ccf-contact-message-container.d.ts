/// <reference types="react" />
import { CXoneMessageArray, CXoneMessageDraftsArray } from '@nice-devone/common-sdk';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
interface CcfContactMessageContainerProps {
    messages: CXoneMessageArray;
    messageDrafts: CXoneMessageDraftsArray;
    channelType?: string;
    previewOnlyChannels?: string[];
    isEditorVisible: boolean;
    channelName?: string;
    contactDetails?: CXoneDigitalContact;
    lastInboundMessage?: string;
    channelId?: string;
}
declare const _default: import("react").MemoExoticComponent<(props: CcfContactMessageContainerProps) => JSX.Element>;
export default _default;
