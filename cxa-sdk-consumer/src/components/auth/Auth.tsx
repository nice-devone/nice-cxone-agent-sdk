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
import React from "react";
import {
  ccfAccessTokenFlowStyles,
  ccfGaAccessTokenFlowStyles,
} from "../side-navbar/NavBar";
import { CXoneAcdClient } from "@nice-devone/acd-sdk";
import { AgentSessionStatus, EndSessionRequest } from "@nice-devone/common-sdk";

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

const Auth = ({
  setSessionEndMessage,
  hostName,
  clientId,
  redirectUri,
  authMode,
  updateAuthMode,
  codeChallenge,
  updateCodeChallenge,
  authenticateClickHandler,
  authState,
  authToken,
  accessToken,
  handleButtonClick,
}: AuthProps) => {
  const theme = useTheme();
  const gaAccessTokenFlowStyles = ccfGaAccessTokenFlowStyles(theme);
  const accessTokenFlowStyles = ccfAccessTokenFlowStyles(theme);

  const endSessionRequest: EndSessionRequest = {
    forceLogoff: false,
    endContacts: true,
    ignorePersonalQueue: true,
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
                defaultValue={"https://cxone.niceincontact.com"}
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
