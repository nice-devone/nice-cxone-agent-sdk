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
 * Build the prelude source for one worker.
 *
 * @param config - values baked into the emitted source.
 * @returns JavaScript source to prepend to the worker script.
 * @example instrumented = workerPrelude(cfg) + utilWorkerCode;
 */
export function workerPrelude(config) {
    return `(function (config) {
  var origFetch = self.fetch;
  var OrigWebSocket = self.WebSocket;
  if (typeof origFetch !== 'function' && typeof OrigWebSocket !== 'function') return;

  var port = null;
  var pending = [];

  self.addEventListener('message', function (event) {
    var data = event.data;
    if (!data || data.type !== config.portMessageType) return;
    if (!event.ports || !event.ports.length) return;
    port = event.ports[0];
    for (var i = 0; i < pending.length; i++) {
      port.postMessage(pending[i]);
    }
    pending = [];
  });

  function now() {
    return (self.performance && self.performance.now) ? self.performance.now() : Date.now();
  }

  function emit(message) {
    message.workerName = config.workerName;
    if (port) {
      port.postMessage(message);
    } else if (pending.length < config.pendingCap) {
      pending.push(message);
    }
  }

  function headerPairs(headers) {
    var out = [];
    if (!headers) return out;
    if (typeof headers.forEach === 'function' && typeof headers.get === 'function') {
      headers.forEach(function (value, name) { out.push({ name: name, value: value }); });
      return out;
    }
    if (Array.isArray(headers)) {
      for (var i = 0; i < headers.length; i++) {
        out.push({ name: headers[i][0], value: String(headers[i][1]) });
      }
      return out;
    }
    var keys = Object.keys(headers);
    for (var k = 0; k < keys.length; k++) {
      out.push({ name: keys[k], value: String(headers[keys[k]]) });
    }
    return out;
  }

  function isText(mime) {
    if (!mime) return true;
    var t = mime.split(';')[0].trim().toLowerCase();
    if (t.indexOf('text/') === 0) return true;
    if (t === 'application/json' || t.slice(-5) === '+json') return true;
    if (t === 'application/xml' || t.slice(-4) === '+xml') return true;
    if (t === 'application/javascript' || t === 'application/ecmascript') return true;
    if (t === 'application/x-www-form-urlencoded') return true;
    if (t === 'application/graphql') return true;
    return false;
  }

  function baseRecord(startedDateTime, t0, method, url, reqHeaders, reqBody) {
    return {
      kind: 'net',
      startedDateTime: startedDateTime,
      time: now() - t0,
      method: method,
      url: url,
      reqHeaders: reqHeaders,
      reqBody: reqBody,
      status: 0,
      statusText: '',
      resHeaders: [],
      mimeType: '',
      resText: '',
      resSize: 0
    };
  }

  function patchedFetch(input, init) {
    var startedDateTime = new Date().toISOString();
    var t0 = now();
    var url = typeof input === 'string' ? input : (input && input.url ? input.url : String(input));
    var method = (init && init.method) || (input && input.method) || 'GET';
    var reqHeaders = headerPairs((init && init.headers) || (input && input.headers));
    var reqBody = (init && typeof init.body === 'string') ? init.body : '';

    return origFetch.call(self, input, init).then(function (res) {
      var record = baseRecord(startedDateTime, t0, method, url, reqHeaders, reqBody);
      record.status = res.status;
      record.statusText = res.statusText;
      record.resHeaders = headerPairs(res.headers);
      record.mimeType = res.headers.get('content-type') || '';

      if (res.type === 'opaque' || res.type === 'opaqueredirect') {
        emit(record);
        return res;
      }

      var declaredSize = parseInt(res.headers.get('content-length') || '0', 10) || 0;

      if (!isText(record.mimeType)) {
        record.resSize = declaredSize;
        record.resText = '[binary content omitted \\u2014 ' + (record.mimeType || 'unknown') + ', ' + declaredSize + ' bytes]';
        emit(record);
        return res;
      }

      // Mirrors the content-length short-circuit in fetch-patch.ts: an
      // oversized body costs no clone and no decode on this polling hot path.
      if (declaredSize > config.maxBodyBytes) {
        record.resSize = declaredSize;
        record.resText = '[truncated \\u2014 ' + declaredSize + ' bytes]';
        emit(record);
        return res;
      }

      return res.clone().text().then(function (text) {
        if (text.length <= config.maxBodyBytes) {
          record.resText = text;
        } else {
          record.resText = text.slice(0, config.maxBodyBytes) + '\\n[truncated \\u2014 ' + text.length + ' bytes]';
        }
        record.resSize = text.length;
        emit(record);
        return res;
      }, function () {
        emit(record);
        return res;
      });
    }, function (err) {
      var record = baseRecord(startedDateTime, t0, method, url, reqHeaders, reqBody);
      record.statusText = (err && err.message) ? err.message : String(err);
      emit(record);
      throw err;
    });
  }

  // --- WebSocket -----------------------------------------------------------
  // Socket ids are a plain counter: the page keeps one map per worker port, so
  // a recreated worker gets a fresh realm, a fresh port and a fresh map, and
  // ids can never collide across worker lifetimes.
  var socketIds = new WeakMap();
  var nextSocketId = 0;

  function socketIdOf(ws) {
    var id = socketIds.get(ws);
    if (id === undefined) {
      id = ++nextSocketId;
      socketIds.set(ws, id);
      emit({ kind: 'ws-open', id: id, url: ws.url || '', opened: new Date().toISOString() });
    }
    return id;
  }

  function opcodeOf(data) {
    return typeof data === 'string' ? 1 : 2;
  }

  function dataToString(data) {
    if (typeof data === 'string') {
      if (data.length <= config.wsMaxFrameBytes) return data;
      return data.slice(0, config.wsMaxFrameBytes) + '\\n[truncated \\u2014 ' + data.length + ' bytes]';
    }
    if (data instanceof ArrayBuffer) return '[ArrayBuffer ' + data.byteLength + 'b]';
    if (ArrayBuffer.isView(data)) return '[' + data.constructor.name + ' ' + data.byteLength + 'b]';
    if (typeof Blob !== 'undefined' && data instanceof Blob) return '[Blob ' + data.size + 'b]';
    return String(data);
  }

  // Frames are posted unconditionally even though the page keeps only the most
  // recent FRAME_CAP per socket. Capping here instead would retain the FIRST
  // N frames rather than the newest, inverting what websocket-patch.ts
  // deliberately does — the frames worth having are the ones nearest the
  // failure. Bounding at the source needs a worker-side ring drained on save.
  function emitFrame(ws, type, data, hasData) {
    var frame = { type: type, time: Date.now() / 1000 };
    if (hasData) {
      frame.opcode = opcodeOf(data);
      frame.data = dataToString(data);
    }
    emit({ kind: 'ws-frame', id: socketIdOf(ws), frame: frame });
  }

  // Mirrors patchHandler in websocket-patch.ts: rxjs's webSocket() and the
  // hand-rolled workers both assign ws.onmessage rather than addEventListener,
  // so wrapping the accessor observes every frame without touching the SDK.
  function patchHandler(proto, name, tap) {
    var desc = Object.getOwnPropertyDescriptor(proto, name);
    if (!desc || !desc.set) return;
    var origSet = desc.set;
    Object.defineProperty(proto, name, {
      configurable: true,
      enumerable: desc.enumerable,
      get: function () {
        return desc.get ? desc.get.call(this) : undefined;
      },
      set: function (handler) {
        if (typeof handler !== 'function') {
          origSet.call(this, handler);
          return;
        }
        var wrapped = function (event) {
          try { tap(this, event); } catch (e) { /* never break the SDK */ }
          return handler.call(this, event);
        };
        origSet.call(this, wrapped);
      }
    });
  }

  if (typeof origFetch === 'function') {
    self.fetch = patchedFetch;
  }

  if (typeof OrigWebSocket === 'function') {
    var wsProto = OrigWebSocket.prototype;
    var origSend = wsProto.send;

    wsProto.send = function (data) {
      try { emitFrame(this, 'send', data, true); } catch (e) { /* never break the SDK */ }
      return origSend.call(this, data);
    };

    patchHandler(wsProto, 'onmessage', function (ws, event) {
      emitFrame(ws, 'receive', event.data, true);
    });
    patchHandler(wsProto, 'onerror', function (ws) {
      emitFrame(ws, 'error', undefined, false);
    });
    patchHandler(wsProto, 'onclose', function (ws, event) {
      emit({
        kind: 'ws-close',
        id: socketIdOf(ws),
        closed: new Date().toISOString(),
        closeCode: event ? event.code : undefined
      });
    });
  }
})(${JSON.stringify(config)});
`;
}
//# sourceMappingURL=worker-prelude.js.map