/**
 * renders the style for email details popup component
 * @param props - Theme
 * @example <CcfEmailDetailsPopupStyles />
 * @returns return the style for email details popup component
 */
export const CcfEmailSubjectSummaryStyles = (theme) => {
    var _a, _b, _c, _d;
    const style = {
        textStyles: {
            fontWeight: 400,
            fontSize: '0.75rem',
            lineHeight: '125%',
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.emailPopupText,
            textAlign: 'left',
            width: '80%',
        },
        textHeadings: {
            fontWeight: 400,
            fontSize: '0.75rem',
            lineHeight: '125%',
            color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.header,
            textAlign: 'right',
            width: '20%',
        },
        boxStyles: {
            padding: '0.5rem 0.75rem',
            flexDirection: 'column',
            display: 'flex',
            maxHeight: '15rem',
            overflowY: 'auto',
            overflowX: 'hidden',
            transform: 'translateX(-0.5rem)',
        },
    };
    return style;
};
//# sourceMappingURL=ccf-email-subject-summary.styles.js.map