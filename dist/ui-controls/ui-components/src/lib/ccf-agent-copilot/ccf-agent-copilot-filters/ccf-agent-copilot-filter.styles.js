/**
 * style object for ccf-agent-copilot-filter
 * @returns CcfAgentCopilotFilterStyles object
 * @example CcfAgentCopilotFilterStyles()
 */
const CcfAgentCopilotFilterStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    const styles = {
        button: {
            width: 'auto',
            height: '1.875rem',
            padding: '0.563rem 1.25rem 0.563rem 1.125rem',
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.searchTitle,
            borderColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.main,
            alignContent: 'center',
            fontSize: '0.688rem',
            fontWeight: 800,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        },
        dropdownBox: {
            width: '100%',
            maxHeight: 'calc(100vh - 110px)',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
        },
        dropdownLabels: {
            fontSize: '0.813rem',
            fontWeight: 600,
        },
        filtersText: {
            fontWeight: 700,
            color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.filter,
            fontSize: '0.875rem',
            marginLeft: '-0.438rem',
        },
        filterMenuItem: {
            fontSize: '0.75rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            height: '2rem',
        },
        applyButton: {
            width: '1.25rem',
            height: '1.875rem',
            padding: '0.563rem 1.25rem 0.563rem 1.125rem',
            color: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.white,
            borderColor: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.border) === null || _k === void 0 ? void 0 : _k.main,
            alignContent: 'center',
            fontSize: '0.688rem',
            fontWeight: 800,
            backgroundColor: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.noteLabel,
            '&:hover': {
                backgroundColor: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.text) === null || _p === void 0 ? void 0 : _p.noteLabel,
            },
        },
        loadMoreButton: {
            color: (_r = (_q = theme.palette) === null || _q === void 0 ? void 0 : _q.text) === null || _r === void 0 ? void 0 : _r.dark,
            fontSize: '0.7rem',
            fontWeight: 500,
            textDecoration: 'underline',
            cursor: 'pointer',
        },
        dropdownOptionsCount: {
            color: (_t = (_s = theme.palette) === null || _s === void 0 ? void 0 : _s.text) === null || _t === void 0 ? void 0 : _t.header,
            fontSize: '0.75rem',
            fontWeight: 500,
            marginLeft: '1.563rem',
            lineHeight: '0.938rem',
            padding: '0.313rem 0 0.313rem 0',
        },
    };
    return styles;
};
export default CcfAgentCopilotFilterStyles;
//# sourceMappingURL=ccf-agent-copilot-filter.styles.js.map