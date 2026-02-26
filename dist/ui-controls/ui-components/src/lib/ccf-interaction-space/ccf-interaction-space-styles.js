/**
 * style object for ccf-interaction-space-styles
 * @returns CcfInteractionSpaceStyles styles object
 * ```
 * @example
 * <CcfInteractionSpaceStyles/>
 * ```
 */
const CcfInteractionSpaceStyles = (theme, _dispositionHeaderShown) => {
    const styles = {
        rightGridContainer: {
            display: 'flex',
            height: '100%',
            flex: '1',
            overflowY: 'hidden',
            [theme.breakpoints.up('xl')]: {
                padding: '8px',
                height: '100%',
            },
        },
        heightFull: {
            height: '100%',
            [theme.breakpoints.only('xs')]: {
                display: 'none',
            },
            [theme.breakpoints.only('xl')]: {
                display: 'flex',
            },
        },
    };
    return styles;
};
export default CcfInteractionSpaceStyles;
//# sourceMappingURL=ccf-interaction-space-styles.js.map