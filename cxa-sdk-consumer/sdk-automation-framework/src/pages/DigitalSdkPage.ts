// src/pages/DigitalSdkPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * DigitalSdkPage — models the Digital SDK component at route "/digital-sdk".
 *
 * Features:
 *   - Digital contact case-ID cards
 *   - Message thread display (inbound / outbound messages)
 *   - Reply input + Reply button
 */
export class DigitalSdkPage extends BasePage {
  readonly path = '/digital-sdk';

  // ── Page header ────────────────────────────────────────────────────────
  readonly pageTitle: Locator;

  // ── Contact cards ─────────────────────────────────────────────────────
  readonly noContactsMessage: Locator;
  readonly contactCards: Locator;

  // ── Message thread ────────────────────────────────────────────────────
  readonly caseIdLabel: Locator;
  readonly messagesContainer: Locator;

  // ── Reply controls ────────────────────────────────────────────────────
  readonly replyInput: Locator;
  readonly replyButton: Locator;

  constructor(page: Page) {
    super(page);

    this.pageTitle = page.locator('text=Digital sdk');
    this.noContactsMessage = page.locator('text=There is no digital card assigned to you.');
    this.contactCards = page.locator('.MuiCard-root').filter({ hasText: /case/i });
    this.caseIdLabel = page.locator('text=caseId:').locator('..');
    this.messagesContainer = page.locator('text=Messages :').locator('..');
    this.replyInput = page.locator('.MuiCard-root input, .MuiCard-root .MuiTextField-root input').last();
    this.replyButton = page.getByRole('button', { name: 'Reply' });
  }

  protected override async waitForReady(): Promise<void> {
    await expect(this.pageTitle).toBeVisible({ timeout: 15_000 });
  }

  // ── Contact selection ─────────────────────────────────────────────────

  /** Get the number of digital contact cards displayed */
  async getContactCardCount(): Promise<number> {
    return this.contactCards.count();
  }

  /** Click a contact card by its index */
  async selectContactByIndex(index: number): Promise<void> {
    this.logger.info(`Selecting digital contact card at index ${index}`);
    await this.contactCards.nth(index).click();
  }

  /** Assert no contacts message is displayed */
  async assertNoContacts(): Promise<void> {
    await expect(this.noContactsMessage).toBeVisible();
  }

  /** Assert at least one contact card is present */
  async assertContactsPresent(): Promise<void> {
    await expect(this.contactCards.first()).toBeVisible();
  }

  // ── Messages ──────────────────────────────────────────────────────────

  /** Get all visible message elements */
  private get messageItems(): Locator {
    return this.messagesContainer.locator('div > div');
  }

  /** Get the count of messages in the current thread */
  async getMessageCount(): Promise<number> {
    return this.messageItems.count();
  }

  /** Assert a message containing the given text is visible in the thread */
  async assertMessageVisible(text: string | RegExp): Promise<void> {
    await expect(this.messagesContainer.locator(`text=${text}`)).toBeVisible();
  }

  /** Assert the case ID label contains the expected ID */
  async assertCaseId(expected: string | RegExp): Promise<void> {
    await expect(this.caseIdLabel).toContainText(expected);
  }

  // ── Reply ─────────────────────────────────────────────────────────────

  /** Type a message in the reply field */
  async typeReply(message: string): Promise<void> {
    this.logger.info(`Typing reply: ${message}`);
    await this.replyInput.fill(message);
  }

  /** Click the Reply button */
  async clickReply(): Promise<void> {
    this.logger.info('Clicking Reply button');
    await this.replyButton.click();
  }

  /** Send a reply (type + click) */
  async sendReply(message: string): Promise<void> {
    await this.typeReply(message);
    await this.clickReply();
  }

  /** Assert the reply button is disabled when input is empty */
  async assertReplyDisabledWhenEmpty(): Promise<void> {
    await this.replyInput.fill('');
    await expect(this.replyButton).toBeDisabled();
  }

  /** Assert the reply button is enabled when text is present */
  async assertReplyEnabledWithText(): Promise<void> {
    await this.replyInput.fill('test');
    await expect(this.replyButton).toBeEnabled();
    await this.replyInput.clear();
  }

  /** Assert page loaded */
  async assertPageLoaded(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
  }
}
