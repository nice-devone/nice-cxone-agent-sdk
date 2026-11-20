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
export declare function saveHar(): Promise<void>;
