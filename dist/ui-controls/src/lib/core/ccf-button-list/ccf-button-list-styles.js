/**
 * Styles for Ccf Button List
 * @example CcfButtonListStyles()
 */
const CcfButtonListStyles = (theme) => {
    const styles = {
        iconStyle: {
            backgroundColor: theme.palette.primary.main,
            fontSize: '1.2rem',
            padding: '0 2px',
            minWidth: '25px !important',
            width: '25px',
        },
        downArrowIcon: {
            borderLeft: `1px solid ${theme.palette.background.socialReaction}`,
        },
        smallIcon: {
            '& svg': {
                fontSize: '1.2rem',
            },
        },
    };
    return styles;
};
export default CcfButtonListStyles;
//# sourceMappingURL=ccf-button-list-styles.js.map