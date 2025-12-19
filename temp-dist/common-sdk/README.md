# NICE CXone Common SDK

*  [Official SDK Documentation](https://help.nicecxone.com/content/agent/agentapplicationadministration/cxoneagent/cxasdk.htm?tocpath=Agent%20Application%20Administration%7CAgent%20Application%20Administration%7CCXone%20Agent%7C_____8)
*  [NPM package](https://www.npmjs.com/package/@nice-devone/common-sdk)
*  [Sample Web App](https://github.com/nice-devone/nice-cxone-agent-sdk/tree/main/cxa-sdk-consumer)

### Requirements

*  TypeScript **4.7**
*  Runtime: **ES2022** (`WebSocket`, `Intl`, `Promise`, `EventTarget`, `CustomEvent`, `JSON`, `Date`, etc.)
*  Custom application bundler (webpack, create-react-app, etc.)

This is a typescript library which provides a comprehensive set of functionalities for building CXone applications. It offers various utilities, models, and helper functions to streamline common development tasks across different CXone applications.

### Features

#### HTTP Utilities

* HttpHeader: Represents a header within an HTTP request in name and value format.
* HttpResponse: Encapsulates the response received from an HTTP request, providing properties for status, status text, headers, and body data.

#### Message Bus

* MessageBus: Provides methods for subscribing to and sending messages on request and response channels in order to exchange data between multiple tabs.
* CXone Leader Elector: Component for leader election among multiple browser instances to run leader operations like polling on leader tab in multi-tab scenarios.

#### Utility Functions

* **Retry Logic:** Configuration options for retrying failed operations.
* **Search and Filtering:** Utilities for generating query URLs for searching across various entities (messages, customers, threads).
* **Time and Date:** Functions for parsing durations, converting milliseconds to time strings, and potentially formatting dates according to locale.
* **Data Parsing and Manipulation:** Utilities for parsing strings to booleans or integers, and calculating percentages.
* **Validation:** Validates a URL or checks against pre-defined strings like "PageOpen" for screen pop functionality.

#### Models & Enums

Common SDK provides several models and enums to implement below functionalities:

**Agent Management:** This SDK provides models like AgentCurrentState, AgentDetails, AgentQueues, etc. alongwith enums like AgentSessionStatus, AgentLegStatus, etc. to implement comprehensive agent management capabilities, including:

* Agent Status: Monitoring agent availability and handling state changes.
* Agent Information: Accessing detailed agent information, such as skills and queues.
* Agent Sessions: Managing agent sessions, including start, end, and join events.

**Authentication:** The Common SDK offers models like AuthState, AuthWithCodeReq, WsRequestQueryParams, etc. to access basic user information and handle authentication events. Enums like MessageType, CXoneSdkErrorType, etc. further enhance the authentication process by providing categorization and specific instructions.

**Communication:** This SDK offers models like CallContactEvent, CoBrowseEvent, and CXoneContact to represent different types of interactions, and enums like CXoneDigitalEventType, CXoneRichMessageActionType, and MessageType to categorize and specify specific details within these interactions.

**Customer Interaction:** The Common SDK offers models like BulkReplyResponse, ContactService, DispositionService, and others. Additionally, the SDK leverages enums such as InteractionStatus, InteractionType, ContactType, and more, to categorize and define various aspects of customer interactions.

**Directories:** The Common SDK offers a comprehensive set of models for managing directory entries, including address books, skill lists, and agent lists. These models, such as AddressBooks, AddressBooksEntries, and DirectoryResponse, provide a structured way to represent and manipulate directory data. Additionally, enums like DirectoryEntities help categorize and differentiate various types of directory entries.

### Installation

```
npm install @nice-devone/common-sdk
```

### Import necessary modules

```
import {
  AgentCurrentState,
  AgentDetails,
  AgentQueues,
  AgentQueuesDetail,
  AgentSkill,
  AgentState,
  AgentStateEvent,
  AgentSessionResponse,
  CallContactEvent,
  CoBrowseEvent,
  LocalPostEvent,
  CXoneApiPerformanceMetrics,
  CXoneAudioVisualNotificationSettings,
  CXoneClientData,
  CXoneContactScreenpop,
  CXoneDispositionDetails,
  CXoneEvent,
  CXoneLeaderElector,
  CXonePageOpen,
  CXonePopUrl,
  CXoneRunApp,
  CXoneSdkError,
  CXoneSdkErrorType,
  CXoneSoftphoneNotificationSettings,
  CXoneTypingMessageContent,
  DirectoryEntities,
  EndSessionRequest,
  HttpResponse,
  IndicatorActionType,
  MediaType,
  MCHSetting,
  MessageBox,
  MessageType,
  PermissionKeys,
  PermissionValues,
  Queue,
  RunAppActionType,
  StartSessionRequest,
  TagsResponse,
  UnavailableCode,
  UpdateNetworkTimeoutEvent,
  VoiceMailContactEvent,
  VoiceMailPlayBackEvent,
  WorkItemContactEvent,
  WorkItemContactStatus,
} from '@nice-devone/common-sdk';
```

### Usage

The library provides a modular structure. Import the specific functionalities you need from the relevant sub-modules within the src folder. Refer to the documentation for detailed usage instructions for each function or model.

### License

Check the license file for specific terms regarding the use of this SDK.

### Support

For further assistance, refer to the official documentation or reach out to NICE CXone support channels.
