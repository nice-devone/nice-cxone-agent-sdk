/**
 * return styles used for the component
 * @example ccfAgentStateStyles(theme)
 * @returns styles
 */
export const ccfAgentStateStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
    const styles = {
        noResultFoundIcon: {
            width: '100%',
            height: '150px',
        },
        agentStatusSection: {
            '&:hover': {
                background: `0% 0% no-repeat padding-box ${(_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.dark}`,
                boxShadow: `inset 1px 1px 2px  ${(_d = (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.boxshadow) === null || _d === void 0 ? void 0 : _d.main},
        1px 1px 1px ${(_f = (_e = theme.palette) === null || _e === void 0 ? void 0 : _e.boxshadow) === null || _f === void 0 ? void 0 : _f.hover}`,
                cursor: 'pointer',
                zIndex: '2000',
            },
        },
        goAvlButton: {
            background: `0% 0% no-repeat padding-box ${(_h = (_g = theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.hover}`,
            boxShadow: `0px 1px 0px ${(_k = (_j = theme.palette) === null || _j === void 0 ? void 0 : _j.boxshadow) === null || _k === void 0 ? void 0 : _k.light}`,
            color: (_l = theme.palette.text) === null || _l === void 0 ? void 0 : _l.secondary,
        },
        activeState: {
            color: (_m = theme.palette) === null || _m === void 0 ? void 0 : _m.background.paper,
        },
        unavailableCodesSelection: {
            background: `0% 0% no-repeat padding-box ${(_o = theme.palette) === null || _o === void 0 ? void 0 : _o.background.paper}`,
            boxShadow: `0px 2px 6px ${(_q = (_p = theme.palette) === null || _p === void 0 ? void 0 : _p.boxshadow) === null || _q === void 0 ? void 0 : _q.main}`,
        },
        titleLabel: {
            color: (_r = theme.palette.text) === null || _r === void 0 ? void 0 : _r.main,
        },
        logoutBg: {
            '&:hover, &:focus': {
                background: `0% 0% no-repeat padding-box ${(_t = (_s = theme.palette) === null || _s === void 0 ? void 0 : _s.background) === null || _t === void 0 ? void 0 : _t.hover} !important`,
            },
        },
        logoutTextFont: {
            color: (_u = theme.palette.text) === null || _u === void 0 ? void 0 : _u.contrastText,
        },
        searchIconColor: {
            color: (_v = theme.palette.text) === null || _v === void 0 ? void 0 : _v.filter,
        },
        myProfileContainerBg: {
            background: ` ${(_x = (_w = theme.palette) === null || _w === void 0 ? void 0 : _w.background) === null || _x === void 0 ? void 0 : _x.light} 0% 0% no-repeat padding-box`,
            boxShadow: `0px 1px 3px  ${(_z = (_y = theme.palette) === null || _y === void 0 ? void 0 : _y.boxshadow) === null || _z === void 0 ? void 0 : _z.main}`,
        },
        stateBorder: {
            border: `1px solid ${(_0 = theme.palette.border) === null || _0 === void 0 ? void 0 : _0.main}`,
        },
        agentStateListContainer: {},
        unavailableStatusSelection: {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            borderRadius: '0px 0px 6px 6px',
            opacity: '1',
            top: '52px',
            zIndex: ((_1 = theme.zIndex) === null || _1 === void 0 ? void 0 : _1.tooltip) || '999',
            maxHeight: 'calc(100vh - 30vh)',
            overflow: 'hidden',
            [theme.breakpoints.up('xl')]: Object.assign(Object.assign({}, (theme.direction === 'rtl' && {
                left: '5px',
            })), (theme.direction === 'ltr' && {
                right: '5px',
            })),
            [theme.breakpoints.down('xl')]: Object.assign(Object.assign({}, (theme.direction === 'rtl' && {
                left: '0',
            })), (theme.direction === 'ltr' && {
                right: '0',
            })),
        },
        labelAllCodes: {
            color: (_3 = (_2 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _2 === void 0 ? void 0 : _2.text) === null || _3 === void 0 ? void 0 : _3.main,
            paddingLeft: '8px',
            top: '329px',
            left: '988px',
            textAlign: 'left',
            fontSize: '0.5625rem',
            lineHeight: '0.8125rem',
            letterSpacing: '0px',
            textTransform: 'capitalize',
            paddingTop: '8px',
        },
        agentStatusSelection: {
            height: '48px',
            display: 'flex',
            width: '176px',
            borderRadius: '6px',
            opacity: '1',
            alignItems: 'center',
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: '600',
            fontSize: '0.875rem',
            lineHeight: '1.188rem',
            padding: '4px',
            margin: '0 8px',
            '&:hover': {
                cursor: 'pointer',
            },
        },
        displayStateSelect: {
            height: '100%',
            width: '100%',
        },
        hoverButton: {
            width: '100%',
            height: '100%',
            borderRadius: '3px',
            opacity: '1',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        hoverButtonIconText: {
            padding: '0px !important',
        },
        iconAvailable: {
            width: '20px',
            height: '20px',
        },
        hoverButtonText: {
            letterSpacing: '0px',
            opacity: '1',
            paddingLeft: '5px',
        },
        stateSelected: {
            width: '11rem',
            height: '47px',
            fontSize: '0.8125rem',
            lineHeight: '1.125rem',
            fontWeight: 'normal',
            letterSpacing: '0px',
            opacity: '1',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '5px',
            paddingRight: '5px',
        },
        allStatus: {
            overflowY: 'scroll',
            overflowX: 'hidden',
        },
        favoriteLabel: {
            top: '107px',
            left: '988px',
            textAlign: 'left',
            fontSize: '0.5625rem',
            lineHeight: '0.8125rem',
            letterSpacing: '0px',
            textTransform: 'capitalize',
            opacity: '1',
            paddingLeft: '8px',
            paddingTop: '8px',
        },
        stateCodesList: {
            display: 'block !important',
            paddingInlinestart: '0px !important',
        },
        logout: {
            width: '100%',
            height: '39px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            justifyContent: 'flexstart',
            padding: '0px',
            borderRadius: '0px',
        },
        logOutIcon: Object.assign(Object.assign({}, (theme.direction === 'rtl' && {
            marginRight: '3px',
            transform: 'rotate(180deg)',
        })), (theme.direction === 'ltr' && {
            marginLeft: '7px',
        })),
        logoutText: {
            top: '526px',
            left: '1017px',
            minWidth: '100px',
            height: '19px',
            textAlign: 'left',
            letterSpacing: '0px',
            marginLeft: '10px',
        },
        agentStateProfileDetails: {
            padding: '8px',
        },
        noAgentFoundTypography: {
            marginTop: '16px',
            marginBottom: '20px',
            textAlign: 'center',
            fontWeight: 'bold',
        },
        searchTextBox: {
            padding: '10px',
            width: 'fit-content',
        },
        searchIcon: {
            opacity: '0.75',
        },
        agentStatus: {
            'maxHeight': '100%',
            'fontSize': '0.8125rem',
            'lineHeight': '1rem',
            width: '11rem',
        },
        breakStatus: {
            wordBreak: 'break-word',
            overflowWrap: 'anywhere',
            whiteSpace: 'normal',
        },
    };
    return styles;
};
export default ccfAgentStateStyles;
//# sourceMappingURL=ccf-agent-state.styles.js.map