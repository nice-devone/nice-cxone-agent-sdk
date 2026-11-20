/**
 * HAR 1.2 + vendor-extension type definitions used by the diagnostic-capture pipeline.
 *
 * Only the fields the in-app capture actually populates are modelled; full HAR 1.2 has
 * additional optional fields (queryString cookies, page refs, etc.) we don't emit.
 */
/**
 * A single HTTP header in HAR's name/value pair shape.
 */
export interface HarHeader {
    name: string;
    value: string;
}
/**
 * HAR request body envelope.
 */
export interface HarPostData {
    mimeType: string;
    text: string;
}
/**
 * HAR response content envelope. `encoding: 'base64'` flags binary bodies
 * (images, fonts, video) so the viewer base64-decodes before display.
 */
export interface HarContent {
    size: number;
    mimeType: string;
    text?: string;
    encoding?: 'base64';
}
/**
 * HAR timing breakdown. We populate `send`/`wait`/`receive` for fetch/XHR
 * (often `-1` when unmeasurable from page context) and the full set for
 * PerformanceObserver entries.
 */
export interface HarTimings {
    dns?: number;
    connect?: number;
    ssl?: number;
    send: number;
    wait: number;
    receive: number;
}
/**
 * HAR request shape.
 */
export interface HarRequest {
    method: string;
    url: string;
    httpVersion: string;
    headers: HarHeader[];
    queryString: HarHeader[];
    cookies: HarHeader[];
    headersSize: number;
    bodySize: number;
    postData?: HarPostData;
}
/**
 * HAR response shape.
 */
export interface HarResponse {
    status: number;
    statusText: string;
    httpVersion: string;
    headers: HarHeader[];
    cookies: HarHeader[];
    content: HarContent;
    redirectURL: string;
    headersSize: number;
    bodySize: number;
}
/**
 * A single WebSocket frame. Modelled after the de-facto `_webSocketMessages`
 * vendor extension Chrome DevTools / Charles understand.
 */
export interface WsFrame {
    type: 'send' | 'receive' | 'error';
    time: number;
    opcode?: number;
    data?: string;
}
/**
 * A single HAR log entry — covers HTTP, XHR, WebSocket, PerformanceObserver and
 * Web Worker entries via the optional `_resourceType` / `_webSocketMessages` /
 * `_synthetic` / `_workerName` vendor-extension fields.
 */
export interface HarEntry {
    startedDateTime: string;
    time: number;
    request: HarRequest;
    response: HarResponse;
    cache: Record<string, never>;
    timings: HarTimings;
    _resourceType?: string;
    _webSocketMessages?: WsFrame[];
    _synthetic?: 'performance-observer';
    _workerName?: string;
}
/**
 * In-memory representation of one captured WebSocket connection.
 * Converted to a HAR entry at save time by `wsEntryToHar` in `har-builder.ts`.
 */
export interface WsBufferEntry {
    url: string;
    opened: string;
    frames: WsFrame[];
    closed?: string;
    closeCode?: number;
}
/**
 * HAR top-level log object with the three vendor extensions the
 * `tools/har-viewer.html` reads: `_localStorage` and `_versionHistory`.
 */
export interface HarLog {
    version: '1.2';
    creator: {
        name: string;
        version: string;
    };
    entries: HarEntry[];
    _localStorage?: Record<string, unknown>;
    _versionHistory?: unknown;
}
/**
 * HAR file wrapper — the JSON written to disk by `saveHar()`.
 */
export interface HarFile {
    log: HarLog;
}
/**
 * Runtime options for `installDiagnosticCapture`. All fields optional;
 * sensible diagnostic-oriented defaults are applied for any omitted field.
 *
 * @example
 * ```
 * installDiagnosticCapture({ includeBinaryBodies: true });
 * ```
 */
export interface DiagnosticCaptureOptions {
    /**
     * If `true`, non-text response bodies (images, fonts, video, audio,
     * `application/octet-stream`, etc.) are read in full and base64-encoded
     * with `content.encoding: 'base64'`. If `false` (default), the body is
     * replaced with a `[binary content omitted — <mime>, <size> bytes]`
     * placeholder so the HAR stays focused on API + WebSocket activity.
     *
     * Triage workflow target: JSON API responses, HTML, JS, and WebSocket
     * frames. Binary asset bodies (images served to the agent UI, fonts,
     * etc.) are rarely useful for diagnosing CXone Agent issues and inflate
     * the `.har` significantly — a single product-image response can dwarf
     * the entire signal traffic.
     */
    includeBinaryBodies?: boolean;
    /**
     * Per-response ceiling for captured **text** bodies. Anything longer is
     * cut at this length with a `[truncated — <N> bytes]` marker carrying the
     * original size, so triage can tell a clipped payload from a short one.
     * Defaults to 256 KB.
     *
     * Without a ceiling a single large payload (contact history, a long
     * transcript) is retained verbatim, and the entry cap alone does not
     * bound the `.har` — 1000 entries times an unbounded body size has no
     * ceiling at all.
     *
     * Compared against `content-length` where the server declares one, which
     * lets an oversized body be skipped before it is read; otherwise against
     * the decoded string length. The two differ for multi-byte UTF-8, so the
     * cap is an approximation, which is all a diagnostic bound needs to be.
     */
    maxBodyBytes?: number;
}
/**
 * Resolved options — every field present. Internal shape passed to patches.
 */
export interface ResolvedDiagnosticCaptureOptions {
    includeBinaryBodies: boolean;
    maxBodyBytes: number;
}
