/**
 * style object for ccf-preview-only-contact-card
 * @returns CcfPreviewOnlyContactCard styles object
 * ```
 * @example
 * <CcfPreviewOnlyContactCard />
 * ```
 */
const ccfPreviewOnlyContactCardStyle = (theme, isSelected) => {
    var _a;
    const styles = {
        inboxExpandedCardContainer: {
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        iconAndCustomerNameWrapper: {
            display: 'flex',
            width: 'calc(100% - 2.25rem)',
            alignItems: 'center',
        },
        customerNameContainer: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
        customerName: {
            font: `normal normal bold 0.875rem/1.188rem ${(_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a.fontFamily}`,
            display: 'block',
            padding: '0.124rem',
            letterSpacing: '0rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'pre',
            paddingLeft: '6px',
            marginTop: '-4px',
        },
        inboxCollapsedCloseIcon: {
            padding: 0,
            marginLeft: '-0.75rem',
        },
        revampinboxCollapsedCloseIcon: {
            padding: 0,
        },
        previewOnlyContactCard: {
            display: 'block',
            position: 'relative',
        },
        inboxCollapsedCardContent: {
            display: 'flex',
            paddingRight: isSelected ? 0 : '0.313rem',
        },
        crossIcon: {
            width: '2.25rem',
        },
    };
    return styles;
};
export default ccfPreviewOnlyContactCardStyle;
//# sourceMappingURL=ccf-preview-only-contact-card.style.js.map