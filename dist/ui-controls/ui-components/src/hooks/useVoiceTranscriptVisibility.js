import { useEffect, useState } from 'react';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { extractStorageData } from '../util/common';
import { parseBooleanString } from '@nice-devone/common-sdk';
/**
 * Custom hook to watch for changes in localStorage value for voice transcript visibility
 * @returns current state of showTranscript
 * @example
 * ```tsx
 * const showTranscript = useVoiceTranscriptVisibility();
 *
 * // Component will re-render when showTranscript changes
 * ```
 */
export const useVoiceTranscriptVisibility = () => {
    const [showTranscript, setShowTranscript] = useState(() => JSON.parse(LocalStorageHelper.getItem(StorageKeys.SHOW_VOICE_TRANSCRIPT, false) || false));
    useEffect(() => {
        /**
         * Handle storage changes from both StorageEvent and CustomEvent
         * @param event - StorageEvent or CustomEvent from localStorage
         * @example - handleStorageChange(event);
         */
        const handleStorageChange = (event) => {
            const storageData = extractStorageData(event);
            if (!storageData || storageData.key !== StorageKeys.SHOW_VOICE_TRANSCRIPT)
                return;
            setShowTranscript(parseBooleanString(storageData.newValue));
        };
        // Listen for localStorage changes from other tabs/windows
        window.addEventListener('storage', handleStorageChange);
        // Custom event for same-tab localStorage changes
        window.addEventListener('localStorageChange', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('localStorageChange', handleStorageChange);
        };
    }, []);
    /**
     * Update the transcript visibility and notify other components
     * @param newValue - new boolean value for transcript visibility
     * @example updateTranscriptVisibility(true)
     */
    const updateTranscriptVisibility = (newValue) => {
        LocalStorageHelper.setItem(StorageKeys.SHOW_VOICE_TRANSCRIPT, newValue);
        setShowTranscript(newValue);
        // Dispatch custom event to notify other components in the same tab
        const event = new CustomEvent('localStorageChange', {
            detail: {
                key: StorageKeys.SHOW_VOICE_TRANSCRIPT,
                newValue: newValue.toString(),
            },
        });
        window.dispatchEvent(event);
    };
    return {
        showTranscript,
        updateTranscriptVisibility,
    };
};
//# sourceMappingURL=useVoiceTranscriptVisibility.js.map