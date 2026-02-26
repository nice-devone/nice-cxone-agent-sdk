/**
 * style object for ccf-interaction-search-menu
 * @returns CcfInteractionSearchMenuStyles object
 * @example CcfInteractionSearchMenuStyles()
 */
const CcfInteractionSearchMenuStyles = (theme) => {
    const styles = {
        menuItemContent: {
            [theme.breakpoints.down('xl')]: {
                color: theme.palette.text.contrastText,
                width: 'auto',
                overflow: 'hidden',
                fontSize: '.75rem',
                boxSizing: 'border-box',
                minHeight: '1.25rem',
                fontWeight: 'normal',
                lineHeight: '1.2',
                whiteSpace: 'nowrap',
            },
            [theme.breakpoints.up('xl')]: {
                color: theme.palette.text.contrastText,
                width: 'auto',
                overflow: 'hidden',
                fontSize: '.9rem',
                boxSizing: 'border-box',
                minHeight: '1.875rem',
                fontWeight: 'normal',
                lineHeight: '1.5',
                whiteSpace: 'nowrap',
            },
        },
        menuItemMinHeight: {
            minHeight: '2rem',
        },
        menuItemNameBold: {
            [theme.breakpoints.down('xl')]: {
                fontSize: '.75rem',
                fontWeight: '600',
                paddingLeft: '.06rem',
                marginTop: '0',
                display: 'inline',
            },
            [theme.breakpoints.up('xl')]: {
                fontSize: '.9rem',
                fontWeight: '600',
                paddingLeft: '.125rem',
                marginTop: '0',
                display: 'inline',
            },
        },
        menuItemTextNormal: {
            display: 'inline',
        },
    };
    return styles;
};
export default CcfInteractionSearchMenuStyles;
//# sourceMappingURL=ccf-interaction-search-menu-styles.js.map