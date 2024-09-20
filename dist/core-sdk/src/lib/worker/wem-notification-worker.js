const workercode = () => {
  self.importScripts(
    'https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.5.1/sockjs.min.js'
  );

  let requestData;
  let wemWsAuthData;
  let retryOptions;
  let currentRetryAttempt = 0;
  let sock;
  let retryTimerId;

  self.onmessage = function (input) {
    switch (input.data.type) {
      case 'init-start-wem-ws':
        initialize(input.data.requestData, input.data.wemWsAuthData);
        startWemWebSocket();
        break;
      case 'reconnect':
        attemptReconnect();
        break;
      case 'send-ack':
        sendWemAcknowledge(input.data.msgId);
        break;
      case 'terminate':
        terminateWemWebSocket();
        break;
      default:
        break;
    }
  };

  /**
   * This method to initialize required values for ws
   *@param locale - client locale
   *@param timezone - client timezone
   *@param retryOptions - reconnect options
   * @example -
   * ```
   * initialize(notificationWsInfo)
   * ```
   */
  const initialize = (inputRequestData, inputWemWsAuthData) => {
    requestData = inputRequestData;
    wemWsAuthData = inputWemWsAuthData;
    retryOptions = inputRequestData.retryOptions || {
      maxRetryAttempts: 3,
      retryInterval: 1000,
    };
  };
  /**
   * This method to start Wem websocket connection
   *
   * @example -
   * ```
   * startWemWebsocket()
   * ```
   */
  const startWemWebSocket = () => {
    if (!sock) {
      const sockJSOptions = {
        server: wemWsAuthData.userId,
      };
      sock = new self.SockJS(
        wemWsAuthData.notificationWsUri,
        null,
        sockJSOptions
      );
      sock.onopen = () => {
        const authCommand = {
          command: 'CONNECT',
          headers: {
            sessionToken: wemWsAuthData.token,
            clientLocale: requestData.locale, // Ex - 'en-GB'
            clientTimezone: requestData.timezone, // Ex - 'Asia/Calcutta'
          },
        };
        sock.send(JSON.stringify(authCommand));
      };
      sock.onmessage = (e) => {
        const message = JSON.parse(e.data);
        if (message.command === 'CONNECTED') {
          resetConnectInterval();
          self.postMessage({
            type: 'success',
            message: 'CXone notification websocket connected successfully',
          });
        }
        self.postMessage({ type: 'message', message: message });
      };
      sock.onclose = (e) => {
        if (e.code !== 1000) {
          // Error code 1000 means that the connection was closed normally by the consumer
          const closeEventData = {
            wasClean: e.wasClean,
            code: e.code,
            reason: e.reason,
          };
          const errorMessage =
            'CXone notification webSocket connection failed ' +
            JSON.stringify(closeEventData);
          self.postMessage({
            type: 'error',
            message: errorMessage,
          });
          self.postMessage({ type: 'close' });
        }
      };
    } else {
      self.postMessage({
        type: 'error',
        message:
          'CXone notification Websocket connection is already established',
      });
    }
  };

  /**
   * This method to attempt reconnect
   * @param callback - execute a callback method from consumer class
   * @example -
   * ```
   * attemptReconnect()
   * ```
   */
  const attemptReconnect = () => {
    currentRetryAttempt += 1;
    if (currentRetryAttempt <= retryOptions.maxRetryAttempts) {
      retryTimerId = setTimeout(() => {
        retryToConnect();
      }, retryOptions.retryInterval);
    } else {
      sock = null;
      currentRetryAttempt = 0;
      const errorMessage =
        'CXone notification websocket reconnect attempts completed. Unable to establish the connection';
      self.postMessage({
        type: 'error',
        message: errorMessage,
      });
    }
  };

  /**
   * This method to send Acknowledgement to WebSocket that message is read by the consumer
   *@param msgId - Notification message id
   *@param callback - execute a callback method from consumer class
   * @example -
   * ```
   * sendAcknowledge('1002bcd', callback)
   * ```
   */
  const sendWemAcknowledge = (msgId) => {
    if (sock) {
      const ackCommand = {
        command: 'ACKNOWLEDGE',
        headers: {
          notificationUuid: msgId,
        },
      };
      sock.send(JSON.stringify(ackCommand));
      self?.postMessage({
        type: 'success',
        message: 'Acknowledgement sent successfully',
      });
    } else {
      self?.postMessage({
        type: 'error',
        message: 'CXone notification Websocket connection is closed',
      });
    }
  };

  /**
   * Method to clear time interval
   * @example
   * ```
   * this.clearConnectionInterval();
   * ```
   */
  const clearConnectionInterval = () => {
    if (retryTimerId) {
      clearTimeout(retryTimerId);
      retryTimerId = null;
    }
  };

  /**
   * Method to perform reconnect notification ws connection
   * @param callback - execute a callback method from consumer class
   * @example
   * ```
   * this.retryToConnect();
   * ```
   */
  const retryToConnect = () => {
    sock = null;
    const errorMessage = `CXone notification ws reconnect attempt ${currentRetryAttempt} of ${retryOptions.maxRetryAttempts}`;
    self.postMessage({
      type: 'error',
      message: errorMessage,
    });
    startWemWebSocket();
  };

  /**
   * This method to rest connect interval
   * @example -
   * ```
   * resetTryToConnectInterval()
   * ```
   */
  const resetConnectInterval = () => {
    currentRetryAttempt = 0;
    clearConnectionInterval();
  };

  /**
   * Method to terminate notification ws connection
   * @param callback - execute a callback method from consumer class
   * @example
   * ```
   * this.terminateWsConnection(callback);
   * ```
   */
  const terminateWemWebSocket = () => {
    if (sock) {
      sock.close();
      sock = null;
      resetConnectInterval();
      self.postMessage({
        type: 'success',
        message: 'CXone notification ws connection is terminated',
      });
    } else {
      self.postMessage({
        type: 'error',
        message: 'CXone notification ws connection is already terminated',
      });
    }
  };
};
export default workercode;
