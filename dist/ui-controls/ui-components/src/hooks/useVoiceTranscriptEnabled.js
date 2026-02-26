import { __awaiter } from "tslib";
import { isVoiceTranscriptEnabledAndToggledOn } from '@nice-devone/agent-sdk';
import { useEffect, useState } from 'react';
/**
   * Custom hook specifically for voice transcript toggle
   * @returns boolean state of the voice transcript toggle
   * @example -
   * ```
   * const isVoiceTranscriptEnabled = useIsVoiceTranscriptEnabled();
   * ```
   */
export const useIsVoiceTranscriptEnabled = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    useEffect(() => {
        /**
           * Check if voice transcript toggle is enabled and set the state accordingly
           * @example - checkVoiceTranscriptToggle()
           */
        const checkVoiceTranscriptToggle = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const enabled = yield isVoiceTranscriptEnabledAndToggledOn();
                setIsEnabled(enabled);
            }
            catch (error) {
                console.error('Error checking voice transcript toggle:', error);
                setIsEnabled(false);
            }
        });
        checkVoiceTranscriptToggle();
    }, []);
    return isEnabled;
};
//# sourceMappingURL=useVoiceTranscriptEnabled.js.map