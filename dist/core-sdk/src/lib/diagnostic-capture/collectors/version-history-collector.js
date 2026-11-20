import { __awaiter } from "tslib";
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
export function fetchVersionHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch('/version_history.json', { credentials: 'omit' });
            if (!res.ok)
                return null;
            return yield res.json();
        }
        catch (_a) {
            return null;
        }
    });
}
//# sourceMappingURL=version-history-collector.js.map