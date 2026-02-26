import { PayloadAction, Dispatch, AnyAction } from '@reduxjs/toolkit';
export declare const STUDIO_ACTION_EDITOR_SLICE_KEY = "studioActionEditorSlice";
/**
 * This interface is the structure for Studio action editor UI state.
 */
export interface CcfStudioActionEditorState {
    /**
     * @remarks Studio provided token (web/desktop).
     */
    token: string;
    /**
     * @remarks Studio provided data (web/desktop).
     */
    data: object;
    /**
     * @remarks Set application configuration
     */
    applicationConfiguration: object;
}
export declare const initialCcfStudioActionEditorState: CcfStudioActionEditorState;
/**
 * This interface is the structure for root state.
 */
export interface StudioActionEditorRootState {
    studioActionEditorSlice: CcfStudioActionEditorState;
}
export declare const studioActionEditorSlice: import("@reduxjs/toolkit").Slice<CcfStudioActionEditorState, {
    /**
     * Action to set token state.
     * @param state - CcfStudioActionEditorState
     * @example - dispatch(setToken(token));
     * @returns - state
     */
    setToken: (state: CcfStudioActionEditorState, action: PayloadAction<string>) => {
        token: string;
        /**
         * @remarks Studio provided data (web/desktop).
         */
        data: object;
        /**
         * @remarks Set application configuration
         */
        applicationConfiguration: object;
    };
    /**
     * Action to set data state.
     * @param state - CcfStudioActionEditorState
     * @example - dispatch(setData(data));
     * @returns - state
     */
    setData: (state: CcfStudioActionEditorState, action: PayloadAction<object>) => {
        data: object;
        /**
         * @remarks Studio provided token (web/desktop).
         */
        token: string;
        /**
         * @remarks Set application configuration
         */
        applicationConfiguration: object;
    };
    /**
     * Action to set application configuration details.
     * @param state - CcfStudioActionEditorState
     * @example - dispatch(setApplicationConfiguration(applicationConfiguration));
     * @returns - state
     */
    setApplicationConfiguration: (state: CcfStudioActionEditorState, action: PayloadAction<object>) => {
        applicationConfiguration: object;
        /**
         * @remarks Studio provided token (web/desktop).
         */
        token: string;
        /**
         * @remarks Studio provided data (web/desktop).
         */
        data: object;
    };
}, "studioActionEditorSlice">;
export declare const CcfStudioActionEditorReducer: import("redux").Reducer<CcfStudioActionEditorState, AnyAction>;
export declare type setupCommunicationInterfaceForStudioReturnType = Promise<any>;
export declare type setupCommunicationInterfaceForStudioPayloadType = object;
export declare type setupCommunicationInterfaceForStudioThunkAPI = {
    dispatch: Dispatch<AnyAction>;
    getState: StudioActionEditorRootState;
    extra: any;
};
/**
 * Initialize Studio (web/desktop) communication interface.
 * @example - dispatch(setupCommunicationInterfaceForStudio())
 */
export declare const setupCommunicationInterfaceForStudio: import("@reduxjs/toolkit").AsyncThunk<setupCommunicationInterfaceForStudioReturnType, object, {
    dispatch: Dispatch<AnyAction>;
    getState: StudioActionEditorRootState;
    extra: any;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Thunk action creator to authenticate CXS application.
 * @example - dispatch(authenticate(token))
 */
export declare const authenticate: any;
export declare const getData: ((state: StudioActionEditorRootState) => object) & import("reselect").OutputSelectorFields<(args_0: CcfStudioActionEditorState) => object & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
