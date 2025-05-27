/**
 * Auth component handles the authentication flow for the application.
 * It provides UI elements for user input and buttons to initiate authentication
 * and end session actions. It also manages the authentication state and token.
 *
 * @component
 * @example
 * return (
 *   <Auth />
 * )
 */
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

import {  AuthToken } from "@nice-devone/common-sdk";
import { AuthSettings, AuthStatus,  AuthWithCodeReq,  AuthWithTokenReq, CXoneAuth } from "@nice-devone/auth-sdk";
import { LocalStorageHelper } from "@nice-devone/core-sdk";



const Auth = () => {
  const theme = useTheme();
  const gaAccessTokenFlowStyles = ccfGaAccessTokenFlowStyles(theme);
  const accessTokenFlowStyles = ccfAccessTokenFlowStyles(theme);
  

  const hostName: React.RefObject<HTMLInputElement> = useRef(null);
  const clientId: React.RefObject<HTMLInputElement> = useRef(null);
  const redirectUri: React.RefObject<HTMLInputElement> = useRef(null);
  const accessToken: React.RefObject<HTMLInputElement> = useRef(null);
  const [authMode, updateAuthMode] = useState("page");
  const [codeChallenge, updateCodeChallenge] = useState("S256");
 
  const cxoneAuth = CXoneAuth.instance;
  const [authState, setAuth] = useState("");
  const [authToken, setAuthToken] = useState("");


  //Auth callback will be captured here
  useEffect(() => {
    
    
    subscribeToAuth();
    cxoneAuth.restoreData();
  
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
    LocalStorageHelper.setItem("auth_consumer", JSON.stringify(authSetting));
    cxoneAuth.init(authSetting);
  };



  const authenticateClickHandler = () => {
    initAuth();
    LocalStorageHelper.setItem("display_mode", authMode);
    cxoneAuth
      .getAuthorizeUrl(authMode, codeChallenge)
      .then((authUrl: string) => {
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
                const authObject: AuthWithCodeReq = {
                  clientId: clientId?.current?.value || "",
                  code: message.code,
                };
                cxoneAuth.getAccessTokenByCode(authObject);
                
                popupWindow?.close();
              }
            },
            false
          );
        }
       
      });
  };



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
          LocalStorageHelper.clearStorage();
          setAuth("NOT_AUTHENTICATED");
          break;
        case AuthStatus.AUTHENTICATION_FAILED:
          LocalStorageHelper.clearStorage();
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
                defaultValue={"https://cxone.niceincontact.com"}
                required
              />
              <TextField
                id="outlined-basic"
                label="Client Id"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                inputRef={clientId}
                defaultValue=""
                required
              />
              <TextField
                id="outlined-basic"
                label="Redirect Uri"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                inputRef={redirectUri}
                defaultValue="http://localhost:3000/auth-callback"
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
                defaultValue={"https://cxone.niceincontact.com"}
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
