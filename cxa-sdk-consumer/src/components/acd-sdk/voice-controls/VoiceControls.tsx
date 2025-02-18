import React, { useEffect } from "react";
import { ccfAccessTokenFlowStyles } from "../../side-navbar/NavBar";
import { useTheme } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import { useState } from "react";


const VoiceControls = ({voiceContact}:{voiceContact:any}) => {
  const theme = useTheme();
  const accessTokenFlowStyles = ccfAccessTokenFlowStyles(theme);
  const [muteUnmute, setMuteUnmute] = useState('Mute');
  const [holdeResume, setHoldeResume] = useState('Hold');;
  const [hangUpButtonIsEnabled, setHangUpButtonIsEnabled] = useState(true);


  useEffect(() => {
    if(muteUnmute=='Mute' && holdeResume=='Hold'){
      setHangUpButtonIsEnabled(true)
    }else{
      setHangUpButtonIsEnabled(false)
    }
  },[muteUnmute,holdeResume, hangUpButtonIsEnabled])

    const handleMuteUnmute = async(e:any) => {
      e.preventDefault()
      console.log(voiceContact)
      if(voiceContact.callControlButton.mute.controlText=='unmute' ){
        await voiceContact.unmute().then((res:any)=>console.log(res)).catch((err:any)=>console.log(err))
        setMuteUnmute('Mute')
        

      }else{
        await voiceContact.mute()
        setMuteUnmute('UnMute')
        

      }
    }

    const handleHold = async(e:any) => {
      e.preventDefault()
      console.log(voiceContact.status)
      if(voiceContact.status=='Active'){
       await voiceContact.hold()
        setHoldeResume('Resume')
        

      }
        if(voiceContact.status=='Holding'){
          await voiceContact.resume()
          setHoldeResume('Hold')
          
        }
      
    }

    const handleHangUp = async(e:any) => {
      e.preventDefault()
      await voiceContact.end()
    }

  return (
    <div>
      <Box sx={accessTokenFlowStyles.inputs_alignment}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          sx={accessTokenFlowStyles.margin}
          onClick={(e)=>handleMuteUnmute(e)}
        >
          {muteUnmute}
        </Button>
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
      </Box>
    </div>
  );
};
export default VoiceControls;
