import { HttpRequestCustomHeaders } from '../../constants/http-request-custom-headers';
import { HttpRequestInit } from './http-request/http-request';
/**
 * Utility class
 */
export declare class HttpUtilService {
    static originatingServiceIdentifier: string;
    /**
     * Method to initialize headers for a http api call
     * @param token - token to be added in header
     * @param contentType - content type to be added in header (optional)
     * @param xMessageSender - x-message-sender header to be added in header (optional)
     * @returns HttpRequestInit response
     * ```
     * @example
     * const initApi = this.initHeader()
     * ```
     */
    initHeader(token?: string, contentType?: string, xMessageSender?: HttpRequestCustomHeaders.X_MESSAGE_SENDER): HttpRequestInit;
}
