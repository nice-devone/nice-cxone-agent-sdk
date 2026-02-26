/**
 * Styles for Input menu control
 * @example - CcfInputMenuStyles(theme)
 */
export const CcfInputMenuStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return ({
        container: {
            position: 'relative',
            width: '100%',
        },
        focussedElement: {
            '&:focus': {
                border: `0.0625rem solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        paper: {
            position: 'absolute',
            zIndex: 1,
            marginTop: 0,
            width: '100%',
            maxHeight: '50vh',
            overflow: 'scroll',
            li: {
                fontSize: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _c === void 0 ? void 0 : _c.h5) === null || _d === void 0 ? void 0 : _d.fontSize,
                '&:focus-visible, &:active': {
                    border: `0.0625rem solid ${(_f = (_e = theme.palette) === null || _e === void 0 ? void 0 : _e.border) === null || _f === void 0 ? void 0 : _f.menuItemHighlight}`,
                    borderRadius: '0.25rem',
                },
                '&:hover': {
                    backgroundColor: (_h = (_g = theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.menuItemHighlight,
                    borderRadius: '0.25rem',
                },
            },
        },
    });
};
//# sourceMappingURL=ccf-input-menu.style.js.map