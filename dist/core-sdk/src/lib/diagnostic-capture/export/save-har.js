import { __awaiter } from "tslib";
import { snapshotLocalStorage } from '../collectors/storage-collector';
import { fetchVersionHistory } from '../collectors/version-history-collector';
import { buildHar } from '../format/har-builder';
import { getDiagnosticBuffers } from '../instrumentation/install';
/**
 * Produce a filename-safe timestamp (dots and colons replaced with hyphens).
 * Matches the chrome-logger-extension's filename convention so triage
 * tooling sees the same pattern.
 *
 * @returns ISO-like timestamp with `:` and `.` replaced by `-`.
 *
 * @example
 * ```
 * timestampForFilename(); // '2026-05-21T15-04-22-007Z'
 * ```
 */
function timestampForFilename() {
    return new Date().toISOString().replace(/[:.]/g, '-');
}
/**
 * Collect the capture buffers, snapshot localStorage, fetch version_history.json,
 * build a HAR 1.2 JSON document with the three vendor extensions, and trigger
 * a browser download of the resulting `cxagent-<timestamp>.har` file.
 *
 * HTTP and PerformanceObserver entries are **drained** — each is a one-shot
 * record, so a second save reports only traffic since the first. WebSocket
 * entries are **snapshotted** instead: the patch keys them per socket in a
 * `WeakMap` and keeps appending frames for as long as the socket is open, so
 * draining one would send its still-live connection dark for every later
 * save. SignalR connections last the whole session, which makes that the
 * common case rather than an edge one. Consequence: consecutive saves repeat
 * WebSocket frames already present in the earlier file.
 *
 * Resolves once the download anchor has been clicked; the file save itself
 * is then handled by the browser. Object URL is revoked after a short delay
 * to give the browser time to read the Blob.
 *
 * Called from the **Save Logs** button on Settings → Report Issue.
 *
 * @returns promise that resolves once the download has been initiated.
 *
 * @example
 * ```
 * <CcfButton onClick={() => { saveHar(); }}>Save Logs</CcfButton>
 * ```
 */
export function saveHar() {
    return __awaiter(this, void 0, void 0, function* () {
        const { netBuffer, wsBuffer, perfBuffer } = getDiagnosticBuffers();
        const har = buildHar({
            netEntries: netBuffer.drain(),
            wsEntries: wsBuffer.snapshot(),
            perfEntries: perfBuffer.drain(),
            localStorageSnapshot: snapshotLocalStorage(),
            versionHistory: yield fetchVersionHistory(),
        });
        const json = JSON.stringify(har);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cxagent-${timestampForFilename()}.har`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
}
//# sourceMappingURL=save-har.js.map