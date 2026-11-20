/**
 * Source text for the diagnostic-capture prelude prepended to instrumented
 * worker scripts by `instrumentWorkerScript`.
 *
 * Everything inside the returned template literal is a **source string**, never
 * compiled by TypeScript. It is evaluated in the worker realm, where none of
 * the downlevel helpers the page bundle emits at module scope exist — the
 * compile target is es2015, so `async`/`await` would emit `__awaiter` /
 * `__generator` and object spread would emit `__assign`, and either would throw
 * `ReferenceError` inside the worker. Promise chains, string concatenation and
 * explicit property assignment only.
 *
 * The prelude runs ahead of the worker's own `importScripts(...)` line, so rxjs
 * resolves the already-patched `self.fetch` whether it captures the global at
 * load time or looks it up per call, and sees the patched `WebSocket.prototype`
 * however it obtains its constructor reference.
 */
/**
 * Values baked into the prelude at blob-build time. Passed as a JSON literal
 * rather than over the port so body capping is correct for the very first
 * request, before the port handshake has completed.
 */
export interface WorkerPreludeConfig {
    /** Message `type` that carries the `MessagePort` for the page handshake. */
    portMessageType: string;
    /** Worker instance name, recorded on each entry as `_workerName`. */
    workerName: string;
    /** Per-response ceiling for captured text bodies. Mirrors `capText`. */
    maxBodyBytes: number;
    /** Per-frame ceiling for WS text frames. Mirrors `WS_MAX_FRAME_BYTES`. */
    wsMaxFrameBytes: number;
    /** Records retained while waiting for the port; excess is dropped. */
    pendingCap: number;
}
/**
 * Build the prelude source for one worker.
 *
 * @param config - values baked into the emitted source.
 * @returns JavaScript source to prepend to the worker script.
 * @example instrumented = workerPrelude(cfg) + utilWorkerCode;
 */
export declare function workerPrelude(config: WorkerPreludeConfig): string;
