import { CXoneCustomerCardCustomFields, CXoneCustomerDetails, CXoneCustomerDetailRequest, HttpResponse, CustomField, CXoneSdkError, CXoneCustomerDetail, CXoneAgentVoiceContactHistoryRequest, CXoneCase, agentCompletedContactsResponse, AgentWorkflowResponseEvent, CXoneMergeCustomerCardArguments, CXoneCustomerList, CXoneWorkflowRequest, CXoneDeleteCustomField } from '@nice-devone/common-sdk';
import { HttpUtilService, Logger } from '@nice-devone/core-sdk';
/**
 * Class to handle Customer Card API calls
 * */
export declare class CustomerCardService {
    logger: Logger;
    protected utilService: HttpUtilService;
    private urlUtilsService;
    private auth;
    private searchText;
    private customerSearchScrollToken;
    private EXECUTE_WORKFLOW_URI;
    private DELETE_CUSTOMER_CUSTOM_FIELD;
    private GET_CRM_DATA_FOR_TRANSFERED_CONTACT;
    /**
     * @example
     */
    constructor();
    /**
     * Method to fetch custom field definition
     * @returns - API Returns Response JSON of Custom field definition
     * @example -
     */
    getCustomFieldsDefinitions(): Promise<CXoneCustomerCardCustomFields>;
    /**
     * Method to fetch Customer details by Full Name
     * @param Id - Customer Id of the Customer
     * @returns - API Returns Response JSON with specific Customer Details
     * @example -
     */
    getCustomerDetails(customerinfo: CXoneCustomerDetailRequest): Promise<CXoneCustomerDetails>;
    /**
     * Method to fetch Customer details by Id
     * @param Id - Customer Id of the Customer
     * @returns - API Returns Response JSON with specific Customer Details
     * @example -
     */
    getCustomerDetailsById(customerId: string): Promise<CXoneCustomerDetail>;
    /**
     * Method to update all custom fields
     * @returns - API Returns Response code with success or failure
     * @example -
     */
    updateCustomFields(customFields: CustomField): Promise<HttpResponse>;
    /**
     * Method to delete linked custom field on customer card
     * @param customFields -  ident & customerId to delete identValue
     * @returns - API Returns Response code with success or failure
     * @example
     * ```
     * deleteCustomField({ ident: 'city', customerId: 'email_bharath@gmail.com' });
     * ```
     */
    deleteCustomField(customFields: CXoneDeleteCustomField): Promise<HttpResponse>;
    /**
     * Method to fetch Agent Digital Contact History
     * @returns - API Returns Digital contact History details for the Agent
     * @example - Pass 1 parameter ownerAssignee
     */
    getAgentDigitalContactHistory(ownerAssignee: string): Promise<Array<CXoneCase>>;
    /**
     * Method to fetch Agent Contact History
     * @returns - API Returns contact History details for the Agent
     * @example - Pass 2 parameter inboxAssignee & updatedSinceHours for fetching
     * contact history for particular days span.
     */
    getAgentVoiceContactHistory(contactHistoryRequest: CXoneAgentVoiceContactHistoryRequest): Promise<Array<agentCompletedContactsResponse>>;
    /**
     * Method to get in CRM workflow response
     * @returns - API Returns CRM data for payload
     * @example - CRM data from workflow.
     */
    executeWorkFlow(crmRequest: CXoneWorkflowRequest): Promise<AgentWorkflowResponseEvent>;
    /**
     * Wrapper method used to call mergeCustomerCard() method
     * @example - mergeCustomerCard(\{currentCustomerId: 'asdafaf', customerIdToMerge: 'chat_dasfasf'\})
     */
    mergeCustomerCard(cxoneMergeCustomerCardArguments: CXoneMergeCustomerCardArguments): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Used to check if the current request is a new search request or the already searched request
     * @param newSearchText - search string
     * @returns boolean stating if true that means its a new search request
     */
    private isNewSearchRequest;
    /**
     * Method to search customers by Full Name
     * @param searchedText - search field text to search details of the customer
     * @returns - API Returns Response JSON with searched customer list
     * @example - searchCustomer(John Doe)
     */
    searchCustomer(searchedText: string, externalIds: string[], scrollToken?: string): Promise<CXoneCustomerList>;
    /**
     * Method to fetch Customer details by Id
     * @param Id - Customer Id of the Customer
     * @returns - API Returns Response JSON with list of Customer Notes
     * @example -
     */
    getCustomerNotesById({ customerId, currentPageIndex }: {
        customerId: string;
        currentPageIndex: number;
    }): Promise<import("@nice-devone/common-sdk").CustomerCardNoteResponse>;
    /**
     * Method to create a Customer note in customer card
     * @param Id - Customer Id of the Customer and content of note
     * @returns - API Returns Response JSON with created note object
     * @example -
     */
    createNewCustomerNote(customerId: string, note: string): Promise<CXoneSdkError | import("@nice-devone/common-sdk").CustomerCardNote>;
    /**
     * Method to delete a Customer note in customer card
     * @param Id - Customer Id of the Customer and noteId of note
     * @returns - API Returns Response JSON with deleted empty note object
     * @example -
     */
    deleteCustomerNoteByNoteId(customerId: string, noteId: string): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to edit a Customer note in customer card
     * @param Id - Customer Id of the Customer, noteId and content of note
     * @returns - API Returns Response JSON with updated note object
     * @example -
     */
    editCustomerNoteByNoteId(customerId: string, noteId: string, note: string): Promise<CXoneSdkError | import("@nice-devone/common-sdk").CustomerCardNote>;
    /**
     * Method to get the CRM data for transfered contact
     * @param crmInteractionId - CRM record interaction id
     * @example
     * @returns - API Returns Response JSON with CRM data for transfered contact
     */
    getCRMDataForTransferedContact(crmInteractionId: string): Promise<unknown>;
    /**
     * Method to keep alive cacheKey
     * @param crmInteractionId - CRM record interaction id
     * @example getCRMDataForTransferedContactFromPolling(crmInteractionId)
     */
    getCRMDataForTransferedContactFromPolling(crmInteractionId: string): Promise<unknown>;
}
