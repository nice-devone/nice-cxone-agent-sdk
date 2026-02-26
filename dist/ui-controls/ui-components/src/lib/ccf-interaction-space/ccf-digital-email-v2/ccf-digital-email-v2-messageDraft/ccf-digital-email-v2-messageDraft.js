import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import { Card, CardContent, Grid, Typography, CardHeader, Avatar, Box } from '@mui/material';
import Linkify from 'react-linkify';
import parse from 'html-react-parser';
import { CcfTooltip, useTranslator } from '@nice-devone/ui-controls';
import { CcfApprovalBanner } from '../../../ccf-digital/ccf-approval-banner/ccf-approval-banner';
import { CcfAttachmentJustify } from '../../ccf-digital-attachments/model/ccf-attachment-justify';
import CcfDigitalAttachments from '../../ccf-digital-attachments/ccf-digital-attachments';
import { AttachmentPreviewVariant } from '../../ccf-digital-attachments/model/ccf-attachment-preview-variant';
import { ApprovalBannerStatus } from '../../../ccf-editor/ccf-editor-utils';
import { getToCcBccFields } from '../../../ccf-digital/ccf-contact-email-header/ccf-contact-email-header';
import CcfContactMessageTimestamp from '../../../ccf-digital/ccf-contact-message-container/ccf-contact-message-timestamp';
import { linkDecorator } from '../../../../util/commonWrapperComponent';
/**
   * renders the message draft container
   * @example CcfDigitalEmailV2Message
   * @returns
   */
function CcfDigitalEmailV2Message(props) {
    var _a, _b, _c, _d, _e, _f;
    const [translate] = useTranslator();
    const { messageDraft, styles, sender, channelType, previewOnlyChannels, direction, digitalContactDetails } = props;
    const authorName = (((_a = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.user) === null || _a === void 0 ? void 0 : _a.firstName) || '') + ' ' + (((_b = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.user) === null || _b === void 0 ? void 0 : _b.surname) || '');
    const authorInitials = authorName
        .split(' ')
        .filter(Boolean)
        .map(namePart => namePart[0])
        .join('')
        .toUpperCase();
    // public post will have replyToMessage null and other replies to post will have replyToMessage.id
    const isPublicPost = messageDraft.replyToMessage === null;
    const hasVisibleRecipients = !!((_c = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.channel) === null || _c === void 0 ? void 0 : _c.hasVisibleRecipients);
    const recipients = hasVisibleRecipients ? messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.recipients : [];
    const { to = '' } = getToCcBccFields(recipients, sender !== null && sender !== void 0 ? sender : '');
    // Hence channel specific validation added below to preview file with CDN link
    const hideDownload = channelType && previewOnlyChannels && previewOnlyChannels.indexOf(channelType) > -1 && direction === 'inbound' ? true : false;
    /**
    * Function to make message text wrap within linkify to show text links if any
    * @example - linkifiedMessageText(messageDraft)
    * @returns
    */
    const linkifiedMessageText = (messageDraft) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return (_jsx(Linkify, Object.assign({ componentDecorator: (decoratedHref, decoratedText) => linkDecorator(decoratedHref, decoratedText) }, { children: (((_a = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.messageContent) === null || _a === void 0 ? void 0 : _a.text) && ((_c = (_b = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.messageContent) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.indexOf('</')) > -1) || (((_d = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.messageContent) === null || _d === void 0 ? void 0 : _d.text) && ((_f = (_e = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.messageContent) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.indexOf('/>')) > -1)
                ? parse((_g = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.messageContent) === null || _g === void 0 ? void 0 : _g.text)
                : _jsx("span", Object.assign({ style: { whiteSpace: 'pre-line' } }, { children: (_h = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.messageContent) === null || _h === void 0 ? void 0 : _h.text })) })));
    };
    return (_jsxs(Box, Object.assign({ sx: styles.messageDraftCardContainer }, { children: [_jsxs(Card, Object.assign({ sx: Object.assign({}, styles.messageDraftCard), "data-testid": "public-message", id: messageDraft.id }, { children: [_jsx(CardHeader, { avatar: _jsx(Avatar, Object.assign({ sx: Object.assign({}, styles.authorAvtar), "aria-label": "recipe", src: (_d = messageDraft.user) === null || _d === void 0 ? void 0 : _d.imageUrl }, { children: authorInitials })), action: _jsx(Grid, Object.assign({ xs: 12, sm: 12, md: 12, lg: 12 }, { children: _jsx(Box, Object.assign({ sx: { fontSize: '0.688rem', marginRight: '0.5rem' } }, { children: _jsx(CcfContactMessageTimestamp, { createdAt: messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.createdAt, timestampPlacement: "bottom" }) })) })), title: _jsxs(Box, Object.assign({ component: "div", sx: styles.messageTitle }, { children: [_jsx(CcfTooltip, Object.assign({ title: authorName, arrow: true, placement: 'bottom-start' }, { children: _jsx(Typography, Object.assign({ gutterBottom: true, variant: "h3", component: "div", sx: Object.assign({ mb: 0 }, styles.messageAuthor) }, { children: authorName })) })), to !== '' && (_jsx(CcfTooltip, Object.assign({ title: to }, { children: _jsxs(Typography, Object.assign({ component: "div", sx: styles.toField }, { children: [translate('to'), ": ", to] })) })))] })), sx: Object.assign({}, styles.cardHeaderPosition) }), _jsx(CardContent, Object.assign({ sx: Object.assign({}, styles.cardContentPosition) }, { children: _jsx(Grid, Object.assign({ container: true, sx: Object.assign({}, styles.gridItemPosition) }, { children: _jsx(Grid, Object.assign({ item: true, md: 12, sx: Object.assign(Object.assign({}, styles.gridItemPosition), styles.draftMessageContentBody) }, { children: _jsxs(Grid, Object.assign({ container: true }, { children: [_jsx(Grid, Object.assign({ item: true, md: 12, sx: Object.assign({}, styles.message) }, { children: !isPublicPost ? linkifiedMessageText(messageDraft) : null })), messageDraft.attachments && (_jsx(Grid, Object.assign({ item: true, md: 12, mt: '0.5rem' }, { children: _jsx(CcfDigitalAttachments, { attachments: messageDraft.attachments, justifyContent: CcfAttachmentJustify.FLEX_START, variant: AttachmentPreviewVariant.COMPACT, hideDownload: hideDownload, messageSubject: (_e = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.title) !== null && _e !== void 0 ? _e : '' }) })))] })) })) })) }))] })), _jsx(Box, Object.assign({ sx: styles.approvalInfoContainer }, { children: _jsx(CcfApprovalBanner, { message: (_f = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.messageContent) === null || _f === void 0 ? void 0 : _f.text, status: (messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.isRefused) ? ApprovalBannerStatus.DENIED : ApprovalBannerStatus.PENDING, messageDraft: messageDraft, isRefused: messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.isRefused }) }))] })));
}
/**
 * renders the message container
 * @param props - CcfContactPublicMessageDraftProps
 * @example <CcfDigitalEmailV2PublicMessageDraft />
 * @returns
 */
const CcfDigitalEmailV2MessageDraft = ({ messageDraft, styles, sender, channelType, previewOnlyChannels, direction, digitalContactDetails }) => {
    return _jsx(CcfDigitalEmailV2Message, { messageDraft: messageDraft, styles: styles, sender: sender, channelType: channelType, previewOnlyChannels: previewOnlyChannels, direction: direction, digitalContactDetails: digitalContactDetails });
};
export default memo(CcfDigitalEmailV2MessageDraft);
//# sourceMappingURL=ccf-digital-email-v2-messageDraft.js.map