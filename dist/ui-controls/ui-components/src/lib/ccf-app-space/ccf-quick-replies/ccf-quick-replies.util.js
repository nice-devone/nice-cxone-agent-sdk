import { __awaiter } from "tslib";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CcfLogger, FeatureToggleService } from '@nice-devone/agent-sdk';
import { storeFavQuickReply, storeFavOutboundQuickReplies, updateSentQReply, updateSelectedQReply, storeAllFavQuickReplies, setFavoriteToggleToast, clearFavoriteQuickRepliesCache } from '../ccf-app-space.slice';
import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
import dayjs from 'dayjs';
import { IndexDBKeyNames, IndexDBStoreNames, LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
/* This file maintains common logic related to all types of Quick replies or responses types on App Space */
let FavQuickRepliesFromIDB = [];
export const DYNAMIC_CONTENT_QUICK_RESPONSE = 'dynamicContent';
const logger = new CcfLogger('App.quick-replies', 'App.quick-replies-utils');
const isFavoritesFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-favorites-AW-40314" /* FeatureToggles.CXA_FAVORITES_FEATURE_TOGGLE */);
/**
* Syncs the cleaned favorites (deleted QR) to LocalStorage, IndexedDB, and Client Data API.
 * @example
 * ```
 * await cleanupStaleFavorites({
 *   clientDataKey: 'CXAFavInQuickRep',
 *   idbStoreName: IndexDBStoreNames.QUICKREPLIES,
 *   idbKeyName: IndexDBKeyNames.FAV_QUICK_REPLIES
 * });
 * ```
*/
export const cleanupStaleFavorites = ({ clientDataKey, idbStoreName, idbKeyName, }) => __awaiter(void 0, void 0, void 0, function* () {
    const clientData = LocalStorageHelper.getItem(StorageKeys.CLIENT_DATA, true) || {};
    const currentFavs = Array.isArray(clientData[clientDataKey])
        ? clientData[clientDataKey]
        : [];
    // Update IDB
    const favQRObjects = currentFavs === null || currentFavs === void 0 ? void 0 : currentFavs.map(id => ({ id, isfavorite: true }));
    yield CXoneDigitalClient.instance.digitalService.putFavQuickReplies(favQRObjects, idbStoreName, idbKeyName);
});
/**
* This method is used to get the list of Quick replies or responses
* @param contactId - contact Id of current active digital contact
* @param channelId - channel Id of current active digital contact
* @example getSecureFormLink('123456', 'abc12ef3456')
*/
export const fetchAllQReplies = createAsyncThunk('appSpace/allQReplies', ({ contactId, channelId }, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if (contactId) {
        if (!isFavoritesFTEnabled) {
            FavQuickRepliesFromIDB = (_a = yield CXoneDigitalClient.instance.digitalService.getFavQuickReplies(false)) !== null && _a !== void 0 ? _a : [];
            dispatch(storeFavQuickReply(FavQuickRepliesFromIDB));
        }
        let allQReplies = [];
        const nextLinksToDisplay = {};
        const totalRecordsToDisplay = 0;
        allQReplies = yield CXoneDigitalClient.instance.digitalContactManager.digitalContactService.getQuickReplies(contactId);
        let quickRepliesToDisplay = [];
        if (allQReplies.length >= 0) {
            quickRepliesToDisplay = allQReplies.filter((data) => { return (data === null || data === void 0 ? void 0 : data.type) !== DYNAMIC_CONTENT_QUICK_RESPONSE; });
        }
        if (channelId) {
            try {
                const quickResponses = yield CXoneDigitalClient.instance.digitalService.getQuickResponses([channelId]);
                if (quickResponses.length >= 0) {
                    quickRepliesToDisplay = quickRepliesToDisplay.concat(quickResponses);
                }
            }
            catch (error) {
                logger.error('fetchAllQReplies', 'error while fetching all quick replies - ' + JSON.stringify(error));
            }
        }
        // Remove stale ghosted favorites for IB, when deleted from backend config
        if (isFavoritesFTEnabled) {
            yield cleanupStaleFavorites({
                clientDataKey: 'CXAFavInQuickRep',
                idbStoreName: IndexDBStoreNames.QUICKREPLIES,
                idbKeyName: IndexDBKeyNames.FAV_QUICK_REPLIES,
            });
            FavQuickRepliesFromIDB = (_b = yield CXoneDigitalClient.instance.digitalService.getFavQuickReplies(false)) !== null && _b !== void 0 ? _b : [];
            dispatch(storeFavQuickReply(FavQuickRepliesFromIDB));
            // below logic is added so that when user switches between different channels favorites are maintained in store variable allFavQuickReplies
            const FavOutboundQuickRepliesFromIDB = (_c = yield CXoneDigitalClient.instance.digitalService.getFavQuickReplies(true)) !== null && _c !== void 0 ? _c : [];
            const favInboundQuickReplies = FavQuickRepliesFromIDB.map(quickReply => quickReply === null || quickReply === void 0 ? void 0 : quickReply.id);
            let favOutboundQuickReplies = [];
            if ((FavOutboundQuickRepliesFromIDB === null || FavOutboundQuickRepliesFromIDB === void 0 ? void 0 : FavOutboundQuickRepliesFromIDB.length) === 0) { // in case outbound replies are not yet loaded take values from clientdata in localstorage
                const clientData = LocalStorageHelper.getItem(StorageKeys.CLIENT_DATA, true) || {};
                favOutboundQuickReplies = (clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavOutQuickRep) || [];
            }
            else {
                favOutboundQuickReplies = FavOutboundQuickRepliesFromIDB.map(quickReply => quickReply === null || quickReply === void 0 ? void 0 : quickReply.id);
            }
            dispatch(storeAllFavQuickReplies({ inbound: favInboundQuickReplies, outbound: favOutboundQuickReplies }));
        }
        let allQRepliesWithFav = [];
        if (quickRepliesToDisplay.length >= 0) {
            allQRepliesWithFav = quickRepliesToDisplay.reduce((acc, qReply) => {
                const matchingFavReply = FavQuickRepliesFromIDB.find((favReply) => favReply.id === qReply.id);
                if (matchingFavReply !== undefined) {
                    acc = [
                        ...acc,
                        Object.assign(Object.assign({}, qReply), { isfavorite: true })
                    ];
                }
                else {
                    acc = [
                        ...acc,
                        Object.assign(Object.assign({}, qReply), { isfavorite: false })
                    ];
                }
                return acc;
            }, []);
        }
        return { allQReplies: allQRepliesWithFav, nextLinks: nextLinksToDisplay, totalRecords: totalRecordsToDisplay };
    }
    else
        return;
}));
/* istanbul ignore next */
/**
* This method is used to get the list of Quick replies or responses
* @param page - current page number
* @param channelId - its optional we will need when we want to get the rich messages
* @example fetchOutboundQuickReplies(1)
*/
export const fetchOutboundQuickReplies = createAsyncThunk('appSpace/outboundQuickReplies', ({ page, channelId, isCaseStatusNotInDraft = false }, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    if (!isFavoritesFTEnabled) {
        FavQuickRepliesFromIDB = (_d = yield CXoneDigitalClient.instance.digitalService.getFavQuickReplies(true)) !== null && _d !== void 0 ? _d : [];
        dispatch(storeFavOutboundQuickReplies(FavQuickRepliesFromIDB));
    }
    const { allQuickReplies, nextLinks } = yield CXoneDigitalClient.instance.digitalContactManager.digitalContactService.getQuickRepliesForOutboundContact(page, channelId);
    let quickRepliesToDisplay = [];
    if (allQuickReplies.length >= 0) {
        quickRepliesToDisplay = allQuickReplies.filter((data) => { return (data === null || data === void 0 ? void 0 : data.type) !== DYNAMIC_CONTENT_QUICK_RESPONSE; });
    }
    // Check if channelId is provided to get the rich messages
    if (channelId && isCaseStatusNotInDraft) {
        try {
            const quickResponses = yield CXoneDigitalClient.instance.digitalService.getQuickResponses([channelId]);
            if (quickResponses.length >= 0) {
                quickRepliesToDisplay = quickRepliesToDisplay.concat(quickResponses);
            }
        }
        catch (error) {
            logger.error('fetchOutboundQuickReplies', 'error while fetching outbound quick replies - ' + JSON.stringify(error));
        }
    }
    // Remove stale ghosted favorites for OB, when deleted from backend config
    if (isFavoritesFTEnabled) {
        yield cleanupStaleFavorites({
            clientDataKey: 'CXAFavOutQuickRep',
            idbStoreName: IndexDBStoreNames.QUICKREPLIESOUTBOUND,
            idbKeyName: IndexDBKeyNames.FAV_QUICK_REPLIES_OUTBOUND,
        });
        FavQuickRepliesFromIDB = (_e = yield CXoneDigitalClient.instance.digitalService.getFavQuickReplies(true)) !== null && _e !== void 0 ? _e : [];
        dispatch(storeFavOutboundQuickReplies(FavQuickRepliesFromIDB));
        // below logic is added so that when user switches between different channels favorites are maintained in store variable allFavQuickReplies
        const FavInboundQuickRepliesFromIDB = (_f = yield CXoneDigitalClient.instance.digitalService.getFavQuickReplies(false)) !== null && _f !== void 0 ? _f : [];
        let favInboundQuickReplies = [];
        if ((FavInboundQuickRepliesFromIDB === null || FavInboundQuickRepliesFromIDB === void 0 ? void 0 : FavInboundQuickRepliesFromIDB.length) === 0) { // in case inbound replies are not yet loaded take values from clientdata in localstorage
            const clientData = LocalStorageHelper.getItem(StorageKeys.CLIENT_DATA, true) || {};
            favInboundQuickReplies = (clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavInQuickRep) || [];
        }
        else {
            favInboundQuickReplies = FavInboundQuickRepliesFromIDB.map(quickReply => quickReply === null || quickReply === void 0 ? void 0 : quickReply.id);
        }
        const favOutboundQuickReplies = FavQuickRepliesFromIDB.map(quickReply => quickReply === null || quickReply === void 0 ? void 0 : quickReply.id);
        dispatch(storeAllFavQuickReplies({ inbound: favInboundQuickReplies, outbound: favOutboundQuickReplies }));
    }
    let allQuickRepliesWithFav = [];
    if (quickRepliesToDisplay.length >= 0) {
        allQuickRepliesWithFav = quickRepliesToDisplay.reduce((acc, qReply) => {
            const matchingFavReply = FavQuickRepliesFromIDB.find((favReply) => favReply.id === qReply.id);
            if (matchingFavReply !== undefined) {
                acc = [
                    ...acc,
                    Object.assign(Object.assign({}, qReply), { isfavorite: true })
                ];
            }
            else {
                acc = [
                    ...acc,
                    Object.assign(Object.assign({}, qReply), { isfavorite: false })
                ];
            }
            return acc;
        }, []);
    }
    return { allQR: allQuickRepliesWithFav, nextLinks };
}));
/**
 * This method is used to fetch unified outbound quick replies.
 * @param page - current page number
 * @param limit - number of records per page
 * @param channelId - channel id for quick replies
 * @param skillId - optional skill id
 * @param search - optional search string
 * @param isFavorite - optional boolean to filter favorite quick replies
 */
export const fetchUnifiedQuickReplies = createAsyncThunk('appSpace/unifiedQuickReplies', ({ page = 1, limit = 20, channelId, skillId, search, isFavorite }) => __awaiter(void 0, void 0, void 0, function* () {
    let quickRepliesToDisplay = [];
    let nextLinks = {};
    let totalRecords = 0;
    try {
        const { allQuickReplies, nextLinks: fetchedNextLinks, totalRecords: fetchedTotalRecords } = yield CXoneDigitalClient.instance.digitalService.getUnifiedQuickResponses([channelId], skillId ? [skillId] : undefined, page, limit, search, isFavorite);
        if (allQuickReplies.length >= 0) {
            quickRepliesToDisplay = allQuickReplies;
            nextLinks = fetchedNextLinks;
            totalRecords = fetchedTotalRecords || 0;
        }
    }
    catch (error) {
        logger.error('fetchUnifiedQuickReplies', 'error while fetching unified quick replies - ' + JSON.stringify(error));
    }
    return { allQuickReplies: quickRepliesToDisplay, nextLinks, totalRecords, isFavorite, page };
}));
/**
 * Method to toggle favorite status of a quick reply.
 * @param quickReplyId - ID of the quick reply to be toggled.
 * @param markAsFavorite - boolean indicating whether to mark as favorite or unmark .
 * @param selectedReply - (Optional) Quick reply in the selected state
 */
export const toggleFavoriteQuickReply = createAsyncThunk('appSpace/toggleFavoriteQuickReply', ({ quickReplyId, markAsFavorite, selectedReply }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield CXoneDigitalClient.instance.digitalService.toggleFavoriteQuickResponse(quickReplyId, markAsFavorite);
        const messageKey = markAsFavorite ? 'qrFavoriteAdded' : 'qrRemovedFromFavorites';
        // to clear the favorite quick replies cache so that next fetch gets updated data
        thunkAPI.dispatch(clearFavoriteQuickRepliesCache());
        thunkAPI.dispatch(setFavoriteToggleToast({ isError: false, messageKey }));
        if (selectedReply) {
            // Update the isFavorite status of the selected quick reply in the selected state
            thunkAPI.dispatch(updateSelectedQReply(Object.assign(Object.assign({}, selectedReply), { isFavorite: markAsFavorite })));
        }
        return { quickReplyId, markAsFavorite };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        thunkAPI.dispatch(setFavoriteToggleToast({ isError: true, messageKey: error === null || error === void 0 ? void 0 : error.message }));
        throw error;
    }
}));
/**
* This method is used to generate a fresh link for selected Secure Form Quick response
* Generated link will be shared with the customer for submission
* @param formId - Id of selected form under Quick replies
* @param caseId - Selected digital case Id on Interaction Space
* @example getSecureFormLink('123', '123456')
*/
export const getSecureFormLink = createAsyncThunk('appSpace/getSecureFormLink', ({ formId, caseId }, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const response = yield CXoneDigitalClient.instance.digitalService.createSecureFormLink(formId, caseId);
    const secureFormLink = (_g = response.data) === null || _g === void 0 ? void 0 : _g.url;
    dispatch(updateSentQReply(secureFormLink));
}));
/**
* Function to get current date time without seconds and milliseconds
* @returns date and time
* @example getRoundedDate()
*/
export const getRoundedDate = () => {
    const now = dayjs(new Date());
    return now.second(0).millisecond(0);
};
/**
* This method is used to get Replace Variables details for Quick response when hasVariables flag true
* @param replyContent - main quick response object received from list
* @param digitalContactExternalVariables - Selected digital case Id with external variables
* @example getReplaceVariableDetails(replyContentObject, contactWithExternalVariablesArray)
*/
export const getReplaceVariableDetails = createAsyncThunk('appSpace/getReplaceVariableDetails', ({ replyContent, digitalContactExternalVariables }, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j;
    const selectedQuickResponseId = (_h = replyContent === null || replyContent === void 0 ? void 0 : replyContent.id) === null || _h === void 0 ? void 0 : _h.toString();
    const response = yield CXoneDigitalClient.instance.digitalContactManager.digitalContactService.fetchQuickResponseReplaceVariable(selectedQuickResponseId, digitalContactExternalVariables);
    const messageContentQR = (_j = response.data) === null || _j === void 0 ? void 0 : _j.messageContent;
    const updatedSelectedQRDetails = Object.assign(Object.assign({}, replyContent), { messageContent: messageContentQR });
    dispatch(updateSelectedQReply(updatedSelectedQRDetails));
    return messageContentQR;
}));
//# sourceMappingURL=ccf-quick-replies.util.js.map