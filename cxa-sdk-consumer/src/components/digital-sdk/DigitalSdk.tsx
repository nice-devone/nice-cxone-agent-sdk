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
import React, { useEffect, useState } from "react";
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
import HorizontalCards from "./horizontal-cards-caseIds/HorizontalCards";



const DigitalSdk = () => {
  const theme = useTheme();
  const gaAccessTokenFlowStyles = ccfGaAccessTokenFlowStyles(theme);
  const accessTokenFlowStyles = ccfAccessTokenFlowStyles(theme);
  const [inputValue, setInputValue] = useState("");
  
  let digitalContactInstance: CXoneDigitalContact;
  const [UpdatedigitalContactCaseId, setUpdatedigitalContactCaseId] = useState({} as any);

  const [digitalContacts, setDigitalContacts] = useState([] as any);
  const [selectedDigitalContact, setSelectedDigitalContact] = useState({} as any);


  const [messages, setMessages] = useState([] as any);


    useEffect(() => {
      digitalSdkwebsoket();
    },[])
  
    useEffect(() => {
      if (Object.keys(UpdatedigitalContactCaseId).length > 0) {
        if(selectedDigitalContact.caseId === UpdatedigitalContactCaseId.caseId){
          setMessages(UpdatedigitalContactCaseId.messages.map((item: any) => ({
            direction: item.direction,
            text: item.messageContent?.text, // Extract only the text from messageContent
          })));
        }
        
      }
    },[UpdatedigitalContactCaseId])
    const digitalSdkwebsoket=()=>{
     try{
      
      CXoneDigitalClient.instance.initDigitalEngagement();
      CXoneDigitalClient.instance.digitalContactManager.onDigitalContactNewMessageEvent?.subscribe(
        (eventData) => {
          console.log("eventData", eventData);
        }
      );
     
      CXoneDigitalClient.instance.digitalContactManager.onDigitalContactEvent?.subscribe(
       async (digitalConct: any) => {
        // Update the existing digital contact if it already exists, otherwise add the new contact
        setDigitalContacts((prevState: any) => {
          if (prevState.some((contact: any) => contact.caseId === digitalConct.caseId)) {
            return prevState.map((contact: any) =>
              contact.caseId === digitalConct.caseId ? digitalConct : contact
            );
            } else {
            return [...prevState, digitalConct];
            }
        })
        console.log(digitalConct)

        // Using uuid to trigger re-render as React does not detect changes in nested objects
        //because of this we can trigger useEffect which shows updared messages
        setUpdatedigitalContactCaseId({...digitalConct,update_id:uuid()});
        }
      );
     
     }catch(e){
      console.log(e)
     }
    }
  
    const onClickCaseId=(contact:any)=>{
      setSelectedDigitalContact(contact);
      
      setMessages(contact.messages.map((item: any) => ({
        direction:item.direction,
        text: item.messageContent?.text, // Extract only the text from messageContent
        caseId:contact.caseId
      })));
    }

   const replyObject: CXoneDigitalReplyRequest = {
    messageContent: {
      type: "TEXT",
      payload: {
        text: inputValue,
      },
    },
   
      thread: {
        idOnExternalPlatform: selectedDigitalContact?.case?.threadIdOnExternalPlatform,
      },
     
      recipients: [],
    };



    const sendReply = (e: { preventDefault: () => void }) => {
      e.preventDefault();
      digitalContactInstance = new CXoneDigitalContact();
      digitalContactInstance
        .reply(replyObject, selectedDigitalContact?.channel?.id, uuid())
        .then((res) => {
          console.log("Reply Sent Successfully!", res);
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
            {digitalContacts.length === 0 && (
              <Box>
                <p>There is no digital card assigned to you.</p>
              </Box>
            )}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'flex-start',
                height: '20%',
                
              }}
            >
              {digitalContacts.map((contact: any, index: any) => {
                const isSelected = selectedDigitalContact.caseId === contact.caseId;
                return (
                  <Box
                    sx={{
                      cursor: 'pointer',
                      padding: '10px',
                    }}
                    onClick={() => onClickCaseId(contact)}
                    key={index}
                  >
                    <HorizontalCards selected={isSelected} contact={contact} />
                  </Box>
                );
              })}
            </Box>
            {messages.length > 0 && (
              <>
              <CardContent sx={accessTokenFlowStyles.case_alignment}>
              <InputLabel>caseId:</InputLabel> {selectedDigitalContact?.caseId}
              </CardContent>
              <CardContent sx={gaAccessTokenFlowStyles.msg_box}>
                Messages :
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {(messages||[]).map((item: any,index:any) => {
                    if (item?.direction == "inbound") {
                      return <div  key={index}>{item.text}</div>;
                    } else {
                      return (
                        <div  key={index} style={{ alignSelf: "end" }}>
                          {item.text}
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
              </>
            )}
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};
export default DigitalSdk;
