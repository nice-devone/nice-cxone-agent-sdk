import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import { Card, CardContent, Grid, Typography, CardHeader, Avatar, Divider, Box } from '@mui/material';
import Linkify from 'react-linkify';
import parse from 'html-react-parser';
import { CcfBox, CcfTooltip } from '@nice-devone/ui-controls';
import { getDateAndTimeFormat } from '../../../util/common';
import { CcfApprovalBanner } from '../ccf-approval-banner/ccf-approval-banner';
import { ApprovalBannerStatus } from '../../ccf-editor/ccf-editor-utils';
import CcfDigitalAttachments from '../../ccf-interaction-space/ccf-digital-attachments/ccf-digital-attachments';
import { CcfAttachmentJustify } from '../../ccf-interaction-space/ccf-digital-attachments/model/ccf-attachment-justify';
import { AttachmentPreviewVariant } from '../../ccf-interaction-space/ccf-digital-attachments/model/ccf-attachment-preview-variant';
import { linkDecorator } from '../../../util/commonWrapperComponent';
/**
   * renders the message container
   * @example PublicMessage
   * @returns
   */
function PublicMessage(props) {
    var _a, _b, _c, _d, _e;
    const { messageDraft, styles, sender, channelType, previewOnlyChannels, direction } = props;
    const authorName = (((_a = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.user) === null || _a === void 0 ? void 0 : _a.firstName) || '') + ' ' + (((_b = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.user) === null || _b === void 0 ? void 0 : _b.surname) || '');
    // public post will have replyToMessage null and other replies to post will have replyToMessage.id
    const isPublicPost = messageDraft.replyToMessage === null;
    const messageCreatedDate = getDateAndTimeFormat(messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.createdAt);
    // Hence channel specific validation added below to preview file with CDN link
    const hideDownload = channelType && previewOnlyChannels && previewOnlyChannels.indexOf(channelType) > -1 && direction === 'inbound' ? true : false;
    /**
     * Function to render original post(message.replyToMessage===null)
     * @example - renderOriginalPost()
     * @returns
     */
    const renderOriginalPost = () => (_jsx(Box, Object.assign({ sx: Object.assign({}, styles.originalPublicPost), "data-testid": "public-post" }, { children: _jsx(Grid, Object.assign({ container: true, spacing: 2 }, { children: _jsx(Grid, Object.assign({ item: true, xs: 12, md: 8, sm: true, container: true }, { children: _jsx(Grid, Object.assign({ item: true, xs: true, container: true, direction: "column", spacing: 2 }, { children: _jsxs(Grid, Object.assign({ item: true, xs: true }, { children: [_jsx(Typography, Object.assign({ gutterBottom: true, variant: "h3", component: "div", sx: Object.assign({ mb: 0 }, styles.messageAuthor) }, { children: sender })), _jsx(CcfBox, Object.assign({ sx: styles.inboundMessageTimeStamp }, { children: getDateAndTimeFormat(messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.createdAt) })), _jsx(Typography, Object.assign({ variant: "body2", gutterBottom: true, sx: { mt: 1 } }, { children: linkifiedMessageText(messageDraft) }))] })) })) })) })) })));
    /**
  * Function to make message text wrap within linkify to show text links if any
  * @example - linkifiedMessageText()
  * @returns
  */
    const linkifiedMessageText = (messageDraft) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return (_jsx(Linkify, Object.assign({ componentDecorator: (decoratedHref, decoratedText) => linkDecorator(decoratedHref, decoratedText) }, { children: (((_a = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.messageContent) === null || _a === void 0 ? void 0 : _a.text) && ((_c = (_b = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.messageContent) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.indexOf('</')) > -1) || (((_d = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.messageContent) === null || _d === void 0 ? void 0 : _d.text) && ((_f = (_e = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.messageContent) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.indexOf('/>')) > -1)
                ? parse((_g = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.messageContent) === null || _g === void 0 ? void 0 : _g.text)
                : _jsx("span", Object.assign({ style: { whiteSpace: 'pre-line' } }, { children: (_h = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.messageContent) === null || _h === void 0 ? void 0 : _h.text })) })));
    };
    return (_jsxs(Box, Object.assign({ sx: styles.messageDraftCardContainer }, { children: [_jsxs(Card, Object.assign({ sx: Object.assign(Object.assign({}, styles.messageDraftCard), (isPublicPost ? styles.originalPublicPost : null)), "data-testid": "public-message", id: messageDraft.id }, { children: [!isPublicPost ? (_jsx(CardHeader, { avatar: _jsx(Avatar, Object.assign({ sx: Object.assign({}, styles.authorAvtar), "aria-label": "recipe", src: (_c = messageDraft.user) === null || _c === void 0 ? void 0 : _c.imageUrl }, { children: authorName === null || authorName === void 0 ? void 0 : authorName.charAt(0) })), action: _jsx(Grid, Object.assign({ xs: 12, sm: 12, md: 12, lg: 12 }, { children: _jsx(CcfTooltip, Object.assign({ title: messageCreatedDate, arrow: true, placement: 'bottom-start' }, { children: _jsx(Box, Object.assign({ sx: styles.inboundMessageTimeStamp }, { children: messageCreatedDate })) })) })), title: _jsx("div", Object.assign({ style: styles.messageTitle }, { children: _jsx(CcfTooltip, Object.assign({ title: authorName, arrow: true, placement: 'bottom-start' }, { children: _jsx(Typography, Object.assign({ gutterBottom: true, variant: "h3", component: "div", sx: Object.assign({ mb: 0 }, styles.messageAuthor) }, { children: authorName })) })) })), sx: Object.assign({}, styles.cardHeaderPosition) })) : (renderOriginalPost()), _jsx(CardContent, Object.assign({ sx: Object.assign({}, styles.cardContentPosition) }, { children: _jsx(Grid, Object.assign({ container: true, sx: Object.assign({}, styles.gridItemPosition) }, { children: _jsx(Grid, Object.assign({ item: true, md: 12, sx: Object.assign(Object.assign({}, styles.gridItemPosition), styles.draftMessageContentBody) }, { children: _jsxs(Grid, Object.assign({ container: true }, { children: [_jsx(Grid, Object.assign({ item: true, md: 12, sx: Object.assign({}, styles.message) }, { children: !isPublicPost ? linkifiedMessageText(messageDraft) : null })), messageDraft.attachments &&
                                            _jsx(Grid, Object.assign({ item: true, md: 12, mt: '0.5rem' }, { children: _jsx(CcfDigitalAttachments, { attachments: messageDraft.attachments, justifyContent: CcfAttachmentJustify.FLEX_START, variant: AttachmentPreviewVariant.COMPACT, hideDownload: hideDownload, messageSubject: (_d = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.title) !== null && _d !== void 0 ? _d : '' }) }))] })) })) })) }))] })), isPublicPost ? _jsx(Divider, { sx: { mb: 2 } }) : null, _jsx(Box, Object.assign({ sx: styles.approvalInfoContainer }, { children: _jsx(CcfApprovalBanner, { message: (_e = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.messageContent) === null || _e === void 0 ? void 0 : _e.text, status: (messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.isRefused) ? ApprovalBannerStatus.DENIED : ApprovalBannerStatus.PENDING, messageDraft: messageDraft, isRefused: messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.isRefused }) }))] })));
}
/**
 * renders the message container
 * @param props - CcfContactPublicMessageDraftProps
 * @example <CcfContactPublicMessageDraft />
 * @returns
 */
const CcfContactPublicMessageDraft = ({ messageDraft, styles, sender, channelType, previewOnlyChannels, direction }) => {
    return _jsx(PublicMessage, { messageDraft: messageDraft, styles: styles, sender: sender, channelType: channelType, previewOnlyChannels: previewOnlyChannels, direction: direction });
};
export default memo(CcfContactPublicMessageDraft);
//# sourceMappingURL=ccf-contact-public-messagedraft.js.map