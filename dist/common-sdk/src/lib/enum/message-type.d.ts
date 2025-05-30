/**
 * Message type to be used while posting data on broadcast channel
 */
export declare enum MessageType {
    AUTHENTICATION_RESPONSE = "AuthenticationResponse",
    GET_NEXT_EVENT_RESPONSE = "GetNextEventResponse",
    START_SESSION = "StartSession",
    JOIN_SESSION = "JoinSession",
    END_SESSION = "EndSession",
    SKILL_ACTIVITY_POLLING = "SkillActivityPolling",
    TERMINATE_SKILL_ACTIVITY_POLLING = "TerminateSkillActivityPolling",
    SKILL_ACTIVITY_POLLING_RESPONSE = "SkillActivityPollingResponse",
    DIRECTORY_POLLING = "DirectoryPolling",
    TERMINATE_DIRECTORY_POLLING = "TerminateDirectoryPolling",
    DIRECTORY_POLLING_RESPONSE = "DirectoryPollingResponse",
    AGENT_QUEUE_POLLING = "AgentQueuePolling",
    TERMINATE_AGENT_QUEUE_POLLING = "TerminateAgentQueuePolling",
    AGENT_QUEUE_POLLING_RESPONSE = "AgentQueuePollingResponse",
    AGENT_QUEUE_DETAILS_POLLING_RESPONSE = "AgentQueueDetailsPollingResponse",
    WEM_NOTIFICATION_START_POLLING = "WemNotificationStartPolling",
    TERMINATE_WEM_NOTIFICATION_POLLING = "TerminateWemNotificationPolling",
    WEM_NOTIFICATION_POLLING_RESPONSE = "WemNotificationPollingResponse",
    DIGITAL_WEBSOCKET_RESPONSE = "DigitalWebsocketResponse",
    DYNAMIC_DIRECTORY_SEARCH = "DynamicDirectorySearch",
    END_DYNAMIC_DIRECTORY_SEARCH = "EndDynamicDirectorySearch",
    DYNAMIC_DIRECTORY_SEARCH_RESPONSE = "DynamicDirectorySearchResponse",
    TERMINATE_CXONE_UTIL_WORKER = "TerminateCXoneUtilWorker",
    JOIN_SESSION_FOR_NON_LEADER = "JoinSessionForNonLeader",
    WEM_NOTIFICATION_ACK = "WemNotificationAck",
    RESTART_DIRECTORY_POLLING = "RestartDirectoryPolling",
    RESTART_SKILL_ACTIVITY_POLLING = "RestartSkillActivityPolling",
    ACD_NOTIFICATION_ACK = "ACDNotificationAck",
    AUTO_SUMMARY_RESPONSE = "AutoSummaryResponse",
    AUTO_SUMMARY_NOTIFICATION_RESPONSE = "AutoSummaryNotificationResponse",
    AGENT_COPILOT_RESPONSE = "AgentCopilotResponse",
    UI_QUEUE_EVENT_RESPONSE = "UIQueueEventResponse",
    AGENT_ASSIST_WS_RESPONSE = "AgentAssistWSResponse",
    VOICE_BIO_HUB_RESPONSE = "VoiceBioHubResponse",
    START_USER_SLOT_API_POLLING = "startUserSlotApiPolling"
}
