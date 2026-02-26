/**
  * @example styles for dropdown component
  */
export const ccfDropdownOptionsStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
    const styles = {
        listSubheader: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '0.5rem',
            paddingRight: '0.5rem',
        },
        buttonsBox: {
            backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.common) === null || _b === void 0 ? void 0 : _b.white,
            position: 'sticky',
            bottom: 0,
            justifyContent: 'end',
            gap: 0.5,
            display: 'flex',
            paddingBottom: '0.625rem',
            paddingRight: '0.438rem',
            paddingTop: '0.75rem',
            marginTop: 'auto',
        },
        closeIcon: {
            cursor: 'pointer',
            color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.contrastText,
        },
        closeButton: {
            minWidth: 'auto',
            boxShadow: 'none',
            border: 'none',
            padding: 0,
            '&:hover': {
                background: 'none',
                border: 'none',
                boxShadow: 'none',
            },
        },
        focusedElement: {
            '&:focus': {
                border: `0.0625rem solid ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.border) === null || _f === void 0 ? void 0 : _f.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        placeholder: {
            fontSize: '0.813rem',
            maxWidth: '15.625rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        },
        datePickerBox: {
            display: 'flex',
            gap: 0.6,
            width: '15.5rem',
        },
        menuItem: {
            maxHeight: '10rem',
            maxWidth: '13rem',
        },
        menu: {
            '& + .MuiAutocomplete-popper .MuiAutocomplete-option': {
                paddingLeft: '0',
                paddingRight: '0',
            },
            '& + .MuiAutocomplete-popper .MuiAutocomplete-listbox': {
                '&::-webkit-scrollbar': {
                    width: '0.3rem',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.scrollThumb,
                    borderRadius: '2rem',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.background) === null || _k === void 0 ? void 0 : _k.scrollTrack,
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.background) === null || _m === void 0 ? void 0 : _m.scrollThumbHover,
                },
            },
        },
        valueItem: {
            '.MuiInputBase-root': {
                fontSize: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _o === void 0 ? void 0 : _o.h5) === null || _p === void 0 ? void 0 : _p.fontSize,
                color: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.text) === null || _r === void 0 ? void 0 : _r.filter,
                height: '2rem',
            },
        },
        inputAlign: {
            '.MuiInputBase-input': {
                height: '1rem !important',
            },
        },
        formControl: {
            m: 1,
            input: {
                '&::placeholder': {
                    color: (_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.text) === null || _t === void 0 ? void 0 : _t.placeholder,
                    opacity: 1,
                },
            },
            display: 'flex',
            textSize: '0.875rem',
            flexDirection: 'column',
            '.MuiFormControl-root': {
                marginBottom: '0.125rem',
            },
            '& .MuiFormControlLabel-label': {
                fontSize: '0.875rem',
            },
        },
        loadMoreButton: {
            color: (_v = (_u = theme.palette) === null || _u === void 0 ? void 0 : _u.text) === null || _v === void 0 ? void 0 : _v.dark,
            fontSize: '0.7rem',
            fontWeight: 500,
            textDecoration: 'underline',
            cursor: 'pointer',
        },
        loadMoreContainer: {
            display: 'flex',
            margin: '0.25rem 0 0.5rem 0',
            padding: '0 0.75rem',
        },
        dropdownOptionsCount: {
            color: (_x = (_w = theme.palette) === null || _w === void 0 ? void 0 : _w.text) === null || _x === void 0 ? void 0 : _x.header,
            fontSize: '0.75rem',
            fontWeight: 500,
            marginLeft: '1.563rem',
            lineHeight: '0.938rem',
            padding: '0.313rem 0 0.313rem 0',
        },
        icon: {
            fontSize: theme.typography.h3.fontSize,
            marginLeft: '0.25rem',
        },
        tagNameFont: {
            fontSize: '0.75rem',
        },
        dropdownTextStyles: {
            fontSize: '0.813rem',
            fontWeight: 600,
        },
        listSubheaderForCopilotFilters: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '0.5rem',
            paddingRight: '0.5rem',
            paddingLeft: '0.5rem',
            background: theme.palette.background.callControlHeader,
        },
        filterIcon: {
            width: '0.8rem',
            height: '0.8rem',
            color: (_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.text) === null || _z === void 0 ? void 0 : _z.contrastText,
            marginRight: '0.875rem',
        },
        subtextForCopilotFilters: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0.5rem',
            fontSize: '0.8125rem',
        },
    };
    return styles;
};
//# sourceMappingURL=ccf-dropdown-options.style.js.map