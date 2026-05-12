/**
 * Styling for ccf-acd-session
 * @returns ccf-acd-session CSS properties as a JSON object
 * @example CcfAcdSessionStyles()
 */
const CcfAcdSessionStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31;
    const styles = {
        voicePreferenceCard: {
            border: `1px solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.main}`,
            width: '300px',
            '& .MuiCardContent-root': {
                paddingBottom: '0 !important',
            },
            marginTop: 'auto',
            marginBottom: '1rem',
        },
        agentHeader: {
            display: 'flex',
            height: '3rem',
            padding: '1rem 1.5rem 0 1.5rem',
        },
        voicePrefernceParent: {
            height: '100%',
            overflow: 'hidden',
            width: '100%',
        },
        loginContainer: {
            backgroundColor: `${theme.palette.background.LogoColor}`,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        voicePrefCardWrapper: {
            padding: '1rem 0',
        },
        buttonWrapper: {
            width: '100%',
            marginTop: '0.5rem',
            padding: '0 2rem 1.75rem 2rem',
            '& .MuiButton-root': {
                boxShadow: 'none',
                '&:hover': {
                    backgroundColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.primaryButtonHover,
                    boxShadow: 'none',
                },
                '&:active': {
                    backgroundColor: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.primaryButtonPressed,
                    outline: '0.065rem solid',
                    outlineColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.border) === null || _h === void 0 ? void 0 : _h.menuItemHighlight,
                    outlineOffset: '0.125rem',
                    borderRadius: '0.25rem',
                },
                '&.Mui-focusVisible, &:focus-visible': {
                    outline: '0.065rem solid',
                    outlineColor: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.border) === null || _k === void 0 ? void 0 : _k.menuItemHighlight,
                    outlineOffset: '0.125rem',
                    borderRadius: '0.25rem',
                },
            },
        },
        preferenceSelectorContainer: {
            '& .MuiFormControl-root, .MuiFormControl-root .MuiFormGroup-root': {
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
            },
            '& .MuiFormControl-root .MuiFormGroup-root .MuiFormControlLabel-root': {
                margin: '0',
            },
            '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: '0',
            },
            '& input[type="number"]': {
                '-moz-appearance': 'textfield',
            },
            '& .MuiFormGroup-root': {
                padding: '0 2rem',
            },
        },
        errorFallback: {
            height: '100%',
            overflow: 'hidden',
            width: '100%',
        },
        errorFallbackBack: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '20% auto',
        },
        rememberWrapper: {
            width: '100%',
            textAlign: 'left',
            '[dir=\'rtl\'] &': {
                marginRight: '-55px',
                textAlign: 'right',
            },
            '& .MuiTypography-body1': {
                fontSize: '12px',
                color: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.main,
            },
        },
        header: {
            color: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.text) === null || _p === void 0 ? void 0 : _p.contrastText,
            textTransform: 'uppercase',
            padding: '1rem 2rem 0 2rem',
            '& .MuiTypography-root': {
                fontWeight: '600',
                fontSize: `${(_r = (_q = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _q === void 0 ? void 0 : _q.h6) === null || _r === void 0 ? void 0 : _r.fontSize}`,
            },
        },
        agentHeaderText: {
            padding: '0',
            fontWeight: '600',
            fontSize: `${(_t = (_s = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _s === void 0 ? void 0 : _s.h3) === null || _t === void 0 ? void 0 : _t.fontSize}`,
            marginLeft: '0.75rem',
        },
        rememberSetting: {
            color: (_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.text) === null || _v === void 0 ? void 0 : _v.contrastText,
            padding: '0.5rem 2rem 0 2rem',
            '& .MuiFormControlLabel-label': {
                fontSize: '12px',
            },
            '& .MuiSvgIcon-root': {
                width: '0.7em',
            },
            '& .MuiCheckbox-root': {
                padding: '0 8px',
                '&.Mui-focusVisible, &:focus-visible': {
                    border: `0.0625rem solid ${(_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.border) === null || _x === void 0 ? void 0 : _x.menuItemHighlight}`,
                    borderRadius: '0.25rem',
                    outline: '0.25rem',
                },
                '&:active': {
                    backgroundColor: `${(_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.background) === null || _z === void 0 ? void 0 : _z.pressedTextButtonBackground}`,
                    border: `0.0625rem solid ${(_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _0 === void 0 ? void 0 : _0.border) === null || _1 === void 0 ? void 0 : _1.menuItemHighlight}`,
                    borderRadius: '0.25rem',
                },
                '&.Mui-checked': {
                    backgroundColor: `${(_3 = (_2 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _2 === void 0 ? void 0 : _2.background) === null || _3 === void 0 ? void 0 : _3.pressedTextButtonBackground}`,
                    border: `0.0625rem solid ${(_5 = (_4 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _4 === void 0 ? void 0 : _4.border) === null || _5 === void 0 ? void 0 : _5.menuItemHighlight}`,
                    borderRadius: '0.25rem',
                },
                '&.Mui-focusVisible.Mui-checked, &:focus-visible.Mui-checked': {
                    backgroundColor: `${(_7 = (_6 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _6 === void 0 ? void 0 : _6.background) === null || _7 === void 0 ? void 0 : _7.pressedTextButtonBackground}`,
                    border: `0.0625rem solid ${(_9 = (_8 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _8 === void 0 ? void 0 : _8.border) === null || _9 === void 0 ? void 0 : _9.menuItemHighlight}`,
                    borderRadius: '0.25rem',
                },
            },
        },
        locationHeader: {
            padding: '0.75rem 2rem 1.25rem 2rem',
        },
        voicePreferenceDivider: {
            paddingTop: '0.75em',
            borderColor: (_10 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _10 === void 0 ? void 0 : _10.divider,
        },
        agentHeaderDivider: {
            paddingTop: '0.75em',
            borderColor: (_11 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _11 === void 0 ? void 0 : _11.divider,
        },
        cxoneLogo: {
            width: '100%',
            height: '100%',
        },
        voicePreferenceInputField: {
            border: '0.0625rem solid theme?.palette?.background?.transparent',
            padding: '0.75rem 2rem 0 2rem',
            '& .MuiInputBase-input': {
                fontSize: `${(_13 = (_12 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _12 === void 0 ? void 0 : _12.h6) === null || _13 === void 0 ? void 0 : _13.fontSize}`,
                color: (_15 = (_14 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _14 === void 0 ? void 0 : _14.text) === null || _15 === void 0 ? void 0 : _15.contrastText,
                '&::placeholder': {
                    opacity: 1,
                },
            },
            '&& .MuiOutlinedInput-root': {
                '&.Mui-error': {
                    color: (_17 = (_16 = theme.palette) === null || _16 === void 0 ? void 0 : _16.text) === null || _17 === void 0 ? void 0 : _17.red,
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    border: `0.0625rem solid ${(_19 = (_18 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _18 === void 0 ? void 0 : _18.border) === null || _19 === void 0 ? void 0 : _19.borderColor}`,
                },
                '&.Mui-focused': {
                    outline: '0.065rem solid',
                    outlineColor: (_21 = (_20 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _20 === void 0 ? void 0 : _20.border) === null || _21 === void 0 ? void 0 : _21.menuItemHighlight,
                    outlineOffset: '0.125rem',
                    borderRadius: '0.25rem',
                },
                '&:active .MuiOutlinedInput-notchedOutline, &.Mui-active .MuiOutlinedInput-notchedOutline': {
                    borderColor: (_23 = (_22 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _22 === void 0 ? void 0 : _22.text) === null || _23 === void 0 ? void 0 : _23.black,
                },
            },
            '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                borderColor: (_25 = (_24 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _24 === void 0 ? void 0 : _24.border) === null || _25 === void 0 ? void 0 : _25.inputError,
            },
            '& .MuiOutlinedInput-root.Mui-error .MuiInputBase-input': {
                color: (_27 = (_26 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _26 === void 0 ? void 0 : _26.border) === null || _27 === void 0 ? void 0 : _27.inputError,
            },
            '& .MuiOutlinedInput-root:hover': {
                backgroundColor: (_29 = (_28 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _28 === void 0 ? void 0 : _28.background) === null || _29 === void 0 ? void 0 : _29.inputHoverBackground,
            },
        },
        voicePreferenceRadioHighlight: {
            padding: '0 2rem',
            '& .MuiFormGroup-root': {
                padding: '0 2rem',
            },
        },
        disclaimerText: {
            color: (_31 = (_30 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _30 === void 0 ? void 0 : _30.text) === null || _31 === void 0 ? void 0 : _31.placeholder,
            fontSize: '11px',
            fontWeight: '400',
            margin: 'auto 2rem 2rem',
            textAlign: 'center',
        },
    };
    return styles;
};
export default CcfAcdSessionStyles;
//# sourceMappingURL=ccf-acd-session.styles.js.map