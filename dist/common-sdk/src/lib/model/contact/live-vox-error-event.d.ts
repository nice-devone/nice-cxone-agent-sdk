/**
 * @remarks - The `Type` value VC stamps on a decoded LiveVoxError SmartReach event (see OB-41201)
 */
export declare const LIVEVOXERROR_NOTIFY_EVENT_TYPE = "LiveVoxError";
/**
 * Fallback classification keys VC assigns a LiveVox dial failure to.
 * Treated as an opaque string per OB-41201 -- not enforced as a closed enum.
 */
export declare enum LiveVoxErrorCategory {
    COMPLIANCE = "COMPLIANCE",
    SIP = "SIP",
    INTERNAL_ERROR = "INTERNAL_ERROR",
    BAD_PARAMETERS = "BAD_PARAMETERS",
    NOT_FOUND = "NOT_FOUND",
    NETWORK_ERROR = "NETWORK_ERROR"
}
/**
 * The outbound call type a failed dial belongs to, as classified by VC.
 */
export declare enum LiveVoxErrorCallType {
    PREVIEW = "preview",
    MANUAL = "manual",
    UNSPECIFIED = "unspecified"
}
/**
 * Typed representation of a VC LiveVoxError SmartReach event, exposed to
 * libs/react/ui-components via ContactManager.onLiveVoxErrorEvent.
 */
export interface LiveVoxErrorEvent {
    /** @remarks - Curated LiveVox error name; consumers look this up first before falling back to category */
    errorName: string;
    /** @remarks - Fallback classification key used when errorName has no curated message */
    category: LiveVoxErrorCategory | string;
    /** @remarks - The outbound call type the failed dial belongs to */
    callType: LiveVoxErrorCallType | string;
    /** @remarks - Contact id used to correlate this error to the failed dial */
    contactId: string;
}
