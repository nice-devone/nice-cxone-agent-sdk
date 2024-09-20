import { HttpRequestInit } from './http-request/http-request';
/**
 * Utility class
 */
export declare class HttpUtilService {
    /**
     * Method to initialise headers for a http api call
     * @returns HttpRequestInit response
     * ```
     * @example
     * const initApi = this.initHeader()
     * ```
     */
    initHeader(token?: string, contentType?: string): HttpRequestInit;
}
