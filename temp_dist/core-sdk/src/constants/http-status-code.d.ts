/**
 * Enum for http response status codes
 */
export declare const enum HttpStatusCode {
    /**
     * Standard response for successful HTTP requests.
     * The actual response will depend on the request method used.
     * In a GET request, the response will contain an entity corresponding to the requested resource.
     * In a POST request, the response will contain an entity describing or containing the result of the action.
     */
    OK = 200,
    /**
     * The server successfully processed the request and is not returning any content.
     */
    NO_CONTENT = 204,
    /**
     * The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.
     */
    TOO_MANY_REQUESTS = 429,
    /**
     * The server is currently unavailable (because it is overloaded or down for maintenance).
     * Generally, this is a temporary state.
     */
    SERVICE_UNAVAILABLE = 503,
    /**
     * Use this when the client already has the most recent version of a resource.
     * For example, when calling get-next-event, if there are no events within the timeout period,
     *  the server will return a 304 to indicate that there are no events.
     */
    NOT_MODIFIED = 304,
    /**
     * The server cannot or will not process the request due to an apparent client error
     * (e.g., malformed request syntax, too large size, invalid request message framing, or deceptive request routing).
     */
    BAD_REQUEST = 400,
    /**
    * Use this when the access is tied to the application logic, such as insufficient rights to a resource
    */
    FORBIDDEN = 403,
    /**
    * This error code means that the URL is too long for the server to process
    */
    URI_TOO_LARGE = 414
}
/**
 * last range till the http request should be considered as success
 * */
export declare const OK_UNTIL = 299;
