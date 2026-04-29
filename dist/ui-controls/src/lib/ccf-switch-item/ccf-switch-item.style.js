/**
 * renders the style for switch item
 * @param props - Theme
 * @example CCfSwitchItemStyle()
 * @returns return the style for switch item
 */
export const CCfSwitchItemStyle = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const style = {
        toggleSwitch: {
            '& .MuiSwitch-track': {
                backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.filter,
                opacity: 1,
            },
            '& .MuiSwitch-thumb': {
                backgroundColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.common) === null || _d === void 0 ? void 0 : _d.white,
                border: `0.125rem solid ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.border) === null || _f === void 0 ? void 0 : _f.toggleThumb}`,
            },
            '& .MuiSwitch-switchBase:hover + .MuiSwitch-track': {
                backgroundColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.toggleHover,
                opacity: 1,
            },
            '& .MuiSwitch-switchBase.Mui-focusVisible + .MuiSwitch-track': {
                outline: `0.125rem solid ${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.border) === null || _k === void 0 ? void 0 : _k.menuItemHighlight}`,
                outlineOffset: '0.5rem',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.background) === null || _m === void 0 ? void 0 : _m.toggleChecked,
                opacity: 1,
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
                color: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.common) === null || _p === void 0 ? void 0 : _p.white,
            },
        },
    };
    return style;
};
//# sourceMappingURL=ccf-switch-item.style.js.map