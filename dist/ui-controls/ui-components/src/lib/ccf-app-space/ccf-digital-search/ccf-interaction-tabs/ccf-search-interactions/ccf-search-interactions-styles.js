/**
 * style object for ccf-search-interactions
 * @returns CcfSearchInteractionStyles object
 * @example CcfSearchInteractionStyles()
 */
const CcfSearchInteractionStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const styles = {
        listBox: {
            '& .MuiPaper-root': {
                border: `1px solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.grey}`,
                '&::-webkit-scrollbar': {
                    width: '0.3rem',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.scrollThumb,
                    borderRadius: '2rem',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.scrollTrack,
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.scrollThumbHover,
                },
            },
        },
        loadMoreButton: {
            color: (_k = (_j = theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.dark,
            fontSize: '0.7rem',
            fontWeight: 500,
            textDecoration: 'underline',
            cursor: 'pointer',
        },
        dropdownOptionsCount: {
            color: (_m = (_l = theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.header,
            fontSize: '0.75rem',
            fontWeight: 500,
            marginLeft: '1.563rem',
            lineHeight: '0.938rem',
            padding: '0.313rem 0 0.313rem 0',
        },
    };
    return styles;
};
export default CcfSearchInteractionStyles;
//# sourceMappingURL=ccf-search-interactions-styles.js.map