import { Theme } from '@mui/material';
/**
 * style object for ccf-rejected-reason
 * @returns CcfRejectedReasonStyle styles object
 * ```
 * @example
 * import CcfRejectedReasonStyle from './ccf-rejected-reason-styles';
 * ```
 */
declare const CcfRejectedReasonStyle: (theme: Theme) => {
    container: {
        display: string;
        alignItems: string;
        gap: number;
        width: string;
        textAreaContainer: {
            '&.MuiOutlinedInput-root': {
                padding: string;
                fontSize: string;
                backgroundColor: string;
            };
        };
    };
    submitBtn: {
        height: string;
        padding: string;
        fontSize: string;
        minWidth: string;
        backgroundColor: string;
        fontWeight: number;
        color: string;
    };
    closeButton: {
        minWidth: string;
        boxShadow: string;
        border: string;
        padding: number;
        '&:hover': {
            background: string;
            border: string;
            boxShadow: string;
        };
    };
    closeIcon: {
        cursor: string;
        color: string;
    };
    focusedElement: {
        '&:focus': {
            border: string;
            borderRadius: string;
        };
    };
};
export default CcfRejectedReasonStyle;
