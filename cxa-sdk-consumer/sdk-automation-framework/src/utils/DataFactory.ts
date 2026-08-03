// src/utils/DataFactory.ts
import { CreateUserPayload, UserRole } from '../types/api.types';

let counter = Date.now();

function uid(): string {
  return (++counter).toString(36);
}

/**
 * DataFactory generates realistic test data without external libraries.
 * All data is deterministic when seeded.
 */
export class DataFactory {
  private static readonly FIRST_NAMES = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'Grace', 'Hank'];
  private static readonly LAST_NAMES  = ['Smith', 'Jones', 'Brown', 'White', 'Harris', 'Clark', 'Lewis', 'Young'];
  private static readonly DOMAINS     = ['example.com', 'test.io', 'acme.dev', 'qa.org'];
  private static readonly ROLES: UserRole[] = ['admin', 'editor', 'viewer'];

  /** Random integer in [min, max] */
  static int(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /** Pick a random item from an array */
  static pick<T>(arr: T[]): T {
    return arr[this.int(0, arr.length - 1)];
  }

  /** Generate a random full name */
  static fullName(): string {
    return `${this.pick(this.FIRST_NAMES)} ${this.pick(this.LAST_NAMES)}`;
  }

  /** Generate a unique email */
  static email(prefix?: string): string {
    const local = prefix ?? `user.${uid()}`;
    return `${local}@${this.pick(this.DOMAINS)}`;
  }

  /** Generate a secure random password */
  static password(length = 16): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    return Array.from({ length }, () => chars[this.int(0, chars.length - 1)]).join('');
  }

  /** Build a valid CreateUserPayload */
  static createUser(overrides: Partial<CreateUserPayload> = {}): CreateUserPayload {
    return {
      email:    overrides.email    ?? this.email(),
      name:     overrides.name     ?? this.fullName(),
      role:     overrides.role     ?? this.pick(this.ROLES),
      password: overrides.password ?? this.password(),
    };
  }

  /** Generate an array of users */
  static createUsers(count: number, overrides: Partial<CreateUserPayload> = {}): CreateUserPayload[] {
    return Array.from({ length: count }, () => this.createUser(overrides));
  }

  /** Generate a random UUID-like string */
  static uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /** ISO timestamp some days ago */
  static pastDate(daysAgo: number): string {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString();
  }

  /** ISO timestamp some days in the future */
  static futureDate(daysAhead: number): string {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString();
  }
}
