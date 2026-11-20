import { capText } from '../util/truncate';
let installed = false;
/**
 * Per-connection frame ceiling, shared with the worker capture path so the
 * bound is defined once. See `enforceFrameCap`.
 *
 * Raised from 1000 (2026-09-02): heartbeats dominate the frame count on a
 * quiet socket — one every ~5s burns 720 slots an hour, so 1000 evicted a
 * connection's real traffic in ~83 minutes. They cost almost nothing in
 * bytes (`{"action":"heartbeat"}` is ~25 bytes), so buying slot headroom is
 * cheap; the byte footprint is still driven by the large JSON payloads,
 * which are retained in full on purpose.
 */
export const FRAME_CAP = 3000;
/**
 * Per-frame text ceiling, kept separate from `maxBodyBytes` (fetch/XHR):
 * a WS frame is a single message, not a full response, and a large
 * transcript or DFO event frame can otherwise dwarf every other entry in
 * the buffer. Applied in `dataToString` on both this page-realm path and
 * the worker-realm prelude (`worker-prelude.ts`'s `wsMaxFrameBytes`).
 */
export const WS_MAX_FRAME_BYTES = 512 * 1024;
/**
 * Best-effort WebSocket opcode mapping for HAR's `_webSocketMessages` shape:
 * text frames → 1, binary frames → 2. The viewer treats this as advisory.
 *
 * @param data - the data payload passed to `send()` or received via `message`.
 * @returns opcode integer (1 for text, 2 for binary).
 * @example opcodeOf('hello'); // 1
 */
function opcodeOf(data) {
    if (typeof data === 'string')
        return 1;
    return 2;
}
/**
 * Render a frame payload as a string for the HAR. Strings are capped at
 * `WS_MAX_FRAME_BYTES` (via `capText`, same truncation marker as fetch/XHR);
 * binary payloads (ArrayBuffer / typed arrays / Blob) become a short
 * placeholder annotation rather than UTF-8-corrupted garbage — already well
 * under the cap, so they pass through uncapped.
 *
 * @param data - the frame payload.
 * @returns string suitable for storing in `WsFrame.data`.
 * @example dataToString(new ArrayBuffer(4)); // '[ArrayBuffer 4b]'
 */
function dataToString(data) {
    if (typeof data === 'string')
        return capText(data, WS_MAX_FRAME_BYTES).body;
    if (data instanceof ArrayBuffer)
        return `[ArrayBuffer ${data.byteLength}b]`;
    if (ArrayBuffer.isView(data))
        return `[${data.constructor.name} ${data.byteLength}b]`;
    if (data instanceof Blob)
        return `[Blob ${data.size}b]`;
    return String(data);
}
/**
 * Enforce the per-connection frame cap. A chatty SignalR connection
 * (HeartbeatMessageFromAgent every few seconds) can accumulate thousands
 * of frames per hour — this drops the oldest frame to keep one connection
 * bounded at `FRAME_CAP` frames.
 *
 * This bounds frame **count** only; per-frame text size is separately capped
 * at `WS_MAX_FRAME_BYTES` in `dataToString`. Byte footprint still scales with
 * payload size up to that cap — control frames are ~1 KB, but a large
 * transcript or DFO event frame can run up to the cap, so do not size a
 * memory ceiling off a per-connection megabyte estimate without accounting
 * for `FRAME_CAP * WS_MAX_FRAME_BYTES` as the theoretical worst case.
 *
 * @param frames - the frame array on the buffered WS entry.
 * @example enforceFrameCap(entry.frames);
 */
export function enforceFrameCap(frames) {
    if (frames.length >= FRAME_CAP)
        frames.shift();
}
/**
 * Patch `window.WebSocket.prototype` so every WebSocket instance — past,
 * present, and future, regardless of which constructor reference created
 * it — logs sent and received frames into a buffer entry created on first
 * activity.
 *
 * Prototype patching (rather than constructor subclassing) is necessary
 * because libraries like SignalR capture the `WebSocket` global at
 * connection construction time (`options.WebSocket = WebSocket`) and use
 * that captured reference for all subsequent `new WebSocket(...)` calls.
 * Replacing `window.WebSocket` post-capture is therefore invisible to
 * already-constructed transports. Their instances still share
 * `WebSocket.prototype` though, so patching the prototype methods and
 * `on*` accessors reaches them.
 *
 * Trade-off: frames sent or received before this patch installs are not
 * captured. Connections in flight at install time are picked up starting
 * with their next frame.
 *
 * Idempotent. No-op outside of browser-like environments.
 *
 * @param buffer - ring buffer of per-connection WS entries. Bounded in
 *   socket count as well as frames-per-socket: an agent shift accumulates a
 *   new entry on every SignalR reconnect, so an unbounded collection here
 *   grows for the life of the session.
 * @example installWebSocketPatch(wsBuffer);
 */
export function installWebSocketPatch(buffer) {
    if (installed)
        return;
    if (typeof window === 'undefined' || typeof window.WebSocket !== 'function')
        return;
    installed = true;
    const Proto = window.WebSocket.prototype;
    const entries = new WeakMap();
    /**
     * Fetch the buffer entry for a WebSocket instance, creating and
     * registering one (in both the `WeakMap` and the public `buffer`) on
     * the first observed activity for that instance. Lazy creation means
     * the buffer only grows for sockets that actually emit frames after
     * the patch installs — silent or already-closed sockets stay out.
     *
     * @param ws - the WebSocket instance the frame is being recorded for.
     * @returns the existing or newly-created buffer entry for `ws`.
     * @example const entry = getOrCreateEntry(this);
     */
    const getOrCreateEntry = (ws) => {
        let e = entries.get(ws);
        if (!e) {
            e = { url: ws.url || '', opened: new Date().toISOString(), frames: [] };
            entries.set(ws, e);
            buffer.push(e);
        }
        return e;
    };
    const origSend = Proto.send;
    /**
     * Replacement for `WebSocket.prototype.send` that records the outbound
     * frame into the per-instance buffer entry before delegating to the
     * original native `send`. Bound to the same prototype shared by every
     * `WebSocket` instance, so all sockets — including those constructed
     * via a pre-install captured class reference (e.g. SignalR) — are
     * observed.
     *
     * @param data - the payload being sent on the WebSocket.
     * @returns whatever the native `send` returns (void in practice).
     * @example ws.send(payload);
     */
    Proto.send = function (data) {
        const entry = getOrCreateEntry(this);
        enforceFrameCap(entry.frames);
        entry.frames.push({
            type: 'send',
            time: Date.now() / 1000,
            opcode: opcodeOf(data),
            data: dataToString(data),
        });
        return origSend.call(this, data);
    };
    patchHandler(Proto, 'onmessage', (ws, ev) => {
        const entry = getOrCreateEntry(ws);
        enforceFrameCap(entry.frames);
        entry.frames.push({
            type: 'receive',
            time: Date.now() / 1000,
            opcode: opcodeOf(ev.data),
            data: dataToString(ev.data),
        });
    });
    patchHandler(Proto, 'onerror', (ws) => {
        const entry = getOrCreateEntry(ws);
        enforceFrameCap(entry.frames);
        entry.frames.push({ type: 'error', time: Date.now() / 1000 });
    });
    patchHandler(Proto, 'onclose', (ws, ev) => {
        const entry = getOrCreateEntry(ws);
        entry.closed = new Date().toISOString();
        entry.closeCode = ev.code;
    });
}
/**
 * Replace an `onX` accessor property on `WebSocket.prototype` with one
 * that runs `tap` before invoking the user-assigned handler. SignalR and
 * most browser code assign handlers via `ws.onmessage = fn` (rather than
 * `addEventListener`), so wrapping the setter is enough to observe every
 * frame without touching the SDK.
 *
 * `tap` errors are swallowed — diagnostic capture must never break the SDK.
 *
 * @param proto - `WebSocket.prototype`.
 * @param name - one of `'onmessage' | 'onerror' | 'onclose' | 'onopen'`.
 * @param tap - callback invoked with the WebSocket instance and the event
 *              just before the SDK's handler runs.
 * @example patchHandler(WebSocket.prototype, 'onmessage', tapFn);
 */
function patchHandler(proto, name, tap) {
    const desc = Object.getOwnPropertyDescriptor(proto, name);
    if (!desc || !desc.set)
        return;
    const origSet = desc.set;
    Object.defineProperty(proto, name, {
        configurable: true,
        enumerable: desc.enumerable,
        /**
         * Delegate property reads to the original accessor's getter so
         * consumers reading `ws.onmessage` see the handler currently assigned
         * (i.e. our wrapped function, since we always replace via the setter).
         *
         * @returns the currently-installed handler, or `undefined` if none.
         * @example const current = ws.onmessage;
         */
        get() {
            return desc.get ? desc.get.call(this) : undefined;
        },
        /**
         * Wrap the SDK-supplied handler so `tap` runs before it on every
         * event, then store the wrapped handler via the original accessor's
         * setter. Non-function assignments (null / undefined) are forwarded
         * unchanged so consumers can clear the handler the normal way.
         *
         * @param handler - the SDK's event handler, or `null` to clear.
         * @example ws.onmessage = handler;
         */
        set(handler) {
            if (typeof handler !== 'function') {
                origSet.call(this, handler);
                return;
            }
            /**
             * The handler the browser actually invokes when the event fires.
             * Runs `tap` for diagnostic capture first (errors swallowed), then
             * delegates to the SDK's original handler with its original `this`.
             *
             * @param ev - the event object dispatched by the browser.
             * @returns whatever the SDK handler returns.
             * @example ws.dispatchEvent(messageEvent);
             */
            const wrapped = function (ev) {
                try {
                    tap(this, ev);
                }
                catch ( /* never break the SDK */_a) { /* never break the SDK */ }
                return handler.call(this, ev);
            };
            origSet.call(this, wrapped);
        },
    });
}
//# sourceMappingURL=websocket-patch.js.map