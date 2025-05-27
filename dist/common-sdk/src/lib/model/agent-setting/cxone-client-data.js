"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneClientData = void 0;
const utility_1 = require("../../../util/utility");
const cxone_search_app_settings_1 = require("../digital/cxone-search-app-settings");
const cxone_audio_visual_notification_settings_1 = require("./cxone-audio-visual-notification-settings");
const cxone_softphone_notification_settings_1 = require("./cxone-softphone-notification-settings");
/**
 * Model class for Client Data
 */
class CXoneClientData {
    /**
     * The parse method will take the data object and assign the values to the CXoneClientData class properties
     * @param data - Data object received
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data) {
        this.autoAccept = (0, utility_1.parseBooleanString)(data === null || data === void 0 ? void 0 : data.AutoAccept);
        this.twentyFourHourTime = (0, utility_1.parseBooleanString)(data === null || data === void 0 ? void 0 : data.Use24HourTime);
        this.panelPopout = (0, utility_1.parseBooleanString)(data === null || data === void 0 ? void 0 : data.Panels);
        this.loggingLevel = data === null || data === void 0 ? void 0 : data.LoggingLevel;
        this.sendOnEnter = data === null || data === void 0 ? void 0 : data.SendOnEnter;
        this.avNotification = new cxone_audio_visual_notification_settings_1.CXoneAudioVisualNotificationSettings();
        this.avNotification.parse(data);
        this.integratedSoftphone = new cxone_softphone_notification_settings_1.CXoneSoftphoneNotificationSettings();
        this.integratedSoftphone.parse(data);
    }
    /**
     * Sets the search data for the CXone application settings.
     *
     * @param searchAppSettings - The search application settings to be parsed and set.
     * @example clientData.setSearchData(appSettings)
     */
    setSearchData(searchAppSettings) {
        this.cxaSearchAppSettings = (0, cxone_search_app_settings_1.parseSearchAppSettings)(searchAppSettings);
    }
    /**
     * This method is to map CXoneClientData to client Data that is sent in payload
     * @param clientData - clientData object with all properties
     * @param data - client data
     * @example -
     * ```
     * mapper(clientData, consumerUpdatedData);
     * ```
     */
    mapper(currentClientDataObj, data) {
        var _a, _b, _c, _d, _e;
        const cxoneAgentNotificationSettings = new cxone_audio_visual_notification_settings_1.CXoneAudioVisualNotificationSettings();
        const cxoneSoftphoneNotificationSettings = new cxone_softphone_notification_settings_1.CXoneSoftphoneNotificationSettings();
        const updatedClientData = Object.assign(Object.assign({ AutoAccept: (_a = data === null || data === void 0 ? void 0 : data.autoAccept) !== null && _a !== void 0 ? _a : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.AutoAccept, Use24HourTime: (_b = data === null || data === void 0 ? void 0 : data.twentyFourHourTime) !== null && _b !== void 0 ? _b : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.Use24HourTime, Panels: (_c = data === null || data === void 0 ? void 0 : data.panelPopout) !== null && _c !== void 0 ? _c : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.Panels, SendOnEnter: (_d = data === null || data === void 0 ? void 0 : data.sendOnEnter) !== null && _d !== void 0 ? _d : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.SendOnEnter, LoggingLevel: (_e = data === null || data === void 0 ? void 0 : data.loggingLevel) !== null && _e !== void 0 ? _e : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.LoggingLevel }, cxoneAgentNotificationSettings.mapper(currentClientDataObj, data)), cxoneSoftphoneNotificationSettings.mapper(currentClientDataObj, data));
        return updatedClientData;
    }
    /**
     * Maps the provided `CXoneClientData` to the current client data object, including search app settings.
     *
     * @param currentClientDataObj - The current client data object to be updated.
     * @param data - The new `CXoneClientData` containing updated settings.
     * @returns An object containing the merged settings from the current client data object and the new data.
     * @example clientData.mapperIncludingSearchAppSettings(clientDataObj, data)
     */
    mapperIncludingSearchAppSettings(currentClientDataObj, data) {
        var _a;
        const mapperData = this.mapper(currentClientDataObj, data);
        return Object.assign(Object.assign({}, mapperData), { CxaSearchAppSettings: (_a = data === null || data === void 0 ? void 0 : data.cxaSearchAppSettings) !== null && _a !== void 0 ? _a : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.CxaSearchAppSettings });
    }
}
exports.CXoneClientData = CXoneClientData;
//# sourceMappingURL=cxone-client-data.js.map