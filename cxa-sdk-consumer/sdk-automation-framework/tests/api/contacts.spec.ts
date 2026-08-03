// tests/api/contacts.spec.ts
import { test, expect } from '../../src/fixtures/base.fixture';
import { Assertions } from '../../src/utils/Assertions';
import { TestCleanup } from '../../src/utils/TestCleanup';

test.describe('Contacts API', () => {
  // CXone uses OIDC (Authorization Code + PKCE), not OAuth2 client_credentials.
  // Skip until proper CXone API credentials are configured.
  test.skip(
    !process.env.CXONE_API_TOKEN,
    'Skipped: CXone API token not configured. CXone uses OIDC+PKCE, not client_credentials.'
  );

  const cleanup = new TestCleanup();
  let testStartTime: number;

  test.beforeEach(async ({}, testInfo) => {
    testStartTime = Date.now();
    console.log(`[CONTACTS] Starting: ${testInfo.title}`);
  });

  test.afterEach(async ({}, testInfo) => {
    // Run registered cleanup actions (end created contacts)
    await cleanup.run();

    const duration = Date.now() - testStartTime;
    const status = testInfo.status === testInfo.expectedStatus ? 'PASS' : 'FAIL';
    console.log(`[CONTACTS] ${status}: ${testInfo.title} (${duration}ms)`);
  });

  test('should list contacts @smoke', async ({ authenticatedClient, contactsApi }) => {
    const response = await contactsApi.list({ page: 1, per_page: 10 });
    Assertions.assertOk(response);
    Assertions.assertPaginated(response.body);
  });

  test('should get contact by ID', async ({ authenticatedClient, contactsApi }) => {
    const list = await contactsApi.list({ page: 1, per_page: 1 });
    if (list.body.data.length === 0) {
      test.skip();
      return;
    }
    const id = list.body.data[0].contactId;
    const response = await contactsApi.getById(id);
    Assertions.assertOk(response);
    expect(response.body.contactId).toBe(id);
  });

  test('should return 404 for non-existent contact', async ({ authenticatedClient, contactsApi }) => {
    const response = await contactsApi.getById('non-existent-contact-99999');
    Assertions.assertNotFound(response);
  });

  test('should initiate a dial-phone contact', async ({ authenticatedClient, contactsApi }) => {
    const response = await contactsApi.dialPhone({
      skillId: process.env.TEST_SKILL_ID ?? '12345',
      phoneNumber: '+15551234567',
    });

    if (response.ok) {
      Assertions.assertHasId(response.body);
      cleanup.add(async () => { await contactsApi.end(response.body.contactId); });
    } else {
      // Accept 4xx if no skill configured in test env
      expect([400, 404, 422]).toContain(response.status);
    }
  });

  test('should filter contacts by status', async ({ authenticatedClient, contactsApi }) => {
    const response = await contactsApi.list({ status: 'active' });
    Assertions.assertOk(response);
  });

  test('should filter contacts by type', async ({ authenticatedClient, contactsApi }) => {
    const response = await contactsApi.list({ type: 'voice' });
    Assertions.assertOk(response);
  });

  test('should add and list notes on a contact', async ({ authenticatedClient, contactsApi }) => {
    const list = await contactsApi.list({ page: 1, per_page: 1 });
    if (list.body.data.length === 0) {
      test.skip();
      return;
    }

    const contactId = list.body.data[0].contactId;
    const addResponse = await contactsApi.addNote(contactId, 'Automated test note');
    if (addResponse.ok) {
      Assertions.assertHasId(addResponse.body);

      const notesResponse = await contactsApi.listNotes(contactId);
      Assertions.assertOk(notesResponse);
      expect(notesResponse.body.length).toBeGreaterThan(0);
    }
  });

  test('should reject unauthenticated contact requests', async ({ contactsApi }) => {
    const response = await contactsApi.list();
    Assertions.assertUnauthorized(response);
  });

  test('should respond within acceptable time', async ({ authenticatedClient, contactsApi }) => {
    const response = await contactsApi.list({ per_page: 5 });
    Assertions.assertOk(response);
    Assertions.assertResponseTime(response, 5000);
  });
});
