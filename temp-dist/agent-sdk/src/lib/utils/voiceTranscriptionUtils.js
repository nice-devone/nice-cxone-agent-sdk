import { __awaiter } from "tslib";
import { PermissionKeys, PermissionValues } from '@nice-devone/common-sdk';
import { FeatureToggleService, Logger } from '@nice-devone/core-sdk';
import { CXoneProductFeature } from '../acd';
import { CXoneClient } from '../cxone-client';
/**
 * Util to get feature toggle enablement
 * @param featureName - feature toggle Name
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
            (yield CXoneClient.instance.cxoneTenant.checkProductEnablement([CXoneProductFeature.CONTINUOUS_TRANSCRIPTION]))
            && FeatureToggleService.instance.getFeatureToggleSync("release-agent-voice-transcription-AW-20973" /* FeatureToggles.VOICE_TRANSCRIPT_FEATURE_TOGGLE */));
    }
    catch (error) {
        // Handle error
        if (error instanceof Error) {
            ccfLogger.error('isVoiceTranscriptEnabledAndToggledOn', error.message);
        }
        return false;
    }
});
//# sourceMappingURL=voiceTranscriptionUtils.js.map