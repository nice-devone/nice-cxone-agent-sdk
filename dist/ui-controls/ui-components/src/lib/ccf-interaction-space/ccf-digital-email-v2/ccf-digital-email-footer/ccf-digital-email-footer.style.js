/**
 * style object for ccf-digital-email-v2-footer component
 * @returns CcfDigitalEmailV2Footer styles object
 * ```
 * @example
 * <CcfDigitalEmailV2FooterStyles/>
 * ```
 */
const CcfDigitalEmailV2FooterStyles = (theme, isMobile) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
    const styles = {
        footerContainer: {
            position: 'absolute',
            bottom: '0.125rem',
            width: 'inherit',
            minWidth: '95%',
            height: '2.75rem',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            border: `0.125rem solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.emailFooter}`,
            borderRadius: '0.25rem',
            margin: '0 2rem 0 1rem',
            padding: isMobile ? '0.313rem' : '0.313rem 0.625rem',
            backgroundColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.white,
            zIndex: 997,
            transform: 'translate(-0.5rem, -0.625rem)',
        },
        rightContainer: {
            float: 'right',
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 'auto',
            gap: '0.625rem',
            alignItems: 'center',
            [(_e = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _e === void 0 ? void 0 : _e.down('md')]: {
                gap: '0.313rem',
            },
        },
        actionBtn: {
            padding: '0.188rem',
            alignItems: 'center',
            height: '1.75rem',
            maxWidth: '6.5rem',
            display: 'flex',
            flexDirection: 'row',
            rightMargin: '0.625rem',
            '&:hover': {
                border: `0.063rem solid ${(_g = (_f = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _f === void 0 ? void 0 : _f.border) === null || _g === void 0 ? void 0 : _g.menuItemHighlight}`,
            },
            '&:focus': {
                border: `0.063rem solid ${(_j = (_h = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _h === void 0 ? void 0 : _h.border) === null || _j === void 0 ? void 0 : _j.menuItemHighlight}`,
            },
            [(_k = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _k === void 0 ? void 0 : _k.down('md')]: {
                rightMargin: '0.188rem',
            },
        },
        replyActionBtn: {
            width: '5.313rem',
        },
        actionBtnText: {
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            color: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.clearText,
            border: 'none',
            boxShadow: 'none',
        },
        replyActionBtnText: {
            backgroundColor: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.text) === null || _p === void 0 ? void 0 : _p.noteLabel,
            color: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.text) === null || _r === void 0 ? void 0 : _r.white,
            boxShadow: 'none',
            '&:hover': {
                backgroundColor: `${(_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.text) === null || _t === void 0 ? void 0 : _t.noteLabel}`,
                color: (_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.text) === null || _v === void 0 ? void 0 : _v.white,
                border: `0.063rem solid ${(_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.border) === null || _x === void 0 ? void 0 : _x.menuItemHighlight}`,
            },
        },
        btnIcon: {
            marginTop: '0.313rem',
        },
        btnText: {
            fontSize: '0.813rem',
            fontWeight: 600,
        },
        actionIconBtn: {
            marginTop: '0.188rem',
            color: (_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.text) === null || _z === void 0 ? void 0 : _z.noteLabel,
        },
        addNoteBtn: {
            height: '1.25rem',
            width: '1.143rem',
            paddingLeft: 0,
            color: (_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _0 === void 0 ? void 0 : _0.text) === null || _1 === void 0 ? void 0 : _1.contrastText,
        },
    };
    return styles;
};
export default CcfDigitalEmailV2FooterStyles;
//# sourceMappingURL=ccf-digital-email-footer.style.js.map