// tests/smoke/health.spec.ts
import { test, expect } from '../../src/fixtures/base.fixture';

/**
 * Smoke tests — fast checks to verify the CXone environment is up.
 * Run these first in any deployment pipeline.
 *
 * CXone platform exposes well-known endpoints for OIDC and configuration.
 * Standard REST paths like /health or /version do not exist.
 */
test.describe('Health Checks @smoke', () => {
  const CXONE_HOSTNAME = process.env.CXONE_HOSTNAME ?? 'https://cxone.staging.niceincontact.com';

  let testStartTime: number;

  test.beforeEach(async ({}, testInfo) => {
    testStartTime = Date.now();
    console.log(`[HEALTH] Starting: ${testInfo.title}`);
  });

  test.afterEach(async ({}, testInfo) => {
    const duration = Date.now() - testStartTime;
    const status = testInfo.status === testInfo.expectedStatus ? 'PASS' : 'FAIL';
    console.log(`[HEALTH] ${status}: ${testInfo.title} (${duration}ms)`);
  });

  test('OIDC discovery endpoint responds with valid config', async ({ request }) => {
    const response = await request.get(`${CXONE_HOSTNAME}/.well-known/openid-configuration`);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('authorization_endpoint');
    expect(body).toHaveProperty('token_endpoint');
  });

  test('OIDC discovery responds within acceptable time', async ({ request }) => {
    const start = Date.now();
    await request.get(`${CXONE_HOSTNAME}/.well-known/openid-configuration`);
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(5000);
  });

  test('CXone configuration endpoint is reachable', async ({ request }) => {
    const response = await request.get(
      `${CXONE_HOSTNAME}/.well-known/cxone-configuration?tenantId=test`
    );
    // Any response (200, 400, 404) confirms the server is reachable
    expect(response.status()).toBeLessThan(600);
  });

  test('CXone hostname responds to requests', async ({ request }) => {
    const response = await request.get(CXONE_HOSTNAME);
    // CXone root typically returns 200 or 302 (redirect)
    expect([200, 301, 302, 303]).toContain(response.status());
  });

  test('OIDC token endpoint is reachable', async ({ request }) => {
    const oidcResponse = await request.get(`${CXONE_HOSTNAME}/.well-known/openid-configuration`);
    const body = await oidcResponse.json();
    const tokenEndpoint = body.token_endpoint;
    if (!tokenEndpoint) { test.skip(); return; }

    // POST without body → expect 400 (bad request), not 5xx
    const response = await request.post(tokenEndpoint, { form: { grant_type: 'test' } });
    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);
  });

  test('OIDC JWKS URI is reachable', async ({ request }) => {
    const oidcResponse = await request.get(`${CXONE_HOSTNAME}/.well-known/openid-configuration`);
    const body = await oidcResponse.json();
    const jwksUri = body.jwks_uri;
    if (!jwksUri) { test.skip(); return; }

    const response = await request.get(jwksUri);
    expect(response.status()).toBe(200);
    const jwks = await response.json();
    expect(jwks).toHaveProperty('keys');
  });
});
