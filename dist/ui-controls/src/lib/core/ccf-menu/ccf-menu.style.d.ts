import { Theme } from '@mui/material';
/**
 * Styling for CcfMenu
 * @param theme - MUI theme object
 * @returns CcfMenu CSS properties as a JSON object
 * @example ColumnStyles(theme)
 */
declare const ColumnStyles: (theme: Theme) => {
    focussedElement: {
        '&:focus': {
            border: string;
            borderRadius: string;
        };
    };
    focussedBackground: {
        '&:focus': {
            backgroundColor: string;
        };
    };
};
export default ColumnStyles;
