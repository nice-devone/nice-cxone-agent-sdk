/**
 * @example styles for radio highlight component
 */
const ccfRadioHighlightStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
    const styles = {
        radioBox: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.paper,
        },
        tooltipHeader: {
            color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.paper,
            font: `normal normal 600 10px/17px ${(_e = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _e === void 0 ? void 0 : _e.fontFamily} !important`,
            letterSpacing: '0px !important',
            opacity: '1 !important',
        },
        checkedIconRad: {
            background: `linear-gradient(180deg, hsla(0, 0%, 100%, 0.1), hsla(0, 0%, 100%, 0)), ${(_g = (_f = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _f === void 0 ? void 0 : _f.info) === null || _g === void 0 ? void 0 : _g.main} !important`,
            '&::before': {
                width: '16px',
                height: '16px',
                content: '""',
                display: 'block',
                backgroundImage: `radial-gradient(
            ${(_j = (_h = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _h === void 0 ? void 0 : _h.background) === null || _j === void 0 ? void 0 : _j.paper},
            ${(_l = (_k = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _k === void 0 ? void 0 : _k.background) === null || _l === void 0 ? void 0 : _l.paper} 28%,
            transparent 32%
        )`,
            },
        },
        iconRad: {
            width: '16px',
            height: '16px',
            boxShadow: 'inset 0 0 0 1px rgb(16 22 26 / 20%), inset 0 -1px 0 rgb(16 22 26 / 10%)',
            borderRadius: '50%',
            backgroundColor: (_o = (_m = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _m === void 0 ? void 0 : _m.background) === null || _o === void 0 ? void 0 : _o.callControlHeader,
            backgroundImage: 'linear-gradient( 180deg, hsla(0, 0%, 100%, 0.8), hsla(0, 0%, 100%, 0))',
        },
        highlightLabelWithRadio: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            gap: '4px',
            '& .MuiTypography-body1': {
                fontSize: '14px',
                lineHeight: 1,
            },
            '& .MuiRadio-root': {
                padding: '0 8px 0 0',
            },
        },
        infoIcon: {
            fontSize: '20px',
            color: theme.palette.text.active || '#306484',
            cursor: 'pointer',
            visibility: 'hidden',
            marginTop: '5px',
        },
        showInfo: {
            visibility: 'visible',
        },
        customBlue: {
            width: '200px',
            height: '30px',
            textAlign: 'left',
            borderRadius: '3px',
            color: (_q = (_p = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _p === void 0 ? void 0 : _p.text) === null || _q === void 0 ? void 0 : _q.contrastText,
            backgroundColor: (_s = (_r = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _r === void 0 ? void 0 : _r.background) === null || _s === void 0 ? void 0 : _s.paper,
            '& .MuiFormControlLabel-label': {
                fontSize: '14px',
            },
            '& .MuiIconButton-label span': {
                width: '14px',
                height: '14px',
                backgroundColor: (_u = (_t = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _t === void 0 ? void 0 : _t.background) === null || _u === void 0 ? void 0 : _u.paper,
            },
            '& input:hover ~ .MuiIconButton-label span': {
                backgroundColor: (_w = (_v = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _v === void 0 ? void 0 : _v.background) === null || _w === void 0 ? void 0 : _w.paper,
            },
            '& .MuiIconButton-label span:before': {
                backgroundImage: `radial-gradient(
          ${(_y = (_x = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _x === void 0 ? void 0 : _x.text) === null || _y === void 0 ? void 0 : _y.active},
          ${(_0 = (_z = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _z === void 0 ? void 0 : _z.text) === null || _0 === void 0 ? void 0 : _0.active} 34%,
          transparent 51%
        )`,
                width: '14px',
                height: '14px',
            },
        },
        hightlightBlue: {
            background: (_2 = (_1 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _1 === void 0 ? void 0 : _1.text) === null || _2 === void 0 ? void 0 : _2.active,
            color: (_4 = (_3 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _3 === void 0 ? void 0 : _3.background) === null || _4 === void 0 ? void 0 : _4.paper,
            '& .MuiFormControlLabel-label': {
                fontSize: '14px',
            },
        },
    };
    return styles;
};
export default ccfRadioHighlightStyles;
//# sourceMappingURL=ccf-radio-highlight.styles.js.map