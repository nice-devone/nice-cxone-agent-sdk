/**
 * Styling for ccf-full-view-settings
 * @returns ccf-full-view-settings CSS properties as a JSON object
 * @example ccfFullViewSettingsStyles(theme, props)
*/
const ccfFullViewSettingsStyles = (theme) => {
    var _a, _b, _c, _d;
    const styles = {
        FullViewSettingsCard: {
            width: '100%',
            height: '100%',
            background: `${theme.palette.background.light} 0% 0% no-repeat padding-box`,
            boxShadow: `0px 1px 3px ${(_a = theme.palette.boxshadow) === null || _a === void 0 ? void 0 : _a.main}`,
            border: `1px solid ${(_b = theme.palette.border) === null || _b === void 0 ? void 0 : _b.main}`,
            [theme.breakpoints.up('xl')]: {
                borderRadius: '6px',
            },
            opacity: 1,
            transition: 'all 0.5s ease',
            display: 'flex',
            flexDirection: 'column',
            '& .MuiOutlinedInput-input': Object.assign(Object.assign({}, theme.typography.h4), { [theme.breakpoints.down('xl')]: Object.assign(Object.assign({}, theme.typography.h6), { fontSize: '1rem' }) }),
            '& label': {
                color: theme.palette.text.secondary,
                marginLeft: '5px',
            },
            '.MuiTabs-root': {
                '.MuiButtonBase-root': {
                    fontWeight: 700,
                    opacity: 1,
                },
                '.Mui-selected': {
                    color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.socialReaction,
                },
            },
        },
        settingsHeader: {
            background: `${theme.palette.background.level1} 0% 0% no-repeat padding-box`,
            borderRadius: '5px 5px 0px 0px',
            opacity: 1,
            height: '33px',
            '& label': {
                color: theme.palette.text.secondary,
                marginLeft: '5px',
            },
        },
        container: {
            overflowY: 'auto',
            height: '100%',
            backgroundColor: `${theme.palette.background.paper}`,
        },
    };
    return styles;
};
export default ccfFullViewSettingsStyles;
//# sourceMappingURL=ccf-full-view-settings.styles.js.map