/// <reference types="react" />
import { CXoneMessageDraftsArray } from '@nice-devone/common-sdk';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
interface CcfContactPublicPostContainerProps {
    messageDrafts: CXoneMessageDraftsArray;
    sender: string;
    isNoteOpen?: boolean;
    contactDetails?: CXoneDigitalContact;
    lastInboundMessage?: string;
}
declare const _default: import("react").MemoExoticComponent<(props: CcfContactPublicPostContainerProps) => JSX.Element>;
export default _default;
