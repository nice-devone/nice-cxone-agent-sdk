import { Theme } from '@mui/material';
/**
 * return styles used for the component
 * @example ccfAddChannelOptionsStyles(theme)
 * @returns styles
 */
declare const ccfAddChannelOptionsStyles: (theme: Theme) => {
    container: {
        width: string;
        paddingBottom: string;
    };
    listSubheader: {
        display: string;
        justifyContent: string;
        paddingRight: string;
        paddingTop: string;
        paddingBottom: string;
    };
    customizeText: {
        fontWeight: import("csstype").Property.FontWeight | undefined;
        color: string;
    };
    closeIcon: {
        cursor: string;
        color: string;
    };
    closeButton: {
        border: string;
        '&:focus': {
            borderColor: string;
            borderRadius: string;
        };
        '&:hover': {
            border: string;
        };
        boxShadow: string;
        marginTop: string;
    };
    outboundOptionsText: {
        fontSize: string;
        fontWeight: number;
    };
    flexContainer: {
        display: string;
        flexDirection: string;
    };
    numberOptionsContainer: {
        display: string;
        flexDirection: string;
        justifyContent: string;
        alignItems: string;
    };
    voiceCallIcon: {
        fill: string;
        marginTop: string;
    };
    optionContainer: {
        padding: string;
        '&:hover': {
            backgroundColor: string;
        };
    };
    emailDetails: {
        display: string;
        flexDirection: string;
        justifyContent: string;
        cursor: string;
    };
    iconContainer: {
        padding: string;
        cursor: string;
        '&:hover': {
            borderRadius: string;
            backgroundColor: string | undefined;
        };
    };
    disabledIconContainer: {
        cursor: string;
        pointerEvents: string;
    };
    disabledIcon: {
        fill: string | undefined;
    };
    phoneNumber: {
        textOverflow: string;
        overflow: string;
        marginTop: string;
        width: string;
    };
    phoneListContainer: {
        margin: string;
    };
    collapse: {
        width: string;
        padding: string;
    };
    emailText: {
        marginLeft: string;
        textOverflow: string;
        overflow: string;
    };
    emailListContainer: {
        margin: string;
    };
    phoneEmailText: {
        padding: string;
    };
    ellipsisBox: {
        textOverflow: string;
        overflow: string;
    };
};
export default ccfAddChannelOptionsStyles;
