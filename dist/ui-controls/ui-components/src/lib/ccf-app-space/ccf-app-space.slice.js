var _a;
import { __awaiter } from "tslib";
import { uuid } from 'uuidv4';
import { createAsyncThunk, createSelector, createSlice, } from '@reduxjs/toolkit';
import { CcfLogger, CXoneClient, FeatureToggleService } from '@nice-devone/agent-sdk';
import { DigitalMessageContentTypes, ReplyAPIStatus } from '@nice-devone/common-sdk';
import { dbInstance, IndexDBKeyNames, IndexDBStoreNames, LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { fetchAllQReplies, fetchOutboundQuickReplies, getReplaceVariableDetails, fetchUnifiedQuickReplies, toggleFavoriteQuickReply } from './ccf-quick-replies/ccf-quick-replies.util';
import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
import { isAppHidden } from '../global.app.slice';
import { Navigation } from '../../enums/navigation-menus';
const logger = new CcfLogger('App.react-ui-components', 'app-space-slice');
export const CCF_APP_SPACE_KEY = 'appSpace';
export const DYNAMIC_CONTENT_QUICK_RESPONSE = 'dynamicContent';
// Rich message types which are considered for implementation till now
export const RICH_MESSAGE_TYPES = [
    DigitalMessageContentTypes.RICH_LINK,
    DigitalMessageContentTypes.LIST_PICKER,
    DigitalMessageContentTypes.QUICK_REPLIES,
    DigitalMessageContentTypes.TIME_PICKER,
    DigitalMessageContentTypes.FORM
];
const isContactHistoryHidden = (_a = (LocalStorageHelper.getItem(StorageKeys.AGENT_PROFILE_CONFIGURATION, true) || [])) === null || _a === void 0 ? void 0 : _a.hideContactHistory;
const defaultHomeApp = isContactHistoryHidden ? Navigation.DIRECTORY : Navigation.CONTACTHISTORY;
const FAV_QK_REPLY_FLUSH_DELAY = 2000;
export const initialCcfAppSpaceState = {
    query: {
        searchBox: '',
    },
    isLoading: false,
    isOutboundQuickRepliesLoading: false,
    favQReplies: [],
    allQReplies: [],
    favQuickOutboundReplies: [],
    allQRepliesOutbound: [],
    allMessageTemplates: [],
    selectedQReply: {},
    varReplacedContent: { content: '' },
    qReplySent: '',
    previewQuickReply: false,
    isQReplySent: false,
    appSpaceSelectedTab: {
        index: defaultHomeApp,
        tab: defaultHomeApp,
    },
    isAppSpaceTwoColumn: false,
    previewOutboundTemplate: false,
    quickReplyToastResponse: {},
    outboundQuickReplyNextLinks: {},
    nextLinks: {},
    favNextLinks: {},
    totalRecords: 0,
    totalUnifiedFavoriteQuickReplies: 0,
    richMessageSendState: ReplyAPIStatus.IDEAL,
    draftRichMessagePayload: {},
    showClientDataApiFailedFavQkReplyToast: { storageExceeded: false, apiFailed: false },
    storeFavsToastReference: null,
    allFavQuickReplies: { inbound: [], outbound: [] },
    unifiedFavoriteQuickReplies: [],
    quickRepliesByPage: {},
    favoriteQuickRepliesByPage: {},
    favoriteToggleToast: null,
};
export const fetchAllMessageTemplates = createAsyncThunk('appSpace/messageTemplates', (channelId, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    if (channelId) {
        const allMessageTemplates = yield CXoneDigitalClient.instance.digitalService.getExternalPlatformTemplates(channelId);
        dispatch(UpdateAllMessageTemplate(allMessageTemplates));
        return allMessageTemplates;
    }
    else
        return;
}));
/**
  * to replace variables in a reply
  * @param caseId - current case id
  * @param replyId - current replyid
  * @example - `dispatch(replaceVariables({caseId, replyId}))`
*/
export const replaceVariables = createAsyncThunk('appSpace/replaceVars', ({ caseId, replyId }) => __awaiter(void 0, void 0, void 0, function* () {
    const replacedContent = yield CXoneDigitalClient.instance.digitalContactManager.digitalContactService
        .getReplaceVariables(caseId, replyId);
    return replacedContent;
}));
/**
  * to replace variables in a response
  * @param replyId - current replyid
  * @example - `dispatch(replaceQucikResponseVariables({replyId}))`
*/
export const replaceQucikResponseVariables = createAsyncThunk('appSpace/replaceQuickReplyVars', ({ replyId }) => __awaiter(void 0, void 0, void 0, function* () {
    const replacedContent = yield CXoneDigitalClient.instance.digitalContactManager.digitalContactService
        .getReplaceQuickResponseVariables(replyId);
    return replacedContent;
}));
export const clearFavQuickRepliesfromIDB = createAsyncThunk('appSpace/clearFavQuickRepliesfromIDB', () => __awaiter(void 0, void 0, void 0, function* () {
    CXoneDigitalClient.instance.digitalService.clearFavQuickReplies();
}));
export const getFavQuickReplies = createAsyncThunk('appSpace/getFavQuickReplies', (_, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    const { appSpace } = getState();
    const favQuickReplies = yield CXoneDigitalClient.instance.digitalService
        .getFavQuickReplies(false);
    dispatch(storeFavQuickReply(favQuickReplies));
    dispatch(storeAllFavQuickReplies({
        inbound: [...favQuickReplies.map(quickReply => quickReply.id)],
        outbound: [...appSpace.allFavQuickReplies.outbound],
    }));
}));
/**
  * to get favorite responses for an outbound chat
  * @param replyId - current replyid
  * @example - `dispatch(getFavOutboundQuickReplies())`
*/
export const getFavOutboundQuickReplies = createAsyncThunk('appSpace/getFavOutboundQuickReplies', (_, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    const { appSpace } = getState();
    const favQuickReplies = yield CXoneDigitalClient.instance.digitalService
        .getFavQuickReplies(true);
    dispatch(storeFavOutboundQuickReplies(favQuickReplies));
    dispatch(storeAllFavQuickReplies({
        inbound: [...appSpace.allFavQuickReplies.inbound],
        outbound: [...favQuickReplies.map(quickReply => quickReply.id)],
    }));
}));
/**
 * Updates the local storage entry for toggled favorite Quick Reply IDs.
 * @param qrId - The Quick Reply ID to add or remove from the toggled list.
 * @example -
 * ```
 * updateToggledFavQRLocalStorage(123);
 * ```
 */
function updateToggledFavQRLocalStorage(qrId) {
    const toggledIds = LocalStorageHelper.getItem(StorageKeys.FAV_QR_ID_TOGGLED, true) || [];
    const idx = toggledIds.indexOf(qrId);
    if (idx > -1) {
        toggledIds.splice(idx, 1);
    }
    else {
        toggledIds.push(qrId);
    }
    LocalStorageHelper.setItem(StorageKeys.FAV_QR_ID_TOGGLED, toggledIds);
}
/**
 * Used to batch and debounce favorite quick reply updates.
 * @example
 * ```
 * createDebouncedFavUpdater([1,2,3], 2000, false)
 * ```
 */
function createDebouncedFavUpdater(updateFavoriteQuickReplyIds, delay, isOutbound = false) {
    let favQuickReplyIdBuffer = [];
    let debounceTimer = null;
    let isUpdating = false;
    let errorHandled = false;
    /**
     * Used to flush and sync queued favorite agent updates.
     * @example
     * ```
     * await flushQueuedFavQuickReplies()
     * ```
     */
    const flushQueuedFavQuickReplies = createAsyncThunk('agentDirectory/flushQueuedFavoriteAgents', (_, { dispatch }) => __awaiter(this, void 0, void 0, function* () {
        if (isUpdating)
            return;
        isUpdating = true;
        const uniqueIds = [...new Set(favQuickReplyIdBuffer)];
        favQuickReplyIdBuffer = [];
        const clientData = LocalStorageHelper.getItem(StorageKeys.CLIENT_DATA, true) || {};
        try {
            if (dispatch) {
                yield updateFavoriteQuickReplyIds(uniqueIds, dispatch);
            }
        }
        catch (error) {
            if (!errorHandled) {
                errorHandled = true;
                if (isOutbound) {
                    yield handleClientDataApiFail({
                        clientDataKey: 'CXAFavOutQuickRep',
                        dbStore: IndexDBStoreNames.QUICKREPLIESOUTBOUND,
                        dbKey: IndexDBKeyNames.FAV_QUICK_REPLIES_OUTBOUND,
                    });
                }
                else {
                    yield handleClientDataApiFail({
                        clientDataKey: 'CXAFavInQuickRep',
                        dbStore: IndexDBStoreNames.QUICKREPLIES,
                        dbKey: IndexDBKeyNames.FAV_QUICK_REPLIES,
                    });
                }
                // Redux Rollback Toggle
                const toggledIds = LocalStorageHelper.getItem(StorageKeys.FAV_QR_ID_TOGGLED, true) || [];
                if (toggledIds.length && typeof dispatch === 'function') {
                    const db = yield dbInstance();
                    const favReplies = (yield db.get(isOutbound ? IndexDBStoreNames.QUICKREPLIESOUTBOUND : IndexDBStoreNames.QUICKREPLIES, isOutbound ? IndexDBKeyNames.FAV_QUICK_REPLIES_OUTBOUND : IndexDBKeyNames.FAV_QUICK_REPLIES)) || [];
                    if (isOutbound) {
                        dispatch(storeFavOutboundQuickReplies(favReplies));
                        dispatch(storeAllFavQuickReplies({
                            inbound: [...clientData.CXAFavInQuickRep || []],
                            outbound: [...favReplies.map(quickReply => quickReply.id)],
                        }));
                    }
                    else {
                        dispatch(storeFavQuickReply(favReplies));
                        dispatch(storeAllFavQuickReplies({
                            inbound: [...favReplies.map(quickReply => quickReply.id)],
                            outbound: [...clientData.CXAFavOutQuickRep || []],
                        }));
                    }
                    dispatch(rollbackFavQuickReplies({ toggledIds, favReplies: favReplies }));
                    LocalStorageHelper.setItem(StorageKeys.FAV_QR_ID_TOGGLED, []);
                }
            }
            if (errorHandled) {
                const typedError = error;
                if (String(typedError === null || typedError === void 0 ? void 0 : typedError.message).toLowerCase() === 'exceeds the limit of the database') {
                    dispatch(appSpaceSlice.actions.setClientDataApiFailedFavQkReplyToast({ storageExceeded: true, apiFailed: false }));
                }
                else {
                    dispatch(appSpaceSlice.actions.setClientDataApiFailedFavQkReplyToast({ storageExceeded: false, apiFailed: true }));
                }
            }
        }
        finally {
            isUpdating = false;
            errorHandled = false;
        }
    }));
    return (ids, dispatch) => {
        favQuickReplyIdBuffer = [...ids];
        if (debounceTimer)
            clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => dispatch(flushQueuedFavQuickReplies()), delay);
    };
}
/** Updates the inbound favorite quick reply IDs in the backend client data
 * @example
 * ```
 * updateInboundFavQkReply([101, 102, 103]);
 * ```
 */
const updateInboundFavQkReply = (favQkReplyIds) => __awaiter(void 0, void 0, void 0, function* () {
    yield CXoneClient.instance.agentSetting.updateAgentClientDataSettings({ cxaFavInQuickRep: favQkReplyIds });
});
/** Updates the outbound favorite quick reply IDs in the backend client data
 * @example
 * ```
 * updateOutboundFavQkReply([201, 202, 203]);
 * ```
 */
const updateOutboundFavQkReply = (favQkReplyIds) => __awaiter(void 0, void 0, void 0, function* () {
    yield CXoneClient.instance.agentSetting.updateAgentClientDataSettings({ cxaFavOutQuickRep: favQkReplyIds });
});
const queueFavQkReplyUpdate = createDebouncedFavUpdater(updateInboundFavQkReply, FAV_QK_REPLY_FLUSH_DELAY, false);
const queueFavQkReplyOutboundUpdate = createDebouncedFavUpdater(updateOutboundFavQkReply, FAV_QK_REPLY_FLUSH_DELAY, true);
/**
 * Used to sync favorite quick reply IDs from local storage to IndexedDB in case Client data API fails.
 * @example
 * ```
 * await handleClientDataApiFail({ clientDataKey, dbStore, dbKey })
 * ```
 */
const handleClientDataApiFail = ({ clientDataKey, dbStore, dbKey, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!clientDataKey)
        return;
    const clientData = LocalStorageHelper.getItem(StorageKeys.CLIENT_DATA, true) || {};
    const favQuickReplyIds = Array.isArray(clientData[clientDataKey])
        ? clientData[clientDataKey]
        : [];
    const favQuickReplies = favQuickReplyIds.map((id) => ({ id, isfavorite: true }));
    const db = yield dbInstance();
    if (!db)
        return;
    yield db.put(dbStore, favQuickReplies, dbKey);
});
/**
 * Used to toggle favorite quick reply in IndexedDB and sync with API.
 * @example
 * ```
 * await updateFavQuickRepliesInIDB({ dbStore, dbKey, replyId, queueUpdateFn, dispatch })
 * ```
 */
function updateFavQuickRepliesInIDB({ dbStore, dbKey, replyId, queueUpdateFn, dispatch, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield dbInstance();
        const favQkRepliesDB = (yield (db === null || db === void 0 ? void 0 : db.get(dbStore, dbKey))) || [];
        let favQkReplyIds = favQkRepliesDB.map(qrObj => qrObj.id);
        if (favQkReplyIds.includes(replyId)) {
            favQkReplyIds = favQkReplyIds.filter(id => id !== replyId);
        }
        else {
            favQkReplyIds = [...favQkReplyIds, replyId];
        }
        queueUpdateFn(favQkReplyIds, dispatch);
    });
}
const isFavoritesFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-favorites-AW-40314" /* FeatureToggles.CXA_FAVORITES_FEATURE_TOGGLE */);
export const setFavQuickReplies = createAsyncThunk('appSpace/setFavQuickReplies', (qr, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const favQR = { id: qr.id, isfavorite: qr.isfavorite };
    try {
        if (isFavoritesFTEnabled) {
            yield updateFavQuickRepliesInIDB({
                dbStore: IndexDBStoreNames.QUICKREPLIES,
                dbKey: IndexDBKeyNames.FAV_QUICK_REPLIES,
                replyId: qr.id,
                queueUpdateFn: queueFavQkReplyUpdate,
                dispatch,
            });
            updateToggledFavQRLocalStorage(qr.id);
        }
        if (qr.isfavorite) {
            yield CXoneDigitalClient.instance.digitalService.unmarkFavQuickReplies(favQR, false);
        }
        else {
            yield CXoneDigitalClient.instance.digitalService.markFavQuickReplies(favQR, false);
        }
        dispatch(toggleFavQuickReply(qr));
        dispatch(getFavQuickReplies());
    }
    catch (error) {
        logger.error('setFavQuickReplies', `error while setting favorite quick reply - ${JSON.stringify(error)}`);
    }
}));
export const setFavOutboundQuickReplies = createAsyncThunk('appSpace/setFavOutboundQuickReplies', (quickReply, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const favQuickReply = { id: quickReply.id, isfavorite: quickReply.isfavorite };
    try {
        if (isFavoritesFTEnabled) {
            yield updateFavQuickRepliesInIDB({
                dbStore: IndexDBStoreNames.QUICKREPLIESOUTBOUND,
                dbKey: IndexDBKeyNames.FAV_QUICK_REPLIES_OUTBOUND,
                replyId: quickReply.id,
                queueUpdateFn: queueFavQkReplyOutboundUpdate,
                dispatch,
            });
            updateToggledFavQRLocalStorage(quickReply.id);
        }
        if (quickReply.isfavorite) {
            yield CXoneDigitalClient.instance.digitalService.unmarkFavQuickReplies(favQuickReply, true);
        }
        else {
            yield CXoneDigitalClient.instance.digitalService.markFavQuickReplies(favQuickReply, true);
        }
        dispatch(toggleFavQuickReplyOutbound(quickReply));
        dispatch(getFavOutboundQuickReplies());
    }
    catch (error) {
        logger.error('setFavOutboundQuickReplies', `error while setting favorite outbound quick reply - ${JSON.stringify(error)}`);
    }
}));
export const setLocalStorageKey = createAsyncThunk('appSpace/setLocalStorageKey', (data) => __awaiter(void 0, void 0, void 0, function* () {
    LocalStorageHelper.setItem(data.key, data.value);
}));
/**
 * Used for sending rich message in outbound reply API
 */
export const sendRichMessage = createAsyncThunk('appSpace/sendRichMessage', (replyDetails, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e, _f;
    const contactDetails = replyDetails.contactDetails;
    const recipient = {
        idOnExternalPlatform: (_c = (_b = contactDetails.case) === null || _b === void 0 ? void 0 : _b.authorEndUserIdentity) === null || _c === void 0 ? void 0 : _c.idOnExternalPlatform,
        name: replyDetails.customerName,
        isPrimary: true,
        isPrivate: false,
    };
    const replyPayload = {
        messageContent: (_d = replyDetails === null || replyDetails === void 0 ? void 0 : replyDetails.richMessageDetails) === null || _d === void 0 ? void 0 : _d.messageContent,
        recipients: [recipient],
    };
    if (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.digitalSkillId) {
        replyPayload.contact = Object.assign(Object.assign({}, replyPayload.contact), { skillId: contactDetails.digitalSkillId });
    }
    // Dev Note: Change added for for visual indicators
    const xTraceId = uuid();
    const payload = {
        traceId: xTraceId,
        interactionId: (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.interactionId) || '',
        caseId: (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId) || '',
        replyPayload,
    };
    const isTrackingMessageDeliveryStatus = (_e = contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.channel) === null || _e === void 0 ? void 0 : _e.isTrackingMessageDeliveryStatus;
    //In case of private channels, need to display the message on interaction space with status as Delayed for visual indicator
    if (isTrackingMessageDeliveryStatus) {
        //set rich message status to pending to push the draft message in state and display delayed icon
        dispatch(setDraftRichMessagePayload(payload));
        dispatch(setRichMessageSendStatus(ReplyAPIStatus.PENDING));
    }
    contactDetails
        .reply(replyPayload, (_f = contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.channel) === null || _f === void 0 ? void 0 : _f.id, xTraceId)
        .then((_response) => {
        const successResponse = { isError: false, messageKey: 'sendMessageSuccess' };
        dispatch(updateQuickReplyToastResponse({ contactId: contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId, responseDetails: successResponse }));
        // Dev Note: Change added for for visual indicators
        // In case of private channels, update the message status to Sent for visual indicator
        if (isTrackingMessageDeliveryStatus) {
            //set rich message status to success to display sent
            dispatch(setRichMessageSendStatus(ReplyAPIStatus.SUCCESS));
        }
    })
        .catch((error) => {
        const errorResponse = { isError: true, messageKey: 'unableToSendMessage' };
        dispatch(updateQuickReplyToastResponse({ contactId: contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId, responseDetails: errorResponse }));
        logger.error('sendRichMessage', `error while sending rich message - ${JSON.stringify(error)}`);
        // Dev Note: Change added for for visual indicators
        // In case of private channels, delete the message from redux state when message sends failed
        if (isTrackingMessageDeliveryStatus) {
            //set rich message status to error to remove the dummy message from state
            dispatch(setRichMessageSendStatus(ReplyAPIStatus.ERROR));
        }
    }).finally(() => {
        dispatch(toggleRichMessageSelection({})); //To update rich message selection/focus
        if (isTrackingMessageDeliveryStatus) {
            //set rich message status to to ideal to avoid any further action
            dispatch(setRichMessageSendStatus(ReplyAPIStatus.IDEAL));
        }
    });
}));
/**
 * Used for sending quick response message directly using Outbound API from App space section itself
 * @param replyPayloadContent - payload to be sent in API of type RichMessagePayloadDetails
 * @example - `dispatch(sendDirectMessageFromPreview(replyPayloadObject))`
 */
export const sendDirectMessageFromPreview = createAsyncThunk('appSpace/sendDirectMessageFromPreview', (replyPayloadContent, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j, _k, _l;
    const digitalContactDetails = replyPayloadContent.contactDetails;
    const recipient = {
        idOnExternalPlatform: (_h = (_g = digitalContactDetails.case) === null || _g === void 0 ? void 0 : _g.authorEndUserIdentity) === null || _h === void 0 ? void 0 : _h.idOnExternalPlatform,
        name: replyPayloadContent.customerName,
        isPrimary: true,
        isPrivate: false,
    };
    const replyPayload = {
        messageContent: (_j = replyPayloadContent === null || replyPayloadContent === void 0 ? void 0 : replyPayloadContent.richMessageDetails) === null || _j === void 0 ? void 0 : _j.messageContent,
        recipients: [recipient],
        thread: { idOnExternalPlatform: (_k = digitalContactDetails.case) === null || _k === void 0 ? void 0 : _k.threadIdOnExternalPlatform },
    };
    if (digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.digitalSkillId) {
        replyPayload.contact = Object.assign(Object.assign({}, replyPayload.contact), { skillId: digitalContactDetails.digitalSkillId });
    }
    digitalContactDetails.reply(replyPayload, (_l = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.channel) === null || _l === void 0 ? void 0 : _l.id, uuid())
        .then((_response) => {
        const successResponse = { isError: false, messageKey: 'sendMessageSuccess' };
        dispatch(updateQuickReplyToastResponse({ contactId: digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.caseId, responseDetails: successResponse }));
    })
        .catch((error) => {
        const errorResponse = { isError: true, messageKey: 'unableToSendMessage' };
        dispatch(updateQuickReplyToastResponse({ contactId: digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.caseId, responseDetails: errorResponse }));
        logger.error('sendDirectMessageFromPreview', `error while sending direct rich message - ${JSON.stringify(error)}`);
    }).finally(() => {
        dispatch(toggleRichMessageSelection({}));
        dispatch(updateSelectedQReply({}));
    });
}));
export const appSpaceSlice = createSlice({
    name: CCF_APP_SPACE_KEY,
    initialState: initialCcfAppSpaceState,
    reducers: {
        /**
           * updated search query
           * @param state - app space state
           * @param action - `PayloadAction<{ key: string; value: string }>`
           * @example - `dispatch(updateQuery({key, value}))`
           */
        updateQuery(state, action) {
            return Object.assign(Object.assign({}, state), { query: Object.assign(Object.assign({}, state.query), { [action.payload.key]: action.payload.value }) });
        },
        /**
           * Updated selectedQReply state value on selected reply to preview that reply
           * @param state - app space state
           * @param action - PayloadAction<CXoneDigitalQuickReply>
           * @example - `dispatch(updateSelectedQReply(@param))`
           */
        updateSelectedQReply(state, action) {
            return Object.assign(Object.assign({}, state), { selectedQReply: action.payload });
        },
        /**
           * updating qReplySent state value after agent send the reply
           * @param state - app space state
           * @param action  - PayloadAction<string>
           * @example - `dispatch(updateSelectedQReply(@param))`
           */
        updateSentQReply(state, action) {
            return Object.assign(Object.assign({}, state), { qReplySent: action.payload });
        },
        /**
           *UpdateAllMessageTemplate update allMessageTemplates state
           * @param state - app space state
           * @param action - PayloadAction<ExternalPlatformTemplate>
           * @example - `dispatch(UpdateAllMessageTemplate(@param))`
           */
        UpdateAllMessageTemplate(state, action) {
            return Object.assign(Object.assign({}, state), { allMessageTemplates: action.payload });
        },
        /**
           * updating previewQuickReply state value to show preview screen or go back to list view
           * @param state - app space state
           * @param action - PayloadAction<boolean>
           * @example - `dispatch(updatePreviewQuickReply(@param))`
           */
        updatePreviewQuickReply(state, action) {
            return Object.assign(Object.assign({}, state), { previewQuickReply: action.payload });
        },
        /**
          * updating updatePreviewOutboundTemplate state value on set the selected reply and go back to all templates
          * @param state - app space state
          * @param action - PayloadAction<boolean>
          * @example - `dispatch(updatePreviewOutboundTemplate(@param))`
          */
        updatePreviewOutboundTemplate(state, action) {
            return Object.assign(Object.assign({}, state), { previewOutboundTemplate: action.payload });
        },
        /**
           * updating isQReplySent state value after sent out reply to enable toast msg
           * @param state - app space state
           * @param action - PayloadAction<boolean>
           * @example - `dispatch(updateIsQReplySent(@param))`
           */
        updateIsQReplySent(state, action) {
            return Object.assign(Object.assign({}, state), { isQReplySent: action.payload });
        },
        /**
           * Toggle favourite replies in the quick replies
           * @param state - appSpace state
           * @param action -PayloadAction<CXoneDigitalQuickReply>
           * @example - `dispatch (toggleFavQuickReply(@param))`
           */
        toggleFavQuickReply(state, action) {
            return Object.assign(Object.assign({}, state), { allQReplies: state.allQReplies.map(reply => reply.id === action.payload.id ? Object.assign(Object.assign({}, reply), { isfavorite: !action.payload.isfavorite }) : reply) });
        },
        /**
           * Toggle favourite replies in the quick replies
           * @param state - appSpace state
           * @param action -PayloadAction<CXoneDigitalQuickReply>
           * @example - `dispatch (toggleFavQuickReplyOutbound(replyObj))`
           */
        toggleFavQuickReplyOutbound(state, action) {
            return Object.assign(Object.assign({}, state), { allQRepliesOutbound: state.allQRepliesOutbound.map(reply => reply.id === action.payload.id ? Object.assign(Object.assign({}, reply), { isfavorite: !action.payload.isfavorite }) : reply) });
        },
        /**
         * Toggle rich message selection
         * @param state - appSpace state
         * @param action -PayloadAction<CXoneDigitalQuickReply>
         * @example - `dispatch (toggleRichMessageSelection(@param))`
         */
        toggleRichMessageSelection(state, action) {
            var _a;
            return Object.assign(Object.assign({}, state), { allQReplies: state.allQReplies.map((reply) => {
                    var _a;
                    return reply.id === action.payload.id && RICH_MESSAGE_TYPES.includes((_a = reply === null || reply === void 0 ? void 0 : reply.messageContent) === null || _a === void 0 ? void 0 : _a.type)
                        ? Object.assign(Object.assign({}, reply), { isSelected: true }) : Object.assign(Object.assign({}, reply), { isSelected: false });
                }), unifiedFavoriteQuickReplies: (_a = state.unifiedFavoriteQuickReplies) === null || _a === void 0 ? void 0 : _a.map((reply) => {
                    var _a, _b;
                    return (reply === null || reply === void 0 ? void 0 : reply.id) === ((_a = action === null || action === void 0 ? void 0 : action.payload) === null || _a === void 0 ? void 0 : _a.id) && RICH_MESSAGE_TYPES.includes((_b = reply === null || reply === void 0 ? void 0 : reply.messageContent) === null || _b === void 0 ? void 0 : _b.type)
                        ? Object.assign(Object.assign({}, reply), { isSelected: true }) : Object.assign(Object.assign({}, reply), { isSelected: false });
                }), allQRepliesOutbound: state.allQRepliesOutbound.map((reply) => {
                    var _a;
                    return reply.id === action.payload.id && RICH_MESSAGE_TYPES.includes((_a = reply === null || reply === void 0 ? void 0 : reply.messageContent) === null || _a === void 0 ? void 0 : _a.type)
                        ? Object.assign(Object.assign({}, reply), { isSelected: true }) : Object.assign(Object.assign({}, reply), { isSelected: false });
                }) });
        },
        /**
           * Function updates the app space tab status on change of tabs
           * @param state - InboxState
           * @param action - tab index and tab label
           * @returns -  updated app space tab label
           * @example - dispatch(updateAppSpaceTab(`{ index : 0, tab: 'Directory' }`))
          */
        updateAppSpaceTabStatus(state, action) {
            // Check added to change App Space Tab only if the tab is not hidden by Agent Profile Configuration
            if (action.payload.tab && isAppHidden(action.payload.tab))
                return state;
            const externalProdUrls = JSON.parse(localStorage.getItem(StorageKeys.EXTERNAL_PRODUCT_URLS) || '{}');
            if (externalProdUrls && typeof externalProdUrls === 'object' && Object.keys(externalProdUrls).length > 0) {
                CXoneClient.instance.directory.dynamicDirectory.setSelectedTabs(action.payload.tab, externalProdUrls.selectedMenuQuickApp);
            }
            return Object.assign(Object.assign({}, state), { appSpaceSelectedTab: Object.assign(Object.assign({}, state.appSpaceSelectedTab), { index: action.payload.index, tab: action.payload.tab }) });
        },
        /**
           * Function restes the variable content
           * @param state - InboxState
           * @returns -  updated app space variable content
           * @example - dispatch(resetVarReplacedContent)
          */
        resetVarReplacedContent(state) {
            return Object.assign(Object.assign({}, state), { varReplacedContent: {
                    content: '',
                } });
        },
        /**
         * Reducer function to store fav quick replies
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(storeFavQuickReply());
         * @returns - updated state
         */
        storeFavQuickReply(state, action) {
            return Object.assign(Object.assign({}, state), { favQReplies: action.payload });
        },
        /**
         * Reducer function to store fav outbound quick replies
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(storeFavOutboundQuickReplies());
         * @returns - updated state
         */
        storeFavOutboundQuickReplies(state, action) {
            return Object.assign(Object.assign({}, state), { favQuickOutboundReplies: action.payload });
        },
        /**
       * Function to check size of app space for two column structure
       * @param state - AppState
       * @param action - action.payload
       * @example - dispatch(setAppspaceResolution(`{ isAppSpaceTwoColumn: true/false }`));
       * @returns updated state
       */
        setAppspaceResolution(state, action) {
            return Object.assign(Object.assign({}, state), { isAppSpaceTwoColumn: action.payload >= 575 });
        },
        /**
         * Function to update quick reply toast response
         * @param state - AppState
         * @param action - action.payload
         * @example -
         * ```
         * dispatch(updateQuickReplyToastResponse(`{ contactId: '1234', errorDetails:{messageKey: 'unableToSendMessage'} }`));
         * ```
         * @returns updated state
         */
        updateQuickReplyToastResponse: (state, action) => {
            var _a;
            const { contactId, responseDetails } = (_a = action.payload) !== null && _a !== void 0 ? _a : {};
            return Object.assign(Object.assign({}, state), { quickReplyToastResponse: Object.assign(Object.assign({}, state.quickReplyToastResponse), { [contactId]: Object.assign({}, responseDetails) }) });
        },
        /**
         * Function to reset rich message send status
         * @param state - AppState
         * @param action - action.payload
         * @example -
         * ```
         * dispatch(setRichMessageSendStatus('success'));
         * ```
         * @returns updated state
         */
        setRichMessageSendStatus(state, action) {
            return Object.assign(Object.assign({}, state), { richMessageSendState: action.payload });
        },
        /**
         * Function to set draft rich message payload
         * @param state - AppState
         * @param action - action.payload
         * @example -
         * ```
         * dispatch(setDraftRichMessagePayload({content: 'dummy'}));
         * ```
         * @returns updated state
         */
        setDraftRichMessagePayload(state, action) {
            return Object.assign(Object.assign({}, state), { draftRichMessagePayload: action.payload });
        },
        /**
         * Function to rollback favorite quick replies in case of API failure
         * @example
         * ```
         * dispatch(rollbackFavQuickReplies({ toggledIds, favReplies }));
         * ```
         */
        rollbackFavQuickReplies: (state, action) => {
            const favIdSet = new Set(action.payload.favReplies.map(favReply => favReply.id));
            state.allQReplies = state.allQReplies.map(quickReply => action.payload.toggledIds.includes(quickReply.id)
                ? Object.assign(Object.assign({}, quickReply), { isfavorite: favIdSet.has(quickReply.id) }) : quickReply);
            state.allQRepliesOutbound = state.allQRepliesOutbound.map(quickReplyOutbound => action.payload.toggledIds.includes(quickReplyOutbound.id)
                ? Object.assign(Object.assign({}, quickReplyOutbound), { isfavorite: favIdSet.has(quickReplyOutbound.id) }) : quickReplyOutbound);
        },
        /**
         * Sets the toast visibility for client data API failure.
         * @example -
         * ```
         * dispatch(setClientDataApiFailedFavQkReplyToast(true));
         * ```
         */
        setClientDataApiFailedFavQkReplyToast(state, action) {
            state.showClientDataApiFailedFavQkReplyToast = action.payload;
        },
        /**
         * Sets the toast visibility for favorite toggle action.
         * @example -
         * ```
         * dispatch(setFavoriteToggleToast(true));
         * ```
         */
        setFavoriteToggleToast(state, action) {
            state.favoriteToggleToast = action.payload;
        },
        /**
         * clears the favorite toggle toast state
         * @example -
         * ```
         * dispatch(clearFavoriteToggleToast(state));
         * ```
         */
        clearFavoriteToggleToast(state) {
            state.favoriteToggleToast = null;
        },
        /**
         * Method used to set toast reference
         * @param state - DirectoryState
         * @param action - payload with an object containing toast reference ID
         * @example -
         * ```
         * dispatch(updateFavsToastReference(Id));
         * ```
         */
        updateFavsToastReference(state, action) {
            state.storeFavsToastReference = action.payload;
        },
        /**
         * Reducer function to store all fav quick replies
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(storeAllFavQuickReplies());
         * @returns - updated state
         */
        storeAllFavQuickReplies(state, action) {
            return Object.assign(Object.assign({}, state), { allFavQuickReplies: Object.assign({}, action.payload) });
        },
        /**
         * Clears the quick replies page cache
         * @param state - AppState
         * @example - dispatch(clearQuickRepliesCache(state));
         * @returns - updated state with cleared cache
         */
        clearQuickRepliesCache(state) {
            return Object.assign(Object.assign({}, state), { quickRepliesByPage: {} });
        },
        /**
         * Clears the favorite quick replies page cache
         * @param state - AppState
         * @example - dispatch(clearFavoriteQuickRepliesCache(state));
         * @returns - updated state with cleared favorite cache
         */
        clearFavoriteQuickRepliesCache(state) {
            return Object.assign(Object.assign({}, state), { favoriteQuickRepliesByPage: {} });
        },
        /**
         * Loads quick replies from cache for a specific page
         * @param state - AppState
         * @param action - PayloadAction with page number
         * @example - dispatch(loadQuickRepliesFromCache(2));
         * @returns - updated state with cached data loaded into allQReplies
         */
        loadQuickRepliesFromCache(state, action) {
            const pageNumber = action.payload;
            const cachedData = state.quickRepliesByPage[pageNumber];
            if (cachedData) {
                return Object.assign(Object.assign({}, state), { allQReplies: [...cachedData] });
            }
            return state;
        },
        /**
         * Loads favorite quick replies from cache for a specific page
         * @param state - AppState
         * @param action - PayloadAction with page number
         * @example - dispatch(loadFavoriteQuickRepliesFromCache(2));
         * @returns - updated state with cached data loaded into unifiedFavoriteQuickReplies
         */
        loadFavoriteQuickRepliesFromCache(state, action) {
            const pageNumber = action.payload;
            const cachedData = state.favoriteQuickRepliesByPage[pageNumber];
            if (cachedData) {
                return Object.assign(Object.assign({}, state), { unifiedFavoriteQuickReplies: [...cachedData] });
            }
            return state;
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchAllQReplies.pending, (state) => {
            return Object.assign(Object.assign({}, state), { isLoading: true, totalRecords: 0 });
        })
            .addCase(fetchAllQReplies.fulfilled, (state, action) => {
            var _a, _b, _c;
            return Object.assign(Object.assign({}, state), { isLoading: false, allQReplies: [...(_a = action.payload) === null || _a === void 0 ? void 0 : _a.allQReplies], nextLinks: (_b = action === null || action === void 0 ? void 0 : action.payload) === null || _b === void 0 ? void 0 : _b.nextLinks, totalRecords: (_c = action === null || action === void 0 ? void 0 : action.payload) === null || _c === void 0 ? void 0 : _c.totalRecords });
        })
            .addCase(fetchAllQReplies.rejected, (state) => {
            return Object.assign(Object.assign({}, state), { isLoading: false, allQReplies: [], nextLinks: {}, totalRecords: 0 });
        })
            .addCase(fetchUnifiedQuickReplies.pending, (state) => {
            return Object.assign(Object.assign({}, state), { isLoading: true });
        })
            .addCase(fetchUnifiedQuickReplies.fulfilled, (state, action) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const pageNumber = (_b = (_a = action === null || action === void 0 ? void 0 : action.payload) === null || _a === void 0 ? void 0 : _a.page) !== null && _b !== void 0 ? _b : 1;
            state.isLoading = false;
            if (action.payload.isFavorite) {
                state.unifiedFavoriteQuickReplies = (_c = action === null || action === void 0 ? void 0 : action.payload) === null || _c === void 0 ? void 0 : _c.allQuickReplies;
                state.totalUnifiedFavoriteQuickReplies = (_d = action === null || action === void 0 ? void 0 : action.payload) === null || _d === void 0 ? void 0 : _d.totalRecords;
                state.favNextLinks = (_e = action === null || action === void 0 ? void 0 : action.payload) === null || _e === void 0 ? void 0 : _e.nextLinks;
                state.favoriteQuickRepliesByPage = Object.assign(Object.assign({}, state.favoriteQuickRepliesByPage), { [pageNumber]: [...(_f = action === null || action === void 0 ? void 0 : action.payload) === null || _f === void 0 ? void 0 : _f.allQuickReplies] });
            }
            else {
                state.allQReplies = (_g = action === null || action === void 0 ? void 0 : action.payload) === null || _g === void 0 ? void 0 : _g.allQuickReplies;
                state.quickRepliesByPage = Object.assign(Object.assign({}, state.quickRepliesByPage), { [pageNumber]: [...(_h = action === null || action === void 0 ? void 0 : action.payload) === null || _h === void 0 ? void 0 : _h.allQuickReplies] });
                state.totalRecords = (_j = action === null || action === void 0 ? void 0 : action.payload) === null || _j === void 0 ? void 0 : _j.totalRecords;
                state.nextLinks = (_k = action === null || action === void 0 ? void 0 : action.payload) === null || _k === void 0 ? void 0 : _k.nextLinks;
            }
        })
            .addCase(toggleFavoriteQuickReply.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { allQReplies: state.allQReplies.map(reply => reply.id === action.payload.quickReplyId ? Object.assign(Object.assign({}, reply), { isFavorite: action.payload.markAsFavorite }) : reply) });
        })
            .addCase(fetchUnifiedQuickReplies.rejected, (state) => {
            return Object.assign(Object.assign({}, state), { isLoading: false, allQReplies: [], unifiedFavoriteQuickReplies: [], nextLinks: {}, totalRecords: 0, totalUnifiedFavoriteQuickReplies: 0 });
        })
            .addCase(fetchOutboundQuickReplies.pending, (state) => {
            return Object.assign(Object.assign({}, state), { isOutboundQuickRepliesLoading: true, allQRepliesOutbound: [] });
        })
            .addCase(fetchOutboundQuickReplies.fulfilled, (state, action) => {
            var _a, _b, _c;
            return Object.assign(Object.assign({}, state), { isOutboundQuickRepliesLoading: false, allQRepliesOutbound: [...((_b = (_a = action === null || action === void 0 ? void 0 : action.payload) === null || _a === void 0 ? void 0 : _a.allQR) !== null && _b !== void 0 ? _b : [])], outboundQuickReplyNextLinks: (_c = action === null || action === void 0 ? void 0 : action.payload) === null || _c === void 0 ? void 0 : _c.nextLinks });
        })
            .addCase(fetchOutboundQuickReplies.rejected, (state) => {
            return Object.assign(Object.assign({}, state), { isOutboundQuickRepliesLoading: false, allQRepliesOutbound: [], outboundQuickReplyNextLinks: {} });
        })
            .addCase(fetchAllMessageTemplates.pending, (state) => {
            return Object.assign(Object.assign({}, state), { isLoading: true });
        })
            .addCase(fetchAllMessageTemplates.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { isLoading: false, allMessageTemplates: [...action.payload] });
        })
            .addCase(fetchAllMessageTemplates.rejected, (state) => {
            return Object.assign(Object.assign({}, state), { isLoading: false, allMessageTemplates: [] });
        })
            .addCase(replaceVariables.pending, (state, _action) => {
            return Object.assign(Object.assign({}, state), { isLoading: true });
        })
            .addCase(replaceVariables.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { varReplacedContent: action.payload, isLoading: false });
        })
            .addCase(replaceVariables.rejected, (state, _action) => {
            return Object.assign(Object.assign({}, state), { varReplacedContent: { content: '' }, isLoading: false });
        })
            .addCase(replaceQucikResponseVariables.pending, (state, _action) => {
            return Object.assign(Object.assign({}, state), { isLoading: true });
        })
            .addCase(replaceQucikResponseVariables.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { varReplacedContent: action.payload, isLoading: false });
        })
            .addCase(replaceQucikResponseVariables.rejected, (state, _action) => {
            return Object.assign(Object.assign({}, state), { varReplacedContent: { content: '' }, isLoading: false });
        })
            .addCase(getReplaceVariableDetails.pending, (state) => {
            return Object.assign(Object.assign({}, state), { isLoading: true });
        })
            .addCase(getReplaceVariableDetails.fulfilled, (state, action) => {
            var _a, _b;
            return Object.assign(Object.assign({}, state), { varReplacedContent: { content: (_b = (_a = action === null || action === void 0 ? void 0 : action.payload) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.text }, isLoading: false });
        })
            .addCase(getReplaceVariableDetails.rejected, (state) => {
            return Object.assign(Object.assign({}, state), { isLoading: false });
        });
    },
});
export const appSpaceReducer = appSpaceSlice.reducer;
export const { updateQuery, updateSelectedQReply, updateSentQReply, UpdateAllMessageTemplate, updatePreviewQuickReply, updateIsQReplySent, toggleFavQuickReply, toggleFavQuickReplyOutbound, updateAppSpaceTabStatus, resetVarReplacedContent, storeFavQuickReply, storeFavOutboundQuickReplies, setAppspaceResolution, updatePreviewOutboundTemplate, toggleRichMessageSelection, updateQuickReplyToastResponse, setRichMessageSendStatus, setDraftRichMessagePayload, rollbackFavQuickReplies, updateFavsToastReference, storeAllFavQuickReplies, setClientDataApiFailedFavQkReplyToast, setFavoriteToggleToast, clearFavoriteToggleToast, clearQuickRepliesCache, loadQuickRepliesFromCache, clearFavoriteQuickRepliesCache, loadFavoriteQuickRepliesFromCache, } = appSpaceSlice.actions;
export default appSpaceSlice.reducer;
/**
   * used to getAppSpaceState
   * @param rootState - AppSpace state
   * @example - const appSpaceState = getAppSpaceState(state)
   */
const getAppSpaceState = (rootState) => {
    return rootState[CCF_APP_SPACE_KEY];
};
export const getAllQReplies = createSelector(getAppSpaceState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.allQReplies) !== null && _a !== void 0 ? _a : []; });
export const getUnifiedFavoriteQuickReplies = createSelector(getAppSpaceState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.unifiedFavoriteQuickReplies) !== null && _a !== void 0 ? _a : []; });
export const getFavQReplies = createSelector(getAppSpaceState, (state) => state.favQReplies);
export const getAllQRepliesOutbound = createSelector(getAppSpaceState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.allQRepliesOutbound) !== null && _a !== void 0 ? _a : []; });
export const getFavQRepliesOutbound = createSelector(getAppSpaceState, (state) => state.favQuickOutboundReplies);
export const getSelectedQReply = createSelector(getAppSpaceState, (state) => state.selectedQReply);
export const getSentQReply = createSelector(getAppSpaceState, (state) => state.qReplySent);
export const getPreviewQuickReply = createSelector(getAppSpaceState, (state) => state.previewQuickReply);
export const getIsQReplySent = createSelector(getAppSpaceState, (state) => state.isQReplySent);
export const getVarReplacedContent = createSelector(getAppSpaceState, (state) => state.varReplacedContent);
export const selectAppSpaceActiveTabStatus = createSelector(getAppSpaceState, (state) => state === null || state === void 0 ? void 0 : state.appSpaceSelectedTab);
export const getLoadingStatus = createSelector(getAppSpaceState, (state) => state.isLoading);
export const getIfMoreQRAvailable = createSelector(getAppSpaceState, (state) => state.outboundQuickReplyNextLinks);
export const getIfNextLinkAvailable = createSelector(getAppSpaceState, (state) => state.nextLinks);
export const getIsFavNextLinkAvailable = createSelector(getAppSpaceState, (state) => state.favNextLinks);
export const getTotalQRepliesCount = createSelector(getAppSpaceState, (state) => state.totalRecords);
export const getTotalFavoriteQRCount = createSelector(getAppSpaceState, (state) => state.totalUnifiedFavoriteQuickReplies);
export const getOutboundLoadingStatus = createSelector(getAppSpaceState, (state) => state.isOutboundQuickRepliesLoading);
/**
   * used to get the flag, if app space is greater than 575px
   * @param rootState - AppSpace state
   * @example - const appSpaceState = getAppspaceResolution(state)
   */
export const getAppspaceResolution = createSelector(getAppSpaceState, (state) => state === null || state === void 0 ? void 0 : state.isAppSpaceTwoColumn);
/**
   * used to get the flag, preview outbound templated is enable or not
   * @param rootState - AppSpace state
   * @example - const appSpaceState = getPreviewOutboundTemplate(state)
   */
export const getPreviewOutboundTemplate = createSelector(getAppSpaceState, (state) => state.previewOutboundTemplate);
/**
   * Used to get the all outbound message template list
   * @param rootState - AppSpace state
   * @example - const appSpaceState = getAllMessageTemplates(state)
   */
export const getAllMessageTemplates = createSelector(getAppSpaceState, (state) => state.allMessageTemplates);
/**
 * Function to get quick reply toast response by Id
 * @param caseId - Digital Case Id
 * @returns It returns quick reply toast Response
 * @example -
 * ```
 * const quickReplyToastDetails = getQuickReplyToastResponseById(rootState)
 *
 * ```
 */
export const getQuickReplyToastResponseById = (caseId) => createSelector(getAppSpaceState, (state) => state === null || state === void 0 ? void 0 : state.quickReplyToastResponse[caseId]);
export const getRichMessageSendState = createSelector(getAppSpaceState, (state) => state.richMessageSendState);
export const getDraftRichMessagePayload = createSelector(getAppSpaceState, (state) => state.draftRichMessagePayload);
/**
 * Returns whether the Fav Quick Reply API failure toast should be shown.
 * @example -
 * ```
 * const showApiFailedToast = useSelector(getClientDataApiFailedFavQkReplyToast);
 * ```
 */
export const getClientDataApiFailedFavQkReplyToast = createSelector(getAppSpaceState, (state) => state.showClientDataApiFailedFavQkReplyToast);
/**
 * Returns the toast reference ID for favorites.
 * @example -
 * ```
 * const favoritesToastReference = useSelector(getQuickReplyFavoritesToastReference);
 * ```
 */
export const getQuickReplyFavoritesToastReference = createSelector(getAppSpaceState, (state) => {
    return state.storeFavsToastReference;
});
/**
 * Returns the cached quick replies data by page.
 * @example -
 * ```
 * const getCachedData = useSelector(getCachedData);
 * ```
 */
export const getCachedData = createSelector(getAppSpaceState, (state) => {
    return state.quickRepliesByPage;
});
/**
 * Returns the cached favorite quick replies data by page.
 * @example -
 * ```
 * const getFavCachedData = useSelector(getFavCachedData);
 * ```
 */
export const getFavCachedData = createSelector(getAppSpaceState, (state) => {
    return state.favoriteQuickRepliesByPage;
});
/**
 * Returns the favorite toggle toast response.
 * @example -
 * ```
 * const getFavoriteToggleToast = useSelector(getFavoriteToggleToast);
 * ```
 */
export const getFavoriteToggleToast = createSelector(getAppSpaceState, (state) => state.favoriteToggleToast);
/**
 * Returns all quick replies marked as favorite
 * @example -
 * ```
 * const getAllFavQReplies = useSelector(getAllFavQReplies);
 * ```
 */
export const getAllFavQuickReplies = createSelector(getAppSpaceState, (state) => state.allFavQuickReplies);
//# sourceMappingURL=ccf-app-space.slice.js.map