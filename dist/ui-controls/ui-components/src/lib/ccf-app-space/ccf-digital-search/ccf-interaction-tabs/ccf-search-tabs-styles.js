/**
 * style object for ccf-search-tab
 * @returns CcfSearchTabsStyles object
 * @example CcfSearchTabsStyles()
 */
const CcfSearchTabsStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const styles = {
        searchTabsWrapper: {
            background: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.header,
            display: 'flex',
            width: '100%',
            button: {
                fontWeight: 600,
                borderBottom: `.0625rem solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.tabBorder}`,
                border: '0.0625rem solid transparent',
                '&:focus': {
                    border: `0.0625rem solid ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.border) === null || _f === void 0 ? void 0 : _f.menuItemHighlight}`,
                },
                '&:hover, &:active': {
                    boxShadow: `inset 0 -0.0625rem 0 0 ${(_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.copilotGenerateButton}`,
                },
                '&:focus-visible:not(.Mui-selected)': {
                    border: `0.0625rem solid ${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.border) === null || _k === void 0 ? void 0 : _k.menuItemHighlight}`,
                    boxShadow: `inset 0 -0.0625rem 0 0 ${(_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.background) === null || _m === void 0 ? void 0 : _m.copilotGenerateButton}`,
                },
            },
            '& .MuiButtonBase-root.Mui-selected': {
                color: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.primary) === null || _p === void 0 ? void 0 : _p.main,
            },
        },
        searchTabsDropdown: {
            m: 1,
            minWidth: 150,
        },
    };
    return styles;
};
export default CcfSearchTabsStyles;
//# sourceMappingURL=ccf-search-tabs-styles.js.map