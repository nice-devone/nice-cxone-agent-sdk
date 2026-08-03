// tests/api/skills.spec.ts
import { test, expect } from '../../src/fixtures/base.fixture';
import { Assertions } from '../../src/utils/Assertions';

test.describe('Skills API', () => {
  // CXone uses OIDC (Authorization Code + PKCE), not OAuth2 client_credentials.
  // Skip until proper CXone API credentials are configured.
  test.skip(
    !process.env.CXONE_API_TOKEN,
    'Skipped: CXone API token not configured. CXone uses OIDC+PKCE, not client_credentials.'
  );

  let testStartTime: number;

  test.beforeEach(async ({}, testInfo) => {
    testStartTime = Date.now();
    console.log(`[SKILLS] Starting: ${testInfo.title}`);
  });

  test.afterEach(async ({}, testInfo) => {
    const duration = Date.now() - testStartTime;
    const status = testInfo.status === testInfo.expectedStatus ? 'PASS' : 'FAIL';
    console.log(`[SKILLS] ${status}: ${testInfo.title} (${duration}ms)`);
  });

  test('should list skills @smoke', async ({ authenticatedClient, skillsApi }) => {
    const response = await skillsApi.list({ page: 1, per_page: 20 });
    Assertions.assertOk(response);
    Assertions.assertPaginated(response.body);
  });

  test('should get skill by ID', async ({ authenticatedClient, skillsApi }) => {
    const list = await skillsApi.list({ per_page: 1 });
    if (list.body.data.length === 0) {
      test.skip();
      return;
    }
    const skillId = list.body.data[0].skillId;
    const response = await skillsApi.getById(skillId);
    Assertions.assertOk(response);
    expect(response.body.skillId).toBe(skillId);
    Assertions.assertSchema(response.body, ['skillId', 'skillName', 'mediaType', 'isOutbound']);
  });

  test('should filter skills by outbound', async ({ authenticatedClient, skillsApi }) => {
    const response = await skillsApi.list({ isOutbound: true });
    Assertions.assertOk(response);
    if (response.body.data.length > 0) {
      expect(response.body.data.every((s) => s.isOutbound === true)).toBe(true);
    }
  });

  test('should filter skills by media type', async ({ authenticatedClient, skillsApi }) => {
    const response = await skillsApi.list({ mediaType: 'phone' });
    Assertions.assertOk(response);
  });

  test('should get skills by agent ID', async ({ authenticatedClient, skillsApi }) => {
    const agentId = process.env.TEST_AGENT_ID ?? 'test-agent';
    const response = await skillsApi.getByAgentId(agentId);
    if (response.ok) {
      expect(Array.isArray(response.body)).toBe(true);
    } else {
      expect([404]).toContain(response.status);
    }
  });

  test('should reject unauthenticated skill requests', async ({ skillsApi }) => {
    const response = await skillsApi.list();
    Assertions.assertUnauthorized(response);
  });

  test('should respond within acceptable time', async ({ authenticatedClient, skillsApi }) => {
    const response = await skillsApi.list({ per_page: 10 });
    Assertions.assertOk(response);
    Assertions.assertResponseTime(response, 3000);
  });
});
