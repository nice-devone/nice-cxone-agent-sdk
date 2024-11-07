import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Theme,
  useTheme,
} from "@mui/material";
import {
  AgentSessionStatus,
  AuthToken,
  EndSessionRequest,
} from "@nice-devone/common-sdk";
import {
  AuthSettings,
  AuthWithCodeReq,
  CXoneAuth,
  AuthStatus,
  AuthWithTokenReq,
} from "@nice-devone/auth-sdk";
import {
  CXoneDigitalClient,
  CXoneDigitalContact,
} from "@nice-devone/digital-sdk";
import { CXoneDigitalReplyRequest } from "@nice-devone/common-sdk";
import { CXoneAcdClient } from "@nice-devone/acd-sdk";
import { StorageKeys } from "@nice-devone/core-sdk";
import { CXoneClient } from "@nice-devone/agent-sdk";
import { CXoneVoiceClient } from "@nice-devone/voice-sdk";
import { uuid } from "uuidv4";

const ccfGaAccessTokenFlowStyles = (theme: Theme) => {
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

const ccfAccessTokenFlowStyles = (theme: Theme) => {
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

const Authentication = () => {
  const theme = useTheme();
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

  return (
    <Paper elevation={3} sx={gaAccessTokenFlowStyles.margin}>
      <div id="launchCXA">CXA Placeholder </div>
      <Card sx={{ display: "flex", justifyContent: "end" }}>
        <CardContent>
          <form className="root">
            <Box sx={accessTokenFlowStyles.inputs_alignment}>
              <Button
                onClick={() => {
                  CXoneAcdClient.instance.session
                    .endSession(endSessionRequest)
                    .then((response: any) => {
                      setSessionEndMessage("Session ended successfully");
                    })
                    .catch((err: any) => {
                      setSessionEndMessage(err.message ?? "An error occured");
                    });
                  CXoneAcdClient.instance.session.onAgentSessionChange.next({
                    status: AgentSessionStatus.SESSION_END,
                  });
                }}
                color="primary"
                variant="contained"
                size="large"
                sx={accessTokenFlowStyles.margin}
              >
                End Session
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title={`GA Access Token Flow`} />
        <CardContent>
          <form className="root" noValidate autoComplete="off">
            <Box sx={accessTokenFlowStyles.inputs_alignment}>
              <TextField
                id="outlined-basic"
                label="Host Name"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                inputRef={hostName}
                defaultValue={"https://cxone.niceincontact.com"}
                required
              />
              <TextField
                id="outlined-basic"
                label="Client Id"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                inputRef={clientId}
                defaultValue=""
                required
              />
              <TextField
                id="outlined-basic"
                label="Redirect Uri"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                inputRef={redirectUri}
                defaultValue="http://localhost:3000/"
                required
              />
              <FormControl
                variant="outlined"
                sx={[
                  gaAccessTokenFlowStyles.width,
                  accessTokenFlowStyles.mar_0,
                ]}
              >
                <InputLabel>Authentication mode</InputLabel>
                <Select
                  variant="outlined"
                  label={"Authentication mode"}
                  value={authMode}
                  onChange={(event) =>
                    updateAuthMode(event.target.value as string)
                  }
                >
                  <MenuItem value={"page"}>Page</MenuItem>
                  <MenuItem value={"popup"}>Popup</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                variant="outlined"
                sx={[
                  gaAccessTokenFlowStyles.width,
                  accessTokenFlowStyles.mar_0,
                ]}
              >
                <InputLabel>Code challenge methods</InputLabel>
                <Select
                  variant="outlined"
                  label={"Code challenge methods"}
                  value={codeChallenge}
                  onChange={(event) =>
                    updateCodeChallenge(event.target.value as string)
                  }
                >
                  <MenuItem value={"S256"}>S256</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              onClick={() => authenticateClickHandler()}
              color="primary"
              variant="contained"
              size="large"
              sx={gaAccessTokenFlowStyles.width}
            >
              Authenticate
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title={`Auth Result`} />
        <CardContent>Auth Status: {authState}</CardContent>
        <CardContent sx={accessTokenFlowStyles.text_alignment}>
          <InputLabel>Auth Token:</InputLabel>
          {authToken}
        </CardContent>
      </Card>
      <Card>
        <CardHeader title={`Access Token Flow`} />
        <CardContent>
          <form className="root" noValidate autoComplete="off">
            <Box sx={accessTokenFlowStyles.inputs_alignment}>
              <TextField
                id="outlined-basic"
                label="AuthToken"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                inputRef={hostName}
                defaultValue={"https://cxone.niceincontact.com"}
                required
              />
              <TextField
                id="outlined-basic"
                label="AccessToken"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                inputRef={accessToken}
                required
              />
            </Box>
            <Button
              onClick={handleButtonClick}
              color="primary"
              variant="contained"
              size="large"
              sx={accessTokenFlowStyles.margin}
            >
              Test Flow
            </Button>
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
                  {console.log("get-Next-Event", JSON.stringify(agentStatus))}
                </CardContent>

                <CardHeader title="Dial Phone"></CardHeader>
                <CardContent>
                  <form className="root">
                    <Box sx={accessTokenFlowStyles.inputs_alignment}>
                      <TextField
                        id="outlined-basic"
                        label="callAgent"
                        value={dialNumber}
                        onChange={(e: any) => setDialNumber(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                      <Button
                        onClick={() => {
                          dialCallButtonClick();
                        }}
                        color="primary"
                        variant="contained"
                        size="large"
                        sx={accessTokenFlowStyles.margin}
                      >
                        Dial Number
                      </Button>
                    </Box>
                  </form>
                </CardContent>
              </Card>
            </Box>
          </form>
        </CardContent>
      </Card>
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
                  {(digitalContact?.messages || []).map((item: any) => {
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
    </Paper>
  );
};

export default Authentication;
