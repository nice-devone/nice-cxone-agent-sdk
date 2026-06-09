"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Directories = void 0;
/**
 * Model class for all directories response
 * @example
 *
 */
class Directories {
    /**
     *
     * @param data - Dynamic directory api response data
     * @example - parse(data)
     */
    parse(data) {
        var _a;
        this.startIndex = data.startIndex;
        this.totalRecords = data.totalRecords;
        this.agentId = data.agentId;
        this.buId = data.buId;
        const directoriesData = (_a = data.directories) === null || _a === void 0 ? void 0 : _a.map((item) => {
            return {
                directoryName: item.directoryName,
                directoryId: item.directoryId,
                status: item.status,
                partners: item.partners,
            };
        });
        this.directories = directoriesData;
    }
}
exports.Directories = Directories;
//# sourceMappingURL=directories.js.map