import { Theme } from '@mui/material';
/**
 * @example styles for single/individual digital attachment component
 */
declare const CcfDigitalAttachmentStyles: (theme: Theme, size: string, isRegularSize: boolean) => {
    wrapper: {
        position: string;
        height: string;
        width: string;
    };
    actions: {
        position: string;
        top: string;
        backgroundColor: string;
        opacity: string;
        padding: string;
        display: string;
        flexDirection: string;
        width: string;
        height: string;
        transition: string;
        '&:hover': {
            height: string;
            transition: string;
        };
    };
    image: {
        borderRadius: string;
        height: string;
        '&:hover ~ $actions': {
            height: string;
            transition: string;
        };
    };
    attachmentDetails: {
        display: string;
        flexDirection: string;
        fontSize: string;
        flexBasis: string;
        lineHeight: string;
        color: string;
        fontWeight: string;
        letterSpacing: string;
        alignSelf: string;
        width: string;
        overflowWrap: string;
        overflow: string;
        textOverflow: string;
        '-webkit-line-clamp': number;
        '-webkit-box-orient': string;
    };
    metaData: {
        display: string;
    };
    icons: {
        marginTop: string;
        height: string;
        overflow: string;
        display: string;
        justifyContent: string;
        alignItems: string;
        fontSize: string;
        fontWeight: number;
        padding: string;
        color: string;
    };
    icon: {
        display: string;
        flexDirection: string;
        width: string;
        alignItems: string;
        textDecoration: string;
        color: string;
        '&:hover': {
            textDecoration: string;
            color: string;
        };
        '&:focus': {
            textDecoration: string;
            color: string;
        };
        '&:active': {
            textDecoration: string;
            color: string;
        };
    };
    previewIcon: {
        color: string;
        cursor: string;
    };
    imageIcon: {
        margin: string;
        color: string;
    };
    pdfLargeIcon: {
        height: string;
        display: string;
        justifyContent: string;
        alignItems: string;
        color: string;
        backgroundColor: string;
    };
    audioAttachment: {
        paddingRight: string;
    };
};
export default CcfDigitalAttachmentStyles;
