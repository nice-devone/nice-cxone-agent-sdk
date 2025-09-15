import { CXoneEvent } from './cxone-event';
/**
 * This is base class event for other events
 */
export declare abstract class CXoneAgentEvent extends CXoneEvent {
    /**
     * iis hosting event details
     */
    iisHost: string;
    /**
     * vc hosting event details
     */
    vcHost: string;
}
