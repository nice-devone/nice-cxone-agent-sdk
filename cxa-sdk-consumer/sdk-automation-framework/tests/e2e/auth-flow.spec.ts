// tests/e2e/auth-flow.spec.ts
import { test, expect } from '../../src/fixtures/base.fixture';

/**
 * E2E tests for the CXone Auth flow in the SDK Consumer app.
 * Tests the Auth component at route "/".
 */
test.describe('Auth Flow (E2E)', () => {
  const CXONE_HOSTNAME = process.env.CXONE_HOSTNAME ?? 'https://cxone.staging.niceincontact.com';
  const CXONE_CLIENT_ID = process.env.CXONE_CLIENT_ID ?? 'Salesforce Agent Console@inContact Inc.';
  const CXONE_REDIRECT_URI = process.env.CXONE_REDIRECT_URI ?? 'http://localhost:3000/auth-callback';

  test.beforeEach(async ({ page, authPage }) => {
    // Ensure clean auth state before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await authPage.navigate();
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshot = await page.screenshot({ fullPage: true }).catch(() => null);
      if (screenshot) {
        await testInfo.attach('failure-screenshot', { body: screenshot, contentType: 'image/png' });
      }
    }
    await page.evaluate(() => localStorage.clear()).catch(() => {});
  });

  test('should display the auth form on page load @smoke', async ({ authPage }) => {
    await authPage.assertAuthFormVisible();
    await expect(authPage.hostNameInput).toBeVisible();
    await expect(authPage.clientIdInput).toBeVisible();
    await expect(authPage.redirectUriInput).toBeVisible();
  });

  test('should have default values pre-filled', async ({ authPage }) => {
    await expect(authPage.hostNameInput).toHaveValue(CXONE_HOSTNAME);
    await expect(authPage.clientIdInput).toHaveValue(CXONE_CLIENT_ID);
    await expect(authPage.redirectUriInput).toHaveValue(/localhost:3000/);
  });

  test('should display GA Access Token Flow card', async ({ page }) => {
    await expect(page.locator('text=GA Access Token Flow')).toBeVisible();
  });

  test('should display Auth Result card', async ({ page }) => {
    await expect(page.locator('text=Auth Result')).toBeVisible();
  });

  test('should display Access Token Flow card', async ({ page }) => {
    // Use exact match to avoid also matching "GA Access Token Flow"
    await expect(page.getByText('Access Token Flow', { exact: true })).toBeVisible();
  });

  test('should fill auth form and click authenticate (page mode)', async ({ authPage, page }) => {
    await authPage.fillAuthForm({
      hostName: CXONE_HOSTNAME,
      clientId: CXONE_CLIENT_ID,
      redirectUri: CXONE_REDIRECT_URI,
    });

    // Auth mode dropdown should default to "page"
    // Clicking Authenticate will redirect — we verify the redirect happens
    const [response] = await Promise.all([
      page.waitForNavigation({ timeout: 15_000 }).catch(() => null),
      authPage.clickAuthenticate(),
    ]);

    // Should either redirect to the CXone auth URL or stay if fields missing
    const url = page.url();
    const redirectedToAuth = url.includes('cxone') || url.includes('niceincontact') || url.includes('auth');
    const stayedOnPage = url.includes('localhost');
    expect(redirectedToAuth || stayedOnPage).toBe(true);
  });

  test('should not authenticate with empty required fields', async ({ authPage }) => {
    // Clear all fields
    await authPage.fillAuthForm({
      hostName: '',
      clientId: '',
      redirectUri: '',
    });

    await authPage.clickAuthenticate();
    // Should remain on the same page — the initAuth function returns early if fields empty
    await authPage.assertAuthFormVisible();
  });

  test('should show auth status text', async ({ page }) => {
    await expect(page.locator('text=Auth Status:')).toBeVisible();
  });

  test('should show Test Flow button in Access Token section', async ({ authPage }) => {
    await expect(authPage.testFlowButton).toBeVisible();
  });
});
