/**
 * @example styles for CcfHeader component
 */
const ccfHeaderStyle = (theme, direction, LeftIcon) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const styles = {
        popOver: {
            marginRight: '5px',
        },
        container: {
            display: 'flex',
            width: 'auto',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '4px',
            '& > div': {
                display: 'flex',
                alignItems: 'center',
                width: 'auto',
                marginLeft: '3px',
                marginTop: '3px',
            },
        },
        headerTabBackground: {
            background: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.callControlHeader} 0% 0% no-repeat padding-box`,
            borderBottom: `1px solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.main}`,
            borderRadius: '6px 6px 0px 0px',
            paddingLeft: '12px',
        },
        dragIndicator: {
            color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.main,
        },
        popOverOverflow: {
            padding: '0px',
            height: '20px',
            width: '20px',
            fill: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.secondary) === null || _h === void 0 ? void 0 : _h.main,
            cursor: 'pointer',
        },
        minimizePanelLabel: {
            font: 'normal normal normal 12px/17px Open Sans',
            letterSpacing: '0px',
            color: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.primary,
            opacity: '1',
            marginTop: '-3px',
            textAlign: 'left',
        },
        browserLabel: {
            font: 'normal normal normal 12px/17px Open Sans',
            letterSpacing: '0px',
            color: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.primary,
            opacity: '1',
            marginTop: '-3px',
            textAlign: 'left',
        },
        browserWindowIcon: {
            width: '24px',
            height: '24px',
            color: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.secondary) === null || _p === void 0 ? void 0 : _p.main,
            opacity: '1',
        },
        minimizePanelIcon: {
            width: '24px',
            height: '24px',
            color: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.secondary) === null || _r === void 0 ? void 0 : _r.main,
            opacity: '1',
        },
        menu: {
            '& .MuiMenu-paper': {
                width: '196px',
                height: '67px',
                background: `${(_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.background) === null || _t === void 0 ? void 0 : _t.paper} 0% 0% no-repeat padding-box`,
                boxShadow: `0px 1px 2px ${(_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.boxshadow) === null || _v === void 0 ? void 0 : _v.main}`,
                borderRadius: '4px',
                opacity: '1',
                overflowY: 'hidden',
                marginLeft: direction === 'rtl' && '190px',
                marginTop: '36px',
            },
        },
        menuItem: {
            padding: '2px 7px',
            '&:first': {
                marginTop: '-5px',
            },
        },
        popOverDismissButton: {
            '& .MuiIconButton-sizeSmall': {
                position: 'absolute',
                top: '8px',
                right: '8px',
            },
        },
        popOverDismissButtonIcon: {
            fontSize: '1rem',
        },
        headerTitle: {
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: 600,
            fontSize: '0.875rem',
            lineHeight: '19px',
            color: (_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.text) === null || _x === void 0 ? void 0 : _x.secondary,
            marginLeft: LeftIcon ? '5px' : '',
            letterSpacing: '0px',
        },
        contentWrap: {
            wordBreak: 'break-all',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            '-webkit-line-clamp': 2,
            '-webkit-box-orient': 'vertical',
            whiteSpace: 'pre-line',
        },
    };
    return styles;
};
export default ccfHeaderStyle;
//# sourceMappingURL=ccf-header.styles.js.map