// src/api/AgentSessionApi.ts
import { ApiClient } from './ApiClient';
import { ApiResponse, RequestOptions } from '../types/api.types';
import { AgentSession, AgentState, StartSessionPayload, EndSessionPayload } from '../types/session.types';

/**
 * AgentSessionApi — manages agent session lifecycle and state.
 * Maps to CXone ACD session endpoints.
 */
export class AgentSessionApi {
  private readonly BASE = '/agent-sessions';

  constructor(private client: ApiClient) {}

  /** Start a new agent session */
  async startSession(payload: StartSessionPayload, options?: RequestOptions): Promise<ApiResponse<AgentSession>> {
    return this.client.post<AgentSession>(this.BASE, payload, options);
  }

  /** Join an existing agent session */
  async joinSession(options?: RequestOptions): Promise<ApiResponse<AgentSession>> {
    return this.client.post<AgentSession>(`${this.BASE}/join`, undefined, options);
  }

  /** End the current agent session */
  async endSession(payload?: EndSessionPayload, options?: RequestOptions): Promise<ApiResponse<void>> {
    return this.client.post<void>(`${this.BASE}/end`, payload, options);
  }

  /** Get current session info */
  async getCurrentSession(options?: RequestOptions): Promise<ApiResponse<AgentSession>> {
    return this.client.get<AgentSession>(`${this.BASE}/current`, options);
  }

  /** Get current agent state */
  async getAgentState(options?: RequestOptions): Promise<ApiResponse<AgentState>> {
    return this.client.get<AgentState>(`${this.BASE}/state`, options);
  }

  /** Set agent state (e.g., available, unavailable, etc.) */
  async setAgentState(
    state: string,
    reason?: string,
    options?: RequestOptions
  ): Promise<ApiResponse<AgentState>> {
    return this.client.post<AgentState>(`${this.BASE}/state`, { state, reason }, options);
  }

  /** Dial the agent leg (connect WebRTC) */
  async dialAgentLeg(options?: RequestOptions): Promise<ApiResponse<void>> {
    return this.client.post<void>(`${this.BASE}/agent-leg`, undefined, options);
  }
}
