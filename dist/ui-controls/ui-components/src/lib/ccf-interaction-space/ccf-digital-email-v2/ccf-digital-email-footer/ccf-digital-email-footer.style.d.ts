import { Theme } from '@mui/material';
/**
 * style object for ccf-digital-email-v2-footer component
 * @returns CcfDigitalEmailV2Footer styles object
 * ```
 * @example
 * <CcfDigitalEmailV2FooterStyles/>
 * ```
 */
declare const CcfDigitalEmailV2FooterStyles: (theme: Theme, isMobile?: boolean) => {
    footerContainer: {
        position: string;
        bottom: string;
        width: string;
        minWidth: string;
        height: string;
        display: string;
        alignItems: string;
        flexDirection: string;
        border: string;
        borderRadius: string;
        margin: string;
        padding: string;
        backgroundColor: string;
        zIndex: number;
        transform: string;
    };
    rightContainer: {
        [x: string]: string | {
            gap: string;
        };
        float: string;
        display: string;
        flexDirection: string;
        marginLeft: string;
        gap: string;
        alignItems: string;
    };
    actionBtn: {
        [x: string]: string | {
            border: string;
            rightMargin?: undefined;
        } | {
            rightMargin: string;
            border?: undefined;
        };
        padding: string;
        alignItems: string;
        height: string;
        maxWidth: string;
        display: string;
        flexDirection: string;
        rightMargin: string;
        '&:hover': {
            border: string;
        };
        '&:focus': {
            border: string;
        };
    };
    replyActionBtn: {
        width: string;
    };
    actionBtnText: {
        fontSize: string;
        lineHeight: string;
        color: string;
        border: string;
        boxShadow: string;
    };
    replyActionBtnText: {
        backgroundColor: string;
        color: string;
        boxShadow: string;
        '&:hover': {
            backgroundColor: string;
            color: string;
            border: string;
        };
    };
    btnIcon: {
        marginTop: string;
    };
    btnText: {
        fontSize: string;
        fontWeight: number;
    };
    actionIconBtn: {
        marginTop: string;
        color: string;
    };
    addNoteBtn: {
        height: string;
        width: string;
        paddingLeft: number;
        color: string;
    };
};
export default CcfDigitalEmailV2FooterStyles;
