/// <reference types="react" />
import { EditorState, LexicalEditor } from 'lexical';
import { CXoneDigitalContactUserSavedProperties } from '@nice-devone/common-sdk';
/**
 * interface for CcfRichTextEditorProps
 */
export interface CcfRichTextEditorProps {
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
   * @remarks  callback Ref from contact editor
   */
    editorRef: React.RefObject<LexicalEditor>;
    /**
    * @remarks  update plugin
    */
    updatePlugin?: React.ReactNode;
    /**
     * @remarks  toolbar plugin
     */
    toolbarPlugin?: React.ReactNode;
    /**
  * @remarks  file upload plugin
  */
    fileUploadPlugin?: React.ReactNode;
    /**
    * @remarks  editor container reference
    */
    editorContainerRef: React.RefObject<HTMLElement>;
    /**
      * @remarks checks with the contact is outbound or not
     */
    isOBContact: boolean;
    /**
      * @remarks caseId of selected contact
     */
    caseId: string;
    /**
   * @remarks  callback method to handle upload attachment
   */
    onUploadAttachment: (fileList: FileList) => void;
    /**
     * @remarks show or hide Drag n Drop Zone based on Channel flag value
     */
    shouldDisplayDragDropZone?: boolean;
    /**
      * @remarks  callback Ref for savedDigitalContact from contact editor
    */
    savedDigitalContactRef?: React.MutableRefObject<CXoneDigitalContactUserSavedProperties | undefined>;
    /**
     * @remarks closeTab used for editor Actions
     */
    closeTab?: (id: string) => void;
    /**
     * @remarks closeTab used for editor Actions
     */
    id?: string;
    /**
     * @remarks current interaction Id
     */
    interactionId?: string;
    /**
     * @remarks  copilot enabled flag
    */
    copilotEnabled?: boolean;
    /**
    * @remarks flag used for email editor subject line expand/collapse
    */
    headerExpandCollapse?: boolean;
}
/**
 * Component displays Rich text Editor
 * @returns Rich text Editor
 * ```
 * @example
 * <CcfRichTextEditor/>
 * ```
 */
export declare function CcfRichTextEditor({ editorState, onBlur, onFocus, onEditorStateChange, onError, toolbarPlugin, updatePlugin, editorRef, fileUploadPlugin, editorContainerRef, isOBContact, caseId, onUploadAttachment, shouldDisplayDragDropZone, savedDigitalContactRef, closeTab, id, interactionId, copilotEnabled, headerExpandCollapse }: CcfRichTextEditorProps): JSX.Element;
