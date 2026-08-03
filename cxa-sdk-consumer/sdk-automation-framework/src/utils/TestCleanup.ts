// src/utils/TestCleanup.ts
import { Logger } from './Logger';

type CleanupFn = () => Promise<void>;

/**
 * TestCleanup — registers async teardown callbacks that run in LIFO order.
 * Use inside tests to ensure resources are deleted even if the test fails.
 *
 * @example
 * test('create and cleanup user', async ({ usersApi }) => {
 *   const cleanup = new TestCleanup();
 *
 *   const user = await usersApi.create(DataFactory.createUser());
 *   cleanup.add(async () => usersApi.delete(user.body.id));
 *
 *   // ... assertions ...
 *
 *   await cleanup.run();
 * });
 */
export class TestCleanup {
  private stack: CleanupFn[] = [];
  private logger = Logger.getInstance();

  /** Register a cleanup function (runs last-in, first-out) */
  add(fn: CleanupFn): void {
    this.stack.push(fn);
  }

  /** Run all registered cleanups in reverse order */
  async run(): Promise<void> {
    const fns = this.stack.reverse();
    this.stack = [];

    for (const fn of fns) {
      try {
        await fn();
      } catch (error) {
        this.logger.warn(`Cleanup function failed: ${(error as Error).message}`);
      }
    }
  }
}
