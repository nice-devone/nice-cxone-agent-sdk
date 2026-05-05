import React, { useEffect, useRef } from "react";

import { Avatar, Box, Button, Chip, Divider, FormControl, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, MenuItem, Select, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { CXoneAcdClient, CXoneVoiceContact } from "@nice-devone/acd-sdk";
import { CXoneClient, VoiceControlService} from "@nice-devone/agent-sdk"
import { CXoneSdkError } from "@nice-devone/common-sdk";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CallEndIcon from "@mui/icons-material/CallEnd";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StopIcon from "@mui/icons-material/Stop";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CallMergeIcon from "@mui/icons-material/CallMerge";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import SearchIcon from "@mui/icons-material/Search";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";


const VoiceControls = ({voiceContact}:{voiceContact:CXoneVoiceContact}) => {
  const [holdeResume, setHoldeResume] = useState('Hold');
  const [hangUpButtonIsEnabled, setHangUpButtonIsEnabled] = useState(true);
  const [isRecordButtonVisible, setIsRecordButtonVisible] = useState(false);
  const [consultAgentId, setConsultAgentId] = useState('');
  const [isConsulting, setIsConsulting] = useState(false);

  // Conference participants list (mirrors CMA's `usersInConference: Participant[]`).
  // Built from voiceContactUpdateEvent so we always render every leg the agent has.
  // Keyed by contactID. Each entry is the latest CXoneVoiceContact instance for that leg,
  // which exposes .end() / .hold() / .resume() for per-leg control — same as CMA.
  const [participants, setParticipants] = useState<Record<string, CXoneVoiceContact>>({});

  // Outbound skills available to this agent. CMA reads these from
  // `CXoneClient.instance.directory.onUpdateSkillsEvent` and filters
  // isOutbound + typeId===PhoneCall + (strategy===Manual || SmartReach).
  // We must use one of these as `skillId` when calling dialPhone(), otherwise
  // the SDK rejects the request with `InvalidSkill`.
  const [outboundSkills, setOutboundSkills] = useState<Array<{ skillId: number; skillName: string }>>([]);
  const [selectedSkillId, setSelectedSkillId] = useState<string>('');

  // Debug tracker: tracks contacts that went to HOLDING
  const holdingContactsTracker = useRef<Map<string, { masterID: string; interactionId: string; timestamp: number }>>(new Map());

  // Tracks the most recent RECORDING STOPPED event per contactId so we can correlate
  // it with the next voice-contact transition (Hold vs Transfer vs Conference vs End).
  // reason='Hold'   → expect a follow-up classifying event (resume / transfer / conference)
  // reason='Policy' → normal call end; no follow-up classification needed.
  const lastRecordingStopRef = useRef<Map<string, { reason: string; timestamp: number }>>(new Map());

  // Flag: when true, auto-transfer as soon as consult leg becomes Active
  const pendingColdTransfer = useRef(false);

  // Flag: when true, auto-conference as soon as consult leg becomes Active
  const pendingConference = useRef(false);

  // Track the original (customer) leg so we only auto-complete on the NEW consult leg.
  // Without this guard the SDK rejects transferContact() with InvalidState because
  // the original leg's own "Active" event fires first.
  const originalContactIdRef = useRef<string>('');
  const originalMasterIdRef = useRef<string>('');

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

     // Subscribe to the agent's skills so we can pick a VALID outbound skillId
     // for dialPhone(). Mirrors CMA: see acdSessionEventMiddleware.ts subscribing to
     // CXoneClient.instance.directory.onUpdateSkillsEvent and filtering outbound phone skills.
     CXoneClient.instance.directory.onUpdateSkillsEvent.subscribe((skills: any) => {
       if (!Array.isArray(skills)) return;
       const outbound = skills
         .filter((s: any) => s?.isOutbound && (s?.typeId === 4 /* PhoneCall */) && (s?.strategy === 'Manual' || s?.strategy === 'SmartReach'))
         .map((s: any) => ({ skillId: s.skillId, skillName: s.skillName }));
       console.log('%c[OUTBOUND SKILLS] available outbound phone skills', 'color: #0088FF; font-weight: bold;', outbound);
       setOutboundSkills(outbound);
       setSelectedSkillId((prev) => prev || (outbound[0]?.skillId ? String(outbound[0].skillId) : ''));
     });
     // Trigger the fetch.
     try { CXoneClient.instance.directory.getAgentSkills(); } catch (e) { console.log('getAgentSkills failed:', e); }
     CXoneClient.instance.notification.onCXoneNotificationEvent.subscribe(
       (res) => {
         console.log("Notification received in recording", res);
         // Skip SDK error events (e.g. getEmbeddedPages failure)

         const recData = res as any;
         if (recData?.recordingId && recData?.status) {
           console.log('%c[RECORDING STATUS]', 'color: #FF6600; font-weight: bold;',
             `status=${recData.status}`,
             `reason=${recData.reason}`,
             `contactId=${recData.contactId}`,
             `recordingId=${recData.recordingId}`,
             `isRecording=${recData.isRecording}`,
             `timestamp=${recData.timestamp}`
           );
           // Remember every STOPPED event so the next voice-contact transition can be classified.
           if (recData.status === 'STOPPED' && recData.contactId) {
             lastRecordingStopRef.current.set(recData.contactId, {
               reason: recData.reason,
               timestamp: Date.now(),
             });
             if (recData.reason === 'Hold') {
               console.log('%c[RECORDING] ⏸ Recording STOPPED due to HOLD — awaiting next voice event to classify (Hold/Transfer/Conference)', 'color: #FFAA00; font-weight: bold;', `contactId=${recData.contactId}`);
             } else if (recData.reason === 'Policy') {
               console.log('%c[RECORDING] ⏹ Recording STOPPED due to POLICY — expecting normal call end', 'color: #888888; font-weight: bold;', `contactId=${recData.contactId}`);
             }
           }
           setIsRecordButtonVisible(recData.isRecording);
         } else {
           setIsRecordButtonVisible((res as any)?.isRecording);
         }
       },
     );

     // Recording status polling fallback - polls recording status via REST API.
     // NOTE: this hits /interaction-recording-management-service/.../get-recording-status which
     // returns 403 when the agent's role/tenant lacks the Interaction Recording entitlement.
     // Disable via REACT_APP_DISABLE_RECORDING_POLL=true if you don't have that permission in staging.
     const recordingPollDisabled = process.env.REACT_APP_DISABLE_RECORDING_POLL === 'true';
     CXoneAcdClient.instance.contactManager.voiceCallRecordServicePollingEvent.subscribe(
       (isVoiceContactActive: boolean) => {
         if (recordingPollDisabled) return;
         if (isVoiceContactActive) {
           CXoneClient.instance.notification.voiceRecordingStatusProvider.startVoiceRecordingStatusPolling();
         } else {
           CXoneClient.instance.notification.voiceRecordingStatusProvider.stopVoiceRecordingStatusPolling();
         }
       }
     );

     // Subscribe to voice contact events for hold/transfer/conference classification
     CXoneAcdClient.instance.contactManager.voiceContactUpdateEvent.subscribe(
       (cxoneContact: CXoneVoiceContact) => {
         console.log('%c[VOICE CONTACT]', 'color: #00AAFF; font-weight: bold;',
           `status=${cxoneContact.status}`,
           `contactID=${cxoneContact.contactID}`,
           `masterID=${cxoneContact.masterID}`,
           `interactionId=${cxoneContact.interactionId}`,
           `callType=${cxoneContact.callType}`,
           `finalState=${cxoneContact.finalState}`,
           `disconnectCode=${cxoneContact.disconnectCode}`
         );

         const contactStatus = cxoneContact.status?.toLowerCase();
         const tracker = holdingContactsTracker.current;

         // Maintain participants map: add/update on every non-terminal status, remove on disconnect.
         // This mirrors how CMA's slice rebuilds usersInConference from each voice event.
         setParticipants((prev) => {
           const next = { ...prev };
           if (contactStatus === 'disconnected') {
             delete next[cxoneContact.contactID];
           } else {
             next[cxoneContact.contactID] = cxoneContact;
           }
           return next;
         });

         // Only the NEW consult leg qualifies for auto-completion (different contactID,
         // same masterID as the original customer leg). This mirrors CMA's state guards
         // and prevents the SDK from rejecting transferContact() with InvalidState.
         const isNewConsultLeg =
           contactStatus === 'active' &&
           cxoneContact.contactID !== originalContactIdRef.current &&
           !!originalMasterIdRef.current &&
           cxoneContact.masterID === originalMasterIdRef.current;

         // Auto-transfer for cold transfer: when the NEW consult leg becomes Active, complete the transfer
         if (isNewConsultLeg && pendingColdTransfer.current) {
           console.log('%c[COLD TRANSFER] Consult leg connected (Active). Auto-completing transfer now...', 'color: #FF4400; font-weight: bold; font-size: 13px;', `contactID=${cxoneContact.contactID}`);
           pendingColdTransfer.current = false;
           CXoneAcdClient.instance.contactManager.voiceService.transferContact()
             .then(function() { console.log('%c[COLD TRANSFER] ✅ Transfer completed successfully', 'color: #00CC00; font-weight: bold; font-size: 13px;'); })
             .catch(function(err: any) { console.log('[COLD TRANSFER] Transfer error after consult connected:', err); });
         }

         // Auto-conference: when the NEW consult leg becomes Active, merge all parties
         if (isNewConsultLeg && pendingConference.current) {
           console.log('%c[AUTO CONFERENCE] Consult leg connected (Active). Auto-merging into conference now...', 'color: #AA00FF; font-weight: bold; font-size: 13px;', `contactID=${cxoneContact.contactID}`);
           pendingConference.current = false;
           CXoneAcdClient.instance.contactManager.voiceService.conferenceCall()
             .then(function() { console.log('%c[AUTO CONFERENCE] ✅ Conference started successfully', 'color: #00CC00; font-weight: bold; font-size: 13px;'); })
             .catch(function(err: any) { console.log('[AUTO CONFERENCE] Conference error after consult connected:', err); });
         }

         // Track when a contact goes to HOLDING
         if (contactStatus === 'holding') {
           tracker.set(cxoneContact.contactID, {
             masterID: cxoneContact.masterID,
             interactionId: cxoneContact.interactionId,
             timestamp: Date.now()
           });
           console.log('%c⏸ [HOLDING] Contact put on hold — tracking to classify next state change...', 'color: #FFAA00; font-weight: bold; font-size: 13px;', `contactID=${cxoneContact.contactID}`, `masterID=${cxoneContact.masterID}`);
         }

         // Classify what happened after HOLDING / a STOPPED-Hold recording event.
         // Decision matrix:
         //   STOPPED reason=Hold + same contactNo → ACTIVE                          → Genuine Hold
         //   STOPPED reason=Hold + same contactNo → DISCONNECTED + new contactNo
         //                                  same master & interactionId             → Transfer
         //   STOPPED reason=Hold + same contactNo → JOINED (same master/interaction) → Conference
         //   STOPPED reason=Hold + DISCONNECTED + new contactNo, different master   → Agent disconnected + unrelated new call
         //   STOPPED reason=Policy + DISCONNECTED, no new contact                   → Normal call end
         const recordingStopForThis = lastRecordingStopRef.current.get(cxoneContact.contactID);
         const wasHoldStopped = recordingStopForThis?.reason === 'Hold';
         const wasPolicyStopped = recordingStopForThis?.reason === 'Policy';

         if (contactStatus === 'active' && tracker.has(cxoneContact.contactID)) {
           // Same contactNo resumed → Genuine Hold
           console.log('%c✅ [GENUINE HOLD] Contact was HOLDING → now ACTIVE. Agent resumed. This is a GENUINE HOLD.', 'color: #00CC00; font-weight: bold; font-size: 13px;',
             `contactID=${cxoneContact.contactID}`, `masterID=${cxoneContact.masterID}`,
             wasHoldStopped ? '(matched STOPPED reason=Hold)' : '');
           // Genuine hold → recording will resume; do NOT reset the record button.
           tracker.delete(cxoneContact.contactID);
           lastRecordingStopRef.current.delete(cxoneContact.contactID);
         } else if (contactStatus === 'disconnected' && tracker.has(cxoneContact.contactID)) {
           // Same contactNo disconnected — wait to see if a new leg with same master/interaction follows.
           // Until that happens we can't tell Transfer apart from "agent disconnected".
           // The decision is finalized in the `active && !tracker.has(...)` branch below.
           console.log('%c🔄 [TRANSFER?] Held contact DISCONNECTED. Will confirm Transfer vs unrelated when next active leg arrives.', 'color: #FF8800; font-weight: bold; font-size: 13px;',
             `contactID=${cxoneContact.contactID}`, `masterID=${cxoneContact.masterID}`,
             `interactionId=${cxoneContact.interactionId}`,
             wasHoldStopped ? '(matched STOPPED reason=Hold)' : '');
           // Recording on the disconnected leg is gone either way.
           setIsRecordButtonVisible(false);
           // Keep the tracker entry so the new-leg branch can classify Transfer.
         } else if (contactStatus === 'joined' && tracker.has(cxoneContact.contactID)) {
           const heldData = tracker.get(cxoneContact.contactID)!;
           const sameMasterAndInteraction =
             cxoneContact.masterID === heldData.masterID &&
             cxoneContact.interactionId === heldData.interactionId;
           if (sameMasterAndInteraction) {
             console.log('%c🎙️ [CONFERENCE] Contact was HOLDING → now JOINED with same master & interaction — CONFERENCE.', 'color: #AA00FF; font-weight: bold; font-size: 13px;',
               `contactID=${cxoneContact.contactID}`, `masterID=${cxoneContact.masterID}`, `interactionId=${cxoneContact.interactionId}`,
               wasHoldStopped ? '(matched STOPPED reason=Hold)' : '');
           } else {
             console.log('%c[JOINED] Contact JOINED but master/interaction differ — not a same-call conference.', 'color: #AA00FF; font-weight: bold;', `contactID=${cxoneContact.contactID}`);
           }
           tracker.delete(cxoneContact.contactID);
           lastRecordingStopRef.current.delete(cxoneContact.contactID);
         } else if (contactStatus === 'active' && !tracker.has(cxoneContact.contactID)) {
           // A new ACTIVE leg arrived. Compare to any previously-held leg to classify
           // Transfer vs Agent-disconnected-+-unrelated-new-call.
           const entries = Array.from(tracker.entries());
           let matched = false;
           for (let i = 0; i < entries.length; i++) {
             const heldContactId = entries[i][0];
             const heldData = entries[i][1];
             const sameMaster = cxoneContact.masterID === heldData.masterID;
             const sameInteraction = cxoneContact.interactionId === heldData.interactionId;
             if (cxoneContact.contactID !== heldContactId && sameMaster && sameInteraction) {
               console.log('%c🔄 [TRANSFER CONFIRMED] New contact ACTIVE with SAME master & interaction — TRANSFER from held contact.', 'color: #FF4400; font-weight: bold; font-size: 13px;',
                 `newContactID=${cxoneContact.contactID}`, `masterID=${cxoneContact.masterID}`, `interactionId=${cxoneContact.interactionId}`,
                 `originalHeldContactID=${heldContactId}`,
                 wasHoldStopped ? '(matched STOPPED reason=Hold on held leg)' : '');
               // Recording belonged to the original held leg — reset for the new leg.
               setIsRecordButtonVisible(false);
               tracker.delete(heldContactId);
               lastRecordingStopRef.current.delete(heldContactId);
               matched = true;
               break;
             }
           }
           if (!matched && entries.length > 0) {
             // A held leg exists but the new ACTIVE contact has a different master/interaction.
             // → Agent disconnected + unrelated new call.
             console.log('%c⚠️ [AGENT DISCONNECTED + NEW CALL] Held leg ended; new ACTIVE contact has DIFFERENT master/interaction — unrelated call.', 'color: #CC0000; font-weight: bold; font-size: 13px;',
               `newContactID=${cxoneContact.contactID}`, `newMasterID=${cxoneContact.masterID}`, `newInteractionId=${cxoneContact.interactionId}`);
             // Clear stale held entries so the matrix doesn't keep matching against them.
             entries.forEach(([heldContactId]) => {
               tracker.delete(heldContactId);
               lastRecordingStopRef.current.delete(heldContactId);
             });
             setIsRecordButtonVisible(false);
           }
         } else if (contactStatus === 'disconnected' && !tracker.has(cxoneContact.contactID) && wasPolicyStopped) {
           // STOPPED reason=Policy → DISCONNECTED, no held leg, no new contact → Normal call end.
           console.log('%c📞 [NORMAL END] Recording STOPPED reason=Policy → contact DISCONNECTED. Call ended normally.', 'color: #888888; font-weight: bold; font-size: 13px;',
             `contactID=${cxoneContact.contactID}`);
           setIsRecordButtonVisible(false);
           lastRecordingStopRef.current.delete(cxoneContact.contactID);
         }
       }
     );
  },[])

  useEffect(() => {
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
      voiceControlService.recordCall(voiceContact.contactID).then((res)=>{ console.log(res) }).catch((err)=>{ console.log(err) })
    }

    const stopRecord=(e: React.MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault();
      const voiceControlService = new VoiceControlService();
      voiceControlService.stopCallRecording(voiceContact.contactID).then((res)=>{ console.log(res) }).catch((err)=>{ console.log(err) })
    }

    // Helper: detect if input is a phone number (10+ digits) vs agent ID (shorter number)
    const isPhoneNumber = (value: string) => value.replace(/\D/g, '').length >= 10;

    // Consult with another agent — mirrors CMA's holdAndAddAgentToConsult:
    // 1) hold the customer leg first (if active)
    // 2) call consultAgent() / dialPhone() on the now-held call
    const handleConsultAgent = async(e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!consultAgentId) {
        console.log('Please enter an Agent ID or phone number');
        return;
      }
      try {
        // STEP 1: hold the customer leg first — same as CMA's holdCall thunk.
        if (voiceContact.status === 'Active') {
          console.log('%c[CONSULT] Holding customer leg first...', 'color: #0088FF; font-weight: bold;');
          await voiceContact.hold();
          setHoldeResume('Resume');
        }

        // STEP 2: initiate consult on the held call
        if (isPhoneNumber(consultAgentId)) {
          if (!selectedSkillId) {
            console.log('%c[CONSULT] No outbound skill available — cannot dial phone.', 'color: #CC0000; font-weight: bold;');
            return;
          }
          // Phone number — use dialPhone (like CMA outbound options)
          console.log('%c[CONSULT] Dialing phone number for consult:', 'color: #0088FF; font-weight: bold;', consultAgentId, `skillId=${selectedSkillId}`);
          await CXoneAcdClient.instance.contactManager.voiceService.dialPhone({
            skillId: Number(selectedSkillId),
            phoneNumber: consultAgentId,
          } as any);
        } else {
          // Agent ID — use consultAgent
          console.log('%c[CONSULT] Initiating consult with agent (consultAgent):', 'color: #0088FF; font-weight: bold;', consultAgentId);
          await CXoneAcdClient.instance.contactManager.voiceService.consultAgent(Number(consultAgentId));
        }
        setIsConsulting(true);
        console.log('%c[CONSULT] Consult call initiated successfully — current call auto-held', 'color: #00CC00; font-weight: bold;');
      } catch (err) {
        console.log('Consult error:', err);
      }
    }

    // Cold transfer — mirrors CMA: hold the customer leg first, then dial the target,
    // then auto-complete with transferContact() when the NEW consult leg becomes Active.
    const handleColdTransfer = async(e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!consultAgentId) {
        console.log('Please enter an Agent ID or phone number');
        return;
      }
      try {
        // STEP 1: hold the active customer leg first. The SDK requires this before dial/transfer.
        if (voiceContact.status === 'Active') {
          console.log('%c[COLD TRANSFER] Holding customer leg first...', 'color: #FF8800; font-weight: bold;');
          await voiceContact.hold();
          setHoldeResume('Resume');
        }

        // Remember the original leg so the auto-complete listener only fires on the NEW leg.
        originalContactIdRef.current = voiceContact.contactID;
        originalMasterIdRef.current = voiceContact.masterID;
        pendingColdTransfer.current = true;

        // STEP 2: dial the transfer target
        console.log('%c[COLD TRANSFER] Dialing — will auto-transfer when connected...', 'color: #FF4400; font-weight: bold;', consultAgentId);
        if (isPhoneNumber(consultAgentId)) {
          if (!selectedSkillId) {
            pendingColdTransfer.current = false;
            console.log('%c[COLD TRANSFER] No outbound skill available — cannot dial phone.', 'color: #CC0000; font-weight: bold;');
            return;
          }
          await CXoneAcdClient.instance.contactManager.voiceService.dialPhone({
            skillId: Number(selectedSkillId),
            phoneNumber: consultAgentId,
          } as any);
        } else {
          await CXoneAcdClient.instance.contactManager.voiceService.dialAgent(consultAgentId, voiceContact.contactID);
        }
        console.log('%c[COLD TRANSFER] Dial initiated. Waiting for consult leg to become Active...', 'color: #FF8800; font-weight: bold;');
      } catch (err) {
        pendingColdTransfer.current = false;
        console.log('Cold transfer error:', err);
      }
    }

    // Transfer — if consulting, complete; if not, blind transfer (dial + auto-transfer)
    const handleTransfer = async(e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (isConsulting) {
        try {
          console.log('%c[TRANSFER] Completing transfer (consult active)...', 'color: #FF4400; font-weight: bold;');
          await CXoneAcdClient.instance.contactManager.voiceService.transferContact();
          setIsConsulting(false);
          console.log('%c[TRANSFER] Transfer completed successfully', 'color: #00CC00; font-weight: bold;');
        } catch (err) {
          console.log('Transfer error:', err);
        }
      } else {
        if (!consultAgentId) {
          console.log('Please enter an Agent ID or phone number');
          return;
        }
        try {
          // Hold customer leg first (CMA flow) so the SDK accepts transferContact() later.
          if (voiceContact.status === 'Active') {
            console.log('%c[BLIND TRANSFER] Holding customer leg first...', 'color: #FF8800; font-weight: bold;');
            await voiceContact.hold();
            setHoldeResume('Resume');
          }

          originalContactIdRef.current = voiceContact.contactID;
          originalMasterIdRef.current = voiceContact.masterID;
          pendingColdTransfer.current = true;

          console.log('%c[BLIND TRANSFER] Dialing — will auto-transfer when connected...', 'color: #FF4400; font-weight: bold;', consultAgentId);
          if (isPhoneNumber(consultAgentId)) {
            if (!selectedSkillId) {
              pendingColdTransfer.current = false;
              console.log('%c[BLIND TRANSFER] No outbound skill available — cannot dial phone.', 'color: #CC0000; font-weight: bold;');
              return;
            }
            await CXoneAcdClient.instance.contactManager.voiceService.dialPhone({
              skillId: Number(selectedSkillId),
              phoneNumber: consultAgentId,
            } as any);
          } else {
            await CXoneAcdClient.instance.contactManager.voiceService.dialAgent(consultAgentId, voiceContact.contactID);
          }
          console.log('%c[BLIND TRANSFER] Dial initiated. Waiting for consult leg...', 'color: #FF8800; font-weight: bold;');
        } catch (err) {
          pendingColdTransfer.current = false;
          console.log('Blind transfer error:', err);
        }
      }
    }

    // Conference — if consulting, merge; if not, dial + auto-conference
    const handleConference = async(e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (isConsulting) {
        try {
          console.log('%c[CONFERENCE] Merging calls into conference...', 'color: #AA00FF; font-weight: bold;');
          await CXoneAcdClient.instance.contactManager.voiceService.conferenceCall();
          setIsConsulting(false);
          console.log('%c[CONFERENCE] Conference started successfully', 'color: #00CC00; font-weight: bold;');
        } catch (err) {
          console.log('Conference error:', err);
        }
      } else {
        if (!consultAgentId) {
          console.log('Please enter an Agent ID or phone number');
          return;
        }
        try {
          // Hold customer leg first (CMA flow) so the SDK accepts conferenceCall() later.
          if (voiceContact.status === 'Active') {
            console.log('%c[AUTO CONFERENCE] Holding customer leg first...', 'color: #AA00FF; font-weight: bold;');
            await voiceContact.hold();
            setHoldeResume('Resume');
          }

          originalContactIdRef.current = voiceContact.contactID;
          originalMasterIdRef.current = voiceContact.masterID;
          pendingConference.current = true;

          console.log('%c[AUTO CONFERENCE] Dialing — will auto-conference when connected...', 'color: #AA00FF; font-weight: bold;', consultAgentId);
          if (isPhoneNumber(consultAgentId)) {
            if (!selectedSkillId) {
              pendingConference.current = false;
              console.log('%c[AUTO CONFERENCE] No outbound skill available — cannot dial phone.', 'color: #CC0000; font-weight: bold;');
              return;
            }
            await CXoneAcdClient.instance.contactManager.voiceService.dialPhone({
              skillId: Number(selectedSkillId),
              phoneNumber: consultAgentId,
            } as any);
          } else {
            await CXoneAcdClient.instance.contactManager.voiceService.dialAgent(consultAgentId, voiceContact.contactID);
          }
          console.log('%c[AUTO CONFERENCE] Dial initiated. Waiting for consult leg...', 'color: #AA00FF; font-weight: bold;');
        } catch (err) {
          pendingConference.current = false;
          console.log('Auto conference error:', err);
        }
      }
    }

  return (
    <Box>
      {/* Basic Voice Controls */}
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
          // disabled={!isRecordButtonVisible}
          startIcon={<StopIcon />}
        >
          Stop Record
        </Button>
      </Stack>

      {/* Transfer & Conference — CMA Directory Style */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Directory
      </Typography>

      {/* Outbound skill picker — required when dialing a phone number.
          Mirrors CMA: phoneCallOBSkillsAssigned (Manual / SmartReach) skills only. */}
      <FormControl size="small" fullWidth sx={{ mb: 1.5 }} disabled={outboundSkills.length === 0}>
        <InputLabel id="outbound-skill-label">Outbound skill</InputLabel>
        <Select
          labelId="outbound-skill-label"
          label="Outbound skill"
          value={selectedSkillId}
          onChange={(e) => setSelectedSkillId(String(e.target.value))}
        >
          {outboundSkills.length === 0 && (
            <MenuItem value=""><em>No outbound skill assigned</em></MenuItem>
          )}
          {outboundSkills.map((s) => (
            <MenuItem key={s.skillId} value={String(s.skillId)}>
              {s.skillName} ({s.skillId})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Search-style input like CMA directory search */}
      <TextField
        size="small"
        placeholder="Search agent ID or phone number..."
        value={consultAgentId}
        onChange={(e) => setConsultAgentId(e.target.value)}
        fullWidth
        sx={{ mb: 1.5 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Outbound row — like CMA's CcfOutboundOptions: shows typed number with action icons.
          Initially only Consult + Cold Transfer are shown. Transfer-complete and Conference (merge)
          become available only AFTER a consult has been established (mirrors CMA's call-conference panel). */}
      {consultAgentId && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, mb: 1, bgcolor: 'action.hover', borderRadius: 1 }}>
          <PhoneForwardedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          <Typography variant="body2" sx={{ flex: 1, fontWeight: 500 }}>
            Outbound: {consultAgentId}
          </Typography>

          {/* Initial state — not yet consulting */}
          {!isConsulting && (
            <>
              <Tooltip title="Consult (warm transfer)">
                <IconButton size="small" color="info" onClick={handleConsultAgent}>
                  <PersonAddIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cold Transfer">
                <IconButton size="small" color="error" onClick={handleColdTransfer}>
                  <CallSplitIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}

          {/* After Consult is active — Complete Transfer + Conference (Merge) become available */}
          {isConsulting && (
            <>
              <Tooltip title="Complete Transfer">
                <IconButton size="small" color="warning" onClick={handleTransfer}>
                  <SwapHorizIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Conference (Merge)">
                <IconButton size="small" color="secondary" onClick={handleConference}>
                  <CallMergeIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      )}

      {/* Status indicator when consult is active */}
      {isConsulting && (
        <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600 }}>
          Consulting... Click Transfer or Conference to complete.
        </Typography>
      )}

      {/* Conference / Consult Participants — mirrors CMA's UsersInConference */}
      {Object.keys(participants).length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Participants ({Object.keys(participants).length})
          </Typography>
          <List dense disablePadding sx={{ bgcolor: 'background.paper', borderRadius: 1, border: 1, borderColor: 'divider' }}>
            {Object.values(participants).map((p) => {
              const status = (p.status || '').toString();
              const isHolding = status.toLowerCase() === 'holding';
              const isActive = status.toLowerCase() === 'active' || status.toLowerCase() === 'joined';
              const isDialing = status.toLowerCase() === 'dialing';
              const isAgent = (p as any).callType === 'inbound' ? false : !!(p as any).agentId || (p as any).skill === '0';
              const isInbound = !!(p as any).isInbound;
              const label = (p as any).ani || (p as any).dnis || p.contactID;
              const subtitle = `${status} · ${(p as any).callType || ''} · contactID=${p.contactID}`;
              const chipColor: 'success' | 'warning' | 'info' | 'default' =
                isActive ? 'success' : isHolding ? 'warning' : isDialing ? 'info' : 'default';

              const handleParticipantHold = async () => {
                try {
                  if (isActive) {
                    await p.hold();
                  } else if (isHolding) {
                    await p.resume();
                  }
                } catch (err) {
                  console.log('Participant hold/resume error:', err);
                }
              };

              const handleParticipantHangUp = async () => {
                try {
                  // Per-leg hang up — same as CMA's endTheVoiceContact(user.contact) -> callContact.end()
                  await p.end();
                } catch (err) {
                  console.log('Participant hang-up error:', err);
                }
              };

              return (
                <ListItem key={p.contactID} divider>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: isAgent ? 'primary.main' : isInbound ? 'success.main' : 'secondary.main', width: 32, height: 32 }}>
                      {isAgent ? <SupportAgentIcon fontSize="small" /> : isInbound ? <PhoneIcon fontSize="small" /> : <PersonIcon fontSize="small" />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{label}</Typography>
                        <Chip size="small" label={status} color={chipColor} variant="outlined" />
                      </Stack>
                    }
                    secondary={<Typography variant="caption" sx={{ color: 'text.secondary' }}>{subtitle}</Typography>}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title={isHolding ? 'Resume' : 'Hold'}>
                      <span>
                        <IconButton size="small" color="warning" onClick={handleParticipantHold} disabled={!isActive && !isHolding}>
                          {isHolding ? <PlayArrowIcon fontSize="small" /> : <PauseIcon fontSize="small" />}
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Hang up this participant">
                      <IconButton size="small" color="error" onClick={handleParticipantHangUp}>
                        <CallEndIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </>
      )}
    </Box>
  );
};
export default VoiceControls;
