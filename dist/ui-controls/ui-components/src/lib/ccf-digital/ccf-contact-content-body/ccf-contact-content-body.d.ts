/// <reference types="react" />
import { CXoneMessageArray, CXoneMessageDraftsArray, CXoneMessageWithTranslation } from '@nice-devone/common-sdk';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
export interface CcfContactContentBodyProps {
    messages: CXoneMessageArray;
    digitalContactDetails: CXoneDigitalContact;
    messageDrafts: CXoneMessageDraftsArray;
    wysiwygEnabled: boolean;
    sender: string;
    hasVisibleTitle: boolean;
    hasVisibleRecipients: boolean;
    caseId: string;
    interactionId?: string | null;
    isEditorVisible: boolean;
    isPrivateChannel: boolean;
    hasTreeStructure?: boolean;
    channelDisplayName: string;
    channelType?: string;
    messagesWithTranslation: CXoneMessageWithTranslation[];
    isTranslateAgentMessages?: boolean;
    isTranslateCustomerMessages?: boolean;
    customerLanguage?: string;
    agentLanguage?: string;
    channelId?: string;
}
declare const _default: import("react").MemoExoticComponent<(props: CcfContactContentBodyProps) => JSX.Element>;
export default _default;
