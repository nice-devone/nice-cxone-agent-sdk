const wsWorkerACPCode = `self.importScripts(
      'https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.6.7/rxjs.umd.min.js'
    );
    
    let wsReconnectAttempt = 0;
    let isConnectionOpen = false;
    let wsSubject;
    let reconnectTimer;// to hold the timeout for reconnect attempt
    let heartbeatSubscription = null;
    const HEARTBEAT_INTERVAL = 20000;
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
    
    /**
     * This function used to make connection with websocket server
     * 
     * @param  websocketUrl  - websocket url
     * @param callback - callback method which will be executed when time interval is completed 
     * 
     * @example
     * 
     * connect('ws://localhost:8089');
     * 
     */
    function connect(input) {
      if(isConnectionOpen) return;// if connection is established then no need to connect again      
      wsSubject = self.rxjs.webSocket.webSocket({
        url: input.websocketUrl,
        openObserver: {
          next: () => {
            self.postMessage({ type: WSEventType.OPEN });
            isConnectionOpen = true;
            wsReconnectAttempt = 0;
            startHeartbeat();
          }, // when the connection is open that means websocket is connected now and then we will set isConnectionOpen flag to true and reset the wsReconnectAttempt to 0
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
        msg => { self.postMessage({ type: WSEventType.MESSAGE, message: msg  }); },
        err => {
          self.postMessage({
            type: WSEventType.ERROR,
            message: {
              error: err,
            }
          });
          stopHeartbeat();
        },
        () => { self.postMessage({ type: WSEventType.CLOSE }); }
      );
    }
  
   /**
     * This method used to start heartbeat
     * @example 
     * startHeartbeat();
     */
    function startHeartbeat() {
      heartbeatSubscription = self.rxjs.interval(HEARTBEAT_INTERVAL).subscribe(() => {
        if (wsSubject) {
          // Send a heartbeat message to the server, session token is not required for heartbeat message so passing blank json strcuture has to be fulfilled to that parsing does not fails on server side.
          wsSubject.next({ command: 'HEARTBEAT', headers: { sessionToken: '' }, body: {} });
        }
      });
    }
  
     /**
     * This method used to stop heartbeat
     * @example
     * stopHeartbeat();
     */
    function stopHeartbeat() {
      if (heartbeatSubscription) {
        heartbeatSubscription.unsubscribe();
      }
    }
  
      /**
     * This method used reconnect websocket
     * @example
     * 
     * attemptReconnect(data);
     * @param data - which is object contain errReason and reasonToReconnect
     * @param callback - callback method which will be executed when time interval is completed 
     * 
     */
      function attemptReconnect (input) {
        if(reconnectTimer)clearTimeout(reconnectTimer);// before attempting a new reconnect attempt we should cancel the previous timer if already present to avoid multiple connection overlap
        let reconnectInfo = input.reconnectInfo;
        const baseInterval = reconnectInfo.retryOptions.retryInterval || DEFAULT_RETRY_INTERVAL;
        const maxAttempts = reconnectInfo.retryOptions.maxRetryAttempts || DEFAULT_MAX_RETRY_ATTEMPTS;
        if (wsReconnectAttempt < reconnectInfo.retryOptions.maxRetryAttempts && !isConnectionOpen) {
          wsReconnectAttempt++;
          const backoffDelay = Math.min(baseInterval * Math.pow(2, wsReconnectAttempt - 1), 60000); // max 60s
          const message = 'Websocket reconnect attempt ' + wsReconnectAttempt + ' of ' + reconnectInfo.retryOptions.maxRetryAttempts;
          console.log('[ACP-web-worker] ', message);
          const reconnectResponse = {
            maxAttempts: maxAttempts,
            currentAttempt: wsReconnectAttempt
          }
            reconnectTimer = setTimeout(() => {
            self.postMessage({ type: WSEventType.RECONNECT, message: reconnectResponse  });
          }, backoffDelay);
        } else {
          self.postMessage({ type: WSEventType.RECONNECT_COMPLETE });          
        }
    }
  
    /**
     * This Method used to dispose the websocket connection 
     *@example
     * close();
     */
     function close() {
      wsSubject?.complete();
      wsSubject = null;
      isConnectionOpen = false;
      stopHeartbeat();
     }
  
      /**
       * Method to send message to websocket server
       * 
       * @param msg - message
       * @example - 
       * 
       * send('hi');
       */
      function send(input) {
        if (wsSubject) {
          wsSubject.next(input.msg);
        }
      }`
  
  
  export default wsWorkerACPCode;