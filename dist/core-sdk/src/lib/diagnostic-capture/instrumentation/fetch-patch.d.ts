import { RingBuffer } from '../buffer/ring-buffer';
import { HarEntry, ResolvedDiagnosticCaptureOptions } from '../types';
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
export declare function installFetchPatch(buffer: RingBuffer<HarEntry>, opts: ResolvedDiagnosticCaptureOptions): void;
