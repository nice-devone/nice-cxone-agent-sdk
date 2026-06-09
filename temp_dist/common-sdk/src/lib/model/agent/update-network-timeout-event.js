"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNetworkTimeoutEvent = void 0;
/**
 * This is overlay offline network class event for timeout
 */
class UpdateNetworkTimeoutEvent {
    /**
     * This method to parse the data codes passed from the adapter.
     * @param data -
     * @example -
     * ```
     *parseData(data);
     * ```
     */
    parseData(data) {
        this.retryStatus = data.retryStatus;
        this.totalNetworkRequestExecuted = parseInt(data.totalNetworkRequestExecuted);
    }
}
exports.UpdateNetworkTimeoutEvent = UpdateNetworkTimeoutEvent;
//# sourceMappingURL=update-network-timeout-event.js.map