import { ManagedRequest } from './managed-request';
import { Delay } from './delay';
export interface RequestTrackerEntry extends Delay {
    /**
     * @remarks - Timestamp when the request was first registered in the tracker. Used for cleanup of stale request entries based on TTL.
     */
    firstSeen: number;
    /**
     * @remarks - Number of times this request has been revisited. Helps determine when to delay or abort based on request lifecycle.
     */
    seenCount: number;
    /**
     * @remarks - The current ManagedRequest instance associated with this tracker entry. Updated whenever a new request is executed for the same key.
     */
    request: ManagedRequest;
}
