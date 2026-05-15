const wsWorkerAgenticCode = `self.importScripts(
      'https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.6.7/rxjs.umd.min.js'
    );

    let wsReconnectAttempt = 0;
    let isConnectionOpen = false;
    let wsSubject;
    let reconnectTimer;
    let heartbeatSubscription = null;
    const HEARTBEAT_INTERVAL = 30000;
    const DEFAULT_RETRY_INTERVAL = 2000;
    const DEFAULT_MAX_RETRY_ATTEMPTS = 10;

    self.onmessage = function (input) {
      switch (input.data.type) {
        case 'connect':
          connect(input.data);
          break;
        case 'attemptReconnect':
          attemptReconnect(input.data);
          break;
        case 'close':
          close();
          break;
        case 'send':
          send(input.data);
          break;
        default:
          break;
      }
    }

    const WSEventType = {
      'OPEN': 'open',
      'RECONNECT': 'reconnect',
      'RECONNECT_COMPLETE': 'reconnectComplete',
      'MESSAGE': 'message',
      'ERROR': 'error',
      'CLOSE': 'close',
      'SUCCESS': 'success'
    }

    function connect(input) {
      if (isConnectionOpen) return;
      wsSubject = self.rxjs.webSocket.webSocket({
        url: input.url,
        openObserver: {
          next: () => {
            self.postMessage({ type: WSEventType.OPEN });
            isConnectionOpen = true;
            wsReconnectAttempt = 0;
            startHeartbeat();
          },
        },
        closeObserver: {
          next: (closeEvent) => {
            isConnectionOpen = false;
            self.postMessage({
              type: WSEventType.CLOSE,
              message: {
                code: closeEvent?.code,
                reason: closeEvent?.reason,
              }
            });
            stopHeartbeat();
          },
        },
      });

      wsSubject.subscribe(
        msg => {
          self.postMessage({ type: WSEventType.MESSAGE, message: msg });
        },
        err => {
          self.postMessage({
            type: WSEventType.ERROR,
            message: { error: err }
          });
          stopHeartbeat();
        },
        () => { self.postMessage({ type: WSEventType.CLOSE }); }
      );
    }

    function startHeartbeat() {
      heartbeatSubscription = self.rxjs.interval(HEARTBEAT_INTERVAL).subscribe(() => {
        if (wsSubject) {
          wsSubject.next({ command: 'HEARTBEAT', headers: {}, body: {} });
        }
      });
    }

    function stopHeartbeat() {
      if (heartbeatSubscription) {
        heartbeatSubscription.unsubscribe();
      }
    }

    function attemptReconnect(input) {
      if (reconnectTimer) clearTimeout(reconnectTimer);
      let reconnectInfo = input.reconnectInfo;
      const baseInterval = reconnectInfo.retryOptions.retryInterval || DEFAULT_RETRY_INTERVAL;
      const maxAttempts = reconnectInfo.retryOptions.maxRetryAttempts || DEFAULT_MAX_RETRY_ATTEMPTS;
      if (wsReconnectAttempt < reconnectInfo.retryOptions.maxRetryAttempts && !isConnectionOpen) {
        wsReconnectAttempt++;
        const backoffDelay = Math.min(baseInterval * Math.pow(2, wsReconnectAttempt - 1), 60000);
        const message = 'Websocket reconnect attempt ' + wsReconnectAttempt + ' of ' + reconnectInfo.retryOptions.maxRetryAttempts;
        console.log('[agentic-ws-worker] ', message);
        const reconnectResponse = {
          maxAttempts: maxAttempts,
          currentAttempt: wsReconnectAttempt
        }
        reconnectTimer = setTimeout(() => {
          self.postMessage({ type: WSEventType.RECONNECT, message: reconnectResponse });
        }, backoffDelay);
      } else {
        self.postMessage({ type: WSEventType.RECONNECT_COMPLETE });
      }
    }

    function close() {
      wsSubject?.complete();
      wsSubject = null;
      isConnectionOpen = false;
      stopHeartbeat();
    }

    function send(input) {
      if (wsSubject) {
        wsSubject.next(input.message);
      }
    }`


export default wsWorkerAgenticCode;
