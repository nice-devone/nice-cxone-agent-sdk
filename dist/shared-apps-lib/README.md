# NICE CXone shared-apps-lib SDK

*  [Official SDK Documentation](https://help.nice-incontact.com/content/agent/agentapplicationadministration/cxoneagent/cxasdk.htm?tocpath=Agent%20Application%20Administration%7CAgent%20Application%20Administration%7CCXone%20Agent%7C_____8)
*  [NPM package](https://www.npmjs.com/package/@nice-devone/shared-apps-lib)
*  [Sample Web App](https://github.com/nice-devone/nice-cxone-agent-sdk/tree/main/cxa-sdk-consumer)

### Requirements

*  TypeScript **4.7**
*  Runtime: **ES2022** (`WebSocket`, `Intl`, `Promise`, `EventTarget`, `CustomEvent`, `JSON`, `Date`, etc.)
*  Custom application bundler (webpack, create-react-app, etc.)

This is the official README file for the `@nice-devone/shared-apps-lib` library. It is a typescript library that empowers developers to integrate Component Loaders, enums, Helpers, Interfaces within their custom applications.

### Features

* **Integration Component Loader:** This component act as middleman to load integration component as per the appType.

* **Interfaces:** Contains multiple interfaces like CXone Authresponse data, CXone digital contact, CXone screen pop data etc, which have been utilized in various places in CXone Agent application.

* **Hooks:** With useScript hook we can load our custom script dynamically by specifying URL in script src param.

* **Watch RTC:** To observe the voice quality monitor service using BUId, Agent Id, Agent Leg Id etc.

* **Utility Functions:** Provides various helper functions like Validation Helper, load remote modules,app params helper, cxa extension helper, cxa screenpop helper.

* **Integration:** To handle various custom events using CXone Agent Integration manager(Screen pop, digital contact, voice contact) also to transform type from SDK into Integration schema using Ccf Integration transformer.

* **Enums:** Enumerations for various concepts used throughout the library like app type, generic constants, message type, regex pattern, agent states, digital contact status, digital event type.


### Installation
```
npm install @nice-devone/shared-apps-lib
```

## Peer Dependencies
This library relies on several peer dependencies, including:
```
@nice-devone/i18n
```

### Usage

1. Import necessary modules: 

```
import {
  ICXoneAgentIntegration,
  ClickToActCallback,
  CXoneAgentStateData,
  CXoneScreenPopData,
  CXoneVoiceContactData,
  CXoneDigitalContactData,
  LocaleChangeCallback,
  CXoneDigitalEventType,
  CXoneDigitalContactStatus,
  CXonePartnerPresenceSyncRule,
  CXonePartnerDetailsCallback,
} from '@nice-devone/shared-apps-lib';
```

Import other relevant functionalities as needed (e.g., CXoneDigitalContactData, PartnerDetailsCallback, CXoneAgentStateData, CXoneDigitalEventType etc.,)

2. Initialize CXone Client:

```
const cxoneClient = CXoneClient.instance;

await cxoneClient.init('your_authorization_token'); // Replace with your actual token
```
3. Leverage SDK functionalities:

Refer to the official documentation for detailed usage examples on specific features like CXoneDigitalContactData, PartnerDeailsCallback, CXoneAgentStateDate, CXoneDigitalEventType etc.

Explore the available classes and methods within the library to interact with CXone shared-apps-libs functionalities.

### Documentation

For detailed documentation and developer related queries, Please visit  [Link to developer documentation](https://developer.niceincontact.com/)

### Compatibility

This SDK is likely compatible with specific CXone ACD versions. Refer to the documentation for supported versions.

### License

Check the license file for specific terms regarding the use of this SDK.

### Support

For any issues or questions, please refer to the (mention support channel/link here).

### Additional Notes

Consider exploring the codebase for a more comprehensive understanding of the functionalities offered.
