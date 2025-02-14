import { __awaiter } from "tslib";
import { Logger } from '@nice-devone/core-sdk';
/**
 * To generate code verifier and code challenge
 */
export class SecurityHelper {
    constructor() {
        this.logger = new Logger('AUTH-SDK', 'SecurityHelper');
    }
    /**
     * To generate the code verifier
     * @returns - code verifier
     * ```
     * @example
     * generateCodeVerifier();
     * ```
     */
    generateCodeVerifier() {
        const array = new Uint32Array(56 / 2);
        window.crypto.getRandomValues(array);
        return Array.from(array, this.dec2hex).join('');
    }
    /**
     * Convert decimal to hexadecimal
     * @param dec - decimal number
     * @returns - hexadecimal - 20
     *
     * ```
     * @example
     * dec2hex(32);
     * ```
     */
    dec2hex(dec) {
        return ('0' + dec.toString(16)).substr(-2);
    }
    /**
     * To generate the code challenge
     *
     * @param verifier - code verifier
     * @returns - base64 Encoded value - ftMwffFeP8uzj-D9BKFG
     *
     * ```
     * @example
     * generateCodeChallengeFromVerifier('dfd7fe9fff84d20091bd6c');
     * ```
     */
    generateCodeChallengeFromVerifier(verifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashed = yield this.sha256(verifier);
            const base64encoded = this.base64urlencode(hashed);
            return base64encoded;
        });
    }
    /**
     *
     * @param plain - Code verifier
     * @returns - Array Buffer
     * ```
     * @example
     * sha256('dfd7fe9fff84d20091bd6c');
     * ```
     */
    sha256(plain) {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    }
    /**
     *
     * @param buffer - Array Buffer
     * @returns - base64 endcoded url
     * ```
     * @example
     * base64urlencode([]);
     * ```
     */
    base64urlencode(buffer) {
        let str = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            str += String.fromCharCode(bytes[i]);
        }
        return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    /**
     * Parse jwt token to extract user data
     * @param token - input jwt token string
     * @returns - parsed user details
     * @example
     * ```
     * parseJwt('token_string');
     * ```
     */
    parseJwt(token) {
        var _a;
        if (!token)
            return;
        try {
            const base64Url = token === null || token === void 0 ? void 0 : token.split('.')[1];
            const base64 = (_a = base64Url === null || base64Url === void 0 ? void 0 : base64Url.replace('-', '+')) === null || _a === void 0 ? void 0 : _a.replace('_', '/');
            return JSON.parse(window.atob(base64));
        }
        catch (e) {
            this.logger.error('parseJwt', 'Retrying with atobV2 as error in parseJwt due to: ' + e);
            return JSON.parse(this.atobV2(token));
        }
    }
    /**
     * Custom atob implementation to parse jwt token
     * @param token - input base64 string
     * @returns - parsed user details
     * @example
     * ```
     * atobV2('base64_string');
     * ```
     */
    atobV2(base64Str) {
        var _a;
        this.logger.info('atobV2', 'Retrying with atobV2 as error in parseJwt');
        try {
            const base64Url = (base64Str === null || base64Str === void 0 ? void 0 : base64Str.indexOf('.')) > -1 ? base64Str === null || base64Str === void 0 ? void 0 : base64Str.split('.')[1] : base64Str === null || base64Str === void 0 ? void 0 : base64Str.split('.')[0];
            const base64 = (_a = base64Url === null || base64Url === void 0 ? void 0 : base64Url.replace(/-/g, '+')) === null || _a === void 0 ? void 0 : _a.replace(/_/g, '/');
            return decodeURIComponent(window
                .atob(base64)
                .split('')
                .map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
                .join(''));
        }
        catch (e) {
            this.logger.error('atobV2', 'Error in atobV2 as : ' + e);
            return '{}';
        }
    }
}
//# sourceMappingURL=security-helper.js.map