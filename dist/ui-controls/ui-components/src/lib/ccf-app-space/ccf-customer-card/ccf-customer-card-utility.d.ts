/**
 * function to get agent workflow details from LS
 * @param keysToFetchFromLS - key of item (e.g : StrorageKeys.CUSTOMEVENT_DATA)
 * @example getAgentWorkflowDetailsFromLS([StorageKeys.CUSTOMEVENT_DATA, StorageKeys.CRM_PIN_RECORDS])
 * @returns returns the data which is stored in LS
 */
export declare function getAgentWorkflowDetailsFromLS(keysToFetchFromLS: string[]): any;
