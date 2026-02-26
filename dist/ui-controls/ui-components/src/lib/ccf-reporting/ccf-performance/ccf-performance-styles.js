/**
 * style object for Performance
 * @returns CcfPerformanceStyles styles object
 * ```
 * @example
 * CcfPerformanceStyles
 * ```
 */
const CcfPerformanceStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    return ({
        productivityListContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: theme === null || theme === void 0 ? void 0 : theme.spacing(2),
        },
        productivityListItemContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            overflow: 'auto',
            backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.paper,
        },
        iconBox: {
            minWidth: '24px',
            display: 'block',
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
        textEllipsis: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        performanceListItemCenter: {
            display: 'flex',
            justifyContent: 'center',
        },
        tableRowHeader: {
            background: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.hover,
            'th:first-of-type': {
                textAlign: 'left',
            },
            'th': {
                color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.contrastText,
                fontWeight: 600,
                textAlign: 'center',
                backgroundColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.paper,
                border: `0.0625rem solid ${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.border) === null || _k === void 0 ? void 0 : _k.lightGray}`,
                cursor: 'pointer',
            },
            '& th, & td': {
                padding: '0.65rem',
            },
        },
        tableRowBody: {
            'th:first-of-type': {
                textAlign: 'left',
                padding: 0,
            },
            '& th': {
                display: 'flex',
                alignItems: 'center',
            },
            '& th, & td': {
                padding: '0.65rem',
                textAlign: 'center',
                color: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.contrastText,
                border: `0.0625rem solid ${(_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.border) === null || _p === void 0 ? void 0 : _p.lightGray}`,
            },
            '&:last-child td > span, &:last-child td > span , &:last-child span > div': Object.assign(Object.assign({}, theme.typography.h4), { fontWeight: 700 }),
            '&:last-child': {
                borderTop: `2px solid ${(_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.background) === null || _r === void 0 ? void 0 : _r.digitalTag}`,
            },
            '&:nth-of-type(even)': {
                backgroundColor: (_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.background) === null || _t === void 0 ? void 0 : _t.callControlHeader,
            },
            '&:hover': {
                backgroundColor: (_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.background) === null || _v === void 0 ? void 0 : _v.tableRowHover,
            },
        },
        tableCell: {
            display: 'flex',
        },
        customTableContainer: {
            borderCollapse: 'collapse',
            backgroundColor: 'initial',
        },
    });
};
export default CcfPerformanceStyles;
//# sourceMappingURL=ccf-performance-styles.js.map