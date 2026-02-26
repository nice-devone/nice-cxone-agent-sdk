import { Theme } from '@mui/material';
/**
 * @example styles for alert component
 */
declare const ccfAlertStyle: (theme: Theme) => {
    successToast: {
        '& .MuiAlert-filledSuccess': {
            background: string;
            opacity: string;
            width: string;
            height: string;
            font: string;
            letterSpacing: string;
            color: string;
            display: string;
            alignItems: string;
            borderRadius: string;
        };
    };
    successTick: {
        color: string;
    };
    closeIcon: {
        color: string;
        fontSize: string;
        opacity: string;
    };
};
export default ccfAlertStyle;
