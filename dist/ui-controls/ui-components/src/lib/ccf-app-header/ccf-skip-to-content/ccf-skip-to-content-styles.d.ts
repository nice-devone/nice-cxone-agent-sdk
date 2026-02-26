import { Theme } from '@mui/material';
/**
 *
 * @returns SkipToContentStyles
 * @example - SkipToContentStyles()
 */
export declare const SkipToContentStyles: (theme: Theme) => {
    button: {
        [x: string]: string | number | {
            backgroundColor: string;
            outline: string;
            border: string;
            boxShadow: string;
            padding?: undefined;
        } | {
            padding: string;
            backgroundColor?: undefined;
            outline?: undefined;
            border?: undefined;
            boxShadow?: undefined;
        };
        backgroundColor: string;
        color: string;
        padding: string;
        borderRadius: string;
        border: string;
        fontWeight: number;
        fontSize: string;
        textTransform: string;
        outline: string;
        boxShadow: string;
        ':hover, :focus, :focus-visible': {
            backgroundColor: string;
            outline: string;
            border: string;
            boxShadow: string;
        };
    };
};
export default SkipToContentStyles;
