/**
 * interface for CcfEditorToolbarPluginProps
 */
export interface CcfEditorToolbarPluginProps {
    /**
    * @remarks  show rich editor buttons
    */
    showRichToolBarButtons?: boolean;
    /**
    * @remarks  show file upload button
    */
    showFileUploadButton?: boolean;
    /**
     * @remarks  callback method used handle on upload attachment
     */
    onUploadAttachment?: (fileList: FileList) => void;
    /**
     * @remarks  selected digital contact case Id
     */
    caseId: string;
}
/**
 * Component for ccf Editor Toolbar Plugin
 * @returns toolbar plugin for editor
 * @example -
 * ```
 * <CcfAgentChatEditorToolbarPlugin/>
 * ```
 */
export declare function CcfAgentChatEditorToolbarPlugin({ showRichToolBarButtons, showFileUploadButton, onUploadAttachment, caseId }: CcfEditorToolbarPluginProps): JSX.Element;
export default CcfAgentChatEditorToolbarPlugin;
