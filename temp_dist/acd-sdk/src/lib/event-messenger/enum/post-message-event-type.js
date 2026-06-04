export var EventMessageType;
(function (EventMessageType) {
    EventMessageType["REGISTER_FOR_CLIENT_EVENTS"] = "RegisterForClientEvents";
    EventMessageType["UNREGISTER_FOR_CLIENT_EVENTS"] = "UnregisterFromClientEvents";
    EventMessageType["CONTACT_CARD_DATA"] = "ContactCardData";
    EventMessageType["ANSWER_EVENT"] = "AnswerEvent";
    EventMessageType["REFUSE_EVENT"] = "RefuseEvent";
    EventMessageType["HOLD_EVENT"] = "HoldEvent";
    EventMessageType["MUTE_EVENT"] = "MuteEvent";
    EventMessageType["MASK_EVENT"] = "MaskEvent";
    EventMessageType["RECORD_EVENT"] = "RecordEvent";
    EventMessageType["HANGUP_EVENT"] = "HangupEvent";
    EventMessageType["NAIA_NOTIFICATION_EVENT"] = "NaiaNotificationEvent";
    EventMessageType["NAIA_OVERALL_SENTIMENT_EVENT"] = "NaiaOverallSentimentEvent";
    EventMessageType["TOTAL_CONTACT_COUNT"] = "TotalContactCount";
    EventMessageType["NOTIFICATION_NEWCONTACT"] = "Notification_newContact";
    EventMessageType["NOTIFICATION_NEWMESSAGE"] = "Notification_newMessage";
    EventMessageType["SESSION_INFO"] = "SessionInfo";
})(EventMessageType || (EventMessageType = {}));
export var EventSubscriptionType;
(function (EventSubscriptionType) {
    EventSubscriptionType["ALL"] = "all";
    EventSubscriptionType["AGENT"] = "agent";
    EventSubscriptionType["CONTACT_BY_ID"] = "contact";
    EventSubscriptionType["ALL_CONTACTS"] = "contacts";
    EventSubscriptionType["SESSION_INFO"] = "sessioninfo";
    EventSubscriptionType["AGENT_ASSIST"] = "agentassist";
})(EventSubscriptionType || (EventSubscriptionType = {}));
//# sourceMappingURL=post-message-event-type.js.map