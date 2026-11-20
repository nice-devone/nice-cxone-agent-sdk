import { RingBuffer } from '../buffer/ring-buffer';
import { HarEntry, HarHeader, ResolvedDiagnosticCaptureOptions } from '../types';
/**
 * Per-XHR state attached during `open()` and consumed at `loadend`.
 * Tracks the request shape so the patched listener can synthesize a HAR
 * entry without re-reading the prototype methods.
 */
interface DiagXhrState {
    method: string;
    url: string;
    reqHeaders: HarHeader[];
    reqBody: string;
    startedDateTime: string;
    t0: number;
}
declare global {
    interface XMLHttpRequest {
        _diag?: DiagXhrState;
    }
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
export declare function installXhrPatch(buffer: RingBuffer<HarEntry>, opts: ResolvedDiagnosticCaptureOptions): void;
export {};
