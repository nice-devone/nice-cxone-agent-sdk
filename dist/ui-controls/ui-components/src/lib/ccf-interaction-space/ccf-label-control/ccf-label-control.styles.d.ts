import { Theme } from '@mui/material';
/**
 * @param label - label
 * @param fieldOnFocus - field focus
 * @param autocompleteInputwidth -width
 */
interface CcfLabelControlStylesOptions {
    /**
     * label - labels of field
     */
    label?: string;
    /**
     * fieldOnFocus - current field which is focused
     */
    fieldOnFocus?: string;
    /**
     * autocompleteInputwidth - minimum width of autocomplete
     */
    autocompleteInputwidth: string;
}
/**
 * Properties for the CCF Loader component
 */
/**
 ** @example styles for label control component
*/
declare const CcfLabelControlStyles: (theme: Theme, options: CcfLabelControlStylesOptions) => {
    wrapper: {
        display: string;
        height: string;
        width: string;
    };
    text: {
        padding: string;
        wordBreak: string;
        display: string;
        fontSize: string;
    };
    control: {
        fontSize: string;
    };
    autocomplete: {
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: string;
        };
        '& .MuiAutocomplete-inputRoot': {
            padding: number;
            fontSize: string;
            maxHeight: string;
            overflowY: string;
            font: string;
            '& .MuiAutocomplete-input': {
                padding: string;
                minWidth: string;
            };
        };
        '& .MuiAutocomplete-clearIndicator': {
            display: string;
        };
        '& .MuiAutocomplete-endAdornment': {
            display: string;
        };
        width: string;
        '& .MuiChip-label': {
            paddingLeft: string;
            paddingRight: string;
        };
        '& .MuiSvgIcon-root': {
            height: string;
        };
        '& .MuiInputBase-root': {
            marginLeft: string;
            paddingRight: string;
            paddingLeft: string;
            transform: string;
            '&:focus-within': {
                border: string;
            };
        };
    };
    chip: {
        borderRadius: string;
        backgroundColor: string;
        color: string;
        height: string;
        fontSize: string;
        border: string;
        fontWeight: number;
        lineHeight: string;
        fontFamily: string;
        Padding: string;
    };
    chipDelete: {
        '& .MuiChip-deleteIcon': {
            backgroundColor: string;
            height: string;
            margin: string;
            color: string;
        };
    };
    textfieldstyles: {
        '& .MuiOutlinedInput-root': {
            transform: string;
            '& fieldset': {
                border: string;
            };
            '& input.MuiOutlinedInput-input': {
                padding: string;
                fontSize: string;
                fontWeight: number;
                lineHeight: string;
                fontFamily: string;
                color: string;
                letterSpacing: string;
            };
        };
        '& .Mui-error': {
            border: string;
            borderRadius: string;
        };
        '& .MuiFormHelperText-root': {
            color: string;
            border: string;
            margin: string;
            padding: string;
        };
        width: string;
    };
    fromDropdown: {
        marginLeft: string;
        paddingLeft: string;
        fontSize: string;
        minWidth: string;
        transform: string;
        '& .MuiSvgIcon-root': {
            fontSize: string;
        };
        '& .MuiInput-input': {
            paddingTop: number;
            paddingBottom: number;
        };
        '& .MuiSelect-select': {
            whiteSpace: string;
            overflowWrap: string;
        };
    };
    fromMenuProps: {
        PaperProps: {
            sx: {
                maxHeight: string;
                maxWidth: string;
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
                '& .MuiMenuItem-root': {
                    paddingLeft: string;
                    paddingRight: string;
                };
            };
        };
    };
    selectedFromAddress: {
        fontSize: string;
    };
    dropDownItemHeader: {
        fontWeight: number;
        fontSize: string;
        lineHeight: string;
        color: string;
        overflow: string;
        textOverflow: string;
    };
    dropDownItemSubHeader: {
        fontWeight: number;
        fontSize: string;
        color: string;
        lineHeight: string;
        overflow: string;
        textOverflow: string;
    };
    dropdownItem: {
        whiteSpace: string;
        overflow: string;
    };
};
export default CcfLabelControlStyles;
