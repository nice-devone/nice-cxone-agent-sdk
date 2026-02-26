/**
 * @example styles for alert component
 */
const ccfDatePickerStyle = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const styles = {
        datePicker: {
            height: '100%',
            width: '144px',
            'svg.mobileCalendarIcon': {
                marginRight: '2px',
                marginTop: '3px',
            },
        },
        textBox: {
            height: '100%',
            input: {
                fontSize: theme.typography.h6,
                fontWeight: theme.typography.fontWeightRegular,
                padding: 0,
                paddingLeft: '0.5rem',
            },
            '.MuiInputAdornment-root': {
                marginLeft: '0px',
                paddingRight: '0.75rem',
            },
            'button.MuiButtonBase-root': {
                padding: '4px',
                '&:focus': {
                    border: `0.0625rem solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.menuItemHighlight}`,
                    borderRadius: '0.25rem',
                },
            },
        },
        searchIcon: {
            paddingRight: 0,
            marginRight: 0,
        },
        backArrowIcon: {
            transform: 'rotate(180deg)',
        },
        textBoxParent: {
            display: 'flex',
            border: `1px solid ${theme.palette.border.main}`,
            borderRadius: '4px',
            height: '38px',
            'button.MuiToggleInput-root': {
                height: '100%',
                ':hover': {
                    backgroundColor: theme.palette.background.hover,
                },
            },
            '.MuiTextField-root': {
                '.MuiInputBase-root': {
                    height: '100%',
                },
            },
        },
        flexStyles: {
            display: 'flex',
            flexDirection: 'column',
            'button.MuiButtonBase-root': {
                padding: '.25rem .125rem .25rem .0625rem',
                minWidth: '1.25rem',
                width: '1.25rem',
                background: theme.palette.background.level1,
                border: `1px solid ${theme.palette.border.main}`,
                borderRadius: '0px',
                'svg.MuiSvgIcon-root': {
                    height: '8px',
                },
                '&:focus': {
                    border: `0.0625rem solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.menuItemHighlight}`,
                    borderRadius: '0.25rem',
                },
            },
        },
        arrowButtonWrapper: {
            display: 'inline-flex',
        },
        labelText: {
            fontWeight: theme.typography.fontWeightBold,
            color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.red,
            margin: '0 0px 5px 5px',
        },
        dateFocusStyles: {
            borderRadius: '50%',
            '&:focus, &.Mui-focusVisible': {
                border: `0.063rem solid ${(_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.border) === null || _h === void 0 ? void 0 : _h.menuItemHighlight}`,
            },
        },
    };
    return styles;
};
export default ccfDatePickerStyle;
//# sourceMappingURL=ccf-datePicker.style.js.map