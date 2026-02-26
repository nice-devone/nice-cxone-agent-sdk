import { Theme } from '@mui/material';
/**
 * return styles used for the component
 * @example ccfVoiceBioMetricsStyles(theme)
 * @returns styles
 */
declare const ccfVoiceBioMetricsStyles: (theme: Theme) => {
    listSubheader: {
        display: string;
        justifyContent: string;
        padding: number;
    };
    closeIcon: {
        cursor: string;
        color: string;
        marginLeft: string;
        fontSize: string;
    };
    voiceBioOptionsText: {
        fontSize: string;
        fontWeight: number;
    };
    flexContainer: {
        display: string;
        flexDirection: string;
    };
    voiceBioInput: {
        marginBottom: string;
        '& .MuiInputBase-root': {
            paddingRight: number;
        };
    };
    redStar: {
        color: string;
    };
    verifyBtn: {
        display: string;
        marginLeft: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
    };
    container: {
        width: string;
        paddingBottom: string;
    };
    radioOptions: {
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        lineHeight: string;
        margin: string;
    };
    optoutReasonRadio: {
        '& svg': {
            width: string;
            height: string;
        };
        '& p': {
            paddingBottom: number;
        };
    };
    optoutReasonsHeading: {
        color: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        paddingLeft: string;
        fontWeight: number;
        marginBottom: string;
    };
    voiceBioPopover: {
        marginLeft: string;
    };
    popoverContainer: {
        margin: string;
        button: {
            fontSize: import("csstype").Property.FontSize<string | number> | undefined;
            fontWeight: number;
        };
    };
    popoverReasonsContainer: {
        margin: number;
        maxHeight: string;
        overflowY: string;
        paddingLeft: string;
    };
    startBtn: {
        marginLeft: string;
        minWidth: string;
        color: string;
    };
    popOverMain: {
        padding: string;
    };
    statusMessageContainer: {
        [x: string]: string | {
            paddingBottom: string;
        };
        display: string;
        alignItems: string;
        cursor: string;
    };
    statusMessage: {
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        padding: string;
    };
    errorMessage: {
        color: string;
        fontSize: string;
        padding: string;
    };
    innerMessage: {
        fontSize: string;
        margin: number;
        padding: string;
    };
    optOutReasonsBtns: {
        display: string;
        justifyContent: string;
        fontSize: string;
        padding: string;
        flexDirection: string;
        gap: string;
        position: string;
        bottom: number;
        paddingRight: number;
        paddingBottom: number;
        button: {
            fontSize: import("csstype").Property.FontSize<string | number> | undefined;
            fontWeight: number;
        };
    };
    btnDiv: {
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        display: string;
        justifyContent: string;
    };
    popoverHeading: {
        color: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        fontWeight: string;
    };
};
export default ccfVoiceBioMetricsStyles;
