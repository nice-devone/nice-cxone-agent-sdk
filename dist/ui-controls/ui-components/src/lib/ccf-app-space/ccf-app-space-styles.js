import { isFeatureEnabled } from '@nice-devone/ui-controls';
/**
 * style object for ccf-app-space
 * @returns CcfAppSpaceStyles styles object
 * ```
 * @example
 * <CcfAppSpaceStyles />
 * ```
 */
const CcfAppSpaceStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14;
    const isDnDReplacementEnabled = isFeatureEnabled("release-cx-agent-dnd-app-space-AW-48194" /* FeatureToggles.SIDENAV_APPSPACE_DND_LIBRARY_REPLACEMENT */);
    const styles = {
        appSpaceHeader: {
            background: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.level1} 0% 0% no-repeat padding-box`,
            boxShadow: `0px 1px 3px ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.boxshadow) === null || _d === void 0 ? void 0 : _d.main}`,
            borderRadius: '5px 5px 0px 0px',
            height: '30px',
            '& label': {
                color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.secondary,
                paddingLeft: '12px',
            },
        },
        divider: {
            marginTop: '7px',
            marginBottom: '4px',
            borderRightWidth: 1,
            borderColor: (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.divider,
        },
        tabsContainer: {
            height: '45px',
            minHeight: '45px',
            background: `${(_j = (_h = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _h === void 0 ? void 0 : _h.background) === null || _j === void 0 ? void 0 : _j.level1} 0% 0% no-repeat padding-box`,
            boxShadow: `0px 1px 0px ${(_l = (_k = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _k === void 0 ? void 0 : _k.boxshadow) === null || _l === void 0 ? void 0 : _l.light}`,
            ':focus, :focus-visible': {
                border: '0',
            },
            '.Mui-selected': {
                color: (_o = (_m = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _m === void 0 ? void 0 : _m.primary) === null || _o === void 0 ? void 0 : _o.main,
                '.conversationIcon': {
                    stroke: (_q = (_p = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _p === void 0 ? void 0 : _p.primary) === null || _q === void 0 ? void 0 : _q.main,
                },
            },
            '.MuiTabs-indicator': {
                display: 'none',
            },
        },
        activeTabIndicator: {
            backgroundColor: (_s = (_r = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _r === void 0 ? void 0 : _r.primary) === null || _s === void 0 ? void 0 : _s.main,
        },
        appSpaceCard: {
            width: '100%',
            margin: '0%',
            background: `${(_u = (_t = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _t === void 0 ? void 0 : _t.background) === null || _u === void 0 ? void 0 : _u.paper} 0% 0% no-repeat padding-box`,
            boxShadow: `0px 1px 3px ${(_w = (_v = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _v === void 0 ? void 0 : _v.border) === null || _w === void 0 ? void 0 : _w.main}`,
            border: `1px solid ${(_y = (_x = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _x === void 0 ? void 0 : _x.border) === null || _y === void 0 ? void 0 : _y.main}`,
            borderRadius: '6px',
            opacity: '1',
            transition: 'all 0.5s ease',
        },
        tab: {
            height: '2.813rem',
            minWidth: '45px !important',
            color: (_0 = (_z = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _z === void 0 ? void 0 : _z.secondary) === null || _0 === void 0 ? void 0 : _0.main,
            minHeight: '2.813rem',
            padding: '8px',
        },
        hamburger: {
            '& .MuiDrawer-paper': {
                width: '250px',
                backgroundColor: (_2 = (_1 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _1 === void 0 ? void 0 : _1.background) === null || _2 === void 0 ? void 0 : _2.toolTipBg,
            },
        },
        hamburgerContainer: {
            '&::-webkit-scrollbar': {
                width: '0.3rem', // Set the width of the scrollbar
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: (_4 = (_3 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _3 === void 0 ? void 0 : _3.background) === null || _4 === void 0 ? void 0 : _4.scrollThumb,
                borderRadius: '2rem',
            },
            '&::-webkit-scrollbar-track': {
                backgroundColor: (_6 = (_5 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _5 === void 0 ? void 0 : _5.background) === null || _6 === void 0 ? void 0 : _6.scrollTrack,
            },
            '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: (_8 = (_7 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _7 === void 0 ? void 0 : _7.background) === null || _8 === void 0 ? void 0 : _8.scrollThumbHover,
            },
            width: isDnDReplacementEnabled ? 'auto' : '12.5rem',
        },
        contactDetails: {
            overflowY: 'auto',
            maxHeight: '56vh',
            margin: '0px 12px',
            '&::-webkit-scrollbar': {
                display: 'none',
                height: '95%',
            },
            /* contact card inner scroll height based on responsive screen */
            '@media only screen and (min-height: 650px) and (max-height: 667px)': {
                maxHeight: '60vh',
            },
            '@media only screen and (min-height: 668px) and (max-height: 768px)': {
                maxHeight: '61vh',
            },
            '@media only screen and (min-height: 769px) and (max-height: 860px)': {
                maxHeight: '65vh',
            },
            '@media only screen and (min-height: 861px) and (max-height:959px)': {
                maxHeight: '69vh',
            },
            '@media only screen and (min-height: 960px)': {
                maxHeight: '80vh',
            },
        },
        tabContentSection: {
            height: 'calc(100% - 75px)',
        },
        tabicon: {
            marginTop: '-4px',
        },
        customerCardIcon: {
            width: '100%',
        },
        focussedElement: {
            '&:focus': {
                border: `0.0625rem solid ${(_10 = (_9 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _9 === void 0 ? void 0 : _9.border) === null || _10 === void 0 ? void 0 : _10.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        selectedTab: {
            borderBottom: `2px solid ${(_12 = (_11 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _11 === void 0 ? void 0 : _11.primary) === null || _12 === void 0 ? void 0 : _12.main}`,
        },
        conversationsStyle: {
            position: 'absolute',
            top: 0,
            right: 0,
            width: '8px',
            height: '8px',
            backgroundColor: (_14 = (_13 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _13 === void 0 ? void 0 : _13.error) === null || _14 === void 0 ? void 0 : _14.main,
            borderRadius: '50%',
        },
    };
    return styles;
};
export default CcfAppSpaceStyles;
//# sourceMappingURL=ccf-app-space-styles.js.map