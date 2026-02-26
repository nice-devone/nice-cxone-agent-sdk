/**
 * return styles used for the component
 * @example <ccfNavItemStyles />
 * @returns styles
 */
const ccfNavItemStyles = (theme) => {
    var _a, _b;
    return {
        navItem: {
            cursor: 'pointer',
        },
        menuItemAlignment: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 42,
            height: 43,
            margin: 0,
            padding: 0,
            '.Mui-selected': {
                backgroundColor: `${theme.palette.border.main} !important`,
                borderRadius: '2px',
            },
            color: (_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.secondary) === null || _b === void 0 ? void 0 : _b.main,
        },
        sidebarItemBadge: {
            '.MuiBadge-badge': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.paper,
            },
        },
        sidebarItemBadgeStandard: {
            '.MuiBadge-badge': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.paper,
            },
            '.MuiBadge-standard': {
                height: theme.spacing(2),
                minWidth: theme.spacing(2),
                fontSize: '0.5em',
                padding: '1px 2px 0px 2px',
                border: `2px solid ${theme.palette.background.default}`,
                position: 'absolute',
                top: '8px',
                left: '4px',
            },
        },
    };
};
export default ccfNavItemStyles;
//# sourceMappingURL=ccf-nav-item.styles.js.map