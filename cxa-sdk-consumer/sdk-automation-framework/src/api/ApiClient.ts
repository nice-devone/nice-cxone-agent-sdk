// src/api/ApiClient.ts
import { APIRequestContext } from '@playwright/test';
import { ApiResponse, RequestOptions, HttpMethod } from '../types/api.types';
import { Logger } from '../utils/Logger';

/**
 * Core API Client wrapping Playwright's APIRequestContext.
 * Provides retry logic, logging, response normalization, and auth injection.
 */
export class ApiClient {
  protected readonly request: APIRequestContext;
  protected readonly baseURL: string;
  protected authToken?: string;
  private readonly logger: Logger;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL.replace(/\/$/, ''); // strip trailing slash
    this.logger = Logger.getInstance();
  }

  /** Inject a Bearer token for all subsequent requests */
  setAuthToken(token: string): void {
    this.authToken = token;
    this.logger.debug('Auth token set on ApiClient');
  }

  /** Clear the auth token */
  clearAuthToken(): void {
    this.authToken = undefined;
  }

  /** Build full URL from a relative path */
  protected buildURL(path: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(`${this.baseURL}${path}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    return url.toString();
  }

  /** Build common headers, merging auth token if present */
  protected buildHeaders(extra?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }
    return { ...headers, ...extra };
  }

  /**
   * Core request method with retry support.
   */
  async send<T = unknown>(
    method: HttpMethod,
    path: string,
    options: RequestOptions & { body?: unknown } = {}
  ): Promise<ApiResponse<T>> {
    const { headers, params, timeout = 30_000, retries = 0, failOnStatusCode = false, body } = options;

    const url = this.buildURL(path, params);
    const mergedHeaders = this.buildHeaders(headers);

    let attempt = 0;
    let lastError: Error | undefined;

    while (attempt <= retries) {
      const start = Date.now();
      try {
        this.logger.info(`[${method}] ${url} (attempt ${attempt + 1})`);

        const response = await this.request.fetch(url, {
          method,
          headers: mergedHeaders,
          data: body !== undefined ? JSON.stringify(body) : undefined,
          timeout,
          failOnStatusCode,
        });

        const duration = Date.now() - start;
        const status = response.status();
        const responseHeaders = response.headers();

        let parsed: T;
        const contentType = responseHeaders['content-type'] || '';
        if (contentType.includes('application/json')) {
          parsed = (await response.json()) as T;
        } else {
          parsed = (await response.text()) as unknown as T;
        }

        this.logger.info(`[${method}] ${url} → ${status} (${duration}ms)`);

        return {
          status,
          headers: responseHeaders,
          body: parsed,
          ok: status >= 200 && status < 300,
          duration,
        };
      } catch (error) {
        lastError = error as Error;
        attempt++;
        if (attempt <= retries) {
          const backoff = attempt * 500;
          this.logger.warn(`Request failed, retrying in ${backoff}ms... (${attempt}/${retries})`);
          await this.sleep(backoff);
        }
      }
    }

    throw lastError ?? new Error(`Request to ${url} failed after ${retries + 1} attempts`);
  }

  // ── Convenience methods ──────────────────────────────────────────────────

  async get<T = unknown>(path: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.send<T>('GET', path, options);
  }

  async post<T = unknown>(path: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.send<T>('POST', path, { ...options, body });
  }

  async put<T = unknown>(path: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.send<T>('PUT', path, { ...options, body });
  }

  async patch<T = unknown>(path: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.send<T>('PATCH', path, { ...options, body });
  }

  async delete<T = unknown>(path: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.send<T>('DELETE', path, options);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
