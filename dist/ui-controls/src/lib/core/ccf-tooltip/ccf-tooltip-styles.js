/**
 * style object for ccf-tooltip-style
 * @returns CcfTooltipStyle styles object
 * ```
 * @example
 * <CcfTooltipStyle/>
 * ```
 */
const CcfTooltipStyle = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const styles = {
        ccfTooltipArrow: {
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.contrastText,
        },
        ccfTooltipRight0: {
            marginRight: '0',
            backgroundColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.contrastText,
            font: `normal normal normal 0.625rem/0.625rem ${(_e = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _e === void 0 ? void 0 : _e.fontFamily}`,
            letterSpacing: '0',
            color: (_g = (_f = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _f === void 0 ? void 0 : _f.background) === null || _g === void 0 ? void 0 : _g.paper,
            opacity: '1',
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
        },
        ccfTooltip: {
            backgroundColor: (_j = (_h = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _h === void 0 ? void 0 : _h.text) === null || _j === void 0 ? void 0 : _j.contrastText,
            font: `normal normal normal 0.625rem/0.625rem ${(_k = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _k === void 0 ? void 0 : _k.fontFamily}`,
            letterSpacing: '0',
            lineHeight: '1.2',
            color: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.background) === null || _m === void 0 ? void 0 : _m.paper,
            opacity: '1',
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
        },
        '& .MuiTooltip-tooltipPlacementBottom': {
            marginTop: '4px',
        },
        '& .MuiTooltip-tooltipPlacementRight': {
            marginLeft: 'auto',
        },
        ccfTooltipArrowSettings: {
            color: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.background) === null || _p === void 0 ? void 0 : _p.paper,
        },
        ccfTooltipSettings: {
            borderRadius: '8px',
            width: '7.5rem',
            height: '3.75rem',
            backgroundColor: `${(_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.background) === null || _r === void 0 ? void 0 : _r.paper}`,
            boxShadow: '0px 5px 15px 0px rgb(0 0 0 / 30%)',
            padding: '0.5rem 0.75rem',
        },
    };
    return styles;
};
export default CcfTooltipStyle;
//# sourceMappingURL=ccf-tooltip-styles.js.map