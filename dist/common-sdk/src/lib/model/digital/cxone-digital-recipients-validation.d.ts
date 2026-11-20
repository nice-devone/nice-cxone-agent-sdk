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
    /**
    * @remarks - Per-field errors if outbound recipient validation fails, otherwise null.
    */
    errors?: RecipientFieldError[] | null;
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
 * Per-field error entry returned when outbound recipient validation fails (errorCode: 'recipientValidationFailed').
 */
export interface RecipientFieldError {
    /**
     * @remarks - JSON path to the invalid field, e.g. ['endUserRecipients', 0, 'idOnExternalPlatform'].
     */
    path: (string | number)[];
    /**
     * @remarks - Human-readable validation message for this field.
     */
    message: string;
}
/**
 * Readable rror codes returned by the recipients validation API.
 * Use these values when branching on `errorCode` in error-handling logic.
 */
export declare enum RecipientValidationErrorCode {
    /** Returned when one or more recipient fields fail channel-specific outbound validation. */
    RECIPIENT_VALIDATION_FAILED = "recipientValidationFailed",
    /** Fallback code used when the API response does not include an explicit error code. */
    RECIPIENT_GENERIC_ERROR = "recipientGenericError"
}
/**
 * Fallback display messages used when the recipients validation API response lacks a human-readable summary.
 */
export declare enum RecipientValidationMessage {
    /** Generic fallback shown when no displayErrorMessage is present in the API error response. */
    VALIDATION_FAILED = "Recipient validation failed"
}
/**
 * Error body returned by the recipients validation API on HTTP 4xx with errorCode 'recipientValidationFailed'.
 */
export interface CXoneDigitalRecipientsValidationErrorBody {
    /**
     * @remarks - Top-level human-readable error summary.
     */
    displayErrorMessage: string;
    /**
     * @remarks - readable error code, e.g. 'recipientValidationFailed'.
     */
    errorCode: string;
    /**
     * @remarks - Per-recipient field-level errors.
     */
    errors: RecipientFieldError[];
}
/**
 * Generic API error entry (e.g. channel-not-found), distinct from recipientValidationFailed field errors.
 */
export interface RecipientGenericApiError {
    /**
     * @remarks - Field name, empty string when the error is not field-specific.
     */
    field: string;
    /**
     * @remarks - Human-readable error message suitable for toast display.
     */
    message: string;
}
/**
 * Per-field validation errors for email OB contacts (To/CC/BCC).
 * Each field contains a list of invalid email addresses returned by the API.
 */
export interface EmailFieldValidationErrors {
    /** List of invalid email addresses in the To field. */
    to: string[];
    /** List of invalid email addresses in the CC field. */
    cc: string[];
    /** List of invalid email addresses in the BCC field. */
    bcc: string[];
}
/**
 * Represents the email recipient field type for outbound email contacts.
 * Used to map validation errors back to the originating input field.
 */
export declare type RecipientFieldType = 'to' | 'cc' | 'bcc';
/**
 * UI-level validation result for a contact's recipient in Redux state.
 * Stores validity status, inline errors, and per-field errors.
 */
export interface CcfRecipientValidationResult {
    /** Whether the recipient(s) passed API validation. Defaults to true for non-validated contacts. */
    isValid: boolean;
    /** Inline field error shown beneath the recipient input (recipientValidationFailed). */
    errorMessage: string | null;
    /** Per-field (To/CC/BCC) invalid email addresses for email OB contacts. Null when no field-level errors. */
    emailFieldErrors: EmailFieldValidationErrors | null;
    /** Phone number field validation error message for SMS/WA OB contacts. Null when valid. */
    phoneNumberFieldError: string | null;
    /** Whether the validation API returned a contact collision (active contact already exists for recipient). */
    hasCollision: boolean;
}
/**
 * Stored validation request payload for a contact.
 * Used by worker polling to re-trigger the validateRecipients API call with the last known parameters.
 */
export interface RecipientValidationRequestPayload {
    /** The digital channel ID used for the validation API call. */
    channelId: string;
    /** The request body sent to the validateRecipients API. */
    request: CXoneDigitalRecipientsValidationRequest;
    /** Maps each index in endUserRecipients back to the originating field (to/cc/bcc). Used for email OB contacts. */
    recipientIndexToFieldMap?: RecipientFieldType[];
    /** Maps each recipient address (idOnExternalPlatform) to its originating field. Used as fallback for error mapping. */
    recipientAddressToFieldMap?: Record<string, RecipientFieldType>;
}
/**
 * Top-level entry per contact in the recipient validation state.
 * Contains both validation response results and stored request payloads keyed by caseId.
 */
export interface RecipientValidationEntry {
    /** Stored validation response results. Null when not set. */
    validationResponsePayload: CcfRecipientValidationResult | null;
    /** Stored validation request payload for worker polling to re-trigger the API call. Null when not set. */
    validationRequestPayload: RecipientValidationRequestPayload | null;
}
/**
 * Root state shape for the recipient validation slice.
 * Contains a map of all validation entries indexed by caseId.
 */
export interface RecipientValidation {
    /** Map of recipient validation entries keyed by contact caseId. */
    recipientValidations: {
        [caseId: string]: RecipientValidationEntry;
    };
}
/** Type alias for the recipient validation Redux state. */
export declare type RecipientValidationState = RecipientValidation;
/**
 * Parameters for the validateRecipient thunk.
 * Supports both single-recipient (SMS/WA) and multi-recipient (email) validation flows.
 */
export interface ValidateRecipientParams {
    /** Contact case ID used to key the validation state. */
    caseId: string;
    /** Digital channel ID for the validateRecipients API call. */
    channelId: string;
    /**
     * Single recipient value for SMS / WhatsApp OB contacts. Mutually exclusive with `request`.
     * The thunk builds `CXoneDigitalRecipientsValidationRequest` internally from this value.
     */
    recipientValue?: string;
    /**
     * Pre-built request for multi-recipient contacts (e.g. email To/Cc/Bcc).
     * When supplied, `recipientValue` is ignored.
     */
    request?: CXoneDigitalRecipientsValidationRequest;
    /**
     * Maps each index in endUserRecipients back to the originating field (to/cc/bcc).
     * Required for email OB contacts to show per-field validation errors.
     * The array length must match request.endUserRecipients length.
     */
    recipientIndexToFieldMap?: RecipientFieldType[];
    /**
     * Maps each recipient address (idOnExternalPlatform) to its originating field (to/cc/bcc).
     * Used as a fallback when index-based mapping from error path fails.
     */
    recipientAddressToFieldMap?: Record<string, RecipientFieldType>;
}
/**
 * Converts a dot-notation or bracket-notation field string into a typed path array.
 * @param field - Field string in dot or bracket notation (e.g., 'endUserRecipients.0.idOnExternalPlatform' or 'endUserRecipients[0][idOnExternalPlatform]').
 *   Accepts `null` or `undefined` safely — returns `[]` for falsy input.
 * @returns Array of path segments, where numeric segments are converted to numbers and string segments remain as strings.
 * @example
 * ```
 * fieldToPath('endUserRecipients.0.idOnExternalPlatform') // => ['endUserRecipients', 0, 'idOnExternalPlatform']
 * ```
 */
export declare function fieldToPath(field: string | null | undefined): (string | number)[];
/**
 * Parses an HTTP error body from the recipients validation API.
 * Returns the typed error body when errorCode is 'recipientValidationFailed', otherwise null.
 * @param raw - The raw error body from the failed HTTP response.
 * @returns A typed CXoneDigitalRecipientsValidationErrorBody, or null if not a validation error.
 * @example - const err = parseRecipientsValidationErrorBody(sdkError?.data?.data);
 */
export declare function parseRecipientsValidationErrorBody(raw: unknown): CXoneDigitalRecipientsValidationErrorBody | null;
/**
 * Parses recipients validation API response.
 * @param raw - The raw response object from the recipients validation API.
 * @returns A typed CXoneDigitalRecipientsValidationResponse.
 * @example - const response = await validateRecipients(recipients);
 */
export declare function parseRecipientsValidationResponse(raw: unknown): CXoneDigitalRecipientsValidationResponse;
