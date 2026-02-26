import { __awaiter } from "tslib";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as constants from './constants';
import { Crm } from '@nice-devone/common-sdk';
const INITIALIZE_RELATES_TO = 'CcfCustomerCardRelatesTo/thunk/initializeRelatesTo';
const ON_CLICK_OF_RELATES_TO_BUTTON = 'CcfCustomerCardRelatesTo/thunk/onClickOfRelatesToButton';
const RELATES_TO_FOR_SERVICENOW = 'CcfCustomerCardRelatesTo/thunk/relatesToForServiceNow';
const RELATES_TO_FOR_SALESFORCE = 'CcfCustomerCardRelatesTo/thunk/relatesToForSalesforce';
const RELATES_TO_FOR_MSD = 'CcfCustomerCardRelatesTo/thunk/relatesToForMsd';
const HANDLE_MOUSE_DOWN_EVENT_FOR_POPOVER = 'CcfCustomerCardRelatesTo/thunk/handleMouseDownEvent';
const GENERATE_LIST_OF_RELATABLE_ENTITIES = 'CcfCustomerCardRelatesTo/thunk/generateListOfRelatableEntities';
const ON_CLICK_OF_ENTITY = 'CcfCustomerCardRelatesTo/thunk/onClickOfEntity';
const RESET_RELATES_TO_PINNED_RECORD_ELEMENT_ATTRIBUTE_OF_ID = 'CcfCustomerCardRelatesTo/thunk/resetRelatesToPinnedRecordElementAttributeOfID';
const SET_POPOVER_POSITION = 'CcfCustomerCardRelatesTo/thunk/setPopoverPosition';
const HANDLE_RESIZE = 'CcfCustomerCardRelatesTo/thunk/handleResize';
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example initializeRelatesTo()
 */
export const initializeRelatesTo = createAsyncThunk(INITIALIZE_RELATES_TO, ({ searches, translate }, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const rootState = (_a = getState()) !== null && _a !== void 0 ? _a : {};
    const selectedInteractionId = (_c = (_b = rootState.inbox) === null || _b === void 0 ? void 0 : _b.assignmentPanelMetadata) === null || _c === void 0 ? void 0 : _c.selectedInteractionId;
    const interaction = (_e = (_d = rootState.inbox) === null || _d === void 0 ? void 0 : _d.cxoneInteractions[selectedInteractionId]) !== null && _e !== void 0 ? _e : {};
    const { pinnedRecords = [], enableRowOpenURL = false } = (_f = extra.CcfCustomerCardRelatesTo.controller.service.generatePinnedRecordsConfiguration(searches, constants.relationships, interaction === null || interaction === void 0 ? void 0 : interaction.selectedContactId, translate)) !== null && _f !== void 0 ? _f : {};
    dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.setPinnedRecords({
        pinnedRecords,
    }));
    dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.setEnableRowOpenURL({
        enableRowOpenURL,
    }));
}));
var OnClickOfRelatesToButtonReturnCodes;
(function (OnClickOfRelatesToButtonReturnCodes) {
    OnClickOfRelatesToButtonReturnCodes[OnClickOfRelatesToButtonReturnCodes["RELATES_TO_IS_NOT_ENABLED"] = -1] = "RELATES_TO_IS_NOT_ENABLED";
    OnClickOfRelatesToButtonReturnCodes[OnClickOfRelatesToButtonReturnCodes["BUTTON_STATE_NON_COMPLIANT"] = -2] = "BUTTON_STATE_NON_COMPLIANT";
    OnClickOfRelatesToButtonReturnCodes[OnClickOfRelatesToButtonReturnCodes["BUTTON_RECLICKED"] = -3] = "BUTTON_RECLICKED";
    OnClickOfRelatesToButtonReturnCodes[OnClickOfRelatesToButtonReturnCodes["SUCCESS"] = 0] = "SUCCESS";
})(OnClickOfRelatesToButtonReturnCodes || (OnClickOfRelatesToButtonReturnCodes = {}));
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example onClickOfRelatesToButton()
 */
export const onClickOfRelatesToButton = createAsyncThunk(ON_CLICK_OF_RELATES_TO_BUTTON, ({ pinnedRecordEntityId, pinnedRecordEntityType, crm = '', isRelatesToEnabled = false, configurationId, workflowId, }, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j, _k;
    if (!isRelatesToEnabled)
        return OnClickOfRelatesToButtonReturnCodes.RELATES_TO_IS_NOT_ENABLED;
    const rootState = (_g = getState()) !== null && _g !== void 0 ? _g : {};
    //#region NOTE: ONLY PROCEED IF THE "RELATES TO" BUTTON IS IN A TICKED OR UNTICKED STATE.
    const { pinnedRecords = {}, popover = {}, target = {} } = (_h = rootState[constants.slice.key]) !== null && _h !== void 0 ? _h : {};
    if (!['unticked', 'ticked'].some((state) => { var _a, _b; return ((_b = (_a = pinnedRecords[pinnedRecordEntityId]) === null || _a === void 0 ? void 0 : _a.elementAttributeOfID) !== null && _b !== void 0 ? _b : '').includes(state); })) {
        return OnClickOfRelatesToButtonReturnCodes.BUTTON_STATE_NON_COMPLIANT;
    }
    //#endregion
    //#region NOTE: IF THE "RELATES TO" BUTTON IS RE-CLICKED FOR CURRENT TARGET, CLOSE POPOVER AND RESET TARGET
    if (popover.isOpen && pinnedRecordEntityId === (target === null || target === void 0 ? void 0 : target.id)) {
        dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.hidePopover());
        dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.resetTarget());
        return OnClickOfRelatesToButtonReturnCodes.BUTTON_RECLICKED;
    }
    //#endregion
    if (crm.toLowerCase() === 'servicenow') {
        const relationships = (_j = constants.relationships.servicenow[pinnedRecordEntityType]) !== null && _j !== void 0 ? _j : [];
        dispatch(extra.CcfCustomerCardRelatesTo.controller.thunks.relatesToForServiceNow({
            pinnedRecordEntityId,
            pinnedRecordEntityType,
            crm,
            relationships,
            configurationId,
            workflowId,
        }));
    }
    // NOTE : LOGIC FOR MSD
    if (crm.toLowerCase() === Crm.MSD) {
        const relationships = (_k = constants.relationships.msd[pinnedRecordEntityType]) !== null && _k !== void 0 ? _k : [];
        dispatch(extra.CcfCustomerCardRelatesTo.controller.thunks.relatesToForMsd({
            pinnedRecordEntityId,
            pinnedRecordEntityType,
            crm,
            relationships,
            configurationId,
            workflowId,
        }));
    }
    if (crm.toLowerCase() === 'salesforce') {
        // NOTE : LOGIC FOR SALESFORCE
        const relationships = [];
        dispatch(extra.CcfCustomerCardRelatesTo.controller.thunks.relatesToForSalesforce({
            pinnedRecordEntityId,
            pinnedRecordEntityType,
            crm,
            relationships,
            configurationId,
            workflowId,
        }));
    }
    return OnClickOfRelatesToButtonReturnCodes.SUCCESS;
}));
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example relatesToForServiceNow()
 */
export const relatesToForServiceNow = createAsyncThunk(RELATES_TO_FOR_SERVICENOW, ({ pinnedRecordEntityId, pinnedRecordEntityType, crm, relationships, configurationId, workflowId }, { dispatch, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.setTarget({
        id: pinnedRecordEntityId,
        crm,
        type: pinnedRecordEntityType,
        relationships,
        configurationId,
        workflowId,
    }));
    dispatch(extra.CcfCustomerCardRelatesTo.controller.thunks.generateListOfRelatableEntities({
        pinnedRecordEntityId,
        crm,
        relationships,
    }));
    dispatch(extra.CcfCustomerCardRelatesTo.controller.thunks.setPopoverPosition());
    dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.showPopover());
}));
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example relatesToForSalesforce()
 */
export const relatesToForSalesforce = createAsyncThunk(RELATES_TO_FOR_SALESFORCE, ({ pinnedRecordEntityId, pinnedRecordEntityType, crm, relationships, configurationId, workflowId, }, { dispatch, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.setTarget({
        id: pinnedRecordEntityId,
        crm,
        type: pinnedRecordEntityType,
        relationships,
        configurationId,
        workflowId,
    }));
    dispatch(extra.CcfCustomerCardRelatesTo.controller.thunks.setPopoverPosition({}));
    dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.showPopover());
}));
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example relatesToForMsd()
 */
export const relatesToForMsd = createAsyncThunk(RELATES_TO_FOR_MSD, ({ pinnedRecordEntityId, pinnedRecordEntityType, crm, relationships, configurationId, workflowId }, { dispatch, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.setTarget({
        id: pinnedRecordEntityId,
        crm,
        type: pinnedRecordEntityType,
        relationships,
        configurationId,
        workflowId,
    }));
    dispatch(extra.CcfCustomerCardRelatesTo.controller.thunks.generateListOfRelatableEntities({
        pinnedRecordEntityId,
        crm,
        relationships,
    }));
    dispatch(extra.CcfCustomerCardRelatesTo.controller.thunks.setPopoverPosition());
    dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.showPopover());
}));
var HandleMouseDownEventReturnCodes;
(function (HandleMouseDownEventReturnCodes) {
    HandleMouseDownEventReturnCodes[HandleMouseDownEventReturnCodes["NO_TARGET_ELEMENT"] = -1] = "NO_TARGET_ELEMENT";
    HandleMouseDownEventReturnCodes[HandleMouseDownEventReturnCodes["NO_PINNED_RECORD_ID"] = -2] = "NO_PINNED_RECORD_ID";
    HandleMouseDownEventReturnCodes[HandleMouseDownEventReturnCodes["NO_POPOVER_ELEMENT"] = -3] = "NO_POPOVER_ELEMENT";
    HandleMouseDownEventReturnCodes[HandleMouseDownEventReturnCodes["SUCCESS"] = 0] = "SUCCESS";
    HandleMouseDownEventReturnCodes[HandleMouseDownEventReturnCodes["CLICKED_INSIDE_OF_POPOVER"] = 1] = "CLICKED_INSIDE_OF_POPOVER";
    HandleMouseDownEventReturnCodes[HandleMouseDownEventReturnCodes["CLICKED_BUTTON_FOR_TARGET"] = 2] = "CLICKED_BUTTON_FOR_TARGET";
})(HandleMouseDownEventReturnCodes || (HandleMouseDownEventReturnCodes = {}));
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example handleMouseDownEvent()
 */
export const handleMouseDownEvent = createAsyncThunk(HANDLE_MOUSE_DOWN_EVENT_FOR_POPOVER, ({ event }, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m, _o, _p, _q, _r;
    const elementTargetFromClick = event === null || event === void 0 ? void 0 : event.target;
    if (!elementTargetFromClick) {
        return HandleMouseDownEventReturnCodes.NO_TARGET_ELEMENT;
    }
    const rootState = (_l = getState()) !== null && _l !== void 0 ? _l : {};
    const { target, popover } = (_m = rootState[constants.slice.key]) !== null && _m !== void 0 ? _m : {};
    if (!(target === null || target === void 0 ? void 0 : target.id)) {
        return HandleMouseDownEventReturnCodes.NO_PINNED_RECORD_ID;
    }
    if (!(popover === null || popover === void 0 ? void 0 : popover.element)) {
        return HandleMouseDownEventReturnCodes.NO_POPOVER_ELEMENT;
    }
    // NOTE : DID WE CLICK INSIDE THE POPOVER? DO NOT CLOSE POPOVER
    if (popover === null || popover === void 0 ? void 0 : popover.element.contains(elementTargetFromClick)) {
        return HandleMouseDownEventReturnCodes.CLICKED_INSIDE_OF_POPOVER;
    }
    const adaptiveCardColumnContainer = (_o = elementTargetFromClick === null || elementTargetFromClick === void 0 ? void 0 : elementTargetFromClick.closest('.ac-container')) !== null && _o !== void 0 ? _o : {};
    if (adaptiveCardColumnContainer === null || adaptiveCardColumnContainer === void 0 ? void 0 : adaptiveCardColumnContainer.id) {
        // NOTE : DID WE CLICK A "RELATES TO" BUTTON?
        const isColumnOfRelatesTo = ((_p = adaptiveCardColumnContainer === null || adaptiveCardColumnContainer === void 0 ? void 0 : adaptiveCardColumnContainer.id) !== null && _p !== void 0 ? _p : '').startsWith('relatesToPinnedRecords_');
        // NOTE : DID WE CLICK THE TARGET'S "RELATES TO" BUTTON?
        const isColumnForTarget = ((_r = ((_q = adaptiveCardColumnContainer.id) !== null && _q !== void 0 ? _q : '').split('-')) !== null && _r !== void 0 ? _r : [])[1] === (target === null || target === void 0 ? void 0 : target.id);
        if (isColumnOfRelatesTo && isColumnForTarget) {
            return HandleMouseDownEventReturnCodes.CLICKED_BUTTON_FOR_TARGET;
        }
    }
    dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.hidePopover());
    dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.resetTarget());
    return HandleMouseDownEventReturnCodes.SUCCESS;
}));
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example generateListOfRelatableEntities()
 */
export const generateListOfRelatableEntities = createAsyncThunk(GENERATE_LIST_OF_RELATABLE_ENTITIES, ({ pinnedRecordEntityId, crm, relationships = {} }, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
    const rootState = (_s = getState()) !== null && _s !== void 0 ? _s : {};
    const selectedInteractionId = rootState.inbox.assignmentPanelMetadata.selectedInteractionId;
    const interaction = (_t = rootState.inbox.cxoneInteractions[selectedInteractionId]) !== null && _t !== void 0 ? _t : {};
    const searches = (_x = (_w = ((_v = (_u = rootState === null || rootState === void 0 ? void 0 : rootState.CcfCustomerCard) === null || _u === void 0 ? void 0 : _u.activity) !== null && _v !== void 0 ? _v : [])) === null || _w === void 0 ? void 0 : _w.find((item) => (item === null || item === void 0 ? void 0 : item.contactId) === (interaction === null || interaction === void 0 ? void 0 : interaction.selectedContactId))) !== null && _x !== void 0 ? _x : {};
    const [search = []] = (_z = ((_y = searches === null || searches === void 0 ? void 0 : searches.result) !== null && _y !== void 0 ? _y : []).filter((search = {}) => {
        var _a, _b;
        const containsTarget = ((_a = search === null || search === void 0 ? void 0 : search.pinRecords) !== null && _a !== void 0 ? _a : []).some((record = {}) => {
            return (record === null || record === void 0 ? void 0 : record.id) === pinnedRecordEntityId;
        });
        if (((_b = search === null || search === void 0 ? void 0 : search.system) === null || _b === void 0 ? void 0 : _b.type) === crm && containsTarget)
            return true;
        return false;
    })) !== null && _z !== void 0 ? _z : [];
    const relationshipFromLocalStorage = (_0 = extra.CcfCustomerCardRelatesTo.controller.service.localStorage.getRelationshipFromLocalStorage(interaction === null || interaction === void 0 ? void 0 : interaction.selectedContactId, pinnedRecordEntityId)) !== null && _0 !== void 0 ? _0 : {};
    // NOTE : CONSTRUCTING LIST BASED ON CURRENT INTERACTION RECORDS + RELATED INTERACTION RECORDS
    const list = [...((_1 = search === null || search === void 0 ? void 0 : search.pinRecords) !== null && _1 !== void 0 ? _1 : []), ...((_2 = search === null || search === void 0 ? void 0 : search.records) !== null && _2 !== void 0 ? _2 : [])]
        .filter((record) => {
        var _a, _b;
        return ((_a = relationships === null || relationships === void 0 ? void 0 : relationships.relatableEntities) !== null && _a !== void 0 ? _a : []).length > 0 &&
            (record === null || record === void 0 ? void 0 : record.type) &&
            ((_b = relationships === null || relationships === void 0 ? void 0 : relationships.relatableEntities) !== null && _b !== void 0 ? _b : []).includes(record.type);
    })
        .map((record) => {
        var _a, _b, _c, _d;
        return ({
            entityId: record === null || record === void 0 ? void 0 : record.id,
            entityType: record === null || record === void 0 ? void 0 : record.type,
            screenPopURL: ((_b = (_a = searches === null || searches === void 0 ? void 0 : searches.result[0]) === null || _a === void 0 ? void 0 : _a.system) === null || _b === void 0 ? void 0 : _b.baseUrl) &&
                (record === null || record === void 0 ? void 0 : record.url) &&
                `${(_d = (_c = searches === null || searches === void 0 ? void 0 : searches.result[0]) === null || _c === void 0 ? void 0 : _c.system) === null || _d === void 0 ? void 0 : _d.baseUrl}${record === null || record === void 0 ? void 0 : record.url}`,
            name: record === null || record === void 0 ? void 0 : record.display,
            entityTypeLabel: record === null || record === void 0 ? void 0 : record.label,
            isRelated: (relationshipFromLocalStorage === null || relationshipFromLocalStorage === void 0 ? void 0 : relationshipFromLocalStorage.entityId) ? (relationshipFromLocalStorage === null || relationshipFromLocalStorage === void 0 ? void 0 : relationshipFromLocalStorage.entityId) === (record === null || record === void 0 ? void 0 : record.id) : false,
        });
    });
    dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.setPopoverList({
        list,
    }));
}));
export const onClickOfEntity = createAsyncThunk(ON_CLICK_OF_ENTITY, ({ relateToEntityId, relateToEntityType, crm = '', isInboundCall = false, toastComponentForErrorOfUnableToRelate, toastComponentForErrorOfUnableToUnrelate, }, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _3, _4, _5, _6, _7, _8, _9;
    const logger = new extra.Logger('CXA', 'relateToEntity');
    const rootState = (_3 = getState()) !== null && _3 !== void 0 ? _3 : {};
    const { relationships, type: pinnedRecordEntityType, id: pinnedRecordEntityId, configurationId, workflowId, } = (_5 = (_4 = rootState[constants.slice.key]) === null || _4 === void 0 ? void 0 : _4.target) !== null && _5 !== void 0 ? _5 : {};
    const selectedInteractionId = rootState.inbox.assignmentPanelMetadata.selectedInteractionId;
    const interaction = (_6 = rootState.inbox.cxoneInteractions[selectedInteractionId]) !== null && _6 !== void 0 ? _6 : {};
    const { selectedContactId, } = interaction !== null && interaction !== void 0 ? interaction : {};
    const { relateableEntityFields = {}, } = relationships !== null && relationships !== void 0 ? relationships : {};
    const relationshipFromLocalStorage = (_7 = extra.CcfCustomerCardRelatesTo.controller.service.localStorage.getRelationshipFromLocalStorage(selectedContactId, pinnedRecordEntityId)) !== null && _7 !== void 0 ? _7 : {};
    dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.hidePopover());
    dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.resetTarget());
    dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.updatePinnedRecordElementAttributeOfID({
        pinnedRecordEntityId,
        elementAttributeOfID: `relatesToPinnedRecords_loading-${pinnedRecordEntityId}`,
    }));
    try {
        const promises = [];
        // NOTE : DEFAULT BEHAVIOUR IS TO RELATE
        let value = relateToEntityId;
        // NOTE : PINNED RECORD HAS AN EXISITING RELATIONSHIP. ENTITY CLICKED IS THE ENTITY CORRESPONDING TO EXISTING RELATIONSHIP, THEREFORE UNRELATE.
        if ((relationshipFromLocalStorage === null || relationshipFromLocalStorage === void 0 ? void 0 : relationshipFromLocalStorage.entityId) &&
            (relationshipFromLocalStorage === null || relationshipFromLocalStorage === void 0 ? void 0 : relationshipFromLocalStorage.entityId) === relateToEntityId &&
            crm.toLowerCase() !== Crm.MSD) {
            value = '';
            logger.info('relateToEntity', '[onClickOfEntity] Unrelating pinned record entity.');
        }
        else {
            logger.info('relateToEntity', '[onClickOfEntity] Relating pinned record entity.');
        }
        // NOTE : PINNED RECORD HAS AN EXISITING RELATIONSHIP. ENTITY CLICKED IS NOT THE ENTITY CORRESPONDING TO EXISTING RELATIONSHIP, THEREFORE UNRELATE PREVIOUS RELATIONSHIP AND ESTABLISH A NEW RELATIONSHIP.
        if ((relationshipFromLocalStorage === null || relationshipFromLocalStorage === void 0 ? void 0 : relationshipFromLocalStorage.entityId) &&
            (relationshipFromLocalStorage === null || relationshipFromLocalStorage === void 0 ? void 0 : relationshipFromLocalStorage.entityId) !== relateToEntityId &&
            (relationshipFromLocalStorage === null || relationshipFromLocalStorage === void 0 ? void 0 : relationshipFromLocalStorage.entityType) &&
            (relationshipFromLocalStorage === null || relationshipFromLocalStorage === void 0 ? void 0 : relationshipFromLocalStorage.entityType) !== relateToEntityType &&
            crm.toLowerCase() !== Crm.MSD) {
            promises.push(extra.CXoneClient.instance.cxoneCustomerCard.executeWorkFlow({
                configurationId,
                workflowId,
                action: 'relatesTo',
                entity: pinnedRecordEntityType,
                entityId: pinnedRecordEntityId,
                relatedObject: {
                    name: relateableEntityFields[relationshipFromLocalStorage === null || relationshipFromLocalStorage === void 0 ? void 0 : relationshipFromLocalStorage.entityType],
                    value: '',
                },
            }));
            logger.info('relateToEntity', '[onClickOfEntity] Unrelating previous relationship.');
        }
        if (crm.toLowerCase() === Crm.MSD) {
            promises.push(extra.CXoneClient.instance.cxoneCustomerCard.executeWorkFlow({
                configurationId,
                workflowId,
                action: 'relatesTo',
                entity: pinnedRecordEntityType,
                entityId: pinnedRecordEntityId,
                relatedObject: {
                    name: isInboundCall ? (_8 = relateableEntityFields[relateToEntityType]) === null || _8 === void 0 ? void 0 : _8[0] : (_9 = relateableEntityFields[relateToEntityType]) === null || _9 === void 0 ? void 0 : _9[1],
                    entityType: relateToEntityType,
                    value,
                },
            }));
        }
        else {
            promises.push(extra.CXoneClient.instance.cxoneCustomerCard.executeWorkFlow({
                configurationId,
                workflowId,
                action: 'relatesTo',
                entity: pinnedRecordEntityType,
                entityId: pinnedRecordEntityId,
                relatedObject: {
                    name: relateableEntityFields[relateToEntityType],
                    value,
                },
            }));
        }
        yield Promise.all(promises);
        if ((relationshipFromLocalStorage === null || relationshipFromLocalStorage === void 0 ? void 0 : relationshipFromLocalStorage.entityId) && (relationshipFromLocalStorage === null || relationshipFromLocalStorage === void 0 ? void 0 : relationshipFromLocalStorage.entityId) === relateToEntityId && crm.toLowerCase() !== Crm.MSD) {
            extra.CcfCustomerCardRelatesTo.controller.service.localStorage.removeRelationshipInLocalStorage(pinnedRecordEntityId, selectedContactId);
            dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.updatePinnedRecordElementAttributeOfID({
                pinnedRecordEntityId,
                elementAttributeOfID: `relatesToPinnedRecords_unticked-${pinnedRecordEntityId}`,
            }));
        }
        else {
            extra.CcfCustomerCardRelatesTo.controller.service.localStorage.setRelationshipInLocalStorage(pinnedRecordEntityId, relateToEntityId, relateToEntityType, selectedContactId);
            dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.updatePinnedRecordElementAttributeOfID({
                pinnedRecordEntityId,
                elementAttributeOfID: `relatesToPinnedRecords_ticked-${pinnedRecordEntityId}`,
            }));
        }
    }
    catch (error) {
        // NOTE : IF ERROR OCCURS ON RELATING OR RE-RELATING
        let toastComponentForError = toastComponentForErrorOfUnableToRelate;
        // NOTE : IF ERROR OCCURS ON UNRELATING
        if ((relationshipFromLocalStorage === null || relationshipFromLocalStorage === void 0 ? void 0 : relationshipFromLocalStorage.entityId) && (relationshipFromLocalStorage === null || relationshipFromLocalStorage === void 0 ? void 0 : relationshipFromLocalStorage.entityId) === relateToEntityId) {
            toastComponentForError = toastComponentForErrorOfUnableToUnrelate;
        }
        extra.toast.error(toastComponentForError, {
            containerId: 'AppToastContainer',
            autoClose: 2000,
            hideProgressBar: false,
        });
        dispatch(extra.CcfCustomerCardRelatesTo.controller.thunks.resetRelatesToPinnedRecordElementAttributeOfID({
            pinnedRecordEntityId,
            selectedContactId,
        }));
        logger.error('relateToEntity', `error while unrelating entity - ${JSON.stringify(error)}`);
    }
}));
/**
 * Thunk action creator to make sure button state is in the correct state when api errors out.
 * @param args - targetId
 * @example
 * ```
 * dispatch(resetRelatesToPinnedRecordElementAttributeOfID({targetId: '123112312-141241214-1412312'}))
 * ```
 */
export const resetRelatesToPinnedRecordElementAttributeOfID = createAsyncThunk(RESET_RELATES_TO_PINNED_RECORD_ELEMENT_ATTRIBUTE_OF_ID, ({ pinnedRecordEntityId, selectedContactId }, { dispatch, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    const relationshipFromLocalStorage = extra.CcfCustomerCardRelatesTo.controller.service.localStorage.getRelationshipFromLocalStorage(selectedContactId, pinnedRecordEntityId);
    // NOTE : CHECK IF A RELATIONSHIP EXISTS IN LOCAL STORAGE FOR A SPECIFIC PINNED RECORD
    if (relationshipFromLocalStorage === null || relationshipFromLocalStorage === void 0 ? void 0 : relationshipFromLocalStorage.entityId) {
        dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.updatePinnedRecordElementAttributeOfID({
            pinnedRecordEntityId,
            elementAttributeOfID: `relatesToPinnedRecords_ticked-${pinnedRecordEntityId}`,
        }));
    }
    else {
        dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.updatePinnedRecordElementAttributeOfID({
            pinnedRecordEntityId,
            elementAttributeOfID: `relatesToPinnedRecords_unticked-${pinnedRecordEntityId}`,
        }));
    }
}));
var SetPopoverPositionReturnCodes;
(function (SetPopoverPositionReturnCodes) {
    SetPopoverPositionReturnCodes[SetPopoverPositionReturnCodes["NO_PINNED_RECORD_ID"] = -1] = "NO_PINNED_RECORD_ID";
    SetPopoverPositionReturnCodes[SetPopoverPositionReturnCodes["NO_POPOVER_CONTAINER_ELEMENT"] = -2] = "NO_POPOVER_CONTAINER_ELEMENT";
    SetPopoverPositionReturnCodes[SetPopoverPositionReturnCodes["NO_POPOVER_ELEMENT"] = -3] = "NO_POPOVER_ELEMENT";
    SetPopoverPositionReturnCodes[SetPopoverPositionReturnCodes["BUTTON_ELEMENT_COULD_NOT_BE_FOUND"] = -4] = "BUTTON_ELEMENT_COULD_NOT_BE_FOUND";
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
export const setPopoverPosition = createAsyncThunk(SET_POPOVER_POSITION, (_, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _10, _11, _12, _13;
    const rootState = (_10 = getState()) !== null && _10 !== void 0 ? _10 : {};
    const { popover, target } = (_11 = rootState[constants.slice.key]) !== null && _11 !== void 0 ? _11 : {};
    if (!(target === null || target === void 0 ? void 0 : target.id)) {
        return SetPopoverPositionReturnCodes.NO_PINNED_RECORD_ID;
    }
    if (!((_12 = popover === null || popover === void 0 ? void 0 : popover.container) === null || _12 === void 0 ? void 0 : _12.element)) {
        return SetPopoverPositionReturnCodes.NO_POPOVER_CONTAINER_ELEMENT;
    }
    if (!(popover === null || popover === void 0 ? void 0 : popover.element)) {
        return SetPopoverPositionReturnCodes.NO_POPOVER_ELEMENT;
    }
    const buttons = (_13 = popover.container.element.querySelectorAll('[id*="relatesToPinnedRecords_ticked"], [id*="relatesToPinnedRecords_unticked"]')) !== null && _13 !== void 0 ? _13 : [];
    const button = Array.from(buttons !== null && buttons !== void 0 ? buttons : []).find(({ id } = {}) => id.includes(target.id));
    if (!button) {
        return SetPopoverPositionReturnCodes.BUTTON_ELEMENT_COULD_NOT_BE_FOUND;
    }
    const boundingClientRectForContainer = popover.container.element.getBoundingClientRect();
    const boundingClientRectForButton = button.getBoundingClientRect();
    const top = boundingClientRectForButton.top - boundingClientRectForContainer.top + boundingClientRectForButton.height;
    //fixing the left of popover to 0 for application with smaller container width
    const left = boundingClientRectForButton.left - boundingClientRectForContainer.left - popover.element.offsetWidth / 2 + 1 >= 0 ? boundingClientRectForButton.left - boundingClientRectForContainer.left - popover.element.offsetWidth / 2 + 1 : 0;
    dispatch(extra.CcfCustomerCardRelatesTo.controller.slice.actions.setPopoverPosition({
        top,
        left,
    }));
    return SetPopoverPositionReturnCodes.SUCCESS;
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
    var _14, _15;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rootState = (_14 = getState()) !== null && _14 !== void 0 ? _14 : {};
    const { popover } = (_15 = rootState[constants.slice.key]) !== null && _15 !== void 0 ? _15 : {};
    if (!(popover === null || popover === void 0 ? void 0 : popover.isOpen)) {
        return HandleResizeReturnCodes.POPOVER_IS_NOT_OPEN;
    }
    dispatch(extra.CcfCustomerCardRelatesTo.controller.thunks.setPopoverPosition());
    return HandleResizeReturnCodes.SUCCESS;
}));
//# sourceMappingURL=thunks.js.map