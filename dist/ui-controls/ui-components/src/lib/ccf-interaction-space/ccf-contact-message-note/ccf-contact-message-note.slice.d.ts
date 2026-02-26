/**
 * @param args - customfield detail and case id
 * @example -
 */
interface DigitalMessageNotePayload {
    /**
    * @remarks - Id of the message to link the note
    */
    messageId: string;
    /**
     * @remarks - Content of the Message Note
    */
    content?: string;
    /**
    * @remarks - Id of the message note
    */
    noteId?: string;
    /**
    * @remarks - Id of the current interaction
    */
    interactionId: string;
    /**
    * @remarks - Id of the current case
    */
    caseId: string;
}
export declare const createMessageNote: import("@reduxjs/toolkit").AsyncThunk<void, DigitalMessageNotePayload, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const updateMessageNote: import("@reduxjs/toolkit").AsyncThunk<void, DigitalMessageNotePayload, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const deleteMessageNote: import("@reduxjs/toolkit").AsyncThunk<void, DigitalMessageNotePayload, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export {};
