"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneLeaderElector = void 0;
const broadcast_channel_1 = require("broadcast-channel");
const rxjs_1 = require("rxjs");
/**
 * Handles leader election mechanism for browser
 */
class CXoneLeaderElector {
    /**
     * Constructor to create singleton instance of CXoneLeaderElector
     */
    constructor() {
        this.isActiveLeader = false;
        this.onLeaderChanged = new rxjs_1.Subject();
        this.leaderChannel = new broadcast_channel_1.BroadcastChannel('cxone-agent-leader');
        this.elector = (0, broadcast_channel_1.createLeaderElection)(this.leaderChannel, {
            fallbackInterval: 25000,
            responseTime: 1000,
        });
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
        if (!CXoneLeaderElector.singleton) {
            CXoneLeaderElector.singleton = new CXoneLeaderElector();
        }
        return CXoneLeaderElector.singleton;
    }
    /**
     * Provides leader election mechanism for within multiple browser instances
     * @example
     * ```
     * CXoneLeaderElector.instance.start();
     * ```
     */
    start() {
        if (this.isActiveLeader) {
            this.onLeaderChanged.next(this.isActiveLeader);
        }
        this.elector.awaitLeadership().then(() => {
            this.isActiveLeader = true;
            this.onLeaderChanged.next(this.isActiveLeader);
        });
    }
    /**
     * Checks if instance is leader or not
     * @example
     * ```
     * const isLeader = this.isActiveLeader;
     * ```
     */
    get isLeader() {
        return this.isActiveLeader;
    }
}
exports.CXoneLeaderElector = CXoneLeaderElector;
//# sourceMappingURL=cxone-leader-elector.js.map