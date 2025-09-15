import { WatchRTCOptions } from "../models/watch-rtc-options";
/**
 * Class responsible for passing the necessary information like BUId, Agent Id, Agent leg ID etc. for the watchRTC integration.
 */
export declare class WatchRTCService {
    private static singleton;
    private isWatchRTCInitialized;
    private initOptions;
    /**
      * Method to create singleton object of the class
      * ```
      * @example
      * const watchRTCService = WatchRTCService.instance;
      * ```
      */
    static get instance(): WatchRTCService;
    /**
     * construct the message for initializing the watchRTC
     */
    private getWatchRTCInitOptions;
    /**
     * construct the message for passing agent specific message to webrtc i.e agentlefid, buid, clusterid etc.
     */
    private getWatchRTCAgentOptions;
    /**
    * initialize watchRTC
    * @param options -   all the options required for voice quality monitor service
    * @example
    * ```
    * init({})
    * ```
    */
    init(options: WatchRTCOptions): void;
    /**
     * pass agentLegId to the watchRTC
     * @param agentLegId -  pass the agentleg id when ever the agent leg connection attempt is made.
     * @example updateAgentLegId(43222)
     */
    updateAgentLegId(agentLegId: string): void;
}
