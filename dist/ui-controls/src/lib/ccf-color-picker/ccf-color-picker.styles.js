/**
 * Styles for color picker box
 * @param theme - Theme object
 * @example ccfColorPickerStyles(theme)
 */
const ccfColorPickerStyles = (theme) => {
    var _a, _b, _c, _d;
    return ({
        ColorPickerContainer: {
            maxHeight: '24px',
        },
        ColorButton: {
            width: '18px',
            height: '18px',
            borderRadius: '3px',
            margin: '2px',
            cursor: 'pointer',
            border: '0.125rem solid transparent',
            '&:focus': {
                borderColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.menuItemHighlight,
            },
        },
        ColorResetButton: {
            padding: '5px 0',
            cursor: 'pointer',
            fontSize: '0.75rem',
            width: '100%',
            border: '0.125rem solid transparent',
            '&:focus': {
                borderColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.menuItemHighlight,
            },
        },
        ColorButtonContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            justifyItems: 'center',
            padding: '5px',
            borderTop: '1px solid #d5d5d5',
        },
        ColorPickerPopover: {
            backgroundColor: 'white',
            width: '120px',
            border: '1px solid #d5d5d5',
        },
    });
};
export default ccfColorPickerStyles;
//# sourceMappingURL=ccf-color-picker.styles.js.map