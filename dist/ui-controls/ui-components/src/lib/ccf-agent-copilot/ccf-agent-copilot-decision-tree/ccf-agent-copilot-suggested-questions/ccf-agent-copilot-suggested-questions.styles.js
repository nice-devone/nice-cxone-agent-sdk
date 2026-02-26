/**
 * Styles factory for `CcfAgentCopilotSuggestedQuestions` component.
 * Simplified for single-section rendering with consistent spacing.
 * @param theme - The MUI theme object.
 * @returns An object containing the styles.
 * @example
 * const styles = ccfAgentCopilotSuggestedQuestionsStyles(theme);
 */
const ccfAgentCopilotSuggestedQuestionsStyles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: theme.spacing(2.5),
    },
    title: {
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.text.primary,
        position: 'sticky',
        top: 0,
        backgroundColor: theme.palette.background.paper,
        zIndex: 1,
    },
    list: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1.5),
    },
    questionBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1.2, 1.6),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[0],
        gap: theme.spacing(1.5),
    },
    question: {
        flex: 1,
        fontSize: theme.typography.body2.fontSize,
        lineHeight: 1.4,
        color: theme.palette.text.primary,
        wordBreak: 'break-word',
    },
    skipButton: {
        alignSelf: 'center',
        marginLeft: theme.spacing(1),
        marginTop: 0,
    },
    questionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        flex: 1,
        paddingRight: '8px',
    },
    returnLink: {
        ml: 2,
        textDecoration: 'underline',
        cursor: 'pointer',
        display: 'block',
        mt: 1.5,
        color: 'blue',
    },
});
export default ccfAgentCopilotSuggestedQuestionsStyles;
//# sourceMappingURL=ccf-agent-copilot-suggested-questions.styles.js.map