/**
 * style object for ccf-message-action-confirmation
 * @returns CcfMessageActionConfirmationStyle styles object
 * ```
 * @example
 * import CcfMessageActionConfirmationStyle from './ccf-message-action-confirmation-styles';
 * ```
 */
const CcfMessageActionConfirmationStyle = (theme) => {
    var _a, _b, _c, _d;
    const styles = {
        confirmationText: {
            fontSize: '0.75rem',
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.black,
        },
        cancelBtn: {
            padding: '0',
            color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.clearText,
        },
    };
    return styles;
};
export default CcfMessageActionConfirmationStyle;
//# sourceMappingURL=ccf-message-action-confirmation-dialog-styles.js.map