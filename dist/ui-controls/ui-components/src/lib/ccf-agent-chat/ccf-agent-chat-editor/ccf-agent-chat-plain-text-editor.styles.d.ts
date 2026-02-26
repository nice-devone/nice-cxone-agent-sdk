import { Theme } from '@mui/material';
export declare const editorTheme: {
    ltr: string;
    rtl: string;
    paragraph: string;
    link: string;
    text: {
        bold: string;
        code: string;
        italic: string;
        strikethrough: string;
        subscript: string;
        superscript: string;
        underline: string;
        underlineStrikethrough: string;
    };
};
/**
 * Classes for ccf-plain-text-editor
 * @param theme - theme object
 * @returns ccf-plain-text-editor css classes in string
 * @example plainTextEditorCSS(theme)
*/
export declare const plainTextEditorCSS: () => string;
/**
 * Styling for ccf-plain-text-editor
 *  @param theme - theme options
 *  @param isReplyMessageSelected - Boolean represents whether reply to message is selected or not
 * @returns ccf-plain-text-editor CSS properties as a JSON object
 * @example ccfPlainTextEditorStyles(theme)
*/
declare const ccfPlainTextEditorStyles: (theme: Theme, isReplyMessageSelected: boolean) => {
    editorContainer: {
        minHeight: string;
        height: string;
        maxHeight: string;
        display: string;
        opacity: string;
        width: string;
        background: string;
        border: string;
        margin: string;
        overflowY: string;
        borderRadius: string;
        padding: string;
        wordBreak: string;
        fontSize: string;
        outline: string;
    };
    editorFocus: {
        border: string;
    };
    editorBody: {
        outline: string;
        width: string;
    };
    dragNDrop: {
        flex: string;
        display: string;
        flexDirection: string;
        alignItems: string;
        padding: string;
        borderWidth: string;
        borderRadius: string;
        borderColor: string;
        borderStyle: string;
        outline: string;
        transition: string;
        minHeight: string;
        maxHeight: string;
        background: string;
    };
    plainTextToolbarBox: {
        display: string;
    };
};
export default ccfPlainTextEditorStyles;
