import { PayloadAction } from '@reduxjs/toolkit';
import { VoiceTranscriptionItem } from '@nice-devone/common-sdk';
export declare const VOICE_TRANSCRIPTION_SLICE_KEY = "voiceTranscription";
export interface VoiceTranscriptionState {
    voiceTranscriptItems: {
        [contactId: string]: VoiceTranscriptionItem[];
    };
    voiceTranscriptEventReceived: {
        [contactId: string]: boolean;
    };
}
export declare const CcfVoiceTranscriptionActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * Adds a new transcript entry for a given contact. If the contact already has transcript entries,
     * the new entry is appended; otherwise, a new transcript array is created for the contact.
     * Ensures that the transcript array does not exceed the maximum allowed length by trimming older entries.
     *
     * @param state - The current voice transcription state, mapping contact IDs to transcript arrays.
     * @param action - The Redux action containing the contact ID and the transcript entry to add.
     * @example
     * setTranscript(state, \{ payload: \{contactId, transcript\}, type: "voiceTranscription/setTranscript" \});
     */
    setTranscript(state: import("immer/dist/internal").WritableDraft<VoiceTranscriptionState>, action: PayloadAction<{
        contactId: string;
        transcriptItem: VoiceTranscriptionItem;
    }>): void;
    /**
     * Adds a new transcript error entry for all contacts, since we do not receive a contactId with error events.
     *
     * @param state - The current voice transcription state, mapping contact IDs to transcript arrays.
     * @param action - The Redux action containing the error response from the websocket.
     * @example setTranscriptError(state, \{ payload: \{ error \}, type: "voiceTranscription/setTranscriptError" \});
     */
    setTranscriptError(state: import("immer/dist/internal").WritableDraft<VoiceTranscriptionState>): void;
    /**
     * Restore the transcript for a given contactID to be used when loading from IndexedDB.
     *
     * @param state - The current voice transcription state.
     * @param action - The Redux action containing the contact ID and the transcript array to restore.
     * @example restoreTranscript(state, \{ payload: \{ contactId, transcript \}, type: "voiceTranscription/restoreTranscript" \});
     */
    restoreTranscript(state: import("immer/dist/internal").WritableDraft<VoiceTranscriptionState>, action: PayloadAction<{
        contactId: string;
        transcript: VoiceTranscriptionItem[];
    }>): void;
    /**
     * Clears the transcript for the specified key in the voice transcription state.
     *
     * @param state - The current voice transcription state.
     * @param action - The Redux action containing the key (as payload) to clear from the state.
     * @example clearTranscript(state);
     */
    clearTranscript(state: import("immer/dist/internal").WritableDraft<VoiceTranscriptionState>, action: PayloadAction<string>): void;
    /**
     * Sets the flag indicating whether a voice transcription event has been received.
     * @param state - The current voice transcription state.
     * @param action - The Redux action containing the boolean flag.
     * @example - dispatch(setVoiceTranscriptionEventReceived(true));
     */
    setVoiceTranscriptionEventReceived(state: import("immer/dist/internal").WritableDraft<VoiceTranscriptionState>, action: PayloadAction<{
        contactId: string;
        value: boolean;
    }>): void;
}, "voiceTranscription">;
export declare const setTranscript: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    contactId: string;
    transcriptItem: VoiceTranscriptionItem;
}, "voiceTranscription/setTranscript">, clearTranscript: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "voiceTranscription/clearTranscript">, restoreTranscript: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    contactId: string;
    transcript: VoiceTranscriptionItem[];
}, "voiceTranscription/restoreTranscript">, setTranscriptError: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"voiceTranscription/setTranscriptError">, setVoiceTranscriptionEventReceived: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    contactId: string;
    value: boolean;
}, "voiceTranscription/setVoiceTranscriptionEventReceived">;
export declare const CcfVoiceTranscriptionReducer: import("redux").Reducer<VoiceTranscriptionState, import("redux").AnyAction>;
/**
 * Thunk to set the voice transcription in IndexedDB.
 * @param contactId - The ID of the contact.
 * @param transcript - The voice transcription data to store.
 * @example setIndexedDBTranscript(contactId, transcript);
 */
export declare const setIndexedDBTranscript: import("@reduxjs/toolkit").AsyncThunk<void, {
    contactId: string;
    transcriptItem: VoiceTranscriptionItem;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Thunk to delete the voice transcription in IndexedDB.
 * @param contactId - The ID of the contact.
 * @param transcript - The voice transcription data to delete.
 * @example deleteIndexedDBTranscript(contactId);
 */
export declare const deleteIndexedDBTranscript: import("@reduxjs/toolkit").AsyncThunk<void, {
    contactId: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Selector to get the transcript from the voiceTranscription state.
 * @param state - The Redux state containing voiceTranscription.
 * @returns The current transcript string.
 * @example
 * const transcript = selectTranscript(store.getState());
 */
export declare const selectTranscript: (state: {
    voiceTranscription: VoiceTranscriptionState;
}) => VoiceTranscriptionState;
export declare const loadTranscriptFromIndexedDB: import("@reduxjs/toolkit").AsyncThunk<void, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Selector to get the transcript for a specific contact ID.
 * @param state - The Redux state containing voiceTranscription.
 * @param contactId - The ID of the contact whose transcript is to be selected.
 * @returns The transcript array for the specified contact ID, or undefined if none exists.
 * @example
 * const contactTranscript = selectTranscriptByContactId(store.getState(), "contactId123");
 */
export declare const selectTranscriptByContactId: (contactId: string) => (state: {
    voiceTranscription: VoiceTranscriptionState;
}) => VoiceTranscriptionItem[];
/**
 * Selector to check if a voice transcript event has been received for a specific contact ID.
 * @param state - The Redux state containing voiceTranscription.
 * @returns
 * The boolean flag indicating if a voice transcript event has been received for the specified contact ID.
 * @example
 * const hasEvent = selectHasVoiceTranscriptEventBeenReceived(store.getState(), "contactId123");
 */
export declare const selectHasVoiceTranscriptEventBeenReceived: (contactId: string) => (state: {
    voiceTranscription: VoiceTranscriptionState;
}) => boolean;
