import { __awaiter } from "tslib";
import { Logger } from '../logger/logger';
/**
 * To generate code verifier and code challenge
 */
export class SecurityHelper {
    constructor() {
        this.logger = new Logger('CORE-SDK', 'SecurityHelper');
        this.algorithm = 'AES-GCM';
        this.keyLength = 256;
        this.ivLength = 12;
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
    /**
     * Method to generate a new AES-GCM key
     * @returns A promise that resolves to a new CryptoKey
     * @throws Error if the key generation fails
     * @example
     * ```
     * generateKey();
     * ```
     */
    generateKey() {
        return __awaiter(this, void 0, void 0, function* () {
            return crypto.subtle.generateKey({
                name: this.algorithm,
                length: this.keyLength,
            }, true, ['encrypt', 'decrypt']);
        });
    }
    /**
       * Method to import a JWK (JSON Web Key) as a CryptoKey
       * @param keyData - The JWK to import
       * @returns A promise that resolves to a new CryptoKey
       * @throws Error if the JWK is invalid or the key import fails
       * @example
       * ```
       * importKey(keyData);
       * ```
       */
    importKey(keyData) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!(keyData === null || keyData === void 0 ? void 0 : keyData.kty) || !(keyData === null || keyData === void 0 ? void 0 : keyData.k)) {
                throw new Error('Invalid JWK: missing required properties');
            }
            try {
                // Decode the base64url encoded key data
                const keyBuffer = Uint8Array.from(window.atob((_a = keyData.k) === null || _a === void 0 ? void 0 : _a.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
                // Check if the key length matches the expected length for AES-GCM (256 bits / 32 bytes)
                if (keyBuffer.length !== 32) {
                    throw new Error('Invalid JWK: key data length is incorrect');
                }
                return crypto.subtle.importKey('jwk', keyData, { name: this.algorithm }, true, ['encrypt', 'decrypt']);
            }
            catch (e) {
                this.logger.error('importKey', 'Error in importKey as : ' + e);
                throw new Error('Invalid JWK: key data length is incorrect');
            }
        });
    }
    /**
       * Method to encrypt a plaintext string using the provided CryptoKey
       * @param key - The CryptoKey to export
       * @returns A promise that resolves to a new JWK
       * @throws Error if the key export fails
       * @example
       * ```
       * encrypt(plainText, key);
       * ```
       */
    encrypt(plainText, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const encoder = new TextEncoder();
            const iv = crypto.getRandomValues(new Uint8Array(this.ivLength)); // Random IV
            const encodedText = encoder.encode(plainText);
            const cipherBuffer = yield crypto.subtle.encrypt({
                name: this.algorithm,
                iv,
            }, key, encodedText);
            return {
                cipherText: this.arrayBufferToBase64(cipherBuffer),
                iv: this.arrayBufferToBase64(iv.buffer),
            };
        });
    }
    /**
       * Method to decrypt a cipher text using a CryptoKey
       * @param key - The CryptoKey to export
       * @returns A promise that resolves to a new JWK
       * @throws Error if the key export fails
       * @example
       * ```
       * decrypt(cipherText, iv, key);
       * ```
       */
    decrypt(cipherText, iv, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoder = new TextDecoder();
            const cipherBuffer = this.base64ToArrayBuffer(cipherText);
            const ivBuffer = this.base64ToArrayBuffer(iv);
            const decryptedBuffer = yield crypto.subtle.decrypt({
                name: this.algorithm,
                iv: new Uint8Array(ivBuffer),
            }, key, cipherBuffer);
            return decoder.decode(decryptedBuffer);
        });
    }
    /**
       * Method to derive a CryptoKey from a string
       * @param key - The key to derive
       * @returns  A promise that resolves to a new JWK
       * @throws Error if the key derivation fails
       * @example
       * ```
       * deriveKey(key);
       * ```
       */
    deriveKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const encoder = new TextEncoder();
            const keyInBytes = encoder.encode(key);
            const hashBuffer = yield crypto.subtle.digest('SHA-256', keyInBytes);
            const cryptoKey = yield crypto.subtle.importKey('raw', hashBuffer, { name: this.algorithm }, true, // Ensure the key is extractable
            ['encrypt', 'decrypt']);
            return yield crypto.subtle.exportKey('jwk', cryptoKey);
        });
    }
    /**
       * Method to Convert ArrayBuffer to Base64 string
       * @param buffer - The buffer to convert
       * @returns  A Base64 string
       * @example
       * ```
       * arrayBufferToBase64(buffer);
       * ```
       */
    arrayBufferToBase64(buffer) {
        try {
            return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(buffer))));
        }
        catch (e) {
            this.logger.error('arrayBufferToBase64', 'Error in arrayBufferToBase64 as : ' + e);
            return '';
        }
    }
    /**
       * Method to Convert Base64 string to ArrayBuffer
       * @param buffer - The buffer to convert
       * @returns  A Base64 string
       * @example
       * ```
       * base64ToArrayBuffer(buffer);
       * ```
       */
    base64ToArrayBuffer(base64) {
        try {
            const binaryString = window.atob(base64);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString === null || binaryString === void 0 ? void 0 : binaryString.charCodeAt(i);
            }
            return bytes.buffer;
        }
        catch (e) {
            this.logger.error('base64ToArrayBuffer', 'Error in base64ToArrayBuffer as : ' + e);
            return new ArrayBuffer(0);
        }
    }
}
//# sourceMappingURL=security-helper.js.map