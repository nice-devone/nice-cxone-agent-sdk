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
/**
 * Position of a journey checkpoint within a customer journey, used for SLO/SLI
 * tracking. 'start' and 'terminal' mark the journey's first and last checkpoints;
 * 'hop_start'/'hop_end' bracket each intermediate hop.
 */
export declare type JourneyRole = 'start' | 'hop_start' | 'hop_end' | 'terminal';
/**
 * A single journey-checkpoint telemetry entry, forwarded via Logger.journey()/
 * CcfLogger.journey() to the console.__cxaJourneyCheckpoint hook installed by
 * grafanaInit(), independent of the configured LogLevel.
 */
export interface JourneyLogEntry {
    /**
     * @remarks - Unique identifier of this journey instance (e.g. a case ID, a session
     * ID, or any other correlation ID), generic across whatever the journey tracks.
     */
    journeyId: string;
    /**
     * @remarks - Name of the journey being tracked (e.g. 'digital-contact').
     */
    journeyName: string;
    /**
     * @remarks - Named checkpoint within the journey (e.g. 'agent-assigned').
     */
    journeyPoint: string;
    /**
     * @remarks - Position of this checkpoint within the journey; see JourneyRole.
     */
    role: JourneyRole;
    /**
     * @remarks - Outcome status of this checkpoint (e.g. 'success', 'failure').
     */
    status: string;
}
export {};
