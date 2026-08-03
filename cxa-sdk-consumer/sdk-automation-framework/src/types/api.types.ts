// src/types/api.types.ts

/** HTTP Methods supported by the SDK */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/** Generic API Response wrapper */
export interface ApiResponse<T = unknown> {
  status: number;
  headers: Record<string, string>;
  body: T;
  ok: boolean;
  duration: number;
}

/** Request options for SDK API calls */
export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
  retries?: number;
  failOnStatusCode?: boolean;
}

/** Auth token response */
export interface AuthTokenResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
  scope?: string;
}

/** Pagination metadata */
export interface PaginationMeta {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

/** Paginated response */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/** API Error response */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp?: string;
}

/** SDK User model */
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'admin' | 'editor' | 'viewer';

/** Create user payload */
export interface CreateUserPayload {
  email: string;
  name: string;
  role: UserRole;
  password?: string;
}

/** Update user payload */
export interface UpdateUserPayload {
  name?: string;
  role?: UserRole;
  status?: 'active' | 'inactive';
}

/** Generic SDK Resource */
export interface Resource {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
