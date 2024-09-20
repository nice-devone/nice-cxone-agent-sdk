export interface AgentDetails {
    agentId: number;
    firstName: string;
    lastName: string;
    maxConcurrentChats?: number;
    useTeamMaxConcurrentChats?: boolean;
    maxEmailAutoParkingLimit?: number;
    useTeamEmailAutoParkingLimit?: boolean;
    phoneRefusalTimeout?: number;
}
