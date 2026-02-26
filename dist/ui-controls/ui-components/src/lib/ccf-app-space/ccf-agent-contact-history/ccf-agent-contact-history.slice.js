import { __awaiter } from "tslib";
import { createAsyncThunk, createSelector, createSlice, } from '@reduxjs/toolkit';
import { CallType, CcfLogger, CXoneClient } from '@nice-devone/agent-sdk';
import { MediaType, MediaTypeId, } from '@nice-devone/common-sdk';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import dayjs from 'dayjs';
const logger = new CcfLogger('App.contact-history', 'App.agent-contact-history-slice');
/**
 * Utility function to filter contacts within the last 3 days, sort by contactStart date (newest first) and limit to max count
 * @param contacts - Array of contact history responses
 * @param maxCount - Maximum number of contacts to return (default: 25)
 * @returns Filtered, sorted and limited array of contacts from the last 3 days
 * @example
 * const sorted = sortAndLimitContacts(contactsArray, 10);
 */
const sortAndLimitContacts = (contacts, maxCount = 25) => {
    const threeDaysAgo = dayjs().subtract(3, 'day');
    return contacts
        .filter((contact) => {
        if (!contact.contactStart)
            return false;
        const contactDate = dayjs(contact.contactStart);
        return contactDate.isAfter(threeDaysAgo) || contactDate.isSame(threeDaysAgo, 'day');
    })
        .sort((first, second) => {
        const firstDate = first.contactStart ? new Date(first.contactStart).getTime() : 0;
        const secondDate = second.contactStart ? new Date(second.contactStart).getTime() : 0;
        return secondDate - firstDate; // Sort newest first
    })
        .slice(0, maxCount);
};
export const ccfAgentState = {
    agentVoiceContactData: [],
    agentDigitalContactData: [],
    routingQueueIds: [],
};
export const AGENT_CONTACT_HISTORY_KEY = 'ccfAgentContactHistory';
export const CcfAgentContactHistorySlice = createSlice({
    name: AGENT_CONTACT_HISTORY_KEY,
    initialState: ccfAgentState,
    reducers: {
        /**
         * used to store voice contact data
         * @param rootState - AppSpace state
         * @example - storeAgentVoiceContactHistory(state)
         */
        storeAgentVoiceContactHistory(state, action) {
            return Object.assign(Object.assign({}, state), { agentVoiceContactData: action.payload });
        },
        /**
         * used to fecth Agent digital contact data
         * @param rootState - AppSpace state
         * @example -     storeAgentDigitalContactHistory(state)
         */
        storeAgentDigitalContactHistory(state, action) {
            return Object.assign(Object.assign({}, state), { agentDigitalContactData: action.payload });
        },
        /**
         * used to fecth Agent routing queue Id
         * @param rootState - AppSpace state
         * @example - storeRoutingQueueId(state)
         */
        storeRoutingQueueId(state, action) {
            return Object.assign(Object.assign({}, state), { routingQueueIds: action.payload });
        },
    },
});
export const CcfAgentContactHistoryActions = CcfAgentContactHistorySlice.actions;
export const ccfAgentContactHistoryReducer = CcfAgentContactHistorySlice.reducer;
/**
/**
 * Thunk action creator to interact with SDK and manage Authentication By Code flow
 *
 * @param args - client ID and auth code
 * ```
 * @example
 *  dispatch(getAcdContactHistory()
    );
 * ```
 */
export const getAcdContactHistory = createAsyncThunk('contact-history/acd', (request, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield CXoneClient.instance.cxoneCustomerCard.getAgentVoiceContactHistory(request);
        const response = results === null || results === void 0 ? void 0 : results.filter(x => Boolean(x)
            && (x.mediaType === MediaTypeId.PhoneCall.toString()
                || x.mediaType === MediaTypeId.VoiceEmail.toString()
                || x.mediaType === MediaTypeId.WorkItem.toString())).flat();
        const indexDBcontactHistory = yield CXoneClient.instance.agentContactHistory.getACDContactHistoryData();
        if (response && response.length) {
            if (Object.keys(indexDBcontactHistory).length > 0) {
                response.forEach(contactHistory => {
                    if (contactHistory.contactId && indexDBcontactHistory[contactHistory.contactId]) {
                        delete indexDBcontactHistory[contactHistory.contactId];
                    }
                });
                yield CXoneClient.instance.agentContactHistory.setACDContactHistoryData(indexDBcontactHistory);
            }
            // Combine response and unique indexDB entries, then sort and limit
            const combinedContacts = sortAndLimitContacts([...response, ...Object.values(indexDBcontactHistory)]);
            // Dispatch the combined contacts to Redux store
            dispatch(CcfAgentContactHistoryActions.storeAgentVoiceContactHistory(combinedContacts));
        }
        else {
            if (Object.keys(indexDBcontactHistory).length > 0) {
                // Sort the IndexedDB data by contactStart (newest first)
                const sortedContacts = sortAndLimitContacts([...Object.values(indexDBcontactHistory)]);
                dispatch(CcfAgentContactHistoryActions.storeAgentVoiceContactHistory(sortedContacts));
            }
        }
    }
    catch (error) {
        logger.error('getAcdContactHistory', `error while fetching acd contact history - ${JSON.stringify(error)}`);
        const indexDBcontactHistory = yield CXoneClient.instance.agentContactHistory.getACDContactHistoryData();
        if (Object.keys(indexDBcontactHistory).length > 0) {
            // Sort and limit contacts from IndexedDB
            const sortedContacts = sortAndLimitContacts([...Object.values(indexDBcontactHistory)]);
            dispatch(CcfAgentContactHistoryActions.storeAgentVoiceContactHistory(sortedContacts));
        }
    }
}));
/**
/**
 * Thunk to retrive dispositon notes for an interaction
 *
 * @param contactId - contact ID of the interaction
 * ```
 * @example
 *  dispatch(getContactHistoryDisposition(<contactID>)).unwrap();
 * ```
 */
export const getContactHistoryDisposition = createAsyncThunk('contact-history/disposition', (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield CXoneAcdClient.instance.contactManager.dispositionService.getSavedDisposition(contactId);
        return response;
    }
    catch (error) {
        logger.error('getContactHistoryDisposition', `error while fetching contact history disposition - ${JSON.stringify(error)}`);
        return null;
    }
}));
/**
/**
 * Thunk to retrieve all the applicable dispositions for a skill
 *
 * @param parameters - container parameter for the following parameters
 *
 * @param skillId - unique skill ID
 * @param mediaType - media type of the skill
 * ```
 * @example
 *  dispatch(getDispositionsForSkill(<skillId>)).unwrap();
 * ```
 */
export const getDispositionsForSkill = createAsyncThunk('contact-history/dispositions-by-skill', (parameters) => __awaiter(void 0, void 0, void 0, function* () {
    const { skillId, mediaType } = parameters;
    try {
        const response = yield CXoneAcdClient.instance.contactManager.dispositionService.getDispositions(skillId, mediaType);
        return response;
    }
    catch (error) {
        logger.error('getDispositionsForSkill', `error while fetching dispositions by skill - ${JSON.stringify(error)}`);
        return null;
    }
}));
/**
/**
 * Thunk action creator to interact with SDK and manage Authentication By Code flow
 *
 * @param args - client ID and auth code
 * ```
 * @example
 *  dispatch(
      getDigitalContactHistory()
    );
 * ```
 */
/* istanbul ignore next  */
export const getDigitalContactHistory = createAsyncThunk('', (request, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield CXoneClient.instance.cxoneCustomerCard.getAgentDigitalContactHistory(request.ownerAssignee);
        dispatch(CcfAgentContactHistoryActions.storeAgentDigitalContactHistory(response));
    }
    catch (error) {
        logger.error('getDigitalContactHistory', `error while fetching digital contact history - ${JSON.stringify(error)}`);
    }
}));
/**
 * Thunk action creator to interact with SDK and manage Authentication By Code flow
 *
 * @param args - client ID and auth code
 * ```
 * @example
 *  dispatch(
      getRoutingQueueId()
    );
 * ```
 */
export const getRoutingQueueId = createAsyncThunk('', (_args, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield CXoneClient.instance.directory.skillService.getRoutingQueueNames();
        dispatch(CcfAgentContactHistoryActions.storeRoutingQueueId(response));
    }
    catch (error) {
        logger.error('getRoutingQueueId', `error while fetching RoutingQueueId - ${JSON.stringify(error)}`);
    }
}));
/**
 * Thunk action creator to get digital user ID
 * @example
 * ```
 *  dispatch(getDigitalUserId());
 * ```
 */
export const getDigitalUserId = createAsyncThunk('contact-history/get-digital-user-id', () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let { digitalUserId } = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true);
        if (!digitalUserId) {
            const isDigitalEngagementEnabled = yield CXoneDigitalClient.instance
                .cxoneUser.checkUserDigitalEngagement();
            if (isDigitalEngagementEnabled) {
                const digitalUser = yield CXoneDigitalClient.instance
                    .digitalService.getDigitalUserDetails();
                digitalUserId = (_a = digitalUser === null || digitalUser === void 0 ? void 0 : digitalUser.user) === null || _a === void 0 ? void 0 : _a.id;
            }
        }
        return digitalUserId;
    }
    catch (error) {
        logger.error('getDigitalUserId', `error while fetching digital user id - ${JSON.stringify(error)}`);
    }
}));
/**
 * Thunk action creator to get store contact history data in indexDB
 * @param acdContactDetails - acd contact details object
 * @example - dispatch(storeContactHistoryIndexDB(acdContactDetails));
 *
 */
export const storeContactHistoryIndexDB = createAsyncThunk('inbox/storeContactHistoryIndexDB', ({ acdContactDetails, mediaType, dispositionData }, { getState }) => __awaiter(void 0, void 0, void 0, function* () {
    const callTypes = [CallType.CONSULT, CallType.RESKILL_PROXY];
    const mediaTypes = [MediaType.VOICEMAIL, MediaType.WORKITEM, MediaType.VOICE];
    const storeContactHistory = !(mediaType === MediaType.VOICE &&
        (callTypes.includes(acdContactDetails.callType) ||
            acdContactDetails.disconnectCode === 'BadNumber'));
    if (mediaTypes.includes(mediaType) && storeContactHistory) {
        const { agentState } = getState();
        let indexDBcontactHistory = yield CXoneClient.instance.agentContactHistory.getACDContactHistoryData();
        if (acdContactDetails && Object.keys(acdContactDetails).length) {
            // Add the new contact to the history
            indexDBcontactHistory[acdContactDetails.contactID] = CXoneClient.instance.agentContactHistory.createContactHistoryObject({
                acdContactDetails,
                mediaType,
                dispositionData,
                icAgentId: agentState.userInfo.icAgentId,
            });
            // If we have more than 25 contacts, sort and keep only the 25 newest
            if (Object.keys(indexDBcontactHistory).length > 25) {
                // Get sorted contacts (newest first) and keep only the top 25
                const sortedContacts = sortAndLimitContacts(Object.values(indexDBcontactHistory));
                // Reset indexDBcontactHistory with only the 25 newest contacts
                const newIndexDBcontactHistory = {};
                sortedContacts.forEach(contact => {
                    if (contact.contactId) {
                        newIndexDBcontactHistory[contact.contactId] = contact;
                    }
                });
                // Replace the old contact history with the new filtered one
                indexDBcontactHistory = newIndexDBcontactHistory;
            }
        }
        yield CXoneClient.instance.agentContactHistory.setACDContactHistoryData(indexDBcontactHistory);
    }
}));
/**
 * used to getInboxState
 * @param rootState - AppSpace state
 * @example - const appSpaceState = getInboxState(state)
 */
const getAgentContactHistory = (rootState) => {
    return rootState[AGENT_CONTACT_HISTORY_KEY];
};
export const cxoneAgentVoiceContactData = createSelector(getAgentContactHistory, (state) => state === null || state === void 0 ? void 0 : state.agentVoiceContactData);
export const cxoneAgentDigitalContactData = createSelector(getAgentContactHistory, (state) => state === null || state === void 0 ? void 0 : state.agentDigitalContactData);
export const cxoneRoutingQueuId = createSelector(getAgentContactHistory, (state) => state === null || state === void 0 ? void 0 : state.routingQueueIds);
//# sourceMappingURL=ccf-agent-contact-history.slice.js.map