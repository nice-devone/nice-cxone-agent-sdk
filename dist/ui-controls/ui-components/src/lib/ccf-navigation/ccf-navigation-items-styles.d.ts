import { Theme } from '@mui/material';
/**
 * style object for ccf-navigation-items
 * @returns CcfNavigationItemsStyles styles object
 * ```
 * @example
 * <CcfNavigationItemsStyles/>
 * ```
 */
declare const CcfNavigationItemsStyles: (theme: Theme) => {
    interactionSpaceResponsive: {
        minWidth: string;
        padding: string;
    };
    contactHistoryResponsive: {
        ml: number;
        position: string;
    };
    rightGridContainer: {
        [x: string]: string | {
            padding: string;
            height: string;
        };
        display: string;
        height: string;
        flex: string;
        overflowY: string;
    };
    fullView: {
        [x: string]: string | {
            width: string;
            padding: number;
        };
        height: string;
    };
    screenPopContainer: {
        height: string;
        padding: string;
    };
    navItemIcon: {
        fill: string;
        stroke: string;
    };
};
export default CcfNavigationItemsStyles;
