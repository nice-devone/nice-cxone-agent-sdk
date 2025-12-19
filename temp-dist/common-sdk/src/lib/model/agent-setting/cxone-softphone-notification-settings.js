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
        var _a, _b, _c, _d, _e;
        this.softPhoneVolume = (_a = data === null || data === void 0 ? void 0 : data.softPhoneVolume) !== null && _a !== void 0 ? _a : 0.8;
        this.secondaryDevice = (_b = data === null || data === void 0 ? void 0 : data.CXASecondaryDevice) !== null && _b !== void 0 ? _b : 0;
        this.secondaryDeviceName = (_c = data === null || data === void 0 ? void 0 : data.CXASecondaryDeviceName) !== null && _c !== void 0 ? _c : 0;
        this.ringtone = (_d = data === null || data === void 0 ? void 0 : data.CXARingtone) !== null && _d !== void 0 ? _d : 1;
        this.secondaryDeviceDelay = (_e = data === null || data === void 0 ? void 0 : data.SecondaryDeviceDelay) !== null && _e !== void 0 ? _e : 0;
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
        var _a, _b, _c, _d, _e;
        const integratedSoftphone = data === null || data === void 0 ? void 0 : data.integratedSoftphone;
        return {
            softPhoneVolume: (_a = integratedSoftphone === null || integratedSoftphone === void 0 ? void 0 : integratedSoftphone.softPhoneVolume) !== null && _a !== void 0 ? _a : clientData.softPhoneVolume,
            CXASecondaryDevice: (_b = integratedSoftphone === null || integratedSoftphone === void 0 ? void 0 : integratedSoftphone.secondaryDevice) !== null && _b !== void 0 ? _b : clientData.CXASecondaryDevice,
            CXASecondaryDeviceName: (_c = integratedSoftphone === null || integratedSoftphone === void 0 ? void 0 : integratedSoftphone.secondaryDeviceName) !== null && _c !== void 0 ? _c : clientData.CXASecondaryDeviceName,
            CXARingtone: (_d = integratedSoftphone === null || integratedSoftphone === void 0 ? void 0 : integratedSoftphone.ringtone) !== null && _d !== void 0 ? _d : clientData.CXARingtone,
            SecondaryDeviceDelay: (_e = integratedSoftphone === null || integratedSoftphone === void 0 ? void 0 : integratedSoftphone.secondaryDeviceDelay) !== null && _e !== void 0 ? _e : clientData.SecondaryDeviceDelay,
        };
    }
}
exports.CXoneSoftphoneNotificationSettings = CXoneSoftphoneNotificationSettings;
//# sourceMappingURL=cxone-softphone-notification-settings.js.map