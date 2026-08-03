// tests/api/digital.spec.ts
import { test, expect } from '../../src/fixtures/base.fixture';
import { Assertions } from '../../src/utils/Assertions';

test.describe('Digital API', () => {
  // CXone uses OIDC (Authorization Code + PKCE), not OAuth2 client_credentials.
  // Skip until proper CXone API credentials are configured.
  test.skip(
    !process.env.CXONE_API_TOKEN,
    'Skipped: CXone API token not configured. CXone uses OIDC+PKCE, not client_credentials.'
  );

  let testStartTime: number;

  test.beforeEach(async ({}, testInfo) => {
    testStartTime = Date.now();
    console.log(`[DIGITAL] Starting: ${testInfo.title}`);
  });

  test.afterEach(async ({}, testInfo) => {
    const duration = Date.now() - testStartTime;
    const status = testInfo.status === testInfo.expectedStatus ? 'PASS' : 'FAIL';
    console.log(`[DIGITAL] ${status}: ${testInfo.title} (${duration}ms)`);
  });

  test('should list digital contacts @smoke', async ({ authenticatedClient, digitalApi }) => {
    const response = await digitalApi.listContacts({ page: 1, per_page: 10 });
    Assertions.assertOk(response);
    Assertions.assertPaginated(response.body);
  });

  test('should list digital channels', async ({ authenticatedClient, digitalApi }) => {
    const response = await digitalApi.listChannels();
    Assertions.assertOk(response);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should get digital contact by case ID', async ({ authenticatedClient, digitalApi }) => {
    const list = await digitalApi.listContacts({ per_page: 1 });
    if (list.body.data.length === 0) {
      test.skip();
      return;
    }
    const caseId = list.body.data[0].caseId;
    const response = await digitalApi.getContactByCaseId(caseId);
    Assertions.assertOk(response);
    expect(response.body.caseId).toBe(caseId);
  });

  test('should get messages for a digital contact', async ({ authenticatedClient, digitalApi }) => {
    const list = await digitalApi.listContacts({ per_page: 1 });
    if (list.body.data.length === 0) {
      test.skip();
      return;
    }
    const caseId = list.body.data[0].caseId;
    const response = await digitalApi.getMessages(caseId);
    Assertions.assertOk(response);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should return 404 for non-existent case ID', async ({ authenticatedClient, digitalApi }) => {
    const response = await digitalApi.getContactByCaseId('non-existent-case-99999');
    Assertions.assertNotFound(response);
  });

  test('should get channel by ID', async ({ authenticatedClient, digitalApi }) => {
    const channels = await digitalApi.listChannels();
    if (!channels.ok || channels.body.length === 0) {
      test.skip();
      return;
    }
    const channelId = channels.body[0].id;
    const response = await digitalApi.getChannel(channelId);
    Assertions.assertOk(response);
    expect(response.body.id).toBe(channelId);
    Assertions.assertSchema(response.body, ['id', 'name', 'type']);
  });

  test('should reject unauthenticated digital requests', async ({ digitalApi }) => {
    const response = await digitalApi.listContacts();
    Assertions.assertUnauthorized(response);
  });
});
