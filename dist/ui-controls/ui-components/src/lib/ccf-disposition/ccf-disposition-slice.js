import { __awaiter } from "tslib";
import { CcfLogger } from '@nice-devone/agent-sdk';
import { MediaType, AgentAssistCommand, AutoSummaryErrorCode, } from '@nice-devone/common-sdk';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { isDST } from '../../util/common';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import { formatPhoneForApiSend } from '../../util/uiValidationUtils';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { getSelectedDigitalDisposition } from '../ccf-assignment-panel/ccf-assignment-utils';
;
;
;
export const initialDispositionState = {
    isDispositionOpen: false,
    dispositionType: '',
    dispositionOutcomeResponse: {},
    dispositions: {},
    dispositionsErrorResponse: {},
    autoSummaryEnabledContacts: [],
    contactPendingRedial: {},
    isCoolingDown: false,
    attemptCount: 0,
    retryCountdown: 0,
    lastAttemptAt: null,
};
// --- Retry Button State Selectors ---
/**
 * Selector to get the isCoolingDown state from the disposition slice.
 * @returns A selector function that retrieves the isCoolingDown boolean value.
 * @example
 * const isCoolingDown = useSelector(getCoolingDown());
 */
export const getCoolingDown = () => createSelector(getDispositionState, (state) => state.isCoolingDown);
/**
 * Selector to get the attemptCount state from the disposition slice.
 * @returns A selector function that retrieves the attemptCount value.
 * @example
 * const attemptCount = useSelector(getAttemptCount());
 */
export const getAttemptCount = () => createSelector(getDispositionState, (state) => state.attemptCount);
/**
 * Selector to get the retryCountdown state from the disposition slice.
 * @returns A selector function that retrieves the retryCountdown value.
 * @example
 * const retryCountdown = useSelector(getRetryCountdown());
 */
export const getRetryCountdown = () => createSelector(getDispositionState, (state) => { var _a; return (_a = state.retryCountdown) !== null && _a !== void 0 ? _a : 0; });
/**
 * Selector to get the lastAttemptAt state from the disposition slice.
 * @returns A selector function that retrieves the lastAttemptAt value.
 * @example
 * const lastAttemptAt = useSelector(getRetryStartTime());
 */
export const getRetryStartTime = () => createSelector(getDispositionState, (state) => state.lastAttemptAt);
const logger = new CcfLogger('App.Disposition', 'disposition-slice');
const cxoneAcdClient = CXoneAcdClient.instance;
export const DISPOSITION_KEY = 'disposition';
export const sendTags = createAsyncThunk('disposition/sendTags', (contactId, { getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { disposition: dispositionState } = getState();
    const formInputs = dispositionState.dispositions[contactId].formInputs;
    if (((_a = formInputs === null || formInputs === void 0 ? void 0 : formInputs.tags) === null || _a === void 0 ? void 0 : _a.length) > 0)
        cxoneAcdClient.contactManager.dispositionService.saveTags(contactId, formInputs.tags);
}));
/**
 * Used to save the disposition as well as case status change for digital contacts
 */
export const saveDigitalDisposition = createAsyncThunk('disposition/saveDigitalDisposition', (data, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    let dispositionOutcomeResponse;
    try {
        if (Object.keys(data.activeDisposition.formInputs.disposition || {}).length) {
            // if only the disposition is selected then only we will call the save disposition API
            yield cxoneAcdClient.contactManager.saveDisposition(data === null || data === void 0 ? void 0 : data.contactId, {
                primaryDispositionId: ((_b = data.activeDisposition.formInputs.disposition) === null || _b === void 0 ? void 0 : _b.dispositionId) || 0,
                primaryDispositionNotes: data.activeDisposition.formInputs.notes || '',
            });
            dispositionOutcomeResponse = {
                isError: false,
                messageKey: 'dispositionSaved',
            };
            dispatch(dispositionInteractionActions.updateDispositionOutcomeResponse(dispositionOutcomeResponse));
            dispatch(dispositionInteractionActions.updateIsDispositionSaved({ contactId: data === null || data === void 0 ? void 0 : data.contactId, isSaved: true }));
        }
    }
    catch (error) {
        dispositionOutcomeResponse = {
            isError: true,
            messageKey: 'unableToSaveDisposition',
        };
        dispatch(dispositionInteractionActions.updateDispositionOutcomeResponse(dispositionOutcomeResponse));
        dispatch(dispositionInteractionActions.updateIsDispositionSaved({ contactId: data === null || data === void 0 ? void 0 : data.contactId, isSaved: false }));
        // Dev Note: Logging the gutterIdx due to the linter requiring the parameter to be used
        logger.error('saveDigitalDisposition', `error while saving disposition ${JSON.stringify(error)}`);
    }
}));
/**
 * Used to save case status change for digital contacts
 */
export const saveDigitalStatus = createAsyncThunk('disposition/saveDigitalStatus', (data, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    let statusOutcomeResponse;
    const dispositionState = getState();
    const pendingSave = !!((_c = dispositionState === null || dispositionState === void 0 ? void 0 : dispositionState.disposition.dispositions[data.contactId]) === null || _c === void 0 ? void 0 : _c.isDigitalStatusSaving);
    try {
        if (!pendingSave) {
            dispatch(dispositionInteractionActions.setIsDigitalStatusSaving({ contactId: data.contactId, isDigitalStatusSaving: true }));
            yield (data === null || data === void 0 ? void 0 : data.selectedDigitalContact.changeStatus(data.toStatus));
            statusOutcomeResponse = {
                isError: false,
                messageKey: 'caseStatusChanged',
                placeholder: data.toStatus,
            };
            dispatch(dispositionInteractionActions.setPendingDigitalStatus({ contactId: data.contactId, pendingDigitalStatus: '' }));
            dispatch(dispositionInteractionActions.setIsDigitalStatusSaving({ contactId: data.contactId, isDigitalStatusSaving: false }));
            dispatch(dispositionInteractionActions.updateDigitalIsResolved(data === null || data === void 0 ? void 0 : data.contactId));
            dispatch(dispositionInteractionActions.updateDispositionOutcomeResponse(statusOutcomeResponse));
        }
    }
    catch (error) {
        statusOutcomeResponse = {
            isError: true,
            messageKey: 'unableToChangeCaseStatus',
            placeholder: data.toStatus,
        };
        dispatch(dispositionInteractionActions.updateDispositionOutcomeResponse(statusOutcomeResponse));
        dispatch(dispositionInteractionActions.setIsDigitalStatusSaving({ contactId: data.contactId, isDigitalStatusSaving: false }));
        logger.error('saveDigitalStatus', `error while changing the case status ${JSON.stringify(error)}`);
    }
}));
export const dispositionInteractionSlice = createSlice({
    name: DISPOSITION_KEY,
    initialState: initialDispositionState,
    reducers: {
        displayDispositionCard: (state, action) => {
            return Object.assign(Object.assign({}, state), { isDispositionOpen: action.payload });
        },
        setDispositionType: (state, action) => {
            return Object.assign(Object.assign({}, state), { dispositionType: action.payload });
        },
        addorUpdateDigitalContact: (state, action) => {
            var _a;
            const contact = action.payload;
            let isResolved = false;
            const contactId = contact.contactID;
            if (state.dispositions[contact.contactID] &&
                contact.status.toLocaleLowerCase() === 'closed' && !contact.isAssignedToAgentInbox // if the contact is closed and is already assigned then do not update the flag, as we have to show the disposition options enabled
            ) {
                isResolved = true;
            }
            const parsedDataFromLocalStorage = getDispositionLocalStorageData();
            const digitalContactId = contact.contactID;
            const selectedDispoition = getSelectedDigitalDisposition(contact.contactID, state.dispositions);
            return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [contactId]: Object.assign(Object.assign({}, state.dispositions[contactId]), { formInputs: {
                            type: MediaType.DIGITAL,
                            status: contact.status,
                            disposition: selectedDispoition,
                            notes: ((_a = parsedDataFromLocalStorage === null || parsedDataFromLocalStorage === void 0 ? void 0 : parsedDataFromLocalStorage.dispositionContacts[digitalContactId]) === null || _a === void 0 ? void 0 : _a.note) || '',
                            requireDisposition: contact.requireDisposition,
                        }, isResolved: isResolved }) }) });
        },
        // triggered onDispositionEvent, dispo list is loaded for a contact.
        addNewDispositionsByContact: (state, action) => {
            var _a, _b, _c, _d, _e, _f;
            const loadedDispoList = action.payload.dispositionData;
            if (loadedDispoList.length === 0 ||
                ((_a = loadedDispoList[0]) === null || _a === void 0 ? void 0 : _a.contactId) === undefined ||
                ((_c = (_b = state.dispositions[loadedDispoList[0].contactId]) === null || _b === void 0 ? void 0 : _b.dispositionData) === null || _c === void 0 ? void 0 : _c.length) > 0) {
                return state;
            }
            const isResolved = false;
            if (!loadedDispoList[0].mediaType) {
                const logger = new CcfLogger();
                logger.error('addNewDispositionsByContact', 'failed to retrieve mediaType, save button will be disabled');
            }
            const id = (_d = loadedDispoList[0]) === null || _d === void 0 ? void 0 : _d.contactId;
            const mediaType = loadedDispoList[0].mediaType;
            if (id && mediaType === MediaType.DIGITAL) {
                return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [id]: Object.assign(Object.assign({}, state.dispositions[id]), { dispositionData: loadedDispoList, formInputs: Object.assign(Object.assign({}, (_e = state.dispositions[id]) === null || _e === void 0 ? void 0 : _e.formInputs), { type: mediaType, disposition: null, notes: '' }), isResolved: isResolved, isReadyToSend: false }) }) });
            }
            else if (id && mediaType) {
                return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [id]: Object.assign(Object.assign({}, state.dispositions[id]), { dispositionData: loadedDispoList, formInputs: Object.assign(Object.assign({}, (_f = state.dispositions[id]) === null || _f === void 0 ? void 0 : _f.formInputs), { type: mediaType, disposition: null, notes: '' }), isResolved: isResolved, isReadyToSend: false }) }) });
            }
            return state;
        },
        setFormInput: (state, action) => {
            var _a;
            if (!state.dispositions[action.payload.contactId]) {
                return state;
            }
            return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [action.payload.contactId]: Object.assign(Object.assign({}, state.dispositions[action.payload.contactId]), { formInputs: Object.assign(Object.assign({}, (_a = state.dispositions[action.payload.contactId]) === null || _a === void 0 ? void 0 : _a.formInputs), { [action.payload.formInput]: action.payload.value }) }) }) });
        },
        clearDispositionById: (state, action) => {
            return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [action.payload]: undefined }) });
        },
        addTags: (state, action) => {
            var _a, _b, _c;
            const { contactId, tags } = action.payload.tagData;
            if (((_b = (_a = state.dispositions[contactId]) === null || _a === void 0 ? void 0 : _a.tagsData) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                return state;
            }
            const tagContact = action.payload.store.find((contact) => contact.contactId === contactId);
            return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [contactId]: Object.assign(Object.assign({}, state.dispositions[contactId]), { tagsData: [...tags], formInputs: Object.assign(Object.assign({}, (_c = state.dispositions[contactId]) === null || _c === void 0 ? void 0 : _c.formInputs), { 
                            // setting type like this to prevent type errors for digital media type for now.
                            type: (tagContact === null || tagContact === void 0 ? void 0 : tagContact.media) === MediaType.VOICEMAIL ? MediaType.VOICEMAIL : MediaType.VOICE, tags: [] }), isResolved: false, isReadyToSend: false }) }) });
        },
        readyDisposition: (state, action) => {
            const contactId = action.payload;
            return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [contactId]: Object.assign(Object.assign({}, state.dispositions[contactId]), { isReadyToSend: true }) }) });
        },
        sendDisposition: (state, action) => {
            var _a, _b, _c;
            const contactId = action.payload;
            const activeDisposition = state === null || state === void 0 ? void 0 : state.dispositions[contactId].formInputs;
            if (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.disposition) {
                let retryDateTime = '';
                const dispositionPayload = {
                    primaryDispositionId: activeDisposition.disposition.dispositionId,
                    primaryDispositionNotes: activeDisposition.notes,
                };
                if ((_a = activeDisposition.disposition) === null || _a === void 0 ? void 0 : _a.requireCommitmentAmount) {
                    dispositionPayload.primaryCommitmentAmount = activeDisposition.amount;
                }
                if (activeDisposition.disposition.requireRescheduleDate && (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.retryDateTime) && ((_b = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.retryTimeZone) === null || _b === void 0 ? void 0 : _b.offset)) {
                    retryDateTime = adjustTimeBasedOnOffset(activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.retryDateTime, (_c = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.retryTimeZone) === null || _c === void 0 ? void 0 : _c.offset);
                    dispositionPayload.primaryCallbackNumber = formatPhoneForApiSend(activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.retryNumber) || '';
                    dispositionPayload.primaryCallbackTime = retryDateTime;
                }
                if (activeDisposition.disposition.requireRescheduleDate && retryDateTime === '')
                    return state;
                cxoneAcdClient.contactManager.saveDisposition(contactId, dispositionPayload);
            }
            return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [contactId]: Object.assign(Object.assign({}, state.dispositions[contactId]), { isResolved: !!activeDisposition.disposition }) }), isDispositionOpen: false });
        },
        checkAndSendDisposition: (state, action) => {
            var _a, _b, _c;
            const contactId = action.payload;
            const activeDisposition = state.dispositions[contactId];
            const formInputs = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs;
            // Either there is no disposition selected to send or it is already sent
            if (activeDisposition === undefined ||
                (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs) === undefined ||
                !(formInputs === null || formInputs === void 0 ? void 0 : formInputs.disposition) ||
                !(activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isReadyToSend) ||
                (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isResolved)) {
                return state;
            }
            const dispositionPayload = {
                primaryDispositionId: formInputs.disposition.dispositionId,
                primaryDispositionNotes: formInputs.notes,
            };
            if ((_a = formInputs.disposition) === null || _a === void 0 ? void 0 : _a.requireCommitmentAmount) {
                dispositionPayload.primaryCommitmentAmount = formInputs.amount;
            }
            let retryDateTime = '';
            if (formInputs.disposition.requireRescheduleDate && (formInputs === null || formInputs === void 0 ? void 0 : formInputs.retryDateTime) && ((_b = formInputs === null || formInputs === void 0 ? void 0 : formInputs.retryTimeZone) === null || _b === void 0 ? void 0 : _b.offset)) {
                retryDateTime = adjustTimeBasedOnOffset(formInputs === null || formInputs === void 0 ? void 0 : formInputs.retryDateTime, (_c = formInputs === null || formInputs === void 0 ? void 0 : formInputs.retryTimeZone) === null || _c === void 0 ? void 0 : _c.offset);
                dispositionPayload.primaryCallbackNumber = formatPhoneForApiSend(formInputs === null || formInputs === void 0 ? void 0 : formInputs.retryNumber) || '';
                dispositionPayload.primaryCallbackTime = retryDateTime;
            }
            if (formInputs.disposition.requireRescheduleDate && retryDateTime === '')
                return state;
            cxoneAcdClient.contactManager.saveDisposition(contactId, dispositionPayload);
            return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [contactId]: Object.assign(Object.assign({}, state.dispositions[contactId]), { isResolved: true }) }), isDispositionOpen: false });
        },
        updateDispositionOutcomeResponse: (state, action) => {
            return Object.assign(Object.assign({}, state), { dispositionOutcomeResponse: action.payload });
        },
        updateIsDispositionSaved: (state, action) => {
            var _a;
            const { contactId, isSaved } = (_a = action.payload) !== null && _a !== void 0 ? _a : {};
            return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [contactId]: Object.assign(Object.assign({}, state.dispositions[contactId]), { isDispositionSaved: isSaved }) }) });
        },
        updateIsShowOutcomeConfirmationDialog: (state, action) => {
            return Object.assign(Object.assign({}, state), { isShowOutcomeConfirmationDialog: action.payload });
        },
        clearDispositionOutcomeResponse: (state) => {
            return Object.assign(Object.assign({}, state), { dispositionOutcomeResponse: {} });
        },
        updateDispositionErrorResponse: (state, action) => {
            var _a;
            const { contactId, errorDetails } = (_a = action.payload) !== null && _a !== void 0 ? _a : {};
            return Object.assign(Object.assign({}, state), { dispositionsErrorResponse: Object.assign(Object.assign({}, state.dispositionsErrorResponse), { [contactId]: Object.assign({}, errorDetails) }) });
        },
        updateDigitalIsResolved: (state, action) => {
            const contactId = action.payload;
            return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [contactId]: Object.assign(Object.assign({}, state.dispositions[contactId]), { isResolved: false }) }) });
        },
        // state change after reloading data from localstorage for selected dispostion and notes.
        reloadDispositionData: (state, action) => {
            var _a, _b;
            const contactId = action.payload.contactId;
            return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [contactId]: Object.assign(Object.assign({}, state.dispositions[contactId]), { formInputs: Object.assign(Object.assign(Object.assign({}, (_a = state.dispositions[contactId]) === null || _a === void 0 ? void 0 : _a.formInputs), action.payload.formInputs), { disposition: Object.assign(Object.assign({}, (_b = state.dispositions[contactId]) === null || _b === void 0 ? void 0 : _b.formInputs.disposition), action.payload.formInputs.disposition) }) }) }) });
        },
        setAutoSummaryData: (state, action) => {
            var _a;
            const contactId = action.payload.contactId;
            return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [contactId]: Object.assign(Object.assign({}, state.dispositions[contactId]), { autoSummaryErrorMessage: action.payload.messageError, formInputs: Object.assign(Object.assign({}, (_a = state.dispositions[contactId]) === null || _a === void 0 ? void 0 : _a.formInputs), { notes: action.payload.text }) }) }) });
        },
        setAutoSummaryStatus: (state, action) => {
            const contactId = action.payload.contactId;
            return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [contactId]: Object.assign(Object.assign({}, state.dispositions[contactId]), { autoSummaryStatus: action.payload.status }) }) });
        },
        setisGenerateAutoSummaryRequestSent: (state, action) => {
            const contactId = action.payload.contactId;
            const isSent = action.payload.isSent;
            if (contactId && typeof isSent === 'boolean') {
                return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [contactId]: Object.assign(Object.assign({}, state.dispositions[contactId]), { isGenerateAutoSummaryRequestSent: isSent }) }) });
            }
            else {
                return state;
            }
        },
        setAutoSummaryEnabledContact: (state, action) => {
            var _a;
            if (!((_a = state.autoSummaryEnabledContacts) === null || _a === void 0 ? void 0 : _a.includes(action.payload))) {
                const autoSummaryEnabledContacts = state.autoSummaryEnabledContacts || [];
                return Object.assign(Object.assign({}, state), { autoSummaryEnabledContacts: [...autoSummaryEnabledContacts, action.payload] });
            }
            else {
                return state;
            }
        },
        setAutoSummaryTimeout: (state, action) => {
            const contactId = action.payload.contactId;
            return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [contactId]: Object.assign(Object.assign({}, state.dispositions[contactId]), { hasAutoSummaryTimedOut: action.payload.timeout }) }) });
        },
        setDispositionOrTagList: (state, action) => {
            return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [action.payload.contactId]: Object.assign(Object.assign({}, state.dispositions[action.payload.contactId]), { [action.payload.key]: action.payload.value }) }) });
        },
        setFinalSummaryTimeout: (state, action) => {
            const contactId = action.payload.contactId;
            return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [contactId]: Object.assign(Object.assign({}, state.dispositions[contactId]), { hasFinalSummaryTimedout: action.payload.timeout }) }) });
        },
        setIsGenerateFinalSummaryRequestSent: (state, action) => {
            const contactId = action.payload.contactId;
            const isSent = action.payload.isSent;
            if (contactId && typeof isSent === 'boolean') {
                return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [contactId]: Object.assign(Object.assign({}, state.dispositions[contactId]), { isGenerateFinalSummaryRequestSent: isSent }) }) });
            }
            else {
                return state;
            }
        },
        setIsDigitalStatusSaving: (state, action) => {
            const contactId = action.payload.contactId;
            const isDigitalStatusSaving = action.payload.isDigitalStatusSaving;
            if (contactId && typeof isDigitalStatusSaving === 'boolean') {
                return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [contactId]: Object.assign(Object.assign({}, state.dispositions[contactId]), { isDigitalStatusSaving: action.payload.isDigitalStatusSaving }) }) });
            }
            else {
                return state;
            }
        },
        /**
         * Updates the pending digital status for a specific contact.
         * @param state - The current state of the disposition slice.
         * @param action - The action containing the contact ID and the new pending digital status.
         * @returns The updated state with the new pending digital status for the specified contact.
         * @example
         * dispatch(dispositionInteractionActions.setPendingDigitalStatus(
         *   contactId: '12345',
         *   pendingDigitalStatus: 'newStatus'
         * ));
         */
        setPendingDigitalStatus: (state, action) => {
            const contactId = action.payload.contactId;
            const pendingDigitalStatus = action.payload.pendingDigitalStatus;
            if (contactId && typeof pendingDigitalStatus === 'string') {
                return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [contactId]: Object.assign(Object.assign({}, state.dispositions[contactId]), { pendingDigitalStatus: action.payload.pendingDigitalStatus }) }) });
            }
            else {
                return state;
            }
        },
        /**
         * Updates the open/close state of the autosummary failure toast for a specific contact.
         * @param state - The current state of the disposition slice.
         * @param action - The action containing the contact ID and the new pending digital status.
         * @returns The updated state with the open/close state of the toast for the specified contact.
         * @example
         * dispatch(dispositionInteractionActions.setIsToastOpen(
         *   contactId: '12345',
         *   setIsToastOpen: true
         * ));
         */
        setIsDigitalStatusToastOpen: (state, action) => {
            const contactId = action.payload.contactId;
            const isDigitalStatusToastOpen = action.payload.isToastOpen;
            if (contactId && typeof isDigitalStatusToastOpen === 'boolean') {
                return Object.assign(Object.assign({}, state), { dispositions: Object.assign(Object.assign({}, state.dispositions), { [contactId]: Object.assign(Object.assign({}, state.dispositions[contactId]), { isDigitalStatusToastOpen: action.payload.isDigitalStatusToastOpen }) }) });
            }
            else {
                return state;
            }
        },
        /**
         * Function sets pending voice contact for redial
         * @param state -InboxState
         * @param action -PayloadAction<PendingRedialContact>
         * @example - dispatch(setPendingVoiceContactForRedial(PendingRedialContact))
         */
        setPendingVoiceContactForRedial(state, action) {
            return Object.assign(Object.assign({}, state), { contactPendingRedial: action.payload });
        },
        /**
         * Function clears pending voice contact for redial
         * @param state -InboxState
         * @example - dispatch(setPendingVoiceContactForRedial())
         */
        clearPendingVoiceContactForRedial(state) {
            return Object.assign(Object.assign({}, state), { contactPendingRedial: {} });
        },
        /**
         * Sets the retry click count in the disposition state.
         * @param state - The current state of the disposition slice.
         * @param action - The action containing the new retry click count.
         * @example
         * dispatch(dispositionInteractionActions.setAttemptCount(3));
         */
        setAttemptCount(state, action) {
            state.attemptCount = action.payload;
        },
        /**
         * Sets the retry countdown in the disposition state.
         * @param state - The current state of the disposition slice.
         * @param action - The action containing the new retry countdown value.
         * @example
         * dispatch(dispositionInteractionActions.setRetryCountdown(10));
         */
        setRetryCountdown(state, action) {
            state.retryCountdown = action.payload;
        },
        /**
         * Sets the isCoolingDown state in the disposition slice.
         * @param state - The current state of the disposition slice.
         * @param action - The action containing the new isCoolingDown value.
         * @example
         * dispatch(dispositionInteractionActions.setCoolingDown(true));
         */
        setCoolingDown(state, action) {
            state.isCoolingDown = action.payload;
        },
        /**
         * Sets the lastAttemptAt in the disposition state.
         * @param state - The current state of the disposition slice.
         * @param action - The action containing the new lastAttemptAt value.
         * @example
         * dispatch(dispositionInteractionActions.setCanRetry(Date.now()));
         */
        setCanRetry(state, action) {
            state.lastAttemptAt = action.payload;
        },
    },
});
export const dispostionInteractionReducer = dispositionInteractionSlice.reducer;
export const dispositionInteractionActions = dispositionInteractionSlice.actions;
/**
 * Function to get disposition type
 * @param rootState - DispositionType
 * @returns It returns disposition type
 * @example - const disposition = getDispositionState(rootState)
 */
export const getDispositionState = (rootState) => rootState[DISPOSITION_KEY];
export const getIsDispositionOpen = createSelector(getDispositionState, (state) => state === null || state === void 0 ? void 0 : state.isDispositionOpen);
export const getDispositionType = createSelector(getDispositionState, (state) => state === null || state === void 0 ? void 0 : state.dispositionType);
export const getDispositionData = createSelector(getDispositionState, (state) => state);
export const getDispositionOutcomeResponse = createSelector(getDispositionState, (state) => state === null || state === void 0 ? void 0 : state.dispositionOutcomeResponse);
export const getContactPendingRedial = createSelector(getDispositionState, (state) => state === null || state === void 0 ? void 0 : state.contactPendingRedial);
/**
 * Function to get disposition data by contactId
 * @param contactId - Contact Id
 * @returns It returns disposition data by contactId
 * @example - const disposition = getDispositionByContactId(rootState, contactId)
 */
export const getPendingDigitalStatus = (contactId) => createSelector(getDispositionState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.dispositions[contactId]) === null || _a === void 0 ? void 0 : _a.pendingDigitalStatus; });
/**
 * Selector to get the open/close state of the toast for a specific contact.
 * @param contactId - The ID of the contact.
 * @returns A selector function that retrieves the `isToastOpen` state for the specified contact.
 * @example
 * const isToastOpen = useSelector(IsDigitalStatusToastOpen(contactId));
 */
export const getIsDigitalStatusToastOpen = (contactId) => createSelector(getDispositionState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.dispositions[contactId]) === null || _a === void 0 ? void 0 : _a.isDigitalStatusToastOpen; });
/**
 * Function to calculate the time based on time zone
 * @param dateTime - dateTime string in the format yyyy-mm-ddhh:mm:ss
 * @param tZOffset - offset of the time zone
 * @returns date time with the offset yyyy-mm-ddhh:mm:ss(-/+)hh:mm
 * @example - adjustTimeBasedOnOffset('2023-06-0523:11:10', '-01:00')
 */
export const adjustTimeBasedOnOffset = (dateTime, tZOffset) => {
    let retryDateTime = dateTime;
    const offsetHoursAndMinutes = tZOffset.split(':');
    let offsetHours = Number(offsetHoursAndMinutes[0]);
    const offsetMinutes = Number(offsetHoursAndMinutes[1]) || 0;
    if (isNaN(offsetHours)) {
        const offset = new Date().toTimeString().substring(12, 17);
        retryDateTime += offset.slice(0, 3) + ':' + offset.slice(3);
        return retryDateTime;
    }
    if (isDST(new Date()))
        offsetHours += 1;
    if (offsetHours < 0)
        retryDateTime += '-';
    else
        retryDateTime += '+';
    retryDateTime += String(Math.abs(offsetHours)).padStart(2, '0') + ':' + String(offsetMinutes).padStart(2, '0');
    return retryDateTime;
};
/**
 * Function to get disposition error response
 * @param caseId - Case Id
 * @returns It returns Disposition Error Response
 * @example - const dispositionError = getDispositionErrorResponseById(rootState)
 */
export const getDispositionErrorResponseById = (caseId) => createSelector(getDispositionState, (state) => state === null || state === void 0 ? void 0 : state.dispositionsErrorResponse[caseId]);
/**
 * Used to generate the disposition Auto Summary
 * * @example - dispatch(generateAutoSummary(autoSummaryPayload))
 */
export const generateAutoSummary = createAsyncThunk('disposition/generateAutoSummary', (data, { rejectWithValue, dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    yield cxoneAcdClient.contactManager.dispositionService.generateAutoSummary(data.caseId, data.autoSummaryPayload)
        .then((success) => {
        logger.debug('generateAutoSummary', `status: ${JSON.stringify(success.data)}`);
        dispatch(dispositionInteractionActions.setisGenerateAutoSummaryRequestSent({ contactId: data.caseId, isSent: true }));
        dispatch(dispositionInteractionActions.setAutoSummaryStatus({
            contactId: data.caseId,
            status: AgentAssistCommand.subscribed,
        }));
    })
        .catch((error) => {
        logger.error('generateAutoSummary', `error while generating auto summary - ${JSON.stringify(error)}`);
        dispatch(dispositionInteractionActions.setAutoSummaryData({
            messageError: AutoSummaryErrorCode.failedToGenerate,
            text: AutoSummaryErrorCode.failedToGenerate,
            contactId: data.caseId,
        }));
        throw rejectWithValue(error);
    });
}));
/**
 * Function to update disposition notes in local storage
 * @param dispositionData - disposition data
 * @param digitalContactId - contact ID
 * @example - adjustTimeBasedOnOffset('2023-06-0523:11:10', '-01:00')
 */
export const setDispositionToLocalStorage = (currentDispositionData, digitalContactId, notes) => {
    // If the disposition option selected then only we will store in to local storage
    if (currentDispositionData) {
        const selectedDispositionDetails = {
            dispositionId: currentDispositionData === null || currentDispositionData === void 0 ? void 0 : currentDispositionData.dispositionId,
            note: notes,
        };
        //Get data from local storage
        const parsedDataFromLocalStorage = getDispositionLocalStorageData();
        const draftDispositionContacts = {
            dispositionContacts: Object.assign(Object.assign({}, parsedDataFromLocalStorage.dispositionContacts), { [digitalContactId]: selectedDispositionDetails }),
        };
        LocalStorageHelper.setItem(StorageKeys.DRAFT_DISPOSITION_CONTACTS, draftDispositionContacts);
    }
};
/**
 * Function to get disposition data from local storage
 * @example getDispositionLocalStorageData();
 */
export const getDispositionLocalStorageData = () => {
    const dataFromLocalStorage = LocalStorageHelper.getItem(StorageKeys.DRAFT_DISPOSITION_CONTACTS);
    let parsedDataFromLocalStorage = {
        dispositionContacts: {},
    };
    if (dataFromLocalStorage)
        parsedDataFromLocalStorage = JSON.parse(dataFromLocalStorage);
    return parsedDataFromLocalStorage;
};
/**
 * Function to removed disposition details in local storage
 * @param digitalContactId - contact ID
 * @example - removedDispositionFromLocalStorage('1234635')
 */
export const removedDispositionFromLocalStorage = (digitalContactId) => {
    //Get data from local storage
    const parsedDataFromLocalStorage = getDispositionLocalStorageData();
    // if that id is already present in local storage then only we will remove it
    if (parsedDataFromLocalStorage === null || parsedDataFromLocalStorage === void 0 ? void 0 : parsedDataFromLocalStorage.dispositionContacts[digitalContactId]) {
        delete parsedDataFromLocalStorage.dispositionContacts[digitalContactId];
        const draftDispositionContacts = {
            dispositionContacts: Object.assign({}, parsedDataFromLocalStorage.dispositionContacts),
        };
        LocalStorageHelper.setItem(StorageKeys.DRAFT_DISPOSITION_CONTACTS, draftDispositionContacts);
    }
};
//# sourceMappingURL=ccf-disposition-slice.js.map