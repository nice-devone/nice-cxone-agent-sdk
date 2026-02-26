import { Theme } from '@mui/material';
/**
 * enum for rich text buttons
*/
export declare enum RICH_TOOLBAR_BUTTONS {
    BOLD = "bold",
    ITALIC = "italic",
    UNDERLINE = "underline",
    NUMBER_LIST = "number",
    BULLET_LIST = "bullet",
    LEFT_ALIGN = "left",
    RIGHT_ALIGN = "right",
    CENTER_ALIGN = "center",
    RTL = "rtl",
    LTR = "ltr"
}
/**
 * Styling for ccf-editor-toolbar-plugin
 * @returns ccf-editor-toolbar-plugin CSS properties as a JSON object
 * @example CcfEditorToolbarPluginStyles(theme)
*/
declare const CcfEditorToolbarPluginStyles: (theme: Theme) => {
    button: {
        color: string;
        minWidth: string;
        border: string;
        '&:hover': {
            backgroundColor: string;
        };
        '&:focus': {
            borderColor: string | undefined;
        };
        marginTop: string;
    };
    revampedButton: {
        color: string;
        minWidth: string;
        height: string;
        border: string;
        '&:hover': {
            backgroundColor: string;
        };
        '&:focus': {
            borderColor: string | undefined;
        };
        padding: string;
    };
    toolbar: {
        display: string;
        width: string;
        borderBottom: string;
    };
    buttonActive: {
        background: string | undefined;
        marginRight: string;
    };
    linkBox: {
        width: string;
        backgroundColor: string;
        marginTop: string;
    };
    btnCheck: {
        verticalAlign: string;
    };
    btnContainer: {
        'min-width': string;
        padding: number;
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
        fontSize: string;
    };
    modalContentContainer: {
        display: string;
        width: string;
    };
    modalContent: {
        '> :not(:first-of-type)': {
            marginTop: string;
        };
        width: string;
        overflow: string;
        wordBreak: string;
    };
    focussedElement: {
        '&:focus': {
            border: string;
            borderRadius: string;
        };
    };
    title: {
        [x: string]: string | number | {
            fontSize: string;
        };
        fontSize: string;
        fontWeight: number;
        marginBottom: string;
    };
    inputdiv: {
        display: string;
        justifyContent: string;
    };
    closeButtonColumn: {
        fontSize: string;
        display: string;
        alignItems: string;
        '> button': {
            padding: number;
        };
    };
    buttonsContainer: {
        display: string;
        justifyContent: string;
        marginTop: string;
        '> :not(:first-of-type)': {
            marginLeft: string;
        };
        button: {
            width: string;
            height: string;
            fontSize: string;
        };
    };
    inputBtn: {
        '& input[type=number]': {
            '-moz-appearance': string;
        };
        '& input[type=number]::-webkit-outer-spin-button': {
            '-webkit-appearance': string;
            margin: number;
        };
        '& input[type=number]::-webkit-inner-spin-button': {
            '-webkit-appearance': string;
            margin: number;
        };
    };
    toolbarBtn: {
        height: string;
        width: string;
        paddingBottom: string;
    };
    richTextToolbarPopover: {
        display: string;
        flexDirection: string;
        verticalAlign: string;
        gap: string;
        alignItems: string;
        flexWrap: string;
    };
    revampButtonContainer: {
        color: string;
        width: string;
        height: string;
        minWidth: string;
        display: string;
        alignItems: string;
        justifyContent: string;
        border: string;
        '&:focus': {
            borderColor: string | undefined;
            borderRadius: string;
        };
    };
    toolbarPopper: {
        minwidth: string;
        maxWidth: string;
    };
};
export default CcfEditorToolbarPluginStyles;
