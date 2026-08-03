// src/pages/CxaPlaceholderPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CxaPlaceholderPage — models the CXA Placeholder component at route "/cxa-placeholder".
 *
 * Features:
 *   - Switch Contact button
 *   - launchCXA div (iframe placeholder)
 */
export class CxaPlaceholderPage extends BasePage {
  readonly path = '/cxa-placeholder';

  readonly switchContactButton: Locator;
  readonly cxaPlaceholderDiv: Locator;
  readonly cxaIframe: Locator;

  constructor(page: Page) {
    super(page);

    this.switchContactButton = page.getByRole('button', { name: 'Switch Contact' });
    this.cxaPlaceholderDiv = page.locator('#launchCXA');
    this.cxaIframe = page.locator('#launchCXA iframe');
  }

  protected override async waitForReady(): Promise<void> {
    await expect(this.switchContactButton).toBeVisible({ timeout: 15_000 });
  }

  /** Assert the placeholder div is present */
  async assertPlaceholderVisible(): Promise<void> {
    await expect(this.cxaPlaceholderDiv).toBeVisible();
  }

  /** Assert the Switch Contact button is visible */
  async assertSwitchContactButtonVisible(): Promise<void> {
    await expect(this.switchContactButton).toBeVisible();
  }

  /** Click the Switch Contact button */
  async clickSwitchContact(): Promise<void> {
    this.logger.info('Clicking Switch Contact');
    await this.switchContactButton.click();
  }

  /** Assert an iframe was injected into the placeholder div */
  async assertIframePresent(): Promise<void> {
    await expect(this.cxaIframe).toBeAttached();
  }

  /** Assert page loaded */
  async assertPageLoaded(): Promise<void> {
    await expect(this.switchContactButton).toBeVisible();
    await expect(this.cxaPlaceholderDiv).toBeVisible();
  }
}
