import { Theme } from '@mui/material';
/**
 * @param isPrimary - Theme
 * @param brandingColor - Branding Profile Color
 */
/**
 * Properties for the CCF Loader component
 */
interface CcfLoaderStylesOptions {
    /**
     * Is Primary Boolean Value for Theme Color
     */
    isPrimary?: boolean;
    /**
     * Branding Color Value as given in Branding Profile Object
     */
    brandingColor?: string;
}
/**
 * @param theme - Theme palette
 * @param ccfLoaderOptions - isPrimary and brandingColor options
 * @returns ccfLoaderStyles
 * @example - ccfLoaderStyles
 */
declare const ccfLoaderStyles: (theme: Theme, options: CcfLoaderStylesOptions) => {
    loaderContainer: {
        display: string;
    };
    loaderBox: {
        margin: number;
        display: string;
        paddingLeft: number;
    };
    loader: {
        '@keyframes animate': {
            '0%': {
                transform: string;
            };
            '25%': {
                transform: string;
            };
            '50%': {
                transform: string;
            };
            '75%': {
                transform: string;
            };
            '100%': {
                transform: string;
            };
        };
        listStyle: string;
        width: string;
        height: string;
        background: string;
        margin: string;
        animation: string;
    };
    firstLoaderBar: {
        animationDelay: string;
    };
    secondLoaderBar: {
        animationDelay: string;
    };
    thirdLoaderBar: {
        animationDelay: string;
    };
    loaderColor: {
        color: string;
    };
};
export default ccfLoaderStyles;
