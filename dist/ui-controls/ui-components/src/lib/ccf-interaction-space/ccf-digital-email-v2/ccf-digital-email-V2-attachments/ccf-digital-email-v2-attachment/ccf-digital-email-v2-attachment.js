import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, ListItemIcon, ListItemText, Menu, MenuItem, useTheme } from '@mui/material';
import { useState } from 'react';
import { CcfTooltip, useTranslator, CcfBox, CcfListItemText, CcfListItemIcon, CcfAttachmentPreviewIcon } from '@nice-devone/ui-controls';
import { AttachmentPreviewVariant } from '../../../ccf-digital-attachments/model/ccf-attachment-preview-variant';
import CcfDigitalAttachmentStyles from '../../../ccf-digital-attachments/ccf-digital-attachment/ccf-digital-attachment-style';
import CcfIcon, { ATTACHMENT_ICON_SIZE } from '../../../../ccf-icon/ccf-icon';
import { ATTACHMENT_ICON_NAME } from '../../../../ccf-icon/ccf-icon-list';
import CcfAudioPlayer from '../../../../ccf-audio-player/ccf-audio-player';
import CcfDigitalEmailV2AttachmentStyles from './ccf-digital-email-v2-attachment-styles';
import { CcfAttachmentType } from '../../../../../enums/ccf-attachment-type';
/**
   * To render the digital email attachment component
   * @example
   * ```
   * CcfDigitalEmailV2Attachment(props: CcfDigitalAttachmentV2Props);
   * ```
   */
export function CcfDigitalEmailV2Attachment(props) {
    const { togglePreviewMode, attachment, children, variant = AttachmentPreviewVariant.REGULAR, hideDownload = true, isInbound: isInboundDirection, handleDownloadAttachment } = props;
    const { id, friendlyName, previewUrl, mimeType, url } = attachment;
    const isRegular = variant === AttachmentPreviewVariant.REGULAR; // this flag will let us know about the view for attachment is regular or not
    const theme = useTheme();
    const styles = CcfDigitalAttachmentStyles(theme, 'auto', true);
    const [translate] = useTranslator();
    const themeStyles = CcfDigitalEmailV2AttachmentStyles(theme);
    const isImage = mimeType === null || mimeType === void 0 ? void 0 : mimeType.includes(CcfAttachmentType.IMAGE);
    const isPdf = mimeType === null || mimeType === void 0 ? void 0 : mimeType.includes(CcfAttachmentType.PDF);
    const [toolTipOpen, UpdateTooltipOpen] = useState(false); // this local state will be used to toggle the tooltip 
    const [toolTipName, UpdateToolTipName] = useState(attachment.friendlyName);
    const [anchorEl, setAnchorEl] = useState(null);
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
     * Used to render the icon based on the mimeType of the attachment
     * @example
     * ```
     * renderIcon();
     * ```
     */
    const renderIcon = () => {
        if (isPdf)
            return ATTACHMENT_ICON_NAME.PDF;
        if (isImage)
            return ATTACHMENT_ICON_NAME.IMAGE;
        return ATTACHMENT_ICON_NAME.DOCUMENT;
    };
    return (_jsxs(CcfBox, { children: [!(mimeType === null || mimeType === void 0 ? void 0 : mimeType.includes(CcfAttachmentType.AUDIO)) && (_jsxs(Box, { children: [_jsx(CcfTooltip, Object.assign({ open: toolTipOpen && !isRegular, title: toolTipName || '', arrow: true, disableHoverListener: true, disableInteractive: true }, { children: _jsxs(Box, Object.assign({ onClick: (e) => {
                                setAnchorEl(e.currentTarget);
                            }, onKeyDown: (e) => {
                                if (e.key === 'Enter') {
                                    setAnchorEl(e.currentTarget);
                                }
                            }, tabIndex: 0, sx: themeStyles.attachmentContainer, "data-testid": "attachment-box", "aria-label": friendlyName, onMouseEnter: () => toggleTooltip(), onMouseLeave: () => toggleTooltip() }, { children: [_jsx(CcfIcon, { attachmentIcon: renderIcon(), size: ATTACHMENT_ICON_SIZE.EXTRA_SMALL, customStyle: themeStyles.attachmentIcon }), _jsx(Box, Object.assign({ component: "div", sx: themeStyles.attachmentName, title: friendlyName }, { children: friendlyName }))] })) })), _jsxs(Menu, Object.assign({ anchorEl: anchorEl, open: Boolean(anchorEl), onClose: () => setAnchorEl(null), anchorOrigin: { vertical: 'bottom', horizontal: 'left' }, transformOrigin: { vertical: 'top', horizontal: 'left' }, role: 'menu' }, { children: [previewUrl && (_jsxs(MenuItem, Object.assign({ onClick: () => {
                                    togglePreviewMode(id);
                                    setAnchorEl(null);
                                }, onKeyDown: (e) => {
                                    if (e.key === 'Enter') {
                                        togglePreviewMode(id);
                                        setAnchorEl(null);
                                    }
                                }, role: 'menuitem', "data-testid": 'previewButton', "aria-label": translate('preview'), sx: themeStyles.menuItemStyles }, { children: [_jsx(CcfListItemIcon, { children: _jsx(CcfAttachmentPreviewIcon, { "aria-label": translate('preview'), sx: themeStyles.previewIcon }) }), _jsx(CcfListItemText, Object.assign({ primaryTypographyProps: { sx: themeStyles.listItemStyles } }, { children: translate('preview') }))] }))), !hideDownload && (_jsxs(MenuItem, Object.assign({ onClick: () => {
                                    handleDownloadAttachment(attachment);
                                    setAnchorEl(null);
                                }, onKeyDown: (e) => {
                                    if (e.key === 'Enter') {
                                        togglePreviewMode(id);
                                        setAnchorEl(null);
                                    }
                                }, role: 'menuitem', "data-testid": 'downloadButton', "aria-label": translate('download'), sx: themeStyles.menuItemStyles }, { children: [_jsx(ListItemIcon, { children: _jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.DOWNLOAD, size: ATTACHMENT_ICON_SIZE.SMALL, customStyle: themeStyles.downloadIcon, "aria-label": translate('download') }) }), _jsx(ListItemText, Object.assign({ primaryTypographyProps: { sx: themeStyles.listItemStyles } }, { children: translate('download') }))] })))] }))] })), children, (mimeType === null || mimeType === void 0 ? void 0 : mimeType.includes('audio')) && (_jsx(Box, Object.assign({ sx: styles.audioAttachment }, { children: _jsx(CcfAudioPlayer, { audioUrl: url !== null && url !== void 0 ? url : '', isInbound: isInboundDirection, attachment: attachment, shouldShowDownloadIcon: true, fileName: attachment.fileName || '', handleDownloadAttachment: handleDownloadAttachment }) })))] }));
}
export default CcfDigitalEmailV2Attachment;
//# sourceMappingURL=ccf-digital-email-v2-attachment.js.map