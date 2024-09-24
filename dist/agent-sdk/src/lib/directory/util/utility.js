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
    if (offset && limit) {
        return data === null || data === void 0 ? void 0 : data.slice(offset - 1, offset + limit - 1);
    }
    return data;
};
//# sourceMappingURL=utility.js.map