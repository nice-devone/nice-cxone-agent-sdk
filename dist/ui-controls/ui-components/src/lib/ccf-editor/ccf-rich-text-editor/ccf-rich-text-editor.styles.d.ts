import { Direction, Theme } from '@mui/material';
import type { EditorThemeClasses } from 'lexical';
export declare const customTableStyles: Map<string, string>;
/**
 * Theme class object for editor
*/
export declare const editorTheme: EditorThemeClasses;
export declare const RICH_TEXT_INPUT_STYLES: {
    BOLD: string;
    ITALIC: string;
    UNDERLINE: string;
    ORDERED_LIST: string;
    UNORDERED_LIST: string;
    LEFT_ALIGN: string;
    RIGHT_ALIGN: string;
    CENTER_ALIGN: string;
    MONOSPACE: string;
    RTL: string;
    LTR: string;
};
export declare const styleMap: {
    FontAndaleMono: {
        fontFamily: string;
    };
    FontArial: {
        fontFamily: string;
    };
    FontArialBlack: {
        fontFamily: string;
    };
    FontBookAntiqua: {
        fontFamily: string;
    };
    FontComicSansMS: {
        fontFamily: string;
    };
    FontCourierNew: {
        fontFamily: string;
    };
    FontGeorgia: {
        fontFamily: string;
    };
    FontHelvetica: {
        fontFamily: string;
    };
    FontImpact: {
        fontFamily: string;
    };
    FontMalgunGothic: {
        fontFamily: string;
    };
    FontTahoma: {
        fontFamily: string;
    };
    FontTerminal: {
        fontFamily: string;
    };
    FontTimesNewRoman: {
        fontFamily: string;
    };
    FontTrebuchetMs: {
        fontFamily: string;
    };
    FontVerdana: {
        fontFamily: string;
    };
    txtExlarge: {
        fontSize: string;
    };
    txtLarge: {
        fontSize: string;
    };
    txtRegular: {
        fontSize: string;
    };
    txtSmall: {
        fontSize: string;
    };
    txtExsmall: {
        fontSize: string;
    };
    LTR: {
        direction: Direction;
    };
    RTL: {
        direction: Direction;
    };
};
/**
 * Classes for richTextEditorCSS
 * @returns richTextEditorCSS
 * @example richTextEditorCSS(theme)
*/
export declare const richTextEditorCSS: (theme: Theme) => string;
/**
 * Styling for ccf-rich-text-editor
 * @returns ccf-rich-text-editor CSS properties as a JSON object
 * @example ccfRichTextEditorStyles(theme)
*/
declare const ccfRichTextEditorStyles: (theme: Theme, headerExpandCollapse?: boolean) => {
    editorContainer: {
        width: string;
        display: string;
        flexDirection: string;
        opacity: string;
        borderRadius: string;
        overflowY: string;
        padding: string;
        wordBreak: string;
        fontSize: string;
        outline: string;
        background: string;
        flex: string;
        minHeight: string;
    };
    button: {
        color: string;
        minWidth: string;
        '&:hover': {
            backgroundColor: string;
        };
        padding: number;
    };
    toolbar: {
        display: string;
        width: string;
        borderBottom: string;
    };
    editorBody: {
        [x: string]: string | {
            height: string;
            flexGrow?: undefined;
            outline?: undefined;
            border?: undefined;
            '&:focus-visible'?: undefined;
        } | {
            flexGrow: string;
            outline: string;
            border: string;
            '&:focus-visible': {
                outline: string;
                border: string;
            };
            height?: undefined;
        };
        display: string;
        flexDirection: string;
        overflowY: string;
        paddingRight: string;
        position: string;
        outline: string;
        border: string;
        minHeight: string;
        contentEdit: {
            flexGrow: string;
            outline: string;
            border: string;
            '&:focus-visible': {
                outline: string;
                border: string;
            };
        };
    };
    inboundContactEditorBody: {
        outline: string;
        height: string;
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
    richEditor: {
        display: string;
        flexDirection: string;
    };
    sparklesIcon: {
        height: string;
        width: string;
        alignSelf: string;
    };
    toolsAndActionsContainer: {
        width: string;
        display: string;
        flexDirection: {
            xs: string;
            md: string;
        };
        justifyContent: string;
        alignItems: string;
        flexWrap: string;
        position: {
            xs: string;
        };
    };
    item: {
        display: string;
    };
    pluginContainer: {
        display: string;
        flexWrap: string;
        justifyContent: string;
    };
    right: {
        marginLeft: string;
    };
};
export default ccfRichTextEditorStyles;
