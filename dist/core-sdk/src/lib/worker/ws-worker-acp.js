const wsWorkerACPCode = `self.importScripts(
      'https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.6.7/rxjs.umd.min.js'
    );
    
    let wsReconnectAttempt = 0;
    let isConnectionOpen = false;
    let wsSubject;
    let reconnectTimer;// to hold the timeout for reconnect attempt
    let heartbeatSubscription = null;
    const HEARTBEAT_INTERVAL = 10000;
  
    self.onmessage = function (input) {
      switch (input.data.type) {
        case 'connect':
          connect(input.data);
          break;
        case 'attemptReconnect':
          attemptReconnect(input.data);
          break;
        case 'close':
          close(input.data);
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
      close();
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
        isConnectionOpen = input.isConnectionOpen || false; // if isConnection is false that means websocket is not connected then only we will try the reconnect attempt
        let reconnectInfo = input.reconnectInfo;
        if (wsReconnectAttempt < reconnectInfo.retryOptions.maxRetryAttempts && !isConnectionOpen) {
          wsReconnectAttempt++;
          const message = 'Websocket reconnect attempt ' + wsReconnectAttempt + ' of ' + reconnectInfo.retryOptions.maxRetryAttempts;
          const reconnectResponse = {
            maxAttempts: reconnectInfo.retryOptions.maxRetryAttempts,
            currentAttempt: wsReconnectAttempt
          }
          self.postMessage({ type: WSEventType.RECONNECT, message: reconnectResponse  });
            reconnectTimer = setTimeout(() => {
            connect({'websocketUrl':reconnectInfo.url});
          }, reconnectInfo.retryOptions.retryIntervalInMs);
        } else {
          self.postMessage({ type: WSEventType.RECONNECT_COMPLETE });
          isConnectionOpen = true;// after reconnect attempt completes then we will set this flag to true
        }
    }
  
    /**
     * This Method used to dispose the websocket connection 
     *@example
     * close();
     */
     function close() {
      wsSubject?.complete();
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