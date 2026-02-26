/**
 * return styles used for the component
 * @example <ccf-directory/>
 * @returns styles
 */
export const settingsStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
    const styles = {
        settingsContainer: {
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            position: 'relative',
            height: '100%',
            width: 'auto',
            padding: '15px 10px',
            borderRadius: '6px',
        },
        menuTab: {
            padding: '10px 0px 10px 0px',
        },
        loginVoiceSettingsContainer: {
            display: 'flex',
            [(_a = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _a === void 0 ? void 0 : _a.down('xl')]: {
                flexDirection: 'column',
            },
        },
        headsetContainer: {
            display: 'flex',
            flexDirection: 'column',
            [(_b = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _b === void 0 ? void 0 : _b.up('xl')]: {
                paddingLeft: '3rem',
            },
            [(_c = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _c === void 0 ? void 0 : _c.down('xl')]: {
                paddingLeft: '0.5rem',
            },
        },
        headsetHeader: {
            padding: '1rem 1rem 0 1rem',
            fontSize: (_e = (_d = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _d === void 0 ? void 0 : _d.h4) === null || _e === void 0 ? void 0 : _e.fontSize,
            fontWeight: (_f = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _f === void 0 ? void 0 : _f.fontWeightBold,
        },
        headsetHeaderText: {
            padding: '1rem 1rem 0.5rem 1rem',
            fontSize: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _g === void 0 ? void 0 : _g.h5) === null || _h === void 0 ? void 0 : _h.fontSize,
            maxWidth: '24rem',
        },
        noiseCancellationContainer: {
            maxWidth: '20rem',
        },
        addDeviceSubHeader: {
            position: 'static',
            padding: '0.5rem 1rem 0 1rem',
            lineHeight: '1.75rem',
            color: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.primary,
        },
        selectedDeviceSubHeader: {
            position: 'static',
            padding: '0.5rem  1rem 0 1rem',
            lineHeight: '1.75rem',
            maxWidth: '14rem',
            color: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.primary,
        },
        addDeviceText: {
            padding: '0.5rem 1rem',
            fontSize: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _o === void 0 ? void 0 : _o.h5) === null || _p === void 0 ? void 0 : _p.fontSize,
            maxWidth: '24rem',
        },
        addDeviceButton: {
            margin: '0.5rem 1rem',
            padding: '0.125rem 1rem',
            fontWeight: (_q = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _q === void 0 ? void 0 : _q.fontWeightBold,
            color: (_s = (_r = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _r === void 0 ? void 0 : _r.primary) === null || _s === void 0 ? void 0 : _s.main,
            boxShadow: 'none',
        },
        selectedDeviceText: {
            padding: '0.5rem 1rem',
            fontSize: (_u = (_t = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _t === void 0 ? void 0 : _t.h5) === null || _u === void 0 ? void 0 : _u.fontSize,
        },
        selectionDropdown: {
            minWidth: '12rem',
            '& .MuiSelect-select': {
                padding: '0.5rem 4rem 0.5rem 1rem !important',
            },
            '& .MuiOutlinedInput-input': {
                lineHeight: '1.5rem',
            },
        },
        menuItem: {
            border: '0.0625rem solid transparent',
        },
        hoveredElement: {
            '&:hover': {
                backgroundColor: (_w = (_v = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _v === void 0 ? void 0 : _v.background) === null || _w === void 0 ? void 0 : _w.menuItemHighlight,
            },
        },
        focusedElement: {
            border: '0.063rem solid transparent',
            '&:focus': {
                border: `0.063rem solid ${(_y = (_x = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _x === void 0 ? void 0 : _x.border) === null || _y === void 0 ? void 0 : _y.menuItemHighlight} `,
            },
        },
        volumeSlider: {
            '& .MuiSlider-thumb.Mui-focusVisible': {
                outline: '0.125rem solid ' + ((_0 = (_z = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _z === void 0 ? void 0 : _z.border) === null || _0 === void 0 ? void 0 : _0.menuItemHighlight),
                outlineOffset: '0.25rem',
            },
        },
    };
    return styles;
};
export default settingsStyles;
//# sourceMappingURL=ccf-settings.styles.js.map