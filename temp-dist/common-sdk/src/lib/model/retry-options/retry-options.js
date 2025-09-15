"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryOptions = void 0;
/** class to define retry param for error scenarios*/
class RetryOptions {
    /**
     * initializes maximumAttempts and retry interval for retry scenarios
     * ```
     * @example
     * this.maxRetryAttempts = 3;
     * this.retryInterval = 1000;
     * ```
     */
    constructor() {
        this.maxRetryAttempts = 3;
        this.retryInterval = 1000;
    }
    /**
     * defines default http return method
     * @returns - RetryOptions object
     *
     * ```
     * @example
     * default()
     * ```
     */
    static default() {
        return new RetryOptions();
    }
}
exports.RetryOptions = RetryOptions;
//# sourceMappingURL=retry-options.js.map