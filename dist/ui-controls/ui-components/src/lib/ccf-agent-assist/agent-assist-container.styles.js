/**
 * Styling for agentAssistContainerStyles
 * @returns agentAssistContainerStyles CSS properties as a JSON object
 * @example agentAssistContainerStyles(theme)
 */
export const agentAssistContainerStyles = (theme) => {
    var _a, _b;
    const styles = {
        mainContainer: {
            height: '100%',
            overflowY: 'hidden',
        },
        mainContainerMdView: {
            display: 'flex',
            flexDirection: 'column-reverse',
        },
        tabsFlexBox: {
            maxHeight: '50px',
        },
        tabsPanelsContainer: {
            height: 'calc(100% - 45px)',
            backgroundColor: (_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.white,
        },
        tabsPanels: {
            height: '100%',
        },
    };
    return styles;
};
/**
 * Styling for tabPanelStyles
 * @returns tabPanelStyles CSS properties as a JSON object
 * @example tabPanelStyles(theme)
 */
const tabPanelStyles = (theme) => {
    const styles = {
        mainContainer: {
            height: '100%',
        },
        boxContainer: {
            padding: '0.2rem 0.6rem',
            [theme.breakpoints.up('md')]: {
                height: '100%',
                margin: '20px',
            },
            [theme.breakpoints.down('md')]: {
                margin: '0',
                height: 'calc(100% - 10px)',
                overflow: 'auto',
            },
        },
        typographyContainer: {
            height: '100%',
            [theme.breakpoints.down('md')]: {
                margin: '20px 20px 0 20px',
            },
        },
    };
    return styles;
};
export default tabPanelStyles;
//# sourceMappingURL=agent-assist-container.styles.js.map