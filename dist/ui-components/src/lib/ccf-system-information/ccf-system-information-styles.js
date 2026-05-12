/* eslint-disable-next-line @nice-cxone/ccf/required-tsdoc */
const ccfSystemInformationStyles = (theme, isSmView) => {
    var _a, _b, _c, _d, _e, _f;
    const styles = {
        baseText: {
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'normal',
            overflowWrap: 'anywhere',
        },
        gridHeader: {
            fontSize: '18px',
            color: theme.palette.primary.dark,
            fontWeight: 700,
            padding: '0.5rem 1rem 0',
        },
        gridDate: {
            fontSize: '12px',
            fontWeight: 400,
            padding: '0 1rem',
            color: theme.palette.text.secondary,
        },
        gridContainer: {
            display: 'flex',
        },
        loggingContainer: {
            marginTop: '10px',
            '.MuiSelect-select': {
                paddingTop: '13px',
                paddingBottom: '13px',
            },
        },
        gridCell: {
            minWidth: '150px',
        },
        gridSubHeader: {
            padding: '0.5rem 1rem 0',
            fontSize: '16px',
            color: theme.palette.primary.dark,
            fontWeight: 700,
        },
        infoTitle: {
            padding: '0.5rem 1rem 0',
            fontSize: '0.875rem',
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.primary) === null || _b === void 0 ? void 0 : _b.dark,
            fontWeight: 700,
            textTransform: 'uppercase',
        },
        infoValue: {
            padding: '0 1rem 0.5rem',
            fontSize: '14px',
            fontWeight: 400,
            color: theme.palette.text.secondary,
        },
        subGrid: {
            display: 'flex',
            gap: '0.2rem',
            padding: '0 1rem',
        },
        limitValue: {
            fontSize: '14px',
            fontWeight: 400,
            color: theme.palette.text.secondary,
        },
        networkDetailsContainer: {
            display: 'flex',
            flexDirection: isSmView ? 'column' : 'row',
            alignItems: isSmView ? 'left' : 'baseline',
            margin: '0 0 1.5rem 0',
        },
        networkDetails: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'left',
            alignItems: 'flex-start',
            flex: '0 0 30%',
        },
        connectionLagTimeLabel: {
            fontWeight: 800,
            padding: 0,
            margin: 0,
        },
        sliderContainer: {
            display: 'flex',
            verticalAlign: 'middle',
            backgroundColor: theme.palette.background.paper,
            padding: '0 0.5rem',
            fontSize: '12px',
            margin: '1rem 0.5rem',
        },
        networkSpeed: {
            outline: 0,
            border: 0,
            borderRadius: '500px',
            width: '100%',
            transition: 'box-shadow 0.2s ease-in-out',
            overflow: 'hidden',
            height: '16px',
            '-webkit-appearance': 'none',
            backgroundImage: `linear-gradient(to right, ${theme.palette.agentState.available}, ${theme.palette.agentState.working}, ${theme.palette.agentState.unavailable})`,
            '&::-webkit-slider-runnable-track': {
                height: '16px',
                '-webkit-appearance': 'none',
                color: `${theme.palette.background.default}`,
                transition: 'box-shadow 0.2s ease-in-out',
            },
            '&::-webkit-slider-thumb': {
                width: '16px',
                '-webkit-appearance': 'none',
                height: '16px',
                background: 'inherit',
                boxShadow: '-340px 0 0 320px transparent, inset 0 0 0 40px transparent',
                border: `3px solid ${theme.palette.background.paper}`,
                borderRadius: '50%',
                transition: 'box-shadow 0.2s ease-in-out',
                position: 'relative',
            },
            '&:active::-webkit-slider-thumb': {
                background: 'inherit',
            },
        },
        menuItem: {
            border: '0.0625rem solid transparent',
            '&:hover': {
                backgroundColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.menuItemHighlight,
            },
            '&:focus': {
                border: `0.065rem solid ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.border) === null || _f === void 0 ? void 0 : _f.menuItemHighlight} `,
            },
        },
    };
    return styles;
};
export default ccfSystemInformationStyles;
//# sourceMappingURL=ccf-system-information-styles.js.map