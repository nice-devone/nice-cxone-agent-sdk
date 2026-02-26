/**
 * @param props -?-customerCardSearchResultDetailStyles
 * @example <customerCardSearchResultDetailStyles />
 */
const customerCardSearchResultDetailStyles = (theme) => {
    const styles = {
        customerCardSearchResultDetailContainer: {
            height: '100%',
        },
        flexSpaceBetween: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        detailsCustomFieldLabel: {
            fontSize: `${theme.typography.h6.fontSize}`,
            color: theme.palette.text.secondary,
            textTransform: 'uppercase',
        },
        detailsCustomFieldData: {
            fontSize: `${theme.typography.h6.fontSize}`,
            wordBreak: 'break-all',
        },
        bottomPad15: {
            paddingBottom: '15px',
        },
    };
    return styles;
};
export default customerCardSearchResultDetailStyles;
//# sourceMappingURL=ccf-customer-card-search-result-detail.style.js.map