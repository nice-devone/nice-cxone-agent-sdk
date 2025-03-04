# CXone Agent SDK Consumer App

## Software Prerequisites

- [VS Code](https://code.visualstudio.com/download)
- [Node v22.x.x](https://nodejs.org/en/download/package-manager)
- [Git](https://git-scm.com/downloads)
- [nvm (optional)](https://github.com/nvm-sh/nvm?tab=readme-ov-file)
- [CXone Agent client Id generation](https://developer.niceincontact.com/Documentation/GettingStarted)

## Steps to Set Up Sample Consumer App Locally

1. Pull Sample consumer app locally using:
    ```sh
    git clone https://github.com/nice-devone/nice-cxone-agent-sdk.git
    ```
2. Open the `cxa-sdk-consumer` folder in VS Code.
3. Run `npm i` to download dependent npm packages.
4. In the `Auth.tsx` file, set the `defaultValue` of the Client ID field in the `TextField` component.
5. In the `AuthCallback.tsx` file, set the `defaultValue` of the Client ID field in the `TextField` component.
6. Start an agent session from the CXone Agent application so that the Sample consumer app can join the existing session.
7. Run `npm start` in the terminal to start the sample application.
8. The application should be served in the browser at [http://localhost:3000/](http://localhost:3000/).
9. To avoid any CORS errors during local sample app setup, use a web security disabled browser (e.g., Go to Run and execute `cmd` -> `chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security` to start Chrome browser).
10. Enter the generated clientId (from the prerequisite step) in the Client Id field on the UI.
11. Perform authentication. On successful authentication:
     - `get-next-event` polling should get started to emit ACD events.
     - Digital WebSocket connection should get established to receive digital cases.