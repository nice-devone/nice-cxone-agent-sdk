/**
 * return styles used for the component
 * @example <ccfSkillListStyles />
 * @returns styles
 */
const ccfSkillListStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
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
        phoneIconBox: {
            backgroundColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.secondary) === null || _d === void 0 ? void 0 : _d.main,
            color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.paper,
            width: '60px',
            borderRadius: '4px',
            '&:hover': {
                backgroundColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.secondary) === null || _h === void 0 ? void 0 : _h.main,
                color: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.background) === null || _k === void 0 ? void 0 : _k.paper,
            },
        },
    };
};
export default ccfSkillListStyles;
//# sourceMappingURL=ccf-skill-list.styles.js.map