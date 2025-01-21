import  React,{useEffect, useRef, useState} from "react";
import { styled, Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Authentication from "../authentication";
import { Route, Routes, useNavigate } from "react-router-dom";
import CxaPlaceholder from "../cxa-placeholder/CxaPlaceholder";
import AcdSdk from "../acd-sdk/AcdSdk";
import DigitalSdk from "../digital-sdk/DigitalSdk";
import Auth from "../auth/Auth";
import { AuthSettings, AuthStatus, AuthWithCodeReq, AuthWithTokenReq, CXoneAuth } from "@nice-devone/auth-sdk";
import { CXoneDigitalClient, CXoneDigitalContact } from "@nice-devone/digital-sdk";
import { AuthToken, CXoneDigitalReplyRequest, EndSessionRequest } from "@nice-devone/common-sdk";
import { CXoneClient } from "@nice-devone/agent-sdk";
import { CXoneAcdClient } from "@nice-devone/acd-sdk";
import { CXoneVoiceClient } from "@nice-devone/voice-sdk";
import { StorageKeys } from "@nice-devone/core-sdk";
import { uuid } from "uuidv4";

const drawerWidth = 240;
export const ccfGaAccessTokenFlowStyles = (theme: Theme) => {
  const styles = {
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    margin: {
      margin: theme.spacing(1),
      MaxWidth: "max-content",
    },
    width: {
      width: "25ch",
      margin: theme.spacing(1),
    },
    msg_box: {
      border: 1,
      width: "50%",
      boxSizing: "border-box",
    },
    font_size: {
      fontWeight: "500",
    },
    card_content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.5rem",
    },
    text_left: {
      textAlign: "left",
    },
    text_center: {
      textAlign: "center",
    },
    reply_textbox: {
      paddingBottom: "0 !important",
      paddingLeft: "0",
      paddingRight: "0",
      marginBottom: "-16px",
      marginLeft: "-16px",
    },
    acd_width: {
      width: "12rem",
      margin: theme.spacing(2),
    },
  };
  return styles;
};

export const ccfAccessTokenFlowStyles = (theme: Theme) => {
  const styles = {
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    margin: {
      margin: theme.spacing(1),
    },
    reply_btn: {
      margin: "0",
    },
    widthAuto: {
      maxWidth: "max-content",
    },
    mar_0: {
      margin: "0",
    },
    pad_0: {
      margin: "0",
    },
    inputs_alignment: {
      display: "flex",
      gap: theme.spacing(1),
      justifyContent: "center",
    },
    case_alignment: {
      display: "flex",
      gap: "0.5rem",
    },
    text_alignment: {
      wordBreak: "break-all",
    },
    reply_width: {
      width: "100%",
    },
    flex_column: {
      flexDirection: "column",
      textAlign: "left",
      alignItems: "center",
    },
  };
  return styles;
};

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function NavBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
 
  const gaAccessTokenFlowStyles = ccfGaAccessTokenFlowStyles(theme);
  const accessTokenFlowStyles = ccfAccessTokenFlowStyles(theme);
  const hostName: React.RefObject<HTMLInputElement> = useRef(null);
    const clientId: React.RefObject<HTMLInputElement> = useRef(null);
    const redirectUri: React.RefObject<HTMLInputElement> = useRef(null);
    const accessToken: React.RefObject<HTMLInputElement> = useRef(null);
    const [authMode, updateAuthMode] = useState("page");
    const [codeChallenge, updateCodeChallenge] = useState("S256");
    const [sessionEndMessage, setSessionEndMessage] = useState("");
    const [dialNumber, setDialNumber] = useState("");
    const cxoneAuth = CXoneAuth.instance;
    const [authState, setAuth] = useState("");
    const [authToken, setAuthToken] = useState("");
    const [inputValue, setInputValue] = useState("");
    let digitalContactInstance: CXoneDigitalContact;
    const [digitalContact, setDigitalContact] = useState({} as any);
    const [agentStatus, setAgentStatus] = useState({} as any);
    const [skillDetails, setSkillDetails] = useState({} as any);
  
    const endSessionRequest: EndSessionRequest = {
      forceLogoff: false,
      endContacts: true,
      ignorePersonalQueue: true,
    };
  
  const navigate = useNavigate();

    //Auth callback will be captured here
    useEffect(() => {
      subscribeToAuth();
      cxoneAuth.restoreData();
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code") || "";
      if (!code) return;
      const display = localStorage.getItem("display_mode") || "";
      if (display) {
        if (display === "popup") {
          const message = { messageType: "Authenticated", code: code };
          window.opener?.postMessage({ message }, "*");
        } else {
          const authSetting = JSON.parse(
            localStorage.getItem("auth_consumer") || ""
          );
          cxoneAuth.init(authSetting);
          getAccessToken(code);
        }
      }
    }, []);

    const initAuth = function () {
      if (
        !hostName?.current?.value ||
        !clientId?.current?.value ||
        !redirectUri?.current?.value ||
        !authMode ||
        !codeChallenge
      )
        return;
  
      const authSetting: AuthSettings = {
        cxoneHostname: hostName?.current.value,
        clientId: clientId.current.value,
        redirectUri: redirectUri.current.value,
      };
      localStorage.setItem("auth_consumer", JSON.stringify(authSetting));
      cxoneAuth.init(authSetting);
    };
  
    /**
     * dial OB call
     * @example
     * ```
     * DialCallButtonClick()
     * ```
     */
    const dialCallButtonClick = () => {
      const contactDetails = {
        skillId:
          skillDetails?.skillId /*Before using skillID agent Application must be linked with acd  */,
        phoneNumber: dialNumber,
      };
      CXoneAcdClient.instance.contactManager.voiceService.dialPhone(
        contactDetails
      );
      console.log("Dialled Given number and dial phone api successfully called");
    };
  
    const authenticateClickHandler = () => {
      initAuth();
      localStorage.setItem("display_mode", authMode);
      cxoneAuth
        .getAuthorizeUrl(authMode, codeChallenge)
        .then((authUrl: string) => {
          console.log(authMode,codeChallenge,authUrl)
          if (authMode === "page") {
            window.location.href = authUrl;
          } else if (authMode === "popup") {
            const popupOptions =
              "width=500,height=500,scrollbars=yes,toolbar=no,left=50,top=50";
            const popupWindow = window.open(authUrl, "authWindow", popupOptions);
  
            window.addEventListener(
              "message",
              (event) => {
                const message = event.data.message;
                if (message && message["messageType"] === "Authenticated") {
                  getAccessToken(message.code);
                  popupWindow?.close();
                }
              },
              false
            );
          }
        });
    };
  
    function getAccessToken(code: string) {
      const authObject: AuthWithCodeReq = {
        clientId: clientId?.current?.value || "",
        code: code,
      };
      cxoneAuth.getAccessTokenByCode(authObject);
    }
  
    function subscribeToAuth() {
      cxoneAuth.onAuthStatusChange.subscribe((data) => {
        const getLastLoggedInAgentId = localStorage.getItem(
          StorageKeys.LAST_LOGGED_IN_AGENT_ID
        );
        const agentId = getLastLoggedInAgentId?.toString();
        switch (data.status) {
          case AuthStatus.AUTHENTICATING:
            setAuth("AUTHENTICATING");
            break;
          case AuthStatus.AUTHENTICATED:
            setAuth("AUTHENTICATED");
            setAuthToken((data.response as AuthToken).accessToken);
  
            // Digital SDK consumption
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
  
            // ACD SDK consumption
            CXoneAcdClient.instance.initAcdEngagement();
            CXoneAcdClient.instance.session
              .joinSession()
              .then((response: any) => {
                console.log("Joined Session successfully");
              })
              .catch(() => {
                console.log("Join unsuccessfully");
              });
            CXoneAcdClient.instance.session.agentStateService.agentStateSubject.subscribe(
              (agentState: any) => {
                setAgentStatus(agentState);
              }
            );
            CXoneAcdClient.instance.getAgentSkills(agentId).then((data: any) => {
              setSkillDetails(data[0]);
            });
            CXoneAcdClient.instance.contactManager.voiceContactUpdateEvent.subscribe(
              (data: any) => {
                console.log("voicedata", data);
              }
            );
  
            CXoneAcdClient.instance.session.agentLegEvent.subscribe(
              (data: any) => {
                if (data.status === "Dialing") {
                  CXoneVoiceClient.instance.triggerAutoAccept(data.agentLegId);
                }
              }
            );
  
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
            // Launch CXone Agent in iframe
            cxoneAuth.launchCXoneAgent(
              "launchCXA",
              "https://cxagent.nicecxone.com?src=sdk",
              { width: "400px", height: "500px" }
            );
  
            break;
          case AuthStatus.NOT_AUTHENTICATED:
            setAuth("NOT_AUTHENTICATED");
            break;
          case AuthStatus.AUTHENTICATION_FAILED:
            setAuth("AUTHENTICATION_FAILED");
            break;
          default:
            break;
        }
      });
    }
  
    /**
     * Use to handle the button click to test the new acces token flow
     * @example -
     */
    const handleButtonClick = () => {
      if (!accessToken?.current?.value || !hostName?.current?.value) return;
      const authByToken: AuthWithTokenReq = {
        accessToken: accessToken?.current?.value,
      };
      cxoneAuth.getAccessTokenByToken(authByToken);
    };
  
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
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setInputValue(e.target.value);
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

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
    if (index === 0) navigate("/");
    if (index === 1) navigate("/acd-sdk");
    if (index === 2) navigate("/digital-sdk");
    if (index === 3) navigate("/cxa-placeholder");
  };

  const tabNames = ["Auth", "ACD", "Digital", "Custom"];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton>
            {theme.direction === "ltr" ? (
              <>CXA CONSUMER</>
            ) : (
              <>ChevronRightIcon</>
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {tabNames.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                selected={selectedIndex === index} // Highlight selected item
                onClick={() => handleListItemClick(index)} // Set selected item
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#1976d2", // Apply blue background when selected
                    "&:hover": {
                      backgroundColor: "#1976d2", // Maintain blue background on hover
                    },
                    color: "white", // Set text color to white when selected
                  },
                }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path="/authentication" element={<Authentication />} />
       
        
          <Route
            path="/"
            element={
              <Auth
                setSessionEndMessage={(e:string) => {setSessionEndMessage(e)}}
                hostName={hostName}
                clientId={clientId}
                redirectUri={redirectUri}
                authMode={authMode}
                updateAuthMode={updateAuthMode}
                codeChallenge={codeChallenge}
                updateCodeChallenge={updateCodeChallenge}
                authenticateClickHandler={()=>authenticateClickHandler()}
                authState={authState}
                authToken={authToken}
                accessToken={accessToken}
                handleButtonClick={()=>handleButtonClick()}
              />
            }
          />
           <Route
            path="/acd-sdk"
            element={
              <AcdSdk
                agentStatus={agentStatus}
                dialCallButtonClick={() => { dialCallButtonClick(); } }
                setSessionEndMessage={(e: string) => setSessionEndMessage(e)} dialNumber={dialNumber} setDialNumber={setDialNumber}              />
            }
          />
            <Route
            path="/digital-sdk"
            element={
              <DigitalSdk
                inputValue={inputValue}
                digitalContact={digitalContact}
                sendReply={sendReply}
                handleChange={handleChange}
              />
            }
          />
          <Route path="/cxa-placeholder" element={<CxaPlaceholder />} />
         
        </Routes>
      </Main>
    </Box>
  );
}
