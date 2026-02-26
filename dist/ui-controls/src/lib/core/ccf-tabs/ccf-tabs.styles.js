/**
 * styling for CcfTabs
 * @param theme - MUI theme object
 * @returns CcfTabs styles object
 * ```
 * @example
 * CcfTabsStyle(theme)
 * ```
 */
const CcfTabsStyle = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const styles = {
        focussedElement: {
            border: '0.0625rem solid transparent',
            '&:focus': {
                border: `0.0625rem solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.menuItemHighlight}`,
            },
            '&:hover, &:active': {
                boxShadow: `inset 0 -0.0625rem 0 0 ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.copilotGenerateButton}`,
            },
            '&:focus-visible:not(.Mui-selected)': {
                border: `0.0625rem solid ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.border) === null || _f === void 0 ? void 0 : _f.menuItemHighlight}`,
                boxShadow: `inset 0 -0.0625rem 0 0 ${(_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.copilotGenerateButton}`,
            },
        },
        tab: {
            '&.MuiTab-root': {
                color: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.filter,
            },
            '&.Mui-selected': {
                color: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.background) === null || _m === void 0 ? void 0 : _m.socialReaction,
            },
        },
    };
    return styles;
};
export default CcfTabsStyle;
//# sourceMappingURL=ccf-tabs.styles.js.map