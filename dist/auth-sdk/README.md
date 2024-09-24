# NICE CXone Auth SDK

*  [NPM package](https://www.npmjs.com/package/@nice-devone/auth-sdk)
*  [Sample Web App](https://github.com/nice-cxone/webapp-acd-cxagent-sdk-consumer)

## Requirements
*  TypeScript **4.7**
*  Runtime: **ES2022** (`WebSocket`, `Intl`, `Promise`, `EventTarget`, `CustomEvent`, `JSON`, `Date`, etc.)
*  Custom application bundler (webpack, create-react-app, etc.)


This library provides a Node.js SDK for managing user authentication within the NICE CXone platform. It simplifies the process of interacting with the CXone authorization server, obtaining tokens, and handling user information.

## Installation

Bash
```
npm install @nice-devone/auth-sdk
```

## Features

* **Authorization Code Grant Flow:** Supports the Authorization Code Grant flow for user authentication.
* **Token Management:** Handles access token retrieval, refresh, and expiry checks.
* **OpenID Connect (OIDC) Configuration:** Discovers and retrieves OpenID Connect configuration details from the authorization server.
* **User Information:** Provides access to user details upon successful authentication.
* **Security:** Utilizes secure practices for code verifier generation and token storage (refer to best practices).
* **Background Worker:** Leverages a background worker for token refresh monitoring (implementation details might vary).

## Peer Dependencies

This library relies on several peer dependencies, including:
```
@nice-devone/core-sdk
@nice-devone/common-sdk
```
Ensure these dependencies are also installed and configured correctly for proper functionality.

## Getting Started

### 1. Installation

Install the library:

```
npm install @nice-devone/auth-sdk
```

### 2. Import Required Functionalities

Import the required functionalities from the library:

```
import { CXoneAuth, CXoneUser, AuthSettings, AuthStatus } from '@nice-devone/auth-sdk';
```

### 3. Initialize CXoneAuth Instance

Initialize the CXoneAuth instance with your authentication configuration:

```
const authSettings: AuthSettings = {
    cxoneHostname: 'https://cxone.dev.niceincontact.com',
    clientId: 'Salesforce Agent Console@inContact Inc.'
};

const auth = CXoneAuth.instance;
auth.init(authSettings);
```

Refer to the API documentation (link to be retrieved) for detailed usage instructions on specific functionalities like generating authorization URLs, acquiring tokens, and accessing user information.

## Security Considerations

Always follow secure coding practices when handling access tokens. Avoid storing them in plain text and consider using secure storage mechanisms.
Refer to the official CXone documentation for recommended security practices when using the @nice-devone/auth-sdk.

## Additional Notes

This library offers a high-level abstraction over the complexities of CXone authentication.
The provided functionalities might vary depending on the specific version of the @nice-devone/auth-sdk.

* Link to Developer Portal: For detailed information on CXone authentication, including best practices and security considerations, refer to the NICE CXone developer portal page on Authentication: [Link to Developer Portal Page on Authentication](https://developer.niceincontact.com/)

We hope this overview aids you in integrating user authentication into your CXone applications using the @nice-devone/auth-sdk library. For further assistance, refer to the official documentation or reach out to NICE CXone support channels.

## Keywords

none