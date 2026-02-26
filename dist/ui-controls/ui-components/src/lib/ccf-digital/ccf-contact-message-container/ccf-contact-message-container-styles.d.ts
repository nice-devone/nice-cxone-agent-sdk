import { Theme } from '@mui/material';
/**
 * style object for ccf-contact-message-container
 * @returns CcfContactMessageContainerStyle styles object
 * ```
 * @example
 * <CcfContactMessageContainerStyle/>
 * ```
 */
declare const CcfContactMessageContainerStyle: (theme: Theme, isPreviousCaseMessage?: boolean, isInboundDirection?: boolean, isContentRemoved?: boolean, isNextCaseMessage?: boolean) => {
    messageContentWrapper: {
        [x: string]: string | {
            height: string;
        };
        overflowY: string;
        overflowX: string;
        paddingTop: string;
        height: string;
    };
    messageContainer: {
        marginRight?: string | undefined;
        display: string;
        width: string;
    };
    inboundMessageContainer: {
        display: string;
        width: string;
        marginLeft: string;
        float: string;
    };
    message: {
        backgroundColor?: string | undefined;
        padding: string | number;
        borderRadius: string;
        fontSize: string;
        maxWidth: string;
        textAlign: string;
        letterSpacing: string;
    };
    outboundMessage: {
        wordBreak: string;
        float: string;
        marginLeft?: string | undefined;
        marginRight: string;
        color: string;
        backgroundColor: string;
    };
    inboundMessage: {
        float: string;
        backgroundColor: string;
        color: string;
        wordBreak: string;
    };
    messageAuthor: {
        fontSize: string;
        fontWeight: string;
        lineHeight: string;
        letterSpacing: string;
        color: string;
        opacity: string;
        marginBottom: string;
    };
    messageActionButton: {
        display: string;
        alignItems: string;
        justifyContent: string;
    };
    menuItemContent: {
        color: string;
        width: string;
        overflow: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        height: string;
    };
    menuItemNameBold: {
        [x: string]: {
            fontSize: string;
            fontWeight: string;
            paddingLeft: string;
            marginTop: string;
            display: string;
        };
    };
    menuItemIcon: {
        marginTop: string;
    };
    inboundMessageActionButton: {
        fill: string;
    };
    outboundMessageActionButton: {
        fill: string;
    };
    inboundMessageAuthor: {
        marginRight?: string | undefined;
        marginLeft: string;
    };
    outboundMessageAuthor: {
        float: string;
        marginLeft?: string | undefined;
        marginRight: string;
        clear: string;
    };
    anonymousAuthorName: {
        fontWeight: number;
        fontStyle: string;
    };
    inboundMessageTimeStamp: {
        maxWidth: string;
        marginRight?: string | undefined;
        marginLeft: string;
        fontSize: string;
        lineHeight: string;
        letterSpacing: string;
        color: string;
    };
    outboundMessageTimeStamp: {
        float: string;
        marginLeft?: string | undefined;
        margin: string;
        fontSize: string;
        lineHeight: string;
        color: string;
        letterSpacing: string;
    };
    messageDivider: {
        marginBottom: string;
    };
    attachmentsContainer: {
        width: string;
        overflow: string;
        display: string;
    };
    attachmentsWithMsgAction: {
        justifyContent: string;
    };
    attachmentBox: {
        [x: string]: string | {
            padding: string;
        };
        width: string;
        float: string;
        maxWidth: string;
        paddingRight: string;
    };
    commentBox: {
        backgroundColor: string;
        position: string;
        padding: string;
        color: string;
    };
    replyButton: {
        backgroundColor: string;
        color: string;
    };
    obMessage: {
        [x: string]: string | {
            margin: string;
        };
        margin: string;
    };
    ibMessage: {
        margin: string;
    };
    approvalInfoContainer: {
        clear: string;
    };
    messageDraft: {
        borderRadius: string;
        fontSize: string;
        padding: string;
        textAlign: string;
        letterSpacing: string;
        opacity: string;
        marginRight: string;
        width: string;
    };
    outboundMessageDraftContainer: {
        wordBreak: string;
        minWidth: string;
        paddingLeft: string;
        float: string;
        marginLeft?: string | undefined;
        marginRight: string;
    };
    outboundMessageDraft: {
        color: string;
        backgroundColor: string;
    };
    messageDraftAttachment: {
        border: string;
        backgroundColor: string;
        padding: string;
    };
    timeStampTooltipArrow: {
        color: string;
    };
    timeStampTooltip: {
        backgroundColor: string;
        color: string;
        boxShadow: string;
    };
    loadMessagesContainer: {
        display: string;
        width: string;
        flexDirection: string;
        marginRight: string;
        marginBottom: string;
        marginLeft: string;
    };
    loadMessagesContainerForViewRecent: {
        display: string;
        justifyContent: string;
        flex: number;
    };
    loadMessagesButton: {
        color: string;
        fontSize: string;
        fontWeight: number;
        textDecoration: string;
        cursor: string;
        lineHeight: string;
        marginLeft: string;
    };
    doubleArrowIcon: {
        color: string;
        height: string;
        width: string;
        maxWidth: string;
    };
    previousMessagesContainer: {
        paddingTop: string;
    };
    previousCaseStatusDivider: {
        marginLeft: string;
        marginRight: string;
    };
    currentCaseStatusDivider: {
        paddingTop: string;
        paddingBottom: string;
    };
    caseStatus: {
        color: string;
        fontWeight: number;
        fontSize: string;
    };
    visualIndicatorStyles: {
        display: string;
        flexDirection: string;
        justifyContent: string;
    };
    messageSentIcon: {
        transform: string;
        marginTop: string;
    };
    messageDelayedIcon: {
        transform: string;
        marginTop: string;
    };
    messageSeenIcon: {
        transform: string;
        fill: string;
    };
    messageDeliveredIcon: {
        transform: string;
        fill: string;
    };
    menuStyle: {
        display: string;
        alignSelf: string;
    };
    linkStyles: {
        textDecoration: string;
        color: string;
        display: string;
        padding: string;
    };
    deletedContentContainerStyle: {
        backgroundColor: string;
        border: string;
        color: string | undefined;
        padding: number;
        borderRadius: string;
        display: string;
        '& > :nth-of-type(2)': {
            padding: string;
        };
    };
    deletedContentStyle: {
        fontStyle: string;
        color: string;
        padding: string;
    };
    menuTextContainerStyles: {
        paddingLeft: string;
    };
    replyToMessageContainer: {
        color: string;
    };
    replyToMessageContainerInAttachment: {
        float: string;
        paddingBottom: string;
    };
    menuTextStyleForReply: {
        paddingLeft: string;
    };
    previewStyles: {
        cursor: string;
        textDecoration: string;
        fontWeight: number;
        color: string;
    };
    scrollToBottomStyles: {
        marginBottom: string;
        marginTop: string;
        boxShadow: string;
        border: string;
        height: string;
        width: string;
        display: string;
        alignItems: string;
        justifyContent: string;
        borderRadius: string;
    };
    scrollToBottomIcon: {
        height: string;
        width: string;
    };
    bottomContainer: {
        display: string;
        flexDirection: string;
    };
};
export default CcfContactMessageContainerStyle;
