/**
 * Encode binary bytes as base64 using `btoa()`. Chunks the input to avoid
 * "Maximum call stack size exceeded" on large bodies (`>~64 KB on some browsers`).
 *
 * @param buf - source bytes.
 * @returns base64-encoded string.
 *
 * @example
 * ```
 * const b64 = arrayBufferToBase64(new TextEncoder().encode('hi').buffer);
 * // 'aGk='
 * ```
 */
export function arrayBufferToBase64(buf) {
    const bytes = new Uint8Array(buf);
    const chunk = 0x8000;
    let binary = '';
    for (let i = 0; i < bytes.length; i += chunk) {
        binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
    }
    return btoa(binary);
}
/**
 * Whether the given Content-Type should be captured as UTF-8 text.
 * Binary types (image/*, font/*, video/*, audio/*, application/octet-stream,
 * etc.) return false so the caller can base64-encode the body instead of
 * corrupting it through TextDecoder.
 *
 * @param mime - raw `content-type` header value (may include `; charset=...`).
 * @returns `true` if the body is safe to read with `.text()` / `responseText`.
 *
 * @example
 * ```
 * isTextMimeType('application/json; charset=utf-8'); // true
 * isTextMimeType('image/png');                       // false
 * ```
 */
export function isTextMimeType(mime) {
    if (!mime)
        return true;
    const t = mime.split(';')[0].trim().toLowerCase();
    if (t.startsWith('text/'))
        return true;
    if (t === 'application/json' || t.endsWith('+json'))
        return true;
    if (t === 'application/xml' || t.endsWith('+xml'))
        return true;
    if (t === 'application/javascript' || t === 'application/ecmascript')
        return true;
    if (t === 'application/x-www-form-urlencoded')
        return true;
    if (t === 'application/graphql')
        return true;
    return false;
}
//# sourceMappingURL=base64.js.map