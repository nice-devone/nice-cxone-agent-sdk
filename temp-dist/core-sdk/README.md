# NICE CXone Core SDK

*  [Official SDK Documentation](https://help.nice-incontact.com/content/agent/agentapplicationadministration/cxoneagent/cxasdk.htm?tocpath=Agent%20Application%20Administration%7CAgent%20Application%20Administration%7CCXone%20Agent%7C_____8)
*  [NPM package](https://www.npmjs.com/package/@nice-devone/core-sdk)
*  [Sample Web App](https://github.com/nice-devone/nice-cxone-agent-sdk/tree/main/cxa-sdk-consumer)

### Requirements

*  TypeScript **4.7**
*  Runtime: **ES2022** (`WebSocket`, `Intl`, `Promise`, `EventTarget`, `CustomEvent`, `JSON`, `Date`, etc.)
*  Custom application bundler (webpack, create-react-app, etc.)

This README file provides an overview of the `@nice-devone/core-sdk` library. It is a typescript library that empowers developers to interact with Core-sdk functionalities within their applications built for the NICE CXone platform.

### Features

* **Logger:** To manage log related activities using logger config, log appender, console log appender etc.

* **Formatter:** To perform format related functionalities using log formatter, utils formatter, basic formatter.

* **Circuit Breaker:** To handle the circuit break in multiple states(open, closed, Half-open).

* **Datadog:** Provides various data logger related functions like getLoggerGlobalContext, getGlobalContext, addLoggerGlobalContext, addLoggerGlobalContext, etc.

* **WebSocket Client:** Interact with the CXone platform using websocket client.

* **Contact Events:** To receive status about call contact events, voice mail contact events.

* **Helper functions:** To reduce redundancy and for better practices helpers like Security Helper, Session Helper, LocalStorage Helper were used throughout the library.

* **Data Parsing and Manipulation:** Utilities for parsing strings to booleans or integers, and calculating percentages.

* **Enums:** Enumerations for various concepts like log level, Call Contact Events, Voice mail Contact events, Wem Notification Events.

* **Utility Functions:** Helper functions for common tasks like data manipulation, formatting, and potentially logging.


### Installation

```
npm install @nice-devone/core-sdk
```

### Peer Dependencies

This library relies on several peer dependencies, including:
```
@nice-devone/common-sdk

@nice-devone/i18n

@nice-devone/shared-apps-lib
```
Ensure these dependencies are also installed and configured correctly for proper functionality.

### Usage

1. Import necessary modules:

```
import {
  AdminService,
      Logger,
  ACDSessionManager,
  LocalStorageHelper,
  StorageKeys,
  WebsocketStatusCode,
  BusinessUnit,
} from '@nice-devone/core-sdk';
```

2. Initialize Logger:
```
const logger = new Logger('Module', 'ClassName');
```

3. Leverage SDK functionalities:

Refer to the official documentation for detailed usage examples on specific features like AdminService, WebsocketStatusCode, etc.

Explore the available classes and methods within the library to interact with CXone Core-sdk functionalities.

### Documentation

For detailed documentation and developer related queries,Please visit [Official SDK Documentation](https://help.nice-incontact.com/content/agent/agentapplicationadministration/cxoneagent/cxasdk.htm?tocpath=Agent%20Application%20Administration%7CAgent%20Application%20Administration%7CCXone%20Agent%7C_____8)

### Compatibility

This SDK is likely compatible with specific CXone Agent SDK versions. Refer to the documentation for supported versions.

### License

Check the license file for specific terms regarding the use of this SDK.

### Additional Notes

Consider exploring the codebase (src/lib/) for a more comprehensive understanding of the functionalities offered.
