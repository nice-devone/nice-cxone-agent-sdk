import { PayloadAction } from '@reduxjs/toolkit';
import { ContactData } from '@nice-devone/common-sdk';
import { WritableDraft } from 'immer/dist/internal';
export declare const CCF_SCREEN_POP_FEATURE_KEY = "screenpop";
export declare const initialScreenPopState: CcfScreenPopState;
export interface ScreenPopEvent {
    waitTimeout: string;
    action: string;
    pageUri: string;
    title: string;
    isPoppedOut: boolean;
    contactId: string;
    closeOutUponTermination: boolean;
    popUrlDestination: string;
    windowHeight: number;
    windowWidth: number;
    windowObjectReference: number;
    userInitiatedPops: boolean;
    userClicked: boolean;
    eventParams?: {
        [key: string]: string;
    };
    screenPopId?: string;
}
export interface CcfScreenPopState {
    screenPops: ScreenPopEvent[];
}
export declare const CcfScreenPopSlice: import("@reduxjs/toolkit").Slice<CcfScreenPopState, {
    /**
         * Function to set current screen pop
         * @param state - CcfScreenPopState
         * @param action  - PayloadAction<ScreenPopEvent>
         * @returns It appends the screen pop to the state
         * @example -setScreenPop(state, action)
         */
    setScreenPop(state: WritableDraft<CcfScreenPopState>, action: PayloadAction<{
        screenPop: ScreenPopEvent;
        store: ContactData[];
    }>): WritableDraft<CcfScreenPopState>;
    /**
         * Function to remove contact based screen pops
         * @param state - CcfScreenPopState
         * @param action  - PayloadAction<string>
         * @returns removes the contact after it ends and returns the state
         * @example -removeContactScreenPops(state, action)
         */
    removeContactScreenPops(state: WritableDraft<CcfScreenPopState>, action: PayloadAction<string>): WritableDraft<CcfScreenPopState>;
    /**
         * Function to toggle the screen pop between app space and an external window
         * @param state - ScreenPopState
         * @param action  - PayloadAction<number>
         * @returns It resets the screen pop state
         * @example -toggleScreenPop(state, action)
         */
    toggleScreenPop(state: WritableDraft<CcfScreenPopState>, action: PayloadAction<{
        selectedIndex: number;
        contactId: string;
    }>): {
        screenPops: ({
            isPoppedOut: boolean;
            userInitiatedPops: true;
            userClicked: true;
            waitTimeout: string;
            action: string;
            pageUri: string;
            title: string;
            contactId: string;
            closeOutUponTermination: boolean;
            popUrlDestination: string;
            windowHeight: number;
            windowWidth: number;
            windowObjectReference: number;
            eventParams?: WritableDraft<{
                [key: string]: string;
            }> | undefined;
            screenPopId?: string | undefined;
        } | {
            userClicked: false;
            waitTimeout: string;
            action: string;
            pageUri: string;
            title: string;
            isPoppedOut: boolean;
            contactId: string;
            closeOutUponTermination: boolean;
            popUrlDestination: string;
            windowHeight: number;
            windowWidth: number;
            windowObjectReference: number;
            userInitiatedPops: boolean;
            eventParams?: WritableDraft<{
                [key: string]: string;
            }> | undefined;
            screenPopId?: string | undefined;
        })[];
    };
    /**
         * Function to set the index of the window object when popped out
         * @param state - ScreenPopState
         * @param action  - PayloadAction(number,number)
         * @returns It resets the screen pop state
         * @example -setReferenceNumber(state, action)
         */
    setReferenceNumber(state: WritableDraft<CcfScreenPopState>, action: PayloadAction<{
        index: number;
        windowObjectReference: number;
    }>): {
        screenPops: WritableDraft<ScreenPopEvent>[];
    };
    /**
         * Function to determine if a screen pop is part of an active media contact
         * @param state - CcfScreenPopState
         * @param action  - PayloadAction<ContactData>
         * @returns the state
         * @example -setAppSpace(state, action)
         */
    setAppSpace(state: WritableDraft<CcfScreenPopState>, action: PayloadAction<ContactData | undefined>): {
        screenPops: WritableDraft<ScreenPopEvent>[];
    };
    /**
        * Function to pop everything to the browser when the agent goes to Integrated agent breakpoints
        * @param state - ScreenPopState
        * @returns the state
        * @example -popEverythingOut()
        */
    popEverythingOut(state: WritableDraft<CcfScreenPopState>): {
        screenPops: WritableDraft<ScreenPopEvent>[];
    };
    /**
     * Function to keep track of what screen pop was clicked on
     * @param state - ScreenPopState
     * @returns the state
     * @example -setScreenPopUserClicked(action)
     */
    setScreenPopUserClicked(state: WritableDraft<CcfScreenPopState>, action: PayloadAction<number>): {
        screenPops: ({
            userClicked: true;
            waitTimeout: string;
            action: string;
            pageUri: string;
            title: string;
            isPoppedOut: boolean;
            contactId: string;
            closeOutUponTermination: boolean;
            popUrlDestination: string;
            windowHeight: number;
            windowWidth: number;
            windowObjectReference: number;
            userInitiatedPops: boolean;
            eventParams?: WritableDraft<{
                [key: string]: string;
            }> | undefined;
            screenPopId?: string | undefined;
        } | {
            userClicked: false;
            waitTimeout: string;
            action: string;
            pageUri: string;
            title: string;
            isPoppedOut: boolean;
            contactId: string;
            closeOutUponTermination: boolean;
            popUrlDestination: string;
            windowHeight: number;
            windowWidth: number;
            windowObjectReference: number;
            userInitiatedPops: boolean;
            eventParams?: WritableDraft<{
                [key: string]: string;
            }> | undefined;
            screenPopId?: string | undefined;
        })[];
    };
    /**
    * Function to remove a screen pop
    * @param state - ScreenPopState
    * @returns the state
    * @example -removeScreenPop(action)
    */
    removeScreenPop(state: WritableDraft<CcfScreenPopState>, action: PayloadAction<ScreenPopEvent>): {
        screenPops: WritableDraft<ScreenPopEvent>[];
    };
    /**
        * Function to unset click for all screen pops
        * @param state - ScreenPopState
        * @returns the state
        * @example -unsetuserClicked()
        */
    unsetUserClicked(state: WritableDraft<CcfScreenPopState>): {
        screenPops: {
            userClicked: false;
            waitTimeout: string;
            action: string;
            pageUri: string;
            title: string;
            isPoppedOut: boolean;
            contactId: string;
            closeOutUponTermination: boolean;
            popUrlDestination: string;
            windowHeight: number;
            windowWidth: number;
            windowObjectReference: number;
            userInitiatedPops: boolean;
            eventParams?: WritableDraft<{
                [key: string]: string;
            }> | undefined;
            screenPopId?: string | undefined;
        }[];
    };
}, "screenpop">;
/**
* Function to update client data for Panels in store
* @param state - CcfScreenPopState
* @param action  - PayloadAction<ScreenPopEvent>
* @returns It resets the screen pop state
* @example -updateScreenPopsWithClientData(state, action)
*/
export declare const updateScreenPopsWithClientData: (state: WritableDraft<CcfScreenPopState>, action: PayloadAction<{
    screenPop: ScreenPopEvent;
    store: ContactData[];
}>) => WritableDraft<CcfScreenPopState>;
export declare const ccfScreenPopActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
         * Function to set current screen pop
         * @param state - CcfScreenPopState
         * @param action  - PayloadAction<ScreenPopEvent>
         * @returns It appends the screen pop to the state
         * @example -setScreenPop(state, action)
         */
    setScreenPop(state: WritableDraft<CcfScreenPopState>, action: PayloadAction<{
        screenPop: ScreenPopEvent;
        store: ContactData[];
    }>): WritableDraft<CcfScreenPopState>;
    /**
         * Function to remove contact based screen pops
         * @param state - CcfScreenPopState
         * @param action  - PayloadAction<string>
         * @returns removes the contact after it ends and returns the state
         * @example -removeContactScreenPops(state, action)
         */
    removeContactScreenPops(state: WritableDraft<CcfScreenPopState>, action: PayloadAction<string>): WritableDraft<CcfScreenPopState>;
    /**
         * Function to toggle the screen pop between app space and an external window
         * @param state - ScreenPopState
         * @param action  - PayloadAction<number>
         * @returns It resets the screen pop state
         * @example -toggleScreenPop(state, action)
         */
    toggleScreenPop(state: WritableDraft<CcfScreenPopState>, action: PayloadAction<{
        selectedIndex: number;
        contactId: string;
    }>): {
        screenPops: ({
            isPoppedOut: boolean;
            userInitiatedPops: true;
            userClicked: true;
            waitTimeout: string;
            action: string;
            pageUri: string;
            title: string;
            contactId: string;
            closeOutUponTermination: boolean;
            popUrlDestination: string;
            windowHeight: number;
            windowWidth: number;
            windowObjectReference: number;
            eventParams?: WritableDraft<{
                [key: string]: string;
            }> | undefined;
            screenPopId?: string | undefined;
        } | {
            userClicked: false;
            waitTimeout: string;
            action: string;
            pageUri: string;
            title: string;
            isPoppedOut: boolean;
            contactId: string;
            closeOutUponTermination: boolean;
            popUrlDestination: string;
            windowHeight: number;
            windowWidth: number;
            windowObjectReference: number;
            userInitiatedPops: boolean;
            eventParams?: WritableDraft<{
                [key: string]: string;
            }> | undefined;
            screenPopId?: string | undefined;
        })[];
    };
    /**
         * Function to set the index of the window object when popped out
         * @param state - ScreenPopState
         * @param action  - PayloadAction(number,number)
         * @returns It resets the screen pop state
         * @example -setReferenceNumber(state, action)
         */
    setReferenceNumber(state: WritableDraft<CcfScreenPopState>, action: PayloadAction<{
        index: number;
        windowObjectReference: number;
    }>): {
        screenPops: WritableDraft<ScreenPopEvent>[];
    };
    /**
         * Function to determine if a screen pop is part of an active media contact
         * @param state - CcfScreenPopState
         * @param action  - PayloadAction<ContactData>
         * @returns the state
         * @example -setAppSpace(state, action)
         */
    setAppSpace(state: WritableDraft<CcfScreenPopState>, action: PayloadAction<ContactData | undefined>): {
        screenPops: WritableDraft<ScreenPopEvent>[];
    };
    /**
        * Function to pop everything to the browser when the agent goes to Integrated agent breakpoints
        * @param state - ScreenPopState
        * @returns the state
        * @example -popEverythingOut()
        */
    popEverythingOut(state: WritableDraft<CcfScreenPopState>): {
        screenPops: WritableDraft<ScreenPopEvent>[];
    };
    /**
     * Function to keep track of what screen pop was clicked on
     * @param state - ScreenPopState
     * @returns the state
     * @example -setScreenPopUserClicked(action)
     */
    setScreenPopUserClicked(state: WritableDraft<CcfScreenPopState>, action: PayloadAction<number>): {
        screenPops: ({
            userClicked: true;
            waitTimeout: string;
            action: string;
            pageUri: string;
            title: string;
            isPoppedOut: boolean;
            contactId: string;
            closeOutUponTermination: boolean;
            popUrlDestination: string;
            windowHeight: number;
            windowWidth: number;
            windowObjectReference: number;
            userInitiatedPops: boolean;
            eventParams?: WritableDraft<{
                [key: string]: string;
            }> | undefined;
            screenPopId?: string | undefined;
        } | {
            userClicked: false;
            waitTimeout: string;
            action: string;
            pageUri: string;
            title: string;
            isPoppedOut: boolean;
            contactId: string;
            closeOutUponTermination: boolean;
            popUrlDestination: string;
            windowHeight: number;
            windowWidth: number;
            windowObjectReference: number;
            userInitiatedPops: boolean;
            eventParams?: WritableDraft<{
                [key: string]: string;
            }> | undefined;
            screenPopId?: string | undefined;
        })[];
    };
    /**
    * Function to remove a screen pop
    * @param state - ScreenPopState
    * @returns the state
    * @example -removeScreenPop(action)
    */
    removeScreenPop(state: WritableDraft<CcfScreenPopState>, action: PayloadAction<ScreenPopEvent>): {
        screenPops: WritableDraft<ScreenPopEvent>[];
    };
    /**
        * Function to unset click for all screen pops
        * @param state - ScreenPopState
        * @returns the state
        * @example -unsetuserClicked()
        */
    unsetUserClicked(state: WritableDraft<CcfScreenPopState>): {
        screenPops: {
            userClicked: false;
            waitTimeout: string;
            action: string;
            pageUri: string;
            title: string;
            isPoppedOut: boolean;
            contactId: string;
            closeOutUponTermination: boolean;
            popUrlDestination: string;
            windowHeight: number;
            windowWidth: number;
            windowObjectReference: number;
            userInitiatedPops: boolean;
            eventParams?: WritableDraft<{
                [key: string]: string;
            }> | undefined;
            screenPopId?: string | undefined;
        }[];
    };
}, "screenpop">;
export declare const CcfScreenPopReducer: import("redux").Reducer<CcfScreenPopState, import("redux").AnyAction>;
export declare const getAllScreenPop: ((state: {
    screenpop: CcfScreenPopState;
}) => ScreenPopEvent[]) & import("reselect").OutputSelectorFields<(args_0: CcfScreenPopState) => ScreenPopEvent[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getActiveContactScreenPop: ((state: {
    screenpop: CcfScreenPopState;
} & {
    inbox: import("../ccf-assignment-panel/ccf-assignment-panel.slice").AssignmentState;
}) => ScreenPopEvent[]) & import("reselect").OutputSelectorFields<(args_0: CcfScreenPopState, args_1: ContactData | null) => ScreenPopEvent[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getSelectedContactScreenPop: ((state: {
    screenpop: CcfScreenPopState;
} & {
    inbox: import("../ccf-assignment-panel/ccf-assignment-panel.slice").AssignmentState;
}) => ScreenPopEvent[]) & import("reselect").OutputSelectorFields<(args_0: CcfScreenPopState, args_1: ContactData | null) => ScreenPopEvent[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
* Function to get the Panel Open in Browser(PanelPopOut) setting from localstorage, defaults to false
* @returns returns the panel pop out setting
* @example -getPanelPopPoutSetting()
*/
export declare const getPanelPopOutSetting: () => boolean;
/**
* Function to get the PAGE action setting from localstorage, defaults to false
* @returns returns the panel pop out setting
* @example -getPanelPopPoutSetting()
*/
export declare const getPageActionPopOutSetting: () => boolean;
/**
* Function to get the Page Open Uri
* @returns returns the page Open Uri
* @example -getPageOpenUri()
*/
export declare const getPageOpenUri: (currentAgentId: string, contactId: string, busNo: string) => string;
