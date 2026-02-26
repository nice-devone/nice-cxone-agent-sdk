import React from 'react';
import { EditorState, LexicalEditor } from 'lexical';
import { CXoneDigitalContactUserSavedProperties } from '@nice-devone/common-sdk';
/**
 * interface for CcfContactEditorProps
 */
export interface CcfEmailEditorProps {
    debouncedUpdateEditorState: (this: unknown, editorState: EditorState, editor: LexicalEditor) => void;
    onError: (error: Error, editor: LexicalEditor) => void;
    setScrollBottom: () => void;
    editorState: EditorState;
    isEditorFocused: boolean;
    editorContainerRef: React.RefObject<HTMLElement>;
    /**
    * @remarks  callback Ref from contact editor
    */
    editorRef: React.RefObject<LexicalEditor>;
    /**
    * @remarks  callback Ref for savedDigitalContact from contact editor
    */
    savedDigitalContactRef: React.MutableRefObject<CXoneDigitalContactUserSavedProperties | undefined>;
    /**
    * @remarks  update plugin to pass into rich text editor
    */
    updatePlugin?: React.ReactNode;
    /**
   * @remarks  callback method to handle upload attachment
   */
    onUploadAttachment: (fileList: FileList) => void;
    /**
    * @remarks  caseId of selected contact
    */
    id: string;
    caseId: string;
    interactionId?: string;
    closeTab?: (id: string) => void;
    onBlur?: () => void;
    handleEnterKey?: () => void;
    /**
     * @remarks  allow send on enter
     */
    allowSendonEnter?: boolean;
    /**
     * @remarks  copilot enabled flag
    */
    copilotEnabled?: boolean;
}
declare const _default: React.MemoExoticComponent<({ editorContainerRef, editorRef, savedDigitalContactRef, updatePlugin, debouncedUpdateEditorState, editorState, onError, isEditorFocused, onUploadAttachment, id, caseId, interactionId, closeTab, onBlur, handleEnterKey, allowSendonEnter, copilotEnabled, }: CcfEmailEditorProps) => JSX.Element>;
export default _default;
