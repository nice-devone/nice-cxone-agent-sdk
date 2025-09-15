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
        this.pageActionPopout = (data === null || data === void 0 ? void 0 : data.PageActionPopout) === undefined ? undefined : (0, utility_1.parseBooleanString)(data === null || data === void 0 ? void 0 : data.PageActionPopout);
        this.loggingLevel = data === null || data === void 0 ? void 0 : data.LoggingLevel;
        this.sendOnEnter = data === null || data === void 0 ? void 0 : data.SendOnEnter;
        this.avNotification = new cxone_audio_visual_notification_settings_1.CXoneAudioVisualNotificationSettings();
        this.avNotification.parse(data);
        this.integratedSoftphone = new cxone_softphone_notification_settings_1.CXoneSoftphoneNotificationSettings();
        this.integratedSoftphone.parse(data);
        this.expandSoftphone = (0, utility_1.parseBooleanString)(data === null || data === void 0 ? void 0 : data.ExpandSoftphone);
        this.cxaFavStates = data === null || data === void 0 ? void 0 : data.CXAFavStates;
        this.cxaFavAgents = data === null || data === void 0 ? void 0 : data.CXAFavAgents;
        this.cxaFavStandAddBook = data === null || data === void 0 ? void 0 : data.CXAFavStandAddBook;
        this.cxaFavSkills = data === null || data === void 0 ? void 0 : data.CXAFavSkills;
        this.cxaFavDigitalSkills = data === null || data === void 0 ? void 0 : data.CXAFavDigitalSkills;
        this.cxaFavInQuickRep = data === null || data === void 0 ? void 0 : data.CXAFavInQuickRep;
        this.cxaFavOutQuickRep = data === null || data === void 0 ? void 0 : data.CXAFavOutQuickRep;
        this.cxaFavTeams = data === null || data === void 0 ? void 0 : data.CXAFavTeams;
        this.cxaFavExtDirectory = data === null || data === void 0 ? void 0 : data.CXAFavExtDirectory;
        this.emailMessageSortOrder = data === null || data === void 0 ? void 0 : data.emailMessageSortOrder;
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        const cxoneAgentNotificationSettings = new cxone_audio_visual_notification_settings_1.CXoneAudioVisualNotificationSettings();
        const cxoneSoftphoneNotificationSettings = new cxone_softphone_notification_settings_1.CXoneSoftphoneNotificationSettings();
        const updatedClientData = Object.assign(Object.assign({ AutoAccept: (_a = data === null || data === void 0 ? void 0 : data.autoAccept) !== null && _a !== void 0 ? _a : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.AutoAccept, Use24HourTime: (_b = data === null || data === void 0 ? void 0 : data.twentyFourHourTime) !== null && _b !== void 0 ? _b : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.Use24HourTime, Panels: (_c = data === null || data === void 0 ? void 0 : data.panelPopout) !== null && _c !== void 0 ? _c : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.Panels, PageActionPopout: (_d = data === null || data === void 0 ? void 0 : data.pageActionPopout) !== null && _d !== void 0 ? _d : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.PageActionPopout, SendOnEnter: (_e = data === null || data === void 0 ? void 0 : data.sendOnEnter) !== null && _e !== void 0 ? _e : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.SendOnEnter, LoggingLevel: (_f = data === null || data === void 0 ? void 0 : data.loggingLevel) !== null && _f !== void 0 ? _f : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.LoggingLevel, ExpandSoftphone: (_g = data === null || data === void 0 ? void 0 : data.expandSoftphone) !== null && _g !== void 0 ? _g : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.ExpandSoftphone, CXAFavStates: (_h = data === null || data === void 0 ? void 0 : data.cxaFavStates) !== null && _h !== void 0 ? _h : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.CXAFavStates, CXAFavAgents: (_j = data === null || data === void 0 ? void 0 : data.cxaFavAgents) !== null && _j !== void 0 ? _j : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.CXAFavAgents, CXAFavInQuickRep: (_k = data === null || data === void 0 ? void 0 : data.cxaFavInQuickRep) !== null && _k !== void 0 ? _k : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.CXAFavInQuickRep, CXAFavOutQuickRep: (_l = data === null || data === void 0 ? void 0 : data.cxaFavOutQuickRep) !== null && _l !== void 0 ? _l : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.CXAFavOutQuickRep, emailMessageSortOrder: (_m = data === null || data === void 0 ? void 0 : data.emailMessageSortOrder) !== null && _m !== void 0 ? _m : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.emailMessageSortOrder, CXAFavTeams: (_o = data === null || data === void 0 ? void 0 : data.cxaFavTeams) !== null && _o !== void 0 ? _o : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.CXAFavTeams, CXAFavStandAddBook: (_p = data === null || data === void 0 ? void 0 : data.cxaFavStandAddBook) !== null && _p !== void 0 ? _p : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.CXAFavStandAddBook, CXAFavExtDirectory: (_q = data === null || data === void 0 ? void 0 : data.cxaFavExtDirectory) !== null && _q !== void 0 ? _q : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.CXAFavExtDirectory, CXAFavSkills: (_r = data === null || data === void 0 ? void 0 : data.cxaFavSkills) !== null && _r !== void 0 ? _r : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.CXAFavSkills, CXAFavDigitalSkills: (_s = data === null || data === void 0 ? void 0 : data.cxaFavDigitalSkills) !== null && _s !== void 0 ? _s : currentClientDataObj === null || currentClientDataObj === void 0 ? void 0 : currentClientDataObj.CXAFavDigitalSkills }, cxoneAgentNotificationSettings.mapper(currentClientDataObj, data)), cxoneSoftphoneNotificationSettings.mapper(currentClientDataObj, data));
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