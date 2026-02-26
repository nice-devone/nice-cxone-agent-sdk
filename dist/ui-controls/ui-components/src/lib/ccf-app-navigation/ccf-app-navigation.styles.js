/**
 * Styling for ccf-app-navigation
 * @returns ccf-app-navigation CSS properties as a JSON object
 * @example ccfAppNavigationStyles(theme)
 */
export const ccfAppNavigationStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f;
    const styles = {
        sidebarContainer: {
            justifyContent: 'center',
            [theme.breakpoints.down('xl')]: {
                backgroundColor: theme.palette.background.default,
                padding: '4px',
            },
            backgroundColor: theme.palette.background.paper,
            height: '100%',
            padding: '7px',
            ':focus, :focus-visible': {
                border: '0',
            },
        },
        sidebar: {
            position: 'static',
            flexShrink: 0,
        },
        moreMenuButton: {
            transform: 'rotate(-90deg)',
        },
        hamburgerContainer: {
            '&::-webkit-scrollbar': {
                width: '0.3rem', // Set the width of the scrollbar
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.scrollThumb,
                borderRadius: '2rem',
            },
            '&::-webkit-scrollbar-track': {
                backgroundColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.scrollTrack,
            },
            '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.scrollThumbHover,
            },
            overflowY: 'auto',
            width: '12.5rem',
            '[dir=\'rtl\'] &': {
                [theme.breakpoints.up('xl')]: {
                    left: '50px',
                },
            },
            '[dir=\'ltr\'] &': {
                left: '15px',
            },
        },
        hamburgerRootContainer: {
            [theme.breakpoints.up('xl')]: {
                '&.MuiPopover-root': {
                    top: '125px',
                },
            },
        },
    };
    return styles;
};
export default ccfAppNavigationStyles;
//# sourceMappingURL=ccf-app-navigation.styles.js.map