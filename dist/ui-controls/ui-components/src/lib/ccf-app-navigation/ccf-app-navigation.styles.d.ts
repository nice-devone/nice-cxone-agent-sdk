import { Theme } from '@mui/material';
/**
 * Styling for ccf-app-navigation
 * @returns ccf-app-navigation CSS properties as a JSON object
 * @example ccfAppNavigationStyles(theme)
 */
export declare const ccfAppNavigationStyles: (theme: Theme) => {
    sidebarContainer: {
        [x: string]: string | {
            backgroundColor: string;
            padding: string;
            border?: undefined;
        } | {
            border: string;
            backgroundColor?: undefined;
            padding?: undefined;
        };
        justifyContent: string;
        backgroundColor: string;
        height: string;
        padding: string;
        ':focus, :focus-visible': {
            border: string;
        };
    };
    sidebar: {
        position: string;
        flexShrink: number;
    };
    moreMenuButton: {
        transform: string;
    };
    hamburgerContainer: {
        '&::-webkit-scrollbar': {
            width: string;
        };
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: string;
            borderRadius: string;
        };
        '&::-webkit-scrollbar-track': {
            backgroundColor: string;
        };
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: string;
        };
        overflowY: string;
        width: string;
        '[dir=\'rtl\'] &': {
            [x: string]: {
                left: string;
            };
        };
        '[dir=\'ltr\'] &': {
            left: string;
        };
    };
    hamburgerRootContainer: {
        [x: string]: {
            '&.MuiPopover-root': {
                top: string;
            };
        };
    };
};
export default ccfAppNavigationStyles;
