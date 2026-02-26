import { createSlice, } from '@reduxjs/toolkit';
export const CCF_VOICE_MAIL_CONTACT_FEATURE_KEY = 'voicemailContact';
export const initialVoiceMailContactState = {
    playbackEvent: { playBackPaused: true, playBackPosition: 0, contactId: '' },
    playbackSecond: 0,
};
export const CcfVoicemailContactPanelSlice = createSlice({
    name: CCF_VOICE_MAIL_CONTACT_FEATURE_KEY,
    initialState: initialVoiceMailContactState,
    reducers: {
        /**
         * @param state - CxOneVoiceMailEventState
         * @example - setHasInitialPlayed(event, action));
         * @returns - this returns state
         */
        setPlaybackEvent(state, action) {
            return Object.assign(Object.assign({}, state), { playbackEvent: Object.assign({}, action.payload) });
        },
        /**
         * @param state - CxOneVoiceMailEventState
         * @example - setHasInitialPlayed(event, action));
         * @returns - this returns state
         */
        setPlaybackSecond(state, action) {
            return Object.assign(Object.assign({}, state), { playbackSecond: action.payload });
        },
    },
    extraReducers: {},
});
export const ccfVoiceMailContactPanelActions = CcfVoicemailContactPanelSlice.actions;
export const ccfVoiceMailContactPanelReducer = CcfVoicemailContactPanelSlice.reducer;
/**
* Function to get the voicemail contact from the state
* @param state - CcfVoicemailContactState
* @returns returns the CcfVoicemailContactState
* @example -voiceMailContactPanelSelector(rootState)
*/
export const voiceMailContactPanelSelector = (state) => state.voicemailContact;
//# sourceMappingURL=ccf-voicemail-contact-panel.slice.js.map