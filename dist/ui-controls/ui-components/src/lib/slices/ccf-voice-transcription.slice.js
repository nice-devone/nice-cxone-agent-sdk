import { __awaiter } from "tslib";
import { dbInstance, IndexDBStoreNames } from '@nice-devone/core-sdk';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TranscriptionStatus, VoiceTranscriptionItemType } from '@nice-devone/common-sdk';
export const VOICE_TRANSCRIPTION_SLICE_KEY = 'voiceTranscription';
const MAX_TRANSCRIPT_LENGTH = 30;
const initialState = {
    voiceTranscriptItems: {},
    voiceTranscriptEventReceived: {},
};
const CcfVoiceTranscriptionSlice = createSlice({
    name: VOICE_TRANSCRIPTION_SLICE_KEY,
    initialState,
    reducers: {
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
        setTranscript(state, action) {
            var _a;
            const { contactId, transcriptItem } = action.payload;
            const transcripts = state.voiceTranscriptItems[contactId] || [];
            const previousTranscriptItem = transcripts.length ? transcripts[transcripts.length - 1] : undefined;
            // Add CONNECTION_RESTORED status if the previous item was an ERROR and the new item is a MESSAGE
            if (transcriptItem.type === VoiceTranscriptionItemType.MESSAGE &&
                (previousTranscriptItem === null || previousTranscriptItem === void 0 ? void 0 : previousTranscriptItem.type) === VoiceTranscriptionItemType.STATUS &&
                ((_a = previousTranscriptItem.data) === null || _a === void 0 ? void 0 : _a.status) === TranscriptionStatus.ERROR) {
                transcripts.push({
                    contactId,
                    type: VoiceTranscriptionItemType.STATUS,
                    data: {
                        status: TranscriptionStatus.CONNECTION_RESTORED,
                        timestamp: new Date().toISOString(),
                    },
                });
            }
            transcripts.push(transcriptItem);
            if (transcripts.length > MAX_TRANSCRIPT_LENGTH) {
                transcripts.splice(0, transcripts.length - MAX_TRANSCRIPT_LENGTH);
            }
            state.voiceTranscriptItems[contactId] = transcripts;
        },
        /**
         * Adds a new transcript error entry for all contacts, since we do not receive a contactId with error events.
         *
         * @param state - The current voice transcription state, mapping contact IDs to transcript arrays.
         * @param action - The Redux action containing the error response from the websocket.
         * @example setTranscriptError(state, \{ payload: \{ error \}, type: "voiceTranscription/setTranscriptError" \});
         */
        setTranscriptError(state) {
            const contactKeys = Object.keys(state.voiceTranscriptItems);
            if (contactKeys.length === 0) {
                Object.keys(state.voiceTranscriptEventReceived).forEach(contactId => {
                    if (state.voiceTranscriptEventReceived[contactId]) {
                        state.voiceTranscriptItems[contactId] = [];
                    }
                });
            }
            Object.keys(state.voiceTranscriptItems).forEach(contactId => {
                const transcripts = state.voiceTranscriptItems[contactId] || [];
                transcripts.push({
                    contactId,
                    type: VoiceTranscriptionItemType.STATUS,
                    data: {
                        status: TranscriptionStatus.ERROR,
                        timestamp: new Date().toISOString(),
                    },
                });
                if (transcripts.length > MAX_TRANSCRIPT_LENGTH) {
                    transcripts.splice(0, transcripts.length - MAX_TRANSCRIPT_LENGTH);
                }
                state.voiceTranscriptItems[contactId] = transcripts;
            });
        },
        /**
         * Restore the transcript for a given contactID to be used when loading from IndexedDB.
         *
         * @param state - The current voice transcription state.
         * @param action - The Redux action containing the contact ID and the transcript array to restore.
         * @example restoreTranscript(state, \{ payload: \{ contactId, transcript \}, type: "voiceTranscription/restoreTranscript" \});
         */
        restoreTranscript(state, action) {
            const { contactId, transcript } = action.payload;
            state.voiceTranscriptItems[contactId] = transcript;
        },
        /**
         * Clears the transcript for the specified key in the voice transcription state.
         *
         * @param state - The current voice transcription state.
         * @param action - The Redux action containing the key (as payload) to clear from the state.
         * @example clearTranscript(state);
         */
        clearTranscript(state, action) {
            delete state.voiceTranscriptItems[action.payload];
            delete state.voiceTranscriptEventReceived[action.payload];
        },
        /**
         * Sets the flag indicating whether a voice transcription event has been received.
         * @param state - The current voice transcription state.
         * @param action - The Redux action containing the boolean flag.
         * @example - dispatch(setVoiceTranscriptionEventReceived(true));
         */
        setVoiceTranscriptionEventReceived(state, action) {
            state.voiceTranscriptEventReceived[action.payload.contactId] = action.payload.value;
        },
    },
});
export const CcfVoiceTranscriptionActions = CcfVoiceTranscriptionSlice.actions;
export const { setTranscript, clearTranscript, restoreTranscript, setTranscriptError, setVoiceTranscriptionEventReceived } = CcfVoiceTranscriptionSlice.actions;
export const CcfVoiceTranscriptionReducer = CcfVoiceTranscriptionSlice.reducer;
/**
 * Thunk to set the voice transcription in IndexedDB.
 * @param contactId - The ID of the contact.
 * @param transcript - The voice transcription data to store.
 * @example setIndexedDBTranscript(contactId, transcript);
 */
export const setIndexedDBTranscript = createAsyncThunk('voiceTranscription/setIndexedDBTranscript', ({ contactId, transcriptItem }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const db = yield dbInstance();
    const contactTranscriptions = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.VOICE_TRANSCRIPTION, contactId))) || [];
    const previousTranscriptItem = contactTranscriptions.length ? contactTranscriptions[contactTranscriptions.length - 1] : undefined;
    // Add CONNECTION_RESTORED status if the previous item was an ERROR and the new item is a MESSAGE
    if (transcriptItem.type === VoiceTranscriptionItemType.MESSAGE &&
        (previousTranscriptItem === null || previousTranscriptItem === void 0 ? void 0 : previousTranscriptItem.type) === VoiceTranscriptionItemType.STATUS &&
        ((_a = previousTranscriptItem.data) === null || _a === void 0 ? void 0 : _a.status) === TranscriptionStatus.ERROR) {
        contactTranscriptions.push({
            contactId,
            type: VoiceTranscriptionItemType.STATUS,
            data: {
                status: TranscriptionStatus.CONNECTION_RESTORED,
                timestamp: new Date().toISOString(),
            },
        });
    }
    contactTranscriptions.push(transcriptItem);
    if (contactTranscriptions.length > MAX_TRANSCRIPT_LENGTH) {
        contactTranscriptions.splice(0, contactTranscriptions.length - MAX_TRANSCRIPT_LENGTH);
    }
    yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.VOICE_TRANSCRIPTION, contactTranscriptions, contactId));
}));
/**
 * Thunk to delete the voice transcription in IndexedDB.
 * @param contactId - The ID of the contact.
 * @param transcript - The voice transcription data to delete.
 * @example deleteIndexedDBTranscript(contactId);
 */
export const deleteIndexedDBTranscript = createAsyncThunk('voiceTranscription/deleteIndexedDBTranscript', ({ contactId }) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield dbInstance();
    const contactTranscriptions = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.VOICE_TRANSCRIPTION, contactId))) || [];
    if (contactTranscriptions.find(t => (t === null || t === void 0 ? void 0 : t.contactId.toString()) === contactId)) {
        yield (db === null || db === void 0 ? void 0 : db.delete(IndexDBStoreNames.VOICE_TRANSCRIPTION, contactId));
    }
}));
/**
 * Selector to get the transcript from the voiceTranscription state.
 * @param state - The Redux state containing voiceTranscription.
 * @returns The current transcript string.
 * @example
 * const transcript = selectTranscript(store.getState());
 */
export const selectTranscript = (state) => state.voiceTranscription;
export const loadTranscriptFromIndexedDB = createAsyncThunk('voiceTranscription/loadTranscriptFromIndexedDB', (contactId, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield dbInstance();
    const voiceTranscriptionState = getState();
    const transcriptFromDB = yield db.get(IndexDBStoreNames.VOICE_TRANSCRIPTION, contactId);
    const contactTranscript = voiceTranscriptionState.voiceTranscription.voiceTranscriptItems[contactId];
    if (transcriptFromDB && (!contactTranscript || contactTranscript.length === 0)) {
        dispatch(CcfVoiceTranscriptionActions.restoreTranscript({ contactId, transcript: transcriptFromDB }));
    }
}));
/**
 * Selector to get the transcript for a specific contact ID.
 * @param state - The Redux state containing voiceTranscription.
 * @param contactId - The ID of the contact whose transcript is to be selected.
 * @returns The transcript array for the specified contact ID, or undefined if none exists.
 * @example
 * const contactTranscript = selectTranscriptByContactId(store.getState(), "contactId123");
 */
export const selectTranscriptByContactId = (contactId) => (state) => (state === null || state === void 0 ? void 0 : state.voiceTranscription.voiceTranscriptItems[contactId]) || [];
/**
 * Selector to check if a voice transcript event has been received for a specific contact ID.
 * @param state - The Redux state containing voiceTranscription.
 * @returns
 * The boolean flag indicating if a voice transcript event has been received for the specified contact ID.
 * @example
 * const hasEvent = selectHasVoiceTranscriptEventBeenReceived(store.getState(), "contactId123");
 */
export const selectHasVoiceTranscriptEventBeenReceived = (contactId) => (state) => { var _a; return !!(((_a = state === null || state === void 0 ? void 0 : state.voiceTranscription) === null || _a === void 0 ? void 0 : _a.voiceTranscriptEventReceived[contactId]) || false); };
//# sourceMappingURL=ccf-voice-transcription.slice.js.map