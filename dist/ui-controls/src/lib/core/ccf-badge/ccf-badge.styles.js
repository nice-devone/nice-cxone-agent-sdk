/**
 * @example styles for badge component
 */
const ccfBadgeStyle = (props) => {
    const styles = {
        badgeColor: {
            '& .MuiBadge-badge': Object.assign(Object.assign({}, props.badgeStyles), { backgroundColor: props.color || 'primary' }),
        },
    };
    return styles;
};
export default ccfBadgeStyle;
//# sourceMappingURL=ccf-badge.styles.js.map