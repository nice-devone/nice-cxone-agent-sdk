/**
 * Props for the pdf template preview
 */
export interface CcfPdfTemplatePreviewProps {
    /**
     * sourceUrl - source url of the pdf
     */
    sourceUrl: string;
    /**
     * fileName - name of the file
     */
    fileName: string;
    /**
     * isPreview - boolean value to check if it is preview
     */
    isPreview: boolean;
}
/**
 * PDF template preview
 * @returns return the PDF template preview
 * @param pdfElement - Props for the pdf template preview
 * @example <CcfPdfTemplatePreview />
 */
export declare const CcfPdfTemplatePreview: (pdfElement: CcfPdfTemplatePreviewProps) => JSX.Element;
