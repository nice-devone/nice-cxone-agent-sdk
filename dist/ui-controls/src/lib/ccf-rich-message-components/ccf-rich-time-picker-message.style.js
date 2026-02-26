/**
 * renders the style for rich time picker message
 * @param props - Theme
 * @example <CcfRichTimePickerMessageStyle />
 * @returns return the style for rich message
 */
export const CcfRichTimePickerMessageStyle = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const style = {
        container: {
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.contrastText,
            minWidth: '15rem',
            borderRadius: '1rem',
            border: `1px solid ${(_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.grey[300]}`,
            paddingBottom: '1rem',
            boxShadow: `0px 1px 2px ${(_e = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.boxshadow) === null || _e === void 0 ? void 0 : _e.main}`,
        },
        header: {
            padding: '1rem 0rem 1rem 1rem',
            backgroundColor: (_g = (_f = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _f === void 0 ? void 0 : _f.background) === null || _g === void 0 ? void 0 : _g.noteInput,
            borderBottom: `1px solid ${(_h = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _h === void 0 ? void 0 : _h.grey[300]}`,
            borderRadius: '1rem 1rem 0 0',
        },
        headerBox: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        title: {
            fontWeight: '700',
            fontSize: '1rem',
            lineHeight: 'normal',
            fontStyle: 'normal',
            textTransform: 'capitalize',
        },
        subTitle: {
            fontSize: '0.75rem',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
        },
        date: {
            color: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.secondary,
            paddingBottom: '0.2rem',
            fontSize: '0.8125rem',
            fontStyle: 'normal',
            fontWeight: '400',
        },
        timeSlotContainer: {
            padding: '1rem 0 0 1rem',
        },
        chip: {
            color: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.primary) === null || _m === void 0 ? void 0 : _m.main,
            fontWeight: '700',
            fontSize: '0.8125rem',
            margin: '0.5rem 0.5rem 0 0',
            backgroundColor: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.background) === null || _p === void 0 ? void 0 : _p.noteInput,
        },
    };
    return style;
};
//# sourceMappingURL=ccf-rich-time-picker-message.style.js.map