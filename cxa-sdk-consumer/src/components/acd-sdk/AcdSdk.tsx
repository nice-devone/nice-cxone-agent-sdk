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
  CardHeader,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ccfAccessTokenFlowStyles,
  ccfGaAccessTokenFlowStyles,
} from "../side-navbar/NavBar";
import { CXoneAcdClient, CXoneVoiceContact } from "@nice-devone/acd-sdk";
import { AgentSessionStatus,    EndSessionRequest } from "@nice-devone/common-sdk";
import { CXoneVoiceClient } from "@nice-devone/voice-sdk";
import { CXoneClient } from "@nice-devone/agent-sdk";
import {  StorageKeys } from "@nice-devone/core-sdk";
import { CXoneDigitalClient } from "@nice-devone/digital-sdk";
import {  CXoneUser } from '@nice-devone/auth-sdk';
import { FeatureToggleService } from '@nice-devone/agent-sdk';
import { CommitmentEvent } from '@nice-devone/common-sdk';
import VoiceControls from "./voice-controls/VoiceControls";
import { CXoneVoiceClientWrapper } from "./services/cxone-voice-client-wrapper";
import Outbound from "./outbound/Outbound";

// import '../../../public/ac_webrtc.min.js';
const AcdSdk = () => {
  const theme = useTheme();
  const [agentStatus, setAgentStatus] = useState({} as any);
  const [startSessionButton, setStartSessionButton] = useState(false);
  const [endSessionButton, setEndSessionButton] = useState(true);
  const [agentLegButton, setAgentLegButton] = useState(true);
  const [voiceContact,setVoiceContact]=useState({} as any);
  const [voiceContactStatus,setVoiceContactStatus]=useState("");
  const gaAccessTokenFlowStyles = ccfGaAccessTokenFlowStyles(theme);
  const accessTokenFlowStyles = ccfAccessTokenFlowStyles(theme);

  const endSessionRequest: EndSessionRequest = {
    forceLogoff: false,
    endContacts: true,
    ignorePersonalQueue: true,
  };


   const getAllFeatureTogglesAsync = async(): Promise<string[]> => {
    return await FeatureToggleService.instance.loadFeatures()
  }
  useEffect(()=>{
    getAllFeatureTogglesAsync()
  },[])
  
  useEffect(() => {
    
    
     CXoneDigitalClient.instance.initDigitalEngagement();
     CXoneAcdClient.instance.initAcdEngagement();
     const getLastLoggedInAgentId = localStorage.getItem(
              StorageKeys.LAST_LOGGED_IN_AGENT_ID
            );

    const agentId = getLastLoggedInAgentId?.toString();
      
    if(agentId){
      
      CXoneAcdClient.instance.session.agentStateService.agentStateSubject.subscribe(
        (agentState: any) => {
          setAgentStatus(agentState);
        }
      );
      
      CXoneAcdClient.instance.contactManager.voiceContactUpdateEvent.subscribe(
        (data: any) => {
          setVoiceContactStatus(data.status);
          setVoiceContact(data);
          console.log("voice contact", data);

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

      CXoneAcdClient.instance.session.onAgentSessionChange.subscribe(
        async(agentSessionChange) => {
          switch (agentSessionChange.status) {
          case AgentSessionStatus.JOIN_SESSION_SUCCESS:
          case AgentSessionStatus.SESSION_START: {
           console.log("Session started successfully.....");
           initWebRTC()
            break;
          }
          case AgentSessionStatus.SESSION_END: {
            console.log("Session ended successfully.....");
            break;
          }
          case AgentSessionStatus.JOIN_SESSION_FAILURE:
           console.log("Session join failed.....");
          break;
          }
        }
      );

      CXoneAcdClient.instance.contactManager.voiceContactUpdateEvent.subscribe(
        (cxoneContact: CXoneVoiceContact) => {
          setVoiceContactStatus(cxoneContact.status);
            setVoiceContact(cxoneContact);
          
          
        })
      
       
    }else{
      console.log("Agent Id not found",agentId); 
    }

    
  }, []);

 

  

  const initWebRTC = async() => {
    const agentSettingService =  await CXoneUser.instance.getAgentSettings()

    const cxoneVoiceConnectionOptions = {
    
      agentSettings: agentSettingService,
      webRTCType: agentSettingService.webRTCType,
      webRTCWssUrls: agentSettingService.webRTCWssUrls,
      webRTCServerDomain: agentSettingService.webRTCServerDomain,
      webRTCDnis: agentSettingService.webRTCDnis,
      webRTCIceUrls: agentSettingService.webRTCWssUrls,
    }
   	
    try{
      CXoneVoiceClient.instance.connectServer(localStorage.getItem(
        StorageKeys.LAST_LOGGED_IN_AGENT_ID
      )?.toString() || "",cxoneVoiceConnectionOptions,new Audio("<audio ref={audio_tag} id=\"audio\" controls autoPlay/>"),"CCS NiceCXone CTI Toolbar")
      console.log("Connected to WebRTC")
    }catch(e){
      console.log(e)
    }
  
      }


  const startSessiononCall=()=>{
    CXoneAcdClient.instance.session
    .startSession({
      "stationId": "",
      "stationPhoneNumber": "WebRTC"
  })
    .then((response: any) => {
      console.log("Session start successfully");
      setStartSessionButton(true);
      setAgentLegButton(false);
      setEndSessionButton(false);
    
    })
    .catch((err: any) => {
      console.log(err.message ?? "An error occured");
    });
  }

  const manualStartSession=()=>{
   
    CXoneAcdClient.instance.session
      .joinSession()
      .then((response: any) => {
        console.log("Joined Session successfully");
        setStartSessionButton(true);
        setAgentLegButton(false);
        setEndSessionButton(false);

      })
      .catch(() => {
       startSessiononCall();
      });
   
    CXoneAcdClient.instance.session.onAgentSessionChange.next({
      status: AgentSessionStatus.SESSION_END,
    });
  }

  const endSessionButtonClick = () => {
    CXoneAcdClient.instance.session
    .endSession(endSessionRequest)
    .then((response: any) => {
      console.log("Session ended successfully");
      setEndSessionButton(true);
      setStartSessionButton(false);
      setAgentLegButton(true);
    })
    .catch((err: any) => {
      console.log(err.message ?? "An error occured");
    });
    CXoneAcdClient.instance.session.onAgentSessionChange.next({
      status: AgentSessionStatus.SESSION_END,
    });
  }

  const onAgentLegClick=async()=>{
    try {
      await CXoneAcdClient.instance.agentLegService.dialAgentLeg()
     
    } catch (error) {
      console.log("agent leg error",error);
    }
  }

  return (
    <Box>
      <Card sx={{ display: "flex", justifyContent: "end" }}>
        <CardContent>
          <form className="root">
            <Box sx={accessTokenFlowStyles.inputs_alignment}>
            <Button
                onClick={() => manualStartSession()}
                color="primary"
                variant="contained"
                size="large"
                sx={accessTokenFlowStyles.margin}
                disabled={startSessionButton}
              >
                Start Session
              </Button>
              <Button
                onClick={() =>endSessionButtonClick()}
                color="primary"
                variant="contained"
                size="large"
                sx={accessTokenFlowStyles.margin}
                disabled={endSessionButton}
              >
                End Session
              </Button>
              <Button
                onClick={() =>onAgentLegClick()}
                color="primary"
                variant="contained"
                size="large"
                sx={accessTokenFlowStyles.margin}
                disabled={agentLegButton}
              >
                Agent Leg
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
                  {console.log("get-Next-Event", agentStatus?.currentState?.cxoneState)}
                </CardContent>

                <CardHeader title="Dial Phone"></CardHeader>
                <CardContent>
                  <form className="root">
                   <Outbound/>
                    {(agentStatus?.currentState?.cxoneState == "OutboundContact" ||agentStatus?.currentState?.cxoneState == "InboundContact") && (
                      <VoiceControls voiceContact={voiceContact}/>
                    )}
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