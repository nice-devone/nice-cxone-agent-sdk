/**
 * array of jwks keys
 */
export interface JWKS {
    keys: Array<KeySet>;
}
/**
 * jwks keyset
 */
export interface KeySet {
    alg: string;
    e: string;
    kid: string;
    kty: string;
    n: string;
    use: string;
}
