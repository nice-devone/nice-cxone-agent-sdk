"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryMetadata = void 0;
/**
 * Model class for Directory Metadata
 */
class DirectoryMetadata {
    /**
     * The parse method will take the data object and assign the values to the DirectoryMetadata class properties
     * @param data - Data object received
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data) {
        this.agentId = data.agentId;
        this.buId = data.buId;
        this.directoryName = data.directoryName;
        this.directoryId = data.directoryId;
        this.partners = data.partners;
        this.status = data.status;
        this.fields = data.fields;
    }
}
exports.DirectoryMetadata = DirectoryMetadata;
//# sourceMappingURL=directory-metadata.js.map