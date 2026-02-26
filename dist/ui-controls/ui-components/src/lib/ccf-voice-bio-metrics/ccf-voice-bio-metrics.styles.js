/**
 * return styles used for the component
 * @example ccfVoiceBioMetricsStyles(theme)
 * @returns styles
 */
const ccfVoiceBioMetricsStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
    return {
        listSubheader: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: 0,
        },
        closeIcon: {
            cursor: 'pointer',
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.black,
            marginLeft: 'auto',
            fontSize: '1em',
        },
        voiceBioOptionsText: {
            fontSize: '0.938rem',
            fontWeight: 600,
        },
        flexContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        voiceBioInput: {
            marginBottom: '0.75rem',
            '& .MuiInputBase-root': {
                paddingRight: 0,
            },
        },
        redStar: {
            color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.red,
        },
        verifyBtn: {
            display: 'flex',
            marginLeft: 'auto',
            fontSize: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _e === void 0 ? void 0 : _e.h5) === null || _f === void 0 ? void 0 : _f.fontSize,
        },
        container: {
            width: '18.75rem',
            paddingBottom: '0.313rem',
        },
        radioOptions: {
            fontSize: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _g === void 0 ? void 0 : _g.h6) === null || _h === void 0 ? void 0 : _h.fontSize,
            lineHeight: '15px',
            margin: '0',
        },
        optoutReasonRadio: {
            '& svg': {
                width: '1rem',
                height: '1rem',
            },
            '& p': {
                paddingBottom: 0,
            },
        },
        optoutReasonsHeading: {
            color: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.black,
            fontSize: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _l === void 0 ? void 0 : _l.h6) === null || _m === void 0 ? void 0 : _m.fontSize,
            paddingLeft: '9px',
            fontWeight: 600,
            marginBottom: '15px',
        },
        voiceBioPopover: {
            marginLeft: '5px',
        },
        popoverContainer: {
            margin: '0',
            'button': {
                fontSize: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _o === void 0 ? void 0 : _o.h5) === null || _p === void 0 ? void 0 : _p.fontSize,
                fontWeight: 600,
            },
        },
        popoverReasonsContainer: {
            margin: 0,
            maxHeight: '150px',
            overflowY: 'auto',
            paddingLeft: '4px',
        },
        startBtn: {
            marginLeft: '10px',
            minWidth: '50px',
            color: theme.palette.text.clearText,
        },
        popOverMain: {
            padding: '12px',
        },
        statusMessageContainer: {
            display: 'flex',
            [theme.breakpoints.up('xl')]: {
                paddingBottom: '6px',
            },
            alignItems: 'center',
            cursor: 'pointer',
        },
        statusMessage: {
            fontSize: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _q === void 0 ? void 0 : _q.h6) === null || _r === void 0 ? void 0 : _r.fontSize,
            padding: '0 4px',
        },
        errorMessage: {
            color: (_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.text) === null || _t === void 0 ? void 0 : _t.red,
            fontSize: '12px',
            padding: '0 4px',
        },
        innerMessage: {
            fontSize: '12px',
            margin: 0,
            padding: '0.75rem 0.5rem 0.75rem 0',
        },
        optOutReasonsBtns: {
            display: 'flex',
            justifyContent: 'flex-end',
            fontSize: '13px',
            padding: '13px',
            flexDirection: 'row',
            gap: '10px',
            position: 'sticky',
            bottom: 0,
            paddingRight: 0,
            paddingBottom: 0,
            'button': {
                fontSize: (_v = (_u = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _u === void 0 ? void 0 : _u.h5) === null || _v === void 0 ? void 0 : _v.fontSize,
                fontWeight: 600,
            },
        },
        btnDiv: {
            fontSize: (_x = (_w = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _w === void 0 ? void 0 : _w.h5) === null || _x === void 0 ? void 0 : _x.fontSize,
            display: 'flex',
            justifyContent: 'end',
        },
        popoverHeading: {
            color: (_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.text) === null || _z === void 0 ? void 0 : _z.black,
            fontSize: (_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _0 === void 0 ? void 0 : _0.h6) === null || _1 === void 0 ? void 0 : _1.fontSize,
            fontWeight: 'bold',
        },
    };
};
export default ccfVoiceBioMetricsStyles;
//# sourceMappingURL=ccf-voice-bio-metrics.styles.js.map