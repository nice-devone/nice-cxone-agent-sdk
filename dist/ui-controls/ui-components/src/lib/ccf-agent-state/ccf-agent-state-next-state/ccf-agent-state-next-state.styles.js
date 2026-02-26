/**
 * Styling for agentStateNextStateStyles
 * @returns agentStateNextStateStyles CSS properties as a JSON object
 * @example agentStateNextStateStyles
*/
const agentStateNextStateStyles = (theme) => {
    var _a;
    const styles = {
        nextStateBox: {
            alignItems: 'center',
        },
        agentStatusIcon: {
            marginRight: '8px',
        },
        nextSection: {
            margin: '5px 0px',
            color: (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.text.primary,
        },
        nextStateTitle: {
            textTransform: 'uppercase',
            margin: '8px',
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: '600',
            fontSize: '0.6875rem',
            lineHeight: '0.9375rem',
            color: theme.palette.text.light || '#8c95a5',
        },
    };
    return styles;
};
export default agentStateNextStateStyles;
//# sourceMappingURL=ccf-agent-state-next-state.styles.js.map