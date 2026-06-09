import { __awaiter } from "tslib";
/**
 * To generate code verifier and code challenge
 */
export class SecurityHelper {
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
}
//# sourceMappingURL=security-helper.js.map