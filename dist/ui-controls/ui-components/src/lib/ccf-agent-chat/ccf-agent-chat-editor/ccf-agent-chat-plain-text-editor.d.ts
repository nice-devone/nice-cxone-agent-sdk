import React from 'react';
import { EditorState, LexicalEditor } from 'lexical';
/**
 * interface for CcfAgentChatPlainTextEditorProps
 */
export interface CcfAgentChatPlainTextEditorProps {
    /**
   * @remarks  current editor state
   */
    editorState?: EditorState;
    /**
   * @remarks  callback method used handle on focus event
   */
    onFocus?: () => void;
    /**
* @remarks  callback method used handle on blur event
*/
    onBlur?: () => void;
    /**
* @remarks  callback method used to update editor state
*/
    onEditorStateChange: (editorState: EditorState, editor: LexicalEditor) => void;
    /**
* @remarks  Used to enable/disable the editor focus
*/
    isEditorFocused?: boolean;
    /**
   * @remarks  callback method used to handle on error event
   */
    onError: (error: Error, editor: LexicalEditor) => void;
    /**
    * @remarks  toolbar plugin
    */
    toolbarPlugin?: React.ReactNode;
    /**
* @remarks  callback Ref from contact editor
*/
    editorRef: React.RefObject<LexicalEditor>;
    /**
   * @remarks  update plugin
   */
    updatePlugin?: React.ReactNode;
    /**
    * @remarks  file upload plugin
    */
    fileUploadPlugin?: React.ReactNode;
    /**
 * @remarks  editor container reference
 */
    editorContainerRef: React.RefObject<HTMLElement>;
    /**
 * @remarks  caseId of selected contact
 */
    caseId: string;
    /**
    * @remarks  callback method to handle upload attachment
    */
    onUploadAttachment: (fileList: FileList) => void;
    /**
     * @remarks  callback method to handle enter key
     * @returns void
     */
    handleEnterKey?: () => void;
    /**
     * @remarks  allow send on enter
     */
    allowSendonEnter?: boolean;
    /**
     * @remarks placeholder for the editor
     */
    placeholder: JSX.Element;
    shouldDisplayDragDropZone: boolean;
}
/**
 * Component displays Rich text Editor
 * @returns Rich text Editor
 * ```
 * @example
 * <CcfAgentChatPlainTextEditor/>
 * ```
 */
export declare function CcfAgentChatPlainTextEditor({ editorState, onBlur, onFocus, onEditorStateChange, isEditorFocused, toolbarPlugin, onError, updatePlugin, editorRef, fileUploadPlugin, editorContainerRef, caseId, onUploadAttachment, handleEnterKey, allowSendonEnter, placeholder, shouldDisplayDragDropZone, }: CcfAgentChatPlainTextEditorProps): JSX.Element;
