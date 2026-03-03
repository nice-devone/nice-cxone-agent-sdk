import { Theme } from '@mui/material';
/**
 * @example styles for alert component
 */
declare const ccfDatePickerStyle: (theme: Theme) => {
    datePicker: {
        height: string;
        width: string;
        'svg.mobileCalendarIcon': {
            marginRight: string;
            marginTop: string;
        };
    };
    textBox: {
        height: string;
        input: {
            fontSize: import("@mui/material/styles/createTypography").CSSProperties;
            fontWeight: import("csstype").Property.FontWeight | undefined;
            padding: number;
            paddingLeft: string;
        };
        '.MuiInputAdornment-root': {
            marginLeft: string;
            paddingRight: string;
        };
        'button.MuiButtonBase-root': {
            padding: string;
            '&:focus': {
                border: string;
                borderRadius: string;
            };
        };
    };
    searchIcon: {
        paddingRight: number;
        marginRight: number;
    };
    backArrowIcon: {
        transform: string;
    };
    textBoxParent: {
        display: string;
        border: string;
        borderRadius: string;
        height: string;
        'button.MuiToggleInput-root': {
            height: string;
            ':hover': {
                backgroundColor: string | undefined;
            };
        };
        '.MuiTextField-root': {
            '.MuiInputBase-root': {
                height: string;
            };
        };
    };
    flexStyles: {
        display: string;
        flexDirection: string;
        'button.MuiButtonBase-root': {
            padding: string;
            minWidth: string;
            width: string;
            background: string;
            border: string;
            borderRadius: string;
            'svg.MuiSvgIcon-root': {
                height: string;
            };
            '&:focus': {
                border: string;
                borderRadius: string;
            };
        };
    };
    arrowButtonWrapper: {
        display: string;
    };
    labelText: {
        fontWeight: import("csstype").Property.FontWeight | undefined;
        color: string;
        margin: string;
    };
    dateFocusStyles: {
        borderRadius: string;
        '&:focus, &.Mui-focusVisible': {
            border: string;
        };
    };
};
export default ccfDatePickerStyle;
