/**
 * style object for CcfCustomPopOver control
 * @returns CcfCustomPopOverStyles styles object
 * ```
 * @example
 * <CcfCustomPopOverStyles/>
 * ```
 */
const CcfCustomPopOverStyles = (theme, isMobile, popoverMaxWidth) => {
    var _a, _b;
    const styles = {
        popOverStyles: {
            minWidth: '20rem',
            transform: isMobile ? 'translateX(10px)' : 'translateX(0px)',
            borderRadius: '0.75rem',
            boxShadow: '0 0 0.5rem -0.125rem' + ((_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.boxshadow) === null || _b === void 0 ? void 0 : _b.main),
            maxWidth: popoverMaxWidth,
        },
    };
    return styles;
};
export default CcfCustomPopOverStyles;
//# sourceMappingURL=ccf-custom-popOver.styles.js.map