import { Theme } from '@mui/material';
/**
 * return styles used for the component
 * @example <ccfToastStyles />
 * @returns styles
 */
declare const ccfToastStyles: (theme: Theme) => {
    successAlertToast: {
        '.MuiAlert-filledSuccess': {
            background: string;
            opacity: string;
            width: string;
            height: string;
            font: string;
            letterSpacing: string;
            color: string;
            display: string;
            alignItems: string;
        };
        '.MuiAlert-icon': {
            marginLeft?: string | undefined;
        };
        '.MuiAlert-action': {
            marginLeft?: string | undefined;
            marginRight?: string | undefined;
        };
    };
    successTick: {
        color: string;
    };
};
export default ccfToastStyles;
