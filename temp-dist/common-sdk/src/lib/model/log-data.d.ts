interface LogData {
    userId: string;
}
export interface ContactLog extends LogData {
    contactType: string;
    contactId: string;
    isInbound: boolean;
}
export interface AgentLog extends LogData {
    agentId: string;
    agentState: string;
}
export interface SkillLog extends LogData {
    skillId: string;
    skillName: string;
    mediaType: string;
}
export {};
