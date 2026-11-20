let installed = false;
/**
 * Convert a single `PerformanceResourceTiming` entry into a HAR entry.
 * No headers or body are available from this API — only URL, sizes, and
 * a full timing breakdown — so the resulting HAR entry is flagged with
 * `_synthetic: 'performance-observer'` for downstream triage.
 *
 * @param e - resource-timing entry observed by `PerformanceObserver`.
 * @returns HAR entry suitable for merging into `log.entries`.
 *
 * @example entryFromPerf(performance.getEntriesByType('resource')[0]);
 */
function entryFromPerf(e) {
    const dns = Math.max(-1, e.domainLookupEnd - e.domainLookupStart);
    const connect = Math.max(-1, e.connectEnd - e.connectStart);
    const ssl = e.secureConnectionStart > 0 ? e.connectEnd - e.secureConnectionStart : -1;
    const wait = Math.max(-1, e.responseStart - e.requestStart);
    const receive = Math.max(-1, e.responseEnd - e.responseStart);
    return {
        startedDateTime: new Date(performance.timeOrigin + e.startTime).toISOString(),
        time: e.duration,
        request: {
            method: 'GET',
            url: e.name,
            httpVersion: 'HTTP/1.1',
            headers: [],
            queryString: [],
            cookies: [],
            headersSize: -1,
            bodySize: 0,
        },
        response: {
            status: 0,
            statusText: '',
            httpVersion: 'HTTP/1.1',
            headers: [],
            cookies: [],
            content: { size: e.encodedBodySize || 0, mimeType: '' },
            redirectURL: '',
            headersSize: -1,
            bodySize: e.encodedBodySize || 0,
        },
        cache: {},
        timings: { dns, connect, ssl, send: 0, wait, receive },
        _synthetic: 'performance-observer',
    };
}
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
export function installPerformanceObserver(buffer) {
    if (installed)
        return;
    if (typeof PerformanceObserver === 'undefined')
        return;
    installed = true;
    try {
        const obs = new PerformanceObserver((list) => {
            for (const e of list.getEntries()) {
                buffer.push(entryFromPerf(e));
            }
        });
        obs.observe({ type: 'resource', buffered: true });
    }
    catch (_a) {
        /* best-effort */
    }
}
//# sourceMappingURL=performance-observer.js.map