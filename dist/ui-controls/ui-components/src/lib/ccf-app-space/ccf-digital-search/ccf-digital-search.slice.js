import { __awaiter } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { CcfLogger, CXoneClient } from '@nice-devone/agent-sdk';
import { SortingType, DirectoryEntities, InteractionSearchStatus, CUSTOMERS_GRID_COLUMN, THREADS_GRID_COLUMN, CXoneClientData, UIStorageKeys, } from '@nice-devone/common-sdk';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { CcfAppToastMessage, } from '@nice-devone/ui-controls';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { CXoneUser } from '@nice-devone/auth-sdk';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
import { globalActions } from '../../global.app.slice';
import { convertInteractionsTabDataToSearchAppSettings } from './ccf-digital-search-utility';
import { updateClientDataSettings } from '../../ccf-settings/ccf-full-settings.slice';
export var DIGITAL_SEARCH_FILTERS;
(function (DIGITAL_SEARCH_FILTERS) {
    DIGITAL_SEARCH_FILTERS["CHANNEL"] = "channel";
    DIGITAL_SEARCH_FILTERS["STATUS"] = "status";
    DIGITAL_SEARCH_FILTERS["SKILL_ID"] = "skillId";
    DIGITAL_SEARCH_FILTERS["INBOX_ASSIGNEE"] = "inboxAssigneeAgentId";
    DIGITAL_SEARCH_FILTERS["OWNER_ASSIGNEE"] = "ownerAssigneeAgentId";
    DIGITAL_SEARCH_FILTERS["FROM"] = "from";
    DIGITAL_SEARCH_FILTERS["TO"] = "to";
    DIGITAL_SEARCH_FILTERS["TAG"] = "tag";
    DIGITAL_SEARCH_FILTERS["AGENT"] = "agent";
    DIGITAL_SEARCH_FILTERS["SKILL"] = "skill";
    DIGITAL_SEARCH_FILTERS["IS_READ"] = "isRead";
    DIGITAL_SEARCH_FILTERS["HAS_NOTE"] = "hasNote";
})(DIGITAL_SEARCH_FILTERS || (DIGITAL_SEARCH_FILTERS = {}));
/**
 * Enum for Logical operator
 */
export var LogicalOperator;
(function (LogicalOperator) {
    LogicalOperator["AND"] = "AND";
    LogicalOperator["OR"] = "OR";
})(LogicalOperator || (LogicalOperator = {}));
/**
 * Enum for interaction search grid column names
 */
export var INTERACTION_GRID_COLUMN;
(function (INTERACTION_GRID_COLUMN) {
    INTERACTION_GRID_COLUMN["SOLUTION_TIME"] = "solutionTime";
    INTERACTION_GRID_COLUMN["FIRST_RESPONSE_TIME"] = "firstResponseTime";
    INTERACTION_GRID_COLUMN["CREATED_AT"] = "createdAt";
    INTERACTION_GRID_COLUMN["TYPE"] = "type";
    INTERACTION_GRID_COLUMN["STATUS"] = "status";
    INTERACTION_GRID_COLUMN["CHANNEL_NAME"] = "channelName";
    INTERACTION_GRID_COLUMN["SKILL_NAME"] = "skillName";
    INTERACTION_GRID_COLUMN["AUTHOR_END_USER_IDENTITY"] = "authorEndUserIdentity";
    INTERACTION_GRID_COLUMN["INBOX_ASSIGNEE_USER"] = "inboxAssigneeUser";
    INTERACTION_GRID_COLUMN["OWNER_ASSIGNEE_USER"] = "ownerAssigneeUser";
    INTERACTION_GRID_COLUMN["ROUTING_QUEUE_PRIORITY"] = "routingQueuePriority";
    INTERACTION_GRID_COLUMN["ID"] = "id";
    INTERACTION_GRID_COLUMN["PREVIEW"] = "preview";
    INTERACTION_GRID_COLUMN["SEARCH_OPTION_MENU"] = "searchOptionMenu";
})(INTERACTION_GRID_COLUMN || (INTERACTION_GRID_COLUMN = {}));
/**
 * Object for mapping interaction grid column name and sort param field
 */
export const sortColumnMapping = {
    [INTERACTION_GRID_COLUMN.SOLUTION_TIME]: 'slaRt',
    [INTERACTION_GRID_COLUMN.FIRST_RESPONSE_TIME]: 'slaFrt',
    [INTERACTION_GRID_COLUMN.CREATED_AT]: 'createdAt',
    [CUSTOMERS_GRID_COLUMN.LAST_ACTIVITY]: 'updatedAt',
    [CUSTOMERS_GRID_COLUMN.INBOUND]: 'numberOfInbounds',
    [CUSTOMERS_GRID_COLUMN.OUTBOUND]: 'numberOfOutbounds',
    [CUSTOMERS_GRID_COLUMN.CUSTOMER_NAME]: 'firstName',
    [INTERACTION_GRID_COLUMN.STATUS]: 'status',
};
/**
 * Enum for search tabs label
 */
export var SEARCH_TABS_LABEL;
(function (SEARCH_TABS_LABEL) {
    SEARCH_TABS_LABEL["INTERACTIONS"] = "Interactions";
    SEARCH_TABS_LABEL["MESSAGES"] = "Messages";
    SEARCH_TABS_LABEL["CUSTOMERS"] = "Customers";
    SEARCH_TABS_LABEL["LV_CUSTOMERS"] = "Lv_Customers";
    SEARCH_TABS_LABEL["THREADS"] = "Threads";
})(SEARCH_TABS_LABEL || (SEARCH_TABS_LABEL = {}));
/**
 * Enum for search tabs permissions label
 */
export var SEARCH_TABS_PERMISSIONS_LABEL;
(function (SEARCH_TABS_PERMISSIONS_LABEL) {
    SEARCH_TABS_PERMISSIONS_LABEL["IS_CASE_SEARCH_ALLOWED"] = "isCaseSearchAllowed";
    SEARCH_TABS_PERMISSIONS_LABEL["IS_CUSTOMER_SEARCH_ALLOWED"] = "isCustomerSearchAllowed";
    SEARCH_TABS_PERMISSIONS_LABEL["IS_MESSAGE_SEARCH_ALLOWED"] = "isMessageSearchAllowed";
    SEARCH_TABS_PERMISSIONS_LABEL["IS_THREAD_SEARCH_ALLOWED"] = "isThreadSearchAllowed";
})(SEARCH_TABS_PERMISSIONS_LABEL || (SEARCH_TABS_PERMISSIONS_LABEL = {}));
/**
 * Object for mapping label name and value of Search Tabs
 */
export const searchTabLabelPermissionsMapping = {
    [SEARCH_TABS_PERMISSIONS_LABEL.IS_CASE_SEARCH_ALLOWED]: SEARCH_TABS_LABEL.INTERACTIONS,
    [SEARCH_TABS_PERMISSIONS_LABEL.IS_MESSAGE_SEARCH_ALLOWED]: SEARCH_TABS_LABEL.MESSAGES,
    [SEARCH_TABS_PERMISSIONS_LABEL.IS_CUSTOMER_SEARCH_ALLOWED]: SEARCH_TABS_LABEL.CUSTOMERS,
    [SEARCH_TABS_PERMISSIONS_LABEL.IS_THREAD_SEARCH_ALLOWED]: SEARCH_TABS_LABEL.THREADS,
};
export const CCF_DIGITAL_SEARCH_FEATURE_KEY = 'ccfDigitalSearch';
const cxoneClient = CXoneClient.instance;
const cxoneDigitalClient = CXoneDigitalClient.instance;
const logger = new CcfLogger('App.digital-search', 'App.digital-search-slice');
const changeAssignUserPromises = [];
const changeStatusPromises = [];
const changeAssignSkillPromises = [];
const threadSortParams = {
    sortBy: THREADS_GRID_COLUMN.CREATED_AT,
    sortType: SortingType.DESCENDING,
    withContext: 1,
};
const defaultSortParams = {
    sorting: INTERACTION_GRID_COLUMN.CREATED_AT,
    sortingType: SortingType.DESCENDING,
};
const initialPageLinks = {
    next: '',
    previous: '',
    self: '',
};
export const DIGITAL_SEARCH = 'digitalSearch'; // localStorage key for the saved digital search data
export const initialDefaultFilterValues = {
    [SEARCH_TABS_LABEL.INTERACTIONS]: {
        channel: [],
        status: [],
        inboxAssigneeAgentId: [],
        ownerAssigneeAgentId: [],
        skillId: [],
        from: '',
        to: '',
        tag: [],
        skill: [],
    },
    [SEARCH_TABS_LABEL.MESSAGES]: {
        channel: [],
        from: '',
        to: '',
        tag: [],
        isRead: [],
        agent: [],
    },
    [SEARCH_TABS_LABEL.THREADS]: {
        from: '',
        to: '',
        query: '',
        channel: [],
    },
    [SEARCH_TABS_LABEL.CUSTOMERS]: {
        hasNote: '',
    },
    [SEARCH_TABS_LABEL.LV_CUSTOMERS]: {},
};
/**
 * returns sort params for the active tab
 *
 * @param activeTab - string - represents active tab.
 * @example - getSortParamsForActiveTab(activeTab)
 */
const getSortParamsForActiveTab = (activeTab) => {
    switch (activeTab) {
        case SEARCH_TABS_LABEL.THREADS:
            return threadSortParams;
        case SEARCH_TABS_LABEL.CUSTOMERS:
            return {
                sortingType: SortingType.DESCENDING,
                sorting: CUSTOMERS_GRID_COLUMN.LAST_ACTIVITY,
            };
        default:
            return defaultSortParams;
    }
};
/**
 * Retrieves search results asynchronously based on provided search parameters.
 *
 * @param searchParams - Object - The search parameters for the search.
 * @param freshData - boolean - Indicates whether to fetch fresh data or not.
 * @example - dispatch(getCcfDigitalSearch())
 */
export const getCcfDigitalSearch = createAsyncThunk('ccfDigitalSearch/getCcfDigitalSearch', ({ searchParams, freshData = false, }, { getState, dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    dispatch(ccfDigitalSearchActions.updateIsLoading(true));
    if (freshData)
        dispatch(ccfDigitalSearchActions.updateIsGridReset(true)); // set the grid to page one as we are requesting the fresh data for the grid
    const { ccfDigitalSearch } = getState();
    const activeTab = ccfDigitalSearch.activeSearchTab;
    dispatch(ccfDigitalSearchActions.updateIsFilterSelected(isFilterSelected((_a = ccfDigitalSearch === null || ccfDigitalSearch === void 0 ? void 0 : ccfDigitalSearch.tabs[activeTab]) === null || _a === void 0 ? void 0 : _a.defaultFilterValues)));
    let dateQuery = '';
    let queryUrl = '';
    const fromDate = (_d = (_c = (_b = ccfDigitalSearch === null || ccfDigitalSearch === void 0 ? void 0 : ccfDigitalSearch.tabs[activeTab]) === null || _b === void 0 ? void 0 : _b.defaultFilterValues) === null || _c === void 0 ? void 0 : _c.from) === null || _d === void 0 ? void 0 : _d.toString();
    const toDate = (_g = (_f = (_e = ccfDigitalSearch === null || ccfDigitalSearch === void 0 ? void 0 : ccfDigitalSearch.tabs[activeTab]) === null || _e === void 0 ? void 0 : _e.defaultFilterValues) === null || _f === void 0 ? void 0 : _f.to) === null || _g === void 0 ? void 0 : _g.toString();
    const channel = (_j = (_h = ccfDigitalSearch === null || ccfDigitalSearch === void 0 ? void 0 : ccfDigitalSearch.tabs[activeTab]) === null || _h === void 0 ? void 0 : _h.defaultFilterValues) === null || _j === void 0 ? void 0 : _j.channel;
    const fromDateStart = dayjs(fromDate).startOf('day').format('YYYY-MM-DDTHH:mm:ssZ'); //finding start time from fromDate - 00:00:00
    const fromDateEnd = dayjs(fromDate).endOf('day').format('YYYY-MM-DDTHH:mm:ssZ'); //finding end time from fromDate - 23:59:59
    const toDateStart = dayjs(toDate).startOf('day').format('YYYY-MM-DDTHH:mm:ssZ'); //finding start time from toDate - 00:00:00
    const toDateEnd = dayjs(toDate).endOf('day').format('YYYY-MM-DDTHH:mm:ssZ'); //finding end time from toDate - 23:59:59
    let channelId;
    if (Array.isArray(channel)) {
        channelId = channel.map((channel) => `channelId=${channel.id}`).join(` ${LogicalOperator.OR} `);
    }
    const sortColumn = Object.assign(Object.assign({}, ccfDigitalSearch.tabs[activeTab].currentSortColumn), { sorting: sortColumnMapping[(_k = ccfDigitalSearch.tabs[activeTab].currentSortColumn) === null || _k === void 0 ? void 0 : _k.sorting] });
    searchParams = Object.assign(Object.assign(Object.assign({}, sortColumn), searchParams), ccfDigitalSearch.tabs[activeTab].defaultFilterValues);
    if (ccfDigitalSearch.tabs[activeTab].searchText) { // if search text is present then we should request the search based on it also
        searchParams = Object.assign(Object.assign({}, searchParams), { query: `${ccfDigitalSearch.tabs[activeTab].searchText}` }); // here we form query on the selection of search type
    }
    try {
        let response;
        switch (activeTab) {
            case SEARCH_TABS_LABEL.INTERACTIONS:
                response = yield cxoneDigitalClient.digitalService.getDigitalContactSearchResult(searchParams);
                if (response) {
                    dispatch(ccfDigitalSearchActions.updateIsLoading(true));
                    dispatch(updateDigitalSearchData({
                        responseForTab: activeTab,
                        gridData: { newData: response === null || response === void 0 ? void 0 : response.data, freshData },
                        totalRecords: response === null || response === void 0 ? void 0 : response.hits,
                        isLoading: false,
                        lastScrollTocken: response === null || response === void 0 ? void 0 : response.scrollToken,
                        query: searchParams === null || searchParams === void 0 ? void 0 : searchParams.query,
                    }));
                }
                break;
            case SEARCH_TABS_LABEL.MESSAGES:
                response = yield cxoneDigitalClient.digitalService.getDigitalMessageSearchResult(searchParams);
                if (response && activeTab === SEARCH_TABS_LABEL.MESSAGES) {
                    dispatch(updateDigitalSearchData({
                        responseForTab: activeTab,
                        gridData: { newData: response === null || response === void 0 ? void 0 : response.data, freshData },
                        totalRecords: response === null || response === void 0 ? void 0 : response.hits,
                        isLoading: false,
                        lastScrollTocken: response === null || response === void 0 ? void 0 : response.scrollToken,
                        query: searchParams === null || searchParams === void 0 ? void 0 : searchParams.query,
                    }));
                }
                break;
            case SEARCH_TABS_LABEL.CUSTOMERS:
                response = yield cxoneDigitalClient.digitalService.getDigitalCustomerSearchResult(searchParams);
                if (response) {
                    dispatch(ccfDigitalSearchActions.updatePageLinks(response === null || response === void 0 ? void 0 : response._links));
                    dispatch(updateDigitalSearchData({
                        responseForTab: activeTab,
                        gridData: { newData: response === null || response === void 0 ? void 0 : response.data, freshData },
                        totalRecords: response === null || response === void 0 ? void 0 : response.hits,
                        isLoading: false,
                        query: searchParams === null || searchParams === void 0 ? void 0 : searchParams.query,
                    }));
                }
                break;
            case SEARCH_TABS_LABEL.LV_CUSTOMERS:
                // No need to call API for LV Customers, as that is being handled by the LV Ecc component
                dispatch(updateDigitalSearchData({
                    responseForTab: activeTab,
                    gridData: { newData: [], freshData },
                    totalRecords: 0,
                    isLoading: false,
                    query: searchParams === null || searchParams === void 0 ? void 0 : searchParams.query,
                }));
                break;
            case SEARCH_TABS_LABEL.THREADS:
                if (fromDate !== '' && fromDate !== undefined) {
                    dateQuery = `createdAt >= ${fromDateStart} ${LogicalOperator.AND} createdAt <= ${fromDateEnd}`; //DEV NOTE - createdAt >= 2024-04-09T00:00:00+05:30 AND createdAt <= 2024-04-09T23:59:59+05:30
                }
                if (toDate !== '' && toDate !== undefined) {
                    dateQuery = `createdAt >= ${toDateStart} ${LogicalOperator.AND} createdAt <= ${toDateEnd}`; //DEV NOTE - createdAt >= 2024-04-10T00:00:00+05:30 AND createdAt <= 2024-04-10T23:59:59+05:30
                }
                if ((fromDate !== '' && fromDate !== undefined) && (toDate !== '' && toDate !== undefined)) {
                    dateQuery = `createdAt >= ${fromDateStart} ${LogicalOperator.AND} createdAt <= ${toDateEnd}`; //DEV NOTE - createdAt >= 2024-04-09T00:00:00+05:30 AND createdAt <= 2024-04-16T23:59:59+05:30
                }
                if (channelId !== '' && channelId !== undefined) {
                    queryUrl = `${channelId}`;
                }
                if (dateQuery !== '' && dateQuery !== undefined) {
                    queryUrl = `${dateQuery}`;
                }
                if ((channelId !== '' && channelId !== undefined) && (dateQuery !== '' && dateQuery !== undefined)) {
                    queryUrl = `(${channelId}) ${LogicalOperator.AND} ${dateQuery}`; //query url with channel and date range
                }
                searchParams = Object.assign(Object.assign({}, searchParams), { withContext: 1, query: encodeURIComponent(queryUrl) });
                response = yield cxoneDigitalClient.digitalService.getDigitalThreadSearchResult(searchParams);
                if (response) {
                    dispatch(ccfDigitalSearchActions.updatePageLinks(response === null || response === void 0 ? void 0 : response._links));
                    const channelList = [];
                    const { channels } = response._context;
                    (_l = response === null || response === void 0 ? void 0 : response.data) === null || _l === void 0 ? void 0 : _l.forEach((threadData) => {
                        const channel = channels.find((_channel) => threadData.channelId === _channel.id);
                        channelList.push(channel);
                    });
                    const threadsObj = (_m = response === null || response === void 0 ? void 0 : response._context) === null || _m === void 0 ? void 0 : _m.messages.map((message, index) => {
                        var _a;
                        return (Object.assign(Object.assign({}, message), { channel: (_a = channelList[index]) === null || _a === void 0 ? void 0 : _a.name }));
                    });
                    dispatch(updateDigitalSearchData({
                        responseForTab: activeTab,
                        gridData: { newData: threadsObj, freshData },
                        totalRecords: response === null || response === void 0 ? void 0 : response.totalRecords,
                        isLoading: false,
                    }));
                }
                break;
            default:
                response = null;
                break;
        }
    }
    catch (error) {
        dispatch(ccfDigitalSearchActions.updateIsLoading(false));
        logger.error('getCcfDigitalSearch', `error while fetching ${activeTab} search results - ${JSON.stringify(error)}`);
        const errorResponse = error;
        if (((_p = (_o = errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.data) === null || _o === void 0 ? void 0 : _o.data) === null || _p === void 0 ? void 0 : _p.status) === 400 /* HttpStatusCode.BAD_REQUEST */) {
            const digitalSearchErrorToast = {
                isError: true,
                messageKey: 'digitalSearchQueryUnsupported',
                placeHolder: errorResponse.message,
            };
            dispatch(ccfDigitalSearchActions.updateDigitalSearchToastObj(digitalSearchErrorToast));
        }
    }
}));
/**
 * This method is used to call the common calls for all tabs
 * @example - updateDigitalSearchData('Interactions', \{data: '', true\}, 10234, false, 'TOKENASDFCcdR' )
 */
export const updateDigitalSearchData = createAsyncThunk('ccfDigitalSearch/updateDigitalSearchData', ({ responseForTab, gridData, totalRecords, isLoading, lastScrollTocken, query, }, { getState, dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const { ccfDigitalSearch } = getState();
    const activeTab = ccfDigitalSearch.activeSearchTab;
    // Double-checking if the response received for the tab is currently active or not
    if (responseForTab === activeTab) {
        dispatch(ccfDigitalSearchActions.updateGridData(gridData));
        dispatch(ccfDigitalSearchActions.updateTotalRecords(totalRecords));
        dispatch(ccfDigitalSearchActions.updateLastScrollToken(lastScrollTocken));
        dispatch(ccfDigitalSearchActions.updateIsLoading(isLoading));
        dispatch(ccfDigitalSearchActions.updateQuery(query));
        // Announcing only if there's fresh data
        if (gridData === null || gridData === void 0 ? void 0 : gridData.freshData) {
            const ariaKey = totalRecords ? 'resultsFound' : 'noResultFound';
            dispatch(globalActions.setAriaLiveAnnouncer({
                translateConfig: Object.assign({ key: ariaKey }, (totalRecords ? { extraArgs: { format: [totalRecords] } } : {})),
            }));
        }
    }
}));
/*
*This method used to get agent list
/**
 *  @example getAgentList()
* ```
*/
export const getAgentList = createAsyncThunk('ccfDigitalSearch/getAgentList', (_, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const agentListSubscribe = cxoneClient.directory.directoryEvent.subscribe((event) => {
            var _a;
            const userList = (_a = event.agentList.data) === null || _a === void 0 ? void 0 : _a.map((item) => {
                return {
                    id: `${item.agentId}`,
                    userId: `${item.userId}`,
                    name: `${item.firstName} ${item.lastName}`,
                    agentStatus: `${item.agentStateName}`,
                };
            });
            thunkAPI.dispatch(ccfDigitalSearchActions.setAgentList(userList));
            agentListSubscribe === null || agentListSubscribe === void 0 ? void 0 : agentListSubscribe.unsubscribe();
        });
        cxoneClient.directory.getDirectoryData({ entity: [DirectoryEntities.AGENT_LIST], shouldFetchAllAgents: true });
    }
    catch (error) {
        logger.error('getAgentList', `error while fetching Agent List - ${JSON.stringify(error)}`);
    }
}));
/**
* This method used to get skill list
* @example - fetchSkillList()
*/
export const fetchSkillList = createAsyncThunk('ccfDigitalSearch/fetchSkillList', (_, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allRoutingQueues = yield cxoneDigitalClient.digitalService.getAllRoutingQueues();
        const skillList = allRoutingQueues
            .filter(item => item.skillId !== null)
            .map((item) => {
            return {
                id: `${item.skillId}`,
                name: `${item.name}`,
            };
        });
        thunkAPI.dispatch(ccfDigitalSearchActions.setSkillList(skillList));
    }
    catch (error) {
        logger.error('fetchSkillList', `error while fetching skill list' - ${JSON.stringify(error)}`);
    }
}));
/**
 * update bulk interaction change progress bar
 * @example - updateProgressBarLoading()
 * @param messageKey - translation key to show on progress bar
 * @param totalInteractions - total number of bulk modifications
 * @param completedInteractions - total number of completed bulk modifications
 * @param extraArgs - arguments to pass in translation key for dynamic translation
 */
const updateProgressBarLoading = (messageKey, totalInteractions, completedInteractions, extraArgs) => {
    const interactionSearchLoading = {
        messageKey: messageKey,
        totalInteractions: (totalInteractions),
        completedInteractions: completedInteractions,
        extraArgs: extraArgs,
    };
    return interactionSearchLoading;
};
/**
 * Create loading toast when actions are performing on interactions/contacts
 * @param tostInfo - InteractionBulkLoading
 * @param isUpdate - check for new loading toast or update existing toast
 * @example interactionLoadingToast(tostInfo,isUpdate)
 */
const interactionLoadingToast = (tostInfo, toastId) => {
    let loadingValue = ((tostInfo === null || tostInfo === void 0 ? void 0 : tostInfo.completedInteractions) && (tostInfo === null || tostInfo === void 0 ? void 0 : tostInfo.totalInteractions)) ? ((tostInfo === null || tostInfo === void 0 ? void 0 : tostInfo.completedInteractions) / (tostInfo === null || tostInfo === void 0 ? void 0 : tostInfo.totalInteractions)) * 100 : 0;
    const messageComponent = (_jsx(CcfAppToastMessage, { type: 'info', messageKey: tostInfo === null || tostInfo === void 0 ? void 0 : tostInfo.messageKey, isLoading: true, loadingValue: loadingValue, extraArgs: { format: (tostInfo === null || tostInfo === void 0 ? void 0 : tostInfo.extraArgs) || [''] } }));
    const toastOptions = {
        autoClose: (loadingValue === 100) ? 500 : undefined,
        containerId: 'AppToastContainer',
    };
    if ((toastId === null || toastId === void 0 ? void 0 : toastId.current) === '') {
        toastId.current = toast.info(messageComponent, toastOptions);
    }
    else {
        toast.update(toastId === null || toastId === void 0 ? void 0 : toastId.current, Object.assign({ render: messageComponent }, toastOptions));
    }
    if (loadingValue && loadingValue >= 100) {
        toast.done(toastId === null || toastId === void 0 ? void 0 : toastId.current);
        loadingValue = 0;
    }
};
/**
 * Create toast when actions are performed on interactions/contacts
 * @param toastInfo - DigitalSearchToastObj Information about toast
 * @example - interactionToast(toastInfo)
 */
const interactionToast = (toastInfo) => {
    const messageComponent = (_jsx(CcfAppToastMessage, { type: toastInfo.isError ? 'error' : 'success', messageKey: toastInfo === null || toastInfo === void 0 ? void 0 : toastInfo.messageKey, extraArgs: { format: [(toastInfo === null || toastInfo === void 0 ? void 0 : toastInfo.placeHolder) || ''] } }));
    const toastOptions = {
        autoClose: 2000,
        containerId: 'AppToastContainer',
    };
    toast[toastInfo.isError ? 'error' : 'success'](messageComponent, toastOptions);
};
/**
 * change assigned user for single or multiple contact
 * @example - changeAssignedUser(['349203403','349203404'], '11ec6301-12ea-fd30-8ba8-0242ac110002')
 * @param selectedContactIds - array of selected contact ids
 * @param cxoneUserId - user id to which contacts should be assigned
 */
const changeAssignedUser = (selectedContactIds, cxoneUserId) => __awaiter(void 0, void 0, void 0, function* () {
    selectedContactIds.map((contactId) => __awaiter(void 0, void 0, void 0, function* () {
        // push promise for every selected contact id
        changeAssignUserPromises.push(cxoneDigitalClient.digitalContactManager.digitalContactService.changeAssignedUser(contactId, cxoneUserId));
    }));
});
/**
 * Assign selected Digital contacts
 * @example - dispatch(assignDigitalContact())
 */
export const assignDigitalContact = createAsyncThunk('AssignDigitalContact', (data, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _q;
    thunkAPI.dispatch(ccfDigitalSearchActions.updateSelectedRowContacts([])); // unselect the selected rows
    const totalInteraction = (_q = data === null || data === void 0 ? void 0 : data.selectedContactIds) === null || _q === void 0 ? void 0 : _q.length;
    const { ccfDigitalSearch } = thunkAPI.getState();
    const closedSelectedContactIds = []; // to store the closed status cases from the selected cases
    const alreadyAssignedContactIds = []; // to store the cases which is already assigned to the current assignee
    const activeTab = ccfDigitalSearch.activeSearchTab;
    data.selectedContactIds = data === null || data === void 0 ? void 0 : data.selectedContactIds.filter((id) => {
        var _a, _b;
        const matchedContact = (_a = ccfDigitalSearch === null || ccfDigitalSearch === void 0 ? void 0 : ccfDigitalSearch.tabs[activeTab].gridData) === null || _a === void 0 ? void 0 : _a.find(caseDetail => caseDetail.id === id);
        const isClosedCase = (matchedContact === null || matchedContact === void 0 ? void 0 : matchedContact.status) === InteractionSearchStatus.CLOSED;
        const isAssignedUser = (data === null || data === void 0 ? void 0 : data.cxoneUserId) === ((_b = matchedContact === null || matchedContact === void 0 ? void 0 : matchedContact.inboxAssigneeUser) === null || _b === void 0 ? void 0 : _b.incontactId);
        if (isClosedCase)
            closedSelectedContactIds.push(id); // if we find the closed case match then we will push it to the array
        if (!isClosedCase && isAssignedUser)
            alreadyAssignedContactIds.push(id); // if we find the same assigned user match then we will push it to the array
        return !(isClosedCase || isAssignedUser);
    });
    const progressBarData = updateProgressBarLoading('assignLoadingNotification', totalInteraction, (closedSelectedContactIds.length + alreadyAssignedContactIds.length), [totalInteraction]);
    interactionLoadingToast(progressBarData, data.toastId);
    // wait to resolve all settled promises
    yield changeAssignedUser(data.selectedContactIds, data.cxoneUserId);
    const successFullCaseTransferIds = [];
    const failedCaseTransferIds = [];
    yield Promise.allSettled(changeAssignUserPromises).then((results) => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                // push successfull case transfer id's
                if (data.selectedContactIds[index])
                    successFullCaseTransferIds.push(data.selectedContactIds[index]);
            }
            else if (result.status === 'rejected') {
                // push failed case transfer id's
                if (data.selectedContactIds[index])
                    failedCaseTransferIds.push(data.selectedContactIds[index]);
            }
            const completedInteractions = (closedSelectedContactIds.length + alreadyAssignedContactIds.length + successFullCaseTransferIds.length + failedCaseTransferIds.length);
            const progressBarData = updateProgressBarLoading('assignLoadingNotification', totalInteraction, completedInteractions, [totalInteraction]);
            interactionLoadingToast(progressBarData, data.toastId);
        });
        if (closedSelectedContactIds === null || closedSelectedContactIds === void 0 ? void 0 : closedSelectedContactIds.length) {
            const digitalSearchErrorToast = {
                isError: true,
                messageKey: 'unableToAssignClosedDigitalContact',
                placeHolder: closedSelectedContactIds === null || closedSelectedContactIds === void 0 ? void 0 : closedSelectedContactIds.toString(),
            };
            interactionToast(digitalSearchErrorToast);
        }
        if (alreadyAssignedContactIds === null || alreadyAssignedContactIds === void 0 ? void 0 : alreadyAssignedContactIds.length) {
            const digitalSearchErrorToast = {
                isError: true,
                messageKey: 'unableToAssignAlreadyAssignedContact',
                placeHolder: alreadyAssignedContactIds === null || alreadyAssignedContactIds === void 0 ? void 0 : alreadyAssignedContactIds.toString(),
            };
            interactionToast(digitalSearchErrorToast);
        }
        if (successFullCaseTransferIds === null || successFullCaseTransferIds === void 0 ? void 0 : successFullCaseTransferIds.length) {
            const digitalSearchToast = {
                isError: false,
                messageKey: 'assignDigitalContact',
                placeHolder: successFullCaseTransferIds.toString(),
            };
            interactionToast(digitalSearchToast);
            thunkAPI.dispatch(getCcfDigitalSearch({ searchParams: {}, freshData: true })); // we request the fresh data after all the assignment is done
        }
        if (failedCaseTransferIds === null || failedCaseTransferIds === void 0 ? void 0 : failedCaseTransferIds.length) {
            const digitalSearchToast = {
                isError: true,
                messageKey: 'unableToAssignDigitalContact',
                placeHolder: failedCaseTransferIds.toString(),
            };
            // Clear DIGITAL_PREVIEW_CONTACT from localStorage
            LocalStorageHelper.removeItem(UIStorageKeys.DIGITAL_PREVIEW_CONTACT);
            interactionToast(digitalSearchToast);
        }
    });
    data.toastId.current = '';
    changeAssignUserPromises.length = 0;
}));
/**
 * change status for single or multiple contact
 * @example - changeStatus(['349203403','349203404'], 'new')
 * @param selectedContactIds - array of selected contact ids
 * @param status - status to change
 */
const changeStatus = (selectedContactIds, status) => __awaiter(void 0, void 0, void 0, function* () {
    selectedContactIds.map((contactId) => __awaiter(void 0, void 0, void 0, function* () {
        // push promise for every selected contact id
        changeStatusPromises.push(cxoneDigitalClient.digitalContactManager.digitalContactService.changeCustomerContactStatus(contactId, status));
    }));
});
/**
 * Change selected Digital contacts status
 * @example - dispatch(changeDigitalContactStatus())
 */
export const changeDigitalContactStatus = createAsyncThunk('ChangeDigitalContactStatus', (data, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _r;
    thunkAPI.dispatch(ccfDigitalSearchActions.updateSelectedRowContacts([])); // unselect the selected rows   
    const totalInteraction = (_r = data === null || data === void 0 ? void 0 : data.selectedContactIds) === null || _r === void 0 ? void 0 : _r.length;
    // wait to resolve all settled promises
    yield changeStatus(data.selectedContactIds, data.status);
    const successFullCaseStatusChangeIds = [];
    const failedCaseStatusChangeIds = [];
    yield Promise.allSettled(changeStatusPromises).then((results) => {
        results.forEach((result, index) => {
            if (data.selectedContactIds[index]) {
                if (result.status === 'fulfilled') {
                    // push successfull case status change id's
                    successFullCaseStatusChangeIds.push(data.selectedContactIds[index]);
                }
                else if (result.status === 'rejected') {
                    // push failed case status change id's
                    failedCaseStatusChangeIds.push(data.selectedContactIds[index]);
                }
            }
            const progressBarData = updateProgressBarLoading('statusChangeNotification', totalInteraction, (successFullCaseStatusChangeIds.length + failedCaseStatusChangeIds.length), [totalInteraction, data.status]);
            thunkAPI.dispatch(ccfDigitalSearchActions.updateInteractionBulkLoading(progressBarData));
        });
        if (successFullCaseStatusChangeIds === null || successFullCaseStatusChangeIds === void 0 ? void 0 : successFullCaseStatusChangeIds.length) {
            const digitalSearchToast = {
                isError: false,
                messageKey: 'caseStatusChanged',
                placeHolder: data.status.toString(),
            };
            thunkAPI.dispatch(ccfDigitalSearchActions.updateDigitalSearchToastObj(digitalSearchToast));
        }
        if (failedCaseStatusChangeIds === null || failedCaseStatusChangeIds === void 0 ? void 0 : failedCaseStatusChangeIds.length) {
            const digitalSearchErrorToast = {
                isError: true,
                messageKey: 'unableToChangeCaseStatus',
                placeHolder: failedCaseStatusChangeIds.toString(),
            };
            thunkAPI.dispatch(ccfDigitalSearchActions.updateDigitalSearchToastObj(digitalSearchErrorToast));
        }
    });
    changeStatusPromises.length = 0;
    thunkAPI.dispatch(getCcfDigitalSearch({ searchParams: {}, freshData: true })); // we request the fresh data after all the assignment is done
}));
/**
 * change routing queue or skill for single or multiple contact
 * @example - changeRoutingQueue(['349203403','349203404'],'889100')
 * @param selectedContactIds - array of selected contact ids
 * @param skillId - skill id to which contacts should be assigned
 */
const changeRoutingQueue = (selectedContactIds, skillId) => __awaiter(void 0, void 0, void 0, function* () {
    selectedContactIds.map((contactId) => __awaiter(void 0, void 0, void 0, function* () {
        // push promise for every selected contact id
        changeAssignSkillPromises.push(cxoneDigitalClient.digitalContactManager.digitalContactService.changeRoutingQueue(contactId, skillId));
    }));
});
/**
 * Assign selected Digital contacts to skill/queue
 * @example - dispatch(assignDigitalContactToSkill())
 */
export const assignDigitalContactToSkill = createAsyncThunk('AssignDigitalContactToSkill', (data, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _s;
    thunkAPI.dispatch(ccfDigitalSearchActions.updateSelectedRowContacts([])); // unselect the selected rows
    const totalInteraction = (_s = data === null || data === void 0 ? void 0 : data.selectedContactIds) === null || _s === void 0 ? void 0 : _s.length;
    const { ccfDigitalSearch } = thunkAPI.getState();
    const closedSelectedContactIds = []; // to store the closed status cases from the selected cases
    const activeTab = ccfDigitalSearch.activeSearchTab;
    data.selectedContactIds = data === null || data === void 0 ? void 0 : data.selectedContactIds.filter((id) => {
        var _a, _b;
        const matchedContact = (_b = (_a = ccfDigitalSearch === null || ccfDigitalSearch === void 0 ? void 0 : ccfDigitalSearch.tabs[activeTab]) === null || _a === void 0 ? void 0 : _a.gridData) === null || _b === void 0 ? void 0 : _b.find(caseDetail => caseDetail.id === id);
        const isClosedCase = (matchedContact === null || matchedContact === void 0 ? void 0 : matchedContact.status) === InteractionSearchStatus.CLOSED;
        if (isClosedCase)
            closedSelectedContactIds.push(id); // if we find the closed case match then we will push it to the array
        return !(isClosedCase);
    });
    const progressBarData = updateProgressBarLoading('assignLoadingNotification', totalInteraction, (closedSelectedContactIds.length), [totalInteraction]);
    interactionLoadingToast(progressBarData, data.toastId);
    // wait to resolve all settled promises
    yield changeRoutingQueue(data.selectedContactIds, data.skillId);
    const successFullCaseTransferIds = [];
    const failedCaseTransferIds = [];
    yield Promise.allSettled(changeAssignSkillPromises).then((results) => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                // push successfull case transfer id's
                if (data.selectedContactIds[index])
                    successFullCaseTransferIds.push(data.selectedContactIds[index]);
            }
            else if (result.status === 'rejected') {
                // push failed case transfer id's
                if (data.selectedContactIds[index])
                    failedCaseTransferIds.push(data.selectedContactIds[index]);
            }
            const completedInteractions = (closedSelectedContactIds.length + successFullCaseTransferIds.length + failedCaseTransferIds.length);
            const progressBarData = updateProgressBarLoading('assignLoadingNotification', totalInteraction, completedInteractions, [totalInteraction]);
            interactionLoadingToast(progressBarData, data.toastId);
        });
        if (closedSelectedContactIds === null || closedSelectedContactIds === void 0 ? void 0 : closedSelectedContactIds.length) {
            const digitalSearchErrorToast = {
                isError: true,
                messageKey: 'unableToAssignClosedDigitalContact',
                placeHolder: closedSelectedContactIds === null || closedSelectedContactIds === void 0 ? void 0 : closedSelectedContactIds.toString(),
            };
            interactionToast(digitalSearchErrorToast);
        }
        if (successFullCaseTransferIds === null || successFullCaseTransferIds === void 0 ? void 0 : successFullCaseTransferIds.length) {
            const digitalSearchToast = {
                isError: false,
                messageKey: 'assignDigitalContact',
                placeHolder: successFullCaseTransferIds.toString(),
            };
            interactionToast(digitalSearchToast);
        }
        if (failedCaseTransferIds === null || failedCaseTransferIds === void 0 ? void 0 : failedCaseTransferIds.length) {
            const digitalSearchToast = {
                isError: true,
                messageKey: 'unableToAssignDigitalContact',
                placeHolder: failedCaseTransferIds.toString(),
            };
            // Clear DIGITAL_PREVIEW_CONTACT from localStorage
            LocalStorageHelper.removeItem(UIStorageKeys.DIGITAL_PREVIEW_CONTACT);
            interactionToast(digitalSearchToast);
        }
    });
    data.toastId.current = '';
    changeAssignSkillPromises.length = 0;
    thunkAPI.dispatch(getCcfDigitalSearch({ searchParams: {}, freshData: true })); // we request the fresh data after all the assignment is done
}));
/**
* This method is used to get channel list
* @example getAllChannelList()
*/
export const getAllChannelList = createAsyncThunk('ccfDigitalSearch/getAllChannelList', (_, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        cxoneDigitalClient.digitalService.getAllChannels().then((response) => {
            const channels = [];
            response.forEach((value, key) => {
                var _a, _b;
                const channelObj = {};
                channelObj.id = key;
                channelObj.name = (_a = value.name) !== null && _a !== void 0 ? _a : '';
                channelObj.canReplyToAnyMessage = (_b = value.canReplyToAnyMessage) !== null && _b !== void 0 ? _b : false;
                channels.push(channelObj);
            });
            thunkAPI.dispatch(ccfDigitalSearchActions.setChannelsList(channels));
        });
    }
    catch (error) {
        logger.error('getAllChannelList', `error while fetching Channel List - ${JSON.stringify(error)}`);
    }
}));
/**
 * Used to fetch all the tags
 * @example
 * ```
 * dispatch(getAllTags());
 * ```
 */
export const getAllTags = createAsyncThunk('ccfDigitalSearch/getAllTags', (_, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    cxoneDigitalClient.digitalService.getDigitalMessageTags().then((response) => {
        if (response) {
            const tags = response.map((value) => {
                return {
                    id: value === null || value === void 0 ? void 0 : value.id,
                    name: value === null || value === void 0 ? void 0 : value.title,
                };
            });
            dispatch(ccfDigitalSearchActions.setAllTags(tags));
        }
    }).catch((error) => {
        logger.error('getAllTags', `Error while fetching tags - ${JSON.stringify(error)}`);
    });
}));
/**
 * Used to load the allowed search tab list
 * @example
 * ```
 * dispatch(getAllowedSearchTabsList());
 * ```
 */
export const getAllowedSearchTabsList = createAsyncThunk('ccfDigitalSearch/getSearchTabsPermissions', (_, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _t;
    try {
        const { global } = thunkAPI.getState();
        const searchTabPermissions = CXoneUser.instance.getDigitalSearchTabPermissions();
        const isLvECCDeskFeatureToggleEnabled = (global === null || global === void 0 ? void 0 : global.isLvCustomerCardFeatureToggleEnabled) || (global === null || global === void 0 ? void 0 : global.isLvDeskFeatureToggleEnabled);
        const { hasSmartReachAgentAccess, hasSmartReachUserAccess, smartReachDeskAccess, smartReachECCAccess } = (_t = global === null || global === void 0 ? void 0 : global.userCustomAttributes) !== null && _t !== void 0 ? _t : {};
        const hasSmartReachAccess = hasSmartReachAgentAccess || hasSmartReachUserAccess;
        const hasDeskOrEccAccess = smartReachDeskAccess || smartReachECCAccess;
        const permittedTabs = Object.entries(searchTabPermissions)
            .filter(([_, value]) => value)
            .map(([key, _]) => {
            let tab = searchTabLabelPermissionsMapping[key];
            if (isLvECCDeskFeatureToggleEnabled &&
                hasSmartReachAccess &&
                hasDeskOrEccAccess &&
                tab === SEARCH_TABS_LABEL.CUSTOMERS)
                tab = SEARCH_TABS_LABEL.LV_CUSTOMERS;
            return tab;
        });
        const currentActiveTab = (permittedTabs === null || permittedTabs === void 0 ? void 0 : permittedTabs.length) > 0 ? permittedTabs[0] : '';
        thunkAPI.dispatch(ccfDigitalSearchActions.updateAllowedTabs(permittedTabs));
        thunkAPI.dispatch(ccfDigitalSearchActions.updateActiveSearchTab(currentActiveTab));
    }
    catch (error) {
        logger.error('getSearchTabsPermissions', `error while fetching search tab permission - ${JSON.stringify(error)}`);
    }
}));
/**
 * Used to reset the filters in digital interaction search.
 * @example
 * ```
 * dispatch(resetSearch());
 * ```
 */
export const resetSearch = createAsyncThunk('ccfInteractionSearch/resetSearch', (_, { getState, dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //reset search input value and clear filter values and search values from store and local storage
        const { ccfDigitalSearch } = getState();
        const activeTab = ccfDigitalSearch.activeSearchTab;
        const sortParams = getSortParamsForActiveTab(activeTab);
        dispatch(ccfDigitalSearchActions.updateSearchText(''));
        dispatch(ccfDigitalSearchActions.updateSelectedRowContacts([]));
        const digitalSearchLS = LocalStorageHelper.getItem(DIGITAL_SEARCH, true);
        dispatch(ccfDigitalSearchActions.clearFilterValues());
        dispatch(ccfDigitalSearchActions.updateIsFilterSelected(false));
        dispatch(// to update the default sort column and order
        ccfDigitalSearchActions.updateCurrentSortColumn(sortParams));
        dispatch(getCcfDigitalSearch({ searchParams: sortParams, freshData: true }));
        // Save the filterSettings in clientdata api call
        if (activeTab === SEARCH_TABS_LABEL.INTERACTIONS) {
            dispatch(updateClientDataWithSearchAppSettings({
                activeTab: SEARCH_TABS_LABEL.INTERACTIONS,
                tabSettings: {
                    filterValues: initialDefaultFilterValues[activeTab],
                    sorting: {
                        field: defaultSortParams.sorting,
                        direction: defaultSortParams.sortingType,
                    },
                },
            }));
        }
        LocalStorageHelper.setItem(DIGITAL_SEARCH, Object.assign(Object.assign({}, digitalSearchLS), { [activeTab]: Object.assign(Object.assign({}, digitalSearchLS[activeTab]), { currentFilterValues: initialDefaultFilterValues, currentSortColumn: sortParams, isFilterSelected: false, searchText: '' }) }));
        dispatch(globalActions.setAriaLiveAnnouncer({ translateConfig: { key: 'searchResultsReset' } }));
    }
    catch (error) {
        logger.error('resetSearch', 'Error while resetting digital interaction search filter details - ' + JSON.stringify(error));
    }
}));
/**
 * Used to refresh and get gridDetails for filters in digital interaction search.
 * @example
 * ```
 * dispatch(refreshSearch());
 * ```
 */
export const refreshSearch = createAsyncThunk('ccfInteractionSearch/refreshSearch', (_, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _u;
    try {
        const { ccfDigitalSearch } = thunkAPI.getState();
        const activeTab = ccfDigitalSearch.activeSearchTab;
        const sortParams = Object.assign(Object.assign({}, ccfDigitalSearch.tabs[activeTab].currentSortColumn), { sorting: sortColumnMapping[(_u = ccfDigitalSearch.tabs[activeTab].currentSortColumn) === null || _u === void 0 ? void 0 : _u.sorting] });
        thunkAPI.dispatch(getCcfDigitalSearch({ searchParams: sortParams, freshData: true }));
        thunkAPI.dispatch(ccfDigitalSearchActions.updateFiltersMenuElement(null));
        const digitalSearchLS = LocalStorageHelper.getItem(DIGITAL_SEARCH, true);
        LocalStorageHelper.setItem(DIGITAL_SEARCH, Object.assign(Object.assign({}, digitalSearchLS), { currentFilterValues: sortParams })); // to store filter values in local storage after reordering
        thunkAPI.dispatch(globalActions.setAriaLiveAnnouncer({ translateConfig: { key: 'searchResultsRefreshed' } }));
    }
    catch (error) {
        logger.error('refreshSearch', 'Error while refreshing digital interaction search filter details - ' + JSON.stringify(error));
    }
}));
/**
 * Create toast when bulk reply actions are performed on digital interactions
 * @param messageKey - Translation key for toast
 * @param isSettled - check if promise is settled and set true for autoClose
 * @param toastId - toast Id used to update toast to autoClose
 * @example - continuousToast('TranslationKey', isSettled, toastId)
 */
const continuousToast = (messageKey, totalInteractions, isSettled, toastId) => {
    const messageComponent = (_jsx(CcfAppToastMessage, { type: 'info', messageKey: messageKey, isLoading: true, isIndeterminate: true, extraArgs: { format: totalInteractions || [''] } }));
    const toastOptions = {
        autoClose: (isSettled) ? 500 : undefined,
        containerId: 'AppToastContainer',
    };
    if ((toastId === null || toastId === void 0 ? void 0 : toastId.current) === '' && !isSettled) {
        toastId.current = toast.info(messageComponent, toastOptions);
    }
    if (isSettled) {
        toast.update(toastId === null || toastId === void 0 ? void 0 : toastId.current, Object.assign({ render: messageComponent }, toastOptions));
    }
};
/**
 * Create toast when actions are performed on interactions/contacts
 * @param toastInfo - DigitalBulkReplyToastObj Information about toast
 * @example - bulkReplyToast(toastInfo)
 */
const bulkReplyToast = (toastInfo) => {
    const messageComponent = (_jsx(CcfAppToastMessage, { type: toastInfo === null || toastInfo === void 0 ? void 0 : toastInfo.type, messageKey: toastInfo === null || toastInfo === void 0 ? void 0 : toastInfo.messageKey, extraArgs: { format: (toastInfo === null || toastInfo === void 0 ? void 0 : toastInfo.placeHolder) || [''] } }));
    const toastOptions = {
        autoClose: 2000,
        containerId: 'AppToastContainer',
    };
    let toastType = 'info';
    if ((toastInfo === null || toastInfo === void 0 ? void 0 : toastInfo.type) === 'success') {
        toastType = 'success';
    }
    else if ((toastInfo === null || toastInfo === void 0 ? void 0 : toastInfo.type) === 'error') {
        toastType = 'error';
    }
    toast[toastType](messageComponent, toastOptions);
};
/**
 * Get Reply History for particular batchActionId
 * @example - dispatch(getBulkReplyHistory(batchActionId))
 */
const getBulkReplyHistory = createAsyncThunk('GetBulkReplyHistory', (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield cxoneDigitalClient.digitalContactManager.digitalContactService.getBulkReplyHistory().then((response) => {
        var _a, _b;
        if (!('bulkReplyHistory' in response))
            return;
        return (_b = (_a = response === null || response === void 0 ? void 0 : response.bulkReplyHistory) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.filter((element) => (element === null || element === void 0 ? void 0 : element.batchActionId) === data.batchActionId);
    }).then((response) => {
        var _a, _b, _c, _d, _e, _f;
        const result = response === null || response === void 0 ? void 0 : response.map((val) => val === null || val === void 0 ? void 0 : val.batchActionItemByStatus);
        if (!result)
            return;
        continuousToast('sendingBulkReply', [data.totalInteractions], true, data.toastId);
        if ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.success) {
            const bulkReplySuccessToast = {
                type: 'success',
                messageKey: 'bulkReplySentSuccessfully',
                placeHolder: [(_b = result[0]) === null || _b === void 0 ? void 0 : _b.success],
            };
            bulkReplyToast(bulkReplySuccessToast);
        }
        if ((_c = result[0]) === null || _c === void 0 ? void 0 : _c.failure) {
            const bulkReplyFailureToast = {
                type: 'error',
                messageKey: 'unableToSendBulkReply',
                placeHolder: [(_d = result[0]) === null || _d === void 0 ? void 0 : _d.failure],
            };
            bulkReplyToast(bulkReplyFailureToast);
        }
        if ((_e = result[0]) === null || _e === void 0 ? void 0 : _e.scheduled) {
            const bulkReplyScheduledToast = {
                type: 'info',
                messageKey: 'scheduledBulkReply',
                placeHolder: [(_f = result[0]) === null || _f === void 0 ? void 0 : _f.scheduled],
            };
            bulkReplyToast(bulkReplyScheduledToast);
        }
    }).catch((error) => {
        logger.error('GetBulkReplyHistory', `Error while getting Bulk Reply History - ${JSON.stringify(error)}`);
    });
}));
/**
 * Reply to given Digital Contact(s)
 * @example - dispatch(sendBulkReplyDigital())
 */
export const sendBulkReplyDigital = createAsyncThunk('SendBulkReplyDigitalContact', (data, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _v;
    thunkAPI.dispatch(ccfDigitalSearchActions.updateSelectedRowContacts([])); // unselect the selected rows
    let batchActionId = '';
    const totalInteraction = (_v = data === null || data === void 0 ? void 0 : data.selectedContactIds) === null || _v === void 0 ? void 0 : _v.length;
    continuousToast('sendingBulkReply', [totalInteraction], false, data.toastId);
    yield cxoneDigitalClient.digitalContactManager.digitalContactService.sendBulkReply(data.selectedContactIds, data.messageContent, data.cxoneUserId).then((response) => {
        var _a, _b, _c;
        if (response && 'bulkReplyResponse' in response) {
            batchActionId = ((_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.bulkReplyResponse) === null || _a === void 0 ? void 0 : _a.job) === null || _b === void 0 ? void 0 : _b.details) === null || _c === void 0 ? void 0 : _c.batchActionId) || '';
            setTimeout(() => {
                thunkAPI.dispatch(getBulkReplyHistory({ batchActionId: batchActionId, totalInteractions: totalInteraction, toastId: data.toastId }));
            }, 1000);
        }
    }).catch((error) => {
        logger.error('SendBulkReplyDigitalContact', `Error while sending Bulk Reply - ${JSON.stringify(error)}`);
    });
}));
/**
 * Use to get the initial search data
 * if some data is stored in local storage then we will include it as the initial state data also
 * @returns - initial interaction search data
 * @example
 * ```
 * getInitialCcfInteractionSearchStat();
 * ```
 */
export const getInitialCcfDigitalSearchState = () => {
    var _a;
    const digitalSearchLS = (_a = LocalStorageHelper.getItem(DIGITAL_SEARCH, true)) !== null && _a !== void 0 ? _a : {};
    const searchTabNames = Object.values(SEARCH_TABS_LABEL); //TODO: this is hardcoded as of now, will be removed in next sprint with integration story'
    const searchTabs = {};
    searchTabNames.forEach(searchTab => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        searchTabs[searchTab] = {
            defaultColumns: ((_b = (_a = digitalSearchLS[searchTab]) === null || _a === void 0 ? void 0 : _a.defaultColumns) === null || _b === void 0 ? void 0 : _b.map((column) => ({ field: column.field, hide: column.hide }))) || [],
            gridData: [],
            totalRecords: 0,
            lastScrollToken: '',
            isLoading: false,
            currentSortColumn: ((_c = digitalSearchLS[searchTab]) === null || _c === void 0 ? void 0 : _c.currentSortColumn) || (searchTab === SEARCH_TABS_LABEL.THREADS ? { sortBy: THREADS_GRID_COLUMN.CREATED_AT, sortType: SortingType.DESCENDING } : { sorting: INTERACTION_GRID_COLUMN.CREATED_AT, sortingType: SortingType.DESCENDING }),
            customizeMenuElement: null,
            numberOfVisibleColumns: 6,
            selectedRowContacts: [],
            searchText: ((_d = digitalSearchLS[searchTab]) === null || _d === void 0 ? void 0 : _d.searchText) || '',
            query: ((_e = digitalSearchLS[searchTab]) === null || _e === void 0 ? void 0 : _e.searchText) || '',
            selectedRowContactsData: [],
            filtersMenuElement: null,
            defaultFilterValues: ((_f = digitalSearchLS[searchTab]) === null || _f === void 0 ? void 0 : _f.currentFilterValues) || initialDefaultFilterValues[searchTab],
            isGridReset: false,
            isFilterSelected: ((_g = digitalSearchLS[searchTab]) === null || _g === void 0 ? void 0 : _g.isFilterSelected) || false,
            currentCustomerContactInfo: {
                customerId: '',
                caseId: '',
                isCustomerCardPopupOpen: false,
            },
        };
        if (searchTab === SEARCH_TABS_LABEL.THREADS) {
            searchTabs[searchTab].pageLinks = initialPageLinks;
        }
        if (searchTab === SEARCH_TABS_LABEL.CUSTOMERS) {
            searchTabs[searchTab].currentSortColumn = ((_h = digitalSearchLS[searchTab]) === null || _h === void 0 ? void 0 : _h.currentSortColumn) || { sorting: CUSTOMERS_GRID_COLUMN.LAST_ACTIVITY, sortingType: SortingType.DESCENDING };
            searchTabs[searchTab].pageLinks = initialPageLinks;
        }
    });
    searchTabs[SEARCH_TABS_LABEL.INTERACTIONS].inputOptions = ['ownerAssignee IS', 'inboxAssignee IS', 'ownerAssignee=', 'inboxAssignee=', 'caseId=', 'threadId=', 'threadIdOnExternalPlatform=', 'content=', 'title=', 'status=', 'author=', 'customField[ident]=', 'customField[ident] !=', 'customField[ident] IN', 'customField[ident] NOT IN', 'customField[ident] < NUMBER', 'customField[ident] > NUMBER', 'AND', 'OR', 'inboxAssigneeAgentId=', 'inboxAssigneeAgentId IS', 'ownerAssigneeAgentId=', 'ownerAssigneeAgentId IS', 'skillId=', 'skillId IS', 'skillId IN', 'skillId NOT IN'];
    searchTabs[SEARCH_TABS_LABEL.MESSAGES].inputOptions = ['content=', 'messageDirection=', 'ipAddress=', 'threadldOnExternalPlatform=', 'AND', 'OR'];
    return {
        activeSearchTab: '',
        allChannelList: [],
        agentList: [],
        allowedTabs: [],
        allTags: [],
        tabs: searchTabs,
        interactionBulkLoading: {},
        skillList: [],
        selectedMessageId: '',
        bulkReplyMessage: '',
        bulkReplyTextAlignment: 'left',
    };
};
/**
*  Used to check filter is selected or not
* @param selectedFilters - selected filters
* @returns - true/ false
* @example -
* ```
*  isFilterSelected(selectedFilters)
*
* ```
* */
const isFilterSelected = (selectedFilters) => {
    const searchFilters = Object.values(DIGITAL_SEARCH_FILTERS).filter(filter => filter !== DIGITAL_SEARCH_FILTERS.AGENT && filter !== DIGITAL_SEARCH_FILTERS.SKILL);
    for (const [filterName, filterOptions] of Object.entries(selectedFilters)) {
        if (searchFilters.includes(filterName)) {
            // If the filter value is not empty and the type is an array, then will rely with its length. Otherwise, if it is not 'false', then it is selected. 
            if (filterOptions && (Array.isArray(filterOptions) ? filterOptions.length > 0 : (filterOptions !== 'false'))) {
                return true;
            }
        }
    }
    return false;
};
export const ccfDigitalSearchSlice = createSlice({
    name: CCF_DIGITAL_SEARCH_FEATURE_KEY,
    initialState: getInitialCcfDigitalSearchState(),
    reducers: {
        updateDefaultColumns: (state, action) => {
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { defaultColumns: action.payload }) }) });
        },
        updateGridData: (state, action) => {
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { gridData: action.payload.freshData
                            ? [...action.payload.newData]
                            : [...state.tabs[state.activeSearchTab].gridData, ...action.payload.newData] }) }) });
        },
        updateTotalRecords: (state, action) => {
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { totalRecords: action.payload }) }) });
        },
        updateQuery: (state, action) => {
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { query: action.payload }) }) });
        },
        updateLastScrollToken: (state, action) => {
            var _a;
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { lastScrollToken: (action === null || action === void 0 ? void 0 : action.payload) || ((_a = state.tabs[state.activeSearchTab]) === null || _a === void 0 ? void 0 : _a.lastScrollToken) }) }) });
        },
        updateSelectedMessageId: (state, action) => {
            return Object.assign(Object.assign({}, state), { selectedMessageId: action.payload });
        },
        updateIsLoading: (state, action) => {
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { isLoading: action.payload }) }) });
        },
        updateCurrentSortColumn: (state, action) => {
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { currentSortColumn: Object.assign({}, action.payload) }) }) });
        },
        updateCustomizeMenuElement: (state, action) => {
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { customizeMenuElement: action.payload }) }) });
        },
        updateFiltersMenuElement: (state, action) => {
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { filtersMenuElement: action.payload }) }) });
        },
        updateNumberOfVisibleColumns: (state, action) => {
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { numberOfVisibleColumns: action.payload }) }) });
        },
        updateDefaultVisibleColumns: (state, action) => {
            const newTabs = Object.assign({}, state.tabs);
            Object.keys(SEARCH_TABS_LABEL).forEach((key) => {
                const label = SEARCH_TABS_LABEL[key];
                newTabs[label] = Object.assign(Object.assign({}, state.tabs[label]), { numberOfVisibleColumns: action.payload.defaultColumnCount });
            });
            return Object.assign(Object.assign({}, state), { tabs: newTabs });
        },
        updateFilterValues: (state, action) => {
            var _a;
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { defaultFilterValues: Object.assign(Object.assign({}, (_a = state.tabs[state.activeSearchTab]) === null || _a === void 0 ? void 0 : _a.defaultFilterValues), { [action.payload.fieldName]: action.payload.filterValues }) }) }) });
        },
        resetTabState: (state, action) => {
            var _a, _b;
            const activeTabInitialState = Object.assign({}, (_b = (_a = getInitialCcfDigitalSearchState()) === null || _a === void 0 ? void 0 : _a.tabs) === null || _b === void 0 ? void 0 : _b[action.payload]);
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [action.payload]: Object.assign(Object.assign({}, activeTabInitialState), { numberOfVisibleColumns: state.tabs[action.payload].numberOfVisibleColumns }) }) });
        },
        setAgentList: (state, action) => {
            return Object.assign(Object.assign({}, state), { agentList: action.payload });
        },
        setSkillList: (state, action) => {
            return Object.assign(Object.assign({}, state), { skillList: action.payload });
        },
        updateSelectedRowContacts: (state, action) => {
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { selectedRowContacts: action.payload }) }) });
        },
        updateSelectedRowData: (state, action) => {
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { selectedRowContactsData: action.payload }) }) });
        },
        updateSearchText: (state, action) => {
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { searchText: action.payload }) }) });
        },
        clearFilterValues: (state) => {
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { defaultFilterValues: Object.assign({}, initialDefaultFilterValues[state.activeSearchTab]) }) }) });
        },
        setFilterValues: (state, action) => {
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { defaultFilterValues: action.payload }) }) });
        },
        setChannelsList: (state, action) => {
            return Object.assign(Object.assign({}, state), { allChannelList: action.payload });
        },
        setAllTags: (state, action) => {
            return Object.assign(Object.assign({}, state), { allTags: action.payload });
        },
        updateDigitalSearchToastObj: (state, action) => {
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { digitalSearchToastObj: action.payload }) }) });
        },
        updateIsGridReset: (state, action) => {
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { isGridReset: action.payload }) }) });
        },
        setcurrentCustomerContactInfo: (state, action) => {
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { currentCustomerContactInfo: Object.assign({}, action.payload) }) }) });
        },
        updateIsFilterSelected: (state, action) => {
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { isFilterSelected: action.payload }) }) });
        },
        updateAllowedTabs: (state, action) => {
            return Object.assign(Object.assign({}, state), { allowedTabs: action.payload });
        },
        updateActiveSearchTab: (state, action) => {
            return Object.assign(Object.assign({}, state), { activeSearchTab: action.payload });
        },
        updateInteractionBulkLoading: (state, action) => {
            return Object.assign(Object.assign({}, state), { interactionBulkLoading: action.payload });
        },
        updatePageLinks: (state, action) => {
            return Object.assign(Object.assign({}, state), { tabs: Object.assign(Object.assign({}, state.tabs), { [state.activeSearchTab]: Object.assign(Object.assign({}, state.tabs[state.activeSearchTab]), { pageLinks: Object.assign({}, action.payload) }) }) });
        },
        updateBulkReply: (state, action) => {
            return Object.assign(Object.assign({}, state), { bulkReplyMessage: action.payload });
        },
        updateTextAlignment: (state, action) => {
            return Object.assign(Object.assign({}, state), { bulkReplyTextAlignment: action.payload });
        },
    },
});
export const ccfDigitalSearchReducer = ccfDigitalSearchSlice.reducer;
export const ccfDigitalSearchActions = ccfDigitalSearchSlice.actions;
/**
 * USe to get the digital search state
 * @param rootState - digital state
 * @example
 * ```
 *  createSelector(getCcfDigitalSearchState, (state) => state.defaultColumns)
 * ```
 */
export const getCcfDigitalSearchState = (rootState) => rootState[CCF_DIGITAL_SEARCH_FEATURE_KEY];
export const getDefaultColumns = createSelector(getCcfDigitalSearchState, (state) => state.tabs[state.activeSearchTab].defaultColumns);
export const getGridData = createSelector(getCcfDigitalSearchState, (state) => { var _a; return (_a = state.tabs[state.activeSearchTab]) === null || _a === void 0 ? void 0 : _a.gridData; });
export const getTotalRecords = createSelector(getCcfDigitalSearchState, (state) => state.tabs[state.activeSearchTab].totalRecords);
export const getQuery = createSelector(getCcfDigitalSearchState, (state) => state.tabs[state.activeSearchTab].query);
export const getLastScrollToken = createSelector(getCcfDigitalSearchState, (state) => { var _a; return (_a = state.tabs[state.activeSearchTab]) === null || _a === void 0 ? void 0 : _a.lastScrollToken; });
export const getSelectedMessage = createSelector(getCcfDigitalSearchState, (state) => state === null || state === void 0 ? void 0 : state.selectedMessageId);
export const getIsLoading = createSelector(getCcfDigitalSearchState, (state) => { var _a; return (_a = state.tabs[state.activeSearchTab]) === null || _a === void 0 ? void 0 : _a.isLoading; });
export const getCurrentSortColumn = createSelector(getCcfDigitalSearchState, (state) => { var _a; return (_a = state.tabs[state.activeSearchTab]) === null || _a === void 0 ? void 0 : _a.currentSortColumn; });
export const getAgentListData = createSelector(getCcfDigitalSearchState, (state) => state.agentList);
export const fetchSkillListData = createSelector(getCcfDigitalSearchState, (state) => state.skillList);
export const getCustomizeMenuElement = createSelector(getCcfDigitalSearchState, (state) => { var _a; return (_a = state.tabs[state.activeSearchTab]) === null || _a === void 0 ? void 0 : _a.customizeMenuElement; });
export const getFiltersMenuElement = createSelector(getCcfDigitalSearchState, (state) => { var _a; return (_a = state.tabs[state.activeSearchTab]) === null || _a === void 0 ? void 0 : _a.filtersMenuElement; });
export const getNumberOfVisibleColumns = createSelector(getCcfDigitalSearchState, (state) => { var _a; return (_a = state.tabs[state.activeSearchTab]) === null || _a === void 0 ? void 0 : _a.numberOfVisibleColumns; });
export const getSelectedRowContacts = createSelector(getCcfDigitalSearchState, (state) => { var _a; return (_a = state.tabs[state.activeSearchTab]) === null || _a === void 0 ? void 0 : _a.selectedRowContacts; });
export const getSelectedContactStatus = createSelector(getCcfDigitalSearchState, (state) => { var _a; return (_a = state.tabs[state.activeSearchTab]) === null || _a === void 0 ? void 0 : _a.selectedRowContactsData; });
export const getSearchText = createSelector(getCcfDigitalSearchState, (state) => { var _a; return (_a = state.tabs[state.activeSearchTab]) === null || _a === void 0 ? void 0 : _a.searchText; });
export const getDefaultFilterValues = createSelector(getCcfDigitalSearchState, (state) => { var _a; return (_a = state.tabs[state.activeSearchTab]) === null || _a === void 0 ? void 0 : _a.defaultFilterValues; });
export const getAllChannelsData = createSelector(getCcfDigitalSearchState, (state) => state.allChannelList);
export const getTags = createSelector(getCcfDigitalSearchState, (state) => state.allTags);
export const getDigitalSearchToastObj = createSelector(getCcfDigitalSearchState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.tabs[state.activeSearchTab]) === null || _a === void 0 ? void 0 : _a.digitalSearchToastObj; });
export const getIsGridReset = createSelector(getCcfDigitalSearchState, (state) => { var _a; return (_a = state.tabs[state.activeSearchTab]) === null || _a === void 0 ? void 0 : _a.isGridReset; });
export const getGridColumnData = createSelector(getCcfDigitalSearchState, (state) => { var _a; return ((_a = state.tabs[state.activeSearchTab]) === null || _a === void 0 ? void 0 : _a.defaultColumns) || []; });
export const getcurrentCustomerContactInfo = createSelector(getCcfDigitalSearchState, (state) => { var _a; return (_a = state.tabs[state.activeSearchTab]) === null || _a === void 0 ? void 0 : _a.currentCustomerContactInfo; });
export const getIsFilterSelected = createSelector(getCcfDigitalSearchState, (state) => { var _a; return (_a = state.tabs[state.activeSearchTab]) === null || _a === void 0 ? void 0 : _a.isFilterSelected; });
export const getAllowedSearchTabs = createSelector(getCcfDigitalSearchState, (state) => state === null || state === void 0 ? void 0 : state.allowedTabs);
export const getActiveSearchTab = createSelector(getCcfDigitalSearchState, (state) => state === null || state === void 0 ? void 0 : state.activeSearchTab);
export const getInteractionBulkLoading = createSelector(getCcfDigitalSearchState, (state) => state === null || state === void 0 ? void 0 : state.interactionBulkLoading);
export const getInputOptions = createSelector(getCcfDigitalSearchState, (state) => { var _a; return (_a = state.tabs[state.activeSearchTab]) === null || _a === void 0 ? void 0 : _a.inputOptions; });
export const getPageLinks = createSelector(getCcfDigitalSearchState, (state) => { var _a; return (_a = state.tabs[state.activeSearchTab]) === null || _a === void 0 ? void 0 : _a.pageLinks; });
export const getInteractionBulkReplyMessage = createSelector(getCcfDigitalSearchState, (state) => state === null || state === void 0 ? void 0 : state.bulkReplyMessage);
export const getBulkReplyTextAlignment = createSelector(getCcfDigitalSearchState, (state) => state === null || state === void 0 ? void 0 : state.bulkReplyTextAlignment);
/**
 * get a value if the reply to specific message for channel
 * @param channelId - channel Id for which we need the flag
 * @returns booolean flag
 * @example getIfCanReplyToSpecificMessage(channel1)
 */
export const getIfCanReplyToSpecificMessage = (channelId) => {
    return createSelector(getCcfDigitalSearchState, (state) => {
        var _a;
        const channel = (_a = state === null || state === void 0 ? void 0 : state.allChannelList) === null || _a === void 0 ? void 0 : _a.find(channel => channel.id === channelId);
        return channel === null || channel === void 0 ? void 0 : channel.canReplyToAnyMessage;
    });
};
/**
 * Thunk action to update client data with search app settings.
 *
 * @param data - The data object containing search settings.
 * @param thunkAPI - The thunk API object.
 *
 * @returns - A promise that resolves when the client data is updated.
 *
 * @throws Will throw an error if there is an issue updating the client data.
 */
export const updateClientDataWithSearchAppSettings = createAsyncThunk('ccfInteractionSearch/updateClientDataWithSearchAppSettings', (data, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activeTab, tabSettings } = data;
        const { filterValues, columns, isFilterSelected, sorting } = tabSettings;
        if (activeTab === SEARCH_TABS_LABEL.INTERACTIONS) {
            // get client data from localstorage since the data is always available there
            const clientDataLocalStorage = LocalStorageHelper.getItem(StorageKeys.CLIENT_DATA, true);
            const clientData = new CXoneClientData();
            if (clientDataLocalStorage === null || clientDataLocalStorage === void 0 ? void 0 : clientDataLocalStorage.CxaSearchAppSettings) {
                clientData.setSearchData(clientDataLocalStorage === null || clientDataLocalStorage === void 0 ? void 0 : clientDataLocalStorage.CxaSearchAppSettings);
            }
            const cxaSearchAppSettings = convertInteractionsTabDataToSearchAppSettings({ filterValues: filterValues, isFilterSelected, columns, sorting }, clientData);
            if (cxaSearchAppSettings)
                thunkAPI.dispatch(updateClientDataSettings({ cxaSearchAppSettings }));
        }
    }
    catch (error) {
        logger.error('updateClientDataWithSearchAppSettings', 'Error while setting search app settings in clientData api - ' + JSON.stringify(error));
    }
}));
//# sourceMappingURL=ccf-digital-search.slice.js.map