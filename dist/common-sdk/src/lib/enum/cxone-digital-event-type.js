"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneDigitalEventType = void 0;
var CXoneDigitalEventType;
(function (CXoneDigitalEventType) {
    /**
     * @remarks - actual websocket event type for case inbox assignee changed.
     */
    CXoneDigitalEventType["CASE_INBOX_ASSIGNEE_CHANGED"] = "CaseInboxAssigneeChanged";
    /**
     * @remarks - actual websocket event type for case status changed.
    */
    CXoneDigitalEventType["CASE_STATUS_CHANGED"] = "CaseStatusChanged";
    /**
     * @remarks - actual websocket event type for message added into case.
    */
    CXoneDigitalEventType["MESSAGE_ADDED_INTO_CASE"] = "MessageAddedIntoCase";
    /**
    * @remarks - event type to publish to UI for assigned cases(Not websocket event).
    */
    CXoneDigitalEventType["CASE_INBOX_ASSIGNED"] = "CaseInboxAssigned";
    /**
     * @remarks - event type to publish to UI for unassigned cases(Not websocket event).
     */
    CXoneDigitalEventType["CASE_INBOX_UNASSIGNED"] = "CaseInboxUnassigned";
    /**
     * @remarks - websocket event for message created.
     */
    CXoneDigitalEventType["MESSAGE_CREATED"] = "MessageCreated";
    /**
    * @remarks - websocket event type to publish to UI for message note created.
    */
    CXoneDigitalEventType["MESSAGE_NOTE_CREATED"] = "MessageNoteCreated";
    /**
    * @remarks - websocket event type to publish to UI for message note deletion.
    */
    CXoneDigitalEventType["MESSAGE_NOTE_DELETED"] = "MessageNoteDeleted";
    /**
    * @remarks - websocket event type to publish to UI for message note updated.
    */
    CXoneDigitalEventType["MESSAGE_NOTE_UPDATED"] = "MessageNoteUpdated";
    /**
 * @remarks - websocket event type to publish to UI for message tag is updated.
 */
    CXoneDigitalEventType["MESSAGE_UPDATED"] = "MessageUpdated";
    /**
    * @remarks - websocket event type to publish to UI for Sender typing started.
    */
    CXoneDigitalEventType["SENDER_TYPING_START"] = "SenderTypingStarted";
    /**
    * @remarks - websocket event type to publish to UI for Sender typing end.
    */
    CXoneDigitalEventType["SENDER_TYPING_END"] = "SenderTypingEnded";
    /**
    * @remarks - websocket event type to publish to UI for message preview
    */
    CXoneDigitalEventType["MESSAGE_PREVIEW"] = "MessagePreviewCreated";
    /**
    * @remarks - websocket event type to publish to UI for message delivery status changed
    */
    CXoneDigitalEventType["MESSAGE_DELIVERY_STATUS_CHANGED"] = "MessageDeliveryStatusChanged";
    /**
    * @remarks - websocket event type to publish to UI for message seen changed
    */
    CXoneDigitalEventType["MESSAGE_SEEN_CHANGED"] = "MessageSeenChanged";
})(CXoneDigitalEventType = exports.CXoneDigitalEventType || (exports.CXoneDigitalEventType = {}));
//# sourceMappingURL=cxone-digital-event-type.js.map