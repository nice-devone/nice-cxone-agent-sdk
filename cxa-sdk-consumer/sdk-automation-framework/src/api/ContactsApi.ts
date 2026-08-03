// src/api/ContactsApi.ts
import { ApiClient } from './ApiClient';
import { ApiResponse, RequestOptions, PaginatedResponse } from '../types/api.types';
import {
  Contact,
  CreateContactPayload,
  UpdateContactPayload,
  ContactNote,
} from '../types/contact.types';

/**
 * ContactsApi — CRUD + actions for voice and digital contacts.
 * Maps to CXone contact/session management endpoints.
 */
export class ContactsApi {
  private readonly BASE = '/contacts';

  constructor(private client: ApiClient) {}

  /** List contacts (paginated), optionally filtered by status or type */
  async list(
    params?: { page?: number; per_page?: number; status?: string; type?: string; agentId?: string },
    options?: RequestOptions
  ): Promise<ApiResponse<PaginatedResponse<Contact>>> {
    return this.client.get<PaginatedResponse<Contact>>(this.BASE, {
      ...options,
      params: params as Record<string, string | number | boolean>,
    });
  }

  /** Get a single contact by ID */
  async getById(contactId: string, options?: RequestOptions): Promise<ApiResponse<Contact>> {
    return this.client.get<Contact>(`${this.BASE}/${contactId}`, options);
  }

  /** Create (initiate) a new contact */
  async create(payload: CreateContactPayload, options?: RequestOptions): Promise<ApiResponse<Contact>> {
    return this.client.post<Contact>(this.BASE, payload, options);
  }

  /** Update a contact's metadata */
  async update(
    contactId: string,
    payload: UpdateContactPayload,
    options?: RequestOptions
  ): Promise<ApiResponse<Contact>> {
    return this.client.patch<Contact>(`${this.BASE}/${contactId}`, payload, options);
  }

  /** End / terminate a contact */
  async end(contactId: string, options?: RequestOptions): Promise<ApiResponse<void>> {
    return this.client.post<void>(`${this.BASE}/${contactId}/end`, undefined, options);
  }

  /** Hold a voice contact */
  async hold(contactId: string, options?: RequestOptions): Promise<ApiResponse<void>> {
    return this.client.post<void>(`${this.BASE}/${contactId}/hold`, undefined, options);
  }

  /** Resume a held voice contact */
  async resume(contactId: string, options?: RequestOptions): Promise<ApiResponse<void>> {
    return this.client.post<void>(`${this.BASE}/${contactId}/resume`, undefined, options);
  }

  /** Dial an outbound phone number */
  async dialPhone(
    payload: { skillId: string; phoneNumber: string },
    options?: RequestOptions
  ): Promise<ApiResponse<Contact>> {
    return this.client.post<Contact>(`${this.BASE}/dial`, payload, options);
  }

  /** Add a note to a contact */
  async addNote(
    contactId: string,
    note: string,
    options?: RequestOptions
  ): Promise<ApiResponse<ContactNote>> {
    return this.client.post<ContactNote>(`${this.BASE}/${contactId}/notes`, { note }, options);
  }

  /** List notes on a contact */
  async listNotes(contactId: string, options?: RequestOptions): Promise<ApiResponse<ContactNote[]>> {
    return this.client.get<ContactNote[]>(`${this.BASE}/${contactId}/notes`, options);
  }
}
