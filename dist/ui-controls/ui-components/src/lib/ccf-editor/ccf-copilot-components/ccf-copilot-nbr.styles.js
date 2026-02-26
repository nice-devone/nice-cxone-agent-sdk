/**
 * Styling for ccf-agent-copilot-nbr
 * @returns ccf-copilot-nbr CSS properties as a JSON object
 * @example CcfCopilotNBRStyles(theme)
*/
const CcfCopilotNBRStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const styles = {
        line: {
            margin: '0.625rem',
            border: `0.063rem solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.light}`,
        },
        responseDiv: {
            padding: '0.5rem',
            border: '0.063rem solid',
            borderRadius: '0.5rem',
            borderColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.lightGrey,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            columnGap: '0.5rem',
            '&:hover': {
                backgroundColor: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.noteInput,
                borderRadius: '0.5rem',
            },
        },
        responseText: {
            fontSize: '0.75rem',
            lineHeight: '1rem',
            color: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.hoverDark,
            fontWeight: '600',
        },
        responseIcons: {
            display: 'flex',
            marginLeft: 'auto',
            marginTop: '0.313rem',
            columnGap: '0.5rem',
        },
        icons: {
            '&:hover svg path': {
                fill: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.noteLabel,
            },
        },
        nbrHoverStyle: {
            borderRadius: '0.5rem',
            '&:hover': {
                backgroundColor: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.noteLabel,
                borderRadius: '0.5rem',
            },
            '&:hover p, &:hover span, &:hover div': {
                color: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.text) === null || _p === void 0 ? void 0 : _p.black,
            },
            '&:hover div': {
                backgroundColor: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.background) === null || _r === void 0 ? void 0 : _r.noteInput,
            },
        },
        nullHover: {
            '&:hover': {
                background: 'none',
            },
            padding: '0',
        },
        sparklesIcon: {
            display: 'flex',
            marginLeft: 'auto',
            flexDirection: 'column',
        },
        nbrSparkle: {
            display: 'flex',
            marginLeft: '0.625rem',
            marginTop: '0.313rem',
            flexDirection: 'column',
            height: '1.25rem',
            width: '1.25rem',
        },
        timeStampTooltipArrow: {
            color: `${(_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.background) === null || _t === void 0 ? void 0 : _t.paper}`,
        },
        timeStampTooltip: {
            backgroundColor: `${(_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.background) === null || _v === void 0 ? void 0 : _v.paper}`,
            color: `${(_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.text) === null || _x === void 0 ? void 0 : _x.black}`,
            boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.24)',
        },
    };
    return styles;
};
export default CcfCopilotNBRStyles;
//# sourceMappingURL=ccf-copilot-nbr.styles.js.map