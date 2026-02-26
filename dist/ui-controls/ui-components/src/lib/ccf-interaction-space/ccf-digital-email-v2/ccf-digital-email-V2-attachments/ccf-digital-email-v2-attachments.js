import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Grid, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { CcfBox, CcfSearchIcon, CcfAppToastMessage, useTranslator, CcfTypography, CcfTooltip, CcfListItemIcon, CcfListItemText, CcfAttachmentPreviewIcon, } from '@nice-devone/ui-controls';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { AttachmentPreviewVariant } from '../../ccf-digital-attachments/model/ccf-attachment-preview-variant';
import { CcfAttachmentJustify } from '../../ccf-digital-attachments/model/ccf-attachment-justify';
import CcfIcon, { ATTACHMENT_ICON_SIZE } from '../../../ccf-icon/ccf-icon';
import { downloadAllAttachment, downloadAttachment } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { ATTACHMENT_ICON_NAME } from '../../../ccf-icon/ccf-icon-list';
import CcfDigitalEmailV2Attachment from './ccf-digital-email-v2-attachment/ccf-digital-email-v2-attachment';
import CcfDigitalEmailV2AttachmentStyles from './ccf-digital-email-v2-attachment/ccf-digital-email-v2-attachment-styles';
import CcfDigitalAttachmentsStyles from '../../ccf-digital-attachments/ccf-digital-attachments-style';
import { CcfAttachmentType } from '../../../../enums/ccf-attachment-type';
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
export function CcfDigitalV2Attachments({ attachments, justifyContent = CcfAttachmentJustify.LEFT, variant = AttachmentPreviewVariant.REGULAR, hideDownload = true, isPreviousCaseMessage, isNextCaseMessage, channelType, messageSubject = '', caseId = '', isInboundDirection, }) {
    const theme = useTheme();
    const [isPreviewMode, setPreviewMode] = useState(false);
    const [imageTransformScale, setImageTransformScale] = useState(1);
    const [currentPreviewUrl, setCurrentPreviewUrl] = useState('');
    const [currentPreviewBlobUrl, setCurrentPreviewBlobUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const isRegular = variant === AttachmentPreviewVariant.REGULAR; // this flag will let us know about the view for attachment is regular or not
    const styles = CcfDigitalAttachmentsStyles(theme, isRegular);
    const themeStyles = CcfDigitalEmailV2AttachmentStyles(theme);
    const [translate] = useTranslator();
    const [anchorEl, setAnchorEl] = useState(null);
    const attachmentRef = useRef(null);
    const isSmView = useMediaQuery(theme.breakpoints.down('xl')); // Check if the view is small or not, this will help us to decide the number of attachments to show
    let MAX_VISIBLE_ATTACHMENT;
    if (isSmView) {
        MAX_VISIBLE_ATTACHMENT = 4; // If the view is small then we will show only 3 attachments
    }
    else {
        MAX_VISIBLE_ATTACHMENT = 6; // If the view is large then we will show 6 attachments
    }
    const mailAttachments = attachments === null || attachments === void 0 ? void 0 : attachments.filter((attachment) => !attachment.isInline);
    const nonAudioAttachments = mailAttachments === null || mailAttachments === void 0 ? void 0 : mailAttachments.filter((attachment) => { var _a; return !((_a = attachment.mimeType) === null || _a === void 0 ? void 0 : _a.includes(CcfAttachmentType.AUDIO)); });
    const audioAttachments = mailAttachments === null || mailAttachments === void 0 ? void 0 : mailAttachments.filter((attachment) => { var _a; return attachment.url && ((_a = attachment.mimeType) === null || _a === void 0 ? void 0 : _a.includes(CcfAttachmentType.AUDIO)); });
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
     * isLeftPreviewAvailable(attachment)
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
     * isRightPreviewAvailable(attachment)
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
        var _a;
        if (!isRightPreviewAvailable(attachment)) {
            return;
        }
        const currentAttachmentIndex = allAttachmentsWithPreview === null || allAttachmentsWithPreview === void 0 ? void 0 : allAttachmentsWithPreview.findIndex((a) => a.id === attachment.id);
        if (allAttachmentsWithPreview && currentAttachmentIndex >= 0) {
            setCurrentPreviewUrl((_a = allAttachmentsWithPreview[currentAttachmentIndex + 1]) === null || _a === void 0 ? void 0 : _a.previewUrl);
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
                createDownloadAnchor(url, attachment.friendlyName);
            })
                .catch(() => {
                toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: "downloadError" }), {
                    autoClose: 2000,
                    containerId: 'ComponentToastContainer',
                });
            });
        }
        else {
            createDownloadAnchor(attachment.blobUrl, attachment.friendlyName);
        }
    };
    /**
     * Create file download anchor tag
     * @param value - URL of the file to be downloaded
     * @param name - Name of the file to be downloaded
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
     * Method to associate blob data on preview
     * @param currentAttachment - current processed attachment
     * @example
     * ```
     * handlePreviewAttachment(currentAttachment)
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
     * @param attachment - current attachment object
     * @returns a modal view
     * ```
     * @example
     * renderModal(attachment)
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
    /**
     * Method to handle key down events for the menu
     * @param event - Keyboard event to handle key down actions
     * @example handleKeyDown(event: React.KeyboardEvent)
     */
    const handleKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.stopPropagation();
        }
    };
    return mailAttachments ? (_jsxs(Box, Object.assign({ component: 'div', sx: { display: 'flex', flexDirection: 'column' } }, { children: [nonAudioAttachments &&
                _jsx(Grid, Object.assign({ container: true, justifyContent: justifyContent, sx: ((isPreviousCaseMessage || isNextCaseMessage) && !isPreviewMode) ? { opacity: '0.5', gap: '1rem' } : { gap: '0.2rem' }, ref: attachmentRef, "data-testid": 'attachment-container' }, { children: nonAudioAttachments === null || nonAudioAttachments === void 0 ? void 0 : nonAudioAttachments.map((attachment, index) => (_jsxs(_Fragment, { children: [_jsx(Grid, Object.assign({ item: true }, { children: nonAudioAttachments.length >= MAX_VISIBLE_ATTACHMENT && index === MAX_VISIBLE_ATTACHMENT - 1 ? (_jsxs(_Fragment, { children: [_jsx(Box, Object.assign({ onClick: (e) => setAnchorEl(e.currentTarget), onKeyDown: (e) => {
                                                if (e.key === 'Enter') {
                                                    setAnchorEl(e.currentTarget);
                                                }
                                            }, role: "button", tabIndex: 0, "data-testid": "more-attachments", sx: themeStyles.moreAttachmentBox }, { children: _jsxs(CcfTypography, Object.assign({ sx: themeStyles.moreAttachmentText }, { children: ["+", nonAudioAttachments.length - MAX_VISIBLE_ATTACHMENT + 1] })) })), _jsx(Menu, Object.assign({ anchorEl: anchorEl, open: Boolean(anchorEl), onClose: () => setAnchorEl(null), tabIndex: 0, MenuListProps: {
                                                autoFocusItem: false,
                                                onKeyDown: handleKeyDown,
                                            } }, { children: nonAudioAttachments.slice(MAX_VISIBLE_ATTACHMENT - 1).map((moreAttachment) => {
                                                var _a, _b;
                                                return (_jsxs(MenuItem, Object.assign({ onClick: () => {
                                                        setAnchorEl(null);
                                                    }, tabIndex: 0, sx: themeStyles.menuItemStyles, "data-testid": `more-attachment-${moreAttachment.id}` }, { children: [_jsx(CcfTooltip, Object.assign({ title: moreAttachment === null || moreAttachment === void 0 ? void 0 : moreAttachment.friendlyName }, { children: _jsx(Box, Object.assign({ sx: { maxWidth: '60%' } }, { children: _jsx(CcfListItemText, Object.assign({ primaryTypographyProps: { sx: styles.listItemStyles } }, { children: moreAttachment === null || moreAttachment === void 0 ? void 0 : moreAttachment.friendlyName })) })) })), _jsxs(Box, Object.assign({ sx: { display: 'flex', justifyContent: 'flex-end' } }, { children: [(moreAttachment === null || moreAttachment === void 0 ? void 0 : moreAttachment.previewUrl) && (_jsx(CcfTooltip, Object.assign({ title: translate('preview') }, { children: _jsx(Box, { children: _jsx(CcfListItemIcon, Object.assign({ onClick: () => handleTogglePreviewMode(moreAttachment.id), onKeyDown: (e) => {
                                                                                if (e.key === 'Enter') {
                                                                                    handleTogglePreviewMode(moreAttachment.id);
                                                                                    setAnchorEl(null);
                                                                                }
                                                                            }, sx: styles.previewIconStyles, tabIndex: 0, "aria-label": translate('preview') + ' ' + ((_a = moreAttachment === null || moreAttachment === void 0 ? void 0 : moreAttachment.friendlyName) !== null && _a !== void 0 ? _a : ''), role: "button" }, { children: _jsx(CcfAttachmentPreviewIcon, { "aria-label": translate('preview'), "data-testid": 'previewMenuItem' }) })) }) }))), !hideDownload && (_jsx(CcfTooltip, Object.assign({ title: translate('download') }, { children: _jsx(Box, { children: _jsx(CcfListItemIcon, Object.assign({ onClick: () => downloadFileAttachment(moreAttachment), onKeyDown: (e) => {
                                                                                if (e.key === 'Enter') {
                                                                                    downloadFileAttachment(moreAttachment);
                                                                                    setAnchorEl(null);
                                                                                }
                                                                            }, tabIndex: 0, "aria-label": translate('download') + ' ' + ((_b = moreAttachment === null || moreAttachment === void 0 ? void 0 : moreAttachment.friendlyName) !== null && _b !== void 0 ? _b : ''), "data-testid": 'downloadMenuItem' }, { children: _jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.DOWNLOAD, size: ATTACHMENT_ICON_SIZE.SMALL, customStyle: styles.downloadIconStyles, "aria-label": translate('download') }) })) }) })))] }))] }), moreAttachment.id));
                                            }) }))] })) : (
                                // Render only up to MAX_VISIBLE attachments
                                index < MAX_VISIBLE_ATTACHMENT - 1 && (_jsx(CcfDigitalEmailV2Attachment, Object.assign({ attachment: attachment, togglePreviewMode: (id) => handleTogglePreviewMode(id), variant: variant, hideDownload: hideDownload, channelType: channelType, isInbound: isInboundDirection, handleDownloadAttachment: downloadFileAttachment }, { children: isPreviewMode &&
                                        attachment.previewUrl === currentPreviewUrl &&
                                        renderModal(attachment) })))) }), attachment.id), isPreviewMode &&
                                attachment.previewUrl === currentPreviewUrl &&
                                renderModal(attachment)] }))) })), audioAttachments && (audioAttachments === null || audioAttachments === void 0 ? void 0 : audioAttachments.length) > 0 && _jsx(Box, Object.assign({ sx: themeStyles.audioAttachmentContainer, justifyContent: justifyContent }, { children: audioAttachments.map((attachment) => (_jsx(Box, Object.assign({ sx: { paddingTop: '0.2rem', paddingRight: justifyContent === CcfAttachmentJustify.FLEX_END ? '0.5rem' : '' } }, { children: _jsx(CcfDigitalEmailV2Attachment, Object.assign({ attachment: attachment, togglePreviewMode: (id) => handleTogglePreviewMode(id), variant: variant, hideDownload: hideDownload, channelType: channelType, isInbound: isInboundDirection, handleDownloadAttachment: downloadFileAttachment }, { children: isPreviewMode &&
                            attachment.previewUrl === currentPreviewUrl &&
                            renderModal(attachment) })) }), attachment.id))) })), (!hideDownload && mailAttachments.length > 1) && _jsxs(Box, Object.assign({ justifyContent: justifyContent, component: "div", role: "button", tabIndex: 0, sx: styles.icon, onClick: () => handleDownloadAll(mailAttachments), "data-testid": 'downloadAllButton' }, { children: [_jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.DOWNLOAD, size: ATTACHMENT_ICON_SIZE.SMALL }), _jsx(CcfTypography, Object.assign({ sx: styles.downloadAll }, { children: `${translate('downloadAll')} (${mailAttachments.length})` }))] }))] }))) : null;
}
export default CcfDigitalV2Attachments;
//# sourceMappingURL=ccf-digital-email-v2-attachments.js.map