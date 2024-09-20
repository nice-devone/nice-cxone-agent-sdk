const eventHubWorkerCode = () => {
  self.importScripts(
    'https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.6.7/rxjs.umd.min.js'
  );
  
  self.onmessage = function (input) {
    switch (input.data.type) {
      case 'startEventHubApiPolling':
        startPolling(input.data);
        break;
      default:
        break;
    }
  }

  let contacts = [];
  let intervalId = 0;

  async function startPolling (input){
    let digitalContacts = input.digitalContacts
    let requestParams =  input.requestParams
    if (contacts && JSON.stringify(contacts) != JSON.stringify(digitalContacts)){
      clearInterval(intervalId);
      }
    contacts = digitalContacts;
    digitalContacts.forEach(async (contact) => {
    requestParams.request.body = {
      'relationObjectId': contact,
      'subscriptionType' : 'contact'
    }
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
          //clearInterval(timerId);
          self.postMessage(parseResponse(data));
        }
      } catch (error) {
        console.log('Error occurred in startPolling', 'Starting event hub polling failed - ' + error.toString());
      }
    })
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
  }
}

export default eventHubWorkerCode;
