/**
 * interface for dragDropPastePlugin
 */
export interface DragDropPastePlugin {
    /**
     * @remarks  selected digital contact case Id
     */
    caseId: string;
    style: Record<string, unknown>;
    /**
    * @remarks  callback method to handle upload attachment
    */
    onUploadAttachment: (fileList: FileList) => void;
    /**
     * @remarks  Flag indicating whether rich text editor is enabled.
     */
    isRichTextEditor?: boolean;
}
/**
 * Component to show drop dialog message
 * @returns text 'Drop your files here'
 * ```
 * @example
 * <CcfDragDropPastePlugin/>
 * ```
 */
export declare const CcfDragDropPastePlugin: ({ caseId, style, onUploadAttachment, isRichTextEditor }: DragDropPastePlugin) => JSX.Element | null;
