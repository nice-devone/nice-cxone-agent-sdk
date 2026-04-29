import { Logger, HttpUtilService } from '@nice-devone/core-sdk';
/**
 * Request parameters for fetching attendant agent list to voicemail transfer feature
 */
export interface AttendantAgentListToVoicemailTransferRequest {
    skip: number;
    top: number;
}
/**
 * Attendant Agent item from the API response
 */
export interface AttendantAgent {
    AgentId: number;
    AttendantUserStatus: number;
    IsDirectVoicemailTransferEnabled: boolean;
}
/**
 * Response from attendant agent list API
 */
export interface Links {
    self: string;
    next: string;
    previous: string;
}
/**
 * Response from attendant agent list API
 */
export interface AttendantAgentListResponse {
    hiddenAgents: number;
    businessUnitId: number;
    agents: AttendantAgent[];
    _links: Links;
    totalRecords: number;
}
/**
 * Class to perform get Attendant Agent List
 */
export declare class AttendantAgentListService {
    protected logger: Logger;
    protected utilService: HttpUtilService;
    private auth;
    private urlUtilsService;
    /**
     * Create instance of AttendantAgentListService
     * ```
     * @example
     * const attendantAgentListService = new AttendantAgentListService();
     * ```
     */
    constructor();
    /**
     * Used to get the agent list with attendant user status
     * @param attendantAgentListUrl - optional parameter to get all paginated agents as next url
     * @example -
     * ```
     * this.agentListService.getAttendantAgentList("someNextPagintatedUrl");
     * ```
     */
    getAttendantAgentList(attendantAgentListUrl: string): Promise<AttendantAgentListResponse>;
}
