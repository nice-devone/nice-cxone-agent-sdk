import { HarEntry, HarFile, WsBufferEntry } from '../types';
/**
 * Inputs to `buildHar`. Each of the three entry arrays comes from a
 * different capture path:
 * - `netEntries`: fetch + XMLHttpRequest patches (full headers + body)
 * - `wsEntries`: WebSocket constructor patch (per-connection frame log)
 * - `perfEntries`: PerformanceObserver backfill (timing-only, no body)
 */
export interface BuildHarInput {
    netEntries: HarEntry[];
    wsEntries: WsBufferEntry[];
    perfEntries: HarEntry[];
    localStorageSnapshot: Record<string, unknown>;
    versionHistory: unknown | null;
}
/**
 * Merge the four capture buffers into a single HAR 1.2 JSON document.
 * Dedupes PerformanceObserver entries whose URL also appears in
 * fetch/XHR entries (the latter have richer data so are preferred).
 * Embeds the localStorage snapshot and version_history.json as vendor
 * extensions on `log._localStorage` / `log._versionHistory` for the
 * companion viewer.
 *
 * @param input - merged capture inputs.
 * @returns HAR file object ready for `JSON.stringify` and Blob download.
 *
 * @example
 * ```
 * const har = buildHar({
 *   netEntries: [], wsEntries: [], perfEntries: [],
 *   localStorageSnapshot: {}, versionHistory: null,
 * });
 * ```
 */
export declare function buildHar(input: BuildHarInput): HarFile;
