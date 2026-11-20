/**
 * Fetch `/version_history.json` from the same origin and return the parsed
 * body. Embedded in HAR as `log._versionHistory` so the viewer can resolve
 * the `cxaClientVersion` hash to a human-readable build name.
 *
 * Network errors and non-2xx responses are swallowed (returns `null`); the
 * resulting HAR simply omits the vendor extension.
 *
 * @returns parsed JSON body, or `null` if unavailable.
 *
 * @example
 * ```
 * const vh = await fetchVersionHistory();
 * // { 'release-26.2-RC1': 'abc123...', ... } | null
 * ```
 */
export declare function fetchVersionHistory(): Promise<unknown | null>;
