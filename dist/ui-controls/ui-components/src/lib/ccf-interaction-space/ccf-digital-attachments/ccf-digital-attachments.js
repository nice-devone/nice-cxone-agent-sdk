import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Grid, useTheme } from '@mui/material';
import { CcfBox, CcfSearchIcon, CcfAppToastMessage, useTranslator, CcfTypography, } from '@nice-devone/ui-controls';
import CcfDigitalAttachmentsStyles from './ccf-digital-attachments-style';
import { useState } from 'react';
import CcfDigitalAttachment from './ccf-digital-attachment/ccf-digital-attachment';
import { AttachmentPreviewVariant } from './model/ccf-attachment-preview-variant';
import { CcfAttachmentJustify } from './model/ccf-attachment-justify';
import CcfIcon, { ATTACHMENT_ICON_SIZE } from '../../ccf-icon/ccf-icon';
import { ATTACHMENT_ICON_NAME } from '../../ccf-icon/ccf-icon-list';
import { downloadAllAttachment, downloadAttachment } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { toast } from 'react-toastify';
/**
 * Enum for attachment type
 */
export var ATTACHMENT_TYPE;
(function (ATTACHMENT_TYPE) {
    ATTACHMENT_TYPE["AUDIO"] = "audio";
})(ATTACHMENT_TYPE || (ATTACHMENT_TYPE = {}));
/**
 * Component to display digital attachments which are not inline
 * @returns a wrapper looping through CcfDigitalAttachment items
 * ```
 * @example
 * <CcfDigitalAttachments
 * />
 *
 * ```
 */
export function CcfDigitalAttachments({ attachments, justifyContent = CcfAttachmentJustify.LEFT, variant = AttachmentPreviewVariant.REGULAR, hideDownload = true, isPreviousCaseMessage, channelType, messageSubject = '', caseId = '', isInboundDirection, isNextCaseMessage, }) {
    const theme = useTheme();
    const [isPreviewMode, setPreviewMode] = useState(false);
    const [imageTransformScale, setImageTransformScale] = useState(1);
    const [currentPreviewUrl, setCurrentPreviewUrl] = useState('');
    const [currentPreviewBlobUrl, setCurrentPreviewBlobUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const isRegular = variant === AttachmentPreviewVariant.REGULAR; // this flag will let us know about the view for attachment is regular or not
    const styles = CcfDigitalAttachmentsStyles(theme, isRegular);
    const [translate] = useTranslator();
    const mailAttachments = attachments === null || attachments === void 0 ? void 0 : attachments.filter((attachment) => !attachment.isInline);
    const nonAudioAttachments = mailAttachments === null || mailAttachments === void 0 ? void 0 : mailAttachments.filter((attachment) => { var _a; return !((_a = attachment.mimeType) === null || _a === void 0 ? void 0 : _a.includes('audio')); });
    const audioAttachments = mailAttachments === null || mailAttachments === void 0 ? void 0 : mailAttachments.filter((attachment) => { var _a; return attachment.url && ((_a = attachment.mimeType) === null || _a === void 0 ? void 0 : _a.includes('audio')); });
    const allAttachmentsWithPreview = attachments === null || attachments === void 0 ? void 0 : attachments.filter((attachment) => attachment.previewUrl && !attachment.isInline); // For inline images we will only have a single preview even if we have multiple inline attachments
    /**
     * Method to preview previous attachment
     * ```
     * @example
     * previewPrevious(attachment)
     * />
     *
     * ```
     */
    const previewPrevious = (attachment) => {
        if (!isLeftPreviewAvailable(attachment)) {
            return;
        }
        const currentAttachmentIndex = allAttachmentsWithPreview === null || allAttachmentsWithPreview === void 0 ? void 0 : allAttachmentsWithPreview.findIndex((a) => a.id === attachment.id);
        if (allAttachmentsWithPreview &&
            currentAttachmentIndex <= allAttachmentsWithPreview.length - 1) {
            setCurrentPreviewUrl(allAttachmentsWithPreview[currentAttachmentIndex - 1].previewUrl);
            handlePreviewAttachment(allAttachmentsWithPreview[currentAttachmentIndex - 1]);
        }
    };
    /**
     * Method to check if previous attachment exist of if this is the first attachment
     * ```
     * @example
     * isLeftPreviewAvailable()
     * />
     *
     * ```
     */
    const isLeftPreviewAvailable = (attachment) => {
        const currentAttachmentIndex = allAttachmentsWithPreview === null || allAttachmentsWithPreview === void 0 ? void 0 : allAttachmentsWithPreview.findIndex((a) => a.id === attachment.id);
        if (currentAttachmentIndex === 0) {
            return false;
        }
        return true;
    };
    /**
     * Method to check if next attachment exist of if this is the last attachment
     * ```
     * @example
     * isRightPreviewAvailable()
     * />
     *
     * ```
     */
    const isRightPreviewAvailable = (attachment) => {
        const currentAttachmentIndex = allAttachmentsWithPreview === null || allAttachmentsWithPreview === void 0 ? void 0 : allAttachmentsWithPreview.findIndex((a) => a.id === attachment.id);
        if ((allAttachmentsWithPreview === null || allAttachmentsWithPreview === void 0 ? void 0 : allAttachmentsWithPreview.length) &&
            currentAttachmentIndex === (allAttachmentsWithPreview === null || allAttachmentsWithPreview === void 0 ? void 0 : allAttachmentsWithPreview.length) - 1) {
            return false;
        }
        return true;
    };
    /**
     * Method to preview next attachment
     * ```
     * @example
     * previewNext(attachment)
     * />
     *
     * ```
     */
    const previewNext = (attachment) => {
        if (!isRightPreviewAvailable(attachment)) {
            return;
        }
        const currentAttachmentIndex = allAttachmentsWithPreview === null || allAttachmentsWithPreview === void 0 ? void 0 : allAttachmentsWithPreview.findIndex((a) => a.id === attachment.id);
        if (allAttachmentsWithPreview && currentAttachmentIndex >= 0) {
            setCurrentPreviewUrl(allAttachmentsWithPreview[currentAttachmentIndex + 1].previewUrl);
            handlePreviewAttachment(allAttachmentsWithPreview[currentAttachmentIndex + 1]);
        }
    };
    /**
     * Method to toggle preview mode (i.e. open/close modal)
     * ```
     * @example
     * handleTogglePreviewMode(id)
     * />
     *
     * ```
     */
    const handleTogglePreviewMode = (id) => {
        if (!isPreviewMode) {
            const currentAttachment = allAttachmentsWithPreview === null || allAttachmentsWithPreview === void 0 ? void 0 : allAttachmentsWithPreview.find((a) => a.id === id);
            if (currentAttachment) {
                setCurrentPreviewUrl(currentAttachment === null || currentAttachment === void 0 ? void 0 : currentAttachment.previewUrl);
                handlePreviewAttachment(currentAttachment);
            }
        }
        setPreviewMode(!isPreviewMode);
    };
    /**
     * Method to associate blob data on preview
     * @param currentAttachment - current processed attachment
     * @example
     * ```
     * handlePreviewAttachment(id)
     * ```
     */
    const handlePreviewAttachment = (currentAttachment) => {
        var _a;
        if (!(currentAttachment === null || currentAttachment === void 0 ? void 0 : currentAttachment.blobUrl)) {
            setIsLoading(true);
            // Below condition added, because Instagram customer sent attachment will be given as preview only feature through CDN url.
            const checkPreviewUrl = ((_a = currentAttachment === null || currentAttachment === void 0 ? void 0 : currentAttachment.securedPermanentUrl) === null || _a === void 0 ? void 0 : _a.indexOf('dfo/3.0/attachments')) > -1 ? true : false;
            if (checkPreviewUrl) {
                downloadAttachment(currentAttachment === null || currentAttachment === void 0 ? void 0 : currentAttachment.securedPermanentUrl, true).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    setCurrentPreviewBlobUrl(url);
                    currentAttachment.blobUrl = url;
                    setIsLoading(false);
                }).catch(() => {
                    setIsLoading(false);
                    toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: 'downloadError' }), {
                        autoClose: 2000,
                        containerId: 'ComponentToastContainer',
                    });
                    setPreviewMode(false);
                });
            }
            else {
                setCurrentPreviewBlobUrl(currentAttachment === null || currentAttachment === void 0 ? void 0 : currentAttachment.securedPermanentUrl);
                setIsLoading(false);
            }
        }
        else {
            setCurrentPreviewBlobUrl(currentAttachment === null || currentAttachment === void 0 ? void 0 : currentAttachment.blobUrl);
        }
    };
    /**
     * Method to check if further zoom in of attachment possible in preview mode
     * ```
     * @example
     * zoomInPossible()
     * />
     *
     * ```
     */
    const zoomInPossible = () => {
        if (imageTransformScale < (window.innerWidth < 425 ? 1.5 : 1.2)) {
            return true;
        }
        return false;
    };
    /**
     * Method to check if further zoom out of attachment possible in preview mode
     * ```
     * @example
     * zoomOutPossible()
     * />
     *
     * ```
     */
    const zoomOutPossible = () => {
        if (imageTransformScale > 0.8) {
            return true;
        }
        return false;
    };
    /**
     * Method to zoom in to increase the size of attachment in preview
     * ```
     * @example
     * handleZoomIn()
     * />
     *
     * ```
     */
    const handleZoomIn = () => {
        if (zoomInPossible()) {
            setImageTransformScale(imageTransformScale * 1.01);
        }
    };
    /**
     * Method to zoom out to decrease the size of attachment in preview
     * ```
     * @example
     * handleZoomOut()
     * />
     *
     * ```
     */
    const handleZoomOut = () => {
        if (zoomOutPossible()) {
            setImageTransformScale(imageTransformScale / 1.01);
        }
    };
    /**
     * Method to preview attachments
     * @returns a modal view
     * ```
     * @example
     * renderModal()
     * />
     *
     * ```
     */
    const renderModal = (attachment) => {
        var _a, _b;
        const isImage = (_a = attachment.mimeType) === null || _a === void 0 ? void 0 : _a.includes('image');
        const isPdf = (_b = attachment.mimeType) === null || _b === void 0 ? void 0 : _b.includes('pdf');
        return (_jsxs(Box, Object.assign({ component: 'div', sx: styles.modal }, { children: [!isLoading ? (_jsxs(_Fragment, { children: [_jsxs(Box, Object.assign({ component: 'div', sx: styles.topMenuBar }, { children: [_jsxs(Box, Object.assign({ component: 'span', role: "button", tabIndex: 0, onKeyUp: (e) => { if (e.key === 'Enter')
                                        setPreviewMode(!isPreviewMode); }, sx: styles.back, onClick: () => setPreviewMode(!isPreviewMode), "data-testid": 'preview-mode' }, { children: [_jsx(Box, { component: 'span', sx: styles.arrowLeft }), "Back"] })), !isPreviousCaseMessage && !isNextCaseMessage && !hideDownload
                                    && _jsx("a", Object.assign({ href: currentPreviewBlobUrl, download: attachment.friendlyName }, { children: _jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.DOWNLOAD, customStyle: styles.downloadIcon, size: ATTACHMENT_ICON_SIZE.MEDIUM }) })), _jsx("span", Object.assign({ role: "button", tabIndex: 0, onKeyUp: (e) => { if (e.key === 'Enter')
                                        setPreviewMode(!isPreviewMode); }, onClick: () => setPreviewMode(!isPreviewMode), "data-testid": 'preview-mode-span' }, { children: _jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.CLOSE, size: ATTACHMENT_ICON_SIZE.MEDIUM, customStyle: styles.closeIcon }) }))] })), _jsxs(Box, Object.assign({ component: 'div', sx: styles.modalImageWrapper }, { children: [_jsxs(Box, Object.assign({ component: 'div', sx: styles.modalImageSubWrapper }, { children: [_jsx(Box, { component: 'span', role: "button", tabIndex: 0, onKeyUp: (e) => { if (e.key === 'Enter')
                                                previewPrevious(attachment); }, sx: Object.assign(Object.assign(Object.assign({}, styles.arrowLeft), styles.previousAttachmentArrow), (!isLeftPreviewAvailable(attachment) ? styles.disabled : '')), onClick: () => previewPrevious(attachment), "data-testid": 'previous-button' }), _jsx(Box, { component: "img", src: currentPreviewBlobUrl, style: { transform: `scale(${imageTransformScale})` }, sx: Object.assign({}, styles.previewImage), alt: "preview" }), _jsx(Box, { component: 'span', role: "button", tabIndex: 0, onKeyUp: (e) => { if (e.key === 'Enter')
                                                previewNext(attachment); }, sx: Object.assign(Object.assign({}, styles.arrowRight), (!isRightPreviewAvailable(attachment) ? styles.disabled : '')), onClick: () => previewNext(attachment), "data-testid": 'next-button' })] })), _jsxs(Box, Object.assign({ component: 'div', sx: styles.zoomBar }, { children: [_jsx(Box, Object.assign({ component: 'div', sx: Object.assign(Object.assign({}, styles.zoomMinusIcon), (!zoomOutPossible() ? styles.zoomDisabled : '')), role: "button", tabIndex: 0, onKeyUp: (e) => { if (e.key === 'Enter')
                                                handleZoomOut(); }, onClick: handleZoomOut, "data-testid": 'zoom-out' }, { children: "\u2212" })), _jsx(Box, Object.assign({ component: 'div', sx: styles.zoomSearchIcon }, { children: _jsx(CcfSearchIcon, {}) })), _jsx(Box, Object.assign({ component: 'div', sx: Object.assign(Object.assign({}, styles.zoomPlusIcon), (!zoomInPossible() ? styles.zoomDisabled : '')), role: "button", tabIndex: 0, onKeyUp: (e) => { if (e.key === 'Enter')
                                                handleZoomIn(); }, onClick: () => handleZoomIn(), "data-testid": 'zoom-in' }, { children: "+" }))] })), _jsxs(Box, Object.assign({ component: 'div', sx: styles.bottomBar }, { children: [_jsxs("span", { children: [isImage && _jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.IMAGE, size: ATTACHMENT_ICON_SIZE.MEDIUM, customStyle: styles.fileIcon }), isPdf && _jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.PDF, size: ATTACHMENT_ICON_SIZE.MEDIUM, customStyle: styles.fileIcon }), !isImage && !isPdf && _jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.DOCUMENT, size: ATTACHMENT_ICON_SIZE.MEDIUM, customStyle: styles.fileIcon })] }), _jsx(Box, Object.assign({ component: 'span', sx: styles.attachmentDetails }, { children: _jsx("span", { children: attachment.friendlyName }) }))] }))] }))] })) :
                    (_jsx(CcfBox, { children: _jsx("div", { className: "loader" }) })), ";"] })));
    };
    /**
   * Handles the download of all attachments.
   * This function collects attachment IDs, constructs the API URL, and triggers the download process.
   * @param attachments - Optional list of attachments.
   * @returns
   * @example
   * ```
   * handleDownloadAll(attachments)
   * ```
   */
    const handleDownloadAll = (attachments) => __awaiter(this, void 0, void 0, function* () {
        if (!attachments || !Array.isArray(attachments)) {
            console.error('Error: Attachments are undefined or not an array.');
            return;
        }
        setIsLoading(true);
        try {
            const attachmentIds = attachments.map((attachment) => attachment.id);
            toast.info(_jsx(CcfAppToastMessage, { type: "info", messageKey: "downloadInfo" }), {
                autoClose: 1000,
                containerId: 'ComponentToastContainer',
            });
            const fileName = `${caseId}${messageSubject === null || messageSubject === void 0 ? void 0 : messageSubject.slice(0, 25).replace(/ /g, '_')}.zip`;
            downloadAllAttachment(attachmentIds)
                .then((response) => {
                var _a;
                const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/zip' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                (_a = link === null || link === void 0 ? void 0 : link.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(link);
            })
                .catch(() => {
                toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: "downloadError" }), {
                    autoClose: 2000,
                    containerId: 'ComponentToastContainer',
                });
            });
        }
        catch (error) {
            console.error('Error downloading all attachments:', error);
            toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: 'downloadError' }), {
                autoClose: 2000,
                containerId: 'ComponentToastContainer',
            });
        }
        finally {
            setIsLoading(false);
        }
    });
    return mailAttachments ? (_jsxs(_Fragment, { children: [nonAudioAttachments &&
                _jsx(Grid, Object.assign({ container: true, justifyContent: justifyContent, sx: ((isPreviousCaseMessage || isNextCaseMessage) && !isPreviewMode) ? { opacity: '0.5', gap: '1rem' } : { gap: '1rem' } }, { children: nonAudioAttachments === null || nonAudioAttachments === void 0 ? void 0 : nonAudioAttachments.map((attachment) => (_jsx(Grid, Object.assign({ item: true }, { children: _jsx(CcfDigitalAttachment, Object.assign({ attachment: attachment, togglePreviewMode: (id) => handleTogglePreviewMode(id), variant: variant, hideDownload: hideDownload, channelType: channelType, isInbound: isInboundDirection }, { children: isPreviewMode &&
                                attachment.previewUrl === currentPreviewUrl &&
                                renderModal(attachment) })) }), attachment.id))) })), audioAttachments && _jsx(Box, Object.assign({ sx: styles.audioAttachmentContainer, justifyContent: justifyContent }, { children: audioAttachments.map((attachment) => (_jsx(Box, Object.assign({ sx: { paddingTop: '0.2rem', paddingRight: justifyContent === CcfAttachmentJustify.FLEX_END ? '0.5rem' : '' } }, { children: _jsx(CcfDigitalAttachment, Object.assign({ attachment: attachment, togglePreviewMode: (id) => handleTogglePreviewMode(id), variant: variant, hideDownload: hideDownload, channelType: channelType, isInbound: isInboundDirection }, { children: isPreviewMode &&
                            attachment.previewUrl === currentPreviewUrl &&
                            renderModal(attachment) })) }), attachment.id))) })), (!hideDownload && mailAttachments.length > 1) && _jsxs(Box, Object.assign({ justifyContent: justifyContent, component: "span", role: "button", tabIndex: 0, sx: styles.icon, onClick: () => handleDownloadAll(mailAttachments), "data-testid": 'downloadAllButton' }, { children: [_jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.DOWNLOAD, size: ATTACHMENT_ICON_SIZE.SMALL }), _jsx(CcfTypography, Object.assign({ sx: styles.downloadAll }, { children: `${translate('downloadAll')} (${mailAttachments.length})` }))] }))] })) : null;
}
export default CcfDigitalAttachments;
//# sourceMappingURL=ccf-digital-attachments.js.map