/**
 * Properties for the CCF Loader component
 */
/**
 ** @example styles for label control component
*/
const CcfLabelControlStyles = (theme, options) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return {
        wrapper: {
            display: 'flex',
            height: 'fit-content',
            width: '100%',
        },
        text: {
            padding: '0 5px',
            wordBreak: 'break-word',
            display: 'inline',
            fontSize: '0.688rem',
        },
        control: {
            fontSize: '11px !important',
        },
        autocomplete: {
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                border: 'none',
            },
            '& .MuiAutocomplete-inputRoot': {
                padding: 0,
                fontSize: '12px',
                maxHeight: '50px',
                overflowY: 'auto',
                font: 'Open sans',
                '& .MuiAutocomplete-input': {
                    padding: '5px 0',
                    minWidth: options.label === options.fieldOnFocus ? options.autocompleteInputwidth : '0px',
                },
            },
            '& .MuiAutocomplete-clearIndicator': {
                display: 'none',
            },
            '& .MuiAutocomplete-endAdornment': {
                display: 'none',
            },
            width: '100%',
            '& .MuiChip-label': {
                paddingLeft: '5px',
                paddingRight: '2px',
            },
            '& .MuiSvgIcon-root': {
                height: '14px',
            },
            '& .MuiInputBase-root': {
                marginLeft: '2px',
                paddingRight: '0px !important',
                paddingLeft: '3px',
                transform: 'translateY(-0.0625rem)',
                '&:focus-within': {
                    border: '1.5px solid #3498db',
                },
            },
        },
        chip: {
            borderRadius: '0.25rem',
            backgroundColor: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.white}`,
            color: 'black',
            height: '1.25rem',
            fontSize: '0.813rem',
            border: `0.063rem solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.editorChipShadow}`,
            fontWeight: 400,
            lineHeight: '1.25rem',
            fontFamily: `${theme.typography.fontFamily}`,
            Padding: '0.313rem',
        },
        chipDelete: {
            '& .MuiChip-deleteIcon': {
                backgroundColor: 'transparent',
                height: '1rem',
                margin: '0.375rem 0 0.313rem 0',
                color: `${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.editorChipDeleteIcon}`,
            },
        },
        textfieldstyles: {
            '& .MuiOutlinedInput-root': {
                transform: 'translateY(-0.0625rem)',
                '& fieldset': {
                    border: 'none',
                },
                '& input.MuiOutlinedInput-input': {
                    padding: '0 0.313rem',
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    lineHeight: '125%',
                    fontFamily: `${theme.typography.fontFamily}`,
                    color: theme.palette.text.primary,
                    letterSpacing: '0',
                },
            },
            '& .Mui-error': {
                border: '1px solid red',
                borderRadius: '0px',
            },
            '& .MuiFormHelperText-root': {
                color: '#e62e43',
                border: 'unset',
                margin: '0px',
                padding: '1px 5px',
            },
            width: '100%',
        },
        fromDropdown: {
            marginLeft: '0.125rem',
            paddingLeft: '0.188rem',
            fontSize: '12px',
            minWidth: '6.875rem',
            transform: 'translateY(-0.063rem)',
            '& .MuiSvgIcon-root': {
                fontSize: '20px',
            },
            '& .MuiInput-input': {
                paddingTop: 0,
                paddingBottom: 0,
            },
            '& .MuiSelect-select': {
                whiteSpace: 'normal !important',
                overflowWrap: 'anywhere',
            },
        },
        fromMenuProps: {
            PaperProps: {
                sx: {
                    maxHeight: '10rem',
                    maxWidth: '13rem',
                    '&::-webkit-scrollbar': {
                        width: '0.4rem',
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
                    '& .MuiMenuItem-root': {
                        paddingLeft: '0.75rem',
                        paddingRight: '0.75rem',
                    },
                },
            },
        },
        selectedFromAddress: {
            fontSize: '12px',
        },
        dropDownItemHeader: {
            fontWeight: 800,
            fontSize: '0.75rem',
            lineHeight: '1rem',
            color: theme.palette.text.filter,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        dropDownItemSubHeader: {
            fontWeight: 400,
            fontSize: '0.75rem',
            color: theme.palette.text.contrastText,
            lineHeight: '1rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        dropdownItem: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        },
    };
};
export default CcfLabelControlStyles;
//# sourceMappingURL=ccf-label-control.styles.js.map