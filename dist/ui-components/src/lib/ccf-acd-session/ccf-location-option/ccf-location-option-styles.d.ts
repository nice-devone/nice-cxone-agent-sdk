import { Theme } from '@mui/material';
/**
 * Styles for CcfLocationOption
 * @param theme - The theme object
 * @returns - The styles object
 * @example - ccfLocationOptionStyles(theme)
 */
declare const ccfLocationOptionStyles: (theme: Theme) => {
    locationLabel: {
        textAlign: string;
        fontSize: string;
        fontWeight: number;
        padding: string;
    };
    locationLabelDisabled: {
        color: string;
    };
    locationItem: {
        color: string;
        textAlign: string;
        '& .MuiSelect-select.MuiInputBase-input': {
            minHeight: string;
        };
        '& .MuiListItemText-primary, .MuiTypography-root, .MuiTypography-body1': {
            fontSize: string;
        };
    };
    locationNote: {
        textAlign: string;
        fontSize: string;
        padding: string;
        marginBottom: string;
    };
};
export default ccfLocationOptionStyles;
