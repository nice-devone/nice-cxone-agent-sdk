import { CXoneAttachmentArray } from '@nice-devone/common-sdk';
import { AttachmentPreviewVariant } from './model/ccf-attachment-preview-variant';
import { CcfAttachmentJustify } from './model/ccf-attachment-justify';
export interface CcfDigitalAttachmentsProps {
    attachments: CXoneAttachmentArray;
    justifyContent?: CcfAttachmentJustify;
    variant?: AttachmentPreviewVariant;
    hideDownload?: boolean;
    isPreviousCaseMessage?: boolean;
    isNextCaseMessage?: boolean;
    channelType?: string;
    messageSubject?: string;
    caseId?: string;
    isInboundDirection?: boolean;
}
/**
 * Enum for attachment type
 */
export declare enum ATTACHMENT_TYPE {
    AUDIO = "audio"
}
/**
 * Component to display digital attachments which are not inline
 * @returns a wrapper looping through CcfDigitalAttachment items
 * ```
 * @example
 * <CcfDigitalAttachments
 * />
 *
 * ```
 */
export declare function CcfDigitalAttachments({ attachments, justifyContent, variant, hideDownload, isPreviousCaseMessage, channelType, messageSubject, caseId, isInboundDirection, isNextCaseMessage, }: CcfDigitalAttachmentsProps): JSX.Element | null;
export default CcfDigitalAttachments;
