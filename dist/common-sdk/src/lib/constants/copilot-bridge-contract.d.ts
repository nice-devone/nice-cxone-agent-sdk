import { AuthToken } from '../model/authenticate/auth-token';
export declare const CXAGENT_COPILOT_BRIDGE_CHANNEL = "cxagent-copilot-bridge";
/**
 * Inbox assignment state of a contact, broadcast to the Copilot MFE on CONTACT_STATUS_CHANGED.
 *
 * These values come from the inbox assignment events
 * `CXoneDigitalEventType.CASE_INBOX_ASSIGNED` / `CASE_INBOX_UNASSIGNED` and have no
 * `DigitalContactStatus` equivalent, so they are kept apart from the lifecycle vocabulary in
 * `ContactStatus` rather than mixed into one enum.
 */
export declare enum AssignmentStatus {
    /**
     * The contact has been assigned to the agent's inbox. The MFE should display the contact's cards.
     */
    ASSIGNED = "assigned",
    /**
     * The contact has been unassigned from the agent's inbox. The MFE should clear the contact's cards.
     */
    UNASSIGNED = "unassigned"
}
/**
 * Terminal lifecycle status of a contact, broadcast to the Copilot MFE on CONTACT_STATUS_CHANGED.
 *
 * Both values deliberately match the `DigitalContactStatus` values of the same name, so a raw
 * `digitalContact.status` maps across directly.
 *
 * Both are terminal — receiving either is what triggers auto final-summary generation inside the
 * MFE, replacing the explicit GENERATE_SUMMARY message.
 */
export declare enum ContactStatus {
    /**
     * The contact has been resolved. The MFE should generate a final summary and clear the contact's cards.
     */
    RESOLVED = "resolved",
    /**
     * The contact has been closed. The MFE should generate a final summary and clear the contact's cards.
     */
    CLOSED = "closed"
}
export declare enum BridgeMessageType {
    /**
     * Handshake message sent by CXAgent to the Copilot MFE on bridge activation. The payload carries
     */
    CXAGENT_READY = "CXAGENT_READY",
    /**
     * Sent by CXAgent to the Copilot MFE when a contact's status changes. The payload carries the
     * contactId and the new status. The MFE switches on `status` rather than on `type`.
     */
    CONTACT_STATUS_CHANGED = "CONTACT_STATUS_CHANGED",
    /**
     * Sent by CXAgent to the Copilot MFE when the agent's leader state changes. The payload carries
     * the new leader state.
     */
    LEADER_CHANGED = "LEADER_CHANGED",
    /**
     * Sent by CXAgent to the Copilot MFE when a text insert operation succeeds. The payload carries
     * the contactId of the contact for which it succeeded.
     */
    INSERT_SUCCESS = "INSERT_SUCCESS",
    /**
     * Sent by CXAgent to the Copilot MFE when a text insert operation fails. The payload carries
     * the contactId of the contact for which it failed; the cause is logged host-side.
     */
    INSERT_FAILED = "INSERT_FAILED",
    /**
     * Sent by CXAgent to the Copilot MFE when a reply send operation succeeds. The payload carries the contactId of the contact for which it succeeded.
     */
    SEND_SUCCESS = "SEND_SUCCESS",
    /**
     * Sent by CXAgent to the Copilot MFE when a reply send operation fails. The payload carries
     * the contactId of the contact for which it failed; the cause is logged host-side.
     */
    SEND_FAILED = "SEND_FAILED",
    /**
     * Sent by CXAgent to the Copilot MFE when the host's email reply editor opens or closes for a
     * contact, so the MFE can show or hide the contact's topic suggestion cards. The payload
     * carries the contactId and whether the suggestion cards should be shown.
     */
    CONTACT_SUGGESTION_CARDS = "CONTACT_SUGGESTION_CARDS",
    /**
     * Sent by CXAgent to the Copilot MFE when the agent edits the auto-summary text from the
     * outcome (disposition) panel and saves it. The payload carries the contactId and the edited
     * summary text; the MFE updates its own FINAL_SUMMARY_NOTES card to match, mirroring what the
     * coupled/native copilot already does in the same process via `updateAutoSummaryCard`.
     */
    CONTACT_FINAL_SUMMARY_UPDATED = "CONTACT_FINAL_SUMMARY_UPDATED",
    /**
     * Handshake message sent by the Copilot MFE to CXAgent on bridge activation. The payload is empty.
     */
    MFE_READY = "MFE_READY",
    /**
     * Sent by the Copilot MFE to CXAgent when the agent requests a text insert operation. The payload
     * carries the contactId and the text to insert.
     */
    CONTACT_MESSAGE_INSERT = "contact_message_insert",
    /**
     * Sent by the Copilot MFE to CXAgent when the agent requests a reply send operation. The payload carries the contactId and the text to send.
     */
    CONTACT_MESSAGE_SEND = "contact_message_send",
    /**
     * Sent by the Copilot MFE to CXAgent when a final summary has been generated. The payload carries
     * the contactId and the generated summary text.
     */
    CONTACT_FINAL_SUMMARY = "contact_final_summary",
    /**
     * Sent by the Copilot MFE to CXAgent when it starts or finishes a generation operation (e.g.
     * email draft generation) that should block the host's editor for the duration. Deliberately
     * generic — carries only a contactId and a busy flag — so any future MFE-driven generation flow
     * can reuse it instead of adding its own dedicated message.
     */
    CONTACT_EDITOR_BUSY = "contact_editor_busy"
}
export declare type EmptyPayload = Record<string, never>;
/**
 * Host state handed to the MFE on handshake.
 *
 * `auth` is required because the `@nice-devone/*` SDKs are not shared singletons across the Module
 * Federation boundary (see `module-federation.base.config.js`) — the MFE's own SDK copy has no
 * bootstrapped session to read. It is a snapshot taken when the message is posted: re-posted on
 * every MFE_READY, but a token refresh occurring after the handshake is not pushed to the MFE.
 *
 * Because this carries `isLeader`, the MFE knows its leader state from the very first message and
 * no separate priming LEADER_CHANGED is needed.
 *
 * Note: the payload is structured-cloned by BroadcastChannel, so `auth` arrives at the MFE as a
 * plain object — the `AuthToken` prototype and its `parseData` method do not survive the copy.
 */
export interface CXAgentReadyPayload {
    /**
     * Whether the current agent is the leader. The MFE uses this to determine whether to show the
     */
    isLeader: boolean;
    /**
     * The current agent's auth token snapshot. The MFE uses this to bootstrap its own SDK copy, which is not a shared singleton across the Module Federation boundary.
     */
    auth: AuthToken;
}
export interface ContactStatusChangedPayload {
    /**
     * The contact this transition applies to — the MFE targets its state by this id.
    */
    contactId: string;
    /**
     * The new assignment or lifecycle status of the contact. The MFE switches on this value rather
     * than on the message type.
     */
    status: AssignmentStatus | ContactStatus;
}
export interface LeaderChangedPayload {
    isLeader: boolean;
}
/**
 * A contact id plus a body of agent-facing copy. Shared by CONTACT_MESSAGE_INSERT and
 * CONTACT_MESSAGE_SEND (MFE → CXAgent, the text to insert into the composer or send as a reply).
 */
export interface ContactTextPayload {
    contactId: string;
    text: string;
}
/**
 * A contact's final summary text — the generated summary carried by CONTACT_FINAL_SUMMARY
 * (MFE → CXAgent), and also the agent-edited summary carried by CONTACT_FINAL_SUMMARY_UPDATED
 * (CXAgent → MFE): both are a contactId plus the summary text, just traveling in opposite
 * directions, so they share this one payload shape rather than each getting its own.
 *
 * Kept separate from `ContactTextPayload` even though both are two strings: a summary is not
 * interchangeable with composer text, and `finalSummaryText` names it at the point of use so a
 * reader of either branch does not have to trace the type back to know what the string holds.
 */
export interface ContactFinalSummaryPayload {
    contactId: string;
    finalSummaryText: string;
}
/**
 * Outcome of an operation, identifying only which contact it applied to. Shared by the four
 * result messages: INSERT_SUCCESS, INSERT_FAILED, SEND_SUCCESS and SEND_FAILED.
 *
 * Failures carry no reason string: the only consumer ever did was log it, so the detail is kept
 * host-side in the CXAgent logs instead of being put on the wire.
 */
export interface ContactResultPayload {
    contactId: string;
}
export interface ContactSuggestionCardsPayload {
    /** The contact whose reply editor state changed. */
    contactId: string;
    /** Whether the contact's topic suggestion cards should be shown. */
    showTopics: boolean;
}
/**
 * Generic busy signal for CONTACT_EDITOR_BUSY (MFE → CXAgent). Not tied to any one generation
 * flow — the host just blocks/unblocks the editor for the contact for as long as `busy` is true.
 */
export interface ContactEditorBusyPayload {
    /** The contact whose editor busy state changed. */
    contactId: string;
    /** True while generation is in progress and editor should be blocked; false when unblocked. */
    busy: boolean;
}
/**
 * The single source of truth for which payload belongs to which message.
 *
 * Adding a member to `BridgeMessageType` without adding its payload here fails to compile, because
 * the `BridgePayloadMap[K]` lookup in `BridgeMessage` below has no key to resolve.
 *
 * Do not give this an index signature or `extends Record<BridgeMessageType, unknown>` — either one
 * makes missing keys resolve to a default instead of erroring, which silently defeats the guard.
 */
interface BridgePayloadMap {
    [BridgeMessageType.CXAGENT_READY]: CXAgentReadyPayload;
    [BridgeMessageType.MFE_READY]: EmptyPayload;
    [BridgeMessageType.CONTACT_STATUS_CHANGED]: ContactStatusChangedPayload;
    [BridgeMessageType.LEADER_CHANGED]: LeaderChangedPayload;
    [BridgeMessageType.CONTACT_MESSAGE_INSERT]: ContactTextPayload;
    [BridgeMessageType.CONTACT_MESSAGE_SEND]: ContactTextPayload;
    [BridgeMessageType.CONTACT_FINAL_SUMMARY]: ContactFinalSummaryPayload;
    [BridgeMessageType.INSERT_SUCCESS]: ContactResultPayload;
    [BridgeMessageType.INSERT_FAILED]: ContactResultPayload;
    [BridgeMessageType.SEND_SUCCESS]: ContactResultPayload;
    [BridgeMessageType.SEND_FAILED]: ContactResultPayload;
    [BridgeMessageType.CONTACT_SUGGESTION_CARDS]: ContactSuggestionCardsPayload;
    [BridgeMessageType.CONTACT_EDITOR_BUSY]: ContactEditorBusyPayload;
    [BridgeMessageType.CONTACT_FINAL_SUMMARY_UPDATED]: ContactFinalSummaryPayload;
}
/**
 * Discriminated union generated from `BridgePayloadMap` — TypeScript narrows `payload` automatically
 * in a switch on `type`, exactly as a hand-written union would. Deriving it means the enum and the
 * payload contracts can never fall out of sync.
 */
export declare type BridgeMessage = {
    [K in BridgeMessageType]: {
        type: K;
        payload: BridgePayloadMap[K];
    };
}[BridgeMessageType];
export {};
