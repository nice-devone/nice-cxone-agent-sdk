import React, { useEffect } from "react";

import { Button, Stack } from "@mui/material";
import { useState } from "react";
import {  CXoneVoiceContact } from "@nice-devone/acd-sdk";
import { CXoneClient, VoiceControlService} from "@nice-devone/agent-sdk"
import { CXoneSdkError } from "@nice-devone/common-sdk";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CallEndIcon from "@mui/icons-material/CallEnd";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StopIcon from "@mui/icons-material/Stop";


const VoiceControls = ({voiceContact}:{voiceContact:CXoneVoiceContact}) => {
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
    <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
      <Button
        variant={holdeResume === 'Hold' ? "outlined" : "contained"}
        color="warning"
        startIcon={holdeResume === 'Hold' ? <PauseIcon /> : <PlayArrowIcon />}
        onClick={(e)=>handleHold(e)}
      >
        {holdeResume}
      </Button>
      <Button
        variant="contained"
        color="error"
        startIcon={<CallEndIcon />}
        disabled={!hangUpButtonIsEnabled}
        onClick={(e)=>handleHangUp(e)}
      >
        Hang Up
      </Button>
      <Button
        onClick={startRecord}
        variant="contained"
        color="secondary"
        disabled={isRecordButtonVisible}
        startIcon={<FiberManualRecordIcon />}
      >
        Start Record
      </Button>
      <Button
        onClick={stopRecord}
        variant="outlined"
        color="secondary"
        disabled={!isRecordButtonVisible}
        startIcon={<StopIcon />}
      >
        Stop Record
      </Button>
    </Stack>
  );
};
export default VoiceControls;
