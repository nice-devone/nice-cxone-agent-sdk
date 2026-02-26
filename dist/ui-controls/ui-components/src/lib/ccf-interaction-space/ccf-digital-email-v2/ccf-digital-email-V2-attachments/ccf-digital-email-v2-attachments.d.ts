import { CXoneAttachmentArray } from '@nice-devone/common-sdk';
import { AttachmentPreviewVariant } from '../../ccf-digital-attachments/model/ccf-attachment-preview-variant';
import { CcfAttachmentJustify } from '../../ccf-digital-attachments/model/ccf-attachment-justify';
/**
 * Interface for CcfDigitalAttachmentsProps
 */
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
 * Component to display digital attachments which are not inline
 * @returns a wrapper looping through CcfDigitalAttachment items
 * ```
 * @example
 * <CcfDigitalAttachments
 * />
 *
 * ```
 */
export declare function CcfDigitalV2Attachments({ attachments, justifyContent, variant, hideDownload, isPreviousCaseMessage, isNextCaseMessage, channelType, messageSubject, caseId, isInboundDirection, }: CcfDigitalAttachmentsProps): JSX.Element | null;
export default CcfDigitalV2Attachments;
