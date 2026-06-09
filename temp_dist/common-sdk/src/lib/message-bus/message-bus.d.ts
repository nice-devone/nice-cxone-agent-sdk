import { Subject } from 'rxjs';
import { Message } from '../model/message-bus/message';
/**
 * Message bus to handle data broadcast
 */
export declare class MessageBus {
    private requestChannel;
    private responseChannel;
    onRequestMessage: Subject<Message>;
    onResponseMessage: Subject<Message>;
    private static singleton;
    /**
     * Constructor to create singleton instance of CXoneLeaderElector
     */
    private constructor();
    /**
     *
     * Static method to control the access of the singleton instance.
     * @example
     * ```
     * const leaderElection = CXoneLeaderElector.instance;
     * ```
     */
    static get instance(): MessageBus;
    /**
     * Posts data to request data channel
     * @param msg - message to be posted
     * @example
     * ```
     * CXoneLeaderElector.instance.postRequest(msg);
     * ```
     */
    postRequest(msg: Message): void;
    /**
     * Posts data to response data channel
     * @param msg - message to be posted
     * @example
     * ```
     * CXoneLeaderElector.instance.postResponse(msg);
     * ```
     */
    postResponse(msg: Message): void;
}
