/**
 * Styling for full View Digital Search
 * @returns fullViewDigitalSearch CSS properties as a JSON object
 * @example fullViewDigitalSearch
*/
const fullViewDigitalSearch = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const styles = {
        fullViewSearch: {
            width: '100%',
            height: '100%',
            background: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.light} 0% 0% no-repeat padding-box`,
            boxShadow: `0 0.063rem 0.125rem ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.boxshadow) === null || _d === void 0 ? void 0 : _d.main}`,
            border: `0.063rem solid ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.border) === null || _f === void 0 ? void 0 : _f.main}`,
            [theme.breakpoints.up('xl')]: {
                borderRadius: '0.375rem',
            },
            opacity: 1,
            transition: 'all 0.5s ease',
            display: 'flex',
            flexDirection: 'column',
            '& .MuiOutlinedInput-input': Object.assign({}, (_g = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _g === void 0 ? void 0 : _g.h4),
            overflow: 'hidden',
        },
        digitalSearchHeader: {
            background: (_j = (_h = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _h === void 0 ? void 0 : _h.background) === null || _j === void 0 ? void 0 : _j.header,
            padding: '0.375rem 0 0.5rem 0',
            borderRadius: '0.313rem 0.313rem 0 0',
            [theme.breakpoints.down('xl')]: {
                borderRadius: 0,
                border: `0.063rem solid ${(_l = (_k = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _k === void 0 ? void 0 : _k.border) === null || _l === void 0 ? void 0 : _l.light}`,
            },
            opacity: 1,
            '& label': {
                color: (_o = (_m = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _m === void 0 ? void 0 : _m.text) === null || _o === void 0 ? void 0 : _o.secondary,
                marginLeft: '0.313rem',
            },
        },
        digitalSearchHeaderPadding: {
            overflow: 'auto',
            height: '100%',
            [theme.breakpoints.down('xl')]: {
                padding: '0 0.313rem',
            },
        },
    };
    return styles;
};
export default fullViewDigitalSearch;
//# sourceMappingURL=ccf-digital-search-full-view-container-styles.js.map