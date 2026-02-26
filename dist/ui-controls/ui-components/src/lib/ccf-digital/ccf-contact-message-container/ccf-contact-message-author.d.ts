import { CXoneMessage, CXoneMessageDraft } from '@nice-devone/common-sdk';
interface CcfContactMessageAuthorProps {
    name: string;
    direction: string;
    message: CXoneMessage | CXoneMessageDraft;
    styles: {
        inboundMessageAuthor: object;
        outboundMessageAuthor: object;
        messageAuthor: object;
        anonymousAuthorName: object;
    };
    isPreviousCaseMessage?: boolean;
    isNextCaseMessage?: boolean;
    isAuthorNameRemoved?: boolean;
}
/**
 * renders the author of message
 * @param props - CcfContactMessageAuthorProps
 * @example <CcfContactMessageAuthor />
 * @returns
 */
declare const CcfContactMessageAuthor: (props: CcfContactMessageAuthorProps) => JSX.Element;
export default CcfContactMessageAuthor;
