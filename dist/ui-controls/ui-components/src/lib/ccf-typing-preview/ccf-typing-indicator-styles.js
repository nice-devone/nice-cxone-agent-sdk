/**
 * style object for ccf-typing-indicator
 * @returns CcfTypingIndicatorStyle styles object
 * ```
 * @example
 * <CcfTypingIndicatorStyle />
 * ```
 */
const CcfTypingIndicatorStyle = (theme) => {
    var _a, _b, _c, _d;
    const styles = {
        typingIndicatorContainer: {
            display: 'inline-block',
            backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.noteInput,
            padding: '0.563rem 1.125rem 0.563rem 1.125rem',
            borderRadius: '5px',
            margin: '0 1.875rem 0.5rem 1.25rem',
            maxWidth: '20rem',
        },
        flexContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        iconContainer: {
            display: 'flex',
            alignItems: 'center',
        },
        previewText: {
            color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.darkGrey,
            fontSize: '12px',
            fontStyle: 'italic',
            maxHeight: '6.25rem',
            minHeight: '1.125rem',
            overflowY: 'auto',
        },
    };
    return styles;
};
export default CcfTypingIndicatorStyle;
//# sourceMappingURL=ccf-typing-indicator-styles.js.map