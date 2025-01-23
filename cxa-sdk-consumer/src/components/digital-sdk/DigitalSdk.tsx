/**
 * DigitalSdk component initializes the CXoneDigitalClient and manages digital contact messages.
 * It allows users to view and reply to digital messages.
 *
 * @component
 * @example
 * return (
 *   <DigitalSdk />
 * )
 *
 * @returns {JSX.Element} The rendered DigitalSdk component.
 *
 * @remarks
 * This component uses the CXoneDigitalClient to initialize digital engagement and subscribe to digital contact events.
 * It maintains the state of digital messages and handles user input for replying to messages.
 *
 */

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  InputLabel,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CXoneDigitalClient,
  CXoneDigitalContact,
} from "@nice-devone/digital-sdk";
import { CXoneDigitalReplyRequest } from "@nice-devone/common-sdk";
import {
  ccfAccessTokenFlowStyles,
  ccfGaAccessTokenFlowStyles,
} from "../side-navbar/NavBar";
import { uuid } from "uuidv4";


const DigitalSdk = () => {
  const theme = useTheme();
  const gaAccessTokenFlowStyles = ccfGaAccessTokenFlowStyles(theme);
  const accessTokenFlowStyles = ccfAccessTokenFlowStyles(theme);
  const [inputValue, setInputValue] = useState("");
  
  let digitalContactInstance: CXoneDigitalContact;
  const [digitalContact, setDigitalContact] = useState({} as any);
  const [messages, setMessages] = useState([] as any);
  useEffect(() => {
    setMessages(digitalContact.messages);
  }, [digitalContact]);

    useEffect(() => {
        CXoneDigitalClient.instance.initDigitalEngagement();
                CXoneDigitalClient.instance.digitalContactManager.onDigitalContactNewMessageEvent?.subscribe(
                  (eventData) => {
                    console.log("eventData", eventData);
                  }
                );
                let excuteOne = 0 
                CXoneDigitalClient.instance.digitalContactManager.onDigitalContactEvent?.subscribe(
                  (digitalConct: any) => {
                    
                   if(excuteOne == 0){
                    excuteOne=excuteOne+1;
                    setDigitalContact(digitalConct);
                   }
                  }
                );
    },[])

  

   const replyObject: CXoneDigitalReplyRequest = {
   
      thread: {
        idOnExternalPlatform: digitalContact?.case?.threadId,
      },
      messageContent: {
        type: "TEXT",
        payload: {
          text: inputValue,
        },
      },
      recipients: [
        {
          idOnExternalPlatform: digitalContact?.channel?.idOnExternalPlatform,
          name: digitalContact?.channel?.name,
          isPrimary: true,
          isPrivate: digitalContact?.channel?.isPrivate,
        },
      ],
    };

    const sendReply = (e: { preventDefault: () => void }) => {
      e.preventDefault();
      digitalContactInstance = new CXoneDigitalContact();
      digitalContactInstance
        .reply(replyObject, digitalContact?.channel?.id, uuid())
        .then((res) => {
          const updatedMessages = [
            ...messages, // Copy the existing messages
            {
              ...replyObject,
              direction: "outbound",
              messageContent: {
                ...replyObject.messageContent,
                text: inputValue, // Update the text field with inputValue
              },
            },
          ];
        
          console.log("Reply Sent Successfully!", updatedMessages);
        
          // Update the state with the new array
          setMessages(updatedMessages);
        })
        .catch((err) => {
          console.log("Reply Unsuccessful", JSON.stringify(err));
        });
      setInputValue("");
    };

        const handleChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setInputValue(e.target.value);
        };

  return (
    <Card>
      <CardHeader title={`Digital sdk`} />
      <CardContent>
        <form className="root">
          <Box
            sx={[
              accessTokenFlowStyles.inputs_alignment,
              accessTokenFlowStyles.flex_column,
            ]}
          >
            <CardContent sx={accessTokenFlowStyles.case_alignment}>
              <InputLabel>caseId:</InputLabel> {digitalContact?.caseId}
            </CardContent>
            <CardContent sx={gaAccessTokenFlowStyles.msg_box}>
              Messages :
               <div style={{ display: "flex", flexDirection: "column" }}>
                {(messages||[]).map((item: any) => {
                  if (item?.direction == "inbound") {
                    return <div>{item.messageContent.text}</div>;
                  } else {
                    return (
                      <div style={{ alignSelf: "end" }}>
                        {item.messageContent.text}
                      </div>
                    );
                  } 
                })}
              </div> 
              <CardContent
                sx={[
                  gaAccessTokenFlowStyles.card_content,
                  gaAccessTokenFlowStyles.reply_textbox,
                ]}
              >
                <TextField
                  sx={accessTokenFlowStyles.reply_width}
                  id="outlined-basic"
                  value={inputValue}
                  onChange={(e) => handleChange(e)}
                  inputProps={{ shrink: true }}
                />
                <Button
                  onClick={sendReply}
                  color="primary"
                  variant="contained"
                  size="large"
                  disabled={!inputValue}
                  sx={accessTokenFlowStyles.reply_btn}
                >
                  Reply
                </Button>
              </CardContent>
            </CardContent>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};
export default DigitalSdk;
