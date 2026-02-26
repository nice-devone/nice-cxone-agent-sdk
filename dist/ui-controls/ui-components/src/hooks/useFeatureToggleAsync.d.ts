/**
 *custom hook to get the if the feature toggle is enabled
 * @param featureName - name of the feature for which enablement needs to be checked
 * @example - `useFeatureToggleAsync('release-cxa-avNotifications-AW-4378')`
 */
export declare const useFeatureToggleAsync: (featureName: string) => {
    isFeatureEnabled: boolean;
};
