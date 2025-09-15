/**
 * Class for Request format
*/
export class HttpRequest {
    /**
     *
     * @param method - type of http method
     * @param reqInit - request object
     *
     * ```
     * @example
     * const httpRequest = new HttpRequest('POST', {name: 'test', value: 'test_value})
     * ```
     */
    constructor(method, reqInit) {
        this.method = method;
        this.body = reqInit.body;
        this.headers = reqInit.headers;
    }
    /**
     *
     * @returns - request init object
     *
     * ```
     * @example
     * const reqInit = toRequestInit()
     * ```
     */
    toRequestInit() {
        const reqInit = {
            method: this.method,
            mode: 'cors',
            cache: 'no-cache',
        };
        reqInit.headers = this.getHeaderInit();
        if (this.hasBody()) {
            reqInit.body = this.getBodyInit();
        }
        return reqInit;
    }
    /**
     *
     * @returns - body value of the request header
     * ```
     * @example
     * const testObj = this.hasBody();
     * ```
     */
    hasBody() {
        return (this.method == 'DELETE' || this.method == 'POST' || this.method == 'PUT' || this.method == 'PATCH');
    }
    /**
     *
     * @returns - header init object
     * ```
     * @example
     * const header = this.getHeaderInit()
     * ```
     */
    getHeaderInit() {
        const headerInit = new Headers();
        if (this.headers) {
            this.headers.forEach((header) => {
                headerInit.append(header.name, header.value);
            });
        }
        return headerInit;
    }
    /**
     *
     * @returns - stringified body init object
     * ```
     * @example
     * cont getBody = this.getBodyInit()
     * ```
     */
    getBodyInit() {
        if (this.body) {
            if (typeof this.body === 'object' || typeof this.body === 'boolean' || Array.isArray(this.body)) {
                return JSON.stringify(this.body);
            }
            return this.body.toString();
        }
        return '';
    }
}
//# sourceMappingURL=http-request.js.map