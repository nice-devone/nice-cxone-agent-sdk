import { Box, Button, Card, CardContent, CardHeader, TextField, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { ccfAccessTokenFlowStyles, ccfGaAccessTokenFlowStyles } from '../side-navbar/NavBar';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import { AgentSessionStatus, EndSessionRequest } from '@nice-devone/common-sdk';



const AcdSdk = ({ agentStatus,dialCallButtonClick,setSessionEndMessage,dialNumber,setDialNumber }: { agentStatus: any, dialCallButtonClick: () => void,setSessionEndMessage:(e:any)=>void, dialNumber:string,setDialNumber:any}) => {
      const theme = useTheme();
      const gaAccessTokenFlowStyles = ccfGaAccessTokenFlowStyles(theme);
      const accessTokenFlowStyles = ccfAccessTokenFlowStyles(theme);
 
        const endSessionRequest: EndSessionRequest = {
          forceLogoff: false,
          endContacts: true,
          ignorePersonalQueue: true,
        };

    return(
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
        <CardHeader title={`ACD sdk`} />

        <CardContent>
          <form className="root">
            <Box sx={accessTokenFlowStyles.inputs_alignment}>
              <Card
                sx={[
                  gaAccessTokenFlowStyles.msg_box,
                  gaAccessTokenFlowStyles.text_center,
                ]}
              >
                <CardContent sx={gaAccessTokenFlowStyles.font_size}>
                  AgentState : {agentStatus && agentStatus?.currentState?.state}
                </CardContent>
                <CardContent sx={gaAccessTokenFlowStyles.font_size}>
                  {agentStatus?.currentState?.state === "available"
                    ? ""
                    : "Reason :"}{" "}
                  {agentStatus && agentStatus?.currentState?.reason}
                  {console.log("get-Next-Event", JSON.stringify(agentStatus))}
                </CardContent>

                <CardHeader title="Dial Phone"></CardHeader>
                <CardContent>
                  <form className="root">
                    <Box sx={accessTokenFlowStyles.inputs_alignment}>
                      <TextField
                        id="outlined-basic"
                        label="callAgent"
                        value={dialNumber}
                        onChange={(e: any) => setDialNumber(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                      <Button
                        onClick={() => {
                          dialCallButtonClick();
                        }}
                        color="primary"
                        variant="contained"
                        size="large"
                        sx={accessTokenFlowStyles.margin}
                      >
                        Dial Number
                      </Button>
                    </Box>
                  </form>
                </CardContent>
              </Card>
            </Box>
          </form>
        </CardContent>
      </Card>
          </Box>
    )
}
export default AcdSdk;