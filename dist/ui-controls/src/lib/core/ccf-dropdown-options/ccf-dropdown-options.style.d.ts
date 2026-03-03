import { Theme } from '@mui/material';
/**
  * @example styles for dropdown component
  */
export declare const ccfDropdownOptionsStyles: (theme: Theme) => {
    listSubheader: {
        display: string;
        justifyContent: string;
        marginTop: string;
        paddingRight: string;
    };
    buttonsBox: {
        backgroundColor: string;
        position: string;
        bottom: number;
        justifyContent: string;
        gap: number;
        display: string;
        paddingBottom: string;
        paddingRight: string;
        paddingTop: string;
        marginTop: string;
    };
    closeIcon: {
        cursor: string;
        color: string;
    };
    closeButton: {
        minWidth: string;
        boxShadow: string;
        border: string;
        padding: number;
        '&:hover': {
            background: string;
            border: string;
            boxShadow: string;
        };
    };
    focusedElement: {
        '&:focus': {
            border: string;
            borderRadius: string;
        };
    };
    placeholder: {
        fontSize: string;
        maxWidth: string;
        textOverflow: string;
        overflow: string;
        whiteSpace: string;
    };
    datePickerBox: {
        display: string;
        gap: number;
        width: string;
    };
    menuItem: {
        maxHeight: string;
        maxWidth: string;
    };
    menu: {
        '& + .MuiAutocomplete-popper .MuiAutocomplete-option': {
            paddingLeft: string;
            paddingRight: string;
        };
        '& + .MuiAutocomplete-popper .MuiAutocomplete-listbox': {
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
        };
    };
    valueItem: {
        '.MuiInputBase-root': {
            fontSize: import("csstype").Property.FontSize<string | number> | undefined;
            color: string;
            height: string;
        };
    };
    inputAlign: {
        '.MuiInputBase-input': {
            height: string;
        };
    };
    formControl: {
        m: number;
        input: {
            '&::placeholder': {
                color: string;
                opacity: number;
            };
        };
        display: string;
        textSize: string;
        flexDirection: string;
        '.MuiFormControl-root': {
            marginBottom: string;
        };
        '& .MuiFormControlLabel-label': {
            fontSize: string;
        };
    };
    loadMoreButton: {
        color: string | undefined;
        fontSize: string;
        fontWeight: number;
        textDecoration: string;
        cursor: string;
    };
    loadMoreContainer: {
        display: string;
        margin: string;
        padding: string;
    };
    dropdownOptionsCount: {
        color: string;
        fontSize: string;
        fontWeight: number;
        marginLeft: string;
        lineHeight: string;
        padding: string;
    };
    icon: {
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        marginLeft: string;
    };
    tagNameFont: {
        fontSize: string;
    };
    dropdownTextStyles: {
        fontSize: string;
        fontWeight: number;
    };
    listSubheaderForCopilotFilters: {
        display: string;
        justifyContent: string;
        paddingTop: string;
        paddingRight: string;
        paddingLeft: string;
        background: string | undefined;
    };
    filterIcon: {
        width: string;
        height: string;
        color: string;
        marginRight: string;
    };
    subtextForCopilotFilters: {
        display: string;
        justifyContent: string;
        padding: string;
        fontSize: string;
    };
};
