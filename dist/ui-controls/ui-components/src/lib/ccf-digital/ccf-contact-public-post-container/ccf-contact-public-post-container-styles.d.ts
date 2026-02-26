import { Theme } from '@mui/material';
/**
 * style object for ccf-contact-message-container
 * @returns CcfContactPublicPostContainerStyle styles object
 * ```
 * @example
 * <CcfContactPublicPostContainerStyle/>
 * ```
 */
declare const CcfContactPublicPostContainerStyle: (theme: Theme, isSmView?: boolean) => {
    publicPostContentWrapper: {
        overflowY: string;
        overflowX: string;
        paddingTop: string;
        height: string;
    };
    originalPublicPost: {
        maxWidth: string;
        flexGrow: number;
        border: string;
        boxShadow: string;
        marginLeft: string;
        marginRight: string;
    };
    titleBox: {
        display: string;
        width: string;
    };
    inboundMessageTimeStamp: {
        fontSize: string;
        lineHeight: string;
        letterSpacing: string;
        color: string;
        display: string;
        width: string;
        overflow: string;
        textOverflow: string;
        whiteSpace: string;
    };
    outboundMessageTimeStamp: {
        fontSize: string;
        display: string;
    };
    messageCard: {
        width: string;
        marginBottom: string;
        border: string;
    };
    message: {
        fontSize: string;
        maxWidth: string;
        textAlign: string;
        letterSpacing: string;
        opacity: string;
        color: string;
    };
    messageAuthor: {
        fontSize: string;
        fontWeight: string;
        lineHeight: string;
        letterSpacing: string;
        color: string;
        opacity: string;
        marginBottom: string;
        overflow: string;
        maxWidth: string;
        textOverflow: string;
        whiteSpace: string;
    };
    anonymousAuthorName: {
        fontWeight: number;
        fontStyle: string;
    };
    reactionCounter: {
        fontSize: string;
        color: string;
        margin: string;
    };
    authorAvtar: {
        width: string;
        height: string;
    };
    attachmentsContainer: {
        overflow: string;
        marginTop: string;
    };
    replyButton: {
        [x: string]: string | {
            minWidth: string;
        };
        border: string;
        boxShadow: string;
        maxWidth: string;
        height: string;
        fontSize: string;
        background: string;
    };
    replyButtonBox: {
        display: string;
        margin: string;
    };
    messageTitle: {
        display: string;
        flexWrap: string;
    };
    replyIcon: {
        [x: string]: string | {
            marginRight: string;
        };
        fontSize: string;
        marginTop: string;
    };
    hiddenMessage: {
        fontSize: string;
        fontWeight: string;
        padding: string;
        marginTop: string;
        marginLeft: string;
        marginBottom: string;
        backgroundColor: string;
        display: string;
    };
    hideDeleteChip: {
        fontWeight: string;
        lineHeight: string;
        textAlign: string;
        color: string;
        height: string;
    };
    separator: {
        color: string;
    };
    commentReplyCounter: {
        fontSize: string;
        color: string;
        paddingLeft: string;
        margin: string;
    };
    treeContent: {
        '.MuiTreeItem-root > .MuiTreeItem-content': {
            padding: string;
            '.MuiTreeItem-label': {
                paddingRight: string;
                paddingLeft: string;
            };
            '.MuiTreeItem-iconContainer': {
                [x: string]: {
                    width: string;
                };
            };
            '&:hover': {
                backgroundColor: string;
                cursor: string;
            };
            '&.Mui-focused': {
                backgroundColor: string;
            };
        };
    };
    cardHeaderPosition: {
        padding: string;
        '.MuiCardHeader-avatar': {
            marginRight: string;
        };
        '.MuiCardHeader-content': {
            width: string;
        };
        '.MuiCardHeader-content p': {
            overflow: string;
            textOverflow: string;
            whiteSpace: string;
        };
    };
    cardContentPosition: {
        padding: string;
    };
    gridItemPosition: {
        padding: string;
    };
    draftMessageContentBody: {
        width: string;
        textAlign: string;
        padding: string;
        letterSpacing: string;
        opacity: string;
        '& > span': {
            fontSize: string;
            overflowY: string;
            display: string;
        };
        '& ul': {
            listStylePosition: string;
        };
        lineHeight: string;
        overflowX: string;
        overflowY: string;
        paddingBottom: string;
    };
    approvalInfoContainer: {
        clear: string;
        width: string;
    };
    messageDraftCard: {
        marginBottom: string;
        width: string;
        border: string;
    };
    messageDraftCardContainer: {
        clear: string;
        width: string;
        display: string;
        flexDirection: string;
        justifyContent: string;
        alignItems: string;
        padding: string;
        margin: string;
    };
    treeItemContainer: {
        position: string;
        '.MuiTreeItem-group': {
            [x: string]: string | {
                marginLeft: string;
            };
            marginLeft: string;
            borderLeft: string;
            paddingTop: string;
            marginTop: string;
        };
        '.MuiTreeItem-root': {
            marginRight: string;
        };
    };
    rootNodeDivider: {
        '&:before': {
            pointerEvents: string;
            content: string;
            position: string;
            width: string;
            height: string;
            top: number;
            'border-bottom-left-radius': string;
        };
    };
    nonRootNodeDivider: {
        '&:before': {
            pointerEvents: string;
            content: string;
            position: string;
            width: string;
            height: string;
            top: number;
            borderBottom: string;
            'border-bottom-left-radius': string;
        };
    };
    deletedMessageContainer: {
        boxSizing: string;
        display: string;
        flexDirection: string;
        justifyContent: string;
        alignItems: string;
        padding: string;
        width: string;
        height: string;
        border: string;
        borderRadius: string;
    };
    deletedMessageText: {
        color: string;
        fontSize: string;
        fontStyle: string;
    };
    originalPostContainer: {
        display: string;
        alignItems: string;
        justifyContent: string;
    };
};
export default CcfContactPublicPostContainerStyle;
