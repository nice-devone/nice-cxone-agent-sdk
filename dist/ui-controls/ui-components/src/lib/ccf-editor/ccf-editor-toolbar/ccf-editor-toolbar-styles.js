/**
 * Styling for ccf-editor-toolbar
 * @returns ccf-editor-toolbar CSS properties as a JSON object
 * @example ccfEditorToolbarStyles(theme)
 */
export const ccfEditorToolbarStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const styles = {
        buttonActive: {
            background: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.main,
            marginRight: '0.2rem',
        },
        toolbarContainer: {
            backgroundColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.white,
            width: '100%',
            border: `0.125rem solid ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.border) === null || _f === void 0 ? void 0 : _f.emailFooter}`,
            boxShadow: `0 0.25rem 0.375rem ${(_h = (_g = theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.feedbackTooltipBoxShadow}`,
            borderRadius: '0.25rem',
            padding: '0.313rem',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '0.5rem',
        },
    };
    return styles;
};
export default ccfEditorToolbarStyles;
//# sourceMappingURL=ccf-editor-toolbar-styles.js.map