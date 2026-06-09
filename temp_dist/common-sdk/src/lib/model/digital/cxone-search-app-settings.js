"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSearchAppSettings = void 0;
var DIGITAL_SEARCH_FILTERS;
(function (DIGITAL_SEARCH_FILTERS) {
    DIGITAL_SEARCH_FILTERS["AGENT"] = "agent";
    DIGITAL_SEARCH_FILTERS["CHANNEL"] = "channel";
    DIGITAL_SEARCH_FILTERS["FROM"] = "from";
    DIGITAL_SEARCH_FILTERS["HAS_NOTE"] = "hasNote";
    DIGITAL_SEARCH_FILTERS["INBOX_ASSIGNEE"] = "inboxAssigneeAgentId";
    DIGITAL_SEARCH_FILTERS["IS_READ"] = "isRead";
    DIGITAL_SEARCH_FILTERS["OWNER_ASSIGNEE"] = "ownerAssigneeAgentId";
    DIGITAL_SEARCH_FILTERS["SKILL"] = "skill";
    DIGITAL_SEARCH_FILTERS["SKILL_ID"] = "skillId";
    DIGITAL_SEARCH_FILTERS["STATUS"] = "status";
    DIGITAL_SEARCH_FILTERS["TAG"] = "tag";
    DIGITAL_SEARCH_FILTERS["TO"] = "to";
})(DIGITAL_SEARCH_FILTERS || (DIGITAL_SEARCH_FILTERS = {}));
/**
 * Parses an object with string values into an InteractionTabfilters object.
 *
 * @param searchSettings - The object to be parsed, where each key is a string and each value is a stringified JSON.
 * @returns An InteractionTabfilters object with parsed values.
 * @example parseDeeply(obj)
 * @throws Will not throw an error, but if a value cannot be parsed as JSON, it will be assigned as a string.
 */
const parseDeeply = (searchSettings) => {
    const parsedObj = {};
    Object.entries(searchSettings).forEach(([key, value]) => {
        try {
            parsedObj[key] = JSON.parse(value);
        }
        catch (_e) {
            parsedObj[key] = value;
        }
    });
    return parsedObj;
};
/**
 * Parses the search application settings from the provided data.
 *
 * @param data - The CXoneSearchAppTabs object containing the search app settings to be parsed.
 * @example - parseSearchAppSettings(data)
 * @returns The parsed CXoneSearchAppTabs object with updated filter settings.
 */
const parseSearchAppSettings = (data) => {
    var _a, _b, _c;
    const searchAppSettings = {
        interactions: data === null || data === void 0 ? void 0 : data.interactions,
    };
    if (searchAppSettings.interactions && ((_b = (_a = searchAppSettings.interactions) === null || _a === void 0 ? void 0 : _a.filterSettings) === null || _b === void 0 ? void 0 : _b.filters) && ((_c = data === null || data === void 0 ? void 0 : data.interactions) === null || _c === void 0 ? void 0 : _c.filterSettings) && (data === null || data === void 0 ? void 0 : data.interactions.filterSettings.filters)) {
        searchAppSettings.interactions.filterSettings.filters = parseDeeply(data.interactions.filterSettings.filters);
    }
    return searchAppSettings;
};
exports.parseSearchAppSettings = parseSearchAppSettings;
//# sourceMappingURL=cxone-search-app-settings.js.map