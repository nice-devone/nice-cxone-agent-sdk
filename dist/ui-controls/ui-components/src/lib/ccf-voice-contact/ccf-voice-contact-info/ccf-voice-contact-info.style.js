/**
 * style object for ccf-voice-contact-info.tsx
 * @returns CcfVoiceContactInfoStyles styles object
 * ```
 * @example
 * <CcfVoiceContactInfoStyles />
 * ```
 */
const CcfVoiceContactInfoStyles = (theme) => {
    var _a, _b;
    const styles = {
        phoneNumber: {
            font: `normal normal normal 0.813rem/1.125rem ${(_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a.fontFamily}`,
            margin: '0.313rem',
            padding: '0.124rem',
            letterSpacing: '0rem',
        },
        phoneNumberPC: {
            font: `normal normal normal 0.813rem/1.125rem ${(_b = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _b === void 0 ? void 0 : _b.fontFamily}`,
            margin: '0.313rem',
            padding: '0.124rem',
            letterSpacing: '0rem',
            [theme.breakpoints.down('xl')]: {
                margin: '0 0.313rem',
                padding: '0 0.124rem',
            },
        },
        cardHeader: {
            display: 'flex',
            flexDirection: 'row',
        },
    };
    return styles;
};
export default CcfVoiceContactInfoStyles;
//# sourceMappingURL=ccf-voice-contact-info.style.js.map