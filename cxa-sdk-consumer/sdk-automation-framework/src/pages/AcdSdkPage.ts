// src/pages/AcdSdkPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * AcdSdkPage — models the ACD SDK component at route "/acd-sdk".
 *
 * Features:
 *   - Start/End session buttons
 *   - Agent Leg button
 *   - Agent state display
 *   - Outbound dial (phone number input + Dial Number button)
 *   - Voice controls (Hold/Resume, Hang Up) — visible only during active call
 */
export class AcdSdkPage extends BasePage {
  readonly path = '/acd-sdk';

  // ── Session controls ───────────────────────────────────────────────────
  readonly startSessionButton: Locator;
  readonly endSessionButton: Locator;
  readonly agentLegButton: Locator;

  // ── Agent state display ────────────────────────────────────────────────
  readonly agentStateCard: Locator;
  readonly agentStateText: Locator;
  readonly agentReasonText: Locator;

  // ── Outbound dialing ──────────────────────────────────────────────────
  readonly dialNumberInput: Locator;
  readonly dialNumberButton: Locator;

  // ── Voice controls (visible during active call) ────────────────────────
  readonly holdResumeButton: Locator;
  readonly hangUpButton: Locator;

  // ── Page header ────────────────────────────────────────────────────────
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);

    // Session buttons
    this.startSessionButton = page.getByRole('button', { name: 'Start Session' });
    this.endSessionButton = page.getByRole('button', { name: 'End Session' });
    this.agentLegButton = page.getByRole('button', { name: 'Agent Leg' });

    // Agent state — use .first() because the outer card wraps an inner card,
    // both containing "AgentState" text, which violates strict-mode.
    this.agentStateCard = page.locator('.MuiCard-root').filter({ hasText: 'AgentState' }).first();
    this.agentStateText = page.locator('text=AgentState :').locator('..');
    this.agentReasonText = page.locator('text=Reason :').locator('..');

    // Outbound
    this.dialNumberInput = page.getByLabel('callAgent');
    this.dialNumberButton = page.getByRole('button', { name: 'Dial Number' });

    // Voice controls
    this.holdResumeButton = page.getByRole('button', { name: /^(Hold|Resume)$/ });
    this.hangUpButton = page.getByRole('button', { name: 'Hang Up' });

    // Title
    this.pageTitle = page.locator('text=ACD sdk');
  }

  protected override async waitForReady(): Promise<void> {
    await expect(this.startSessionButton).toBeVisible({ timeout: 15_000 });
  }

  // ── Session management ─────────────────────────────────────────────────

  /** Click Start Session and wait briefly */
  async startSession(): Promise<void> {
    this.logger.info('Starting ACD session');
    await this.startSessionButton.click();
    await this.page.waitForTimeout(1000);
  }

  /** Click End Session and wait briefly */
  async endSession(): Promise<void> {
    this.logger.info('Ending ACD session');
    await this.endSessionButton.click();
    await this.page.waitForTimeout(1000);
  }

  /** Click Agent Leg */
  async clickAgentLeg(): Promise<void> {
    this.logger.info('Clicking Agent Leg');
    await this.agentLegButton.click();
  }

  // ── Assertions ─────────────────────────────────────────────────────────

  /** Assert page title is present */
  async assertPageLoaded(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
  }

  /** Assert Start Session button state */
  async assertStartSessionEnabled(enabled: boolean): Promise<void> {
    if (enabled) {
      await expect(this.startSessionButton).toBeEnabled();
    } else {
      await expect(this.startSessionButton).toBeDisabled();
    }
  }

  /** Assert End Session button state */
  async assertEndSessionEnabled(enabled: boolean): Promise<void> {
    if (enabled) {
      await expect(this.endSessionButton).toBeEnabled();
    } else {
      await expect(this.endSessionButton).toBeDisabled();
    }
  }

  /** Assert agent state text contains an expected value */
  async assertAgentState(expected: string | RegExp): Promise<void> {
    await expect(this.agentStateText).toContainText(expected);
  }

  // ── Outbound dialing ──────────────────────────────────────────────────

  /** Enter a phone number and click Dial Number */
  async dialNumber(phoneNumber: string): Promise<void> {
    this.logger.info(`Dialing number: ${phoneNumber}`);
    await this.dialNumberInput.fill(phoneNumber);
    await this.dialNumberButton.click();
  }

  /** Assert dial input is visible */
  async assertDialControlsVisible(): Promise<void> {
    await expect(this.dialNumberInput).toBeVisible();
    await expect(this.dialNumberButton).toBeVisible();
  }

  // ── Voice controls ────────────────────────────────────────────────────

  /** Check if voice controls are visible */
  async areVoiceControlsVisible(): Promise<boolean> {
    return this.holdResumeButton.isVisible();
  }

  /** Click Hold or Resume */
  async toggleHoldResume(): Promise<void> {
    this.logger.info('Toggling Hold/Resume');
    await this.holdResumeButton.click();
  }

  /** Click Hang Up */
  async hangUp(): Promise<void> {
    this.logger.info('Hanging up call');
    await this.hangUpButton.click();
  }

  /** Assert voice controls are visible */
  async assertVoiceControlsVisible(): Promise<void> {
    await expect(this.holdResumeButton).toBeVisible();
    await expect(this.hangUpButton).toBeVisible();
  }

  /** Assert Hold button label */
  async assertHoldButtonLabel(label: 'Hold' | 'Resume'): Promise<void> {
    await expect(this.holdResumeButton).toHaveText(label);
  }
}
