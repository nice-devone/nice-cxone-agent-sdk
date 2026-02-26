import { Theme } from '@mui/material';
/**
 * styles for reply to message component
 * @example CcfReplyToMessageStyles(theme)
 */
declare const CcfReplyToMessageStyles: (theme: Theme) => {
    replyToMessageContainer: {
        [x: string]: string | {
            width: string;
            height: string;
        };
        width: string;
        minHeight: string;
        height: string;
        background: string;
        borderRadius: string;
        border: string;
        borderWidth: string;
        display: string;
        flexDirection: string;
        padding: string;
        marginBottom: string;
    };
    authorAndTimestamp: {
        display: string;
        flexDirection: string;
        justifyContent: string;
        height: string;
    };
    messageContent: {
        [x: string]: string | number | {
            width: string;
            maxHeight: string;
            display: string;
            WebkitBoxOrient: string;
            WebkitLineClamp: number;
            lineClamp: number;
        };
        overflow: string;
        maxHeight: string;
        width: string;
        textOverflow: string;
        display: string;
        WebkitBoxOrient: string;
        WebkitLineClamp: number;
        lineClamp: number;
    };
    textStyles: {
        fontFamily: string;
        lineHeight: string;
        fontSize: string;
        textOverflow: string;
        overflow: string;
        whiteSpace: string;
    };
    subText: {
        fontWeight: number;
    };
    mainText: {
        fontWeight: number;
    };
    name: {
        maxWidth: string;
        overflow: string;
        textOverflow: string;
        whiteSpace: string;
        marginRight: string;
    };
    closeIcon: {
        width: string;
        height: string;
        cursor: string;
    };
    header: {
        display: string;
        flexDirection: string;
        justifyContent: string;
    };
    attachmentsContainer: {
        display: string;
        flexDirection: string;
        flexWrap: string;
        maxWidth: string;
    };
};
export default CcfReplyToMessageStyles;
