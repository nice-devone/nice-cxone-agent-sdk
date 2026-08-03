// tests/api/users.spec.ts
import { test, expect } from '../../src/fixtures/base.fixture';
import { Assertions } from '../../src/utils/Assertions';
import { DataFactory } from '../../src/utils/DataFactory';
import { TestCleanup } from '../../src/utils/TestCleanup';

test.describe('Users API — CRUD Operations', () => {
  // CXone uses OIDC (Authorization Code + PKCE), not OAuth2 client_credentials.
  // These tests require a valid CXone API token which cannot be obtained
  // without an interactive OIDC login flow. Skip the entire suite until
  // proper CXone API credentials are configured.
  test.skip(
    !process.env.CXONE_API_TOKEN,
    'Skipped: CXone API token not configured. CXone uses OIDC+PKCE, not client_credentials.'
  );

  const cleanup = new TestCleanup();
  let testStartTime: number;

  test.beforeEach(async ({}, testInfo) => {
    testStartTime = Date.now();
    console.log(`[USERS] Starting: ${testInfo.title}`);
  });

  test.afterEach(async ({}, testInfo) => {
    // Run registered cleanup actions (delete created resources)
    await cleanup.run();

    const duration = Date.now() - testStartTime;
    const status = testInfo.status === testInfo.expectedStatus ? 'PASS' : 'FAIL';
    console.log(`[USERS] ${status}: ${testInfo.title} (${duration}ms)`);
  });

  // ── CREATE ─────────────────────────────────────────────────────────────

  test('should create a new user @smoke', async ({ authenticatedClient, usersApi }) => {
    const payload = DataFactory.createUser();
    const response = await usersApi.create(payload);

    Assertions.assertCreated(response);
    Assertions.assertHasId(response.body);
    expect(response.body.email).toBe(payload.email);
    expect(response.body.name).toBe(payload.name);
    expect(response.body.role).toBe(payload.role);

    cleanup.add(async () => { await usersApi.delete(response.body.id); });
  });

  test('should reject duplicate email', async ({ authenticatedClient, usersApi }) => {
    const payload = DataFactory.createUser();
    const first = await usersApi.create(payload);
    cleanup.add(async () => { await usersApi.delete(first.body.id); });

    const duplicate = await usersApi.create(payload);
    expect([400, 409, 422]).toContain(duplicate.status);
  });

  test('should reject user with missing required fields', async ({ authenticatedClient, usersApi }) => {
    // @ts-expect-error intentionally invalid payload
    const response = await usersApi.create({ email: '' });
    Assertions.assertBadRequest(response);
  });

  // ── READ ───────────────────────────────────────────────────────────────

  test('should list users with pagination', async ({ authenticatedClient, usersApi }) => {
    const response = await usersApi.list({ page: 1, per_page: 10 });
    Assertions.assertOk(response);
    Assertions.assertPaginated(response.body);
  });

  test('should get a user by ID', async ({ authenticatedClient, usersApi }) => {
    const created = await usersApi.create(DataFactory.createUser());
    cleanup.add(async () => { await usersApi.delete(created.body.id); });

    const response = await usersApi.getById(created.body.id);
    Assertions.assertOk(response);
    expect(response.body.id).toBe(created.body.id);
    Assertions.assertSchema(response.body, ['id', 'email', 'name', 'role', 'status']);
  });

  test('should return 404 for non-existent user', async ({ authenticatedClient, usersApi }) => {
    const response = await usersApi.getById('non-existent-id-12345');
    Assertions.assertNotFound(response);
  });

  test('should get the currently authenticated user', async ({ authenticatedClient, usersApi }) => {
    const response = await usersApi.me();
    Assertions.assertOk(response);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email');
  });

  // ── UPDATE ─────────────────────────────────────────────────────────────

  test('should update a user name', async ({ authenticatedClient, usersApi }) => {
    const created = await usersApi.create(DataFactory.createUser());
    cleanup.add(async () => { await usersApi.delete(created.body.id); });

    const newName = 'Updated User Name';
    const response = await usersApi.update(created.body.id, { name: newName });
    Assertions.assertOk(response);
    expect(response.body.name).toBe(newName);
  });

  test('should update a user role', async ({ authenticatedClient, usersApi }) => {
    const created = await usersApi.create(DataFactory.createUser({ role: 'viewer' }));
    cleanup.add(async () => { await usersApi.delete(created.body.id); });

    const response = await usersApi.update(created.body.id, { role: 'admin' });
    Assertions.assertOk(response);
    expect(response.body.role).toBe('admin');
  });

  test('should full-replace a user via PUT', async ({ authenticatedClient, usersApi }) => {
    const original = DataFactory.createUser();
    const created = await usersApi.create(original);
    cleanup.add(async () => { await usersApi.delete(created.body.id); });

    const replacement = DataFactory.createUser({ email: original.email });
    const response = await usersApi.replace(created.body.id, replacement);
    Assertions.assertOk(response);
    expect(response.body.name).toBe(replacement.name);
  });

  // ── DELETE ─────────────────────────────────────────────────────────────

  test('should delete a user', async ({ authenticatedClient, usersApi }) => {
    const created = await usersApi.create(DataFactory.createUser());

    const response = await usersApi.delete(created.body.id);
    Assertions.assertNoContent(response);

    const verify = await usersApi.getById(created.body.id);
    Assertions.assertNotFound(verify);
  });

  test('should bulk delete users', async ({ authenticatedClient, usersApi }) => {
    const users = await Promise.all([
      usersApi.create(DataFactory.createUser()),
      usersApi.create(DataFactory.createUser()),
    ]);

    const ids = users.map((u) => u.body.id);
    const response = await usersApi.bulkDelete(ids);
    Assertions.assertOk(response);
    expect(response.body.deleted).toBe(2);
  });

  // ── FILTERS & QUERIES ─────────────────────────────────────────────────

  test('should filter users by role', async ({ authenticatedClient, usersApi }) => {
    const response = await usersApi.list({ role: 'admin' });
    Assertions.assertOk(response);
    if (response.body.data.length > 0) {
      expect(response.body.data.every((u) => u.role === 'admin')).toBe(true);
    }
  });

  test('should filter users by status', async ({ authenticatedClient, usersApi }) => {
    const response = await usersApi.list({ status: 'active' });
    Assertions.assertOk(response);
    if (response.body.data.length > 0) {
      expect(response.body.data.every((u) => u.status === 'active')).toBe(true);
    }
  });

  // ── PERFORMANCE ────────────────────────────────────────────────────────

  test('should respond within acceptable time limits', async ({ authenticatedClient, usersApi }) => {
    const response = await usersApi.list({ page: 1, per_page: 5 });
    Assertions.assertOk(response);
    Assertions.assertResponseTime(response, 3000);
  });

  // ── AUTH CHECKS ────────────────────────────────────────────────────────

  test('should reject unauthenticated requests', async ({ usersApi }) => {
    const response = await usersApi.list();
    Assertions.assertUnauthorized(response);
  });
});
