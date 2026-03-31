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
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";


import {  AuthToken } from "@nice-devone/common-sdk";
import { AuthSettings, AuthStatus,  AuthWithCodeReq,  AuthWithTokenReq, CXoneAuth } from "@nice-devone/auth-sdk";
import { LocalStorageHelper } from "@nice-devone/core-sdk";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";



const Auth = () => {
  

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
      originatingServiceIdentifier:'CMASDK'
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


  const getAuthStatusDisplay = () => {
    switch (authState) {
      case "AUTHENTICATED":
        return { icon: <CheckCircleIcon />, color: "success" as const, label: "Authenticated" };
      case "AUTHENTICATING":
        return { icon: <HourglassEmptyIcon />, color: "warning" as const, label: "Authenticating..." };
      case "NOT_AUTHENTICATED":
        return { icon: <ErrorIcon />, color: "default" as const, label: "Not Authenticated" };
      case "AUTHENTICATION_FAILED":
        return { icon: <ErrorIcon />, color: "error" as const, label: "Authentication Failed" };
      default:
        return null;
    }
  };

  const statusDisplay = getAuthStatusDisplay();

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", py: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: "primary.dark" }}>
        Authentication
      </Typography>

      {/* OAuth Code Flow */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
            <LockOpenIcon color="primary" />
            <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
              OAuth Authorization Code Flow
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2.5 }} />
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Host Name"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  inputRef={hostName}
                  defaultValue={"https://cxone.staging.niceincontact.com"}
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Client ID"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  inputRef={clientId}
                  defaultValue="Salesforce Agent Console@inContact Inc."
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Redirect URI"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  inputRef={redirectUri}
                  defaultValue="http://localhost:3000/auth-callback"
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Auth Mode</InputLabel>
                  <Select
                    label="Auth Mode"
                    value={authMode}
                    onChange={(event) => updateAuthMode(event.target.value as string)}
                  >
                    <MenuItem value={"page"}>Page</MenuItem>
                    <MenuItem value={"popup"}>Popup</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Challenge</InputLabel>
                  <Select
                    label="Challenge"
                    value={codeChallenge}
                    onChange={(event) => updateCodeChallenge(event.target.value as string)}
                  >
                    <MenuItem value={"S256"}>S256</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              onClick={() => authenticateClickHandler()}
              variant="contained"
              size="large"
              startIcon={<LockOpenIcon />}
              sx={{ mt: 2.5 }}
            >
              Authenticate
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Auth Result */}
      <Collapse in={!!authState}>
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
                Auth Result
              </Typography>
              {statusDisplay && (
                <Chip
                  icon={statusDisplay.icon}
                  label={statusDisplay.label}
                  color={statusDisplay.color}
                  size="small"
                  variant="outlined"
                />
              )}
            </Stack>
            {authToken && (
              <>
                <Divider sx={{ mb: 2 }} />
                <Alert severity="info" sx={{ wordBreak: "break-all" }}>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>Access Token</Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, fontSize: "0.75rem", fontFamily: "monospace" }}>
                    {authToken}
                  </Typography>
                </Alert>
              </>
            )}
          </CardContent>
        </Card>
      </Collapse>

      {/* Access Token Flow */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
            <VpnKeyIcon color="secondary" />
            <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
              Access Token Flow
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2.5 }} />
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Host Name"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  inputRef={hostName}
                  defaultValue={"https://cxone.staging.niceincontact.com"}
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Access Token"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  inputRef={accessToken}
                  required
                  size="small"
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleButtonClick}
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<VpnKeyIcon />}
              sx={{ mt: 2.5 }}
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
