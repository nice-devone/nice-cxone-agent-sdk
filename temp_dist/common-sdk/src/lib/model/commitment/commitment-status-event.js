"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommitmentStatusEvent = void 0;
/**
 * Class to capture commitment PromiseKeeperStatus event
 */
class CommitmentStatusEvent {
    /**
       * This method to parse promise keeper status event data
       * @param data -
       * @example -
       * ```
       *parse(data);
       * ```
       */
    parse(data) {
        this.status = data.Status;
    }
}
exports.CommitmentStatusEvent = CommitmentStatusEvent;
//# sourceMappingURL=commitment-status-event.js.map