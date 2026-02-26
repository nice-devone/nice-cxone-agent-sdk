/**
 * return styles used for agent leg component
 * @example styles = agentLegStyle(theme)
 * @returns styles
 */
export const agentLegStyle = (theme) => {
    return {
        agentLeg: {
            display: 'flex',
            flexDirection: 'column',
            padding: '8px',
            color: theme.palette.text.white,
            ':disabled': {
                pointerEvents: 'auto',
                cursor: 'not-allowed',
            },
        },
    };
};
export default agentLegStyle;
//# sourceMappingURL=ccf-agent-leg.styles.js.map