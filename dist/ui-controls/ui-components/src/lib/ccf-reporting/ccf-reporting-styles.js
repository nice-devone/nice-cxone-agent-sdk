/**
 * style object for ccf-reporting
 * @returns CcfReportingStyles styles object
 * ```
 * @example
 * <CcfReportingStyles />
 * ```
 */
const CcfReportingStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    const styles = {
        reportingBox: {
            height: '100%',
            width: '100%',
        },
        headerStyle: {
            display: 'flex',
            flexDirection: 'column',
            background: `${theme.palette.background.level1} 0% 0% no-repeat padding-box`,
            boxShadow: `0px 1px 3px ${theme.palette.boxshadow.main}`,
            borderRadius: '5px 5px 0px 0px',
            height: '100%',
            label: {
                color: theme.palette.text.secondary,
                marginLeft: '5px',
            },
        },
        tabContainerStyle: {
            '& .MuiTab-root': {
                fontWeight: '600',
            },
        },
        tabContentSection: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: '39px',
            paddingTop: '10px',
            '.Mui-selected': {
                color: (theme) => theme.palette.primary.main,
            },
            'MuiTabs-indicator': {
                backgroundColor: (theme) => theme.palette.primary.main,
            },
        },
        productivityWrapper: {
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            display: 'flex',
            paddingBottom: '1.5rem',
            margin: '0px 1%',
            'button.MuiToggleButton-root': {
                borderRadius: '0 4px 4px 0',
                padding: '14px',
                width: 'inherit',
                [theme.breakpoints.down('md')]: {
                    padding: '0.4rem',
                },
                ':hover': {
                    backgroundColor: theme.palette.background.hover,
                },
            },
            'button.MuiToggleButton-root.Mui-selected': {
                color: theme.palette.secondary.main,
                backgroundColor: theme.palette.background.hover,
            },
            '.MuiToggleButtonGroup-root': {
                height: '45px',
                [theme.breakpoints.down('md')]: {
                    width: '100%',
                },
            },
        },
        productivityheader: {
            display: 'flex',
            alignItems: 'center',
            fontSize: theme.typography.h3,
            fontWeight: theme.typography.fontWeightBold,
            height: '45px',
        },
        btn: {
            background: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.callControlHeader} 0% 0% no-repeat padding-box`,
            borderRight: `0.0625rem solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.lightGray}`,
            boxShadow: `0rem 0.0625rem 0.0625rem 0rem ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.boxshadow) === null || _f === void 0 ? void 0 : _f.main}`,
            color: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.filter,
            fontSize: theme.typography.h5,
            fontWeight: theme.typography.fontWeightBold,
            '&.MuiButtonBase-root.MuiToggleButton-root.Mui-selected': {
                color: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.background) === null || _k === void 0 ? void 0 : _k.socialReaction,
                borderRight: `0.0625rem solid ${(_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.border) === null || _m === void 0 ? void 0 : _m.lightGray}`,
                boxShadow: `0rem 0.0625rem 0.0625rem 0rem ${(_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.boxshadow) === null || _p === void 0 ? void 0 : _p.main}`,
                borderBottom: `0.125rem solid ${(_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.background) === null || _r === void 0 ? void 0 : _r.socialReaction}`,
                backgroundColor: `${(_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.background) === null || _t === void 0 ? void 0 : _t.checkboxHover} !important`,
                fontSize: theme.typography.h5,
                fontWeight: theme.typography.fontWeightBold,
            },
            '&.MuiButtonBase-root.MuiToggleButton-root:focus-visible, &.MuiButtonBase-root.MuiToggleButton-root:focus': {
                border: `0.0625rem solid ${(_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.border) === null || _v === void 0 ? void 0 : _v.menuItemHighlight}`,
                borderRadius: '0.25rem !important',
            },
        },
        calenderBlock: {
            paddingBottom: '20px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
            margin: '0px 1%',
        },
        dateLabel: {
            marginRight: '20px',
        },
    };
    return styles;
};
export default CcfReportingStyles;
//# sourceMappingURL=ccf-reporting-styles.js.map