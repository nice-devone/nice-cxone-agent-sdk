import { AgentStateResponse } from '@nice-devone/common-sdk';
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
    /** Full agent record from IndexedDB, keyed by agentId, populated by `CXoneSkillAgentsProvider.syncSkillAgentsWithIdbAgentData` */
    idbAgentData?: AgentStateResponse;
}
/**
 * Request parameters for fetching agents assigned to a skill.
 * Mirrors the `TeamsAgentRequest` pattern used by `TeamService`.
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
    /** Total number of records available across all pages */
    totalRecords: number;
    /** Array of agent-skill assignments for the current page */
    agentSkillAssignments: SkillAgentAssignment[];
    /** Whether the API has more pages to fetch, computed as `currentPageSize < totalRecords` in the provider */
    shouldFetchMoreAgents?: boolean;
}
