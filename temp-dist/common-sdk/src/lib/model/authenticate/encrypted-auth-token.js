"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptedAuthToken = void 0;
/**
 * Declare the AuthToken
 */
class EncryptedAuthToken {
    /**
     * This method to parse auth token data
     * @param data - token API response
     * @example
     * ```
     * const authToken = new EncryptedAuthToken();
     * authToken.parseData(data);
     * ```
     */
    parseData(data) {
        this.aInfo = data === null || data === void 0 ? void 0 : data.accessToken;
        this.tokenType = data === null || data === void 0 ? void 0 : data.tokenType;
        this.rInfo = data === null || data === void 0 ? void 0 : data.refreshToken;
        this.expiresIn = data === null || data === void 0 ? void 0 : data.expiresIn;
        this.issuedTokenType = data === null || data === void 0 ? void 0 : data.issuedTokenType;
        this.iInfo = data === null || data === void 0 ? void 0 : data.idToken;
        this.accessTokenTime = data === null || data === void 0 ? void 0 : data.accessTokenTime;
    }
}
exports.EncryptedAuthToken = EncryptedAuthToken;
//# sourceMappingURL=encrypted-auth-token.js.map