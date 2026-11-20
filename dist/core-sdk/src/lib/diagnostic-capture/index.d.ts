/**
 * Public API of the diagnostic-capture module. Only the two functions
 * meant to be called from outside this folder are re-exported here:
 *
 * - `installDiagnosticCapture()` — called once post-login from
 *   `acdSessionEventMiddleware.ts` to wrap fetch/XHR/WebSocket/PerformanceObserver.
 * - `saveHar()` — called by the Save Logs button on Settings → Report Issue
 *   to drain the buffers and download a `.har` file.
 *
 * Internal types, ring buffers, and the per-patch helpers stay scoped to this
 * folder and are not re-exported.
 */
export { installDiagnosticCapture } from './instrumentation/install';
export { saveHar } from './export/save-har';
export type { DiagnosticCaptureOptions } from './types';
