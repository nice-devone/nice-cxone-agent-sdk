# NICE CXone ACD SDK

*  [Official SDK Documentation](https://help.nicecxone.com/content/agent/agentapplicationadministration/cxoneagent/cxasdk.htm?tocpath=Agent%20Application%20Administration%7CAgent%20Application%20Administration%7CCXone%20Agent%7C_____8)
*  [NPM package](https://www.npmjs.com/package/@nice-devone/acd-sdk)
*  [Sample Web App](https://github.com/nice-devone/nice-cxone-agent-sdk/tree/main/cxa-sdk-consumer)

### Requirements

*  TypeScript **4.7**
*  Runtime: **ES2022** (`WebSocket`, `Intl`, `Promise`, `EventTarget`, `CustomEvent`, `JSON`, `Date`, etc.)
*  Custom application bundler (webpack, create-react-app, etc.)

This README file provides an overview of the `@nice-devone/acd-sdk` library. It is a typescript library that empowers developers to interact with Automatic Call Distribution (ACD) functionalities within their applications built for the NICE CXone platform.

### Features

* **ACD Engagement:** Manage features that impact contact routing, like starting and ending ACD sessions, changing an agent's state (available/unavailable, on break, etc.), and so forth. 
* **Contact Management:** Manage interactions with customers throughout their journey, including routing contacts to agents, call level operations like mute, hold, etc. transferring calls, playing audio prompts and updating contact metadata.  
**Note:** Interacting with voicemails and work items are specific functionalities within this broader concept.
* **Skill Management:** Retrieve information about agent skills, which are used to determine which agents are qualified to handle specific types of contacts.
* **Team Unavailable Codes:** Fetch team unavailable codes.
* **Notifications:** Receive ACD notifications based on the dependency on @nice-devone/agent-sdk.
* **Agent Details:** Retrieve agent details based on the presence of the agent-details service.

### Installation

```
npm install @nice-devone/acd-sdk
```

### Usage

1. **Import necessary modules:**

```
import { /* functionalities from acd-sdk */ } from '@nice-devone/acd-sdk';
```

2. ** Initialize the CXoneAcdClient **

```
CXoneAcdClient.instance.initAcdEngagement();
```

3. **Leverage SDK functionalities:**

Refer to the official documentation for detailed usage examples on specific functionalities.
Explore the available classes and methods within the library (src/lib/acd) to interact with ACD features.

### Documentation

For detailed documentation and developer related queries, Please visit [Official SDK Documentation](https://help.nicecxone.com/content/agent/agentapplicationadministration/cxoneagent/cxasdk.htm?tocpath=Agent%20Application%20Administration%7CAgent%20Application%20Administration%7CCXone%20Agent%7C_____8)

### Compatibility

This SDK is likely compatible with specific CXone Agent SDK versions supported by its peer dependencies (e.g., @nice-devone/agent-sdk, @nice-devone/common-sdk). Refer to the official documentation for supported versions.

### License

Check the license file (LICENSE) for specific terms regarding the use of this SDK.

### Additional Notes

The SDK likely interacts with other NICE CXone products based on the peer dependencies (@nice-devone/core-sdk, @nice-devone/common-sdk).
Consider exploring the codebase (src/lib/) for a more comprehensive understanding of the functionalities offered.
