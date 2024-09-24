# NICE CXone Agent SDK

*  [Official SDK Documentation](https://help.nice-incontact.com/content/agent/cxoneagent/cxoneagent.htm?tocpath=Agents%7CCXone%20Agent%20%7C_____0)
*  [NPM package](https://www.npmjs.com/package/@nice-devone/agent-sdk)
*  [Sample Web App](https://github.com/nice-cxone/webapp-acd-cxagent-sdk-consumer)

## Requirements
*  TypeScript **4.7**
*  Runtime: **ES2022** (`WebSocket`, `Intl`, `Promise`, `EventTarget`, `CustomEvent`, `JSON`, `Date`, etc.)
*  Custom application bundler (webpack, create-react-app, etc.)

This is the official README file for the `@nice-devone/agent-sdk` library. This agent SDK empowers developers to integrate CXone Agent functionalities within their custom applications.

## Features

* **ACD (Automatic Call Distribution):** Manage incoming calls, queues, and agent states.  **The Agent SDK streamlines ACD operations by providing a more abstract layer.**
* **Call Control:** Initiate, answer, hold, transfer, and perform other call actions.
* **CXone Client Interaction:** Interact with the CXone platform using the `CXoneClient` class.
* **Notifications:** Receive and manage various notifications relevant to agents (e.g., call alerts, work item updates).
* **Agent Copilot:** Utilize Agent Copilot features (implementation details might depend on specific integrations).
* **Agent State Management:** Set and manage agent states (available, unavailable, etc.).
* **Observables:** Leverage observables for handling asynchronous data streams.
* **Feature Toggles:** Enable or disable functionalities based on configuration.
* **Reporting:** Access and utilize CXone reporting functionalities.
* **Dynamic Directory:** Interact with the CXone directory service for contact lookup.
* **Presence Synchronization:** Synchronize agent presence information across applications.

## Installation

```
npm install @nice-devone/agent-sdk
```

## Usage

1. **Import necessary modules:**

```
import {
  AcwType,
  AgentLegService,
  BulkReplyHistoryResponse,
  BulkReplyResponse,
  CcfLogger,
  ContactService,
  ContactType,
  CXoneClient,
  CXoneContact,
  CXoneNotificationManager,
  CXoneProductFeature,
  CXoneTenant,
  DispositionService,
  FeatureToggleService,
  ObservableValue,
  PersonalConnectionService,
  SkillService,
  VoiceControlService,
  VoiceService,
} from '@nice-devone/agent-sdk';
```

2. **Initialize CXone Client:**

```
const cxoneClient = CXoneClient.instance;
await cxoneClient.init('your_authorization_token'); // Replace with your actual token
```

3. **Leverage SDK functionalities:**

Explore the available classes and methods within the library to interact with CXone ACD functionalities.

## Documentation

**For comprehensive API documentation, consult the following resources:**

* **Official Developer Portal:** The NICE CXone Developer Portal provides detailed API documentation for the Agent SDK: [link to official API documentation](https://developer.niceincontact.com/API/AgentAPI).
* **Sample Web App:** Refer to the provided sample web application ([link to sample web app](https://github.com/nice-cxone/webapp-acd-cxagent-sdk-consumer)) for code examples demonstrating how to use the SDK functionalities.

## Compatibility

This SDK is likely compatible with specific CXone ACD versions. Refer to the documentation for supported versions.

## License

Check the license file for specific terms regarding the use of this SDK.

## Keywords

none