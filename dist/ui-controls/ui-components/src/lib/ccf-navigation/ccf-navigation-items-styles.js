/**
 * style object for ccf-navigation-items
 * @returns CcfNavigationItemsStyles styles object
 * ```
 * @example
 * <CcfNavigationItemsStyles/>
 * ```
 */
const CcfNavigationItemsStyles = (theme) => {
    const styles = {
        interactionSpaceResponsive: {
            minWidth: '100%',
            padding: '0px',
        },
        contactHistoryResponsive: {
            ml: 0,
            position: 'relative',
        },
        rightGridContainer: {
            display: 'flex',
            height: '100%',
            flex: '1',
            overflowY: 'hidden',
            [theme.breakpoints.up('xl')]: {
                padding: '8px',
                height: '98%',
            },
        },
        fullView: {
            height: '100%',
            [theme.breakpoints.down('xl')]: {
                width: '100%',
                padding: 0,
            },
        },
        screenPopContainer: {
            height: '100%',
            padding: '20px',
        },
        navItemIcon: {
            fill: '#444d57',
            stroke: '#fff',
        },
    };
    return styles;
};
export default CcfNavigationItemsStyles;
//# sourceMappingURL=ccf-navigation-items-styles.js.map