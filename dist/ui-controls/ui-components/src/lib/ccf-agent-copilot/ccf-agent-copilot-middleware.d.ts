import { DigitalFileAttachment, ContactData, IntentConfig, DecisionTreeData, DecisionTreeElement } from '@nice-devone/common-sdk';
import { Store } from '@reduxjs/toolkit';
import { StateObservable } from 'redux-observable';
import { RootStateOrAny } from 'react-redux';
/**
 * Middleware for agent copilot app
 * @param actions$ - it take stream of action
 * @param state - represents state of application , can be used to get state using state$.values
 * @returns - return new action
 * @example
 */
export declare const agentCopilotMiddleware: (actions$: any, _: StateObservable<RootStateOrAny>, { store }: {
    store: Store<RootStateOrAny>;
}) => any;
/**
* Thunk action creator to handle async requests while getting info for agent query through
* @example
* ```
* dispatch(copilotSearch(searchText, activeCaseId));
* ```
*/
export declare const copilotSearch: import("@reduxjs/toolkit").AsyncThunk<void, {
    searchText: string;
    activeCaseId: string;
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
* Thunk action creator to handle async requests while getting copilot adaptive card schema
* @param cxaVersion - branch name indicating UI version
* @example -
* ```
* dispatch(getAllCopilotAdaptiveCardSchemas());
* ```
* @returns
*/
export declare const getAllCopilotAdaptiveCardSchemas: import("@reduxjs/toolkit").AsyncThunk<void, string, {
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
 * Thunk action creator to handle async requests while getting copilot healthcheck
 * @param contactId - contact Id of current active contact
 * @example dispatch(getCopilotHealth('1234'));
 */
export declare const getCopilotHealth: import("@reduxjs/toolkit").AsyncThunk<void, string, {
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
 * Thunk action creator to handle async requests while sending copilot reply
 * @example -
 * ```
 * dispatch(sendCopilotReply(caseId, response));
 * ```
 */
export declare const sendCopilotReply: import("@reduxjs/toolkit").AsyncThunk<void, {
    caseId: string;
    response: string | DigitalFileAttachment;
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
* Thunk action creator to handle async requests while generating email
* @example -
* ```
* dispatch(generateEmail('123','emailIdentifier', topics));
* ```
* @returns
*/
export declare const generateEmail: import("@reduxjs/toolkit").AsyncThunk<void, {
    contactId: string;
    emailIdentifier: string;
    topics: {
        topicId: string;
        content: string;
    }[];
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
* Thunk action creator to handle async requests while getting draft email
* @example -
* ```
* dispatch(getDraftEmail('123','emailIdentifier'));
* ```
* @returns
*/
export declare const getDraftEmail: import("@reduxjs/toolkit").AsyncThunk<void, {
    contactId: string;
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
* Thunk action creator to handle async requests while getting last gnereated topics
* @example -
* ```
* dispatch(getLastGeneratedTopics('123'));
* ```
* @returns
*/
export declare const getLastGeneratedTopics: import("@reduxjs/toolkit").AsyncThunk<void, {
    contactId: string;
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
 * Thunk action creator to handle async requests while getting copilot journey summary
 * @param contactId - contact Id of current active contact
 * @param customerId - customer Id of current active contact
 * @example dispatch(getJourneySummaryData('1234','5678', aahConfiguration));
 */
export declare const getJourneySummaryData: import("@reduxjs/toolkit").AsyncThunk<void, {
    activeCaseId: string;
    activeContactInSelectedInteraction: ContactData;
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
* Thunk action creator to handle async requests while getting generated final summary
* @example -
* ```
* dispatch(fetchGeneratedFinalSummary('123'));
* ```
* @returns
*/
export declare const fetchGeneratedFinalSummary: import("@reduxjs/toolkit").AsyncThunk<void, {
    contactId: string;
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
 * Thunk action creator to handle async requests for executing a Task Assist action.
 *
 * @param intentConfig - The configuration object for the intent, including metadata such as name and display name.
 * @param activeCaseId - The contact ID of the currently active interaction.
 * @param formCapturedata - Optional form data captured from user input, passed to the backend service.
 * @param taskSessionUid - Optional unique identifier for the task session, useful for tracking requests.
 *
 * @returns A Promise that resolves when the Task Assist request has been completed.
 */
export declare const executeTaskAssist: import("@reduxjs/toolkit").AsyncThunk<void, {
    intentConfig: IntentConfig;
    activeCaseId: string;
    formCapturedata?: Record<string, unknown> | undefined;
    taskSessionUid?: string | undefined;
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
 * Thunk action creator to get the task assist form schema
 * @param intentName - Name of the intent.
 * @param contactId - Contact ID for the active session.
 * @example -
 * ```
 * dispatch(getTaskAssistFormSchema({ intentName, contactId }));
 * ```
 * @returns
 */
export declare const getTaskAssistFormSchema: import("@reduxjs/toolkit").AsyncThunk<string, {
    intentName: string;
    contactId: string;
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
 * Thunk action creator to get the task assist form pre filled data
 * @param IntentConfig - The intent configuration.
 * @param customerId - customer Id of current active contact
 * @example -
 * ```
 * dispatch(getTaskAssistFormPreFilledData({ intentName }));
 * ```
 * @returns
 */
export declare const getTaskAssistFormPreFilledData: import("@reduxjs/toolkit").AsyncThunk<string, {
    intentConfig: IntentConfig;
    activeCaseId: string;
    objectId: string;
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
 * Thunk action creator to save the edited summary
 * @param channel - Channel of the contact
 * @param contactNumber - Contact number of the contact
 * @param summary - Edited summary text
 * @example -
 * ```
 * dispatch(saveEditedSummary({ channel, contactNumber, summary }));
 * ```
 * @returns
 */
export declare const saveEditedSummary: import("@reduxjs/toolkit").AsyncThunk<string, {
    channel: string;
    contactNumber: number;
    summary: string;
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
export declare const skipDecisionTreeQuestion: import("@reduxjs/toolkit").AsyncThunk<string, {
    taskSessionUid: string;
    contactId: string;
    decisionTreeId: string;
    questionId: string;
    sectionId: string;
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
 * Thunk action creator to fetch decision tree element by ID
 * @param decisionTreeId - The ID of the decision tree element
 * @example
 * ```ts
 * dispatch(getDecisionTreeElement('dt-001'));
 * ```
 * @returns
 */
export declare const getDecisionTreeElement: import("@reduxjs/toolkit").AsyncThunk<DecisionTreeElement, string, {
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
 * Thunk action creator to send Decision Tree section-change event
 *
 * @param params - `{ contactId, decisionTreeId, sectionId }`
 * @example
 * ```ts
 * dispatch(applyDecisionTreeSectionChange({
 *   contactId: '203444780887',
 *   decisionTreeId: 'a75bf9bb-203c-4850-b743-35e31f2f4421',
 *   sectionId: '12414-4141-4141-4141'
 * }));
 * ```
 */
export declare const applyDecisionTreeSectionChange: import("@reduxjs/toolkit").AsyncThunk<DecisionTreeData, {
    taskSessionUid: string;
    contactId: string;
    decisionTreeId: string;
    sectionId: string;
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
 * Thunk action: update a Decision Tree response
 *
 * @example
 */
export declare const updateDecisionTreeResponseThunk: import("@reduxjs/toolkit").AsyncThunk<DecisionTreeData, {
    taskSessionUid: string;
    contactId: string;
    decisionTreeId: string;
    sectionId: string;
    questionId: string;
    newResponse: string;
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
 * Thunk to submit a completed Decision Tree
 */
export declare const submitDecisionTreeThunk: import("@reduxjs/toolkit").AsyncThunk<string, {
    taskSessionUid: string;
    contactId: string;
    decisionTreeId: string;
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
 * Thunk to cancel an ongoing Decision Tree
 *
 * @param taskSessionUid - The unique identifier for the task session.
 * @param contactId - The contact ID associated with the decision tree.
 * @param decisionTreeId - The ID of the decision tree to be canceled.
 * @example
 * ```ts
 * dispatch(cancelDecisionTreeThunk({
 *   taskSessionUid
 *  contactId,
 *  decisionTreeId
 * }));
 * ```
 */
export declare const cancelDecisionTreeThunk: import("@reduxjs/toolkit").AsyncThunk<string, {
    taskSessionUid: string;
    contactId: string;
    decisionTreeId: string;
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
