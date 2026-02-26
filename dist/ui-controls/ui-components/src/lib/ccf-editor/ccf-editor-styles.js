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
/* eslint-disable-next-line @nice-cxone/ccf/required-tsdoc */
const ccfEditorStyles = (theme, wysiwygEnabled) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16;
    const styles = {
        editor: {
            minHeight: '70px',
            maxHeight: '70px',
            width: wysiwygEnabled ? '100%' : '96%',
            background: `${theme.palette.grey[100]} 0% 0% no-repeat padding-box`,
            display: 'inline-block',
            opacity: '1',
            borderRadius: '4px',
            overflowY: 'scroll',
            margin: !wysiwygEnabled && '4px 12.5px',
            padding: wysiwygEnabled ? '16px 24.5px' : '12px',
            wordBreak: 'break-word',
            fontSize: '.75rem',
        },
        editorFocus: {
            border: `2px solid ${theme.palette.background.dark}`,
        },
        editorEmail: {
            maxHeight: 'max-content',
            background: 'none',
        },
        outboundEmailEditor: {
            minHeight: '100%',
            background: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            '@media only screen and (max-width: 1200px)': {
                minHeight: '80%',
            },
            position: 'relative',
            zIndex: '0',
        },
        toolbar: {
            display: 'block',
            width: '100%',
            borderBottom: 'none',
        },
        button: {
            color: `${theme.palette.grey[800]}`,
            minWidth: '34px',
            '&:hover': {
                backgroundColor: `${theme.palette.action.hover}`,
            },
            padding: 0,
        },
        buttonActive: {
            background: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.main,
            marginRight: '0.2rem',
        },
        replying: {
            margin: '2px 13.5px',
            font: 'normal normal normal 0.75rem/1rem Open Sans',
            letterSpacing: '0px',
            color: `${theme.palette.grey[800]}`,
            borderTop: `1px solid ${theme.palette.border.main}`,
        },
        wrapper: {
            font: 'normal normal normal 12px/17px Open Sans',
            color: '#000',
            'text-align': 'left',
            'letter-spacing': '0',
            display: 'flex',
            padding: '3px',
            paddingLeft: '15px',
        },
        styleLabel: {
            font: 'normal normal normal 12px/17px Open Sans',
            color: '#000',
            'text-align': 'left',
            'align-items': 'top',
            letterSpacing: '0',
            display: 'flex',
        },
        headerContainer: {
            background: `${(_d = (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.callControlHeader} 0% 0% no-repeat padding-box`,
            border: `1px solid ${(_e = theme.palette.border) === null || _e === void 0 ? void 0 : _e.main}`,
            borderRadius: '4px 4px 0px 0px',
            opacity: 1,
            height: '32px',
        },
        btnContainer: {
            'min-width': '34px !important',
            padding: 0,
        },
        toolbox: {
            display: 'flex',
            borderBottom: `1px solid ${theme.palette.border.main}`,
        },
        box: {
            borderTop: 1,
            borderColor: `${theme.palette.border.main}`,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            backgroundColor: theme.palette.background.paper,
        },
        buttonBottom: {
            bottom: '0',
            width: '100%',
            position: 'absolute',
        },
        rightSideBox: {
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            marginTop: '8px',
            marginBottom: '8px',
        },
        leftSideBox: {
            justifyContent: 'flex-start',
            backgroundColor: theme.palette.background.header,
            margin: '6px 4px',
        },
        toolboxContainer: {
            padding: '7px 0px',
        },
        floatRight: {
            float: 'right',
        },
        discard: {
            opacity: '1',
            borderRadius: '3px',
            border: `1px solid ${(_f = theme.palette.border) === null || _f === void 0 ? void 0 : _f.main}`,
            boxShadow: `0px 1px 0px ${(_g = theme.palette.border) === null || _g === void 0 ? void 0 : _g.main}`,
            padding: '0px',
            float: 'right',
            color: `${theme.palette.grey[800]}`,
            margin: '5px 10px 9px 5px',
        },
        toContainer: {
            width: '100%',
            display: 'flex',
            borderBottom: '1px solid #D5DEE6',
            height: 'fit-content',
            borderTop: '1px solid #D5DEE6',
        },
        toLabel: {
            width: '85%',
        },
        bccContainer: {
            font: 'normal normal normal 12px/17px Open Sans',
            color: theme.palette.text.secondary,
            margin: 'auto',
            'font-weight': 600,
        },
        wrapperWithBorder: {
            font: 'normal normal normal 12px/17px Open Sans',
            color: '#000',
            'text-align': 'left',
            'letter-spacing': '0',
            display: 'flex',
            borderBottom: '1px solid #D5DEE6',
            padding: '3px',
            paddingLeft: '15px',
        },
        ccBox: {
            padding: '15% 10px 15% 0',
            cursor: 'pointer',
        },
        bccBox: {
            padding: '15% 0',
            cursor: 'pointer',
        },
        linked: {
            color: '#3b5998',
            textDecoration: 'underline',
            cursor: 'pointer',
        },
        linkBox: {
            width: '20vw',
            backgroundColor: '#f4f4f4',
            marginTop: '2px',
        },
        btnCheck: {
            verticalAlign: 'middle',
        },
        cancelButton: {
            margin: '0 0.75rem',
            float: 'right',
            fontSize: `${(_j = (_h = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _h === void 0 ? void 0 : _h.h6) === null || _j === void 0 ? void 0 : _j.fontSize}`,
            lineHeight: '1rem',
            letterSpacing: '0rem',
        },
        editorBox: {
            width: '100%',
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
        },
        toolTipWidth: {
            width: '10%',
        },
        customerNameDisplay: {
            display: 'inline',
            paddingRight: '2px',
            width: '90%',
            paddingLeft: '1.5rem',
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
        emailResponseWrapper: {
            display: 'flex',
            flexDirection: 'column',
            overflowY: wysiwygEnabled ? 'scroll' : 'visible',
        },
        publicReplyToBanner: {
            border: `solid ${(_l = (_k = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _k === void 0 ? void 0 : _k.border) === null || _l === void 0 ? void 0 : _l.yellow}`,
            borderWidth: '0.063rem 0.063rem 0.063rem 0.313rem',
            borderRadius: '0.25rem',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            width: 'fit-content',
            padding: '0.2rem 0.5rem',
            background: (_o = (_m = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _m === void 0 ? void 0 : _m.background) === null || _o === void 0 ? void 0 : _o.lightYellow,
            marginLeft: '0.813rem',
        },
        publicReplyToBannerText: {
            fontSize: '0.625rem',
            color: (_q = (_p = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _p === void 0 ? void 0 : _p.secondary) === null || _q === void 0 ? void 0 : _q.main,
        },
        publicReplyToBannerContainer: {
            display: 'flex',
            alignItems: 'center',
        },
        line: {
            margin: '0.625rem',
            border: `0.063rem solid ${(_s = (_r = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _r === void 0 ? void 0 : _r.border) === null || _s === void 0 ? void 0 : _s.light}`,
        },
        responseDiv: {
            padding: '0.5rem',
            border: '0.031rem solid',
            borderRadius: '1.5rem',
            borderColor: (_u = (_t = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _t === void 0 ? void 0 : _t.text) === null || _u === void 0 ? void 0 : _u.lightGrey,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            columnGap: '0.875rem',
        },
        responseText: {
            fontSize: '0.75rem',
            lineHeight: '1rem',
            color: (_w = (_v = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _v === void 0 ? void 0 : _v.text) === null || _w === void 0 ? void 0 : _w.black,
            fontWeight: '600',
        },
        responseIcons: {
            display: 'flex',
            marginLeft: 'auto',
            columnGap: '0.875rem',
        },
        icons: {
            '&:hover svg path': {
                fill: (_y = (_x = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _x === void 0 ? void 0 : _x.text) === null || _y === void 0 ? void 0 : _y.noteLabel,
            },
        },
        nbrHoverStyle: {
            backgroundColor: (_0 = (_z = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _z === void 0 ? void 0 : _z.background) === null || _0 === void 0 ? void 0 : _0.default,
            borderRadius: '1.5rem',
            '&:hover': {
                backgroundColor: (_2 = (_1 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _1 === void 0 ? void 0 : _1.text) === null || _2 === void 0 ? void 0 : _2.noteLabel,
                borderRadius: '1.5rem',
            },
            '&:hover p, &:hover span, &:hover div': {
                color: (_4 = (_3 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _3 === void 0 ? void 0 : _3.text) === null || _4 === void 0 ? void 0 : _4.white,
            },
            '&:hover svg path': {
                fill: (_6 = (_5 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _5 === void 0 ? void 0 : _5.text) === null || _6 === void 0 ? void 0 : _6.white,
            },
            '&:hover div': {
                backgroundColor: (_8 = (_7 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _7 === void 0 ? void 0 : _7.text) === null || _8 === void 0 ? void 0 : _8.noteLabel,
            },
        },
        nullHover: {
            '&:hover': {
                background: 'none',
            },
        },
        nbrStyle: {
            backgroundColor: (_10 = (_9 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _9 === void 0 ? void 0 : _9.background) === null || _10 === void 0 ? void 0 : _10.default,
        },
        sparklesIcon: {
            display: 'flex',
            marginLeft: 'auto',
            flexDirection: 'column',
        },
        timeStampTooltipArrow: {
            color: `${(_12 = (_11 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _11 === void 0 ? void 0 : _11.background) === null || _12 === void 0 ? void 0 : _12.paper}`,
        },
        timeStampTooltip: {
            backgroundColor: `${(_14 = (_13 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _13 === void 0 ? void 0 : _13.background) === null || _14 === void 0 ? void 0 : _14.paper}`,
            color: `${(_16 = (_15 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _15 === void 0 ? void 0 : _15.text) === null || _16 === void 0 ? void 0 : _16.black}`,
            boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.24)',
        },
    };
    return styles;
};
export default ccfEditorStyles;
//# sourceMappingURL=ccf-editor-styles.js.map