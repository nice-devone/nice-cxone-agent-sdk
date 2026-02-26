/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-customerCardDetailsStyles
 * @example <customerCardDetailsStyles />
 */
const nameRelatesStyles = (theme) => {
    var _a, _b, _c, _d;
    const styles = {
        nameRelatesToBoxStyle: {
            marginTop: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'stretch',
        },
        nameRelatesToPopoverStyle: {
            display: 'flex',
            padding: `10px ${theme.spacing(1)}`,
            flexDirection: 'column',
            alignSelf: 'stretch',
            borderRadius: '4px',
            background: (_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.paper,
            boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.32)',
        },
        nameRelatesLabel: Object.assign({ fontStyle: 'normal', fontWeight: '600', lineHeight: 'normal' }, theme.typography.h6),
        nameRelatesSelect: Object.assign({ borderRadius: '4px', display: 'flex', alignItems: 'flex-start', gap: '4px', alignSelf: 'stretch', padding: `${theme.spacing(1)} 12px`, overflow: 'hidden', color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.contrastText, textOverflow: 'ellipsis', fontFamily: theme.typography.fontFamily, fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal' }, theme.typography.h6),
    };
    return styles;
};
export default nameRelatesStyles;
//# sourceMappingURL=nameRelates.style.js.map