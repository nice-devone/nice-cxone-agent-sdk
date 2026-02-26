import { Theme } from '@mui/material';
/**
 * Styling for ccfQuickReplyCard
 * @returns ccfQuickReplyCard CSS properties as a JSON object
 * @example ccfQuickReplyCardStyles(theme, isRichMessage)
*/
declare const ccfQuickReplyCardStyles: (theme: Theme, isRichMessage?: boolean) => {
    replyCard: {
        background: string;
        boxShadow: string;
        padding: string;
        borderRadius: string;
        cursor: string;
        margin: string;
        '*': {
            wordBreak: string;
        };
        '&:focus, &:focus-visible': {
            border: string;
            outline: string;
        };
    };
    favIcon: {
        padding: string;
    };
    favReply: {
        color: string;
    };
    quickReplyHeader: {
        padding: string;
        maxHeight: string;
        marginBottom: string;
        '& .MuiCardHeader-title': {
            font: string;
            letterSpacing: number;
            color: string;
            opacity: number;
        };
    };
    replyContent: {
        font: string;
        letterSpacing: string;
        color: string;
    };
    replyContentV2: {
        font: string;
        letterSpacing: string;
        color: string;
        maxWidth: string;
        overflow: string;
        overflowX: string;
        textOverflow: string;
    };
    favButton: {
        padding: number;
    };
    sendButton: {
        justifyContent: string;
        button: {
            boxShadow: string;
            cursor: string;
            ':hover': {
                boxShadow: string;
            };
        };
    };
    selectedRichMsgCard: {
        background: string;
    };
    richLinkIcon: {
        height: string;
    };
    textButton: {
        ':active': {
            backgroundColor: string;
            borderRadius: string;
        };
    };
    focussedElement: {
        border: string;
        '&:focus': {
            border: string;
            borderRadius: string;
        };
    };
    hoveredElement: {
        '&:hover': {
            backgroundColor: string;
            borderRadius: string;
        };
    };
    replyCardTitle: {
        paddingLeft: string | number;
    };
};
export default ccfQuickReplyCardStyles;
