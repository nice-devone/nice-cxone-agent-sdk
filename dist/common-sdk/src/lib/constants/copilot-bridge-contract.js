"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgeMessageType = exports.ContactStatus = exports.AssignmentStatus = exports.CXAGENT_COPILOT_BRIDGE_CHANNEL = void 0;
exports.CXAGENT_COPILOT_BRIDGE_CHANNEL = 'cxagent-copilot-bridge';
/**
 * Inbox assignment state of a contact, broadcast to the Copilot MFE on CONTACT_STATUS_CHANGED.
 *
 * These values come from the inbox assignment events
 * `CXoneDigitalEventType.CASE_INBOX_ASSIGNED` / `CASE_INBOX_UNASSIGNED` and have no
 * `DigitalContactStatus` equivalent, so they are kept apart from the lifecycle vocabulary in
 * `ContactStatus` rather than mixed into one enum.
 */
var AssignmentStatus;
(function (AssignmentStatus) {
    /**
     * The contact has been assigned to the agent's inbox. The MFE should display the contact's cards.
     */
    AssignmentStatus["ASSIGNED"] = "assigned";
    /**
     * The contact has been unassigned from the agent's inbox. The MFE should clear the contact's cards.
     */
    AssignmentStatus["UNASSIGNED"] = "unassigned";
})(AssignmentStatus = exports.AssignmentStatus || (exports.AssignmentStatus = {}));
/**
 * Terminal lifecycle status of a contact, broadcast to the Copilot MFE on CONTACT_STATUS_CHANGED.
 *
 * Both values deliberately match the `DigitalContactStatus` values of the same name, so a raw
 * `digitalContact.status` maps across directly.
 *
 * Both are terminal — receiving either is what triggers auto final-summary generation inside the
 * MFE, replacing the explicit GENERATE_SUMMARY message.
 */
var ContactStatus;
(function (ContactStatus) {
    /**
     * The contact has been resolved. The MFE should generate a final summary and clear the contact's cards.
     */
    ContactStatus["RESOLVED"] = "resolved";
    /**
     * The contact has been closed. The MFE should generate a final summary and clear the contact's cards.
     */
    ContactStatus["CLOSED"] = "closed";
})(ContactStatus = exports.ContactStatus || (exports.ContactStatus = {}));
var BridgeMessageType;
(function (BridgeMessageType) {
    // CXAgent → MFE
    /**
     * Handshake message sent by CXAgent to the Copilot MFE on bridge activation. The payload carries
     */
    BridgeMessageType["CXAGENT_READY"] = "CXAGENT_READY";
    /**
     * Sent by CXAgent to the Copilot MFE when a contact's status changes. The payload carries the
     * contactId and the new status. The MFE switches on `status` rather than on `type`.
     */
    BridgeMessageType["CONTACT_STATUS_CHANGED"] = "CONTACT_STATUS_CHANGED";
    /**
     * Sent by CXAgent to the Copilot MFE when the agent's leader state changes. The payload carries
     * the new leader state.
     */
    BridgeMessageType["LEADER_CHANGED"] = "LEADER_CHANGED";
    /**
     * Sent by CXAgent to the Copilot MFE when a text insert operation succeeds. The payload carries
     * the contactId of the contact for which it succeeded.
     */
    BridgeMessageType["INSERT_SUCCESS"] = "INSERT_SUCCESS";
    /**
     * Sent by CXAgent to the Copilot MFE when a text insert operation fails. The payload carries
     * the contactId of the contact for which it failed; the cause is logged host-side.
     */
    BridgeMessageType["INSERT_FAILED"] = "INSERT_FAILED";
    /**
     * Sent by CXAgent to the Copilot MFE when a reply send operation succeeds. The payload carries the contactId of the contact for which it succeeded.
     */
    BridgeMessageType["SEND_SUCCESS"] = "SEND_SUCCESS";
    /**
     * Sent by CXAgent to the Copilot MFE when a reply send operation fails. The payload carries
     * the contactId of the contact for which it failed; the cause is logged host-side.
     */
    BridgeMessageType["SEND_FAILED"] = "SEND_FAILED";
    /**
     * Sent by CXAgent to the Copilot MFE when the host's email reply editor opens or closes for a
     * contact, so the MFE can show or hide the contact's topic suggestion cards. The payload
     * carries the contactId and whether the suggestion cards should be shown.
     */
    BridgeMessageType["CONTACT_SUGGESTION_CARDS"] = "CONTACT_SUGGESTION_CARDS";
    /**
     * Sent by CXAgent to the Copilot MFE when the agent edits the auto-summary text from the
     * outcome (disposition) panel and saves it. The payload carries the contactId and the edited
     * summary text; the MFE updates its own FINAL_SUMMARY_NOTES card to match, mirroring what the
     * coupled/native copilot already does in the same process via `updateAutoSummaryCard`.
     */
    BridgeMessageType["CONTACT_FINAL_SUMMARY_UPDATED"] = "CONTACT_FINAL_SUMMARY_UPDATED";
    // MFE → CXAgent
    /**
     * Handshake message sent by the Copilot MFE to CXAgent on bridge activation. The payload is empty.
     */
    BridgeMessageType["MFE_READY"] = "MFE_READY";
    /**
     * Sent by the Copilot MFE to CXAgent when the agent requests a text insert operation. The payload
     * carries the contactId and the text to insert.
     */
    BridgeMessageType["CONTACT_MESSAGE_INSERT"] = "contact_message_insert";
    /**
     * Sent by the Copilot MFE to CXAgent when the agent requests a reply send operation. The payload carries the contactId and the text to send.
     */
    BridgeMessageType["CONTACT_MESSAGE_SEND"] = "contact_message_send";
    /**
     * Sent by the Copilot MFE to CXAgent when a final summary has been generated. The payload carries
     * the contactId and the generated summary text.
     */
    BridgeMessageType["CONTACT_FINAL_SUMMARY"] = "contact_final_summary";
    /**
     * Sent by the Copilot MFE to CXAgent when it starts or finishes a generation operation (e.g.
     * email draft generation) that should block the host's editor for the duration. Deliberately
     * generic — carries only a contactId and a busy flag — so any future MFE-driven generation flow
     * can reuse it instead of adding its own dedicated message.
     */
    BridgeMessageType["CONTACT_EDITOR_BUSY"] = "contact_editor_busy";
})(BridgeMessageType = exports.BridgeMessageType || (exports.BridgeMessageType = {}));
//# sourceMappingURL=copilot-bridge-contract.js.map