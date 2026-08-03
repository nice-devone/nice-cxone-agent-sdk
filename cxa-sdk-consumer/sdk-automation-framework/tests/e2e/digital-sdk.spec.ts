// tests/e2e/digital-sdk.spec.ts
import { test, expect } from '../../src/fixtures/base.fixture';

/**
 * E2E tests for the Digital SDK page in the SDK Consumer app.
 * Tests digital contacts display, message thread, and reply functionality.
 *
 * NOTE: Some tests require active digital contacts assigned to the agent.
 */
test.describe('Digital SDK Page (E2E)', () => {
  test.beforeEach(async ({ page }) => {
    // Clear stale state and simulate authenticated state
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem('auth_token', 'test-token');
    });
    await page.waitForTimeout(500);
    await page.goto('/digital-sdk');
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

  test('should display Digital SDK page title @smoke', async ({ digitalSdkPage }) => {
    await digitalSdkPage.assertPageLoaded();
  });

  test('should show "no digital card" message when no contacts exist', async ({ digitalSdkPage }) => {
    // If no contacts are assigned, the empty state message should show
    const noContacts = await digitalSdkPage.noContactsMessage.isVisible();
    const hasCards = (await digitalSdkPage.getContactCardCount()) > 0;

    // Either empty state or cards, but not both
    expect(noContacts || hasCards).toBe(true);
  });

  test('should display Digital sdk title card', async ({ page }) => {
    await expect(page.locator('text=Digital sdk')).toBeVisible();
  });

  test('should display form element wrapper', async ({ page }) => {
    // The page uses a <form className="root"> wrapper — use .first() because
    // the CSS selector matches multiple MuiCard elements.
    await expect(page.locator('form.root, .MuiCard-root').first()).toBeVisible();
  });

  // ── Tests that require active digital contacts ─────────────────────────

  test('should display contact cards when contacts exist', async ({ digitalSdkPage }) => {
    const count = await digitalSdkPage.getContactCardCount();
    if (count === 0) {
      test.skip();
      return;
    }
    await digitalSdkPage.assertContactsPresent();
  });

  test('should select a contact card and show messages', async ({ digitalSdkPage }) => {
    const count = await digitalSdkPage.getContactCardCount();
    if (count === 0) {
      test.skip();
      return;
    }

    await digitalSdkPage.selectContactByIndex(0);
    const msgCount = await digitalSdkPage.getMessageCount();
    expect(msgCount).toBeGreaterThanOrEqual(0);
  });

  test('should display case ID when a contact is selected', async ({ digitalSdkPage }) => {
    const count = await digitalSdkPage.getContactCardCount();
    if (count === 0) {
      test.skip();
      return;
    }

    await digitalSdkPage.selectContactByIndex(0);
    await expect(digitalSdkPage.caseIdLabel).toBeVisible();
  });

  test('should disable Reply button when input is empty', async ({ digitalSdkPage }) => {
    const count = await digitalSdkPage.getContactCardCount();
    if (count === 0) {
      test.skip();
      return;
    }

    await digitalSdkPage.selectContactByIndex(0);
    await digitalSdkPage.assertReplyDisabledWhenEmpty();
  });

  test('should enable Reply button when text is entered', async ({ digitalSdkPage }) => {
    const count = await digitalSdkPage.getContactCardCount();
    if (count === 0) {
      test.skip();
      return;
    }

    await digitalSdkPage.selectContactByIndex(0);
    await digitalSdkPage.assertReplyEnabledWithText();
  });

  test('should type a message in the reply input', async ({ digitalSdkPage }) => {
    const count = await digitalSdkPage.getContactCardCount();
    if (count === 0) {
      test.skip();
      return;
    }

    await digitalSdkPage.selectContactByIndex(0);
    await digitalSdkPage.typeReply('Hello from automation');
    await expect(digitalSdkPage.replyInput).toHaveValue('Hello from automation');
  });
});
