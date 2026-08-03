// config/environments.ts
export type Environment = 'local' | 'dev' | 'staging' | 'production';

export interface EnvironmentConfig {
  baseURL: string;
  apiURL: string;
  authURL: string;
  cxoneHostname: string;
  timeout: number;
  retries: number;
}

const environments: Record<Environment, EnvironmentConfig> = {
  local: {
    baseURL: 'http://localhost:3000',
    apiURL: 'http://localhost:3000/api/v1',
    authURL: 'http://localhost:3000/auth',
    cxoneHostname: 'https://cxone.staging.niceincontact.com',
    timeout: 30_000,
    retries: 0,
  },
  dev: {
    baseURL: 'http://localhost:3000',
    apiURL: 'https://cxone.staging.niceincontact.com',
    authURL: 'https://cxone.staging.niceincontact.com',
    cxoneHostname: 'https://cxone.staging.niceincontact.com',
    timeout: 45_000,
    retries: 1,
  },
  staging: {
    baseURL: 'http://localhost:3000',
    apiURL: 'https://cxone.staging.niceincontact.com',
    authURL: 'https://cxone.staging.niceincontact.com',
    cxoneHostname: 'https://cxone.staging.niceincontact.com',
    timeout: 60_000,
    retries: 2,
  },
  production: {
    baseURL: 'http://localhost:3000',
    apiURL: 'https://cxone.niceincontact.com',
    authURL: 'https://cxone.niceincontact.com',
    cxoneHostname: 'https://cxone.niceincontact.com',
    timeout: 60_000,
    retries: 3,
  },
};

export function getEnvironmentConfig(): EnvironmentConfig {
  const env = (process.env.TEST_ENV as Environment) || 'dev';
  if (!environments[env]) {
    throw new Error(`Unknown environment: ${env}. Valid options: ${Object.keys(environments).join(', ')}`);
  }
  return environments[env];
}

export default environments;
