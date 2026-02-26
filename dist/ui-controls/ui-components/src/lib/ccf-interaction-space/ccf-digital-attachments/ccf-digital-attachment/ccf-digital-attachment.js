import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useTheme } from '@mui/material';
import { AllowedResponseHeaders } from '@nice-devone/common-sdk';
import { CcfTooltip, CcfAppToastMessage, useTranslator, CcfBox } from '@nice-devone/ui-controls';
import { useState } from 'react';
import { downloadAttachment } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfIcon, { ATTACHMENT_ICON_SIZE } from '../../../ccf-icon/ccf-icon';
import { ATTACHMENT_ICON_NAME } from '../../../ccf-icon/ccf-icon-list';
import { AttachmentPreviewVariant } from '../model/ccf-attachment-preview-variant';
import { toast } from 'react-toastify';
import CcfDigitalAttachmentStyles from './ccf-digital-attachment-style';
import CcfAudioPlayer from '../../../ccf-audio-player/ccf-audio-player';
// Dev Comment: Using below regex to extract the filename from Content-Disposition header.
// It uses a regular expression to match the filename value and handles both quoted and unquoted formats.
// Example: 'attachment; filename="attachment.pdf"' or 'attachment; filename=attachment.pdf'
const FILENAME_EXTRACTION_REGEX = /filename="?([^"]+)"?/i;
/**
 * Type guard to safely access response headers.
 * Validates that the response is an object and contains a headers array.
 *
 * @param response - unknown value returned from the download API
 * @returns true when the response has a headers property
 *
 * @example
 * if (isHttpResponse(response)) \{
 *   // TypeScript now knows response.headers exists
 *   const header = response.headers.find(h =\> h.name === 'content-disposition');
 * \}
 */
const isHttpResponse = (response) => {
    return typeof response === 'object' && response !== null && 'headers' in response;
};
/**
 * Component to display digital email attachments which are not inline
 * @returns a wrapper looping through CcfDigitalAttachment items
 * ```
 * @example
 * <CcfDigitalAttachment
 * />
 *
 * ```
 */
export function CcfDigitalAttachment(props) {
    var _a, _b;
    const { togglePreviewMode, attachment, children, variant = AttachmentPreviewVariant.REGULAR, hideDownload = true, channelType, isInbound: isInboundDirection } = props;
    const { id, friendlyName, previewUrl, mimeType, url, } = attachment;
    //TODO: Use mimeType to show specific icon for pdf once icons are available
    const isRegular = variant === AttachmentPreviewVariant.REGULAR; // this flag will let us know about the view for attachment is regular or not
    const size = isRegular ? '99px' : '60px'; // if view requested is regular then the size of attachment will be 99px otherwise 60px
    const [toolTipOpen, UpdateTooltipOpen] = useState(false); // this local state will be used to toggle the tooltip 
    const [toolTipName, UpdateToolTipName] = useState(attachment.friendlyName); // this local state will be used to update tooltip name
    const theme = useTheme();
    const styles = CcfDigitalAttachmentStyles(theme, size, isRegular);
    const [translate] = useTranslator();
    /**
     * Used to toggle the tooltip
     * @example
     * ```
     * toggleTooltip();
     * ```
     */
    const toggleTooltip = () => {
        UpdateTooltipOpen(!toolTipOpen);
        UpdateToolTipName(attachment.friendlyName); // if we move out of attachment sent this will show the attachment name
    };
    /**
     * Method to download attachment using api call
     * @param attachment - current attachment object
     * @example
     * ```
     * downloadFileAttachment(attachment)
     * ```
     */
    const downloadFileAttachment = (attachment) => {
        toast.info(_jsx(CcfAppToastMessage, { type: "info", messageKey: "downloadInfo" }), {
            autoClose: 1000,
            containerId: 'ComponentToastContainer',
        });
        if (!attachment.blobUrl) {
            downloadAttachment(attachment.securedPermanentUrl, true)
                .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                attachment.blobUrl = url;
                let filename = '';
                if (isHttpResponse(response)) {
                    const header = response.headers.find((headerItem) => headerItem.name.toLowerCase() === AllowedResponseHeaders.CONTENT_DISPOSITION);
                    if (header === null || header === void 0 ? void 0 : header.value) {
                        // This block extracts the filename from the Content-Disposition header if present.
                        // If the filename is not found, fallback logic below will use friendlyName.
                        const match = header.value.match(FILENAME_EXTRACTION_REGEX);
                        if (match === null || match === void 0 ? void 0 : match[1]) {
                            filename = match[1].trim();
                        }
                    }
                }
                // Fallback to friendlyName if header is missing
                if (!filename) {
                    filename = attachment.friendlyName || 'download';
                }
                attachment.fileName = filename;
                createDownloadAnchor(url, filename);
            })
                .catch(() => {
                toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: "downloadError" }), { autoClose: 2000, containerId: 'ComponentToastContainer' });
            });
        }
        else {
            // Already downloaded, just use blobUrl and existing fileName
            const filename = attachment.fileName || attachment.friendlyName || 'download';
            createDownloadAnchor(attachment.blobUrl, filename);
        }
    };
    /**
     * Create file download anchor tag
     * @example
     * ```
     * createDownloadAnchor(url, attachment.friendlyName);
     * ```
     */
    const createDownloadAnchor = (value, name) => {
        var _a;
        const link = document.createElement('a');
        link.href = value;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
        (_a = link === null || link === void 0 ? void 0 : link.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(link);
    };
    /**
     * To open new tab to preview video attachment
     * @example
     * ```
     * openNewTabForVideoPreview();
     * ```
     */
    const openNewTabForVideoPreview = () => window.open(url, '_blank');
    const isImage = mimeType === null || mimeType === void 0 ? void 0 : mimeType.includes('image');
    const isPdf = mimeType === null || mimeType === void 0 ? void 0 : mimeType.includes('pdf');
    //for video attachment of Instagram channel only preview is given and for video attachments of other channels download option is given same as DFO
    const previewOnlyVideoAttachment = (mimeType === null || mimeType === void 0 ? void 0 : mimeType.includes('video')) && channelType === 'ig';
    return (_jsxs(CcfBox, { children: [!((_a = attachment.mimeType) === null || _a === void 0 ? void 0 : _a.includes('audio')) &&
                _jsx(CcfTooltip, Object.assign({ open: toolTipOpen && !isRegular, title: toolTipName || '', arrow: true, disableHoverListener: true, disableInteractive: true }, { children: _jsxs(Box, Object.assign({ component: "div", sx: styles.wrapper, onMouseEnter: () => toggleTooltip(), onMouseLeave: () => toggleTooltip(), "data-testid": "attachment-box" }, { children: [previewUrl && _jsx(Box, { component: "img", src: url, width: size, height: size, alt: "", sx: styles.image }), isPdf && _jsxs(Box, Object.assign({ component: "div", sx: styles.image }, { children: [" ", _jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.PDF, size: ATTACHMENT_ICON_SIZE.MEDIUM, customStyle: styles.pdfLargeIcon }), " "] })), _jsxs(Box, Object.assign({ component: "div", sx: styles.actions }, { children: [_jsxs(Box, Object.assign({ component: "div", sx: styles.metaData }, { children: [isImage && _jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.IMAGE, customStyle: styles.imageIcon }), isPdf && _jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.PDF, customStyle: styles.imageIcon }), !isImage && !isPdf && _jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.DOCUMENT, customStyle: styles.imageIcon }), isRegular &&
                                                _jsx(Box, Object.assign({ component: "span", sx: styles.attachmentDetails, title: friendlyName }, { children: _jsx("span", { children: friendlyName }) }))] })), _jsxs(Box, Object.assign({ component: "div", sx: styles.icons }, { children: [previewUrl &&
                                                _jsxs(Box, Object.assign({ component: "span", role: "button", tabIndex: 0, onKeyUp: (e) => {
                                                        if (e.key === 'Enter') {
                                                            toggleTooltip();
                                                            togglePreviewMode(id);
                                                        }
                                                    }, sx: styles.icon, onMouseEnter: () => UpdateToolTipName(`Preview-${attachment.friendlyName}`), onMouseLeave: () => UpdateToolTipName(attachment.friendlyName), onClick: () => {
                                                        toggleTooltip();
                                                        togglePreviewMode(id);
                                                    }, "data-testid": 'previewButton' }, { children: [_jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.PREVIEW, size: ATTACHMENT_ICON_SIZE.MEDIUM, customStyle: styles.previewIcon }), isRegular && _jsx("span", { children: translate('preview') })] })), (!hideDownload) &&
                                                _jsxs(Box, Object.assign({ component: "span", role: "button", tabIndex: 0, onKeyUp: (e) => { if (e.key === 'Enter')
                                                        downloadFileAttachment(attachment); }, onClick: () => downloadFileAttachment(attachment), onMouseEnter: () => UpdateToolTipName(`Download-${attachment.friendlyName}`), onMouseLeave: () => UpdateToolTipName(attachment.friendlyName), sx: styles.icon, "data-testid": 'downloadButton' }, { children: [_jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.DOWNLOAD, size: ATTACHMENT_ICON_SIZE.MEDIUM, customStyle: styles.previewIcon }), isRegular && _jsx("span", { children: translate('download') })] })), previewOnlyVideoAttachment &&
                                                _jsxs(Box, Object.assign({ component: "span", role: "button", tabIndex: 0, onKeyUp: (e) => {
                                                        if (e.key === 'Enter') {
                                                            toggleTooltip();
                                                            openNewTabForVideoPreview();
                                                        }
                                                    }, sx: styles.icon, onMouseEnter: () => UpdateToolTipName(`Preview-${attachment.friendlyName}`), onMouseLeave: () => UpdateToolTipName(attachment.friendlyName), onClick: () => {
                                                        toggleTooltip();
                                                        openNewTabForVideoPreview();
                                                    }, "data-testid": 'previewButtonForVideo' }, { children: [_jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.PREVIEW, size: ATTACHMENT_ICON_SIZE.MEDIUM, customStyle: styles.previewIcon }), isRegular && _jsx("span", { children: translate('preview') })] }))] }))] })), children] })) })), (attachment.url && ((_b = attachment.mimeType) === null || _b === void 0 ? void 0 : _b.includes('audio'))) &&
                _jsx(Box, Object.assign({ component: "div", sx: styles.audioAttachment }, { children: _jsx(CcfAudioPlayer, { audioUrl: attachment.url, isInbound: isInboundDirection, attachment: attachment, shouldShowDownloadIcon: true, fileName: attachment.fileName || '', handleDownloadAttachment: downloadFileAttachment }) }))] }));
}
export default CcfDigitalAttachment;
//# sourceMappingURL=ccf-digital-attachment.js.map