import { CXoneAttachmentArray, CXoneMessage, CXoneMessageDraft } from '@nice-devone/common-sdk';
interface CcfContactMessageProps {
    message: CXoneMessage | CXoneMessageDraft;
    channelType?: string;
    direction: string;
    fullName: string;
    firstName: string;
    surName: string;
    attachments?: CXoneAttachmentArray;
    isMessageDraft: boolean;
    previewOnlyChannels?: string[];
    channelName?: string;
    isPreviousCaseMessage?: boolean;
    isNextCaseMessage?: boolean;
    isTranslateCustomerMessages?: boolean;
    isTranslateAgentMessages?: boolean;
    customerLanguage?: string;
    channelId?: string;
    isAuthorNameRemoved?: boolean;
    isContentRemoved?: boolean;
    isTrackingMessageDeliveryStatus?: boolean;
}
/**
 * renders the single chat message
 * @param props - CcfContactMessageProps
 * @example <CcfMessage />
 * @returns
 */
declare const CcfContactMessage: ({ message, channelType, direction, fullName, firstName, surName, attachments, isMessageDraft, previewOnlyChannels, isPreviousCaseMessage, isTranslateCustomerMessages, isTranslateAgentMessages, customerLanguage, channelId, isAuthorNameRemoved, isTrackingMessageDeliveryStatus, isContentRemoved, isNextCaseMessage, }: CcfContactMessageProps) => JSX.Element;
export default CcfContactMessage;
