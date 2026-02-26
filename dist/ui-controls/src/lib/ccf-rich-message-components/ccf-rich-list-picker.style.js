/**
 * renders the style for rich message
 * @param props - Theme
 * @example <CcfRichContactMessageStyle />
 * @returns return the style for rich message
 */
export const CcfRichListPickerStyle = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const style = {
        container: {
            backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.callControlHeader,
            color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.contrastText,
            borderRadius: '1rem',
            boxShadow: `0px 1px 2px ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.boxshadow) === null || _f === void 0 ? void 0 : _f.main}`,
        },
        title: {
            padding: '1rem',
            fontWeight: '700',
            fontSize: '1rem',
            backgroundColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.noteInput,
            borderRadius: '1rem 1rem 0 0',
            lineHeight: 'normal',
        },
        list: {
            padding: '0',
        },
        listItem: {
            display: 'block',
        },
        itemText: { display: 'flex', alignItems: 'center' },
        itemTextPrimary: {
            display: 'flex',
            alignItems: 'center',
            fontWeight: '700',
            fontSize: '0.875rem',
            lineHeight: 'normal',
        },
        itemTextSecondary: {
            fontWeight: '500',
            fontSize: '0.875rem',
            lineHeight: 'normal',
        },
        icon: { width: '1.25rem', height: '1.25rem', marginRight: '0.3rem' },
        divider: { borderBottomWidth: '2px' },
        radioButton: { color: `${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.secondary} !important` },
        titleBox: {
            backgroundColor: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.background) === null || _m === void 0 ? void 0 : _m.noteInput,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '1rem 1rem 0 0',
            lineHeight: 'normal',
            paddingTop: '0.5rem',
        },
    };
    return style;
};
//# sourceMappingURL=ccf-rich-list-picker.style.js.map