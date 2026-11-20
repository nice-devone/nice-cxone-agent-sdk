import { __awaiter } from "tslib";
import { arrayBufferToBase64 } from '../util/base64';
import { capText } from '../util/truncate';
let installed = false;
/**
 * Parse `XMLHttpRequest.getAllResponseHeaders()`'s `\r\n`-joined output
 * into HAR's name/value pair array.
 *
 * @param raw - the raw header block from `getAllResponseHeaders()`.
 * @returns array of `{ name, value }` HAR header records.
 * @example parseAllResponseHeaders('content-type: text/html');
 */
function parseAllResponseHeaders(raw) {
    const out = [];
    raw.split(/\r?\n/).forEach((line) => {
        const idx = line.indexOf(':');
        if (idx > 0) {
            out.push({ name: line.slice(0, idx).trim(), value: line.slice(idx + 1).trim() });
        }
    });
    return out;
}
/**
 * Best-effort serialization of an XHR request body to a string for the HAR.
 * Strings pass through; FormData/URLSearchParams/Blob/ArrayBuffer become
 * placeholder annotations.
 *
 * @param body - the body argument passed to `XMLHttpRequest.send`.
 * @returns body text suitable for `HarPostData.text`.
 * @example bodyToString(new URLSearchParams(a:'1')); // 'a=1'
 */
function bodyToString(body) {
    if (body == null)
        return '';
    if (typeof body === 'string')
        return body;
    if (body instanceof URLSearchParams)
        return body.toString();
    if (body instanceof FormData) {
        const parts = [];
        body.forEach((v, k) => parts.push(`${k}=${typeof v === 'string' ? v : '[file]'}`));
        return parts.join('&');
    }
    if (body instanceof Blob)
        return `[Blob ${body.size}b]`;
    if (body instanceof ArrayBuffer)
        return `[ArrayBuffer ${body.byteLength}b]`;
    if (ArrayBuffer.isView(body))
        return `[${body.constructor.name} ${body.byteLength}b]`;
    return '[unserializable body]';
}
/**
 * Read the response body off a completed XHR, switching strategy based on
 * the caller's `responseType` and the capture options.
 *
 * - `text` / `''` / `json` / `document` → captured up to
 *   `opts.maxBodyBytes`, then cut with a `[truncated — <N> bytes]` marker.
 * - `arraybuffer` / `blob` + `opts.includeBinaryBodies === true` →
 *   base64-encoded with `encoding: 'base64'`.
 * - `arraybuffer` / `blob` + `opts.includeBinaryBodies === false` (default) →
 *   body replaced with `[binary content omitted — <responseType>, <size> bytes]`.
 *
 * @param xhr - the completed `XMLHttpRequest` (read on `loadend`).
 * @param opts - resolved capture options.
 * @returns `{ body, size, encoding? }` for the HAR `content` field.
 * @example readResponseBody(xhr, `{ includeBinaryBodies: false }`);
 */
function readResponseBody(xhr, opts) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (xhr.responseType === '' || xhr.responseType === 'text') {
                return capText((_a = xhr.responseText) !== null && _a !== void 0 ? _a : '', opts.maxBodyBytes);
            }
            if (xhr.responseType === 'json') {
                return capText(JSON.stringify(xhr.response), opts.maxBodyBytes);
            }
            if (xhr.responseType === 'arraybuffer') {
                const buf = xhr.response;
                if (!buf)
                    return { body: '', size: 0 };
                if (!opts.includeBinaryBodies) {
                    return { body: `[binary content omitted — arraybuffer, ${buf.byteLength} bytes]`, size: buf.byteLength };
                }
                return { body: arrayBufferToBase64(buf), size: buf.byteLength, encoding: 'base64' };
            }
            if (xhr.responseType === 'blob') {
                const blob = xhr.response;
                if (!blob)
                    return { body: '', size: 0 };
                if (!opts.includeBinaryBodies) {
                    return { body: `[binary content omitted — blob, ${blob.size} bytes]`, size: blob.size };
                }
                const buf = yield blob.arrayBuffer();
                return { body: arrayBufferToBase64(buf), size: buf.byteLength, encoding: 'base64' };
            }
            if (xhr.responseType === 'document') {
                return capText(new XMLSerializer().serializeToString(xhr.response), opts.maxBodyBytes);
            }
        }
        catch (_b) {
            /* ignore */
        }
        return { body: '', size: 0 };
    });
}
/**
 * Wrap `XMLHttpRequest.prototype.open` / `setRequestHeader` / `send` so
 * every XHR records a HAR entry into the given buffer when it completes.
 * Captures method, URL, request/response headers + bodies, status, and a
 * coarse timing.
 *
 * Binary `responseType` (`arraybuffer`, `blob`) handling:
 * - `opts.includeBinaryBodies === true` → base64-encoded with
 *   `content.encoding: 'base64'`.
 * - `opts.includeBinaryBodies === false` (default) → replaced with a
 *   `[binary content omitted — <responseType>, <size> bytes]` placeholder.
 *
 * Idempotent. No-op outside of browser-like environments.
 *
 * @param buffer - ring buffer to push HAR entries into.
 * @param opts - resolved capture options.
 * @example installXhrPatch(netBuffer, `{ includeBinaryBodies: false }`);
 */
export function installXhrPatch(buffer, opts) {
    if (installed)
        return;
    if (typeof XMLHttpRequest === 'undefined')
        return;
    installed = true;
    const origOpen = XMLHttpRequest.prototype.open;
    const origSetHdr = XMLHttpRequest.prototype.setRequestHeader;
    const origSend = XMLHttpRequest.prototype.send;
    // eslint-disable-next-line max-params -- XMLHttpRequest.open's signature is fixed by the DOM spec
    XMLHttpRequest.prototype.open = function (method, url, async = true, username = null, password = null) {
        this._diag = {
            method,
            url: typeof url === 'string' ? url : url.toString(),
            reqHeaders: [],
            reqBody: '',
            startedDateTime: '',
            t0: 0,
        };
        return origOpen.call(this, method, url, async, username, password);
    };
    XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
        if (this._diag)
            this._diag.reqHeaders.push({ name, value });
        return origSetHdr.call(this, name, value);
    };
    XMLHttpRequest.prototype.send = function (body) {
        if (this._diag) {
            this._diag.reqBody = bodyToString(body);
            this._diag.startedDateTime = new Date().toISOString();
            this._diag.t0 = performance.now();
            const diag = this._diag;
            this.addEventListener('loadend', () => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const { body: resBody, size: resSize, encoding: resEncoding } = yield readResponseBody(this, opts);
                const resHeaders = parseAllResponseHeaders(this.getAllResponseHeaders());
                const mimeType = (_a = this.getResponseHeader('content-type')) !== null && _a !== void 0 ? _a : '';
                buffer.push({
                    startedDateTime: diag.startedDateTime,
                    time: performance.now() - diag.t0,
                    request: Object.assign({ method: diag.method, url: diag.url, httpVersion: 'HTTP/1.1', headers: diag.reqHeaders, queryString: [], cookies: [], headersSize: -1, bodySize: diag.reqBody.length }, (diag.reqBody ? { postData: { mimeType: '', text: diag.reqBody } } : {})),
                    response: {
                        status: this.status,
                        statusText: this.statusText,
                        httpVersion: 'HTTP/1.1',
                        headers: resHeaders,
                        cookies: [],
                        content: Object.assign({ size: resSize, mimeType, text: resBody }, (resEncoding ? { encoding: resEncoding } : {})),
                        redirectURL: '',
                        headersSize: -1,
                        bodySize: resSize,
                    },
                    cache: {},
                    timings: { send: 0, wait: -1, receive: -1 },
                });
            }), { once: true });
        }
        return origSend.call(this, body);
    };
}
//# sourceMappingURL=xhr-patch.js.map