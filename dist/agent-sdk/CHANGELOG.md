## 25.1.1 - 2025-02-22 ##

- `[Added]`: Added method to handle Copilot filter updates
- `[Added]`: Added service to capture copilot guidance feedback
- `[Added]`: Updated copilot notification service with new subscription for copilot healthcheck
- `[Added]`: Added service to manage contact history data in index DB


## 25.2.0 - 2025-05-27 ##

- `[Added]`: Added service to handle custom event LOCALPOST that validates port before posting payload to the specified path and port.


## 25.3 - 2025-08-21 ##

- `[Updated]`: Added changes in directory provider for maintaining the last poll time
- `[Updated]`: Added changes in directory providers to maintain favorites for agents
- `[Updated]`: Added changes in directory providers to maintain favorites for teams, skills, adddress book and external directory
- `[Added]`: Added changes to show notifications to agents when recording starts or stops, if the Enhanced Voice Recording Compliance feature in Tenant Management is enabled

## 25.4.0 - 2025-10-29 ##

- `[Fixed]` : CFB fix for Agent Skill listing in Directory search showing wrong queue counts and wait times

## 26.1.1 - 2026-03-03 ##

- `[Added]`: Updated /agents/{agentId}/skills API call to get digitalPOC and digitalPOCName fields controlled by Feature toggle and Division license.
- `[Added]`: Added /stopRecord API integration.
- `[Updated]`: Added change for honoring recording notification permission to show recording notifications.
- `[Added]`: Added function to handle contact switch in custom agent built using CMA SDK when CRM session is switched.

## 26.2.0 - 2026-04-29 ##

- `[Updated]`: New microservice for Queue and Queue Details has been implemented based on the feature toggle
- `[Updated]`: Abort API invocation updated for Digital contact switch dependent APIs
- `[Added]`: Revamped WebSocket Event Delta Consumer methods for Digital Contacts

- `[Updated]`: Updated Copilot base API routes from `/agentcopilotapi` to `/agent-copilot`
