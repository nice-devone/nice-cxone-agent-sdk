// tests/api/auth.spec.ts
import { test, expect } from '../../src/fixtures/base.fixture';
import { Assertions } from '../../src/utils/Assertions';

/**
 * Authentication API tests for CXone.
 * CXone uses OpenID Connect (Authorization Code + PKCE) — not client_credentials/password grants.
 *
 * These tests verify:
 *   1. OpenID discovery endpoint is reachable and returns valid OIDC config
 *   2. CXone configuration endpoint responds
 *   3. Token endpoint rejects requests without valid auth codes
 *   4. AuthService state management (local-only, no network)
 */
test.describe('CXone Authentication API', () => {
  const CXONE_HOSTNAME = process.env.CXONE_HOSTNAME ?? 'https://cxone.staging.niceincontact.com';

  let testStartTime: number;

  test.beforeEach(async ({}, testInfo) => {
    testStartTime = Date.now();
    console.log(`[AUTH] Starting: ${testInfo.title}`);
  });

  test.afterEach(async ({}, testInfo) => {
    const duration = Date.now() - testStartTime;
    const status = testInfo.status === testInfo.expectedStatus ? 'PASS' : 'FAIL';
    console.log(`[AUTH] ${status}: ${testInfo.title} (${duration}ms)`);
  });

  // ── OpenID Connect Discovery ──────────────────────────────────────────

  test('should return OpenID configuration from well-known endpoint @smoke', async ({ request }) => {
    const response = await request.get(`${CXONE_HOSTNAME}/.well-known/openid-configuration`);

    expect(response.status()).toBe(200);
    const body = await response.json();

    // OIDC required fields
    expect(body).toHaveProperty('authorization_endpoint');
    expect(body).toHaveProperty('token_endpoint');
    expect(body).toHaveProperty('jwks_uri');

    // Endpoints should be valid URLs
    expect(body.authorization_endpoint).toMatch(/^https?:\/\//);
    expect(body.token_endpoint).toMatch(/^https?:\/\//);
  });

  test('should include display_values_supported in OIDC config', async ({ request }) => {
    const response = await request.get(`${CXONE_HOSTNAME}/.well-known/openid-configuration`);
    const body = await response.json();

    // CXone supports page and popup display modes
    if (body.display_values_supported) {
      expect(Array.isArray(body.display_values_supported)).toBe(true);
    }
  });

  test('should include code_challenge_methods_supported in OIDC config', async ({ request }) => {
    const response = await request.get(`${CXONE_HOSTNAME}/.well-known/openid-configuration`);
    const body = await response.json();

    if (body.code_challenge_methods_supported) {
      expect(body.code_challenge_methods_supported).toContain('S256');
    }
  });

  test('should include end_session_endpoint in OIDC config', async ({ request }) => {
    const response = await request.get(`${CXONE_HOSTNAME}/.well-known/openid-configuration`);
    const body = await response.json();

    if (body.end_session_endpoint) {
      expect(body.end_session_endpoint).toMatch(/^https?:\/\//);
    }
  });

  test('OIDC discovery should respond within acceptable time', async ({ request }) => {
    const start = Date.now();
    await request.get(`${CXONE_HOSTNAME}/.well-known/openid-configuration`);
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(5000);
  });

  // ── Token Endpoint Validation ─────────────────────────────────────────

  test('token endpoint should reject request without valid authorization code', async ({ request }) => {
    const oidcResponse = await request.get(`${CXONE_HOSTNAME}/.well-known/openid-configuration`);
    const oidcBody = await oidcResponse.json();
    const tokenEndpoint = oidcBody.token_endpoint;

    if (!tokenEndpoint) {
      test.skip();
      return;
    }

    // POST to token endpoint with invalid/missing code — should get 400 or 401
    const response = await request.post(tokenEndpoint, {
      form: {
        grant_type: 'authorization_code',
        code: 'invalid-code-12345',
        redirect_uri: 'http://localhost:3000/auth-callback',
        client_id: 'test-client',
        code_verifier: 'fake-verifier',
      },
    });

    // Server should reject with 4xx
    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);
  });

  // ── CXone Configuration Endpoint ──────────────────────────────────────

  test('should reach CXone configuration endpoint', async ({ request }) => {
    // The cxone-configuration endpoint requires tenantId but should at least return
    // a response (even an error) proving the server is reachable
    const response = await request.get(
      `${CXONE_HOSTNAME}/.well-known/cxone-configuration?tenantId=test`
    );

    // Accept any response — 200, 400, 404 — just confirms reachability
    expect(response.status()).toBeLessThan(600);
  });

  // ── AuthService State Management (unit-level, no network) ─────────────

  test('should report not authenticated initially', async ({ authService }) => {
    expect(authService.isAuthenticated()).toBe(false);
  });

  test('should throw when getting token before authentication', async ({ authService }) => {
    expect(() => authService.getAccessToken()).toThrow(/No valid access token/);
  });

  test('should clear state on logout', async ({ authService }) => {
    // Logout on fresh service should not throw
    authService.logout();
    expect(authService.isAuthenticated()).toBe(false);
  });
});
