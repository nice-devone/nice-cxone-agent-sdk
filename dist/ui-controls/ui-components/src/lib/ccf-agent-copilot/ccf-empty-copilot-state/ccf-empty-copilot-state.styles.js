/**
 * Styling for CcfEmptyCopilotState
 * @returns CcfEmptyCopilotState CSS properties as a JSON object
 *  @example -
 * ```
 * styles = ccfEmptyCopilotStateStyles(theme);
 * ```
*/
const ccfEmptyCopilotStateStyles = (theme) => {
    var _a, _b;
    const styles = {
        emptyStateContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            height: '100%',
            margin: '0 0.625rem',
        },
        sparklesIcon: {
            height: '4.5rem',
            width: '4.5rem',
            alignSelf: 'center',
            m: 2,
        },
        suggestionIcon: {
            alignSelf: 'flex-start',
        },
        contentContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1,
        },
        textContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        title: {
            fontWeight: 'bold',
        },
        description: {
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.darkGrey,
        },
    };
    return styles;
};
export default ccfEmptyCopilotStateStyles;
//# sourceMappingURL=ccf-empty-copilot-state.styles.js.map