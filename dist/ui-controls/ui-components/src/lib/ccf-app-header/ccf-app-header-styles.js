/**
 *
 * @returns CcfAppHeaderStyles
 * @example - CcfAppHeaderStyles()
 */
export const CcfAppHeaderStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f;
    return ({
        header: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxHeight: '56px',
            height: '56px',
            background: (theme) => `linear-gradient(
      180deg, #009eda 0%, ${theme.palette.primary.main} 100%
    )
    0% 0% no-repeat padding-box`,
            ':focus, :focus-visible': {
                border: '0',
            },
        },
        cxaLogo: {
            position: 'fixed',
            left: '1rem',
            width: '2rem',
            height: '2.125rem',
        },
        cxaText: {
            position: 'fixed',
            left: '4rem',
        },
        cxaTextStyles: {
            color: theme.palette.text.white,
            fontSize: '1rem',
            fontWeight: 'bold',
            letterSpacing: '0.25px',
        },
        logo: {
            [theme.breakpoints.between('lg', 'xl')]: {
                position: 'absolute',
                left: '30vw',
            },
            [theme.breakpoints.between('md', 'lg')]: {
                position: 'absolute',
                left: '4em',
            },
        },
        button: {
            margin: '0 4px 0 4px',
            padding: '20px',
            ':hover, :focus, :focus-visible': {
                outline: 'none',
                backgroundColor: 'rgba(255, 255, 255, .2)',
                borderRadius: '25%',
            },
        },
        helpIcon: {
            lineHeight: '1rem',
            padding: '7px 8px',
        },
        notificationBadge: {
            top: '2px',
            right: '5px',
            height: '14px',
            minWidth: '14px',
            fontSize: '9px !important',
            padding: '1px 2px 0px 2px !important',
            background: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.main} 0% 0% no-repeat padding-box`,
        },
        rightSection: {
            position: 'absolute',
            right: '0',
            justifyContent: 'flex-end',
        },
        appHeaderDivider: {
            height: '60%',
            backgroundColor: '#fff',
            opacity: '0.2',
            borderBottomWidth: '40px',
        },
        focussedElement: {
            '&:focus': {
                border: `0.0625rem solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        focussedBackground: {
            '&:focus': {
                backgroundColor: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.transparent,
            },
        },
        userProfile: {
            [theme.breakpoints.down('xl')]: {
                boxSizing: 'initial',
            },
            [theme.breakpoints.up('xl')]: {
                boxSizing: 'inherit',
            },
        },
        cxoneLogo: {
            width: '100%',
            height: '100%',
        },
        agentChatStandaloneLogo: {
            width: '100%',
            height: '100%',
            fill: 'none',
        },
        logOutButton: {
            margin: '0 0.25rem 0 0.25rem',
            padding: '0.1rem 0.5rem 0.25rem 0.5rem',
            height: '2.5rem',
            ':hover, :focus, :focus-visible': {
                outline: 'none',
                backgroundColor: 'rgba(255, 255, 255, .2)',
                borderRadius: '25%',
            },
        },
    });
};
export default CcfAppHeaderStyles;
//# sourceMappingURL=ccf-app-header-styles.js.map