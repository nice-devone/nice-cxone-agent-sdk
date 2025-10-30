import { __awaiter } from "tslib";
import { PermissionKeys, PermissionValues } from '@nice-devone/common-sdk';
import { CXoneProductFeature } from '../acd';
import { CXoneClient } from '../cxone-client';
import { FeatureToggleService } from '../feature-toggle';
import { CcfLogger } from '../logger/ccf-logger';
/**
 * Checks if recording notification notification polling is enabled and the user has the necessary permissions.
 * @returns True if the feature is enabled and the user has permission, false otherwise.
 * @example -
 * ```
 * isRecordingNotificationPollingEnabled();
 * ```
 */
export const isRecordingNotificationPollingEnabled = () => __awaiter(void 0, void 0, void 0, function* () {
    const ccfLogger = new CcfLogger('CcfLogger', 'isRecordingNotificationPollingEnabled');
    try {
        return Boolean((yield CXoneClient.instance.agentPermission.checkPermissions(PermissionKeys.REALTIME_RECORDING_STATUS_UPDATE, PermissionValues.VIEW)) &&
            (yield CXoneClient.instance.cxoneTenant.checkProductEnablementFromTenantData([CXoneProductFeature.INTERACTION_HUB_DATA_POLICIES, CXoneProductFeature.REAL_TIME_RECORDING_STATUS_UPDATE])) &&
            FeatureToggleService.instance.getFeatureToggleSync("release-cxa-recording-api-polling-AW-37942" /* FeatureToggles.CXA_RECORDING_NOTIFICATION_API_POLLING */));
    }
    catch (error) {
        if (error instanceof Error) {
            ccfLogger.error('isRecordingNotificationPollingEnabled', error.message);
        }
        return false;
    }
});
//# sourceMappingURL=recordingNotificationUtils.js.map