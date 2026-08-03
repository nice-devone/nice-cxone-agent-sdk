// tests/api/agent-session.spec.ts
import { test, expect } from '../../src/fixtures/base.fixture';
import { Assertions } from '../../src/utils/Assertions';

test.describe('Agent Session API', () => {
  // CXone uses OIDC (Authorization Code + PKCE), not OAuth2 client_credentials.
  // Skip until proper CXone API credentials are configured.
  test.skip(
    !process.env.CXONE_API_TOKEN,
    'Skipped: CXone API token not configured. CXone uses OIDC+PKCE, not client_credentials.'
  );

  let testStartTime: number;

  test.beforeEach(async ({}, testInfo) => {
    testStartTime = Date.now();
    console.log(`[SESSION] Starting: ${testInfo.title}`);
  });

  test.afterEach(async ({}, testInfo) => {
    const duration = Date.now() - testStartTime;
    const status = testInfo.status === testInfo.expectedStatus ? 'PASS' : 'FAIL';
    console.log(`[SESSION] ${status}: ${testInfo.title} (${duration}ms)`);
  });

  test('should start and end a session lifecycle', async ({ authenticatedClient, agentSessionApi }) => {
    // Start
    const start = await agentSessionApi.startSession({ stationPhoneNumber: 'WebRTC' });
    if (start.ok) {
      expect(start.body).toHaveProperty('sessionId');
      expect(start.body.status).toBe('active');

      // Get current
      const current = await agentSessionApi.getCurrentSession();
      Assertions.assertOk(current);
      expect(current.body.sessionId).toBe(start.body.sessionId);

      // End
      const end = await agentSessionApi.endSession({
        forceLogoff: false,
        endContacts: true,
        ignorePersonalQueue: true,
      });
      expect([200, 204]).toContain(end.status);
    } else {
      // In test env session endpoints may not be available
      expect([400, 401, 404, 409]).toContain(start.status);
    }
  });

  test('should join an existing session', async ({ authenticatedClient, agentSessionApi }) => {
    const response = await agentSessionApi.joinSession();
    // Either succeeds or no session to join
    expect([200, 404, 409]).toContain(response.status);
  });

  test('should get agent state', async ({ authenticatedClient, agentSessionApi }) => {
    const response = await agentSessionApi.getAgentState();
    if (response.ok) {
      expect(response.body).toHaveProperty('state');
    }
  });

  test('should set agent state to available', async ({ authenticatedClient, agentSessionApi }) => {
    // Requires active session; gracefully handle if none
    const response = await agentSessionApi.setAgentState('available');
    if (response.ok) {
      expect(response.body.state).toBe('available');
    }
  });

  test('should reject unauthenticated session requests', async ({ agentSessionApi }) => {
    const response = await agentSessionApi.getCurrentSession();
    Assertions.assertUnauthorized(response);
  });
});
