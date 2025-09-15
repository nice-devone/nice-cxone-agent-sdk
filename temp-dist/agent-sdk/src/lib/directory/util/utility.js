import { __awaiter } from "tslib";
import { CXoneClient } from '../../cxone-client';
import { FeatureToggleService } from '../../feature-toggle';
import { LocalStorageHelper, Logger, StorageKeys } from '@nice-devone/core-sdk';
/**
* Method to filter, sort and truncate data based on searchText, offset and Limit
*
* @param filter - provides all the parameter to perform search
* @returns - filtered array
* @example -
* ```
* DirectorySearchFilter(filter)
* ```
*/
export const DirectorySearchFilter = (filter) => {
    let finalResult = [];
    const { searchText, data, filterType, mediaTypeIds, limit, offset, isOutbound } = filter;
    finalResult = filterDirectoryData(data, filterType, searchText, mediaTypeIds, isOutbound);
    finalResult = sortDirectoryData(finalResult, filterType, searchText);
    const totalSearchResultCount = (finalResult === null || finalResult === void 0 ? void 0 : finalResult.length) || 0;
    finalResult = handleDirectoryPagination(finalResult, limit, offset);
    return [finalResult, totalSearchResultCount];
};
/**
* Method to filter data on the basis of search string, offset and limit
*
* @param data - data on which we want to search
* @param filterType - filter type
* @param searchText - search string entered by user
* @param mediaTypeId - media type for skills
* @param isOutbound - is outbound flag for skills
* @returns - filtered array
* @example -
* ```
* filterDirectoryData(data,filtertype, searchText)
* ```
*/
const filterDirectoryData = (data, filterType, searchText, mediaTypeIds, isOutbound) => {
    let filteredData = [];
    searchText = searchText === null || searchText === void 0 ? void 0 : searchText.toUpperCase();
    if (data === null || data === void 0 ? void 0 : data.length) {
        filteredData = data.filter((item) => {
            let isFound = searchText ? item[filterType].toUpperCase().includes(searchText) : true;
            if (filterType === 'skillName' && isFound && mediaTypeIds) {
                isFound = item.isActive && (mediaTypeIds.includes(item.mediaTypeId) || mediaTypeIds.includes(item.mediaType));
                if (isFound && isOutbound !== undefined) {
                    isFound = item.isOutbound === isOutbound;
                }
            }
            return isFound;
        });
    }
    return filteredData;
};
/**
* Method to sort data Alphabetically and then on position of searchText (If present).
*
* @param data - data to sort
* @param filterType - filter type
* @param searchText - search string entered by user to sort Data based on position of search term
* @returns - sorted array
* @example -
* ```
* sortDirectoryData(data, filterType, searchText)
* ```
*/
const sortDirectoryData = (data, filterType, searchText) => {
    let sortedData;
    if (data === null || data === void 0 ? void 0 : data.length) {
        sortedData = data.sort((itemA, itemB) => {
            return itemA[filterType].localeCompare(itemB[filterType]);
        });
        if (searchText === null || searchText === void 0 ? void 0 : searchText.length) {
            searchText = searchText.toUpperCase();
            sortedData = sortedData.sort((itemA, itemB) => {
                const itemAindex = itemA[filterType].toUpperCase().indexOf(searchText);
                const itemBindex = itemB[filterType].toUpperCase().indexOf(searchText);
                return itemAindex - itemBindex;
            });
        }
    }
    else {
        sortedData = [];
    }
    return sortedData;
};
/**
* Method to handle pagination based on offset and limit
*
* @param data - complete data
* @param limit - used in case of pagination
* @param offset - used in case of pagination
* @example -
* ```
* handleDirectoryPagination(data, limit, offset)
* ```
*/
const handleDirectoryPagination = (data, limit, offset) => {
    const isFavoritesFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-favorites-AW-40314" /* FeatureToggles.CXA_FAVORITES_FEATURE_TOGGLE */);
    if (isFavoritesFTEnabled && offset && offset > 0 && limit && limit > 0) {
        return data === null || data === void 0 ? void 0 : data.slice(offset - 1, offset + limit - 1);
    }
    else if (!isFavoritesFTEnabled && offset && limit) {
        return data === null || data === void 0 ? void 0 : data.slice(offset - 1, offset + limit - 1);
    }
    return data;
};
/**
 * Updates the favorite list in local storage client data when entries are removed from the userhub, typically during login/logout.
 * @param options - Options for handling directory item deletion:
 *   - listFromDB: List of items from the database.
 *   - idName: The key name for the item's ID.
 *   - favClientList: Favorite client list from local storage.
 *   - storageKey: Local storage key to update.
 *   - clientDataKey: Key in client data to update.
 *   - checkForActive: Flag to filter out inactive items (default: true).
 * @returns An object containing the updated favorite list and a flag indicating if the client data API call failed.
 * @example
 * ```
 * handleDirectoryItemDeletion({
 *   listFromDB,
 *   idName: 'id',
 *   favClientList,
 *   storageKey: 'favoriteList',
 *   clientDataKey: 'favoriteList',
 *   checkForActive: true
 * })
 * ```
 */
export function handleDirectoryItemDeletion(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let { listFromDB, } = options;
        const { idName, favClientList, storageKey, clientDataKey, checkForActive = true } = options;
        if (checkForActive) {
            listFromDB = listFromDB.filter(item => item.isActive);
        }
        const listFromDBIds = new Set(listFromDB.map(item => item[idName])) || new Set();
        const filteredClientData = favClientList.filter(item => listFromDBIds.has(item)) || [];
        const noDirectoryItemDeleted = Array.isArray(filteredClientData) &&
            Array.isArray(favClientList) &&
            filteredClientData.length === favClientList.length &&
            filteredClientData.every((val, idx) => val === favClientList[idx]);
        let clientDataApiFailed = false;
        if (!noDirectoryItemDeleted) {
            const clientData = LocalStorageHelper.getItem(StorageKeys.CLIENT_DATA, true);
            LocalStorageHelper.setItem(StorageKeys.CLIENT_DATA, Object.assign(Object.assign({}, clientData), { [clientDataKey]: filteredClientData }));
            try {
                yield CXoneClient.instance.agentSetting.updateAgentClientDataSettings({
                    [storageKey]: filteredClientData,
                });
            }
            catch (error) {
                LocalStorageHelper.setItem(StorageKeys.CLIENT_DATA, Object.assign(Object.assign({}, clientData), { [clientDataKey]: favClientList }));
                clientDataApiFailed = true;
                const logger = new Logger('SDK', 'CXoneDirectoryProvider');
                logger.debug('[CXoneDirectoryProvider][updateFavoriteListInLocalStorage]', `Error updating favorite list ${storageKey} in local storage: ${error}`);
            }
        }
        return { currFavListInLS: filteredClientData, clientDataApiFailed };
    });
}
//# sourceMappingURL=utility.js.map