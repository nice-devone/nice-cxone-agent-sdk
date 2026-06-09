export interface AttachmentType {
    attachmentId?: string;
    id: string;
    name: string;
    size: number;
    mimeType: string;
    uploaded: boolean;
    url: string;
    isInline?: boolean;
    isForwardedAttachment?: boolean;
}
/**
 * Interface representing the properties of an Inline Image.
 */
export interface InlineImageType {
    /** Unique identifier for the inline image. */
    id: string;
    /** Name of the inline image. */
    name: string;
    /** Size of the inline image in bytes. */
    size: number;
    /** MIME type of the inline image. */
    mimeType: string;
    /** Indicates whether the inline image has been successfully uploaded. */
    uploaded: boolean;
    /** URL of the inline image. */
    url: string;
    /** Optional identifier for the image Id. */
    imageId?: string;
    /** Flag indicating whether the image is intended to be displayed inline. */
    isInline?: boolean;
    /**Flag indication whether its forwarded attachment in case of email forward */
    isForwardedAttachment?: boolean;
}
