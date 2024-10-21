"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneSoftphoneNotificationSettings = void 0;
/**
 * Model class for IntegratedSoftphone
 */
class CXoneSoftphoneNotificationSettings {
    /**
     * This method to parse softphone settings from client data
     * @param data -
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data) {
        var _a, _b, _c, _d;
        this.softPhoneVolume = (_a = data === null || data === void 0 ? void 0 : data.softPhoneVolume) !== null && _a !== void 0 ? _a : 80;
        this.secondaryDevice = (_b = data === null || data === void 0 ? void 0 : data.CXASecondaryDevice) !== null && _b !== void 0 ? _b : 0;
        this.ringtone = (_c = data === null || data === void 0 ? void 0 : data.CXARingtone) !== null && _c !== void 0 ? _c : 1;
        this.secondaryDeviceDelay = (_d = data === null || data === void 0 ? void 0 : data.SecondaryDeviceDelay) !== null && _d !== void 0 ? _d : 0;
    }
    /**
     * This method is to map CXoneSoftphoneNotificationSettings to client Data that is sent in payload
     * @param clientData - clientData object with all properties
     * @param data - client data with av-notification and softphone setting properties
     * @example -
     * ```
     * mapper(data);
     * ```
     */
    mapper(clientData, data) {
        var _a, _b, _c, _d;
        const integratedSoftphone = data === null || data === void 0 ? void 0 : data.integratedSoftphone;
        return {
            softPhoneVolume: (_a = integratedSoftphone === null || integratedSoftphone === void 0 ? void 0 : integratedSoftphone.softPhoneVolume) !== null && _a !== void 0 ? _a : clientData.softPhoneVolume,
            CXASecondaryDevice: (_b = integratedSoftphone === null || integratedSoftphone === void 0 ? void 0 : integratedSoftphone.secondaryDevice) !== null && _b !== void 0 ? _b : clientData.CXASecondaryDevice,
            CXARingtone: (_c = integratedSoftphone === null || integratedSoftphone === void 0 ? void 0 : integratedSoftphone.ringtone) !== null && _c !== void 0 ? _c : clientData.CXARingtone,
            SecondaryDeviceDelay: (_d = integratedSoftphone === null || integratedSoftphone === void 0 ? void 0 : integratedSoftphone.secondaryDeviceDelay) !== null && _d !== void 0 ? _d : clientData.SecondaryDeviceDelay,
        };
    }
}
exports.CXoneSoftphoneNotificationSettings = CXoneSoftphoneNotificationSettings;
//# sourceMappingURL=cxone-softphone-notification-settings.js.map