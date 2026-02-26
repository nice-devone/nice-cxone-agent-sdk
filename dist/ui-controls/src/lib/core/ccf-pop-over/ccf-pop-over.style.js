/**
 * @example styles for pop over component
 */
const ccfPopOverStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const styles = {
        popOverMain: {
            display: 'flex',
            flexDirection: 'column',
            height: 'auto',
            minWidth: '160px',
            justifyContent: 'space-evenly',
            alignContent: 'center',
            alignItems: 'center',
            background: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.paper} 0% 0% no-repeat padding-box`,
            boxShadow: `0px 1px 2px ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.boxshadow) === null || _d === void 0 ? void 0 : _d.main}`,
            borderRadius: '4px',
            opacity: '1',
            padding: '0',
        },
        popOverOptions: {
            width: '100%',
            padding: '5px 10px',
            minHeight: 'auto',
            cursor: 'pointer',
            color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.primary,
            '&:hover': {
                backgroundColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.hover,
                fontWeight: '600',
            },
        },
        popOverOverflow: {
            fill: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.secondary) === null || _k === void 0 ? void 0 : _k.main,
            cursor: 'pointer',
        },
        divider: {
            width: '100%',
            backgroundColor: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.grey,
            margin: '0',
        },
        ccfPopOver: {
            '& .flexDisplay': {
                display: 'flex',
                alignItems: 'center',
            },
            '& .header': {
                justifyContent: 'flex-start',
                fontSize: '12px',
                width: '100%',
                padding: '5px 10px',
                fontWeight: 600,
            },
            '& .popOverActionIconWrapper': {
                display: 'flex',
                marginRight: '5px',
                minWidth: '20px !important',
            },
            '& .headerTitle': {
                marginTop: '3px',
            },
            '& .popOverActionLabelWrapper': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                '& span': {
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                },
            },
            '& .popOverActionLabelWrapper .popOverActionLabel': {
                fontSize: '14px',
            },
        },
    };
    return styles;
};
export default ccfPopOverStyles;
//# sourceMappingURL=ccf-pop-over.style.js.map