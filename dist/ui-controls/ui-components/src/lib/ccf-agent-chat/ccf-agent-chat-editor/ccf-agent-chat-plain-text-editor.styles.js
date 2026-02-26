export const editorTheme = {
    ltr: 'plainTextEditorLTR',
    rtl: 'plainTextEditorRTL',
    paragraph: 'plainTextEditorParagraph',
    link: 'editor-link',
    text: {
        bold: 'editor-textBold',
        code: 'editor-textCode',
        italic: 'editor-textItalic',
        strikethrough: 'editor-textStrikethrough',
        subscript: 'editor-textSubscript',
        superscript: 'editor-textSuperscript',
        underline: 'editor-textUnderline',
        underlineStrikethrough: 'editor-textUnderlineStrikethrough',
    },
};
/**
 * Classes for ccf-plain-text-editor
 * @param theme - theme object
 * @returns ccf-plain-text-editor css classes in string
 * @example plainTextEditorCSS(theme)
*/
export const plainTextEditorCSS = () => `

.plainTextEditorLTR {
  text-align: left;
}
.plainTextEditorRTL {
  text-align: right;
}
.plainTextEditorParagraph {
  margin: 0;
  position: relative;
}
.editor-textUnderline{
  text-decoration: underline;
}
.editor-textBold{
  font-weight: bold;
}
.editor-textItalic{
  font-style: italic;
}
  `;
/**
 * Styling for ccf-plain-text-editor
 *  @param theme - theme options
 *  @param isReplyMessageSelected - Boolean represents whether reply to message is selected or not
 * @returns ccf-plain-text-editor CSS properties as a JSON object
 * @example ccfPlainTextEditorStyles(theme)
*/
const ccfPlainTextEditorStyles = (theme, isReplyMessageSelected) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const styles = {
        editorContainer: {
            minHeight: '95px',
            height: isReplyMessageSelected ? '8rem' : '4.35rem',
            maxHeight: '8rem',
            display: 'inline-block',
            opacity: '1',
            width: '99%',
            background: ((_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.white) + ' !important',
            border: `1px solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.main}`,
            margin: '0 !important',
            overflowY: 'scroll',
            borderRadius: '8px',
            padding: '12px',
            wordBreak: 'break-word',
            fontSize: '.75rem',
            outline: 'none',
        },
        editorFocus: {
            border: `2px solid ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.dark}`,
        },
        editorBody: {
            outline: 'none',
            width: '100%',
        },
        dragNDrop: {
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1.25rem',
            borderWidth: '0.125rem',
            borderRadius: '0.125rem',
            borderColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.primary) === null || _h === void 0 ? void 0 : _h.light,
            borderStyle: 'dashed',
            outline: 'none',
            transition: 'border .24s ease -in -out',
            minHeight: '6.25rem',
            maxHeight: '6.25rem',
            background: 'none',
        },
        plainTextToolbarBox: {
            display: 'flex',
        },
    };
    return styles;
};
export default ccfPlainTextEditorStyles;
//# sourceMappingURL=ccf-agent-chat-plain-text-editor.styles.js.map