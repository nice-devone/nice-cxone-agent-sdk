import { Theme } from '@mui/material';
/**
 * Styling for scheduler
 * @returns Scheduler CSS properties as a JSON object
 * @example popOverTagStyles
 */
declare const popOverTagStyles: (theme: Theme) => {
    disablePopover: {
        pointerEvents: string;
        '.MuiPaper-root': {
            width: string;
            padding: string;
        };
    };
    headerTag: {
        fontWeight: string;
    };
    disableTagOperations: {
        pointerEvents: string;
    };
    addTagText: {
        margin: string;
    };
    digitalIcon: {
        marginTop: string;
    };
    tagNameFont: {
        fontSize: string;
    };
    chip: {
        boxShadow: string;
        borderRadius: string;
        marginTop: string;
        fontWeight: string;
        paddingLeft: string;
    };
    addNewBtn: {
        boxShadow: string;
        borderRadius: string;
        marginTop: string;
        fontWeight: string;
        paddingLeft: string;
        '&:focus': {
            outline: string;
            outlineOffset: string;
            boxShadow: string;
        };
    };
    addNewBtnText: {
        fontSize: string;
        fontWeight: string;
    };
    tagStack: {
        display: string;
    };
    popover: {
        '.MuiPaper-root': {
            width: string;
            padding: string;
        };
    };
    chipStyle: {
        color: string;
        width: string;
        fontSize: string;
        border: string;
        '&.MuiButtonBase-root': {
            marginRight: string;
            marginBottom: string;
        };
        '&.Mui-focusVisible': {
            border: string;
        };
        '& .MuiChip-deleteIcon': {
            color: string;
        };
    };
    autocomplete: {
        width: string;
        margin: string;
        '& label.MuiFormLabel-root': {
            fontSize: string;
            top: string;
        };
        '& div.MuiInputBase-root': {
            paddingTop: string;
            paddingBottom: string;
        };
    };
    plusIcon: {
        height: string;
        width: string;
        paddingRight: string;
    };
    viewLess: {
        marginLeft: string;
    };
};
export default popOverTagStyles;
