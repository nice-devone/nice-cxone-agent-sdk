import { enforceFrameCap, WS_MAX_FRAME_BYTES } from './websocket-patch';
import { workerPrelude } from './worker-prelude';
/**
 * Message `type` carrying the `MessagePort` to the worker. Every worker's own
 * `onmessage` is a `switch` with a `default: break`, so this extra message is
 * ignored by the worker's application code.
 */
const PORT_MESSAGE_TYPE = '__cxoneDiagPort';
/**
 * Records the worker retains while waiting for the port handshake. The
 * handshake is posted during worker construction so this only ever covers the
 * gap until the worker script finishes evaluating.
 */
const PENDING_CAP = 50;
/**
 * `LoadWorker` script names that receive the prelude — every worker that opens
 * a socket or issues a request of its own.
 *
 * `util-worker` covers the ACD long-poll (`get-next-event`) plus
 * `directory-polling`, `agent-polling` and `refresh-token-flow`, which share
 * that script. `event-hub-worker` and `user-slot-worker` are digital/DFO. The
 * rest are socket workers: `ws-notifications`, ACP, the Agent Assist RTT
 * transcript stream, the agentic stream and WEM notifications.
 *
 * `uiq-worker` is deliberately absent: it is a bare `setInterval` heartbeat
 * with no network of its own, and the UI Queue SignalR hub it serves runs in
 * page context where `installWebSocketPatch` already reaches it.
 */
const INSTRUMENTED_WORKERS = [
    'util-worker',
    'event-hub-worker',
    'user-slot-worker',
    'ws-worker',
    'ws-worker-acp',
    'ws-worker-agent-assist',
    'ws-worker-agentic',
    'wem-notification-worker'
];
let netBuffer = null;
let wsBuffer = null;
let captureOptions = null;
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
export function enableWorkerDiagnostics(net, ws, opts) {
    netBuffer = net;
    wsBuffer = ws;
    captureOptions = opts;
}
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
export function instrumentWorkerScript(workerScriptName, workerName, workerScript) {
    if (!captureOptions || !INSTRUMENTED_WORKERS.includes(workerScriptName))
        return workerScript;
    return (workerPrelude({
        portMessageType: PORT_MESSAGE_TYPE,
        workerName,
        maxBodyBytes: captureOptions.maxBodyBytes,
        wsMaxFrameBytes: WS_MAX_FRAME_BYTES,
        pendingCap: PENDING_CAP,
    }) + workerScript);
}
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
export function attachWorkerDiagnostics(workerScriptName, worker) {
    if (!captureOptions || !INSTRUMENTED_WORKERS.includes(workerScriptName))
        return;
    // Scoped to this worker, so socket ids only need to be unique within one
    // worker lifetime. Bounded to the wsBuffer's own capacity: an entry evicted
    // from the buffer must not be retained here, or reconnect churn would keep
    // every socket's frames alive for the life of the session.
    const sockets = new Map();
    const channel = new MessageChannel();
    channel.port1.onmessage = (event) => {
        const message = event.data;
        if (!message)
            return;
        switch (message.kind) {
            case 'net':
                netBuffer === null || netBuffer === void 0 ? void 0 : netBuffer.push(toHarEntry(message));
                break;
            case 'ws-open': {
                const entry = { url: message.url, opened: message.opened, frames: [] };
                sockets.set(message.id, entry);
                wsBuffer === null || wsBuffer === void 0 ? void 0 : wsBuffer.push(entry);
                if (wsBuffer && sockets.size > wsBuffer.maxSize) {
                    sockets.delete(sockets.keys().next().value);
                }
                break;
            }
            case 'ws-frame': {
                const entry = sockets.get(message.id);
                if (!entry)
                    break;
                enforceFrameCap(entry.frames);
                entry.frames.push(message.frame);
                break;
            }
            case 'ws-close': {
                const entry = sockets.get(message.id);
                if (!entry)
                    break;
                entry.closed = message.closed;
                entry.closeCode = message.closeCode;
                break;
            }
        }
    };
    worker.postMessage({ type: PORT_MESSAGE_TYPE }, [channel.port2]);
    const terminate = worker.terminate.bind(worker);
    worker.terminate = () => {
        channel.port1.close();
        terminate();
    };
}
/**
 * Convert a worker record into a HAR entry matching what the fetch patch emits
 * for page-context traffic, tagged with `_workerName` so triage can tell the
 * two apart.
 *
 * @param record - record received over the port.
 * @returns HAR entry ready for the network buffer.
 * @example netBuffer.push(toHarEntry(record));
 */
function toHarEntry(record) {
    return {
        startedDateTime: record.startedDateTime,
        time: record.time,
        request: Object.assign({ method: record.method, url: record.url, httpVersion: 'HTTP/1.1', headers: record.reqHeaders, queryString: [], cookies: [], headersSize: -1, bodySize: record.reqBody.length }, (record.reqBody ? { postData: { mimeType: '', text: record.reqBody } } : {})),
        response: {
            status: record.status,
            statusText: record.statusText,
            httpVersion: 'HTTP/1.1',
            headers: record.resHeaders,
            cookies: [],
            content: {
                size: record.resSize,
                mimeType: record.mimeType,
                text: record.resText,
            },
            redirectURL: '',
            headersSize: -1,
            bodySize: record.resSize,
        },
        cache: {},
        timings: { send: 0, wait: -1, receive: -1 },
        _workerName: record.workerName,
    };
}
//# sourceMappingURL=worker-diagnostics.js.map