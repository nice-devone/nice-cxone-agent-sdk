/** class to define retry param for error scenarios*/
export declare class RetryOptions {
    maxRetryAttempts: number;
    retryInterval: number;
    /**
     * initializes maximumAttempts and retry interval for retry scenarios
     * ```
     * @example
     * this.maxRetryAttempts = 3;
     * this.retryInterval = 1000;
     * ```
     */
    constructor();
    /**
     * defines default http return method
     * @returns - RetryOptions object
     *
     * ```
     * @example
     * default()
     * ```
     */
    static default(): RetryOptions;
}
