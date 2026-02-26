/**
 * Styling for CcfReportIssue
 * @returns reportIssueStyles CSS properties as a JSON object
 * @example reportIssueStyles
 */
const reportIssueStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const width = '350px';
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '16px',
            paddingRight: '16px',
            overflowY: 'auto',
            position: 'relative',
            height: '100%',
            width: 'auto',
            borderRadius: '6px',
            // override label style from ccfFullViewSettingsStyles
            '& label': {
                marginLeft: 0,
            },
        },
        header: {
            fontSize: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a.h4) === null || _b === void 0 ? void 0 : _b.fontSize,
            fontWeight: (_c = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _c === void 0 ? void 0 : _c.fontWeightBold,
            padding: '1rem 0 1rem 0',
        },
        inputLabel: {
            textTransform: 'uppercase',
            fontSize: ((_e = (_d = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _d === void 0 ? void 0 : _d.h5) === null || _e === void 0 ? void 0 : _e.fontSize) || '0.8750em',
            fontWeight: ((_f = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _f === void 0 ? void 0 : _f.fontWeightBold) || '400',
            whiteSpace: 'pre-wrap',
            overflow: 'visible',
            '& .MuiInputLabel-asterisk': {
                color: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.asteriskRed,
            },
        },
        select: {
            width: { xs: '100%', lg: width },
            height: '40px',
        },
        textArea: {
            resize: 'none',
            border: `1px solid ${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.border) === null || _k === void 0 ? void 0 : _k.input}`,
            borderRadius: '4px',
            width: '100%',
        },
        textAreaFocused: {
            border: `2px solid ${(_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.primary) === null || _m === void 0 ? void 0 : _m.main}`,
        },
        textAreaContainer: {
            width: { xs: '100%', lg: width },
        },
        sendButton: {
            float: 'right',
            marginTop: '2px',
            boxShadow: 'none',
            '&:hover, &:disabled': {
                boxShadow: 'none',
            },
            '&:focus': {
                border: `0.063rem solid ${(_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.border) === null || _p === void 0 ? void 0 : _p.menuItemHighlight} !important`,
            },
        },
        emptySelectionText: {
            color: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.error) === null || _r === void 0 ? void 0 : _r.main,
            fontSize: '0.875rem',
            marginBottom: '1rem',
        },
        menuItem: {
            border: '0.0625rem solid transparent',
        },
        hoveredElement: {
            '&:hover': {
                backgroundColor: (_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.background) === null || _t === void 0 ? void 0 : _t.menuItemHighlight,
            },
        },
        focusedElement: {
            border: '0.063rem solid transarent',
            '&:focus': {
                border: `0.063rem solid ${(_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.border) === null || _v === void 0 ? void 0 : _v.menuItemHighlight}`,
            },
        },
        checkBox: {
            '&.MuiCheckbox-root': {
                border: '0.063rem solid transarent',
            },
            '&.MuiCheckbox-root.Mui-focusVisible': {
                border: `0.063rem solid ${(_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.border) === null || _x === void 0 ? void 0 : _x.menuItemHighlight}`,
            },
        },
    };
    return styles;
};
export default reportIssueStyles;
//# sourceMappingURL=ccf-report-issue.styles.js.map