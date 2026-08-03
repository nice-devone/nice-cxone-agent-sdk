// src/api/AuthService.ts
import { ApiClient } from './ApiClient';
import { AuthTokenResponse } from '../types/api.types';
import { Logger } from '../utils/Logger';

export interface Credentials {
  clientId: string;
  clientSecret: string;
  username?: string;
  password?: string;
  scope?: string;
}

/**
 * AuthService handles OAuth2 / credential-based authentication.
 * Stores and refreshes tokens automatically.
 */
export class AuthService {
  private client: ApiClient;
  private logger = Logger.getInstance();
  private tokenCache: AuthTokenResponse | null = null;
  private tokenExpiresAt = 0;

  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Client Credentials Grant (machine-to-machine)
   */
  async authenticateClientCredentials(creds: Credentials): Promise<AuthTokenResponse> {
    this.logger.info('Authenticating via Client Credentials Grant');

    const response = await this.client.post<AuthTokenResponse>('/oauth/token', {
      grant_type: 'client_credentials',
      client_id: creds.clientId,
      client_secret: creds.clientSecret,
      scope: creds.scope ?? 'read write',
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status}`);
    }

    this.cacheToken(response.body);
    return response.body;
  }

  /**
   * Resource Owner Password Credentials Grant
   */
  async authenticatePassword(creds: Credentials): Promise<AuthTokenResponse> {
    this.logger.info(`Authenticating user: ${creds.username}`);

    const response = await this.client.post<AuthTokenResponse>('/oauth/token', {
      grant_type: 'password',
      client_id: creds.clientId,
      client_secret: creds.clientSecret,
      username: creds.username,
      password: creds.password,
      scope: creds.scope ?? 'read write',
    });

    if (!response.ok) {
      throw new Error(`User authentication failed: ${response.status}`);
    }

    this.cacheToken(response.body);
    return response.body;
  }

  /**
   * Refresh an expired token
   */
  async refreshToken(refreshToken: string, creds: Credentials): Promise<AuthTokenResponse> {
    this.logger.info('Refreshing access token');

    const response = await this.client.post<AuthTokenResponse>('/oauth/token', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: creds.clientId,
      client_secret: creds.clientSecret,
    });

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.status}`);
    }

    this.cacheToken(response.body);
    return response.body;
  }

  /** Returns cached token or throws if expired/absent */
  getAccessToken(): string {
    if (!this.tokenCache || Date.now() >= this.tokenExpiresAt) {
      throw new Error('No valid access token. Please authenticate first.');
    }
    return this.tokenCache.access_token;
  }

  /** Returns true if a valid, unexpired token is cached */
  isAuthenticated(): boolean {
    return !!this.tokenCache && Date.now() < this.tokenExpiresAt;
  }

  /** Clear cached token (logout) */
  logout(): void {
    this.tokenCache = null;
    this.tokenExpiresAt = 0;
    this.client.clearAuthToken();
    this.logger.info('Logged out — token cleared');
  }

  private cacheToken(token: AuthTokenResponse): void {
    this.tokenCache = token;
    // Subtract 30s buffer from expiry
    this.tokenExpiresAt = Date.now() + (token.expires_in - 30) * 1000;
    this.client.setAuthToken(token.access_token);
    this.logger.debug(`Token cached, expires in ${token.expires_in}s`);
  }
}
