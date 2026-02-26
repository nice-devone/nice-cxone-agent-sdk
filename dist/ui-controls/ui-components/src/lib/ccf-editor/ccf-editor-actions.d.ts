import React from 'react';
import { LexicalEditor } from 'lexical';
import { CXoneDigitalContactUserSavedProperties } from '@nice-devone/common-sdk';
export interface CcfEditorActionsProps {
    id?: string;
    caseId?: string;
    interactionId?: string;
    closeTab?: (id: string) => void;
    /**
    * @remarks  callback Ref from contact editor
    */
    editorRef: React.RefObject<LexicalEditor>;
    /**
    * @remarks  callback Ref for savedDigitalContact from contact editor
    */
    savedDigitalContactRef: React.MutableRefObject<CXoneDigitalContactUserSavedProperties | undefined>;
    /**
     * @remarks - set local editor state to redux for chat messages on send button click
     */
    setLocalEditorState?: () => void;
    /**
     * @remarks  copilot enabled flag
    */
    copilotEnabled?: boolean;
}
declare const _default: React.MemoExoticComponent<({ id, caseId, interactionId, closeTab, editorRef, savedDigitalContactRef, setLocalEditorState, copilotEnabled, }: CcfEditorActionsProps) => JSX.Element>;
export default _default;
