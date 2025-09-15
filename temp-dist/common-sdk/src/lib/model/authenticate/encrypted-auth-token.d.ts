import { AuthToken } from './auth-token';
/**
 * Declare the AuthToken
 */
export declare class EncryptedAuthToken {
    aInfo: string | {
        t: string;
        i: string;
    };
    rInfo: string | {
        t: string;
        i: string;
    };
    tokenType: string;
    expiresIn: number;
    issuedTokenType: string;
    iInfo: string | {
        t: string;
        i: string;
    };
    accessTokenTime: number;
    /**
     * This method to parse auth token data
     * @param data - token API response
     * @example
     * ```
     * const authToken = new EncryptedAuthToken();
     * authToken.parseData(data);
     * ```
     */
    parseData(data: AuthToken): void;
}
