import { RingBuffer } from '../buffer/ring-buffer';
import { WsBufferEntry, WsFrame } from '../types';
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
export declare const FRAME_CAP = 3000;
/**
 * Per-frame text ceiling, kept separate from `maxBodyBytes` (fetch/XHR):
 * a WS frame is a single message, not a full response, and a large
 * transcript or DFO event frame can otherwise dwarf every other entry in
 * the buffer. Applied in `dataToString` on both this page-realm path and
 * the worker-realm prelude (`worker-prelude.ts`'s `wsMaxFrameBytes`).
 */
export declare const WS_MAX_FRAME_BYTES: number;
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
export declare function enforceFrameCap(frames: WsFrame[]): void;
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
export declare function installWebSocketPatch(buffer: RingBuffer<WsBufferEntry>): void;
