export const editorTheme = {
    ltr: 'plainTextEditorLTR',
    rtl: 'plainTextEditorRTL',
    paragraph: 'plainTextEditorParagraph',
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
  min-height: 40px;
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
    var _a, _b;
    const styles = {
        editorContainer: {
            minHeight: '95px',
            height: isReplyMessageSelected ? '8rem' : '4.35rem',
            maxHeight: '8rem',
            width: '96%',
            background: `${theme.palette.grey[100]} 0% 0% no-repeat padding-box`,
            display: 'inline-block',
            opacity: '1',
            borderRadius: '4px',
            overflowY: 'scroll',
            margin: '4px 12.5px',
            padding: '12px',
            wordBreak: 'break-word',
            fontSize: '.75rem',
            outline: 'none',
        },
        editorFocus: {
            border: `2px solid ${theme.palette.background.dark}`,
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
            borderColor: theme.palette.primary.light,
            borderStyle: 'dashed',
            outline: 'none',
            transition: 'border .24s ease -in -out',
            minHeight: '6.25rem',
            maxHeight: '6.25rem',
            background: 'none',
        },
        plainTextToolbarBox: {
            display: 'inline-block',
            margin: '0.375rem 0.25rem',
            float: 'left',
        },
        plainTextContent: {
            border: `0.0625rem solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.header}`,
            borderRadius: '0.125rem !important',
        },
    };
    return styles;
};
export default ccfPlainTextEditorStyles;
//# sourceMappingURL=ccf-plain-text-editor.styles.js.map