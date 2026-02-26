/**
 * return styles used for the component
 * @example <ccfTeamListStyles />
 * @returns styles
 */
const ccfTeamListStyles = (theme) => {
    var _a, _b;
    return {
        headerText: {
            marginLeft: '6px',
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.primary,
            height: '30px',
            fontWeight: 'bold',
            fontSize: '0.875rem',
            marginTop: '4px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            width: '100%',
            display: 'inline-block',
        },
    };
};
export default ccfTeamListStyles;
//# sourceMappingURL=ccf-team-list.styles.js.map