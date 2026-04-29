/**
 * AcdSdk component initializes and manages the ACD (Automatic Call Distribution) SDK.
 * It handles agent session management, skill details retrieval, and dialing outbound calls.
 *
 * @component
 * @example
 * ```tsx
 * <AcdSdk />
 * ```
 *
 * @returns {JSX.Element} The rendered AcdSdk component.
 *
 * @remarks
 * This component uses the @nice-devone/acd-sdk, @nice-devone/voice-sdk, and @nice-devone/agent-sdk
 * to manage agent sessions and interactions.
 *
 * @function
 * @name AcdSdk
 *
 * @description
 * The AcdSdk component initializes the ACD SDK, joins an agent session, subscribes to various
 * agent state and contact events, and provides UI elements for ending the session and dialing
 * outbound calls.
 *
 */
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CXoneAcdClient, CXoneVoiceContact } from "@nice-devone/acd-sdk";
import { AgentSessionStatus, EndSessionRequest } from "@nice-devone/common-sdk";
import { CXoneVoiceClient } from "@nice-devone/voice-sdk";
import { CXoneClient } from "@nice-devone/agent-sdk";
import { LocalStorageHelper, StorageKeys } from "@nice-devone/core-sdk";
import VoiceControls from "./voice-controls/VoiceControls";
import Outbound from "./outbound/Outbound";
import { AgentSettings } from "@nice-devone/core-sdk";
import { UserInfo } from "@nice-devone/common-sdk";
import { useLocation } from "react-router-dom";
import { tryCatchWrapper } from "../../utils/tryCatchWrapper";
import { CcfMessageType } from '@nice-devone/shared-apps-lib';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import CircleIcon from "@mui/icons-material/Circle";


const AcdSdk = () => {
  const [agentStatus, setAgentStatus] = useState({} as any);
  const [startSessionButton, setStartSessionButton] = useState(
     false
  );
  const [endSessionButton, setEndSessionButton] = useState(true);
  const [agentLegButton, setAgentLegButton] = useState(true);
  const [voiceContact, setVoiceContact] = useState({} as CXoneVoiceContact);
  const [initEngagement, setInitEngagement] = useState(false);  
  const location = useLocation();

  const endSessionRequest: EndSessionRequest = {
    forceLogoff: false,
    endContacts: true,
    ignorePersonalQueue: true,
  };

  useEffect(() => {
    CXoneAcdClient.instance.initAcdEngagement().finally(() => {
      setInitEngagement(true);
    })
    CXoneAcdClient.instance.setClickToDialCustomAgentUrl(
        "http://localhost:3000/"
      ); 
      window.addEventListener('message', extensionClickToDialHandler);
   
  },[])

  useEffect(() => {
    if(initEngagement){
      tryCatchWrapper(initMethods, (error) => {
        console.log("error", error);
      });
    }
    
  }, [location.pathname,initEngagement]);

  useEffect(() => { 
    if(initEngagement){
      manualStartSession();
    }
    
  },[initEngagement])


  useEffect(() => {
    
    if (LocalStorageHelper.getItem("startsessionButton") == "true") {
      setStartSessionButton(true);
      setEndSessionButton(false);
      setAgentLegButton(false);
    }
    if (LocalStorageHelper.getItem("startsessionButton") == "false") {
      setStartSessionButton(false);
      setEndSessionButton(true);
      setAgentLegButton(true);
    }
  }, [startSessionButton]);

  /**
   * Handle click-to-dial messages from browser extension
   * @param event - message event from extension
   */
  const extensionClickToDialHandler = (event: MessageEvent) => {
    if (event.data['type'] === CcfMessageType.CtdDialedNumber) {
      const number = event.data['dialedNumber'];
      const contactDetails: any = {
          skillId: '889669', //replace with actual skill id
          phoneNumber: number.toString().replace(/[`~!@$%^&()_|\-=?;:'",.<>{}[\]\s\\]/gi ,''),
      };
      CXoneAcdClient.instance.contactManager.voiceService.dialPhone(contactDetails);
    };
  }

  const initMethods = async () => {
    
  
    const getLastLoggedInAgentId = LocalStorageHelper.getItem(
      StorageKeys.LAST_LOGGED_IN_AGENT_ID
    );

    const agentId = getLastLoggedInAgentId?.toString();

    if (agentId) {
      CXoneAcdClient.instance.session.agentStateService.agentStateSubject.subscribe(
        (agentState: any) => {
          setAgentStatus(agentState);
        }
      );

      CXoneAcdClient.instance.contactManager.voiceContactUpdateEvent.subscribe(
        (data: CXoneVoiceContact) => {
         
          setVoiceContact(data);
          console.log("voice contact", data);
        }
      );

      CXoneAcdClient.instance.session.agentLegEvent.subscribe((data: any) => {
        CXoneVoiceClient.instance.handleAgentLegEvent(data);
        if (data.status === "Dialing") {
          // CXoneVoiceClient.instance.triggerAutoAccept(data.agentLegId);
          CXoneVoiceClient.instance.connectAgentLeg(data.agentLegId);
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

      CXoneAcdClient.instance.session.onAgentSessionChange.subscribe(
        async (agentSessionChange) => {
          switch (agentSessionChange.status) {
            case AgentSessionStatus.JOIN_SESSION_SUCCESS:
            case AgentSessionStatus.SESSION_START: {
              console.log("Session started successfully.....");
              
              initWebRTC();
              break;
            }
            case AgentSessionStatus.SESSION_END: {
              console.log("Session ended successfully.....");
              setStartSessionButton(false);
              break;
            }
            case AgentSessionStatus.JOIN_SESSION_FAILURE:
              console.log("Session join failed.....");
              setStartSessionButton(false);
              break;
          }
        }
      );

      CXoneAcdClient.instance.contactManager.voiceContactUpdateEvent.subscribe(
        (cxoneContact: CXoneVoiceContact) => {
      
          setVoiceContact(cxoneContact);
        }
      );

      connectCopilot();

    } else {
      console.log("Agent Id not found", agentId);
    }
    
  };

  //Method to connect copilot notification websocket
 const connectCopilot = () => {
      const {aahNotificationWssUri} = LocalStorageHelper.getItem("cxone_config", true);
      const userInfo = LocalStorageHelper.getItem("user_info", true) as UserInfo;
      CXoneClient.instance.copilotNotificationClient.connect(aahNotificationWssUri, userInfo.icAgentId);
      CXoneClient.instance.copilotNotificationClient.onMessageNotification.subscribe(
        (msg: any) => {
          console.log("Received message:", msg);
        }
      );
    }

  const getWebRtcServiceUrls = async () => {
    const agentSettings =
      (await CXoneClient.instance.agentSetting.getAgentSettings()) as AgentSettings;
    const getUserInfo =
      (await CXoneClient.instance.cxoneUser.getUserDetails()) as UserInfo;
    if (agentSettings && getUserInfo.icAgentId) {
      return {
        agentId: getUserInfo.icAgentId,
        agentSettings: agentSettings,
        userInfo: getUserInfo,
      };
    }
  };

  const initWebRTC = async () => {
    try {
      const agentSettings = (await getWebRtcServiceUrls()) as {
        agentId: string;
        agentSettings: AgentSettings;
        userInfo: UserInfo;
      };
      
          const app = "Nice CXone SDK Consumer"
          const appName = `${(app || 'cxa').toUpperCase()}: ${agentSettings?.agentSettings.cxaClientVersion}`;
          await CXoneVoiceClient.instance.connectServer(agentSettings?.agentId, agentSettings?.agentSettings, new Audio('<audio ref={audio_tag} id="audio" controls autoPlay/>'), appName);
          console.log("Connected to WebRTC");
    } catch (e) {
      console.log(e);
    }
  };

  const startSessiononCall = () => {
    CXoneAcdClient.instance.session
      .startSession({
        stationId: "",
        stationPhoneNumber: "WebRTC",
      })
      .then((response: any) => {
        console.log("Session start successfully");
        setStartSessionButton(true);
        LocalStorageHelper.setItem("startsessionButton", "true");
        setAgentLegButton(false);
        setEndSessionButton(false);
      })
      .catch((err: any) => {
        setStartSessionButton(false);
        LocalStorageHelper.setItem("startsessionButton", "false");
        setAgentLegButton(true);
        setEndSessionButton(true);
        console.log(err.message ?? "An error occured");
      });
  };

  const manualStartSession = () => {
    CXoneAcdClient.instance.session
      .joinSession()
      .then((response: any) => {
        console.log("Joined Session successfully");
        setStartSessionButton(true);
        LocalStorageHelper.setItem("startsessionButton", "true");
        setAgentLegButton(false);
        setEndSessionButton(false);
      })
      .catch(() => {
        startSessiononCall();
      });

    CXoneAcdClient.instance.session.onAgentSessionChange.next({
      status: AgentSessionStatus.SESSION_END,
    });
  };

  const endSessionButtonClick = () => {
    CXoneAcdClient.instance.session
      .endSession(endSessionRequest)
      .then((response: any) => {
        console.log("Session ended successfully");
        setEndSessionButton(true);
        setStartSessionButton(false);
        LocalStorageHelper.setItem("startsessionButton", "false");
        setAgentLegButton(true);
      })
      .catch((err: any) => {
        console.log(err.message ?? "An error occured");
      });
    CXoneAcdClient.instance.session.onAgentSessionChange.next({
      status: AgentSessionStatus.SESSION_END,
    });
  };

  const onAgentLegClick = async () => {
    try {
      await CXoneAcdClient.instance.agentLegService.dialAgentLeg();
    } catch (error) {
      console.log("agent leg error", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", py: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: "primary.dark" }}>
        ACD SDK
      </Typography>

      {/* Session Controls */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
              Session Controls
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <Button
                onClick={() => manualStartSession()}
                variant="contained"
                color="success"
                startIcon={<PlayArrowIcon />}
                disabled={startSessionButton}
              >
                Start Session
              </Button>
              <Button
                onClick={() => endSessionButtonClick()}
                variant="contained"
                color="error"
                startIcon={<StopIcon />}
                disabled={endSessionButton}
              >
                End Session
              </Button>
              <Button
                onClick={() => onAgentLegClick()}
                variant="outlined"
                startIcon={<HeadsetMicIcon />}
                disabled={agentLegButton}
              >
                Agent Leg
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Agent State & Dial */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
              Agent State & Dial
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2.5 }} />

          <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">Current State</Typography>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                <CircleIcon
                  sx={{
                    fontSize: 12,
                    color: agentStatus?.currentState?.state === "available" ? "success.main" : "warning.main",
                  }}
                />
                <Typography variant="body1" sx={{ fontWeight: 600, textTransform: "capitalize" }}>
                  {agentStatus?.currentState?.state || "Unknown"}
                </Typography>
              </Stack>
            </Box>
            {agentStatus?.currentState?.state !== "available" && agentStatus?.currentState?.reason && (
              <Box>
                <Typography variant="caption" color="text.secondary">Reason</Typography>
                <Typography variant="body1" sx={{ mt: 0.5 }}>
                  {agentStatus?.currentState?.reason}
                </Typography>
              </Box>
            )}
            {agentStatus?.currentState?.cxoneState && (
              <Box>
                <Typography variant="caption" color="text.secondary">CXone State</Typography>
                <Chip
                  label={agentStatus?.currentState?.cxoneState}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ mt: 0.5 }}
                />
              </Box>
            )}
          </Stack>

          <Divider sx={{ mb: 2.5 }} />
          <Typography variant="subtitle2" sx={{ mb: 1.5, color: "text.secondary" }}>
            Outbound Dial
          </Typography>
          {initEngagement && <Outbound />}

          {(agentStatus?.currentState?.cxoneState === "OutboundContact" ||
            agentStatus?.currentState?.cxoneState === "InboundContact") &&
            voiceContact &&
            Object.keys(voiceContact).length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="subtitle2" sx={{ mb: 1.5, color: "text.secondary" }}>
                  Voice Controls
                </Typography>
                <VoiceControls voiceContact={voiceContact} />
              </Box>
            )}
        </CardContent>
      </Card>
    </Box>
  );
};
export default AcdSdk;
