import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  ccfAccessTokenFlowStyles,
  ccfGaAccessTokenFlowStyles,
} from "../side-navbar/NavBar";
import { CXoneAcdClient } from "@nice-devone/acd-sdk";
import { AgentSessionStatus, AuthToken, EndSessionRequest } from "@nice-devone/common-sdk";
import { AuthSettings, AuthStatus, AuthWithCodeReq, AuthWithTokenReq, CXoneAuth } from "@nice-devone/auth-sdk";

interface AuthProps {
  setSessionEndMessage: (e: any) => void;
  hostName: any;
  clientId: any;
  redirectUri: any;
  authMode: any;
  updateAuthMode: any;
  codeChallenge: any;
  updateCodeChallenge: any;
  authenticateClickHandler: () => void;
  authState: any;
  authToken: any;
  accessToken: any;
  handleButtonClick: () => void;
}

const Auth = () => {
  const theme = useTheme();
  const gaAccessTokenFlowStyles = ccfGaAccessTokenFlowStyles(theme);
  const accessTokenFlowStyles = ccfAccessTokenFlowStyles(theme);

  const endSessionRequest: EndSessionRequest = {
    forceLogoff: false,
    endContacts: true,
    ignorePersonalQueue: true,
  };
  const hostName: React.RefObject<HTMLInputElement> = useRef(null);
  const clientId: React.RefObject<HTMLInputElement> = useRef(null);
  const redirectUri: React.RefObject<HTMLInputElement> = useRef(null);
  const accessToken: React.RefObject<HTMLInputElement> = useRef(null);
  const [authMode, updateAuthMode] = useState("page");
  const [codeChallenge, updateCodeChallenge] = useState("S256");
  const [sessionEndMessage, setSessionEndMessage] = useState("");

  const cxoneAuth = CXoneAuth.instance;
  const [authState, setAuth] = useState("");
  const [authToken, setAuthToken] = useState("");




  //Auth callback will be captured here
  useEffect(() => {
    subscribeToAuth();
    cxoneAuth.restoreData();
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code") || "";
    if (!code) return;
    const display = localStorage.getItem("display_mode") || "";
    if (display) {
      if (display === "popup") {
        const message = { messageType: "Authenticated", code: code };
        window.opener?.postMessage({ message }, "*");
      } else {
        const authSetting = JSON.parse(
          localStorage.getItem("auth_consumer") || ""
        );
        cxoneAuth.init(authSetting);
        getAccessToken(code);
      }
    }
  }, []);

  const initAuth = function () {
    if (
      !hostName?.current?.value ||
      !clientId?.current?.value ||
      !redirectUri?.current?.value ||
      !authMode ||
      !codeChallenge
    )
      return;

    const authSetting: AuthSettings = {
      cxoneHostname: hostName?.current.value,
      clientId: clientId.current.value,
      redirectUri: redirectUri.current.value,
    };
    localStorage.setItem("auth_consumer", JSON.stringify(authSetting));
    cxoneAuth.init(authSetting);
  };



  const authenticateClickHandler = () => {
    initAuth();
    localStorage.setItem("display_mode", authMode);
    cxoneAuth
      .getAuthorizeUrl(authMode, codeChallenge)
      .then((authUrl: string) => {
        console.log(authMode,codeChallenge,authUrl)
        if (authMode === "page") {
          window.location.href = authUrl;
        } else if (authMode === "popup") {
          const popupOptions =
            "width=500,height=500,scrollbars=yes,toolbar=no,left=50,top=50";
          const popupWindow = window.open(authUrl, "authWindow", popupOptions);

          window.addEventListener(
            "message",
            (event) => {
              const message = event.data.message;
              if (message && message["messageType"] === "Authenticated") {
                getAccessToken(message.code);
                popupWindow?.close();
              }
            },
            false
          );
        }
      });
  };

  function getAccessToken(code: string) {
    const authObject: AuthWithCodeReq = {
      clientId: clientId?.current?.value || "",
      code: code,
    };
    cxoneAuth.getAccessTokenByCode(authObject);
  }

  function subscribeToAuth() {
    cxoneAuth.onAuthStatusChange.subscribe((data) => {
      switch (data.status) {
        case AuthStatus.AUTHENTICATING:
          setAuth("AUTHENTICATING");
          break;
        case AuthStatus.AUTHENTICATED:
          setAuth("AUTHENTICATED");
          setAuthToken((data.response as AuthToken).accessToken);
          break;
        case AuthStatus.NOT_AUTHENTICATED:
          setAuth("NOT_AUTHENTICATED");
          break;
        case AuthStatus.AUTHENTICATION_FAILED:
          setAuth("AUTHENTICATION_FAILED");
          break;
        default:
          break;
      }
    });
  }

  /**
   * Use to handle the button click to test the new acces token flow
   * @example -
   */
  const handleButtonClick = () => {
    if (!accessToken?.current?.value || !hostName?.current?.value) return;
    const authByToken: AuthWithTokenReq = {
      accessToken: accessToken?.current?.value,
    };
    cxoneAuth.getAccessTokenByToken(authByToken);
  };






  return (
    <Box>
      <Card sx={{ display: "flex", justifyContent: "end" }}>
        
        <CardContent>
          <form className="root">
            <Box sx={accessTokenFlowStyles.inputs_alignment}>
              <Button
                onClick={() => {
                  CXoneAcdClient.instance.session
                    .endSession(endSessionRequest)
                    .then((response: any) => {
                      setSessionEndMessage("Session ended successfully");
                    })
                    .catch((err: any) => {
                      setSessionEndMessage(err.message ?? "An error occured");
                    });
                  CXoneAcdClient.instance.session.onAgentSessionChange.next({
                    status: AgentSessionStatus.SESSION_END,
                  });
                }}
                color="primary"
                variant="contained"
                size="large"
                sx={accessTokenFlowStyles.margin}
              >
                End Session
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title={`GA Access Token Flow`} />
        <CardContent>
          <form className="root" noValidate autoComplete="off">
            <Box sx={accessTokenFlowStyles.inputs_alignment}>
              <TextField
                id="outlined-basic"
                label="Host Name"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                inputRef={hostName}
                defaultValue={"https://cxone.staging.niceincontact.com"}
                required
              />
              <TextField
                id="outlined-basic"
                label="Client Id"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                inputRef={clientId}
                defaultValue="Salesforce Agent Console@inContact Inc."
                required
              />
              <TextField
                id="outlined-basic"
                label="Redirect Uri"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                inputRef={redirectUri}
                defaultValue="http://localhost:3000/"
                required
              />
              <FormControl
                variant="outlined"
                sx={[
                  gaAccessTokenFlowStyles.width,
                  accessTokenFlowStyles.mar_0,
                ]}
              >
                <InputLabel>Authentication mode</InputLabel>
                <Select
                  variant="outlined"
                  label={"Authentication mode"}
                  value={authMode}
                  onChange={(event) =>
                    updateAuthMode(event.target.value as string)
                  }
                >
                  <MenuItem value={"page"}>Page</MenuItem>
                  <MenuItem value={"popup"}>Popup</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                variant="outlined"
                sx={[
                  gaAccessTokenFlowStyles.width,
                  accessTokenFlowStyles.mar_0,
                ]}
              >
                <InputLabel>Code challenge methods</InputLabel>
                <Select
                  variant="outlined"
                  label={"Code challenge methods"}
                  value={codeChallenge}
                  onChange={(event) =>
                    updateCodeChallenge(event.target.value as string)
                  }
                >
                  <MenuItem value={"S256"}>S256</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              onClick={() => authenticateClickHandler()}
              color="primary"
              variant="contained"
              size="large"
              sx={gaAccessTokenFlowStyles.width}
            >
              Authenticate
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title={`Auth Result`} />
        <CardContent>Auth Status: {authState}</CardContent>
        <CardContent sx={accessTokenFlowStyles.text_alignment}>
          <InputLabel>Auth Token:</InputLabel>
          {authToken}
        </CardContent>
      </Card>
      <Card>
        <CardHeader title={`Access Token Flow`} />
        <CardContent>
          <form className="root" noValidate autoComplete="off">
            <Box sx={accessTokenFlowStyles.inputs_alignment}>
              <TextField
                id="outlined-basic"
                label="AuthToken"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                inputRef={hostName}
                defaultValue={"https://cxone.staging.niceincontact.com"}
                required
              />
              <TextField
                id="outlined-basic"
                label="AccessToken"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                inputRef={accessToken}
                required
              />
            </Box>
            <Button
              onClick={handleButtonClick}
              color="primary"
              variant="contained"
              size="large"
              sx={accessTokenFlowStyles.margin}
            >
              Test Flow
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
export default Auth;
