# NICE CXone Digital SDK

*  [NPM package](https://www.npmjs.com/package/@nice-devone/digital-sdk)
*  [Sample Web App](https://github.com/nice-cxone/webapp-acd-cxagent-sdk-consumer)

# Requirements

## Requirements
*  TypeScript **4.7**
*  Runtime: **ES2022** (`WebSocket`, `Intl`, `Promise`, `EventTarget`, `CustomEvent`, `JSON`, `Date`, etc.)
*  Custom application bundler (webpack, create-react-app, etc.)


This README file provides an overview of the `@nice-devone/digital-sdk` library. It is a typescript library that empowers developers to interact with digital-sdk functionalities within their applications built for the NICE CXone platform.

# Features

* **Digital Client:** To Interact with the CXone platform using the CXoneDigitalClient.

* **Contact Information:** To get the contact details from  (e.g., call alerts, work item updates).

* **Digital Service:** To get the digital Service details like information about digital channels, invoke Out bound Channels, inbound channels etc.

* **Digital Contact Helper:** Helper class to accomodate parsing logic for cxone-digital-contact.

* **User Slot Provider:** Utilize user slot events like digital status, restart worker, terminate polling and refresh token etc.

* **Event Hub Provider:** To initiate the event hub worker for digital contact and to terminate the polling of event hub api.

* **Contact Manager:** To initialize the digital web socket connection and manage the user slot details and handling messages using digital web socket.

* **Browser Utils:** For updating co-browser data using local storage and to use other utils. 


## Installation

`npm install @nice-devone/digital-sdk`

## Peer Dependencies

This library relies on several peer dependencies, including:

@nice-devone/common-sdk 

@nice-devone/acd-sdk

@nice-devone/agent-sdk

@nice-devone/i18n

@nice-devone/shared-apps-lib

Ensure these dependencies are also installed and configured correctly for proper functionality.

## Usage

1. Import necessary modules:

      import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
      
      Import other relevant functionalities as needed (e.g., call control, notifications)

2. Initialize CXoneDigital Client:

      const cxoneDigtialClient: CXoneDigitalClient = CXoneDigitalClient.instance;
      
      cxoneDigtialClient.digitalService.getContactHistory('customerId); 

3. Leverage SDK functionalities:

      Refer to the official documentation (link to be provided) for detailed usage examples on specific features like CXoneDigitalClient, CXoneDigitalContact,SortOrder etc.
      
      Explore the available classes and methods within the library to interact with CXone digital-sdk functionalities.

## Documentation

For detailed documentation and developer related queries, Please visit  [Link to developer documentation](https://developer.niceincontact.com/)

## Compatibility

This SDK is likely compatible with specific CXone ACD versions. Refer to the documentation for supported versions.

## License

Check the license file for specific terms regarding the use of this SDK.

## Additional Notes

Consider exploring the codebase (src/lib/digital) for a more comprehensive understanding of the functionalities offered.

## Keywords

none