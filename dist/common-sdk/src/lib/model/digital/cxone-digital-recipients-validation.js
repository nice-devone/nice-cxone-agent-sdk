"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRecipientsValidationResponse = void 0;
/**
 * Parses recipients validation API response.
 * @param raw - The raw response object from the recipients validation API.
 * @returns A typed CXoneDigitalRecipientsValidationResponse.
 * @example - const response = await validateRecipients(recipients);
 */
function parseRecipientsValidationResponse(raw) {
    const data = raw;
    const recipientValidation = data['recipientValidation'];
    const contactCollision = data['contactCollision'];
    return {
        recipientValidation: recipientValidation ? {
            status: recipientValidation['status'],
            message: recipientValidation['message'],
        } : null,
        contactCollision: contactCollision
            ? {
                contactNumber: contactCollision['contactNumber'],
                message: contactCollision['message'],
            }
            : null,
    };
}
exports.parseRecipientsValidationResponse = parseRecipientsValidationResponse;
//# sourceMappingURL=cxone-digital-recipients-validation.js.map