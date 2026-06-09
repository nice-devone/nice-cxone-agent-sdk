"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchDirectoriesResponse = void 0;
/**
 * Model class for Directory Search Result
 */
class SearchDirectoriesResponse {
    /**
     * The parse method will take the data object and assign the values to the DirectoryEntries class properties
     * @param data - Data object received
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data) {
        this.subscriptionId = data.subscriptionId;
        this.totalRecords = data.totalRecords;
        this.directoryEntries = data.directoryEntries;
    }
}
exports.SearchDirectoriesResponse = SearchDirectoriesResponse;
//# sourceMappingURL=search-directory-response.js.map