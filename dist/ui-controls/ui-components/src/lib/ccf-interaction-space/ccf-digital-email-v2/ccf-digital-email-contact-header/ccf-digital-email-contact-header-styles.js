import { getApplicationDirection } from '../../../global.app.slice';
import { useSelector } from 'react-redux';
/**
 * style object for ccf-contact-content-header
 * @returns CcfDigitalEmailContactHeaderStyles styles object
 * ```
 * @example CcfDigitalEmailContactHeaderStyles(theme)
 * ```
 */
const CcfDigitalEmailContactHeaderStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13;
    const appDirection = useSelector(getApplicationDirection);
    const styles = {
        doubleArrowIcon: {
            height: '1rem',
            width: '1rem',
        },
        upArrow: {
            transform: 'rotate(180deg)',
        },
        dotBackground: Object.assign({ height: '0.625rem', width: '1.375rem', backgroundColor: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.accent) === null || _b === void 0 ? void 0 : _b.main}`, borderRadius: '1.25rem', display: 'block', marginLeft: '-0.375rem', marginRight: '0.125rem' }, (appDirection === 'rtl' && {
            marginLeft: '0rem',
        })),
        dot: {
            height: '0.375rem',
            width: '0.188rem',
            backgroundColor: `${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.paper}`,
            borderRadius: '50%',
            display: 'inline-block',
            marginBottom: '0.063rem',
            marginRight: '0.125rem',
        },
        subjectLabel: {
            marginTop: '0.25rem',
            fontSize: '1em',
            fontWeight: '600',
            display: 'inline',
        },
        bookmark: {
            width: '100%',
            background: `0 0 no-repeat padding-box ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.paper}`,
            borderBottom: `0.063rem solid ${(_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.border) === null || _h === void 0 ? void 0 : _h.main}`,
        },
        customFieldScroll: {
            overflowY: 'scroll',
            maxHeight: '100%',
        },
        bookmarkContent: {
            display: 'flex',
            justifyContent: 'space-between',
            font: `normal normal ${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _j === void 0 ? void 0 : _j.h6) === null || _k === void 0 ? void 0 : _k.fontSize}/${(_m = (_l = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _l === void 0 ? void 0 : _l.h6) === null || _m === void 0 ? void 0 : _m.fontSize} ${(_o = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _o === void 0 ? void 0 : _o.fontFamily}`,
            flexWrap: 'wrap',
            // to include aligned content header for CIA.  
            [theme.breakpoints.between('sm', 'md')]: {
                fontSize: '0.625rem',
                lineHeight: '0.75rem',
                display: 'flex',
                flexFlow: 'wrap-reverse',
                justifyContent: 'space-between',
            },
            letterSpacing: 0,
            color: `${(_q = (_p = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _p === void 0 ? void 0 : _p.text) === null || _q === void 0 ? void 0 : _q.contrastText}`,
            alignItems: 'center',
            padding: '0.25rem 0rem',
            '&:hover, &:active, &:focus': {
                border: 'none',
            },
            '& > div': {
                display: 'flex',
                alignItems: 'center',
                [theme.breakpoints.between('sm', 'md')]: {
                    marginLeft: '0.5rem',
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
            borderBottom: `0.063rem solid ${(_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.border) === null || _z === void 0 ? void 0 : _z.dark}`,
            '&:hover, &:focus, &:active': {
                borderBottom: `0.063rem solid ${(_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _0 === void 0 ? void 0 : _0.border) === null || _1 === void 0 ? void 0 : _1.dark}`,
            },
        },
        bookmarkContentHeader: {
            maxWidth: '40%',
            [theme.breakpoints.down('xl')]: {
                maxWidth: '90% !important',
            },
        },
        bookmarkContentSubHeader: {
            fontWeight: 700,
            marginBottom: '0',
            color: `${(_3 = (_2 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _2 === void 0 ? void 0 : _2.text) === null || _3 === void 0 ? void 0 : _3.contrastText}`,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            height: '1.25rem',
            marginTop: '0.5rem',
            marginLeft: '0.625rem',
            [theme.breakpoints.between('sm', 'md')]: {
                overflow: 'hidden',
                marginRight: '0',
                marginLeft: '0',
            },
        },
        viewButtonContainer: {
            display: 'flex',
            alignItems: 'center',
            maxHeight: '2em',
            marginRight: '0.5rem',
            marginLeft: '0.625rem',
            [theme.breakpoints.down('md')]: {
                marginRight: '0.1rem',
                justifyContent: 'space-between',
                width: '100%',
            },
        },
        viewButton: {
            border: 'none',
            background: 'transparent',
            font: 'normal normal 600 0.688rem/0.75rem Open Sans',
            color: (_5 = (_4 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _4 === void 0 ? void 0 : _4.primary) === null || _5 === void 0 ? void 0 : _5.main,
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            marginLeft: '0.5rem',
            '&>p': {
                font: 'normal normal 600 0.688rem/0.75rem open-sans',
                lineHeight: 1.5,
                [theme.breakpoints.down('xl')]: {
                    fontSize: '0.563rem',
                },
            },
        },
        minimizePanelIcon: {
            width: '1.5rem',
            height: '1.5rem',
            color: (_7 = (_6 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _6 === void 0 ? void 0 : _6.secondary) === null || _7 === void 0 ? void 0 : _7.main,
            opacity: 1,
        },
        viewDetailsContent: {
            textAlign: 'left',
            font: 'normal normal normal 0.75rem/1.063rem Open Sans',
            letterSpacing: 0,
            color: (_9 = (_8 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _8 === void 0 ? void 0 : _8.text) === null || _9 === void 0 ? void 0 : _9.primary,
            opacity: 1,
            marginTop: '-0.188rem',
        },
        formatViewDetails: {
            paddingLeft: '0.938rem',
            textAlign: 'left',
            font: 'normal normal 600 0.625rem/0.75rem open-sans',
            letterSpacing: 0,
            color: `${(_11 = (_10 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _10 === void 0 ? void 0 : _10.text) === null || _11 === void 0 ? void 0 : _11.contrastText}`,
            opacity: 0.75,
        },
        showStatusLg: {
            [theme.breakpoints.down('xl')]: {
                display: 'none',
            },
        },
        caseDetailWrapper: {
            display: 'inline-flex',
            [theme.breakpoints.between('sm', 'md')]: {
                maxWidth: '7.813rem',
            },
            [theme.breakpoints.between('lg', 972)]: {
                flexWrap: 'wrap',
            },
            gap: '0.25rem',
            alignItems: 'center',
            color: `${(_13 = (_12 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _12 === void 0 ? void 0 : _12.text) === null || _13 === void 0 ? void 0 : _13.contrastText}`,
            fontWeight: 700,
        },
        channelTypeSubheader: {
            display: 'inline-flex',
        },
    };
    return styles;
};
export default CcfDigitalEmailContactHeaderStyles;
//# sourceMappingURL=ccf-digital-email-contact-header-styles.js.map