// src/pages/BasePage.ts
import { Page, Locator, expect } from '@playwright/test';
import { Logger } from '../utils/Logger';

/**
 * BasePage — all Page Objects extend this.
 * Provides shared navigation, wait helpers, and element utilities.
 */
export abstract class BasePage {
  protected readonly page: Page;
  protected readonly logger: Logger;

  /** Subclasses declare their page path */
  abstract readonly path: string;

  constructor(page: Page) {
    this.page = page;
    this.logger = Logger.getInstance();
  }

  /** Navigate to this page's path */
  async navigate(params?: Record<string, string>): Promise<void> {
    let url = this.path;
    if (params) {
      const qs = new URLSearchParams(params).toString();
      url = `${url}?${qs}`;
    }
    this.logger.info(`Navigating to: ${url}`);
    await this.page.goto(url);
    await this.waitForReady();
  }

  /** Override to define page-ready condition */
  protected async waitForReady(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /** Get current URL */
  async currentURL(): Promise<string> {
    return this.page.url();
  }

  /** Get page title */
  async title(): Promise<string> {
    return this.page.title();
  }

  /** Assert the page title */
  async assertTitle(expected: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(expected);
  }

  /** Assert the URL contains a substring */
  async assertURL(expected: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(expected);
  }

  /** Wait for a locator to be visible */
  async waitForVisible(locator: Locator, timeout = 10_000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /** Fill an input, clearing it first */
  async fill(locator: Locator, value: string): Promise<void> {
    await locator.clear();
    await locator.fill(value);
  }

  /** Click and wait for navigation */
  async clickAndNavigate(locator: Locator): Promise<void> {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }),
      locator.click(),
    ]);
  }

  /** Scroll element into view */
  async scrollIntoView(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /** Take a screenshot */
  async screenshot(name: string): Promise<Buffer> {
    return this.page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true });
  }

  /** Wait for a toast / snackbar message */
  async waitForToast(text: string | RegExp, timeout = 5_000): Promise<void> {
    const toast = this.page.locator('[role="alert"], .toast, .snackbar').filter({ hasText: text });
    await toast.waitFor({ state: 'visible', timeout });
  }

  /** Dismiss a dialog if present */
  async dismissDialog(): Promise<void> {
    this.page.once('dialog', (d) => d.dismiss());
  }
}
