/**
 * Styling for CcfAgentCopilotDecisionTree
 * @param theme - MUI theme object
 * @returns CcfAgentCopilotDecisionTree CSS properties as a JSON object
 * @example CcfAgentCopilotDecisionTreeStyles(theme)
 */
const CcfAgentCopilotDecisionTreeStyles = (theme, isCompact) => {
    const commonHeaderStyles = {
        display: 'flex',
        alignItems: 'center',
    };
    return {
        container: {
            display: 'flex',
            top: '0.1rem',
            flexDirection: 'column',
            paddingBottom: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
            overflow: 'auto',
            height: '100%',
            position: 'relative',
            width: '100%',
            boxSizing: 'border-box',
        },
        header: Object.assign(Object.assign({}, commonHeaderStyles), { justifyContent: 'space-between', flexShrink: 0, minHeight: '15px', position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 10, paddingTop: theme.spacing(1.5), paddingBottom: theme.spacing(2) }),
        headerContent: Object.assign({}, commonHeaderStyles),
        title: {
            fontWeight: theme.typography.fontWeightBold,
            color: theme.palette.text.primary,
        },
        headerAction: Object.assign(Object.assign({}, commonHeaderStyles), { gap: 1, color: theme.palette.text.secondary }),
        contentWrapper: {
            display: 'flex',
            gap: theme.spacing(2),
            marginTop: theme.spacing(2),
            alignItems: 'stretch',
            flexDirection: isCompact ? 'column' : 'row',
        },
        divider: {
            width: isCompact ? '100%' : '1px',
            height: isCompact ? '1px' : 'auto',
            backgroundColor: theme.palette.divider,
            mx: isCompact ? 0 : theme.spacing(1.5),
            my: isCompact ? theme.spacing(1.5) : 0,
            alignSelf: 'stretch',
        },
        sections: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            overflow: 'auto',
            minHeight: 0,
        },
        dropdownContainer: {
            maxHeight: '4rem',
            minHeight: '4rem',
            width: isCompact ? '100%' : '50%',
        },
        sqSection: isCompact
            ? {
                maxHeight: '50vh',
                flex: '0 1 auto',
                overflowY: 'auto',
            }
            : {},
        cdSection: isCompact
            ? {
                flex: '1 1 auto',
                overflowY: 'auto',
            }
            : {},
    };
};
export default CcfAgentCopilotDecisionTreeStyles;
//# sourceMappingURL=ccf-agent-copilot-decision-tree.styles.js.map