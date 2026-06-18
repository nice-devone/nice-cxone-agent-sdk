# CXone Agent SDK Consumer App

## Software Prerequisites

- [VS Code](https://code.visualstudio.com/download)
- [Node v22.x.x](https://nodejs.org/en/download/package-manager)
- [Git](https://git-scm.com/downloads)
- [nvm (optional)](https://github.com/nvm-sh/nvm?tab=readme-ov-file)
- [CXone Agent client Id generation](https://developer.niceincontact.com/Documentation/GettingStarted)
  - The Redirect URI must be configured.

## Steps to Set Up Sample Consumer App Locally

### 1. Clone the Repository

Pull the sample consumer app locally using:

```sh
git clone https://github.com/nice-devone/nice-cxone-agent-sdk.git
```

### 2. Open the Project

Open the `cxa-sdk-consumer` folder in VS Code:

```sh
cd nice-cxone-agent-sdk/cxa-sdk-consumer
code .
```

### 3. Use the Correct Node Version

This project requires **Node.js v22.x.x**. If you use `nvm`:

```sh
nvm install 22
nvm use 22
```

Verify versions:

```sh
node -v
npm -v
```

### 4. Install Dependencies

From inside the `cxa-sdk-consumer` folder, run:

```sh
npm install
```

> If installation fails due to peer dependency conflicts, retry with:
>
> ```sh
> npm install --legacy-peer-deps
> ```

### 5. Configure Authentication Defaults (`authDefaults.ts`)

Authentication values (host, client ID, redirect URI) are centralized in a single file:

[src/components/auth/authDefaults.ts](cxa-sdk-consumer/src/components/auth/authDefaults.ts)

```ts
export const authDefaults = {
  hostName: "https://cxone.niceincontact.com",
  clientId: ".",                                       // <-- replace with your Client ID
  redirectUri: "http://localhost:3000/auth-callback",
};
```

Update the fields as follows:

| Field         | Description                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------- |
| `hostName`    | The CXone environment URL (e.g. `https://cxone.niceincontact.com`).                               |
| `clientId`    | The **Client ID** generated for your CXone Agent application. See the link in Prerequisites.      |
| `redirectUri` | Must exactly match the Redirect URI configured in the CXone Agent client ID setup.                |

These defaults are consumed by both `Auth.tsx` and `AuthCallback.tsx`, so updating this single file is sufficient — no need to edit those components manually.

### 6. Start the Application

```sh
npm start
```

The application will be served at [http://localhost:3000/](http://localhost:3000/).

### 7. Avoid CORS Errors (Local Development)

To avoid CORS errors during local development, launch a web-security-disabled browser instance.

**Windows (Chrome):**

```sh
chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security
```

**macOS (Chrome):**

```sh
open -na "Google Chrome" --args --user-data-dir="/tmp/chrome_dev" --disable-web-security
```

> ⚠️ Only use this browser session for local development. Do **not** browse the public web with web security disabled.

### 8. Authenticate

Perform authentication using your CXone agent credentials. On successful authentication:

- The **Auth**, **Digital**, and **ACD** sections should be visible.
- Visiting the **ACD** section allows you to start a session; `get-next-event` polling will start emitting ACD events.
- Visiting the **Digital** section should display the assigned card and establish the Digital WebSocket connection to receive digital cases.

## Troubleshooting

- **Login fails / redirect loops:** Verify `clientId` and `redirectUri` in [authDefaults.ts](cxa-sdk-consumer/src/components/auth/authDefaults.ts) match the values configured in the CXone Agent client ID setup.
- **CORS errors:** Ensure you launched Chrome with `--disable-web-security` as shown above.
- **Port already in use:** Stop any other process running on port 3000, or start with a different port: `set PORT=3001 && npm start` (Windows) / `PORT=3001 npm start` (macOS/Linux).
