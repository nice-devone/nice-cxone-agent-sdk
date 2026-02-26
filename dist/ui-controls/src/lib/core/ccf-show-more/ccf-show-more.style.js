/**
 * styles for CcfShowMore control
 * @param theme - theme object
 * @example
 * ```
 * const styles = ccfShowMoreStyles(theme);
 * ```
 */
export const ccfShowMoreStyles = (theme) => {
    var _a, _b;
    return {
        showMoreText: {
            color: (_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.dark,
            fontSize: '0.7rem',
            fontWeight: 500,
            textDecoration: 'underline',
            margin: '0 0 1rem 13%',
            cursor: 'default',
        },
    };
};
//# sourceMappingURL=ccf-show-more.style.js.map