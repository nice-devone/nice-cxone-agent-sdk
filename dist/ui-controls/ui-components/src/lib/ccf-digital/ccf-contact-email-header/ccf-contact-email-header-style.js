/**
 * styles for email header component
 * @example CcfContactEmailHeaderStyles(theme)
 */
const CcfContactEmailHeaderStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const styles = {
        header: {
            background: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.active} 0% 0% no-repeat padding-box`,
            opacity: 1,
            width: '100%',
            padding: '4px 15px',
            borderRadius: '4px 4px 0 0',
        },
        senderDetails: {
            '& > div': {
                display: 'flex',
                height: '17px',
            },
        },
        accordionContent: {
            textAlign: 'left',
            font: 'normal normal normal 11px/15px Open Sans',
            letterSpacing: 0,
            color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.paper,
            alignItems: 'center',
            width: '90%',
            [theme === null || theme === void 0 ? void 0 : theme.breakpoints.up('xl')]: {
                maxWidth: '29.29vw',
            },
            [theme === null || theme === void 0 ? void 0 : theme.breakpoints.up('xl')]: {
                maxWidth: '22vw',
            },
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        },
        accordionTime: {
            textAlign: 'left',
            font: 'normal normal normal 10px/15px Open Sans',
            letterSpacing: 0,
            color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.paper,
            alignItems: 'center',
            marginLeft: 'auto',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textAlignLast: 'end',
        },
        viewButton: {
            border: 'none',
            background: 'transparent',
            color: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.paper,
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
        },
        boxAlignment: {
            width: '100%',
            textAlign: 'right',
            marginTop: '-7px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.background) === null || _k === void 0 ? void 0 : _k.paper,
            marginLeft: '9px',
        },
        accordionReceipientContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        upArrow: {
            transform: 'rotate(180deg)',
        },
        subject: {
            width: 'fit-content',
        },
    };
    return styles;
};
export default CcfContactEmailHeaderStyles;
//# sourceMappingURL=ccf-contact-email-header-style.js.map