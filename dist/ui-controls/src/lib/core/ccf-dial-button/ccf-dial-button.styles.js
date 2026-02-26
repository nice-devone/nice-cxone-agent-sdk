/**
 * Styling for ccfDialButtonStyles
 * @returns ccfDialButtonStyles CSS properties as a JSON object
 * @example ccfDialButtonStyles
*/
const ccfDialButtonStyles = (theme) => {
    var _a, _b, _c, _d;
    const styles = {
        dialButtonContainer: {
            float: 'left',
            cursor: 'pointer',
            width: '33%',
            background: 'none',
            border: 'none',
            textAlign: 'center',
            '&:hover, &:focus, &:active': {
                backgroundColor: (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.background.noteInput,
                outline: 'none',
                borderRadius: '4px',
            },
            '&:hover': {
                '& .dialKeyNumber, & .dialKeyText': {
                    color: (_b = theme.palette) === null || _b === void 0 ? void 0 : _b.background.dark,
                },
            },
            '&:active': {
                '& .dialKeyNumber, & .dialKeyText': {
                    color: (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.error.main,
                },
            },
        },
        dialKeyNumber: {
            color: (_d = theme.palette) === null || _d === void 0 ? void 0 : _d.text.main,
            fontFamily: 'sans-serif',
            display: 'inline-block',
            paddingBottom: '6px',
        },
        dialKeyText: {
            color: theme.palette.text.light || '#8c95a5',
            fontSize: '0.75rem',
            display: 'block',
            marginTop: '-5px',
            fontFamily: 'sans-serif',
            textTransform: 'uppercase',
        },
    };
    return styles;
};
export default ccfDialButtonStyles;
//# sourceMappingURL=ccf-dial-button.styles.js.map