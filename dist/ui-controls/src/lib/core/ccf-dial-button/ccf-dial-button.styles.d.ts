import { Theme } from '@mui/material';
/**
 * Styling for ccfDialButtonStyles
 * @returns ccfDialButtonStyles CSS properties as a JSON object
 * @example ccfDialButtonStyles
*/
declare const ccfDialButtonStyles: (theme: Theme) => {
    dialButtonContainer: {
        float: string;
        cursor: string;
        width: string;
        background: string;
        border: string;
        textAlign: string;
        '&:hover, &:focus, &:active': {
            backgroundColor: string;
            outline: string;
            borderRadius: string;
        };
        '&:hover': {
            '& .dialKeyNumber, & .dialKeyText': {
                color: string | undefined;
            };
        };
        '&:active': {
            '& .dialKeyNumber, & .dialKeyText': {
                color: string;
            };
        };
    };
    dialKeyNumber: {
        color: string;
        fontFamily: string;
        display: string;
        paddingBottom: string;
    };
    dialKeyText: {
        color: string;
        fontSize: string;
        display: string;
        marginTop: string;
        fontFamily: string;
        textTransform: string;
    };
};
export default ccfDialButtonStyles;
