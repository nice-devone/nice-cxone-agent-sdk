/**
 * style object for Ccf-interaction-reset-and-refresh-bar
 * @returns CcfInteractionResetAndRefreshStyles object
 * @example CcfInteractionResetAndRefreshStyles(theme)
 */
const CcfInteractionResetAndRefreshStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            button: {
                height: '1.3rem',
                width: '8rem',
                border: 'none',
                boxShadow: 'none',
                padding: '0.563rem 1.3rem 0.563rem 0.5rem',
                marginLeft: '-0.625rem',
                '&:hover': {
                    border: 'none',
                    boxShadow: 'none',
                    backgroundColor: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.light}`,
                },
                backgroundColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.header,
            },
        },
        icon: {
            height: '1.5rem',
            width: '1.5rem',
            color: `${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.clearText}`,
        },
        refreshIcon: {
            paddingBottom: '0.0625rem',
            marginRight: '0.2rem',
        },
        focussedElement: {
            '&:focus': {
                border: `0.0625rem solid ${(_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.border) === null || _h === void 0 ? void 0 : _h.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        buttonText: {
            fontSize: '0.75',
            fontWeight: '600',
            fontStyle: 'bold',
            marginLeft: '0.313rem',
            color: `${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.clearText}`,
        },
    };
    return styles;
};
export default CcfInteractionResetAndRefreshStyles;
//# sourceMappingURL=ccf-interaction-search-reset-and-refresh-styles.js.map