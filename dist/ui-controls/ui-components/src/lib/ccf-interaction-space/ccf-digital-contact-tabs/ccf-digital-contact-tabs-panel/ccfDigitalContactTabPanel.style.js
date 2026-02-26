/**
 * style object for Ccf Digital Contact Tab Panel
 * @returns CcfDigitalContactTabPanelStyle styles object
 * ```
 * @example
 * <CcfDigitalContactTabPanelStyle/>
 * ```
 */
const CcfDigitalContactTabPanelStyle = (theme) => {
    var _a, _b, _c, _d;
    const styles = {
        tabsContainer: {
            display: 'flex',
            background: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.paper} 0% 0% no-repeat padding-box`,
            borderTop: `1px solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.main}`,
            borderBottomLeftRadius: '6px',
            borderBottomRightRadius: '6px',
            [theme.breakpoints.down('xl')]: {
                borderRadius: 0,
            },
            flexGrow: '6',
            flexDirection: 'column',
            overflowX: 'hidden',
            height: '100%',
            '.MuiSvgIconroot': {
                fill: 'var(--color-icon)',
            },
        },
        interactionGrid: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            WebkitFlexGrow: 0,
            position: 'relative',
            [theme.breakpoints.down('xl')]: {
                width: '100%',
            },
            tabsContainer: {
                position: 'relative',
                width: '100%',
            },
        },
    };
    return styles;
};
export default CcfDigitalContactTabPanelStyle;
//# sourceMappingURL=ccfDigitalContactTabPanel.style.js.map