import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { CoBrowseData } from '@nice-devone/common-sdk';
/**
 * method to update CoBrowseData In Local Storage
 * @example updateCoBrowseDataInLocalStorage('123', 'https://app.surfly-us.com/embed/start/?agent_token=sample_token');
 */
export const updateCoBrowseDataInLocalStorage = (caseId, coBrowseLink) => {
    const cobrowseData = LocalStorageHelper.getItem(StorageKeys.COBROWSE_DATA);
    if (cobrowseData.length > 0) {
        const parsedDataCoBrowse = JSON.parse(cobrowseData);
        const existingCardIndex = parsedDataCoBrowse.findIndex((data) => data.contactId === caseId);
        if (existingCardIndex !== -1) {
            parsedDataCoBrowse[existingCardIndex].url = coBrowseLink;
        }
        else {
            const newCoBrowseRecord = new CoBrowseData();
            newCoBrowseRecord.contactId = caseId;
            newCoBrowseRecord.url = coBrowseLink;
            parsedDataCoBrowse[parsedDataCoBrowse.length] = newCoBrowseRecord;
        }
        LocalStorageHelper.setItem(StorageKeys.COBROWSE_DATA, JSON.stringify(parsedDataCoBrowse));
    }
    else {
        const cbData = new CoBrowseData();
        cbData.contactId = caseId;
        cbData.url = coBrowseLink;
        LocalStorageHelper.setItem(StorageKeys.COBROWSE_DATA, JSON.stringify([cbData]));
    }
};
//# sourceMappingURL=coBrowse-util.js.map