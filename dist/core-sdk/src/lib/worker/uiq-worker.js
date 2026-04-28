const uiqWorkerCode = `self.importScripts(
    'https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.6.7/rxjs.umd.min.js'
  );
  
  let heartbeatInterval;

  self.onmessage = function (input) {
    switch (input.data.type) {
      case 'startHeartbeatPolling':
        startHeartbeatPolling(input.data);
        break;
      case 'stopHeartbeatPolling':
        stopHeartbeatPolling();
        break;
      default:
        break;
    }
  }

  /**
   * Start heartbeat polling on worker thread, posting a tick message at the given interval
   * @param input - object with pollingInterval in milliseconds
   * @example
   * startHeartbeatPolling({ pollingInterval: 10000 })
   */
  function startHeartbeatPolling(input) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = setInterval(() => {
      self.postMessage({ type: 'heartbeatTick' });
    }, input.pollingInterval);
  }

  /**
   * Stop heartbeat polling
   * @example
   * stopHeartbeatPolling()
   */
  function stopHeartbeatPolling() {
    clearInterval(heartbeatInterval);
  }
`

export default uiqWorkerCode;
