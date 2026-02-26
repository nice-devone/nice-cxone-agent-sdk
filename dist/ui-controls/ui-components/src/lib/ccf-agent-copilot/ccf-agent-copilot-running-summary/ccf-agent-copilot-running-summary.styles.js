/**
 * Styling for CcfAgentCopilotRunningSummary
 * @returns CcfAgentCopilotRunningSummary CSS properties as a JSON object
 * @example CcfAgentCopilotRunningSummaryStyles(theme)
*/
const CcfAgentCopilotRunningSummaryStyles = (theme, lineHeight, fontSize) => {
    var _a, _b, _c, _d, _e, _f;
    const styles = {
        runningSummaryContainer: {
            display: 'flex',
            background: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.noteInput,
            boxShadow: `0rem 0.063rem 0rem 0rem ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.digitalTag}`,
            position: 'sticky',
            top: 0,
            padding: '0.62rem',
            minHeight: '3.375rem',
        },
        summaryText: {
            fontSize: `${fontSize}px`,
            color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.secondary) === null || _f === void 0 ? void 0 : _f.main,
            lineHeight: `${lineHeight}px`,
        },
        expandedSummaryText: {
            maxWidth: '100%',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'justify',
        },
    };
    return styles;
};
export default CcfAgentCopilotRunningSummaryStyles;
//# sourceMappingURL=ccf-agent-copilot-running-summary.styles.js.map