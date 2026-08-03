// src/pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage — models the CXone OIDC authentication form at route "/".
 *
 * The SDK Consumer app does not have a traditional /login page.
 * Authentication is handled via CXone OIDC (Authorization Code + PKCE)
 * through the Auth component which contains:
 *   - Host Name, Client Id, Redirect Uri inputs
 *   - Authentication mode & Code challenge selects
 *   - Authenticate button
 *   - Auth Status / Auth Token result display
 */
export class LoginPage extends BasePage {
  readonly path = '/';

  // ── Auth form inputs ──────────────────────────────────────────────────
  readonly hostNameInput: Locator;
  readonly clientIdInput: Locator;
  readonly redirectUriInput: Locator;
  readonly authenticateButton: Locator;

  // ── Auth result ───────────────────────────────────────────────────────
  readonly authStatusText: Locator;
  readonly authTokenText: Locator;

  // ── Navigation tabs ───────────────────────────────────────────────────
  readonly navTabs: Locator;

  constructor(page: Page) {
    super(page);

    // All 3 TextFields share id="outlined-basic", so target via MUI label structure
    this.hostNameInput = page.locator('.MuiFormControl-root:has(label:has-text("Host Name")) input');
    this.clientIdInput = page.locator('.MuiFormControl-root:has(label:has-text("Client Id")) input');
    this.redirectUriInput = page.locator('.MuiFormControl-root:has(label:has-text("Redirect Uri")) input');
    this.authenticateButton = page.getByRole('button', { name: 'Authenticate' });

    this.authStatusText = page.locator('text=Auth Status:').locator('..');
    this.authTokenText = page.locator('text=Auth Token:').locator('..');

    this.navTabs = page.locator('.MuiDrawer-root .MuiListItemButton-root');
  }

  protected override async waitForReady(): Promise<void> {
    await expect(this.authenticateButton).toBeVisible({ timeout: 15_000 });
  }

  /** Fill auth form fields */
  async fillAuthForm(opts: {
    hostName?: string;
    clientId?: string;
    redirectUri?: string;
  }): Promise<void> {
    this.logger.info('Filling auth form fields');
    if (opts.hostName !== undefined) {
      await this.hostNameInput.clear();
      await this.hostNameInput.fill(opts.hostName);
    }
    if (opts.clientId !== undefined) {
      await this.clientIdInput.clear();
      await this.clientIdInput.fill(opts.clientId);
    }
    if (opts.redirectUri !== undefined) {
      await this.redirectUriInput.clear();
      await this.redirectUriInput.fill(opts.redirectUri);
    }
  }

  /** Click Authenticate to start OIDC flow */
  async clickAuthenticate(): Promise<void> {
    this.logger.info('Clicking Authenticate button');
    await this.authenticateButton.click();
  }

  /** Assert auth status text contains expected value */
  async assertAuthStatus(expected: string | RegExp): Promise<void> {
    await expect(this.authStatusText).toContainText(expected);
  }

  /** Assert navigation tabs are disabled (not authenticated) */
  async assertNavTabsDisabled(): Promise<void> {
    for (let i = 1; i <= 4; i++) {
      await expect(this.navTabs.nth(i)).toBeDisabled();
    }
  }

  /** Assert navigation tabs are enabled (authenticated) */
  async assertNavTabsEnabled(): Promise<void> {
    for (let i = 1; i <= 3; i++) {
      await expect(this.navTabs.nth(i)).toBeEnabled();
    }
  }
}
