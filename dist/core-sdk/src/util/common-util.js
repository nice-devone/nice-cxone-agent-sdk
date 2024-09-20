import { StorageKeys } from '../constants/storage-key';
import { LocalStorageHelper } from './storage-helper-local';
/**
 * Method to check if voiceBiohub feature is enabled or not
 *
 * @example
 * ```
 * updateDraftMessageIntoState(draftMessagePayload, messageSendStatus, selectedDigitalContactDetails, dispatch)
 * ```
 */
export const isVoiceBioHubFeatureEnabled = () => {
    var _a;
    const businessUnitData = (LocalStorageHelper.getItem(StorageKeys.BUSINESS_UNIT, true) || {});
    const isVoiceBioHubFeatureEnabled = (_a = businessUnitData === null || businessUnitData === void 0 ? void 0 : businessUnitData.features) === null || _a === void 0 ? void 0 : _a.find((feature) => feature.productId === 179 && feature.isEnabled);
    return isVoiceBioHubFeatureEnabled;
};
/**
 * Method to get ANI
 *
 * @example
 * ```
 * getANI(voiceContact)
 * ```
 */
export const getANI = (voiceContact) => {
    if ((voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.isInbound) && ((voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.ani) !== '' || (voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.ani) !== '1')) {
        return voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.ani;
    }
    else if ((voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.dnis) !== '') {
        return voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.dnis;
    }
};
//# sourceMappingURL=common-util.js.map