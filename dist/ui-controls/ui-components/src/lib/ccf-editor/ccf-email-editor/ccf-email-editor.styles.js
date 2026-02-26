/**
 * Styling for ccf-contact-email-editor
 * @returns ccf-contact-email-editor CSS properties as a JSON object
 * @example CcfContactEmailEditorStyles(theme)
 */
const CcfContactEmailEditorStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
    const styles = {
        styleLabel: {
            font: (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a.fontFamily,
            color: (_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.black,
            'text-align': 'left',
            'align-items': 'top',
            letterSpacing: '0',
            display: 'flex',
            lineHeight: '125%',
            fontWeight: 400,
            fontSize: '0.75rem',
        },
        toContainer: {
            width: '100%',
            display: 'flex',
            height: 'fit-content',
            padding: '0.18rem',
        },
        toLabel: {
            width: '95%',
        },
        fromLabel: {
            width: '90%',
        },
        bccContainer: {
            font: theme.typography.fontFamily,
            fontSize: `${theme.typography.h6.fontSize}`,
            color: (_e = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.text) === null || _e === void 0 ? void 0 : _e.secondary,
            margin: 'auto',
            fontWeight: 600,
            marginRight: '0.75rem',
        },
        wrapperWithBorder: {
            font: `normal normal normal ${(_g = (_f = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _f === void 0 ? void 0 : _f.h5) === null || _g === void 0 ? void 0 : _g.fontSize}/${(_j = (_h = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _h === void 0 ? void 0 : _h.h3) === null || _j === void 0 ? void 0 : _j.fontSize} ${(_k = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _k === void 0 ? void 0 : _k.fontFamily}`,
            color: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.black,
            'text-align': 'left',
            'letter-spacing': '0',
            display: 'flex',
        },
        ccBox: {
            padding: '15% 5% 15% 0',
            cursor: 'pointer',
            font: theme.typography.fontFamily,
            fontSize: '0.75rem',
            letterSpacing: '0',
            fontWeight: '600',
            lineHeight: '100%',
            color: `${(_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.text) === null || _p === void 0 ? void 0 : _p.contrastText}`,
        },
        bccBox: {
            padding: '15% 0',
            cursor: 'pointer',
            font: theme.typography.fontFamily,
            fontSize: '0.75rem',
            letterSpacing: '0',
            fontWeight: '600',
            lineHeight: '100%',
            color: `${(_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.text) === null || _r === void 0 ? void 0 : _r.contrastText}`,
        },
        wrapper: {
            font: `normal normal normal ${(_t = (_s = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _s === void 0 ? void 0 : _s.h5) === null || _t === void 0 ? void 0 : _t.fontSize}/${(_v = (_u = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _u === void 0 ? void 0 : _u.h3) === null || _v === void 0 ? void 0 : _v.fontSize} ${(_w = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _w === void 0 ? void 0 : _w.fontFamily}`,
            color: (_y = (_x = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _x === void 0 ? void 0 : _x.text) === null || _y === void 0 ? void 0 : _y.black,
            'text-align': 'left',
            'letter-spacing': '0',
            display: 'flex',
            height: '35%',
        },
        hr: {
            margin: '0 0.625rem 0 0.875rem',
            color: `${(_0 = (_z = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _z === void 0 ? void 0 : _z.text) === null || _0 === void 0 ? void 0 : _0.lightGrey}`,
            postion: 'relative',
        },
        collapseTo: {
            left: '0.438rem',
            padding: '0.188rem 0.6rem 0.5rem 0.5rem',
            cursor: 'pointer',
        },
        tooltip: {
            maxHeight: '18.75rem',
            'overflow-y': 'auto',
        },
        toPadding: {
            padding: '5px 0.18rem 0 0.65rem',
        },
        fromPadding: {
            padding: '5px 0.18rem 0 0.7rem',
        },
        ccPadding: {
            padding: '5px 0.18rem 0 0.87rem',
        },
        bccPadding: {
            padding: '5px 0.18rem 0 0.87rem',
        },
        subjectLinePadding: {
            padding: '5px 0.18rem 0 0.87rem',
        },
        editorBodyHeight: {
            height: 'auto',
            display: 'grid',
            gridTemplateRows: 'auto 1fr auto',
        },
    };
    return styles;
};
export default CcfContactEmailEditorStyles;
//# sourceMappingURL=ccf-email-editor.styles.js.map