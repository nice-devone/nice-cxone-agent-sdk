/**
 * Utility class
 */
export class HttpUtilService {
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
    initHeader(token, contentType, xMessageSender) {
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
                value: HttpUtilService.originatingServiceIdentifier,
            };
            reqInit.headers.push(originIdentifier);
        }
        // Dev Note: Below Change added temporarily as per request from DF sandy team, considering billing implications
        // TODO: Need to be removed when DFO completes ADR approved DE ticket of reading above header - Originating-Service-Identifier
        if (reqInit.headers && xMessageSender) {
            const xMessageSenderHeader = {
                name: xMessageSender,
                value: 'cxagent',
            };
            reqInit.headers.push(xMessageSenderHeader);
        }
        return reqInit;
    }
}
//# sourceMappingURL=http-util-service.js.map