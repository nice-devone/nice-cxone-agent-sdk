/**
 * style object for ccf-productivity
 * @returns CcfProductivityStyles styles object
 * ```
 * @example
 * <CcfProductivityStyles />
 * ```
 */
const CcfProductivityStyles = (theme) => {
    var _a, _b;
    return ({
        productivityListContainer: {
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: theme.spacing(2),
        },
        productivityListTitle: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        productivityListItem: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            marginBottom: theme.spacing(1),
        },
        details: {
            background: theme.palette.background.hover,
            height: '35px',
            display: 'flex',
        },
        productivityListItemContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            overflow: 'auto',
            padding: theme.spacing(1),
            backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.paper,
        },
        textEllipsis: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
    });
};
export default CcfProductivityStyles;
//# sourceMappingURL=ccf-productivity-styles.js.map