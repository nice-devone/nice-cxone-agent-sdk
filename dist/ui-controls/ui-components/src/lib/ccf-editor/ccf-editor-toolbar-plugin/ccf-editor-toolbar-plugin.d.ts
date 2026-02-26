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
    /**
     * @remarks  copilot enabled flag
     */
    copilotEnabled?: boolean;
    /**
     * @remarks  true - display new revamp design related elements
     */
    displayNewEmailButtons?: boolean;
}
/**
 * Component for ccf Editor Toolbar Plugin
 * @returns toolbar plugin for editor
 * @example -
 * ```
 * <CcfEditorToolbarPlugin/>
 * ```
 */
export declare function CcfEditorToolbarPlugin({ showRichToolBarButtons, showFileUploadButton, onUploadAttachment, caseId, copilotEnabled, displayNewEmailButtons }: CcfEditorToolbarPluginProps): JSX.Element;
export default CcfEditorToolbarPlugin;
