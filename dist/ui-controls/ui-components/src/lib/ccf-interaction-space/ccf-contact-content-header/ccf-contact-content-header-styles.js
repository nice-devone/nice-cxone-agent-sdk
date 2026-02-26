import { getApplicationDirection } from '../../global.app.slice';
import { useSelector } from 'react-redux';
/**
 * style object for ccf-contact-content-header
 * @returns CcfContactContentHeaderStyles styles object
 * ```
 * @example
 * <CcfContactContentHeaderStyles/>
 * ```
 */
const CcfContactContentHeaderStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9;
    const appDirection = useSelector(getApplicationDirection);
    const styles = {
        doubleArrowIcon: {
            height: '16px',
            width: '16px',
        },
        upArrow: {
            transform: 'rotate(180deg)',
        },
        dotBackground: Object.assign({ height: '10px', width: '22px', backgroundColor: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.accent) === null || _b === void 0 ? void 0 : _b.main}`, borderRadius: '20px', display: 'block', marginLeft: '-6px', marginRight: '2px' }, (appDirection === 'rtl' && {
            marginLeft: '0px',
        })),
        dot: {
            height: '6px',
            width: '3px',
            backgroundColor: `${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.paper}`,
            borderRadius: '50%',
            display: 'inline-block',
            marginBottom: '1px',
            marginRight: '2px',
        },
        subjectLabel: {
            marginTop: '0.25rem',
            fontSize: '1em',
            fontWeight: '600',
            display: 'inline',
        },
        bookmark: {
            width: '100%',
            background: `0% 0% no-repeat padding-box ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.paper}`,
            borderBottom: `1px solid ${(_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.border) === null || _h === void 0 ? void 0 : _h.main}`,
        },
        customFieldScroll: {
            overflowY: 'scroll',
            maxHeight: '100%',
        },
        bookmarkContent: {
            display: 'flex',
            justifyContent: 'space-between',
            font: `normal normal ${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _j === void 0 ? void 0 : _j.h6) === null || _k === void 0 ? void 0 : _k.fontSize}/${(_m = (_l = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _l === void 0 ? void 0 : _l.h6) === null || _m === void 0 ? void 0 : _m.fontSize} ${(_o = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _o === void 0 ? void 0 : _o.fontFamily}`,
            // to include aligned content header for CIA.  
            [theme.breakpoints.between(360, 574)]: {
                fontSize: '0.625rem',
                lineHeight: '0.75rem',
            },
            letterSpacing: 0,
            color: `${(_q = (_p = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _p === void 0 ? void 0 : _p.text) === null || _q === void 0 ? void 0 : _q.contrastText}`,
            alignItems: 'center',
            padding: '4px 0px',
            '&:hover, &:active, &:focus': {
                border: 'none',
            },
            '& > div': {
                display: 'flex',
                marginLeft: '15px',
                [theme.breakpoints.between(360, 574)]: {
                    marginLeft: '8px',
                },
                '& > span:first-of-type': {
                    '& > p': {
                        lineHeight: 1,
                        font: `normal normal 600 ${(_s = (_r = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _r === void 0 ? void 0 : _r.h6) === null || _s === void 0 ? void 0 : _s.fontSize}/${(_u = (_t = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _t === void 0 ? void 0 : _t.h6) === null || _u === void 0 ? void 0 : _u.fontSize} ${(_v = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _v === void 0 ? void 0 : _v.fontFamily}`,
                    },
                },
            },
            '& > p': {
                '& > button': {
                    padding: 0,
                },
            },
        },
        sticky_bookmarkContent: {
            position: 'sticky',
            top: 0,
            background: `${(_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.background) === null || _x === void 0 ? void 0 : _x.paper}`,
            zIndex: 9,
        },
        sticky_bookmarkContent_border: {
            borderBottom: `1px solid ${(_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.border) === null || _z === void 0 ? void 0 : _z.dark}`,
            '&:hover, &:focus, &:active': {
                borderBottom: `1px solid ${(_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _0 === void 0 ? void 0 : _0.border) === null || _1 === void 0 ? void 0 : _1.dark}`,
            },
        },
        bookmarkContentHeader: {
            maxWidth: '70%',
            [theme.breakpoints.down('xl')]: {
                width: '60% !important',
            },
        },
        bookmarkContentSubHeader: {
            fontWeight: 600,
            maxWidth: '35%',
            marginBottom: '0',
        },
        viewButtonContainer: {
            marginLeft: '1px !important',
            maxHeight: '2em',
            marginRight: '0.5rem',
            [theme.breakpoints.down('md')]: {
                marginRight: '0.1rem',
            },
        },
        viewButton: {
            border: 'none',
            background: 'transparent',
            font: 'normal normal 600 11px/12px Open Sans',
            color: (_3 = (_2 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _2 === void 0 ? void 0 : _2.primary) === null || _3 === void 0 ? void 0 : _3.main,
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            '&>p': {
                font: 'normal normal 600 11px/12px open-sans',
                lineHeight: 1.5,
                [theme.breakpoints.down('xl')]: {
                    fontSize: '0.563rem',
                },
            },
        },
        minimizePanelIcon: {
            width: '24px',
            height: '24px',
            color: (_5 = (_4 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _4 === void 0 ? void 0 : _4.secondary) === null || _5 === void 0 ? void 0 : _5.main,
            opacity: 1,
        },
        viewDetailsContent: {
            textAlign: 'left',
            font: 'normal normal normal 12px/17px Open Sans',
            letterSpacing: 0,
            color: (_7 = (_6 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _6 === void 0 ? void 0 : _6.text) === null || _7 === void 0 ? void 0 : _7.primary,
            opacity: 1,
            marginTop: '-3px',
        },
        formatViewDetails: {
            paddingLeft: '15px',
            textAlign: 'left',
            font: 'normal normal 600 10px/12px open-sans',
            letterSpacing: 0,
            color: `${(_9 = (_8 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _8 === void 0 ? void 0 : _8.text) === null || _9 === void 0 ? void 0 : _9.contrastText}`,
            opacity: 0.75,
        },
        showStatusLg: {
            [theme.breakpoints.down('xl')]: {
                display: 'none',
            },
        },
        caseDetailWrapper: {
            display: 'inline-flex',
            [theme.breakpoints.between(360, 574)]: {
                maxWidth: '125px',
            },
            [theme.breakpoints.between(768, 972)]: {
                flexWrap: 'wrap',
            },
            gap: '4px',
            alignItems: 'center',
        },
        channelTypeSubheader: {
            display: 'inline-flex',
        },
    };
    return styles;
};
export default CcfContactContentHeaderStyles;
//# sourceMappingURL=ccf-contact-content-header-styles.js.map