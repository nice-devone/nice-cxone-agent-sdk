import { Observable } from 'rxjs';
import { HttpRequestInit } from '../http-request/http-request';
import { HttpResponse, RetryOptions, ApiNetworkPerformance, RequestControlMode } from '@nice-devone/common-sdk';
import { Logger } from '../../../logger/logger';
import { RequestManager } from '../request-manager/request-manager';
/** Http Interface class for making api calls to backend */
export declare class HttpClient {
    static circuitBreaker: import("cockatiel").CircuitBreakerPolicy;
    static logger: Logger;
    static apiNetworkPerformance: ApiNetworkPerformance;
    /**
     *
     * @param url - url for the api
     * @param request - request object associated with the api
     * @param includeForMeasuringLatency - boolean to enable measuring api latency
     * @returns returns http response from the get api
     *
     * ```
     * @example
     * get('https://nice.dev.cxone.com/getUsers', {body: 'api_request_body'}, true)
     * ```
     */
    static get(url: string, request: HttpRequestInit, includeForMeasuringLatency?: boolean): Promise<HttpResponse>;
    /**
     * Used to handle the request via circuit breaker
     * @param url - url for the api
     * @param request - request object associated with the api
     * @param includeForMeasuringLatency - boolean to enable measuring api latency
     * @example -
     * ```
     * this.handleRequestWithCircuitBreaker(url, httpRequest, true);
     * ```
     */
    private static handleRequestWithCircuitBreaker;
    /**
     *
     * @param url - url for the post api
     * @param request - request object associated with the api
     * @returns returns http response from the post api
     *
     * ```
     * @example
     * get('https://nice.dev.cxone.com/getUsers', {body: 'api_request_body'})
     * ```
     */
    static post(url: string, request: HttpRequestInit): Promise<HttpResponse>;
    /**
     *
     * @param url - url for the put api
     * @param request - request object associated with the api
     * @returns returns http response from the put api
     *
     * ```
     * @example
     * put('https://nice.dev.cxone.com/getUsers', {body: 'api_request_body'})
     * ```
     */
    static put(url: string, request: HttpRequestInit): Promise<HttpResponse>;
    /**
     *
     * @param url - url for the patch api
     * @param request - request object associated with the api
     * @returns returns http response from the patch api to update data
     *
     * ```
     * @example
     * patch('https://nice.dev.cxone.com/getUsers', {body: 'api_request_body'})
     * ```
     */
    static patch(url: string, request: HttpRequestInit): Promise<HttpResponse>;
    /**
     *
     * @param url - url for the delete api
     * @param request - request object associated with the api
     * @returns returns http response from the delete api
     *
     * ```
     * @example
     * delete('https://nice.dev.cxone.com/getUsers', {body: 'api_request_body'})
     * ```
     */
    static delete(url: string, request: HttpRequestInit): Promise<HttpResponse>;
    /**
     *
     * @param response$ - Http response object
     * @param retryOptions - retry mechanism for failure scenarios
     * @returns - handled response after api processing
     * ```
     * @example
     * const resp = this.handleResponse({status: 200, statusText: 'OK'}, {maxRetryAttempts: 3, retryInterval: 1000});
     * ```
     */
    static handleResponse(response$: Observable<Response>, retryOptions?: RetryOptions): Observable<any>;
    /**
     * Gets blob data from given url
     * @param url - url for the api
     * @param request - request object associated with the api
     * @returns returns response from the get api
     * @example
     * ```
     * getBlob(attachment.securedPermanentUrl, reqInit)
     * ```
     */
    static getBlob(url: string, request: HttpRequestInit): Promise<HttpResponse>;
    /**
     * Executes a controlled GET request with optional abort, delay, and latency tracking.
     * @param manager - RequestManager instance to manage the request lifecycle
     * @param uniqueKey - Unique identifier for the request
     * @param url - URL for the GET request
     * @param requestInit - HTTP request initialization options
     * @returns Promise resolving to HttpResponse
     * @example
     * ```
     * const response = HttpClient.controlledGet(
     *   requestManager,
     *   'unique-key-123',
     *   'https://api.example.com/data',
     *   { headers: { 'Authorization': 'Bearer token' } },
     * );
     * ```
     */
    static controlledGet(manager: RequestManager, options: {
        uniqueKey: string;
        url: string;
        requestInit: HttpRequestInit;
        debugLabel: string;
        requestType: RequestControlMode;
        delayTime?: number;
    }): Promise<HttpResponse>;
}
