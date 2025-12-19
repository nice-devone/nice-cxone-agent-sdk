import { __awaiter } from "tslib";
import { CXoneAuth } from '@nice-devone/auth-sdk';
import { CXoneSdkError, CXoneCaseArray, completedContactsArrayReponse, CXoneSdkErrorType, } from '@nice-devone/common-sdk';
import { HttpUtilService, Logger, HttpClient, ApiUriConstants, UrlUtilsService, LocalStorageHelper, StorageKeys, } from '@nice-devone/core-sdk';
import { mergeCustomerCardRequest } from './customer-card-merge';
import { createCustomerNote, deleteCustomerNote, editCustomerNote, fetchCustomerNotes, } from './customer-card-notes';
import { getCustomerList } from './customer-card-search';
import dayjs from 'dayjs';
/**
 * Enum for Customer Card Workflow Actions
 */
var workflowActions;
(function (workflowActions) {
    workflowActions["SEARCH"] = "search";
    workflowActions["DATAMEMORIALIZATION"] = "datamemorialization";
    workflowActions["TIMELINE"] = "timeline";
    workflowActions["RELATESTO"] = "relatesto";
    workflowActions["TRIGGER"] = "trigger";
})(workflowActions || (workflowActions = {}));
/**
 * Class to handle Customer Card API calls
 * */
export class CustomerCardService {
    /**
     * @example
     */
    constructor() {
        this.logger = new Logger('acd', 'Customer Card Service');
        this.utilService = new HttpUtilService();
        this.urlUtilsService = new UrlUtilsService();
        this.searchText = ''; // in store the current requested customer card search text
        this.customerSearchScrollToken = ''; // scrollToken to check if next pagination data is required or not
        this.EXECUTE_WORKFLOW_URI = '/InContactAPI/services/v27.0/agent-integration/configuration/{configurationId}/workflow/{workflowId}';
        this.DELETE_CUSTOMER_CUSTOM_FIELD = '/dfo/3.0/customers/{customerId}/custom-fields/{customFieldIdent}';
        this.GET_CRM_DATA_FOR_TRANSFERED_CONTACT = '/InContactAPI/services/v30.0/agent-integration/workflow-execution/interaction/{cacheKey}';
        this.generatePayloadForExecuteWorkFlow = (request) => {
            var _a;
            switch (((_a = request === null || request === void 0 ? void 0 : request.action) !== null && _a !== void 0 ? _a : '').toLowerCase()) {
                case 'search': {
                    return {
                        action: request === null || request === void 0 ? void 0 : request.action,
                        interactionID: request === null || request === void 0 ? void 0 : request.interactionID,
                        contactID: request === null || request === void 0 ? void 0 : request.contactID,
                        workflowInput: request === null || request === void 0 ? void 0 : request.workflowInput,
                        cacheKey: request === null || request === void 0 ? void 0 : request.cacheKey,
                        dynamicDataMappingId: request === null || request === void 0 ? void 0 : request.dynamicDataMappingId,
                    };
                }
                case workflowActions.TIMELINE: {
                    return {
                        action: request === null || request === void 0 ? void 0 : request.action,
                        cxoneContact: request === null || request === void 0 ? void 0 : request.cxoneContact,
                        integration: request === null || request === void 0 ? void 0 : request.integration,
                    };
                }
                case workflowActions.DATAMEMORIALIZATION: {
                    return {
                        action: request === null || request === void 0 ? void 0 : request.action,
                        interactionID: request === null || request === void 0 ? void 0 : request.interactionID,
                        contactID: request === null || request === void 0 ? void 0 : request.contactID,
                        dataMappingId: request === null || request === void 0 ? void 0 : request.dataMappingId,
                        cxoneContact: request === null || request === void 0 ? void 0 : request.cxoneContact,
                        integration: request === null || request === void 0 ? void 0 : request.integration,
                        workflowInput: request === null || request === void 0 ? void 0 : request.workflowInput,
                    };
                }
                case workflowActions.RELATESTO:
                    return {
                        action: request === null || request === void 0 ? void 0 : request.action,
                        entity: request === null || request === void 0 ? void 0 : request.entity,
                        entityId: request === null || request === void 0 ? void 0 : request.entityId,
                        relatedObject: request === null || request === void 0 ? void 0 : request.relatedObject,
                    };
                case workflowActions.TRIGGER:
                    return {
                        action: request === null || request === void 0 ? void 0 : request.action,
                        workflowInput: request === null || request === void 0 ? void 0 : request.workflowInput,
                    };
                default: {
                    return {};
                }
            }
            ;
        };
        this.auth = CXoneAuth.instance;
    }
    /**
     * Method to fetch custom field definition
     * @returns - API Returns Response JSON of Custom field definition
     * @example -
     */
    getCustomFieldsDefinitions() {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.GET_CUSTOM_FIELD_DEFINITIONS;
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json')
                .headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                this.logger.info('getCustomFieldsDefinitions', 'Customer card custom field definition fetch success');
                const resp = response.data;
                resolve(resp);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Customer card custom field definition fetch failed', error);
                this.logger.error('getCustomFieldsDefinitions', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to fetch Customer details by Full Name
     * @param Id - Customer Id of the Customer
     * @returns - API Returns Response JSON with specific Customer Details
     * @example -
     */
    getCustomerDetails(customerinfo) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const requiredAttributes = customerinfo;
        let url = baseUrl + ApiUriConstants.GET_CUSTOMER_DETAILS_BY_ID + '?query=';
        /**
         * Logic to create required URL from incoming parameter
         * required Attributes like Full Name , Name or Id
         */
        let Key;
        for (Key in requiredAttributes) {
            if (requiredAttributes[Key] !== '') {
                url = url + Key + '=' + requiredAttributes[Key];
            }
        }
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json')
                .headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                this.logger.info('getCustomerDetails', 'Customer details fetch success');
                const resp = response.data;
                resolve(resp.data);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Customer details fetch failed', error);
                this.logger.error('getCustomerDetails', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to fetch Customer details by Id
     * @param Id - Customer Id of the Customer
     * @returns - API Returns Response JSON with specific Customer Details
     * @example -
     */
    getCustomerDetailsById(customerId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.GET_CUSTOMER_DETAILS_BY_ID + '/' + encodeURIComponent(customerId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json')
                .headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                this.logger.info('getCustomerDetailsById', 'Customer details by id fetch success');
                const resp = response.data;
                resolve(resp);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Customer details by id fetch failed', error);
                this.logger.error('getCustomerDetailsById', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to update all custom fields
     * @returns - API Returns Response code with success or failure
     * @example -
     */
    updateCustomFields(customFields) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl +
            ApiUriConstants.UPDATE_CUSTOMER_CUSTOM_FIELD.replace('{customersId}', customFields.id ? encodeURIComponent(customFields.id) : '');
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json')
                .headers,
            body: customFields.customFields,
        };
        return new Promise((resolve, reject) => {
            HttpClient.put(url, reqInit).then((response) => {
                resolve(response);
            }, (error) => {
                reject(error);
            });
        });
    }
    /**
     * Method to delete linked custom field on customer card
     * @param customFields -  ident & customerId to delete identValue
     * @returns - API Returns Response code with success or failure
     * @example
     * ```
     * deleteCustomField({ ident: 'city', customerId: 'email_bharath@gmail.com' });
     * ```
     */
    deleteCustomField(customFields) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl +
            this.DELETE_CUSTOMER_CUSTOM_FIELD.replace('{customerId}', encodeURIComponent(customFields.customerId)).replace('{customFieldIdent}', customFields.ident);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json')
                .headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.delete(url, reqInit).then((response) => {
                resolve(response);
            }, (error) => {
                reject(error);
            });
        });
    }
    /**
     * Method to fetch Agent Digital Contact History
     * @returns - API Returns Digital contact History details for the Agent
     * @example - Pass 1 parameter ownerAssignee
     */
    getAgentDigitalContactHistory(ownerAssignee) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const toDate = dayjs();
        const fromDate = toDate.subtract(3, 'day');
        const url = `${baseUrl}${ApiUriConstants.GET_CONTACT_DETAILS_BY_ID}?ownerAssignee[]=${ownerAssignee}&status[]=resolved&status[]=closed&sorting=createdAt&sortingType=desc&date[from]=${fromDate.format('YYYY-MM-DD')}&date[to]=${toDate.format('YYYY-MM-DD')}`;
        const targetStatus = {
            // eslint-disable-next-line no-restricted-globals
            status: status,
        };
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body: targetStatus,
        };
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                var _a;
                this.logger.info('getAgentDigitalContactHistory', 'Digital contact history details fetch success');
                if ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data) {
                    let validatedResponse = CXoneCaseArray.cast(response.data.data, {
                        stripUnknown: true,
                    });
                    //make first letter to uppercase (resolved -> Resolved)
                    validatedResponse = validatedResponse.map((item) => {
                        item.status = item.status.charAt(0).toUpperCase() + item.status.slice(1);
                        return item;
                    });
                    resolve(validatedResponse);
                }
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Digital contact history details fetch failed', error);
                this.logger.error('getAgentDigitalContactHistory', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to fetch Agent Contact History
     * @returns - API Returns contact History details for the Agent
     * @example - Pass 2 parameter inboxAssignee & updatedSinceHours for fetching
     * contact history for particular days span.
     */
    getAgentVoiceContactHistory(contactHistoryRequest) {
        const baseUrl = this.auth.getCXoneConfig().acdApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const queryParams = [
            `startDate=${contactHistoryRequest.startDate}`,
            `endDate=${contactHistoryRequest.endDate}`,
            `agentId=${contactHistoryRequest.agentId}`
        ];
        // optional params
        ['top', 'skip', 'orderby'].forEach(paramName => {
            const paramValue = contactHistoryRequest[paramName];
            if (paramValue) {
                queryParams.push(`${paramName}=${paramValue}`);
            }
        });
        const url = baseUrl
            + ApiUriConstants.GET_AGENT_VOICE_CONTACT_HISTORY
            + `?${queryParams.join('&')}`;
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json')
                .headers,
            body: contactHistoryRequest,
        };
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                this.logger.info('getAgentVoiceContactHistory', 'ACD contact history details fetch success');
                const validatedResponse = completedContactsArrayReponse.validateSync(response.data.completedContacts, {
                    stripUnknown: true,
                });
                if (validatedResponse) {
                    validatedResponse.sort((first, second) => {
                        if (first.lastUpdateTime && second.lastUpdateTime) {
                            return (new Date(second === null || second === void 0 ? void 0 : second.lastUpdateTime).getTime() -
                                new Date(first === null || first === void 0 ? void 0 : first.lastUpdateTime).getTime());
                        }
                        else {
                            return 0;
                        }
                    });
                }
                resolve(validatedResponse);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'ACD contact history details fetch failed', error);
                this.logger.error('getAgentVoiceContactHistory', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to get in CRM workflow response
     * @returns - API Returns CRM data for payload
     * @example - CRM data from workflow.
     */
    executeWorkFlow(crmRequest) {
        const baseUrl = this.auth.getCXoneConfig().acdApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const workflowId = (crmRequest === null || crmRequest === void 0 ? void 0 : crmRequest.workflowId) ? crmRequest === null || crmRequest === void 0 ? void 0 : crmRequest.workflowId.trim() : '';
        const configurationId = (crmRequest === null || crmRequest === void 0 ? void 0 : crmRequest.configurationId) ? crmRequest === null || crmRequest === void 0 ? void 0 : crmRequest.configurationId.trim() : '';
        const payload = this.generatePayloadForExecuteWorkFlow(crmRequest);
        const url = baseUrl +
            this.EXECUTE_WORKFLOW_URI.replace('{workflowId}', workflowId.trim()).replace('{configurationId}', configurationId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json')
                .headers,
            body: payload,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                this.logger.info('executeWorkFlow', 'CRM search execute workflow response success');
                const resp = response === null || response === void 0 ? void 0 : response.data;
                //in records or related data, if we receive dynamic data field value other than string then we will not display that field
                if (resp && (resp === null || resp === void 0 ? void 0 : resp.result) && ((_b = (_a = resp === null || resp === void 0 ? void 0 : resp.result[0]) === null || _a === void 0 ? void 0 : _a.records) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                    (_d = (_c = resp === null || resp === void 0 ? void 0 : resp.result[0]) === null || _c === void 0 ? void 0 : _c.records) === null || _d === void 0 ? void 0 : _d.forEach((item) => {
                        var _a, _b, _c;
                        const newFields = (_a = item === null || item === void 0 ? void 0 : item.fields) === null || _a === void 0 ? void 0 : _a.filter((field) => {
                            return typeof (field === null || field === void 0 ? void 0 : field.value) === 'string';
                        });
                        item.fields = newFields;
                        if (((_b = item === null || item === void 0 ? void 0 : item.related) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                            (_c = item === null || item === void 0 ? void 0 : item.related) === null || _c === void 0 ? void 0 : _c.forEach((field) => {
                                var _a;
                                const newDynamicFields = (_a = field === null || field === void 0 ? void 0 : field.fields) === null || _a === void 0 ? void 0 : _a.filter((fieldValue) => {
                                    return typeof (fieldValue === null || fieldValue === void 0 ? void 0 : fieldValue.value) === 'string';
                                });
                                field.fields = newDynamicFields;
                            });
                        }
                    });
                }
                // Dev Note : We receive pin records from elastic cache, once ETL expires for cache we need to maintian/retain the values for pin records.
                if (resp && (resp === null || resp === void 0 ? void 0 : resp.result) && !((_e = resp === null || resp === void 0 ? void 0 : resp.result[0]) === null || _e === void 0 ? void 0 : _e.pinRecords)) {
                    const agentWorkflowPinRecordsDetails = LocalStorageHelper.getItem(StorageKeys.CRM_PIN_RECORDS, true) || [];
                    const ifDataAvailable = agentWorkflowPinRecordsDetails.some((item) => {
                        return (item === null || item === void 0 ? void 0 : item.contactId) === (crmRequest === null || crmRequest === void 0 ? void 0 : crmRequest.contactID);
                    });
                    const pinRecordsData = agentWorkflowPinRecordsDetails.filter((item) => {
                        return (item === null || item === void 0 ? void 0 : item.contactId) === (crmRequest === null || crmRequest === void 0 ? void 0 : crmRequest.contactID);
                    });
                    if (ifDataAvailable) {
                        resp.result[0].pinRecords = pinRecordsData[0].pinRecords;
                    }
                }
                // Dev Note - Below code is for excluding the values other than string type
                if (resp && (resp === null || resp === void 0 ? void 0 : resp.result) && ((_g = (_f = resp === null || resp === void 0 ? void 0 : resp.result[0]) === null || _f === void 0 ? void 0 : _f.pinRecords) === null || _g === void 0 ? void 0 : _g.length) > 0) {
                    resp.result[0].pinRecords = (_j = (_h = resp === null || resp === void 0 ? void 0 : resp.result[0]) === null || _h === void 0 ? void 0 : _h.pinRecords) === null || _j === void 0 ? void 0 : _j.map((pinRecords) => (Object.assign(Object.assign({}, pinRecords), { linked: 'true' })));
                    (_k = resp.result[0].pinRecords) === null || _k === void 0 ? void 0 : _k.forEach((item) => {
                        var _a;
                        const newFields = (_a = item === null || item === void 0 ? void 0 : item.fields) === null || _a === void 0 ? void 0 : _a.filter((field) => {
                            return typeof (field === null || field === void 0 ? void 0 : field.value) === 'string';
                        });
                        item.fields = newFields;
                    });
                    //#region NOTE : Pinned Records - Local Storage
                    const agentWorkflowPinRecordsDetails = LocalStorageHelper.getItem(StorageKeys.CRM_PIN_RECORDS, true) || [];
                    if (agentWorkflowPinRecordsDetails.length >= 0) {
                        const ifDataAvailable = agentWorkflowPinRecordsDetails.some((item) => {
                            return (item === null || item === void 0 ? void 0 : item.contactId) === (crmRequest === null || crmRequest === void 0 ? void 0 : crmRequest.contactID);
                        });
                        !ifDataAvailable && agentWorkflowPinRecordsDetails.push({ contactId: crmRequest === null || crmRequest === void 0 ? void 0 : crmRequest.contactID, pinRecords: (_l = resp === null || resp === void 0 ? void 0 : resp.result[0]) === null || _l === void 0 ? void 0 : _l.pinRecords });
                    }
                    LocalStorageHelper.setItem(StorageKeys.CRM_PIN_RECORDS, agentWorkflowPinRecordsDetails);
                    //#endregion
                }
                ;
                resolve(resp);
            }), (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'CRM search execute workflow response failed', error);
                this.logger.error('executeWorkFlow', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to create a new record in CRM in Tray
     * @param crmRequest - type of CXoneWorkflowCreateRequest
     * @returns - API Returns Response JSON with created record and status
     * @example - createRecord(\{action: 'search', interactionId: '1234', workflowInput: 'test'\})
     */
    executeCreateWorkFlow(crmRequest) {
        var _a, _b, _c, _d, _e, _f;
        const baseUrl = ((_a = this.auth.getCXoneConfig()) !== null && _a !== void 0 ? _a : {}).acdApiBaseUri;
        const authToken = ((_b = this.auth.getAuthToken()) !== null && _b !== void 0 ? _b : {}).accessToken;
        const payload = {
            action: crmRequest === null || crmRequest === void 0 ? void 0 : crmRequest.action,
            interactionId: crmRequest === null || crmRequest === void 0 ? void 0 : crmRequest.interactionId,
            workflowInput: crmRequest === null || crmRequest === void 0 ? void 0 : crmRequest.workflowInput,
        };
        const url = baseUrl +
            this.EXECUTE_WORKFLOW_URI.replace('{workflowId}', ((_c = crmRequest === null || crmRequest === void 0 ? void 0 : crmRequest.workflowId) !== null && _c !== void 0 ? _c : '').trim()).replace('{configurationId}', ((_d = crmRequest === null || crmRequest === void 0 ? void 0 : crmRequest.configurationId) !== null && _d !== void 0 ? _d : '').trim());
        const reqInit = {
            headers: (_f = ((_e = this.utilService.initHeader(authToken, 'application/json')) !== null && _e !== void 0 ? _e : {})) === null || _f === void 0 ? void 0 : _f.headers,
            body: payload,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                this.logger.info('executeCreateWorkFlow', 'CRM create execute workflow create record success');
                resolve(Object.assign(Object.assign({}, ((_a = response === null || response === void 0 ? void 0 : response.data) !== null && _a !== void 0 ? _a : {})), { status: response === null || response === void 0 ? void 0 : response.status, statusText: response === null || response === void 0 ? void 0 : response.statusText }));
            }), (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'CRM search execute create workflow response failed', error);
                this.logger.error('executeCreateWorkFlow', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Wrapper method used to call mergeCustomerCard() method
     * @example - mergeCustomerCard(\{currentCustomerId: 'asdafaf', customerIdToMerge: 'chat_dasfasf'\})
     */
    mergeCustomerCard(cxoneMergeCustomerCardArguments) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const mergeCustomerCardUrl = baseUrl +
            ApiUriConstants.MERGE_CUSTOMER_CARD_BY_ID.replace('{customerId}', cxoneMergeCustomerCardArguments.currentCustomerId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json')
                .headers,
            body: {
                customerToMerge: {
                    id: cxoneMergeCustomerCardArguments.customerToMergeId,
                },
            },
        };
        return mergeCustomerCardRequest(mergeCustomerCardUrl, reqInit);
    }
    /**
     * Used to check if the current request is a new search request or the already searched request
     * @param newSearchText - search string
     * @returns boolean stating if true that means its a new search request
     */
    isNewSearchRequest(newSearchText) {
        return this.searchText !== newSearchText;
    }
    /**
     * Method to search customers by Full Name
     * @param searchedText - search field text to search details of the customer
     * @returns - API Returns Response JSON with searched customer list
     * @example - searchCustomer(John Doe)
     */
    searchCustomer(searchedText, externalIds, scrollToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const isNewCustomerSearch = this.isNewSearchRequest(searchedText);
            this.searchText = searchedText || '';
            const scrollTokenPayload = !isNewCustomerSearch && scrollToken !== '' ? scrollToken : undefined;
            const searchedCustomerData = yield getCustomerList(searchedText, externalIds, scrollTokenPayload);
            return searchedCustomerData;
        });
    }
    /**
     * Method to fetch Customer details by Id
     * @param Id - Customer Id of the Customer
     * @returns - API Returns Response JSON with list of Customer Notes
     * @example -
     */
    getCustomerNotesById({ customerId, currentPageIndex }) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
            const authToken = this.auth.getAuthToken().accessToken;
            const getCustomerNotesUrl = baseUrl +
                ApiUriConstants.GET_CREATE_CUSTOMER_NOTE.replace('{customerId}', encodeURIComponent(customerId))
                + `?page=${currentPageIndex}`;
            const reqInit = {
                headers: this.utilService.initHeader(authToken, 'application/json')
                    .headers,
            };
            return fetchCustomerNotes(getCustomerNotesUrl, reqInit);
        });
    }
    /**
     * Method to create a Customer note in customer card
     * @param Id - Customer Id of the Customer and content of note
     * @returns - API Returns Response JSON with created note object
     * @example -
     */
    createNewCustomerNote(customerId, note) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const createCustomerNotesUrl = baseUrl +
            ApiUriConstants.GET_CREATE_CUSTOMER_NOTE.replace('{customerId}', encodeURIComponent(customerId));
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json')
                .headers,
            body: {
                content: note,
            },
        };
        return createCustomerNote(createCustomerNotesUrl, reqInit);
    }
    /**
     * Method to delete a Customer note in customer card
     * @param Id - Customer Id of the Customer and noteId of note
     * @returns - API Returns Response JSON with deleted empty note object
     * @example -
     */
    deleteCustomerNoteByNoteId(customerId, noteId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const deleteNoteUrl = baseUrl +
            ApiUriConstants.UPDATE_DELETE_CUSTOMER_NOTE.replace('{customerId}', encodeURIComponent(customerId)).replace('{noteId}', noteId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json')
                .headers,
        };
        return deleteCustomerNote(deleteNoteUrl, reqInit);
    }
    /**
     * Method to edit a Customer note in customer card
     * @param Id - Customer Id of the Customer, noteId and content of note
     * @returns - API Returns Response JSON with updated note object
     * @example -
     */
    editCustomerNoteByNoteId(customerId, noteId, note) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const updateNoteUrl = baseUrl +
            ApiUriConstants.UPDATE_DELETE_CUSTOMER_NOTE.replace('{customerId}', encodeURIComponent(customerId)).replace('{noteId}', noteId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json')
                .headers,
            body: {
                content: note,
            },
        };
        return editCustomerNote(updateNoteUrl, reqInit);
    }
    /**
     * Method to get the CRM data for transfered contact
     * @param crmInteractionId - CRM record interaction id
     * @example
     * @returns - API Returns Response JSON with CRM data for transfered contact
     */
    getCRMDataForTransferedContact(crmInteractionId) {
        const baseUrl = this.auth.getCXoneConfig().acdApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json')
                .headers,
        };
        const url = baseUrl +
            this.GET_CRM_DATA_FOR_TRANSFERED_CONTACT.replace('{cacheKey}', crmInteractionId);
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((resp) => {
                this.logger.info('getCRMDataForTransferedContact', 'Get CRM data for transfered contact success');
                resolve(resp.data);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to get CRM data for transferred contact', error);
                this.logger.error('getCRMDataForTransferedContact', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to keep alive cacheKey
     * @param crmInteractionId - CRM record interaction id
     * @example getCRMDataForTransferedContactFromPolling(crmInteractionId)
     */
    getCRMDataForTransferedContactFromPolling(crmInteractionId) {
        const baseUrl = this.auth.getCXoneConfig().acdApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json')
                .headers,
            body: {
                keepAlive: true,
            },
        };
        const url = baseUrl +
            this.GET_CRM_DATA_FOR_TRANSFERED_CONTACT.replace('{cacheKey}', crmInteractionId);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((resp) => {
                resolve(resp.data);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to get CRM data for transferred contact from polling', error);
                this.logger.error('getCRMDataForTransferedContactFromPolling', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to fetch livevox uuid for enhanced customer card
     * @returns - API Returns Response JSON with UUID as string value
     * @example -
     */
    invokeECCService(ECCPayload) {
        var _a, _b, _c, _d, _e, _f;
        const baseUrl = (_b = ((_a = this.auth.getCXoneConfig()) !== null && _a !== void 0 ? _a : {})) === null || _b === void 0 ? void 0 : _b.acdApiBaseUri;
        const authToken = (_d = ((_c = this.auth.getAuthToken()) !== null && _c !== void 0 ? _c : {})) === null || _d === void 0 ? void 0 : _d.accessToken;
        const payloadData = {
            tenantId: ECCPayload === null || ECCPayload === void 0 ? void 0 : ECCPayload.tenantId,
            saveTranscript: ECCPayload === null || ECCPayload === void 0 ? void 0 : ECCPayload.saveTranscript,
            payload: ECCPayload === null || ECCPayload === void 0 ? void 0 : ECCPayload.payload,
            customerId: ECCPayload === null || ECCPayload === void 0 ? void 0 : ECCPayload.customerId,
        };
        const url = baseUrl +
            ApiUriConstants.ENHANCED_CUSTOMER_CARD;
        const reqInit = {
            headers: (_f = ((_e = this.utilService.initHeader(authToken, 'application/json')) !== null && _e !== void 0 ? _e : {})) === null || _f === void 0 ? void 0 : _f.headers,
            body: payloadData,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                this.logger.info('ecc lambda call', 'ECC lambda call success');
                resolve(Object.assign(Object.assign({}, ((_a = response === null || response === void 0 ? void 0 : response.data) !== null && _a !== void 0 ? _a : {})), { status: response === null || response === void 0 ? void 0 : response.status, interactionId: ((_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.data) ? (_d = (_c = response === null || response === void 0 ? void 0 : response.data) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.interactionId : '' }));
            }), (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'ecc lambda call failed', error);
                this.logger.error('ecc lambda call', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
}
//# sourceMappingURL=customer-card-service.js.map