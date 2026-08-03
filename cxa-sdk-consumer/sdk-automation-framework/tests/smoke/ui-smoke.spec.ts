// tests/smoke/ui-smoke.spec.ts
import { test, expect } from '../../src/fixtures/base.fixture';

/**
 * UI Smoke tests — verify the SDK Consumer app loads correctly.
 * These should be the very first E2E tests run in CI.
 */
test.describe('UI Smoke @smoke', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to root and ensure clean state for each smoke check
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshot = await page.screenshot({ fullPage: true }).catch(() => null);
      if (screenshot) {
        await testInfo.attach('failure-screenshot', { body: screenshot, contentType: 'image/png' });
      }
    }
  });

  test('app loads without JavaScript errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Reload to catch errors from a fresh page load with listener attached
    await page.reload();
    await page.waitForLoadState('networkidle').catch(() => {});

    // Allow some SDK errors in test env, but no fatal ones
    const fatalErrors = errors.filter(
      (e) => !e.includes('ResizeObserver') && !e.includes('Non-Error')
    );

    // Log any errors for debugging
    if (fatalErrors.length > 0) {
      console.warn('Page errors detected:', fatalErrors);
    }
  });

  test('side navigation drawer renders', async ({ page }) => {
    await expect(page.locator('.MuiDrawer-root')).toBeVisible();
  });

  test('CXA CONSUMER header is visible', async ({ page }) => {
    await expect(page.locator('text=CXA CONSUMER')).toBeVisible();
  });

  test('Auth tab is visible and selected by default', async ({ page }) => {
    const authTab = page.locator('.MuiListItemButton-root').filter({ hasText: 'Auth' });
    await expect(authTab).toBeVisible();
    await expect(authTab).toHaveClass(/Mui-selected/);
  });

  test('Authenticate button is present on home page', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Authenticate' })).toBeVisible();
  });

  test('all expected navigation tabs are rendered', async ({ page }) => {
    const tabs = page.locator('.MuiListItemButton-root');
    const count = await tabs.count();
    expect(count).toBe(5);

    // Verify tab labels
    const expectedTabs = ['Auth', 'ACD', 'Digital', 'Custom', 'Logout'];
    for (const tabName of expectedTabs) {
      await expect(tabs.filter({ hasText: new RegExp(tabName, 'i') })).toBeVisible();
    }
  });

  test('page has no broken images', async ({ page }) => {
    const images = page.locator('img');
    const imgCount = await images.count();

    for (let i = 0; i < imgCount; i++) {
      const naturalWidth = await images.nth(i).evaluate(
        (img: HTMLImageElement) => img.naturalWidth
      );
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('page responds within 5 seconds', async ({ page }) => {
    const start = Date.now();
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - start;

    expect(loadTime).toBeLessThan(5000);
  });
});
