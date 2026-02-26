/**
 * global style object for contact control buttons
 * @returns contactControlStyles styles object
 * @example <contactControlStyles />
 */
export const contactControlStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const styles = {
        contactPanelButton: {
            padding: '4px',
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            '&:hover, &:focus, &:focus-visible, &.MuiButtonBase-root:hover, &.MuiButtonBase-root:focus, &.MuiButtonBase-root:focus-visible': {
                backgroundColor: `${(_a = theme.palette) === null || _a === void 0 ? void 0 : _a.background.default}`,
                borderRadius: '4px',
            },
            color: `${(_b = theme.palette) === null || _b === void 0 ? void 0 : _b.secondary.main}`,
            [theme.breakpoints.down('md')]: {
                marginLeft: '1px',
                marginRight: '1px',
            },
            '&.Mui-disabled': {
                opacity: '0.5',
                pointerEvents: 'auto',
                cursor: 'not-allowed',
            },
        },
        footerContainer: {
            padding: '8px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            cursor: 'pointer',
            justifyContent: 'space-evenly',
        },
        fullWidth: {
            width: '100%',
        },
        horizontalDivider: {
            width: '90%',
            margin: '0px 8px',
        },
        markAsResolved: {
            margin: 0,
        },
        resolvedIcon: {
            fill: `${(_c = theme.palette) === null || _c === void 0 ? void 0 : _c.background.dark}`,
        },
        hover: {
            ':hover': {
                backgroundColor: (_d = theme.palette) === null || _d === void 0 ? void 0 : _d.background.default,
            },
        },
        disabled: {
            '&.Mui-disabled': {
                opacity: '0.5',
                pointerEvents: 'auto',
                cursor: 'not-allowed',
            },
        },
        icon: {
            width: '68px',
            height: '34px',
        },
        directoryItemAgentLabel: {
            fontWeight: '600',
            fontSize: theme.typography.h4.fontSize,
            color: theme.palette.text.main,
            fontFamily: theme.typography.fontFamily,
        },
        fullViewDirectoryIcons: {
            minWidth: '40px',
            marginLeft: '0px',
            color: theme.palette.secondary.main,
        },
        phoneIconFullViewDirectory: {
            minWidth: '40px',
            marginLeft: '0px',
            color: theme.palette.secondary.main,
            '&.Mui-disabled': {
                opacity: '0.8',
                pointerEvents: 'none',
                cursor: 'not-allowed',
            },
            '&.MuiButton-textSecondary': {
                color: theme.palette.secondary.main,
                minWidth: '48px',
                '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                    color: 'white',
                },
            },
        },
        controlIconsResponsiveStyles: {
            [theme.breakpoints.down('md')]: {
                fontSize: '1rem',
            },
        },
        ccfDivider: {
            [theme.breakpoints.down('xl')]: {
                borderColor: (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text.light,
                opacity: 0.4,
            },
        },
        controlPanel: {
            borderRadius: '8px',
            border: `1px solid ${(_g = (_f = theme.palette) === null || _f === void 0 ? void 0 : _f.border) === null || _g === void 0 ? void 0 : _g.main}`,
            boxShadow: `0px 1px 3px ${(_j = (_h = theme.palette) === null || _h === void 0 ? void 0 : _h.boxshadow) === null || _j === void 0 ? void 0 : _j.main}`,
            [theme.breakpoints.down('xl')]: {
                marginTop: 'auto',
                backgroundColor: `${(_l = (_k = theme.palette) === null || _k === void 0 ? void 0 : _k.background) === null || _l === void 0 ? void 0 : _l.default}`,
                boxShadow: `0px -3px 6px ${(_o = (_m = theme.palette) === null || _m === void 0 ? void 0 : _m.boxshadow) === null || _o === void 0 ? void 0 : _o.main}`,
                borderRadius: '0px 0px 5px 5px',
            },
        },
        timerStyles: {
            font: `normal normal bold 0.75rem / 2.188rem  ${(_p = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _p === void 0 ? void 0 : _p.fontFamily}`,
            display: 'block',
            padding: '0.124rem',
            letterSpacing: '0rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'pre',
        },
    };
    return styles;
};
export default contactControlStyles;
//# sourceMappingURL=ccf-contact-control.style.js.map