/**
 * renders the style for rich message
 * @param props - Theme
 * @example <CcfRichPluginMessageStyle />
 * @returns return the style for rich message
 */
export const CcfRichPluginMessageStyle = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    const style = {
        container: {
            backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.callControlHeader,
            color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.contrastText,
            borderRadius: '1rem',
            boxShadow: `0px 1px 2px ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.boxshadow) === null || _f === void 0 ? void 0 : _f.main}`,
        },
        headerBox: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.noteInput,
            borderRadius: '1rem 1rem 0 0',
            lineHeight: 'normal',
            paddingTop: '0.5rem',
        },
        title: {
            padding: '1rem',
            fontWeight: '700',
            fontSize: '1rem',
            backgroundColor: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.background) === null || _k === void 0 ? void 0 : _k.noteInput,
            borderRadius: '1rem 1rem 0 0',
            lineHeight: 'normal',
        },
        list: {
            padding: '0',
        },
        listItem: {
            display: 'flex',
            justifyContent: 'center',
            padding: '0.7rem 1rem',
        },
        button: {
            width: '100%',
            border: `1px solid ${(_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.primary) === null || _m === void 0 ? void 0 : _m.main}`,
            borderRadius: '0.25rem',
            color: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.primary) === null || _p === void 0 ? void 0 : _p.main,
            lineHeight: '2',
            padding: '0 0.75rem',
            '&.Mui-disabled': {
                backgroundColor: 'transparent',
                color: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.primary) === null || _r === void 0 ? void 0 : _r.main,
                border: `1px solid ${(_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.primary) === null || _t === void 0 ? void 0 : _t.main}`,
            },
        },
        buttonText: {
            fontSize: '0.8rem',
            fontWeight: '600',
            lineHeight: 'inherit',
        },
        subHeader: {
            display: 'block',
        },
        subHeaderText: {
            lineHeight: 'normal',
            fontSize: '0.75rem',
            fontWeight: '400',
        },
        divider: { borderBottomWidth: '2px' },
    };
    return style;
};
//# sourceMappingURL=ccf-rich-plugin-message.style.js.map