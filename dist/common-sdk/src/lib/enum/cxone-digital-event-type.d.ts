export declare enum CXoneDigitalEventType {
    /**
     * @remarks - actual websocket event type for case inbox assignee changed.
     */
    CASE_INBOX_ASSIGNEE_CHANGED = "CaseInboxAssigneeChanged",
    /**
     * @remarks - actual websocket event type for case status changed.
    */
    CASE_STATUS_CHANGED = "CaseStatusChanged",
    /**
     * @remarks - actual websocket event type for message added into case.
    */
    MESSAGE_ADDED_INTO_CASE = "MessageAddedIntoCase",
    /**
    * @remarks - event type to publish to UI for assigned cases(Not websocket event).
    */
    CASE_INBOX_ASSIGNED = "CaseInboxAssigned",
    /**
     * @remarks - event type to publish to UI for unassigned cases(Not websocket event).
     */
    CASE_INBOX_UNASSIGNED = "CaseInboxUnassigned",
    /**
     * @remarks - websocket event for message created.
     */
    MESSAGE_CREATED = "MessageCreated",
    /**
    * @remarks - websocket event type to publish to UI for message note created.
    */
    MESSAGE_NOTE_CREATED = "MessageNoteCreated",
    /**
    * @remarks - websocket event type to publish to UI for message note deletion.
    */
    MESSAGE_NOTE_DELETED = "MessageNoteDeleted",
    /**
    * @remarks - websocket event type to publish to UI for message note updated.
    */
    MESSAGE_NOTE_UPDATED = "MessageNoteUpdated",
    /**
 * @remarks - websocket event type to publish to UI for message tag is updated.
 */
    MESSAGE_UPDATED = "MessageUpdated",
    /**
    * @remarks - websocket event type to publish to UI for Sender typing started.
    */
    SENDER_TYPING_START = "SenderTypingStarted",
    /**
    * @remarks - websocket event type to publish to UI for Sender typing end.
    */
    SENDER_TYPING_END = "SenderTypingEnded",
    /**
    * @remarks - websocket event type to publish to UI for message preview
    */
    MESSAGE_PREVIEW = "MessagePreviewCreated",
    /**
    * @remarks - websocket event type to publish to UI for message delivery status changed
    */
    MESSAGE_DELIVERY_STATUS_CHANGED = "MessageDeliveryStatusChanged",
    /**
    * @remarks - websocket event type to publish to UI for message seen changed
    */
    MESSAGE_SEEN_CHANGED = "MessageSeenChanged",
    /**
    * @remarks - websocket event type to publish to UI for message seen changed
    */
    CONVERSATIONS_AVAILABILITY = "Availability"
}
