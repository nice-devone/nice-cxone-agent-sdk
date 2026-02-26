import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from '@mui/material';
import { memo } from 'react';
import { CcfMenu } from '@nice-devone/ui-controls';
import { MessageKebabMenu } from '../../ccf-assignment-panel/ccf-assignment-utils';
import CcfContactMessageContainerStyles from './ccf-contact-message-container-styles';
import CcfIcon from '../../ccf-icon/ccf-icon';
import { MESSAGE_ACTION_ICONS, iconList } from '../../ccf-icon/ccf-icon-list';
import { previewTemplateFile } from '../../../util/common';
/**
 * @returns component containing actions for contact message
 * @example <CcfContactMessageActions/>
 */
const CcfContactMessageActions = ({ messageActionFlags, isInboundDirection, showConfirmationDialog, setMessageData, downloadUrl, fileName }) => {
    const { canReplyToSpecificMessage, canDeleteAuthor, canDeleteMessageContent, canDownloadMedia } = messageActionFlags;
    const theme = useTheme();
    const styles = CcfContactMessageContainerStyles(theme, false, false, !canDeleteMessageContent);
    const messageActions = [
        {
            name: MessageKebabMenu.REPLY,
            icon: iconList[MESSAGE_ACTION_ICONS.REPLY](''),
            isActive: canReplyToSpecificMessage,
            addBreakLine: (canDeleteMessageContent || canDeleteAuthor) && !canDownloadMedia,
            menuTextContainerStyles: styles.menuTextStyleForReply,
        },
        {
            name: MessageKebabMenu.PREVIEW,
            icon: _jsx(CcfIcon, { iconName: MessageKebabMenu.PREVIEW }),
            isActive: canDownloadMedia,
            menuTextContainerStyles: styles.menuTextContainerStyles,
            addBreakLine: canDeleteMessageContent || canDeleteAuthor,
        },
        {
            name: MessageKebabMenu.DELETE_CONTENT,
            icon: _jsx(CcfIcon, { iconName: MessageKebabMenu.DELETE_CONTENT }),
            isActive: canDeleteMessageContent,
            menuTextContainerStyles: styles.menuTextContainerStyles,
        },
        {
            name: MessageKebabMenu.DELETE_AUTHOR_NAME,
            icon: _jsx(CcfIcon, { iconName: MessageKebabMenu.DELETE_AUTHOR_NAME }),
            isActive: canDeleteAuthor,
            menuTextContainerStyles: styles.menuTextContainerStyles,
        }
    ];
    /**
   * messageActionKebabMenuSelectionHandler to handle action selected on Message
   * @example messageActionKebabMenuSelectionHandler('reply');
   * @param action - action to be performed
   */
    const messageActionKebabMenuSelectionHandler = (action) => {
        switch (action) {
            case MessageKebabMenu.REPLY:
                setMessageData && setMessageData();
                break;
            case MessageKebabMenu.DELETE_CONTENT:
            case MessageKebabMenu.DELETE_AUTHOR_NAME:
                showConfirmationDialog && showConfirmationDialog(true, action);
                break;
            case MessageKebabMenu.PREVIEW:
                if (downloadUrl && fileName) {
                    previewTemplateFile(downloadUrl, fileName);
                }
                break;
        }
    };
    return (messageActions.some(opt => opt.isActive) ?
        _jsx(CcfMenu, { options: messageActions, handleMenuSelection: messageActionKebabMenuSelectionHandler, menuItemStyles: styles.menuItemContent, menuTextStyles: styles.menuItemNameBold, moreIconStyles: isInboundDirection ? styles.inboundMessageActionButton : styles.outboundMessageActionButton, menuStyles: styles.menuStyle, linkStyles: styles.linkStyles })
        : null);
};
export default memo(CcfContactMessageActions);
//# sourceMappingURL=ccf-contact-message-actions.js.map