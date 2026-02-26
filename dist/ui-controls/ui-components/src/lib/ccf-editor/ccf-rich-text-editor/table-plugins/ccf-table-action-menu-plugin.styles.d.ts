import { Theme } from '@mui/material';
/**
 * Styling for TableActionMenuPlugin
 * @returns TableActionMenuPlugin CSS properties as a JSON object
 * @param theme - theme from mui
 * @example ccfTableActionMenuPluginStyles(theme)
*/
declare const ccfTableActionMenuPluginStyles: (theme: Theme) => {
    dropdown: {
        zIndex: string;
        display: string;
        position: string;
        boxShadow: string;
        borderRadius: string;
        maxHeight: string;
        overflowY: string;
        backgroundColor: string;
        '&::-webkit-scrollbar': {
            width: string;
            height: string;
        };
        '&::-webkit-scrollbar-track': {
            backgroundColor: string;
        };
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: string;
            borderRadius: string;
        };
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: string;
        };
    };
    item: {
        margin: string;
        padding: string;
        color: string;
        cursor: string;
        lineHeight: string;
        fontSize: string;
        fontWeight: string;
        display: string;
        alignContent: string;
        flexDirection: string;
        flexShrink: string;
        justifyContent: string;
        backgroundColor: string;
        borderRadius: string;
        border: string;
        maxWidth: string;
        minWidth: string;
        '&:hover': {
            backgroundColor: string;
        };
        '&:first-child': {
            marginTop: string;
        };
        '&:last-child': {
            marginBottom: string;
        };
    };
    text: {
        display: string;
        lineHeight: string;
        flexGrow: string;
        minWidth: string;
    };
    tableCellActionButtonContainer: {
        position: string;
        top: string;
        left: string;
        willChange: string;
    };
    tableCellActionButton: {
        justifyContent: string;
        alignItems: string;
        border: string;
        position: string;
        borderRadius: string;
        color: string;
        display: string;
        backgroundColor: string;
        cursor: string;
        height: string;
    };
    modalContainer: {
        [x: string]: string | {
            width: string;
            fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        };
        position: string;
        top: string;
        left: string;
        transform: string;
        backgroundColor: string;
        border: string;
        borderRadius: string;
        boxShadow: string;
        padding: string;
        width: string;
        fontSize: string;
    };
    ColorPickerPopover: {
        backgroundColor: string;
        width: string;
        border: string;
    };
    ColorButton: {
        width: string;
        height: string;
        border: string;
        borderRadius: string;
        margin: string;
        cursor: string;
    };
    ColorButtonContainer: {
        display: string;
        gridTemplateColumns: string;
        justifyItems: string;
        padding: string;
        borderTop: string;
    };
    ColorResetButton: {
        padding: string;
        cursor: string;
        fontSize: string;
        width: string;
    };
};
export default ccfTableActionMenuPluginStyles;
