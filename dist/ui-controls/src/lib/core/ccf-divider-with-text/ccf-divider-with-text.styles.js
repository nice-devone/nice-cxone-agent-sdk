/**
 * @example styles for CcfDividerWithText component
 */
const CcfDividerWithTextStyle = (theme) => {
    var _a, _b;
    const styles = {
        root: {
            marginTop: 8,
            fontSize: ((_a = theme.typography.caption) === null || _a === void 0 ? void 0 : _a.fontSize) || '0.75em',
            color: (_b = theme.palette) === null || _b === void 0 ? void 0 : _b.text.secondary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            textAlign: 'center',
            '& > hr': {
                minWidth: '25%',
                flex: 1,
            },
            '& > span': {
                maxWidth: '50%',
                marginInline: 4,
            },
        },
    };
    return styles;
};
export default CcfDividerWithTextStyle;
//# sourceMappingURL=ccf-divider-with-text.styles.js.map