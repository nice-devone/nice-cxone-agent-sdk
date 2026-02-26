import { FeatureToggleService } from '@nice-devone/agent-sdk';
const isLexicalTableBorderFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-lexical-table-border-AW-45046" /* FeatureToggles.LEXICAL_TABLE_BORDER_TOGGLE */);
// this will be used to create custom styles for the table node. 
export const customTableStyles = new Map([
    ['tableCell', 'richTextEditorTableCell'],
    ['tableAddColumns', 'richTextEditortableAddColumns'],
    ['tableAddRows', 'richTextEditortableAddRows'],
    ['tableCellActionButton', 'richTextEditortableCellActionButton'],
    [' tableCellActionButtonContainer', 'richTextEditortableCellActionButtonContainer'],
    ['tableCellEditing', 'richTextEditortableCellEditing'],
    ['tableCellHeader', 'richTextEditortableCellHeader'],
    ['tableCellPrimarySelected', 'richTextEditortableCellPrimarySelected'],
    ['tableCellSelected', 'richTextEditortableCellSelected'],
    ['tableCellSortedIndicator', 'richTextEditortableCellSortedIndicator'],
    ['tableSelected', 'richTextEditortableSelected']
]);
/**
 * Theme class object for editor
*/
export const editorTheme = {
    ltr: 'richTextEditorLTR',
    paragraph: 'richTextEditorParagraph',
    rtl: 'richTextEditorRTL',
    table: 'richTextEditorTable',
    tableCell: 'richTextEditorTableCell',
    tableAddColumns: 'richTextEditortableAddColumns',
    tableAddRows: 'richTextEditortableAddRows',
    tableCellActionButton: 'richTextEditortableCellActionButton',
    tableCellActionButtonContainer: 'richTextEditortableCellActionButtonContainer',
    tableCellEditing: 'richTextEditortableCellEditing',
    tableCellHeader: 'richTextEditortableCellHeader',
    tableCellPrimarySelected: 'richTextEditortableCellPrimarySelected',
    tableCellSelected: 'richTextEditortableCellSelected',
    tableCellSortedIndicator: 'richTextEditortableCellSortedIndicator',
    tableSelected: 'richTextEditortableSelected',
    text: {
        bold: 'richTextEditorBold',
        italic: 'richTextEditorItalic',
        underline: 'richTextEditorUnderline',
    },
    list: {
        nested: {
            listitem: 'richTextEditorNestedListItem',
        },
        ol: 'richTextEditorListOL',
        ul: 'richTextEditorListUL',
        listitem: 'richTextEditorListItem',
    },
    link: 'richEditorLink',
};
export const RICH_TEXT_INPUT_STYLES = {
    BOLD: 'BOLD',
    ITALIC: 'ITALIC',
    UNDERLINE: 'UNDERLINE',
    ORDERED_LIST: 'ordered-list-item',
    UNORDERED_LIST: 'unordered-list-item',
    LEFT_ALIGN: 'left',
    RIGHT_ALIGN: 'right',
    CENTER_ALIGN: 'center',
    MONOSPACE: 'monospace',
    RTL: 'rtl',
    LTR: 'ltr',
};
export const styleMap = {
    FontAndaleMono: {
        fontFamily: 'andale mono, monospace',
    },
    FontArial: {
        fontFamily: 'Arial, sans-serif',
    },
    FontArialBlack: {
        fontFamily: 'arial black, sans-serif',
    },
    FontBookAntiqua: {
        fontFamily: 'book antiqua, serif',
    },
    FontComicSansMS: {
        fontFamily: 'comic sans ms, sans-serif',
    },
    FontCourierNew: {
        fontFamily: 'courier new, courier, monospace',
    },
    FontGeorgia: {
        fontFamily: 'georgia, serif',
    },
    FontHelvetica: {
        fontFamily: 'helvetica, sans-serif',
    },
    FontImpact: {
        fontFamily: 'impact, sans-serif',
    },
    FontMalgunGothic: {
        fontFamily: 'malgun gothic, sans-serif',
    },
    FontTahoma: {
        fontFamily: 'tahoma, sans-serif',
    },
    FontTerminal: {
        fontFamily: 'terminal, sans-serif',
    },
    FontTimesNewRoman: {
        fontFamily: 'times new roman, times, serif',
    },
    FontTrebuchetMs: {
        fontFamily: 'trebuchet ms, sans-serif',
    },
    FontVerdana: {
        fontFamily: 'verdana, sans-serif',
    },
    txtExlarge: {
        fontSize: '24px',
    },
    txtLarge: {
        fontSize: '20px',
    },
    txtRegular: {
        fontSize: '14px',
    },
    txtSmall: {
        fontSize: '12px',
    },
    txtExsmall: {
        fontSize: '10px',
    },
    LTR: {
        direction: 'ltr',
    },
    RTL: {
        direction: 'rtl',
    },
};
/**
 * Resolve table cell border based on FT config.
 * Falls back to default when FT disabled or misconfigured.
 * @param theme - Theme
 * @returns css border value
 * @example getTableCellBorder(theme)
 */
function getTableCellBorder(theme) {
    var _a, _b;
    if (!isLexicalTableBorderFTEnabled) {
        return `2px solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.grey}`;
    }
    return '';
}
/**
 * Classes for richTextEditorCSS
 * @returns richTextEditorCSS
 * @example richTextEditorCSS(theme)
*/
export const richTextEditorCSS = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    return `
.richTextEditorLTR {
  text-align: left;
}
.richTextEditorRTL {
  text-align: right;
}
.richTextEditorBold {
  font-weight: bold;
}

.richTextEditorItalic {
  font-style: italic;
}

.richTextEditorUnderline {
  text-decoration: underline;
}
.richTextEditorParagraph {
  margin: 0;
  position: relative;
}
.richTextEditorTable{
  border-collapse: collapse;
  border-spacing: 0;
  overflow-y: scroll;
  table-layout: fixed;
  margin: 20px 0;
  width: max-content;
}

.richTextEditorTableCell {
  border: ${getTableCellBorder(theme)};
  min-width: 75px;
  vertical-align: top;
  text-align: start;
  padding: 6px 8px;
  position: relative;
  cursor: default;
  outline: none;
}

.richTextEditortableCellSortedIndicator {
  display: block;
  opacity: 0.5;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.125rem;
  background-color: ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.grey};
}
.richTextEditortableAddColumns {
  position: absolute;
  top: 0;
  width: 1.25rem;
  background-color: ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.grey};
  height: 100%;
  right: 0;
  animation: table-controls 0.2s ease;
  border: 0;
  cursor: pointer;
}
.richTextEditortableAddColumns:after {
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: block;
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.4;
}
.richTextEditortableAddColumns:hover {
  background-color: ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.light};
}
.richTextEditortableAddRows {
  position: absolute;
  bottom: -1.5rem;
  width: calc(100% - 25px);
  background-color: ${(_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.grey};
  height: 1.25rem;
  left: 0;
  animation: table-controls 0.2s ease;
  border: 0;
  cursor: pointer;
}
.richTextEditortableAddRows:after {
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: block;
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.4;
}
.richTextEditortableAddRows:hover {
  background-color: ${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.background) === null || _k === void 0 ? void 0 : _k.light};
}

@keyframes table-controls {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.richTextEditortableCellActionButtonContainer {
  display: block;
  right: 5px;
  top: 6px;
  position: absolute;
  z-index: 4;
  width: 20px;
  height: 20px;
}
.richTextEditortableCellActionButton {
  background-color: ${(_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.grey};
  display: block;
  border: 0;
  border-radius: 20px;
  width: 20px;
  height: 20px;
  color: #222;
  cursor: pointer;
}
.richTextEditortableCellActionButton:hover {
  background-color: ${(_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.background) === null || _p === void 0 ? void 0 : _p.hover};
}
.richTextEditortableCellHeader {
  background-color: ${(_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.background) === null || _r === void 0 ? void 0 : _r.light};
  text-align: start;
}
.richTextEditortableCellSelected {
  background-color: red;
}
.richTextEditortableCellPrimarySelected {
  border: 2px solid rgb(60, 132, 244);
  display: block;
  height: calc(100% - 2px);
  position: absolute;
  width: calc(100% - 2px);
  left: -1px;
  top: -1px;
  z-index: 2;
}
.richTextEditortableCellEditing {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  border-radius: 3px;
}
  .richTextEditorListOL {
    padding: 0;
    margin: 0;
    margin-left: 16px;
    list-style-position: inside;
  }  
  .richTextEditorListUL {
    padding: 0;
    margin: 0;
    margin-left: 16px;
    list-style-position: inside;
  }
  .richTextEditorListItem {
    margin: 8px 32px 8px 32px;
  }
  .richTextEditorNestedListItem {
    list-style-type: none;
  }
  .richEditorLink {
    color: ${(_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.background) === null || _t === void 0 ? void 0 : _t.sparkleBlue};
    text-decoration: underline;
    cursor: pointer;
  }
  
  `;
};
/**
 * Styling for ccf-rich-text-editor
 * @returns ccf-rich-text-editor CSS properties as a JSON object
 * @example ccfRichTextEditorStyles(theme)
*/
const ccfRichTextEditorStyles = (theme, headerExpandCollapse) => {
    const styles = {
        editorContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            opacity: '1',
            borderRadius: '4px',
            overflowY: 'scroll',
            padding: '.75rem 0 0 1rem',
            wordBreak: 'break-word',
            fontSize: '.75rem',
            outline: 'none',
            background: 'none',
            flex: '1',
            minHeight: '0',
        },
        button: {
            color: `${theme.palette.grey[800]}`,
            minWidth: '34px',
            '&:hover': {
                backgroundColor: `${theme.palette.action.hover}`,
            },
            padding: 0,
        },
        toolbar: {
            display: 'block',
            width: '100%',
            borderBottom: 'none',
        },
        editorBody: {
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            paddingRight: '.75rem',
            position: 'relative',
            outline: 'none',
            border: 'none',
            minHeight: '0',
            [theme.breakpoints.down('xl')]: {
                height: 'auto',
            },
            [theme.breakpoints.down('md')]: {
                height: 'auto',
            },
            contentEdit: {
                flexGrow: '1',
                outline: 'none',
                border: 'none',
                '&:focus-visible': {
                    outline: 'none',
                    border: 'none',
                },
            },
        },
        inboundContactEditorBody: {
            outline: 'none',
            height: '100%',
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
        richEditor: {
            display: 'flex',
            flexDirection: 'column',
        },
        sparklesIcon: {
            height: '1.5rem',
            width: '1.5rem',
            alignSelf: 'center',
        },
        toolsAndActionsContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            position: { xs: 'relative' },
        },
        item: {
            display: 'flex',
        },
        pluginContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
        },
        right: {
            marginLeft: 'auto',
        },
    };
    return styles;
};
export default ccfRichTextEditorStyles;
//# sourceMappingURL=ccf-rich-text-editor.styles.js.map