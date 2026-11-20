"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRecipientsValidationResponse = exports.parseRecipientsValidationErrorBody = exports.fieldToPath = exports.RecipientValidationMessage = exports.RecipientValidationErrorCode = void 0;
/**
 * Readable rror codes returned by the recipients validation API.
 * Use these values when branching on `errorCode` in error-handling logic.
 */
var RecipientValidationErrorCode;
(function (RecipientValidationErrorCode) {
    /** Returned when one or more recipient fields fail channel-specific outbound validation. */
    RecipientValidationErrorCode["RECIPIENT_VALIDATION_FAILED"] = "recipientValidationFailed";
    /** Fallback code used when the API response does not include an explicit error code. */
    RecipientValidationErrorCode["RECIPIENT_GENERIC_ERROR"] = "recipientGenericError";
})(RecipientValidationErrorCode = exports.RecipientValidationErrorCode || (exports.RecipientValidationErrorCode = {}));
/**
 * Fallback display messages used when the recipients validation API response lacks a human-readable summary.
 */
var RecipientValidationMessage;
(function (RecipientValidationMessage) {
    /** Generic fallback shown when no displayErrorMessage is present in the API error response. */
    RecipientValidationMessage["VALIDATION_FAILED"] = "Recipient validation failed";
})(RecipientValidationMessage = exports.RecipientValidationMessage || (exports.RecipientValidationMessage = {}));
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
function fieldToPath(field) {
    if (!field) {
        return [];
    }
    try {
        return field
            .split(/[.[\]]+/)
            .filter(Boolean)
            .map((token) => {
            const value = Number(token);
            return Number.isInteger(value) ? value : token;
        });
    }
    catch (_a) {
        return [field];
    }
}
exports.fieldToPath = fieldToPath;
/**
 * Parses an HTTP error body from the recipients validation API.
 * Returns the typed error body when errorCode is 'recipientValidationFailed', otherwise null.
 * @param raw - The raw error body from the failed HTTP response.
 * @returns A typed CXoneDigitalRecipientsValidationErrorBody, or null if not a validation error.
 * @example - const err = parseRecipientsValidationErrorBody(sdkError?.data?.data);
 */
function parseRecipientsValidationErrorBody(raw) {
    var _a, _b, _c;
    // Validate input is a non-null object
    if (!raw || typeof raw !== 'object') {
        return null;
    }
    // Unwrap the downstream service response envelope to reach the actual error body
    const body = raw.body;
    if (!body || typeof body !== 'object') {
        return null;
    }
    const data = body;
    // Validate that errors array exists; if not, this is not a recipientValidationFailed error
    if (!Array.isArray(data.errors)) {
        return null;
    }
    // Extract errorCode from the first error object in the array
    const firstError = (_a = data.errors) === null || _a === void 0 ? void 0 : _a[0];
    const errorCodeValue = (firstError === null || firstError === void 0 ? void 0 : firstError.errorCode) || RecipientValidationErrorCode.RECIPIENT_GENERIC_ERROR;
    // Transform error entries: convert field strings to typed paths
    const errors = (_b = data === null || data === void 0 ? void 0 : data.errors) === null || _b === void 0 ? void 0 : _b.map(error => ({
        path: fieldToPath(error.field),
        message: error.message,
    }));
    // Return structured error body with fallback values for missing properties
    return {
        displayErrorMessage: (data === null || data === void 0 ? void 0 : data.displayErrorMessage) || ((_c = errors === null || errors === void 0 ? void 0 : errors[0]) === null || _c === void 0 ? void 0 : _c.message) || RecipientValidationMessage.VALIDATION_FAILED,
        errorCode: errorCodeValue,
        errors,
    };
}
exports.parseRecipientsValidationErrorBody = parseRecipientsValidationErrorBody;
/**
 * Parses recipients validation API response.
 * @param raw - The raw response object from the recipients validation API.
 * @returns A typed CXoneDigitalRecipientsValidationResponse.
 * @example - const response = await validateRecipients(recipients);
 */
function parseRecipientsValidationResponse(raw) {
    var _a;
    const data = raw;
    const recipientValidation = data === null || data === void 0 ? void 0 : data.recipientValidation;
    const contactCollision = data === null || data === void 0 ? void 0 : data.contactCollision;
    return {
        recipientValidation: recipientValidation ? {
            status: recipientValidation.status,
            message: recipientValidation.message,
            errors: (_a = recipientValidation.errors) !== null && _a !== void 0 ? _a : null,
        } : null,
        contactCollision: contactCollision
            ? {
                contactNumber: contactCollision.contactNumber,
                message: contactCollision.message,
            }
            : null,
    };
}
exports.parseRecipientsValidationResponse = parseRecipientsValidationResponse;
//# sourceMappingURL=cxone-digital-recipients-validation.js.map