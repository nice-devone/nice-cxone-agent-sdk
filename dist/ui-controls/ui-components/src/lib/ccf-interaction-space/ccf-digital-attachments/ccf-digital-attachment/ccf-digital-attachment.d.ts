/// <reference types="react" />
import { CXoneAttachment } from '@nice-devone/common-sdk';
import { AttachmentPreviewVariant } from '../model/ccf-attachment-preview-variant';
export interface CcfDigitalAttachmentProps {
    /**
    * @remarks  Method to toggle preview mode
    */
    togglePreviewMode: (id: string) => void;
    /**
    * @remarks  attachment object with properties mentioned in the type CXoneAttachment
    */
    attachment: CXoneAttachment;
    /**
    * @remarks  passing in modal view to preview attachment as children
    */
    children: React.ReactNode;
    /**
     * @remarks based on this the attachment view will be decided such as compact or regular
     */
    variant?: AttachmentPreviewVariant;
    /**
     * @remarks  based on this download option gets shown on UI (for Instagram channel only preview is given)
     */
    hideDownload?: boolean;
    /**
     * @remarks  channel type
     */
    channelType?: string;
    /**
     * @remarks  is attachment inbound or outbound
     */
    isInbound?: boolean;
}
/**
 * Component to display digital email attachments which are not inline
 * @returns a wrapper looping through CcfDigitalAttachment items
 * ```
 * @example
 * <CcfDigitalAttachment
 * />
 *
 * ```
 */
export declare function CcfDigitalAttachment(props: CcfDigitalAttachmentProps): JSX.Element;
export default CcfDigitalAttachment;
