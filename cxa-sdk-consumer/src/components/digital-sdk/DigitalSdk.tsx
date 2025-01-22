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
  const [digitalMessages, setDigitalMessages] = React.useState<any>({});
  const [inputValue, setInputValue] = useState("");
  
  let digitalContactInstance: CXoneDigitalContact;
  const [digitalContact, setDigitalContact] = useState({} as any);

    useEffect(() => {
        CXoneDigitalClient.instance.initDigitalEngagement();
                CXoneDigitalClient.instance.digitalContactManager.onDigitalContactNewMessageEvent?.subscribe(
                  (eventData) => {
                    console.log("eventData", eventData);
                  }
                );
                CXoneDigitalClient.instance.digitalContactManager.onDigitalContactEvent?.subscribe(
                  (digitalContact: any) => {
                    console.log("digitalContact", digitalContact);
                    setDigitalContact(digitalContact);
                  }
                );
    },[])

  useEffect(()=>{

      setDigitalMessages(digitalContact)
    
  },[digitalContact.messages])

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
        .then(() => {
          console.log("Reply Sent Successfully!");
          setDigitalContact((digitalContactDetails: any) => {
            return {
              ...digitalContactDetails,
              digitalContact,
            };
          });
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
              <InputLabel>caseId:</InputLabel> {digitalMessages?.caseId}
            </CardContent>
            <CardContent sx={gaAccessTokenFlowStyles.msg_box}>
              Messages :
               <div style={{ display: "flex", flexDirection: "column" }}>
                {(digitalMessages.messages||[]).map((item: any) => {
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
