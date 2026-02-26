import { AttachmentType } from '@nice-devone/common-sdk';
export interface CcfConversationFileUploadState {
    attachments: {
        [key: number]: Array<AttachmentType>;
    };
    currentContactId: string;
}
