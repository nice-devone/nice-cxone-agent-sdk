## 25.1.1 - 2025-02-22 ##

- `[Updated]`: Updated core Index DB logic to have versioning to avoid Index DB cache issue
- `[Added] `: Included new request header x-message-sender for DFO API billing tracking

## 25.2.0 - 2025-05-27 ##

- `[Added] `: Added changes for storing token in encrypted format in localstorage, controlled by a feature toggle
- `[Added]`: Added changes to handle local post event
- `[Added]`: Added changes to restart get-next-events polling, controlled by a feature toggle, if it was terminated unexpectedly.
- `[Updated]`: Added changes to close the WS connection on 'Custom Degradation' and switch back to get-next polling


## 25.3 - 2025-08-21 ##

- `[Updated]`: Updated storage key to be used for Email Revamp sorting feature through client data API
- `[Added]:` Upgraded the Agent Settings API  to v33 & Added new versioning service API (FT Controlled)


## 26.1.1 - 2026-03-03 ##

- `[Updated]`: Added Failover to GNE on 302 response for keepalive and event-queue-resize apis.
- `[Fixed]`: CFB Fix for multiple uiq connections are established when only one voice preference i.e. integrated softphone is enabled

## 26.2.0 - 2026-04-29 ##

- `[Fixed] `: CFB Fix -  Handled null response by rejecting the Promise with an error and Error handling. 
- `[Added]`: Added new Queue and Queue details microservices urls
- `[Added]`: Added ping/pong based heartbeat mechanism to detect and reconnect UIQ WebSocket on server disconnect. 
- `[Updated]`: Updated UIQ WebSocket connection to pass `isAutoLogout` flag, enabling automatic cleanup of inactive agent sessions
