import { Theme } from '@mui/material';
/**
 * Styling for Enhanced workflow execute editor Automatic Create component
 * @returns CcfAutomaticCreateStyles CSS properties as a JSON object
 * @example CcfAutomaticCreateStyles
*/
declare const CcfAutomaticCreateStyles: (theme: Theme) => {
    mainContainer: {
        width: string;
        paddingTop: string;
    };
    filterContainer: {
        padding: string;
        borderRadius: string;
        maxHeight: string;
        overflowY: string;
        backgroundColor: string;
    };
    fieldscontainer: {
        padding: string;
        borderRadius: string;
    };
    labelTypography: {
        textAlign: string;
        color: string;
        fontSize: string;
        lineHeight: string;
    };
    selectionDropdown: {
        maxHeight: string;
        maxWidth: string;
        textAlign: string;
        width: string;
        '& .MuiSelect-select': {
            minHeight: string;
        };
    };
    autocompleteInput: {
        '& .MuiInputBase-root': {
            height: string;
            fontSize: string;
            '& .MuiInputBase-input::placeholder': {
                fontSize: string;
                opacity: number;
            };
        };
        '& input': {
            padding: string;
        };
    };
    paperComponent: {
        '&.MuiAutocomplete-paper': {
            maxHeight: string;
            marginTop: string;
            '& .MuiAutocomplete-listbox': {
                maxHeight: string;
                padding: number;
            };
            '& .MuiAutocomplete-option': {
                fontSize: string;
                fontWeight: number;
                lineHeight: string;
                minHeight: string;
                padding: string;
                color: string;
                textAlign: string;
            };
        };
    };
    dropdownMenu: {
        top: number;
        maxHeight: number;
        overflow: string;
        '& .MuiMenuItem-root': {
            fontSize: string;
            fontWeight: string;
            lineHeight: string;
            textAlign: string;
            color: string;
            minHeight: string;
        };
        '& .MuiMenu-list': {
            paddingTop: string;
        };
        '&::-webkit-scrollbar': {
            width: string;
        };
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: string | undefined;
            borderRadius: string;
        };
    };
    dropdownPlaceHolder: {
        overflow: string;
        color: string;
        textOverflow: string;
        fontSize: string;
        fontStyle: string;
        fontWeight: number;
        lineHeight: string;
    };
    paramHeadingTypography: {
        fontSize: string;
        fontWeight: string;
        lineHeight: string;
        textAlign: string;
        color: string;
    };
    buttonAdd: {
        color: string;
        backgroundColor: string;
        minWidth: string;
        fontWeight: number;
        textTransform: string;
        height: string;
        textAlign: string;
        display: string;
        alignItems: string;
        justifyContent: string;
        gap: string;
        padding: string;
        '&.Mui-disabled': {
            backgroundColor: string;
            border: string;
            cursor: string;
            opacity: number;
        };
    };
    deleteIcon: {
        marginRight: string;
        width: string;
        height: string;
    };
    buttonTypography: {
        fontSize: string;
        fontWeight: string;
        lineHeight: string;
        color: string;
        Paddingbottom: string;
    };
    buttonDelete: {
        color: string;
        backgroundColor: string;
        marginTop: string;
        marginLeft: string;
        padding: number;
        minWidth: string;
        width: string;
        height: string;
        background: string;
        border: string;
    };
    inputPlaceHolder: {
        '& .MuiOutlinedInput-root': {
            '& input::placeholder': {
                color: string;
                opacity: string;
                textOverflow: string;
                fontSize: string;
                fontStyle: string;
                fontWeight: number;
                lineHeight: string;
            };
        };
    };
    variableInputContainer: {
        display: string;
        justifyContent: string;
        borderRadius: string;
        flexDirection: string;
        gap: string;
        maxWidth: string;
    };
    dropdownContainer: {
        display: string;
        justifyContent: string;
        borderRadius: string;
        flexDirection: string;
        gap: string;
    };
};
export default CcfAutomaticCreateStyles;
