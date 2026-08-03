// src/api/UsersApi.ts
import { ApiClient } from './ApiClient';
import {
  User,
  CreateUserPayload,
  UpdateUserPayload,
  PaginatedResponse,
  ApiResponse,
  RequestOptions,
} from '../types/api.types';

/**
 * Users API — CRUD operations for user management endpoints.
 */
export class UsersApi {
  private readonly BASE = '/users';

  constructor(private client: ApiClient) {}

  /** List all users (paginated) */
  async list(
    params?: { page?: number; per_page?: number; role?: string; status?: string },
    options?: RequestOptions
  ): Promise<ApiResponse<PaginatedResponse<User>>> {
    return this.client.get<PaginatedResponse<User>>(this.BASE, {
      ...options,
      params: params as Record<string, string | number | boolean>,
    });
  }

  /** Get a user by ID */
  async getById(id: string, options?: RequestOptions): Promise<ApiResponse<User>> {
    return this.client.get<User>(`${this.BASE}/${id}`, options);
  }

  /** Create a new user */
  async create(payload: CreateUserPayload, options?: RequestOptions): Promise<ApiResponse<User>> {
    return this.client.post<User>(this.BASE, payload, options);
  }

  /** Update a user */
  async update(id: string, payload: UpdateUserPayload, options?: RequestOptions): Promise<ApiResponse<User>> {
    return this.client.patch<User>(`${this.BASE}/${id}`, payload, options);
  }

  /** Replace a user (full update) */
  async replace(id: string, payload: CreateUserPayload, options?: RequestOptions): Promise<ApiResponse<User>> {
    return this.client.put<User>(`${this.BASE}/${id}`, payload, options);
  }

  /** Delete a user */
  async delete(id: string, options?: RequestOptions): Promise<ApiResponse<void>> {
    return this.client.delete<void>(`${this.BASE}/${id}`, options);
  }

  /** Get the currently authenticated user */
  async me(options?: RequestOptions): Promise<ApiResponse<User>> {
    return this.client.get<User>(`${this.BASE}/me`, options);
  }

  /** Bulk delete users */
  async bulkDelete(ids: string[], options?: RequestOptions): Promise<ApiResponse<{ deleted: number }>> {
    return this.client.post<{ deleted: number }>(`${this.BASE}/bulk-delete`, { ids }, options);
  }
}
