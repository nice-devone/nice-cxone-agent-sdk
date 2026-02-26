import { Theme } from '@mui/material';
/**
 * @example styles for radio highlight component
 */
declare const ccfRadioHighlightStyles: (theme: Theme) => {
    radioBox: {
        display: string;
        alignItems: string;
        justifyContent: string;
        backgroundColor: string;
    };
    tooltipHeader: {
        color: string;
        font: string;
        letterSpacing: string;
        opacity: string;
    };
    checkedIconRad: {
        background: string;
        '&::before': {
            width: string;
            height: string;
            content: string;
            display: string;
            backgroundImage: string;
        };
    };
    iconRad: {
        width: string;
        height: string;
        boxShadow: string;
        borderRadius: string;
        backgroundColor: string | undefined;
        backgroundImage: string;
    };
    highlightLabelWithRadio: {
        display: string;
        alignItems: string;
        justifyContent: string;
        gap: string;
        '& .MuiTypography-body1': {
            fontSize: string;
            lineHeight: number;
        };
        '& .MuiRadio-root': {
            padding: string;
        };
    };
    infoIcon: {
        fontSize: string;
        color: string;
        cursor: string;
        visibility: string;
        marginTop: string;
    };
    showInfo: {
        visibility: string;
    };
    customBlue: {
        width: string;
        height: string;
        textAlign: string;
        borderRadius: string;
        color: string;
        backgroundColor: string;
        '& .MuiFormControlLabel-label': {
            fontSize: string;
        };
        '& .MuiIconButton-label span': {
            width: string;
            height: string;
            backgroundColor: string;
        };
        '& input:hover ~ .MuiIconButton-label span': {
            backgroundColor: string;
        };
        '& .MuiIconButton-label span:before': {
            backgroundImage: string;
            width: string;
            height: string;
        };
    };
    hightlightBlue: {
        background: string | undefined;
        color: string;
        '& .MuiFormControlLabel-label': {
            fontSize: string;
        };
    };
};
export default ccfRadioHighlightStyles;
