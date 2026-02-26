/* eslint-disable @typescript-eslint/no-explicit-any */
import { __awaiter } from "tslib";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { MediaType } from '@nice-devone/common-sdk';
import { CXoneAgentEvents } from '@nice-devone/shared-apps-lib';
const CREATE_ENTITY_ON_CLICK_OF_FEATURE = 'CcfCustomerCard/createEntity/onClickOfFeature';
const CREATE_ENTITY_ON_CLICK_OF_ENTITY = 'CcfCustomerCard/createEntity/onClickOfEntity';
const CREATE_ENTITY_REQUEST = 'CcfCustomerCard/createEntity/request';
const CREATE_ENTITY_HANDLE_MOUSE_EVENT = 'CcfCustomerCard/createEntity/handleMouseEvent';
const CREATE_ENTITY_SEARCH = 'CcfCustomerCard/createEntity/search';
const CREATE_ENTITY_SCREENPOP = 'CcfCustomerCard/createEntity/screenPop';
const CREATE_ENTITY_ADD_PIN_RECORD_TO_LS = 'CcfCustomerCard/createEntity/addPinRecordsToLS';
const SET_POPOVER_POSITION = 'CcfCustomerCard/createEntity/setPopoverPosition';
const SET_POPOVER_LIST = 'CcfCustomerCard/createEntity/setPopoverList';
const HANDLE_EVENT = 'CcfCustomerCard/createEntity/handleEvent';
const HANDLE_RESIZE = 'CcfCustomercard/createEntity/handleResize';
var CreateEntityHandleMouseEventReturnCodes;
(function (CreateEntityHandleMouseEventReturnCodes) {
    CreateEntityHandleMouseEventReturnCodes[CreateEntityHandleMouseEventReturnCodes["NO_POPOVER_REFERENCE"] = -1] = "NO_POPOVER_REFERENCE";
    CreateEntityHandleMouseEventReturnCodes[CreateEntityHandleMouseEventReturnCodes["CLICK_INSIDE_OF_POPOVER"] = -2] = "CLICK_INSIDE_OF_POPOVER";
    CreateEntityHandleMouseEventReturnCodes[CreateEntityHandleMouseEventReturnCodes["CONFIRMING"] = -3] = "CONFIRMING";
    CreateEntityHandleMouseEventReturnCodes[CreateEntityHandleMouseEventReturnCodes["SUCCESS"] = 0] = "SUCCESS";
})(CreateEntityHandleMouseEventReturnCodes || (CreateEntityHandleMouseEventReturnCodes = {}));
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example CreateEntityhandleMouseEvent()
 */
export const handleMouseEvent = createAsyncThunk(CREATE_ENTITY_HANDLE_MOUSE_EVENT, ({ referenceForPopover, elementTargetFromClick }, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    if (!(referenceForPopover === null || referenceForPopover === void 0 ? void 0 : referenceForPopover.current)) {
        return CreateEntityHandleMouseEventReturnCodes.NO_POPOVER_REFERENCE;
    }
    // NOTE : DID WE CLICK INSIDE THE POPOVER?
    const clickedOutsideOfPopover = !(referenceForPopover === null || referenceForPopover === void 0 ? void 0 : referenceForPopover.current.contains(elementTargetFromClick));
    if (!clickedOutsideOfPopover) {
        return CreateEntityHandleMouseEventReturnCodes.CLICK_INSIDE_OF_POPOVER;
    }
    const rootState = (_a = getState()) !== null && _a !== void 0 ? _a : {};
    if ((_d = (_c = (_b = rootState === null || rootState === void 0 ? void 0 : rootState.CcfCustomerCard) === null || _b === void 0 ? void 0 : _b.createEntity) === null || _c === void 0 ? void 0 : _c.confirmation) === null || _d === void 0 ? void 0 : _d.isOpen) {
        return CreateEntityHandleMouseEventReturnCodes.CONFIRMING;
    }
    // NOTE : CLOSE POPOVER, WE CLICKED OUTSIDE OF THE POPOVER BOUNDS
    dispatch(extra.CcfCustomerCardSlice.CcfCustomerCardActions.setCreateEntityPopoverIsOpen({
        isOpen: false,
    }));
    return CreateEntityHandleMouseEventReturnCodes.SUCCESS;
}));
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example onClick()
 */
export const onClickOfFeature = createAsyncThunk(CREATE_ENTITY_ON_CLICK_OF_FEATURE, (_, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h;
    const rootState = (_e = getState()) !== null && _e !== void 0 ? _e : {};
    const isOpen = !((_h = (_g = (_f = rootState.CcfCustomerCard) === null || _f === void 0 ? void 0 : _f.createEntity) === null || _g === void 0 ? void 0 : _g.popover) === null || _h === void 0 ? void 0 : _h.isOpen);
    if (isOpen) {
        dispatch(extra.CcfCustomerCardSlice.thunks.createEntity.setPopoverPosition());
    }
    dispatch(extra.CcfCustomerCardSlice.CcfCustomerCardActions.setCreateEntityPopoverIsOpen({
        isOpen,
    }));
}));
/**
 * Function for when an entity is clicked in popover.
 * @example onClick()
 */
export const onClickOfEntity = createAsyncThunk(CREATE_ENTITY_ON_CLICK_OF_ENTITY, ({ configurationId, workflowId, workflowInput, display }, { dispatch, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    dispatch(extra.CcfCustomerCardSlice.CcfCustomerCardActions.setCreateEntityConfirmationIsOpen({
        isOpen: true,
    }));
    dispatch(extra.CcfCustomerCardSlice.CcfCustomerCardActions.setCreateEntityTarget({
        configurationId,
        workflowId,
        workflowInput,
        display,
    }));
}));
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example CreateEntityRequest()
 */
export const request = createAsyncThunk(CREATE_ENTITY_REQUEST, ({ toastComponentForSuccess, toastComponentForError, dnis }, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const logger = new extra.Logger('CXA', 'createEntity');
    const rootState = (_j = getState()) !== null && _j !== void 0 ? _j : {};
    const { configurationId, workflowId, workflowInput } = (_m = (_l = (_k = rootState.CcfCustomerCard) === null || _k === void 0 ? void 0 : _k.createEntity) === null || _l === void 0 ? void 0 : _l.target) !== null && _m !== void 0 ? _m : {};
    let selectedInteractionId = (_p = (_o = rootState.inbox) === null || _o === void 0 ? void 0 : _o.assignmentPanelMetadata) === null || _p === void 0 ? void 0 : _p.selectedInteractionId;
    const interaction = (_r = (_q = rootState.inbox) === null || _q === void 0 ? void 0 : _q.cxoneInteractions[selectedInteractionId]) !== null && _r !== void 0 ? _r : {};
    const templateRecordPinned = ((workflowInput === null || workflowInput === void 0 ? void 0 : workflowInput.pinnedRecord) && (workflowInput === null || workflowInput === void 0 ? void 0 : workflowInput.pinnedRecord) === 'true') ? true : false;
    //For non-voice interactions, get the cacheKey from the searchWorkflow
    if (interaction.interactionType !== MediaType.VOICE) {
        const agentWorkflowData = (_s = extra.LocalStorageHelper.getItem(extra.StorageKeys.CXONE_ACTIVITY_CONFIG, true)) !== null && _s !== void 0 ? _s : [];
        const searchWorkflow = (_u = (_t = agentWorkflowData.find((item) => item.ContactID === interaction.selectedContactId)) === null || _t === void 0 ? void 0 : _t.searchWorkflow) !== null && _u !== void 0 ? _u : [];
        selectedInteractionId = ((_w = (_v = searchWorkflow[0]) === null || _v === void 0 ? void 0 : _v[0]) === null || _w === void 0 ? void 0 : _w.cacheKey) || selectedInteractionId;
    }
    dispatch(extra.CcfCustomerCardSlice.CcfCustomerCardActions.setCreateEntityPopoverIsOpen({
        isOpen: false,
    }));
    dispatch(extra.CcfCustomerCardSlice.CcfCustomerCardActions.setCreateEntityConfirmationIsOpen({
        isOpen: false,
    }));
    dispatch(extra.CcfCustomerCardSlice.CcfCustomerCardActions.setActivityLoading(true));
    try {
        const responseObj = yield extra.CXoneClient.instance.cxoneCustomerCard.executeCreateWorkFlow({
            configurationId,
            workflowId,
            action: 'Create',
            interactionId: selectedInteractionId,
            workflowInput,
        });
        extra.toast.success(toastComponentForSuccess, {
            containerId: 'AppToastContainer',
            autoClose: 2000,
            hideProgressBar: false,
        });
        if ((workflowInput === null || workflowInput === void 0 ? void 0 : workflowInput.cacheResponse) && (workflowInput === null || workflowInput === void 0 ? void 0 : workflowInput.cacheResponse) === 'true') {
            // If the stored template has a screen pop, then do a screen pop
            if ((workflowInput === null || workflowInput === void 0 ? void 0 : workflowInput.screenPop) && (workflowInput === null || workflowInput === void 0 ? void 0 : workflowInput.screenPop) === 'true') {
                dispatch(extra.CcfCustomerCardSlice.CcfCustomerCardActions.storeCustomEventFlag({
                    contactId: interaction.selectedContactId,
                    isCustomEventReceived: false,
                    isScreenPopInitiated: true,
                }));
                dispatch(extra.CcfCustomerCardSlice.thunks.createEntity.screenPop({ contactId: interaction.selectedContactId, responseObj: responseObj }));
            }
            // Refresh the activity data
            dispatch(extra.CcfCustomerCardSlice.thunks.createEntity.search({ phoneNumber: dnis, contactId: interaction.selectedContactId, newRecordPinned: templateRecordPinned, responseObj: responseObj, screenPop: (_x = workflowInput === null || workflowInput === void 0 ? void 0 : workflowInput.screenPop) !== null && _x !== void 0 ? _x : false }));
        }
        dispatch(extra.CcfCustomerCardSlice.CcfCustomerCardActions.setActivityLoading(false));
        dispatch(extra.CcfCustomerCardSlice.CcfCustomerCardActions.resetCreateEntityTarget());
    }
    catch (error) {
        extra.toast.error(toastComponentForError, {
            containerId: 'AppToastContainer',
            autoClose: 2000,
            hideProgressBar: false,
        });
        logger.error('createRecordEntity', `error while create record entity- ${JSON.stringify(error)}`);
        dispatch(extra.CcfCustomerCardSlice.CcfCustomerCardActions.setActivityLoading(false));
        dispatch(extra.CcfCustomerCardSlice.CcfCustomerCardActions.resetCreateEntityTarget());
    }
}));
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example search()
 */
export const search = createAsyncThunk(CREATE_ENTITY_SEARCH, ({ phoneNumber, contactId, newRecordPinned, responseObj, screenPop }, { dispatch, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _y, _z, _0, _1, _2, _3, _4, _5;
    dispatch(extra.CcfCustomerCardSlice.CcfCustomerCardActions.setActivityLoading(true));
    const agentWorkflowData = extra.LocalStorageHelper.getItem(extra.StorageKeys.CXONE_ACTIVITY_CONFIG, true);
    const { searchWorkflow } = (_z = (_y = (agentWorkflowData !== null && agentWorkflowData !== void 0 ? agentWorkflowData : [])) === null || _y === void 0 ? void 0 : _y.find((item) => item.ContactID === contactId)) !== null && _z !== void 0 ? _z : {};
    let searchCacheKey;
    //If no cacheKey from Workflow Execute use cacheKey from responseObj
    if (!((_0 = searchWorkflow[0][0]) === null || _0 === void 0 ? void 0 : _0.cacheKey)) {
        const cacheKeyParts = (_2 = (_1 = responseObj === null || responseObj === void 0 ? void 0 : responseObj.cacheKey) === null || _1 === void 0 ? void 0 : _1.split('_')) !== null && _2 !== void 0 ? _2 : [];
        searchCacheKey = cacheKeyParts[1];
    }
    else {
        searchCacheKey = (_3 = searchWorkflow[0][0]) === null || _3 === void 0 ? void 0 : _3.cacheKey;
    }
    const payloadForSearch = {
        configurationId: (_4 = searchWorkflow[0][0]) === null || _4 === void 0 ? void 0 : _4.configurationId,
        workflowId: (_5 = searchWorkflow[0][0]) === null || _5 === void 0 ? void 0 : _5.workflowId,
        action: 'Search',
        contactID: contactId,
        cacheKey: searchCacheKey,
        workflowInput: {
            phoneNumber: phoneNumber,
        },
    };
    dispatch(extra.CcfCustomerCardSlice.fetchActivityData(payloadForSearch));
    // Add the record to the pinned records if configured to do so
    if (newRecordPinned) {
        dispatch(extra.CcfCustomerCardSlice.thunks.createEntity.addPinRecordToLS({ contactId: contactId, responseObj: responseObj, screenPop: screenPop }));
    }
}));
/**
 * Function to handle logic for when a screen pop is needed.
 * @example screenPop()
 */
export const screenPop = createAsyncThunk(CREATE_ENTITY_SCREENPOP, ({ contactId, responseObj }, { dispatch, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24;
    const userDetails = (_6 = extra.LocalStorageHelper.getItem(extra.StorageKeys.USER_DETAILS, true)) !== null && _6 !== void 0 ? _6 : {};
    const agentIntegrationsEnabled = (_7 = userDetails === null || userDetails === void 0 ? void 0 : userDetails.customAttributes) === null || _7 === void 0 ? void 0 : _7.agentIntegrations;
    if (agentIntegrationsEnabled === 'true') {
        if (responseObj) {
            const screenPopBaseUrl = (_9 = (_8 = responseObj.result) === null || _8 === void 0 ? void 0 : _8[0]) === null || _9 === void 0 ? void 0 : _9.system.baseUrl;
            const screenPopEventArgs = {};
            screenPopEventArgs.detail = { contactId: contactId, actionType: 'Search' };
            screenPopEventArgs.detail.activityRecord = {
                display: (_12 = (_11 = (_10 = responseObj.result) === null || _10 === void 0 ? void 0 : _10[0]) === null || _11 === void 0 ? void 0 : _11.records[0]) === null || _12 === void 0 ? void 0 : _12.display,
                id: (_15 = (_14 = (_13 = responseObj.result) === null || _13 === void 0 ? void 0 : _13[0]) === null || _14 === void 0 ? void 0 : _14.records[0]) === null || _15 === void 0 ? void 0 : _15.id,
                label: (_18 = (_17 = (_16 = responseObj.result) === null || _16 === void 0 ? void 0 : _16[0]) === null || _17 === void 0 ? void 0 : _17.records[0]) === null || _18 === void 0 ? void 0 : _18.label,
                type: (_21 = (_20 = (_19 = responseObj.result) === null || _19 === void 0 ? void 0 : _19[0]) === null || _20 === void 0 ? void 0 : _20.records[0]) === null || _21 === void 0 ? void 0 : _21.type,
                url: screenPopBaseUrl + ((_24 = (_23 = (_22 = responseObj.result) === null || _22 === void 0 ? void 0 : _22[0]) === null || _23 === void 0 ? void 0 : _23.records[0]) === null || _24 === void 0 ? void 0 : _24.url),
            };
            const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_SCREEN_POP_EVENT, screenPopEventArgs);
            window.dispatchEvent(customEvent);
            dispatch(extra.CcfCustomerCardSlice.CcfCustomerCardActions.storeCustomEventFlag({
                contactId: contactId,
                isCustomEventReceived: true,
                isScreenPopInitiated: false,
            }));
        }
    }
}));
/**
 * Function to handle logic to add newly created record to pinRecord local storage if configured to do so.
 * @example addPinRecordToLS()
 */
export const addPinRecordToLS = createAsyncThunk(CREATE_ENTITY_ADD_PIN_RECORD_TO_LS, ({ contactId, responseObj, screenPop }, { extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _25, _26, _27, _28, _29;
    const newRecordObj = (_26 = (_25 = responseObj === null || responseObj === void 0 ? void 0 : responseObj.result[0]) === null || _25 === void 0 ? void 0 : _25.records[0]) !== null && _26 !== void 0 ? _26 : {};
    const currentCrmPinnedRecords = (_27 = extra.LocalStorageHelper.getItem(extra.StorageKeys.CRM_PIN_RECORDS, true)) !== null && _27 !== void 0 ? _27 : {};
    if (currentCrmPinnedRecords && currentCrmPinnedRecords.length > 0) {
        const crmActivityContact = currentCrmPinnedRecords === null || currentCrmPinnedRecords === void 0 ? void 0 : currentCrmPinnedRecords.filter((item) => {
            return (item.contactId === contactId);
        });
        const crmActivityContactPinnedRecords = (_29 = (_28 = crmActivityContact[0]) === null || _28 === void 0 ? void 0 : _28.pinRecords) !== null && _29 !== void 0 ? _29 : [];
        const newCrmPinnedRecords = [
            ...crmActivityContactPinnedRecords,
            {
                display: newRecordObj === null || newRecordObj === void 0 ? void 0 : newRecordObj.display,
                id: newRecordObj === null || newRecordObj === void 0 ? void 0 : newRecordObj.id,
                label: newRecordObj === null || newRecordObj === void 0 ? void 0 : newRecordObj.label,
                linkable: newRecordObj === null || newRecordObj === void 0 ? void 0 : newRecordObj.linkable,
                linked: 'true',
                related: newRecordObj === null || newRecordObj === void 0 ? void 0 : newRecordObj.related,
                screenPop: screenPop,
                type: newRecordObj === null || newRecordObj === void 0 ? void 0 : newRecordObj.type,
                url: newRecordObj === null || newRecordObj === void 0 ? void 0 : newRecordObj.url,
            }
        ];
        crmActivityContact[0].pinRecords = newCrmPinnedRecords;
        extra.LocalStorageHelper.setItem(extra.StorageKeys.CRM_PIN_RECORDS, currentCrmPinnedRecords);
    }
}));
export const POPOVER_OFFSET_Y = 5;
export const POPOVER_OFFSET_X = 123;
var SetPopoverPositionReturnCodes;
(function (SetPopoverPositionReturnCodes) {
    SetPopoverPositionReturnCodes[SetPopoverPositionReturnCodes["UNABLE_TO_SOURCE_DOCUMENT"] = -1] = "UNABLE_TO_SOURCE_DOCUMENT";
    SetPopoverPositionReturnCodes[SetPopoverPositionReturnCodes["UNABLE_TO_SOURCE_BUTTON"] = -2] = "UNABLE_TO_SOURCE_BUTTON";
    SetPopoverPositionReturnCodes[SetPopoverPositionReturnCodes["UNABLE_TO_SOURCE_CONTAINER"] = -3] = "UNABLE_TO_SOURCE_CONTAINER";
    SetPopoverPositionReturnCodes[SetPopoverPositionReturnCodes["SUCCESS"] = 0] = "SUCCESS";
})(SetPopoverPositionReturnCodes || (SetPopoverPositionReturnCodes = {}));
/**
 * Thunk action creator to make sure button state is in the correct state when api errors out.
 * @param args - targetId
 * @example
 * ```
 * dispatch(SetPopoverPosition({targetId: '123112312-141241214-1412312'}))
 * ```
 */
export const setPopoverPosition = createAsyncThunk(SET_POPOVER_POSITION, (_, { dispatch, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _30, _31, _32, _33, _34, _35, _36, _37;
    if (!((_30 = extra === null || extra === void 0 ? void 0 : extra.window) === null || _30 === void 0 ? void 0 : _30.document)) {
        return SetPopoverPositionReturnCodes.UNABLE_TO_SOURCE_DOCUMENT;
    }
    const button = extra === null || extra === void 0 ? void 0 : extra.window.document.querySelector('#createEntityButton');
    if (!button) {
        return SetPopoverPositionReturnCodes.UNABLE_TO_SOURCE_BUTTON;
    }
    const container = extra === null || extra === void 0 ? void 0 : extra.window.document.querySelector('#create-entity_container');
    if (!container) {
        return SetPopoverPositionReturnCodes.UNABLE_TO_SOURCE_CONTAINER;
    }
    const boundingClientRectForContainer = (_31 = container.getBoundingClientRect()) !== null && _31 !== void 0 ? _31 : {};
    const boundingClientRectForButton = (_32 = button.getBoundingClientRect()) !== null && _32 !== void 0 ? _32 : {};
    const top = ((_33 = boundingClientRectForButton === null || boundingClientRectForButton === void 0 ? void 0 : boundingClientRectForButton.top) !== null && _33 !== void 0 ? _33 : 0) - ((_34 = boundingClientRectForContainer === null || boundingClientRectForContainer === void 0 ? void 0 : boundingClientRectForContainer.top) !== null && _34 !== void 0 ? _34 : 0) + ((_35 = boundingClientRectForButton === null || boundingClientRectForButton === void 0 ? void 0 : boundingClientRectForButton.height) !== null && _35 !== void 0 ? _35 : 0) + POPOVER_OFFSET_Y;
    const left = ((_36 = boundingClientRectForButton === null || boundingClientRectForButton === void 0 ? void 0 : boundingClientRectForButton.left) !== null && _36 !== void 0 ? _36 : 0) - ((_37 = boundingClientRectForContainer === null || boundingClientRectForContainer === void 0 ? void 0 : boundingClientRectForContainer.left) !== null && _37 !== void 0 ? _37 : 0) - POPOVER_OFFSET_X;
    dispatch(extra.CcfCustomerCardSlice.CcfCustomerCardActions.setCreateEntityPopoverPosition({
        top,
        left,
    }));
    return SetPopoverPositionReturnCodes.SUCCESS;
}));
var SetPopoverListReturnCodes;
(function (SetPopoverListReturnCodes) {
    SetPopoverListReturnCodes[SetPopoverListReturnCodes["UNABLE_TO_SOURCE_SELECTED_INTERACTION_ID"] = -1] = "UNABLE_TO_SOURCE_SELECTED_INTERACTION_ID";
    SetPopoverListReturnCodes[SetPopoverListReturnCodes["SUCCESS"] = 0] = "SUCCESS";
})(SetPopoverListReturnCodes || (SetPopoverListReturnCodes = {}));
/**
 * Thunk action creator to make sure button state is in the correct state when api errors out.
 * @param args - targetId
 * @example
 * ```
 * dispatch(setPopoverList())
 * ```
 */
export const setPopoverList = createAsyncThunk(SET_POPOVER_LIST, (_, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _38, _39, _40, _41, _42, _43, _44, _45;
    const rootState = (_38 = getState()) !== null && _38 !== void 0 ? _38 : {};
    const { selectedInteractionId, } = (_40 = (_39 = rootState === null || rootState === void 0 ? void 0 : rootState.inbox) === null || _39 === void 0 ? void 0 : _39.assignmentPanelMetadata) !== null && _40 !== void 0 ? _40 : {};
    const interaction = (_43 = ((_42 = (_41 = rootState === null || rootState === void 0 ? void 0 : rootState.inbox) === null || _41 === void 0 ? void 0 : _41.cxoneInteractions) !== null && _42 !== void 0 ? _42 : {})[selectedInteractionId]) !== null && _43 !== void 0 ? _43 : {};
    const id = interaction === null || interaction === void 0 ? void 0 : interaction.selectedContactId;
    if (!id) {
        return SetPopoverListReturnCodes.UNABLE_TO_SOURCE_SELECTED_INTERACTION_ID;
    }
    const lists = (_44 = extra.CcfCustomerCardCreate.controller.service.localStorage.getListsFromLocalStorage()) !== null && _44 !== void 0 ? _44 : {};
    const list = (_45 = lists[id]) !== null && _45 !== void 0 ? _45 : [];
    dispatch(extra.CcfCustomerCardSlice.CcfCustomerCardActions.setCreateEntityPopoverList({
        list,
    }));
    return SetPopoverListReturnCodes.SUCCESS;
}));
var HandleEventReturnCodes;
(function (HandleEventReturnCodes) {
    HandleEventReturnCodes[HandleEventReturnCodes["UNABLE_TO_SOURCE_LIST"] = -3] = "UNABLE_TO_SOURCE_LIST";
    HandleEventReturnCodes[HandleEventReturnCodes["UNABLE_TO_SOURCE_INTERACTION_ID"] = -2] = "UNABLE_TO_SOURCE_INTERACTION_ID";
    HandleEventReturnCodes[HandleEventReturnCodes["FAILURE"] = -1] = "FAILURE";
    HandleEventReturnCodes[HandleEventReturnCodes["SUCCESS"] = 0] = "SUCCESS";
})(HandleEventReturnCodes || (HandleEventReturnCodes = {}));
/**
 * Thunk action creator to make sure button state is in the correct state when api errors out.
 * @param args - targetId
 * @example
 * ```
 * dispatch(handleEvent())
 * ```
 */
export const handleEvent = createAsyncThunk(HANDLE_EVENT, ({ data }, { extra }) => __awaiter(void 0, void 0, void 0, function* () {
    let processed = {};
    try {
        processed = JSON.parse(data);
        // eslint-disable-next-line no-empty
    }
    catch (_) { }
    const logger = new extra.Logger('CXA', 'createEntity');
    try {
        const { id, list = [] } = processed !== null && processed !== void 0 ? processed : {};
        if (!id) {
            return HandleEventReturnCodes.UNABLE_TO_SOURCE_INTERACTION_ID;
        }
        if (!list || !(list.length > 0)) {
            return HandleEventReturnCodes.UNABLE_TO_SOURCE_LIST;
        }
        extra.CcfCustomerCardCreate.controller.service.localStorage.setListByInteraction(id, list);
        return HandleEventReturnCodes.SUCCESS;
    }
    catch (_) {
        logger.error('handleEvent', 'Error while handling event data.');
        return HandleEventReturnCodes.FAILURE;
    }
}));
var HandleResizeReturnCodes;
(function (HandleResizeReturnCodes) {
    HandleResizeReturnCodes[HandleResizeReturnCodes["POPOVER_IS_NOT_OPEN"] = -1] = "POPOVER_IS_NOT_OPEN";
    HandleResizeReturnCodes[HandleResizeReturnCodes["SUCCESS"] = 0] = "SUCCESS";
})(HandleResizeReturnCodes || (HandleResizeReturnCodes = {}));
/**
 * Thunk action for resize handler, governs how the popover should behave on window resize.
 * @param args - targetId
 * @example
 * ```
 * dispatch(handleResize())
 * ```
 */
export const handleResize = createAsyncThunk(HANDLE_RESIZE, (_, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _46, _47, _48, _49;
    const rootState = (_46 = getState()) !== null && _46 !== void 0 ? _46 : {};
    const isOpen = (_49 = (_48 = (_47 = rootState.CcfCustomerCard) === null || _47 === void 0 ? void 0 : _47.createEntity) === null || _48 === void 0 ? void 0 : _48.popover) === null || _49 === void 0 ? void 0 : _49.isOpen;
    if (!isOpen) {
        return HandleResizeReturnCodes.POPOVER_IS_NOT_OPEN;
    }
    if (isOpen) {
        dispatch(extra.CcfCustomerCardSlice.thunks.createEntity.setPopoverPosition());
    }
    return HandleResizeReturnCodes.SUCCESS;
}));
//# sourceMappingURL=create-entity.js.map