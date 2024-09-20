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
     * ```
     * @example
     * const authToken = new AuthToken();
     * authToken.parseData(data);
     * ```
     */
    parseData(data) {
        this.accessToken = data.access_token || data.accessToken;
        this.tokenType = data.token_type;
        this.refreshToken = data.refresh_token || data.refreshToken;
        this.expiresIn = data.expires_in || data.accessTokenExpiry;
        this.issuedTokenType = data.issued_token_type;
        this.idToken = data.id_token;
        this.accessTokenTime = new Date().getTime();
    }
}
exports.AuthToken = AuthToken;
//# sourceMappingURL=auth-token.js.map