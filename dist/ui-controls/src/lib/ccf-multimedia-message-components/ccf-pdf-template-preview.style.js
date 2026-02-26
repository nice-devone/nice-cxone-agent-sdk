/**
 * renders the style for pdf message preview
 * @param props - Theme
 * @example <CcfPdfTemplatePreviewStyle />
 * @returns return the style for pdf message preview
 */
export const CcfPdfTemplatePreviewStyle = (theme) => {
    var _a, _b;
    const style = {
        pdfPreview: {
            width: 'calc(100% + 20px)',
            height: '30vh',
            transform: 'scale(1.025)',
            transformOrigin: 'center',
        },
        pdfContainer: {
            width: '100%',
            height: '30vh',
            border: `1px solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.charcoleGrey}`,
            overflow: 'hidden',
            pointerEvents: 'none',
        },
    };
    return style;
};
//# sourceMappingURL=ccf-pdf-template-preview.style.js.map