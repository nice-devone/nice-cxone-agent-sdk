import React, { useEffect } from "react";
import { ccfAccessTokenFlowStyles } from "../../side-navbar/NavBar";
import { useTheme } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import {  CXoneVoiceContact } from "@nice-devone/acd-sdk";
import { CXoneClient, VoiceControlService} from "@nice-devone/agent-sdk"
import { CXoneSdkError } from "@nice-devone/common-sdk";


const VoiceControls = ({voiceContact}:{voiceContact:CXoneVoiceContact}) => {
  const theme = useTheme();
  const accessTokenFlowStyles = ccfAccessTokenFlowStyles(theme);
  const [holdeResume, setHoldeResume] = useState('Hold');;
  const [hangUpButtonIsEnabled, setHangUpButtonIsEnabled] = useState(true);
  const [isRecordButtonVisible, setIsRecordButtonVisible] = useState(false);

  

  useEffect(() => {
     CXoneClient.instance.notification
       .startWemWebSocket({
         locale: Intl.DateTimeFormat().resolvedOptions().locale || "",
         timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
       })
       .catch((err: CXoneSdkError) => {
         console.log("fetchAllNotifications", JSON.stringify(err));
         return [];
       });
     CXoneClient.instance.notification.onCXoneNotificationEvent.subscribe(
       (res) => {
         console.log("Notification received in Outbound component", res);
         setIsRecordButtonVisible((res as any)?.isRecording)
       },
     );
    if(holdeResume==='Hold'){
      setHangUpButtonIsEnabled(true)
    }else{
      setHangUpButtonIsEnabled(false)
    }
  },[holdeResume, hangUpButtonIsEnabled])


 

    const handleHold = async(e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      if(voiceContact.status==='Active'){
       await voiceContact.hold()
        setHoldeResume('Resume')
      }
        if(voiceContact.status==='Holding'){
          await voiceContact.resume()
          setHoldeResume('Hold')
          
        }
      
    }

    const handleHangUp = async(e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      await voiceContact.end()

    }

        const startRecord=(e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
            
        const voiceControlService = new VoiceControlService();
        voiceControlService.recordCall(voiceContact.contactID).then((res)=>{ console.log(res)   }).catch((err)=>{ console.log(err) })
      }
     const stopRecord=(e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
       const voiceControlService = new VoiceControlService();
        voiceControlService.stopCallRecording(voiceContact.contactID).then((res)=>{ console.log(res)   }).catch((err)=>{ console.log(err) })
      }

  return (
    <div>
      <Box sx={accessTokenFlowStyles.inputs_alignment}>
      
        <Button
          color="primary"
          variant="contained"
          size="large"
          sx={accessTokenFlowStyles.margin}
          onClick={(e)=>handleHold(e)}
        >
          {holdeResume}
        </Button>
        <Button
          color="primary"
          variant="contained"
          size="large"
          sx={accessTokenFlowStyles.margin}
          disabled={!hangUpButtonIsEnabled}
          onClick={(e)=>handleHangUp(e)}
        >
          Hang Up
        </Button>
         <Button
        onClick={startRecord}
        color="secondary"
         disabled={isRecordButtonVisible}
        variant="contained"
        size="large"
        sx={accessTokenFlowStyles.margin}
      >
        Start Record
      </Button>
        <Button
        onClick={stopRecord}
        color="secondary"
        disabled={!isRecordButtonVisible}
        variant="contained"
        size="large"
        sx={accessTokenFlowStyles.margin}
      >
        Stop Record
      </Button>
      </Box>
    </div>
  );
};
export default VoiceControls;
