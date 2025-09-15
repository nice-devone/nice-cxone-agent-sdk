"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthToken = void 0;
/**
 * Declare the AuthToken
 */
class AuthToken {
    /**
     * This method to parse auth token data
     * @param data - token API response
     * @example
     * ```
     * const authToken = new AuthToken();
     * authToken.parseData(data);
     * ```
     */
    parseData(data) {
        this.accessToken = (data === null || data === void 0 ? void 0 : data.access_token) || (data === null || data === void 0 ? void 0 : data.accessToken);
        this.tokenType = (data === null || data === void 0 ? void 0 : data.token_type) || (data === null || data === void 0 ? void 0 : data.tokenType);
        this.refreshToken = (data === null || data === void 0 ? void 0 : data.refresh_token) || (data === null || data === void 0 ? void 0 : data.refreshToken);
        this.expiresIn = (data === null || data === void 0 ? void 0 : data.expires_in) || (data === null || data === void 0 ? void 0 : data.accessTokenExpiry) || (data === null || data === void 0 ? void 0 : data.expiresIn);
        this.issuedTokenType = (data === null || data === void 0 ? void 0 : data.issued_token_type) || (data === null || data === void 0 ? void 0 : data.issuedTokenType);
        this.idToken = (data === null || data === void 0 ? void 0 : data.id_token) || (data === null || data === void 0 ? void 0 : data.idToken);
        this.accessTokenTime = (data === null || data === void 0 ? void 0 : data.accessTokenTime) || new Date().getTime();
    }
}
exports.AuthToken = AuthToken;
//# sourceMappingURL=auth-token.js.map