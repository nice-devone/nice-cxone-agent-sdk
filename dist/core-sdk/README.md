# NICE CXone Core SDK

*  [NPM package](https://www.npmjs.com/package/@nice-devone/core-sdk)
*  [Sample Web App](https://github.com/nice-cxone/webapp-acd-cxagent-sdk-consumer)

# Requirements

TypeScript 4.9
Runtime: ES2022 (WebSocket, Intl, Promise, EventTarget, CustomEvent, JSON, Date, etc.)
Custom application bundler (webpack, create-react-app, etc.)

@nice-devone/core-sdk

This is the official README file for the `@nice-devone/core-sdk` library. This core SDK empowers developers to integrate CXone Agent functionalities within their custom applications.

# Features

<b>Logger:</b> To manage log related activities using logger config, log appender, console log appender etc.

<b>Formatter:</b> To perform format related functionalities using log formatter, utils formatter, basic formatter.

<b>Circuit Breaker:</b> To handle the circuit break in multiple states(open, closed, Half-open).

<b>Datadog:</b> Provides various data logger related functions like getLoggerGlobalContext, getGlobalContext, addLoggerGlobalContext, addLoggerGlobalContext, etc.

<b>WebSocket Client:</b> Interact with the CXone platform using websocket client.

<b>Contact Events:</b> To receive status about call contact events, voice mail contact events.

<b>Helper functions:</b> To reduce redundancy and for better practices helpers like Security Helper, Session Helper, LocalStorage Helper were used throughout the library.

<b>Data Parsing and Manipulation:</b> Utilities for parsing strings to booleans or integers, and calculating percentages.

<b>Enums:</b> Enumerations for various concepts like log level, Call Contact Events, Voice mail Contact events, Wem Notification Events.

<b>Utility Functions:</b> Helper functions for common tasks like data manipulation, formatting, and potentially logging.


# Installation

`npm install @nice-devone/core-sdk`


# Peer Dependencies
This library relies on several peer dependencies, including:

@nice-devone/common-sdk

@nice-devone/i18n

@nice-devone/shared-apps-lib


# Usage

1. Import necessary modules:
   

      import {
      AdminService,
         Logger,
      ACDSessionManager,
      LocalStorageHelper,
      StorageKeys,
      WebsocketStatusCode,
      BusinessUnit,
   } from '@nice-devone/core-sdk';

2. Initialize Logger:

      const logger = new Logger('Browser Extension', 'DockingTab');

3. Leverage SDK functionalities:

      Refer to the official documentation for detailed usage examples on specific features like AdminService, WebsocketStatusCode, etc.
      
      Explore the available classes and methods within the library to interact with CXone Core-sdk functionalities.

## Documentation

For detailed documentation and developer related queries, Please visit [Link to developer documentation](https://developer.niceincontact.com/)

## Compatibility

This SDK is likely compatible with specific CXone ACD versions. Refer to the documentation for supported versions. 

# License

Check the license file for specific terms regarding the use of this SDK.