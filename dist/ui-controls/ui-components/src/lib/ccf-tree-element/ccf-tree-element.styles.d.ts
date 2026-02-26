import { Theme } from '@mui/material';
/**
 * Used to get the treeElement styles object
 * @example -
 * ```
 * import treeElementStyles from './ccf-tree-element.styles';
 *
 * const theme = useTheme();
 * const styles = treeElementStyles(theme);
 *
 * sx={styles.button}
 * ```
 */
declare const treeElementStyles: (theme: Theme) => {
    treeContainer: {
        width: string;
        overflowX: string;
        maxHeight: string;
        flexGrow: number;
        maxWidth: number;
        fontSize: string;
        color: string;
        '& .MuiTreeItem-content .MuiTreeItem-label': {
            fontSize: string;
        };
        '& .MuiTreeItem-groupTransition': {
            padding: number;
        };
        '& .Mui-expanded .Mui-selected': {
            '&:hover': {
                backgroundColor: string | undefined;
            };
        };
        '& .parentNode > .Mui-expanded': {
            backgroundColor: string;
            color: string;
            borderTop: string;
            borderBottom: string;
            borderRadius: number;
        };
        '& .lastExpanded > .Mui-expanded': {
            backgroundColor: string;
            color: string;
            borderRadius: number;
        };
        '& .leafNode > .Mui-selected': {
            backgroundColor: string;
            color: string;
        };
    };
    dropdownIcon: {
        height: string;
        padding: number;
        color: string;
    };
    backIcon: {
        width: string;
        height: string;
        color: string;
        padding: string;
        transform: string;
    };
    backButton: {
        display: string;
        fontSize: string;
        padding: string;
    };
    clearField: {
        fontSize: string;
        padding: string;
        minWidth: string;
    };
    inputFields: {
        height: string;
        fontSize: string;
        color: string;
        flex: string;
    };
    savedInputFields: {
        '& .MuiOutlinedInput-root': {
            padding: number;
            borderRadius: number;
            border: string;
        };
        '& .MuiOutlinedInput-input::placeholder': {
            color: string;
            opacity: number;
        };
        '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: string;
            color: string;
        };
    };
    ccfPopOver: {
        '& .flexDisplay': {
            display: string;
            alignItems: string;
        };
        '& .startoverButton': {
            justifyContent: string;
            gap: string;
            fontSize: string;
            width: string;
            padding: string;
            fontWeight: number;
            borderTop: string;
            BorderBottom: string;
        };
        '& .MuiPaper-root .MuiPopover-paper': {
            border: string;
            borderRadius: number;
            boxShadow: string;
            borderTop: string;
        };
    };
};
export default treeElementStyles;
