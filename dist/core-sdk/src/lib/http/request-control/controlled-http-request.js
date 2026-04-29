import { Logger } from '../../../logger/logger';
/**
 * Default implementation of ManagedRequest for managing HTTP request lifecycle and cancellation.
 */
export class ControlledHttpRequest {
    /**
     * Private constructor for controlled http request
     * @example const request = new ControlledHttpRequest(requestType)
     */
    constructor(requestType) {
        this.id = crypto.randomUUID();
        this.createdAt = Date.now();
        this.controller = new AbortController();
        this.abortedInternal = false;
        this.logger = new Logger('SDK', 'ControlledHttpRequest');
        this.requestType = requestType;
    }
    /**
     * Gets the AbortSignal associated with this request.
     * @example
     * ```
     * const managedRequest = new ControlledHttpRequest(requestType);
     * fetch(url, { signal: managedRequest.signal });
     * ```
     */
    get signal() {
        return this.controller.signal;
    }
    /**
     * Gets whether this request has been aborted.
     * @example
     * ```
     * const managedRequest = new ControlledHttpRequest(requestType);
     * if (managedRequest.aborted) {
     *   console.log('Request was aborted');
     * }
     * ```
     */
    get aborted() {
        return this.abortedInternal;
    }
    /**
     * Aborts the request with an optional reason.
     * @param reason - The reason for aborting the request.
     * @example
     * ```
     * const managedRequest = new ControlledHttpRequest(requestType);
     * managedRequest.abort('user_cancelled');
     * ```
     */
    abort(reason) {
        if (!this.abortedInternal) {
            this.abortedInternal = true;
            this.logger.debug('abort', `Request aborted → reason: ${reason !== null && reason !== void 0 ? reason : 'unknown'}`);
            this.controller.abort(reason);
        }
    }
}
//# sourceMappingURL=controlled-http-request.js.map