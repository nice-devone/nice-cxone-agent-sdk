# NICE CXone Voice SDK

*  [NPM package](https://www.npmjs.com/package/@nice-devone/voice-sdk)
*  [Sample Web App](https://github.com/nice-cxone/webapp-acd-cxagent-sdk-consumer)

### Requirements

*  TypeScript **4.7**
*  Runtime: **ES2022** (`WebSocket`, `Intl`, `Promise`, `EventTarget`, `CustomEvent`, `JSON`, `Date`, etc.)
*  Custom application bundler (webpack, create-react-app, etc.)

This is the official README file for the `@nice-devone/voice-sdk` library. It is a typescript library that empowers developers to interact with voice-sdk functionalities within their applications built for the NICE CXone platform.

### Features

* **Web RTC Service:** To perform integrated softphone related tasks using audio codes.

* **Client Interaction:** To initialize voice extension, send message to web RTC Extension and to connect with server and enabling the chrome extension for voice call.

* **Connection Options:** Initiate, answer, hold, transfer, mute and perform other call actions.

* **Connection Status:** To know about the status of voice connection of the current call.

* **Call/Messages:** To get inbound and for outbound voice calls. Also, to send and receive messages in the agent application.

* **Enums:** Provides various enum services like Voice call status, Voice connection status, voice messages.

* **Models:** Provides models for web RTC server connection options, CXone Voice connection, CXone voice call, CXone Voice client.

### Installation
```
npm install @nice-devone/voice-sdk
```
### Peer Dependencies
This library relies on several peer dependencies, including:
```
@nice-devone/core-sdk

@nice-devone/common-sdk

@nice-devone/i18n

@nice-devone/shared-apps-lib
```

### Usage

1. Import necessary modules:
```
import { CXoneVoiceClient } from '@nice-devone/Voice-sdk';

Import other relevant functionalities as needed (e.g., VoiceConnectionStatus, VoiceMessageType, VoiceConnection etc.,)
```
2. Initialize CXone Client:
```
const cxoneVoiceClient = CXoneVoiceClient.instance;

await cxoneVoiceClient.connectServer('acdAgentId', 'options', 'audioElement', 'appName'); // Replace with actual value for this params
```
3. Leverage SDK functionalities:

Refer to the official documentation (link to be provided) for detailed usage examples on specific features like CXoneVoiceClient, CXoneVoiceMessageType etc. 

Explore the available classes and methods within the library to interact with CXone voice-sdk functionalities.

### Documentation

For detailed documentation and developer related queries, Please visit  [Link to developer documentation](https://developer.niceincontact.com/)

### Compatibility

This SDK is likely compatible with specific CXone ACD versions. Refer to the documentation for supported versions.

### License

This library is licensed under the (mention license here).

### Support

For any issues or questions, please refer to the (mention support channel/link here).

### Additional Notes

Consider exploring the codebase (src/lib/) for a more comprehensive understanding of the functionalities offered.