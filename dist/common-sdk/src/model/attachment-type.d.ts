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
    /**
     * Display-only read-only marker. Unlike isForwardedAttachment this does not
     * exclude the attachment from the outbound payload, so it can be used where
     * the attachment must still be sent but must not be edited or removed.
     */
    isReadOnlyAttachment?: boolean;
    /** Unique identifier for the draft attachment. */
    draftAttachmentId?: string;
    /**
     * Server-assigned id returned once upload completes, used as the "first-call" id sent
     * on a draft-upsert request before a draftAttachmentId exists (AW-62906). Kept separate
     * from attachmentId, which is only ever set for inline images at file-selection time.
     */
    serverAttachmentId?: string;
    /** Name for the draft attachment. */
    friendlyName?: string;
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
    /** Unique identifier for the draft attachment. */
    draftAttachmentId?: string;
    /** Name for the draft attachment. */
    friendlyName?: string;
}
