import { __awaiter } from "tslib";
import { PermissionKeys, PermissionValues } from '@nice-devone/common-sdk';
import { FeatureToggleService, Logger } from '@nice-devone/core-sdk';
import { CXoneProductFeature } from '../acd';
import { CXoneClient } from '../cxone-client';
/**
 * Util to check whether voice transcription is enabled (permission + product enablement)
 * @returns - boolean
 * @example -
 * ```
 * isVoiceTranscriptionEnabledAndToggledOn();
 * ```
 */
export const isVoiceTranscriptEnabledAndToggledOn = () => __awaiter(void 0, void 0, void 0, function* () {
    const ccfLogger = new Logger('CcfLogger', 'isVoiceTranscriptEnabledAndToggledOn');
    const hasVoiceTranscriptPermission = yield CXoneClient.instance.agentPermission.checkPermissions(PermissionKeys.VOICE_TRANSCRIPT, PermissionValues.VIEW);
    try {
        return Boolean(hasVoiceTranscriptPermission &&
            (yield CXoneClient.instance.cxoneTenant.checkProductEnablement([CXoneProductFeature.CONTINUOUS_TRANSCRIPTION])));
    }
    catch (error) {
        // Handle error
        if (error instanceof Error) {
            ccfLogger.error('isVoiceTranscriptEnabledAndToggledOn', error.message);
        }
        return false;
    }
});
/**
 * Util to check whether the V3 multi-party voice transcription path is enabled.
 * Requires the base voice transcript enablement plus the V3 feature toggle, so
 * V3 conference rendering can be rolled out independently of V2 transcription.
 * @returns - boolean
 * @example -
 * ```
 * isVoiceTranscriptV3EnabledAndToggledOn();
 * ```
 */
export const isVoiceTranscriptV3EnabledAndToggledOn = () => __awaiter(void 0, void 0, void 0, function* () {
    const ccfLogger = new Logger('CcfLogger', 'isVoiceTranscriptV3EnabledAndToggledOn');
    try {
        return Boolean((yield isVoiceTranscriptEnabledAndToggledOn())
            && FeatureToggleService.instance.getFeatureToggleSync("release-agent-multiparty-voice-transcription-AW-62180" /* FeatureToggles.VOICE_TRANSCRIPT_V3_FEATURE_TOGGLE */));
    }
    catch (error) {
        // Handle error
        if (error instanceof Error) {
            ccfLogger.error('isVoiceTranscriptV3EnabledAndToggledOn', error.message);
        }
        return false;
    }
});
//# sourceMappingURL=voiceTranscriptionUtils.js.map