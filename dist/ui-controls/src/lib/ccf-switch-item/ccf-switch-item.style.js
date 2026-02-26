/**
 * renders the style for switch item
 * @param props - Theme
 * @example CCfSwitchItemStyle()
 * @returns return the style for switch item
 */
export const CCfSwitchItemStyle = (theme) => {
    var _a, _b;
    const style = {
        toggleSwitch: {
            '& .MuiSwitch-switchBase.Mui-focusVisible + .MuiSwitch-track': {
                outline: `0.125rem solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.menuItemHighlight}`,
                outlineOffset: '0.5rem',
            },
        },
    };
    return style;
};
//# sourceMappingURL=ccf-switch-item.style.js.map