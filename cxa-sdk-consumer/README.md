# CXone Agent SDK Consumer App

## Software Prerequisites

- [VS Code](https://code.visualstudio.com/download)
- [Node v22.x.x](https://nodejs.org/en/download/package-manager)
- [Git](https://git-scm.com/downloads)
- [nvm (optional)](https://github.com/nvm-sh/nvm?tab=readme-ov-file)
- [CXone Agent client Id generation](https://developer.niceincontact.com/Documentation/GettingStarted)
    - The Redirect URI must be configured.

## Steps to Set Up Sample Consumer App Locally

1. Pull the sample consumer app locally using:
     ```sh
     git clone https://github.com/nice-devone/nice-cxone-agent-sdk.git
     ```
2. Open the `cxa-sdk-consumer` folder in VS Code.
3. Run `npm i` to download dependent npm packages.
4. In the `Auth.tsx` file, set the `defaultValue` of the Client ID field in the `TextField` component.
5. In the `AuthCallback.tsx` file, set the `defaultValue` of the Client ID field in the `TextField` component.
6. Run `npm start` in the terminal to start the sample application.
7. The application should be served in the browser at [http://localhost:3000/](http://localhost:3000/).
8. To avoid any CORS errors during local sample app setup, use a web security disabled browser (e.g., Go to Run and execute `cmd` -> `chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security` to start Chrome browser).
9. Perform authentication. On successful authentication:
      - You should be able to see Auth, Digital, and Acd sections.
      - After visiting the Acd section, you should be able to start a session.
      - `get-next-event` polling should start to emit ACD events.
      - After visiting the Digital section, the assigned card must be visible.
      - The Digital WebSocket connection should be established to receive digital cases.
