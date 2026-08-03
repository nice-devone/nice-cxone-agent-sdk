// src/api/DigitalApi.ts
import { ApiClient } from './ApiClient';
import { ApiResponse, RequestOptions, PaginatedResponse } from '../types/api.types';
import { DigitalContact, DigitalMessage, DigitalReplyPayload, DigitalChannel } from '../types/digital.types';

/**
 * DigitalApi — manages digital engagement endpoints.
 * Maps to CXone digital contact/channel/message endpoints.
 */
export class DigitalApi {
  private readonly BASE = '/digital';

  constructor(private client: ApiClient) {}

  // ── Contacts ──────────────────────────────────────────────────────────

  /** List digital contacts */
  async listContacts(
    params?: { page?: number; per_page?: number; status?: string; channelId?: string },
    options?: RequestOptions
  ): Promise<ApiResponse<PaginatedResponse<DigitalContact>>> {
    return this.client.get<PaginatedResponse<DigitalContact>>(`${this.BASE}/contacts`, {
      ...options,
      params: params as Record<string, string | number | boolean>,
    });
  }

  /** Get a digital contact by case ID */
  async getContactByCaseId(caseId: string, options?: RequestOptions): Promise<ApiResponse<DigitalContact>> {
    return this.client.get<DigitalContact>(`${this.BASE}/contacts/${caseId}`, options);
  }

  // ── Messages ──────────────────────────────────────────────────────────

  /** Get messages for a digital contact */
  async getMessages(caseId: string, options?: RequestOptions): Promise<ApiResponse<DigitalMessage[]>> {
    return this.client.get<DigitalMessage[]>(`${this.BASE}/contacts/${caseId}/messages`, options);
  }

  /** Send a reply on a digital contact */
  async reply(
    caseId: string,
    channelId: string,
    payload: DigitalReplyPayload,
    options?: RequestOptions
  ): Promise<ApiResponse<DigitalMessage>> {
    return this.client.post<DigitalMessage>(
      `${this.BASE}/contacts/${caseId}/messages`,
      { ...payload, channelId },
      options
    );
  }

  // ── Channels ──────────────────────────────────────────────────────────

  /** List available digital channels */
  async listChannels(options?: RequestOptions): Promise<ApiResponse<DigitalChannel[]>> {
    return this.client.get<DigitalChannel[]>(`${this.BASE}/channels`, options);
  }

  /** Get a specific channel by ID */
  async getChannel(channelId: string, options?: RequestOptions): Promise<ApiResponse<DigitalChannel>> {
    return this.client.get<DigitalChannel>(`${this.BASE}/channels/${channelId}`, options);
  }
}
