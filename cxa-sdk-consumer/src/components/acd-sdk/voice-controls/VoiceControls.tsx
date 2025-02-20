import React, { useEffect } from "react";
import { ccfAccessTokenFlowStyles } from "../../side-navbar/NavBar";
import { useTheme } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { CXoneAcdClient, CXoneVoiceContact } from "@nice-devone/acd-sdk";


const VoiceControls = ({voiceContact}:{voiceContact:CXoneVoiceContact}) => {
  const theme = useTheme();
  const accessTokenFlowStyles = ccfAccessTokenFlowStyles(theme);
  const [holdeResume, setHoldeResume] = useState('Hold');;
  const [hangUpButtonIsEnabled, setHangUpButtonIsEnabled] = useState(true);


  useEffect(() => {
    if(holdeResume=='Hold'){
      setHangUpButtonIsEnabled(true)
    }else{
      setHangUpButtonIsEnabled(false)
    }
  },[holdeResume, hangUpButtonIsEnabled])



 

    const handleHold = async(e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      if(voiceContact.status=='Active'){
       await voiceContact.hold()
        setHoldeResume('Resume')
      }
        if(voiceContact.status=='Holding'){
          await voiceContact.resume()
          setHoldeResume('Hold')
          
        }
      
    }

    const handleHangUp = async(e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      await voiceContact.end()
      var disposition = {
          primaryDispositionId: 1073743862,
          primaryDispositionNotes: ""
      }
      await CXoneAcdClient.instance.contactManager.saveDisposition(voiceContact.contactID,disposition)
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
      </Box>
    </div>
  );
};
export default VoiceControls;
