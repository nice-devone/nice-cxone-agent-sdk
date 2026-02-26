import { LocalStorageHelper } from '@nice-devone/core-sdk';
/**
 * function to get agent workflow details from LS
 * @param keysToFetchFromLS - key of item (e.g : StrorageKeys.CUSTOMEVENT_DATA)
 * @example getAgentWorkflowDetailsFromLS([StorageKeys.CUSTOMEVENT_DATA, StorageKeys.CRM_PIN_RECORDS])
 * @returns returns the data which is stored in LS
 */
export function getAgentWorkflowDetailsFromLS(keysToFetchFromLS) {
    const agentWorkflowDetails = {};
    keysToFetchFromLS.forEach((key) => {
        agentWorkflowDetails[key] = LocalStorageHelper.getItem(key, true) || [];
    });
    return agentWorkflowDetails;
}
//# sourceMappingURL=ccf-customer-card-utility.js.map