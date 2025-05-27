const workercode = `self.importScripts(
    'https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.6.7/rxjs.umd.min.js'
  );

  let apiNetworkPerformance = {
    numOfSamplingRequests: 10,
    totalNumOfRequests: 0,
    requests: [],
    averageLatencyInSeconds: 0,
  };
  let latencyInMilliseconds;

  self.onmessage = function (input) {
    switch (input.data.type) {
      case 'get-next-event':
      case  'directory-polling':
        startPolling(input.data);
        break;
      case 'agent-polling':
        startAgentPolling(input.data);
        break;
      case 'refresh-token-flow':
        startTimeout(input.data.timeoutInterval);
        break;

      default:
        break;
    }
  };

  async function startPolling(input) {
    console.log('startPolling','Start polling executed on worker');
    const pollingInterval = input?.pollingOptions?.pollingInterval ?? 5000;
    if (input.retryOptions) {
      console.log('startPolling','Executing retry logic');
      if (!Array.isArray(input.requestParams)) {
        const timerId = setInterval(async () => {
          try {
            const response = await self.rxjs.fetch
              .fromFetch(
                input.requestParams.url.replace('60','1'),
                // eslint-disable-next-line no-undef
                toRequestInit(
                  input.requestParams.method,
                  input.requestParams.request.headers,
                  input.requestParams.request.body
                )
              )
              .toPromise()
              .catch((error) => { 
                console.log('startPolling','Retry getNextEvents catch executed with error' + error.toString());
              });
            console.log('startPolling','Retry getNextEvents API executed successfully');
            let data = {};
            if (response && response.status < 400) {
              console.log('startPolling','Retry getNextEvents with status < 400');
              if (response.status !== 304) {
                data = await response.text();
                console.log('startPolling','Retry New events received');
              }
              clearInterval(timerId);
              self.postMessage({ type:'retry', data: parseResponse(data)});
              console.log('startPolling','Retry Response posted to main thread');
            } else{
              console.log('startPolling','Retry Error response posted to main thread');
              if(response && response.status === 409){
                self.postMessage({ type:'retry', errorType: 'CXONE_API_ERROR', data: {status:response.status} }); 
                clearInterval(timerId);
                console.log('startPolling','Retry Error for 409 posted to main thread');
              } else{
                postMessageOnRetry(input,timerId);
              }
            }
          } catch (error) {
            console.log('startPolling','Retry catch executed');
            if (error instanceof Error) {
              console.log('startPolling','Retry catch executed and posted message to main thread');
              postMessageOnRetry(input,timerId);
            }
          }
        }, input.retryOptions.retryInterval);
      } else {
        if (input.pollingOptions?.isPolling) {
          setInterval(async () => {
            await getData(input.requestParams);
          }, pollingInterval);
        } else await getData(input.requestParams);
      }
    } else {
      console.log('startPolling','Start polling for getNextEvents');
      if (!Array.isArray(input.requestParams)) {
        console.log('startPolling','Inside start polling for getNextEvents');
        try {
          const response = await self.rxjs.fetch
            .fromFetch(
              input.requestParams.url,
              // eslint-disable-next-line no-undef
              toRequestInit(
                input.requestParams.method,
                input.requestParams.request.headers,
                input.requestParams.request.body
              )
            )
            .toPromise()
            .catch((error) => { 
              console.log('startPolling','getNextEvents catch executed with error' + error.toString());
            });
          console.log('startPolling','getNextEvents API executed successfully');
          let data = {};
          if (response &&  response.status < 400 && response.status !== 304) {
            console.log('startPolling','Events received from getNextEvents');
            data = await response.text();
            self.postMessage(parseResponse(data));
            console.log('startPolling','Response posted to main thread');
          } else {
            console.log('startPolling','No new events received from getNextEvents');
            self.postMessage({data: {status : response.status}});
          }
        } catch (error) {
            console.log('startPolling','Error block of start polling for getNextEvents executed');
          if (error instanceof Error) {
            self.postMessage({data: {status : '403'}});
            console.log('startPolling','Error posted back to main thread');
          }
        }
      } else {
        if (input.pollingOptions?.isPolling) {
          setInterval(async () => {
            await getData(input.requestParams);
          }, pollingInterval);
        } else await getData(input.requestParams);
      }
    }
  }

  function startAgentPolling(input) {
    getQueues(input);

    setInterval(() => {
      getQueues(input);
    }, 5000);
  }

  function getQueues(input) {
    if (input.requestParams.url.includes('queues-detail')) {
      fetchWithNetworkStatus(input);
    } else {
      self.rxjs.fetch
      .fromFetch(
        input.requestParams.url,
        // eslint-disable-next-line no-undef
        toRequestInit(
          input.requestParams.method,
          input.requestParams.request.headers,
          input.requestParams.request.body
        )
      )
      .toPromise()
      .then((response) => {
        if (response && response.status !== 304) {
          return response.text();
        }
        return {};
      })
      .then((data) => {
        data = parseResponse(data);
        input.requestParams.url = updateLastPollingTime(
          input.requestParams.url,
          input.requestParams.url.includes('skills/activity') ? data?.lastPollTime : data?.resultSet?.lastPollTime
        );
        self.postMessage(data);
      })
      .catch((error) =>
        console.error(
          'startAgentPolling',
          'Error in api call:-' + error.toString()
        )
      );
  }
  }

  function startTimeout(timeoutInterval) {
    setTimeout(() => {
      self.postMessage({});
    }, timeoutInterval);
  }
  function postMessageOnRetry(input,timerId){
    console.log('postMessageOnRetry','inside postMessageOnRetry');
    //reducing the count by one before entering the clear interval function to match the exact run time scenario
    --input.retryOptions.maxRetryAttempts;
    self.postMessage({ type:'retry', errorType: 'CXONE_API_ERROR', data: {}, retryAttempt: input.retryOptions.maxRetryAttempts });
    if (input.retryOptions.maxRetryAttempts == 0) {
      clearInterval(timerId);
    }
  }

  const fetchWithNetworkStatus = (input) => {
    const id = crypto.randomUUID();
    if (id) {
      apiNetworkPerformance.totalNumOfRequests = (apiNetworkPerformance.totalNumOfRequests || 0) + 1;
      const apiNetworkRequest = {
        id,
        url: input.requestParams.url,
        requestTime: performance.now()
      };

      if (apiNetworkPerformance.requests.length === apiNetworkPerformance.numOfSamplingRequests) {
        apiNetworkPerformance.requests.shift();
      }
      apiNetworkPerformance.requests.push(apiNetworkRequest);
    }

    self.rxjs.fetch
    .fromFetch(
      input.requestParams.url,
      // eslint-disable-next-line no-undef
      toRequestInit(
        input.requestParams.method,
        input.requestParams.request.headers,
        input.requestParams.request.body
      )
    )
    .toPromise()
    .then((response) => {
      if (response && response.status !== 304) {
        return response.text();
      }
      return {};
    }).then((data)=>{
      if (id) {
        const responseTime = performance.now();
        const currentNetworkRequest = (apiNetworkPerformance.requests.find(({ id: currentRequestId }) => currentRequestId === id));
        latencyInMilliseconds = responseTime - currentNetworkRequest.requestTime;
        currentNetworkRequest.latency = latencyInMilliseconds;
        const samplingRequests = apiNetworkPerformance.requests;
        if(samplingRequests.length > 0) {
        // Calculating the average of last N API latencies to determine the network speed
        const averageLatencyInSeconds = samplingRequests.reduce((avgLatencyInSec, { latency = 0 }, currentIndex) => {
          avgLatencyInSec += latency;
          if (currentIndex === (samplingRequests.length - 1)) {
            avgLatencyInSec /= (samplingRequests.length * 1000);
          }
          return avgLatencyInSec;
        }, 0);
        apiNetworkPerformance.averageLatencyInSeconds = averageLatencyInSeconds;
        data = parseResponse(data);
        data.apiPerformanceMetrics = { averageLatencyInSeconds };
        input.requestParams.url = updateLastPollingTime(
          input.requestParams.url,
          data?.resultSet?.lastPollTime
        );
        self.postMessage(data);
      }
      }
    }).catch((error) =>
    console.error(
      'startAgentPolling',
      'Error in api call:-' + error.toString()
    )
  );
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
  };

  async function getData(request) {
    try {
      const res = await Promise.allSettled(
        request.map((u) =>
          self.rxjs.fetch
            .fromFetch(
              u.url,
              // eslint-disable-next-line no-undef
              toRequestInit(u.method, u.request.headers, u.request.body)
            )
            .toPromise()
        )
      );
      const dataArray = await Promise.allSettled(
        res.map(
          (r) =>
            r.status === 'fulfilled' && r.value.status === 200 && r.value.text().then((text)=> {return parseResponse(text)})
        )
      );
      dataArray.map(
        (d, idx) =>
          (request[idx].url = updateLastPollingTime(
            request[idx].url,
            d?.value.lastPollTime
              ? d?.value.lastPollTime
              : d?.value.resultSet?.lastPollTime
          ))
      );
      const idArray = request.map((r) => r.id);
      const combinedResponse = new Map();
      idArray.forEach((id, idx) => {
        combinedResponse.set(id ?? '', dataArray[idx]);
      });
      self.postMessage(combinedResponse);
    } catch (error) {
      if (error instanceof Error) {
        console.error('getData', 'Error in api call:-' + error.toString());
      }
    }
    console.info('getData', 'getData executed on worker');
  }

  /**
   * Used to update the last poll time in the url string
   * @param url- URL string whose param updatedSince needs to updated
   */
  const updateLastPollingTime = (url, lastPollTime) => {
    const newUrl = new URL(url);
    newUrl.searchParams.set(
      'updatedSince',
      lastPollTime ? lastPollTime : new Date(0).toISOString()
    );
    return newUrl.toString();
  };
  
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
export default workercode;
