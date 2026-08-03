// src/fixtures/base.fixture.ts
import { test as base, APIRequestContext } from '@playwright/test';
import { ApiClient } from '../api/ApiClient';
import { AuthService } from '../api/AuthService';
import { UsersApi } from '../api/UsersApi';
import { ContactsApi } from '../api/ContactsApi';
import { SkillsApi } from '../api/SkillsApi';
import { AgentSessionApi } from '../api/AgentSessionApi';
import { DigitalApi } from '../api/DigitalApi';
import { LoginPage } from '../pages/LoginPage';
import { AuthPage } from '../pages/AuthPage';
import { AcdSdkPage } from '../pages/AcdSdkPage';
import { DigitalSdkPage } from '../pages/DigitalSdkPage';
import { CxaPlaceholderPage } from '../pages/CxaPlaceholderPage';
import { NavBarComponent } from '../pages/NavBarComponent';
import { getEnvironmentConfig } from '../../config/environments';
import { Logger } from '../utils/Logger';

/** Shape of all custom fixtures */
export type TestFixtures = {
  // Environment config
  envConfig: ReturnType<typeof getEnvironmentConfig>;

  // Core SDK clients
  apiClient: ApiClient;
  authService: AuthService;

  // API namespaces
  usersApi: UsersApi;
  contactsApi: ContactsApi;
  skillsApi: SkillsApi;
  agentSessionApi: AgentSessionApi;
  digitalApi: DigitalApi;

  // Authenticated API client (auto-logs in)
  authenticatedClient: ApiClient;

  // Page objects
  loginPage: LoginPage;
  authPage: AuthPage;
  acdSdkPage: AcdSdkPage;
  digitalSdkPage: DigitalSdkPage;
  cxaPlaceholderPage: CxaPlaceholderPage;
  navBar: NavBarComponent;

  // Utility
  logger: Logger;
};

/**
 * Extended test object with all SDK fixtures.
 * Import this instead of @playwright/test in test files.
 */
export const test = base.extend<TestFixtures>({
  // ── Environment config ───────────────────────────────────────────────────
  envConfig: async ({}, use) => {
    await use(getEnvironmentConfig());
  },

  // ── Logger ───────────────────────────────────────────────────────────────
  logger: async ({}, use) => {
    await use(Logger.getInstance());
  },

  // ── Base API client (unauthenticated) ────────────────────────────────────
  apiClient: async ({ request, envConfig }, use) => {
    const client = new ApiClient(request as unknown as APIRequestContext, envConfig.apiURL);
    await use(client);
  },

  // ── AuthService ──────────────────────────────────────────────────────────
  authService: async ({ apiClient }, use) => {
    await use(new AuthService(apiClient));
  },

  // ── Users API ─────────────────────────────────────────────────────────────
  usersApi: async ({ apiClient }, use) => {
    await use(new UsersApi(apiClient));
  },

  // ── Contacts API ──────────────────────────────────────────────────────────
  contactsApi: async ({ apiClient }, use) => {
    await use(new ContactsApi(apiClient));
  },

  // ── Skills API ────────────────────────────────────────────────────────────
  skillsApi: async ({ apiClient }, use) => {
    await use(new SkillsApi(apiClient));
  },

  // ── Agent Session API ─────────────────────────────────────────────────────
  agentSessionApi: async ({ apiClient }, use) => {
    await use(new AgentSessionApi(apiClient));
  },

  // ── Digital API ───────────────────────────────────────────────────────────
  digitalApi: async ({ apiClient }, use) => {
    await use(new DigitalApi(apiClient));
  },

  // ── Authenticated client (uses env credentials) ───────────────────────────
  authenticatedClient: async ({ apiClient, authService }, use) => {
    await authService.authenticateClientCredentials({
      clientId: process.env.CLIENT_ID ?? 'test-client',
      clientSecret: process.env.CLIENT_SECRET ?? 'test-secret',
    });
    await use(apiClient);
  },

  // ── Page Objects ─────────────────────────────────────────────────────────
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  authPage: async ({ page }, use) => {
    await use(new AuthPage(page));
  },

  acdSdkPage: async ({ page }, use) => {
    await use(new AcdSdkPage(page));
  },

  digitalSdkPage: async ({ page }, use) => {
    await use(new DigitalSdkPage(page));
  },

  cxaPlaceholderPage: async ({ page }, use) => {
    await use(new CxaPlaceholderPage(page));
  },

  navBar: async ({ page }, use) => {
    await use(new NavBarComponent(page));
  },
});

export { expect } from '@playwright/test';
