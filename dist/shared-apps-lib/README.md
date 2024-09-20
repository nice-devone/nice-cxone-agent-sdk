# NICE CXone shared-apps-lib SDK

*  [NPM package](https://www.npmjs.com/package/@nice-devone/shared-apps-lib)
*  [Sample Web App](https://github.com/nice-cxone/webapp-acd-cxagent-sdk-consumer)

# Requirements

TypeScript 4.9
Runtime: ES2022 (WebSocket, Intl, Promise, EventTarget, CustomEvent, JSON, Date, etc.)
Custom application bundler (webpack, create-react-app, etc.)

@nice-devone/shared-apps-lib

This is the official README file for the `@nice-devone/shared-apps-lib` library. This shared-apps-lib SDK empowers developers to integrate Component Loaders, enums, Helpers, Interfaces within their custom applications.

# Features

<b>Integration Component Loader:</b> This component act as middleman to load integration component as per the appType.

<b>Interfaces:</b> Contains multiple interfaces like CXone Authresponse data, CXone digital contact, CXone screen pop data etc, which have been utilized in various places in CXone Agent application.

<b>Hooks:</b> With useScript hook we can load our custom script dynamically by specifying URL in script src param.

<b>Watch RTC:</b> To observe the voice quality monitor service using BUId, Agent Id, Agent Leg Id etc.

<b>Utility Functions:</b> Provides various helper functions like Validation Helper, load remote modules,app params helper, cxa extension helper, cxa screenpop helper.

<b>Integration:</b> To handle various custom events using CXone Agent Integration manager(Screen pop, digital contact, voice contact) also to transform type from SDK into Integration schema using Ccf Integration transformer.

<b>Enums:</b> Enumerations for various concepts used throughout the library like app type, generic constants, message type, regex pattern, agent states, digital contact status, digital event type.


# Installation

`npm install @nice-devone/shared-apps-lib`

# Peer Dependencies
This library relies on several peer dependencies, including:

@nice-devone/i18n

# Usage

1. Import necessary modules: 


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


    Import other relevant functionalities as needed (e.g., CXoneDigitalContactData, PartnerDetailsCallback, CXoneAgentStateData, CXoneDigitalEventType etc.,)

2. Initialize CXone Client:


    const cxoneClient = CXoneClient.instance;

    await cxoneClient.init('your_authorization_token'); // Replace with your actual token

3. Leverage SDK functionalities:

    Refer to the official documentation (link to be provided) for detailed usage examples on specific features like CXoneDigitalContactData, PartnerDeailsCallback, CXoneAgentStateDate, CXoneDigitalEventType etc.

    Explore the available classes and methods within the library to interact with CXone shared-apps-libs functionalities.

## Documentation

For detailed documentation and developer related queries, Please visit  [Link to developer documentation](https://developer.niceincontact.com/)

## Compatibility

This SDK is likely compatible with specific CXone ACD versions. Refer to the documentation for supported versions.

# License

Check the license file for specific terms regarding the use of this SDK.

# Support

For any issues or questions, please refer to the (mention support channel/link here).