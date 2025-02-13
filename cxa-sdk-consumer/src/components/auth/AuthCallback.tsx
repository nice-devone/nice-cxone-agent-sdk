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
  import {  AuthToken, EndSessionRequest } from "@nice-devone/common-sdk";
  import { AuthStatus, AuthWithCodeReq, CXoneAuth } from "@nice-devone/auth-sdk";
import { useNavigate } from "react-router-dom";
  
  
  
  const AuthCallBack = () => {
    const theme = useTheme();
    const gaAccessTokenFlowStyles = ccfGaAccessTokenFlowStyles(theme);
    const accessTokenFlowStyles = ccfAccessTokenFlowStyles(theme);
  
  
    const hostName: React.RefObject<HTMLInputElement> = useRef(null);
    const clientId: React.RefObject<HTMLInputElement> = useRef(null);
    const redirectUri: React.RefObject<HTMLInputElement> = useRef(null);

    const [authMode, updateAuthMode] = useState("page");
    const [codeChallenge, updateCodeChallenge] = useState("S256");
  
  
    const cxoneAuth = CXoneAuth.instance;
    const [authState, setAuth] = useState("");
    const [authToken, setAuthToken] = useState("");
    const navigate = useNavigate();
  
  
  
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
  
    
  
  
  
  
  
    function getAccessToken(code: string) {
      const authObject: AuthWithCodeReq = {
        clientId: clientId?.current?.value || "",
        code: code,
      };
      cxoneAuth.getAccessTokenByCode(authObject);
      
    }
  useEffect(() => {
    if(authToken!=="" && authToken!==undefined){
  
      navigate("/");
      
    }
  },[authToken]);
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
        
      </Box>
    );
  };
  export default AuthCallBack;
  