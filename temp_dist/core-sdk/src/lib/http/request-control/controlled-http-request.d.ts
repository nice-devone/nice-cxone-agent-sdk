import { RequestControlMode } from '@nice-devone/common-sdk';
import { ManagedRequest } from '../model/managed-request';
/**
 * Default implementation of ManagedRequest for managing HTTP request lifecycle and cancellation.
 */
export declare class ControlledHttpRequest implements ManagedRequest {
    id: string;
    createdAt: number;
    requestType: RequestControlMode;
    private controller;
    private abortedInternal;
    private readonly logger;
    /**
     * Private constructor for controlled http request
     * @example const request = new ControlledHttpRequest(requestType)
     */
    constructor(requestType: RequestControlMode);
    /**
     * Gets the AbortSignal associated with this request.
     * @example
     * ```
     * const managedRequest = new ControlledHttpRequest(requestType);
     * fetch(url, { signal: managedRequest.signal });
     * ```
     */
    get signal(): AbortSignal;
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
    get aborted(): boolean;
    /**
     * Aborts the request with an optional reason.
     * @param reason - The reason for aborting the request.
     * @example
     * ```
     * const managedRequest = new ControlledHttpRequest(requestType);
     * managedRequest.abort('user_cancelled');
     * ```
     */
    abort(reason?: string): void;
}
