/**
 * Fixed-capacity FIFO buffer. When push() would exceed the capacity, the
 * oldest item is evicted. Used to bound the diagnostic-capture pipeline's
 * memory footprint over long agent working sessions.
 *
 * @example
 * ```
 * const buf = new RingBuffer<number>(3);
 * buf.push(1); buf.push(2); buf.push(3); buf.push(4);
 * buf.drain(); // [2, 3, 4]; buf is now empty
 * ```
 */
export declare class RingBuffer<T> {
    private items;
    private readonly capacity;
    /**
     * @param capacity - maximum number of items retained. Pushes beyond this
     *   evict the oldest item (FIFO).
     *
     * @example const buf = new RingBuffer<HarEntry>(100); // retain the 100 most recent HAR entries
     */
    constructor(capacity: number);
    /**
     * Append an item; if the buffer is at capacity the oldest item is dropped.
     * @param item - value to retain.
     * @example buf.push(harEntry);
     */
    push(item: T): void;
    /**
     * Remove and return the current contents (oldest first). The buffer is
     * empty after this call — repeated drains do not re-yield earlier items.
     * @returns the retained items in insertion order.
     * @example const entries = buf.drain();
     */
    drain(): T[];
    /**
     * Return the current contents (oldest first) **without** emptying the
     * buffer. Use this instead of `drain()` for records the capture layer
     * keeps writing to after a read — WebSocket entries are held per-socket
     * in a `WeakMap`, so removing one while its socket is still open would
     * leave the patch appending frames to a detached object that no later
     * `saveHar()` could retrieve.
     *
     * @returns a shallow copy of the retained items in insertion order.
     * @example const wsEntries = buf.snapshot();
     */
    snapshot(): T[];
    /**
     * Current number of retained items.
     * @example if (buf.length === 0) return;
     */
    get length(): number;
    /**
     * Maximum number of items retained. Exposed so collaborators that mirror
     * buffered records elsewhere can bound themselves to the same ceiling
     * rather than restating the number.
     * @example if (tracked.size less then buf.maxSize) evictOldest();
     */
    get maxSize(): number;
    /**
     * Remove all retained items.
     * @example buf.clear();
     */
    clear(): void;
}
