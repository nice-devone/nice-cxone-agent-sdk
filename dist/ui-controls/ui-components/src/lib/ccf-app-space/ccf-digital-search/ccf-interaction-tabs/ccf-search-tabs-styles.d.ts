import { Theme } from '@mui/material';
/**
 * style object for ccf-search-tab
 * @returns CcfSearchTabsStyles object
 * @example CcfSearchTabsStyles()
 */
declare const CcfSearchTabsStyles: (theme: Theme) => {
    searchTabsWrapper: {
        background: string;
        display: string;
        width: string;
        button: {
            fontWeight: number;
            borderBottom: string;
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
        '& .MuiButtonBase-root.Mui-selected': {
            color: string;
        };
    };
    searchTabsDropdown: {
        m: number;
        minWidth: number;
    };
};
export default CcfSearchTabsStyles;
