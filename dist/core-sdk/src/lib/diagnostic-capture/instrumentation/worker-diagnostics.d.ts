import { RingBuffer } from '../buffer/ring-buffer';
import { HarEntry, ResolvedDiagnosticCaptureOptions, WsBufferEntry } from '../types';
/**
 * Arm worker instrumentation. Called by `installDiagnosticCapture`, so worker
 * capture is gated by the same feature toggle as the page-context patches:
 * with the toggle off nothing here is ever armed, `instrumentWorkerScript`
 * returns the script untouched and no port is opened.
 *
 * @param net - the shared network ring buffer worker HTTP entries land in.
 * @param ws - the shared per-connection ring buffer worker sockets land in.
 * @param opts - resolved capture options; `maxBodyBytes` is baked into the prelude.
 * @example enableWorkerDiagnostics(netBuffer, wsBuffer, opts);
 */
export declare function enableWorkerDiagnostics(net: RingBuffer<HarEntry>, ws: RingBuffer<WsBufferEntry>, opts: ResolvedDiagnosticCaptureOptions): void;
/**
 * Prepend the capture prelude to a worker script when instrumentation is armed
 * and the script is on the allow-list. Returns the script unchanged otherwise,
 * so an un-armed build produces byte-identical worker blobs.
 *
 * @param workerScriptName - `LoadWorker` script name, matched against the allow-list.
 * @param workerName - worker instance name, recorded on every entry.
 * @param workerScript - the worker source string.
 * @returns the source to build the blob from.
 * @example initWorker(instrumentWorkerScript('util-worker', name, code), name);
 */
export declare function instrumentWorkerScript(workerScriptName: string, workerName: string, workerScript: string): string;
/**
 * Hand the worker a dedicated `MessagePort` and feed arriving records into the
 * network and WebSocket buffers. A private port is used rather than the worker's own
 * `postMessage` channel because callers such as `GetNextEventProvider` treat
 * every message on that channel as an application response.
 *
 * The port is closed when the worker is terminated — `GetNextEventProvider`
 * recreates its worker on session change, on the 90s watchdog and after
 * offline recovery, and a port per recreation would accumulate.
 *
 * @param workerScriptName - `LoadWorker` script name (not the instance name).
 * @param worker - the freshly constructed worker.
 * @example attachWorkerDiagnostics('util-worker', worker);
 */
export declare function attachWorkerDiagnostics(workerScriptName: string, worker: Worker): void;
