/**
 * Method to check if voiceBiohub feature is enabled or not
 *
 * @example
 * ```
 * updateDraftMessageIntoState(draftMessagePayload, messageSendStatus, selectedDigitalContactDetails, dispatch)
 * ```
 */
export declare const isVoiceBioHubFeatureEnabled: () => import("../lib/admin/model/business-unit-product").BusinessUnitProduct;
/**
 * Checks if the IEX feature is enabled.
 *
 * @returns - Returns true if any valid product ID is enabled, otherwise false.
 *
 * @example
 * ```
 * const isEnabled = isIEXFeatureEnabled();
 * console.log(isEnabled); // true or false
 * ```
 */
export declare const isIEXFeatureEnabled: () => boolean;
/**
 * Method to get ANI
 *
 * @example
 * ```
 * getANI(voiceContact)
 * ```
 */
export declare const getANI: (voiceContact: any) => any;
