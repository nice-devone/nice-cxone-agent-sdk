/**
 * Styling for CcfMenu
 * @param theme - MUI theme object
 * @returns CcfMenu CSS properties as a JSON object
 * @example ColumnStyles(theme)
 */
const ColumnStyles = (theme) => {
    var _a, _b, _c, _d;
    const styles = {
        focussedElement: {
            '&:focus': {
                border: `0.0625rem solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        focussedBackground: {
            '&:focus': {
                backgroundColor: `${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.transparent}`,
            },
        },
    };
    return styles;
};
export default ColumnStyles;
//# sourceMappingURL=ccf-menu.style.js.map