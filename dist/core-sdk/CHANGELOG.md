## 25.1.1 - 2025-02-22 ##

- `[Updated]`: Updated core Index DB logic to have versioning to avoid Index DB cache issue
- `[Added] `: Included new request header x-message-sender for DFO API billing tracking

## 25.2.0.2 - 2025-05-27 ##

- `[Added] `: Added changes for storing token in encrypted format in localstorage, controlled by a feature toggle
- `[Added]`: Added changes to handle local post event
- `[Added]`: Added changes to restart get-next-events polling, controlled by a feature toggle, if it was terminated unexpectedly.
- `[Updated]`: Added changes to close the WS connection on 'Custom Degradation' and switch back to get-next polling