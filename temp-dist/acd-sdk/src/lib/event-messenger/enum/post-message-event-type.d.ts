export declare enum EventMessageType {
    REGISTER_FOR_CLIENT_EVENTS = "RegisterForClientEvents",
    UNREGISTER_FOR_CLIENT_EVENTS = "UnregisterFromClientEvents",
    CONTACT_CARD_DATA = "ContactCardData",
    ANSWER_EVENT = "AnswerEvent",
    REFUSE_EVENT = "RefuseEvent",
    HOLD_EVENT = "HoldEvent",
    MUTE_EVENT = "MuteEvent",
    MASK_EVENT = "MaskEvent",
    RECORD_EVENT = "RecordEvent",
    HANGUP_EVENT = "HangupEvent",
    NAIA_NOTIFICATION_EVENT = "NaiaNotificationEvent",
    NAIA_OVERALL_SENTIMENT_EVENT = "NaiaOverallSentimentEvent",
    TOTAL_CONTACT_COUNT = "TotalContactCount",
    NOTIFICATION_NEWCONTACT = "Notification_newContact",
    NOTIFICATION_NEWMESSAGE = "Notification_newMessage",
    SESSION_INFO = "SessionInfo"
}
export declare enum EventSubscriptionType {
    ALL = "all",
    AGENT = "agent",
    CONTACT_BY_ID = "contact",
    ALL_CONTACTS = "contacts",
    SESSION_INFO = "sessioninfo",
    AGENT_ASSIST = "agentassist"
}
