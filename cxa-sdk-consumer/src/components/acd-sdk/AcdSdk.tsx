import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ccfAccessTokenFlowStyles,
  ccfGaAccessTokenFlowStyles,
} from "../side-navbar/NavBar";
import { CXoneAcdClient } from "@nice-devone/acd-sdk";
import { AgentSessionStatus, EndSessionRequest } from "@nice-devone/common-sdk";
import { CXoneVoiceClient } from "@nice-devone/voice-sdk";
import { CXoneClient } from "@nice-devone/agent-sdk";
import { StorageKeys } from "@nice-devone/core-sdk";

const AcdSdk = () => {
  const theme = useTheme();
  const [skillDetails, setSkillDetails] = useState({} as any);
  const [agentStatus, setAgentStatus] = useState({} as any);
  const [dialNumber, setDialNumber] = useState("");

  const gaAccessTokenFlowStyles = ccfGaAccessTokenFlowStyles(theme);
  const accessTokenFlowStyles = ccfAccessTokenFlowStyles(theme);

  const endSessionRequest: EndSessionRequest = {
    forceLogoff: false,
    endContacts: true,
    ignorePersonalQueue: true,
  };
  useEffect(() => {
     const getLastLoggedInAgentId = localStorage.getItem(
              StorageKeys.LAST_LOGGED_IN_AGENT_ID
            );
    const agentId = getLastLoggedInAgentId?.toString();
    CXoneAcdClient.instance.initAcdEngagement();
    CXoneAcdClient.instance.session
      .joinSession()
      .then((response: any) => {
        console.log("Joined Session successfully");
      })
      .catch(() => {
        //START
        console.log("Join unsuccessfully");
      });
    CXoneAcdClient.instance.session.agentStateService.agentStateSubject.subscribe(
      (agentState: any) => {
        setAgentStatus(agentState);
      }
    );
    CXoneAcdClient.instance.getAgentSkills(agentId).then((data: any) => {
      setSkillDetails(data[0]);
    });
    CXoneAcdClient.instance.contactManager.voiceContactUpdateEvent.subscribe(
      (data: any) => {
        console.log("voicedata", data);
      }
    );

    CXoneAcdClient.instance.session.agentLegEvent.subscribe((data: any) => {
      if (data.status === "Dialing") {
        CXoneVoiceClient.instance.triggerAutoAccept(data.agentLegId);
      }
    });

    CXoneClient.instance.skillActivityQueue.agentQueueSubject.subscribe(
      (queues: any) => {
        console.log("queues", queues);
      }
    );
    CXoneClient.instance.skillActivityQueue.agentQueuesDetailSubject.subscribe(
      (queues: any) => {
        console.log("queues details", queues);
      }
    );
  }, []);

  /**
   * dial OB call
   * @example
   * ```
   * DialCallButtonClick()
   * ```
   */
  const dialCallButtonClick = () => {
    const contactDetails = {
      skillId:
        skillDetails?.skillId /*Before using skillID agent Application must be linked with acd  */,
      phoneNumber: dialNumber,
    };
    CXoneAcdClient.instance.contactManager.voiceService.dialPhone(
      contactDetails
    );
    console.log("Dialled Given number and dial phone api successfully called");
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
                      console.log("Session ended successfully");
                    })
                    .catch((err: any) => {
                      console.log(err.message ?? "An error occured");
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
  );
};
export default AcdSdk;
