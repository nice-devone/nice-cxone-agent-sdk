/**
 * Styling for ccf-acd-session
 * @returns ccf-acd-session CSS properties as a JSON object
 * @example CcfAcdSessionStyles()
 */
const CcfAcdSessionStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
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
                color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.main,
            },
        },
        header: {
            color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.contrastText,
            textTransform: 'uppercase',
            padding: '1rem 2rem 0 2rem',
            '& .MuiTypography-root': {
                fontWeight: '600',
                fontSize: `${(_h = (_g = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _g === void 0 ? void 0 : _g.h6) === null || _h === void 0 ? void 0 : _h.fontSize}`,
            },
        },
        agentHeaderText: {
            padding: '0',
            fontWeight: '600',
            fontSize: `${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _j === void 0 ? void 0 : _j.h3) === null || _k === void 0 ? void 0 : _k.fontSize}`,
            marginLeft: '0.75rem',
        },
        rememberSetting: {
            color: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.contrastText,
            padding: '0.5rem 2rem 0 2rem',
            '& .MuiFormControlLabel-label': {
                fontSize: '12px',
            },
            '& .MuiSvgIcon-root': {
                width: '0.7em',
            },
            '& .MuiCheckbox-root': {
                padding: '0 8px',
            },
        },
        locationHeader: {
            padding: '0.75rem 2rem 1.25rem 2rem',
        },
        voicePreferenceDivider: {
            paddingTop: '0.75em',
            borderColor: (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.divider,
        },
        agentHeaderDivider: {
            paddingTop: '0.75em',
            borderColor: (_p = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _p === void 0 ? void 0 : _p.divider,
        },
        cxoneLogo: {
            width: '100%',
            height: '100%',
        },
        voicePreferenceInputField: {
            padding: '0.75rem 2rem 0 2rem',
            '& .MuiInputBase-input': {
                fontSize: `${(_r = (_q = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _q === void 0 ? void 0 : _q.h6) === null || _r === void 0 ? void 0 : _r.fontSize}`,
                color: (_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.text) === null || _t === void 0 ? void 0 : _t.contrastText,
                '&::placeholder': {
                    opacity: 1,
                },
            },
        },
        voicePreferenceRadioHighlight: {
            padding: '0 2rem',
            '& .MuiFormGroup-root': {
                padding: '0 2rem',
            },
        },
        disclaimerText: {
            color: (_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.text) === null || _v === void 0 ? void 0 : _v.placeholder,
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