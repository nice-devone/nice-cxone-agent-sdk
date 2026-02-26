import { __awaiter } from "tslib";
import { useEffect, useState } from 'react';
import { isFeatureEnabledAsync } from '../util/featureToggleUtils';
/**
 *custom hook to get the if the feature toggle is enabled
 * @param featureName - name of the feature for which enablement needs to be checked
 * @example - `useFeatureToggleAsync('release-cxa-avNotifications-AW-4378')`
 */
export const useFeatureToggleAsync = (featureName) => {
    const [isFeatureEnabled, setIsFeatureEnabled] = useState(false);
    useEffect(() => {
        /**
         *
         *
         * @example - isAVNotificationEnabled()
         */
        const isNotificationEnabled = () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield isFeatureEnabledAsync(featureName);
            setIsFeatureEnabled(result);
        });
        isNotificationEnabled();
    }, []);
    return { isFeatureEnabled };
};
//# sourceMappingURL=useFeatureToggleAsync.js.map