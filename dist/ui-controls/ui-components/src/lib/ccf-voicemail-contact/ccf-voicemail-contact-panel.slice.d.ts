import { PayloadAction } from '@reduxjs/toolkit';
export declare const CCF_VOICE_MAIL_CONTACT_FEATURE_KEY = "voicemailContact";
export interface VoiceMailPlaybackProps {
    playBackPaused: boolean;
    playBackPosition: number;
    contactId: string;
}
export interface CcfVoiceMailContactState {
    playbackEvent: VoiceMailPlaybackProps;
    playbackSecond: number;
}
export declare const initialVoiceMailContactState: CcfVoiceMailContactState;
export declare const CcfVoicemailContactPanelSlice: import("@reduxjs/toolkit").Slice<CcfVoiceMailContactState, {
    /**
     * @param state - CxOneVoiceMailEventState
     * @example - setHasInitialPlayed(event, action));
     * @returns - this returns state
     */
    setPlaybackEvent(state: import("immer/dist/internal").WritableDraft<CcfVoiceMailContactState>, action: PayloadAction<VoiceMailPlaybackProps>): {
        playbackEvent: {
            playBackPaused: boolean;
            playBackPosition: number;
            contactId: string;
        };
        playbackSecond: number;
    };
    /**
     * @param state - CxOneVoiceMailEventState
     * @example - setHasInitialPlayed(event, action));
     * @returns - this returns state
     */
    setPlaybackSecond(state: import("immer/dist/internal").WritableDraft<CcfVoiceMailContactState>, action: PayloadAction<number>): {
        playbackSecond: number;
        playbackEvent: import("immer/dist/internal").WritableDraft<VoiceMailPlaybackProps>;
    };
}, "voicemailContact">;
export declare const ccfVoiceMailContactPanelActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * @param state - CxOneVoiceMailEventState
     * @example - setHasInitialPlayed(event, action));
     * @returns - this returns state
     */
    setPlaybackEvent(state: import("immer/dist/internal").WritableDraft<CcfVoiceMailContactState>, action: PayloadAction<VoiceMailPlaybackProps>): {
        playbackEvent: {
            playBackPaused: boolean;
            playBackPosition: number;
            contactId: string;
        };
        playbackSecond: number;
    };
    /**
     * @param state - CxOneVoiceMailEventState
     * @example - setHasInitialPlayed(event, action));
     * @returns - this returns state
     */
    setPlaybackSecond(state: import("immer/dist/internal").WritableDraft<CcfVoiceMailContactState>, action: PayloadAction<number>): {
        playbackSecond: number;
        playbackEvent: import("immer/dist/internal").WritableDraft<VoiceMailPlaybackProps>;
    };
}, "voicemailContact">;
export declare const ccfVoiceMailContactPanelReducer: import("redux").Reducer<CcfVoiceMailContactState, import("redux").AnyAction>;
/**
* Function to get the voicemail contact from the state
* @param state - CcfVoicemailContactState
* @returns returns the CcfVoicemailContactState
* @example -voiceMailContactPanelSelector(rootState)
*/
export declare const voiceMailContactPanelSelector: (state: {
    voicemailContact: CcfVoiceMailContactState;
}) => CcfVoiceMailContactState;
