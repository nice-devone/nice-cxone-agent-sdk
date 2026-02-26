import { Theme } from '@mui/material';
/**
 * return styles used for the component
 * @example <CcfDialPadStyles />
 * @returns styles
 */
declare const dialPadStyles: (theme: Theme) => {
    dialPadContainer: {
        display: string;
        marginBottom: string;
    };
    dialKeyPadContainer: {
        display: string;
        flexWrap: string;
    };
    textFieldContainer: {
        width: string;
    };
    dialKeyButtonList: {
        margin: string;
        padding: string;
        listStyle: string;
    };
    dialKeyPadSmViewContainer: {
        display: string;
        flexWrap: string;
        rowGap: string;
        margintop: string;
    };
    cancelIcon: {
        padding: string;
    };
    backIconButton: {
        padding: string;
    };
    backIcon: {
        fill: string;
    };
    alignRight: {
        textAlign: string;
    };
    inputFieldError: {
        '& .MuiFormHelperText-root': {
            color: string;
            fontSize: string;
            textAlign: string;
            margin: string;
        };
        '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: string;
        };
    };
};
export default dialPadStyles;
