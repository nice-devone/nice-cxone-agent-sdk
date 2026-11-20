"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerIdentityNameResponse = void 0;
/**
 * Model for the customer identity name update API's response
 * (PUT /dfo/3.0/channels/:channelId/customer-identities/:customerIdentityId).
 * The API returns 200 with an empty body on success — every field is optional, and
 * callers fall back to the name they submitted when fullName is absent.
 */
class UpdateCustomerIdentityNameResponse {
    /**
     * Constructor for UpdateCustomerIdentityNameResponse. All fields are optional, as the API returns an empty body on success.
     * @param id - The unique identifier of the customer identity.
     * @param idOnExternalPlatform - The unique identifier of the customer identity on the external platform.
     * @param fullName - The full name of the customer identity.
     * @param nickname - The nickname of the customer identity.
     * @param image - The image of the customer identity.
     * @param externalPlatformId - The unique identifier of the customer identity on the external platform.
    */
    constructor(id, idOnExternalPlatform, fullName, nickname, image, externalPlatformId) {
        this.id = id;
        this.idOnExternalPlatform = idOnExternalPlatform;
        this.fullName = fullName;
        this.nickname = nickname;
        this.image = image;
        this.externalPlatformId = externalPlatformId;
    }
    /**
     * Parses a raw API response into UpdateCustomerIdentityNameResponse, dropping unknown fields.
     * @param data - raw response body, possibly empty
     * @example - UpdateCustomerIdentityNameResponse.parse(response.data)
     */
    static parse(data) {
        const raw = (data !== null && data !== void 0 ? data : {});
        return new UpdateCustomerIdentityNameResponse(typeof raw.id === 'string' ? raw.id : undefined, typeof raw.idOnExternalPlatform === 'string' ? raw.idOnExternalPlatform : undefined, typeof raw.fullName === 'string' ? raw.fullName : undefined, typeof raw.nickname === 'string' ? raw.nickname : undefined, typeof raw.image === 'string' ? raw.image : undefined, typeof raw.externalPlatformId === 'string' ? raw.externalPlatformId : undefined);
    }
}
exports.UpdateCustomerIdentityNameResponse = UpdateCustomerIdentityNameResponse;
//# sourceMappingURL=customer.js.map