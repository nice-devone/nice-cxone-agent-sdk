/**
 * Styles for CcfLocationOption
 * @param theme - The theme object
 * @returns - The styles object
 * @example - ccfLocationOptionStyles(theme)
 */
const ccfLocationOptionStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f;
    const styles = {
        locationLabel: {
            textAlign: 'left',
            fontSize: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a.h6) === null || _b === void 0 ? void 0 : _b.fontSize}`,
            fontWeight: 600,
            padding: '4px 0',
        },
        locationItem: {
            color: theme.palette.text.primary,
            textAlign: 'left',
            '& .MuiSelect-select.MuiInputBase-input': {
                minHeight: 'unset',
            },
            '& .MuiListItemText-primary, .MuiTypography-root, .MuiTypography-body1': {
                fontSize: `${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _c === void 0 ? void 0 : _c.h6) === null || _d === void 0 ? void 0 : _d.fontSize}`,
            },
        },
        locationNote: {
            textAlign: 'left',
            fontSize: `${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _e === void 0 ? void 0 : _e.h6) === null || _f === void 0 ? void 0 : _f.fontSize}`,
            padding: '4px 0',
            marginBottom: '0',
        },
    };
    return styles;
};
export default ccfLocationOptionStyles;
//# sourceMappingURL=ccf-location-option-styles.js.map