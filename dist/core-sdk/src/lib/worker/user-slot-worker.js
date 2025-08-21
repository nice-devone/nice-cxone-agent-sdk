const userSlotWorkerCode = `self.importScripts(
    'https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.6.7/rxjs.umd.min.js'
  );

  let digitalStatusInterval;
  let agentStatusInterval;
  let userSlotStatusInterval;

  self.onmessage = function (input) {
    switch (input.data.type) {
      case 'startUserSlotApiPolling':
      case 'startVoiceRecStatusApiPolling':
        startUserSlotApiPolling(input.data);
        break; 
      case 'updateDigitalUserStatusPolling':
        updateDigitalUserStatusPolling(input.data);
        break;
      case 'startAgentKeepAlivePolling':
        startAgentKeepAlivePolling(input.data);
        break;
      case 'terminateUserSlotPolling':
        if (userSlotStatusInterval) {
          terminateUserSlotPolling();
        }
        break;
      default:
        break;
    }
  }

  /**
   * Perform User Slot polling on web worker thread
   * @param requestParam - http request along with headers and url
   * @param callback - method to invoke on completion
   * @param polling - polling interval & polling start indicator
   * @example
   * startUserSlotApiPolling(request, proxy(callback.bind(this)), pollingOptions)
  */
    async function startUserSlotApiPolling(input) {
      const requestParams = input.requestParams;
      const pollingOptions = input.pollingOptions;
      const isLeader = input.isLeader
      const pollInterval = pollingOptions.pollingInterval;
      const isPollingStarted = pollingOptions.isPolling;
      if (isPollingStarted) {
        userSlotStatusInterval = setInterval(() => {
          getUserSlotDetails(requestParams);
        }, pollInterval);
      } else {
        getUserSlotDetails(requestParams);
        if (isLeader) {
          const pollingOptions = { isPolling: true, pollingInterval: pollInterval };
          startUserSlotApiPolling({requestParams, pollingOptions});
        }
      }
    }

    function terminateUserSlotPolling () {
      clearInterval(userSlotStatusInterval)
    }


      /**
  * Invoke User Slot API call
  * @param requestParam - http request along with headers and url
  * @param callback - method to invoke on completion
  * @example
  * getUserSlotDetails(request, proxy(callback.bind(this)))
 */
  async function getUserSlotDetails(requestParams) {
    try{
    const response = await self.rxjs.fetch
      .fromFetch(
        requestParams.url,
        // eslint-disable-next-line no-undef
        toRequestInit(
          requestParams.method,
          requestParams.request.headers,
          requestParams.request.body
        )
      )
      .toPromise();
    let data = {};
      if (response && response.status < 400) {
        if (response.status !== 304) {
          data = await response.text();
        }
        data = JSON.parse(data)
        data.type = 'startUserSlotApiPolling'
        self.postMessage(data);
      }
    }
    catch(error){
      console.log('Error occurred in getUserSlotDetails', 'User slot polling call failed - ' + error.toString());
    }
  }

  /**
   * Perform Agent keep alive polling on web worker thread
   * @param requestParam - http request along with headers, url and pollingoptions
   * @example
   * startAgentKeepAlivePolling(request)
  */
  async function startAgentKeepAlivePolling(input) {
    const requestParams = input.requestParams;
    const pollingOptions = input.pollingOptions;
    const isLeader = input.isLeader
    const pollInterval = pollingOptions.pollingInterval;
    const isPollingStarted = pollingOptions.isPolling;
    if (isPollingStarted) {
      agentStatusInterval = setInterval(() => {
        updateKeepAliveStatus(requestParams);
      }, pollInterval);
    } else {
      clearInterval(agentStatusInterval);
      updateKeepAliveStatus(requestParams);
      if (isLeader) {
        const pollingOptions = { isPolling: true, pollingInterval: pollInterval };
        startAgentKeepAlivePolling({requestParams, pollingOptions});
      }
    }
  }

  const parseResponse = (response) => {
    let data;
    try {
      data = JSON.parse(response);
    } catch (err) {
      console.error('Parse Error: ', err);
      data = {};
    }
    return data;
  }


  /**
   * Perform Digital agent state polling on web worker thread
   * @param requestParam - http request along with headers and url
   * @param callback - method to invoke on completion
   * @param polling - polling interval & polling start indicator
   * @param digitalAgentState - Id for agent current state
   * @example
   * updateDigitalUserStatusPolling(request, proxy(callback.bind(this)), pollingOptions, 'bf919341');
   */
    async function updateDigitalUserStatusPolling(input){
      const requestParams = input.requestParams;
      const pollingOptions = input.pollingOptions;
      const digitalAgentState = input.digitalAgentState;
    
      const pollInterval = pollingOptions.pollingInterval;
      const isPollingStarted = pollingOptions.isPolling;
      if (isPollingStarted) {
        digitalStatusInterval = setInterval(() => {
          requestParams.request.body = updateRequestBody(digitalAgentState);
          updateKeepAliveStatus(requestParams);
        }, pollInterval);
      } else {
        clearInterval(digitalStatusInterval);
        requestParams.request.body = updateRequestBody(digitalAgentState);
        updateKeepAliveStatus(requestParams);
        const pollingOptions = {
          isPolling: true,
          pollingInterval: pollInterval,
        };
        updateDigitalUserStatusPolling(
          {requestParams,
          pollingOptions,
          digitalAgentState}
        );
      }
    };


      /**
   * Invoke Digital agent status API call
   * @param requestParam - http request along with headers and url
   * @param callback - method to invoke on completion
   * @example
   * updateKeepAliveStatus(request, proxy(callback.bind(this)))
   */
  async function updateKeepAliveStatus(
    requestParams
  ) {
    try{
      const response = await self.rxjs.fetch
        .fromFetch(
          requestParams.url,
          // eslint-disable-next-line no-undef
          toRequestInit(
            requestParams.method,
            requestParams.request.headers,
            requestParams.request.body
          )
        )
        .toPromise();
      let data = {};
        if (response && response.status < 400) {
          if (response.status !== 304) {
            data = await response.text();
          }
          self.postMessage(parseResponse(data));
        }
      }
      catch(error){
        console.log('Error occurred in updateKeepAliveStatus', 'Keep alive status update failed - ' + error.toString());
      }
  }

    /**
   * Method to return request body object
   * @param digitalAgentStatusId - Id for agent current state
   * @example
   * this.updateRequestBody('bf919341');
   */
    function updateRequestBody(digitalAgentStatusId) {
      const curTime = new Date().getTime();
      const minutesToAdd = 4;
      const furTime = new Date(curTime + minutesToAdd + 60000);
      return {
        considerUserAliveTill: toIsoStringWithTimeZoneOffset(furTime),
        id: digitalAgentStatusId,
      };
    }

      /**
   * Method to convert ISO Time format
   * @example -
   * this.toIsoStringWithTimeZoneOffset()
   */
  function toIsoStringWithTimeZoneOffset(date) {
    const tzo = -date.getTimezoneOffset();
    const dif = tzo >= 0 ? '+' : '-';
    /**
     * Method to add '0' in single digit number
     * @param num - number
     * @example
     * pad(1)
     */
    const pad = (num) => {
      return (num < 10 ? '0' : '') + num;
    };

    return (
      date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      'T' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes()) +
      ':' +
      pad(date.getSeconds()) +
      dif +
      pad(Math.floor(Math.abs(tzo) / 60)) +
      ':' +
      pad(Math.abs(tzo) % 60)
    );
  }

  function toRequestInit(method, headers, body) {
    const reqInit = {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
    };
    reqInit.headers = getHeaderInit(headers);
    if (hasBody(method)) {
      reqInit.body = getBodyInit(body);
    }
    return reqInit;
  }

  function getHeaderInit(headers) {
    const headerInit = new Headers();
    if (headers) {
      headers.forEach((header) => {
        headerInit.append(header.name, header.value);
      });
    }
    return headerInit;
  }

  function hasBody(method) {
    return (
      method == 'DELETE' ||
      method == 'POST' ||
      method == 'PUT' ||
      method == 'PATCH'
    );
  }

  function getBodyInit(body) {
    if (body) {
      if (
        typeof body === 'object' ||
        typeof body === 'boolean' ||
        Array.isArray(body)
      ) {
        return JSON.stringify(body);
      }
      return body.toString();
    }
    return '';
  }`

export default userSlotWorkerCode;