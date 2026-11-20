import { RingBuffer } from '../buffer/ring-buffer';
import { installFetchPatch } from './fetch-patch';
import { installXhrPatch } from './xhr-patch';
import { installWebSocketPatch } from './websocket-patch';
import { installPerformanceObserver } from './performance-observer';
import { enableWorkerDiagnostics } from './worker-diagnostics';
// Raised from 1000 (2026-08-13): worker capture (get-next-event, agent-polling
// every ~5s, directory-polling, refresh-token-flow, digital fetches) now shares
// this buffer with page-context fetch/XHR, so the same entry count covers a
// shorter time window than before. At an observed ~2.4-2.5 KB/entry average,
// 3000 entries is roughly 7-7.5 MB in practice. Theoretical worst case (every
// entry at the maxBodyBytes ceiling) moves from 256 MB to 3000 x 256 KB = 768 MB;
// revisit if AW-62556's memory-ceiling measurement is taken against that bound
// rather than realistic traffic.
const NET_CAP = 3000;
const PERF_CAP = 2000;
const WS_SOCKET_CAP = 50;
const DEFAULT_MAX_BODY_BYTES = 256 * 1024;
const netBuffer = new RingBuffer(NET_CAP);
const wsBuffer = new RingBuffer(WS_SOCKET_CAP);
const perfBuffer = new RingBuffer(PERF_CAP);
let installed = false;
/**
 * Install the diagnostic-capture instrumentations (fetch / XHR / WebSocket /
 * PerformanceObserver) and arm worker capture. Wraps the corresponding globals
 * and starts feeding into the shared ring buffers.
 *
 * Worker traffic runs in a separate realm that page-context patching cannot
 * reach, so `enableWorkerDiagnostics` instead lets `LoadWorker` prepend a
 * capture prelude to the worker source and report back over a private port.
 *
 * Idempotent — calling more than once is a no-op (the `installed` guard
 * also prevents double-wrapping under HMR). Options passed to subsequent
 * calls are ignored; only the first call's options take effect.
 *
 * Called behind the `DIAGNOSTIC_CAPTURE` toggle from two places, whichever
 * runs first winning: the app bootstrap in
 * `apps/cxone-agent/src/app/ccf-cxone-agent-landing-page.tsx` (ahead of
 * `initAcdEngagement`, so worker traffic is covered from the first request)
 * and the post-login epic in
 * `libs/react/ui-components/src/lib/ccf-acd-session/acdSessionEventMiddleware.ts`
 * (which covers hosts that do not go through that landing page).
 *
 * @param options - optional capture-behaviour overrides. See
 *   `DiagnosticCaptureOptions` for field-level docs. Omit for the
 *   diagnostic-oriented defaults (binary response bodies are dropped
 *   in favour of a placeholder; only text + WS frames are kept verbatim).
 *
 * @example
 * ```
 * import { installDiagnosticCapture } from '@nice-devone/core-sdk';
 * installDiagnosticCapture();                          // recommended
 * installDiagnosticCapture({ includeBinaryBodies: true }); // full fidelity
 * ```
 */
export function installDiagnosticCapture(options = {}) {
    var _a, _b;
    if (installed)
        return;
    installed = true;
    const opts = {
        includeBinaryBodies: (_a = options.includeBinaryBodies) !== null && _a !== void 0 ? _a : false,
        maxBodyBytes: (_b = options.maxBodyBytes) !== null && _b !== void 0 ? _b : DEFAULT_MAX_BODY_BYTES,
    };
    installFetchPatch(netBuffer, opts);
    installXhrPatch(netBuffer, opts);
    installWebSocketPatch(wsBuffer);
    installPerformanceObserver(perfBuffer);
    enableWorkerDiagnostics(netBuffer, wsBuffer, opts);
    // Dev-only: expose buffers on window.__cxoneDiag
    if (process.env.NODE_ENV !== 'production') {
        window.__cxoneDiag = {
            netBuffer,
            wsBuffer,
            perfBuffer,
        };
    }
}
/**
 * Expose the shared capture buffers to `saveHar()`. Not part of the public
 * package API — internal coupling between the install module and the export
 * module so the buffers can live as module-level singletons.
 *
 * @returns the three buffers populated by the four instrumentation layers.
 * @example const buffers = getDiagnosticBuffers();
 */
export function getDiagnosticBuffers() {
    return { netBuffer, wsBuffer, perfBuffer };
}
//# sourceMappingURL=install.js.map