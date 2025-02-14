const wsWorkerAgentAssistCode = `self.importScripts(
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
   */
  function connect(input, reconnectAttempt = false) {
    if(isConnectionOpen) return;// if connection is established then no need to connect again
    close();
    wsSubject = self.rxjs.webSocket.webSocket({
      url: input.websocketUrl,
      openObserver: {
        next: () => {
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
      msg => { self.postMessage({ type: WSEventType.MESSAGE, message: msg  }); },
      err => {
        self.postMessage({
          type: WSEventType.ERROR,
          message: {
            error: err,
          }
        });
      },
      () => { self.postMessage({ type: WSEventType.CLOSE }); }
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
        const message = 'Websocket reconnect attempt ' + wsReconnectAttempt + ' of ' + reconnectInfo.retryOptions.maxRetryAttempts;
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
    if(isConnectionOpen){
      wsSubject._socket.close();// close the websocket connection
      wsSubject?.complete();// once the connection is closed then we will complete the websocket
      wsSubject?.unsubscribe();// once the connection is closed then we will unsubscribe the websocket
      self.postMessage({ type: WSEventType.CLOSE, message: '' });// once the connection is closed then we will send the close event to the main thread
    }
    isConnectionOpen = false;
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

export default wsWorkerAgentAssistCode;