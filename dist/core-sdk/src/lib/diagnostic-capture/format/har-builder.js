/**
 * Convert one buffered WebSocket connection into a HAR entry with the
 * de-facto `_resourceType: 'websocket'` + `_webSocketMessages` vendor
 * extension. Request is synthesized as a minimal HTTP/1.1 upgrade so
 * standard HAR viewers render it; the frame log lives on
 * `_webSocketMessages`.
 *
 * @param ws - buffered connection record.
 * @returns HAR entry compatible with Chrome DevTools / Charles / `tools/har-viewer.html`.
 * @example wsEntryToHar( url: 'wss://x', opened: '...', frames: [] );
 */
function wsEntryToHar(ws) {
    return {
        startedDateTime: ws.opened,
        time: 0,
        request: {
            method: 'GET',
            url: ws.url,
            httpVersion: 'HTTP/1.1',
            headers: [
                { name: 'Upgrade', value: 'websocket' },
                { name: 'Connection', value: 'Upgrade' }
            ],
            queryString: [],
            cookies: [],
            headersSize: -1,
            bodySize: 0,
        },
        response: {
            status: 101,
            statusText: 'Switching Protocols',
            httpVersion: 'HTTP/1.1',
            headers: [],
            cookies: [],
            content: { size: 0, mimeType: '' },
            redirectURL: '',
            headersSize: -1,
            bodySize: 0,
        },
        cache: {},
        timings: { send: 0, wait: -1, receive: -1 },
        _resourceType: 'websocket',
        _webSocketMessages: ws.frames,
    };
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
export function buildHar(input) {
    const netUrls = new Set(input.netEntries.map((e) => e.request.url));
    const perfDeduped = input.perfEntries.filter((e) => !netUrls.has(e.request.url));
    const wsHarEntries = input.wsEntries.map(wsEntryToHar);
    const entries = [...input.netEntries, ...wsHarEntries, ...perfDeduped].sort((a, b) => a.startedDateTime.localeCompare(b.startedDateTime));
    const log = {
        version: '1.2',
        creator: { name: 'cxone-agent-inapp-har', version: '0.1.0' },
        entries,
        _localStorage: input.localStorageSnapshot,
    };
    if (input.versionHistory !== null)
        log._versionHistory = input.versionHistory;
    return { log };
}
//# sourceMappingURL=har-builder.js.map