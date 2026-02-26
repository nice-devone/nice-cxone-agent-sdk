/// <reference types="react" />
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
export interface MessageNoteUserInfo {
    firstName?: string;
    lastName?: string;
    surname?: string;
}
export interface ContactMessageNoteProps {
    userDetails?: MessageNoteUserInfo;
    isNoteOpen?: boolean;
    contactDetails?: CXoneDigitalContact;
    noteContent?: string;
    isEditable?: boolean;
    isReadOnly: boolean;
    direction?: string;
    messageId?: string;
    noteId?: string;
    updatedAt?: string;
    isPreviousConversationNote?: boolean;
    isNextConversationNote?: boolean;
    isEmailNote?: boolean;
    scrollContainerRef?: React.RefObject<HTMLDivElement>;
    scrollToLastNote?: () => void;
}
/**
   * displays the UI for message note to put the note in chat
   * @param props -ContactMessageNoteProps
   * @returns - UI for message note
   * @example `<CcfContactMessageNote />`
   **/
export declare const CcfContactMessageNote: (props: ContactMessageNoteProps) => JSX.Element;
export default CcfContactMessageNote;
