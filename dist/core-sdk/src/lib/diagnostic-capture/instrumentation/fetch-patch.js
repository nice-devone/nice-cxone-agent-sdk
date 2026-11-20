import { __awaiter } from "tslib";
import { arrayBufferToBase64, isTextMimeType } from '../util/base64';
import { capText } from '../util/truncate';
let installed = false;
/**
 * Convert a `Headers` instance to the HAR name/value pair array.
 *
 * @param headers - source headers (request or response).
 * @returns array of `{ name, value }` HAR header records.
 * @example headersToHar(new Headers( 'x-foo': 'bar' ));
 */
function headersToHar(headers) {
    const out = [];
    headers.forEach((value, name) => out.push({ name, value }));
    return out;
}
/**
 * Best-effort serialization of a `fetch` request body to a string for the
 * HAR. Strings pass through; Blob/FormData/URLSearchParams/ArrayBuffer are
 * rendered as readable approximations rather than UTF-8-corrupted bytes.
 *
 * If `init.body` is undefined, falls back to reading the body off a
 * `Request` instance (so callers that pre-built a Request are covered).
 *
 * @param init - the `RequestInit` passed to fetch.
 * @param input - the first arg passed to fetch (string / URL / Request).
 * @returns body text suitable for `HarPostData.text`.
 * @example readReqBody( body: 'hello' , '/x'); // 'hello'
 */
function readReqBody(init, input) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = init === null || init === void 0 ? void 0 : init.body;
        if (body == null) {
            if (input instanceof Request) {
                try {
                    return yield input.clone().text();
                }
                catch (_a) {
                    return '';
                }
            }
            return '';
        }
        if (typeof body === 'string')
            return body;
        if (body instanceof Blob) {
            try {
                return yield body.text();
            }
            catch (_b) {
                return '[unreadable blob]';
            }
        }
        if (body instanceof ArrayBuffer)
            return `[ArrayBuffer ${body.byteLength}b]`;
        if (ArrayBuffer.isView(body))
            return `[${body.constructor.name} ${body.byteLength}b]`;
        if (body instanceof URLSearchParams)
            return body.toString();
        if (body instanceof FormData) {
            const parts = [];
            body.forEach((v, k) => parts.push(`${k}=${typeof v === 'string' ? v : '[file]'}`));
            return parts.join('&');
        }
        return '[unserializable body]';
    });
}
/**
 * Resolve the URL string from any of the three argument shapes fetch accepts.
 *
 * @param input - first arg passed to fetch.
 * @returns absolute or relative URL string.
 * @example urlOf(new URL('https://x/y')); // 'https://x/y'
 */
function urlOf(input) {
    if (typeof input === 'string')
        return input;
    if (input instanceof URL)
        return input.toString();
    return input.url;
}
/**
 * Resolve the HTTP method from fetch's args. Prefers `init.method`, then
 * the `Request.method` if `input` is a Request, defaulting to GET.
 *
 * @param input - first arg passed to fetch.
 * @param init - optional RequestInit.
 * @returns HTTP method (uppercased per fetch spec).
 * @example methodOf('/x', `{ method: 'POST' }`); // 'POST'
 */
function methodOf(input, init) {
    if (init === null || init === void 0 ? void 0 : init.method)
        return init.method;
    if (input instanceof Request)
        return input.method;
    return 'GET';
}
/**
 * Resolve the request headers from fetch's args.
 *
 * @param input - first arg passed to fetch.
 * @param init - optional RequestInit.
 * @returns HAR-shaped headers array.
 * @example reqHeadersOf('/x', `{ headers: { 'x-y': '1' } }`);
 */
function reqHeadersOf(input, init) {
    if (init === null || init === void 0 ? void 0 : init.headers)
        return headersToHar(new Headers(init.headers));
    if (input instanceof Request)
        return headersToHar(input.headers);
    return [];
}
/**
 * Wrap `window.fetch` so every call records a HAR entry into the given
 * buffer. Captures method, URL, request/response headers + bodies, status,
 * and a coarse timing.
 *
 * Response-body strategy:
 * - **Text** MIME types (json/xml/html/js/etc.) → body captured up to
 *   `opts.maxBodyBytes`, then cut with a `[truncated — <N> bytes]` marker
 *   carrying the original size. A declared `content-length` over the cap
 *   short-circuits before the body is read at all, so oversized payloads
 *   cost no clone and no decode.
 * - **Binary** MIME types + `opts.includeBinaryBodies === true` → body
 *   base64-encoded, `content.encoding: 'base64'`.
 * - **Binary** MIME types + `opts.includeBinaryBodies === false` (default) →
 *   body replaced with `[binary content omitted — <mime>, <size> bytes]`,
 *   no `arrayBuffer()` read so memory + CPU are saved.
 *
 * Text bodies under the cap still cost one `clone()` + `text()`. That is
 * inherent: reading a response without consuming it for the caller requires
 * teeing the stream, and rebuilding a `Response` from the decoded text would
 * drop `url` / `type` / `redirected` and change behaviour for SDK callers.
 *
 * Idempotent. No-op outside of browser-like environments.
 *
 * @param buffer - ring buffer to push HAR entries into.
 * @param opts - resolved capture options (binary-body handling, future flags).
 * @example installFetchPatch(netBuffer, `{ includeBinaryBodies: false }`);
 */
export function installFetchPatch(buffer, opts) {
    if (installed)
        return;
    if (typeof window === 'undefined' || typeof window.fetch !== 'function')
        return;
    installed = true;
    const origFetch = window.fetch.bind(window);
    window.fetch = function patchedFetch(input, init) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const startedDateTime = new Date().toISOString();
            const t0 = performance.now();
            const url = urlOf(input);
            const method = methodOf(input, init);
            const reqHeaders = reqHeadersOf(input, init);
            const reqBody = yield readReqBody(init, input);
            try {
                const res = yield origFetch(input, init);
                let resBody = '';
                let resEncoding;
                let resSize = 0;
                const mimeType = (_a = res.headers.get('content-type')) !== null && _a !== void 0 ? _a : '';
                try {
                    if (res.type !== 'opaque' && res.type !== 'opaqueredirect') {
                        if (isTextMimeType(mimeType)) {
                            const declaredSize = parseInt((_b = res.headers.get('content-length')) !== null && _b !== void 0 ? _b : '0', 10) || 0;
                            if (declaredSize > opts.maxBodyBytes) {
                                resSize = declaredSize;
                                resBody = `[truncated — ${declaredSize} bytes]`;
                            }
                            else {
                                const capped = capText(yield res.clone().text(), opts.maxBodyBytes);
                                resBody = capped.body;
                                resSize = capped.size;
                            }
                        }
                        else if (opts.includeBinaryBodies) {
                            const buf = yield res.clone().arrayBuffer();
                            resBody = arrayBufferToBase64(buf);
                            resEncoding = 'base64';
                            resSize = buf.byteLength;
                        }
                        else {
                            const declaredSize = parseInt((_c = res.headers.get('content-length')) !== null && _c !== void 0 ? _c : '0', 10) || 0;
                            resSize = declaredSize;
                            resBody = `[binary content omitted — ${mimeType || 'unknown'}, ${declaredSize} bytes]`;
                        }
                    }
                }
                catch (_e) {
                    /* body unreadable */
                }
                buffer.push({
                    startedDateTime,
                    time: performance.now() - t0,
                    request: Object.assign({ method,
                        url, httpVersion: 'HTTP/1.1', headers: reqHeaders, queryString: [], cookies: [], headersSize: -1, bodySize: reqBody.length }, (reqBody ? { postData: { mimeType: '', text: reqBody } } : {})),
                    response: {
                        status: res.status,
                        statusText: res.statusText,
                        httpVersion: 'HTTP/1.1',
                        headers: headersToHar(res.headers),
                        cookies: [],
                        content: Object.assign({ size: resSize, mimeType, text: resBody }, (resEncoding ? { encoding: resEncoding } : {})),
                        redirectURL: (_d = res.headers.get('location')) !== null && _d !== void 0 ? _d : '',
                        headersSize: -1,
                        bodySize: resSize,
                    },
                    cache: {},
                    timings: { send: 0, wait: -1, receive: -1 },
                });
                return res;
            }
            catch (err) {
                buffer.push({
                    startedDateTime,
                    time: performance.now() - t0,
                    request: Object.assign({ method,
                        url, httpVersion: 'HTTP/1.1', headers: reqHeaders, queryString: [], cookies: [], headersSize: -1, bodySize: reqBody.length }, (reqBody ? { postData: { mimeType: '', text: reqBody } } : {})),
                    response: {
                        status: 0,
                        statusText: err instanceof Error ? err.message : String(err),
                        httpVersion: 'HTTP/1.1',
                        headers: [],
                        cookies: [],
                        content: { size: 0, mimeType: '', text: '' },
                        redirectURL: '',
                        headersSize: -1,
                        bodySize: 0,
                    },
                    cache: {},
                    timings: { send: 0, wait: -1, receive: -1 },
                });
                throw err;
            }
        });
    };
}
//# sourceMappingURL=fetch-patch.js.map