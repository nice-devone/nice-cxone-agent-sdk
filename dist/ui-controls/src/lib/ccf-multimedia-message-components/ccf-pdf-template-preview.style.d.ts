import { Theme } from '@mui/material';
/**
 * renders the style for pdf message preview
 * @param props - Theme
 * @example <CcfPdfTemplatePreviewStyle />
 * @returns return the style for pdf message preview
 */
export declare const CcfPdfTemplatePreviewStyle: (theme: Theme) => {
    pdfPreview: {
        width: string;
        height: string;
        transform: string;
        transformOrigin: string;
    };
    pdfContainer: {
        width: string;
        height: string;
        border: string;
        overflow: string;
        pointerEvents: string;
    };
};
