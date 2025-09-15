import { __awaiter } from "tslib";
import { throwError } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';
import { HttpRequest } from '../http-request/http-request';
import { CXoneSdkError, CXoneSdkErrorType, HttpResponse, RetryOptions } from '@nice-devone/common-sdk';
import { CircuitBreaker } from '../../circuit-breaker/circuit-breaker';
import { BrokenCircuitError } from 'cockatiel';
import { Logger } from '../../../logger/logger';
import { OK_UNTIL } from '../../../constants/http-status-code';
/** Http Interface class for making api calls to backend */
export class HttpClient {
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
    static get(url, request, includeForMeasuringLatency) {
        const httpRequest = new HttpRequest('GET', request);
        return this.handleRequestWithCircuitBreaker(url, httpRequest, includeForMeasuringLatency);
    }
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
    static handleRequestWithCircuitBreaker(url, httpRequest, includeForMeasuringLatency = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let latencyInMilliseconds;
                const id = (includeForMeasuringLatency) ? crypto.randomUUID() : undefined;
                const res = yield HttpClient.circuitBreaker.execute(() => __awaiter(this, void 0, void 0, function* () {
                    if (includeForMeasuringLatency && id) {
                        this.apiNetworkPerformance.totalNumOfRequests = (this.apiNetworkPerformance.totalNumOfRequests || 0) + 1;
                        const apiNetworkRequest = {
                            id,
                            url,
                            requestTime: performance.now(),
                        };
                        if (this.apiNetworkPerformance.requests.length === this.apiNetworkPerformance.numOfSamplingRequests) {
                            this.apiNetworkPerformance.requests.shift();
                        }
                        this.apiNetworkPerformance.requests.push(apiNetworkRequest);
                    }
                    const response = yield this.handleResponse(fromFetch(url, httpRequest.toRequestInit())).toPromise();
                    if (includeForMeasuringLatency && id) {
                        const responseTime = performance.now();
                        const currentNetworkRequest = (this.apiNetworkPerformance.requests.find(({ id: currentRequestId }) => currentRequestId === id));
                        latencyInMilliseconds = responseTime - currentNetworkRequest.requestTime;
                        currentNetworkRequest.latency = latencyInMilliseconds;
                    }
                    if (response.status === 429 /* HttpStatusCode.TOO_MANY_REQUESTS */ || response.status === 503 /* HttpStatusCode.SERVICE_UNAVAILABLE */) {
                        return Promise.reject(response); // if the status code is 429 or 503 then we will consider it as a valid circuit breaker error
                    }
                    else {
                        if (includeForMeasuringLatency && id) {
                            const { requests: samplingRequests } = this.apiNetworkPerformance;
                            if (samplingRequests.length > 0) {
                                // Calculating the average of last N API latencies to determine the network speed
                                const averageLatencyInSeconds = samplingRequests.reduce((avgLatencyInSec, { latency = 0 }, currentIndex) => {
                                    avgLatencyInSec += latency;
                                    if (currentIndex === (samplingRequests.length - 1)) {
                                        avgLatencyInSec /= (samplingRequests.length * 1000);
                                    }
                                    return avgLatencyInSec;
                                }, 0);
                                this.apiNetworkPerformance.averageLatencyInSeconds = averageLatencyInSeconds;
                            }
                        }
                        return Promise.resolve(response); // else all the other status code will be a success case for circuit breaker
                    }
                }));
                if (((res === null || res === void 0 ? void 0 : res.status) >= 200 /* HttpStatusCode.OK */ && (res === null || res === void 0 ? void 0 : res.status) <= OK_UNTIL) || ((res === null || res === void 0 ? void 0 : res.status) === 304 /* HttpStatusCode.NOT_MODIFIED */)) {
                    if (includeForMeasuringLatency && id) {
                        const { averageLatencyInSeconds } = this.apiNetworkPerformance;
                        res.body.apiPerformanceMetrics = {
                            averageLatencyInSeconds,
                        };
                    }
                    return Promise.resolve(res);
                }
                else {
                    return Promise.reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'API Error', res));
                }
                ;
            }
            catch (e) {
                if (e instanceof BrokenCircuitError) {
                    HttpClient.logger.error('handleRequestWithCircuitBreaker', 'Circuit breaker is in open state due to which ***SERVICE IS UNAVAILABLE***' + JSON.stringify(e));
                    return Promise.reject(new CXoneSdkError(CXoneSdkErrorType.CIRCUIT_OPEN, 'Service unavailable as circuit breaker is in open state'));
                }
                else {
                    return Promise.reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'API Error'));
                }
            }
        });
    }
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
    static post(url, request) {
        const httpRequest = new HttpRequest('POST', request);
        return this.handleRequestWithCircuitBreaker(url, httpRequest);
    }
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
    static put(url, request) {
        const httpRequest = new HttpRequest('PUT', request);
        return this.handleRequestWithCircuitBreaker(url, httpRequest);
    }
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
    static patch(url, request) {
        const httpRequest = new HttpRequest('PATCH', request);
        return this.handleRequestWithCircuitBreaker(url, httpRequest);
    }
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
    static delete(url, request) {
        const httpRequest = new HttpRequest('DELETE', request);
        return this.handleRequestWithCircuitBreaker(url, httpRequest);
    }
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
    static handleResponse(response$, retryOptions) {
        retryOptions = retryOptions || RetryOptions.default();
        return response$.pipe(switchMap((response) => {
            return new Promise((resolve) => {
                response.text().then((text) => {
                    if (response.status >= 400 && retryOptions && retryOptions.maxRetryAttempts > 0) {
                        const retryAfter = Number(response.headers['Retry-After']);
                        const retryInterval = retryAfter ? retryAfter * 1000 : retryOptions.retryInterval;
                        setTimeout(() => {
                            return this.handleResponse(response$, retryOptions);
                        }, retryInterval);
                        retryOptions.maxRetryAttempts--;
                    }
                    let data;
                    try {
                        data = JSON.parse(text);
                    }
                    catch (err) {
                        data = {};
                        HttpClient.logger.error('handleResponse', 'Exception while parsing JSON response' + err);
                    }
                    const httpResp = new HttpResponse(response, data);
                    resolve(httpResp);
                });
            });
        }), catchError((e) => {
            // handle e and return a safe value or re-throw
            // if (isCritical(e)) {
            return throwError(e);
            // }
            // return of([]);
        }));
    }
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
    static getBlob(url, request) {
        const httpRequest = new HttpRequest('GET', request);
        return new Promise((resolve, reject) => {
            fromFetch(url, httpRequest.toRequestInit()).toPromise().then((response) => {
                if ((response === null || response === void 0 ? void 0 : response.status) === 200 /* HttpStatusCode.OK */) {
                    response === null || response === void 0 ? void 0 : response.blob().then((blob) => {
                        const httpResp = new HttpResponse(response, blob);
                        resolve(httpResp);
                    });
                }
                else {
                    reject(response);
                }
            }, (err) => {
                reject(err);
            });
        });
    }
}
HttpClient.circuitBreaker = new CircuitBreaker().breaker;
HttpClient.logger = new Logger('SDK', 'HttpClient');
//# sourceMappingURL=http-client.js.map