/**
 * return styles used for the component
 * @example <directorySearchStyles />
 * @returns styles
 */
const directorySearchStyles = (theme) => {
    var _a, _b;
    return {
        searchInputField: {
            '&::placeholder': {
                color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.placeholder,
                opacity: 1, // otherwise browser shows a lighter color
            },
        },
    };
};
export default directorySearchStyles;
//# sourceMappingURL=ccf-directory-search.styles.js.map