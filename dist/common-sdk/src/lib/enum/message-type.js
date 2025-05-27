"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageType = void 0;
/**
 * Message type to be used while posting data on broadcast channel
 */
var MessageType;
(function (MessageType) {
    MessageType["AUTHENTICATION_RESPONSE"] = "AuthenticationResponse";
    MessageType["GET_NEXT_EVENT_RESPONSE"] = "GetNextEventResponse";
    MessageType["START_SESSION"] = "StartSession";
    MessageType["JOIN_SESSION"] = "JoinSession";
    MessageType["END_SESSION"] = "EndSession";
    MessageType["SKILL_ACTIVITY_POLLING"] = "SkillActivityPolling";
    MessageType["TERMINATE_SKILL_ACTIVITY_POLLING"] = "TerminateSkillActivityPolling";
    MessageType["SKILL_ACTIVITY_POLLING_RESPONSE"] = "SkillActivityPollingResponse";
    MessageType["DIRECTORY_POLLING"] = "DirectoryPolling";
    MessageType["TERMINATE_DIRECTORY_POLLING"] = "TerminateDirectoryPolling";
    MessageType["DIRECTORY_POLLING_RESPONSE"] = "DirectoryPollingResponse";
    MessageType["AGENT_QUEUE_POLLING"] = "AgentQueuePolling";
    MessageType["TERMINATE_AGENT_QUEUE_POLLING"] = "TerminateAgentQueuePolling";
    MessageType["AGENT_QUEUE_POLLING_RESPONSE"] = "AgentQueuePollingResponse";
    MessageType["AGENT_QUEUE_DETAILS_POLLING_RESPONSE"] = "AgentQueueDetailsPollingResponse";
    MessageType["WEM_NOTIFICATION_START_POLLING"] = "WemNotificationStartPolling";
    MessageType["TERMINATE_WEM_NOTIFICATION_POLLING"] = "TerminateWemNotificationPolling";
    MessageType["WEM_NOTIFICATION_POLLING_RESPONSE"] = "WemNotificationPollingResponse";
    MessageType["DIGITAL_WEBSOCKET_RESPONSE"] = "DigitalWebsocketResponse";
    MessageType["DYNAMIC_DIRECTORY_SEARCH"] = "DynamicDirectorySearch";
    MessageType["END_DYNAMIC_DIRECTORY_SEARCH"] = "EndDynamicDirectorySearch";
    MessageType["DYNAMIC_DIRECTORY_SEARCH_RESPONSE"] = "DynamicDirectorySearchResponse";
    MessageType["TERMINATE_CXONE_UTIL_WORKER"] = "TerminateCXoneUtilWorker";
    MessageType["JOIN_SESSION_FOR_NON_LEADER"] = "JoinSessionForNonLeader";
    MessageType["WEM_NOTIFICATION_ACK"] = "WemNotificationAck";
    MessageType["RESTART_DIRECTORY_POLLING"] = "RestartDirectoryPolling";
    MessageType["RESTART_SKILL_ACTIVITY_POLLING"] = "RestartSkillActivityPolling";
    MessageType["ACD_NOTIFICATION_ACK"] = "ACDNotificationAck";
    MessageType["AUTO_SUMMARY_RESPONSE"] = "AutoSummaryResponse";
    MessageType["AUTO_SUMMARY_NOTIFICATION_RESPONSE"] = "AutoSummaryNotificationResponse";
    MessageType["AGENT_COPILOT_RESPONSE"] = "AgentCopilotResponse";
    MessageType["UI_QUEUE_EVENT_RESPONSE"] = "UIQueueEventResponse";
    MessageType["AGENT_ASSIST_WS_RESPONSE"] = "AgentAssistWSResponse";
    MessageType["VOICE_BIO_HUB_RESPONSE"] = "VoiceBioHubResponse";
    MessageType["START_USER_SLOT_API_POLLING"] = "startUserSlotApiPolling";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
//# sourceMappingURL=message-type.js.map