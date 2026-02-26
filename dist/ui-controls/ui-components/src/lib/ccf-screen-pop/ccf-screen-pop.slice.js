import { createSelector, createSlice, } from '@reduxjs/toolkit';
import { GetNextEventType, NotificationSettings, StorageKeys } from '@nice-devone/core-sdk';
import { VoiceContactStatus } from '@nice-devone/common-sdk';
import { getActiveContactForScreenPop, getNonIncomingActiveContactForScreenPop } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
export const CCF_SCREEN_POP_FEATURE_KEY = 'screenpop';
export const initialScreenPopState = {
    screenPops: [],
};
export const CcfScreenPopSlice = createSlice({
    name: CCF_SCREEN_POP_FEATURE_KEY,
    initialState: initialScreenPopState,
    reducers: {
        /**
             * Function to set current screen pop
             * @param state - CcfScreenPopState
             * @param action  - PayloadAction<ScreenPopEvent>
             * @returns It appends the screen pop to the state
             * @example -setScreenPop(state, action)
             */
        setScreenPop(state, action) {
            state = updateScreenPopsWithClientData(state, action);
            return state;
        },
        /**
             * Function to remove contact based screen pops
             * @param state - CcfScreenPopState
             * @param action  - PayloadAction<string>
             * @returns removes the contact after it ends and returns the state
             * @example -removeContactScreenPops(state, action)
             */
        removeContactScreenPops(state, action) {
            if (state.screenPops.length > 0) {
                return Object.assign(Object.assign({}, state), { screenPops: state.screenPops.filter(sp => sp.contactId !== action.payload) });
            }
            return state;
        },
        /**
             * Function to toggle the screen pop between app space and an external window
             * @param state - ScreenPopState
             * @param action  - PayloadAction<number>
             * @returns It resets the screen pop state
             * @example -toggleScreenPop(state, action)
             */
        toggleScreenPop(state, action) {
            const { contactId, selectedIndex } = action.payload;
            const contactScreenPops = state.screenPops.filter((screenPop) => screenPop.contactId === contactId);
            const toggledScreenPop = contactScreenPops[selectedIndex];
            return Object.assign(Object.assign({}, state), { screenPops: state.screenPops.map((sp) => toggledScreenPop.pageUri === sp.pageUri && contactId === sp.contactId ? Object.assign(Object.assign({}, sp), { isPoppedOut: !sp.isPoppedOut, userInitiatedPops: true, userClicked: true }) : Object.assign(Object.assign({}, sp), { userClicked: false })) });
        },
        /**
             * Function to set the index of the window object when popped out
             * @param state - ScreenPopState
             * @param action  - PayloadAction(number,number)
             * @returns It resets the screen pop state
             * @example -setReferenceNumber(state, action)
             */
        setReferenceNumber(state, action) {
            return Object.assign(Object.assign({}, state), { screenPops: state.screenPops.map((sp, spIndex) => spIndex === action.payload.index && sp.windowObjectReference < 0 ? Object.assign(Object.assign({}, sp), { windowObjectReference: action.payload.windowObjectReference }) : sp) });
        },
        /**
             * Function to determine if a screen pop is part of an active media contact
             * @param state - CcfScreenPopState
             * @param action  - PayloadAction<ContactData>
             * @returns the state
             * @example -setAppSpace(state, action)
             */
        setAppSpace(state, action) {
            var _a;
            const contactStatus = (_a = action.payload) === null || _a === void 0 ? void 0 : _a.contactStatus;
            const pageActionErrorStatus = contactStatus === VoiceContactStatus.DISCONNECTED || contactStatus === VoiceContactStatus.HOLD || contactStatus === VoiceContactStatus.HOLDING;
            return Object.assign(Object.assign({}, state), { screenPops: state.screenPops.map((sp) => {
                    var _a;
                    if (sp.action === 'OPEN') {
                        //page action popout setting
                        return Object.assign(Object.assign({}, sp), { isPoppedOut: pageActionErrorStatus ? sp.isPoppedOut : getPageActionPopOutSetting() });
                    }
                    else
                        return ((_a = action === null || action === void 0 ? void 0 : action.payload) === null || _a === void 0 ? void 0 : _a.contactId) === sp.contactId && sp.action !== 'popUrl' && !sp.userInitiatedPops && (sp.action !== GetNextEventType.AGENT_ASSIST)
                            ? Object.assign(Object.assign({}, sp), { isPoppedOut: getPanelPopOutSetting() }) : sp;
                }) });
        },
        /**
            * Function to pop everything to the browser when the agent goes to Integrated agent breakpoints
            * @param state - ScreenPopState
            * @returns the state
            * @example -popEverythingOut()
            */
        popEverythingOut(state) {
            return Object.assign(Object.assign({}, state), { screenPops: state.screenPops.map((sp, i) => i >= 0 ? Object.assign(Object.assign({}, sp), { isPoppedOut: true }) : sp) });
        },
        /**
         * Function to keep track of what screen pop was clicked on
         * @param state - ScreenPopState
         * @returns the state
         * @example -setScreenPopUserClicked(action)
         */
        setScreenPopUserClicked(state, action) {
            return Object.assign(Object.assign({}, state), { screenPops: state.screenPops.map((sp, i) => i === action.payload ? Object.assign(Object.assign({}, sp), { userClicked: true }) : Object.assign(Object.assign({}, sp), { userClicked: false })) });
        },
        /**
        * Function to remove a screen pop
        * @param state - ScreenPopState
        * @returns the state
        * @example -removeScreenPop(action)
        */
        removeScreenPop(state, action) {
            const screenPop = action.payload;
            return Object.assign(Object.assign({}, state), { screenPops: state.screenPops.filter((sp) => !(sp.contactId === screenPop.contactId && sp.pageUri === screenPop.pageUri && sp.windowObjectReference === screenPop.windowObjectReference)) });
        },
        /**
            * Function to unset click for all screen pops
            * @param state - ScreenPopState
            * @returns the state
            * @example -unsetuserClicked()
            */
        unsetUserClicked(state) {
            return Object.assign(Object.assign({}, state), { screenPops: state.screenPops.map((sp) => { return Object.assign(Object.assign({}, sp), { userClicked: false }); }) });
        },
    },
    extraReducers: {},
});
/**
* Function to update client data for Panels in store
* @param state - CcfScreenPopState
* @param action  - PayloadAction<ScreenPopEvent>
* @returns It resets the screen pop state
* @example -updateScreenPopsWithClientData(state, action)
*/
export const updateScreenPopsWithClientData = (state, action) => {
    var _a;
    const activeContacts = action.payload.store;
    switch (action.payload.screenPop.popUrlDestination.toLowerCase()) {
        case 'contactpanel':
            action.payload.screenPop.isPoppedOut = false;
            break;
        case 'popout':
            action.payload.screenPop.isPoppedOut = true;
            break;
        default: // Check if ScreenPop is associated with an active contact
            if (activeContacts === null || activeContacts === void 0 ? void 0 : activeContacts.some((contact) => contact.contactId === action.payload.screenPop.contactId)) {
                action.payload.screenPop.isPoppedOut = getPanelPopOutSetting();
                if (action.payload.screenPop.action === 'OPEN') {
                    action.payload.screenPop.isPoppedOut = getPageActionPopOutSetting();
                }
            }
            break;
    }
    // if agent-assist event type, pop it out
    if (action.payload.screenPop.action === GetNextEventType.AGENT_ASSIST) {
        action.payload.screenPop.isPoppedOut = true;
    }
    const existingScreenPopIndex = (_a = state.screenPops) === null || _a === void 0 ? void 0 : _a.findIndex(sc => (sc.pageUri === action.payload.screenPop.pageUri));
    if (state.screenPops.length === 0
        || existingScreenPopIndex < 0
        || (existingScreenPopIndex >= 0
            && state.screenPops[existingScreenPopIndex].action === action.payload.screenPop.action)) {
        state.screenPops.push(action.payload.screenPop);
    }
    return state;
};
export const ccfScreenPopActions = CcfScreenPopSlice.actions;
export const CcfScreenPopReducer = CcfScreenPopSlice.reducer;
/**
* Function to get the screen pop from the state
* @param state - CcfScreenPopState
* @returns returns the CcfScreenPopState
* @example -getScreenPopState(rootState)
*/
const getScreenPopState = (rootState) => {
    return rootState[CCF_SCREEN_POP_FEATURE_KEY];
};
export const getAllScreenPop = createSelector(getScreenPopState, (state) => {
    return state.screenPops;
});
export const getActiveContactScreenPop = createSelector(getScreenPopState, getNonIncomingActiveContactForScreenPop, (state, selectedContact) => {
    if (selectedContact)
        return state.screenPops.filter(sc => sc.contactId === (selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.contactId));
    return state.screenPops;
});
// This selector will return screen pops for all selected contacts irrespective of contact status 
export const getSelectedContactScreenPop = createSelector(getScreenPopState, getActiveContactForScreenPop, (state, activeContactInSelectedInteraction) => {
    if (activeContactInSelectedInteraction)
        return state.screenPops.filter(sc => sc.contactId === (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.contactId));
    return state.screenPops;
});
/**
* Function to get the Panel Open in Browser(PanelPopOut) setting from localstorage, defaults to false
* @returns returns the panel pop out setting
* @example -getPanelPopPoutSetting()
*/
export const getPanelPopOutSetting = () => {
    return localStorage.getItem(NotificationSettings.PANEL_POPOUT) === 'true' ? true : false;
};
/**
* Function to get the PAGE action setting from localstorage, defaults to false
* @returns returns the panel pop out setting
* @example -getPanelPopPoutSetting()
*/
export const getPageActionPopOutSetting = () => {
    //include null to default to 25.1 behavior
    return ['true', null].includes(localStorage.getItem(NotificationSettings.PAGE_ACTION_POPOUT)) ? true : false;
};
/**
* Function to get the Page Open Uri
* @returns returns the page Open Uri
* @example -getPageOpenUri()
*/
export const getPageOpenUri = (currentAgentId, contactId, busNo) => {
    const cxoneConfig = JSON.parse(localStorage.getItem(StorageKeys.CXONE_CONFIG) || '');
    const acdBaseUri = cxoneConfig.acdApiBaseUri.replace('api-', 'home-');
    return acdBaseUri + '/WebScripting/Default.aspx' + '?id=' + currentAgentId + '&__ContactID=' + contactId + '&__bus_no=' + busNo + '&__type=' + 'ONPAGEOPEN';
};
//# sourceMappingURL=ccf-screen-pop.slice.js.map