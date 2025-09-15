export interface AgentState {
    state: string;
    reason: string;
    isACW?: boolean;
    skillName?: string;
    isPersonalConnection?: boolean;
    cxoneState?: string;
}
export interface AgentCurrentState extends AgentState {
    startTime: number;
    acwTimeout: number;
}
