import { PayloadAction } from '@reduxjs/toolkit';
import { AssignmentState } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { AgentWorkflowRequestEvent, AgentWorkflowResponseEvent, ContactData, CustomerCardNote, CXoneAuthorEndUserIdentity, CXoneCustomerCardCustomFields, CXoneCustomFieldDetails, CXoneExecuteTimelineDataMapping, CXoneStoredCRMConfig, CXoneMergeCustomerCardArguments, CXoneSdkError, CXoneWorkflowRequest, CXoneDeleteCustomField, CustomEventDetails, SfCrmNavigationDataResponseEvent, SfCrmNavigationBulkDataResponseEvent, SfCrmNavigationDataState, NameRelatesToState, CcfNameRelatesResponseEvent } from '@nice-devone/common-sdk';
export declare const CCF_CUSTOMERCARD_KEY = "CcfCustomerCard";
export interface CustomerCardMergeStatus {
    isCustomerCardMergedStatus?: 'success' | 'failed';
    ccMergeErrorDescription?: string;
}
export interface CustomerCardNoteDeleteStatus {
    /**
    * @remarks - 'status'- success if succesfully note
    * gets deleted else failed
    */
    status?: 'success' | 'failed';
    /**
     * @remarks - 'ccNoteDeletedErrorDescription'- error message to be
     * displayed on toast msg in case of failure
     */
    ccNoteDeletedErrorDescription?: string;
}
export interface AgentWorkflowConfiguration {
    /**
     * @remarks - contact id
     */
    contactId: string;
    /**
     * @remarks - flag to check config available or not
     */
    isConfigAvailable: boolean;
}
export interface CcfCustomerCardState {
    /**
     * @remarks - Customer Card Id
     */
    id: string;
    /**
     * @remarks - Custom field values
     */
    customFieldValues: CXoneCustomFieldDetails[];
    /**
     * @remarks - custom Field updated flag
     */
    customFieldUpdated: boolean;
    /**
     * @remarks - Custom field definitions
     */
    customFieldDefs: CXoneCustomerCardCustomFields;
    /**
     * @remarks - Activity object for response from CRM
     */
    activity: AgentWorkflowResponseEvent[];
    /**
     * @remarks - Activity seacrh object for request from CRM
     */
    activitySearch: AgentWorkflowRequestEvent[];
    /**
     * @remarks - Activity loading flag on response from CRM
     */
    activityLoading: boolean;
    /**
     * @remarks - Full Name of customer
     */
    activityRendered: boolean;
    fullName: string;
    /**
     * @remarks - Image of Customer on customer card
     */
    image: string;
    /**
     * @remarks - Details loading flag on response of customer card details
     */
    detailsLoading: boolean;
    /**
     * @remarks - Identities Array
     */
    identities: CXoneAuthorEndUserIdentity[];
    /**
     * @remarks - List of customer card list
     */
    customerCardList: any;
    /**
     * @remarks - Flag used for loading customer card list on API call
     */
    customerListLoading: boolean;
    /**
     * @remarks - Customer card merge API response
     */
    ccMergeResponse: CustomerCardMergeStatus;
    ccNoteDeleteResponse: CustomerCardNoteDeleteStatus;
    loadMoreData: boolean;
    /**
     * @remarks - Array of note list
     */
    noteList: [];
    /**
     * @remarks - Map of customer note
     */
    customerNoteLocalMap: {
        [key: string]: CustomerCardNote;
    };
    /**
     * @remarks - Flag used for loading customer card notes on API call
     */
    customerNotesLoading: boolean;
    /**
     * @remarks - Flag used for error handling on customer card notes on API call
     */
    customerNotesError: boolean;
    /**
     * @remarks - Selected case id
     */
    selectedCaseId: string;
    /**
     * @remarks - Selected case note object
     */
    selectedCaseNoteObj: CustomerCardNote;
    /**
     * @remarks - Scroll token value
     */
    scrollToken: string;
    /**
     * @remarks - List of Contacts received on custom event
     */
    customEventData: Array<CustomEventDetails>;
    /**
     * @remarks - to check Agent Configuration workflow get next event received or not
     */
    agentWorkflowConfigurationReceived: Array<AgentWorkflowConfiguration>;
    /**
     * @remarks - to check Agent workflow get next event received or not
     */
    agentWorkflowResponseReceived: Array<AgentWorkflowConfiguration>;
    /**
     * @remarks - to show error toast on update customer card api failure
     */
    CustomFieldError: boolean;
    /**
     * @remarks - Array of case history
     */
    interactionHistory: initialinteractionHistoryState;
    /**
     * @remarks - Interaction Data for salesforce CRM
     */
    sFCRMNavigationData: SfCrmNavigationDataState;
    /**
     * @remarks - Selected Name Data for salesforce CRM
     */
    nameValue: NameRelatesToState;
    /**
     * @remarks - Interaction RelatesTO for salesforce CRM
     */
    relatesToValue: NameRelatesToState;
    /**
    * @remarks - Flag to check if activity is expanded
    */
    isActivityExpanded: number;
    /**
    * @remarks - State for the "Create Entity" feature.
    */
    createEntity: {
        target: {
            configurationId: string | null;
            workflowId: string | null;
            workflowInput: unknown;
            display: string | null;
        };
        confirmation: {
            isOpen: boolean;
        };
        popover: {
            isOpen: boolean;
            list: unknown[];
            position: {
                top: number;
                left: number;
            };
        };
    };
}
export interface CcfCaseHistory {
    eventType: string;
    createdAt: string;
    status: string;
    inboxAssignee: {
        fullName: string | null;
        imageUrl: string;
    };
    previousInboxAssignee: {
        fullName: string | null;
        imageUrl: string | null;
    };
    eventInitiator: string | null;
}
export interface CcfCaseHistoryDataElement {
    eventType: string;
    createdAt: string;
    initiator: {
        id: string;
        type: string;
    };
    relationObjectId: string;
}
export interface CcfCaseHistoryUser {
    id: number;
    incontactId: string;
    agentId: number;
    emailAddress: string;
    loginUsername: string;
    firstName: string;
    surname: string;
    nickname: string;
    imageUrl: string;
    publicImageUrl: string;
    isBotUser: false;
    isSurveyUser: false;
}
/**
  * Initial state assigment
*/
export declare const CcfCustomerCardInitialState: CcfCustomerCardState;
/**
* Interface for customer case field details
*/
export interface cxoneCustomFieldDetails {
    /**
     * @remarks - Identifier of custom field
     */
    ident: string;
    /**
     * @remarks - Value of custom field
     */
    value: string;
}
/**
  * Interface for customer case field details
*/
export interface CustomerCardCustomFieldDetails {
    /**
     * @remarks - custom fields array of object
     */
    customFields: Array<cxoneCustomFieldDetails>;
    /**
     * @remarks - case Id
     */
    id: string;
}
export interface SearchCustomerCardArguments {
    /**
     * @remarks - Customer name
     */
    customerName: string;
    /**
     * @remarks - External Ids to exclude from the search API
     */
    externalIds: string[];
    /**
     * @remarks - scroll token
     */
    scrollToken?: string;
}
export interface LinkedDataElements {
    /**
     * @remarks - Id of activity
     */
    activityCrmId: string;
    /**
     * @remarks - name of the CRM
     */
    activityName: string;
    /**
     * @remarks - id of the CRM
     */
    id?: number;
    /**
     * @remarks - provides confirmation whether crm record is linkable or not
     */
    linkable?: boolean;
}
/**
  * Interface for Relatesto Entity fields
*/
export interface RelatestoDataElement {
    /**
     * @remarks - Id of activity
     */
    activityCrmId: string;
    /**
     * @remarks - name of the CRM
     */
    activityName: string;
    /**
     * @remarks - id of the CRM
     */
    id?: number;
    /**
     * @remarks - provides confirmation whether crm record is linkable or not
     */
    linkable?: boolean;
    /**
   * @remarks - contains the related object data
   */
    relatedObject?: RelatestoObjectData;
}
/**
  * Interface for Relatesto object data fields
*/
export interface RelatestoObjectData {
    /**
  * @remarks - bindable fields entity i.e. call from and call to fields data mapping to CRM
  */
    name: string;
    /**
     * @remarks - name of the entity which is relates to with record
     */
    entityType: string;
    /**
     * @remarks - value of the Related object id
     */
    value: string;
}
/**
  * Interface for Activity Data records
*/
export interface ActivityDataRecords {
    /**
     * @remarks - display name of the record
     */
    display: string;
    /**
     * @remarks - id of the record
     */
    id: string;
    /**
     * @remarks - label of the record
     */
    label: string;
    /**
     * @remarks - type of the record
     */
    type: string;
    /**
     * @remarks - linkable property  of the record
     */
    linkable: string;
    /**
     * @remarks - url of the record
     */
    url: string;
    /**
     * @remarks - related property  of the record
     */
    related: Array<ActivityDataRecords>;
    /**
     * @remarks - fields of the record
     */
    fields: Array<ActivityDataRecords>;
    /**
     * @remarks - linked property  of the record
     */
    linked?: string;
    /**
     * @remarks - relatesto property of the record
     */
    relatesto?: string;
}
/**
 * Interface for CaseHistory Api response
 */
export interface initialinteractionHistoryState {
    caseHistory: {
        caseInteractionHistory: Array<CcfCaseHistory>;
        totalRecords: number;
        links: {
            self: string | null;
            next: string | null;
            previous: string | null;
        };
    };
    isLoading: boolean;
}
/**
 * Thunk action creator to fetch case history data
 * @param args - contactId, pageNumber
 * @example
 * ```
 * dispatch(getCaseHistory('351251245',1, 10)
 * ```
 */
export declare const getCaseHistory: import("@reduxjs/toolkit").AsyncThunk<never[] | {
    caseInteractionHistory: CcfCaseHistory[];
    totalRecords: any;
    links: any;
}, {
    contactId: string;
    pageNumber: number;
    pageSize: number;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
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
export declare const updateCustomFields: import("@reduxjs/toolkit").AsyncThunk<void, CustomerCardCustomFieldDetails, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
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
export declare const deleteCustomField: import("@reduxjs/toolkit").AsyncThunk<void, CXoneDeleteCustomField, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
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
export declare const getCRMDataForTransferedContact: import("@reduxjs/toolkit").AsyncThunk<void, {
    interactionId: string;
    contactId: string | undefined | string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Thunk action to keep alive cacheKey for CRM data when contact is for long time in agent's inbox
 * @param interactionId - interaction id of particular contact/case
 * @example
 *  dispatch(
      getCRMDataForTransferedContactFromPolling(interactionId)
    );
 */
export declare const getCRMDataForTransferedContactFromPolling: import("@reduxjs/toolkit").AsyncThunk<void, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
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
export declare const getCustomerNotesThunk: import("@reduxjs/toolkit").AsyncThunk<void, {
    customerId: string;
    currentPageIndex: number;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
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
export declare const deleteSelectedCustomerNoteThunk: import("@reduxjs/toolkit").AsyncThunk<void, {
    customerId: string;
    noteId: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
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
export declare const addNewCustomerNoteThunk: import("@reduxjs/toolkit").AsyncThunk<any, {
    customerId: string;
    note: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
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
export declare const editCustomerNoteByIdThunk: import("@reduxjs/toolkit").AsyncThunk<void, {
    customerId: string;
    noteId: string;
    note: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
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
export declare const getCustomerDetailsById: import("@reduxjs/toolkit").AsyncThunk<void, {
    customerId: string;
    selectedContact: ContactData | undefined;
    searchTabSelected: boolean;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
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
export declare const getCustomFieldsDefinitions: import("@reduxjs/toolkit").AsyncThunk<void, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Method to append CRM Icons to response
 * @example - updateAgentWorkflowResponseWithIcon
 */
export declare const updateAgentWorkflowResponseWithIcon: (response: AgentWorkflowResponseEvent) => any;
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
export declare const fetchActivityData: import("@reduxjs/toolkit").AsyncThunk<void, CXoneWorkflowRequest, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
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
export declare const updateActivityTimeline: import("@reduxjs/toolkit").AsyncThunk<void, any, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
   * Method to update activity data for available contacts
   * @param contacts-ContactData
   * @example updateActivityData(true);
   */
export declare const updateActivityData: import("@reduxjs/toolkit").AsyncThunk<void, CXoneStoredCRMConfig, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Method to to update Timeline & DataMemo
 * @example - invokeTimelineAndDataMemo
 */
export declare const invokeTimelineAndDataMemo: import("@reduxjs/toolkit").AsyncThunk<void, CXoneExecuteTimelineDataMapping, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Thunk action creator to searchCustomerCard
 * @param customerFullName - customer Full Name
 * @param scrollToken - token for the scroll
 * ```
 * @example
 *  dispatch(searchCustomerCard({customerFullName,scrollToken}));
 * ```
 */
export declare const searchCustomerCard: import("@reduxjs/toolkit").AsyncThunk<import("yup/lib/object").AssertsShape<{
    data: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        customFields: any;
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        identities: any;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        customFields: any;
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks - Array of case history
         */
        fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        identities: any;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        customFields: any;
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        identities: any;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        customFields: any;
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        identities: any;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        customFields: any;
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        identities: any;
    }>>[]>;
    scrollToken: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>, SearchCustomerCardArguments, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Thunk action creator to mergeCustomerCard
 * @param args - CurrentCustomerId, CustomerToMergeId
 * ```
 * @example
 *  dispatch(mergeCustomerCard({currentCustomerId, customerToMergeId}));
 * ```
 */
export declare const mergeCustomerCard: import("@reduxjs/toolkit").AsyncThunk<void | CXoneSdkError | import("@nice-devone/common-sdk").HttpResponse, CXoneMergeCustomerCardArguments, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Thunk action to pop Epic healthcare records by invoking a workflow
 * @param data - Record identifier
 * ```
 * @example
 *  dispatch(screenPopEpicRecord({id, entityType}));
 * ```
 */
export declare const screenPopEpicRecord: import("@reduxjs/toolkit").AsyncThunk<void, {
    id: string;
    entityType: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const CcfCustomerCardSlice: import("@reduxjs/toolkit").Slice<any, {
    /**
     * Used to store flag on agent workflow event received.
     * @param rootState - getCustomerCardState
    * @example - storeConfigforWorkflowResponse(state)
     */
    storeConfigforWorkflowResponse(state: any, action: PayloadAction<AgentWorkflowConfiguration>): any;
    /**
     * Used to update details of agent workflow configuration received.
     * @param rootState - getCustomerCardState
    * @example - updateWorkflowResponse(state)
     */
    updateWorkflowResponse(state: any, action: PayloadAction<any>): any;
    /**
     * Used to store flag on agent workflow configuration received.
     * @param rootState - getCustomerCardState
    * @example - storeConfigforAgentWorkflow(state)
     */
    storeConfigforAgentWorkflow(state: any, action: PayloadAction<AgentWorkflowConfiguration>): any;
    /**
     * Used to update details of agent workflow configuration received.
     * @param rootState - getCustomerCardState
    * @example - updateConfigforAgentWorkflow(state)
     */
    updateConfigforAgentWorkflow(state: any, action: PayloadAction<any>): any;
    /**
     * Used to remove the stored custom event details from store
     * @param rootState - AppSpace state
     * @example - storeCustomEventFlag(state)
     */
    removeStoredCustomEvent(state: any, action: PayloadAction<CustomEventDetails>): any;
    /**
     * Used to maintain the list of contacts where custom event was recieved
     * @param rootState - AppSpace state
     * @example - storeCustomEventFlag(state)
     */
    storeCustomEventFlag(state: any, action: PayloadAction<CustomEventDetails>): any;
    /**
     * used to storeCustomField
     * @param rootState - AppSpace state
     * @example - storeCustomField(state)
     */
    storeCustomField(state: any, action: PayloadAction<Array<CXoneCustomFieldDetails>>): any;
    /**
     * used to updateCustomField
     * @param rootState - AppSpace state
     * @example - updateCustomField(state)
     */
    updateCustomField(state: any, action: PayloadAction<Array<CXoneCustomFieldDetails>>): any;
    /**
     * used to storeCustomField
     * @param rootState - AppSpace state
     * @example - storeCustomField(state)
     */
    storeCustomerFullName(state: any, action: PayloadAction<string>): any;
    /**
     * used to storeCustomField
     * @param rootState - AppSpace state
     * @example - storeCustomField(state)
     */
    setDetailsLoading(state: any, action: PayloadAction<boolean>): any;
    /**
     * used to storeIdentities
     * @param rootState - AppSpace state
     * @example - setIdentities(state)
     */
    setIdentities(state: any, action: PayloadAction<CXoneAuthorEndUserIdentity[]>): any;
    /**
     * used to set customerId
     * @param state - customerCard state
     * @example - setCustomerId(state)
     */
    setCustomerId(state: any, action: PayloadAction<string>): any;
    /**
     * used to storeCustomField
     * @param rootState - AppSpace state
     * @example - storeCustomField(state)
     */
    storeCustomerImage(state: any, action: PayloadAction<string>): any;
    /**
     * used to setCustomFieldUpdate
     * @param rootState - AppSpace state
     * @example - setCustomFieldUpdate(state)
     */
    setCustomFieldUpdate(state: any, action: PayloadAction<boolean>): any;
    /**
     * used to storeCustomFieldDefinitions
     * @param rootState - AppSpace state
     * @example - storeCustomFieldDefs(state)
     */
    storeCustomFieldDefs(state: any, action: PayloadAction<CXoneCustomerCardCustomFields>): any;
    /**
     * used to setActivityInformation
     * @param rootState - AppSpace state
     * @example - setActivityInformation(state)
     */
    setActivityInformation(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<AgentWorkflowResponseEvent>): {
        activity: any;
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    /**
    * used to setActivityInformation
    * @param rootState - AppSpace state
    * @example - setActivityInformation(state)
    */
    setPinRecords(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<AgentWorkflowResponseEvent>): {
        pinRecords: AgentWorkflowResponseEvent;
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    /**
    * set Navigation records into Name and RelatesTo dropdown in the Current Interaction
    * @param rootState - AppSpace state
    * @example - setSFCRMNavigationData(state, payloadAction)
    */
    setSFCRMNavigationData(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<SfCrmNavigationDataResponseEvent>): {
        sFCRMNavigationData: any;
        nameValue: any;
        relatesToValue: any;
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    /**
    * set Name Value records into Name dropdown in the Current Interaction
    * @param rootState - AppSpace state
    * @example - setNameValue(state, payloadAction)
    */
    setNameValue(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<CcfNameRelatesResponseEvent>): {
        nameValue: any;
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    /**
    * set Relates To Value records into Name dropdown in the Current Interaction
    * @param rootState - AppSpace state
    * @example - setNameValue(state, payloadAction)
    */
    setRelatesToValue(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<CcfNameRelatesResponseEvent>): {
        relatesToValue: any;
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    /**
    * used to setActivityInformation
    * @param rootState - AppSpace state
    * @example - blukLoadSFCRMNavigationDataOnRefresh(state)
    */
    bulkLoadSFCRMNavigationDataOnRefresh(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<SfCrmNavigationBulkDataResponseEvent>): {
        sFCRMNavigationData: any;
        nameValue: {
            [key: string]: string | undefined;
        };
        relatesToValue: {
            [key: string]: string | undefined;
        };
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    /**
     * used to updateActivity when contact is disconnected
     * @param rootState - AppSpace state
     * @example - updateActivityInformation(state)
     */
    updateActivityInformation(state: any, action: PayloadAction<AgentWorkflowResponseEvent[]>): any;
    /**
     * used to setActivitySearchInformation
     * @param rootState - AppSpace state
     * @example - setActivitySearchInformation(state)
     */
    setActivitySearchInformation(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<AgentWorkflowRequestEvent>): {
        activitySearch: any;
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    /**
     * used to updateActivitySearchInformation when contact is disconnected
     * @param rootState - AppSpace state
     * @example - updateActivitySearchInformation(state)
     */
    updateActivitySearchInformation(state: any, action: PayloadAction<AgentWorkflowRequestEvent[]>): any;
    /**
     * used to setActivityLoading
     * @param rootState - AppSpace state
     * @example - setActivityLoading(state)
     */
    setActivityLoading(state: any, action: PayloadAction<boolean>): any;
    /**
     * used to setActivityRendered
     * @param rootState - AppSpace state
     * @example - setActivityRendered(state)
     */
    setActivityRendered(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<boolean>): {
        activityRendered: boolean;
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    /**
     * used to setActivityExpanded
     * @param rootState - AppSpace state
     * @example - setActivityExpanded(state)
     */
    setActivityExpanded(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<number>): {
        isActivityExpanded: number;
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    /**
     *     * used to store/update customerNote List
     * @param rootState - customerCard state
     * @example - updateCustomerNotes(state)
     */
    updateCustomerNotes(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<any>): {
        noteList: any;
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    /**
     * used to store/update customerNote total records
     * @param rootState - customerCard state
     * @example - updateCustomerNotesTotalRecords(state)
    */
    updateCustomerNotesTotalRecords(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<number>): void;
    /**
     * used to store CustomerNotes for all assigned digital cases or selected cases by agent
     * to retain the user input selection for customer note
     * accepts selectedCaseId
     * @param rootState - customerCard state
     * @example - setCaseInCustomerNotesMap(state)
     */
    setCaseInCustomerNotesMap(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<string>): void;
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
    updateCustomerNotesUsingCaseIdMap(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<Array<any>>): void;
    /**
     * Function to reset customer card list
     * @param state - CustomerCardState
     * @param action  - PayloadAction<any>
     * @example -flushCustomerCardList(state)
     */
    flushCustomerCardList(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>): void;
    /**
     * Function to reset customer card note delete status
     * @param state - CustomerCardState
     * @param action  - PayloadAction<any>
     * @example -updateCustomerCardNoteDeleteRes(state)
     */
    updateCustomerCardNoteDeleteRes(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: {
        payload: any;
        type: string;
    }): void;
    /**
     * Function to set customerFeildError flag
     * @param state - CustomerCardState
     * @param action  - PayloadAction<boolean>
     * @example -setCustomFieldError(state, true)
     */
    setCustomFieldError(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<boolean>): {
        CustomFieldError: boolean;
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    setCreateEntityPopoverIsOpen: (state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<{
        isOpen: boolean;
    }>) => {
        createEntity: {
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: import("immer/dist/internal").WritableDraft<{
                    top: number;
                    left: number;
                }>;
            };
            target: import("immer/dist/internal").WritableDraft<{
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            }>;
            confirmation: import("immer/dist/internal").WritableDraft<{
                isOpen: boolean;
            }>;
        };
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
    };
    setCreateEntityPopoverList: (state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<{
        list: unknown[];
    }>) => {
        createEntity: {
            popover: {
                list: unknown[];
                isOpen: boolean;
                position: import("immer/dist/internal").WritableDraft<{
                    top: number;
                    left: number;
                }>;
            };
            target: import("immer/dist/internal").WritableDraft<{
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            }>;
            confirmation: import("immer/dist/internal").WritableDraft<{
                isOpen: boolean;
            }>;
        };
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
    };
    setCreateEntityConfirmationIsOpen: (state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<{
        isOpen: boolean;
    }>) => {
        createEntity: {
            confirmation: {
                isOpen: boolean;
            };
            target: import("immer/dist/internal").WritableDraft<{
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            }>;
            popover: import("immer/dist/internal").WritableDraft<{
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            }>;
        };
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
    };
    setCreateEntityTarget: (state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<{
        configurationId: string;
        workflowId: string;
        workflowInput: unknown;
        display: string;
    }>) => {
        createEntity: {
            target: {
                configurationId: string;
                workflowId: string;
                workflowInput: unknown;
                display: string;
            };
            confirmation: import("immer/dist/internal").WritableDraft<{
                isOpen: boolean;
            }>;
            popover: import("immer/dist/internal").WritableDraft<{
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            }>;
        };
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
    };
    resetCreateEntityTarget: (state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>) => {
        createEntity: {
            target: {
                configurationId: null;
                workflowId: null;
                workflowInput: {};
                display: null;
            };
            confirmation: import("immer/dist/internal").WritableDraft<{
                isOpen: boolean;
            }>;
            popover: import("immer/dist/internal").WritableDraft<{
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            }>;
        };
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
    };
    setCreateEntityPopoverPosition: (state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: {
        payload: any;
        type: string;
    }) => {
        createEntity: {
            popover: {
                position: {
                    top: any;
                    left: any;
                };
                isOpen: boolean;
                list: unknown[];
            };
            target: import("immer/dist/internal").WritableDraft<{
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            }>;
            confirmation: import("immer/dist/internal").WritableDraft<{
                isOpen: boolean;
            }>;
        };
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
    };
    /**
     * Function to set draft case history to none
     * @param state - CustomerCardState
     * @example -setDraftCaseInteractionHistory(state)
     */
    setDraftCaseInteractionHistory(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>): {
        interactionHistory: {
            caseHistory: {};
            isLoading: false;
        };
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
}, "CcfCustomerCard">;
export declare const CcfCustomerCardActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * Used to store flag on agent workflow event received.
     * @param rootState - getCustomerCardState
    * @example - storeConfigforWorkflowResponse(state)
     */
    storeConfigforWorkflowResponse(state: any, action: PayloadAction<AgentWorkflowConfiguration>): any;
    /**
     * Used to update details of agent workflow configuration received.
     * @param rootState - getCustomerCardState
    * @example - updateWorkflowResponse(state)
     */
    updateWorkflowResponse(state: any, action: PayloadAction<any>): any;
    /**
     * Used to store flag on agent workflow configuration received.
     * @param rootState - getCustomerCardState
    * @example - storeConfigforAgentWorkflow(state)
     */
    storeConfigforAgentWorkflow(state: any, action: PayloadAction<AgentWorkflowConfiguration>): any;
    /**
     * Used to update details of agent workflow configuration received.
     * @param rootState - getCustomerCardState
    * @example - updateConfigforAgentWorkflow(state)
     */
    updateConfigforAgentWorkflow(state: any, action: PayloadAction<any>): any;
    /**
     * Used to remove the stored custom event details from store
     * @param rootState - AppSpace state
     * @example - storeCustomEventFlag(state)
     */
    removeStoredCustomEvent(state: any, action: PayloadAction<CustomEventDetails>): any;
    /**
     * Used to maintain the list of contacts where custom event was recieved
     * @param rootState - AppSpace state
     * @example - storeCustomEventFlag(state)
     */
    storeCustomEventFlag(state: any, action: PayloadAction<CustomEventDetails>): any;
    /**
     * used to storeCustomField
     * @param rootState - AppSpace state
     * @example - storeCustomField(state)
     */
    storeCustomField(state: any, action: PayloadAction<Array<CXoneCustomFieldDetails>>): any;
    /**
     * used to updateCustomField
     * @param rootState - AppSpace state
     * @example - updateCustomField(state)
     */
    updateCustomField(state: any, action: PayloadAction<Array<CXoneCustomFieldDetails>>): any;
    /**
     * used to storeCustomField
     * @param rootState - AppSpace state
     * @example - storeCustomField(state)
     */
    storeCustomerFullName(state: any, action: PayloadAction<string>): any;
    /**
     * used to storeCustomField
     * @param rootState - AppSpace state
     * @example - storeCustomField(state)
     */
    setDetailsLoading(state: any, action: PayloadAction<boolean>): any;
    /**
     * used to storeIdentities
     * @param rootState - AppSpace state
     * @example - setIdentities(state)
     */
    setIdentities(state: any, action: PayloadAction<CXoneAuthorEndUserIdentity[]>): any;
    /**
     * used to set customerId
     * @param state - customerCard state
     * @example - setCustomerId(state)
     */
    setCustomerId(state: any, action: PayloadAction<string>): any;
    /**
     * used to storeCustomField
     * @param rootState - AppSpace state
     * @example - storeCustomField(state)
     */
    storeCustomerImage(state: any, action: PayloadAction<string>): any;
    /**
     * used to setCustomFieldUpdate
     * @param rootState - AppSpace state
     * @example - setCustomFieldUpdate(state)
     */
    setCustomFieldUpdate(state: any, action: PayloadAction<boolean>): any;
    /**
     * used to storeCustomFieldDefinitions
     * @param rootState - AppSpace state
     * @example - storeCustomFieldDefs(state)
     */
    storeCustomFieldDefs(state: any, action: PayloadAction<CXoneCustomerCardCustomFields>): any;
    /**
     * used to setActivityInformation
     * @param rootState - AppSpace state
     * @example - setActivityInformation(state)
     */
    setActivityInformation(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<AgentWorkflowResponseEvent>): {
        activity: any;
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    /**
    * used to setActivityInformation
    * @param rootState - AppSpace state
    * @example - setActivityInformation(state)
    */
    setPinRecords(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<AgentWorkflowResponseEvent>): {
        pinRecords: AgentWorkflowResponseEvent;
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    /**
    * set Navigation records into Name and RelatesTo dropdown in the Current Interaction
    * @param rootState - AppSpace state
    * @example - setSFCRMNavigationData(state, payloadAction)
    */
    setSFCRMNavigationData(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<SfCrmNavigationDataResponseEvent>): {
        sFCRMNavigationData: any;
        nameValue: any;
        relatesToValue: any;
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    /**
    * set Name Value records into Name dropdown in the Current Interaction
    * @param rootState - AppSpace state
    * @example - setNameValue(state, payloadAction)
    */
    setNameValue(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<CcfNameRelatesResponseEvent>): {
        nameValue: any;
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    /**
    * set Relates To Value records into Name dropdown in the Current Interaction
    * @param rootState - AppSpace state
    * @example - setNameValue(state, payloadAction)
    */
    setRelatesToValue(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<CcfNameRelatesResponseEvent>): {
        relatesToValue: any;
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    /**
    * used to setActivityInformation
    * @param rootState - AppSpace state
    * @example - blukLoadSFCRMNavigationDataOnRefresh(state)
    */
    bulkLoadSFCRMNavigationDataOnRefresh(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<SfCrmNavigationBulkDataResponseEvent>): {
        sFCRMNavigationData: any;
        nameValue: {
            [key: string]: string | undefined;
        };
        relatesToValue: {
            [key: string]: string | undefined;
        };
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    /**
     * used to updateActivity when contact is disconnected
     * @param rootState - AppSpace state
     * @example - updateActivityInformation(state)
     */
    updateActivityInformation(state: any, action: PayloadAction<AgentWorkflowResponseEvent[]>): any;
    /**
     * used to setActivitySearchInformation
     * @param rootState - AppSpace state
     * @example - setActivitySearchInformation(state)
     */
    setActivitySearchInformation(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<AgentWorkflowRequestEvent>): {
        activitySearch: any;
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    /**
     * used to updateActivitySearchInformation when contact is disconnected
     * @param rootState - AppSpace state
     * @example - updateActivitySearchInformation(state)
     */
    updateActivitySearchInformation(state: any, action: PayloadAction<AgentWorkflowRequestEvent[]>): any;
    /**
     * used to setActivityLoading
     * @param rootState - AppSpace state
     * @example - setActivityLoading(state)
     */
    setActivityLoading(state: any, action: PayloadAction<boolean>): any;
    /**
     * used to setActivityRendered
     * @param rootState - AppSpace state
     * @example - setActivityRendered(state)
     */
    setActivityRendered(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<boolean>): {
        activityRendered: boolean;
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    /**
     * used to setActivityExpanded
     * @param rootState - AppSpace state
     * @example - setActivityExpanded(state)
     */
    setActivityExpanded(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<number>): {
        isActivityExpanded: number;
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    /**
     *     * used to store/update customerNote List
     * @param rootState - customerCard state
     * @example - updateCustomerNotes(state)
     */
    updateCustomerNotes(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<any>): {
        noteList: any;
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    /**
     * used to store/update customerNote total records
     * @param rootState - customerCard state
     * @example - updateCustomerNotesTotalRecords(state)
    */
    updateCustomerNotesTotalRecords(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<number>): void;
    /**
     * used to store CustomerNotes for all assigned digital cases or selected cases by agent
     * to retain the user input selection for customer note
     * accepts selectedCaseId
     * @param rootState - customerCard state
     * @example - setCaseInCustomerNotesMap(state)
     */
    setCaseInCustomerNotesMap(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<string>): void;
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
    updateCustomerNotesUsingCaseIdMap(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<Array<any>>): void;
    /**
     * Function to reset customer card list
     * @param state - CustomerCardState
     * @param action  - PayloadAction<any>
     * @example -flushCustomerCardList(state)
     */
    flushCustomerCardList(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>): void;
    /**
     * Function to reset customer card note delete status
     * @param state - CustomerCardState
     * @param action  - PayloadAction<any>
     * @example -updateCustomerCardNoteDeleteRes(state)
     */
    updateCustomerCardNoteDeleteRes(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: {
        payload: any;
        type: string;
    }): void;
    /**
     * Function to set customerFeildError flag
     * @param state - CustomerCardState
     * @param action  - PayloadAction<boolean>
     * @example -setCustomFieldError(state, true)
     */
    setCustomFieldError(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<boolean>): {
        CustomFieldError: boolean;
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
    setCreateEntityPopoverIsOpen: (state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<{
        isOpen: boolean;
    }>) => {
        createEntity: {
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: import("immer/dist/internal").WritableDraft<{
                    top: number;
                    left: number;
                }>;
            };
            target: import("immer/dist/internal").WritableDraft<{
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            }>;
            confirmation: import("immer/dist/internal").WritableDraft<{
                isOpen: boolean;
            }>;
        };
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
    };
    setCreateEntityPopoverList: (state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<{
        list: unknown[];
    }>) => {
        createEntity: {
            popover: {
                list: unknown[];
                isOpen: boolean;
                position: import("immer/dist/internal").WritableDraft<{
                    top: number;
                    left: number;
                }>;
            };
            target: import("immer/dist/internal").WritableDraft<{
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            }>;
            confirmation: import("immer/dist/internal").WritableDraft<{
                isOpen: boolean;
            }>;
        };
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
    };
    setCreateEntityConfirmationIsOpen: (state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<{
        isOpen: boolean;
    }>) => {
        createEntity: {
            confirmation: {
                isOpen: boolean;
            };
            target: import("immer/dist/internal").WritableDraft<{
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            }>;
            popover: import("immer/dist/internal").WritableDraft<{
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            }>;
        };
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
    };
    setCreateEntityTarget: (state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: PayloadAction<{
        configurationId: string;
        workflowId: string;
        workflowInput: unknown;
        display: string;
    }>) => {
        createEntity: {
            target: {
                configurationId: string;
                workflowId: string;
                workflowInput: unknown;
                display: string;
            };
            confirmation: import("immer/dist/internal").WritableDraft<{
                isOpen: boolean;
            }>;
            popover: import("immer/dist/internal").WritableDraft<{
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            }>;
        };
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
    };
    resetCreateEntityTarget: (state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>) => {
        createEntity: {
            target: {
                configurationId: null;
                workflowId: null;
                workflowInput: {};
                display: null;
            };
            confirmation: import("immer/dist/internal").WritableDraft<{
                isOpen: boolean;
            }>;
            popover: import("immer/dist/internal").WritableDraft<{
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            }>;
        };
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
    };
    setCreateEntityPopoverPosition: (state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>, action: {
        payload: any;
        type: string;
    }) => {
        createEntity: {
            popover: {
                position: {
                    top: any;
                    left: any;
                };
                isOpen: boolean;
                list: unknown[];
            };
            target: import("immer/dist/internal").WritableDraft<{
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            }>;
            confirmation: import("immer/dist/internal").WritableDraft<{
                isOpen: boolean;
            }>;
        };
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        interactionHistory: import("immer/dist/internal").WritableDraft<initialinteractionHistoryState>;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
    };
    /**
     * Function to set draft case history to none
     * @param state - CustomerCardState
     * @example -setDraftCaseInteractionHistory(state)
     */
    setDraftCaseInteractionHistory(state: import("immer/dist/internal").WritableDraft<CcfCustomerCardState>): {
        interactionHistory: {
            caseHistory: {};
            isLoading: false;
        };
        id: string;
        customFieldValues: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customFieldUpdated: boolean;
        customFieldDefs: import("immer/dist/internal").WritableDraft<import("yup/lib/object").OptionalObjectSchema<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
            updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>[];
        activity: import("immer/dist/internal").WritableDraft<AgentWorkflowResponseEvent>[];
        activitySearch: import("immer/dist/internal").WritableDraft<AgentWorkflowRequestEvent>[];
        activityLoading: boolean;
        activityRendered: boolean;
        fullName: string;
        image: string;
        detailsLoading: boolean;
        identities: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[];
        customerCardList: any;
        customerListLoading: boolean;
        ccMergeResponse: import("immer/dist/internal").WritableDraft<CustomerCardMergeStatus>;
        ccNoteDeleteResponse: import("immer/dist/internal").WritableDraft<CustomerCardNoteDeleteStatus>;
        loadMoreData: boolean;
        noteList: [];
        customerNoteLocalMap: import("immer/dist/internal").WritableDraft<{
            [key: string]: CustomerCardNote;
        }>;
        customerNotesLoading: boolean;
        customerNotesError: boolean;
        selectedCaseId: string;
        selectedCaseNoteObj: import("immer/dist/internal").WritableDraft<CustomerCardNote>;
        scrollToken: string;
        customEventData: import("immer/dist/internal").WritableDraft<CustomEventDetails>[];
        agentWorkflowConfigurationReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        agentWorkflowResponseReceived: import("immer/dist/internal").WritableDraft<AgentWorkflowConfiguration>[];
        CustomFieldError: boolean;
        sFCRMNavigationData: import("immer/dist/internal").WritableDraft<SfCrmNavigationDataState>;
        nameValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        relatesToValue: import("immer/dist/internal").WritableDraft<NameRelatesToState>;
        isActivityExpanded: number;
        createEntity: import("immer/dist/internal").WritableDraft<{
            target: {
                configurationId: string | null;
                workflowId: string | null;
                workflowInput: unknown;
                display: string | null;
            };
            confirmation: {
                isOpen: boolean;
            };
            popover: {
                isOpen: boolean;
                list: unknown[];
                position: {
                    top: number;
                    left: number;
                };
            };
        }>;
    };
}, "CcfCustomerCard">;
export declare const CcfCustomerCardReducer: import("redux").Reducer<any, import("redux").AnyAction>;
export declare const cxoneDigitalContactDetails: ((state: {
    inbox: AssignmentState;
}) => import("../../ccf-assignment-panel/ccf-assignment-panel.slice").DetailedDigitalContactData) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => import("../../ccf-assignment-panel/ccf-assignment-panel.slice").DetailedDigitalContactData & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const cxoneCustomerCardId: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const cxoneCustomFieldValues: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const cxoneCustomFieldDefs: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const cxoneCCActivity: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const cxoneCCActivitySearch: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const cxoneCCActivityLoadingStatus: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const cxoneCcActivityRenderStatus: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const cxoneCustomFieldUpdated: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const cxoneCustomerCardFullName: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const cxoneCustomerCardDetailsLoading: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const cxoneCustomerCardIdentities: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const cxoneVoiceContactDetails: ((state: {
    inbox: AssignmentState;
}) => import("../../../../../../../dist/libs/common/acd-sdk/src").CXoneVoiceContact) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => import("../../../../../../../dist/libs/common/acd-sdk/src").CXoneVoiceContact & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const cxoneVoiceStatus: ((state: {
    inbox: AssignmentState;
}) => import("../../../../../../../dist/libs/common/acd-sdk/src").CXoneVoiceContact) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => import("../../../../../../../dist/libs/common/acd-sdk/src").CXoneVoiceContact & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const cxoneDigitalStatus: ((state: {
    inbox: AssignmentState;
}) => import("../../ccf-assignment-panel/ccf-assignment-panel.slice").DetailedDigitalContactData) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => import("../../ccf-assignment-panel/ccf-assignment-panel.slice").DetailedDigitalContactData & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const customerCardList: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const isCustomerDataLoading: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const isCustomerCardMergedSelector: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const isCustomerCardNoteDeletedSelector: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const isCustomerNotesLoading: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const isCustomerNotesError: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const loadMoreData: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const selectCustomerNotesList: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const selectCustomerNotesMap: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const selectCurrentCaseNoteObj: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const selectCurrentCaseId: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const scrollToken: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const getStoredCustomEventDetails: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const getAgentWorkflowConfigurationReceived: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const getAgentWorkflowResponseReceived: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const getCustomFieldError: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const getInteractionHistory: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const getCreateEntityPopoverOpen: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const getCreateEntityPopoverList: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const getCreateEntityConfirmationOpen: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const getCreateEntityTargetDisplay: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const getCreateEntityShowButton: ((state: {
    CcfCustomerCard: any;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: any) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getCreateEntityPopoverPosition: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const getSFCRMNavigationData: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const getNameValue: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const getRelatesToValue: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const activityExpanded: ((state: {
    CcfCustomerCard: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export { default as thunks } from './thunks';
