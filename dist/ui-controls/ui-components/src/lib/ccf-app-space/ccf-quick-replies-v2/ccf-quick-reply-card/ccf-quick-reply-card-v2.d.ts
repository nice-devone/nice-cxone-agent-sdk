import { CXoneDigitalQuickReply } from '@nice-devone/common-sdk';
export interface CcfQuickReplyCardProps {
    reply: CXoneDigitalQuickReply;
}
/**
 * CcfQuickReplyCard - used to disply reply card in quick replies section
 * @param props - CcfQuickReplyCardProps
 * @example `<CcfQuickReplyCard reply=CXoneDigitalQuickReply />`
 */
declare const CcfQuickReplyCard: (props: CcfQuickReplyCardProps) => JSX.Element;
export default CcfQuickReplyCard;
