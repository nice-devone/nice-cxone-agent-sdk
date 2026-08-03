// src/utils/Assertions.ts
import { expect } from '@playwright/test';
import { ApiResponse } from '../types/api.types';

/**
 * Custom assertion helpers that wrap Playwright's expect()
 * with domain-specific, readable error messages.
 */
export class Assertions {
  /** Assert response is 2xx */
  static assertSuccess<T>(response: ApiResponse<T>, message?: string): void {
    expect(response.ok, message ?? `Expected 2xx but got ${response.status}`).toBe(true);
  }

  /** Assert specific status code */
  static assertStatus<T>(response: ApiResponse<T>, expected: number): void {
    expect(response.status, `Expected status ${expected} but got ${response.status}`).toBe(expected);
  }

  /** Assert status is 200 */
  static assertOk<T>(response: ApiResponse<T>): void {
    this.assertStatus(response, 200);
  }

  /** Assert status is 201 Created */
  static assertCreated<T>(response: ApiResponse<T>): void {
    this.assertStatus(response, 201);
  }

  /** Assert status is 204 No Content */
  static assertNoContent<T>(response: ApiResponse<T>): void {
    this.assertStatus(response, 204);
  }

  /** Assert status is 400 Bad Request */
  static assertBadRequest<T>(response: ApiResponse<T>): void {
    this.assertStatus(response, 400);
  }

  /** Assert status is 401 Unauthorized */
  static assertUnauthorized<T>(response: ApiResponse<T>): void {
    this.assertStatus(response, 401);
  }

  /** Assert status is 403 Forbidden */
  static assertForbidden<T>(response: ApiResponse<T>): void {
    this.assertStatus(response, 403);
  }

  /** Assert status is 404 Not Found */
  static assertNotFound<T>(response: ApiResponse<T>): void {
    this.assertStatus(response, 404);
  }

  /** Assert status is 422 Unprocessable Entity */
  static assertUnprocessable<T>(response: ApiResponse<T>): void {
    this.assertStatus(response, 422);
  }

  /** Assert response has a body with an id field */
  static assertHasId(body: unknown): void {
    expect(body).toHaveProperty('id');
    expect(typeof (body as Record<string, unknown>).id).toBe('string');
  }

  /** Assert response time is within a threshold (ms) */
  static assertResponseTime<T>(response: ApiResponse<T>, maxMs: number): void {
    expect(
      response.duration,
      `Expected response time ≤${maxMs}ms but got ${response.duration}ms`
    ).toBeLessThanOrEqual(maxMs);
  }

  /** Assert a response body matches a partial schema */
  static assertSchema<T extends object>(body: T, requiredKeys: (keyof T)[]): void {
    for (const key of requiredKeys) {
      const hasKey = Object.prototype.hasOwnProperty.call(body, key);
      expect(hasKey, `Response body missing required key: ${String(key)}`).toBe(true);
    }
  }

  /** Assert a paginated response has the expected shape */
  static assertPaginated(body: unknown): void {
    expect(body).toHaveProperty('data');
    expect(body).toHaveProperty('meta');
    const meta = (body as Record<string, unknown>).meta as Record<string, unknown>;
    expect(meta).toHaveProperty('page');
    expect(meta).toHaveProperty('total');
    expect(Array.isArray((body as Record<string, unknown>).data)).toBe(true);
  }
}
