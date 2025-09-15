/**
 * Event Data emitted from cxone agent for authorization request.
 */
export interface CXoneAuthRequestData {
    /**
     * AuthorizationUrl, that includes OpenID Connect query parameters
     */
    authorizeUrl?: string;
}
