/**
 * @example styles for button component
 */
const ccfButtonStyle = (theme, primary) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
    /**
     * Color styles for contained (aka raised) buttons
     * @see https://github.com/mui-org/material-ui/blob/8995f085904eb55bcb5861fb6d8a32fbd38d72eb/packages/material-ui/src/Button/Button.js#L131-L141
    */
    const styles = {
        root: {
            color: primary ? (_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.paper : (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.text.secondary,
            border: primary ? 'none' : `1px solid ${(_e = (_d = theme.palette) === null || _d === void 0 ? void 0 : _d.border) === null || _e === void 0 ? void 0 : _e.main}`,
            backgroundColor: primary ? (_g = (_f = theme.palette) === null || _f === void 0 ? void 0 : _f.primary) === null || _g === void 0 ? void 0 : _g.main : (_j = (_h = theme.palette) === null || _h === void 0 ? void 0 : _h.background) === null || _j === void 0 ? void 0 : _j.paper,
            boxShadow: `0px 2px 0px ${primary ? (_l = (_k = theme.palette) === null || _k === void 0 ? void 0 : _k.primary) === null || _l === void 0 ? void 0 : _l.dark : (_o = (_m = theme.palette) === null || _m === void 0 ? void 0 : _m.border) === null || _o === void 0 ? void 0 : _o.main}`,
            '&:hover': {
                backgroundColor: primary ? (_q = (_p = theme.palette) === null || _p === void 0 ? void 0 : _p.primary) === null || _q === void 0 ? void 0 : _q.dark : (_s = (_r = theme.palette) === null || _r === void 0 ? void 0 : _r.background) === null || _s === void 0 ? void 0 : _s.paper,
                border: primary ? 'none' : `1px solid ${(_u = (_t = theme.palette) === null || _t === void 0 ? void 0 : _t.border) === null || _u === void 0 ? void 0 : _u.main}`,
                boxShadow: `0px 2px 0px ${primary ? (_w = (_v = theme.palette) === null || _v === void 0 ? void 0 : _v.primary) === null || _w === void 0 ? void 0 : _w.dark : (_y = (_x = theme.palette) === null || _x === void 0 ? void 0 : _x.border) === null || _y === void 0 ? void 0 : _y.main}`,
            },
            '&:disabled': {
                backgroundColor: (_0 = (_z = theme.palette) === null || _z === void 0 ? void 0 : _z.background) === null || _0 === void 0 ? void 0 : _0.level1,
                borderColor: (_2 = (_1 = theme.palette) === null || _1 === void 0 ? void 0 : _1.border) === null || _2 === void 0 ? void 0 : _2.main,
                boxShadow: `0px 2px 0px ${(_4 = (_3 = theme.palette) === null || _3 === void 0 ? void 0 : _3.border) === null || _4 === void 0 ? void 0 : _4.main}`,
            },
        },
        customButton: {
            backgroundColor: 'red',
            color: 'white',
            '&:hover': {
                backgroundColor: 'green',
            },
        },
        outlinedButton: {
            backgroundColor: 'white',
            color: 'orange',
            '&:hover': {
                backgroundColor: 'white',
            },
        },
    };
    return styles;
};
export default ccfButtonStyle;
//# sourceMappingURL=ccf-button.styles.js.map