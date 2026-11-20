import { RingBuffer } from '../buffer/ring-buffer';
import { DiagnosticCaptureOptions, HarEntry, WsBufferEntry } from '../types';
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
export declare function installDiagnosticCapture(options?: DiagnosticCaptureOptions): void;
/**
 * Expose the shared capture buffers to `saveHar()`. Not part of the public
 * package API — internal coupling between the install module and the export
 * module so the buffers can live as module-level singletons.
 *
 * @returns the three buffers populated by the four instrumentation layers.
 * @example const buffers = getDiagnosticBuffers();
 */
export declare function getDiagnosticBuffers(): DiagnosticBuffers;
/**
 * Internal shape returned by `getDiagnosticBuffers()`.
 */
export interface DiagnosticBuffers {
    netBuffer: RingBuffer<HarEntry>;
    wsBuffer: RingBuffer<WsBufferEntry>;
    perfBuffer: RingBuffer<HarEntry>;
}
