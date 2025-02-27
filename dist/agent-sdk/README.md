# NICE CXone Agent SDK

*  [Official SDK Documentation](https://help.nice-incontact.com/content/agent/agentapplicationadministration/cxoneagent/cxasdk.htm?tocpath=Agent%20Application%20Administration%7CAgent%20Application%20Administration%7CCXone%20Agent%7C_____8)
*  [NPM package](https://www.npmjs.com/package/@nice-devone/agent-sdk)
*  [Sample Web App](https://github.com/nice-devone/nice-cxone-agent-sdk/tree/main/cxa-sdk-consumer)

### Requirements

*  TypeScript **4.7**
*  Runtime: **ES2022** (`WebSocket`, `Intl`, `Promise`, `EventTarget`, `CustomEvent`, `JSON`, `Date`, etc.)
*  Custom application bundler (webpack, create-react-app, etc.)

This is the official README file for the `@nice-devone/agent-sdk` library. This agent SDK empowers developers to integrate CXone Agent functionalities within their custom applications.

### Features

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

### Installation

```
npm install @nice-devone/agent-sdk
```

### Usage

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
CXoneClient.instance.initAuthDependentModules();
```

3. **Leverage SDK functionalities:**

Explore the available classes and methods within the library to interact with CXone ACD functionalities.

### Documentation

For detailed documentation and developer related queries, Please visit [Official SDK Documentation](https://help.nice-incontact.com/content/agent/agentapplicationadministration/cxoneagent/cxasdk.htm?tocpath=Agent%20Application%20Administration%7CAgent%20Application%20Administration%7CCXone%20Agent%7C_____8)

### Compatibility

This SDK is likely compatible with specific CXone Agent SDK versions. Refer to the documentation for supported versions.

### License

Check the license file for specific terms regarding the use of this SDK.

### Additional Notes

Consider exploring the codebase (src/lib/) for a more comprehensive understanding of the functionalities offered.
