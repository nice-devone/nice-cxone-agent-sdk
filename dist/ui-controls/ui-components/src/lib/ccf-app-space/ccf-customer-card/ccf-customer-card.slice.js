import { __awaiter } from "tslib";
import { createAsyncThunk, createSelector, createSlice, } from '@reduxjs/toolkit';
import { ASSIGNMENT_KEY, CcfAssignmentAction, } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { MediaType, WorkflowTypes, EntityType, RecordTypeName, } from '@nice-devone/common-sdk';
import { CcfLogger, CXoneClient } from '@nice-devone/agent-sdk';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { iconList } from '../../ccf-crm-iconlist/ccf-crm-icons';
import { CXoneAgentIntegrationTransformer } from './ccf-customer-card-activity/cxone-agent-integration-transformer';
import { getAgentWorkflowDetailsFromLS } from './ccf-customer-card-utility';
import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
const logger = new CcfLogger('App.customer-card', 'App.customer-card-slice');
let searchString = '';
let prevSearchString = '';
export const CCF_CUSTOMERCARD_KEY = 'CcfCustomerCard';
/**
  * Initial state assigment
*/
export const CcfCustomerCardInitialState = {
    id: '',
    customFieldValues: [],
    customFieldUpdated: false,
    customFieldDefs: [],
    activity: [],
    activitySearch: [],
    activityLoading: false,
    activityRendered: false,
    fullName: '',
    image: '',
    detailsLoading: false,
    identities: [],
    customerCardList: [],
    customerListLoading: false,
    ccMergeResponse: {},
    ccNoteDeleteResponse: {},
    loadMoreData: true,
    noteList: [],
    customerNoteLocalMap: {},
    customerNotesLoading: false,
    customerNotesError: false,
    selectedCaseNoteObj: {
        updatedAt: '',
        editMode: false,
        totalRecords: 0,
    },
    selectedCaseId: '',
    scrollToken: '',
    customEventData: [],
    agentWorkflowConfigurationReceived: [],
    agentWorkflowResponseReceived: [],
    CustomFieldError: false,
    interactionHistory: {
        caseHistory: {
            caseInteractionHistory: [],
            totalRecords: 0,
            links: {
                self: null,
                next: null,
                previous: null,
            },
        },
        isLoading: false,
    },
    sFCRMNavigationData: {},
    nameValue: {},
    relatesToValue: {},
    isActivityExpanded: -1,
    createEntity: {
        target: {
            configurationId: null,
            workflowId: null,
            workflowInput: {},
            display: null,
        },
        confirmation: {
            isOpen: false,
        },
        popover: {
            isOpen: false,
            list: [],
            position: {
                top: 0,
                left: 0,
            },
        },
    },
};
var workflowActions;
(function (workflowActions) {
    workflowActions["SEARCH"] = "Search";
    workflowActions["DATAMEMORIALIZATION"] = "DataMemorialization";
    workflowActions["TIMELINE"] = "Timeline";
})(workflowActions || (workflowActions = {}));
/**
 * Thunk action creator to fetch case history data
 * @param args - contactId, pageNumber
 * @example
 * ```
 * dispatch(getCaseHistory('351251245',1, 10)
 * ```
 */
export const getCaseHistory = createAsyncThunk('CcfCustomerCard/getCaseHistory', (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const historyEvents = yield CXoneDigitalClient.instance.digitalContactManager.digitalContactService.getCaseHistory(args.contactId, args.pageNumber, args.pageSize);
        const userData = {};
        historyEvents._context.users.forEach((element) => {
            userData[element.id] = {
                id: element.id,
                fullName: element.firstName + ' ' + element.surname,
                imageUrl: element.imageUrl,
            };
        });
        historyEvents.users = userData;
        const caseInteractionHistoryObjectArr = new Array;
        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        let missingAssigneeFullNameIndex = -1;
        let lastAssigneeFullName = null;
        let lastAssigneeImgUrl = null;
        historyEvents.data.forEach((element, index) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const caseInteractionHistoryObject = {};
            caseInteractionHistoryObject.eventType = element.eventType;
            caseInteractionHistoryObject.createdAt = element.createdAt;
            caseInteractionHistoryObject.inboxAssignee = { fullName: '', imageUrl: '' };
            caseInteractionHistoryObject.previousInboxAssignee = { fullName: '', imageUrl: '' };
            if (typeof element.relationObjectId === 'string') {
                caseInteractionHistoryObject.status = element.relationObjectId;
                caseInteractionHistoryObject.eventInitiator = element.initiator.type;
                if (((_a = element.initiator) === null || _a === void 0 ? void 0 : _a.type) === 'user') {
                    caseInteractionHistoryObject.inboxAssignee.fullName =
                        historyEvents.users[element.initiator.id].fullName;
                    caseInteractionHistoryObject.inboxAssignee.imageUrl =
                        historyEvents.users[element.initiator.id].imageUrl;
                    caseInteractionHistoryObject.previousInboxAssignee.fullName = null;
                    caseInteractionHistoryObject.eventInitiator = historyEvents.users[element.initiator.id].fullName;
                }
            }
            else if (!element.relationObjectId) {
                if (element.initiator.type === 'user') {
                    caseInteractionHistoryObject.previousInboxAssignee.fullName =
                        historyEvents.users[element.initiator.id].fullName;
                    caseInteractionHistoryObject.previousInboxAssignee.imageUrl =
                        historyEvents.users[element.initiator.id].imageUrl;
                    caseInteractionHistoryObject.eventInitiator = historyEvents.users[element.initiator.id].fullName;
                }
                else {
                    lastAssigneeFullName = null;
                    lastAssigneeImgUrl = null;
                    for (let i = index + 1; i < historyEvents.data.length; i++) {
                        if (historyEvents.data[i].relationObjectId !== 0 && typeof historyEvents.data[i].relationObjectId !== 'string') {
                            lastAssigneeFullName =
                                historyEvents.users[historyEvents.data[i].relationObjectId].fullName;
                            lastAssigneeImgUrl = element.initiator.type === 'api' ? historyEvents.users[historyEvents.data[i].relationObjectId].imageUrl : '';
                            break;
                        }
                        if (historyEvents.data[i].initiator.type === 'user') {
                            lastAssigneeFullName =
                                historyEvents.users[historyEvents.data[i].initiator.id].fullName;
                            lastAssigneeImgUrl = historyEvents.users[historyEvents.data[i].initiator.id].imageUrl;
                            break;
                        }
                    }
                    missingAssigneeFullNameIndex = lastAssigneeFullName == null ? index : -1;
                    caseInteractionHistoryObject.previousInboxAssignee.fullName = lastAssigneeFullName;
                    caseInteractionHistoryObject.previousInboxAssignee.imageUrl = lastAssigneeImgUrl;
                    caseInteractionHistoryObject.eventInitiator = element.initiator.type;
                }
                caseInteractionHistoryObject.inboxAssignee.fullName = null;
            }
            else if (element.relationObjectId && element.initiator.id !== '') {
                caseInteractionHistoryObject.inboxAssignee.fullName =
                    historyEvents.users[element.relationObjectId].fullName;
                caseInteractionHistoryObject.inboxAssignee.imageUrl =
                    historyEvents.users[element.initiator.id].imageUrl;
                caseInteractionHistoryObject.previousInboxAssignee.fullName = null;
                caseInteractionHistoryObject.eventInitiator = historyEvents.users[element.initiator.id].fullName;
            }
            else if (element.relationObjectId && element.initiator.id === '') {
                caseInteractionHistoryObject.eventInitiator = element.initiator.type;
                caseInteractionHistoryObject.inboxAssignee.fullName =
                    historyEvents.users[element.relationObjectId].fullName;
                caseInteractionHistoryObject.inboxAssignee.imageUrl = '';
            }
            caseInteractionHistoryObjectArr.push(caseInteractionHistoryObject);
        }));
        if (missingAssigneeFullNameIndex !== -1) {
            let nextPage = args.pageNumber + 1;
            let isFound = false;
            let nextHistoryEvents = null;
            do {
                nextHistoryEvents =
                    (yield CXoneDigitalClient.instance.digitalContactManager.digitalContactService.getCaseHistory(args.contactId, nextPage, args.pageSize));
                const nextUserData = {};
                nextHistoryEvents._context.users.forEach((element) => {
                    nextUserData[element.id] = {
                        id: element.id,
                        fullName: element.firstName + ' ' + element.surname,
                        imageUrl: element.imageUrl,
                    };
                });
                for (const element of nextHistoryEvents.data) {
                    if (element.relationObjectId !== 0 && typeof element.relationObjectId === 'number') {
                        lastAssigneeFullName = nextUserData[element.relationObjectId].fullName;
                        lastAssigneeImgUrl = nextUserData[element.relationObjectId].imageUrl;
                        isFound = true;
                        break;
                    }
                    if (element.initiator.type === 'user') {
                        lastAssigneeFullName =
                            nextUserData[element.initiator.id].fullName;
                        lastAssigneeImgUrl = nextUserData[element.initiator.id].imageUrl;
                        isFound = true;
                        break;
                    }
                }
                nextPage++;
            } while (!isFound || nextHistoryEvents._links.next !== null);
            caseInteractionHistoryObjectArr[missingAssigneeFullNameIndex].previousInboxAssignee.fullName = lastAssigneeFullName;
            caseInteractionHistoryObjectArr[missingAssigneeFullNameIndex].previousInboxAssignee.imageUrl =
                historyEvents.data[missingAssigneeFullNameIndex].initiator.type === 'api' ?
                    lastAssigneeImgUrl : '';
        }
        return ({
            caseInteractionHistory: caseInteractionHistoryObjectArr,
            totalRecords: historyEvents.totalRecords,
            links: historyEvents._links,
        });
    }
    catch (error) {
        logger.error('getCaseHistory', `error while fetching case history - ${JSON.stringify(error)}`);
        return [];
    }
}));
/**
 * Thunk action creator to interact with SDK and manage Authentication By Code flow
 *
 * @param args - client ID and auth code
 * ```
 * @example
 *  dispatch(
      updateCustomFields({customerId:interactionID,customFields:updatedCustomField})
    );
 * ```
 */
export const updateCustomFields = createAsyncThunk('', (args, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch(CcfCustomerCardActions.setDetailsLoading(true));
        yield CXoneClient.instance.cxoneCustomerCard.updateCustomFields(args);
        dispatch(CcfCustomerCardActions.setCustomFieldUpdate(true));
        dispatch(CcfCustomerCardActions.updateCustomField(args.customFields));
    }
    catch (error) {
        logger.error('updateCustomFields', `error while updating custom fields - ${JSON.stringify(error)}`);
    }
    finally {
        dispatch(CcfCustomerCardActions.setDetailsLoading(false));
    }
}));
/**
 * Thunk action handler to delete custom field value
 *
 * @param args - ident and customerId
 * ```
 * @example
 *  dispatch(
      deleteCustomField({customerId,ident:'city'})
    );
 * ```
 */
export const deleteCustomField = createAsyncThunk('CcfCustomerCard/deleteCustomField', (customField, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield CXoneClient.instance.cxoneCustomerCard.deleteCustomField(customField);
        dispatch(CcfCustomerCardActions.setCustomFieldUpdate(true));
    }
    catch (error) {
        logger.error('deleteCustomField', `error while updating custom field - ${JSON.stringify(error)}`);
    }
}));
/**
 * Thunk action to get the CRM data for transferred contact
 * @param interactionId - interaction id of particular contact/case
 * @param contactId - contact id of particular contact/case
 * ```
 * @example
 *  dispatch(
      getCRMDataForTransferedContact({interactionId, contactId})
    );
 * ```
 */
export const getCRMDataForTransferedContact = createAsyncThunk('CcfCustomerCard/getCRMDataForTransferedContact', (contactDetails, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e, _f, _g, _h;
    try {
        const response = yield CXoneClient.instance.cxoneCustomerCard.getCRMDataForTransferedContact(contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.interactionId);
        response.contactId = contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.contactId;
        if (((_b = response === null || response === void 0 ? void 0 : response.agentWorkflowConfiguration) === null || _b === void 0 ? void 0 : _b.length) === 0) {
            response.agentWorkflowConfiguration = [{ ContactID: contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.contactId }];
        }
        else {
            response.agentWorkflowConfiguration[0][0].ContactID = contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.contactId;
        }
        const agentWorkflowDetailsFromLS = getAgentWorkflowDetailsFromLS([StorageKeys.CUSTOMEVENT_DATA, StorageKeys.CXONE_ACTIVITY_CONFIG, StorageKeys.AGENT_WORKFLOW_CONFIGURATION_EVENT, StorageKeys.CRM_PIN_RECORDS]);
        if (response && (response === null || response === void 0 ? void 0 : response.result) && ((_d = (_c = response === null || response === void 0 ? void 0 : response.result[0]) === null || _c === void 0 ? void 0 : _c.pinRecords) === null || _d === void 0 ? void 0 : _d.length) > 0) {
            response.result[0].pinRecords = (_f = (_e = response === null || response === void 0 ? void 0 : response.result[0]) === null || _e === void 0 ? void 0 : _e.pinRecords) === null || _f === void 0 ? void 0 : _f.map((pinRecords) => (Object.assign(Object.assign({}, pinRecords), { linked: 'true' })));
            const agentWorkflowPinRecordsDetails = agentWorkflowDetailsFromLS.crmPinRecords;
            if (agentWorkflowPinRecordsDetails.length >= 0) {
                const ifDataAvailable = agentWorkflowPinRecordsDetails.some((item) => {
                    return (item === null || item === void 0 ? void 0 : item.contactId) === (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.contactId);
                });
                !ifDataAvailable && agentWorkflowPinRecordsDetails.push({ contactId: contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.contactId, pinRecords: (_g = response === null || response === void 0 ? void 0 : response.result[0]) === null || _g === void 0 ? void 0 : _g.pinRecords });
            }
            LocalStorageHelper.setItem(StorageKeys.CRM_PIN_RECORDS, agentWorkflowPinRecordsDetails);
        }
        dispatch(CcfCustomerCardActions.setActivityInformation(updateAgentWorkflowResponseWithIcon(response)));
        dispatch(CcfCustomerCardActions.storeCustomEventFlag({ contactId: contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.contactId, isCustomEventReceived: false, isScreenPopInitiated: false }));
        dispatch(CcfCustomerCardActions.setActivitySearchInformation(response.agentWorkflowConfiguration[0][0]));
        let storedActivityConfig = agentWorkflowDetailsFromLS.cxone_activity_config;
        const isActivityStored = storedActivityConfig && !((_h = storedActivityConfig.find((item) => { var _a; return (item === null || item === void 0 ? void 0 : item.ContactID) === ((_a = response.agentWorkflowConfiguration[0][0]) === null || _a === void 0 ? void 0 : _a.contactID); })) === null || _h === void 0 ? void 0 : _h.contactId) || [];
        if (isActivityStored && storedActivityConfig) {
            storedActivityConfig.push(response.agentWorkflowConfiguration[0][0]);
        }
        else {
            storedActivityConfig = [response.agentWorkflowConfiguration[0][0]];
        }
        LocalStorageHelper.setItem(StorageKeys.CXONE_ACTIVITY_CONFIG, storedActivityConfig);
        const agentWorkflowEventDetails = agentWorkflowDetailsFromLS.agentWorkflowConfigurationEvent;
        if (agentWorkflowEventDetails.length >= 0) {
            agentWorkflowEventDetails.push({ contactId: contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.contactId, isAgentWFConfigAvailable: true });
        }
        LocalStorageHelper.setItem(StorageKeys.AGENT_WORKFLOW_CONFIGURATION_EVENT, agentWorkflowEventDetails);
        dispatch(CcfCustomerCardActions.storeConfigforAgentWorkflow({ contactId: response === null || response === void 0 ? void 0 : response.contactId, isConfigAvailable: true }));
    }
    catch (error) {
        dispatch(CcfCustomerCardActions.setActivityLoading(false));
        logger.debug('getCRMDataForTransferedContact', `error while getting CRM data for transfered contact - ${JSON.stringify(error)}`);
    }
}));
/**
 * Thunk action to keep alive cacheKey for CRM data when contact is for long time in agent's inbox
 * @param interactionId - interaction id of particular contact/case
 * @example
 *  dispatch(
      getCRMDataForTransferedContactFromPolling(interactionId)
    );
 */
export const getCRMDataForTransferedContactFromPolling = createAsyncThunk('CcfCustomerCard/getCRMDataForTransferedContactFromPolling', (interactionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield CXoneClient.instance.cxoneCustomerCard.getCRMDataForTransferedContactFromPolling(interactionId);
    }
    catch (error) {
        logger.error('getCRMDataForTransferedContactFromPolling', `error while fetching CRM data for transfered contact from polling - ${JSON.stringify(error)}`);
    }
}));
/**
 * Thunk action to fetch the list of notes
 *
 * @param args - customer ID
 * ```
 * @example
 *  dispatch(
      getCustomerNotes({customerId:interactionID})
    );
 * ```
 */
export const getCustomerNotesThunk = createAsyncThunk('CcfCustomerCard/getCustomerNotesThunk', (data, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    yield CXoneClient.instance.cxoneCustomerCard.getCustomerNotesById(data).then((response) => {
        dispatch(CcfCustomerCardActions.updateCustomerNotes({ notes: response.data, shouldOverwrite: data.currentPageIndex === 1 }));
        dispatch(CcfCustomerCardActions.updateCustomerNotesTotalRecords(response.totalRecords));
    }).catch((error) => {
        logger.debug('getCustomerNotesThunk', `error while fetching customer notes - ${JSON.stringify(error)}`);
    });
}));
/**
 * Thunk action to fetch the list of notes
 *
 * @param args - customer ID
 * ```
 * @example
 *  dispatch(
      getCustomerNotes({customerId:interactionID})
    );
 * ```
 */
export const deleteSelectedCustomerNoteThunk = createAsyncThunk('', (data, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield CXoneClient.instance.cxoneCustomerCard.deleteCustomerNoteByNoteId(data.customerId, data.noteId).then(() => {
        dispatch(getCustomerNotesThunk({ customerId: data.customerId, currentPageIndex: 1 }));
        dispatch(CcfCustomerCardActions.updateCustomerCardNoteDeleteRes('success'));
    }).catch((error) => {
        logger.debug('deleteSelectedCustomerNoteThunk', `error while deleting the selected customer note - ${JSON.stringify(error)}`);
    });
    return response;
}));
/**
 * Thunk action to fetch the list of notes
 *
 * @param args - customer ID and note
 * ```
 * @example
 *  dispatch(
      addNewCustomerNoteThunk({customerId:interactionID})
    );
 * ```
 */
export const addNewCustomerNoteThunk = createAsyncThunk('', (data, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    let newNote = {};
    yield CXoneClient.instance.cxoneCustomerCard.createNewCustomerNote(data.customerId, data.note).then((res) => {
        if (res)
            newNote = res;
        dispatch(CcfCustomerCardActions.updateCustomerNotesUsingCaseIdMap([
            {},
            false,
            undefined,
            data.customerId
        ]));
    }).catch((error) => {
        logger.debug('addNewCustomerNoteThunk', `error while adding new customer note - ${JSON.stringify(error)}`);
    });
    if (newNote)
        return newNote;
}));
/**
 * Thunk action to edit the existing note
 *
 * @param args - customer ID and noteContent
 * ```
 * @example
 *  dispatch(
      editCustomerNoteById(customerID)
    );
 * ```
 */
export const editCustomerNoteByIdThunk = createAsyncThunk('', (data, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    yield CXoneClient.instance.cxoneCustomerCard.editCustomerNoteByNoteId(data.customerId, data.noteId, data.note).then(() => {
        dispatch(getCustomerNotesThunk({ customerId: data.customerId, currentPageIndex: 1 }));
        //remove obj props in Map on completion(empty):
        dispatch(CcfCustomerCardActions.updateCustomerNotesUsingCaseIdMap([
            {},
            false,
            undefined,
            data.customerId
        ]));
    }).catch((error) => {
        logger.debug('editCustomerNoteByIdThunk', `error while editing the customer not by id - ${JSON.stringify(error)}`);
    });
}));
/**
 * Thunk action creator to interact with SDK and manage Authentication By Code flow
 *
 * @param args - client ID and auth code
 * ```
 * @example
 *  dispatch(
      getCustomerDetailsById(customerId)
    );
 * ```
 */
export const getCustomerDetailsById = createAsyncThunk('', (customerContactInfo, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    try {
        dispatch(CcfCustomerCardActions.setDetailsLoading(true));
        const response = yield CXoneClient.instance.cxoneCustomerCard.getCustomerDetailsById(customerContactInfo.customerId);
        dispatch(CcfCustomerCardActions.storeCustomField(response.customFields));
        (response === null || response === void 0 ? void 0 : response.fullName) &&
            dispatch(CcfCustomerCardActions.storeCustomerFullName(response === null || response === void 0 ? void 0 : response.fullName));
        if (((_j = customerContactInfo.selectedContact) === null || _j === void 0 ? void 0 : _j.media) === MediaType.VOICE && !(customerContactInfo === null || customerContactInfo === void 0 ? void 0 : customerContactInfo.searchTabSelected)) {
            (response === null || response === void 0 ? void 0 : response.fullName) &&
                dispatch(CcfAssignmentAction.updateCxoneVoiceContactCustomerName({
                    interactionId: customerContactInfo.selectedContact.interactionId,
                    contactId: customerContactInfo.selectedContact.contactId,
                    customerName: response === null || response === void 0 ? void 0 : response.fullName,
                }));
        }
        (response === null || response === void 0 ? void 0 : response.image) &&
            dispatch(CcfCustomerCardActions.storeCustomerImage(response === null || response === void 0 ? void 0 : response.image));
        dispatch(CcfCustomerCardActions.setCustomFieldUpdate(false));
        dispatch(CcfCustomerCardActions.setDetailsLoading(false));
        dispatch(CcfCustomerCardActions.setIdentities(response.identities));
        (response === null || response === void 0 ? void 0 : response.id) &&
            dispatch(CcfCustomerCardActions.setCustomerId(response === null || response === void 0 ? void 0 : response.id));
    }
    catch (error) {
        dispatch(CcfCustomerCardActions.setDetailsLoading(false));
        dispatch(CcfCustomerCardActions.setIdentities([]));
        dispatch(CcfCustomerCardActions.storeCustomField([]));
        dispatch(CcfCustomerCardActions.storeCustomerFullName(''));
        dispatch(CcfCustomerCardActions.setCustomerId(''));
        logger.debug('getCustomerDetailsById', `error while getting customer details by id ${JSON.stringify(error)}`);
    }
}));
/**
 * Thunk action creator to interact with SDK and manage Authentication By Code flow
 *
 * @param args - client ID and auth code
 * ```
 * @example
 *  dispatch(
      getCustomFieldsDefinitions(customerID)
    );
 * ```
 */
export const getCustomFieldsDefinitions = createAsyncThunk('', (_, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield CXoneClient.instance.cxoneCustomerCard.getCustomFieldsDefinitions();
        dispatch(CcfCustomerCardActions.storeCustomFieldDefs(response));
    }
    catch (error) {
        logger.debug('getCustomFieldsDefinitions', `error while fetching custom fields definitions - ${JSON.stringify(error)}`);
    }
}));
/**
 * Method to append CRM Icons to response
 * @example - updateAgentWorkflowResponseWithIcon
 */
export const updateAgentWorkflowResponseWithIcon = (response) => {
    const parsedResponse = JSON.parse(JSON.stringify(response));
    const channelType = parsedResponse &&
        parsedResponse.result &&
        parsedResponse.result[0] &&
        parsedResponse.result[0].system &&
        parsedResponse.result[0].system.type &&
        parsedResponse.result[0].system.type.toUpperCase();
    const crmData = Object.assign({
        iconBase64string: '',
    }, parsedResponse);
    crmData.iconBase64string = iconList[channelType];
    return crmData;
};
/**
 * Thunk action creator to interact with SDK and manage Authentication By Code flow
 *
 * @param args - client ID and auth code
 * ```
 * @example
 *  dispatch(
      fetchActivityData({configurationId:interactionID,workflowId:updatedCustomField})
    );
 * ```
 */
export const fetchActivityData = createAsyncThunk('', (args, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    try {
        const getCRMSearchResultargs = {
            configurationId: args.configurationId,
            workflowId: args.workflowId,
            action: 'Search',
            interactionID: args.interactionID,
            contactID: args.contactID,
            cacheKey: args.cacheKey,
            dynamicDataMappingId: args === null || args === void 0 ? void 0 : args.dynamicDataMappingId,
            workflowInput: {
                phoneNumber: (_k = args === null || args === void 0 ? void 0 : args.workflowInput) === null || _k === void 0 ? void 0 : _k.phoneNumber,
                email: (_l = args === null || args === void 0 ? void 0 : args.workflowInput) === null || _l === void 0 ? void 0 : _l.email,
            },
            cxone: {},
            integration: [{
                    entity: '',
                    entityId: '',
                }],
        };
        /*
        Use Custom search Input from Agent Workflow Configuration event when it's provided
        */
        if (args === null || args === void 0 ? void 0 : args.customSearch) {
            getCRMSearchResultargs.workflowInput = args.customSearch;
        }
        if (((_m = args === null || args === void 0 ? void 0 : args.workflowInput) === null || _m === void 0 ? void 0 : _m.phoneNumber) === '') {
            delete getCRMSearchResultargs.workflowInput.phoneNumber;
        }
        if ((getCRMSearchResultargs === null || getCRMSearchResultargs === void 0 ? void 0 : getCRMSearchResultargs.cacheKey) === '') {
            delete getCRMSearchResultargs.cacheKey;
        }
        if ((getCRMSearchResultargs === null || getCRMSearchResultargs === void 0 ? void 0 : getCRMSearchResultargs.dynamicDataMappingId) === '') {
            delete getCRMSearchResultargs.dynamicDataMappingId;
        }
        const response = yield CXoneClient.instance.cxoneCustomerCard.executeWorkFlow(getCRMSearchResultargs);
        dispatch(CcfCustomerCardActions.setActivityLoading(false));
        if (response) {
            if (args === null || args === void 0 ? void 0 : args.contactID) {
                response.contactId = args === null || args === void 0 ? void 0 : args.contactID;
            }
            dispatch(CcfCustomerCardActions.setActivityInformation(updateAgentWorkflowResponseWithIcon(response)));
            dispatch(CcfCustomerCardActions.setActivityRendered(true));
            dispatch(CcfCustomerCardActions.storeCustomEventFlag({ contactId: response === null || response === void 0 ? void 0 : response.contactId, isCustomEventReceived: false, isScreenPopInitiated: false }));
        }
    }
    catch (error) {
        dispatch(CcfCustomerCardActions.setActivityLoading(false));
        logger.debug('fetchActivityData', `error while fetching activity data - ${JSON.stringify(error)}`);
    }
}));
/**
 * Thunk action creator to interact with SDK and manage Authentication By Code flow
 *
 * @param args - workflowObject
 * ```
 * @example
 *  dispatch(
      updateActivityTimeline(workflowObject)
    );
 * ```
 */
export const updateActivityTimeline = createAsyncThunk('', (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield CXoneClient.instance.cxoneCustomerCard.executeWorkFlow(args);
    }
    catch (error) {
        logger.debug('updateActivityTimeline', `error while updating activity timeline - ${JSON.stringify(error)}`);
    }
}));
/**
   * Method to update activity data for available contacts
   * @param contacts-ContactData
   * @example updateActivityData(true);
   */
export const updateActivityData = createAsyncThunk('CcfCustomerCard/updateActivityData', (args, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p;
    const availableActivity = (_o = args === null || args === void 0 ? void 0 : args.activityData) === null || _o === void 0 ? void 0 : _o.filter((item) => {
        var _a, _b, _c, _d;
        return (((_a = args === null || args === void 0 ? void 0 : args.contacts) === null || _a === void 0 ? void 0 : _a.contactId) && ((_b = args === null || args === void 0 ? void 0 : args.contacts) === null || _b === void 0 ? void 0 : _b.contactId) !== '') ? (item === null || item === void 0 ? void 0 : item.contactId) !== ((_c = args === null || args === void 0 ? void 0 : args.contacts) === null || _c === void 0 ? void 0 : _c.contactId) : item.contactId !== ((_d = args === null || args === void 0 ? void 0 : args.contacts) === null || _d === void 0 ? void 0 : _d.caseId);
    });
    const availableCustomEventData = (_p = args === null || args === void 0 ? void 0 : args.customEventDetails) === null || _p === void 0 ? void 0 : _p.filter((item) => {
        var _a, _b, _c, _d;
        return (((_a = args === null || args === void 0 ? void 0 : args.contacts) === null || _a === void 0 ? void 0 : _a.contactId) && ((_b = args === null || args === void 0 ? void 0 : args.contacts) === null || _b === void 0 ? void 0 : _b.contactId) !== '') ? (item === null || item === void 0 ? void 0 : item.contactId) !== ((_c = args === null || args === void 0 ? void 0 : args.contacts) === null || _c === void 0 ? void 0 : _c.contactId) : item.contactId !== ((_d = args === null || args === void 0 ? void 0 : args.contacts) === null || _d === void 0 ? void 0 : _d.caseId);
    });
    const agentWorkflowDetailsFromLS = getAgentWorkflowDetailsFromLS([StorageKeys.CUSTOMEVENT_DATA, StorageKeys.CXONE_ACTIVITY_CONFIG, StorageKeys.AGENT_WORKFLOW_CONFIGURATION_EVENT, StorageKeys.CRM_PIN_RECORDS]);
    const screenPopDetails = agentWorkflowDetailsFromLS.customeventData;
    const isScreenPopDetails = screenPopDetails instanceof Array && (screenPopDetails === null || screenPopDetails === void 0 ? void 0 : screenPopDetails.filter((item) => {
        var _a, _b, _c;
        return ((_a = args === null || args === void 0 ? void 0 : args.contacts) === null || _a === void 0 ? void 0 : _a.contactId) ? (item === null || item === void 0 ? void 0 : item.contactId) !== ((_b = args === null || args === void 0 ? void 0 : args.contacts) === null || _b === void 0 ? void 0 : _b.contactId) : (item === null || item === void 0 ? void 0 : item.contactId) !== ((_c = args === null || args === void 0 ? void 0 : args.contacts) === null || _c === void 0 ? void 0 : _c.caseId);
    }));
    /*
      updates/removes the activity data in slice when voice call disconnected
    */
    dispatch(CcfCustomerCardActions.updateActivityInformation(availableActivity));
    dispatch(CcfCustomerCardActions.removeStoredCustomEvent(availableCustomEventData));
    LocalStorageHelper.setItem(StorageKeys.CUSTOMEVENT_DATA, isScreenPopDetails);
    const activitySearchData = (!args.cxoneCcActivitySearch || args.cxoneCcActivitySearch.length === 0) ? agentWorkflowDetailsFromLS.cxone_activity_config : args.cxoneCcActivitySearch;
    const availableActivityConfig = activitySearchData && activitySearchData instanceof Array && (activitySearchData === null || activitySearchData === void 0 ? void 0 : activitySearchData.filter((item) => {
        var _a, _b, _c, _d;
        return (((_a = args === null || args === void 0 ? void 0 : args.contacts) === null || _a === void 0 ? void 0 : _a.contactId) && ((_b = args === null || args === void 0 ? void 0 : args.contacts) === null || _b === void 0 ? void 0 : _b.contactId) !== '') ? (item === null || item === void 0 ? void 0 : item.ContactID) !== ((_c = args === null || args === void 0 ? void 0 : args.contacts) === null || _c === void 0 ? void 0 : _c.contactId) : (item === null || item === void 0 ? void 0 : item.ContactID) !== ((_d = args === null || args === void 0 ? void 0 : args.contacts) === null || _d === void 0 ? void 0 : _d.caseId);
    }));
    LocalStorageHelper.setItem(StorageKeys.CXONE_ACTIVITY_CONFIG, availableActivityConfig);
    /*
      updates/removes the activity configuration(workflowID and configurationID) in slice when voice call disconnected
    */
    dispatch(CcfCustomerCardActions.updateActivitySearchInformation(availableActivityConfig));
    dispatch(CcfCustomerCardActions.updateConfigforAgentWorkflow([]));
}));
/**
 * Method to to update Timeline & DataMemo
 * @example - invokeTimelineAndDataMemo
 */
export const invokeTimelineAndDataMemo = createAsyncThunk('CcfCustomerCard/invokeTimelineAndDataMemo', (timelineDataMemoDetails, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    var _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83;
    const dispositionValue = {};
    const timeDuration = {};
    let cxoneDigital = {};
    let cxoneContactVoice = {};
    let dataMemoralizationPayload = {};
    const caseId = timelineDataMemoDetails.activeContact.media === MediaType.DIGITAL ? (_q = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.activeContact) === null || _q === void 0 ? void 0 : _q.caseId : (_r = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.activeContact) === null || _r === void 0 ? void 0 : _r.contactId;
    if (timelineDataMemoDetails.contact && caseId && ((_s = timelineDataMemoDetails.dispositionData) === null || _s === void 0 ? void 0 : _s.dispositions) && ((_u = (_t = timelineDataMemoDetails.dispositionData) === null || _t === void 0 ? void 0 : _t.dispositions[caseId]) === null || _u === void 0 ? void 0 : _u.formInputs)) {
        dispositionValue.dispositionName = ((_y = (_x = (_w = (_v = timelineDataMemoDetails.dispositionData) === null || _v === void 0 ? void 0 : _v.dispositions[caseId]) === null || _w === void 0 ? void 0 : _w.formInputs) === null || _x === void 0 ? void 0 : _x.disposition) === null || _y === void 0 ? void 0 : _y.dispositionName) || '';
        dispositionValue.dispositionNotes = ((_0 = (_z = timelineDataMemoDetails.dispositionData) === null || _z === void 0 ? void 0 : _z.dispositions[caseId]) === null || _0 === void 0 ? void 0 : _0.formInputs.notes) || '';
        if (timelineDataMemoDetails.contact.media === MediaType.VOICE) {
            const tags = (_2 = (_1 = timelineDataMemoDetails.dispositionData) === null || _1 === void 0 ? void 0 : _1.dispositions[caseId]) === null || _2 === void 0 ? void 0 : _2.formInputs;
            if (tags) {
                const tagData = [];
                (_3 = tags === null || tags === void 0 ? void 0 : tags.tags) === null || _3 === void 0 ? void 0 : _3.filter((e) => tagData.push(e.tagName));
                dispositionValue.tags = tagData.toString();
            }
        }
    }
    // update timeline logic
    const linkedData = [];
    ((_4 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.selectedActivityData) === null || _4 === void 0 ? void 0 : _4.result) && ((_5 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.selectedActivityData) === null || _5 === void 0 ? void 0 : _5.result[0]) && ((_8 = (_7 = (_6 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.selectedActivityData) === null || _6 === void 0 ? void 0 : _6.result[0]) === null || _7 === void 0 ? void 0 : _7.records) === null || _8 === void 0 ? void 0 : _8.map((record) => {
        var _a;
        if ((record === null || record === void 0 ? void 0 : record.linked) === 'true') {
            linkedData.push(record);
        }
        if (((_a = record === null || record === void 0 ? void 0 : record.related) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            //TODO - will change the type of related from any to specific type as part of new story
            record === null || record === void 0 ? void 0 : record.related.map((related) => {
                if ((related === null || related === void 0 ? void 0 : related.linked) === 'true') {
                    linkedData.push(related);
                }
            });
        }
    }));
    // update timeline logic for Relatesto field to phone call integration entity
    const RelatestoDataobject = [];
    ((_9 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.selectedActivityData) === null || _9 === void 0 ? void 0 : _9.result) && ((_10 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.selectedActivityData) === null || _10 === void 0 ? void 0 : _10.result[0]) && ((_13 = (_12 = (_11 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.selectedActivityData) === null || _11 === void 0 ? void 0 : _11.result[0]) === null || _12 === void 0 ? void 0 : _12.records) === null || _13 === void 0 ? void 0 : _13.map((record) => {
        var _a, _b;
        if ((record === null || record === void 0 ? void 0 : record.relatesto) === 'true') {
            RelatestoDataobject.push({
                name: ((_a = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.voiceContactDetails) === null || _a === void 0 ? void 0 : _a.isInbound) ? 'from' : 'to',
                entityType: record === null || record === void 0 ? void 0 : record.type,
                value: record === null || record === void 0 ? void 0 : record.id,
            });
        }
        if (((_b = record === null || record === void 0 ? void 0 : record.related) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            //TODO - will change the type of related from any to specific type as part of new story
            record === null || record === void 0 ? void 0 : record.related.map((related) => {
                var _a;
                if ((related === null || related === void 0 ? void 0 : related.relatesto) === 'true') {
                    RelatestoDataobject.push({
                        name: ((_a = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.voiceContactDetails) === null || _a === void 0 ? void 0 : _a.isInbound) ? 'from' : 'to',
                        entityType: related === null || related === void 0 ? void 0 : related.type,
                        value: related === null || related === void 0 ? void 0 : related.id,
                    });
                }
            });
        }
    }));
    /**
     * Get the linked records From Pinned Interactions
     */
    ((_14 = timelineDataMemoDetails.selectedActivityData) === null || _14 === void 0 ? void 0 : _14.result) && ((_15 = timelineDataMemoDetails.selectedActivityData) === null || _15 === void 0 ? void 0 : _15.result[0]) && ((_18 = (_17 = (_16 = timelineDataMemoDetails.selectedActivityData) === null || _16 === void 0 ? void 0 : _16.result[0]) === null || _17 === void 0 ? void 0 : _17.pinRecords) === null || _18 === void 0 ? void 0 : _18.map((record) => {
        var _a;
        if (record.linked === 'true' && (record === null || record === void 0 ? void 0 : record.type) !== EntityType.PHONECALL) {
            linkedData.push(record);
        }
        if (((_a = record === null || record === void 0 ? void 0 : record.related) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            //TODO - will change the type of related from any to specific type as part of new story
            record === null || record === void 0 ? void 0 : record.related.map((related) => {
                if (related.linked === 'true') {
                    linkedData.push(related);
                }
            });
        }
    }));
    const relatedData = [];
    /**
     * Get the linked records From Pinned Interactions for Relatesto field
     */
    ((_19 = timelineDataMemoDetails.selectedActivityData) === null || _19 === void 0 ? void 0 : _19.result) && ((_20 = timelineDataMemoDetails.selectedActivityData) === null || _20 === void 0 ? void 0 : _20.result[0]) && ((_23 = (_22 = (_21 = timelineDataMemoDetails.selectedActivityData) === null || _21 === void 0 ? void 0 : _21.result[0]) === null || _22 === void 0 ? void 0 : _22.pinRecords) === null || _23 === void 0 ? void 0 : _23.map((record) => {
        if (record.linked === 'true' && (record === null || record === void 0 ? void 0 : record.type) === EntityType.PHONECALL) {
            relatedData.push(record);
        }
    }));
    if ((linkedData.length > 0 && linkedData[0].activityCrmId !== '') || relatedData.length > 0) {
        let updateTimelineConfig;
        if ((_24 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.selectedActivityConfig) === null || _24 === void 0 ? void 0 : _24.request) {
            updateTimelineConfig = (_26 = (_25 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.selectedActivityConfig) === null || _25 === void 0 ? void 0 : _25.request) === null || _26 === void 0 ? void 0 : _26.find((item) => { var _a, _b; return ((_a = item.workflowType) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === ((_b = WorkflowTypes === null || WorkflowTypes === void 0 ? void 0 : WorkflowTypes.CREATE_TIMELINE) === null || _b === void 0 ? void 0 : _b.toLowerCase()); });
        }
        else if (((_28 = (_27 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.selectedActivityConfig) === null || _27 === void 0 ? void 0 : _27.timelineWorkflow) === null || _28 === void 0 ? void 0 : _28.length) > 0) {
            updateTimelineConfig = (_29 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.selectedActivityConfig) === null || _29 === void 0 ? void 0 : _29.timelineWorkflow[0][0];
        }
        if ((timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.contact) && ((_30 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.activeContact) === null || _30 === void 0 ? void 0 : _30.interactionId) && ((_31 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.activeContact) === null || _31 === void 0 ? void 0 : _31.contactId) && (timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.contact.media) === MediaType.DIGITAL) {
            timeDuration.startTime = (_34 = (_33 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.digitalContactDetails[(_32 = timelineDataMemoDetails.activeContact) === null || _32 === void 0 ? void 0 : _32.interactionId][caseId]) === null || _33 === void 0 ? void 0 : _33.case) === null || _34 === void 0 ? void 0 : _34.inboxAssigneeLastAssignedAt;
            timeDuration.endTime = (_37 = (_36 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.digitalContactDetails[(_35 = timelineDataMemoDetails.activeContact) === null || _35 === void 0 ? void 0 : _35.interactionId][caseId]) === null || _36 === void 0 ? void 0 : _36.case) === null || _37 === void 0 ? void 0 : _37.statusUpdatedAt;
        }
        /**
       * Entitity integration object for Relatesto field and linked records
       */
        let cxoneEntityIntegrationWithRelatedobject = [];
        let cxoneEntityIntegration = [];
        const integrationPayload = linkedData.map((element) => {
            const cxoneEntityDetails = [];
            cxoneEntityDetails.push(CXoneAgentIntegrationTransformer.toCXoneIntegrationEntity(element));
            return cxoneEntityDetails;
        });
        // Payload creation for relates to data
        const integrationPayloadRelate = relatedData.map((element) => {
            const cxoneEntityDetailsRelate = [];
            cxoneEntityDetailsRelate.push(CXoneAgentIntegrationTransformer.toCXoneIntegrationEntityRelatesto(element, RelatestoDataobject[0]));
            return cxoneEntityDetailsRelate;
        });
        const linkedRecords = [];
        if (integrationPayload === null || integrationPayload === void 0 ? void 0 : integrationPayload.length) {
            cxoneEntityIntegration = integrationPayload.flat();
            if (cxoneEntityIntegration === null || cxoneEntityIntegration === void 0 ? void 0 : cxoneEntityIntegration.length) {
                cxoneEntityIntegration.forEach((integrationEntityData) => {
                    const linkableRecord = linkedData.find((element) => { var _a, _b; return ((_a = element.id) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = integrationEntityData.entityId) === null || _b === void 0 ? void 0 : _b.toString()); });
                    if (linkableRecord === null || linkableRecord === void 0 ? void 0 : linkableRecord.linkable) {
                        linkedRecords.push(integrationEntityData);
                    }
                });
            }
        }
        if (integrationPayloadRelate === null || integrationPayloadRelate === void 0 ? void 0 : integrationPayloadRelate.length) {
            cxoneEntityIntegrationWithRelatedobject = integrationPayloadRelate.flat();
            if (cxoneEntityIntegrationWithRelatedobject === null || cxoneEntityIntegrationWithRelatedobject === void 0 ? void 0 : cxoneEntityIntegrationWithRelatedobject.length) {
                cxoneEntityIntegrationWithRelatedobject.forEach((integrationEntityDataRelate) => {
                    const RelatableRecord = relatedData.find((element) => { var _a, _b; return ((_a = element.id) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = integrationEntityDataRelate.entityId) === null || _b === void 0 ? void 0 : _b.toString()); });
                    if (RelatableRecord === null || RelatableRecord === void 0 ? void 0 : RelatableRecord.linkable) {
                        linkedRecords.push(integrationEntityDataRelate);
                    }
                });
            }
        }
        cxoneEntityIntegration = cxoneEntityIntegration.concat(cxoneEntityIntegrationWithRelatedobject);
        if ((timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.contact) && ((_38 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.contact) === null || _38 === void 0 ? void 0 : _38.media) === MediaType.VOICE) {
            cxoneContactVoice = CXoneAgentIntegrationTransformer.toCXoneVoiceContactData(timelineDataMemoDetails.contact, dispositionValue, timelineDataMemoDetails.voiceContactDetails, timelineDataMemoDetails.currentUser);
        }
        if ((timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.contact) && ((_39 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.contact) === null || _39 === void 0 ? void 0 : _39.media) === MediaType.DIGITAL) {
            cxoneDigital = CXoneAgentIntegrationTransformer.toCXoneDigitalContactData(timelineDataMemoDetails.contact, dispositionValue, timelineDataMemoDetails.currentUser, timeDuration, caseId);
            if (((_40 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.activeContact) === null || _40 === void 0 ? void 0 : _40.interactionId) && ((_41 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.activeContact) === null || _41 === void 0 ? void 0 : _41.contactId)) {
                cxoneDigital.from = (_45 = (_44 = (_43 = timelineDataMemoDetails.digitalContactDetails[(_42 = timelineDataMemoDetails.activeContact) === null || _42 === void 0 ? void 0 : _42.interactionId][caseId]) === null || _43 === void 0 ? void 0 : _43.case) === null || _44 === void 0 ? void 0 : _44.authorEndUserIdentity) === null || _45 === void 0 ? void 0 : _45.fullName;
                cxoneDigital.to = (_49 = (_48 = (_47 = timelineDataMemoDetails.digitalContactDetails[(_46 = timelineDataMemoDetails.activeContact) === null || _46 === void 0 ? void 0 : _46.interactionId][caseId]) === null || _47 === void 0 ? void 0 : _47.case) === null || _48 === void 0 ? void 0 : _48.inboxAssigneeUser) === null || _49 === void 0 ? void 0 : _49.firstName;
                cxoneDigital.eventType = timelineDataMemoDetails.digitalContactDetails[(_50 = timelineDataMemoDetails.activeContact) === null || _50 === void 0 ? void 0 : _50.interactionId][caseId].type;
                cxoneDigital.customerName = timelineDataMemoDetails.digitalContactDetails[(_51 = timelineDataMemoDetails.activeContact) === null || _51 === void 0 ? void 0 : _51.interactionId][caseId].customerName;
                cxoneDigital.type = (_53 = timelineDataMemoDetails.digitalContactDetails[(_52 = timelineDataMemoDetails.activeContact) === null || _52 === void 0 ? void 0 : _52.interactionId][caseId]) === null || _53 === void 0 ? void 0 : _53.type;
                cxoneDigital.channelType = (_55 = timelineDataMemoDetails.digitalContactDetails[(_54 = timelineDataMemoDetails.activeContact) === null || _54 === void 0 ? void 0 : _54.interactionId][caseId]) === null || _55 === void 0 ? void 0 : _55.channelType;
                if (timelineDataMemoDetails.activeContact.skillOrQueueId || ((_58 = (_57 = timelineDataMemoDetails.digitalContactDetails[(_56 = timelineDataMemoDetails.activeContact) === null || _56 === void 0 ? void 0 : _56.interactionId][caseId]) === null || _57 === void 0 ? void 0 : _57.routingQueue) === null || _58 === void 0 ? void 0 : _58.skillId)) {
                    cxoneDigital.skillId = timelineDataMemoDetails.activeContact.skillOrQueueId ? timelineDataMemoDetails.activeContact.skillOrQueueId : (_61 = (_60 = timelineDataMemoDetails.digitalContactDetails[(_59 = timelineDataMemoDetails.activeContact) === null || _59 === void 0 ? void 0 : _59.interactionId][caseId]) === null || _60 === void 0 ? void 0 : _60.routingQueue.skillId) === null || _61 === void 0 ? void 0 : _61.toString();
                }
                else {
                    const routingQueueId = (_64 = (_63 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.digitalContactDetails[(_62 = timelineDataMemoDetails.activeContact) === null || _62 === void 0 ? void 0 : _62.interactionId][caseId]) === null || _63 === void 0 ? void 0 : _63.case) === null || _64 === void 0 ? void 0 : _64.routingQueueId;
                    const routingQueue = (_65 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.getCxoneRoutingQueuId) === null || _65 === void 0 ? void 0 : _65.find((element) => {
                        return routingQueueId === element.id;
                    });
                    if (routingQueue === null || routingQueue === void 0 ? void 0 : routingQueue.skillId) {
                        cxoneDigital.skillId = (_66 = routingQueue === null || routingQueue === void 0 ? void 0 : routingQueue.skillId) === null || _66 === void 0 ? void 0 : _66.toString();
                    }
                }
            }
        }
        //Payload creation of Create Timeline for voice calls and digital
        if (linkedRecords === null || linkedRecords === void 0 ? void 0 : linkedRecords.length) {
            const timelinePayload = {
                interactionID: ((_67 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.contact) === null || _67 === void 0 ? void 0 : _67.media) === MediaType.VOICE ? (_68 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.voiceContactDetails) === null || _68 === void 0 ? void 0 : _68.interactionId : (_69 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.activeContact) === null || _69 === void 0 ? void 0 : _69.interactionId,
                action: workflowActions.TIMELINE,
                contactID: caseId,
                cxoneContact: ((_70 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.contact) === null || _70 === void 0 ? void 0 : _70.media) === MediaType.VOICE ? cxoneContactVoice : cxoneDigital,
                integration: linkedRecords,
            };
            if (updateTimelineConfig) {
                timelinePayload.configurationId = updateTimelineConfig === null || updateTimelineConfig === void 0 ? void 0 : updateTimelineConfig.configurationId;
                timelinePayload.workflowId = updateTimelineConfig === null || updateTimelineConfig === void 0 ? void 0 : updateTimelineConfig.workflowId;
                dispatch(updateActivityTimeline(timelinePayload));
            }
        }
        const createTimelinePayload = {
            interactionID: ((_71 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.contact) === null || _71 === void 0 ? void 0 : _71.media) === MediaType.VOICE ? (_72 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.voiceContactDetails) === null || _72 === void 0 ? void 0 : _72.interactionId : (_73 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.activeContact) === null || _73 === void 0 ? void 0 : _73.interactionId,
            action: workflowActions.TIMELINE,
            contactID: caseId,
            cxoneContact: ((_74 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.contact) === null || _74 === void 0 ? void 0 : _74.media) === MediaType.VOICE ? cxoneContactVoice : cxoneDigital,
            integration: cxoneEntityIntegration,
        };
        if (updateTimelineConfig) {
            createTimelinePayload.configurationId = updateTimelineConfig === null || updateTimelineConfig === void 0 ? void 0 : updateTimelineConfig.configurationId;
            createTimelinePayload.workflowId = updateTimelineConfig === null || updateTimelineConfig === void 0 ? void 0 : updateTimelineConfig.workflowId;
        }
        /**
  *  Payload Creation for Data Memorialization
  *
  */
        if (((_76 = (_75 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.selectedActivityConfig) === null || _75 === void 0 ? void 0 : _75.dataMemorializationWorkflow) === null || _76 === void 0 ? void 0 : _76.length) > 0) {
            dataMemoralizationPayload = createTimelinePayload;
            dataMemoralizationPayload.action = workflowActions.DATAMEMORIALIZATION;
            dataMemoralizationPayload.configurationId = (_78 = (_77 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.selectedActivityConfig) === null || _77 === void 0 ? void 0 : _77.dataMemorializationWorkflow[0][0]) === null || _78 === void 0 ? void 0 : _78.configurationId;
            dataMemoralizationPayload.workflowId = (_80 = (_79 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.selectedActivityConfig) === null || _79 === void 0 ? void 0 : _79.dataMemorializationWorkflow[0][0]) === null || _80 === void 0 ? void 0 : _80.workflowId;
            dataMemoralizationPayload.dataMappingId = (_83 = (_82 = (_81 = timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.selectedActivityConfig) === null || _81 === void 0 ? void 0 : _81.dataMemorializationWorkflow[0][0]) === null || _82 === void 0 ? void 0 : _82.workflowParam) === null || _83 === void 0 ? void 0 : _83.dataMappingId;
            dispatch(updateActivityTimeline(dataMemoralizationPayload));
        }
        /*
  * After create timeline method, Delete this case entry in localStorage as the contact is already completed and removed from inbox
  */
        const storedLinkedData = LocalStorageHelper.getItem(StorageKeys.CC_LINKED_ACTIVITIES, true) || {};
        if ((timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.activeContact) && storedLinkedData[caseId]) {
            delete storedLinkedData[caseId];
            LocalStorageHelper.setItem(StorageKeys.CC_LINKED_ACTIVITIES, storedLinkedData);
        }
        /*
  * After create timeline method, Delete Relates to this case entry in localStorage as the contact is already completed and removed from inbox
  */
        const storedRelatesToData = LocalStorageHelper.getItem(StorageKeys.CC_RELATESTO_ACTIVITIES, true) || {};
        if ((timelineDataMemoDetails === null || timelineDataMemoDetails === void 0 ? void 0 : timelineDataMemoDetails.activeContact) && storedRelatesToData[caseId]) {
            delete storedRelatesToData[caseId];
            LocalStorageHelper.setItem(StorageKeys.CC_RELATESTO_ACTIVITIES, storedRelatesToData);
        }
    }
}));
/**
 * Thunk action creator to searchCustomerCard
 * @param customerFullName - customer Full Name
 * @param scrollToken - token for the scroll
 * ```
 * @example
 *  dispatch(searchCustomerCard({customerFullName,scrollToken}));
 * ```
 */
export const searchCustomerCard = createAsyncThunk('CcfCustomerCard/searchCustomerCard', (searchCustomerCardArgs) => __awaiter(void 0, void 0, void 0, function* () {
    searchString = searchCustomerCardArgs.customerName;
    const customerCardList = yield CXoneClient.instance.cxoneCustomerCard
        .searchCustomer(searchCustomerCardArgs.customerName, searchCustomerCardArgs.externalIds, searchCustomerCardArgs.scrollToken);
    return customerCardList;
}));
/**
 * Thunk action creator to mergeCustomerCard
 * @param args - CurrentCustomerId, CustomerToMergeId
 * ```
 * @example
 *  dispatch(mergeCustomerCard({currentCustomerId, customerToMergeId}));
 * ```
 */
export const mergeCustomerCard = createAsyncThunk('CcfCustomerCard/mergeCustomerCard', (mergeCustomerCardArgs) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield CXoneClient.instance.cxoneCustomerCard.mergeCustomerCard(mergeCustomerCardArgs).catch((error) => {
        logger.debug('mergeCustomerCard', `error while merging customer card - ${JSON.stringify(error)}`);
    });
    return response;
}));
/**
 * Thunk action to pop Epic healthcare records by invoking a workflow
 * @param data - Record identifier
 * ```
 * @example
 *  dispatch(screenPopEpicRecord({id, entityType}));
 * ```
 */
export const screenPopEpicRecord = createAsyncThunk('CcfCustomerCard/screenPopEpicRecord', (args) => __awaiter(void 0, void 0, void 0, function* () {
    var _84, _85, _86;
    const { id, entityType } = args;
    const agentWorkflowDetailsFromLS = getAgentWorkflowDetailsFromLS([StorageKeys.CXONE_ACTIVITY_CONFIG, StorageKeys.AGENT_DETAILS]);
    const activityConfigData = agentWorkflowDetailsFromLS.cxone_activity_config;
    const { payload } = activityConfigData[0];
    const agentDetails = agentWorkflowDetailsFromLS.agent_details;
    const epicScreenPopConfig = {
        configurationId: (_84 = payload[0][0]) === null || _84 === void 0 ? void 0 : _84.configurationId,
        workflowId: (_85 = payload[0][0]) === null || _85 === void 0 ? void 0 : _85.workflowId,
        action: 'Trigger',
        workflowInput: {
            action: 'screenPop',
            id: id,
            type: entityType,
            recipientId: (_86 = agentDetails[0]) === null || _86 === void 0 ? void 0 : _86.agentId,
        },
    };
    yield CXoneClient.instance.cxoneCustomerCard.executeWorkFlow(epicScreenPopConfig);
}));
export const CcfCustomerCardSlice = createSlice({
    name: CCF_CUSTOMERCARD_KEY,
    initialState: CcfCustomerCardInitialState,
    reducers: {
        /**
         * Used to store flag on agent workflow event received.
         * @param rootState - getCustomerCardState
        * @example - storeConfigforWorkflowResponse(state)
         */
        storeConfigforWorkflowResponse(state, action) {
            const agentWorkflowFlowResponse = JSON.parse(JSON.stringify(state.agentWorkflowResponseReceived)) || [];
            if (agentWorkflowFlowResponse.length >= 0) {
                agentWorkflowFlowResponse.push(action.payload);
            }
            return Object.assign(Object.assign({}, state), { agentWorkflowResponseReceived: action.payload });
        },
        /**
         * Used to update details of agent workflow configuration received.
         * @param rootState - getCustomerCardState
        * @example - updateWorkflowResponse(state)
         */
        updateWorkflowResponse(state, action) {
            return Object.assign(Object.assign({}, state), { agentWorkflowResponseReceived: action.payload });
        },
        /**
         * Used to store flag on agent workflow configuration received.
         * @param rootState - getCustomerCardState
        * @example - storeConfigforAgentWorkflow(state)
         */
        storeConfigforAgentWorkflow(state, action) {
            const agentWorkflowEventDetails = JSON.parse(JSON.stringify(state.agentWorkflowConfigurationReceived)) || [];
            if (agentWorkflowEventDetails.length >= 0) {
                agentWorkflowEventDetails.push(action.payload);
            }
            return Object.assign(Object.assign({}, state), { agentWorkflowConfigurationReceived: action.payload });
        },
        /**
         * Used to update details of agent workflow configuration received.
         * @param rootState - getCustomerCardState
        * @example - updateConfigforAgentWorkflow(state)
         */
        updateConfigforAgentWorkflow(state, action) {
            return Object.assign(Object.assign({}, state), { agentWorkflowConfigurationReceived: action.payload });
        },
        /**
         * Used to remove the stored custom event details from store
         * @param rootState - AppSpace state
         * @example - storeCustomEventFlag(state)
         */
        removeStoredCustomEvent(state, action) {
            return Object.assign(Object.assign({}, state), { customEventData: action.payload });
        },
        /**
         * Used to maintain the list of contacts where custom event was recieved
         * @param rootState - AppSpace state
         * @example - storeCustomEventFlag(state)
         */
        storeCustomEventFlag(state, action) {
            let updatedCustomEventDetails = JSON.parse(JSON.stringify(state.customEventData));
            if (updatedCustomEventDetails && !(updatedCustomEventDetails === null || updatedCustomEventDetails === void 0 ? void 0 : updatedCustomEventDetails.find((item) => item.contactId === action.payload.contactId))) {
                updatedCustomEventDetails.push(action.payload);
            }
            else {
                updatedCustomEventDetails = updatedCustomEventDetails === null || updatedCustomEventDetails === void 0 ? void 0 : updatedCustomEventDetails.map((item) => {
                    if (item.contactId === action.payload.contactId) {
                        item = action.payload;
                    }
                    return item;
                });
            }
            return Object.assign(Object.assign({}, state), { customEventData: updatedCustomEventDetails });
        },
        /**
         * used to storeCustomField
         * @param rootState - AppSpace state
         * @example - storeCustomField(state)
         */
        storeCustomField(state, action) {
            return Object.assign(Object.assign({}, state), { customFieldValues: action.payload });
        },
        /**
         * used to updateCustomField
         * @param rootState - AppSpace state
         * @example - updateCustomField(state)
         */
        updateCustomField(state, action) {
            const customFieldValues = JSON.parse(JSON.stringify(state.customFieldValues));
            action.payload.forEach(field => {
                const matchedMessage = customFieldValues.findIndex((customFieldValue) => customFieldValue.ident === field.ident);
                if (matchedMessage > -1) {
                    customFieldValues[matchedMessage].value = field.value;
                }
                else {
                    customFieldValues.push({
                        ident: field.ident,
                        value: field.value,
                    });
                }
            });
            return Object.assign(Object.assign({}, state), { customFieldValues: customFieldValues });
        },
        /**
         * used to storeCustomField
         * @param rootState - AppSpace state
         * @example - storeCustomField(state)
         */
        storeCustomerFullName(state, action) {
            return Object.assign(Object.assign({}, state), { fullName: action.payload });
        },
        /**
         * used to storeCustomField
         * @param rootState - AppSpace state
         * @example - storeCustomField(state)
         */
        setDetailsLoading(state, action) {
            return Object.assign(Object.assign({}, state), { detailsLoading: action.payload });
        },
        /**
         * used to storeIdentities
         * @param rootState - AppSpace state
         * @example - setIdentities(state)
         */
        setIdentities(state, action) {
            return Object.assign(Object.assign({}, state), { identities: action.payload });
        },
        /**
         * used to set customerId
         * @param state - customerCard state
         * @example - setCustomerId(state)
         */
        setCustomerId(state, action) {
            return Object.assign(Object.assign({}, state), { id: action.payload });
        },
        /**
         * used to storeCustomField
         * @param rootState - AppSpace state
         * @example - storeCustomField(state)
         */
        storeCustomerImage(state, action) {
            return Object.assign(Object.assign({}, state), { image: action.payload });
        },
        /**
         * used to setCustomFieldUpdate
         * @param rootState - AppSpace state
         * @example - setCustomFieldUpdate(state)
         */
        setCustomFieldUpdate(state, action) {
            return Object.assign(Object.assign({}, state), { customFieldUpdated: action.payload });
        },
        /**
         * used to storeCustomFieldDefinitions
         * @param rootState - AppSpace state
         * @example - storeCustomFieldDefs(state)
         */
        storeCustomFieldDefs(state, action) {
            return Object.assign(Object.assign({}, state), { customFieldDefs: action.payload });
        },
        /**
         * used to setActivityInformation
         * @param rootState - AppSpace state
         * @example - setActivityInformation(state)
         */
        setActivityInformation(state, action) {
            const updatedActivity = JSON.parse(JSON.stringify(state.activity));
            if (!updatedActivity.find((item) => item.contactId === action.payload.contactId)) {
                updatedActivity.push(action.payload);
            }
            else {
                updatedActivity.map((item) => {
                    var _a, _b, _c, _d, _e, _f, _g, _h;
                    if (item.contactId === action.payload.contactId) {
                        if (Array.isArray(item.result) && item.result.length === 0) {
                            // CRM-23084 initializing result with empty records and system to avoid undefined error in UI
                            item.result[0] = { records: [], system: {} };
                            (_a = item.iconBase64string) !== null && _a !== void 0 ? _a : (item.iconBase64string = (_b = action === null || action === void 0 ? void 0 : action.payload) === null || _b === void 0 ? void 0 : _b.iconBase64string);
                        }
                        item.result[0].records = action.payload.result[0].records;
                        item.result[0].system = action.payload.result[0].system;
                        if (action && action.payload && ((_c = action === null || action === void 0 ? void 0 : action.payload) === null || _c === void 0 ? void 0 : _c.result) && ((_e = (_d = action === null || action === void 0 ? void 0 : action.payload) === null || _d === void 0 ? void 0 : _d.result[0]) === null || _e === void 0 ? void 0 : _e.pinRecords) && ((_h = (_g = (_f = action === null || action === void 0 ? void 0 : action.payload) === null || _f === void 0 ? void 0 : _f.result[0]) === null || _g === void 0 ? void 0 : _g.pinRecords) === null || _h === void 0 ? void 0 : _h.length) > 0) {
                            item.result[0].pinRecords = action.payload.result[0].pinRecords;
                        }
                    }
                    return item;
                });
            }
            ;
            return Object.assign(Object.assign({}, state), { activity: updatedActivity });
        },
        /**
        * used to setActivityInformation
        * @param rootState - AppSpace state
        * @example - setActivityInformation(state)
        */
        setPinRecords(state, action) {
            return Object.assign(Object.assign({}, state), { pinRecords: action.payload });
        },
        /**
        * set Navigation records into Name and RelatesTo dropdown in the Current Interaction
        * @param rootState - AppSpace state
        * @example - setSFCRMNavigationData(state, payloadAction)
        */
        setSFCRMNavigationData(state, action) {
            var _a, _b, _c;
            const entityValue = action.payload.entityId;
            const contactId = action.payload.contactId;
            const mappingFieldName = action.payload.mappingFieldName;
            const entityName = action.payload.entityName;
            const entityType = action.payload.entityType;
            const nameValue = JSON.parse(JSON.stringify(state.nameValue));
            const relatesToValue = JSON.parse(JSON.stringify(state.relatesToValue));
            const entity = { entityValue, entityName, entityType };
            const sFCRMNavigationData = JSON.parse(JSON.stringify(state.sFCRMNavigationData));
            if (!sFCRMNavigationData[contactId])
                sFCRMNavigationData[contactId] = {};
            if (!sFCRMNavigationData[contactId][mappingFieldName])
                sFCRMNavigationData[contactId][mappingFieldName] = [];
            const position = sFCRMNavigationData[contactId][mappingFieldName].findIndex((entity) => entity.entityValue === entityValue);
            if (position !== -1) {
                sFCRMNavigationData[contactId][mappingFieldName].splice(position, 1);
            }
            sFCRMNavigationData[contactId][mappingFieldName].push(entity);
            LocalStorageHelper.setItem(StorageKeys.SFCRM_NAVIGATION_DATA, sFCRMNavigationData);
            // AW-38221
            if (mappingFieldName === 'whoid') {
                nameValue[contactId] = entity.entityValue;
                if (((_a = entity.entityType) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === RecordTypeName.LEAD) {
                    relatesToValue[contactId] = '';
                }
                return Object.assign(Object.assign({}, state), { sFCRMNavigationData, nameValue, relatesToValue });
            }
            ;
            if (mappingFieldName === 'whatid') {
                const whoidValue = nameValue[contactId];
                const typeOfEntity = (_c = (((_b = sFCRMNavigationData[contactId]) === null || _b === void 0 ? void 0 : _b.whoid) || []).find((entitydata) => (entitydata === null || entitydata === void 0 ? void 0 : entitydata.entityValue) === whoidValue)) === null || _c === void 0 ? void 0 : _c.entityType;
                if ((typeOfEntity === null || typeOfEntity === void 0 ? void 0 : typeOfEntity.toLowerCase()) === RecordTypeName.LEAD) {
                    relatesToValue[contactId] = '';
                }
                else {
                    relatesToValue[contactId] = entity.entityValue;
                }
                return Object.assign(Object.assign({}, state), { sFCRMNavigationData, relatesToValue });
            }
            return Object.assign(Object.assign({}, state), { sFCRMNavigationData });
        },
        /**
        * set Name Value records into Name dropdown in the Current Interaction
        * @param rootState - AppSpace state
        * @example - setNameValue(state, payloadAction)
        */
        setNameValue(state, action) {
            const selectedContactId = action.payload.contactId;
            const selectedNameValue = action.payload.value;
            const nameValue = JSON.parse(JSON.stringify(state.nameValue));
            if (!nameValue[selectedContactId])
                nameValue[selectedContactId] = '';
            nameValue[selectedContactId] = selectedNameValue;
            return Object.assign(Object.assign({}, state), { nameValue });
        },
        /**
        * set Relates To Value records into Name dropdown in the Current Interaction
        * @param rootState - AppSpace state
        * @example - setNameValue(state, payloadAction)
        */
        setRelatesToValue(state, action) {
            const selectedContactId = action.payload.contactId;
            const selectedRelatesToValue = action.payload.value;
            const relatesToValue = JSON.parse(JSON.stringify(state.relatesToValue));
            if (!relatesToValue[selectedContactId])
                relatesToValue[selectedContactId] = '';
            relatesToValue[selectedContactId] = selectedRelatesToValue;
            return Object.assign(Object.assign({}, state), { relatesToValue });
        },
        /**
        * used to setActivityInformation
        * @param rootState - AppSpace state
        * @example - blukLoadSFCRMNavigationDataOnRefresh(state)
        */
        bulkLoadSFCRMNavigationDataOnRefresh(state, action) {
            var _a, _b;
            const data = action.payload.navigationData;
            const contactId = action.payload.contactId;
            const sFCRMNavigationData = JSON.parse(JSON.stringify(state.sFCRMNavigationData));
            sFCRMNavigationData[contactId] = data;
            const selectedValues = LocalStorageHelper.getItem(StorageKeys.CRM_NAVIGATION_DATA, true);
            // Define nameValue and relatesToValue as objects
            const nameValue = {};
            const relatesToValue = {};
            nameValue[contactId] = (_a = selectedValues[contactId]) === null || _a === void 0 ? void 0 : _a.whoid;
            relatesToValue[contactId] = (_b = selectedValues[contactId]) === null || _b === void 0 ? void 0 : _b.whatid;
            return Object.assign(Object.assign({}, state), { sFCRMNavigationData, nameValue, relatesToValue });
        },
        /**
         * used to updateActivity when contact is disconnected
         * @param rootState - AppSpace state
         * @example - updateActivityInformation(state)
         */
        updateActivityInformation(state, action) {
            return Object.assign(Object.assign({}, state), { activity: action.payload });
        },
        /**
         * used to setActivitySearchInformation
         * @param rootState - AppSpace state
         * @example - setActivitySearchInformation(state)
         */
        setActivitySearchInformation(state, action) {
            const updatedActivityconfig = JSON.parse(JSON.stringify(state.activitySearch));
            if (action.payload &&
                !updatedActivityconfig.find((item) => item.ContactID === action.payload.ContactID)) {
                updatedActivityconfig.push(action.payload);
            }
            else {
                updatedActivityconfig.map((item) => {
                    var _a, _b;
                    if (((_a = action.payload) === null || _a === void 0 ? void 0 : _a.request) && (item.ContactID === ((_b = action.payload) === null || _b === void 0 ? void 0 : _b.ContactID))) {
                        item.request = action.payload.request;
                    }
                    return item;
                });
            }
            return Object.assign(Object.assign({}, state), { activitySearch: updatedActivityconfig });
        },
        /**
         * used to updateActivitySearchInformation when contact is disconnected
         * @param rootState - AppSpace state
         * @example - updateActivitySearchInformation(state)
         */
        updateActivitySearchInformation(state, action) {
            return Object.assign(Object.assign({}, state), { activitySearch: action.payload });
        },
        /**
         * used to setActivityLoading
         * @param rootState - AppSpace state
         * @example - setActivityLoading(state)
         */
        setActivityLoading(state, action) {
            return Object.assign(Object.assign({}, state), { activityLoading: action.payload });
        },
        /**
         * used to setActivityRendered
         * @param rootState - AppSpace state
         * @example - setActivityRendered(state)
         */
        setActivityRendered(state, action) {
            return Object.assign(Object.assign({}, state), { activityRendered: action.payload });
        },
        /**
         * used to setActivityExpanded
         * @param rootState - AppSpace state
         * @example - setActivityExpanded(state)
         */
        setActivityExpanded(state, action) {
            return Object.assign(Object.assign({}, state), { isActivityExpanded: action.payload });
        },
        /**
         *     * used to store/update customerNote List
         * @param rootState - customerCard state
         * @example - updateCustomerNotes(state)
         */
        updateCustomerNotes(state, action) {
            if (action.payload.shouldOverwrite) {
                return Object.assign(Object.assign({}, state), { noteList: action.payload.notes });
            }
            return Object.assign(Object.assign({}, state), { noteList: [
                    ...state.noteList,
                    ...action.payload.notes
                ] });
        },
        /**
         * used to store/update customerNote total records
         * @param rootState - customerCard state
         * @example - updateCustomerNotesTotalRecords(state)
        */
        updateCustomerNotesTotalRecords(state, action) {
            state.selectedCaseNoteObj.totalRecords = action.payload;
        },
        /**
         * used to store CustomerNotes for all assigned digital cases or selected cases by agent
         * to retain the user input selection for customer note
         * accepts selectedCaseId
         * @param rootState - customerCard state
         * @example - setCaseInCustomerNotesMap(state)
         */
        setCaseInCustomerNotesMap(state, action) {
            if (Object.keys(state.customerNoteLocalMap).length) {
                Object.keys(state.customerNoteLocalMap).forEach(function () {
                    if (action.payload in state.customerNoteLocalMap)
                        state.customerNoteLocalMap[action.payload] = Object.assign({}, state.customerNoteLocalMap[action.payload]);
                    else
                        state.customerNoteLocalMap[action.payload] = { editMode: false, updatedAt: '' };
                });
            }
            else {
                state.customerNoteLocalMap[action.payload] = { editMode: false, updatedAt: '' };
            }
            state.selectedCaseId = action.payload;
            state.selectedCaseNoteObj = Object.assign(Object.assign({}, state.customerNoteLocalMap[state.selectedCaseId]), { totalRecords: state.selectedCaseNoteObj.totalRecords });
        },
        /**
         * used to updateCustomerNotesMap
         * This method is used to changes the input values for customer note against the selected caseId
         *  Accepts array of updated note object and boolean flg for new and edit
         * editMode flag is used to check for edit UI and to retain its values in multiple cases
         * editModeCrudFlg is used to maintain a flag if any Crud operation is being in process
         * it helps to retain values and disable other crud operation btn diabled/enabled
         * @param rootState - customerCard state
         * @example - updateCustomerNotesInMap(state)
         */
        updateCustomerNotesUsingCaseIdMap(state, action) {
            const [notePayload, editModeCrudFlg, newFlg, caseID] = action.payload;
            let obj = { editMode: false, caseId: caseID, updatedAt: '' };
            obj = Object.assign(Object.assign({}, notePayload), { editMode: editModeCrudFlg, noteCRUDState: editModeCrudFlg && !newFlg ? editModeCrudFlg : newFlg, caseId: caseID });
            state.customerNoteLocalMap[caseID] = obj;
            state.selectedCaseNoteObj = Object.assign({}, state.customerNoteLocalMap[caseID]);
        },
        /**
         * Function to reset customer card list
         * @param state - CustomerCardState
         * @param action  - PayloadAction<any>
         * @example -flushCustomerCardList(state)
         */
        flushCustomerCardList(state) {
            state.customerCardList = [];
            state.ccMergeResponse = {};
        },
        /**
         * Function to reset customer card note delete status
         * @param state - CustomerCardState
         * @param action  - PayloadAction<any>
         * @example -updateCustomerCardNoteDeleteRes(state)
         */
        updateCustomerCardNoteDeleteRes(state, action) {
            if (action.payload) {
                state.ccNoteDeleteResponse = { status: action.payload };
            }
            else {
                state.ccNoteDeleteResponse = {};
            }
        },
        /**
         * Function to set customerFeildError flag
         * @param state - CustomerCardState
         * @param action  - PayloadAction<boolean>
         * @example -setCustomFieldError(state, true)
         */
        setCustomFieldError(state, action) {
            return Object.assign(Object.assign({}, state), { CustomFieldError: action.payload });
        },
        setCreateEntityPopoverIsOpen: (state, action) => (Object.assign(Object.assign({}, state), { createEntity: Object.assign(Object.assign({}, state.createEntity), { popover: Object.assign(Object.assign({}, state.createEntity.popover), { isOpen: action.payload.isOpen }) }) })),
        setCreateEntityPopoverList: (state, action) => (Object.assign(Object.assign({}, state), { createEntity: Object.assign(Object.assign({}, state.createEntity), { popover: Object.assign(Object.assign({}, state.createEntity.popover), { list: action.payload.list }) }) })),
        setCreateEntityConfirmationIsOpen: (state, action) => (Object.assign(Object.assign({}, state), { createEntity: Object.assign(Object.assign({}, state.createEntity), { confirmation: Object.assign(Object.assign({}, state.createEntity.confirmation), { isOpen: action.payload.isOpen }) }) })),
        setCreateEntityTarget: (state, action) => (Object.assign(Object.assign({}, state), { createEntity: Object.assign(Object.assign({}, state.createEntity), { target: {
                    configurationId: action.payload.configurationId,
                    workflowId: action.payload.workflowId,
                    workflowInput: action.payload.workflowInput,
                    display: action.payload.display,
                } }) })),
        resetCreateEntityTarget: (state) => (Object.assign(Object.assign({}, state), { createEntity: Object.assign(Object.assign({}, state.createEntity), { target: {
                    configurationId: null,
                    workflowId: null,
                    workflowInput: {},
                    display: null,
                } }) })),
        setCreateEntityPopoverPosition: (state, action) => (Object.assign(Object.assign({}, state), { createEntity: Object.assign(Object.assign({}, state.createEntity), { popover: Object.assign(Object.assign({}, state.createEntity.popover), { position: {
                        top: action.payload.top,
                        left: action.payload.left,
                    } }) }) })),
        /**
         * Function to set draft case history to none
         * @param state - CustomerCardState
         * @example -setDraftCaseInteractionHistory(state)
         */
        setDraftCaseInteractionHistory(state) {
            return Object.assign(Object.assign({}, state), { interactionHistory: {
                    caseHistory: {},
                    isLoading: false,
                } });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(searchCustomerCard.pending, (state) => {
            return Object.assign(Object.assign({}, state), { customerListLoading: true, loadMoreData: true });
        });
        builder.addCase(searchCustomerCard.fulfilled, (state, action) => {
            state.customerListLoading = false;
            state.loadMoreData = action.payload.scrollToken ? true : false;
            state.scrollToken = action.payload.scrollToken;
            if (searchString !== prevSearchString) {
                state.customerCardList = [];
            }
            if (state.customerCardList.length === 0) {
                state.customerCardList = action.payload.data;
            }
            else if (action.payload !== false) {
                const map = {};
                state.customerCardList.forEach((item) => (map[item.id] = item));
                action.payload.data.forEach((item) => (map[item.id] = item));
                state.customerCardList = Object.values(map);
            }
            prevSearchString = searchString;
        });
        builder.addCase(searchCustomerCard.rejected, (state) => {
            return Object.assign(Object.assign({}, state), { customerListLoading: false, loadMoreData: true, scrollToken: '' });
        });
        builder.addCase(mergeCustomerCard.fulfilled, (state) => {
            return Object.assign(Object.assign({}, state), { ccMergeResponse: { isCustomerCardMergedStatus: 'success' } });
        });
        builder.addCase(mergeCustomerCard.rejected, (state, errorMessage) => {
            return Object.assign(Object.assign({}, state), { ccMergeResponse: {
                    isCustomerCardMergedStatus: 'failed',
                    ccMergeErrorDescription: errorMessage.payload,
                } });
        });
        builder.addCase(getCustomerNotesThunk.pending, (state) => {
            return Object.assign(Object.assign({}, state), { customerNotesError: false, customerNotesLoading: true });
        });
        builder.addCase(getCustomerNotesThunk.fulfilled, (state) => {
            return Object.assign(Object.assign({}, state), { customerNotesError: false, customerNotesLoading: false });
        });
        builder.addCase(getCustomerNotesThunk.rejected, (state) => {
            return Object.assign(Object.assign({}, state), { customerNotesLoading: false, customerNotesError: true, noteList: [] });
        });
        builder.addCase(addNewCustomerNoteThunk.fulfilled, (state, res) => {
            if (res.payload)
                return Object.assign(Object.assign({}, state), { noteList: [...state.noteList, res.payload] });
            else
                return Object.assign({}, state);
        });
        builder.addCase(deleteSelectedCustomerNoteThunk.rejected, (state, errorMessage) => {
            return Object.assign(Object.assign({}, state), { ccNoteDeleteResponse: {
                    status: 'failed',
                    ccNoteDeletedErrorDescription: errorMessage.payload,
                } });
        });
        builder.addCase(getCaseHistory.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { interactionHistory: {
                    caseHistory: action.payload,
                    isLoading: false,
                } });
        });
        builder.addCase(getCaseHistory.rejected, (state) => {
            return Object.assign(Object.assign({}, state), { interactionHistory: {
                    caseHistory: {},
                    isLoading: false,
                } });
        });
        builder.addCase(getCaseHistory.pending, (state) => {
            return Object.assign(Object.assign({}, state), { interactionHistory: {
                    caseHistory: {},
                    isLoading: true,
                } });
        });
    },
});
export const CcfCustomerCardActions = CcfCustomerCardSlice.actions;
export const CcfCustomerCardReducer = CcfCustomerCardSlice.reducer;
/**
 * used to getInboxState
 * @param rootState - AppSpace state
 * @example - const appSpaceState = getInboxState(state)
 */
const getCustomerCardState = (rootState) => {
    return rootState[CCF_CUSTOMERCARD_KEY];
};
/**
 * used to getInboxState
 * @param rootState - AppSpace state
 * @example - const appSpaceState = getInboxState(state)
 */
const getInboxState = (rootState) => {
    return rootState[ASSIGNMENT_KEY];
};
export const cxoneDigitalContactDetails = createSelector(getInboxState, (state) => state.cxoneDigitalContactDetails);
export const cxoneCustomerCardId = createSelector(getCustomerCardState, (state) => state === null || state === void 0 ? void 0 : state.id);
export const cxoneCustomFieldValues = createSelector(getCustomerCardState, (state) => state === null || state === void 0 ? void 0 : state.customFieldValues);
export const cxoneCustomFieldDefs = createSelector(getCustomerCardState, (state) => state === null || state === void 0 ? void 0 : state.customFieldDefs);
export const cxoneCCActivity = createSelector(getCustomerCardState, (state) => state === null || state === void 0 ? void 0 : state.activity);
export const cxoneCCActivitySearch = createSelector(getCustomerCardState, (state) => state === null || state === void 0 ? void 0 : state.activitySearch);
export const cxoneCCActivityLoadingStatus = createSelector(getCustomerCardState, (state) => state === null || state === void 0 ? void 0 : state.activityLoading);
export const cxoneCcActivityRenderStatus = createSelector(getCustomerCardState, (state) => state === null || state === void 0 ? void 0 : state.activityRendered);
export const cxoneCustomFieldUpdated = createSelector(getCustomerCardState, (state) => state === null || state === void 0 ? void 0 : state.customFieldUpdated);
export const cxoneCustomerCardFullName = createSelector(getCustomerCardState, (state) => state === null || state === void 0 ? void 0 : state.fullName);
export const cxoneCustomerCardDetailsLoading = createSelector(getCustomerCardState, (state) => state === null || state === void 0 ? void 0 : state.detailsLoading);
export const cxoneCustomerCardIdentities = createSelector(getCustomerCardState, (state) => state === null || state === void 0 ? void 0 : state.identities);
export const cxoneVoiceContactDetails = createSelector(getInboxState, (state) => state.cxoneVoiceContactDetails);
export const cxoneVoiceStatus = createSelector(getInboxState, (state) => state.cxoneVoiceContactDetails);
export const cxoneDigitalStatus = createSelector(getInboxState, (state) => state.cxoneDigitalContactDetails);
export const customerCardList = createSelector(getCustomerCardState, (state) => state.customerCardList);
export const isCustomerDataLoading = createSelector(getCustomerCardState, (state) => state.customerListLoading);
export const isCustomerCardMergedSelector = createSelector(getCustomerCardState, (state) => state.ccMergeResponse);
export const isCustomerCardNoteDeletedSelector = createSelector(getCustomerCardState, (state) => state === null || state === void 0 ? void 0 : state.ccNoteDeleteResponse);
export const isCustomerNotesLoading = createSelector(getCustomerCardState, (state) => state.customerNotesLoading);
export const isCustomerNotesError = createSelector(getCustomerCardState, (state) => state.customerNotesError);
export const loadMoreData = createSelector(getCustomerCardState, (state) => state.loadMoreData);
export const selectCustomerNotesList = createSelector(getCustomerCardState, (state) => {
    var _a, _b;
    return (_b = (_a = state === null || state === void 0 ? void 0 : state.noteList) === null || _a === void 0 ? void 0 : _a.slice()) === null || _b === void 0 ? void 0 : _b.sort((a, b) => {
        if (new Date(a.updatedAt) < new Date(b.updatedAt)) {
            return 1;
        }
        else {
            return -1;
        }
    });
});
export const selectCustomerNotesMap = createSelector(getCustomerCardState, (state) => state.customerNoteLocalMap);
export const selectCurrentCaseNoteObj = createSelector(getCustomerCardState, (state) => state === null || state === void 0 ? void 0 : state.selectedCaseNoteObj);
export const selectCurrentCaseId = createSelector(getCustomerCardState, (state) => state === null || state === void 0 ? void 0 : state.selectedCaseId);
export const scrollToken = createSelector(getCustomerCardState, (state) => state.scrollToken);
export const getStoredCustomEventDetails = createSelector(getCustomerCardState, (state) => state === null || state === void 0 ? void 0 : state.customEventData);
export const getAgentWorkflowConfigurationReceived = createSelector(getCustomerCardState, (state) => (state === null || state === void 0 ? void 0 : state.agentWorkflowConfigurationReceived) || []);
export const getAgentWorkflowResponseReceived = createSelector(getCustomerCardState, (state) => (state === null || state === void 0 ? void 0 : state.agentWorkflowResponseReceived) || []);
export const getCustomFieldError = createSelector(getCustomerCardState, (state) => state === null || state === void 0 ? void 0 : state.CustomFieldError);
export const getInteractionHistory = createSelector(getCustomerCardState, (state) => state === null || state === void 0 ? void 0 : state.interactionHistory);
export const getCreateEntityPopoverOpen = createSelector(getCustomerCardState, (state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.createEntity) === null || _a === void 0 ? void 0 : _a.popover) === null || _b === void 0 ? void 0 : _b.isOpen; });
export const getCreateEntityPopoverList = createSelector(getCustomerCardState, (state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.createEntity) === null || _a === void 0 ? void 0 : _a.popover) === null || _b === void 0 ? void 0 : _b.list; });
export const getCreateEntityConfirmationOpen = createSelector(getCustomerCardState, (state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.createEntity) === null || _a === void 0 ? void 0 : _a.confirmation) === null || _b === void 0 ? void 0 : _b.isOpen; });
export const getCreateEntityTargetDisplay = createSelector(getCustomerCardState, (state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.createEntity) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.display; });
export const getCreateEntityShowButton = createSelector(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(rootState) => {
    var _a;
    return (_a = rootState === null || rootState === void 0 ? void 0 : rootState.CcfCustomerCard) !== null && _a !== void 0 ? _a : {};
}, (state) => {
    var _a, _b;
    const { list = [] } = (_b = (_a = state === null || state === void 0 ? void 0 : state.createEntity) === null || _a === void 0 ? void 0 : _a.popover) !== null && _b !== void 0 ? _b : {};
    // NOTE : Return false if the list is empty or all items have display as '' or undefined
    if (list.length === 0 ||
        (list !== null && list !== void 0 ? list : []).every((item) => { var _a; return !((_a = item === null || item === void 0 ? void 0 : item.display) !== null && _a !== void 0 ? _a : '').trim(); })) {
        return false;
    }
    // NOTE : Return true if at least one item has a truthy display value
    return true;
});
export const getCreateEntityPopoverPosition = createSelector(getCustomerCardState, (state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.createEntity) === null || _a === void 0 ? void 0 : _a.popover) === null || _b === void 0 ? void 0 : _b.position; });
export const getSFCRMNavigationData = createSelector(getCustomerCardState, (state) => state.sFCRMNavigationData);
export const getNameValue = createSelector(getCustomerCardState, (state) => state.nameValue);
export const getRelatesToValue = createSelector(getCustomerCardState, (state) => state.relatesToValue);
export const activityExpanded = createSelector(getCustomerCardState, (state) => state === null || state === void 0 ? void 0 : state.isActivityExpanded);
export { default as thunks } from './thunks';
//# sourceMappingURL=ccf-customer-card.slice.js.map