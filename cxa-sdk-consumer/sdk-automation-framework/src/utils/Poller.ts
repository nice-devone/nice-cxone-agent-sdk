// src/utils/Poller.ts
import { Logger } from './Logger';

export interface PollOptions<T> {
  /** async function that returns a value when condition is met, or null/undefined to keep polling */
  fn: () => Promise<T | null | undefined>;
  /** max time to wait in ms (default: 30_000) */
  timeout?: number;
  /** interval between attempts in ms (default: 1_000) */
  interval?: number;
  /** description for logging */
  description?: string;
}

/**
 * Poller — retries an async function until it returns a truthy value or timeout is reached.
 * Useful for polling async job statuses, webhook arrivals, or eventual-consistency checks.
 */
export class Poller {
  private static logger = Logger.getInstance();

  static async poll<T>(options: PollOptions<T>): Promise<T> {
    const {
      fn,
      timeout = 30_000,
      interval = 1_000,
      description = 'condition',
    } = options;

    const deadline = Date.now() + timeout;
    let attempts = 0;

    while (Date.now() < deadline) {
      attempts++;
      this.logger.debug(`Polling ${description} (attempt ${attempts})`);

      const result = await fn();
      if (result !== null && result !== undefined) {
        this.logger.info(`Polling ${description} succeeded after ${attempts} attempt(s)`);
        return result;
      }

      const remaining = deadline - Date.now();
      if (remaining <= 0) break;

      await this.sleep(Math.min(interval, remaining));
    }

    throw new Error(
      `Polling "${description}" timed out after ${timeout}ms (${attempts} attempts)`
    );
  }

  /**
   * Poll until a predicate returns true.
   */
  static async waitUntil(
    predicate: () => Promise<boolean>,
    options: Omit<PollOptions<boolean>, 'fn'> = {}
  ): Promise<void> {
    await this.poll({
      ...options,
      fn: async () => {
        const ok = await predicate();
        return ok ? true : null;
      },
    });
  }

  private static sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
