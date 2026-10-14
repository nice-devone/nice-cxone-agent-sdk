import { DraftContactRecipient } from './cxone-digital-draft-contact';
/**
 * Interface for recipients validation request.
 */
export interface CXoneDigitalRecipientsValidationRequest {
    /**
     * @remarks - List of recipients to validate.
     */
    endUserRecipients: DraftContactRecipient[];
}
/**
 * Status of the recipient validation result.
 */
export declare type RecipientValidationStatus = 'ok' | 'error';
/**
 * Recipient validation result from the API response.
 */
export interface RecipientValidationResult {
    /**
     * @remarks - Validation outcome: 'ok' means valid, 'error' means channel-specific validation failed.
     */
    status: RecipientValidationStatus;
    /**
     * @remarks - Human-readable error message, present when status is 'error'.
     */
    message?: string;
}
/**
 * Contact collision details when an open contact already exists for the recipients.
 */
export interface ContactCollision {
    /**
     * @remarks - Contact number of the existing open contact.
     */
    contactNumber: string;
    /**
     * @remarks - Human-readable message describing the collision.
     */
    message: string;
}
/**
 * Response from the recipients validation API.
 */
export interface CXoneDigitalRecipientsValidationResponse {
    /**
     * @remarks - Result of the channel-specific recipient validation.
     */
    recipientValidation: RecipientValidationResult | null;
    /**
     * @remarks - Collision details if an open contact already exists for these recipients, otherwise null.
     */
    contactCollision: ContactCollision | null;
}
/**
 * Parses recipients validation API response.
 * @param raw - The raw response object from the recipients validation API.
 * @returns A typed CXoneDigitalRecipientsValidationResponse.
 * @example - const response = await validateRecipients(recipients);
 */
export declare function parseRecipientsValidationResponse(raw: unknown): CXoneDigitalRecipientsValidationResponse;
