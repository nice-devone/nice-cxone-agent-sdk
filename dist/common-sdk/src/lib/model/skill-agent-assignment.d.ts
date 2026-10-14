import { AgentStateResponse } from './agent-state-response';
/**
 * Represents a single agent-skill assignment returned by the CMA v16.0 skills/agents API.
 */
export interface SkillAgentAssignment {
    /** Unique agent identifier */
    agentId: number;
    /** Agent display name in "LastName, FirstName" format from CMA API */
    agentName: string;
    /** Whether the assignment is currently active */
    isActive: boolean;
    /** ISO-8601 timestamp of the last update to this assignment */
    lastUpdateTime?: string;
    /** Media type identifier (e.g. 4 for phone) */
    mediaType?: number;
    /** Human-readable media type name */
    mediaTypeName?: string;
    /** Optional skill proficiency label */
    proficiencyName?: string;
    /** Skill identifier this assignment belongs to */
    skillId: number;
    /** Human-readable skill name */
    skillName?: string;
    /** Full agent record from IndexedDB, populated by `CXoneSkillAgentsProvider.syncSkillAgentsWithIdbAgentData` */
    idbAgentData?: AgentStateResponse;
}
/**
 * Request parameters for fetching agents assigned to a skill.
 */
export interface SkillAgentRequest {
    /** The skill identifier to fetch agents for */
    skillId: number;
    /** Number of records to skip for pagination (maps to `skip`) */
    startIndex?: number;
    /** Page size (maps to `top`) */
    recordsToLoad?: number;
    /** Optional search string to filter agents by name */
    searchString?: string;
    /** ISO-8601 timestamp; only records updated after this time are returned */
    updatedSince?: string;
}
/**
 * Paginated response envelope for the CMA v16.0 skills/agents GET endpoint.
 */
export interface SkillAgentsApiResponse {
    /** Total number of records available */
    totalRecords: number;
    /** Array of agent-skill assignments for the current page */
    agentSkillAssignments: SkillAgentAssignment[];
    /** Whether there are more agents to load */
    shouldFetchMoreAgents?: boolean;
    /** ISO-8601 server timestamp from the API response, used as `updatedSince` on the next poll tick */
    lastPollTime?: string;
}
