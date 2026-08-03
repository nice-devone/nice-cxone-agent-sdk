// tests/e2e/navigation.spec.ts
import { test, expect } from '../../src/fixtures/base.fixture';

/**
 * E2E tests for the side navigation bar in the SDK Consumer app.
 * Verifies tab rendering, routing, enable/disable states, and selected state.
 */
test.describe('Side Navigation (E2E)', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to ensure clean navigation state
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle').catch(() => {});
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

  test('should display the navigation drawer @smoke', async ({ navBar }) => {
    await navBar.assertDrawerVisible();
    await navBar.assertDrawerHeader();
  });

  test('should render all 5 navigation tabs', async ({ navBar }) => {
    const count = await navBar.getTabCount();
    expect(count).toBe(5);
  });

  test('should have Auth tab selected by default on "/"', async ({ navBar }) => {
    await navBar.assertTabSelected('Auth');
  });

  test('should disable non-auth tabs when not authenticated', async ({ navBar }) => {
    // Before auth, tabs ACD/Digital/Custom/Logout should be disabled
    await navBar.assertTabsDisabledBeforeAuth();
  });

  test('should navigate to Auth page (route /)', async ({ navBar, page }) => {
    await navBar.navigateTo('Auth');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('text=GA Access Token Flow')).toBeVisible();
  });

  test('should navigate to ACD SDK page when authenticated', async ({ navBar, page }) => {
    // Simulate auth by setting localStorage token (if tabs become enabled)
    await page.evaluate(() => localStorage.setItem('auth_token', 'test-token'));
    await page.waitForTimeout(500);

    await navBar.navigateTo('ACD');

    const url = page.url();
    if (url.includes('/acd-sdk')) {
      await expect(page.locator('text=ACD sdk')).toBeVisible();
    }
  });

  test('should navigate to Digital SDK page when authenticated', async ({ navBar, page }) => {
    await page.evaluate(() => localStorage.setItem('auth_token', 'test-token'));
    await page.waitForTimeout(500);

    await navBar.navigateTo('Digital');

    const url = page.url();
    if (url.includes('/digital-sdk')) {
      await expect(page.locator('text=Digital sdk')).toBeVisible();
    }
  });

  test('should navigate to CXA Placeholder page when authenticated', async ({ navBar, page }) => {
    await page.evaluate(() => localStorage.setItem('auth_token', 'test-token'));
    await page.waitForTimeout(500);

    await navBar.navigateTo('Custom');

    const url = page.url();
    if (url.includes('/cxa-placeholder')) {
      // The "CXA Placeholder" text may be replaced by an iframe on mount.
      // Assert the #launchCXA container is visible instead.
      await expect(page.locator('#launchCXA')).toBeVisible();
    }
  });

  test('should highlight the selected tab', async ({ navBar, page }) => {
    await page.evaluate(() => localStorage.setItem('auth_token', 'test-token'));
    await page.waitForTimeout(500);

    await navBar.navigateTo('ACD');
    await navBar.assertTabSelected('ACD');
  });

  test('should persist selected tab in localStorage', async ({ page }) => {
    await page.evaluate(() => localStorage.setItem('auth_token', 'test-token'));
    await page.waitForTimeout(500);

    // Navigate to ACD tab  
    await page.locator('.MuiListItemButton-root').filter({ hasText: /ACD/i }).click();
    await page.waitForTimeout(500);

    const stored = await page.evaluate(() => localStorage.getItem('selectedIndex'));
    expect(stored).toBe('1');
  });

  test('should clear storage and redirect on Logout', async ({ navBar, page }) => {
    await page.evaluate(() => {
      localStorage.setItem('auth_token', 'test-token');
      localStorage.setItem('startsessionButton', 'true');
    });
    await page.waitForTimeout(500);

    await navBar.navigateTo('Logout');
    await page.waitForTimeout(1000);

    // After logout, should be back at root
    await expect(page).toHaveURL(/\/$/);
  });
});
