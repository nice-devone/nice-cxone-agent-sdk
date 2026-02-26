import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useRef } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { MultimediaTypes } from '@nice-devone/common-sdk';
import { CcfPdfTemplatePreviewStyle } from './ccf-pdf-template-preview.style';
/**
 * PDF template preview
 * @returns return the PDF template preview
 * @param pdfElement - Props for the pdf template preview
 * @example <CcfPdfTemplatePreview />
 */
export const CcfPdfTemplatePreview = (pdfElement) => {
    const theme = useTheme();
    const styles = CcfPdfTemplatePreviewStyle(theme);
    const pdfTemplate = useRef(null);
    const [isPdfRendered, setIsPdfRendered] = React.useState(false);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg')); // small and medium screen for integrated agent
    const isLargeScreen = useMediaQuery('(min-height: 900px)'); // large screen for big screen when height is more than 900px
    let pdfElementStyle = Object.assign(Object.assign({}, styles.pdfPreview), { height: isLargeScreen ? '27vh' : styles.pdfPreview.height });
    // Dev Note: for the integrated agent on big screen both isLargeScreen and isSmallScreen will be true
    if (isLargeScreen && isSmallScreen) {
        pdfElementStyle = Object.assign(Object.assign({}, styles.pdfPreview), { height: '22vh' });
    }
    useEffect(() => {
        var _a, _b, _c, _d;
        if ((_a = pdfTemplate === null || pdfTemplate === void 0 ? void 0 : pdfTemplate.current) === null || _a === void 0 ? void 0 : _a.parentElement) {
            let containerHeight = (_b = styles === null || styles === void 0 ? void 0 : styles.pdfContainer) === null || _b === void 0 ? void 0 : _b.height;
            let containerWidth = (_c = styles === null || styles === void 0 ? void 0 : styles.pdfContainer) === null || _c === void 0 ? void 0 : _c.width;
            if (isSmallScreen) {
                containerHeight = '22vh';
                containerWidth = pdfElement.isPreview ? '85%' : (_d = styles === null || styles === void 0 ? void 0 : styles.pdfContainer) === null || _d === void 0 ? void 0 : _d.width;
            }
            else if (isLargeScreen) {
                containerHeight = '27vh';
            }
            const pdfStyle = Object.assign(Object.assign({}, styles.pdfContainer), { height: containerHeight, width: containerWidth });
            Object.assign(pdfTemplate.current.parentElement.style, pdfStyle);
            setIsPdfRendered(true);
        }
    }, [styles.pdfContainer, pdfElement.isPreview]);
    return (_jsx(Box, Object.assign({ ref: pdfTemplate }, { children: isPdfRendered && (_jsx("object", Object.assign({ data: pdfElement.sourceUrl, type: MultimediaTypes.PDF, style: pdfElementStyle }, { children: _jsx("iframe", { src: pdfElement.sourceUrl, title: "PDF preview", style: pdfElementStyle }) }))) })));
};
//# sourceMappingURL=ccf-pdf-template-preview.js.map