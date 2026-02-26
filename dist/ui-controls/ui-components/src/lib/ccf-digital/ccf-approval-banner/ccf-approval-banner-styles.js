/**
 * style object for ccf-approval-banner
 * @returns CcfApprovalBannerStyle styles object
 * ```
 * @example
 * import CcfApprovalBannerStyle from './ccf-approval-banner-styles';
 * ```
 */
const CcfApprovalBannerStyle = (theme) => {
    var _a;
    const styles = {
        approvalInfoContainer: {
            background: `${theme.palette.grey[100]}`,
            border: `${theme.palette.primary.light}`,
            borderWidth: '0px 1px 1px 1px',
            borderStyle: 'solid',
            fontSize: '0.7rem',
            padding: '0 0.37rem',
            borderRadius: '0 0 0.37rem 0.37rem',
            minHeight: '2.5rem',
        },
        approvalDenied: {
            borderColor: theme.palette.disposition.optional,
            padding: '0.37rem',
        },
        pendingApprovalIcon: {
            fontSize: '1.2rem',
            marginRight: '2px',
        },
        denyBannerIcon: {
            color: `${theme.palette.error.main}`,
        },
        editApprovalText: {
            FontSize: '0.7rem',
            textDecoration: 'underline',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
        },
        approvalDeny: {
            cursor: 'pointer',
        },
        approvalIconButtonDark: {
            background: theme.palette.text.noteLabel,
            padding: '.375rem .5rem',
        },
        approvalIcon: {
            fontSize: '1rem',
        },
        approvalAndDenyIcon: {
            fontSize: '2.188rem',
        },
        copyButton: {
            borderRadius: (_a = theme === null || theme === void 0 ? void 0 : theme.shape) === null || _a === void 0 ? void 0 : _a.borderRadius,
            padding: '0',
            minWidth: '0',
        },
        rejectedReasonBoxContainer: {
            minHeight: '4.5rem',
        },
        rejectedReasonText: {
            whiteSpace: 'pre-wrap',
        },
    };
    return styles;
};
export default CcfApprovalBannerStyle;
//# sourceMappingURL=ccf-approval-banner-styles.js.map