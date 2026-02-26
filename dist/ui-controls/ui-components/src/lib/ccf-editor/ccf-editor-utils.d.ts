import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
import { ContactData, CXoneAttachmentArray, CXoneDigitalContactUserSavedProperties, CXoneDigitalCreateDraftRequest, CXoneDigitalReplyRequest, CXoneMessageArray, CXoneReplyToMessages, CXoneUserRolePermissions, InteractionFailedMessages } from '@nice-devone/common-sdk';
import { CSSProperties } from 'react';
import { EditorState as LexicalEditorState } from 'lexical';
import { TranslationSettingsRecord } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
export interface replyObject {
    activeContact: ContactData | undefined;
    selectedDigitalContactDetails: CXoneDigitalContact;
    wysiwygEnabled: boolean;
    editorState: LexicalEditorState;
    isEditorOpen: boolean;
    selectedMessageReplyData: CXoneReplyToMessages;
    subject: string | undefined;
    receiverTo: string | undefined;
    receiverCc: string | undefined;
    receiverBcc: string | undefined;
    isOBContact: boolean;
    savedDigitalContactDetails: CXoneDigitalContactUserSavedProperties;
}
export interface endUserRecipients {
    activeContact: ContactData | undefined;
    selectedDigitalContactDetails: CXoneDigitalContact;
    receiverTo: string | undefined;
    receiverCc: string | undefined;
    receiverBcc: string | undefined;
    wysiwygEnabled: boolean;
    isOBContact: boolean;
    isRequestForApproval: boolean;
}
export interface draftMessageData {
    activeContact: ContactData | undefined;
    selectedDigitalContactDetails: CXoneDigitalContact;
    selectedMessageReplyData: CXoneReplyToMessages;
    messages: CXoneMessageArray;
    wysiwygEnabled: boolean;
    editorState: LexicalEditorState;
    isPrivateChannel: boolean;
    selectedSkill: SelectedSkill;
    subject: string | undefined;
    receiverTo: string | undefined;
    receiverCc: string | undefined;
    receiverBcc: string | undefined;
    fromChannelId: string | undefined;
}
export interface draftMessageContactData {
    activeContact: ContactData | undefined;
    selectedDigitalContactDetails: CXoneDigitalContact;
    selectedMessageReplyData: CXoneReplyToMessages;
    messages: CXoneMessageArray;
    wysiwygEnabled: boolean;
    isPrivateChannel: boolean;
    selectedSkill: SelectedSkill;
    subject: string | undefined;
    receiverTo: string | undefined;
    receiverCc: string | undefined;
    receiverBcc: string | undefined;
    fromChannelId: string | undefined;
    parsedLexicalString: string | undefined;
}
declare type CustomStyleMap = Record<string, CSSProperties>;
export declare const CUSTOM_STYLE_MAP: CustomStyleMap;
/**
 * Remove OB email contact from local storage on send/discard
 * @example
 * ```
 * removeObContactFromStorage();
 * ```
 */
export declare const removeObContactFromStorage: (caseId: string, selectedDigitalContactDetails: CXoneDigitalContact) => void;
/**
 * update local storage after send/discard actions.
 * @example
 * ```
 * uploadLSForEditor();
 * ```
 */
export declare const uploadLSForEditor: (selectedDigitalContactDetails: CXoneDigitalContact, digitalContactUserSavedProperties: {
    [caseId: string]: CXoneDigitalContactUserSavedProperties;
}) => void;
/**
 * Used to update the index db with the interaction failed messages
 * @param xTraceId - unique draft message id from client side
 * @param caseId - contact id
 * @example
 * ```
 * updateIndexDbWithFailedMessage(xTraceId, caseId, sendReplyObj);
 * ```
 */
export declare const updateIndexDbWithFailedMessage: (xTraceId: string, caseId: string, messageAuthor: string, wysiwygEnabled: boolean, parentId?: string, sendReplyObj?: CXoneDigitalReplyRequest, draftMessageForApproval?: CXoneDigitalCreateDraftRequest, fromAddress?: string) => Promise<void>;
/**
 * Used to remove the failed message from the index db when not needed
 * @param caseId - contact id
 * @param xTraceId - unique draft message id from client side
 * @example
 * ```
 * removeFailedMessageFromIndexDb(caseId, failedXTraceId);
 * ```
 */
export declare const removeFailedMessageFromIndexDb: (caseId: string, xTraceId: string) => Promise<void>;
/**
   * Method to get payload, that used to insert into editor
   * @returns - Payload object, editor accepts
   * @example - getInsertContactEditorPayload(caseId: string, data: string)
   * @param  caseId - represents current interaction id
   * @param data - string to be inserted to editor
   * @param messageDraftId - message draft id
   */
export declare const getInsertContactEditorPayload: (caseId: string, data: string, messageDraftId?: string) => {
    caseId: string;
    fieldsToUpdate: {
        subject: string;
        sender: string;
        receiverTo: string;
        receiverCc: string;
        receiverBcc: string;
        isEditorOpen: boolean;
        lexicalEditorState: LexicalEditorState;
        messageDraftId: string;
    };
};
/**
 * Used to get all failed messages to send from indexdb
 * @example
 * ```
 * getAllFailedMessageFromIndexDb();
 * ```
 */
export declare const getAllFailedMessageFromIndexDb: () => Promise<InteractionFailedMessages>;
/**
 * enum typedoc for message draft status translation
 */
export declare enum ApprovalBannerStatus {
    /**
      * @remarks - enum for pending approval status
    */
    PENDING = "pendingApproval",
    /**
      * @remarks - enum for message approval denied status
    */
    DENIED = "approvalDenied"
}
/**
 * Interface for Selected Skill
 */
export interface SelectedSkill {
    /**
     * @remarks - routing queue id of the selected skill
     */
    id: string;
    /**
     * @remarks - name of the selected skill
     */
    name: string;
    /**
     * @remarks - CXone skillId of the selected skill
     */
    skillId?: number;
}
export interface replyMessageObject {
    activeContact: ContactData | undefined;
    selectedDigitalContactDetails: CXoneDigitalContact;
    wysiwygEnabled: boolean;
    editorState: LexicalEditorState;
    isEditorOpen: boolean;
    selectedMessageReplyData: CXoneReplyToMessages;
    subject: string | undefined;
    receiverTo: string | undefined;
    receiverCc: string | undefined;
    receiverBcc: string | undefined;
    isOBContact: boolean;
    savedDigitalContactDetails: CXoneDigitalContactUserSavedProperties;
    parsedLexicalString: string | null;
    translationSettings?: TranslationSettingsRecord;
    elevatedInteractionId?: string;
    elevatedFrom?: string;
    isReplyToSpecificMessage?: boolean;
    repliedToMessageId?: string;
}
/**
    * checks if new value is different from the one stored in local storage
    * @param storageKey - local storage key
    * @param valueToCompare - new value
    * @example hasEqualValueInLocalStorage ('some-storage-key', [])
    * @returns boolean true or false
   */
export declare const hasEqualValueInLocalStorage: (storageKey: string, valueToCompare: any) => boolean;
/**
  * @param userRolePermissions - local storage key
  * @param selectedDigitalContactDetails - new value
  * @example getInitialSkill (userRolePermissions, selectedDigitalContactDetails)
  * @returns boolean true or false
 */
export declare const getInitialSkill: (userRolePermissions: CXoneUserRolePermissions, selectedDigitalContactDetails: CXoneDigitalContact) => SelectedSkill;
/**
 * Function to upload/ retain attachments into the editor (non-thunk version).
 * @param caseId - ID of the case
 * @param attachments - Array of attachments to upload
 * @param uuidForInlineImages - Optional array of UUIDs for inline images
 * @param shouldProceedWithUpload - Optional ref to control upload
 * @param isForwardedAttachment - Optional flag for forwarded attachments
 * @example -
 * ```
 * retainAttachmentIntoEditor({ caseId, attachments, uuidForInlineImages, shouldProceedWithUpload, isForwardedAttachment, dispatch });
 *
 * ```
 */
export declare const retainAttachmentIntoEditor: ({ caseId, attachments, dispatch, uuidForInlineImages, shouldProceedWithUpload, isForwardedAttachment, }: {
    caseId: string;
    attachments: import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[];
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
    uuidForInlineImages?: string[] | undefined;
    shouldProceedWithUpload?: import("react").MutableRefObject<boolean> | undefined;
    isForwardedAttachment?: boolean | undefined;
}) => Promise<void>;
/**
 * Generic function to Update only the provided fields of a target editor state object with values
 * from a Partial object, while skipping any fields whose values are undefined
 * @param targetContactEditorState - The state object whose fields should be updated.
 * @param updates - A partial object containing only the fields that should be
 * updated. Any key with a value of `undefined` will be ignored
 * @example
 * ```
 * updateFields(state[caseId], { isSendButtonEnabled: false, istextAddedInEditor: false });
 * ```
*/
export declare function updateFields<contactEditorObject extends object>(targetContactEditorState: contactEditorObject, updates: Partial<contactEditorObject>): void;
export {};
