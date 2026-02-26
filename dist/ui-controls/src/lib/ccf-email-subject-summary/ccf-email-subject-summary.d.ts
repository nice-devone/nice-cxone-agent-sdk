export interface EmailDetailsPopupProps {
    from: string;
    to: string;
    cc?: string;
    bcc?: string;
    date: string;
    subject: string;
}
/**
 * Renders the email subject summary component.
 * @param props - CcfEmailSubjectSummary
 * @example <CcfEmailSubjectSummary />
 * @returns  email details
 */
export declare function CcfEmailSubjectSummary({ from, to, cc, bcc, date, subject, }: EmailDetailsPopupProps): JSX.Element;
export default CcfEmailSubjectSummary;
