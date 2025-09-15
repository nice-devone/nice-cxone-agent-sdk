"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBus = void 0;
const broadcast_channel_1 = require("broadcast-channel");
const rxjs_1 = require("rxjs");
/**
 * Message bus to handle data broadcast
 */
class MessageBus {
    /**
     * Constructor to create singleton instance of CXoneLeaderElector
     */
    constructor() {
        this.onRequestMessage = new rxjs_1.Subject();
        this.onResponseMessage = new rxjs_1.Subject();
        this.requestChannel = new broadcast_channel_1.BroadcastChannel('cxone-request-channel');
        this.responseChannel = new broadcast_channel_1.BroadcastChannel('cxone-response-channel');
        this.requestChannel.onmessage = (msg) => {
            this.onRequestMessage.next(msg);
        };
        this.responseChannel.onmessage = (msg) => {
            this.onResponseMessage.next(msg);
        };
    }
    /**
     *
     * Static method to control the access of the singleton instance.
     * @example
     * ```
     * const leaderElection = CXoneLeaderElector.instance;
     * ```
     */
    static get instance() {
        if (!MessageBus.singleton) {
            MessageBus.singleton = new MessageBus();
        }
        return MessageBus.singleton;
    }
    /**
     * Posts data to request data channel
     * @param msg - message to be posted
     * @example
     * ```
     * CXoneLeaderElector.instance.postRequest(msg);
     * ```
     */
    postRequest(msg) {
        this.requestChannel.postMessage(msg);
    }
    /**
     * Posts data to response data channel
     * @param msg - message to be posted
     * @example
     * ```
     * CXoneLeaderElector.instance.postResponse(msg);
     * ```
     */
    postResponse(msg) {
        this.responseChannel.postMessage(msg);
    }
}
exports.MessageBus = MessageBus;
//# sourceMappingURL=message-bus.js.map