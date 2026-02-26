import { Theme } from '@mui/material';
/**
 * styling for CcfTabs
 * @param theme - MUI theme object
 * @returns CcfTabs styles object
 * ```
 * @example
 * CcfTabsStyle(theme)
 * ```
 */
declare const CcfTabsStyle: (theme: Theme) => {
    focussedElement: {
        border: string;
        '&:focus': {
            border: string;
        };
        '&:hover, &:active': {
            boxShadow: string;
        };
        '&:focus-visible:not(.Mui-selected)': {
            border: string;
            boxShadow: string;
        };
    };
    tab: {
        '&.MuiTab-root': {
            color: string;
        };
        '&.Mui-selected': {
            color: string;
        };
    };
};
export default CcfTabsStyle;
