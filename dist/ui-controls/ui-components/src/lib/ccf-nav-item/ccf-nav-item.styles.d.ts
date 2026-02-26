import { Theme } from '@mui/material';
/**
 * return styles used for the component
 * @example <ccfNavItemStyles />
 * @returns styles
 */
declare const ccfNavItemStyles: (theme: Theme) => {
    navItem: {
        cursor: string;
    };
    menuItemAlignment: {
        display: string;
        alignItems: string;
        justifyContent: string;
        width: number;
        height: number;
        margin: number;
        padding: number;
        '.Mui-selected': {
            backgroundColor: string;
            borderRadius: string;
        };
        color: string;
    };
    sidebarItemBadge: {
        '.MuiBadge-badge': {
            backgroundColor: string;
            color: string;
        };
    };
    sidebarItemBadgeStandard: {
        '.MuiBadge-badge': {
            backgroundColor: string;
            color: string;
        };
        '.MuiBadge-standard': {
            height: string;
            minWidth: string;
            fontSize: string;
            padding: string;
            border: string;
            position: string;
            top: string;
            left: string;
        };
    };
};
export default ccfNavItemStyles;
