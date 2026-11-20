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
export declare function arrayBufferToBase64(buf: ArrayBuffer): string;
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
export declare function isTextMimeType(mime: string): boolean;
