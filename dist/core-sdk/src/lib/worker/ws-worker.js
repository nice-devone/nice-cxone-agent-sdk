const wsWorkerCode =  `self.importScripts(
    'https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.6.7/rxjs.umd.min.js'
  );
  let wsReconnectAttempt = 0;
  let isConnectionOpen = false;
  let wsSubject;
  let reconnectTimer;// to hold the timeout for reconnect attempt
  let reconnectInput;// this will hold the reconnect config provided till the reconnection is completed

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
    'RECONNECT_SUCCESS': 'reconnectSuccess',
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
   * connect('ws://localhost:8089');
   * 
   */
  function connect(input, reconnectAttempt = false) {
    if(isConnectionOpen) return;// if connection is established then no need to connect again
    close();// dispose any previous socket before opening a new one
    // Capture the socket we are about to create. Every callback below verifies it is still
    // the active socket (activeSocket === wsSubject) before doing anything. A socket that
    // close() disposed keeps firing its close/error callbacks ASYNCHRONOUSLY - RxJS emits a
    // code-1000 close on complete() - and without this guard those stale callbacks would
    // post CLOSE/ERROR to the main thread, whose onClosed/onError handlers immediately call
    // attemptToReconnect, churning a fresh connection on every reconnect cycle.
    let activeSocket;
    activeSocket = wsSubject = self.rxjs.webSocket.webSocket({
      url: input.websocketUrl,
      openObserver: {
        next: () => {
          if(activeSocket !== wsSubject) return;// superseded by a newer connection - ignore
          self.postMessage({ type: WSEventType.OPEN });
          isConnectionOpen = true;
          wsReconnectAttempt = 0;
          if(reconnectAttempt){// if the connection is established after the reconnect attempt then we will send the reconnectSuccess event to the main thread
            self.postMessage({ type: WSEventType.RECONNECT_SUCCESS });
            reconnectInput = undefined;// once the reconnect attempt is successful then we will reset the reconnectInput
          }
        }, // when the connection is open that means websocket is connected now and then we will set isConnectionOpen flag to true and reset the wsReconnectAttempt to 0
      },
      closeObserver: {
        next: (closeEvent) => {
          if(activeSocket !== wsSubject) return;// stale socket disposed during reconnect - stay silent so we don't re-trigger a reconnect
          isConnectionOpen = false;// the socket is really gone now - keep the flag in sync with the actual socket lifecycle, not just ping health
          if(closeEvent.code !== 1000 && reconnectInput){ // if close code is not 1000 then only we will try to reconnect the websocket
            attemptReconnect(reconnectInput);
          }else{// if close code is 1000 then we will send the close event to the main thread for further processing of reconnect or any other action
            self.postMessage({
              type: WSEventType.CLOSE,
              message: {
                 code: closeEvent?.code,
                reason: closeEvent?.reason,
              }
            });
          }
        },
      },
    });

    wsSubject.subscribe(
      msg => { if(activeSocket !== wsSubject) return; self.postMessage({ type: WSEventType.MESSAGE, message: msg  }); },
      err => {
        if(activeSocket !== wsSubject) return;// stale socket disposed during reconnect - stay silent
        self.postMessage({
          type: WSEventType.ERROR,
          message: {
            error: err,
          }
        });
      },
      () => { if(activeSocket !== wsSubject) return; self.postMessage({ type: WSEventType.CLOSE }); }
    );
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
      if(!reconnectInput)reconnectInput = input;// if reconnectInput is not present then we will set the input to reconnectInput so that we can reuse it for reconnect attempt
      if(reconnectTimer)clearTimeout(reconnectTimer);// before attempting a new reconnect attempt we should cancel the previous timer if already present to avoid multiple connection overlap
      isConnectionOpen = input.isConnectionOpen || false; // if isConnection is false that means websocket is not connected then only we will try the reconnect attempt
      let reconnectInfo = input.reconnectInfo;
      if (wsReconnectAttempt < reconnectInfo.retryOptions.maxRetryAttempts && !isConnectionOpen) {
        wsReconnectAttempt++;
        const message = 'Websocket reconnect attempt '+ wsReconnectAttempt + ' of ' + reconnectInfo.retryOptions.maxRetryAttempts;
        const reconnectResponse = {
          maxAttempts: reconnectInfo.retryOptions.maxRetryAttempts,
          currentAttempt: wsReconnectAttempt
        }
        self.postMessage({ type: WSEventType.RECONNECT, message: reconnectResponse  });
          reconnectTimer = setTimeout(() => {
          connect({'websocketUrl':reconnectInfo.url}, true);
        }, wsReconnectAttempt * reconnectInfo.retryOptions.retryIntervalInMs);
      } else {
        reconnectInput = undefined;// once the reconnect attempt is completed then we will reset the reconnectInput
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
    // Cancel any reconnect scheduled before this teardown so an external close() can never
    // leave a pending timer that reopens a socket after we were asked to close. On the
    // internal reconnect path this is a no-op: connect() runs INSIDE the timer's own
    // callback, so the id is already spent by the time close() clears it.
    // Reset the reference too - clearTimeout() only cancels the timer, it doesn't clear the
    // stored handle, so reconnectTimer would keep a stale value that no longer represents a
    // pending reconnect. attemptReconnect()'s own sentinel check relies on this being unset.
    if(reconnectTimer) { clearTimeout(reconnectTimer); reconnectTimer = undefined; }
    // Capture the subject, then DROP the global reference BEFORE disposing it. complete()
    // can fire the subscribe-complete / closeObserver callbacks SYNCHRONOUSLY (RxJS emits a
    // code-1000 close on complete()). If wsSubject still pointed at this socket, the
    // activeSocket === wsSubject guard in connect() would pass and post a stale CLOSE to the
    // main thread - whose onClosed handler calls attemptToReconnect, re-introducing the
    // reconnect churn. Clearing wsSubject first makes that guard fire reliably whether the
    // callbacks are sync or async. send() also guards on wsSubject, so it can no longer reach
    // this stale socket.
    const socket = wsSubject;
    wsSubject = undefined;
    isConnectionOpen = false;
    // Dispose whenever a subject existed - NOT gated on isConnectionOpen. That flag only
    // reflects ping health and is already false during a ping-timeout reconnect, so the old
    // gate skipped teardown and left the socket physically open (still receiving backend
    // events); connect() then overwrote wsSubject, orphaning a live connection every cycle.
    // We deliberately do NOT post CLOSE here - matching ws-worker-acp.js / ws-agentic-worker.js.
    if(socket){
      // Failures here are expected once the subject/socket is already torn down, but we still
      // log them (matching ws-worker-acp.js / event-hub-worker.js) so an unexpected failure is
      // visible in the worker's console rather than silently swallowed.
      try { socket.complete(); } catch (err) { console.error('ws-worker close()', 'socket.complete() failed - ' + (err?.message || err)); }// sends the 1000 close frame and closes the socket (works even while CONNECTING)
      try { socket.unsubscribe(); } catch (err) { console.error('ws-worker close()', 'socket.unsubscribe() failed - ' + (err?.message || err)); }// tear down the subscription
    }
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
    
export default wsWorkerCode;