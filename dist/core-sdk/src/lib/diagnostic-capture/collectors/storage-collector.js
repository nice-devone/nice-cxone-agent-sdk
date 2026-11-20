/**
 * Snapshot the current document's `window.localStorage` as a plain object.
 * Values that parse as JSON are returned as their parsed form (objects, arrays,
 * primitives); values that don't are returned as the raw string. Mirrors the
 * shape the chrome-logger-extension's `tools/har-viewer.html` expects in
 * `log._localStorage`.
 *
 * @returns object keyed by storage key, values JSON-parsed where possible.
 *
 * @example
 * ```
 * localStorage.setItem('agent_details', '[{"agentId":42}]');
 * snapshotLocalStorage();
 * // { agent_details: [{ agentId: 42 }] }
 * ```
 */
export function snapshotLocalStorage() {
    const out = {};
    if (typeof localStorage === 'undefined')
        return out;
    for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k == null)
            continue;
        const raw = localStorage.getItem(k);
        if (raw == null)
            continue;
        try {
            out[k] = JSON.parse(raw);
        }
        catch (_a) {
            out[k] = raw;
        }
    }
    return out;
}
//# sourceMappingURL=storage-collector.js.map