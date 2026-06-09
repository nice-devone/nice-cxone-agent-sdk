/**
 * To generate code verifier and code challenge
 */
export declare class SecurityHelper {
    private logger;
    private algorithm;
    private keyLength;
    private ivLength;
    /**
     * To generate the code verifier
     * @returns - code verifier
     * ```
     * @example
     * generateCodeVerifier();
     * ```
     */
    generateCodeVerifier(): string;
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
    private dec2hex;
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
    generateCodeChallengeFromVerifier(verifier: string): Promise<string>;
    /**
     *
     * @param plain - Code verifier
     * @returns - Array Buffer
     * ```
     * @example
     * sha256('dfd7fe9fff84d20091bd6c');
     * ```
     */
    private sha256;
    /**
     *
     * @param buffer - Array Buffer
     * @returns - base64 endcoded url
     * ```
     * @example
     * base64urlencode([]);
     * ```
     */
    private base64urlencode;
    /**
       * Parse jwt token to extract user data
       * @param token - input jwt token string
       * @returns - parsed user details
       * @example
       * ```
       * parseJwt('token_string');
       * ```
       */
    parseJwt(token: string): any;
    /**
     * Custom atob implementation to parse jwt token
     * @param token - input base64 string
     * @returns - parsed user details
     * @example
     * ```
     * atobV2('base64_string');
     * ```
     */
    private atobV2;
    /**
     * Method to generate a new AES-GCM key
     * @returns A promise that resolves to a new CryptoKey
     * @throws Error if the key generation fails
     * @example
     * ```
     * generateKey();
     * ```
     */
    generateKey(): Promise<CryptoKey>;
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
    importKey(keyData: JsonWebKey): Promise<CryptoKey>;
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
    encrypt(plainText: string, key: CryptoKey): Promise<{
        cipherText: string;
        iv: string;
    }>;
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
    decrypt(cipherText: string, iv: string, key: CryptoKey): Promise<string>;
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
    deriveKey(key: string): Promise<JsonWebKey>;
    /**
       * Method to Convert ArrayBuffer to Base64 string
       * @param buffer - The buffer to convert
       * @returns  A Base64 string
       * @example
       * ```
       * arrayBufferToBase64(buffer);
       * ```
       */
    arrayBufferToBase64(buffer: ArrayBuffer): string;
    /**
       * Method to Convert Base64 string to ArrayBuffer
       * @param buffer - The buffer to convert
       * @returns  A Base64 string
       * @example
       * ```
       * base64ToArrayBuffer(buffer);
       * ```
       */
    base64ToArrayBuffer(base64: string): ArrayBuffer;
}
