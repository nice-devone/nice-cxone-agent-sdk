/// <reference types="react" />
import { CXoneAttachment } from '@nice-devone/common-sdk';
import { AttachmentPreviewVariant } from '../../../ccf-digital-attachments/model/ccf-attachment-preview-variant';
/**
 * Interface for the props of CcfDigitalEmailV2Attachment component
 */
export interface CcfDigitalAttachmentV2Props {
    togglePreviewMode: (id: string) => void;
    attachment: CXoneAttachment;
    children?: React.ReactNode;
    variant?: AttachmentPreviewVariant;
    hideDownload?: boolean;
    channelType?: string;
    isInbound?: boolean;
    handleDownloadAttachment: (attachment: CXoneAttachment) => void;
}
/**
   * To render the digital email attachment component
   * @example
   * ```
   * CcfDigitalEmailV2Attachment(props: CcfDigitalAttachmentV2Props);
   * ```
   */
export declare function CcfDigitalEmailV2Attachment(props: CcfDigitalAttachmentV2Props): JSX.Element;
export default CcfDigitalEmailV2Attachment;
