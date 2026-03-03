import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme, Box, useMediaQuery } from '@mui/material';
import { MultimediaTypes, DigitalMessageContentTypes } from '@nice-devone/common-sdk';
import { useEffect, useRef } from 'react';
import { CcfMultimediaStyle } from './ccf-multimedia-message.style';
import parse from 'html-react-parser';
import { CcfTypography } from '../core';
import { CcfPdfTemplatePreview } from './ccf-pdf-template-preview';
/**
 * Renders the multimedia message
 * @param props - CcfContactRichMessageProps
 * @example <CcfMultimediaMessage />
 * @returns  multimedia message
 */
export const CcfMultimediaMessage = (props) => {
    var _a;
    const theme = useTheme();
    const classes = CcfMultimediaStyle(theme);
    const { message, messageActionMenu } = props;
    const payload = (_a = message.messageContent) === null || _a === void 0 ? void 0 : _a.payload;
    const [multimediaElement] = (payload === null || payload === void 0 ? void 0 : payload.elements) || [];
    const [multimediaHeader, multimediaBody] = (multimediaElement === null || multimediaElement === void 0 ? void 0 : multimediaElement.elements) || [];
    const multimediaTemplate = useRef(null);
    const pdfLink = useRef(null);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    useEffect(() => {
        var _a, _b;
        // updating the style of parent element to avoid extra padding and background color
        if ((_a = multimediaTemplate === null || multimediaTemplate === void 0 ? void 0 : multimediaTemplate.current) === null || _a === void 0 ? void 0 : _a.parentElement) {
            const containerStyle = Object.assign(Object.assign({}, classes.templateMessageRoot), { maxWidth: isSmallScreen ? '90%' : classes.templateMessageRoot.maxWidth });
            Object.assign(multimediaTemplate.current.parentElement.style, containerStyle);
            if (pdfLink === null || pdfLink === void 0 ? void 0 : pdfLink.current) {
                // Dev Note: setting the width of pdf link. 105 px adjusted with width of the icons plus padding.
                pdfLink.current.style.maxWidth = `${((_b = multimediaTemplate.current.parentElement) === null || _b === void 0 ? void 0 : _b.offsetWidth) - 105}px`;
            }
        }
    }, [classes.templateMessageRoot]);
    /**
     * Function to render multimedia text
     * @param element - can be multimedia template element or multimedia template body
     * @returns Parsed multimedia text
     * @example renderMultimediaText(multimediaElement)
     */
    const renderMultimediaText = (templateText) => {
        var _a;
        return (_jsx(CcfTypography, Object.assign({ sx: classes.templateTextStyle }, { children: (_a = templateText === null || templateText === void 0 ? void 0 : templateText.split('\n')) === null || _a === void 0 ? void 0 : _a.map((content) => (_jsxs(_Fragment, { children: [parse(content), _jsx("br", {}, `line-${content}`)] }))) })));
    };
    return (_jsx(Box, Object.assign({ ref: multimediaTemplate, sx: classes.multimediaContainer }, { children: _jsxs(Box, Object.assign({ sx: classes.templateContainer }, { children: [_jsxs(Box, { children: [(multimediaHeader === null || multimediaHeader === void 0 ? void 0 : multimediaHeader.mimeType) === MultimediaTypes.VIDEO_MP4 && (_jsxs("video", Object.assign({ controls: true, style: Object.assign({}, classes.videoControl) }, { children: [_jsx("track", { kind: "captions", src: "", srcLang: "en", label: "English", default: true }), _jsx("source", { src: multimediaHeader.url, type: MultimediaTypes.VIDEO_MP4 })] }))), ((multimediaHeader === null || multimediaHeader === void 0 ? void 0 : multimediaHeader.mimeType) === MultimediaTypes.IMAGE_JPEG ||
                            (multimediaHeader === null || multimediaHeader === void 0 ? void 0 : multimediaHeader.mimeType) === MultimediaTypes.IMAGE_JPG ||
                            (multimediaHeader === null || multimediaHeader === void 0 ? void 0 : multimediaHeader.mimeType) === MultimediaTypes.IMAGE_PNG) && (_jsx("img", { src: multimediaHeader.url, alt: multimediaHeader.filename, style: Object.assign({}, classes.videoControl) })), (multimediaHeader === null || multimediaHeader === void 0 ? void 0 : multimediaHeader.mimeType) === MultimediaTypes.PDF && (_jsx(CcfPdfTemplatePreview, { sourceUrl: multimediaHeader.url, fileName: multimediaHeader.filename, isPreview: false }))] }), _jsxs(Box, Object.assign({ sx: classes.bodyContent }, { children: [(multimediaElement === null || multimediaElement === void 0 ? void 0 : multimediaElement.type) === DigitalMessageContentTypes.TEXT_TEMPLATE
                            ? renderMultimediaText(multimediaElement === null || multimediaElement === void 0 ? void 0 : multimediaElement.text)
                            : renderMultimediaText(multimediaBody === null || multimediaBody === void 0 ? void 0 : multimediaBody.text), _jsx(Box, Object.assign({ sx: classes.menuStyle }, { children: messageActionMenu !== null && messageActionMenu !== void 0 ? messageActionMenu : null }))] }))] })) })));
};
//# sourceMappingURL=ccf-multimedia-message.js.map