import { Theme } from '@mui/material';
import { CcfContactContentBodyProps } from './ccf-contact-content-body';
/**
 * styles for ccf-contact-content-body
 * @returns ContactContentBodyStyles
 * @example ContactContentBodyStyles(theme)
 */
export declare const ContactContentBodyStyles: (theme: Theme, propData?: CcfContactContentBodyProps) => {
    contactTabContainer: {
        margin: string;
        height: string;
    };
    inboundContainer: {
        width: string;
        margin: string;
        padding: string;
        background: string;
        border: string;
        borderRadius: string;
    };
    outboundContainer: {
        float: string;
        background: string;
        border: string;
        width: string;
        margin: string;
        padding: string;
        borderRadius: string;
        marginLeft: string;
        boxShadow: string;
    };
    contentBody: {
        width: string;
        textAlign: string;
        font: string;
        padding: string;
        letterSpacing: string;
        color: string;
        opacity: string;
        '& > span': {
            fontSize: string;
        };
    };
    contentKebab: {
        float: string;
    };
    contactContentEmailContainer: {
        overflowY: string;
        height: string;
        marginRight: string;
        '&::-webkit-scrollbar': {
            width: string;
        };
    };
    inboundContentContainer: {
        [x: string]: string | {
            padding: string;
        };
        width: string;
        margin: string;
        padding: string;
        borderRadius: string;
    };
    outboundContentContainer: {
        width: string;
        margin: string;
        padding: string;
        borderRadius: string;
        display: string;
        flexDirection: string;
    };
    outboundMessageNotes: {
        display: string;
        flexDirection: string;
        margin: string;
        clear: string;
        alignItems: string;
    };
    containerLayout: {
        background: string;
        border: string;
        boxShadow: string;
    };
    contentBody2: {
        'div div:first-of-type': {
            overflowY: string;
        };
        width: string;
        textAlign: string;
        font: string;
        letterSpacing: string;
        color: string;
        opacity: string;
        '& > span': {
            fontSize: string;
            overflowY: string;
            display: string;
        };
        wordBreak: string;
        '& ul': {
            listStylePosition: string;
        };
        lineHeight: string;
        overflowX: string;
        overflowY: string;
        paddingLeft: string;
    };
    alignAgentHeader: {
        display: string;
        justifyContent: string;
    };
    alignCustomerHeader: {
        display: string;
        justifyContent: string;
    };
    agentHeader: {
        fontSize: string;
        textAlign: string;
    };
    customerHeader: {
        fontSize: string;
    };
    textSecondary: {
        color: string;
        backgroundColor: string;
        '&:hover': {
            opacity: number;
        };
    };
    footerContainer: {
        width: string;
        display: string;
        padding: string;
    };
    footerLeft: {
        flexGrow: number;
    };
    footerRight: {
        flexGrow: number;
    };
    containerOutboundLayout: {
        background: string;
        border: string;
        boxShadow: string;
        paddingBottom: string;
    };
    inlineBodyAttachment: {
        width: string;
        height: string;
        maxWidth: string;
        cursor: string;
    };
    closeButtonColumn: {
        backgroundColor: string;
        borderRadius: string;
        float: string;
        width: string;
    };
    inlineBodyAttachmentI: {
        [x: string]: string | {
            marginTop: string;
            marginLeft: string;
        };
        maxWidth: string;
        maxHeight: string;
        margin: string;
    };
    imgcontainer: {
        display: string;
        height: string;
    };
    translateIcon: {
        fontSize: string;
        marginRight: number;
    };
    circleIcon: {
        fontSize: string;
        marginX: number;
    };
    translatedMessage: {
        padding: string;
        flexDirection: string;
        marginBottom: string;
    };
    divider: {
        borderColor: string | undefined;
        height: string;
        borderWidth: string;
    };
    translationToggleLink: {
        cursor: string;
    };
    emailActions: {
        marginTop: string;
        color: string;
    };
    popOverMenuItemStyles: {
        '& .popOverActionLabelWrapper .popOverActionLabel': {
            color: string;
            fontWeight: number;
        };
    };
    deleteContent: {
        color: string;
        marginBottom: string;
        marginTop: string;
    };
    deleteAuthorName: {
        color: string;
        marginTop: string;
        marginBottom: string;
    };
    replyIcon: {
        color: string;
        marginTop: string;
    };
    emailIframe: {
        width: string;
        overflowY: string;
        border: string;
    };
};
export default ContactContentBodyStyles;
