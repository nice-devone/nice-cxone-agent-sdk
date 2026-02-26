import { Theme } from '@mui/material';
/**
 * style object for ccf-digital-email-v2-messages component
 * @returns CcfDigitalEmailV2Messages styles object
 * ```
 * @example
 * <CcfDigitalEmailV2MessagesStyles/>
 * ```
 */
declare const CcfDigitalEmailV2MessagesStyles: (theme: Theme, isExpanded: boolean, showMoreLess: boolean) => {
    boxContainer: {
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        height: string;
        width: string;
        textAlign: string;
        font: string;
        letterSpacing: number;
        color: string;
        opacity: string;
        '& > span': {
            fontSize: string;
            overflowY: string;
            display: string;
            marginLeft: string;
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
    closeButtonColumn: {
        backgroundColor: string;
        borderRadius: string;
        float: string;
        width: string;
    };
    inlineBodyAttachment: {
        width: string;
        height: string;
        maxWidth: string;
        cursor: string;
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
    moreLessContainer: {
        alignSelf: string;
        cursor: string;
        fontSize: string;
        color: string;
        fontWeight: number;
        textDecoration: string;
        m: number;
    };
    deleteContent: {
        fontStyle: string;
        color: string;
        fontWeight: number;
        fontSize: string;
    };
    notesDivider: {
        borderTop: string;
    };
    emailIframe: {
        width: string;
        overflowY: string;
        border: string;
    };
};
export default CcfDigitalEmailV2MessagesStyles;
