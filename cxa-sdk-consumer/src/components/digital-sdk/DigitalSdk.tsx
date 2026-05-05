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
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  CXoneDigitalClient,
  CXoneDigitalContact,
} from "@nice-devone/digital-sdk";
import { CXoneDigitalReplyRequest } from "@nice-devone/common-sdk";

import { uuid } from "uuidv4";
import HorizontalCards from "./horizontal-cards-caseIds/HorizontalCards";
import { tryCatchWrapper } from "../../utils/tryCatchWrapper";
import SendIcon from "@mui/icons-material/Send";
import InboxIcon from "@mui/icons-material/Inbox";



const DigitalSdk = () => {
  const [inputValue, setInputValue] = useState("");
    const [initEngagement, setInitEngagement] = useState(false);  
  let digitalContactInstance: CXoneDigitalContact;
  const [UpdatedigitalContactCaseId, setUpdatedigitalContactCaseId] = useState({} as any);

  const [digitalContacts, setDigitalContacts] = useState([] as any);
  const [selectedDigitalContact, setSelectedDigitalContact] = useState({} as any);


  const [messages, setMessages] = useState([] as any);

  useEffect(() => {
    CXoneDigitalClient.instance.initDigitalEngagement().finally(() => { 
      setInitEngagement(true);
    })
   
  },[])

    useEffect(() => {
      if(initEngagement){
        tryCatchWrapper(digitalSdkwebsoket, (error) => {
          console.log("error", error);
        });
      }    
    },[initEngagement])
  
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

    const digitalSdkwebsoket=async()=>{
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
  

        // Using uuid to trigger re-render as React does not detect changes in nested objects
        //because of this we can trigger useEffect which shows updared messages
        setUpdatedigitalContactCaseId({...digitalConct,update_id:uuid()});
        }
      );
     
    
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
    <Box sx={{ maxWidth: 900, mx: "auto", py: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: "primary.dark" }}>
        Digital SDK
      </Typography>

      <Card>
        <CardContent sx={{ p: 3 }}>
          {digitalContacts.length === 0 ? (
            <Stack alignItems="center" spacing={2} sx={{ py: 4 }}>
              <InboxIcon sx={{ fontSize: 48, color: "text.disabled" }} />
              <Typography color="text.secondary">
                No digital contacts assigned to you yet.
              </Typography>
            </Stack>
          ) : (
            <>
              {/* Contact Cards */}
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
                Active Contacts ({digitalContacts.length})
              </Typography>
              <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
                {digitalContacts.map((contact: any, index: any) => {
                  const isSelected = selectedDigitalContact.caseId === contact.caseId;
                  return (
                    <Box
                      sx={{ cursor: 'pointer' }}
                      onClick={() => onClickCaseId(contact)}
                      key={index}
                    >
                      <HorizontalCards selected={isSelected} contact={contact} />
                    </Box>
                  );
                })}
              </Stack>
            </>
          )}

          {messages.length > 0 && (
            <>
              <Divider sx={{ mb: 2 }} />
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Case ID:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: "monospace" }}>
                  {selectedDigitalContact?.caseId}
                </Typography>
              </Stack>

              {/* Messages Area */}
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  mb: 2,
                  maxHeight: 350,
                  overflow: "auto",
                  backgroundColor: "#fafafa",
                  borderRadius: 2,
                }}
              >
                <Stack spacing={1}>
                  {(messages || []).map((item: any, index: any) => {
                    const isInbound = item?.direction === "inbound";
                    return (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: isInbound ? "flex-start" : "flex-end",
                        }}
                      >
                        <Paper
                          elevation={0}
                          sx={{
                            px: 2,
                            py: 1,
                            maxWidth: "70%",
                            borderRadius: 2,
                            backgroundColor: isInbound ? "#e3f2fd" : "#1a237e",
                            color: isInbound ? "text.primary" : "#fff",
                          }}
                        >
                          <Typography variant="body2">{item.text}</Typography>
                        </Paper>
                      </Box>
                    );
                  })}
                </Stack>
              </Paper>

              {/* Reply Input */}
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type a reply..."
                  value={inputValue}
                  onChange={(e) => handleChange(e)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && inputValue) {
                      sendReply(e);
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={sendReply}
                          color="primary"
                          disabled={!inputValue}
                          size="small"
                        >
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
export default DigitalSdk;
