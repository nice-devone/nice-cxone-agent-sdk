import { Subject } from 'rxjs';
/**
 * Handles leader election mechanism for browser
 */
export declare class CXoneLeaderElector {
    onLeaderChanged: Subject<boolean>;
    private isActiveLeader;
    private elector;
    private leaderChannel;
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
    static get instance(): CXoneLeaderElector;
    /**
     * Provides leader election mechanism for within multiple browser instances
     * @example
     * ```
     * CXoneLeaderElector.instance.start();
     * ```
     */
    start(): void;
    /**
     * Checks if instance is leader or not
     * @example
     * ```
     * const isLeader = this.isActiveLeader;
     * ```
     */
    get isLeader(): boolean;
}
