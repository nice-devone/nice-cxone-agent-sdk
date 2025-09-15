/**
* Indicates all the options required for voice quality monitor service
*/
export interface WatchRTCOptions {
    /**
     * @remarks rtcApiKey: watchRTC Api key for the integration
     */
    rtcApiKey: string;
    /**
     * @remarks rtcRoomId: agentLeg Id
     */
    rtcRoomId: string;
    /**
    * @remarks rtcPeerId: agent Id
    */
    rtcPeerId: string;
    /**
    * @remarks buID: Business Unit Id
    */
    buID: string;
    /**
    * @remarks clusterId: Cluster Id like SO32, B32
    */
    clusterId: string;
    /**
    * @remarks CXoneAgentConsoleType: Name of the consumer application ex: CXA, CXAI etc.
    */
    CXoneAgentConsoleType: string;
    /**
    * @remarks CXoneAgentConsoleVersion : Version of the consumer application ex: CX-24.2
    */
    CXoneAgentConsoleVersion: string;
}
