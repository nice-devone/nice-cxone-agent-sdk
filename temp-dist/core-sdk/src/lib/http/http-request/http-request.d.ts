import { HttpHeader } from '@nice-devone/common-sdk';
export interface HttpRequestInit {
    headers?: HttpHeader[];
    body?: any;
}
/**
 * Class for Request format
*/
export declare class HttpRequest {
    readonly method: string;
    body?: any;
    headers?: HttpHeader[];
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
    constructor(method: 'DELETE' | 'GET' | 'POST' | 'PUT' | 'PATCH', reqInit: HttpRequestInit);
    /**
     *
     * @returns - request init object
     *
     * ```
     * @example
     * const reqInit = toRequestInit()
     * ```
     */
    toRequestInit(): RequestInit;
    /**
     *
     * @returns - body value of the request header
     * ```
     * @example
     * const testObj = this.hasBody();
     * ```
     */
    private hasBody;
    /**
     *
     * @returns - header init object
     * ```
     * @example
     * const header = this.getHeaderInit()
     * ```
     */
    private getHeaderInit;
    /**
     *
     * @returns - stringified body init object
     * ```
     * @example
     * cont getBody = this.getBodyInit()
     * ```
     */
    private getBodyInit;
}
