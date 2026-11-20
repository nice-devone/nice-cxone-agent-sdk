export interface UserInfo {
    tenantId: string;
    tenant?: string;
    icAgentId: string;
    icBUId: string;
    userName: string;
    icClusterId: string;
    userId: string;
    firstName: string;
    lastName: string;
    /** ACD numeric team id (from whoami) or User Hub team GUID (from the users api) */
    teamId?: number | string;
    digitalUserId?: number;
    digitalBrandId?: number;
}
