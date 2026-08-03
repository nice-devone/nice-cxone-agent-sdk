// src/pages/AuthPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * AuthPage — models the CXone Auth component at route "/".
 *
 * Sections:
 *   1. GA Access Token Flow — hostname, clientId, redirectUri, authMode, codeChallenge, Authenticate button
 *   2. Auth Result — authState, authToken
 *   3. Access Token Flow — authToken input, accessToken input, Test Flow button
 */
export class AuthPage extends BasePage {
  readonly path = '/';

  // ── GA Access Token Flow ───────────────────────────────────────────────
  readonly hostNameInput: Locator;
  readonly clientIdInput: Locator;
  readonly redirectUriInput: Locator;
  readonly authModeSelect: Locator;
  readonly codeChallengeSelect: Locator;
  readonly authenticateButton: Locator;

  // ── Auth Result section ────────────────────────────────────────────────
  readonly authStatusText: Locator;
  readonly authTokenText: Locator;

  // ── Access Token Flow section ──────────────────────────────────────────
  readonly accessTokenAuthTokenInput: Locator;
  readonly accessTokenInput: Locator;
  readonly testFlowButton: Locator;

  constructor(page: Page) {
    super(page);

    // GA Access Token Flow form
    // NOTE: All 3 TextFields in Auth.tsx share id="outlined-basic", breaking
    //       getByLabel(). Use MUI FormControl structure to target each input.
    this.hostNameInput = page.locator('.MuiFormControl-root:has(label:has-text("Host Name")) input');
    this.clientIdInput = page.locator('.MuiFormControl-root:has(label:has-text("Client Id")) input');
    this.redirectUriInput = page.locator('.MuiFormControl-root:has(label:has-text("Redirect Uri")) input');
    this.authModeSelect = page.locator('label:has-text("Authentication mode") + div select, [label="Authentication mode"]').first();
    this.codeChallengeSelect = page.locator('label:has-text("Code challenge methods") + div select, [label="Code challenge methods"]').first();
    this.authenticateButton = page.getByRole('button', { name: 'Authenticate' });

    // Auth Result
    this.authStatusText = page.locator('text=Auth Status:').locator('..');
    this.authTokenText = page.locator('text=Auth Token:').locator('..');

    // Access Token Flow
    this.accessTokenAuthTokenInput = page.getByLabel('AuthToken');
    this.accessTokenInput = page.getByLabel('AccessToken');
    this.testFlowButton = page.getByRole('button', { name: 'Test Flow' });
  }

  protected override async waitForReady(): Promise<void> {
    await expect(this.authenticateButton).toBeVisible({ timeout: 15_000 });
  }

  /** Fill the GA Access Token form fields */
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

  /** Select authentication mode (page or popup) */
  async selectAuthMode(mode: 'page' | 'popup'): Promise<void> {
    this.logger.info(`Selecting auth mode: ${mode}`);
    await this.page.locator('[label="Authentication mode"]').first().click();
    await this.page.getByRole('option', { name: mode, exact: false }).click();
  }

  /** Click the Authenticate button */
  async clickAuthenticate(): Promise<void> {
    this.logger.info('Clicking Authenticate button');
    await this.authenticateButton.click();
  }

  /** Perform full authentication flow */
  async authenticate(opts: {
    hostName: string;
    clientId: string;
    redirectUri: string;
    mode?: 'page' | 'popup';
  }): Promise<void> {
    await this.fillAuthForm(opts);
    if (opts.mode) {
      await this.selectAuthMode(opts.mode);
    }
    await this.clickAuthenticate();
  }

  /** Assert auth status text */
  async assertAuthStatus(expected: string | RegExp): Promise<void> {
    await expect(this.authStatusText).toContainText(expected);
  }

  /** Assert auth status shows AUTHENTICATED */
  async assertAuthenticated(): Promise<void> {
    await this.assertAuthStatus('AUTHENTICATED');
  }

  /** Assert auth token is displayed (non-empty) */
  async assertAuthTokenPresent(): Promise<void> {
    await expect(this.authTokenText).not.toHaveText(/Auth Token:\s*$/);
  }

  /** Assert Authenticate button is visible */
  async assertAuthFormVisible(): Promise<void> {
    await expect(this.authenticateButton).toBeVisible();
  }

  /** Click the Test Flow button in the Access Token Flow section */
  async clickTestFlow(): Promise<void> {
    this.logger.info('Clicking Test Flow button');
    await this.testFlowButton.click();
  }

  /** Fill and submit the Access Token Flow form */
  async testAccessTokenFlow(authToken: string, accessToken: string): Promise<void> {
    await this.accessTokenAuthTokenInput.fill(authToken);
    await this.accessTokenInput.fill(accessToken);
    await this.clickTestFlow();
  }
}
