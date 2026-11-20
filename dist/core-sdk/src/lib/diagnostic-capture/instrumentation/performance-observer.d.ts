import { RingBuffer } from '../buffer/ring-buffer';
import { HarEntry } from '../types';
/**
 * Register a `PerformanceObserver` for `resource` entries with
 * `buffered: true`. This is the backfill layer: it captures resources the
 * fetch/XHR/WebSocket wrappers can't see (initial HTML document,
 * `<img>` / `<script>` / `<link>` triggered loads, `navigator.sendBeacon`)
 * and recovers their timing even if they fired before the observer
 * registered (the browser keeps a rolling resource-timing buffer).
 *
 * Idempotent. No-op if `PerformanceObserver` is unavailable.
 *
 * @param buffer - ring buffer to push captured entries into.
 *
 * @example installPerformanceObserver(buffer);
 */
export declare function installPerformanceObserver(buffer: RingBuffer<HarEntry>): void;
