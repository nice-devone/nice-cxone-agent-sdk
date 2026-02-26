/**
 * Styling for TableActionMenuPlugin
 * @returns TableActionMenuPlugin CSS properties as a JSON object
 * @param theme - theme from mui
 * @example ccfTableActionMenuPluginStyles(theme)
*/
const ccfTableActionMenuPluginStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
    const styles = {
        dropdown: {
            zIndex: '10',
            display: 'block',
            position: 'absolute',
            boxShadow: '0 0.75rem 1.75rem 0 rgba(0, 0, 0, 0.2), 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.1), inset 0 0 0 0.06rem rgba(255, 255, 255, 0.5)',
            borderRadius: '0.25rem',
            maxHeight: '9.375rem',
            overflowY: 'auto',
            backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.white,
            '&::-webkit-scrollbar': {
                width: '0.25rem',
                height: '0.25rem',
            },
            '&::-webkit-scrollbar-track': {
                backgroundColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.scrollTrack,
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.scrollThumb,
                borderRadius: '1.875rem',
            },
            '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.scrollThumbHover,
            },
        },
        item: {
            margin: '0 0.5rem 0 0.5rem',
            padding: '0.5rem',
            color: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.charcolGrey,
            cursor: 'pointer',
            lineHeight: '0.75rem',
            fontSize: '0.75rem',
            fontWeight: '600',
            display: 'flex',
            alignContent: 'center',
            flexDirection: 'row',
            flexShrink: '0',
            justifyContent: 'space-between',
            backgroundColor: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.white,
            borderRadius: '0.25rem',
            border: '0',
            maxWidth: '15.62rem',
            minWidth: '6.25rem',
            '&:hover': {
                backgroundColor: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.background) === null || _p === void 0 ? void 0 : _p.LogoColor,
            },
            '&:first-child': {
                marginTop: '0.5rem',
            },
            '&:last-child': {
                marginBottom: '0.5rem',
            },
        },
        text: {
            display: 'flex',
            lineHeight: '0.625rem',
            flexGrow: '1',
            minWidth: '9.375rem',
        },
        tableCellActionButtonContainer: {
            position: 'absolute',
            top: '0',
            left: '0',
            willChange: 'transform',
        },
        tableCellActionButton: {
            justifyContent: 'center',
            alignItems: 'center',
            border: '0',
            position: 'relative',
            borderRadius: '0.937rem',
            color: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.background) === null || _r === void 0 ? void 0 : _r.LogoColor,
            display: 'inline-block',
            backgroundColor: (_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.text) === null || _t === void 0 ? void 0 : _t.main,
            cursor: 'pointer',
            height: '1.25rem',
        },
        modalContainer: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'background.paper',
            border: `0.063rem solid ${(_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.border) === null || _v === void 0 ? void 0 : _v.dark}`,
            borderRadius: '0.313rem',
            boxShadow: '24',
            padding: '1.5rem',
            width: '26.25rem',
            fontSize: '0.813rem',
            [theme.breakpoints.down(500)]: {
                width: '21.25rem',
                fontSize: (_x = (_w = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _w === void 0 ? void 0 : _w.h6) === null || _x === void 0 ? void 0 : _x.fontSize,
            },
        },
        ColorPickerPopover: {
            backgroundColor: `${(_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.background) === null || _z === void 0 ? void 0 : _z.paper}`,
            width: '7.5rem',
            border: `1px solid ${(_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _0 === void 0 ? void 0 : _0.border) === null || _1 === void 0 ? void 0 : _1.dark}`,
        },
        ColorButton: {
            width: '1.125rem',
            height: '1.125rem',
            border: `1px solid ${(_3 = (_2 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _2 === void 0 ? void 0 : _2.background) === null || _3 === void 0 ? void 0 : _3.toolTipBg}`,
            borderRadius: '3px',
            margin: '2px',
            cursor: 'pointer',
        },
        ColorButtonContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            justifyItems: 'center',
            padding: '0.3rem',
            borderTop: `1px solid ${(_5 = (_4 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _4 === void 0 ? void 0 : _4.border) === null || _5 === void 0 ? void 0 : _5.dark}`,
        },
        ColorResetButton: {
            padding: '0.3rem 0',
            cursor: 'pointer',
            fontSize: '0.75rem',
            width: '100%',
        },
    };
    return styles;
};
export default ccfTableActionMenuPluginStyles;
//# sourceMappingURL=ccf-table-action-menu-plugin.styles.js.map