// src/pages/NavBarComponent.ts
import { Page, Locator, expect } from '@playwright/test';
import { Logger } from '../utils/Logger';

/**
 * NavBarComponent — models the persistent side navigation drawer.
 *
 * Tabs:
 *   0 = Auth (route: /)
 *   1 = ACD  (route: /acd-sdk)
 *   2 = Digital (route: /digital-sdk)
 *   3 = Custom / CXA Placeholder (route: /cxa-placeholder)
 *   4 = Logout
 */
export class NavBarComponent {
  private readonly page: Page;
  private readonly logger: Logger;

  // Locators
  readonly drawer: Locator;
  readonly drawerHeader: Locator;
  readonly tabItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logger = Logger.getInstance();

    this.drawer = page.locator('.MuiDrawer-root');
    this.drawerHeader = page.locator('.MuiDrawer-root >> text=CXA CONSUMER');
    this.tabItems = page.locator('.MuiDrawer-root .MuiListItemButton-root');
  }

  /** Get a specific tab by its visible text */
  tab(name: 'Auth' | 'ACD' | 'Digital' | 'Custom' | 'Logout'): Locator {
    // Tab labels in the app: ["Auth","ACD ","Digital ","Custom","Logout"]
    return this.tabItems.filter({ hasText: new RegExp(`^${name}`, 'i') });
  }

  /** Get a tab by its zero-based index */
  tabByIndex(index: number): Locator {
    return this.tabItems.nth(index);
  }

  /** Click a navigation tab and wait for the route to load */
  async navigateTo(name: 'Auth' | 'ACD' | 'Digital' | 'Custom' | 'Logout'): Promise<void> {
    this.logger.info(`NavBar: clicking "${name}" tab`);
    await this.tab(name).click();
    // Wait for networkidle after navigation
    await this.page.waitForLoadState('networkidle').catch(() => {});
  }

  /** Assert drawer is visible */
  async assertDrawerVisible(): Promise<void> {
    await expect(this.drawer).toBeVisible();
  }

  /** Assert drawer header text */
  async assertDrawerHeader(): Promise<void> {
    await expect(this.drawerHeader).toBeVisible();
  }

  /** Assert a tab is selected (has the Mui-selected class) */
  async assertTabSelected(name: 'Auth' | 'ACD' | 'Digital' | 'Custom' | 'Logout'): Promise<void> {
    const tab = this.tab(name);
    await expect(tab).toHaveClass(/Mui-selected/);
  }

  /** Assert tabs beyond Auth are disabled (before authentication) */
  async assertTabsDisabledBeforeAuth(): Promise<void> {
    // Tabs 1-4 should be disabled when not authenticated
    for (let i = 1; i <= 4; i++) {
      await expect(this.tabByIndex(i)).toBeDisabled();
    }
  }

  /** Assert tabs are enabled (after authentication) */
  async assertTabsEnabledAfterAuth(): Promise<void> {
    for (let i = 1; i <= 3; i++) {
      await expect(this.tabByIndex(i)).toBeEnabled();
    }
  }

  /** Get count of all navigation tabs */
  async getTabCount(): Promise<number> {
    return this.tabItems.count();
  }
}
