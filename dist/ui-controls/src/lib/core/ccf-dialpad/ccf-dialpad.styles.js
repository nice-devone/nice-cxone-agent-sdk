/**
 * return styles used for the component
 * @example <CcfDialPadStyles />
 * @returns styles
 */
const dialPadStyles = (theme) => {
    var _a, _b, _c;
    return {
        dialPadContainer: {
            display: 'flex',
            marginBottom: '10px',
        },
        dialKeyPadContainer: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textFieldContainer: {
            width: '100%',
        },
        dialKeyButtonList: {
            margin: '0',
            padding: '0',
            listStyle: 'none',
        },
        dialKeyPadSmViewContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            rowGap: '20px',
            margintop: '5px',
        },
        cancelIcon: {
            padding: '0',
        },
        backIconButton: {
            padding: '0',
        },
        backIcon: {
            fill: (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.secondary.main,
        },
        alignRight: {
            textAlign: 'right',
        },
        inputFieldError: {
            '& .MuiFormHelperText-root': {
                color: `${(_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.endCall} !important`,
                fontSize: '0.75rem',
                textAlign: 'left',
                margin: '0.25rem 0 ',
            },
            '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                borderColor: `${(_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.endCall} !important`,
            }
        },
    };
};
export default dialPadStyles;
//# sourceMappingURL=ccf-dialpad.styles.js.map