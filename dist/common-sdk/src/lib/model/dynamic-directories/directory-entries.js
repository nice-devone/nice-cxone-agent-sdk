"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryEntries = void 0;
/**
 * Model class for Directory Entries
 */
class DirectoryEntries {
    /**
     * The parse method will take the data object and assign the values to the DirectoryEntries class properties
     * @param data - Data object received
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data) {
        this.startIndex = data.startIndex;
        this.totalRecords = data.totalRecords;
        this.directoryName = data.directoryName;
        this.directoryId = data.directoryId;
        this.partners = data.partners;
        this.status = data.status;
        this.directoryEntries = data.directoryEntries;
    }
}
exports.DirectoryEntries = DirectoryEntries;
//# sourceMappingURL=directory-entries.js.map