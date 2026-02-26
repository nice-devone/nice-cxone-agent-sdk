/// <reference types="react" />
import { CXonePublicMessage } from '@nice-devone/common-sdk';
import { CcfTranslationKey } from '@nice-devone/i18n';
interface CcfContactPublicMessageProps {
    message: CXonePublicMessage;
    sender?: string;
    postCommentCount: number;
    translationKey?: CcfTranslationKey;
    styles: {
        messageCard: object;
        inboundMessageTimeStamp: object;
        outboundMessageTimeStamp: object;
        reactionCounter: object;
        message: object;
        messageAuthor: object;
        authorAvtar: object;
        attachmentsContainer: object;
        replyIcon: object;
        hiddenMessage: object;
        cardHeaderPosition: object;
        cardContentPosition: object;
        gridItemPosition: object;
        replyButton: object;
        replyButtonBox: object;
        separator: object;
        commentReplyCounter: object;
        originalPublicPost: object;
        messageTitle: object;
        hideDeleteChip: object;
        titleBox: object;
        draftMessageContentBody: object;
        anonymousAuthorName: object;
        deletedMessageContainer: object;
        deletedMessageText: object;
        originalPostContainer: object;
    };
    isParentCommentDeleted?: boolean;
}
declare const _default: import("react").MemoExoticComponent<({ message, styles, sender, postCommentCount, isParentCommentDeleted }: CcfContactPublicMessageProps) => JSX.Element>;
export default _default;
