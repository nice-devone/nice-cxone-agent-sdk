/**
 * return styles used for the component
 * @example <ccfKeypadStyles />
 * @returns styles
 */
const ccfKeypadStyles = (theme) => {
    var _a, _b, _c;
    return {
        keyPadContainer: {
            width: '100%',
            backgroundColor: (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.background.paper,
            borderRadius: '8px',
            padding: '10px 10px 0 10px',
        },
        keyPadSmViewContainer: {
            width: '215px',
            height: '323px',
            backgroundColor: (_b = theme.palette) === null || _b === void 0 ? void 0 : _b.background.paper,
            borderRadius: '8px',
            padding: '10px 10px 0 10px',
        },
        closeIconContainer: {
            display: 'flex',
            alignItems: 'center',
            margin: '5px',
            cursor: 'pointer',
            width: '34%',
        },
        muteIconButtonContainer: {
            display: 'flex',
            justifyContent: 'center',
            '& svg': {
                fill: (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.secondary.main,
            },
        },
    };
};
export default ccfKeypadStyles;
//# sourceMappingURL=ccf-keypad.styles.js.map