/**
 * style object for ccf-digital-content-tabs-heading
 * @returns CcfDigitalContactTabHeadingStyles styles object
 * ```
 * @example
 * <CcfDigitalContactTabHeadingStyles/>
 * ```
 */
const CcfDigitalContactTabHeadingStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const styles = {
        container: {
            overflow: 'hidden',
            height: '100%',
            width: '100%',
        },
        header: {
            height: '100%',
            position: 'relative',
            width: '100%',
        },
        headerContainer: {
            width: '100%',
            '& > div': {
                width: '100%',
                height: '100%',
            },
            '&:focus-visible, &:focus': {
                outline: `0.0625rem solid ${(_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.menuItemHighlight}`,
            },
        },
        headerTabBackground: {
            borderRadius: '6px 6px 0px 0px',
            height: '100%',
            width: '100%',
            [theme.breakpoints.down('xl')]: {
                borderRadius: '0',
                width: '100%',
            },
        },
        renderTabsContainer: {
            overflow: 'hidden',
        },
        active: {
            borderBottom: 'none',
            borderRadius: '0.25rem 0.25rem 0 0',
            height: '100%',
        },
        tabContent: {
            height: '100%',
            display: 'block',
            textAlign: 'left',
            fontSize: `${(_d = (_c = theme.typography) === null || _c === void 0 ? void 0 : _c.h6) === null || _d === void 0 ? void 0 : _d.fontSize}`,
            letterSpacing: '0',
            color: `${(_f = (_e = theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.contrastText}`,
            opacity: 1,
            lineHeight: `${(_h = (_g = theme.typography) === null || _g === void 0 ? void 0 : _g.h4) === null || _h === void 0 ? void 0 : _h.fontSize}`,
            width: 'calc(100% - 26px)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            paddingTop: '10px',
        },
        tabContentSmallView: {
            display: 'block',
            width: 'calc(100% - 24px)',
            textAlign: 'left',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            paddingTop: '10px',
        },
        integratedAgentTab: {
            fontSize: `${theme.typography.h6.fontSize}`,
            fontWeight: '600',
            overflow: 'hidden',
            display: 'flex',
            height: '100%',
            '& > div > span': {
                lineHeight: '1.875rem',
                marginLeft: '0.3rem',
            },
        },
        nonIntegratedTab: {
            display: 'flex',
            alignItems: 'center',
            minWidth: '48px',
            width: 'auto',
            padding: '0 0.625rem',
            height: '100%',
        },
        integratedAgentTabCustomerName: {
            paddingLeft: '5px',
            whiteSpace: 'nowrap',
        },
        globeIconWrapper: {
            width: '0',
            height: '0',
            borderTop: `27px solid ${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.background) === null || _k === void 0 ? void 0 : _k.darkYellow}`,
            borderRight: '30px solid transparent',
            position: 'absolute',
        },
        globeIcon: {
            transform: 'translate(15%, -185%)',
            position: 'absolute',
        },
        channelIcon: {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            width: '26px',
            [theme.breakpoints.down('xl')]: {
                margin: '0 5px',
                width: '24px',
            },
        },
        notificationBadge: {
            '& .MuiBadge-badge': {
                backgroundColor: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.error) === null || _m === void 0 ? void 0 : _m.main,
                height: '0.6rem',
                minWidth: '0.6rem',
                borderRadius: '0.375rem',
            },
        },
    };
    return styles;
};
export default CcfDigitalContactTabHeadingStyles;
//# sourceMappingURL=ccf-digital-contact.tab-heading.style.js.map