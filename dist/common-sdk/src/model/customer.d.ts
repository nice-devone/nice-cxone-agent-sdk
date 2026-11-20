import { CustomerHistory } from './customer-history';
export interface Customer {
    customerName: string;
    customerAddress?: string;
    customerHistory: CustomerHistory[];
    phoneNo: string;
    emailId: string;
    twitterId: string;
    filteredHistory?: CustomerHistory[];
    filteredHistoryCount: number;
    totalHistoryCount?: number;
    nextPage?: number;
    ibHistoryCount?: number;
    obHistoryCount?: number;
    otherHistoryCount?: number;
}
/**
 * Model for the customer identity name update API's response
 * (PUT /dfo/3.0/channels/:channelId/customer-identities/:customerIdentityId).
 * The API returns 200 with an empty body on success — every field is optional, and
 * callers fall back to the name they submitted when fullName is absent.
 */
export declare class UpdateCustomerIdentityNameResponse {
    id?: string;
    idOnExternalPlatform?: string;
    fullName?: string;
    nickname?: string;
    image?: string;
    externalPlatformId?: string;
    /**
     * Constructor for UpdateCustomerIdentityNameResponse. All fields are optional, as the API returns an empty body on success.
     * @param id - The unique identifier of the customer identity.
     * @param idOnExternalPlatform - The unique identifier of the customer identity on the external platform.
     * @param fullName - The full name of the customer identity.
     * @param nickname - The nickname of the customer identity.
     * @param image - The image of the customer identity.
     * @param externalPlatformId - The unique identifier of the customer identity on the external platform.
    */
    private constructor();
    /**
     * Parses a raw API response into UpdateCustomerIdentityNameResponse, dropping unknown fields.
     * @param data - raw response body, possibly empty
     * @example - UpdateCustomerIdentityNameResponse.parse(response.data)
     */
    static parse(data: unknown): UpdateCustomerIdentityNameResponse;
}
