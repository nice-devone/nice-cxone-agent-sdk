import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Box, useTheme } from '@mui/material';
import { useTranslator } from '../ccf-translator/ccf-translator';
import { CcfEmailSubjectSummaryStyles } from './ccf-email-subject-summary.styles';
/**
 * Renders the email details row with different fields
 * @param props - EmailDetailRow
 * @example <EmailDetailRow />
 * @returns  email details row
 */
function EmailDetailRow({ label, value, }) {
    const theme = useTheme();
    const styles = CcfEmailSubjectSummaryStyles(theme);
    return (_jsxs(Box, Object.assign({ component: "div", display: "flex" }, { children: [_jsxs(Box, Object.assign({ pr: 1, sx: styles.textHeadings, "aria-label": label }, { children: [label, ":"] })), _jsx(Box, Object.assign({ sx: styles.textStyles, "aria-label": value }, { children: value }))] })));
}
/**
 * Renders the email subject summary component.
 * @param props - CcfEmailSubjectSummary
 * @example <CcfEmailSubjectSummary />
 * @returns  email details
 */
export function CcfEmailSubjectSummary({ from, to, cc, bcc, date, subject, }) {
    const theme = useTheme();
    const styles = CcfEmailSubjectSummaryStyles(theme);
    const [translate] = useTranslator();
    /// Define the fields to be displayed in the email details popup
    const fields = [
        { key: 'from', value: from },
        { key: 'to', value: to || '' },
        { key: 'cc', value: cc || '' },
        { key: 'bcc', value: bcc || '' },
        { key: 'date', value: date },
        { key: 'subject', value: subject }
    ];
    /// Render the email details popup with the specified fields
    return (_jsx(Box, Object.assign({ component: "div", sx: styles.boxStyles, gap: 1, id: "email-details-title" }, { children: fields.map(({ key, value }) => {
            if (['to', 'cc', 'bcc'].includes(key) && !value)
                return null;
            return (_jsx(EmailDetailRow, { label: translate(key), value: value }, key));
        }) })));
}
export default CcfEmailSubjectSummary;
//# sourceMappingURL=ccf-email-subject-summary.js.map