import { Theme } from '@mui/material';
/**
 * style object for ccf-approval-banner
 * @returns CcfApprovalBannerStyle styles object
 * ```
 * @example
 * import CcfApprovalBannerStyle from './ccf-approval-banner-styles';
 * ```
 */
declare const CcfApprovalBannerStyle: (theme: Theme) => {
    approvalInfoContainer: {
        background: string;
        border: string;
        borderWidth: string;
        borderStyle: string;
        fontSize: string;
        padding: string;
        borderRadius: string;
        minHeight: string;
    };
    approvalDenied: {
        borderColor: string;
        padding: string;
    };
    pendingApprovalIcon: {
        fontSize: string;
        marginRight: string;
    };
    denyBannerIcon: {
        color: string;
    };
    editApprovalText: {
        FontSize: string;
        textDecoration: string;
        display: string;
        alignItems: string;
        cursor: string;
    };
    approvalDeny: {
        cursor: string;
    };
    approvalIconButtonDark: {
        background: string;
        padding: string;
    };
    approvalIcon: {
        fontSize: string;
    };
    approvalAndDenyIcon: {
        fontSize: string;
    };
    copyButton: {
        borderRadius: number;
        padding: string;
        minWidth: string;
    };
    rejectedReasonBoxContainer: {
        minHeight: string;
    };
    rejectedReasonText: {
        whiteSpace: string;
    };
};
export default CcfApprovalBannerStyle;
