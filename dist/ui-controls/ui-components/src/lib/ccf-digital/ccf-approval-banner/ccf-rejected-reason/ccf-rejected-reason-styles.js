/**
 * style object for ccf-rejected-reason
 * @returns CcfRejectedReasonStyle styles object
 * ```
 * @example
 * import CcfRejectedReasonStyle from './ccf-rejected-reason-styles';
 * ```
 */
const CcfRejectedReasonStyle = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const styles = {
        container: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1,
            width: '100%',
            textAreaContainer: {
                '&.MuiOutlinedInput-root': {
                    padding: '0.3rem 0.5rem',
                    fontSize: '0.75rem',
                    backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.paper,
                },
            },
        },
        submitBtn: {
            height: '1.5rem',
            padding: '0',
            fontSize: `${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _c === void 0 ? void 0 : _c.h4) === null || _d === void 0 ? void 0 : _d.fontSize}`,
            minWidth: '3.37rem',
            backgroundColor: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.paper,
            fontWeight: 600,
            color: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.primary) === null || _h === void 0 ? void 0 : _h.dark,
        },
        closeButton: {
            minWidth: 'auto',
            boxShadow: 'none',
            border: 'none',
            padding: 0,
            '&:hover': {
                background: 'none',
                border: 'none',
                boxShadow: 'none',
            },
        },
        closeIcon: {
            cursor: 'pointer',
            color: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.contrastText,
        },
        focusedElement: {
            '&:focus': {
                border: `0.0625rem solid ${(_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.border) === null || _m === void 0 ? void 0 : _m.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
    };
    return styles;
};
export default CcfRejectedReasonStyle;
//# sourceMappingURL=ccf-rejected-reason-styles.js.map