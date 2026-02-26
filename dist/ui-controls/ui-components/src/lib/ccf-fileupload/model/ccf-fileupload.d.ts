import { AttachmentType } from '@nice-devone/common-sdk';
export interface CcfFileUploadState {
    attachments: {
        [key: number]: Array<AttachmentType>;
    };
    currentContactId: string;
}
