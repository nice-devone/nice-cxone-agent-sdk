// src/api/SkillsApi.ts
import { ApiClient } from './ApiClient';
import { ApiResponse, RequestOptions, PaginatedResponse } from '../types/api.types';
import { Skill } from '../types/skill.types';

/**
 * SkillsApi — manages agent skills / queues.
 * Maps to CXone skill and routing endpoints.
 */
export class SkillsApi {
  private readonly BASE = '/skills';

  constructor(private client: ApiClient) {}

  /** List all skills (optionally filter by agentId, isOutbound) */
  async list(
    params?: { page?: number; per_page?: number; agentId?: string; isOutbound?: boolean; mediaType?: string },
    options?: RequestOptions
  ): Promise<ApiResponse<PaginatedResponse<Skill>>> {
    return this.client.get<PaginatedResponse<Skill>>(this.BASE, {
      ...options,
      params: params as Record<string, string | number | boolean>,
    });
  }

  /** Get a skill by ID */
  async getById(skillId: string, options?: RequestOptions): Promise<ApiResponse<Skill>> {
    return this.client.get<Skill>(`${this.BASE}/${skillId}`, options);
  }

  /** Get skills for a specific agent */
  async getByAgentId(agentId: string, options?: RequestOptions): Promise<ApiResponse<Skill[]>> {
    return this.client.get<Skill[]>(`/agents/${agentId}/skills`, options);
  }

  /** Assign a skill to an agent */
  async assignToAgent(
    agentId: string,
    skillId: string,
    options?: RequestOptions
  ): Promise<ApiResponse<void>> {
    return this.client.post<void>(`/agents/${agentId}/skills`, { skillId }, options);
  }

  /** Unassign a skill from an agent */
  async unassignFromAgent(
    agentId: string,
    skillId: string,
    options?: RequestOptions
  ): Promise<ApiResponse<void>> {
    return this.client.delete<void>(`/agents/${agentId}/skills/${skillId}`, options);
  }
}
