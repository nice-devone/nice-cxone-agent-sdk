/**
 * AcdSdk component initializes and manages the ACD (Automatic Call Distribution) SDK.
 * It handles agent session management, skill details retrieval, and dialing outbound calls.
 *
 * @component
 * @example
 * ```tsx
 * <AcdSdk />
 * ```
 *
 * @returns {JSX.Element} The rendered AcdSdk component.
 *
 * @remarks
 * This component uses the @nice-devone/acd-sdk, @nice-devone/voice-sdk, and @nice-devone/agent-sdk
 * to manage agent sessions and interactions.
 *
 * @function
 * @name AcdSdk
 *
 * @description
 * The AcdSdk component initializes the ACD SDK, joins an agent session, subscribes to various
 * agent state and contact events, and provides UI elements for ending the session and dialing
 * outbound calls.
 *
 */
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { CXoneAcdClient, CXoneVoiceContact } from "@nice-devone/acd-sdk";
import { AgentSessionStatus, EndSessionRequest } from "@nice-devone/common-sdk";
import { CXoneVoiceClient } from "@nice-devone/voice-sdk";
import { CXoneClient } from "@nice-devone/agent-sdk";
import { LocalStorageHelper, StorageKeys, AgentSettings } from "@nice-devone/core-sdk";
import VoiceControls from "./voice-controls/VoiceControls";
import Outbound from "./outbound/Outbound";
import DirectoryAndAddressBook from "./directory-address-book/DirectoryAndAddressBook";
import { UserInfo } from "@nice-devone/common-sdk";
import { useLocation } from "react-router-dom";
import { tryCatchWrapper } from "../../utils/tryCatchWrapper";
import { CcfMessageType } from '@nice-devone/shared-apps-lib';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import CircleIcon from "@mui/icons-material/Circle";
import CallIcon from "@mui/icons-material/Call";
import CallEndIcon from "@mui/icons-material/CallEnd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Logger } from '@nice-devone/core-sdk';

// SDK Logger
const logger = new Logger('SDK-CONSUMER', 'AcdSdk');



const AcdSdk = () => {
  const [agentStatus, setAgentStatus] = useState({} as any);
  const [startSessionButton, setStartSessionButton] = useState(
     false
  );
  const [endSessionButton, setEndSessionButton] = useState(true);
  const [agentLegButton, setAgentLegButton] = useState(true);
  const [voiceContact, setVoiceContact] = useState({} as CXoneVoiceContact);
  const [initEngagement, setInitEngagement] = useState(false);
  const [voiceConnectionState, setVoiceConnectionState] = useState<any>(null);
  const [voiceCallState, setVoiceCallState] = useState<any>(null);
  const [isHandlingInboundCall, setIsHandlingInboundCall] = useState(false);
  const [unavailableCodes, setUnavailableCodes] = useState<Array<{ reason: string; isAcw?: boolean }>>([]);
  const [selectedAgentState, setSelectedAgentState] = useState<string>("available");
  const [isChangingAgentState, setIsChangingAgentState] = useState(false);
  const [consultTargetAgentId, setConsultTargetAgentId] = useState<string>("");
  const [isConsultingAgent, setIsConsultingAgent] = useState(false);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const subscriptionsInitializedRef = useRef(false);
  const webRtcInitializedRef = useRef(false);
  const initMethodsRef = useRef<() => Promise<void>>(async() => undefined);
  const manualStartSessionRef = useRef<() => void>(() => undefined);
  const initWebRTCRef = useRef<() => Promise<void>>(async() => undefined);
  const location = useLocation();


  const endSessionRequest: EndSessionRequest = {
    forceLogoff: false,
    endContacts: true,
    ignorePersonalQueue: true,
  };

  useEffect(() => {
    logger.info("initAcdEngagement", '');
    CXoneAcdClient.instance.initAcdEngagement().finally(() => {
      logger.info("initAcdEngagement complete", '');
      setInitEngagement(true);
    });
    CXoneAcdClient.instance.setClickToDialCustomAgentUrl(
        "http://localhost:3000/"
      );
    window.addEventListener('message', extensionClickToDialHandler);

    return () => {
      window.removeEventListener('message', extensionClickToDialHandler);
    };
  }, []);

  useEffect(() => {
    // Subscribe only once — re-subscribing on re-render would duplicate handlers.
    const connectionSubscription = CXoneVoiceClient.instance.onConnectionStatusChanged.subscribe((connectionState: any) => {
      logger.info(`onConnectionStatusChanged: ${connectionState?.status ?? 'unknown'}`, '');
      setVoiceConnectionState(connectionState);
    });

    // Subscribe only once — re-subscribing on re-render would duplicate handlers.
    const callSubscription = CXoneVoiceClient.instance.onCallStatusChanged.subscribe((callState: any) => {
      logger.info(`onCallStatusChanged: ${callState?.status ?? 'unknown'}`, '');
      setVoiceCallState(callState);
    });

    return () => {
      connectionSubscription.unsubscribe();
      callSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    
    if (LocalStorageHelper.getItem("startsessionButton") === "true") {
      setStartSessionButton(true);
      setEndSessionButton(false);
      setAgentLegButton(false);
    }
    if (LocalStorageHelper.getItem("startsessionButton") === "false") {
      setStartSessionButton(false);
      setEndSessionButton(true);
      setAgentLegButton(true);
    }
  }, [startSessionButton]);

  /**
   * Handle click-to-dial messages from browser extension
   * @param event - message event from extension
   */
  const extensionClickToDialHandler = (event: MessageEvent) => {
    if (event.data['type'] === CcfMessageType.CtdDialedNumber) {
      const number = event.data['dialedNumber'];
      const contactDetails: any = {
          skillId: '889669', //replace with actual skill id
          phoneNumber: number.toString().replace(/[`~!@$%^&()_|\-=?;:'",.<>{}[\]\s\\]/gi ,''),
      };
      CXoneAcdClient.instance.contactManager.voiceService.dialPhone(contactDetails);
    };
  }



  const initMethods = async () => {
    if (subscriptionsInitializedRef.current) {
      return;
    }

    const getLastLoggedInAgentId = LocalStorageHelper.getItem(
      StorageKeys.LAST_LOGGED_IN_AGENT_ID
    );

    const agentId = getLastLoggedInAgentId?.toString();

    if (agentId) {
      subscriptionsInitializedRef.current = true;

      // Subscribe only once — re-subscribing on re-render would duplicate handlers.
      CXoneAcdClient.instance.session.agentStateService.agentStateSubject.subscribe(
        (agentState: any) => {
          logger.info("agentStateSubject", '');
          setAgentStatus(agentState);
        }
      );

      // Subscribe only once — re-subscribing on re-render would duplicate handlers.
      CXoneAcdClient.instance.contactManager.voiceContactUpdateEvent.subscribe(
        (data: CXoneVoiceContact) => {
          logger.info("voiceContactUpdateEvent", '');
          setVoiceContact(data);
          console.log("voice contact", data);
        }
      );

      // Subscribe only once — re-subscribing on re-render would duplicate handlers.
      CXoneAcdClient.instance.session.agentLegEvent.subscribe((data: any) => {
        logger.info(`agentLegEvent: ${data?.status ?? 'unknown'}`, '');
        CXoneVoiceClient.instance.handleAgentLegEvent(data);
        if (data?.status === "Dialing") {
          CXoneVoiceClient.instance.connectAgentLeg(data.agentLegId);
        }
      });

      // Subscribe only once — re-subscribing on re-render would duplicate handlers.
      CXoneClient.instance.skillActivityQueue.agentQueueSubject.subscribe(
        (queues: any) => {
          console.log("queues", queues);
        }
      );
      // Subscribe only once — re-subscribing on re-render would duplicate handlers.
      CXoneClient.instance.skillActivityQueue.agentQueuesDetailSubject.subscribe(
        (queues: any) => {
          console.log("queues details", queues);
        }
      );

      // Subscribe only once — re-subscribing on re-render would duplicate handlers.
      CXoneAcdClient.instance.session.onAgentSessionChange.subscribe(
        async (agentSessionChange) => {
          logger.info(`onAgentSessionChange: ${agentSessionChange.status}`, '');
          switch (agentSessionChange.status) {
            case AgentSessionStatus.JOIN_SESSION_SUCCESS:
            case AgentSessionStatus.SESSION_START: {
              console.log("Session started successfully.....");

              initWebRTC();
              break;
            }
            case AgentSessionStatus.SESSION_END: {
              console.log("Session ended successfully.....");
            
              webRtcInitializedRef.current = false;
              setVoiceConnectionState(null);
              setVoiceCallState(null);
              setStartSessionButton(false);
              break;
            }
            case AgentSessionStatus.JOIN_SESSION_FAILURE:
              console.log("Session join failed.....");
              setStartSessionButton(false);
              break;
          }
        }
      );
      connectCopilot();

    } else {
      console.log("Agent Id not found", agentId);
    }
    
  };

  //Method to connect copilot notification websocket
 const connectCopilot = () => {
      const {aahNotificationWssUri} = LocalStorageHelper.getItem("cxone_config", true);
      const userInfo = LocalStorageHelper.getItem("user_info", true) as UserInfo;
      CXoneClient.instance.copilotNotificationClient.connect(aahNotificationWssUri, userInfo.icAgentId);
      // Subscribe only once — re-subscribing on re-render would duplicate handlers.
      CXoneClient.instance.copilotNotificationClient.onMessageNotification.subscribe(
        (msg: any) => {
          console.log("Received message:", msg);
        }
      );
    }

  const getWebRtcServiceUrls = async () => {
    const agentSettings =
      (await CXoneClient.instance.agentSetting.getAgentSettings()) as AgentSettings;
    const getUserInfo =
      (await CXoneClient.instance.cxoneUser.getUserDetails()) as UserInfo;
    if (agentSettings && getUserInfo.icAgentId) {
      return {
        agentId: getUserInfo.icAgentId,
        agentSettings: agentSettings,
        userInfo: getUserInfo,
      };
    }
  };

  const initWebRTC = async () => {
    try {
      if (webRtcInitializedRef.current) {
        return;
      }

      const settings = (await getWebRtcServiceUrls()) as {
        agentId: string;
        agentSettings: AgentSettings;
        userInfo: UserInfo;
      };

      if (!settings) {
        logger.error("CXoneVoiceClient.connectServer aborted: agent settings unavailable", '');
        console.log("Agent settings unavailable for WebRTC connection");
        return;
      }

      if (!audioElementRef.current) {
        logger.info("WebRTC init deferred: <audio> element not mounted yet", '');
        console.log("Audio element not mounted, WebRTC init deferred");
        return;
      }

      const app = "Nice CXone SDK Consumer";
      const appName = `${(app || 'cxa').toUpperCase()}: ${settings.agentSettings.cxaClientVersion}`;

      logger.info("CXoneVoiceClient.connectServer", '');
      await CXoneVoiceClient.instance.connectServer(
        settings.agentId,
        settings.agentSettings,
        audioElementRef.current as HTMLAudioElement,
        appName,
      );
      webRtcInitializedRef.current = true;
      logger.info("CXoneVoiceClient.connectServer success", '');
      console.log("Connected to WebRTC");
    } catch (e) {
      webRtcInitializedRef.current = false;
      logger.error("CXoneVoiceClient.connectServer failed", '');
      console.log("WebRTC connect failed", e);
    }
  };

  const startSessiononCall = () => {
    logger.info("session.startSession", '');
    CXoneAcdClient.instance.session
      .startSession({
        stationId: "",
        stationPhoneNumber: "WebRTC",
      })
      .then((response: any) => {
        logger.info("startSession success", '');
        console.log("Session start successfully");
        setStartSessionButton(true);
        LocalStorageHelper.setItem("startsessionButton", "true");
        setAgentLegButton(false);
        setEndSessionButton(false);
      })
      .catch((err: any) => {
        logger.error("startSession failed", '');
        setStartSessionButton(false);
        LocalStorageHelper.setItem("startsessionButton", "false");
        setAgentLegButton(true);
        setEndSessionButton(true);
        console.log(err.message ?? "An error occured");
      });
  };

  const manualStartSession = () => {
    logger.info("session.joinSession", '');
    CXoneAcdClient.instance.session
      .joinSession()
      .then((response: any) => {
        logger.info("joinSession success", '');
        console.log("Joined Session successfully");
        setStartSessionButton(true);
        LocalStorageHelper.setItem("startsessionButton", "true");
        setAgentLegButton(false);
        setEndSessionButton(false);
      })
      .catch(() => {
        logger.info("joinSession failed → fallback to startSession", '');
        startSessiononCall();
      });

    CXoneAcdClient.instance.session.onAgentSessionChange.next({
      status: AgentSessionStatus.SESSION_END,
    });
  };

  initMethodsRef.current = initMethods;
  manualStartSessionRef.current = manualStartSession;
  initWebRTCRef.current = initWebRTC;

  useEffect(() => {
    if (initEngagement) {
      tryCatchWrapper(() => initMethodsRef.current(), (error) => {
        console.log("error", error);
      });
    }
  }, [location.pathname, initEngagement]);

  useEffect(() => {
    if (initEngagement) {
      manualStartSessionRef.current();
    }
  }, [initEngagement]);

  // Auto-retry WebRTC connect when session becomes active and audio element is mounted
  useEffect(() => {
    if (startSessionButton && !webRtcInitializedRef.current) {
      initWebRTCRef.current();
    }
  }, [startSessionButton, voiceConnectionState]);

  // Fetch unavailable codes once when the session becomes active
  useEffect(() => {
    if (startSessionButton && unavailableCodes.length === 0) {
      loadUnavailableCodes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startSessionButton]);

  // Sync the selected dropdown value with the current agent state coming from SDK
  useEffect(() => {
    const currentState = agentStatus?.currentState?.state?.toLowerCase?.();
    const currentReason = agentStatus?.currentState?.reason;
    if (currentState === "available") {
      setSelectedAgentState("available");
    } else if (currentState === "unavailable" && currentReason) {
      setSelectedAgentState(currentReason);
    }
  }, [agentStatus]);

  const endSessionButtonClick = () => {
    logger.info("session.endSession", '');
    CXoneAcdClient.instance.session
      .endSession(endSessionRequest)
      .then((response: any) => {
        logger.info("endSession success", '');
        console.log("Session ended successfully");
        setEndSessionButton(true);
        setStartSessionButton(false);
        LocalStorageHelper.setItem("startsessionButton", "false");
        setAgentLegButton(true);
      })
      .catch((err: any) => {
        logger.error("endSession failed", '');
        console.log(err.message ?? "An error occured");
      });
    CXoneAcdClient.instance.session.onAgentSessionChange.next({
      status: AgentSessionStatus.SESSION_END,
    });
  };

  const onAgentLegClick = async () => {
    try {
      logger.info("dialAgentLeg", '');
      await CXoneAcdClient.instance.agentLegService.dialAgentLeg();
      logger.info("dialAgentLeg success", '');
    } catch (error) {
      logger.error("dialAgentLeg failed", '');
      console.log("agent leg error", error);
    }
  };

  const handleAcceptInboundCall = async () => {
    if (!voiceContact?.contactID) {
      return;
    }

    try {
      setIsHandlingInboundCall(true);
      logger.info("acceptContact", '');
      await CXoneAcdClient.instance.contactManager.contactService.acceptContact(voiceContact.contactID);
      logger.info("acceptContact success", '');
    } catch (error) {
      logger.error("acceptContact failed", '');
      console.log("accept inbound call error", error);
    } finally {
      setIsHandlingInboundCall(false);
    }
  };

  const handleRejectInboundCall = async () => {
    if (!voiceContact?.contactID) {
      return;
    }

    try {
      setIsHandlingInboundCall(true);
      logger.info("rejectContact", '');
      await CXoneAcdClient.instance.contactManager.contactService.rejectContact(voiceContact.contactID);
      logger.info("rejectContact success", '');
    } catch (error) {
      logger.error("rejectContact failed", '');
      console.log("reject inbound call error", error);
    } finally {
      setIsHandlingInboundCall(false);
    }
  };

  const loadUnavailableCodes = async () => {
    try {
      logger.info("getTeamUnavailableCodes", '');
      const codes = await CXoneAcdClient.instance.getTeamUnavailableCodes();
      if (Array.isArray(codes)) {
        const active = codes.filter((code: any) => code?.isActive !== false);
        setUnavailableCodes(active.map((code: any) => ({ reason: code.reason, isAcw: code.isAcw })));
        logger.info("getTeamUnavailableCodes success", '');
      }
    } catch (error) {
      logger.error("getTeamUnavailableCodes failed", '');
      console.log("getTeamUnavailableCodes error", error);
    }
  };

  const handleAgentStateChange = (event: SelectChangeEvent<string>) => {
    setSelectedAgentState(event.target.value);
  };

  const handleConsultAgent = async () => {
    const trimmed = consultTargetAgentId.trim();
    const numericAgentId = Number(trimmed);
    if (!trimmed || Number.isNaN(numericAgentId)) {
      logger.error("consultAgent skipped: invalid target agent id", '');
      return;
    }

    try {
      setIsConsultingAgent(true);
      logger.info("consultAgent", '');
      await CXoneAcdClient.instance.contactManager.voiceService.consultAgent(numericAgentId);
      logger.info("consultAgent success", '');
    } catch (error) {
      logger.error("consultAgent failed", '');
      console.log("consultAgent error", error);
    } finally {
      setIsConsultingAgent(false);
    }
  };

  const applyAgentState = async () => {
    const isAvailable = selectedAgentState === "available";
    const agentState = {
      state: isAvailable ? "Available" : "Unavailable",
      reason: isAvailable ? "" : selectedAgentState,
    };

    try {
      setIsChangingAgentState(true);
      logger.info("setAgentState", '');
      await CXoneAcdClient.instance.session.setAgentState(agentState);
      logger.info("setAgentState success", '');
    } catch (error) {
      logger.error("setAgentState failed", '');
      console.log("setAgentState error", error);
    } finally {
      setIsChangingAgentState(false);
    }
  };

  const isInboundPendingCall =
    voiceContact?.status === "Incoming" ||
    voiceContact?.status === "Ringing";

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", py: 2, width: "100%" }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: "primary.dark" }}>
        ACD SDK
      </Typography>

      {/* Session Controls */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="space-between"
            spacing={2}
          >
            <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
              Session Controls
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              <Button
                onClick={() => manualStartSession()}
                variant="contained"
                color="success"
                startIcon={<PlayArrowIcon />}
                disabled={startSessionButton}
                fullWidth
              >
                Start Session
              </Button>
              <Button
                onClick={() => endSessionButtonClick()}
                variant="contained"
                color="error"
                startIcon={<StopIcon />}
                disabled={endSessionButton}
                fullWidth
              >
                End Session
              </Button>
              <Button
                onClick={() => onAgentLegClick()}
                variant="outlined"
                startIcon={<HeadsetMicIcon />}
                disabled={agentLegButton}
                fullWidth
              >
                Agent Leg
              </Button>
            </Stack>
          </Stack>
          <Divider sx={{ my: 2.5 }} />
          <Typography variant="subtitle2" sx={{ mb: 1.5, color: "text.secondary" }}>
            Voice Media
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 3 }}
            sx={{ mb: 2.5 }}
            useFlexGap
            flexWrap="wrap"
          >
            <Box>
              <Typography variant="caption" color="text.secondary">Connection Status</Typography>
              <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 600 }}>
                {voiceConnectionState?.status || "Not connected"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Call Status</Typography>
              <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 600 }}>
                {voiceCallState?.status || "Idle"}
              </Typography>
            </Box>
            {voiceCallState?.contactId && (
              <Box>
                <Typography variant="caption" color="text.secondary">Voice Contact Id</Typography>
                <Typography variant="body1" sx={{ mt: 0.5 }}>
                  {voiceCallState.contactId}
                </Typography>
              </Box>
            )}
            <Button
              onClick={() => {
                webRtcInitializedRef.current = false;
                initWebRTCRef.current();
              }}
              variant="contained"
              color="primary"
              size="small"
              startIcon={<HeadsetMicIcon />}
              sx={{ alignSelf: "center" }}
            >
              Connect Voice
            </Button>
          </Stack>
          <audio
            ref={audioElementRef}
            id="acd-webrtc-audio"
            controls
            autoPlay
            style={{ width: "100%" }}
          />
        </CardContent>
      </Card>

      {/* Agent State & Dial */}
      <Card>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
              Agent State & Dial
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2.5 }} />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 3 }}
            sx={{ mb: 3 }}
            useFlexGap
            flexWrap="wrap"
          >
            <Box>
              <Typography variant="caption" color="text.secondary">Current State</Typography>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                <CircleIcon
                  sx={{
                    fontSize: 12,
                    color: agentStatus?.currentState?.state === "available" ? "success.main" : "warning.main",
                  }}
                />
                <Typography variant="body1" sx={{ fontWeight: 600, textTransform: "capitalize" }}>
                  {agentStatus?.currentState?.state || "Unknown"}
                </Typography>
              </Stack>
            </Box>
            {agentStatus?.currentState?.state !== "available" && agentStatus?.currentState?.reason && (
              <Box>
                <Typography variant="caption" color="text.secondary">Reason</Typography>
                <Typography variant="body1" sx={{ mt: 0.5 }}>
                  {agentStatus?.currentState?.reason}
                </Typography>
              </Box>
            )}
            {agentStatus?.currentState?.cxoneState && (
              <Box>
                <Typography variant="caption" color="text.secondary">CXone State</Typography>
                <Chip
                  label={agentStatus?.currentState?.cxoneState}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ mt: 0.5 }}
                />
              </Box>
            )}
          </Stack>

          <Divider sx={{ mb: 2.5 }} />
          <Typography variant="subtitle2" sx={{ mb: 1.5, color: "text.secondary" }}>
            Change Agent State
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            alignItems={{ xs: "stretch", sm: "center" }}
            sx={{ mb: 3 }}
          >
            <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 260 } }} disabled={!startSessionButton}>
              <InputLabel id="agent-state-select-label">Agent State</InputLabel>
              <Select
                labelId="agent-state-select-label"
                label="Agent State"
                value={selectedAgentState}
                onChange={handleAgentStateChange}
              >
                <MenuItem value="available">Available</MenuItem>
                {unavailableCodes.map((code) => (
                  <MenuItem key={code.reason} value={code.reason}>
                    Unavailable — {code.reason}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={applyAgentState}
              disabled={!startSessionButton || isChangingAgentState}
            >
              Apply
            </Button>
          </Stack>

          <Divider sx={{ mb: 2.5 }} />
          <Typography variant="subtitle2" sx={{ mb: 1.5, color: "text.secondary" }}>
            Outbound Dial
          </Typography>
          {initEngagement && <Outbound />}

          {voiceContact?.contactID && isInboundPendingCall && (
            <Box sx={{ mt: 2 }}>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="subtitle2" sx={{ mb: 1.5, color: "text.secondary" }}>
                Incoming Call
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CallIcon />}
                  disabled={isHandlingInboundCall}
                  onClick={handleAcceptInboundCall}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<CallEndIcon />}
                  disabled={isHandlingInboundCall}
                  onClick={handleRejectInboundCall}
                >
                  Reject
                </Button>
              </Stack>
            </Box>
          )}

          {voiceContact?.contactID &&
            !isInboundPendingCall &&
            voiceContact?.status !== "Ended" &&
            voiceContact?.status !== "Disconnected" && (
              <Box sx={{ mt: 2 }}>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="subtitle2" sx={{ mb: 1.5, color: "text.secondary" }}>
                  Consult Agent
                </Typography>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.5}
                  alignItems={{ xs: "stretch", sm: "center" }}
                  sx={{ mb: 2 }}
                >
                  <TextField
                    label="Target Agent Id"
                    size="small"
                    value={consultTargetAgentId}
                    onChange={(e) => setConsultTargetAgentId(e.target.value)}
                    placeholder="e.g. 1234567"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    sx={{ minWidth: { xs: "100%", sm: 260 } }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PersonAddIcon />}
                    onClick={handleConsultAgent}
                    disabled={isConsultingAgent || !consultTargetAgentId.trim()}
                  >
                    Consult Agent
                  </Button>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="subtitle2" sx={{ mb: 1.5, color: "text.secondary" }}>
                  Voice Controls
                </Typography>
                <VoiceControls voiceContact={voiceContact} />
              </Box>
            )}
        </CardContent>
      </Card>

      {/* Directory & Address Book */}
      <DirectoryAndAddressBook />
    </Box>
  );
};
export default AcdSdk;
