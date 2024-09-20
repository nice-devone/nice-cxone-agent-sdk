/**
 * Utility class
 */
export class HttpUtilService {
    /**
     * Method to initialise headers for a http api call
     * @returns HttpRequestInit response
     * ```
     * @example
     * const initApi = this.initHeader()
     * ```
     */
    initHeader(token, contentType) {
        const reqInit = {
            headers: [],
        };
        if (reqInit.headers && token) {
            const tokenHeader = {
                name: 'Authorization',
                value: 'Bearer ' + token,
            };
            reqInit.headers.push(tokenHeader);
        }
        if (reqInit.headers && contentType) {
            const tokenHeader = {
                name: 'Content-Type',
                value: contentType,
            };
            reqInit.headers.push(tokenHeader);
        }
        if (reqInit.headers) {
            const originIdentifier = {
                name: 'Originating-Service-Identifier',
                value: 'CXoneAgent',
            };
            reqInit.headers.push(originIdentifier);
        }
        return reqInit;
    }
}
//# sourceMappingURL=http-util-service.js.map