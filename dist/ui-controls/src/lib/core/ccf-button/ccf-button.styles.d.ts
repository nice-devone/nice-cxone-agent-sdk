import { Theme } from '@mui/material';
/**
 * @example styles for button component
 */
declare const ccfButtonStyle: (theme: Theme, primary?: boolean) => {
    root: {
        color: string;
        border: string;
        backgroundColor: string;
        boxShadow: string;
        '&:hover': {
            backgroundColor: string;
            border: string;
            boxShadow: string;
        };
        '&:disabled': {
            backgroundColor: string;
            borderColor: string;
            boxShadow: string;
        };
    };
    customButton: {
        backgroundColor: string;
        color: string;
        '&:hover': {
            backgroundColor: string;
        };
    };
    outlinedButton: {
        backgroundColor: string;
        color: string;
        '&:hover': {
            backgroundColor: string;
        };
    };
};
export default ccfButtonStyle;
