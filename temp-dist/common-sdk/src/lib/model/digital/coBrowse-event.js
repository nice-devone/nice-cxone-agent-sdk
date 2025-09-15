"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoBrowseData = exports.CoBrowseEvent = void 0;
/**
 * Model Class for the DigitalContactEvent
 */
class CoBrowseEvent {
    /**
       * used to parse the data
       * @example
       * ```
       * coBrowseEvent.parse(data);
       * ```
       */
    parse(data) {
        let rawData = '';
        const result = new CoBrowseData();
        if (data === null || data === void 0 ? void 0 : data.data) {
            rawData = data === null || data === void 0 ? void 0 : data.data;
        }
        else if (data === null || data === void 0 ? void 0 : data.Data) {
            rawData = data === null || data === void 0 ? void 0 : data.Data;
        }
        this.data = result.parseData(rawData);
        this.iisHost = data === null || data === void 0 ? void 0 : data.IISHost;
        this.vcHost = data === null || data === void 0 ? void 0 : data.VCHost;
        this.eventName = data === null || data === void 0 ? void 0 : data.eventName;
        this.type = data === null || data === void 0 ? void 0 : data.type;
    }
}
exports.CoBrowseEvent = CoBrowseEvent;
/**
 * Model Class for the CoBrowsData
 */
class CoBrowseData {
    /**
       * used to parse the data
       * @example
       * ```
       * agentWorkflowResponseEvent.parse(data);
       * ```
       */
    parseData(data) {
        const obj = JSON.parse(data);
        this.contactId = obj === null || obj === void 0 ? void 0 : obj.contactId;
        this.url = obj === null || obj === void 0 ? void 0 : obj.url;
        return this;
    }
}
exports.CoBrowseData = CoBrowseData;
//# sourceMappingURL=coBrowse-event.js.map