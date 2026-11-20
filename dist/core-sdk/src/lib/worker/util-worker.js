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
      case 'skill-activity-bootstrap':
        startSkillActivityBootstrap(input.data);
        break;
      case 'refresh-token-flow':
        startTimeout(input.data.timeoutInterval);
        break;

      default:
        break;
    }
  };

  // Parses the URL's actual query params instead of substring-matching the raw string, which can false
  // positive on a path segment or an unrelated param name/value that happens to contain the same text.
  function isLoggedInOnlyUrl(url) {
    try {
      return new URL(url).searchParams.get('loggedinonly') === 'true';
    } catch (e) {
      return false;
    }
  }

  function isInitialSnapshotUrl(url) {
    try {
      const params = new URL(url).searchParams;
      return params.get('loggedinonly') === 'true' && !params.has('updatedSince');
    } catch (e) {
      return false;
    }
  }

  async function startPolling(input) {
    console.log('startPolling','Start polling executed on worker');
    if (Array.isArray(input.requestParams)) {
      const agentIdx = input.requestParams.findIndex(
        (r) => r.id === 'agentList' && isLoggedInOnlyUrl(r.url)
      );
      if (agentIdx > -1) {
        const [agentRequestParam] = input.requestParams.splice(agentIdx, 1);
        console.log('startPolling', 'DWP scalability agent fix enabled, routing agentList to directoryAgentPolling');
        directoryAgentPolling(agentRequestParam);
      }
    }
    const pollingInterval = input?.pollingOptions?.pollingInterval ?? 5000;
    if (input.retryOptions) {
      console.log('startPolling','Executing retry logic');
      if (!Array.isArray(input.requestParams)) {
        const timerId = setInterval(async () => {
          try {
            const response = await self.rxjs.fetch
              .fromFetch(
                input.requestParams.url.replace(input?.pollingOptions?.isCustomGetNextEventPollingTimeoutEnabled ? '15' : '60','1'),
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
              const icBranchValue = response.headers?.get && response.headers?.get?.('icbranchvalue');
              clearInterval(timerId);
              self.postMessage({ type:'retry', data: { ...parseResponse(data), icBranchValue }});
              console.log('startPolling','Retry Response posted to main thread');
            } else{
              console.log('startPolling','Retry Error response posted to main thread');
              if(response && response.status === 409){
                  const icBranchValue = response.headers?.get && response.headers?.get?.('icbranchvalue');
                  self.postMessage({ type:'retry', errorType: 'CXONE_API_ERROR', data: {status:response.status, icBranchValue} }); 
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
            const icBranchValue = response.headers?.get && response.headers?.get?.('icbranchvalue');
            self.postMessage({ ...parseResponse(data), icBranchValue });
            console.log('startPolling','Response posted to main thread');
          } else {
            console.log('startPolling','No new events received from getNextEvents');
            const icBranchValue = response?.headers?.get && response.headers?.get?.('icbranchvalue');
            self.postMessage({data: {status : response.status, icBranchValue }});
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

  const AGENT_DIRECTORY_POLLING_INTERVAL = 5000;
  const AGENT_DIRECTORY_RETRY_DELAYS = [0, 5000, 10000, 30000];
  // true whenever a directoryAgentPolling cycle (retry chain or the ongoing poll loop after success) is
  // active, so a second, overlapping call (eg. two callers requesting AGENT_LIST close together before
  // entityPollingFlag is set) is ignored instead of restarting the retry backoff from scratch. Reset to
  // false only once the retry chain is fully exhausted, so a later legitimate request can try again.
  let isAgentDirectoryPollingActive = false;

  function directoryAgentPolling(requestParam) {
    if (isAgentDirectoryPollingActive) {
      console.log('directoryAgentPolling', 'A cycle is already in-flight, ignoring duplicate invocation');
      return;
    }
    isAgentDirectoryPollingActive = true;
    console.log('directoryAgentPolling', 'Start polling executed on worker');

    // true only when this fetch is actually the loggedinonly=true, no-updatedSince call -- ie. the one
    // that returns the complete set of currently logged-in agents. Derived from the URL itself (not from
    // "is this attempt 0 of the retry chain") because a fresh retry chain (eg. on tab refocus) can still
    // reuse a URL that already carries an updatedSince from earlier in the same session, in which case
    // it's a normal delta poll, not a true first-since-login snapshot.
    const isInitialSnapshot = isInitialSnapshotUrl(requestParam.url);

    const fetchAgentState = (url) =>
      self.rxjs.fetch
        .fromFetch(
          url,
          // eslint-disable-next-line no-undef
          toRequestInit(requestParam.method, requestParam.request.headers, requestParam.request.body)
        )
        .toPromise();

    const postAgentStateResponse = (data, isInitial) => {
      const combinedResponse = new Map();
      combinedResponse.set('agentList', { status: 'fulfilled', value: data, isInitialSnapshot: isInitial });
      self.postMessage(combinedResponse);
    };

    const startAgentPollLoop = (initialUrl, initialLastPollTime) => {
      let lastPollTime = initialLastPollTime;
      setInterval(() => {
        const polledUrl = updateLastPollingTime(initialUrl, lastPollTime);
        fetchAgentState(polledUrl)
          .then((response) => {
            if (response && response.status < 400) {
              return response.text().then((text) => {
                const data = parseResponse(text);
                lastPollTime = data?.resultSet?.lastPollTime || lastPollTime;
                postAgentStateResponse(data, false);
                console.log('directoryAgentPolling', 'Polled agentState response posted to main thread');
              });
            }
            console.log('directoryAgentPolling', 'Polled agentState call failed with status ' + response?.status + ', ignoring and continuing polling');
          })
          .catch((error) => {
            console.log('directoryAgentPolling', 'Polled agentState call errored, ignoring and continuing polling: ' + error?.toString());
          });
      }, AGENT_DIRECTORY_POLLING_INTERVAL);
    };

    const attemptCall = (retryCount) => {
      fetchAgentState(requestParam.url)
        .then((response) => {
          if (response && response.status < 400) {
            return response.text().then((text) => {
              const data = parseResponse(text);
              postAgentStateResponse(data, isInitialSnapshot);
              console.log('directoryAgentPolling', 'Initial agentState response posted to main thread');
              startAgentPollLoop(requestParam.url, data?.resultSet?.lastPollTime);
            });
          }
          throw new Error('agentState call failed with status ' + response?.status);
        })
        .catch((error) => {
          console.log('directoryAgentPolling', 'Attempt ' + retryCount + ' failed: ' + error?.toString());
          if (retryCount < AGENT_DIRECTORY_RETRY_DELAYS.length) {
            setTimeout(() => attemptCall(retryCount + 1), AGENT_DIRECTORY_RETRY_DELAYS[retryCount]);
          } else {
            console.log('directoryAgentPolling', 'All retries exhausted, posting error to main thread');
            isAgentDirectoryPollingActive = false;
            self.postMessage({
              type: 'directory-agent-polling-error',
              errorType: 'CXONE_API_ERROR',
              data: { message: 'agent api failed, reload application to load agents' },
            });
          }
        });
    };

    attemptCall(0);
  }

  function startAgentPolling(input) {
    let pollingInterval = input?.pollingOptions?.pollingInterval ?? 5000;
    getQueues(input);

    setInterval(() => {
      getQueues(input);
    }, pollingInterval);
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

  const PHONE_CALL_MEDIA_TYPE_ID = 4;

  function parseBooleanStringForSkillEvent(value) {
    if (typeof value === 'boolean') {
      return value;
    }
    return value?.toLowerCase() === 'true' || value?.toLowerCase() === 'on';
  }

  function parseIntegerForSkillEvent(value) {
    if (value !== null && value !== undefined && isNaN(value) === false) {
      value = isNaN(+value) ? 0 : +value;
      return parseInt(value, 10);
    }
    return 0;
  }

  /** Shapes a raw skill-activity record into the same fields SkillActivityEvent.parse() produces. */
  function toSkillActivityEvent(record) {
    return {
      agentsAvailable: record.agentsAvailable,
      agentsUnavailable: record.agentsUnavailable,
      agentsLoggedIn: record.agentsLoggedIn,
      agentsWorking: record.agentsWorking,
      campaignId: record.campaignId,
      earliestQueueTime: record.earliestQueueTime,
      emailFromAddress: record.emailFromAddress,
      contactsHandledInSLA: record.inSLA,
      isActive: record.isActive,
      isPersonalConnection: record.isNaturalCalling,
      isOutbound: record.isOutbound,
      mediaTypeId: record.mediaTypeId,
      mediaTypeName: record.mediaTypeName,
      contactsHandledOutSLA: record.outSLA,
      personalQueueCount: record.personalQueueCount,
      queueCount: record.queueCount,
      serviceLevel: record.serviceLevel,
      serviceLevelGoal: record.serviceLevelGoal,
      skillId: record.skillId,
      skillName: record.skillName,
      skillQueueCount: record.skillQueueCount,
      workItemQueueType: record.workItemQueueType,
    };
  }

  /** Shapes a raw skill-activity record into the same fields SkillEvent.parse() produces. */
  function toSkillEvent(record) {
    return {
      mediaTypeId: parseIntegerForSkillEvent(record.mediaTypeId),
      mediaTypeName: record.mediaTypeName,
      isOutbound: parseBooleanStringForSkillEvent(record.isOutbound),
      isActive: parseBooleanStringForSkillEvent(record.isActive),
      skillId: record.skillId,
      skillName: record.skillName,
      isFavorite: parseBooleanStringForSkillEvent(record.isFavorite),
    };
  }

  /** Up to 3 total attempts per page - the initial try plus 2 retries - only for errors likely to be transient. */
  const BOOTSTRAP_PAGE_MAX_ATTEMPTS = 3;

  /**
   * How often the bootstrap posts a "still working" signal while running, so the gate (skill-activity-
   * bootstrap-gate.ts) can tell slow-but-alive apart from silently dead, with no cap on total duration.
   */
  const BOOTSTRAP_HEARTBEAT_INTERVAL_MS = 2000;

  /**
   * Fetches one page of the skill activity endpoint, retrying transport failures and 5xx responses up to
   * BOOTSTRAP_PAGE_MAX_ATTEMPTS times immediately (both are typically transient, and the endpoint already
   * has a known, bounded response time - no backoff delay needed on top of that). 4xx responses are not
   * retried - the same request (bad auth, bad params) will fail identically every time, so retrying wastes
   * the attempt budget for no benefit. Returns null if every attempt is exhausted or a non-retryable error
   * occurs.
   */
  async function fetchSkillActivityPage(input, skip, top) {
    const pageUrl = new URL(input.requestParams.url);
    pageUrl.searchParams.set('skip', String(skip));
    pageUrl.searchParams.set('top', String(top));

    for (let attempt = 1; attempt <= BOOTSTRAP_PAGE_MAX_ATTEMPTS; attempt++) {
      const isLastAttempt = attempt === BOOTSTRAP_PAGE_MAX_ATTEMPTS;
      // Only the attempt that actually gives up logs - a retry that goes on to succeed isn't an error
      // worth reporting, and logging every intermediate attempt is needless overhead on the hot path.
      const response = await self.rxjs.fetch
        .fromFetch(
          pageUrl.toString(),
          // eslint-disable-next-line no-undef
          toRequestInit(
            input.requestParams.method,
            input.requestParams.request.headers,
            input.requestParams.request.body
          )
        )
        .toPromise()
        .catch((error) => {
          if (isLastAttempt) {
            console.error('fetchSkillActivityPage', 'Error in api call:-' + error.toString() + ' after ' + BOOTSTRAP_PAGE_MAX_ATTEMPTS + ' attempts at skip ' + skip);
          }
          return null;
        });

      if (!response) {
        if (isLastAttempt) {
          return null;
        }
        continue;
      }
      if (response.status >= 500) {
        if (isLastAttempt) {
          console.error('fetchSkillActivityPage', 'Error in api call:-status ' + response.status + ' at skip ' + skip + ' after ' + BOOTSTRAP_PAGE_MAX_ATTEMPTS + ' attempts');
          return null;
        }
        continue;
      }
      if (response.status >= 400) {
        console.error('fetchSkillActivityPage', 'Error in api call:-status ' + response.status + ' at skip ' + skip);
        return null;
      }
      if (response.status === 304) {
        return { skillActivity: [], totalRecords: 0 };
      }
      return parseResponse(await response.text());
    }
    return null;
  }

  /**
   * Downloads the full skill activity set on the worker thread, paginating with skip/top when
   * totalRecords exceeds pageSize. Any page failure aborts the whole bootstrap - nothing is posted back
   * except a failure signal, so the main thread never seeds a partial store.
   */
  async function startSkillActivityBootstrap(input) {
    const pageSize = input?.bootstrapOptions?.pageSize ?? 10000;
    const maxParallel = input?.bootstrapOptions?.maxParallel ?? 2;
    const maxPages = input?.bootstrapOptions?.maxPages ?? 10;
    const heartbeat = setInterval(() => {
      self.postMessage({ type: 'skill-activity-bootstrap-progress' });
    }, BOOTSTRAP_HEARTBEAT_INTERVAL_MS);
    try {
      const firstPage = await fetchSkillActivityPage(input, 0, pageSize);
      if (!firstPage) {
        self.postMessage({ type: 'skill-activity-bootstrap-failed', error: 'first page failed' });
        return;
      }
      let records = (firstPage.skillActivity || []).slice();
      const pollTimes = firstPage.lastPollTime ? [firstPage.lastPollTime] : [];
      const totalRecords = firstPage.totalRecords;

      if (typeof totalRecords === 'number' && totalRecords > records.length) {
        const pageCount = Math.min(Math.ceil(totalRecords / pageSize), maxPages);
        for (let page = 1; page < pageCount; page += maxParallel) {
          const skips = [];
          for (let next = page; next < Math.min(page + maxParallel, pageCount); next++) {
            skips.push(next * pageSize);
          }
          const pages = await Promise.all(skips.map((skip) => fetchSkillActivityPage(input, skip, pageSize)));
          for (let i = 0; i < pages.length; i++) {
            if (!pages[i]) {
              self.postMessage({ type: 'skill-activity-bootstrap-failed', error: 'page failed at skip ' + skips[i] });
              return;
            }
            records = records.concat(pages[i].skillActivity || []);
            if (pages[i].lastPollTime) pollTimes.push(pages[i].lastPollTime);
          }
        }
      } else if (typeof totalRecords !== 'number' && records.length === pageSize) {
        // No totalRecords in the body: walk sequentially until a short page ends the set.
        let skip = pageSize;
        let pageLength = records.length;
        let guard = 1;
        while (pageLength === pageSize && guard < maxPages) {
          const nextPage = await fetchSkillActivityPage(input, skip, pageSize);
          if (!nextPage) {
            self.postMessage({ type: 'skill-activity-bootstrap-failed', error: 'page failed at skip ' + skip });
            return;
          }
          const pageRecords = nextPage.skillActivity || [];
          records = records.concat(pageRecords);
          if (nextPage.lastPollTime) pollTimes.push(nextPage.lastPollTime);
          pageLength = pageRecords.length;
          skip += pageSize;
          guard++;
        }
      }

      // Dedupe by skillId - skip/top paging can repeat a row if the server set shifts mid-walk.
      const bySkillId = new Map();
      for (let i = 0; i < records.length; i++) {
        bySkillId.set(String(records[i].skillId), records[i]);
      }
      const unique = Array.from(bySkillId.values());

      unique.sort((a, b) => {
        const firstValue = (a.skillName || '').toLowerCase();
        const secondValue = (b.skillName || '').toLowerCase();
        if (firstValue > secondValue) return 1;
        if (firstValue < secondValue) return -1;
        return 0;
      });

      pollTimes.sort();
      // Matches the default real-poll filter (mediaTypeId=PhoneCall, isOutbound=false, isActive=true).
      const skillActivityList = unique
        .filter((record) => record.isActive && record.mediaTypeId === PHONE_CALL_MEDIA_TYPE_ID && !record.isOutbound)
        .map(toSkillActivityEvent);
      const skillList = unique.map(toSkillEvent);
      self.postMessage({
        type: 'skill-activity-bootstrap-complete',
        skillActivityList,
        skillList,
        lastPollTime: pollTimes.length ? pollTimes[0] : null,
      });
    } catch (error) {
      console.error('startSkillActivityBootstrap', 'Error in api call:-' + error.toString());
      self.postMessage({ type: 'skill-activity-bootstrap-failed', error: error?.toString() });
    } finally {
      clearInterval(heartbeat);
    }
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