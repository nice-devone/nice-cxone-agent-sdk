/**
 * To generate code verifier and code challenge
 */
export declare class SecurityHelper {
    private logger;
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
}
